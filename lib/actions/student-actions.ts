"use server"

import { connectToDatabase } from "@/lib/db"
import Student from "@/lib/models/student"
import StudentProgress from "@/lib/models/student-progress"
import { revalidatePath } from "next/cache"

export async function updateStudentCategory(studentId: string, category: string) {
  try {
    await connectToDatabase()

    if (!category || !["dream", "super-dream", "higher-studies"].includes(category)) {
      throw new Error("Invalid category")
    }

    const student = await Student.findByIdAndUpdate(studentId, { category }, { new: true })

    if (!student) {
      throw new Error("Student not found")
    }

    // Create or update student progress
    let progress = await StudentProgress.findOne({ studentId })

    if (!progress) {
      progress = new StudentProgress({
        studentId,
        category,
        taskSubmissions: [],
        totalScore: 0,
        skillScores: [],
      })
      await progress.save()
    } else {
      progress.category = category
      await progress.save()
    }

    revalidatePath("/dashboard")

    return { success: true, category: student.category }
  } catch (error) {
    console.error("Error updating student category:", error)
    return { success: false, error: "Failed to update category" }
  }
}

export async function markResourceAsCompleted(studentId: string, weekId: string, resourceId: string) {
  try {
    await connectToDatabase()

    const student = await Student.findById(studentId)

    if (!student) {
      throw new Error("Student not found")
    }

    // In a real implementation, you would update the student's progress
    // For now, we'll just return success

    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error marking resource as completed:", error)
    return { success: false, error: "Failed to mark resource as completed" }
  }
}

export async function submitWeeklyTask(
  studentId: string,
  taskId: string,
  mcqAnswers: { questionId: string; selectedOption: string }[],
  codingSolution: string,
) {
  try {
    await connectToDatabase()

    const student = await Student.findById(studentId)

    if (!student) {
      throw new Error("Student not found")
    }

    // In a real implementation, you would evaluate the submission and update the student's progress
    // For now, we'll just return success

    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error submitting weekly task:", error)
    return { success: false, error: "Failed to submit task" }
  }
}

export async function getStudentProfile(studentId: string) {
  try {
    await connectToDatabase()

    const student = await Student.findById(studentId)

    if (!student) {
      throw new Error("Student not found")
    }

    return {
      success: true,
      profile: {
        name: student.name,
        email: student.email,
        regNumber: student.regNumber,
        category: student.category,
        totalScore: student.totalScore,
        progressPercentage: student.progressPercentage,
        completedTasks: student.completedTasks,
        totalTasks: student.totalTasks,
      },
    }
  } catch (error) {
    console.error("Error fetching student profile:", error)
    return { success: false, error: "Failed to fetch profile" }
  }
}

