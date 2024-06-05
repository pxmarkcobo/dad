"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/contexts/global-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { Dot } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  CivilStatusChoices,
  FamilyRelationChoices,
  SexChoices,
} from "@/lib/enums"
import {
  Beneficiary,
  Collector,
  Member,
  MemberSchema,
  Zone,
} from "@/lib/schema"
import { Form } from "@/components/ui/form"
import { postMemberAction } from "@/app/actions"

import { SubmitButton } from "../../../../components/submit-button"
import EditMemberRelations from "./edit-relations"
import Dependents from "./form-dependents-section"
import LocationInformation from "./form-location-section"
import PersonalInformation from "./form-personal-information-section"

export default function MemberForm({ initial }: { initial?: Member }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { zones } = useGlobalContext()

  const [memberID, setMemberID] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [zone, setZone] = useState<Zone>(zones[0])
  const [dependents, setDependents] = useState<Beneficiary[]>([])
  const [collector, setCollector] = useState<Collector | undefined>(
    initial?.collector
  )

  const defaultValues = {
    registration_date: formatDate(new Date(), "yyyy-MM-dd"),
    birth_date: "",
    name: "",
    sex: SexChoices.Male,
    isolated: false,
    widowed: false,
    live_in: false,
    barangay: "",
    chapel: "",
    selda: "",
    zone: zones[0],
    civil_status: CivilStatusChoices.Single,
    dependents: [
      {
        name: "",
        relation: FamilyRelationChoices.Mother,
        birth_date: "",
        contact_number: "",
      },
    ],
    roles: {
      collector: false,
      coordinator: false,
    },
    remarks: "",
  }
  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: initial ?? defaultValues,
  })

  const onSubmit = async (data: Member) => {
    const response = await postMemberAction(data)
    if (response.success) {
      toast("Successful Member Registration", {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
      setMemberID(response.data?.memberID as string)
      setZone(data.zone)
      setDependents(response.data?.dependents as Beneficiary[])
      setOpen(true)
    } else {
      toast(`Error: ${response.error_message}`)
    }
  }

  const reset = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["members"],
      refetchType: "active",
    })

    if (initial) {
      router.back()
    } else {
      form.reset()
      setMemberID("")
      setDependents([])
      setCollector(undefined)

      const element = document.getElementById("page-header")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div id="form" className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <PersonalInformation />
              <Dot className="mx-auto my-0 size-4" />
              <Dependents />
              <Dot className="mx-auto my-0 size-4" />
              <LocationInformation />
            </div>
          </div>
          <SubmitButton text="Next" />
        </form>
      </Form>
      {memberID && (
        <EditMemberRelations
          open={open}
          onOpenChange={setOpen}
          memberID={memberID}
          zone={zone}
          dependents={dependents}
          collector={collector}
          reset={reset}
        />
      )}
    </FormProvider>
  )
}
