"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PanelLeft, User, ListFilter, BookOpen, CheckSquare, BarChart2, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSignOut = () => {
    // Handle sign out logic here
    router.push("/login")
  }

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-0 md:w-16"
      } bg-[#0a0e17] text-white transition-all duration-300 ease-in-out flex flex-col h-screen fixed`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className={`font-bold text-lg ${!sidebarOpen && "md:hidden"}`}>Student Dashboard</h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-800"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="bg-slate-700" />
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "profile" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Student Profile</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "category" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("category")}
            >
              <ListFilter className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Category Selection</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "learning" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("learning")}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Learning Content</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "tasks" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("tasks")}
            >
              <CheckSquare className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Weekly Tasks</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "progress" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("progress")}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Progress & Performance</span>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={`w-full justify-start text-white hover:bg-slate-800 ${
                activeTab === "alumni" && "bg-slate-800"
              }`}
              onClick={() => setActiveTab("alumni")}
            >
              <Users className="mr-2 h-5 w-5" />
              <span className={`${!sidebarOpen && "md:hidden"}`}>Alumni Experience</span>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800" onClick={handleSignOut}>
          <LogOut className="mr-2 h-5 w-5" />
          <span className={`${!sidebarOpen && "md:hidden"}`}>Sign Out</span>
        </Button>
      </div>
    </div>
  )
}

