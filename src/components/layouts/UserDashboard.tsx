import React, { type ReactNode } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { Separator } from "@radix-ui/react-separator"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb"
import Link from "next/link"
import RequireAuth from "../auth/require-auth"

type Props = {
	children: ReactNode
	pages?: BreadCrumbItems
}

type BreadCrumbItems = Array<{
	title: string
	url?: string
}>

const UserDashboard = ({ children, pages = [] }: Props) => {
	return (
		<RequireAuth>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<Breadcrumb>
								<BreadcrumbList>
									{pages.map((item, index) => {
										return (
											<>
												{index === pages.length - 1 ? (
													<BreadcrumbItem key={item.title}>
														<BreadcrumbPage>{item.title}</BreadcrumbPage>
													</BreadcrumbItem>
												) : (
													<BreadcrumbItem
														className="hidden md:block"
														key={item.title}
													>
														{item.url ? (
															<BreadcrumbLink asChild href={item.url}>
																<Link href={item.url}>{item.title}</Link>
															</BreadcrumbLink>
														) : (
															<>{item.title}</>
														)}
													</BreadcrumbItem>
												)}

												{index < pages.length - 1 && (
													<BreadcrumbSeparator className="hidden md:block" />
												)}
											</>
										)
									})}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</RequireAuth>
	)
}

export default UserDashboard
