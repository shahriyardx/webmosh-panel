import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useClerk, useSignIn } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"
import { Loader2 } from "lucide-react"
import type { ClerkAPIError } from "@clerk/types"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"

import SocialLogin from "./social-login"

export const signUpSchema = z.object({
	email: z.email("Please enter your email"),
	password: z
		.string("Please enter your password")
		.min(8, "Password must be at-least 8 character long"),
})

export const verifySchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
})

type SignUpType = z.infer<typeof signUpSchema>

const SignInForm = () => {
	const clerk = useClerk()
	const router = useRouter()
	const { signIn, isLoaded, setActive } = useSignIn()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<ClerkAPIError[]>([])

	const form = useForm({
		resolver: zodResolver(signUpSchema),
	})

	const handleSignUp = async (values: SignUpType) => {
		if (!isLoaded || !signIn) return

		setLoading(true)
		await clerk.signOut()

		try {
			const attempt = await signIn.create({
				identifier: values.email,
				password: values.password,
			})

			if (attempt.status === "complete") {
				await setActive({
					session: attempt.createdSessionId,
					navigate: () => {
						router.push("/dashboard")
					},
				})
			}
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				setErrors(error.errors)
			}
			setLoading(false)
			return
		}

		setLoading(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-7">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<Button disabled={loading} type="submit" className="w-full">
						{loading && <Loader2 className="animate-spin" />}
						<span>Login</span>
					</Button>

					<div className="text-red-500 mt-2 text-sm">
						{errors.map((error) => (
							<p key={error.code}>{error.longMessage}</p>
						))}
					</div>
				</div>

				<Separator />
				<SocialLogin />
			</form>
		</Form>
	)
}

export default SignInForm
