import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Student from "@/lib/models/student"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    // In a real implementation, you would get the student ID from the session
    // For now, we'll use a mock student ID
    const studentId = "mock-student-id"

    const student = await Student.findById(studentId)

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ category: student.category })
  } catch (error) {
    console.error("Error fetching student category:", error)
    return NextResponse.json({ error: "Failed to fetch student category" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase()

    const { category } = await request.json()

    if (!category || !["dream", "super-dream", "higher-studies"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // In a real implementation, you would get the student ID from the session
    // For now, we'll use a mock student ID
    const studentId = "mock-student-id"

    const student = await Student.findByIdAndUpdate(studentId, { category }, { new: true })

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ category: student.category })
  } catch (error) {
    console.error("Error updating student category:", error)
    return NextResponse.json({ error: "Failed to update student category" }, { status: 500 })
  }
}

