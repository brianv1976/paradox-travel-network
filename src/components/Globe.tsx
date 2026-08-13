import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { decodeLandRings } from "../data/worldLand";
import GlobeFallback from "./GlobeFallback";

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

/** Cheap, side-effect-free check — a canvas that can't get a WebGL context
 *  means Three.js has no chance, so skip straight to the fallback instead
 *  of letting the renderer constructor throw. */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

const OCEAN = "#0e5f7d";
const OCEAN_DEEP = "#0a4a63";
const LAND_EDGE = "#c8862a";
const ATMOSPHERE = 0x5fd8ea;
const ARC_COLORS = [0xffd166, 0xff8a5b, 0x7ee787, 0x6fe3f5, 0xffb4a2];

const RADIUS = 1.55;

/** Warm, brand-adjacent tint bands by distance from the equator — stands
 *  in for real biome data so the land reads as textured, not flat. */
function bandColor(lat: number) {
  const a = Math.abs(lat);
  if (a < 12) return "#94a84f";
  if (a < 30) return "#eab54f";
  if (a < 50) return "#cf8b42";
  if (a < 65) return "#ab8a6a";
  return "#f2ead9";
}

/** Real coordinates for the destinations the site sells. Index 0 (DFW) is
 *  the hub every route originates from. `skipRoute` keeps a marker on the
 *  globe without drawing an arc to it — used for spots that sit too close
 *  to a neighboring destination for a second line to read cleanly. */
const DESTINATIONS: { name: string; lat: number; lng: number; skipRoute?: boolean }[] = [
  { name: "Dallas–Fort Worth", lat: 32.9, lng: -97.04 },
  { name: "Aruba", lat: 12.52, lng: -69.97 },
  { name: "Turks & Caicos", lat: 21.69, lng: -71.8 },
  { name: "The Bahamas", lat: 25.03, lng: -77.4 },
  { name: "St. Lucia", lat: 13.91, lng: -60.98 },
  { name: "Amalfi Coast", lat: 40.63, lng: 14.6 },
  { name: "Reykjavík", lat: 64.15, lng: -21.94 },
  { name: "The Maldives", lat: 3.2, lng: 73.22 },
  { name: "Kyoto", lat: 35.01, lng: 135.77 },
  { name: "Sydney", lat: -33.87, lng: 151.21 },
  { name: "Hawaii", lat: 21.31, lng: -157.86 },
  { name: "Cancún", lat: 21.16, lng: -86.85 },
  { name: "Santorini", lat: 36.39, lng: 25.46 },
  { name: "Juneau", lat: 58.3, lng: -134.42 },
  { name: "Machu Picchu", lat: -13.16, lng: -72.55 },
  { name: "Costa Rica", lat: 9.93, lng: -84.08 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Cape Town", lat: -33.92, lng: 18.42 },
  { name: "Marrakech", lat: 31.63, lng: -7.99 },
  { name: "Zanzibar", lat: -6.16, lng: 39.19 },
  { name: "Bali", lat: -8.34, lng: 115.09 },
  { name: "Fiji", lat: -17.71, lng: 178.02 },
  { name: "Rio de Janeiro", lat: -22.91, lng: -43.17 },
  { name: "Bangkok", lat: 13.75, lng: 100.5 },
  { name: "Boracay", lat: 11.97, lng: 121.93 },
  { name: "Moscow", lat: 55.75, lng: 37.62 },
  { name: "Paris", lat: 48.86, lng: 2.35 },
  { name: "Galápagos Islands", lat: -0.79, lng: -91.14 },
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Istanbul", lat: 41.01, lng: 28.98 },
  { name: "Madrid", lat: 40.42, lng: -3.7 },
  { name: "Serengeti", lat: -2.33, lng: 34.83 },
  { name: "Beijing", lat: 39.9, lng: 116.41 },
  { name: "Agra", lat: 27.18, lng: 78.02 },
  { name: "Cairo", lat: 29.98, lng: 31.13 },
  { name: "Victoria Falls", lat: -17.92, lng: 25.86 },
  { name: "Raja Ampat", lat: -0.5, lng: 130.5 },
];

/** Every route originates at DFW (index 0) — it's a DFW advisor's globe.
 *  Built from DESTINATIONS instead of hand-listed pairs so adding or
 *  removing a destination can't silently desync the route/index bookkeeping. */
const ROUTES: [number, number][] = DESTINATIONS.map((d, i) => [0, i] as [number, number]).filter(
  ([, i]) => i !== 0 && !DESTINATIONS[i].skipRoute
);

/** Destinations that get an animated aircraft + arrival label — named
 *  (not indexed) so the set survives DESTINATIONS being reordered or
 *  extended. A wide regional spread rather than everything at once. */
const FLOWN_NAMES = new Set([
  "The Bahamas",
  "Machu Picchu",
  "Reykjavík",
  "Paris",
  "Cape Town",
  "Dubai",
  "Bangkok",
  "Sydney",
  "Hawaii",
]);
const FLOWN = ROUTES.map(([, b], i) => (FLOWN_NAMES.has(DESTINATIONS[b].name) ? i : -1)).filter(
  (i) => i >= 0
);

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

  // Landmasses, tinted by latitude band so they read as textured, not flat.
  const rings = decodeLandRings();
  ctx.strokeStyle = LAND_EDGE;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";

  for (const flat of rings) {
    let latSum = 0;
    let n = 0;
    for (let i = 1; i < flat.length; i += 2) {
      latSum += flat[i];
      n++;
    }
    ctx.fillStyle = bandColor(n ? latSum / n : 0);

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

/**
 * All Three.js setup/teardown lives in this standalone function rather than
 * directly in the effect, so a construction-time failure can be caught by
 * the caller with a plain try/catch around the call. `onFail` covers the
 * failure modes a try/catch can't: an error thrown later inside the
 * requestAnimationFrame loop, or the GPU context dying mid-session — both
 * happen asynchronously, after `mountGlobe` has already returned normally.
 */
function mountGlobe(mount: HTMLDivElement, reduce: boolean, onFail: () => void): () => void {
  const scene = new THREE.Scene();
  const fov = 42;
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  const baseDist = (RADIUS * 1.22) / Math.tan((fov / 2) * (Math.PI / 180));
  camera.position.z = baseDist;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  mount.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = "grab";
  renderer.domElement.style.touchAction = "pan-y";

  // Arrival labels ("landing" callouts) live in a plain DOM layer on top
  // of the canvas — cheaper than sprite-based text and easier to read.
  mount.style.position = "relative";
  const labelLayer = document.createElement("div");
  labelLayer.style.position = "absolute";
  labelLayer.style.inset = "0";
  labelLayer.style.overflow = "hidden";
  labelLayer.style.pointerEvents = "none";
  mount.appendChild(labelLayer);

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
  const markers: {
    sprite: THREE.Sprite;
    base: number;
    phase: number;
    point: THREE.Vector3;
    labelEl?: HTMLDivElement;
    peakFacing: number;
  }[] = [];

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

    // Solid pin dot so the location reads even against bright land.
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(isHome ? 0.022 : 0.015, 12, 12),
      new THREE.MeshBasicMaterial({ color: isHome ? 0xff8a5b : 0xfff3d6 })
    );
    dot.position.copy(p);
    globe.add(dot);

    // Every destination but the home hub gets a callout that fades in
    // when it rotates into view near the front of the globe.
    let labelEl: HTMLDivElement | undefined;
    if (!isHome) {
      labelEl = document.createElement("div");
      labelEl.textContent = DESTINATIONS[i].name;
      labelEl.style.position = "absolute";
      labelEl.style.left = "0";
      labelEl.style.top = "0";
      labelEl.style.padding = "5px 12px";
      labelEl.style.borderRadius = "999px";
      labelEl.style.background = "rgba(14,31,38,0.85)";
      labelEl.style.color = "#fdf6e8";
      labelEl.style.fontSize = "12px";
      labelEl.style.fontWeight = "600";
      labelEl.style.letterSpacing = "0.04em";
      labelEl.style.whiteSpace = "nowrap";
      labelEl.style.opacity = "0";
      labelEl.style.willChange = "transform, opacity";
      labelLayer.appendChild(labelEl);
    }

    markers.push({ sprite, base, phase: i * 0.8, point: p, labelEl, peakFacing: 0.05 });
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

  // WebGL context loss (GPU reset, driver crash, too many contexts open) is
  // reported via this event, not a thrown exception — without listening for
  // it the canvas would just go permanently blank while the rAF loop keeps
  // silently spinning.
  let contextLost = false;
  const onContextLost = (e: Event) => {
    e.preventDefault();
    contextLost = true;
    cancelAnimationFrame(raf);
    onFail();
  };
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);

  // --- Loop ---------------------------------------------------------------
  let raf = 0;
  let t = 0;
  const clock = new THREE.Clock();
  const fwd = new THREE.Vector3();
  const up = new THREE.Vector3();
  const right = new THREE.Vector3();
  const trueUp = new THREE.Vector3();
  const basis = new THREE.Matrix4();
  const worldPos = new THREE.Vector3();
  const outward = new THREE.Vector3();
  const viewDir = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  // Fraction of a destination's own tracked peak facing value it needs
  // to reach before its callout starts fading in (see note below).
  const FRONT_THRESHOLD = 0.82;
  const FRONT_RANGE = 0.14;

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
    globe.updateWorldMatrix(true, false);

    markers.forEach((m) => {
      const s = m.base * (1 + Math.sin(t * 1.5 + m.phase) * 0.2);
      m.sprite.scale.setScalar(reduce ? m.base : s);

      // Callout fades in as a destination rotates through the front of
      // the globe, and out again as it turns away — no plane required.
      // Triggered relative to each destination's OWN best-ever facing
      // value rather than a fixed dot-product: at this globe's gentle
      // idle tilt, a high-latitude spot like Reykjavík can only ever
      // reach a shallow facing value (~0.24) versus ~0.98 for something
      // near the equator, so a single absolute threshold would either
      // flood the screen with equatorial labels or never show the poles.
      if (m.labelEl) {
        worldPos.copy(m.point);
        globe.localToWorld(worldPos);
        outward.copy(worldPos).normalize();
        viewDir.copy(camera.position).sub(worldPos).normalize();
        const facing = outward.dot(viewDir);
        m.peakFacing = Math.max(m.peakFacing, facing);
        const ratio = facing / m.peakFacing;
        const strength = Math.max(0, (ratio - FRONT_THRESHOLD) / FRONT_RANGE);
        const eased = Math.min(1, strength * strength);

        if (eased > 0.01) {
          ndc.copy(worldPos).project(camera);
          const mw = mount.clientWidth || 1;
          const mh = mount.clientHeight || 1;
          const sx = (ndc.x * 0.5 + 0.5) * mw;
          const sy = (-ndc.y * 0.5 + 0.5) * mh;
          m.labelEl.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -170%)`;
          m.labelEl.style.opacity = String(eased);
        } else {
          m.labelEl.style.opacity = "0";
        }
      }
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

    // A render-time failure here (e.g. context loss slipping through before
    // the event fires) is caught rather than left to crash the rAF chain —
    // it's reported once and the loop stops instead of throwing every frame.
    try {
      renderer.render(scene, camera);
    } catch (err) {
      if (!contextLost) {
        console.error("Globe render failed, falling back to static view:", err);
        onFail();
      }
      return;
    }
    raf = requestAnimationFrame(animate);
  };

  const resize = () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
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
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
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
    if (mount.contains(labelLayer)) mount.removeChild(labelLayer);
  };
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !isWebGLAvailable()) {
      if (mount) setFailed(true);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup: (() => void) | undefined;

    try {
      cleanup = mountGlobe(mount, reduce, () => setFailed(true));
    } catch (err) {
      console.error("Globe failed to initialize, falling back to static view:", err);
      setFailed(true);
    }

    return () => cleanup?.();
  }, []);

  if (failed) return <GlobeFallback />;

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
