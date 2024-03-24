import { NextRequest } from "next/server";

type FrameMetadataResponse = {
    buttons: string[];
    image: string;
    post_url: string;
};

/**
 * This function generates the metadata for a Farcaster Frame.
 * @param buttons: An array of button names.
 * @param image: The image to use for the frame.
 * @param post_url: The URL to post the frame to.
 * @returns The metadata for the frame.
 */
export const getFrameMetadata = function ({ buttons, image, post_url }: FrameMetadataResponse) {
    const metadata: Record<string, string> = {
        'fc:frame': 'vNext',
    };
    buttons.forEach((button, index) => {
        metadata[`fc:frame:button:${index + 1}`] = button;
    });
    metadata['fc:frame:image'] = image;
    metadata['fc:frame:post_url'] = post_url;
    return metadata;
};

const DOMAIN = 'https://woodwork-main.vercel.app'
export function buildFrameMetaHTML({
    title,
    image,
    postUrl,
    buttons,
}: {
    title: string;
    image: string;
    postUrl: string;
    buttons: string[];
}) {
    // Build buttons meta
    let buttonsMeta = "";
    buttons.forEach((button, index) => {
        buttonsMeta += `<meta name="fc:frame:button:${index + 1
            }" content="${button}">`;
    });

    return `<!DOCTYPE html>
          <html>
          <head>
              <title>${title}</title>
              <meta property="og:title" content="${title}">
              <meta property="og:image" content="${DOMAIN}/${image}">
              <meta name="fc:frame" content="vNext">
              <meta name="fc:frame:image" content="${DOMAIN}/${image}">
              <meta name="fc:frame:post_url" content="${DOMAIN}/${postUrl}">
              ${buttonsMeta}
          </head>
          <body>
              <p>${title}</p>
          </body>
          </html>`;
}


export async function getButtonIndex(req: NextRequest): Promise<number> {
    try {
        const body = await req.json();
        if (body) {
            // Button index is 1-indexed, but we want it to be 0-indexed
            const buttonIndex = body?.untrustedData.buttonIndex - 1;
            return buttonIndex;
        }

    } catch (err) {
        console.error(err);
    }

    return 0;
}