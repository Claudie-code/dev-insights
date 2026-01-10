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

      <section className="max-w-7xl mx-auto px-6 py-10 grid gap-6 grid-cols-1 md:grid-cols-4">
        <IAAnalysisCard repos={repos} />

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

        <Card>
          <CardHeader>
            <CardTitle>Langages principaux</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(
                repos.reduce<Record<string, number>>((acc, r) => {
                  if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
                  return acc;
                }, {})
              )
                .slice(0, 3)
                .map(([lang, count]) => (
                  <li key={lang} className="flex justify-between">
                    <span>{lang}</span>
                    <span className="text-sm text-muted-foreground">
                      {count}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Derniers repos mis à jour</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 max-h-40 overflow-y-auto">
              {repos
                .sort(
                  (a, b) =>
                    new Date(b.pushed_at).getTime() -
                    new Date(a.pushed_at).getTime()
                ) // Trie par date de dernière mise à jour
                .slice(0, 3)
                .map((repo) => (
                  <li key={repo.id} className="flex justify-between">
                    <span>{repo.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(repo.pushed_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dépôts GitHub</CardTitle>
          </CardHeader>
          <CardContent>
            <RepoList repos={repos} />
          </CardContent>
        </Card>

        <DashboardCharts repos={repos} />
      </section>
    </main>
  );
}
