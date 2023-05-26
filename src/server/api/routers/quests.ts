import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const QuestsRouter = createTRPCRouter({
  getUserQuests: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
      if (!user) return { status: false, message: "User not found" };
      // user.id
      return {
        greeting: `Hello ${user.email}`,
      };
    }),

  getLeaderboardStats: publicProcedure.query(({ ctx }) => {
    ctx.prisma.user
      .findMany({
        orderBy: {
          totalPoints: "desc",
        },
        where: {
          NOT: {
            totalPoints: 0,
          },
        },
      })
      .then((users) => {
        const cleanData: { name: string; points: number }[] = [];
        users.forEach((user) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          cleanData.push({ name: user.name, points: user.totalPoints });
        });
        if (users) return cleanData;
        return { data: [{ name: "Hehe", points: 100 }] };
      })
      .catch((err: TRPCError) => {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: err.message.toString(),
        });
      });
  }),
});
