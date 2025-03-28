import Link from "next/link"
import Image from "next/image"
import { ChevronRight, BarChart3, BookOpen, Code, Bell, Users, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { CategoryCard } from "@/components/category-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { ProgressDemo } from "@/components/progress-demo"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import dbconnect from "@/db/dbconnect"

export default function Home() {
  dbconnect();
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <HeroSection />

        {/* Features Section */}
        <section className="container py-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
              Prepare for Your Future Career
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides everything you need to succeed in placements and higher studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Curated Learning Materials"
              description="Access to videos, notes, and resources tailored to your chosen career path"
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-primary" />}
              title="Weekly Coding Tasks"
              description="Practice with real-world coding problems that prepare you for technical interviews"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Progress Tracking"
              description="Visualize your improvement with our comprehensive progress tracking system"
            />
            <FeatureCard
              icon={<Bell className="h-10 w-10 text-primary" />}
              title="Deadline Notifications"
              description="Stay on track with timely reminders for upcoming tasks and deadlines"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Alumni Insights"
              description="Learn from the experiences of successful alumni who've been in your shoes"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
              title="Automated Evaluation"
              description="Get instant feedback on your MCQs and coding solutions to improve faster"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-secondary py-20">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Choose Your Path
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Select the category that aligns with your career goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CategoryCard
              title="Dream Package"
              description="Prepare for top-tier companies with competitive packages"
              icon="/dream.png?height=80&width=80"
              
              />
              <CategoryCard
              title="Super Dream Package"
              description="Aim for elite opportunities with premium compensation"
              icon="/super-dream.png?height=80&width=80"
            
              />
              <CategoryCard
              title="Higher Studies"
              description="Get ready for advanced education in India or abroad"
              icon="/higher-studies.png?height=80&width=80"
             
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container py-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our structured approach ensures you're well-prepared for your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Register & Choose Your Path</h3>
                  <p className="text-muted-foreground">
                    Sign up and select your desired category: Dream Package, Super Dream Package, or Higher Studies
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Access Tailored Content</h3>
                  <p className="text-muted-foreground">
                    Get immediate access to learning materials specifically designed for your chosen path
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Complete Weekly Tasks</h3>
                  <p className="text-muted-foreground">
                    Tackle MCQs and coding challenges each week to build your skills progressively
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Track Your Progress</h3>
                  <p className="text-muted-foreground">
                    Monitor your improvement with our visual progress tracker and earn points
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Platform workflow visualization"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Progress Tracking Demo */}
        <section className="bg-secondary py-20">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Track Your Journey
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Visualize your progress and stay motivated throughout your preparation
              </p>
            </div>

            <ProgressDemo />
          </div>
        </section>

        {/* Alumni Testimonials */}
        <section className="container py-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
              Alumni Success Stories
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Learn from the experiences of those who've successfully navigated their career paths
            </p>
          </div>

          <Tabs defaultValue="dream" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dream">Dream Package</TabsTrigger>
              <TabsTrigger value="super">Super Dream Package</TabsTrigger>
              <TabsTrigger value="higher">Higher Studies</TabsTrigger>
            </TabsList>
            <TabsContent value="dream" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TestimonialCard
                  name="Priya Sharma"
                  role="Software Engineer at Google"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The structured approach and weekly coding challenges on Campus2Corporate helped me build the skills I needed to crack my Google interview."
                />
                <TestimonialCard
                  name="Rahul Verma"
                  role="Product Manager at Microsoft"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The platform's comprehensive resources and alumni insights gave me a clear roadmap to prepare for my dream role."
                />
              </div>
            </TabsContent>
            <TabsContent value="super" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TestimonialCard
                  name="Ananya Patel"
                  role="ML Engineer at Apple"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The specialized content for Super Dream packages helped me focus on advanced topics that were crucial for my technical interviews."
                />
                <TestimonialCard
                  name="Vikram Singh"
                  role="SDE at Amazon"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The weekly challenges pushed me to improve consistently, which made a huge difference in my interview performance."
                />
              </div>
            </TabsContent>
            <TabsContent value="higher" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TestimonialCard
                  name="Neha Gupta"
                  role="MS in Computer Science, Stanford"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The higher studies track provided exactly what I needed to prepare for GRE and university applications alongside my semester studies."
                />
                <TestimonialCard
                  name="Arjun Reddy"
                  role="PhD Candidate at MIT"
                  image="/placeholder.svg?height=100&width=100"
                  quote="The platform's resources helped me build a strong foundation for research and academic pursuits while managing my undergraduate coursework."
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Section */}
        <section className="bg-secondary py-20">
          <div className="container space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about our platform
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Who can use Campus2Corporate?</AccordionTrigger>
                  <AccordionContent>
                    Campus2Corporate is designed specifically for 6th-semester students at VIT Vellore who are preparing
                    for placements or higher studies. Alumni can also join to share their experiences and insights.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I choose between the different categories?</AccordionTrigger>
                  <AccordionContent>
                    After registration, you can select the category that aligns with your career goals: Dream Package
                    (for top-tier companies), Super Dream Package (for elite opportunities), or Higher Studies (for
                    advanced education). You can change your selection later if your goals change.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What kind of learning materials are provided?</AccordionTrigger>
                  <AccordionContent>
                    We provide a variety of resources including video tutorials, comprehensive notes, practice problems,
                    and reference materials. All content is curated specifically for your chosen category and follows a
                    week-by-week progression.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How are the weekly tasks evaluated?</AccordionTrigger>
                  <AccordionContent>
                    MCQs are automatically graded upon submission. Coding solutions are evaluated based on correctness,
                    efficiency, and code quality. Points are assigned accordingly, and you can track your progress on
                    your dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I access materials from other categories?</AccordionTrigger>
                  <AccordionContent>
                    While your primary content will be from your chosen category, you can access selected materials from
                    other categories as supplementary resources to broaden your preparation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>How can alumni contribute to the platform?</AccordionTrigger>
                  <AccordionContent>
                    Alumni can register and share their interview experiences, provide tips, and offer insights about
                    their career journey. This valuable information helps current students understand what to expect and
                    how to prepare effectively.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20">
          <div className="rounded-xl bg-gradient-to-r from-primary to-accent p-8 md:p-12 lg:p-16 text-primary-foreground text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Join Campus2Corporate today and take the first step toward your dream career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="glow-effect" asChild>
                <Link href="/userTypeSelector">
                  Sign Up Now <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground glow-effect"
                asChild
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

