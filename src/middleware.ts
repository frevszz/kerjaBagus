import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Status login dummy (Ubah jadi 'true' kalau mau tes masuk profile tanpa login)
  const isAuthorized = true; 

  // 2. Jika coba buka /profile padahal BELUM login
  if (!isAuthorized && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};