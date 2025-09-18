"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function LoginButton() {
  return (
    <Button
      variant="default"
      size="lg"
      onClick={() => (window.location.href = "/api/auth/signin/github")}
    >
      <Github />
      Se connecter avec GitHub
    </Button>
  );
}
