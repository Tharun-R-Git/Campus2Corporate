import mongoose, { Schema, type Document } from "mongoose"

interface IResource {
  title: string
  type: "video" | "notes" | "link"
  url: string
  duration?: string
}

export interface ILearningContent extends Document {
  weekNumber: number
  title: string
  description: string
  category: string
  resources: IResource[]
  createdAt: Date
  updatedAt: Date
}

const ResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "notes", "link"], required: true },
  url: { type: String, required: true },
  duration: { type: String },
})

const LearningContentSchema: Schema = new Schema(
  {
    weekNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["dream", "super-dream", "higher-studies"], required: true },
    resources: [ResourceSchema],
  },
  { timestamps: true },
)

export default mongoose.models.LearningContent ||
  mongoose.model<ILearningContent>("LearningContent", LearningContentSchema)

