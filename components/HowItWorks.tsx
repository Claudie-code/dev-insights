import { BarChart3Icon, SparklesIcon, Github } from "lucide-react";
import { HowItWorksStep } from "./HowItWorksStep";

export function HowItWorks() {
  return (
    <section className="w-full py-8 sm:py-16 lg:py-24 bg-gradient-to-b from-background to-mute/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            How DevInsight Works
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            From raw GitHub data to actionable AI-powered insights in just a few
            steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col gap-24">
          <HowItWorksStep
            step="01"
            title="Connect your GitHub"
            description="Sign in securely with GitHub. We only access public development data."
            icon={<Github />}
          />

          <HowItWorksStep
            step="02"
            title="Analyze your activity"
            description="Commits, languages, frequency, trends. Your developer profile decoded."
            icon={<BarChart3Icon />}
            align="right"
          />

          <HowItWorksStep
            step="03"
            title="Get AI insights"
            description="Strengths, weaknesses, and personalized recommendations to level up."
            icon={<SparklesIcon />}
          />
        </div>
      </div>
    </section>
  );
}
