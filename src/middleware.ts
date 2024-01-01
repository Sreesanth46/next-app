import { NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken } from '@/helpers/jwt';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isApi = path.includes('/api/');

  if (isApi) {
    const accessToken = request.cookies.get('accessToken')?.value || '';
    try {
      const tokenData = verifyAccessToken(accessToken);
      request.user = tokenData;
      NextResponse.next();
    } catch (error: any) {
      try {
        const refreshToken = request.cookies.get('refreshToken')?.value || '';
        if (error.cause === 401) {
          const { accessToken, user } = verifyRefreshToken(refreshToken);
          const response = NextResponse.next();
          request.user = user;
          response.cookies.set('accessToken', accessToken);
          return response;
        }
      } catch (err) {
        NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  if (request.cookies.has('accessToken')) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/']
};
