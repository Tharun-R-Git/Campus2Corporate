"use client"

import { useEffect, useState } from "react"
import { Search, Building, User, Calendar, Briefcase, ChevronRight, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface AlumniExperience {
  id: string
  alumniName: string
  company: string
  role: string
  package: string
  year: number
  tags: string[]
  experience: string
}

export default function AlumniExperience() {
  const [experiences, setExperiences] = useState<AlumniExperience[]>([])
  const [filteredExperiences, setFilteredExperiences] = useState<AlumniExperience[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExperience, setSelectedExperience] = useState<AlumniExperience | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch alumni experiences from MongoDB
    const fetchAlumniExperiences = async () => {
      try {
        // In a real implementation, you would fetch this data from your API
        // For now, we'll simulate a fetch with a timeout
        setTimeout(() => {
          const mockData: AlumniExperience[] = [
            {
              id: "exp1",
              alumniName: "Rahul Sharma",
              company: "Google",
              role: "Software Engineer",
              package: "32 LPA",
              year: 2024,
              tags: ["DSA", "System Design", "MERN Stack"],
              experience:
                "The interview process at Google consisted of 5 rounds. First was an online assessment with DSA problems. Then there were 3 technical interviews focusing on algorithms, data structures, and system design. The final round was with the hiring manager discussing my projects and experience.\n\nFor preparation, I focused on LeetCode medium and hard problems, especially those related to trees, graphs, and dynamic programming. I also studied system design concepts from 'Designing Data-Intensive Applications'.\n\nMy advice would be to practice at least 200 LeetCode problems, understand the fundamentals deeply, and be able to explain your thought process clearly during interviews.",
            },
            {
              id: "exp2",
              alumniName: "Priya Patel",
              company: "Microsoft",
              role: "Software Development Engineer",
              package: "28 LPA",
              year: 2023,
              tags: ["Algorithms", "Object-Oriented Design", "Azure"],
              experience:
                "Microsoft's interview process had 4 rounds. It started with an online coding test, followed by 2 technical interviews focusing on algorithms and object-oriented design. The final round was with the team lead discussing my projects and how I would fit into the team.\n\nI prepared by solving problems on LeetCode and HackerRank, focusing on Microsoft's frequently asked questions. I also brushed up on my knowledge of object-oriented programming principles and design patterns.\n\nMy tip would be to understand Microsoft's products and technologies, especially Azure services if you're interviewing for a cloud-related role. Also, be prepared to discuss how you handle challenges and work in a team.",
            },
            {
              id: "exp3",
              alumniName: "Vikram Singh",
              company: "Amazon",
              role: "SDE-1",
              package: "26 LPA",
              year: 2024,
              tags: ["Leadership Principles", "DSA", "System Design"],
              experience:
                "Amazon's interview process was rigorous with 6 rounds. It started with an online assessment, followed by 4 technical interviews covering data structures, algorithms, and system design. The final round was a bar raiser interview focusing on Amazon's leadership principles.\n\nI prepared extensively for DSA by solving problems on LeetCode, focusing on trees, graphs, and dynamic programming. I also studied Amazon's leadership principles and prepared stories from my experience that demonstrated each principle.\n\nMy advice would be to understand Amazon's leadership principles thoroughly and prepare examples from your experience for each. Also, practice explaining your thought process clearly while solving problems, as Amazon interviewers value your approach as much as the final solution.",
            },
            {
              id: "exp4",
              alumniName: "Ananya Desai",
              company: "Adobe",
              role: "Frontend Developer",
              package: "22 LPA",
              year: 2023,
              tags: ["React", "JavaScript", "UI/UX"],
              experience:
                "Adobe's interview process had 4 rounds. First was an online coding assessment focusing on JavaScript and React. Then there were 2 technical interviews where I had to solve problems and explain my approach. The final round was with the design team discussing UI/UX concepts and my portfolio.\n\nI prepared by building several React projects, practicing JavaScript concepts, and studying UI/UX principles. I also worked on improving my CSS skills and understanding of responsive design.\n\nMy tip would be to have a strong portfolio showcasing your frontend skills. Also, be prepared to discuss design decisions and trade-offs in your projects. Adobe values creativity, so don't be afraid to think outside the box during interviews.",
            },
            {
              id: "exp5",
              alumniName: "Karthik Raman",
              company: "Infosys",
              role: "Systems Engineer",
              package: "8 LPA",
              year: 2024,
              tags: ["Aptitude", "Communication", "Java"],
              experience:
                "Infosys had a 3-round interview process. First was an online aptitude and coding test. The second round was a technical interview focusing on Java concepts and basic data structures. The final round was an HR interview discussing my background and career goals.\n\nI prepared by practicing aptitude questions, revising core Java concepts, and working on my communication skills. I also read about Infosys's projects and technologies.\n\nMy advice would be to focus on basics rather than advanced topics. Infosys values good communication skills and a willingness to learn, so highlight these aspects during your interview. Also, be prepared to discuss your long-term career goals and how they align with Infosys's vision.",
            },
          ]
          setExperiences(mockData)
          setFilteredExperiences(mockData)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching alumni experiences:", error)
        setLoading(false)
      }
    }

    fetchAlumniExperiences()
  }, [])

  useEffect(() => {
    // Filter experiences based on search query
    if (searchQuery.trim() === "") {
      setFilteredExperiences(experiences)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = experiences.filter(
        (exp) =>
          exp.company.toLowerCase().includes(query) ||
          exp.role.toLowerCase().includes(query) ||
          exp.alumniName.toLowerCase().includes(query) ||
          exp.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
      setFilteredExperiences(filtered)
    }
  }, [searchQuery, experiences])

  const handleViewExperience = (experience: AlumniExperience) => {
    setSelectedExperience(experience)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Alumni Experiences</h1>
        <div className="relative">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Alumni Experiences</h1>
      <p className="text-muted-foreground">
        Learn from the experiences of VIT alumni who have successfully secured placements.
      </p>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by company, role, or keywords..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredExperiences.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p>No experiences found matching your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredExperiences.map((experience) => (
            <Card key={experience.id} className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-primary" />
                  {experience.company}
                </CardTitle>
                <CardDescription>{experience.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{experience.alumniName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Package: {experience.package}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Year: {experience.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {experience.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="ml-auto flex items-center"
                  onClick={() => handleViewExperience(experience)}
                >
                  View Experience
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedExperience} onOpenChange={(open) => !open && setSelectedExperience(null)}>
        {selectedExperience && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-primary" />
                {selectedExperience.company} - {selectedExperience.role}
              </DialogTitle>
              <DialogDescription>
                Shared by {selectedExperience.alumniName} ({selectedExperience.year})
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 mt-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Package: {selectedExperience.package}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedExperience.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Separator className="my-4" />
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Interview Experience
                </h3>
                <div className="whitespace-pre-line text-muted-foreground">{selectedExperience.experience}</div>
              </div>
            </ScrollArea>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

