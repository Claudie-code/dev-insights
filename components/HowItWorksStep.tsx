import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HowItWorksStepProps {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
  align?: "left" | "right";
}

export function HowItWorksStep({
  step,
  title,
  description,
  icon,
  align = "left",
}: HowItWorksStepProps) {
  return (
    <div
      className={cn("relative flex w-full", align === "right" && "justify-end")}
    >
      <Card className="relative w-full max-w-xl border-muted bg-background/80 backdrop-blur transition hover:border-primary/40">
        <CardContent className="p-6">
          {/* Step number */}
          <span className="absolute -top-8 -left-6 text-6xl font-extrabold text-muted-foreground/10">
            {step}
          </span>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>

          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
