"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { studentSchema, type StudentFormData } from "@/lib/validation"
import { registerStudent } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

const branches = [
  "Computer Science Engineering",
  "Computer Science Engineering (Information Security)",
  "Computer Science Engineering (Data Science)",
  "Computer Science Engineering (Bioinformatics)",
  "Computer Science Engineering (Blockchain Technology)",
  "Computer Science Engineering (Internet of Things)",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biotechnology",
  "Chemical Engineering",
]

const branchToSchoolMap: { [key: string]: string } = {
  "Computer Science Engineering": "School of Computer Science and Engineering (SCOPE)",
  "Computer Science Engineering (Information Security)": "School of Computer Science and Engineering (SCOPE)",
  "Computer Science Engineering (Data Science)": "School of Computer Science and Engineering (SCOPE)",
  "Computer Science Engineering (Bioinformatics)": "School of Computer Science and Engineering (SCOPE)",
  "Computer Science Engineering (Blockchain Technology)": "School of Computer Science and Engineering (SCOPE)",
  "Computer Science Engineering (Internet of Things)": "School of Computer Science and Engineering (SCOPE)",
  "Information Technology": "School of Computer Science and Engineering (SCOPE)",
  "Electronics and Communication Engineering": "School of Electronics Engineering (SENSE)",
  "Electrical and Electronics Engineering": "School of Electrical Engineering (SELECT)",
  "Mechanical Engineering": "School of Mechanical Engineering (SMEC)",
  "Civil Engineering": "School of Civil Engineering (SCALE)",
  "Biotechnology": "School of Advanced Sciences (SAS)",
  "Chemical Engineering": "School of Advanced Sciences (SAS)",
}

const schools = [
  "School of Computer Science and Engineering (SCOPE)",
  "School of Electronics Engineering (SENSE)",
  "School of Mechanical Engineering (SMEC)",
  "School of Civil Engineering (SCALE)",
  "School of Electrical Engineering (SELECT)",
  "School of Advanced Sciences (SAS)",
  "School of Social Sciences and Languages (SSL)",
  "Other",
]

export default function StudentRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rollNumber: "",
      branch: "",
      school: "",
      cgpa: 0,
      userType: "student",
    },
  })

  async function onSubmit(data: StudentFormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Submitting form data:", { ...data, password: "[REDACTED]" })
      const result = await registerStudent(data)

      if (result.success) {
        setSuccess("Registration successful! Redirecting to login...")
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      } else {
        setError(result.message || "Registration failed")
      }
    } catch (err) {
      console.error("Form submission error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Student Registration</CardTitle>
        <CardDescription className="text-center">Create your account to access VIT student resources</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (VIT Email ID)</FormLabel>
                  <FormControl>
                    <Input placeholder="firstname.lastname2022@vitstudent.ac.in" {...field} />
                  </FormControl>
                  <FormDescription>Must be a valid 2022 batch VIT email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your school" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cgpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CGPA</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" max="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline underline-offset-4">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

