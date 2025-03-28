import { z } from "zod"

// Common fields for both student and alumni
const commonFields = {
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  rollNumber: z.string().min(1, "Roll number is required"),
  branch: z.string().min(1, "Branch is required"),
  school: z.string().min(1, "School is required"),
  cgpa: z.coerce.number().min(0, "CGPA must be positive").max(10, "CGPA must be at most 10"),
}

// Student-specific validation
export const studentSchema = z
  .object({
    ...commonFields,
    email: z
      .string()
      .email("Invalid email address")
      .regex(/^[A-Za-z.]+2022@vitstudent\.ac\.in$/, "Must be a valid VIT student email (2022 batch)"),
    userType: z.literal("student"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Alumni-specific validation
export const alumniSchema = z
  .object({
    ...commonFields,
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[A-Za-z.]+20(21|20|19|18|17|16|15|14|13|12|11|10|09|08|07|06|05|04|03|02|01|00)@vitstudent\.ac\.in$/,
        "Must be a valid VIT alumni email (2021 or earlier batch)",
      ),
    yearOfPassing: z.coerce.number().min(2000, "Year must be 2000 or later").max(2021, "Year must be 2021 or earlier"),
    userType: z.literal("alumni"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export type StudentFormData = z.infer<typeof studentSchema>
export type AlumniFormData = z.infer<typeof alumniSchema>
export type LoginFormData = z.infer<typeof loginSchema>

