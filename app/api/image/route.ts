import { NextRequest } from 'next/server';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// This is a simplistic approach for demonstration purposes.
// In production, consider using cloud storage and handling filename conflicts.
async function generateAndSavePNG(svgContent: string): Promise<string> {
  const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
  const fileName = `satori-${Date.now()}.png`;
  const filePath = path.join(process.cwd(), 'public', fileName);
  fs.writeFileSync(filePath, pngBuffer);
  return `/public/${fileName}`;
}

export async function GET(req: NextRequest) {
  const svgContent = `<svg width="75" height="65" viewBox="0 0 75 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.59.25l36.95 64H.64l36.95-64z" fill="#000"/></svg>`;
  const imageUrl = await generateAndSavePNG(svgContent);

  // Construct the frame with the image URL
  const frame = {
    type: 'image',
    url: `${req.nextUrl.origin}${imageUrl}`,
    alt: 'Satori Image',
  };

  // Here, you would typically send the frame over XMTP or another protocol.
  // For demonstration, we'll just return the frame as JSON.
  return new Response(JSON.stringify(frame), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
