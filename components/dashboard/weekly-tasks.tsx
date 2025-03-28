"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Clock, AlertCircle, Code, FileQuestion } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface MCQOption {
  id: string
  text: string
}

interface MCQQuestion {
  id: string
  question: string
  options: MCQOption[]
  correctOption?: string
  selectedOption?: string
}

interface CodingTask {
  id: string
  title: string
  description: string
  sampleInput?: string
  sampleOutput?: string
  solution?: string
}

interface WeeklyTask {
  id: string
  weekNumber: number
  title: string
  dueDate: string
  isCompleted: boolean
  isPastDue: boolean
  mcqs: MCQQuestion[]
  codingTask: CodingTask
}

export default function WeeklyTasks() {
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTask[]>([])
  const [activeWeek, setActiveWeek] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mcq")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Fetch weekly tasks from MongoDB
    const fetchWeeklyTasks = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // For now, we'll simulate a fetch with a timeout
        setTimeout(() => {
          const mockData: WeeklyTask[] = [
            {
              id: "task1",
              weekNumber: 1,
              title: "Introduction to Data Structures",
              dueDate: "2025-03-15",
              isCompleted: true,
              isPastDue: false,
              mcqs: [
                {
                  id: "mcq1",
                  question: "Which of the following is not a linear data structure?",
                  options: [
                    { id: "opt1", text: "Array" },
                    { id: "opt2", text: "Linked List" },
                    { id: "opt3", text: "Tree" },
                    { id: "opt4", text: "Stack" },
                  ],
                  correctOption: "opt3",
                  selectedOption: "opt3",
                },
                {
                  id: "mcq2",
                  question: "What is the time complexity of binary search?",
                  options: [
                    { id: "opt1", text: "O(1)" },
                    { id: "opt2", text: "O(log n)" },
                    { id: "opt3", text: "O(n)" },
                    { id: "opt4", text: "O(n²)" },
                  ],
                  correctOption: "opt2",
                  selectedOption: "opt2",
                },
              ],
              codingTask: {
                id: "code1",
                title: "Implement a Stack",
                description: "Implement a stack data structure with push, pop, and peek operations using arrays.",
                sampleInput: "push(1), push(2), pop(), peek()",
                sampleOutput: "Output: 1",
                solution:
                  "class Stack {\n  constructor() {\n    this.items = [];\n  }\n\n  push(element) {\n    this.items.push(element);\n  }\n\n  pop() {\n    if (this.items.length === 0) return null;\n    return this.items.pop();\n  }\n\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n}",
              },
            },
            {
              id: "task2",
              weekNumber: 2,
              title: "Arrays and Strings",
              dueDate: "2025-03-22",
              isCompleted: false,
              isPastDue: false,
              mcqs: [
                {
                  id: "mcq3",
                  question: "Which method is used to find the length of an array in JavaScript?",
                  options: [
                    { id: "opt1", text: "size()" },
                    { id: "opt2", text: "length()" },
                    { id: "opt3", text: "length" },
                    { id: "opt4", text: "count()" },
                  ],
                  correctOption: "opt3",
                },
                {
                  id: "mcq4",
                  question: "What is the output of 'hello'.charAt(1)?",
                  options: [
                    { id: "opt1", text: "h" },
                    { id: "opt2", text: "e" },
                    { id: "opt3", text: "l" },
                    { id: "opt4", text: "o" },
                  ],
                  correctOption: "opt2",
                },
              ],
              codingTask: {
                id: "code2",
                title: "Reverse a String",
                description: "Write a function to reverse a string without using built-in reverse methods.",
                sampleInput: "hello",
                sampleOutput: "olleh",
              },
            },
            {
              id: "task3",
              weekNumber: 3,
              title: "Linked Lists",
              dueDate: "2025-03-01",
              isCompleted: false,
              isPastDue: true,
              mcqs: [
                {
                  id: "mcq5",
                  question: "What is the advantage of a linked list over an array?",
                  options: [
                    { id: "opt1", text: "Random access of elements" },
                    { id: "opt2", text: "Dynamic size" },
                    { id: "opt3", text: "Less memory usage" },
                    { id: "opt4", text: "Faster search operations" },
                  ],
                  correctOption: "opt2",
                },
              ],
              codingTask: {
                id: "code3",
                title: "Detect Cycle in Linked List",
                description: "Write a function to detect if a linked list has a cycle.",
                sampleInput: "1->2->3->4->2 (pointing back to 2)",
                sampleOutput: "true",
              },
            },
          ]
          setWeeklyTasks(mockData)
          setActiveWeek(mockData[0].id)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching weekly tasks:", error)
        setLoading(false)
      }
    }

    fetchWeeklyTasks()
  }, [])

  const handleMCQSelection = (taskId: string, questionId: string, optionId: string) => {
    setWeeklyTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedMCQs = task.mcqs.map((mcq) => {
            if (mcq.id === questionId) {
              return { ...mcq, selectedOption: optionId }
            }
            return mcq
          })
          return { ...task, mcqs: updatedMCQs }
        }
        return task
      }),
    )
  }

  const handleCodingSolutionChange = (taskId: string, solution: string) => {
    setWeeklyTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            codingTask: {
              ...task.codingTask,
              solution,
            },
          }
        }
        return task
      }),
    )
  }

  const handleSubmitTask = async (taskId: string) => {
    setSubmitting(true)
    try {
      // In a real implementation, you would submit this data to your API
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setWeeklyTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isCompleted: true }
          }
          return task
        }),
      )

      toast({
        title: "Task Submitted",
        description: "Your answers have been submitted successfully.",
      })
    } catch (error) {
      console.error("Error submitting task:", error)
      toast({
        title: "Error",
        description: "Failed to submit task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getActiveTask = () => {
    return weeklyTasks.find((task) => task.id === activeWeek)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Weekly Tasks</h1>
        <p className="text-muted-foreground">Loading your weekly tasks...</p>
      </div>
    )
  }

  const activeTask = getActiveTask()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Weekly Tasks</h1>
      <p className="text-muted-foreground">Complete weekly MCQs and coding tasks to track your progress.</p>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          {weeklyTasks.map((task) => (
            <Card
              key={task.id}
              className={`cursor-pointer ${activeWeek === task.id ? "border-primary" : ""} ${task.isCompleted ? "bg-green-50" : task.isPastDue ? "bg-red-50" : ""}`}
              onClick={() => setActiveWeek(task.id)}
            >
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Week {task.weekNumber}</CardTitle>
                    <CardDescription>{task.title}</CardDescription>
                  </div>
                  {task.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {!task.isCompleted && task.isPastDue && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {!task.isCompleted && !task.isPastDue && <Clock className="h-5 w-5 text-amber-500" />}
                </div>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="text-xs text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                <Badge variant={task.isCompleted ? "outline" : task.isPastDue ? "destructive" : "secondary"}>
                  {task.isCompleted ? "Completed" : task.isPastDue ? "Past Due" : "Pending"}
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="md:col-span-3">
          {activeTask ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      Week {activeTask.weekNumber}: {activeTask.title}
                    </CardTitle>
                    <CardDescription>Due: {new Date(activeTask.dueDate).toLocaleDateString()}</CardDescription>
                  </div>
                  {activeTask.isCompleted && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  )}
                  {!activeTask.isCompleted && activeTask.isPastDue && <Badge variant="destructive">Past Due</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="mcq" className="flex items-center">
                      <FileQuestion className="mr-2 h-4 w-4" />
                      MCQ Questions
                    </TabsTrigger>
                    <TabsTrigger value="coding" className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      Coding Task
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="mcq" className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      {activeTask.mcqs.map((mcq, index) => (
                        <AccordionItem key={mcq.id} value={mcq.id}>
                          <AccordionTrigger className="text-left">
                            <span>
                              Question {index + 1}: {mcq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <RadioGroup
                              value={mcq.selectedOption}
                              onValueChange={(value) => handleMCQSelection(activeTask.id, mcq.id, value)}
                              disabled={activeTask.isCompleted || activeTask.isPastDue}
                            >
                              {mcq.options.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2 py-2">
                                  <RadioGroupItem
                                    value={option.id}
                                    id={`${mcq.id}-${option.id}`}
                                    disabled={activeTask.isCompleted || activeTask.isPastDue}
                                  />
                                  <Label htmlFor={`${mcq.id}-${option.id}`}>{option.text}</Label>
                                  {activeTask.isCompleted && mcq.correctOption === option.id && (
                                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                                  )}
                                </div>
                              ))}
                            </RadioGroup>
                            {activeTask.isCompleted && mcq.selectedOption !== mcq.correctOption && (
                              <div className="mt-2 text-sm text-red-500">
                                Your answer was incorrect. The correct answer is:{" "}
                                {mcq.options.find((opt) => opt.id === mcq.correctOption)?.text}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="coding" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">{activeTask.codingTask.title}</h3>
                      <p className="mt-1 text-muted-foreground">{activeTask.codingTask.description}</p>

                      {activeTask.codingTask.sampleInput && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium">Sample Input:</h4>
                          <pre className="mt-1 rounded bg-slate-100 p-2 text-sm">
                            {activeTask.codingTask.sampleInput}
                          </pre>
                        </div>
                      )}

                      {activeTask.codingTask.sampleOutput && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Sample Output:</h4>
                          <pre className="mt-1 rounded bg-slate-100 p-2 text-sm">
                            {activeTask.codingTask.sampleOutput}
                          </pre>
                        </div>
                      )}

                      <div className="mt-4">
                        <h4 className="text-sm font-medium">Your Solution:</h4>
                        <Textarea
                          className="font-mono mt-1"
                          rows={10}
                          placeholder="Write your code here..."
                          value={activeTask.codingTask.solution || ""}
                          onChange={(e) => handleCodingSolutionChange(activeTask.id, e.target.value)}
                          disabled={activeTask.isCompleted || activeTask.isPastDue}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => handleSubmitTask(activeTask.id)}
                  disabled={activeTask.isCompleted || activeTask.isPastDue || submitting}
                >
                  {submitting ? "Submitting..." : "Submit Task"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p>Select a weekly task to view details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

