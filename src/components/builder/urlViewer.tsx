import React from "react";
import { IQuiz } from "../../types";
import { quizToViewerUrl } from "../../utils/encoding";

interface UrlBuilderProps {
  quiz: IQuiz;
}

export function UrlViewer({ quiz }: UrlBuilderProps) {
  const viewerUrl = quizToViewerUrl(quiz);

  function onCopy() {
    navigator.clipboard.writeText(viewerUrl);
  }

  return (
    <section className="mb-[20px]">
      <p className="mb-[10px]">URL length: {viewerUrl.length} / 2000</p>

      <div className="shadow py-[5px] px-[10px] rounded bg-green-100 text-green-600 w-full flex items-center">
        <a
          href={viewerUrl}
          target="_blank"
          className="whitespace-nowrap text-ellipsis overflow-hidden"
          rel="noreferrer"
        >
          {viewerUrl}
        </a>
        <button
          className="flex-shrink-0 bg-green-300 text-white px-[10px] rounded-half ml-[5px]"
          onClick={onCopy}
        >
          Copy
        </button>
      </div>
    </section>
  );
}
