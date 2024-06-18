import { DocumentReference } from "firebase/firestore"
import { z } from "zod"

import { formatDate } from "./utils"

export const DocumentReferenceSchema = z.custom<DocumentReference>(
  (val) => {
    return val instanceof DocumentReference
  },
  {
    message: "Expected DocumentReference",
  }
)

export type Zone = {
  name: string
  barangays: string[]
  sitios: string[]
  chapels: string[]
}

export const BeneficiarySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  birth_date: z.coerce.date().transform((val) => formatDate(val, "yyyy-MM-dd")),
  contact_number: z.string().optional(),
  relation: z.string(),
})

export type Beneficiary = z.infer<typeof BeneficiarySchema>

export const CollectorSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  zone: z.string(),
  barangay: z.string().min(1),
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
  middle_name: z.string(),
  contact_number: z.string(),
  sex: z.string(),
  registration_date: z.coerce
    .date()
    .transform((val) => formatDate(val, "yyyy-MM-dd")),
  birth_date: z.coerce.date().transform((val) => formatDate(val, "yyyy-MM-dd")),
  isolated: z.boolean(),
  widowed: z.boolean(),
  live_in: z.boolean(),
  civil_status: z.string(),
  primary_beneficiary: z.string(),
  dependents: z.array(BeneficiarySchema),
  chapel: z.string(),
  barangay: z.string(),
  sitio: z.string(),
  selda: z.string(),
  amount: z.number(),
  remarks: z.string(),
  zone: z.string(),
  collector: z.string(),
  history: z.array(z.string()),
  roles: z.object({
    collector: z.boolean(),
    coordinator: z.boolean(),
  }),
  _resolved: z.boolean().default(false),
})

export type Member = z.infer<typeof MemberSchema>

export const MemberRelationsSchema = z.object({
  memberID: z.string(),
  primaryBeneficiary: BeneficiarySchema.optional(),
  collector: CollectorSchema,
})

export type TMemberRelationsSchema = z.infer<typeof MemberRelationsSchema>
