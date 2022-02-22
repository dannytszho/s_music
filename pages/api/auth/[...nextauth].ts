import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

let userAccount = null;

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) =>
    NextAuth(req, res, {
        session: {
            strategy: "jwt",
        },
        jwt: {
            secret: process.env.JWT_SECRET
        },
        adapter: PrismaAdapter(prisma),
        providers: [
            GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            }),
            // ...add more providers here
        ],
        database: process.env.DATABASE_URL,
        pages: {
            signIn: '/signin_auth'
        },
        callbacks: {
            async session({session, token}) {
                //session.accessToken = token.accessToken;
                
                if (userAccount !== null)
                {
                    session.user = userAccount;
                }
                else if (typeof token !== typeof undefined)
                {
                    session.token = token;
                }
                return session;
            },
            async jwt({ token, user, account }) {
              // Persist the OAuth access_token to the token right after signin
              if (account) {
                token.accessToken = account.access_token;
              }
              return token;
            },
            async signIn({ user, account, profile, email, credentials }) {
              const isAllowedToSignIn = true
              if (isAllowedToSignIn) {
                return true;
              } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
              }
            },
        }
})
export default authHandler;