"use client";

import type React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Book, User, ListIcon, TrendingUp, CheckSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import CategorySelection from "@/components/CategorySelection";
 import { logoutUser } from "@/lib/auth"; // Import logout function

// // Dynamically import LearningContent
// const LearningContent = dynamic(() => import("@/app/learning-content/page"), { ssr: false });

const menuItems = [
  { icon: User, label: "Student Profile", content: "View and edit your personal information and academic details." },
  { icon: ListIcon, label: "Category Selection", content: "Choose or change your academic focus and specializations." },
  { icon: Book, label: "Learning Content", content: "Access your learning materials and courses here." },
  { icon: CheckSquare, label: "Weekly Tasks", content: "View and manage your weekly tasks and assignments." },
  { icon: TrendingUp, label: "Progress & Performance", content: "Track your academic progress and view performance metrics." },
  { icon: User, label: "Alumni Experience", content: "Explore experiences and testimonials from alumni." },
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(menuItems[0].label);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="w-64">
          <SidebarHeader className="p-4">
            <h2 className="text-xl font-bold">Student Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    onClick={() => setSelectedItem(item.label)}
                    isActive={selectedItem === item.label}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <form action={logoutUser}>
              <Button type="submit" variant="outline" className="w-full">
                Sign Out
              </Button>
            </form>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content - Now full width */}
        <SidebarInset className="flex-grow bg-gray-100">
          <header className="bg-white shadow-sm w-full">
            <div className="flex items-center justify-between px-4 py-3">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">{selectedItem}</h1>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content - Ensure full width
          <main className="p-6 w-full h-full flex-grow">
            {selectedItem === "Category Selection" ? (
              <CategorySelection />
            ) : selectedItem === "Weekly Tasks" ? (
              <LearningContent />
            ) : (
              <Card className="h-full flex flex-col w-full">
                <CardHeader>
                  <CardTitle>{selectedItem}</CardTitle>
                  <CardDescription>{menuItems.find((item) => item.label === selectedItem)?.content}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow w-full">
                  <p>Detailed information and interactive elements for {selectedItem} will be displayed here.</p>
                </CardContent>
              </Card>
            )}
          </main> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
