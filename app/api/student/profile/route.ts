import { NextResponse } from "next/server";
import dbconnect from "@/db/dbconnect";
import Student from "@/lib/models/student";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    await dbconnect();

    // Get the session ID from cookies
    const sessionId = cookies().get("session_id")?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Retrieve the student based on the session ID
    const student = await Student.findOne({ _id: sessionId });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Return the student's profile data
    return NextResponse.json({
      name: student.name,
      email: student.email,
      regNumber: student.regNumber,
      category: student.category,
      branch: student.branch,
      school: student.school,
      cgpa: student.cgpa,
      password: student.Okey,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return NextResponse.json({ error: "Failed to fetch student profile" }, { status: 500 });
  }
}

