import { DocumentReference } from "firebase/firestore"
import { z } from "zod"

import { CivilStatusChoices, FamilyRelationChoices, SexChoices } from "./enums"
import { formatDate } from "./utils"

export const DocumentReferenceSchema = z.custom<DocumentReference>(
  (val) => {
    return val instanceof DocumentReference
  },
  {
    message: "Expected DocumentReference",
  }
)

export const BeneficiarySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  birth_date: z.coerce.date().transform((val) => formatDate(val, "yyyy-MM-dd")),
  contact_number: z.string().optional(),
  relation: z.nativeEnum(FamilyRelationChoices),
})

export type Beneficiary = z.infer<typeof BeneficiarySchema>

export const CollectorSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  zone: z.string(),
  sitio: z.string(),
  chapel: z.string(),
})

export type Collector = z.infer<typeof CollectorSchema>

export const CoordinatorSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  zone: z.string(),
})

export type Coordinator = z.infer<typeof CoordinatorSchema>

export const MemberSchema = z.object({
  id: z.string().optional(),
  last_name: z.string(),
  first_name: z.string(),
  middle_initial: z.string(),
  name: z.string(),
  contact_number: z.string().optional(),
  sex: z.nativeEnum(SexChoices),
  registration_date: z.coerce
    .date()
    .transform((val) => formatDate(val, "yyyy-MM-dd")),
  birth_date: z.coerce.date().transform((val) => formatDate(val, "yyyy-MM-dd")),
  isolated: z.boolean(),
  widowed: z.boolean(),
  live_in: z.boolean(),
  civil_status: z.nativeEnum(CivilStatusChoices),
  roles: z.object({
    collector: z.boolean(),
    coordinator: z.boolean(),
  }),
  chapel: z.string(),
  barangay: z.string(),
  sitio: z.string().optional(),
  selda: z.string(),
  amount: z.number(),
  remarks: z.string(),
  zone: z.string(),
  primary_beneficiary: z
    .union([DocumentReferenceSchema, BeneficiarySchema])
    .optional(),
  dependents: z.array(z.union([DocumentReferenceSchema, BeneficiarySchema])),
  collector: CollectorSchema.optional(),
  _resolved: z.boolean().default(false),
})

export type Member = z.infer<typeof MemberSchema>

export const MemberRelationsSchema = z.object({
  memberID: z.string(),
  primaryBeneficiary: BeneficiarySchema.optional(),
  collector: CollectorSchema,
})

export type TMemberRelationsSchema = z.infer<typeof MemberRelationsSchema>
