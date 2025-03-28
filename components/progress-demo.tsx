"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ProgressDemo() {
  const [mounted, setMounted] = useState(false)

  if (typeof window !== "undefined" && !mounted) {
    setMounted(true)
  }

  const progressValue = 68

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Your journey through the preparation process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Week 8 of 12</span>
                  <span className="text-sm font-medium">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">MCQs Completed</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">32/40</span>
                    <span className="text-sm text-muted-foreground">80%</span>
                  </div>
                  <Progress value={80} className="h-1" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Coding Tasks</p>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">18/24</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Points Earned</CardTitle>
              <CardDescription>Your performance across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mcq">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mcq">MCQ Points</TabsTrigger>
                  <TabsTrigger value="coding">Coding Points</TabsTrigger>
                </TabsList>
                <TabsContent value="mcq" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Technical Knowledge</span>
                      <span className="text-sm font-medium">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Aptitude</span>
                      <span className="text-sm font-medium">72/100</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Domain Knowledge</span>
                      <span className="text-sm font-medium">78/100</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </TabsContent>
                <TabsContent value="coding" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm font-medium">82/100</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Code Quality</span>
                      <span className="text-sm font-medium">76/100</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Optimization</span>
                      <span className="text-sm font-medium">68/100</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background dark:from-primary/10 dark:via-background/50 dark:to-background/80 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <h3 className="text-2xl font-bold">Interactive Dashboard</h3>
            <p className="text-muted-foreground">
              Track your progress, view upcoming tasks, and monitor your performance all in one place
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <Card className="bg-background/80 backdrop-blur-sm dark:bg-background/40">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Next Task</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">Week 9 MCQs</p>
                  <p className="text-xs text-muted-foreground">Due in 3 days</p>
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm dark:bg-background/40">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Total Points</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">461/600</p>
                  <p className="text-xs text-muted-foreground">Top 15% in your category</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

