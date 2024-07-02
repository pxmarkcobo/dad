"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuthContext } from "@/contexts/auth-context"
import { storage } from "@/services/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatDate } from "date-fns"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { start } from "@/lib/commands"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FileSchema = z.object({
  name: z.string(),
  type: z.string().refine((type) => type.startsWith("image/"), {
    message: "File must be an image",
  }),
  size: z.number().lte(5 * 1024 * 1024, "File size must be less than 5MB"),
})

const ProfileSchema = z.object({
  displayName: z.string(),
  photoURL: z.string(),
})

type TProfileSchema = z.infer<typeof ProfileSchema>

export default function ProfileForm() {
  const { user, updateUserInfo } = useAuthContext()
  const [file, setFile] = useState<File>()

  const form = useForm<TProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      displayName: user?.displayName ?? "",
      photoURL: user?.photoURL ?? "",
    },
  })

  const onSubmit = async (data: TProfileSchema) => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          console.error("Upload failed", error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL)
            await updateUserInfo({
              displayName: data.displayName,
              photoURL: downloadURL,
            })
            toast("Successful Profile Update", {
              description: formatDate(new Date(), "PPPPp"),
              duration: 3000,
            })
          })
        }
      )
    } else {
      await updateUserInfo({
        displayName: data.displayName,
      })
      toast("Successful Profile Update", {
        description: formatDate(new Date(), "PPPPp"),
        duration: 3000,
      })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const { success, error } = FileSchema.safeParse(file)

      if (!success) {
        form.setError("photoURL", { message: error.issues[0].message })
      } else {
        setFile(file)

        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const content = e.target?.result as string
          form.setValue("photoURL", content)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <section className="my-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 pb-4">
            <div className="min-w-0 flex-1 space-y-8">
              <h2 className="font-semibold">Profile</h2>
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                      Display name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:max-w-sm"
                        placeholder="Please set the full name"
                        required={true}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <Input
                  disabled={true}
                  type="text"
                  value={user?.email ?? ""}
                  className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:max-w-sm"
                />
              </div>
              <FormField
                control={form.control}
                name="photoURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="col-span-1 mb-2 ml-auto block text-sm font-medium text-gray-900 dark:text-white">
                      Photo
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4 align-middle">
                        <span
                          data-slot="avatar"
                          className="inline-grid size-16 shrink-0 overflow-hidden rounded-[--avatar-radius] align-middle outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 *:rounded-[--avatar-radius] dark:outline-white/[--ring-opacity]"
                        >
                          <Image
                            src={field.value}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </span>
                        <div className="flex flex-col text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <Input
                              id="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save Changes
          </Button>
        </form>
      </Form>
    </section>
  )
}
