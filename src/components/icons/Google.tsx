import React from "react"

const GoogleIcon = ({ size = 48 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 48 48"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-labelledby="googleLogoTitle"
	>
		<title id="googleLogoTitle">Google Logo</title>
		<path
			fill="#EA4335"
			d="M24 9.5c3.04 0 5.77 1.05 7.94 2.77l5.93-5.93C33.27 2.38 28.89 0 24 0 14.61 0 6.67 5.87 2.97 14.23l6.88 5.34C11.57 13.44 17.31 9.5 24 9.5z"
		/>
		<path
			fill="#34A853"
			d="M24 48c6.48 0 11.91-2.14 15.88-5.8l-7.35-6.01C29.76 37.66 27.07 38.5 24 38.5c-6.6 0-12.19-4.44-14.18-10.5l-7.51 5.79C6.5 42.64 14.67 48 24 48z"
		/>
		<path
			fill="#4A90E2"
			d="M46.5 24c0-1.53-.13-3-.38-4.42H24v8.37h12.65c-.55 2.85-2.2 5.25-4.67 6.84l7.35 6.01C43.88 36.87 46.5 30.94 46.5 24z"
		/>
		<path
			fill="#FBBC05"
			d="M9.82 27.99c-.46-1.34-.72-2.76-.72-4.24s.26-2.9.72-4.24l-7.51-5.79C.82 17.87 0 20.87 0 24s.82 6.13 2.31 9.28l7.51-5.29z"
		/>
	</svg>
)

export default GoogleIcon
