import { firestore } from "@/services/firebase"
import { ColumnFiltersState } from "@tanstack/react-table"
import { clsx, type ClassValue } from "clsx"
import { format, parse } from "date-fns"
import {
  DocumentSnapshot,
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore"
import { twMerge } from "tailwind-merge"
import { utils, writeFileXLSX } from "xlsx"

import {
  Collector,
  CollectorSchema,
  Coordinator,
  CoordinatorSchema,
  Member,
  MemberSchema,
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
  dateFormat: string = "MMMM d, yyy"
): string => {
  // Parse the date if it's a string
  const dateObj =
    typeof date === "string" ? parse(date, "yyyy-MM-dd", new Date()) : date

  // Format the date using the specified format
  return format(dateObj, dateFormat)
}

export async function fetchTotalMembersCount() {
  const memberCollection = collection(firestore, "members")
  const snapshot = await getCountFromServer(memberCollection)
  const total = snapshot.data().count
  return total
}

export async function fetchMembersPaginated(options: {
  pageSize: number
  lastDoc: DocumentSnapshot | null
  filters: ColumnFiltersState
}) {
  console.log({ options })

  const memberCollection = collection(firestore, "members")

  let queryParams: QueryConstraint[] = []
  for (const filter of options.filters) {
    queryParams.push(where(filter.id, "in", filter.value as string[]))
  }

  let q = query(memberCollection, ...queryParams)
  const countQuerySnapshot = await getCountFromServer(q)
  const total = countQuerySnapshot.data().count
  console.log({ total })

  queryParams = queryParams.concat([
    startAfter(options.lastDoc),
    limit(options.pageSize),
  ])
  console.log({ queryParams })

  q = query(memberCollection, orderBy("zone"), ...queryParams)
  const querySnapshot = await getDocs(q)

  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
  const members: any[] = querySnapshot.docs.map(async (doc) => {
    const { success, error, data } = MemberSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })

    if (success) {
      return data as Member
    } else {
      console.error(error.issues)
    }
  })

  const data = await Promise.all(members)

  return {
    rows: data,
    lastDoc: lastDoc,
    rowCount: total,
  }
}

export async function fetchMemberByID(id: string) {
  const memberRef = doc(firestore, "members", id)
  const memberDoc = await getDoc(memberRef)

  if (!memberDoc.exists()) {
    return null
  }

  const { success, error, data } = MemberSchema.safeParse({
    id: memberDoc.id,
    ...memberDoc.data(),
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

  if (!memberID) {
    const memberCollection = collection(firestore, "members")
    const memberRef = await addDoc(memberCollection, memberFields)
    memberID = memberRef.id
    console.log("Member document written with ID: ", memberRef.id)
  } else {
    const memberRef = doc(firestore, "members", memberID as string)
    await updateDoc(memberRef, memberFields)
    console.log("Member document updated with ID: ", memberRef.id)
  }
  return {
    success: true,
    data: {
      id: memberID,
      ...memberFields,
    },
  }
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

// Admin Actions

const REPORT_TEMPLATE = [
  ["Registration Date: "],
  ["Confirmed by the Board: "],
  [],
  [
    "Count",
    "Registration Date",
    "Name",
    "Date of Birth",
    "Sex",
    "Isolated",
    "Widowed",
    "Live-In",
    "Civil Status",
    "Primary Beneficiary",
    "Dependent",
    "Date of Birth (Dependent)",
    "Relation",
    "Zone",
    "Chapel",
    "Barangay",
    "Sitio",
    "Selda",
    "Alagad",
    "Amount Paid",
    "Remarks",
  ],
]

export async function generateRegistrationReport({
  registration_date,
}: {
  registration_date: string
}) {
  console.log({ registration_date })

  const memberCollection = collection(firestore, "members")

  let queryParams: QueryConstraint[] = [
    where("registration_date", "==", registration_date),
  ]

  const q = query(memberCollection, orderBy("zone"), ...queryParams)
  const querySnapshot = await getDocs(q)

  const data: any[] = querySnapshot.docs.map(async (doc) => {
    const { success, error, data } = MemberSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })

    if (success) {
      return data as Member
    } else {
      console.error(error.issues)
    }
  })
  const members: Member[] = await Promise.all(data)

  let csv: any = REPORT_TEMPLATE
  csv[0][0] = `Registration Date: ${registration_date}`

  let order = 1
  for (const member of members) {
    let memberCSV = [
      [
        order,
        member.registration_date,
        `${member.last_name}, ${member.first_name} ${member.middle_name}`,
        member.birth_date,
        member.sex,
        member.isolated,
        member.widowed,
        member.live_in,
        member.civil_status,
        member.primary_beneficiary,
        ,
        ,
        ,
        member.zone,
        member.chapel,
        member.barangay,
        member.sitio,
        member.selda,
        member.collector,
        member.amount,
        member.remarks,
      ],
    ]
    console.log({ member })
    console.log(member.dependents.length)
    if (member.dependents.length != 0) {
      let index = 0
      for (const dependent of member.dependents) {
        if (index == 0) {
          memberCSV[0][10] = dependent.name
          memberCSV[0][11] = dependent.birth_date
          memberCSV[0][12] = dependent.relation
        } else {
          let dependentRow = new Array(13)
          dependentRow[10] = dependent.name
          dependentRow[11] = dependent.birth_date
          dependentRow[12] = dependent.relation
          memberCSV.push(dependentRow)
        }
        index += 1
      }
    }
    order += 1
    csv.push(...memberCSV)
  }

  csv = csv.concat([[], [], []])
  csv.push([, , "Prepared by:", , , , "Noted by:", , , , "Summary:"])
  csv.push([, , , , , , , , , , "New Members", members.length])
  csv.push([
    ,
    ,
    "Doris Teodora N. Crodua",
    ,
    ,
    ,
    "Hermes R. Estrada",
    ,
    ,
    ,
    "Assumed Membership",
    0,
  ])
  csv.push([
    ,
    ,
    "Secretary",
    ,
    ,
    ,
    "President",
    ,
    ,
    ,
    "Total Additional Members",
    members.length,
  ])

  const ws = utils.aoa_to_sheet(csv)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "Registration Report")
  writeFileXLSX(wb, `RegistrationReport-${registration_date}.xlsx`)
  console.log({ csv })
}
