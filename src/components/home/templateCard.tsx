import React from "react";
import { IQuiz } from "../../types";
import { quizToViewerUrl } from "../../utils/encoding";

type Props = { quiz: IQuiz };

export function TemplateCard({ quiz }: Props) {
  const url = quizToViewerUrl(quiz);

  return (
    <a
      className="w-[300px] h-[150px] shadow m-[10px] border rounded-half p-[10px] flex flex-shrink-0 justify-center items-center"
      href={url}
    >
      <p>{quiz.title}</p>
    </a>
  );
}
