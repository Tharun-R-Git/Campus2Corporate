"use client"

import { useSearchParams } from "next/navigation"
import StudentRegistrationForm from "@/components/student-registration-form"
import AlumniRegistrationForm from "@/components/alumni-registration-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type")

  if (!type || (type !== "student" && type !== "alumni")) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <h1 className="text-2xl font-bold mb-4">Invalid User Type</h1>
        <p className="mb-4">Please select a valid user type to register.</p>
        <Button asChild>
          <Link href="/">Go Back</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
      {type === "student" ? <StudentRegistrationForm /> : <AlumniRegistrationForm />}
    </main>
  )
}

