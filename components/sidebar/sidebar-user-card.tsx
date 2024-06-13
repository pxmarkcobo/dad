"use client"

import * as React from "react"
import Image from "next/image"
import carmela from "@/assets/carmela.jpeg"
import { useAuthContext } from "@/contexts/auth-context"
import { auth } from "@/services/firebase"
import { signOut } from "firebase/auth"
import { ChevronUp } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const logout = async () => {
  try {
    await signOut(auth)
    console.log("User signed out")
  } catch (error) {
    console.error("Error signing out: ", error)
  }
}

export default function UserCard() {
  const { user } = useAuthContext()
  return (
    <div className="flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5">
      <div data-slot="section" className="flex flex-col gap-0.5">
        <span className="relative">
          <button
            id="headlessui-menu-button-:Rfjfalta:"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-headlessui-state=""
            className="flex w-full cursor-default items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5 data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:data-[active]:fill-zinc-950 data-[slot=icon]:*:data-[current]:fill-zinc-950 data-[slot=icon]:*:data-[hover]:fill-zinc-950 data-[slot=icon]:*:fill-zinc-500 data-[slot=avatar]:*:[--ring-opacity:10%] data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 dark:text-white dark:data-[active]:bg-white/5 dark:data-[hover]:bg-white/5 dark:data-[slot=icon]:*:data-[active]:fill-white dark:data-[slot=icon]:*:data-[current]:fill-white dark:data-[slot=icon]:*:data-[hover]:fill-white dark:data-[slot=icon]:*:fill-zinc-400 sm:py-2 sm:text-sm/5 sm:data-[slot=avatar]:*:size-6 sm:data-[slot=icon]:*:size-5 sm:data-[slot=icon]:last:*:size-4"
          >
            <span
              className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
              aria-hidden="true"
            ></span>
            <span className="flex min-w-0 items-center gap-3">
              <span
                data-slot="avatar"
                className="inline-grid size-10 shrink-0 overflow-hidden rounded-[--avatar-radius] align-middle outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 *:rounded-[--avatar-radius] dark:outline-white/[--ring-opacity]"
              >
                <Image
                  src={user?.photoURL ?? ""}
                  alt=""
                  width={100}
                  height={100}
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  {user?.displayName}
                </span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  {user?.email}
                </span>
              </span>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ChevronUp />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
        </span>
      </div>
    </div>
  )
}
