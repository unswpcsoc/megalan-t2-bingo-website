import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const authenticationRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // find user with matching email
      const user = await ctx.prisma.user.findUnique({
        where: {email: input.email},
      })
      // no user found
      if (!user) return {
        found: false,
        passwordMatch: false,
        token: null
      }
      // user found but password is wrong
      if (user?.password !== input.password) return { 
        found: true, 
        passwordMatch: false,
        token: null
      }
      // if old session exists update the expiry date time
      const oldSession = await ctx.prisma.session.update({
        where: { userId: user.id },
        data: { expires: new Date(Date.now() + 1000 * 60 * 60 * 24)},
      })
      // if old session exists return the token
      if (oldSession) return {
        found: true,
        passwordMatch: true,
        token: oldSession.sessionToken
      }
      // if no old session exists create a new session
      const session = await ctx.prisma.session.create({
        data: {
          userId: user.id,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }
      })
      // return new session details
      return {
        found: true,
        passwordMatch: true,
        token: session.sessionToken
      }
    }),
  
  logout: protectedProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    })
    // if user that does not exist is logging out
    if (!user) return { status: false, message: "User not found" }
    // delete all user sessions
    if (user) await ctx.prisma.session.deleteMany({
      where: { userId: user.id },
    })
    return { status: true, message: "User logged out" }
  }),

  signup: publicProcedure
  .input(
    z.object({
      name: z.string().max(20),
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    // create a new user since validation of user has already been done
    await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
      }
    })
    return { status: true, message: "User created" }
  }),
});
