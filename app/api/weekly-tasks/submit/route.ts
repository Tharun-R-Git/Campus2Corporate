import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import WeeklyTask from "@/lib/models/weekly-task"
import Student from "@/lib/models/student"
import StudentProgress from "@/lib/models/student-progress"

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const { taskId, mcqAnswers, codingSolution } = await request.json()

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
    }

    // In a real implementation, you would get the student ID from the session
    // For now, we'll use a mock student ID
    const studentId = "mock-student-id"

    const student = await Student.findById(studentId)

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    const task = await WeeklyTask.findById(taskId)

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    // Check if task is past due
    if (new Date(task.dueDate) < new Date()) {
      return NextResponse.json({ error: "Task is past due" }, { status: 400 })
    }

    // Calculate score
    let mcqScore = 0
    if (mcqAnswers && mcqAnswers.length > 0) {
      mcqAnswers.forEach((answer) => {
        const question = task.mcqs.find((q) => q._id.toString() === answer.questionId)
        if (question && question.correctOption === answer.selectedOption) {
          mcqScore += 10 // 10 points per correct MCQ
        }
      })
    }

    // In a real implementation, you would evaluate the coding solution
    // For now, we'll assign a fixed score
    const codingScore = codingSolution ? 20 : 0

    const totalScore = mcqScore + codingScore

    // Update student progress
    let progress = await StudentProgress.findOne({ studentId })

    if (!progress) {
      progress = new StudentProgress({
        studentId,
        category: student.category,
        taskSubmissions: [],
        totalScore: 0,
        skillScores: [],
      })
    }

    // Check if student has already submitted this task
    const existingSubmissionIndex = progress.taskSubmissions.findIndex(
      (submission) => submission.taskId.toString() === taskId,
    )

    if (existingSubmissionIndex !== -1) {
      // Update existing submission
      progress.taskSubmissions[existingSubmissionIndex] = {
        taskId,
        mcqAnswers,
        codingSolution,
        score: totalScore,
        submittedAt: new Date(),
      }
    } else {
      // Add new submission
      progress.taskSubmissions.push({
        taskId,
        mcqAnswers,
        codingSolution,
        score: totalScore,
        submittedAt: new Date(),
      })
    }

    // Update total score
    progress.totalScore = progress.taskSubmissions.reduce((sum, submission) => sum + submission.score, 0)

    await progress.save()

    // Update student's progress in Student model
    const completedTasks = progress.taskSubmissions.length
    const totalTasks = await WeeklyTask.countDocuments({ category: student.category })
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

    await Student.findByIdAndUpdate(studentId, {
      totalScore: progress.totalScore,
      progressPercentage,
      completedTasks,
      totalTasks,
    })

    return NextResponse.json({
      success: true,
      score: totalScore,
      totalScore: progress.totalScore,
      progressPercentage,
    })
  } catch (error) {
    console.error("Error submitting weekly task:", error)
    return NextResponse.json({ error: "Failed to submit weekly task" }, { status: 500 })
  }
}

