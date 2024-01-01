import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = JSON.stringify(request.nextUrl.pathname);
  console.warn(path);

  const token = request.cookies.get('accessToken') || '';

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};
