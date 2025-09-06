import React, { useState } from "react"
import GoogleIcon from "@/components/icons/Google"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"
import type { GetServerSideProps } from "next"
import { auth, currentUser, getAuth } from "@clerk/nextjs/server"
import { SignInButton } from "@clerk/nextjs"

const Homepage = () => {
	return (
		<div className="min-h-screen grid place-items-center">
			<div className="flex items-center flex-col">
				<h1 className="text-center text-3xl font-bold">Welcome Back</h1>
				<p className="text-muted-foreground">Please login to visit dashboard</p>

				<div className="mt-5">
					<SignInButton>
						<Button>Sign In</Button>
					</SignInButton>
				</div>
			</div>
		</div>
	)
}

export default Homepage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = getAuth(ctx.req)
	console.log(session)
	if (session.userId) {
		// Redirect if not signed in
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}
