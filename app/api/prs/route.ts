import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import satori from 'satori';

async function generateAndSavePNG(svgContent: string): Promise<string> {
  const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
  const fileName = `satori-${Date.now()}.png`;
  const filePath = path.join(process.cwd(), 'public', fileName);
  fs.writeFileSync(filePath, pngBuffer);
  return `${fileName}`;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // HTML content as a string
  const htmlContent = `
  <div>Hello, World</div>
`;

  const inter = fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'));

  const svgContent = await satori('<div style="color: red;">hello, world</div>', {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'Inter',
        data: inter,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  console.log(svgContent);
  const imageUrl = await generateAndSavePNG(svgContent);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `We love BOAT`,
        },
      ],
      image: `${NEXT_PUBLIC_URL}/${imageUrl}`,
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
