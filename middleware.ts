import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/register" ||
    request.nextUrl.pathname === "/userTypeSelector" // ✅ Allow access

  // If trying to access a protected route without being logged in
  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If trying to access login/register pages while logged in
  // if (authToken && isAuthPage) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url))
  // }

  return NextResponse.next()
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

