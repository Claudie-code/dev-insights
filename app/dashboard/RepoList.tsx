"use client";

import { ExternalLink, Star, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GithubRepo } from "@/types/github";

export function RepoList({ repos }: { repos: GithubRepo[] }) {
  return (
    <ScrollArea className="h-[60vh]">
      {repos.length === 0 ? (
        <p className="text-muted-foreground">Aucun dépôt trouvé.</p>
      ) : (
        <ul className="space-y-3">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/30 transition"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium flex items-center gap-2 text-primary"
              >
                {repo.name}
                <ExternalLink size={16} />
              </a>
              <span className="text-xs text-muted-foreground flex gap-3">
                <span className="flex items-center gap-1">
                  <Star size={14} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle size={14} /> {repo.open_issues_count}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  );
}
