"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/contexts/auth-context"
import {
  BriefcaseBusiness,
  Home,
  LucideIcon,
  Settings,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { ThemeToggle } from "../themes/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import UserCard from "./sidebar-user-card"

const links = [
  {
    href: "/home",
    title: "Home",
    icon: Home,
  },
  {
    href: "/member",
    title: "Register",
    icon: Users2,
  },
  {
    href: "/officers",
    title: "Officers",
    icon: BriefcaseBusiness,
  },
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
  },
]

interface NavigationLinkProps {
  href: string
  title: string
  active: boolean
  collapsed: boolean
  icon: LucideIcon
}

const NavigationLink = ({
  href,
  title,
  active,
  collapsed,
  icon: Icon,
}: NavigationLinkProps) => {
  if (collapsed) {
    return (
      <Tooltip key={href} delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href={href}>
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-full",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
        </TooltipContent>
      </Tooltip>
    )
  }
  return (
    <Link href={href} className="text-md flex items-center gap-2 font-medium">
      <span
        className={cn(
          "flex size-8 min-w-[32px] items-center justify-center rounded-full",
          active
            ? "bg-primary text-primary-foreground"
            : "bg-accent text-accent-foreground"
        )}
      >
        <Icon className="size-5" />
      </span>
      {title}
    </Link>
  )
}

interface SidebarProps {
  collapsed: boolean
}
export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuthContext()

  if (collapsed) {
    return (
      <nav className="flex h-screen flex-col items-center justify-center gap-4 py-4">
        <Link href="/home" className="flex justify-center">
          <Icons.logo className="size-7" />
        </Link>
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            {links.map((link, index) => (
              <NavigationLink
                key={index}
                href={link.href}
                title={link.title}
                active={pathname == link.href}
                collapsed={collapsed}
                icon={link.icon}
              />
            ))}
          </div>
        </div>
        <ThemeToggle />
        <Image
          src={user?.photoURL ?? ""}
          alt="profile-pic"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0qQcAAQ0AxblT1HMAAAAASUVORK5CYII="
          width={100}
          height={100}
          className="size-10 rounded"
        />
      </nav>
    )
  }

  return (
    <nav className="flex h-screen flex-col">
      <div className="flex flex-row justify-between p-4">
        <div className="align-center flex flex-row items-center gap-2">
          <Icons.logo className="size-7" />
          <p className="text-md truncate font-semibold">Death Aid</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex-1 px-4">
        <div className="flex flex-col gap-3">
          {links.map((link, index) => (
            <NavigationLink
              key={index}
              href={link.href}
              title={link.title}
              active={pathname == link.href}
              collapsed={collapsed}
              icon={link.icon}
            />
          ))}
        </div>
      </div>
      <UserCard />
    </nav>
  )
}
