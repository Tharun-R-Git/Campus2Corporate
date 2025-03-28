"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  image: string
  quote: string
}

export function TestimonialCard({ name, role, image, quote }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2 flex flex-row items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Quote className="h-6 w-6 text-muted-foreground/40 absolute -top-2 -left-2" />
            <p className="text-muted-foreground pl-4">{quote}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

