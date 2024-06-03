"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import cover from "@/assets/login-cover.jpg"
import { useAuthContext } from "@/contexts/auth-context"
import { auth } from "@/services/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email")
    .min(6, "Must be at least 6 characters"),
  password: z.string().min(6, "Minimum of 6 characters"),
})

type LoginFormType = z.infer<typeof LoginFormSchema>

export default function Login() {
  const router = useRouter()
  const { user } = useAuthContext()
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      router.replace("/home")
    } else {
      setLoading(false)
    }
  }, [user, router])

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  async function login(data: LoginFormType) {
    const { email, password } = data

    form.clearErrors()
    setSubmitting(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      form.setError("email", { type: "custom", message: "" })
      form.setError("password", {
        type: "custom",
        message: "Invalid login credentials.",
      })
    }
    setSubmitting(false)
  }

  if (loading) {
    return null
  }

  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please enter email"
                          className="focus-visible:ring-0"
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex grow flex-col">
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Please enter password"
                          className="focus-visible:ring-0"
                          type="password"
                          disabled={submitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                Login
              </Button>
            </form>
          </Form>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={cover}
          alt="Image"
          width="1920"
          height="1080"
          className="size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
