"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { formatDate, generateRegistrationReport } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  registration_date: z.coerce
    .date()
    .transform((val) => formatDate(val, "yyyy-MM-dd")),
})

export function ExportRegistrationDataForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      registration_date: formatDate(new Date(), "yyyy-MM-dd"),
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    await generateRegistrationReport(data)
    toast("Success!", {
      description: "Please review the downloaded file.",
      duration: 3000,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
        <FormField
          control={form.control}
          name="registration_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-xs font-medium">
                Registration Date
              </FormLabel>
              <Input {...field} type="date" required />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Form>
  )
}
