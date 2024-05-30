"use client"

import { useEffect, useState } from "react"
import { useGlobalData } from "@/contexts/global-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDate } from "date-fns"
import { Dot } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  CivilStatusChoices,
  FamilyRelationChoices,
  SexChoices,
} from "@/lib/enums"
import { Beneficiary, Member, MemberSchema, Zone } from "@/lib/schema"
import { Form } from "@/components/ui/form"
import { createMember } from "@/app/actions"

import EditMemberRelations from "./edit-relations"
import Dependents from "./form-dependents-section"
import LocationInformation from "./form-location-section"
import PersonalInformation from "./form-personal-information-section"
import { SubmitButton } from "./submit-button"

export default function RegistrationForm() {
  const { zones } = useGlobalData()
  const [open, setOpen] = useState(false)
  const [zone, setZone] = useState<Zone>(zones[0])
  const [dependents, setDependents] = useState<Beneficiary[]>([])
  const [memberID, setMemberID] = useState<string>("")

  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      registration_date: formatDate(new Date(), "MM/dd/yyyy"),
      birth_date: formatDate(new Date(), "MM/dd/yyyy"),
      name: "",
      sex: SexChoices.Male,
      isolated: false,
      widowed: false,
      puyopuyo: false,
      address: "",
      chapel: "",
      selda: "",
      zone: zones[0],
      civil_status: CivilStatusChoices.Single,
      dependents: [
        {
          name: "",
          relation: FamilyRelationChoices.Mother,
          birth_date: formatDate(new Date(), "MM/dd/yyyy"),
          contact_number: "",
        },
      ],
      roles: {
        collector: false,
        coordinator: false,
      },
      remarks: "",
    },
  })

  const onSubmit = async (data: Member) => {
    const response = await createMember(data)
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

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
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
        />
      )}
    </FormProvider>
  )
}
