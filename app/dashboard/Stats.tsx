import { BarChart3 } from "lucide-react";

export function Stats({ repos }: { repos: any[] }) {
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );
  const totalIssues = repos.reduce(
    (acc, repo) => acc + repo.open_issues_count,
    0
  );

  return (
    <div className="space-y-1">
      <ul className="text-sm space-y-1 text-muted-foreground">
        <li>Total dépôts : {repos.length}</li>
        <li>Total étoiles : {totalStars}</li>
        <li>Issues ouvertes : {totalIssues}</li>
      </ul>
    </div>
  );
}
