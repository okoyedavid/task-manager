import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // try {
  //   const { payload } = await jwtVerify(token, secret);
  //   const headers = new Headers(req.headers);
  //   headers.set("x-user-email", payload.user_id);
  //   return NextResponse.next({ request: { headers } });
  // } catch (err) {
  //   console.error(err);
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
}

// ✅ matcher must be exported like this
export const config = {
  matcher: ["/", "/movies/:path*", "/expenses/:path*", "/shopping/:path*"],
};
