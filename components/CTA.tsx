import Link from "next/link";

export function CTA({ session }: { session: boolean }) {
  return (
    <section className="w-full py-24 bg-white">
      <div className="mx-auto max-w-4xl text-center px-6">
        <h2 className="text-3xl font-semibold">
          Ready to understand your GitHub profile?
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Connect your account and get actionable insights in minutes.
        </p>
        <Link
          href={session ? "/dashboard" : "/login"}
          className="mt-8 inline-block rounded-md bg-cyan-700 text-white hover:bg-cyan-800 px-8 py-4 font-bold"
        >
          {session ? "📊 View Dashboard" : "🤖 Connect with GitHub"}
        </Link>
      </div>
    </section>
  );
}
