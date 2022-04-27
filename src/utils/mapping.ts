// we don't directly encode the quiz from JSON into a URI.
// instead we use a 'schema' so there are less characters
// in the full url. The 'schema' is positional, so we
// don't need to have keys (thus saving characters).

import { QuizSchema, IQuiz } from "../types";

export function schemaToQuiz(quizSchema: QuizSchema): IQuiz {
  return {
    title: quizSchema[0] as string,
    subtitle: quizSchema[1] as string,
    questions: quizSchema.slice(2).map((question) => ({
      questionTitle: question[0],
      answerIndex: 0,
      answerOptions: (question.slice(1) as string[]).map((question) => ({
        label: question,
      })),
    })),
  };
}

export function quizToSchema(quiz: IQuiz): QuizSchema {
  const questionsAndAnswers = quiz.questions.map((question) => [
    question.questionTitle,
    ...question.answerOptions.map((option) => option.label),
  ]);

  return [quiz.title, quiz.subtitle || "", ...questionsAndAnswers];
}
