"use client"

import { ReactNode, createContext, useContext, useState } from "react"

import { Member } from "@/lib/schema"

interface MemberInfoInterface {
  memberInfo: Member | null
  setMemberInfo: (member: Member | null) => void
}

export const MemberInfoContext = createContext<MemberInfoInterface | undefined>(
  undefined
)

export const useMemberInfo = (): MemberInfoInterface => {
  const context = useContext(MemberInfoContext)
  if (!context) {
    throw new Error("useMemberInfo must be used within a MemberInfoProvider")
  }
  return context
}

export function MemberInfoProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [memberInfo, setMemberInfo] = useState<Member | null>(null)

  return (
    <MemberInfoContext.Provider value={{ memberInfo, setMemberInfo }}>
      {children}
    </MemberInfoContext.Provider>
  )
}
