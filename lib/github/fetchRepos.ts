import { GithubRepo } from "@/types/github";

export async function fetchRepos(token: string): Promise<GithubRepo[]> {
  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];

  const data = await res.json();

  // keep only useful data
  return data.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    open_issues_count: repo.open_issues_count,
    language: repo.language ?? null,
    fork: repo.fork,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    size: repo.size,
    topics: repo.topics ?? [],
    license: repo.license?.name ?? null,
    default_branch: repo.default_branch,
    homepage: repo.homepage,
    has_issues: repo.has_issues,
    has_projects: repo.has_projects,
    has_wiki: repo.has_wiki,
    forks_count: repo.forks_count,
    watchers_count: repo.watchers_count,
    permissions: repo.permissions,
    languages_url: repo.languages_url,
    commits_url: repo.commits_url,
  }));
}
