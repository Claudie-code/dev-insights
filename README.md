# Dev Insights

**Dev Insights** est une application web qui analyse les dépôts GitHub d’un développeur pour estimer son niveau, afficher ses points forts, ses axes d’amélioration et proposer des recommandations personnalisées.

---

## Démo

[Voir la démo en ligne](https://dev-insights-blue.vercel.app)

---

## Fonctionnalités

- Connexion sécurisée avec GitHub via OAuth
- Analyse automatique des dépôts publics GitHub
- Estimation du niveau du développeur (Débutant / Intermédiaire / Avancé)
- Visualisation graphique des statistiques des repos
- Affichage des points forts et des axes d’amélioration
- Recommandations personnalisées pour améliorer les projets GitHub

---

## Tech Stack

- **Frontend & Backend** : Next.js 15 + React 18 + TypeScript
- **Authentification** : NextAuth avec GitHub OAuth
- **Graphiques** : Chart.js / react-chartjs-2
- **UI Components** : Radix UI, Tailwind CSS
- **Sécurité** : Patch CVE appliqué pour React Server Components
- **Base de données** : PostgreSQL via Prisma (prévu pour évolutions futures)

---

## Installation locale

1. Cloner le projet

```bash
git clone https://github.com/Claudie-code/dev-insights.git
cd dev-insights
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier .env :

```bash
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Lancer le projet en local :

```bash
npm run dev
```
