// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { GraduationCap, Menu, X } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
// import { ThemeToggle } from "@/components/theme-toggle"

// export function NavBar() {
//   const [isScrolled, setIsScrolled] = useState(false)

//   if (typeof window !== "undefined") {
//     window.addEventListener("scroll", () => {
//       setIsScrolled(window.scrollY > 10)
//     })
//   }

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
//     >
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <GraduationCap className="h-6 w-6 text-primary" />
//           <span className="font-bold text-xl">Campus2Corporate</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-6">
//           <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
//             Features
//           </Link>
//           <Link href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
//             Categories
//           </Link>
//           <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
//             How It Works
//           </Link>
//           <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
//             Alumni Stories
//           </Link>
//           <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
//             FAQ
//           </Link>
//           <ThemeToggle />
//         </nav>

//         <div className="hidden md:flex items-center gap-4">
//           <Button variant="outline" asChild>
//             <Link href="/login">Log In</Link>
//           </Button>
//           <Button asChild>
//             <Link href="/register">Sign Up</Link>
//           </Button>
//         </div>

//         <Sheet>
//           <SheetTrigger asChild className="md:hidden">
//             <Button variant="ghost" size="icon">
//               <Menu className="h-6 w-6" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between border-b pb-4">
//                 <Link href="/" className="flex items-center gap-2">
//                   <GraduationCap className="h-6 w-6 text-primary" />
//                   <span className="font-bold text-xl">Campus2Corporate</span>
//                 </Link>
//                 <SheetClose asChild>
//                   <Button variant="ghost" size="icon">
//                     <X className="h-6 w-6" />
//                     <span className="sr-only">Close menu</span>
//                   </Button>
//                 </SheetClose>
//               </div>

//               <nav className="flex flex-col gap-4 py-6">
//                 <SheetClose asChild>
//                   <Link href="#features" className="text-base font-medium hover:text-primary transition-colors">
//                     Features
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link href="#categories" className="text-base font-medium hover:text-primary transition-colors">
//                     Categories
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link href="#how-it-works" className="text-base font-medium hover:text-primary transition-colors">
//                     How It Works
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link href="#testimonials" className="text-base font-medium hover:text-primary transition-colors">
//                     Alumni Stories
//                   </Link>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Link href="#faq" className="text-base font-medium hover:text-primary transition-colors">
//                     FAQ
//                   </Link>
//                 </SheetClose>
//               </nav>

//               <div className="mt-auto border-t pt-6 flex flex-col gap-4">
//                 <div className="flex justify-center">
//                   <ThemeToggle />
//                 </div>
//                 <SheetClose asChild>
//                   <Button variant="outline" className="w-full" asChild>
//                     <Link href="/login">Log In</Link>
//                   </Button>
//                 </SheetClose>
//                 <SheetClose asChild>
//                   <Button className="w-full" asChild>
//                     <Link href="/register">Sign Up</Link>
//                   </Button>
//                 </SheetClose>
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Campus2Corporate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Alumni Stories
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
            FAQ
          </Link>
          <ThemeToggle />
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {pathname !== "/login" && (
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          )}
          {pathname !== "/userTypeSelector" && (
            <Button asChild>
              <Link href="/userTypeSelector">Sign Up</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <Link href="/" className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">Campus2Corporate</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-4 py-6">
                <SheetClose asChild>
                  <Link href="#features" className="text-base font-medium hover:text-primary transition-colors">
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#categories" className="text-base font-medium hover:text-primary transition-colors">
                    Categories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#how-it-works" className="text-base font-medium hover:text-primary transition-colors">
                    How It Works
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#testimonials" className="text-base font-medium hover:text-primary transition-colors">
                    Alumni Stories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#faq" className="text-base font-medium hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </SheetClose>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-auto border-t pt-6 flex flex-col gap-4">
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                {pathname !== "/login" && (
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Log In</Link>
                    </Button>
                  </SheetClose>
                )}
                {pathname !== "/userTypeSelector" && (
                  <SheetClose asChild>
                    <Button className="w-full" asChild>
                      <Link href="/userTypeSelector">Sign Up</Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
