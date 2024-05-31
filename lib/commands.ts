import { firestore } from "@/services/firebase"
import { faker } from "@faker-js/faker"
import { doc, updateDoc } from "firebase/firestore"

import { fetchMembers } from "./utils"

export async function start() {
  const members = await fetchMembers()
  for (const member of members) {
    console.log("Updating member:", member.id, member.name)

    const memberRef = doc(firestore, "members", member.id)
    const fields = {
      live_in: faker.datatype.boolean(),
    }
    console.log("fields", fields)
    await updateDoc(memberRef, fields)
    console.log(`Member with ID ${member.id} live_in field added`)
  }
}
