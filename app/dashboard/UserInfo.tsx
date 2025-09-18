import { Session } from "next-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserInfo({ session }: { session: Session }) {
  const initials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-14 w-14">
        <AvatarImage src={session.user?.image ?? ""} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-xl font-bold">{session.user?.name}</h2>
        <p className="text-muted-foreground text-sm">{session.user?.email}</p>
      </div>
    </div>
  );
}
