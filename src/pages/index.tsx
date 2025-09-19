import type { GetServerSideProps } from "next"
import { getAuth } from "@clerk/nextjs/server"

const Homepage = () => {
	return <></>
}

export default Homepage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = getAuth(ctx.req)

	if (session.userId) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		}
	}
	return {
		redirect: {
			destination: "/auth",
			permanent: false,
		},
	}
}
