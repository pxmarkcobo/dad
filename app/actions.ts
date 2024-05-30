"use server"

import { revalidatePath } from "next/cache"

import { MemberSchema } from "@/lib/schema"

export async function createMember(payload: unknown) {
  // check if logged in user has the correct permission
  // validate payload
  const { success, error, data } = MemberSchema.safeParse(payload)

  if (!success) {
    let formErrors = {}
    error.issues.forEach((issue) => {
      formErrors = { ...formErrors, [issue.path[0]]: issue.message }
    })

    return {
      success: false,
      error_message: formErrors,
    }
  }

  revalidatePath("/home")
  return {
    success: true,
    message: `Successfully registered a new member!`,
  }
  // create member instance
  // return message -> show alert
}
