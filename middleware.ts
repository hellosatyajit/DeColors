import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  
  await updateSession(req);

  const { pathname } = req.nextUrl;


  const excludePaths = [
    "/favicon.ico",
    pathname.startsWith("/_next/static"),
    pathname.startsWith("/_next/image"),
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ];

  if (excludePaths.some(exclude => exclude)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/account/profile", req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",               
    "/login",          
    "/register",       
    "/account/profile" 
  ],
};
