import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!session ? (
        <Link
          href="/login"
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold"
        >
          Se connecter avec GitHub
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-bold"
        >
          Accéder au dashboard
        </Link>
      )}
    </div>
  );
}
