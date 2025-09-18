import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect() {
      // Redirige toujours vers /dashboard après login
      return "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
