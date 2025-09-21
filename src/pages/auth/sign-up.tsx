import SignInForm from "@/components/auth/sign-in-form"
import AuthLayout from "@/components/auth/auth-layout"
import SignUpForm from "@/components/auth/sign-up-form"

const SignOut = () => {
	return (
		<AuthLayout formName="signUp">
			<SignUpForm />
		</AuthLayout>
	)
}

export default SignOut
