"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { Member } from "@/lib/schema"

interface SelectedMemberInterface {
  selectedMember: Member | null
  setSelectedMember: (member: Member | null) => void
}

export const SelectedMemberContext = createContext<
  SelectedMemberInterface | undefined
>(undefined)

export const useSelectedMember = (): SelectedMemberInterface => {
  const context = useContext(SelectedMemberContext)
  if (!context) {
    throw new Error(
      "useSelectedMember must be used within a SelectedMemberProvider"
    )
  }
  return context
}

export function SelectedMemberProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  return (
    <SelectedMemberContext.Provider
      value={{ selectedMember, setSelectedMember }}
    >
      {children}
    </SelectedMemberContext.Provider>
  )
}
