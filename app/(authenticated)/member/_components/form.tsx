"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/contexts/auth-context"
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
import { Member, MemberSchema } from "@/lib/schema"
import { Form } from "@/components/ui/form"
import { postMemberAction } from "@/app/actions"

import { SubmitButton } from "../../../../components/form/form-submit-button"
import Dependents from "./form-dependents-section"
import LocationInformation from "./form-location-section"
import PersonalInformation from "./form-personal-information-section"

export default function MemberForm({ initial }: { initial?: Member }) {
  const router = useRouter()
  const { user } = useAuthContext()
  const queryClient = useQueryClient()

  const defaultValues = {
    registration_date: formatDate(new Date(), "yyyy-MM-dd"),
    birth_date: "",
    name: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    contact_number: "",
    sex: SexChoices.Male,
    isolated: false,
    widowed: false,
    live_in: false,
    zone: "1",
    chapel: "",
    barangay: "",
    sitio: "",
    selda: "",
    collector: "",
    civil_status: CivilStatusChoices.Single,
    primary_beneficiary: "",
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
    amount: 160,
    remarks: "",
    history: [`Member registered by ${user?.email}`],
  }
  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: initial ?? defaultValues,
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState])

  const onSubmit = async (data: Member) => {
    const response = await postMemberAction(data)
    if (response.success) {
      toast("Successful member registration", {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
      reset()
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
          <SubmitButton text="Submit" />
        </form>
      </Form>
    </FormProvider>
  )
}
