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
  BeneficiarySchema,
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
  console.log("date", date)

  const dateObj =
    typeof date === "string" ? parse(date, "yyyy-MM-dd", new Date()) : date

  // Format the date using the specified format
  return format(dateObj, dateFormat)
}

export async function fetchMembers() {
  const memberCollection = collection(firestore, "members")
  const q = query(memberCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const members: any[] = querySnapshot.docs.map(async (doc) => {
    const collectorDoc = await getDoc(doc.data().collector as DocumentReference)

    const collector = CollectorSchema.parse({
      id: collectorDoc.id,
      ...collectorDoc.data(),
    })

    const { success, error, data } = MemberSchema.safeParse({
      id: doc.id,
      ...doc.data(),
      collector: collector,
    })

    if (success) {
      return data as Member
    } else {
      console.error(error.issues)
    }
  })
  const response = await Promise.all(members)
  return response
}

export async function fetchMemberByID(id: string) {
  const memberRef = doc(firestore, "members", id)
  const memberDoc = await getDoc(memberRef)

  console.log(memberDoc.data())

  if (!memberDoc.exists()) {
    return null
  }

  const collectorDoc = await getDoc(
    memberDoc.data().collector as DocumentReference
  )
  const collector = CollectorSchema.parse({
    id: collectorDoc.id,
    ...collectorDoc.data(),
  })

  const primaryBeneficiaryDoc = await getDoc(
    memberDoc.data().primary_beneficiary as DocumentReference
  )
  const beneficiary = BeneficiarySchema.parse({
    id: primaryBeneficiaryDoc.id,
    ...primaryBeneficiaryDoc.data(),
  })

  const dependentPromises = memberDoc
    .data()
    .dependents.map((ref: DocumentReference) => getDoc(ref))
  console.log(dependentPromises)

  const dependentDocs = await Promise.all(dependentPromises)
  let dependents: any[] = dependentDocs.map((doc) => {
    return BeneficiarySchema.parse({
      id: doc.id,
      ...doc.data(),
    })
  })

  const { success, error, data } = MemberSchema.safeParse({
    id: memberDoc.id,
    ...memberDoc.data(),
    collector: collector,
    primary_beneficiary: beneficiary,
    dependents: dependents,
  })

  if (!success) {
    console.error(error.issues)
  }
  return data as Member
}

export async function postMemberAPI(payload: unknown) {
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

  let { id: memberID, ...memberFields } = data
  const dependents: any[] = [...memberFields.dependents]

  if (!memberID) {
    // Create beneficiaries
    const beneficiaryCollection = collection(firestore, "beneficiaries")

    const dependentRefs = []
    for (const dependent of dependents) {
      const dependentRef = await addDoc(beneficiaryCollection, dependent)
      console.log("Beneficiary document written with ID: ", dependentRef.id)
      dependentRefs.push(dependentRef)
      dependent.id = dependentRef.id
    }

    memberFields.dependents = dependentRefs

    // Create member
    const memberCollection = collection(firestore, "members")
    const memberRef = await addDoc(memberCollection, memberFields)
    memberID = memberRef.id
    console.log("Member document written with ID: ", memberRef.id)
  } else {
    // Update beneficiaries
    const beneficiaryCollection = collection(firestore, "beneficiaries")

    const dependentRefs = []
    for (const dependent of dependents) {
      const { id, ...data } = dependent
      if (!id) {
        const dependentRef = await addDoc(beneficiaryCollection, dependent)
        console.log("Beneficiary document written with ID: ", dependentRef.id)
        dependentRefs.push(dependentRef)
        dependent.id = dependentRef.id
        // create
      } else {
        // update
        const dependentRef = doc(firestore, "beneficiaries", id as string)
        await updateDoc(dependentRef, data)
        console.log("Beneficiary document updated with ID: ", dependentRef.id)
        dependentRefs.push(dependentRef)
      }
    }

    memberFields.dependents = dependentRefs
    // Update member
    const memberRef = doc(firestore, "members", memberID as string)
    await updateDoc(memberRef, memberFields)
    console.log("Member document updated with ID: ", memberRef.id)
  }
  return {
    success: true,
    data: {
      memberID: memberID,
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

  if (!id?.trim()) {
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

export async function postCoordinatorAPI(payload: unknown) {
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

  let { id, ...fields } = data

  if (id === "") {
    // create coordinator
    const coordinatorCollection = collection(firestore, "coordinators")
    const docRef = await addDoc(coordinatorCollection, fields)
    id = docRef.id
    console.log("Coordinator document written with ID: ", id)
  } else {
    // update coordinator
    const coordinatorRef = doc(firestore, "coordinators", id as string)
    await updateDoc(coordinatorRef, fields)
    console.log(`Coordinator with ID ${id} updated`)
  }
  return { success: true, data: { id, ...fields } }
}
