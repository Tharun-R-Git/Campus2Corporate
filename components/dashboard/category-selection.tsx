"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Check, Briefcase, Rocket, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface CategoryData {
  id: string
  name: string
  description: string
  icon: React.ElementType
}

export default function CategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const categories: CategoryData[] = [
    {
      id: "dream",
      name: "Dream Package",
      description: "Prepare for companies offering competitive salary packages (10-15 LPA)",
      icon: Briefcase,
    },
    {
      id: "super-dream",
      name: "Super Dream Package",
      description: "Prepare for top-tier companies offering premium packages (15+ LPA)",
      icon: Rocket,
    },
    {
      id: "higher-studies",
      name: "Higher Studies",
      description: "Prepare for entrance exams and applications for MS, MBA, or PhD programs",
      icon: GraduationCap,
    },
  ]

  useEffect(() => {
    // Fetch student's current category from MongoDB
    const fetchCategory = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // For now, we'll simulate a fetch with a timeout
        setTimeout(() => {
          const category = "dream" // This would come from your API
          setCurrentCategory(category)
          setSelectedCategory(category)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching category:", error)
        setLoading(false)
      }
    }

    fetchCategory()
  }, [])

  const handleSaveCategory = async () => {
    if (!selectedCategory || selectedCategory === currentCategory) return

    setSaving(true)
    try {
      // In a real implementation, you would update this data via your API
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setCurrentCategory(selectedCategory)
      toast({
        title: "Category Updated",
        description: `Your preparation category has been updated to ${categories.find((c) => c.id === selectedCategory)?.name}`,
      })
    } catch (error) {
      console.error("Error saving category:", error)
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Category Selection</h1>
        <p className="text-muted-foreground">Loading your category preferences...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Category Selection</h1>
      <p className="text-muted-foreground">
        Choose your preparation category based on your career goals. This will customize your learning path.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Select Your Preparation Category</CardTitle>
          <CardDescription>
            Your current category: {categories.find((c) => c.id === currentCategory)?.name || "None selected"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCategory || ""}
            onValueChange={setSelectedCategory}
            className="grid gap-6 md:grid-cols-3"
          >
            {categories.map((category) => (
              <div key={category.id} className="relative">
                <RadioGroupItem value={category.id} id={category.id} className="peer sr-only" />
                <Label
                  htmlFor={category.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-3 rounded-full bg-primary/10 p-2">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm text-muted-foreground text-center mt-2">{category.description}</div>
                  {selectedCategory === category.id && (
                    <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSaveCategory}
            disabled={!selectedCategory || selectedCategory === currentCategory || saving}
            className="ml-auto"
          >
            {saving ? "Saving..." : "Save Category"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

