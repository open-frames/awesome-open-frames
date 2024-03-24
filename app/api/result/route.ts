import { QUIZ_CONFIG } from "@/app/config/quizConfig";
import { buildFrameMetaHTML } from "@/app/utils/framesUtils";
import { getPreviousAnswerValue } from "@/app/utils/quizUtils";
import { NextResponse, NextRequest } from "next/server";

const RESULT_CONFIG = [
    { min: 3, max: 4, title: 'Congratulations!  Claim your Optimism NFT', image: 'optimism.jpg' },
    { min: 5, max: 6, title: 'Congratulations!  Claim your Arbitrum NFT', image: 'arbitrum.jpg' },
    { min: 7, max: 9, title: 'Congratulations!  Claim your Base NFT', image: 'base.png' },
    { min: 10, max: 12, title: 'Congratulations!  Claim your Polygon NFT', image: 'polygon.jpg' },
]
const ACTIONS = ["Mint NFT"]

// add up score
// show result
// allow user to share

async function getResponse(req: NextRequest): Promise<NextResponse> {
    let totalPoints: number = 1;
    try {
        // add up the points from the final question and previous questions
        const previousAnswerValue = await getPreviousAnswerValue(req, QUIZ_CONFIG.length)
        const pointsData = req.nextUrl.searchParams.get('p');
        const points = pointsData ? pointsData.split(',').map(Number) : [];
        totalPoints = points.reduce((a: number, b: number) => a + b, 0) + Number(previousAnswerValue);

        // then find the result
        const result = RESULT_CONFIG.find(({ min, max }) => totalPoints >= min && totalPoints <= max);
        const { title, image } = result ?? RESULT_CONFIG[2];

        return new NextResponse(
            buildFrameMetaHTML({
                title,
                image,
                buttons: ACTIONS,
                postUrl: 'api/begin'
            })
        );

    } catch (e) {
        console.error(e)
        return new NextResponse(
            buildFrameMetaHTML({
                title: 'Error',
                image: `api/image?text=${JSON.stringify(e)}`,
                buttons: ACTIONS,
                postUrl: 'api/begin'
            })
        );
    }


}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';