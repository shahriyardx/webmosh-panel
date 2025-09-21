import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs"
import { getDayTime } from "@/utils/date-time"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/router"
import { Loader2 } from "lucide-react"
import type { ClerkAPIError } from "@clerk/types"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import SocialLogin from "./social-login"

export const signUpSchema = z.object({
	firstName: z
		.string("Please enter first name")
		.min(1, "Please enter first name"),
	lastName: z
		.string("Please enter last name")
		.min(1, "Please enter first name"),
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

const SignUpForm = () => {
	const clerk = useClerk()
	const router = useRouter()
	const { signUp, isLoaded: isSignUpLoaded, setActive } = useSignUp()

	const [loading, setLoading] = useState(false)
	const [verifying, setVerifying] = useState(false)

	const [errors, setErrors] = useState<ClerkAPIError[]>([])

	const form = useForm({
		resolver: zodResolver(signUpSchema),
	})

	const verifyForm = useForm({
		resolver: zodResolver(verifySchema),
	})

	const handleSignUp = async (values: SignUpType) => {
		if (!isSignUpLoaded) return

		setLoading(true)
		await clerk.signOut()

		try {
			await signUp.create({
				firstName: values.firstName,
				lastName: values.lastName,
				emailAddress: values.email,
				password: values.password,
			})

			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			})
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				setErrors(error.errors)
			}
			setLoading(false)
			return
		}

		setVerifying(true)
		setLoading(false)
	}

	const handleVerifyOtp = async (values: z.infer<typeof verifySchema>) => {
		if (!signUp) return

		const attempt = await signUp.attemptEmailAddressVerification({
			code: values.pin,
		})

		if (attempt.status === "complete") {
			await setActive({
				session: attempt.createdSessionId,
				navigate: async ({ session }) => {
					await router.push("/dashboard")
				},
			})
		}
	}

	return (
		<div>
			{verifying ? (
				<Form {...form}>
					<form
						onSubmit={verifyForm.handleSubmit(handleVerifyOtp)}
						className="w-2/3 space-y-6"
					>
						<FormField
							control={verifyForm.control}
							name="pin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Verification</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										Please enter the one-time password sent to your email.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSignUp)}
						className="space-y-7"
					>
						<div className="grid grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
								<span>Sign Up</span>
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
			)}
		</div>
	)
}

export default SignUpForm
