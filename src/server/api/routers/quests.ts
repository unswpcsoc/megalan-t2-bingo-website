import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const QuestsRouter = createTRPCRouter({
  getUserQuests: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({where: {email: input.email}});
      if (!user) return {status: false, message: "User not found"};
      // user.id
      return {
        greeting: `Hello ${input.email}`,
      };
    }),
});
