"use server"

import { connectToDatabase } from "@/lib/db"
import Alumni from "@/lib/models/alumni"
import { revalidatePath } from "next/cache"

export async function getAlumniExperiences(search?: string) {
  try {
    await connectToDatabase()

    let query: any = {}

    if (search) {
      const searchRegex = new RegExp(search, "i")
      query = {
        $or: [{ company: searchRegex }, { role: searchRegex }, { name: searchRegex }, { tags: { $in: [searchRegex] } }],
      }
    }

    const experiences = await Alumni.find(query)
      .sort({ createdAt: -1 })
      .select("name company role package year tags experience")

    return { success: true, experiences }
  } catch (error) {
    console.error("Error fetching alumni experiences:", error)
    return { success: false, error: "Failed to fetch alumni experiences" }
  }
}

export async function submitAlumniExperience(
  name: string,
  email: string,
  company: string,
  role: string,
  packageValue: string,
  year: number,
  tags: string[],
  experience: string,
) {
  try {
    await connectToDatabase()

    const newAlumni = new Alumni({
      name,
      email,
      company,
      role,
      package: packageValue,
      year,
      tags,
      experience,
    })

    await newAlumni.save()

    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Error submitting alumni experience:", error)
    return { success: false, error: "Failed to submit experience" }
  }
}

