import React from "react"
import { Button } from "../ui/button"
import { FaDiscord, FaGoogle } from "react-icons/fa"
import { useSignIn } from "@clerk/nextjs"

const SocialLogin = () => {
	const { signIn } = useSignIn()

	return (
		<div className="flex items-center gap-5">
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
				<FaGoogle />
				<span>Google</span>
			</Button>

			<Button className="flex-1">
				<FaDiscord />
				<span>Discord</span>
			</Button>
		</div>
	)
}

export default SocialLogin
