import { NextResponse } from 'next/server';

const signnedInPages = ['/', '/playlist', '/library'];

const middleware = (req) => {
    if (signnedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.TRAX_ACCESS_TOKEN;
        if (!token) {
            return NextResponse.redirect('/signin');
        }
    }
};

export default middleware;
