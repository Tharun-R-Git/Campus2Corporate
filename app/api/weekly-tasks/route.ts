import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import WeeklyTask from "@/lib/models/weekly-task"
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

    // If student hasn't selected a category yet, return empty tasks
    if (!student.category) {
      return NextResponse.json([])
    }

    // Get weekly tasks for the student's category
    const tasks = await WeeklyTask.find({ category: student.category }).sort({ weekNumber: 1 })

    // Get student progress to determine which tasks are completed
    const progress = await StudentProgress.findOne({ studentId })

    const now = new Date()

    // Transform tasks to include completion status and past due status
    const tasksWithStatus = tasks.map((task) => {
      const taskObj = task.toObject()

      // Check if task is completed
      const isCompleted =
        progress?.taskSubmissions.some((submission) => submission.taskId.toString() === task._id.toString()) || false

      // Check if task is past due
      const isPastDue = !isCompleted && new Date(task.dueDate) < now

      // For completed tasks, include the student's answers
      let mcqs = taskObj.mcqs
      if (isCompleted && progress) {
        const submission = progress.taskSubmissions.find((sub) => sub.taskId.toString() === task._id.toString())

        if (submission) {
          mcqs = taskObj.mcqs.map((mcq) => {
            const answer = submission.mcqAnswers.find((a) => a.questionId === mcq._id.toString())
            return {
              ...mcq,
              selectedOption: answer?.selectedOption,
            }
          })
        }
      }

      return {
        ...taskObj,
        mcqs,
        isCompleted,
        isPastDue,
        codingTask: {
          ...taskObj.codingTask,
          solution:
            isCompleted && progress
              ? progress.taskSubmissions.find((sub) => sub.taskId.toString() === task._id.toString())?.codingSolution
              : "",
        },
      }
    })

    return NextResponse.json(tasksWithStatus)
  } catch (error) {
    console.error("Error fetching weekly tasks:", error)
    return NextResponse.json({ error: "Failed to fetch weekly tasks" }, { status: 500 })
  }
}

