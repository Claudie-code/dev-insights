import type { ComponentType } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ComponentType;
  title: string;
  description: string;
  cardBorderColor: string;
  avatarTextColor: string;
  avatarBgColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  cardBorderColor,
  avatarTextColor,
  avatarBgColor,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "shadow-none transition-colors duration-300",
        cardBorderColor
      )}
    >
      <CardContent>
        <Avatar className={cn("mb-6 size-10 rounded-md", avatarTextColor)}>
          <AvatarFallback
            className={cn("rounded-md [&>svg]:size-6", avatarBgColor)}
          >
            <Icon />
          </AvatarFallback>
        </Avatar>
        <h6 className="mb-2 text-lg font-semibold">{title}</h6>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
