"use client"
import HomestayForm from "@/components/home/HomestayForm"
import Image from 'next/image';

export default function Hero() {
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
