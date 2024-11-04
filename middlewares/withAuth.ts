import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

// const authPage = ['/login', '/register']

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;

        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: "EWd20O7BLuV90JqoeDRqHFxB7mOzQxk/FNZqxk5riRY="
            });
            if (!token) {
                const url = new URL('/', req.url);
                url.searchParams.set('callbackUrl', encodeURI(req.url));
                return NextResponse.redirect(url);
            }
            if(token) {
                if (pathname == '/') {
                    return NextResponse.redirect(new URL('/dashboard', req.url));
                }
            }
        }
        return middleware(req, next);
    }
}