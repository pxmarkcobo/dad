"use client"

import { useGlobalContext } from "@/contexts/global-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDate } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Collector, CollectorSchema } from "@/lib/schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormSelectDropdown from "@/components/form/form-select-dropdown"
import { SubmitButton } from "@/components/form/form-submit-button"
import { postCollectorAction } from "@/app/actions"

export function CollectorForm({
  initial,
  callback,
}: {
  initial?: Collector
  callback(): void
}) {
  const { zones, sitios, chapels, modifyCollector, addCollector } =
    useGlobalContext()
  const create = initial === undefined

  const form = useForm<Collector>({
    resolver: zodResolver(CollectorSchema),
    defaultValues: {
      id: initial?.id ?? "",
      name: initial?.name ?? "",
      zone: initial?.zone ?? zones[0],
      sitio: initial?.sitio ?? "",
      chapel: initial?.chapel ?? "",
    },
  })

  const onSubmit = async (data: Collector) => {
    const {
      success,
      error_message,
      data: collector,
    } = await postCollectorAction(data)
    let message = ""
    if (success) {
      if (!create) {
        modifyCollector(collector)
        message = "Successful Collector Update"
      } else {
        addCollector(collector)
        message = "Successful Collector Registration"
      }
      toast(message, {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
      callback()
    } else {
      toast(`Error: ${error_message}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <div className="min-w-0 flex-1 space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block text-sm font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" required={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSelectDropdown
              control={form.control}
              name="zone"
              options={zones}
              label="Zone"
            />
            <FormSelectDropdown
              control={form.control}
              name="sitio"
              options={sitios}
              label="Sitio"
            />
            <FormSelectDropdown
              control={form.control}
              name="chapel"
              options={chapels}
              label="Chapel"
            />
          </div>
        </div>
        <SubmitButton text={create ? "Submit" : "Save Changes"} />
      </form>
    </Form>
  )
}
