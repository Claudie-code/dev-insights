import Image from "next/image";
import Link from "next/link";

export function Hero({ session }: { session: boolean }) {
  return (
    <section className="w-full flex flex-col-reverse lg:flex-row gap-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0 min-h-[700px]">
      {/* Texte */}
      <div className="flex-1 text-left order-2 lg:order-1">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Boost your GitHub profile with AI insights
        </h1>
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 max-w-xl">
          Connect your GitHub account to get detailed stats, trends, and
          personalized recommendations to improve your dev skills.
        </p>
        <div className="mt-8">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="inline-block px-8 py-4 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 transition text-lg"
          >
            {session ? "📊 View Dashboard" : "🤖 Connect with GitHub"}
          </Link>
        </div>
      </div>

      {/* Mock dashboard preview */}
      <div className="flex-1 relative w-full order-1 lg:order-2 lg:h-[500px] h-auto">
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src="/mock-dashboard.png"
            alt="Dashboard preview"
            fill={false}
            width={800}
            height={500}
            className="w-full h-auto object-contain object-center"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
