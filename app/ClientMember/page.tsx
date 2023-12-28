"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'
const Member = () => {
    const {data:session} = useSession({
        required:true,
        onUnauthenticated()
        {
            redirect("api/auth/signin?callbackUrl=/ClientMember")
        }
    }
    )
    // console.log("sesssion",session)
  return (
    <div>
      <h1>
        Member Client Sessions
      </h1>
      <p>{session?.user?.email}</p>
            <p>{session?.user?.role}</p>
    </div>
  )
}

export default Member
