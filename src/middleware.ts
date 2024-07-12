import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Your secret here
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const session = await getToken({ req, secret });

  // Log the session to the console
  console.log(session, 'session');

  // If there is no session, redirect to the login page
  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // If there is a session, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/checkout', '/orders'],
};
