import { GithubRepo } from "@/types/github";

export function Stats({ repos }: { repos: GithubRepo[] }) {
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
      <ul className="space-y-1">
        <li className="flex justify-between">
          <span>Total dépôts</span>{" "}
          <span className="text-sm text-muted-foreground">{repos.length}</span>
        </li>
        <li className="flex justify-between">
          <span>Total étoiles</span>{" "}
          <span className="text-sm text-muted-foreground">{totalStars}</span>
        </li>
        <li className="flex justify-between">
          <span>Issues ouvertes</span>{" "}
          <span className="text-sm text-muted-foreground">{totalIssues}</span>
        </li>
      </ul>
    </div>
  );
}
