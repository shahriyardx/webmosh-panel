import Logo from "@/components/shared/Logo"
import { getDayTime } from "@/utils/date-time"
import Link from "next/link"
import SignUpForm from "@/components/auth/sign-up-form"
import { useState } from "react"
import SignInForm from "@/components/auth/sign-in-form"

const Homepage = () => {
	const [showForm, setShowForm] = useState<"signIn" | "signUp" | "forget">(
		"signIn",
	)
	const dayTime = getDayTime()

	return (
		<div className="">
			<header className="bg-primary">
				<section className="container mx-auto px-5 py-3 text-primary-foreground">
					<Logo />
				</section>
			</header>

			<div className="container mx-auto px-5 py-10">
				<h3 className="text-4xl font-bold">Good {dayTime}!</h3>
				<p className="mt-2">Welcome back. Sign in to Webmosh.</p>

				<div className="mt-10 grid grid-cols-2 gap-5">
					{showForm === "signUp" && <SignUpForm />}
					{showForm === "signIn" && <SignInForm />}
				</div>

				<div className="mt-5">
					<Link href="/auth/forgot" className="text-indigo-500">
						Forgot Password?
					</Link>
					{(showForm === "signUp" || showForm === "forget") && (
						<p>
							Already have an account?{" "}
							<button
								type="button"
								onClick={() => setShowForm("signIn")}
								className="text-indigo-500"
							>
								Sign In?
							</button>
						</p>
					)}

					{showForm === "signIn" && (
						<p>
							Don't have an account?{" "}
							<button
								type="button"
								onClick={() => setShowForm("signUp")}
								className="text-indigo-500"
							>
								Sign Up?
							</button>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Homepage
