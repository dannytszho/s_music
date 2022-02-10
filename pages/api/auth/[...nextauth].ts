import NextAuth from "next-auth";
import GitHubProviders from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHubProviders({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      // ...add more providers here
    ],
    database: process.env.DATABASE_URL,
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      session: async (session, user) => {
        session.id = user.id;
        return Promise.resolve(session);
      },
    },
  });
