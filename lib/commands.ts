import { firestore } from "@/services/firebase"
import { faker } from "@faker-js/faker"
import { doc, updateDoc } from "firebase/firestore"

import { fetchCollectors, fetchMembers } from "./utils"

export async function start() {
  await addCollectorAreaChapel()
}

async function addCollectorAreaChapel() {
  const collectors = await fetchCollectors()
  for (const collector of collectors) {
    console.log("Updating collector:", collector.id, collector.name)

    const collectorRef = doc(firestore, "collectors", collector.id)
    const fields = {
      chapel: "",
      area: "",
    }
    console.log("fields", fields)
    await updateDoc(collectorRef, fields)
    console.log(
      `Collector with ID ${collector.id} added new fields chapel & area`
    )
  }
}

async function addMemberLiveIn() {
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
