import { GithubRepo } from "@/types/github";

type GithubRepoApi = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  open_issues_count: number;
  language: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics?: string[];
  license?: { name: string } | null;
  default_branch: string;
  homepage: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  forks_count: number;
  watchers_count: number;
  permissions?: Record<string, boolean>;
  languages_url: string;
  commits_url: string;
};

export async function fetchRepos(token: string): Promise<GithubRepo[]> {
  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  return (data as GithubRepoApi[]).map((repo) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    open_issues_count: repo.open_issues_count,
    language: repo.language,
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
