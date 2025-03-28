import mongoose, { Schema, type Document } from "mongoose"

interface IMCQOption {
  id: string
  text: string
}

interface IMCQQuestion {
  question: string
  options: IMCQOption[]
  correctOption: string
}

interface ICodingTask {
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
}

export interface IWeeklyTask extends Document {
  weekNumber: number
  title: string
  description: string
  category: string
  dueDate: Date
  mcqs: IMCQQuestion[]
  codingTask: ICodingTask
  createdAt: Date
  updatedAt: Date
}

const MCQOptionSchema: Schema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
})

const MCQQuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: [MCQOptionSchema],
  correctOption: { type: String, required: true },
})

const CodingTaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sampleInput: { type: String },
  sampleOutput: { type: String },
})

const WeeklyTaskSchema: Schema = new Schema(
  {
    weekNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["dream", "super-dream", "higher-studies"], required: true },
    dueDate: { type: Date, required: true },
    mcqs: [MCQQuestionSchema],
    codingTask: CodingTaskSchema,
  },
  { timestamps: true },
)

export default mongoose.models.WeeklyTask || mongoose.model<IWeeklyTask>("WeeklyTask", WeeklyTaskSchema)

