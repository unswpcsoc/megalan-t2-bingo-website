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
  
  // society clubname 
  // user id

  getUserSocietyCompletedTasks: adminProcedure
  .input(z.object({ userId: z.string(), societyName: ClubNameSchema}))
  .query(async ({ input, ctx }) => {

    const society = await ctx.prisma.society.findFirst({
      where: {
        name: input.societyName
      }
    });

    const completedTasks = await ctx.prisma.completedTask.findMany({
      where: {
        userID: input.userId,
        task: {
          societyId: society?.id 
        }
      }
    });

    const taskIds: string[] = []

    completedTasks.forEach(task => {taskIds.push(task.taskID)})



    const resultTasks = await ctx.prisma.task.findMany({
      where: {
        id: {in: taskIds}
      }

    });

    return {tasks: resultTasks};
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
    .input(z.object({ id: z.string(), taskId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // add the task to the users completed list.
     await ctx.prisma.user.update({where: {id: input.id}, data: {completedTasks: {create: {
        authorisedBy: ctx.session.user.name,
        task: {connect : {id: input.taskId}},    
      }}}});
    }),
   
  getUsers: adminProcedure
  .input(z.object({name: z.string()}))
  .query(async ({ input, ctx }) => {
    const resultUsers = await ctx.prisma.user.findMany({
      orderBy: {
        name: "asc"
      },
      where: {
        AND: [{type: "PARTICIPANT"}, {name: {contains: input.name, mode: "insensitive"}}]
      } 
    });

    const cleanUsers = resultUsers.map((user) => {return {name: user.name, id: user.id}});
    console.log(cleanUsers);

    return cleanUsers;
  }),
  getUserTasks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
        include: {
          completedTasks: true,
        },
      });

      // if no user is found throw an error
      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });

      // generate query prisma for full task details
      const completedTasksQuery: { id: string }[] = [];
      user.completedTasks.forEach((task) => {
        completedTasksQuery.push({ id: task.taskID });
      });
      // get all task objects from with full task details
      const completedTasks = await ctx.prisma.task.findMany({
        where: {
          OR: completedTasksQuery,
        },
      });

      // clean data for complete tasks
      const allcompleteTasks: { name: string; points: number; id: string }[] =
        [];
      completedTasks.forEach((task) => {
        allcompleteTasks.push({
          name: task.name,
          points: task.points,
          id: task.id,
        });
      });

      // create a prisma query based on the completed tasks
      const allTasksQuery: { id: string }[] = [];
      user.completedTasks.forEach((task) => {
        allTasksQuery.push({ id: task.taskID });
      });

      // clean data for incomplete tasks
      const allIncompleteTasks: { name: string; points: number; id: string }[] =
        [];
      // get incomplete tasks as well
      const tasks = await ctx.prisma.task.findMany({
        where: {
          OR: allTasksQuery,
        },
      });

      tasks.forEach((task) => {
        allIncompleteTasks.push({
          name: task.name,
          points: task.points,
          id: task.id,
        });
      });
      // return the completed and incomplete tasks separately
      return { incomplete: allIncompleteTasks, complete: allcompleteTasks };
    }),
});
