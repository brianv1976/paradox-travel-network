import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D pinned travel corkboard — the hero's dynamic visual, reusing the same
 * lightweight pure three.js approach as the earlier Globe (installs and runs
 * reliably inside Bolt's in-browser environment).
 *
 * - A tilted board with postcard-style destination cards floating above it
 * - Each card is a canvas-drawn texture (rounded card, pin dot, label)
 * - Gold "hand-drawn" routes animate between a few cards on a loop
 * - Cards bob gently; the whole board sways and parallaxes toward the cursor
 * - Respects prefers-reduced-motion and cleans up fully on unmount
 */

const CREAM = "#F7F4EF";
const SAND = "#ECE4D6";
const INK = "#1B1A17";
const OCEAN = "#08899E";
const OCEAN_LIGHT = "#2AA7BC";
const CLAY = "#F5AB2B";
const CLAY_DARK = "#D48F16";
const GOLD = "#C8A24C";

const DESTINATIONS: { label: string; accent: string; tape: string }[] = [
  { label: "Cancún", accent: OCEAN, tape: CLAY },
  { label: "Rome", accent: CLAY_DARK, tape: OCEAN_LIGHT },
  { label: "Santorini", accent: OCEAN_LIGHT, tape: CLAY_DARK },
  { label: "Tokyo", accent: GOLD, tape: OCEAN },
  { label: "Machu Picchu", accent: CLAY, tape: OCEAN_LIGHT },
  { label: "Reykjavík", accent: OCEAN, tape: CLAY },
];

// Hand-placed positions (x, y) so the board reads as a loose, casual pin
// layout rather than a grid — plus a z depth for parallax layering.
const LAYOUT: { x: number; y: number; z: number; rot: number }[] = [
  { x: -1.05, y: 0.55, z: 0.3, rot: -0.08 },
  { x: 0.15, y: 0.85, z: 0, rot: 0.05 },
  { x: 1.05, y: 0.35, z: 0.35, rot: 0.09 },
  { x: -0.75, y: -0.55, z: 0.15, rot: 0.06 },
  { x: 0.6, y: -0.75, z: 0.3, rot: -0.07 },
  { x: -0.05, y: -0.05, z: 0.55, rot: -0.03 },
];

// Which cards get a route drawn between them (indexes into DESTINATIONS).
const ROUTES: [number, number][] = [
  [0, 1],
  [1, 2],
  [3, 5],
  [4, 5],
];

function createPostcardTexture(label: string, accent: string, tape: string) {
  const canvas = document.createElement("canvas");
  const w = 320;
  const h = 232;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const top = 24;

  const r = 18;
  ctx.save();
  ctx.shadowColor = "rgba(27, 26, 23, 0.32)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  roundRect(ctx, 10, top, w - 20, h - top - 10, r);
  ctx.fillStyle = CREAM;
  ctx.fill();
  ctx.restore();

  roundRect(ctx, 10, top, w - 20, h - top - 10, r);
  ctx.lineWidth = 3;
  ctx.strokeStyle = accent;
  ctx.stroke();

  // washi tape, angled across the top-left corner
  ctx.save();
  ctx.translate(58, top);
  ctx.rotate(-0.35);
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = tape;
  ctx.fillRect(-38, -14, 76, 28);
  ctx.restore();

  // pin dot
  ctx.beginPath();
  ctx.arc(w / 2, top + 24, 7, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();

  // label
  ctx.fillStyle = INK;
  ctx.font = "600 30px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, w / 2, top + (h - top) / 2 + 14);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function createShadowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grad.addColorStop(0, "rgba(27, 26, 23, 0.32)");
  grad.addColorStop(0.7, "rgba(27, 26, 23, 0.14)");
  grad.addColorStop(1, "rgba(27, 26, 23, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function TravelBoard() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const board = new THREE.Group();
    board.rotation.x = -0.18;
    scene.add(board);

    // --- Soft board backdrop (the "cork") ---
    const backdrop = new THREE.Mesh(
      new THREE.CircleGeometry(2.5, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(SAND),
        transparent: true,
        opacity: 0.5,
      })
    );
    backdrop.position.z = -0.6;
    board.add(backdrop);

    // --- Routes (drawn beneath the cards, animated draw-in) ---
    const arcs: { line: THREE.Line; length: number }[] = [];
    ROUTES.forEach(([a, b]) => {
      const start = new THREE.Vector3(LAYOUT[a].x, LAYOUT[a].y, LAYOUT[a].z);
      const end = new THREE.Vector3(LAYOUT[b].x, LAYOUT[b].y, LAYOUT[b].z);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.y += 0.35;
      mid.z += 0.15;
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(48);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineDashedMaterial({
        color: new THREE.Color(GOLD),
        transparent: true,
        opacity: 0.8,
        dashSize: 0.05,
        gapSize: 0.04,
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      board.add(line);
      arcs.push({ line, length: pts.length });
    });

    // --- Postcard cards ---
    const shadowTex = createShadowTexture();
    const cards: {
      mesh: THREE.Mesh;
      shadow: THREE.Sprite;
      baseY: number;
      phase: number;
      baseRot: number;
    }[] = [];
    DESTINATIONS.forEach((dest, i) => {
      const layout = LAYOUT[i];
      const tex = createPostcardTexture(dest.label, dest.accent, dest.tape);
      const cardW = 1.15;
      const cardH = 0.83;

      const shadow = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: shadowTex, transparent: true, opacity: 0.9 })
      );
      shadow.scale.set(cardW * 1.5, cardW * 1.5, 1);
      shadow.position.set(layout.x + 0.06, layout.y - 0.09, layout.z - 0.08);
      board.add(shadow);

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(cardW, cardH),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true })
      );
      mesh.position.set(layout.x, layout.y, layout.z);
      mesh.rotation.z = layout.rot;
      board.add(mesh);

      cards.push({
        mesh,
        shadow,
        baseY: layout.y,
        phase: i * 1.1,
        baseRot: layout.rot,
      });
    });

    // --- Ambient floating motes (fills the empty space, adds color + drift) ---
    const MOTE_COUNT = 26;
    const motePositions = new Float32Array(MOTE_COUNT * 3);
    const moteColors = new Float32Array(MOTE_COUNT * 3);
    const moteAccents = [OCEAN, OCEAN_LIGHT, CLAY, CLAY_DARK, GOLD].map(
      (c) => new THREE.Color(c)
    );
    for (let i = 0; i < MOTE_COUNT; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 3.6;
      motePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      motePositions[i * 3 + 2] = -0.3 + Math.random() * 0.9;
      const c = moteAccents[i % moteAccents.length];
      moteColors[i * 3] = c.r;
      moteColors[i * 3 + 1] = c.g;
      moteColors[i * 3 + 2] = c.b;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute("position", new THREE.BufferAttribute(motePositions, 3));
    moteGeo.setAttribute("color", new THREE.BufferAttribute(moteColors, 3));
    const moteMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    board.add(motes);

    // --- Interaction: cursor parallax ---
    const target = { x: -0.18, y: 0 };
    const current = { x: -0.18, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = -0.18 + ny * 0.22;
      target.y = nx * 0.3;
    };
    window.addEventListener("pointermove", onPointer);

    // --- Animation loop ---
    let raf = 0;
    let t = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      t += dt;

      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      board.rotation.x = current.x;
      board.rotation.y = current.y + (reduce ? 0 : Math.sin(t * 0.18) * 0.05);

      if (!reduce) {
        cards.forEach((c) => {
          const bob = Math.sin(t * 0.6 + c.phase) * 0.06;
          c.mesh.position.y = c.baseY + bob;
          c.mesh.rotation.z = c.baseRot + Math.sin(t * 0.4 + c.phase) * 0.025;
          c.shadow.position.y = c.baseY - 0.09 + bob * 0.4;
        });

        arcs.forEach((a, i) => {
          const phase = (t * 0.2 + i / arcs.length) % 1;
          const count = Math.floor(phase * a.length);
          a.line.geometry.setDrawRange(0, count);
        });

        motes.rotation.z = t * 0.02;
        const moteAttr = motes.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < MOTE_COUNT; i++) {
          const y = moteAttr.getY(i) + Math.sin(t * 0.3 + i) * 0.0006;
          moteAttr.setY(i, y);
        }
        moteAttr.needsUpdate = true;
      }

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
      cards.forEach((c) => {
        (c.mesh.material as THREE.MeshBasicMaterial).map?.dispose();
        (c.mesh.material as THREE.Material).dispose();
        c.mesh.geometry.dispose();
        (c.shadow.material as THREE.SpriteMaterial).dispose();
      });
      shadowTex.dispose();
      arcs.forEach((a) => {
        a.line.geometry.dispose();
        (a.line.material as THREE.Material).dispose();
      });
      moteGeo.dispose();
      moteMat.dispose();
      backdrop.geometry.dispose();
      (backdrop.material as THREE.Material).dispose();
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
