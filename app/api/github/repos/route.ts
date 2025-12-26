import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string | undefined;
  if (!accessToken) return NextResponse.json([], { status: 401 });

  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });
  const repos = await res.json();
  return NextResponse.json(repos);
}
