import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevInsight
        </p>
      </div>
    </footer>
  );
}
