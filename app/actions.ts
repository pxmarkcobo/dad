"use server"

import {
  CollectorSchema,
  CoordinatorSchema,
  MemberRelationsSchema,
  MemberSchema,
} from "@/lib/schema"
import {
  postCollectorAPI,
  postCoordinatorAPI,
  postMemberAPI,
  updateMemberRelations as updateMemberRelationsAPI,
} from "@/lib/utils"

export async function postMemberAction(payload: unknown) {
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

  const result = await postMemberAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }
  return {
    success: true,
    data: result.data,
  }
}

export async function updateMemberRelationsAction(payload: unknown) {
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

  const result = await updateMemberRelationsAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }

  return { success: true }
}

export async function postCollectorAction(payload: unknown) {
  const { success, error, data } = CollectorSchema.safeParse(payload)

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

  const result = await postCollectorAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }

  return { success: true, data: result.data }
}

export async function postCoordinatorAction(payload: unknown) {
  const { success, error, data } = CoordinatorSchema.safeParse(payload)

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

  const result = await postCoordinatorAPI(data)

  if (!result.success) {
    return {
      success: false,
      error_message: result.error_message,
    }
  }

  return { success: true, data: result.data }
}
