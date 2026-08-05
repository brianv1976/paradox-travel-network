import { useEffect, useRef } from "react";
import * as THREE from "three";
import { decodeLandRings } from "../data/worldLand";

/**
 * Interactive 3D globe — the hero centerpiece.
 *
 * Geography is real: Natural Earth 1:110m coastlines (see data/worldLand.ts)
 * are painted into an equirectangular canvas and used as the sphere's texture,
 * so landmasses read as solid shapes rather than a dot field.
 *
 * Routes run from DFW to the destinations the site actually sells, and each
 * one is flown by a small 3D aircraft that banks along the arc's tangent.
 *
 * Camera distance is derived from radius + FOV, so the globe can never clip
 * its container at any aspect ratio.
 */

const OCEAN = "#0e5f7d";
const OCEAN_DEEP = "#0a4a63";
const LAND = "#f0b247";
const LAND_EDGE = "#c8862a";
const ATMOSPHERE = 0x5fd8ea;
const ARC_COLORS = [0xffd166, 0xff8a5b, 0x7ee787, 0x6fe3f5, 0xffb4a2];

const RADIUS = 1.55;

/** Real coordinates for the destinations the site sells. */
const DESTINATIONS: { name: string; lat: number; lng: number }[] = [
  { name: "Dallas–Fort Worth", lat: 32.9, lng: -97.04 },
  { name: "Aruba", lat: 12.52, lng: -69.97 },
  { name: "Turks & Caicos", lat: 21.69, lng: -71.8 },
  { name: "The Bahamas", lat: 25.03, lng: -77.4 },
  { name: "St. Lucia", lat: 13.91, lng: -60.98 },
  { name: "Amalfi Coast", lat: 40.63, lng: 14.6 },
  { name: "Rome", lat: 41.9, lng: 12.5 },
  { name: "Reykjavík", lat: 64.15, lng: -21.94 },
  { name: "The Maldives", lat: 3.2, lng: 73.22 },
  { name: "Kyoto", lat: 35.01, lng: 135.77 },
];

/** Every route originates at DFW (index 0) — it's a DFW advisor's globe. */
const ROUTES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 7],
  [0, 8],
  [0, 9],
];

/** Routes that actually get an aircraft (keeping all eight would be busy). */
const FLOWN = [0, 2, 4, 6];

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/** Paint real coastlines into an equirectangular texture. */
function buildEarthTexture() {
  const w = 4096;
  const h = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Ocean with a soft vertical depth gradient.
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, OCEAN_DEEP);
  grad.addColorStop(0.5, OCEAN);
  grad.addColorStop(1, OCEAN_DEEP);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Faint graticule so the sphere reads as a globe even over open ocean.
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 2;
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Landmasses, solid.
  const rings = decodeLandRings();
  ctx.fillStyle = LAND;
  ctx.strokeStyle = LAND_EDGE;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";

  for (const flat of rings) {
    ctx.beginPath();
    for (let i = 0; i < flat.length; i += 2) {
      const x = ((flat[i] + 180) / 360) * w;
      const y = ((90 - flat[i + 1]) / 180) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/** Small aircraft built from primitives — cheap, and reads clearly at size. */
function buildAircraft(color: number) {
  const g = new THREE.Group();
  const body = new THREE.MeshBasicMaterial({ color: 0xfdf6e8 });
  const accent = new THREE.MeshBasicMaterial({ color });

  // Fuselage runs along +Z, which is the direction we orient to the tangent.
  const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.075, 4, 10), body);
  fuselage.rotation.x = Math.PI / 2;
  g.add(fuselage);

  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.04, 12), body);
  nose.rotation.x = Math.PI / 2;
  nose.position.z = 0.072;
  g.add(nose);

  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.005, 0.032), accent);
  g.add(wing);

  const tailplane = new THREE.Mesh(new THREE.BoxGeometry(0.062, 0.004, 0.018), accent);
  tailplane.position.z = -0.055;
  g.add(tailplane);

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.032, 0.024), accent);
  fin.position.set(0, 0.016, -0.055);
  g.add(fin);

  return g;
}

/** Radial-gradient sprite for markers. */
function glowTexture(hex: number) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const c = new THREE.Color(hex);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, `rgba(${rgb},1)`);
  grd.addColorStop(0.28, `rgba(${rgb},0.6)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const fov = 42;
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    const baseDist = (RADIUS * 1.32) / Math.tan((fov / 2) * (Math.PI / 180));
    camera.position.z = baseDist;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "pan-y";

    const system = new THREE.Group();
    system.rotation.z = 0.22;
    scene.add(system);

    const globe = new THREE.Group();
    system.add(globe);

    // --- Earth --------------------------------------------------------------
    const earthTex = buildEarthTexture();
    const earthGeo = new THREE.SphereGeometry(RADIUS, 96, 96);
    const earthMat = new THREE.MeshBasicMaterial({ map: earthTex });
    globe.add(new THREE.Mesh(earthGeo, earthMat));

    // --- Atmosphere ---------------------------------------------------------
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.2, 64, 64);
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
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
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
    const markerTex = glowTexture(0xffd166);
    const points = DESTINATIONS.map((d) => latLngToVec3(d.lat, d.lng, RADIUS * 1.008));
    const markers: { sprite: THREE.Sprite; base: number; phase: number }[] = [];

    points.forEach((p, i) => {
      const isHome = i === 0;
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: markerTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      sprite.position.copy(p);
      const base = isHome ? 0.3 : 0.19;
      sprite.scale.setScalar(base);
      globe.add(sprite);
      markers.push({ sprite, base, phase: i * 0.8 });

      // Solid pin dot so the location reads even against bright land.
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(isHome ? 0.022 : 0.015, 12, 12),
        new THREE.MeshBasicMaterial({ color: isHome ? 0xff8a5b : 0xfff3d6 })
      );
      dot.position.copy(p);
      globe.add(dot);
    });

    // --- Routes + aircraft --------------------------------------------------
    const arcs: {
      line: THREE.Line;
      total: number;
      curve: THREE.QuadraticBezierCurve3;
      plane?: THREE.Group;
      offset: number;
    }[] = [];

    ROUTES.forEach(([a, b], i) => {
      const start = points[a];
      const end = points[b];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const lift = 1 + start.distanceTo(end) * 0.36;
      mid.normalize().multiplyScalar(RADIUS * lift);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(110);

      const color = ARC_COLORS[i % ARC_COLORS.length];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        })
      );
      globe.add(line);

      let plane: THREE.Group | undefined;
      if (FLOWN.includes(i)) {
        plane = buildAircraft(color);
        plane.visible = false;
        globe.add(plane);
      }

      arcs.push({ line, total: pts.length, curve, plane, offset: i / ROUTES.length });
    });

    // --- Interaction --------------------------------------------------------
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let spinVel = 0;
    const targetTilt = { x: 0.1 };
    const currentTilt = { x: 0.1 };

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
        /* already released */
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
        targetTilt.x = Math.max(-0.55, Math.min(0.55, currentTilt.x + dy * 0.004));
      } else {
        const rect = mount.getBoundingClientRect();
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        targetTilt.x = 0.1 + ny * 0.24;
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // --- Loop ---------------------------------------------------------------
    let raf = 0;
    let t = 0;
    const clock = new THREE.Clock();
    const fwd = new THREE.Vector3();
    const up = new THREE.Vector3();
    const right = new THREE.Vector3();
    const trueUp = new THREE.Vector3();
    const basis = new THREE.Matrix4();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      if (!reduce) {
        if (dragging) {
          /* user driving */
        } else if (Math.abs(spinVel) > 0.0004) {
          globe.rotation.y += spinVel;
          spinVel *= 0.94;
        } else {
          globe.rotation.y += dt * 0.075;
        }
      }

      currentTilt.x += (targetTilt.x - currentTilt.x) * 0.06;
      globe.rotation.x = currentTilt.x;

      markers.forEach((m) => {
        const s = m.base * (1 + Math.sin(t * 1.5 + m.phase) * 0.2);
        m.sprite.scale.setScalar(reduce ? m.base : s);
      });

      arcs.forEach((a) => {
        const cycle = (t * 0.13 + a.offset) % 1;
        const draw = Math.min(1, cycle / 0.5);
        a.line.geometry.setDrawRange(0, Math.floor(draw * a.total));

        if (a.plane) {
          if (draw >= 1) {
            const p = (cycle - 0.5) / 0.5;
            const pos = a.curve.getPoint(p);
            const ahead = a.curve.getPoint(Math.min(1, p + 0.015));

            a.plane.visible = true;
            a.plane.position.copy(pos);

            // Orient: nose along the tangent, belly toward the planet.
            fwd.subVectors(ahead, pos).normalize();
            up.copy(pos).normalize();
            right.crossVectors(up, fwd).normalize();
            trueUp.crossVectors(fwd, right).normalize();
            basis.makeBasis(right, trueUp, fwd);
            a.plane.quaternion.setFromRotationMatrix(basis);

            // Fade in/out at the ends of the run.
            const edge = Math.min(1, Math.sin(p * Math.PI) * 3);
            a.plane.scale.setScalar(0.85 + edge * 0.35);
          } else {
            a.plane.visible = false;
          }
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const fit = Math.min(1, camera.aspect);
      camera.position.z = baseDist / Math.max(0.6, fit);
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

      earthGeo.dispose();
      earthMat.dispose();
      earthTex.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      markerTex.dispose();
      markers.forEach((m) => (m.sprite.material as THREE.SpriteMaterial).dispose());
      arcs.forEach((a) => {
        a.line.geometry.dispose();
        (a.line.material as THREE.Material).dispose();
        a.plane?.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose();
            (o.material as THREE.Material).dispose();
          }
        });
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
