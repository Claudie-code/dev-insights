export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  open_issues_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
};
