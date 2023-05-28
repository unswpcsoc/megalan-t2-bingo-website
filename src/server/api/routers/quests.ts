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

  getLeaderboardStats: publicProcedure
    .input(z.object({ userID: z.string().min(0) }))
    .query(async ({ input, ctx }) => {
      const users = await ctx.prisma.user.findMany({
        orderBy: {
          totalPoints: "desc",
        },
        where: {
          type: "PARTICIPANT",
        },
      });
      let userIndex: number | null = null;
      if (users.length === 0) return { userIndex, data: [] };

      const cleanData: { name: string; points: number }[] = [];
      users.forEach((user, index) => {
        console.log("UR RANK = ", index, user.id, input.userID);
        if (user.id === input?.userID) {
          userIndex = index;
        }
        cleanData.push({
          name: user.name,
          points: user.totalPoints as number,
        });
      });
      return { userIndex, data: cleanData };
    }),
});
