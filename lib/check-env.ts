"use server"

export async function checkEnvironmentVariables() {
  return {
    mongodbUri: process.env.MONGODB_URI ? "Set" : "Not set",
    jwtSecret: process.env.JWT_SECRET ? "Set" : "Not set",
    nodeEnv: process.env.NODE_ENV || "Not set",
  }
}

