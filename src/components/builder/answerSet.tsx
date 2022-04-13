import React from "react";
import { IAnswerOption } from "../../types";
import { LabelAndInput } from "../labelAndInput";

interface AnswerSetProps {
  answers: IAnswerOption[];
  onUpdate: (newValue: string) => void;
  onDeleteAnswer: (answerIndex: number) => void;
}

export function AnswerSet({
  answers,
  onUpdate,
  onDeleteAnswer: _onDeleteAnswer,
}: AnswerSetProps) {
  function onDeleteAnswer(e: React.MouseEvent, answerIndex: number) {
    e.preventDefault();
    _onDeleteAnswer(answerIndex);
  }

  return (
    <>
      {answers.map((answer, answerIndex) => (
        <>
          <LabelAndInput
            label="Answer"
            value={answer.label}
            onChange={onUpdate}
          />
          <button
            className="rounded-half p-[5px] bg-red-200 text-red-500 text-[12px]"
            onClick={(e) => onDeleteAnswer(e, answerIndex)}
          >
            Delete Question
          </button>
        </>
      ))}
    </>
  );
}
