"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformanceData {
  weeklyScores: {
    week: number
    mcqScore: number
    codingScore: number
    totalScore: number
  }[]
  categoryComparison: {
    category: string
    averageScore: number
    yourScore: number
  }[]
  overallProgress: {
    completed: number
    total: number
    percentage: number
  }
  skillBreakdown: {
    skill: string
    score: number
    maxScore: number
  }[]
}

export default function ProgressPerformance() {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch performance data from MongoDB
    const fetchPerformanceData = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // For now, we'll simulate a fetch with a timeout
        setTimeout(() => {
          const mockData: PerformanceData = {
            weeklyScores: [
              { week: 1, mcqScore: 85, codingScore: 70, totalScore: 78 },
              { week: 2, mcqScore: 90, codingScore: 75, totalScore: 83 },
              { week: 3, mcqScore: 80, codingScore: 85, totalScore: 82 },
              { week: 4, mcqScore: 95, codingScore: 90, totalScore: 93 },
            ],
            categoryComparison: [
              { category: "Dream Package", averageScore: 75, yourScore: 82 },
              { category: "Super Dream Package", averageScore: 85, yourScore: 82 },
              { category: "Higher Studies", averageScore: 80, yourScore: 82 },
            ],
            overallProgress: {
              completed: 14,
              total: 20,
              percentage: 70,
            },
            skillBreakdown: [
              { skill: "Data Structures", score: 85, maxScore: 100 },
              { skill: "Algorithms", score: 78, maxScore: 100 },
              { skill: "Aptitude", score: 90, maxScore: 100 },
              { skill: "Problem Solving", score: 82, maxScore: 100 },
              { skill: "Logical Reasoning", score: 88, maxScore: 100 },
            ],
          }
          setPerformanceData(mockData)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching performance data:", error)
        setLoading(false)
      }
    }

    fetchPerformanceData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Progress & Performance</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!performanceData) {
    return <div>No performance data available</div>
  }

  // Prepare data for charts
  const weeklyScoreData = performanceData.weeklyScores.map((score) => ({
    week: `Week ${score.week}`,
    MCQ: score.mcqScore,
    Coding: score.codingScore,
    Total: score.totalScore,
  }))

  const categoryComparisonData = performanceData.categoryComparison.map((category) => ({
    category: category.category,
    "Average Score": category.averageScore,
    "Your Score": category.yourScore,
  }))

  const skillBreakdownData = performanceData.skillBreakdown.map((skill) => ({
    skill: skill.skill,
    score: skill.score,
    maxScore: skill.maxScore,
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Progress & Performance</h1>
      <p className="text-muted-foreground">Track your progress and performance across different skills and weeks.</p>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            You have completed {performanceData.overallProgress.completed} out of{" "}
            {performanceData.overallProgress.total} tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{performanceData.overallProgress.percentage}%</span>
            </div>
            <Progress value={performanceData.overallProgress.percentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="weekly">Weekly Scores</TabsTrigger>
          <TabsTrigger value="category">Category Comparison</TabsTrigger>
          <TabsTrigger value="skills">Skill Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>Your scores across different weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer data={weeklyScoreData} xAxisKey="week" yAxisWidth={40} showAnimation={true}>
                  <LineChart
                    colors={["#2563eb", "#10b981", "#f59e0b"]}
                    series={[
                      { key: "MCQ", label: "MCQ Score" },
                      { key: "Coding", label: "Coding Score" },
                      { key: "Total", label: "Total Score" },
                    ]}
                    tooltip={
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    }
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="category" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Comparison</CardTitle>
              <CardDescription>How you compare to others in different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer data={categoryComparisonData} xAxisKey="category" yAxisWidth={40} showAnimation={true}>
                  <BarChart
                    colors={["#94a3b8", "#2563eb"]}
                    series={[
                      { key: "Average Score", label: "Average Score" },
                      { key: "Your Score", label: "Your Score" },
                    ]}
                    tooltip={
                      <ChartTooltip>
                        <ChartTooltipContent />
                      </ChartTooltip>
                    }
                  />
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Your performance across different skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillBreakdownData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm font-medium">
                        {skill.score}/{skill.maxScore}
                      </span>
                    </div>
                    <Progress value={(skill.score / skill.maxScore) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

