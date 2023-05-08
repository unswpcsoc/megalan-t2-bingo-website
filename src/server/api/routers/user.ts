// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().max(15),
        email: z.string().email(),
        password: z.string().min(10),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // find user in database
      let user = await ctx.prisma.user.findUnique({
        where: { email: input.email }
      })
      // if no user is found, create new user
      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: input.password,
          }
        })
      }
      return null;
    }),
  
  loginUser: publicProcedure
  .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(10)
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email }
      });
      if (user) {
        // TODO: Create Session
      }
      if (!user) {}
      return null;
    }),

    checkIfUserExists: publicProcedure
    .input(
      z.object({
        name: z.string().max(15),
        email: z.string().email()
      })
    )
    .mutation(async ({ input, ctx }) => {
      let found = false;
      const userWithMatchingName = await ctx.prisma.user.findMany({
        where: { name: input.name }
      })
      const userWithMatchingEmail = await ctx.prisma.user.findMany({
        where: { name: input.name }
      })
      if (userWithMatchingName.length > 0 || userWithMatchingEmail.length > 0) {
        found = true;
      }
      return { 
        found: found, 
        email: userWithMatchingEmail.length > 0, 
        name: userWithMatchingName.length > 0 
      }
    })
});
