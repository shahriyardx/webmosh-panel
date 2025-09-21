import React from "react"
import { Button } from "../ui/button"
import { FaDiscord, FaGoogle } from "react-icons/fa"
import { useSignIn } from "@clerk/nextjs"

const SocialLogin = () => {
	const { signIn } = useSignIn()

	return (
		<div className="flex flex-wrap items-center gap-5">
			<Button
				type="button"
				onClick={() =>
					signIn?.authenticateWithRedirect({
						strategy: "oauth_google",
						redirectUrl: `${window.location.origin}/auth/`,
						redirectUrlComplete: `${window.location.origin}/dashboard/`,
					})
				}
				className="flex-1"
			>
				<img
					className="w-5 h-5"
					src="https://img.icons8.com/color/48/google-logo.png"
					alt="google-logo"
				/>
				<span>Login with Google</span>
			</Button>

			<Button
				type="button"
				onClick={() => {
					signIn?.authenticateWithRedirect({
						strategy: "oauth_discord",
						redirectUrl: `${window.location.origin}/auth/`,
						redirectUrlComplete: `${window.location.origin}/dashboard/`,
					})
				}}
				className="flex-1"
			>
				<img
					className="w-5 h-5"
					src="https://img.icons8.com/color/48/discord-logo.png"
					alt="discord-logo"
				/>
				<span>Login with Discord</span>
			</Button>
		</div>
	)
}

export default SocialLogin
