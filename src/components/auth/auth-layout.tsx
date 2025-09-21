import React, { type ComponentProps } from "react"
import Logo from "../shared/Logo"
import { getDayTime } from "@/utils/date-time"
import Link from "next/link"

type CoreProps = ComponentProps<"div">

type Props = CoreProps & {
	formName: "signIn" | "signUp" | "forget"
}

export const CoreAuthLayout = ({ children }: CoreProps) => {
	return (
		<div className="">
			<header className="bg-primary">
				<section className="container mx-auto px-5 py-3 text-primary-foreground">
					<Logo />
				</section>
			</header>

			<div className="container mx-auto px-5 py-10">{children}</div>
		</div>
	)
}

const AuthLayout = ({ children, formName }: Props) => {
	const dayTime = getDayTime()

	return (
		<CoreAuthLayout>
			<h3 className="text-4xl font-bold">Good {dayTime}!</h3>
			<p className="mt-2 text-muted-foreground">
				Welcome back. Sign in to Webmosh.
			</p>
			<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
				{children}
			</div>
			<div className="mt-5">
				<p>
					{formName === "signIn" ? "Don't" : "Already"} have an account?{" "}
					<Link
						href={formName === "signIn" ? "/auth/sign-up" : "/auth/sign-in"}
						className="text-indigo-400"
					>
						{formName === "signIn" ? "Sign Up" : "Sign In"}
					</Link>
				</p>

				<Link href="/auth/forget" className="text-indigo-400">
					Forgot Password?
				</Link>
			</div>
		</CoreAuthLayout>
	)
}

export default AuthLayout
