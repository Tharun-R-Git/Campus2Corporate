import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Student from "@/lib/models/student"
import Alumni from "@/lib/models/alumni"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const { name, email, regNumber, password, userType } = await request.json()

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if email already exists
    if (userType === "student") {
      const existingStudent = await Student.findOne({ email })

      if (existingStudent) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new student
      const newStudent = new Student({
        name,
        email,
        regNumber,
        password: hashedPassword,
      })

      await newStudent.save()

      return NextResponse.json({
        success: true,
        message: "Student registered successfully",
      })
    } else if (userType === "alumni") {
      const existingAlumni = await Alumni.findOne({ email })

      if (existingAlumni) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }

      // For alumni, we'll just create a basic record
      // The full details will be added when they submit their experience
      const newAlumni = new Alumni({
        name,
        email,
        company: "",
        role: "",
        package: "",
        year: new Date().getFullYear(),
        tags: [],
        experience: "",
      })

      await newAlumni.save()

      return NextResponse.json({
        success: true,
        message: "Alumni registered successfully",
      })
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error during registration:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}

