import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const validateRouter = createTRPCRouter({
  isUserUnique: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      let found = false;
      const usersWithMatchingName = await ctx.prisma.user.findMany({
        where: { name: input.name }
      })
      const usersWithMatchingEmail = await ctx.prisma.user.findMany({
        where: { email: input.email } 
      })
      if (usersWithMatchingName.length > 0 || usersWithMatchingEmail.length > 0) {
        found = true;
      }
      return {
        found: found,
        email: usersWithMatchingEmail.length > 0, 
        name: usersWithMatchingName.length > 0 
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
