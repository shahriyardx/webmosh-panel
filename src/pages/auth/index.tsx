import { getAuth } from "@clerk/nextjs/server"
import type { GetServerSideProps } from "next"

const AuthIndex = () => {
	return <></>
}

export default AuthIndex

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
			destination: "/auth/sign-in",
			permanent: false,
		},
	}
}
