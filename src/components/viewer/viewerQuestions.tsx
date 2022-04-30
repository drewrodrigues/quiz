import React from "react";
import { IQuiz } from "../../types";
import { ViewerAnswer } from "./viewerAnswer";

type Props = {
  quiz: IQuiz;

  onClickAnswer?: (questionIndex: number, answerIndex: number) => void;
  answers?: number[];
};

export function ViewerQuestions({
  answers,
  onClickAnswer,
  quiz,
}: Props): React.ReactElement {
  if (answers && answers.length !== quiz.questions.length) {
    throw new Error("Not all questions answered");
  }

  return (
    <div>
      {quiz.questions.map((question, questionIndex) => {
        return (
          <section className="p-[40px] rounded bg-gray-50 shadow mb-[20px]">
            <h3 className="mb-[10px] font-bold text-[20px]">
              {question.questionTitle}
            </h3>

            {question.answerOptions.map((answerOption, answerIndex) => {
              const answerStatus = statusFromAnswerOption(
                answerIndex,
                question.answerIndex,
                answers?.[questionIndex]
              );

              return (
                <ViewerAnswer
                  label={answerOption.label}
                  groupName={question.questionTitle}
                  answerStatus={answerStatus}
                  onClick={() => onClickAnswer?.(questionIndex, answerIndex)}
                />
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

export type IAnswerStatus =
  | "unanswered"
  | "answered"
  | "incorrect"
  | "correct"
  | "actual";

function statusFromAnswerOption(
  answerIndex: number,
  actualAnswerIndex: number,
  guessedAnswerIndex?: number
): IAnswerStatus {
  const isGuessedAnswer = guessedAnswerIndex === answerIndex;
  const isActualAnswer = actualAnswerIndex === answerIndex;

  if (guessedAnswerIndex === undefined) return "unanswered";
  if (isActualAnswer && isGuessedAnswer) return "correct";
  if (isActualAnswer) return "actual";
  if (isGuessedAnswer) return "incorrect";
  return "answered";
}
