import React, { type ComponentProps } from "react"
import { Loader2 } from "lucide-react"
import { useUser } from "@clerk/nextjs"

const RequireAuth = ({ children }: ComponentProps<"div">) => {
	const { isSignedIn, isLoaded, user } = useUser()

	if (!isLoaded) {
		return (
			<div className="min-h-screen grid place-items-center">
				<div className="flex items-center gap-2">
					<Loader2 className="animate-spin" />
					<h1>Loading...</h1>
				</div>
			</div>
		)
	}

	if (!isSignedIn) {
		return null
	}

	return children
}

export default RequireAuth
