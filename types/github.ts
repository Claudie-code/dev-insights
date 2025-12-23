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
