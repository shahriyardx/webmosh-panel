import { z } from "zod"

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"

export const postRouter = createTRPCRouter({
	all: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.company.findMany()
	}),
})
