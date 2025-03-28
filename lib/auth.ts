"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"
import Student from "@/lib/models/student";
import Alumni from "@/lib/models/alumni";
import bcrypt from "bcryptjs"
import clientPromise from "./db"
import type { StudentFormData, AlumniFormData, LoginFormData } from "./validation"
import dbconnect from "./db"

// Secret key for JWT
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_key_for_development_only")

// JWT token expiration (24 hours)
const expiration = "24h"

// Register a new student
export async function registerStudent(data: StudentFormData) {
  try {
    const client = await clientPromise
    dbconnect()
    console.log("MongoDB connected successfully")
    // const db = client.db("auth-system")
    // const users = db.collection("users")

    // Check if user already exists
    const student = await Student.findOne({ email: data.email });
    if (student) {
      return { success: false, message: "User already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)
    console.log("\n\n\n\n\n\n\This is the hashed Password",hashedPassword)
    // Create user object (omitting confirmPassword)
    const { confirmPassword, ...userData } = data
    console.log("Came Here Successfully : ")
    console.log(userData)

    // Map userData to match the Student schema
const studentData = {
  name: "Naveen",
  email: userData.email,
  regNumber: userData.rollNumber,
  category: "super-dream", // Default value if not provided
  branch: userData.branch,
  school: userData.school,
  cgpa: userData.cgpa,
  password: hashedPassword,
  createdAt: new Date(),
};

console.log("Mapped Student Data:", studentData);
    // Insert user into database
    await Student.insertOne(studentData)
    console.log("ok")
    return { success: true, message: "Registration successful" }
  } catch (error) {
    console.error("Registration error details:", error)
    return {
      success: false,
      message: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Register a new alumni
export async function registerAlumni(data: AlumniFormData) {
  try {
    const client = await clientPromise
    dbconnect();

    // Check if user already exists
    const existingUser = await Alumni.findOne({ email: data.email })
    if (existingUser) {
      return { success: false, message: "User already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create user object (omitting confirmPassword)
    const { confirmPassword, ...userData } = data

    // Insert user into database
    await Alumni.insertOne({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return { success: true, message: "Registration successful" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Registration failed" }
  }
}

// Login user
export async function loginUser(data: LoginFormData) {
  try {
    const client = await clientPromise
    dbconnect()
    // Find user by email
    const user = await Student.findOne({ email: data.email })
    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }
    console.log("User Present ! ! ! !\n\n\n")
    console.log(data)

    console.log("User Data : ",data.password)
    console.log("DataBase Password : ",user.password)

    // Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" }
    }

    // Create JWT token
    const token = await new SignJWT({
      id: user._id.toString(),
      email: user.email,
      userType: user.userType,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiration)
      .sign(secretKey)

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Login failed" }
  }
}

// Verify JWT token
export async function verifyAuth() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, secretKey)
    return verified.payload
  } catch (error) {
    return null
  }
}

// Logout user
export async function logoutUser() {
  cookies().delete("auth-token")
  redirect("/login")
}

// Middleware to protect routes
export async function requireAuth() {
  const user = await verifyAuth()

  if (!user) {
    redirect("/login")
  }

  return user
}

