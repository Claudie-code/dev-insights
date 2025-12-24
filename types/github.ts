export type GithubRepoApi = {
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

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  open_issues_count: number;
  language: string | null;
  forks_count: number;
  size: number;
  pushed_at: string;
  default_branch: string;
}
