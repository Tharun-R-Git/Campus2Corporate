// import { SidebarProvider } from "@/components/ui/sidebar"
// import Dashboard from "@/components/homeDashboard"

// export default function App() {
//   return (
//     <SidebarProvider>
//       <Dashboard/>
//     </SidebarProvider>
//   )
// }

"use client"

import { useState } from "react"
import StudentProfile from "@/components/dashboard/student-profile"
import CategorySelection from "@/components/dashboard/category-selection"
import LearningContent from "@/components/dashboard/learning-content"
import WeeklyTasks from "@/components/dashboard/weekly-tasks"
import ProgressPerformance from "@/components/dashboard/progress-performance"
import AlumniExperience from "@/components/dashboard/alumni-experience"
import Sidebar from "@/components/dashboard/sidebar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <StudentProfile />
      case "category":
        return <CategorySelection />
      case "learning":
        return <LearningContent />
      case "tasks":
        return <WeeklyTasks />
      // case "progress":
      //   return <ProgressPerformance />
      case "alumni":
        return <AlumniExperience />
      default:
        return <StudentProfile />
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 ml-64 transition-all duration-300 ease-in-out">
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

