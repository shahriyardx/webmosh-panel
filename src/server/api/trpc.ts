import { initTRPC, TRPCError } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import superjson from "superjson"
import { ZodError } from "zod"
import { db } from "@/server/db"
import { auth } from "@clerk/nextjs/server"

type ClerkSession = {
	userId: string
}

interface CreateContextOptions {
	session: ClerkSession | null // What should be the type
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		session: opts.session,
		db,
	}
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
	const { req, res } = opts

	// Get the session from the server using the getServerSession wrapper function
	const session = (await auth()) as ClerkSession

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
		if (!ctx.session) {
			throw new TRPCError({ code: "UNAUTHORIZED" })
		}

		return next({
			ctx: {
				session: ctx.session,
			},
		})
	})
