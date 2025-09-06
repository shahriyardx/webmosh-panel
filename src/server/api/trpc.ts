import { initTRPC, TRPCError } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import superjson from "superjson"
import { ZodError } from "zod"
import { db } from "@/server/db"
import { getAuth } from "@clerk/nextjs/server"

type ClerkSession =
	| {
			userId: string
			sessionId: string
			sessionStatus: string
			isAuthenticated: true
	  }
	| {
			userId: null
			sessionId: null
			sessionStatus: null
			isAuthenticated: false
	  }

interface CreateContextOptions {
	session: ClerkSession
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		session: opts.session,
		db,
	}
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const session = getAuth(opts.req) as ClerkSession

	return createInnerTRPCContext({
		session: session,
	})
}

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
})

export const createCallerFactory = t.createCallerFactory
export const createTRPCRouter = t.router

const timingMiddleware = t.middleware(async ({ next, path }) => {
	const start = Date.now()

	if (t._config.isDev) {
		const waitMs = Math.floor(Math.random() * 400) + 100
		await new Promise((resolve) => setTimeout(resolve, waitMs))
	}

	const result = await next()

	const end = Date.now()
	console.log(`[TRPC] ${path} took ${end - start}ms to execute`)

	return result
})

export const publicProcedure = t.procedure.use(timingMiddleware)

export const protectedProcedure = t.procedure
	.use(timingMiddleware)
	.use(({ ctx, next }) => {
		if (!ctx.session.isAuthenticated) {
			throw new TRPCError({ code: "UNAUTHORIZED" })
		}

		return next({
			ctx: {
				session: ctx.session,
			},
		})
	})
