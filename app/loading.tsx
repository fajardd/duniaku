export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5 p-6"
      style={{ background: "linear-gradient(135deg, #0b0b1a 0%, #1a0a2e 30%, #16213e 60%, #0d1b2a 100%)" }}
    >
      <div className="animate-heart-beat text-5xl">🌸</div>
      <div className="space-y-3 w-56">
        <div className="h-2.5 rounded-full animate-shimmer" />
        <div className="h-2.5 w-3/4 mx-auto rounded-full animate-shimmer" />
        <div className="h-2.5 w-1/2 mx-auto rounded-full animate-shimmer" />
      </div>
      <p className="text-sm" style={{ color: "#a89b8c" }}>Memuat dunia...</p>
    </div>
  );
}
