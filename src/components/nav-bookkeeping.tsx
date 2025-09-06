"use client"

import {
	ArrowLeftRight,
	Building2,
	ChartNoAxesCombined,
	ChevronRight,
	GitGraph,
	LayoutDashboard,
	Notebook,
	Rocket,
	type LucideIcon,
} from "lucide-react"

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavBookKeeping() {
	const BASE_URL = "/dashboard/book-keeping"
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Bookkeeping</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href={`${BASE_URL}/transactions`}>
							<ArrowLeftRight />
							<span>Transactions</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href={`${BASE_URL}/invoices`}>
							<Notebook />
							<span>Invoices</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link href={`${BASE_URL}/transactions`}>
							<ChartNoAxesCombined />
							<span>Reports</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	)
}
