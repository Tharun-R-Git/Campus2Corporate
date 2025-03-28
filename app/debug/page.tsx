"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { checkEnvironmentVariables } from "@/lib/check-env"

export default function DebugPage() {
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function checkEnv() {
    setLoading(true)
    try {
      const status = await checkEnvironmentVariables()
      setEnvStatus(status)
    } catch (error) {
      console.error("Error checking environment variables:", error)
      setEnvStatus({ error: "Failed to check environment variables" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Debug Page</CardTitle>
          <CardDescription>Use this page to diagnose issues with your authentication system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={checkEnv} disabled={loading}>
              {loading ? "Checking..." : "Check Environment Variables"}
            </Button>

            {envStatus && (
              <pre className="mt-4 p-4 bg-muted rounded-md overflow-auto">{JSON.stringify(envStatus, null, 2)}</pre>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

