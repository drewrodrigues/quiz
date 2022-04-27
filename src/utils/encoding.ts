import { IQuiz } from "../types";
import { quizToSchema } from "./mapping";

function encodeQuizToSearchQuery(quiz: IQuiz) {
  return encodeURI(JSON.stringify(quizToSchema(quiz)));
}

export function quizToViewerUrl(quiz: IQuiz) {
  const searchQuery = encodeQuizToSearchQuery(quiz);
  const fullLinkUrl = `http://localhost:3000/viewer?${searchQuery}`;
  return fullLinkUrl;
}
