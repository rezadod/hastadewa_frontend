import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = [], 
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        const token = await getToken({
            req,
            secret: "EWd20O7BLuV90JqoeDRqHFxB7mOzQxk/FNZqxk5riRY=" // ganti dengan secret Anda sendiri
        });

        // jika sudah login langsung ke dashboard
        if (pathname === '/' && token) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        // mengembalikan ke halaman awal jika belum login
        if (requireAuth.includes(pathname) && !token) {
            const url = new URL('/', req.url);
            url.searchParams.set('callbackUrl', encodeURI(req.url)); 
            return NextResponse.redirect(url);
        }
        return middleware(req, next);
    }
}
