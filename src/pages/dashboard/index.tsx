import React from "react"
import { getAuth } from "@clerk/nextjs/server"
import type { GetServerSideProps } from "next"
import { db } from "@/server/db"

const Dashboard = () => {
	return <></>
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = getAuth(ctx.req)

	if (!session.isAuthenticated) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	const companies = await db.company.findMany({
		where: {
			userId: session.userId,
		},
	})

	if (companies.length <= 0) {
		return {
			redirect: {
				destination: "/dashboard/add-company",
				permanent: false,
			},
		}
	}

	return {
		props: {},
		redirect: {
			destination: `/dashboard/${companies[0]?.id}`,
		},
	}
}
