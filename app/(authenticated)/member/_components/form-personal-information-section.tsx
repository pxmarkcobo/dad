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
        <h2 className="text-l font-semibold">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Please indicate member's full name"
                    autoComplete="off"
                    required={true}
                  />
                </FormControl>
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
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium">
                  Date of Birth
                </FormLabel>
                <Input {...field} type="date" required />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="registration_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm font-medium">
                  Registration Date
                </FormLabel>
                <Input {...field} value={field.value} type="date" required />
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
