// proxy.js  (Next.js 16 — renamed from middleware.js)
// Protects /admin/dashboard - redirects to /admin login if not authenticated

import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/dashboard and sub-routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token structure (basic check — full verify happens in server component)
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token");
      }
      // Decode payload to check expiry
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }
    } catch {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("expired", "1");
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
