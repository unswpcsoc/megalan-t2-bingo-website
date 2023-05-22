import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  type DefaultUser,
} from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { type DefaultJWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      name: string;
      // ...other properties
      // role: UserRole;
    }
    id: string;
  }
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    // username: string; // also my jwt will have the property, I can access this property within the JWT using the getToken() helper
  }
}


/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      console.log("user-id", user.id)
      token.id = user.id;
      console.log("token-id-1", token.id)
      // if (account && account.access_token) {
      //   // token.username = user.username; // asign the value
      // }
      return token
    },
    session({ session, token }) {
      console.log(`HELLOOO THEREEEEEE DOES THIS 
      EVEN WORKKK?????????????????
      ????????????????????????????????????????????????????????
      ???????????????????????????????????????????????????????`)
      session.id = token.id;
      // session.user.id = token.id;
      // session.username = token.username; // pass the value to the client session
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        // logic to look up the user from the credentials supplied
        console.log(credentials);
        const user = await prisma.user.findFirst({ where: { email: credentials?.email } });
        console.log(user);
        if (!user) throw new Error("user not found");
        if (credentials?.password !== user.password) throw new Error("wrong password");
        // credentials.
       
        return { id: user.id, email: user.email, name: user.name };
      },
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/auth/login",
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};