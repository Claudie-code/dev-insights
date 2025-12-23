"use client";

import { useState } from "react";
import { GithubRepo } from "@/types/github";
import { analyzeProfile, ProfileAnalysis } from "@/lib/github/analyzeProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IAAnalysisCard({ repos }: { repos: GithubRepo[] }) {
  const [analysis, setAnalysis] = useState<ProfileAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReco, setShowReco] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setShowReco(false);

    // simulation calcul "IA"
    await new Promise((res) => setTimeout(res, 1200));

    const result = analyzeProfile(repos);
    setAnalysis(result);

    setShowReco(true);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Analyse IA du profil GitHub
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Bouton analyse */}
        {!showReco && (
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Lancer l’analyse avancée
          </Button>
        )}

        {/* Recommandations */}
        {showReco && analysis && (
          <>
            {/* Niveau */}
            <div className="rounded-lg bg-gray-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Niveau estimé</p>
                  <p className="text-2xl font-bold">
                    {analysis.complexityAnalysis.level}
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <p className="text-sm font-medium mb-2 ">
                  Pourquoi ce niveau ?
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {analysis.complexityAnalysis.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Points forts */}
            <div>
              <p className="font-semibold mb-2">Points forts</p>
              {analysis.strengths.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {analysis.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun point fort détecté.
                </p>
              )}
            </div>
            {/* Axes d'amélioration */}
            <div>
              <p className="font-semibold mb-2">Axes d’amélioration</p>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.improvements.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
            <div className="border-t pt-6 space-y-4">
              <p className="font-semibold">Recommandations personnalisées</p>

              {analysis.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{rec.title}</p>
                    <Badge
                      variant={
                        rec.priority === "high"
                          ? "destructive"
                          : rec.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
