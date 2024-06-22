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
    <Card className="flex h-full flex-col">
      <CardHeader className="border-1 flex flex-row items-center justify-between border-b bg-muted/50 px-6 py-1">
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
      <CardContent className="flex w-full flex-1 items-center justify-center rounded-md p-6 text-sm">
        <p className="text-center text-sm text-muted-foreground">
          Tip: Select a member to display information
        </p>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-5">
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  )
}
