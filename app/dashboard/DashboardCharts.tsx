"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, GitCommit } from "lucide-react";

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function DashboardCharts({ repos }: { repos: any[] }) {
  // 🔹 Top 5 repos par commits (on utilise 'size' comme proxy si commits non disponibles)
  const topReposByCommits = [...repos]
    .sort((a, b) => (b.size || 0) - (a.size || 0))
    .slice(0, 5);

  const commitsData = {
    labels: topReposByCommits.map((r) => r.name),
    datasets: [
      {
        label: "Commits (proxy par taille)",
        data: topReposByCommits.map((r) => r.size || 0),
        backgroundColor: "rgba(99,102,241,0.7)",
      },
    ],
  };

  // 🔹 Répartition des langages
  const languageCount: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      languageCount[r.language] = (languageCount[r.language] || 0) + 1;
    }
  });

  const languageData = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        data: Object.values(languageCount),
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#ec4899",
        ],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* Top 5 commits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="w-5 h-5" /> Top 5 repos par commits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={commitsData} />
        </CardContent>
      </Card>

      {/* Langages utilisés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" /> Répartition des langages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={languageData} />
        </CardContent>
      </Card>
    </div>
  );
}
