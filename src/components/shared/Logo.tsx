import { cn } from "@/lib/utils"
import React, { type ComponentProps } from "react"

const Logo = ({ className }: ComponentProps<"div">) => {
	return (
		<div className={cn("flex items-center font-bold text-xl", className)}>
			<span>Web</span>
			<span className="font-thin">Mosh</span>
		</div>
	)
}

export default Logo
