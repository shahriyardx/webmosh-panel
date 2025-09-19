import { Rocket } from "lucide-react"
import React from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import UserDashboard from "@/components/layouts/UserDashboard"

const Dashboard = () => {
	return (
		<UserDashboard pages={[{ title: "Dashboard" }]}>
			<div className="h-full grid place-items-center">
				<div className="flex flex-col gap-2 items-center">
					<DotLottieReact src="/running.lottie" loop autoplay />
					<h1 className="text-2xl font-bold">Coming Soon...</h1>
				</div>
			</div>
		</UserDashboard>
	)
}

export default Dashboard
