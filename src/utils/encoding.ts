import { IQuiz } from "../types";
import { quizToSchema } from "./mapping";

function scheme() {
  return window.location.hostname === "localhost" ? "http://" : "https://";
}

function encodeQuizToSearchQuery(quiz: IQuiz) {
  return encodeURI(JSON.stringify(quizToSchema(quiz)));
}

export function quizToViewerUrl(quiz: IQuiz) {
  const searchQuery = encodeQuizToSearchQuery(quiz);
  const fullLinkUrl = `${scheme()}${
    window.location.host
  }/viewer?quiz=${searchQuery}`;
  return fullLinkUrl;
}
