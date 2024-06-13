import { MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function EmptyCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 px-6 py-2 ">
        <CardTitle className="text-lg"></CardTitle>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8" disabled>
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="my-6 p-6 text-sm">
        <div className="flex h-[560px] w-full items-center justify-center rounded-md">
          <p className="text-center text-sm text-muted-foreground">
            Tip: Select a member to display information
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-5">
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  )
}
