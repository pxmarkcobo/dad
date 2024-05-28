import { resolve } from "path"
import { DocumentReference } from "firebase/firestore"
import { z } from "zod"

import { FamilyRelations } from "./enums"

const DocumentReferenceSchema = z.custom<DocumentReference>(
  (val) => {
    return val instanceof DocumentReference
  },
  {
    message: "Expected DocumentReference",
  }
)

export const ZoneSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Zone = z.infer<typeof ZoneSchema>

export const BeneficiarySchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Please indicate dependent's full name."),
  birth_date: z.coerce.date(),
  contact_number: z.string(),
  relation: z.nativeEnum(FamilyRelations),
})

export type Beneficiary = z.infer<typeof BeneficiarySchema>

export const CollectorSchema = z.object({
  id: z.string(),
  name: z.string(),
  zone: z.string(),
  coordinator: z.string(),
})

export type Collector = z.infer<typeof CollectorSchema>

export const CoordinatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  zone: z.string(),
})

export type Coordinator = z.infer<typeof CoordinatorSchema>

export const MemberSchama = z.object({
  id: z.string(),
  name: z.string(),
  registration_date: z.coerce.date(),
  birth_date: z.coerce.date(),
  isolated: z.boolean(),
  widowed: z.boolean(),
  puyopuyo: z.boolean(),
  married: z.boolean(),
  church_marriage: z.boolean(),
  civil_marriage: z.boolean(),
  roles: z.object({
    collector: z.boolean(),
    coordinator: z.boolean(),
  }),
  chapel: z.string(),
  address: z.string(),
  selda: z.string(),
  remarks: z.string(),
  zone: ZoneSchema,
  primary_beneficiary: z
    .union([DocumentReferenceSchema, BeneficiarySchema])
    .optional(),
  dependents: z.array(z.union([DocumentReferenceSchema, BeneficiarySchema])),
  collector: z.union([DocumentReferenceSchema, CollectorSchema]).optional(),
  resolved: z.boolean().default(false),
})

export type Member = z.infer<typeof MemberSchama>
