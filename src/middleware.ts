import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/', '/conversation/:id'];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;
    if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/'],
};
