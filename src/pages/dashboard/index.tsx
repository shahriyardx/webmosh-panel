import UserDashboard from "@/components/layouts/UserDashboard"
import React from "react"

const Dashboard = () => {
	return (
		<UserDashboard pages={[{ title: "Dashboard" }]}>Hello World</UserDashboard>
	)
}

export default Dashboard
