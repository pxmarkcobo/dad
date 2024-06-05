"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BriefcaseBusiness, Home, Settings, Users2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { CommandDialogDemo } from "./search"
import UserCard from "./sidebar-user-card"
import { ThemeToggle } from "./theme-toggle"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-full flex-col">
      <div className="flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
        <div data-slot="section" className="flex flex-col gap-0.5">
          <span className="relative flex w-full justify-between">
            <button
              id="headlessui-menu-button-:R1qjfalta:"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-headlessui-state=""
              className="flex w-full cursor-default items-center justify-between rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:data-[active]:fill-zinc-950 data-[slot=icon]:*:data-[current]:fill-zinc-950 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[slot=icon]:*:fill-zinc-500 data-[slot=avatar]:*:[--ring-opacity:10%] data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 dark:text-white dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white dark:data-[slot=icon]:*:data-[current]:fill-white dark:data-[slot=icon]:*:data-[hover]:fill-white dark:data-[slot=icon]:*:fill-zinc-400 sm:py-2 sm:text-sm/5 sm:data-[slot=avatar]:*:size-6 sm:data-[slot=icon]:*:size-5 sm:data-[slot=icon]:last:*:size-4"
            >
              <div className="flex items-center gap-3">
                <Icons.logo className="size-6" />
                <span className="truncate">Death Aid</span>
              </div>
            </button>
            <ThemeToggle />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8">
        <div data-slot="section" className="flex flex-col gap-3">
          <span className="relative">
            <Link
              href="/home"
              className="text-md flex items-center gap-2 font-medium"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  pathname == "/home"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                <Home className="size-5" />
              </span>
              Home
            </Link>
          </span>
          <span className="relative">
            <Link
              href="/member"
              className="text-md flex items-center gap-2 font-medium"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  pathname == "/register"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                <Users2 className="size-5" />
              </span>
              Register
            </Link>
          </span>
          <span className="relative">
            <Link
              href="/officers"
              className="text-md flex items-center gap-2 font-medium"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  pathname == "/officers"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                <BriefcaseBusiness className="size-5" />
              </span>
              Officers
            </Link>
          </span>
          <span className="relative">
            <Link
              href="/settings"
              className="text-md flex items-center gap-2 font-medium"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full",
                  pathname == "/settings"
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                )}
              >
                <Settings className="size-5" />
              </span>
              Settings
            </Link>
          </span>
        </div>
      </div>
      <UserCard />
    </nav>
  )
}
