"use server"

import {
  CollectorSchema,
  CoordinatorSchema,
  MemberRelationsSchema,
  MemberSchema,
} from "@/lib/schema"
import {
  createMember as createMemberAPI,
  postCollectorAPI,
  postCoordinatorAPI,
  updateMemberRelations as updateMemberRelationsAPI,
} from "@/lib/utils"

export async function createMemberAction(payload: unknown) {
  // TODO: check if logged in user has the correct permission
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
