"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import { MemberRelationsSchema, MemberSchema } from "@/lib/schema"
import {
  createMember as createMemberAPI,
  updateMemberRelations as updateMemberRelationsAPI,
} from "@/lib/utils"

export async function createMember(payload: unknown) {
  // check if logged in user has the correct permission
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

  const result = await createMemberAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }
  revalidatePath("/home")
  return {
    success: true,
    data: result.data,
  }
}

export async function updateMemberRelations(payload: unknown) {
  const { success, error, data } = MemberRelationsSchema.safeParse(payload)

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

  console.log(data)

  const result = await updateMemberRelationsAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }

  revalidatePath("/home")
  return {
    success: true,
    message: `Successfully updated member relations!`,
  }
}
