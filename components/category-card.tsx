"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CategoryCardProps {
  title: string
  description: string
  icon: string
}

export function CategoryCard({ title, description, icon }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2 flex flex-row items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <Image src={icon || "/placeholder.svg"} alt={title} fill className="rounded-lg  object-contain " />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full justify-between" asChild>
            <Link href="/userTypeSelector">
              Learn More <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

