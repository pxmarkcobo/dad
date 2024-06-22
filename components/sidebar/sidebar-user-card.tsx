"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
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

import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

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

  if (!user) {
    return (
      <div className="flex flex-row items-center border-t p-2">
        <div className="mr-4 size-10 min-w-[40px] overflow-hidden rounded outline outline-1 outline-slate-300">
          <Skeleton className="size-10 rounded-none bg-slate-300" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32 bg-slate-300" />
          <Skeleton className="h-4 w-32 bg-slate-300" />
        </div>
        <Skeleton className="ml-4 size-6 bg-slate-300" />
      </div>
    )
  }

  return (
    <div className="flex flex-row items-center border-t p-4">
      <div className="mr-3 size-8 min-h-[36px] min-w-[36px] overflow-hidden rounded outline outline-1 outline-slate-300">
        <Image
          src={user.photoURL ?? ""}
          alt="profile-pic"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0qQcAAQ0AxblT1HMAAAAASUVORK5CYII="
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="truncate text-sm font-medium">{user.displayName}</span>
        <span className="truncate text-xs font-light text-zinc-500 dark:text-zinc-400">
          {user.email}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="outline-none">
            <ChevronUp />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
