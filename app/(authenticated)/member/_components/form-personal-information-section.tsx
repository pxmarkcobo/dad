import { useFormContext } from "react-hook-form"

import { SexChoices } from "@/lib/enums"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormCheckboxField from "@/components/form/form-checkbox"
import FormRadioGroup from "@/components/form/form-radio-group"
import FormSelectDropdown from "@/components/form/form-select-dropdown"

const statusOptions = [
  {
    name: "isolated",
    label: "Isolated",
    description: "Separated, alone, no contact",
  },
  {
    name: "widowed",
    label: "Widowed",
    description: "Spouse has passed away",
  },
  {
    name: "puyopuyo",
    label: "Live In",
    description: "Couple living together, unmarried",
  },
]

const civilStatusChoices = [
  {
    value: "Single",
    label: "Single",
    description: "Not in a relationship",
  },
  {
    value: "Church Marriage",
    label: "Church Marriage",
    description: "Religious wedding ceremony",
  },
  {
    value: "Civil Marriage",
    label: "Civil Marriage",
    description: "Non-religious legal wedding",
  },
]

export default function PersonalInformation() {
  const sexChoices = Object.values(SexChoices)

  const { control, setValue } = useFormContext()

  return (
    <>
      <div className="space-y-4">
        <div className="flex w-full items-end justify-between">
          <h2 className="text-l font-semibold">Basic Information</h2>
          <FormField
            control={control}
            name="registration_date"
            render={({ field }) => (
              <FormItem className="col-span-1 col-start-4 place-items-end	place-self-center">
                <FormLabel className="block text-xs">
                  Registration Date
                </FormLabel>
                <Input
                  {...field}
                  value={field.value}
                  type="date"
                  required
                  className="m-0 border-0 p-0"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <FormField
            control={control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-xs font-medium">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-xs font-medium">
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-xs font-medium">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-xs font-medium">
                  Date of Birth
                </FormLabel>
                <Input {...field} type="date" required />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSelectDropdown
            control={control}
            name="sex"
            options={sexChoices}
            label="Sex"
          />

          <FormField
            control={control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-xs font-medium">
                  Contact Number
                </FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="primary_beneficiary"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="mb-2 block text-xs font-medium">
                  Primary Beneficiary
                </FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-sm font-medium leading-none">Situation</h1>
        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Please select all that applies
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {statusOptions.map((option) => (
            <FormCheckboxField
              key={option.name}
              control={control}
              name={option.name}
              label={option.label}
              description={option.description}
            />
          ))}
        </div>
        <FormRadioGroup
          control={control}
          name="civil_status"
          label="Civil Status"
          options={civilStatusChoices}
        />
      </div>
    </>
  )
}
