import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import LearningContent from "@/lib/models/learning-content"
import Student from "@/lib/models/student"
import StudentProgress from "@/lib/models/student-progress"

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

    // If student hasn't selected a category yet, return empty content
    if (!student.category) {
      return NextResponse.json([])
    }

    // Get learning content for the student's category
    const content = await LearningContent.find({ category: student.category }).sort({ weekNumber: 1 })

    // Get student progress to determine which resources are completed
    const progress = await StudentProgress.findOne({ studentId })

    // Transform content to include completion status
    const contentWithStatus = content.map((week) => {
      // In a real implementation, you would check which resources the student has completed
      // For now, we'll assume none are completed
      const resources = week.resources.map((resource) => ({
        ...resource.toObject(),
        completed: false,
      }))

      return {
        ...week.toObject(),
        resources,
        isCompleted: false,
      }
    })

    return NextResponse.json(contentWithStatus)
  } catch (error) {
    console.error("Error fetching learning content:", error)
    return NextResponse.json({ error: "Failed to fetch learning content" }, { status: 500 })
  }
}

