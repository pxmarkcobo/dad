import Image from "next/image"
import Link from "next/link"
import avatar from "@/assets/avatar.jpg"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import MobileSidebar from "./mobile-sidebar"

export default function MobileHeader() {
  return (
    <header className="static z-40 w-full pb-4 lg:hidden">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div className="flex gap-2">
            <MobileSidebar />
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="size-6" />
            </Link>
          </div>
          <nav className="hidden gap-6 sm:flex">
            {siteConfig.mainNav.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
