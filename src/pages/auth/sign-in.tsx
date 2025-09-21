import SignInForm from "@/components/auth/sign-in-form"
import AuthLayout from "@/components/auth/auth-layout"

const SignIn = () => {
	return (
		<AuthLayout formName="signIn">
			<SignInForm />
		</AuthLayout>
	)
}

export default SignIn
