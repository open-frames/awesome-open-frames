import { NextResponse } from "next/server";

const PROMPT = 'Begin quiz'
const COVER_IMAGE = 'https://woodwork-main.vercel.app/titleImage.png'

// show quiz title image
// show begin button
// rediect to api/question/1

async function getResponse(): Promise<NextResponse> {
    return new NextResponse(
        `<!DOCTYPE html>
            <html>
            <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="${COVER_IMAGE}" />
                <meta property="fc:frame:button:1" content="${PROMPT}" />
                <meta property="fc:frame:post_url" content="https://woodwork-main.vercel.app/api/question?n=1" />
            </head>
            </html>
            `
    );
}

export async function POST(): Promise<Response> {
    return getResponse();
}

export const dynamic = 'force-dynamic';