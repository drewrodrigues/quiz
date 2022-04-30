import { IQuiz } from "../types";

export interface ResultsFromQuiz {
  correct: number;
  incorrect: number;
  percentage: string;
}

export function resultsFromQuiz(
  quiz: IQuiz,
  answers: number[]
): ResultsFromQuiz {
  _checkForCompletionOrThrow(quiz, answers);
  const results = { correct: 0, incorrect: 0, percentage: "" };

  answers.forEach((answer, questionIndex) => {
    const isCorrect = quiz.questions[questionIndex].answerIndex === answer;

    if (isCorrect) {
      results.correct++;
    } else {
      results.incorrect++;
    }
  });

  return {
    ...results,
    percentage: `${Math.floor((results.correct / answers.length) * 100)}%`,
  };
}

function _checkForCompletionOrThrow(quiz: IQuiz, answers: number[]) {
  const notAllQuestionsAnswered = answers.length !== quiz.questions.length;
  if (notAllQuestionsAnswered) {
    throw new Error("Not all questions answered");
  }
}
