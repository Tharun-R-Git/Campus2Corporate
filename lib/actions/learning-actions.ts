"use server"

import { connectToDatabase } from "@/lib/db"
import LearningContent from "@/lib/models/learning-content"
import WeeklyTask from "@/lib/models/weekly-task"
import StudentProgress from "@/lib/models/student-progress"

export async function getLearningContent(studentId: string, category: string) {
  try {
    await connectToDatabase()

    if (!category) {
      return { success: true, content: [] }
    }

    // Get learning content for the student's category
    const content = await LearningContent.find({ category }).sort({ weekNumber: 1 })

    // Get student progress to determine which resources are completed
    const progress = await StudentProgress.findOne({ studentId })

    // In a real implementation, you would check which resources the student has completed
    // For now, we'll assume none are completed
    const contentWithStatus = content.map((week) => {
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

    return { success: true, content: contentWithStatus }
  } catch (error) {
    console.error("Error fetching learning content:", error)
    return { success: false, error: "Failed to fetch learning content" }
  }
}

export async function getWeeklyTasks(studentId: string, category: string) {
  try {
    await connectToDatabase()

    if (!category) {
      return { success: true, tasks: [] }
    }

    // Get weekly tasks for the student's category
    const tasks = await WeeklyTask.find({ category }).sort({ weekNumber: 1 })

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

    return { success: true, tasks: tasksWithStatus }
  } catch (error) {
    console.error("Error fetching weekly tasks:", error)
    return { success: false, error: "Failed to fetch weekly tasks" }
  }
}

export async function getProgressData(studentId: string, category: string) {
  try {
    await connectToDatabase()

    if (!category) {
      return {
        success: true,
        data: {
          weeklyScores: [],
          categoryComparison: [],
          overallProgress: {
            completed: 0,
            total: 0,
            percentage: 0,
          },
          skillBreakdown: [],
        },
      }
    }

    const progress = await StudentProgress.findOne({ studentId })

    if (!progress) {
      return {
        success: true,
        data: {
          weeklyScores: [],
          categoryComparison: [],
          overallProgress: {
            completed: 0,
            total: 0,
            percentage: 0,
          },
          skillBreakdown: [],
        },
      }
    }

    // Get weekly scores
    const tasks = await WeeklyTask.find({ category }).sort({ weekNumber: 1 })

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
      { category: "Dream Package", averageScore: 75, yourScore: progress.totalScore },
      { category: "Super Dream Package", averageScore: 85, yourScore: progress.totalScore },
      { category: "Higher Studies", averageScore: 80, yourScore: progress.totalScore },
    ]

    // Get overall progress
    const totalTasks = await WeeklyTask.countDocuments({ category })
    const completedTasks = progress.taskSubmissions.length
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    const overallProgress = {
      completed: completedTasks,
      total: totalTasks,
      percentage,
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

    return {
      success: true,
      data: {
        weeklyScores,
        categoryComparison,
        overallProgress,
        skillBreakdown,
      },
    }
  } catch (error) {
    console.error("Error fetching progress data:", error)
    return { success: false, error: "Failed to fetch progress data" }
  }
}

