import { IQuiz, QuizSchema } from "../types";
import { schemaToQuiz } from "./mapping";

export function parseSearchQueryToQuiz(): {
  quiz: IQuiz;
  fromBuilder: boolean;
} {
  const params = new URLSearchParams(window.location.search);
  // ! strong type these
  const quiz = params.get("quiz")!;
  const fromBuilder = params.get("fromBuilder")!;

  const decodedSchema: QuizSchema = JSON.parse(quiz) as QuizSchema;

  return { quiz: schemaToQuiz(decodedSchema), fromBuilder: !!fromBuilder };
}
