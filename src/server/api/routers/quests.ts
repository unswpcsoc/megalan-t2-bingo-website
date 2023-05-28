import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  adminProcedure,
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
      return {
        greeting: `Hello ${user.email}`,
      };
    }),

  getLeaderboardStats: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ input, ctx }) => {
      const users = await ctx.prisma.user.findMany({
        orderBy: {
          totalPoints: "desc",
        },
        where: {
          type: "PARTICIPANT",
        },
      });
      let userIndex = -1;
      if (users.length === 0) return { userIndex, data: [] };
      const cleanData: { name: string; points: number }[] = [];
      users.forEach((user, index) => {
        if (user.id === input.userID) userIndex = index;
        cleanData.push({
          name: user.name,
          points: user.totalPoints as number,
        });
      });
      return { userIndex, data: cleanData };
    }),

  getAdminClubs: adminProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userID },
        include: { Societies: true },
      });
      if (!user) return { clubs: [] };
      const cleanData: { name: string; id: string }[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      user.Societies.forEach((soc: { name: string; id: string }) =>
        cleanData.push(soc)
      );
      return { clubs: cleanData };
    }),
});
