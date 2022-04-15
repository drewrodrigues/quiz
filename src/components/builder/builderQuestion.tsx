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
    <section className="p-[40px] relative">
      <button
        className="rounded-half p-[5px] border text-[10px] mb-[20px] absolute right-[10px] top-[10px] text-gray-400"
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
