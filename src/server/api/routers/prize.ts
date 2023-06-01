import { TaskTypeSchema } from "~/components/types/clubs";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { generateNumber } from "~/server/functions/randomNumber";

export const prizeRouter = createTRPCRouter({
  /*  
    basic explanation of the logic to win:
    have you heard of those fill the glass with water drop by drop and see
    who can make it spill over youtube shorts ?
    well its something like that ...
    instead the person who makes it spill over wins and if you pour more water 
    "have more task points" you have a higher chance of making it spill over the
    random number generated between the  bottom of the glass i.e. 0 and the
    total volume of the glass i.e. random number generated between 0 and total
    points earned across all users for the category.
  

  getPrizeWinner: adminProcedure
    .input(z.object({ category: TaskTypeSchema }))
    .query(async ({ input, ctx }) => {
      // get all completed tasks and data about which task type, points and user name
      const tasks = await ctx.prisma.completedTask.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
          task: {
            select: {
              points: true,
              type: true,
            },
          },
        },
      });

      // create a hashmap to store the <userID, points>
      const userPointHashMap = new Map<string, number>();

      // find the total number of points earned by all users
      let upperRangePoints = 0;

      // iterate through all completed tasks and add them to the array
      tasks.forEach((t) => {
        if (t.task.type === input.category) {
          // get the current points that the user has
          let points: number | undefined = userPointHashMap.get(t.userID);
          // create an entry if the user doesn't exist on the map
          if (!points) points = 0;
          // update the points for the user
          upperRangePoints += t.task.points;
          // add the userId and points to the map
          userPointHashMap.set(t.userID, points + t.task.points);
        }
      });

      // put all the userID's and points data into an array from the map
      const userPointData: { userID: string; points: number }[] = [];
      for (const [user, points] of userPointHashMap) {
        userPointData.push({ userID: user, points: points });
      }

      // TO-DISCUSS: OPTIONAL: sort the array in ascending order based on points
      // userPointData.sort((a, b) => {
      //   if (a.points > b.points) return -1;
      //   if (a.points < b.points) return 1;
      //   return 0;
      // });

      // generate a random number within the range
      const randNum: number = generateNumber(midWay, upperRangePoints);

      // calculate the winner
      let accumulatedWeight = 0;
      let winnerUserID = "";
      // iterate across all the users and add the accumulated points until it
      // is greater than the random number generated
      for (const user of userPointData) {
        accumulatedWeight += user.points;
        if (randNum < accumulatedWeight) {
          winnerUserID = user.userID;
        }
      }

      // find the user from the winner user ID
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: winnerUserID,
        },
      });

      //  return nothing if the user is not found
      if (!user) return;

      return { user: userPointData, winner: user.name };
    }),

    */

  getWinner: adminProcedure
    .input(z.object({ category: TaskTypeSchema }))
    .query(async ({ input, ctx }) => {
      // get all completed tasks and data about which task type, points and user name
      // const tasks = await ctx.prisma.completedTask.findMany({
      //   include: {
      //     task: {
      //       select: {
      //         points: true,
      //         type: true,
      //       },
      //     },
      //   },
      // });

      // this is a list of task ids and userids of completed tasks of
      // a particular tasktype
      const completedTasks = await ctx.prisma.completedTask.findMany({
        where: {
          task: {
            type: input.category,
          },
        },
        include: {
          task: {
            select: {
              points: true,
            },
          },
        },
      });

      return { completeTasks: completedTasks };
      // completedTasks.forEach()

      // raffle = [{userids}]
      /* 
      for (tuple in completedtasks) {
        // depending on the task points, 
        // enter the same user tp/100 number of times
        raffle.push (tuple.userID)
        if (task.point / 100  == 2) {
          raffle.push (tuple.userID)

        }
      }
      
      */

      const tasks = await ctx.prisma.task.findMany({
        where: {
          type: input.category,
        },
      });

      return { tasks };
      // create a hashmap to store the <userID, points>
      // const userPointHashMap = new Map<string, number>();

      // find the total number of points earned by all users
      // let upperRangePoints = 0;

      // iterate through all completed tasks and add them to the array
      // tasks.forEach((t) => {
      //   if (t.task.type === input.category) {
      //     // get the current points that the user has
      //     let points: number | undefined = userPointHashMap.get(t.userID);
      //     // create an entry if the user doesn't exist on the map
      //     if (!points) points = 0;
      //     // update the points for the user
      //     upperRangePoints += t.task.points;
      //     // add the userId and points to the map
      //     userPointHashMap.set(t.userID, points + t.task.points);
      //   }
      // });

      // tasks is a hashmap of users and their points.

      /* raffle = [{userid}, {userid}, {userid}]



      tasks = {userId: 100, userId: 200 } */
    }),
});
