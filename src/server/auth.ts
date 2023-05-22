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
      id: string;
      email: string;
      name: string;
      // ...other properties
      // role: UserRole;
    }
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
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, account }) {
      token.id = user.id;
      if (account && account.access_token) {
          // token.username = user.username; // asign the value
      }
      return token
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // jwt: {
  //   encode(p) {
  //     const token = Jwt.sign(p.token!, p.secret);
  //     return token;
  //   },
    
  //   decode(p) {
  //     const decoded = jwt.verify(p.token, p.secret);
  //     return decoded;
  //   },
  // },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        // logic to look up the user from the credentials supplied
        const user = await prisma.user.findFirst({ where: { email: credentials?.email } });
        if (!user) throw new Error("user not found");
        if (credentials?.password !== user.password) throw new Error("wrong password");
        return { id: user.id, email: user.email, name: user.name };
      },
    })
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