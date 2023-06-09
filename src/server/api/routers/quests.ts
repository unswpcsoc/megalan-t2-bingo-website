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

export const questsRouter = createTRPCRouter({
  // Gets a list of all users participating and admins
  getAllUsers: adminProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const resultUsers = await ctx.prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
        where: {
          name: { contains: input.name, mode: "insensitive" },
        },
      });

      const cleanUsers = resultUsers.map((user) => {
        return { name: user.name, id: user.id };
      });

      return cleanUsers;
    }),

  // returns the leaderboard data of all PARTICIPANTS
  // TODO: return the rank with each user object where same rank for same points
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
        include: { societies: true },
      });
      const cleanData: CleanClubDataType[] = [];
      if (!user) return { clubs: cleanData };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      user.societies.forEach((soc: CleanClubDataType) => cleanData.push(soc));
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
        // skill issue
        soc.tasks.forEach((t) => {
          allTasks.push(t);
        });
      });

      // return all the tasks
      return { tasks: allTasks };
    }),

  getUserSocietyCompletedTasks: adminProcedure
    .input(z.object({ userId: z.string(), societyName: ClubNameSchema }))
    .query(async ({ input, ctx }) => {
      const society = await ctx.prisma.society.findFirst({
        where: {
          name: input.societyName,
        },
      });

      const completedTasks = await ctx.prisma.completedTask.findMany({
        where: {
          userID: input.userId,
          task: {
            societyId: society?.id,
          },
        },
      });

      const taskIds: string[] = [];

      // a list of taskIds that a use has completed in a particular society
      completedTasks.forEach((task) => {
        taskIds.push(task.taskID);
      });

      // the completed tasks
      const resultTasks = await ctx.prisma.task.findMany({
        where: {
          id: { in: taskIds },
        },
      });

      // get all the tasks in the society
      const soc = await ctx.prisma.society.findFirst({
        where: {
          name: input.societyName,
        },
        include: {
          tasks: true,
        },
      });

      const incompleteTasks: Task[] = [];
      soc?.tasks.forEach((task) => {
        // if the task has not already been completed
        if (!taskIds.includes(task.id)) {
          incompleteTasks.push(task);
        }
      });

      return { completedTasks: resultTasks, incompleteTasks: incompleteTasks };
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

  completeTask: adminProcedure
    .input(
      z.object({ id: z.string(), taskId: z.string(), taskPoints: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      // add the task to the users completed list.
      try {
        await ctx.prisma.user.update({
          where: { id: input.id },
          data: {
            completedTasks: {
              create: {
                authorisedBy: ctx.session.user.name,
                task: { connect: { id: input.taskId } },
              },
            },
          },
        });

        // update the points of the user
        await ctx.prisma.user.update({
          where: { id: input.id },
          data: { totalPoints: { increment: input.taskPoints } },
        });
        return { status: "success" };
      } catch {
        return { status: "failed" };
      }
    }),

  getUsers: adminProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const resultUsers = await ctx.prisma.user.findMany({
        orderBy: {
          name: "asc",
        },
        where: {
          AND: [
            { type: "PARTICIPANT" },
            { name: { contains: input.name, mode: "insensitive" } },
          ],
        },
      });

      const cleanUsers = resultUsers.map((user) => {
        return { name: user.name, id: user.id };
      });

      return cleanUsers;
    }),

  getUserTasks: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userTasks = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
        include: {
          completedTasks: { include: { task: { include: { Society: true } } } },
        },
      });

      const cTasks: string[] = [];
      userTasks?.completedTasks.forEach((task) => {
        cTasks.push(task.taskID);
      });

      const incompleteTasks = await ctx.prisma.task.findMany({
        where: { NOT: { id: { in: cTasks } } },
        include: { Society: true },
      });

      const allcompleteTasks: {
        name: string;
        points: number;
        id: string;
        societyName: ClubNamesType | undefined;
      }[] = [];
      userTasks?.completedTasks.forEach((task) => {
        const t = task.task;

        allcompleteTasks.push({
          name: t.name,
          points: t.points,
          id: t.id,
          societyName: t.Society?.name,
        });
      });

      const allInCompleteTasks: {
        name: string;
        points: number;
        id: string;
        societyName: ClubNamesType | undefined;
      }[] = [];

      incompleteTasks.forEach((task) => {
        allInCompleteTasks.push({
          name: task.name,
          points: task.points,
          id: task.id,
          societyName: task.Society?.name,
        });
      });

      return { incomplete: allInCompleteTasks, complete: allcompleteTasks };
    }),
});
