import React from "react";
import { IQuiz } from "../../types";
import { encodeQuizToSearchQuery } from "../../utils";

interface UrlBuilderProps {
  quiz: IQuiz;
}

export function UrlViewer({ quiz }: UrlBuilderProps) {
  const searchQuery = encodeQuizToSearchQuery(quiz);
  const fullLinkUrl = `http://localhost:3000?${searchQuery}`;

  return (
    <section>
      <a href={fullLinkUrl}>{fullLinkUrl}</a>

      <p>URL length: {fullLinkUrl.length}</p>
    </section>
  );
}
