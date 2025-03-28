import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Student from "@/lib/models/student"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const student = await Student.findOne({ email })

    if (!student) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, student.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a session
    const sessionId = crypto.randomUUID()

    // In a real implementation, you would store the session in a database
    // For now, we'll just set a cookie
    cookies().set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({
      success: true,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        regNumber: student.regNumber,
      },
    })
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    // Clear the session cookie
    cookies().delete("session_id")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error during logout:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}

