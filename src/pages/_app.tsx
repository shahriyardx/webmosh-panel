import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { api } from "@/utils/api"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ClerkProvider>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</ClerkProvider>
	)
}

export default api.withTRPC(MyApp)
