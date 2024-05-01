import { faker } from "@faker-js/faker"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Member, Zone } from "./schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum FamilyRelationType {
  Mother = "Mother",
  Father = "Father",
  Son = "Son",
  Daughter = "Daughter",
  Brother = "Brother",
  Sister = "Sister",
  Grandmother = "Grandmother",
  Grandfather = "Grandfather",
  Grandson = "Grandson",
  Granddaughter = "Granddaughter",
  Aunt = "Aunt",
  Uncle = "Uncle",
  FirstCousin = "First Cousin",
  SecondCousin = "Second Cousin",
  Niece = "Niece",
  Nephew = "Nephew",
  GreatGrandmother = "Great Grandmother",
  GreatGrandfather = "Great Grandfather",
  GreatGrandson = "Great Grandson",
  GreatGranddaughter = "Great Granddaughter",
  MotherInLaw = "Mother-in-law",
  FatherInLaw = "Father-in-law",
  BrotherInLaw = "Brother-in-law",
  SisterInLaw = "Sister-in-law",
  SonInLaw = "Son-in-law",
  DaughterInLaw = "Daughter-in-law",
  StepMother = "Stepmother",
  StepFather = "Stepfather",
  StepSon = "Stepson",
  StepDaughter = "Stepdaughter",
  StepBrother = "Stepbrother",
  StepSister = "Stepsister",
  AdoptiveParent = "Adoptive Parent",
  AdoptiveSibling = "Adoptive Sibling",
  FosterParent = "Foster Parent",
  FosterSibling = "Foster Sibling",
  Spouse = "Spouse",
  Husband = "Husband",
  Wife = "Wife",
}

function generateRandomMember(): Member {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    registrationDate: faker.date.recent(),
    dob: faker.date.past(),
    isCollector: false,
    isCoordinator: false,
    isIsolated: faker.datatype.boolean(),
    isWidowed: faker.datatype.boolean(),
    isPuyopuyo: faker.datatype.boolean(),
    isMarried: faker.datatype.boolean(),
    isMarriedChurch: faker.datatype.boolean(),
    isMarriedCivil: faker.datatype.boolean(),
    zone: faker.helpers.arrayElement(["zone 1", "zone 2"]),
    primaryBeneficiaryId: faker.helpers.arrayElement([1, 2]),
    coordinatorId: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8]),
    collectorId: faker.helpers.arrayElement([9, 10, 11, 12, 13, 14, 15, 16]),
    chapel: faker.location.streetAddress(),
    address: faker.location.streetAddress(),
    selda: faker.location.streetAddress(),
    remarks: faker.lorem.paragraph(),
  }
}

export const fakeMembers: Member[] = []
Array.from({ length: 10 }).forEach(() => {
  fakeMembers.push(generateRandomMember())
})

export const fakeZones = [
  { id: 1, name: "Zone 1" },
  { id: 2, name: "Zone 2" },
  { id: 3, name: "Zone 3" },
  { id: 4, name: "Zone 4" },
  { id: 5, name: "Zone 5" },
  { id: 6, name: "Zone 6" },
  { id: 7, name: "Zone 7" },
  { id: 8, name: "Zone 8" },
]
