import mongoose, { Schema, type Document } from "mongoose"

export interface IStudent extends Document {
  name: string
  email: string
  regNumber: string
  // password: string
  category: string
  branch: string
  cgpa : string
  school : string
  // totalScore: number
  // progressPercentage: number
  // completedTasks: number
  // totalTasks: number
  createdAt: Date
  updatedAt: Date
}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    regNumber: { type: String, required: true, unique: true },
    //password: { type: String, required: true },
    category: { type: String, enum: ["dream", "super-dream", "higher-studies"], default: "super-dream" },
    branch: {type: String, required: true},
    school: {type: String, required: true},
    cgpa: {type: String, required: true},
    //totalScore: { type: Number, default: 0 },
    //progressPercentage: { type: Number, default: 0 },
    //completedTasks: { type: Number, default: 0 },
    //totalTasks: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema)

