import { z } from "zod"

import { FamilyRelationType } from "./utils"

export const ZoneSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Zone = z.infer<typeof ZoneSchema>

export const BeneficiarySchema = z.object({
  id: z.string(),
  uuid: z.string(),
  name: z.string().min(3, "Please indicate dependent's full name."),
  dob: z.date(),
  relation: z.nativeEnum(FamilyRelationType),
})

export type Beneficiary = z.infer<typeof BeneficiarySchema>

export const MemberSchama = z.object({
  id: z.string(),
  name: z.string(),
  registrationDate: z.string(),
  dob: z.string(),
  isCollector: z.boolean(),
  isCoordinator: z.boolean(),
  isIsolated: z.boolean(),
  isWidowed: z.boolean(),
  isPuyopuyo: z.boolean(),
  isMarried: z.boolean(),
  isMarriedChurch: z.boolean(),
  isMarriedCivil: z.boolean(),
  primaryBeneficiaryId: z.number(),
  zone: z.string(),
  collectorId: z.number(),
  coordinatorId: z.number(),
  chapel: z.string(),
  address: z.string(),
  selda: z.string(),
  remarks: z.string(),
})

export type Member = z.infer<typeof MemberSchama>

export type TableRowMember = Pick<
  Member,
  "id" | "name" | "address" | "chapel" | "primaryBeneficiaryId" | "zone"
>
