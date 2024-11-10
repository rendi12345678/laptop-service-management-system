"use client"
import { useEffect } from "react"
import HomestayForm from "@/components/home/HomestayForm"
import Image from 'next/image';
import { useSession } from "next-auth/react"

export default function Hero() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(status)
    console.log(session);
  }, [status, session])

  return (
    <section className="mx-4 bg-secondary">
      <div className="w-full rounded-lg h-64 relative">
        <Image
          src="/images/rice-terrace-1.jpeg"
          alt="Logo"
          layout="fill"
          className="object-fill rounded-lg"
        />
      </div>
      <HomestayForm />
    </section>
  )
}
