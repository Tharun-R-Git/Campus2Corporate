import mongoose, { Schema, type Document } from "mongoose"

export interface IAlumni extends Document {
  name: string
  email: string
  company: string
  role: string
  package: string
  year: number
  tags: string[]
  experience: string
  createdAt: Date
  updatedAt: Date
}

const AlumniSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String, required: true },
    year: { type: Number, required: true },
    tags: [{ type: String }],
    experience: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", AlumniSchema)

