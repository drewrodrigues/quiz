import React, { useState } from "react";
import { Error } from "../components/error/error";
import { Navbar } from "../components/layout/navbar";
import { ViewerQuestions } from "../components/viewer/viewerQuestions";
import { IQuiz } from "../types";
import { parseSearchQueryToQuiz } from "../utils/parsing";
import { ResultsFromQuiz, resultsFromQuiz } from "../utils/resultsFromQuiz";

export function ViewerPage() {
  const [initialized] = useState(():
    | {
        error: string;
        fromBuilder: undefined;
        parsedQuiz: undefined;
      }
    | { error: undefined; parsedQuiz: IQuiz; fromBuilder: boolean } => {
    try {
      const { quiz: parsedQuiz, fromBuilder } = parseSearchQueryToQuiz();

      return {
        error: undefined,
        parsedQuiz,
        fromBuilder,
      };
    } catch (e) {
      console.error("Failed to load quiz");
      return {
        error: "Failed to load quiz",
        parsedQuiz: undefined,
        fromBuilder: undefined,
      };
    }
  });

  const [quizResults, setQuizResults] = useState<ResultsFromQuiz>();
  const [answers, setAnswers] = useState<number[]>([]);

  function onFinishClick() {
    setQuizResults(resultsFromQuiz(initialized.parsedQuiz!, answers));
  }

  if (initialized.error === undefined) {
    const { fromBuilder, parsedQuiz } = initialized;

    return (
      <>
        {fromBuilder && (
          <Navbar
            subtitle="Previewing Quiz"
            rightButton={{ label: "Back to Builder", href: "/builder" }}
          />
        )}

        <main className="max-w-screen-sm m-auto mt-[40px]">
          <header className="mb-[20px]">
            <h2 className="text-[42px] font-bold">{parsedQuiz.title}</h2>
            <h3 className="text-[20px]">{parsedQuiz.subtitle}</h3>
          </header>

          <ViewerQuestions quiz={parsedQuiz} answers={[]} />

          <button
            className="bg-green-400 w-full p-[10px] rounded-half text-green-800 shadow shadow-green-600"
            onClick={onFinishClick}
          >
            Finish
          </button>
          <footer>
            <p className="text-center mt-[20px]">
              Made using{" "}
              <a href="/" className="underline">
                Quizer
              </a>
            </p>
          </footer>
        </main>
      </>
    );
  } else {
    return <Error />;
  }
}
