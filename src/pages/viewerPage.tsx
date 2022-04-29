import React from "react";
import { ViewError } from "../components/error/error";
import { Navbar } from "../components/layout/navbar";
import { parseSearchQueryToQuiz } from "../utils/parsing";

export function ViewerPage() {
  try {
    const { quiz: parsedQuiz, fromBuilder } = parseSearchQueryToQuiz();

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
          {parsedQuiz.questions.map((question, i) => (
            <section className="p-[40px] rounded bg-gray-50 shadow mb-[20px]">
              <h3 className="mb-[10px] font-bold text-[20px]">
                {question.questionTitle}
              </h3>
              {question.answerOptions.map((answerOption) => (
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="mr-[10px]"
                    name={`${question.questionTitle}-${i}`}
                  />
                  {answerOption.label}
                </label>
              ))}
            </section>
          ))}
          <button className="bg-green-400 w-full p-[10px] rounded-half text-green-800 shadow shadow-green-600">
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
  } catch (e) {
    return <ViewError />;
  }
}
