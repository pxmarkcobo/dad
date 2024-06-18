import { useFieldArray, useFormContext } from "react-hook-form"

import { FamilyRelationChoices } from "@/lib/enums"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormSelectDropdown from "@/components/form/form-select-dropdown"

export default function Dependents() {
  const relations = Object.values(FamilyRelationChoices)
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: "dependents",
    control: control,
  })

  const addDependent = (): void => {
    if (fields.length < 10) {
      append({
        name: "",
        relation: FamilyRelationChoices.Mother,
        birth_date: new Date(),
        contact_number: "",
      })
    }
  }

  return (
    <>
      <div className="mt-0 space-y-4">
        <h1 className="text-l font-semibold text-gray-900 dark:text-white">
          Dependents
        </h1>
        <div className="max-w-6xl">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-6 flex items-end justify-center gap-4"
            >
              <Button variant="ghost" size="icon" disabled>
                {index + 1}
              </Button>
              <div className="grid w-full grid-cols-2 place-content-center gap-3 md:grid-cols-4">
                <FormField
                  control={control}
                  key={`${field.id}.${index}.name`}
                  name={`dependents.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="mb-2 block text-xs">Name</FormLabel>
                      <FormControl>
                        <Input {...field} required={true} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  key={`${field.id}.${index}.contact_number`}
                  name={`dependents.${index}.contact_number`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="mb-2 block text-xs">
                        Contact number
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
                  key={`${field.id}.${index}.birth_date`}
                  name={`dependents.${index}.birth_date`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="mb-2 block text-xs">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSelectDropdown
                  control={control}
                  name={`dependents.${index}.relation`}
                  options={relations}
                  label="Relation"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={fields.length >= 10}
            onClick={addDependent}
          >
            Add dependent
          </Button>
        </div>
      </div>
    </>
  )
}
