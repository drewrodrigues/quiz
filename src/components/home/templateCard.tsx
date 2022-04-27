import React from "react";
import { IQuiz } from "../../types";
import { quizToViewerUrl } from "../../utils/encoding";

type Props = { quiz: IQuiz };

export function TemplateCard({ quiz }: Props) {
  const url = quizToViewerUrl(quiz);

  return (
    <a
      className="w-[300px] shadow m-[10px] border rounded-half p-[10px] flex-shrink-0"
      href={url}
    >
      {quiz.title}
    </a>
  );
}
