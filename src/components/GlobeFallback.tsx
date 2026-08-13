/** Static stand-in for the Globe when WebGL is unavailable or fails —
 *  same ocean/gold palette, no motion, no WebGL required. */
export default function GlobeFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center"
    >
      <div
        className="h-[70%] w-[70%] rounded-full shadow-lift"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #5fd8ea, #0e5f7d 45%, #0a4a63 100%)",
          boxShadow: "0 0 80px rgba(95, 216, 234, 0.25)",
        }}
      />
    </div>
  );
}
