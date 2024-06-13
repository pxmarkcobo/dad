import React, { useState } from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Control, Controller } from "react-hook-form"

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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectDropdownProps {
  control: Control<any>
  name: string
  options: string[]
  label: string
}

const FormSelectDropdown: React.FC<SelectDropdownProps> = ({
  control,
  name,
  options,
  label,
}) => {
  const [open, onOpenChange] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="mb-2 block text-sm">{label}</FormLabel>
          <Popover modal={true} open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {field.value ? field.value : `Select ${label.toLowerCase()}`}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option}
                        key={option}
                        onSelect={() => {
                          field.onChange(option)
                          onOpenChange(false)
                        }}
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelectDropdown
