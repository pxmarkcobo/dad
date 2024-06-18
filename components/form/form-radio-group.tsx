import React from "react"
import { Control, Controller } from "react-hook-form"

import { FormControl, FormItem, FormLabel } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface RadioFieldProps {
  control: Control<any>
  name: string
  label: string
  options: { value: string; label: string; description: string }[]
}

const FormRadioGroup: React.FC<RadioFieldProps> = ({
  control,
  name,
  label,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-medium leading-none">
            {label}
          </FormLabel>
          <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
            Please select one of the choices below
          </p>
          <FormControl>
            <RadioGroup
              defaultValue={options[0]?.value}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
              name={name}
              onValueChange={field.onChange}
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormControl>
                    <FormLabel htmlFor={option.value}>
                      <div className="h-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center">
                          <div className="flex h-5 items-center">
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              outerSize="6"
                              innerSize="3.5"
                            />
                          </div>
                          <div className="ms-4 text-xs">
                            <label className="cursor-pointer font-medium">
                              {option.label}
                            </label>
                            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default FormRadioGroup
