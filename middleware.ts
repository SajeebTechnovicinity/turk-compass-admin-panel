import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';
import * as jose from 'jose';

// Middleware function
export async function middleware(request: NextRequest) {
    const authToken = await request.cookies.get('authToken');

    console.log("Middleware: authToken =", authToken);

    if (authToken === undefined || authToken === null) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
        //return NextResponse.json({ error: 'Bearer Token Not Defined',authToken:authToken }, { status: 401 });
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/appInfo',
        '/banner/create',
        '/business-subcategory/create',
        '/business-subcategory/edit',
        '/business-subcategory/list',
        '/business-category/create',
        '/business-category/edit',
        '/business-category/list',
        '/business-post/list',
        '/business-post/create',
        '/business-post/edit',
        '/business-post/details',
        '/consulate',
        '/dashboard',
        '/industry/create',
        '/industry/edit',
        '/industry/list',
        '/job/job-list',
        '/location/city/create',
        '/location/city/edit',
        '/location/city/list',
        '/location/state/create',
        '/location/state/edit',
        '/location/state/list',
        '/member-of-parliament/create',
        '/member-of-parliament/edit',
        '/member-of-parliament/list',
        '/member-of-parliament/details',
        '/petition/create',
        '/petition/edit',
        '/petition/list',
        '/reservation/list',
        '/tag/create',
        '/tag/edit',
        '/tag/list',
        '/user',
        '/user/user-list',
        '/user/user-list/details',
        '/'
    ]
};
