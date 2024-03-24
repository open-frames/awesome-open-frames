import { QUIZ_CONFIG } from "@/app/config/quizConfig";
import { buildFrameMetaHTML, getButtonIndex } from "@/app/utils/framesUtils";
import { getPreviousAnswerValue } from "@/app/utils/quizUtils";
import { NextResponse, NextRequest } from "next/server";

// show quiz question in image
// show 4 choices
// rediect to following question or result page

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const questionNumber = Number(req.nextUrl.searchParams.get('n'));
    const { title, options } = QUIZ_CONFIG[questionNumber - 1];
    const buttons = options.map(option => option.buttonText);

    // create next url depending on whether there's another question
    let postUrl = 'api/result?'
    if (questionNumber < QUIZ_CONFIG.length) {
        postUrl = `api/question?n=${Number(questionNumber) + 1}&`
    }

    if (questionNumber > 1) {
        const previousPoints = req.nextUrl.searchParams.get('p') ?? ''; // stored as comma separated string
        const prevQuestionAnswerValue = await getPreviousAnswerValue(req, questionNumber)
        postUrl += `p=${previousPoints}${prevQuestionAnswerValue},`
    }

    return new NextResponse(
        buildFrameMetaHTML({
            title,
            image: `api/image?text=${title}`,
            buttons,
            postUrl
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';