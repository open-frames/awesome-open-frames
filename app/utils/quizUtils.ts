import { NextRequest } from "next/server";
import { QUIZ_CONFIG } from "../config/quizConfig";
import { getButtonIndex } from "./framesUtils";

/**
* @param req - the request object
* @param questionNumber - the CURRENT question number
* @returns the value of the previous question's answer
 */
export async function getPreviousAnswerValue(req: NextRequest, questionNumber: number): Promise<string> {
    try {
        const prevQuestionAnswerIndex = await getButtonIndex(req)
        const prevQuestion = QUIZ_CONFIG[questionNumber - 2]
        const prevQuestionAnswerValue = prevQuestion.options[prevQuestionAnswerIndex].value
        return prevQuestionAnswerValue;
    } catch (error) {
        console.error(error)
        return 'error'
    }
}