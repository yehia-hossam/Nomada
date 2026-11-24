import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="h-display text-[28vw] md:text-[16vw]">404</h1>
      <p className="h-serif text-3xl">This road does not lead anywhere yet.</p>
      <Link href="/" className="rounded-full bg-accent px-7 py-3 font-semibold text-accent-ink">Back to the start</Link>
    </main>
  );
}
