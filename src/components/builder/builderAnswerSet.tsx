import React from "react";
import { IAnswerOption } from "../../types";
import { LabelAndInput } from "../labelAndInput";

const BLANK_ANSWER: IAnswerOption = { label: "" };

interface AnswerSetProps {
  answerOptions: IAnswerOption[];
  onUpdate: (updatedAnswers: IAnswerOption[]) => void;
}

export function BuilderAnswerSet({
  answerOptions,
  onUpdate: _onUpdate,
}: AnswerSetProps) {
  function onCreate(e: React.MouseEvent) {
    e.preventDefault();
    _onUpdate([...answerOptions, BLANK_ANSWER]);
  }

  function onDeleteAnswer(e: React.MouseEvent, answerIndex: number) {
    e.preventDefault();
    const updatedAnswers = [...answerOptions];
    updatedAnswers.splice(answerIndex, 1);
    _onUpdate(updatedAnswers);
  }

  function onUpdate(answerIndex: number, properties: Partial<IAnswerOption>) {
    const updatedAnswers = [...answerOptions];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      ...properties,
    };
    _onUpdate(updatedAnswers);
  }

  return (
    <>
      {answerOptions.map((answer, answerIndex) => (
        <section key={answerIndex}>
          <LabelAndInput
            label="Answer"
            value={answer.label}
            onChange={(value) => onUpdate(answerIndex, { label: value })}
          />
          <button
            className="rounded-half p-[5px] bg-red-200 text-red-500 text-[12px]"
            onClick={(e) => onDeleteAnswer(e, answerIndex)}
          >
            Delete Answer
          </button>
        </section>
      ))}

      <button
        className="rounded-half p-[5px] bg-green-200 text-green-500 text-[12px]"
        onClick={onCreate}
      >
        Add Answer
      </button>
    </>
  );
}
