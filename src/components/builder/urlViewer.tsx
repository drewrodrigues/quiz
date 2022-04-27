import React from "react";
import { IQuiz } from "../../types";
import { quizToViewerUrl } from "../../utils/encoding";

interface UrlBuilderProps {
  quiz: IQuiz;
}

export function UrlViewer({ quiz }: UrlBuilderProps) {
  const viewerUrl = quizToViewerUrl(quiz);

  return (
    <section>
      <a href={viewerUrl}>{viewerUrl}</a>

      <p>URL length: {viewerUrl.length}</p>
    </section>
  );
}
