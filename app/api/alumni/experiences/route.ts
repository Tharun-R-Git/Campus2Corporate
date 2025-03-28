import { NextResponse } from "next/server"
import dbconnect from "@/db/dbconnect"
import Alumni from "@/lib/models/alumni"

export async function GET(request: Request) {
  try {
    await dbconnect()

    const { searchParams } = new URL(request.url)
    const company = searchParams.get("company")
    const role = searchParams.get("role")
    const tag = searchParams.get("tag")

    // Build query based on search parameters
    const query: any = {}

    if (company) {
      query.company = { $regex: company, $options: "i" }
    }

    if (role) {
      query.role = { $regex: role, $options: "i" }
    }

    if (tag) {
      query.tags = { $in: [new RegExp(tag, "i")] }
    }

    const experiences = await Alumni.find(query)
      .sort({ createdAt: -1 })
      .select("name company role package year tags experience")

    return NextResponse.json(experiences)
  } catch (error) {
    console.error("Error fetching alumni experiences:", error)
    return NextResponse.json({ error: "Failed to fetch alumni experiences" }, { status: 500 })
  }
}

