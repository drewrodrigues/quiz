import { IQuiz, QuizSchema } from "./types";

export function parseSearchQueryToQuiz(): IQuiz {
  const decodedSchema: QuizSchema = JSON.parse(
    decodeURIComponent(window.location.search.slice(1))
  ) as QuizSchema;

  return schemaToQuiz(decodedSchema);
}

export function schemaToQuiz(quizSchema: QuizSchema): IQuiz {
  return {
    title: quizSchema[0] as string,
    questions: quizSchema.slice(1).map((question) => ({
      question: question[0],
      answerIndex: 0,
      answerOptions: (question.slice(1) as string[]).map((question) => ({
        label: question,
      })),
    })),
  };
}

export function quizToSchema(quiz: IQuiz): QuizSchema {
  return [
    quiz.title,
    quiz.subtitle,
    ...quiz.questions.map((question) => [
      question.question,
      ...question.answerOptions.map((option) => option.label),
    ]),
  ];
}

export function encodeQuizToSearchQuery(quiz: IQuiz) {}

export function encodeQuizToEncodedSchema(quiz: IQuiz) {}
