import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight interactive globe built on pure three.js (no R3F) so it installs
 * and runs reliably inside Bolt's in-browser environment.
 *
 * - Fibonacci dot sphere (the "continents of dots" look)
 * - Glowing destination markers + animated great-circle arcs
 * - Auto-rotates and gently parallaxes toward the cursor
 * - Respects prefers-reduced-motion and cleans up fully on unmount
 */

const OCEAN = 0x0e4b46;
const OCEAN_LIGHT = 0x2f7d74;
const CLAY = 0xcc6b3e;
const GOLD = 0xc8a24c;

// A few real destinations (lat, lng) to place markers + arcs.
const DESTINATIONS: [number, number][] = [
  [25.79, -80.13], // Miami (cruise hub)
  [20.65, -87.07], // Riviera Maya
  [64.15, -21.94], // Reykjavik
  [41.9, 12.5], // Rome
  [-33.87, 151.21], // Sydney
  [35.68, 139.69], // Tokyo
  [-13.16, -72.54], // Machu Picchu
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const RADIUS = 1.6;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    // --- Dotted sphere (fibonacci distribution) ---
    const DOTS = 1400;
    const positions = new Float32Array(DOTS * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions[i * 3] = Math.cos(theta) * r * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: OCEAN,
      size: 0.028,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // --- Inner translucent shell + wire halo ---
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 0.985, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0xf7f4ef,
        transparent: true,
        opacity: 0.04,
      })
    );
    globe.add(shell);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(RADIUS * 1.002, 2)),
      new THREE.LineBasicMaterial({
        color: OCEAN_LIGHT,
        transparent: true,
        opacity: 0.14,
      })
    );
    globe.add(wire);

    // --- Destination markers ---
    const markerGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: CLAY });
    const haloMat = new THREE.MeshBasicMaterial({
      color: CLAY,
      transparent: true,
      opacity: 0.28,
    });
    const points = DESTINATIONS.map(([lat, lng]) =>
      latLngToVector3(lat, lng, RADIUS * 1.01)
    );
    points.forEach((p) => {
      const m = new THREE.Mesh(markerGeo, markerMat);
      m.position.copy(p);
      globe.add(m);
      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), haloMat);
      halo.position.copy(p);
      globe.add(halo);
    });

    // --- Animated arcs between consecutive destinations ---
    const arcs: { line: THREE.Line; length: number }[] = [];
    for (let i = 0; i < points.length; i++) {
      const start = points[i];
      const end = points[(i + 1) % points.length];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const lift = 1 + start.distanceTo(end) * 0.35;
      mid.normalize().multiplyScalar(RADIUS * lift);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(60);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.85,
      });
      const line = new THREE.Line(geo, mat);
      globe.add(line);
      arcs.push({ line, length: pts.length });
    }

    // --- Interaction: cursor parallax ---
    const target = { x: 0.35, y: -0.15 };
    const current = { x: 0.35, y: -0.15 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = 0.35 + ny * 0.5;
      target.y = -0.15 + nx * 0.8;
    };
    window.addEventListener("pointermove", onPointer);

    // --- Animation loop ---
    let raf = 0;
    let t = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      t += dt;
      if (!reduce) globe.rotation.y += dt * 0.12;
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      globe.rotation.x = current.x;
      globe.rotation.z = 0;

      // draw arcs progressively, looping
      arcs.forEach((a, i) => {
        const phase = (t * 0.25 + i / arcs.length) % 1;
        const count = Math.floor(phase * a.length);
        a.line.geometry.setDrawRange(0, count);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // --- Resize ---
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
