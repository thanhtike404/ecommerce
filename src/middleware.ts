import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Check if a session exists
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the signin route
  const signInPath = '/auth/signin';

  // If a session exists and the user is trying to access the signin page, redirect them
  if (session && req.nextUrl.pathname === signInPath) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to home page or any other page
  }

  // Otherwise, continue to the requested page
  return NextResponse.next();
}

// Apply the middleware to the /auth/signin route
export const config = {
  matcher: ['/auth/signin'],
};
