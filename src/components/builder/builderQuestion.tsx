import React from "react";
import { IQuestion } from "../../types";
import { LabelAndInput } from "../labelAndInput";

interface BuilderQuestionProps {
  question: IQuestion;
  onUpdate: (updatedQuestion: IQuestion) => void;
  onDelete: () => void;
  children: React.ReactNode;
}

function BuilderQuestion({
  question,
  onUpdate,
  onDelete,
  children,
}: BuilderQuestionProps) {
  return (
    <section className="px-[40px]">
      <button
        className="rounded-half p-[5px] bg-red-200 text-red-500 text-[12px] mb-[20px]"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        Delete Question
      </button>

      <LabelAndInput
        label="Question"
        value={question.question}
        onChange={(value) => onUpdate({ ...question, question: value })}
      />

      <LabelAndInput
        label="Subtitle"
        value={question.subtitle}
        onChange={(value) => onUpdate({ ...question, subtitle: value })}
      />

      {children}
    </section>
  );
}

export { BuilderQuestion };
