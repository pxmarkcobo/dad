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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/50 px-6 py-2 ">
        <CardTitle className="text-lg"></CardTitle>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8">
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Petsang Natawhan</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <Skeleton className="h-[23px] w-[150px]" />
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Registration Date</div>
            <div className="text-muted-foreground">
              <Skeleton className="h-[23px] w-[150px]" />
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="isolated"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nag-inusara
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="balo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Balo/Biyuda
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="puyo-puyo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Puyo-puyo
              </label>
            </div>
          </div>
          <div className="grid auto-rows-max gap-1">
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="minyo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Minyo
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="kasal-simbahan"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kasal sa Simbahan
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="size-[23px] rounded-full" />
              <label
                htmlFor="kasal-sibil"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kasal sa Sibil
              </label>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Zone</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Chapel</div>
            <div className="text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">Barangay</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Selda</div>
            <div className="text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Sitio</div>
            <div className="text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Alagad</div>
            <div className="text-muted-foreground">
              <Skeleton className="h-[20px] w-[150px]" />
            </div>
          </div>
        </div>
        <Separator className="my-4" />

        <div className="grid gap-3">
          <div className="font-semibold">Primary Beneficiary</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1">
                <Skeleton className="size-4" />
                <Skeleton className="h-[20px] w-[100px]" />
              </dt>
              <dd>
                <Skeleton className="h-[20px] w-[100px]" />
              </dd>
              <dd>
                <Skeleton className="h-[20px] w-[100px]" />
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />

        <div className="my-4 font-semibold">Dependents</div>
        <table className="size-full table-auto">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Birthdate</th>
              <th className="text-left">Relation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-muted-foreground">
                <Skeleton className="h-[20px] w-[100px]" />
              </td>
              <td className="text-muted-foreground">
                <Skeleton className="h-[20px] w-[100px]" />
              </td>
              <td className="text-muted-foreground">
                <Skeleton className="h-[20px] w-[100px]" />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-4 font-semibold">Remarks</div>
        <Skeleton className="h-[23px] w-[350px]" />
      </CardContent>
    </Card>
  )
}
