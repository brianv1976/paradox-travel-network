import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { smooth } from "../lib/motion";

type Photo = { src: string; alt: string };
type Role = "front" | "backLeft" | "backRight";

interface Props {
  /** Pool of real, logo-free destination photos — three sit visible at
   *  once (front + two receding into the background); content cycles
   *  through the rest of the pool over time. Needs at least 6-8. */
  photos: Photo[];
}

const SHUFFLE_MS = 5500;

// front's next stop is the back (it just had its turn); backLeft moves up
// to front; backRight moves up to backLeft. A closed 3-way loop — every
// card slot always exists, so nothing ever fades, pops, or flies off.
const NEXT_ROLE: Record<Role, Role> = {
  front: "backRight",
  backLeft: "front",
  backRight: "backLeft",
};

// No opacity anywhere — depth reads through size, rotation, and z-depth
// instead, so the shuffle is pure position/rotation motion.
const ROLE_STYLE: Record<
  Role,
  { left: string; top: string; width: string; height: string; rotate: number; zIndex: number }
> = {
  front: { left: "17%", top: "9%", width: "66%", height: "82%", rotate: 0, zIndex: 3 },
  backLeft: { left: "2%", top: "10%", width: "52%", height: "70%", rotate: -9, zIndex: 2 },
  backRight: { left: "50%", top: "14%", width: "50%", height: "68%", rotate: 8, zIndex: 1 },
};

// Depth (translateZ) is what actually pushes back-left/back-right visibly
// into the background behind the front card.
const DEPTH_BY_ROLE: Record<Role, number> = { front: 42, backLeft: -72, backRight: -52 };
const RATE_BY_ROLE: Record<Role, { x: number; y: number; invert?: boolean }> = {
  front: { x: 10, y: 8 },
  backLeft: { x: 18, y: 11, invert: true },
  backRight: { x: 17, y: 13 },
};

type Card = { id: number; role: Role; photoIdx: number };

/**
 * Layered photo stack for the Book It Yourself hero — three physical card
 * slots that always exist (front, and two receding into the background at
 * different depths). Every few seconds the slots rotate roles in a closed
 * loop — front moves to the back, the two behind step forward — and the
 * card arriving at back-right (the deepest, least visible slot) picks up
 * the next photo from the pool, so content keeps cycling through all of
 * them without ever popping, fading, or flying off screen.
 *
 * Cursor position adds a gentle scene tilt plus per-card parallax at each
 * card's own depth, driven imperatively via refs + requestAnimationFrame
 * so pointer movement never triggers a React re-render — only the slower
 * role-rotation (every few seconds) touches state.
 */
export default function HeroPhotoStack({ photos }: Props) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const sheenRef = useRef<HTMLDivElement | null>(null);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const pointerActive = useRef(false);
  const isCoarsePointer = useRef(false);

  const len = photos.length;
  const [cards, setCards] = useState<Card[]>(() => [
    { id: 0, role: "front", photoIdx: 0 },
    { id: 1, role: "backLeft", photoIdx: 1 % Math.max(len, 1) },
    { id: 2, role: "backRight", photoIdx: 2 % Math.max(len, 1) },
  ]);
  const cardsRef = useRef(cards);
  const poolPtr = useRef(3);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    isCoarsePointer.current = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;
  }, []);

  useEffect(() => {
    if (len < 3 || reduce) return;
    const id = setInterval(() => {
      setCards((prev) =>
        prev.map((card) => {
          const wasFront = card.role === "front";
          return {
            ...card,
            role: NEXT_ROLE[card.role],
            // The card leaving front picks up a fresh photo as it heads
            // to the back — by the time it's prominent again it's already
            // showing something new.
            photoIdx: wasFront ? poolPtr.current++ % len : card.photoIdx,
          };
        })
      );
    }, SHUFFLE_MS);
    return () => clearInterval(id);
  }, [len, reduce]);

  // Single persistent rAF loop — started once, reads current roles from
  // cardsRef every frame so it never needs to restart on shuffle.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (reduce) {
      scene.style.transform = "rotateX(0deg) rotateY(0deg)";
      Object.values(cardRefs.current).forEach((el) => {
        el?.style.setProperty("--parallax", "translate3d(0,0,0)");
      });
      return;
    }

    let raf = 0;
    const start = performance.now();
    const idleAmplitude = isCoarsePointer.current ? 0.06 : 0.14;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const idleX = Math.sin((t / 2.8) * Math.PI * 2) * idleAmplitude;
      const idleY = Math.cos((t / 3.1) * Math.PI * 2) * idleAmplitude;
      const goal = pointerActive.current ? target.current : { x: idleX, y: idleY };

      current.current.x += (goal.x - current.current.x) * 0.075;
      current.current.y += (goal.y - current.current.y) * 0.075;
      const { x: cx, y: cy } = current.current;

      scene.style.transform = `rotateX(${(-cy * 3.2).toFixed(3)}deg) rotateY(${(cx * 5.2).toFixed(3)}deg)`;

      cardsRef.current.forEach((card) => {
        const el = cardRefs.current[card.id];
        if (!el) return;
        const rate = RATE_BY_ROLE[card.role];
        const sign = rate.invert ? -1 : 1;
        const depth = DEPTH_BY_ROLE[card.role];
        el.style.setProperty(
          "--parallax",
          `translate3d(${(sign * cx * rate.x).toFixed(2)}px, ${(sign * cy * rate.y).toFixed(2)}px, ${depth}px)`
        );
      });

      if (sheenRef.current) {
        sheenRef.current.style.backgroundPosition = `${50 + cx * 30}% ${50 + cy * 30}%`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    if (isCoarsePointer.current) return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    target.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
    pointerActive.current = true;
  };

  const onLeave = () => {
    pointerActive.current = false;
  };

  if (len < 3) return null;

  return (
    <div
      ref={stageRef}
      onPointerMove={reduce ? undefined : onMove}
      onPointerLeave={reduce ? undefined : onLeave}
      className="relative h-full w-full"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[60%] top-[55%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean/20 blur-3xl" />

      <div
        ref={sceneRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {cards.map((card) => {
          const s = ROLE_STYLE[card.role];
          const photo = photos[card.photoIdx];
          return (
            <motion.div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              aria-hidden={card.role !== "front"}
              animate={{
                left: s.left,
                top: s.top,
                width: s.width,
                height: s.height,
                rotate: s.rotate,
                zIndex: s.zIndex,
              }}
              transition={{ duration: reduce ? 0 : 0.9, ease: smooth }}
              className="absolute overflow-hidden shadow-lift"
              style={{
                borderRadius: card.role === "front" ? "2rem" : "1.5rem",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ transform: "var(--parallax, translate3d(0,0,0))" }}
              >
                <img
                  src={photo.src}
                  alt={card.role === "front" ? photo.alt : ""}
                  className="h-full w-full object-cover"
                />
                {card.role === "front" && (
                  <div
                    ref={sheenRef}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16), transparent 55%)",
                      backgroundSize: "160% 160%",
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
