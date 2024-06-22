"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"

import { Member } from "@/lib/schema"
import { fetchMemberByID } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import PageHeader from "@/components/header/page-header"
import LoadingScreen from "@/components/loading-screen"

import MemberForm from "../_components/form"

export default function EditMember({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [member, setMember] = useState<Member>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMemberByID(params.id)
        console.log(data)

        if (data) {
          setMember(data)
          setLoading(false)
        } else {
          router.replace("/home")
        }
      } catch (error) {
        console.error("Failed to fetch data", error)
      }
    }
    fetchData()
  }, [params.id, router])
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Edit Member" />
      <ScrollArea className="flex-1 p-4 sm:px-6">
        {loading ? <LoadingScreen /> : <MemberForm initial={member} />}
      </ScrollArea>
    </div>
  )
}
