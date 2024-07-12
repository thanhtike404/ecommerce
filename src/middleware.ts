// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: ['/dashboard'],
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Config to specify the routes to apply the middleware to
export const config = {
  matcher: ['/dashboard', '/checkout', '/orders'],
};
