"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import avatar from "@/assets/avatar.jpg"
import {
  BriefcaseBusiness,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileSidebar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 px-0 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="home"
              className="text-md flex items-center gap-2 px-2.5 font-medium text-muted-foreground hover:text-foreground"
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
            <Link
              href="register"
              className="text-md flex items-center gap-2 px-2.5 font-medium text-muted-foreground hover:text-foreground"
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
            <Link
              href="officers"
              className="text-md flex items-center gap-2 px-2.5 font-medium text-muted-foreground hover:text-foreground"
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
            <Link
              href="settings"
              className="text-md flex items-center gap-2 px-2.5 font-medium text-muted-foreground hover:text-foreground"
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
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
