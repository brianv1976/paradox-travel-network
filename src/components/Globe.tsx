import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive 3D globe — the hero centerpiece.
 *
 * Built on pure three.js (no React Three Fiber) so it stays dependency-light.
 * Design notes for anyone editing this later:
 *  - Continents are real: simplified lat/lng polygons are rasterised to an
 *    offscreen land mask, then sampled per-dot so land dots differ from ocean.
 *  - The premium "lit from within" look comes from a fresnel atmosphere shell
 *    (BackSide + additive blending) — cheap, and it never z-fights.
 *  - Markers/pulses are sprites so they always face the camera; no billboard
 *    math, no sorting artefacts.
 *  - Camera distance is derived from the sphere radius + FOV so the globe can
 *    never clip its container at any aspect ratio.
 */

const OCEAN_DOT = 0x1fa8c4;   // bright tropical water
const LAND_DOT = 0xf5ab2b;    // brand gold — continents pop, not recede
const ATMOSPHERE = 0x4fd6e8;  // vivid cyan halo
const CORE = 0x0d5f7a;        // sunlit sea blue — keeps it playful on cream
const MARKER = 0xffd166;
/** Arcs cycle these so the routes read playful rather than corporate. */
const ARC_COLORS = [0xf5ab2b, 0xff8a5b, 0x4fd6e8, 0xffd166, 0x7ee787];

const RADIUS = 1.55;

/** Rough continent outlines as [lng, lat]. Low-fi on purpose — at globe scale
 *  these read clearly as Earth without shipping a megabyte of GeoJSON. */
const CONTINENTS: [number, number][][] = [
  // North America
  [
    [-168, 66], [-165, 60], [-153, 58], [-140, 60], [-131, 55], [-125, 49],
    [-124, 40], [-120, 34], [-114, 30], [-110, 24], [-105, 20], [-97, 16],
    [-92, 15], [-88, 16], [-87, 21], [-90, 25], [-94, 29], [-89, 29],
    [-85, 30], [-81, 25], [-80, 27], [-81, 32], [-76, 35], [-70, 42],
    [-67, 45], [-60, 47], [-56, 51], [-64, 60], [-78, 62], [-85, 70],
    [-95, 70], [-110, 68], [-125, 70], [-140, 70], [-156, 71],
  ],
  // Greenland
  [
    [-45, 60], [-52, 65], [-55, 70], [-50, 76], [-40, 80], [-25, 82],
    [-18, 78], [-22, 72], [-32, 66], [-40, 61],
  ],
  // South America
  [
    [-81, -5], [-78, 0], [-77, 8], [-72, 12], [-64, 11], [-60, 8],
    [-52, 5], [-50, 0], [-44, -2], [-38, -4], [-35, -8], [-39, -14],
    [-41, -22], [-48, -25], [-53, -34], [-58, -38], [-62, -41], [-65, -45],
    [-68, -50], [-71, -54], [-75, -50], [-74, -44], [-73, -37], [-71, -30],
    [-70, -23], [-70, -18], [-76, -14], [-80, -6],
  ],
  // Africa
  [
    [-17, 15], [-16, 20], [-13, 28], [-9, 30], [0, 32], [10, 34],
    [20, 32], [25, 32], [32, 31], [34, 28], [36, 22], [38, 18],
    [43, 12], [48, 12], [51, 11], [48, 5], [42, 0], [41, -5],
    [40, -11], [36, -18], [33, -26], [28, -33], [20, -35], [18, -29],
    [15, -23], [12, -17], [13, -10], [9, -1], [9, 4], [3, 6],
    [-4, 5], [-8, 4], [-13, 9], [-16, 12],
  ],
  // Europe + western Russia
  [
    [-10, 36], [-9, 43], [-2, 43], [0, 49], [4, 52], [8, 54],
    [10, 58], [14, 55], [20, 54], [24, 58], [28, 60], [26, 66],
    [22, 70], [30, 70], [40, 68], [55, 70], [60, 66], [58, 58],
    [52, 52], [46, 47], [40, 45], [36, 45], [30, 46], [28, 41],
    [24, 41], [20, 42], [16, 42], [13, 45], [12, 41], [16, 39],
    [12, 38], [8, 44], [3, 43],
  ],
  // Asia
  [
    [55, 70], [70, 70], [80, 73], [95, 76], [110, 76], [125, 73],
    [140, 72], [155, 70], [168, 68], [180, 66], [180, 61], [170, 60],
    [162, 58], [155, 51], [145, 44], [140, 36], [130, 34], [127, 39],
    [122, 30], [118, 24], [110, 20], [108, 12], [104, 9], [100, 3],
    [98, 9], [95, 16], [92, 21], [88, 22], [80, 15], [77, 8],
    [73, 17], [70, 24], [62, 25], [58, 23], [52, 27], [48, 30],
    [45, 37], [50, 44], [56, 52], [58, 60], [56, 66],
  ],
  // India (kept separate so the subcontinent stays legible)
  [
    [68, 24], [72, 21], [73, 16], [77, 8], [80, 13], [84, 19],
    [87, 22], [89, 22], [88, 26], [80, 28], [74, 28],
  ],
  // Australia
  [
    [114, -22], [113, -26], [116, -32], [121, -34], [129, -32],
    [135, -35], [140, -38], [147, -38], [150, -35], [153, -28],
    [146, -19], [142, -11], [136, -12], [131, -12], [125, -14],
    [122, -18],
  ],
  // Antarctica band
  [
    [-180, -70], [-140, -73], [-100, -74], [-60, -70], [-20, -70],
    [20, -70], [60, -68], [100, -66], [140, -68], [180, -70],
    [180, -85], [-180, -85],
  ],
];

/** Rasterise continents to an equirectangular mask we can sample per-dot. */
function buildLandMask() {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  for (const poly of CONTINENTS) {
    ctx.beginPath();
    poly.forEach(([lng, lat], i) => {
      const x = ((lng + 180) / 360) * w;
      const y = ((90 - lat) / 180) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  }
  const data = ctx.getImageData(0, 0, w, h).data;
  return (lat: number, lng: number) => {
    const x = Math.floor(((lng + 180) / 360) * w);
    const y = Math.floor(((90 - lat) / 180) * h);
    const i = (Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))) * 4;
    return data[i] > 128;
  };
}

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/** Radial-gradient sprite used for markers, pulses and arc travellers. */
function glowTexture(hex: number) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = new THREE.Color(hex);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${rgb},1)`);
  g.addColorStop(0.25, `rgba(${rgb},0.65)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Destinations that actually match the site's marquee. */
const DESTINATIONS: [number, number][] = [
  [32.9, -97.0],   // DFW — home base
  [21.16, -86.85], // Cancún
  [41.9, 12.5],    // Rome
  [36.39, 25.46],  // Santorini
  [64.15, -21.94], // Reykjavík
  [35.68, 139.69], // Tokyo
  [-13.16, -72.54],// Machu Picchu
  [-33.87, 151.21],// Sydney
  [25.2, 55.27],   // Dubai
];

// Flight paths radiate from DFW (index 0) — it's a travel advisor's globe.
const ROUTES: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [0, 5], [0, 6], [0, 8], [2, 3], [5, 7],
];

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLand = buildLandMask();

    const scene = new THREE.Scene();

    // Camera pulled back far enough that the sphere + atmosphere always fit.
    const fov = 42;
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    camera.position.z = (RADIUS * 1.35) / Math.tan((fov / 2) * (Math.PI / 180));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "pan-y";

    // Tilt the whole system slightly for a more dimensional read.
    const system = new THREE.Group();
    system.rotation.z = 0.2;
    scene.add(system);

    const globe = new THREE.Group();
    system.add(globe);

    // --- Dotted earth -------------------------------------------------------
    // Two point clouds: dense/bright for land, sparse/dim for ocean.
    const landPos: number[] = [];
    const oceanPos: number[] = [];
    const SAMPLES = 7000;
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < SAMPLES; i++) {
      const y = 1 - (i / (SAMPLES - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = Math.atan2(z, x) * (180 / Math.PI);
      const target = isLand(lat, lng) ? landPos : oceanPos;
      // Thin the ocean out so land reads as the signal, not noise.
      if (target === oceanPos && i % 3 !== 0) continue;
      target.push(x * RADIUS, y * RADIUS, z * RADIUS);
    }

    const makePoints = (arr: number[], color: number, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      globe.add(pts);
      return { geo, mat };
    };

    const landPts = makePoints(landPos, LAND_DOT, 0.032, 1);
    const oceanPts = makePoints(oceanPos, OCEAN_DOT, 0.02, 0.5);

    // --- Solid core so you can't see through to the far side ---------------
    const coreGeo = new THREE.SphereGeometry(RADIUS * 0.985, 64, 64);
    const coreMat = new THREE.MeshBasicMaterial({ color: CORE });
    globe.add(new THREE.Mesh(coreGeo, coreMat));

    // --- Fresnel atmosphere -------------------------------------------------
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.22, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(ATMOSPHERE) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    system.add(new THREE.Mesh(atmoGeo, atmoMat));

    // --- Destination markers ------------------------------------------------
    const markerTex = glowTexture(MARKER);
    const markers: { sprite: THREE.Sprite; phase: number }[] = [];
    const points = DESTINATIONS.map(([lat, lng]) => latLngToVec3(lat, lng, RADIUS * 1.01));
    points.forEach((p, i) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: markerTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      sprite.position.copy(p);
      sprite.scale.setScalar(i === 0 ? 0.3 : 0.2);
      globe.add(sprite);
      markers.push({ sprite, phase: i * 0.9 });
    });

    // --- Flight arcs + travelling pulses -----------------------------------
    const arcs: {
      line: THREE.Line;
      total: number;
      curve: THREE.QuadraticBezierCurve3;
      pulse: THREE.Sprite;
      offset: number;
    }[] = [];
    ROUTES.forEach(([a, b], i) => {
      const start = points[a];
      const end = points[b];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const lift = 1 + start.distanceTo(end) * 0.42;
      mid.normalize().multiplyScalar(RADIUS * lift);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(90);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const arcColor = ARC_COLORS[i % ARC_COLORS.length];
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          color: arcColor,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        })
      );
      globe.add(line);

      const pulse = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture(arcColor),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      pulse.scale.setScalar(0.16);
      pulse.visible = false;
      globe.add(pulse);

      arcs.push({ line, total: pts.length, curve, pulse, offset: i / ROUTES.length });
    });

    // --- Interaction: drag to spin, cursor parallax when idle ---------------
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let spinVel = 0;
    const targetTilt = { x: 0.12 };
    const currentTilt = { x: 0.12 };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        globe.rotation.y += dx * 0.005;
        spinVel = dx * 0.005;
        targetTilt.x = Math.max(-0.6, Math.min(0.6, currentTilt.x + dy * 0.004));
      } else {
        const rect = mount.getBoundingClientRect();
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTilt.x = 0.12 + ny * 0.28;
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // --- Loop ---------------------------------------------------------------
    let raf = 0;
    let t = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      if (!reduce) {
        if (dragging) {
          // user is in control
        } else if (Math.abs(spinVel) > 0.0004) {
          globe.rotation.y += spinVel;
          spinVel *= 0.94; // inertia
        } else {
          globe.rotation.y += dt * 0.09;
        }
      }

      currentTilt.x += (targetTilt.x - currentTilt.x) * 0.06;
      globe.rotation.x = currentTilt.x;

      // Markers breathe.
      markers.forEach((m, i) => {
        const base = i === 0 ? 0.3 : 0.2;
        const s = base * (1 + Math.sin(t * 1.6 + m.phase) * 0.18);
        m.sprite.scale.setScalar(reduce ? base : s);
      });

      // Arcs draw in, hold, then a pulse runs the finished path.
      arcs.forEach((a) => {
        const cycle = (t * 0.16 + a.offset) % 1;
        const draw = Math.min(1, cycle / 0.55);
        a.line.geometry.setDrawRange(0, Math.floor(draw * a.total));
        if (draw >= 1) {
          const p = (cycle - 0.55) / 0.45;
          a.pulse.visible = true;
          a.pulse.position.copy(a.curve.getPoint(p));
          const fade = Math.sin(p * Math.PI);
          a.pulse.scale.setScalar(0.1 + fade * 0.12);
        } else {
          a.pulse.visible = false;
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    // --- Size to container (square, never clips) ----------------------------
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Widen the pull-back on narrow/portrait boxes so nothing crops.
      const fit = Math.min(1, camera.aspect);
      camera.position.z =
        (RADIUS * 1.35) / Math.tan((fov / 2) * (Math.PI / 180)) / Math.max(0.55, fit);
      camera.updateProjectionMatrix();
    };
    resize();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);

      landPts.geo.dispose();
      landPts.mat.dispose();
      oceanPts.geo.dispose();
      oceanPts.mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      markerTex.dispose();
      markers.forEach((m) => (m.sprite.material as THREE.SpriteMaterial).dispose());
      arcs.forEach((a) => {
        a.line.geometry.dispose();
        (a.line.material as THREE.Material).dispose();
        const pm = a.pulse.material as THREE.SpriteMaterial;
        pm.map?.dispose();
        pm.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
