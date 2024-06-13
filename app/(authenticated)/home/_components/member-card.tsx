"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemberInfo } from "@/contexts/member-info-context"
import { DocumentReference, getDoc } from "firebase/firestore"
import { MoreVertical, UserCircle } from "lucide-react"

import { CivilStatusChoices } from "@/lib/enums"
import { Beneficiary, BeneficiarySchema } from "@/lib/schema"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import EmptyCard from "./member-card-empty"
import SkeletonCard from "./member-card-loading"
import StatusIcon from "./status-icon"

export default function MemberCardInformation() {
  const { memberInfo: member } = useMemberInfo()
  const [isLoading, setIsLoading] = React.useState(true)
  const [primary, setPrimary] = React.useState<Beneficiary>()
  const [dependents, setDependents] = React.useState<Beneficiary[]>()

  React.useEffect(() => {
    setIsLoading(true)

    if (!member) {
      setIsLoading(false)
      return
    }

    if (member._resolved) {
      setIsLoading(false)
      setPrimary(member.primary_beneficiary as Beneficiary)
      setDependents(member.dependents as Beneficiary[])
    }

    if (!(member.primary_beneficiary instanceof DocumentReference)) {
      setIsLoading(false)
      return
    }

    const resolveDocumentReferences = async () => {
      try {
        // Resolve primary beneficiary
        const doc = await getDoc(
          member.primary_beneficiary as DocumentReference
        )

        const { success, data } = BeneficiarySchema.safeParse({
          id: doc.id,
          ...doc.data(),
        })
        if (success) {
          member.primary_beneficiary = data
          setPrimary(data)
        }

        // Resolve dependents
        const dependentPromises = member.dependents.map((ref) =>
          getDoc(ref as DocumentReference)
        )
        const dependentDocs = await Promise.all(dependentPromises)
        let dependents: any[] = dependentDocs.map((doc) => {
          if (!doc.exists()) return null
          const { success, error, data } = BeneficiarySchema.safeParse({
            id: doc.id,
            ...doc.data(),
          })
          if (error) {
            console.error(error.issues)
          }
          if (!success) return null
          return data
        })

        dependents = dependents.filter((d) => d !== null) as Beneficiary[]

        member.dependents = dependents
        setDependents(dependents)
      } catch (err) {
        console.error("Error resolving document reference:", err)
      } finally {
        setIsLoading(false)
        member._resolved = true
      }
    }
    resolveDocumentReferences()
  }, [member])

  if (!member) {
    return <EmptyCard />
  }

  if (isLoading) {
    return <SkeletonCard />
  }

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/50 px-6 py-2 ">
          <CardTitle className="text-lg">{member.name}</CardTitle>
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
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
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{member.zone}</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Chapel</div>
              <div className="text-muted-foreground">{member.chapel}</div>
            </div>
            <div className="grid gap-3">
              <div className="font-semibold">Barangay</div>
              <address className="grid gap-0.5 not-italic text-muted-foreground">
                <span>{member.barangay}</span>
              </address>
            </div>
            <div className="grid auto-rows-max gap-3">
              <div className="font-semibold">Selda</div>
              <div className="text-muted-foreground">{member.selda}</div>
            </div>
          </div>
          <Separator className="my-4" />
          {primary && (
            <>
              <div className="grid gap-3">
                <div className="font-semibold">Primary Beneficiary</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1">
                      <UserCircle className="size-4" />
                      {primary.name}
                    </dt>
                    <dd>{primary.relation}</dd>
                    <dd>{primary.contact_number}</dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
            </>
          )}
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
              {dependents?.map((dependent) => (
                <tr key={dependent.id}>
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

          <div className="my-4 font-semibold">Remarks</div>
          <p>{member.remarks}</p>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
