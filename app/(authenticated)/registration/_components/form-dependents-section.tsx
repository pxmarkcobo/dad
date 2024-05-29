import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { FamilyRelationChoices } from "@/lib/enums"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
      })
    }
  }

  return (
    <>
      <div className="mt-0 space-y-4">
        <h1 className="text-l font-semibold text-gray-900 dark:text-white">
          Dependents
        </h1>
        <div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="mb-1 flex w-full items-center justify-between"
            >
              <Button variant="ghost" size="icon" disabled>
                {index + 1}
              </Button>
              <div className="flex gap-4">
                <FormField
                  control={control}
                  key={`${field.id}.${index}.name`}
                  name={`dependents.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-[250px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                          placeholder="Full Name"
                          {...field}
                        />
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
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          type="date"
                          className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  key={`dependents.${index}.relation`}
                  name={`dependents.${index}.relation`}
                  render={({ field }) => (
                    <FormItem>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[150px] justify-between bg-gray-50 text-left font-normal dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <span className="truncate">
                                {field.value ? field.value : "Relation"}
                              </span>
                              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandInput
                                placeholder="Search relation..."
                                className="h-9"
                              />
                              <CommandEmpty>No relation found.</CommandEmpty>
                              <CommandGroup>
                                {relations.map((relation) => (
                                  <CommandItem
                                    value={relation}
                                    key={`${index}-${relation}`}
                                    onSelect={field.onChange}
                                  >
                                    {relation}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto size-4",
                                        relation === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
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
