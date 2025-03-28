import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Student from "@/lib/models/student"
import StudentProgress from "@/lib/models/student-progress"
import WeeklyTask from "@/lib/models/weekly-task"

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

    const progress = await StudentProgress.findOne({ studentId })

    if (!progress) {
      return NextResponse.json({
        weeklyScores: [],
        categoryComparison: [],
        overallProgress: {
          completed: 0,
          total: 0,
          percentage: 0,
        },
        skillBreakdown: [],
      })
    }

    // Get weekly scores
    const tasks = await WeeklyTask.find({ category: student.category }).sort({ weekNumber: 1 })

    const weeklyScores = tasks.map((task) => {
      const submission = progress.taskSubmissions.find((sub) => sub.taskId.toString() === task._id.toString())

      if (!submission) {
        return {
          week: task.weekNumber,
          mcqScore: 0,
          codingScore: 0,
          totalScore: 0,
        }
      }

      // In a real implementation, you would calculate MCQ and coding scores separately
      // For now, we'll assume a 50/50 split
      const mcqScore = submission.score / 2
      const codingScore = submission.score / 2

      return {
        week: task.weekNumber,
        mcqScore,
        codingScore,
        totalScore: submission.score,
      }
    })

    // Get category comparison
    // In a real implementation, you would fetch average scores for each category
    // For now, we'll use mock data
    const categoryComparison = [
      { category: "Dream Package", averageScore: 75, yourScore: student.totalScore },
      { category: "Super Dream Package", averageScore: 85, yourScore: student.totalScore },
      { category: "Higher Studies", averageScore: 80, yourScore: student.totalScore },
    ]

    // Get overall progress
    const overallProgress = {
      completed: student.completedTasks,
      total: student.totalTasks,
      percentage: student.progressPercentage,
    }

    // Get skill breakdown
    // In a real implementation, you would calculate skill scores based on task submissions
    // For now, we'll use mock data
    const skillBreakdown = [
      { skill: "Data Structures", score: 85, maxScore: 100 },
      { skill: "Algorithms", score: 78, maxScore: 100 },
      { skill: "Aptitude", score: 90, maxScore: 100 },
      { skill: "Problem Solving", score: 82, maxScore: 100 },
      { skill: "Logical Reasoning", score: 88, maxScore: 100 },
    ]

    return NextResponse.json({
      weeklyScores,
      categoryComparison,
      overallProgress,
      skillBreakdown,
    })
  } catch (error) {
    console.error("Error fetching progress data:", error)
    return NextResponse.json({ error: "Failed to fetch progress data" }, { status: 500 })
  }
}

