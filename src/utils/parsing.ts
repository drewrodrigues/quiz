import { IQuiz, QuizSchema } from "../types";
import { schemaToQuiz } from "./mapping";

export function parseSearchQueryToQuiz(): IQuiz {
  const decodedSchema: QuizSchema = JSON.parse(
    decodeURI(window.location.search.slice(1))
  ) as QuizSchema;

  return schemaToQuiz(decodedSchema);
}
