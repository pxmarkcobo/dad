import { firestore } from "@/services/firebase"
import { collection, getCountFromServer } from "firebase/firestore"

export async function start() {
  // await fetchTotalCount()
}

// async function populateCollectors() {
//   for (const alagad of alagads) {
//     console.log("Creating collector:", alagad.name)
//     const response = await postCollectorAPI(alagad)
//     console.log(response)
//   }
// }

// async function addCollectorAreaChapel() {
//   const collectors = await fetchCollectors()
//   for (const collector of collectors) {
//     console.log("Updating collector:", collector.id, collector.name)

//     const collectorRef = doc(firestore, "collectors", collector.id)
//     const fields = {
//       chapel: "",
//       area: "",
//     }
//     console.log("fields", fields)
//     await updateDoc(collectorRef, fields)
//     console.log(
//       `Collector with ID ${collector.id} added new fields chapel & area`
//     )
//   }
// }

// export async function addMemberBarangay() {
//   const members = await fetchMembers()
//   for (const member of members) {
//     console.log("Updating member:", member.id, member.name)

//     const memberRef = doc(firestore, "members", member.id)
//     const fields = {
//       barangay: faker.word.sample(1),
//     }
//     console.log("fields", fields)
//     await updateDoc(memberRef, fields)
//     console.log(`Member with ID ${member.id} barangay field added`)
//   }
// }

// export async function fetchTotalCount() {
//   const coll = collection(firestore, "members")
//   const snapshot = await getCountFromServer(coll)
//   console.log("count: ", snapshot.data().count)
// }
