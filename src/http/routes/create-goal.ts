import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../services/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
   app.post(
      '/goals',
      {
         schema: {
            body: z.object({
               title: z.string(),
               desiredWeeklyFrequecy: z.number().int().min(1).max(7),
            }),
         },
      },
      async request => {
         const { title, desiredWeeklyFrequecy } = request.body

         await createGoal({
            title,
            desiredWeeklyFrequecy,
         })
      }
   )
}
