import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Your secret here
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const session = await getToken({ req, secret });

  // Log the session to the console
  console.log(session, 'session');

  const url = req.nextUrl.clone();

  // If there is no session, redirect to the login page
  if (!session) {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }
  console.log('session user', session);
  // If the user is an admin and not already on the dashboard page, redirect to the dashboard
  if (session.role === 'ADMIN' && req.nextUrl.pathname !== '/dashboard') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // If the user is not an admin, let them access other protected routes
  if (session.role !== 'ADMIN' && req.nextUrl.pathname === '/dashboard') {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  // If there is a session and the user is not trying to access the dashboard, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/checkout', '/orders'],
};
