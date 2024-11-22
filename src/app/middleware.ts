import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes that don't require authentication
const publicRoutes = ['/admin/login', '/admin/register'];

export const config = {
    matcher: [
        '/admin/:path*'  // Matches all paths starting with /admin
    ]
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // Allow access to public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Redirect /admin to /admin/dashboard
    if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // Protect other admin routes
    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
}