import React from "react"
import { Control, Controller } from "react-hook-form"

import { Checkbox } from "../ui/checkbox"
import { FormControl, FormItem, FormLabel } from "../ui/form"

interface CheckboxFieldProps {
  control: Control<any>
  name: string
  label: string
  description: string
}

const FormCheckboxField: React.FC<CheckboxFieldProps> = ({
  control,
  name,
  label,
  description,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center space-y-0 rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
          <FormControl className="flex items-center">
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...field}
              size="6"
            />
          </FormControl>
          <div className="ms-4 text-xs">
            <FormLabel className="text-xs font-medium leading-none">
              {label}
            </FormLabel>
            <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </FormItem>
      )}
    />
  )
}

export default FormCheckboxField
