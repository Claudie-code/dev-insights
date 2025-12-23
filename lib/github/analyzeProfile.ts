// lib/analyzeProfile.ts
import { GithubRepo } from "@/types/github";

export interface ProfileAnalysis {
  strengths: string[];
  improvements: string[];
  complexityAnalysis: ComplexityAnalysis;
  recommendations: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }[];
}

export interface ComplexityAnalysis {
  level: "Débutant" | "Intermédiaire" | "Avancé";
  reasons: string[];
  metrics: {
    avgRepoSize: number;
    avgForks: number;
    repoCount: number;
    activeRepos: number;
  };
}

function analyzeComplexity(repos: GithubRepo[]): ComplexityAnalysis {
  const reasons: string[] = [];

  const avgRepoSize = repos.reduce((a, r) => a + r.size, 0) / repos.length;

  const avgForks = repos.reduce((a, r) => a + r.forks_count, 0) / repos.length;

  const activeRepos = repos.filter(
    (r) => new Date(r.pushed_at).getTime() > Date.now() - 90 * 24 * 3600
  ).length;

  let level: ComplexityAnalysis["level"] = "Débutant";

  // 🔹 Débutant
  if (repos.length < 3) {
    reasons.push("Peu de projets publiés");
  }

  // 🔹 Intermédiaire
  if (avgRepoSize > 5000) {
    level = "Intermédiaire";
    reasons.push(
      `Taille moyenne des projets élevée (${Math.round(avgRepoSize)} KB)`
    );
  }

  if (activeRepos >= 3) {
    level = "Intermédiaire";
    reasons.push(`${activeRepos} projets actifs sur les 3 derniers mois`);
  }

  // 🔹 Avancé
  if (avgRepoSize > 20000 || avgForks > 10) {
    level = "Avancé";
    reasons.push("Projets complexes et repris par d'autres développeurs");
  }

  return {
    level,
    reasons,
    metrics: {
      avgRepoSize: Math.round(avgRepoSize),
      avgForks: Number(avgForks.toFixed(1)),
      repoCount: repos.length,
      activeRepos,
    },
  };
}

function analyzeRecommendations(
  repos: GithubRepo[]
): ProfileAnalysis["recommendations"] {
  const recommendations: ProfileAnalysis["recommendations"] = [];

  const avgRepoSize = repos.reduce((a, r) => a + r.size, 0) / repos.length;

  const avgForks = repos.reduce((a, r) => a + r.forks_count, 0) / repos.length;

  const repoCount = repos.length;

  const activeRepos = repos.filter(
    (r) => new Date(r.pushed_at).getTime() > Date.now() - 90 * 24 * 3600
  ).length;

  if (repos.length < 3) {
    recommendations.push({
      title: "Augmenter le nombre de projets",
      description: "Publiez plus de projets pour améliorer votre profil.",
      priority: "high",
    });
  }

  if (activeRepos >= 3) {
    recommendations.push({
      title: "Maintenir l'activité des projets",
      description: `${activeRepos} projets sont actifs sur les 3 derniers mois. Continuez à les mettre à jour.`,
      priority: "medium",
    });
  }

  if (activeRepos < repoCount / 2) {
    recommendations.push({
      title: "Augmenter l’activité récente",
      description:
        "Plusieurs dépôts ne montrent pas d’activité récente. Publier régulièrement améliore la lisibilité et la crédibilité du profil.",
      priority: "high",
    });
  }

  if (avgForks === 0) {
    recommendations.push({
      title: "Collaborer sur des projets existants",
      description:
        "Participer à des projets open-source ou collaboratifs (forks, PR) montre une bonne capacité à travailler en équipe.",
      priority: "low",
    });
  }

  if (avgRepoSize > 20000 || avgForks > 10) {
    recommendations.push({
      title: "Améliorer la complexité des projets",
      description:
        "Les projets sont complexes et repris par d'autres développeurs. Envisagez d'ajouter des fonctionnalités.",
      priority: "low",
    });
  }

  return recommendations;
}

export function analyzeProfile(repos: GithubRepo[]): ProfileAnalysis {
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (!repos.length) {
    return {
      strengths: [],
      improvements: ["Aucun dépôt trouvé. Ajoute au moins un projet public."],
      complexityAnalysis: {
        level: "Débutant",
        reasons: [
          "Aucun dépôt GitHub analysable",
          "Impossible d’évaluer la complexité des projets",
        ],
        metrics: {
          avgRepoSize: 0,
          avgForks: 0,
          repoCount: 0,
          activeRepos: 0,
        },
      },
      recommendations: [
        {
          title: "Créer un premier projet public",
          description:
            "Ajoute au moins un dépôt public présentant un projet personnel ou professionnel. C’est le minimum attendu par les recruteurs.",
          priority: "high",
        },
        {
          title: "Ajouter un README clair",
          description:
            "Explique l’objectif du projet, la stack utilisée et comment lancer l’application. Un bon README fait souvent la différence.",
          priority: "high",
        },
        {
          title: "Déployer le projet",
          description:
            "Déployer le projet (Vercel, Netlify…) permet aux recruteurs de voir le résultat sans lire le code.",
          priority: "medium",
        },
      ],
    };
  }

  // Popularité
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  if (totalStars > 10)
    strengths.push("Profil populaire avec plusieurs étoiles");

  // Activité récente
  const activeRepos = repos.filter(
    (r) => new Date(r.pushed_at).getTime() > Date.now() - 90 * 24 * 3600
  );
  if (activeRepos.length < 3)
    improvements.push("Repos peu actifs récemment, publier plus souvent");

  // Langages
  const languages: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
  });
  const mainLang = Object.entries(languages).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];
  if (mainLang) strengths.push(`Maîtrise de ${mainLang}`);
  else improvements.push("Ajouter des langages de programmation aux projets");

  const complexityAnalysis = analyzeComplexity(repos);

  const recommendations = analyzeRecommendations(repos);

  return {
    strengths,
    improvements,
    complexityAnalysis,
    recommendations,
  };
}
