import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen gap-6 p-6"
      style={{
        background:
          "linear-gradient(135deg, #0b0b1a 0%, #1a0a2e 30%, #16213e 60%, #0d1b2a 100%)",
      }}
    >
      <div className="glass-card p-12 text-center max-w-sm space-y-4">
        <div className="text-5xl">🌙</div>
        <h2
          className="text-xl font-bold text-gradient"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-sm" style={{ color: "#a89b8c" }}>
          Sepertinya kamu tersesat di dunia yang salah...
        </p>
        <Link
          href="/"
          className="inline-block mt-4 btn-gradient text-sm px-6 py-2.5 rounded-full no-underline"
        >
          Kembali ke Duniaku
        </Link>
      </div>
    </div>
  );
}
