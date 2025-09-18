import { LoginButton } from "./LoginButton";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 p-8 rounded-xl shadow-lg bg-card">
        <Github />

        <h1 className="text-2xl font-bold text-center">
          Connecte-toi avec GitHub
        </h1>
        <p className="text-muted-foreground text-center max-w-xs">
          Accède à ton dashboard DevInsights et analyse tes projets GitHub.
        </p>
        <LoginButton />
      </div>
    </div>
  );
}
