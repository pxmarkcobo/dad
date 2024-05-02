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
    zone: faker.helpers.arrayElement(["Zone 1", "Zone 2"]),
    primaryBeneficiaryId: faker.helpers.arrayElement([1, 2]),
    coordinatorId: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8]),
    collectorId: faker.helpers.arrayElement([9, 10, 11, 12, 13, 14, 15, 16]),
    chapel: faker.location.streetAddress(),
    address: faker.location.streetAddress(),
    selda: faker.location.streetAddress(),
    remarks: faker.lorem.paragraph(),
  }
}

// export const fakeMembers: Member[] = []
// Array.from({ length: 10 }).forEach(() => {
//   fakeMembers.push(generateRandomMember())
// })

export const fakeMembers: Member[] = [
  {
    id: "98cbb4be-419a-4a0c-8493-5511522e4cc4",
    name: "Kay Lehner",
    registrationDate: "2024-05-01T06:06:30.936Z",
    dob: "2024-01-09T22:33:03.911Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: false,
    isMarriedChurch: false,
    isMarriedCivil: false,
    zone: "Zone 1",
    primaryBeneficiaryId: 1,
    coordinatorId: 6,
    collectorId: 10,
    chapel: "6810 Maple Street",
    address: "74209 S Broadway",
    selda: "49752 Gorczany Ramp",
    remarks:
      "Venia cur tamisium cognatus copiose. Beatae desino arcesso creator claudeo culpa ventosus patria crinis. Vigilo adstringo spiculum terebro occaecati neque super artificiose vestigium cultura.",
  },
  {
    id: "95e7e16b-3dbe-4112-ad36-41900cd5421a",
    name: "Cassandra Beatty",
    registrationDate: "2024-05-02T00:30:09.694Z",
    dob: "2023-06-21T19:44:59.784Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: true,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: true,
    isMarriedChurch: true,
    isMarriedCivil: false,
    zone: "Zone 2",
    primaryBeneficiaryId: 2,
    coordinatorId: 4,
    collectorId: 11,
    chapel: "7455 O'Kon Estates",
    address: "4554 Center Road",
    selda: "94600 First Avenue",
    remarks:
      "Curso quos turba aegrus comparo. Sophismata claro venio theatrum ancilla aliquam. Curto vulgivagus uter.",
  },
  {
    id: "0fcf321d-3a37-45a6-aebb-46fdccac0a38",
    name: "Charlie Mertz II",
    registrationDate: "2024-05-01T05:17:13.094Z",
    dob: "2023-08-25T10:37:54.283Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: true,
    isMarried: false,
    isMarriedChurch: false,
    isMarriedCivil: false,
    zone: "Zone 1",
    primaryBeneficiaryId: 2,
    coordinatorId: 8,
    collectorId: 16,
    chapel: "71026 Reichel Overpass",
    address: "4574 Hand Curve",
    selda: "653 Paucek Isle",
    remarks:
      "Dolores tempora venio aedificium colligo astrum valens. Adhaero crustulum sursum natus cotidie sumptus corporis candidus capitulus corrigo. Baiulus cur bestia tristis pariatur absum conicio celer.",
  },
  {
    id: "052d8242-e130-47e4-81aa-edf1411962f5",
    name: "Tom Gottlieb",
    registrationDate: "2024-05-01T16:49:51.388Z",
    dob: "2023-07-14T03:55:48.029Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: false,
    isPuyopuyo: true,
    isMarried: true,
    isMarriedChurch: true,
    isMarriedCivil: false,
    zone: "Zone 1",
    primaryBeneficiaryId: 2,
    coordinatorId: 1,
    collectorId: 15,
    chapel: "834 Nakia Manors",
    address: "785 Stanton Forest",
    selda: "1904 Windler Crossroad",
    remarks:
      "Accedo maxime tunc vespillo avaritia abstergo accusamus reiciendis conspergo addo. Animi turba causa valde clarus curso baiulus absque torqueo. Brevis teres speciosus tot.",
  },
  {
    id: "987eecfa-bdcd-4ecb-95de-5926efe65113",
    name: "Angelica Stiedemann",
    registrationDate: "2024-05-02T00:12:29.734Z",
    dob: "2023-11-07T23:48:31.465Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: true,
    isMarriedChurch: false,
    isMarriedCivil: true,
    zone: "Zone 2",
    primaryBeneficiaryId: 1,
    coordinatorId: 5,
    collectorId: 9,
    chapel: "7438 Valentine Point",
    address: "39830 Nikolaus Plains",
    selda: "9630 D'Amore Parkways",
    remarks:
      "Voluptatibus casso acceptus agnosco teneo compello venia auxilium. Somniculosus culpo articulus tametsi contabesco denuo inflammatio vulgus surgo veritatis. Aeneus vox aspicio una damno clibanus nemo.",
  },
  {
    id: "8f3cdf51-1f44-4dd3-b7b4-337158dc8c67",
    name: "Corey Nienow",
    registrationDate: "2024-05-01T11:11:40.411Z",
    dob: "2023-09-26T14:26:48.283Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: true,
    isWidowed: true,
    isPuyopuyo: true,
    isMarried: false,
    isMarriedChurch: false,
    isMarriedCivil: false,
    zone: "Zone 2",
    primaryBeneficiaryId: 2,
    coordinatorId: 3,
    collectorId: 14,
    chapel: "757 Okuneva Knolls",
    address: "459 Heron Close",
    selda: "7514 Cromwell Road",
    remarks:
      "Quidem odio odit xiphias speciosus. Vilicus coepi administratio decerno vinitor architecto stillicidium stultus aegre. Cariosus dedico comburo magnam deludo dolore vere.",
  },
  {
    id: "8e164043-1246-4ce9-b21d-12250bef72b5",
    name: "Ray Lindgren PhD",
    registrationDate: "2024-05-01T05:09:50.384Z",
    dob: "2024-04-15T23:28:56.433Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: false,
    isMarriedChurch: true,
    isMarriedCivil: false,
    zone: "Zone 2",
    primaryBeneficiaryId: 2,
    coordinatorId: 1,
    collectorId: 16,
    chapel: "352 Arielle Walk",
    address: "50628 Cayla Burg",
    selda: "4360 W Broad Street",
    remarks:
      "Umerus soluta vel decerno curis aeternus timor tredecim cariosus. Argentum depereo sollers concido aggredior tabgo tibi clementia supellex sono. Expedita accendo quasi.",
  },
  {
    id: "551923b4-857e-4edb-9b9c-361d8fea57fe",
    name: "Mr. Lawrence Swift",
    registrationDate: "2024-05-01T13:53:20.675Z",
    dob: "2023-06-05T19:10:22.975Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: true,
    isMarriedChurch: false,
    isMarriedCivil: false,
    zone: "Zone 1",
    primaryBeneficiaryId: 1,
    coordinatorId: 3,
    collectorId: 10,
    chapel: "3940 Lynch Greens",
    address: "9887 Long Lane",
    selda: "98391 Koss Stravenue",
    remarks:
      "Adeptio tui quam. Sono voro thermae umquam contabesco ver consequuntur. Adipiscor amitto comprehendo umbra tutis.",
  },
  {
    id: "ec2891a9-e935-4146-bc15-e08f83704e90",
    name: "Tracy Goodwin",
    registrationDate: "2024-05-01T12:35:49.278Z",
    dob: "2024-04-27T13:12:04.962Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: true,
    isWidowed: false,
    isPuyopuyo: false,
    isMarried: false,
    isMarriedChurch: true,
    isMarriedCivil: false,
    zone: "Zone 1",
    primaryBeneficiaryId: 2,
    coordinatorId: 1,
    collectorId: 9,
    chapel: "650 Gusikowski Drive",
    address: "8889 Friedrich Track",
    selda: "18681 Tomas Curve",
    remarks:
      "Possimus omnis commemoro vallum calco umbra theologus cum subvenio. Cursus alveus laudantium a anser. Verumtamen damnatio vito.",
  },
  {
    id: "5f945022-2219-4e18-b53b-3903468ce862",
    name: "Andrea D'Amore",
    registrationDate: "2024-05-01T23:12:15.823Z",
    dob: "2024-04-29T15:45:12.029Z",
    isCollector: false,
    isCoordinator: false,
    isIsolated: false,
    isWidowed: true,
    isPuyopuyo: false,
    isMarried: true,
    isMarriedChurch: true,
    isMarriedCivil: true,
    zone: "Zone 2",
    primaryBeneficiaryId: 2,
    coordinatorId: 4,
    collectorId: 9,
    chapel: "10675 Marie Creek",
    address: "9230 Colt Mount",
    selda: "386 Station Road",
    remarks:
      "Desidero deludo summopere alias ab stipes. Capio carpo apparatus valens. Facilis cohaero veritas angelus impedit subseco cado cenaculum.",
  },
]

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
