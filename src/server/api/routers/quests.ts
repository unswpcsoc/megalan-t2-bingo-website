import { type Society, type Task } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  type CleanClubDataType,
  type ClubNamesType,
  ClubNameSchema,
} from "~/components/types/clubs";

import { getSocietyNameType } from "~/components/functions/getSocietyNameType";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const QuestsRouter = createTRPCRouter({
  // TODO: Gets the quests that a user has completed and not completed
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

  // returns the leaderboard data of all PARTICIPANTS
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

      const cleanData: { name: string; points: number }[] = [];
      if (users.length === 0) return { userIndex, data: cleanData };

      users.forEach((user, index) => {
        if (user.id === input.userID) userIndex = index;
        cleanData.push({
          name: user.name,
          points: user.totalPoints,
        });
      });
      return { userIndex, data: cleanData };
    }),

  // return the clubs an admin is part of
  getAdminClubs: adminProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.userID },
        include: { Societies: true },
      });
      const cleanData: CleanClubDataType[] = [];
      if (!user) return { clubs: cleanData };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      user.Societies.forEach((soc: CleanClubDataType) => cleanData.push(soc));
      return { clubs: cleanData };
    }),

  // returns all the tasks from a list of societies
  getSocietyTasks: protectedProcedure
    .input(z.object({ societyNames: z.array(ClubNameSchema) }))
    .query(async ({ input, ctx }) => {
      // constructing a prisma query with the list of societies from input
      const prismaQuery: { name: ClubNamesType }[] = [];
      input.societyNames.forEach((soc) => prismaQuery.push({ name: soc }));

      // array to store list of all tasks
      const allTasks: Task[] = [];

      // find the society
      const society: (Society & { tasks: Task[] })[] | null =
        await ctx.prisma.society.findMany({
          where: { OR: prismaQuery },
          include: { tasks: true },
        });

      // for every society found add its tasks to allTasks array
      society.forEach((soc) => {
        // why doesn't .concat() work when its supposed to :sob:
        soc.tasks.forEach((t) => {
          allTasks.push(t);
        });
      });

      // return all the tasks
      return { tasks: allTasks };
    }),

  createQuest: adminProcedure
    .input(
      z.object({
        name: z.string(),
        points: z.number(),
        society: ClubNameSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const societyType = getSocietyNameType(input.society);

      // find the society
      const society = await ctx.prisma.society.findFirst({
        where: {
          name: input.society,
        },
      });

      if (!society)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "society not found",
        });

      const task = await ctx.prisma.task.create({
        data: {
          name: input.name,
          points: input.points,
          type: societyType.type,
          societyId: society.id,
        },
      });
      return { taskId: task.id };
    }),
  deleteQuest: adminProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
      return { status: true };
    }),
});
