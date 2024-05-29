"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, Dot } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"

import {
  CivilStatusChoices,
  FamilyRelationChoices,
  SexChoices,
} from "@/lib/enums"
import { Member, MemberSchema } from "@/lib/schema"
import zones from "@/lib/zones"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import Dependents from "./form-dependents-section"
import LocationInformation from "./form-location-section"
import PersonalInformation from "./form-personal-information-section"

export default function RegistrationForm() {
  const form = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      registration_date: new Date(),
      birth_date: new Date(),
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
          birth_date: new Date(),
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
    console.log(data)
  }

  useEffect(() => {
    console.log("error", form.formState.errors)
  }, [form.formState])

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <PersonalInformation />
              <Dot className="mx-auto my-0 size-4" />
              <Dependents />
              <Dot className="mx-auto my-0 size-4" />
              <LocationInformation />
            </div>
          </div>
          <Button className="float-end" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
