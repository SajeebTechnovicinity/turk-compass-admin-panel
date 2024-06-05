import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';
import * as jose from 'jose';

// Middleware function
export async function middleware(request: NextRequest) {
    const authToken = getCookie('authToken');

    console.log("Middleware: authToken =", authToken);

    if (!authToken) {
        return NextResponse.json({ error: 'Bearer Token Not Defined',authToken:authToken }, { status: 401 });
    }

    const key = 'productDB'; // Your secret key
    const srcky = new TextEncoder().encode(key);

    try {
        const { payload } = await jose.jwtVerify(authToken, srcky);
        request.user = payload; // Attach user info to request object
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ error: 'Invalid or Expired Token',authToken:authToken }, { status: 401 });
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/user/user-list'
    ]
};
