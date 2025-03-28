"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function UserTypeSelector() {
  const [userType, setUserType] = useState<"student" | "alumni" | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (userType) {
      console.log("Redirecting to:", `/register?type=${userType}`) // Debugging
      router.push(`/register?type=${userType}`) // ✅ Redirect to register page
    } else {
      console.log("User type not selected")
    }
  }
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Select User Type</CardTitle>
        {/* <CardDescription className="text-center">Select your user type to continue registration</CardDescription> */}
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={userType || ""}
          onValueChange={(value) => setUserType(value as "student" | "alumni")}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student" className="flex-1 cursor-pointer">
              <div className="font-medium">Student</div>
              <div className="text-sm text-muted-foreground">Current VIT student (2022 batch)</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
            <RadioGroupItem value="alumni" id="alumni" />
            <Label htmlFor="alumni" className="flex-1 cursor-pointer">
              <div className="font-medium">Alumni</div>
              <div className="text-sm text-muted-foreground">VIT graduate (2021 or earlier)</div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContinue} disabled={!userType} className="w-full">
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

