import mongoose, { Schema, type Document } from "mongoose"

interface ITaskSubmission {
  taskId: mongoose.Types.ObjectId
  mcqAnswers: {
    questionId: string
    selectedOption: string
  }[]
  codingSolution: string
  score: number
  submittedAt: Date
}

export interface IStudentProgress extends Document {
  studentId: mongoose.Types.ObjectId
  category: string
  taskSubmissions: ITaskSubmission[]
  totalScore: number
  skillScores: {
    skill: string
    score: number
  }[]
  createdAt: Date
  updatedAt: Date
}

const TaskSubmissionSchema: Schema = new Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "WeeklyTask", required: true },
  mcqAnswers: [
    {
      questionId: { type: String, required: true },
      selectedOption: { type: String, required: true },
    },
  ],
  codingSolution: { type: String },
  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
})

const StudentProgressSchema: Schema = new Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    category: { type: String, enum: ["dream", "super-dream", "higher-studies"], required: true },
    taskSubmissions: [TaskSubmissionSchema],
    totalScore: { type: Number, default: 0 },
    skillScores: [
      {
        skill: { type: String, required: true },
        score: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.models.StudentProgress ||
  mongoose.model<IStudentProgress>("StudentProgress", StudentProgressSchema)

