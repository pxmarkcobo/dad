import { firestore } from "@/services/firebase"
import { faker } from "@faker-js/faker"
import { clsx, type ClassValue } from "clsx"
import { format, parseISO } from "date-fns"
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import { twMerge } from "tailwind-merge"

import { Member, MemberSchema, Zone } from "./schema"

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
  const dateObj = typeof date === "string" ? parseISO(date) : date

  // Format the date using the specified format
  return format(dateObj, dateFormat)
}

//  TODO: transfer to server actions?
export async function fetchMembers() {
  const memberCollection = collection(firestore, "members")
  const q = query(memberCollection, orderBy("name"))

  const querySnapshot = await getDocs(q)
  const members: any[] = querySnapshot.docs.map((doc) => {
    console.log(doc.data())
    const { success, error, data } = MemberSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
    console.log(success, error, data)
    if (success) {
      data.id = doc.id
      return data as Member
    } else {
      console.error(error.issues)
    }
  })
  console.log(members)
  return members
}
