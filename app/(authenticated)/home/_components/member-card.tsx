"use client"

import Link from "next/link"
import { useMemberInfo } from "@/contexts/member-info-context"
import { MoreVertical } from "lucide-react"

import { CivilStatusChoices } from "@/lib/enums"
import { formatDate } from "@/lib/utils"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import EmptyCard from "./member-card-empty"
import StatusIcon from "./status-icon"

export default function MemberCardInformation() {
  const { memberInfo: member } = useMemberInfo()
  if (!member) {
    return <EmptyCard />
  }
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="border-1 flex flex-row items-center justify-between border bg-muted/50 px-6 py-1">
        <CardTitle className="text-lg">
          {member.last_name}, {member.first_name} {member.middle_name}
        </CardTitle>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8">
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/member/${member.id}`}>
                <DropdownMenuItem>Edit Member</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="w-full flex-1 overflow-auto px-6 py-2 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Petsang Natawhan</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{formatDate(member.birth_date)}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Registration Date</div>
            <div className="text-muted-foreground">
              {formatDate(member.registration_date)}
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Sex</div>
            <div className="text-muted-foreground">{member.sex}</div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Contact Number</div>
            <div className="text-muted-foreground">{member.contact_number}</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="flex items-center space-x-2">
              <StatusIcon id="isolated" isChecked={member.isolated} />
              <label
                htmlFor="isolated"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nag-inusara
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon id="widowed" isChecked={member.widowed} />
              <label
                htmlFor="widowed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Balo/Biyuda
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon id="live_in" isChecked={member.live_in} />
              <label
                htmlFor="live_in"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Puyo-puyo
              </label>
            </div>
          </div>
          <div className="grid auto-rows-max gap-1">
            <div className="flex items-center space-x-2">
              <StatusIcon
                id="minyo"
                isChecked={member.civil_status !== CivilStatusChoices.Single}
              />
              <label
                htmlFor="minyo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Minyo
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon
                id="kasal-simbahan"
                isChecked={
                  member.civil_status == CivilStatusChoices.ChurchMarriage
                }
              />
              <label
                htmlFor="kasal-simbahan"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kasal sa Simbahan
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon
                id="kasal-sibil"
                isChecked={
                  member.civil_status == CivilStatusChoices.CivilMarriage
                }
              />
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
            <div className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{member.zone}</span>
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Chapel</div>
            <div className="text-muted-foreground">{member.chapel}</div>
          </div>
          <div className="grid gap-3">
            <div className="font-semibold">Barangay</div>
            <div className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{member.barangay}</span>
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Alagad</div>
            <div className="text-muted-foreground">{member.collector}</div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Sitio</div>
            <div className="text-muted-foreground">{member.sitio}</div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Selda</div>
            <div className="text-muted-foreground">{member.selda}</div>
          </div>
        </div>
        <Separator className="my-4" />
        {member.primary_beneficiary && (
          <>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Primary Beneficiary</div>
              <div className="text-muted-foreground">
                {member.primary_beneficiary}
              </div>
            </div>
            <Separator className="my-4" />
          </>
        )}
        {member.dependents.length != 0 && (
          <>
            <div className="my-4 font-semibold">Dependents</div>
            <table className="w-full">
              <thead>
                <tr className="w-full">
                  <th className="text-left">Name</th>
                  <th className="text-left">Birthdate</th>
                  <th className="text-left">Relation</th>
                </tr>
              </thead>
              <tbody>
                {member.dependents.map((dependent, index) => (
                  <tr key={index}>
                    <td className="text-muted-foreground">{dependent.name}</td>
                    <td className="text-muted-foreground">
                      {formatDate(dependent.birth_date)}
                    </td>
                    <td className="text-muted-foreground">
                      {dependent.relation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Separator className="my-4" />
          </>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid place-items-start justify-items-start gap-3">
            <div className="font-semibold">Amount Paid</div>
            <div className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{member.amount}</span>
            </div>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Remarks</div>
            <div className="text-muted-foreground">{member.remarks}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-5">
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  )
}
