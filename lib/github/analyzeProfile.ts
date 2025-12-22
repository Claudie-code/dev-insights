import { GithubRepo } from "@/types/github";

export function analyzeProfile(repos: GithubRepo[]) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
  const totalIssues = repos.reduce((acc, r) => acc + r.open_issues_count, 0);

  const profileStats = {
    totalStars,
    totalForks,
    totalIssues,
  };

  return profileStats;
}
