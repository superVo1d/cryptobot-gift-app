import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "./app/api/auth/session";
import { cookies, headers } from "next/headers";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("session")?.value;

  if (cookie) {
    const session = await decrypt(cookie);

    if (session && session.userId) {
      (await headers()).set("x-telegram-user", session.userId);
      session.userId;
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
