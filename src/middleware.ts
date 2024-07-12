// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // User is not authenticated
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Continue to the requested page or API route
  return NextResponse.next();
}
// Config to specify the routes to apply the middleware to
export const config = {
  matcher: ['/dashboard', '/checkout', '/orders'],
};
