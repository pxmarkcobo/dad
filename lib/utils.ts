import { firestore } from "@/services/firebase"
import { faker } from "@faker-js/faker"
import { clsx, type ClassValue } from "clsx"
import { format, parse, parseISO } from "date-fns"
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { twMerge } from "tailwind-merge"

import {
  Beneficiary,
  Collector,
  CollectorSchema,
  Coordinator,
  CoordinatorSchema,
  Member,
  MemberRelationsSchema,
  MemberSchema,
  Zone,
  ZoneSchema,
} from "./schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Formats a date string or Date object to the specified format.
 *
 * @param date - The date to format. Can be a string or Date object.
 * @param dateFormat - The format string to use. Default is 'MMMM do, yyy'.
 * @returns The formatted date string.
 */
export const formatDate = (
  date: string | Date,
  dateFormat: string = "MMMM do, yyy"
): string => {
  // Parse the date if it's a string

  const dateObj =
    typeof date === "string" ? parse(date, "MM/dd/yyyy", new Date()) : date

  // Format the date using the specified format
  return format(dateObj, dateFormat)
}

export async function fetchMembers() {
  const memberCollection = collection(firestore, "members")
  const q = query(memberCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const members: any[] = querySnapshot.docs.map((doc) => {
    const { success, error, data } = MemberSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
    if (success) {
      data.id = doc.id
      return data as Member
    } else {
      console.error(error.issues)
    }
  })
  return members
}

export async function createMember(payload: unknown) {
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

  // Create beneficiaries
  const dependents: any[] = [...data.dependents]
  const beneficiaryCollection = collection(firestore, "beneficiaries")

  const dependentRefs = []
  for (const dependent of dependents) {
    const beneficiaryRef = await addDoc(beneficiaryCollection, dependent)
    console.log("Beneficiary document written with ID: ", beneficiaryRef.id)
    dependentRefs.push(beneficiaryRef)
    dependent.id = beneficiaryRef.id
  }

  data.dependents = dependentRefs

  // TODO: try-catch
  const memberCollection = collection(firestore, "members")
  console.log(data)
  const docRef = await addDoc(memberCollection, data)
  console.log("Member document written with ID: ", docRef.id)
  return {
    success: true,
    data: {
      memberID: docRef.id,
      dependents: dependents,
    },
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

  // TODO: try-catch
  const memberRef = doc(firestore, "members", data.memberID)
  const fields = {
    primary_beneficiary: doc(
      firestore,
      "beneficiaries",
      data.primaryBeneficiary.id as string
    ),
    collector: doc(firestore, "collectors", data.collector.id as string),
  }
  console.log("Fields", fields)
  await updateDoc(memberRef, fields)
  console.log(`Member with ID ${data.memberID} relation updated`)

  return { success: true }
}

export async function fetchZones() {
  const zoneCollection = collection(firestore, "zones")
  const q = query(zoneCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const zones: any[] = querySnapshot.docs.map((doc) => {
    const { success, error, data } = ZoneSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
    if (success) {
      data.id = doc.id
      return data as Zone
    } else {
      console.error(error.issues)
    }
  })
  return zones
}

export async function fetchCollectors() {
  const collectorCollection = collection(firestore, "collectors")
  const q = query(collectorCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const collectors: any[] = querySnapshot.docs.map((doc) => {
    const { success, error, data } = CollectorSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
    if (success) {
      data.id = doc.id
      return data as Collector
    } else {
      console.error(error.issues)
    }
  })
  return collectors
}

export async function fetchCoordinators() {
  const coordinatorCollection = collection(firestore, "coordinators")
  const q = query(coordinatorCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const coordinators: any[] = querySnapshot.docs.map((doc) => {
    const { success, error, data } = CoordinatorSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
    if (success) {
      data.id = doc.id
      return data as Coordinator
    } else {
      console.error(error.issues)
    }
  })
  return coordinators
}

export async function postCollectorAPI(payload: unknown) {
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

  let { id, ...fields } = data

  if (id === "") {
    // create collector
    const collectorCollection = collection(firestore, "collectors")
    const docRef = await addDoc(collectorCollection, fields)
    id = docRef.id
    console.log("Collector document written with ID: ", id)
  } else {
    // update collector
    const collectorRef = doc(firestore, "collectors", id as string)
    await updateDoc(collectorRef, fields)
    console.log(`Collector with ID ${id} updated`)
  }
  return { success: true, data: { id, ...fields } }
}
