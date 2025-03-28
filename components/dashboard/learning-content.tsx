"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Play, FileText, LinkIcon, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Resource {
  id: string
  title: string
  type: "video" | "notes" | "link"
  url: string
  duration?: string
  completed: boolean
}

interface WeekContent {
  id: string
  weekNumber: number
  title: string
  description: string
  resources: Resource[]
  isCompleted: boolean
}

export default function LearningContent() {
  const [weeklyContent, setWeeklyContent] = useState<WeekContent[]>([])
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Fetch learning content from MongoDB based on student's category
    const fetchLearningContent = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // For now, we'll simulate a fetch with a timeout
        setTimeout(() => {
          const mockData: WeekContent[] = [
            {
              id: "week1",
              weekNumber: 1,
              title: "Introduction to Placement Preparation",
              description: "Overview of the placement process and preparation strategy",
              isCompleted: true,
              resources: [
                {
                  id: "res1",
                  title: "Placement Process Overview",
                  type: "video",
                  url: "https://example.com/video1",
                  duration: "15 min",
                  completed: true,
                },
                {
                  id: "res2",
                  title: "Resume Building Guidelines",
                  type: "notes",
                  url: "https://example.com/notes1",
                  completed: true,
                },
                {
                  id: "res3",
                  title: "Industry Expectations",
                  type: "link",
                  url: "https://example.com/resource1",
                  completed: true,
                },
              ],
            },
            {
              id: "week2",
              weekNumber: 2,
              title: "Data Structures & Algorithms",
              description: "Fundamental DSA concepts for technical interviews",
              isCompleted: false,
              resources: [
                {
                  id: "res4",
                  title: "Arrays and Strings",
                  type: "video",
                  url: "https://example.com/video2",
                  duration: "25 min",
                  completed: true,
                },
                {
                  id: "res5",
                  title: "Linked Lists and Trees",
                  type: "video",
                  url: "https://example.com/video3",
                  duration: "30 min",
                  completed: false,
                },
                {
                  id: "res6",
                  title: "DSA Practice Problems",
                  type: "notes",
                  url: "https://example.com/notes2",
                  completed: false,
                },
              ],
            },
            {
              id: "week3",
              weekNumber: 3,
              title: "Aptitude & Logical Reasoning",
              description: "Quantitative aptitude and logical reasoning preparation",
              isCompleted: false,
              resources: [
                {
                  id: "res7",
                  title: "Quantitative Aptitude Basics",
                  type: "video",
                  url: "https://example.com/video4",
                  duration: "20 min",
                  completed: false,
                },
                {
                  id: "res8",
                  title: "Logical Reasoning Practice Set",
                  type: "notes",
                  url: "https://example.com/notes3",
                  completed: false,
                },
              ],
            },
          ]
          setWeeklyContent(mockData)
          setExpandedWeek(mockData[0].id)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching learning content:", error)
        setLoading(false)
      }
    }

    fetchLearningContent()
  }, [])

  const toggleWeek = (weekId: string) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId)
  }

  const markResourceAsCompleted = (weekId: string, resourceId: string) => {
    setWeeklyContent((prevContent) =>
      prevContent.map((week) => {
        if (week.id === weekId) {
          const updatedResources = week.resources.map((resource) => {
            if (resource.id === resourceId) {
              return { ...resource, completed: true }
            }
            return resource
          })

          // Check if all resources are completed
          const allCompleted = updatedResources.every((resource) => resource.completed)

          return {
            ...week,
            resources: updatedResources,
            isCompleted: allCompleted,
          }
        }
        return week
      }),
    )
  }

  const filteredContent =
    activeTab === "all"
      ? weeklyContent
      : activeTab === "completed"
        ? weeklyContent.filter((week) => week.isCompleted)
        : weeklyContent.filter((week) => !week.isCompleted)

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Learning Content</h1>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Learning Content</h1>
      <p className="text-muted-foreground">Access your weekly learning materials based on your selected category.</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No content available in this category.</p>
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((week) => (
            <Card key={week.id} className={week.isCompleted ? "border-green-200" : ""}>
              <CardHeader className="cursor-pointer" onClick={() => toggleWeek(week.id)}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <CardTitle>
                        Week {week.weekNumber}: {week.title}
                      </CardTitle>
                      {week.isCompleted && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{week.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    {expandedWeek === week.id ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>
              {expandedWeek === week.id && (
                <CardContent>
                  <div className="space-y-4">
                    {week.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-3">
                          {resource.type === "video" && <Play className="h-5 w-5 text-blue-500" />}
                          {resource.type === "notes" && <FileText className="h-5 w-5 text-orange-500" />}
                          {resource.type === "link" && <LinkIcon className="h-5 w-5 text-purple-500" />}
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            {resource.duration && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {resource.duration}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </Button>
                          {!resource.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markResourceAsCompleted(week.id, resource.id)}
                            >
                              Mark Complete
                            </Button>
                          )}
                          {resource.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

