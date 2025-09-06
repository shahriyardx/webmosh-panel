import UserDashboard from "@/components/layouts/UserDashboard"
import { api } from "@/utils/api"
import React from "react"

const Dashboard = () => {
	const {data } = api.company.all.useQuery()
	
	return (
		<UserDashboard pages={[{ title: "Dashboard" }]}>Hello World</UserDashboard>
	)
}

export default Dashboard
