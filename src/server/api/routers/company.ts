import { z } from "zod"

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc"

export const companyRouter = createTRPCRouter({
	all: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.company.findMany()
	}),
})
