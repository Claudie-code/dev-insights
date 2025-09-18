import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { profile } from "console";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email repo" } },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user,
      profile,
    }: {
      token: JWT;
      account?: any;
      profile?: any;
      user?: any;
    }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile && profile.email) {
        token.email = profile.email; // <-- ajoute l'email
      } else if (user && user.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      if (session.user && token.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect() {
      return "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
