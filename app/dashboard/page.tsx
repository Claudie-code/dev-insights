import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { UserInfo } from "./UserInfo";
import { RepoList } from "./RepoList";
import { Stats } from "./Stats";
import { LogoutButton } from "./LogoutButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "./DashboardCharts";
import { GithubRepo } from "@/types/github";
import { fetchRepos } from "@/lib/github/fetchRepos";
import { IAAnalysisCard } from "./IAAnalysisCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Accès au dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-center text-muted-foreground">
              Tu dois être connecté pour accéder au dashboard.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Se connecter avec GitHub</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const repos: GithubRepo[] = await fetchRepos(session.accessToken);

  if (!repos.length) {
    return <p>Aucun dépôt disponible pour le moment.</p>;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Dashboard GitHub</h1>
          <LogoutButton />
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Colonne gauche */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <UserInfo session={session} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <Stats repos={repos} />
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <IAAnalysisCard repos={repos} />

          <Card>
            <CardHeader>
              <CardTitle>Dépôts GitHub</CardTitle>
            </CardHeader>
            <CardContent>
              <RepoList repos={repos} />
            </CardContent>
          </Card>

          <DashboardCharts repos={repos} />
        </div>
      </section>
    </main>
  );
}
