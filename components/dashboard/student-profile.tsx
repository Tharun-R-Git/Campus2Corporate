// "use client"

// import { useEffect, useState } from "react"
// import { User, Mail, BookOpen, Award, BarChart2 } from "lucide-react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Skeleton } from "@/components/ui/skeleton"

// interface StudentData {
//   name: string
//   email: string
//   regNumber: string
//   category: string
//   totalScore: number
//   progressPercentage: number
//   completedTasks: number
//   totalTasks: number
// }

// export default function StudentProfile() {
//   const [student, setStudent] = useState<StudentData | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Fetch student data from MongoDB
//     const fetchStudentData = async () => {
//       try {
//         // In a real implementation, you would fetch this data from your API
//         // For now, we'll simulate a fetch with a timeout
//         setTimeout(() => {
//           setStudent({
//             name: "John Doe",
//             email: "john.doe2022@vitstudent.ac.in",
//             regNumber: "22BCE1234",
//             category: "Dream Package",
//             totalScore: 750,
//             progressPercentage: 68,
//             completedTasks: 14,
//             totalTasks: 20,
//           })
//           setLoading(false)
//         }, 1000)
//       } catch (error) {
//         console.error("Error fetching student data:", error)
//         setLoading(false)
//       }
//     }

//     fetchStudentData()
//   }, [])

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">Student Profile</h1>
//         <div className="grid gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//             </CardHeader>
//             <CardContent className="flex items-center space-x-4">
//               <Skeleton className="h-12 w-12 rounded-full" />
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-[250px]" />
//                 <Skeleton className="h-4 w-[200px]" />
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Academic Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-4 w-full" />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   if (!student) {
//     return <div>No student data available</div>
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Student Profile</h1>
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Your profile details</CardDescription>
//           </CardHeader>
//           <CardContent className="flex items-center space-x-4">
//             <Avatar className="h-16 w-16">
//               <AvatarImage src="/placeholder.svg" alt={student.name} />
//               <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="flex items-center space-x-2">
//                 <User className="h-4 w-4 text-muted-foreground" />
//                 <p className="text-sm font-medium">{student.name}</p>
//               </div>
//               <div className="flex items-center space-x-2 mt-1">
//                 <Mail className="h-4 w-4 text-muted-foreground" />
//                 <p className="text-sm text-muted-foreground">{student.email}</p>
//               </div>
//               <div className="flex items-center space-x-2 mt-1">
//                 <BookOpen className="h-4 w-4 text-muted-foreground" />
//                 <p className="text-sm text-muted-foreground">Reg No: {student.regNumber}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Placement Preparation</CardTitle>
//             <CardDescription>Your current preparation category</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Award className="h-4 w-4 text-muted-foreground" />
//                 <p className="text-sm font-medium">Category</p>
//               </div>
//               <span className="text-sm font-medium">{student.category}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <BarChart2 className="h-4 w-4 text-muted-foreground" />
//                 <p className="text-sm font-medium">Total Score</p>
//               </div>
//               <span className="text-sm font-medium">{student.totalScore} points</span>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Overall Progress</CardTitle>
//           <CardDescription>
//             You have completed {student.completedTasks} out of {student.totalTasks} tasks
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-sm font-medium">Progress</span>
//               <span className="text-sm font-medium">{student.progressPercentage}%</span>
//             </div>
//             <Progress value={student.progressPercentage} className="h-2" />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { User, Mail, BookOpen, Award, BarChart2, School } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StudentData {
  name: string
  email: string
  regNumber: string
  category: string
  branch: string
  school: string
  cgpa: number
}

export default function StudentProfile() {
  const [student, setStudent] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/student/profile")
        if (!response.ok) throw new Error("Failed to fetch student data")

        const data = await response.json()
        setStudent(data)
      } catch (error) {
        console.error("Error fetching student data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!student) {
    return <div>No student data available</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">{student.name}</p>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Reg No: {student.regNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Branch</p>
              </div>
              <span className="text-sm font-medium">{student.branch}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">School</p>
              </div>
              <span className="text-sm font-medium">{student.school}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">CGPA</p>
              </div>
              <span className="text-sm font-medium">{student.cgpa}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

