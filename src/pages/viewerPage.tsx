import React from "react";
import { parseSearchQueryToQuiz } from "../utils/parsing";

export function ViewerPage() {
  try {
    const parsedQuiz = parseSearchQueryToQuiz();

    return (
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
    );
  } catch (e) {
    return (
      <main className="flex justify-center items-center flex-col h-[100vh]">
        <h1 className="mb-[20px] font-bold">Quizer</h1>

        <div className="flex flex-col rounded p-[50px] shadow border">
          <h2 className="text-[32px] font-bold mb-[40px]">
            Failed to show page
          </h2>

          <div className="flex justify-center">
            <a
              href="/"
              className="px-[20px] py-[13px] bg-gray-100 text-gray-500 rounded text-[14px] mr-[5px]"
            >
              Go Home
            </a>
            <a
              href="/builder"
              className="px-[20px] py-[13px] bg-blue-400 text-white rounded"
            >
              Build a Quiz
            </a>
          </div>
        </div>
      </main>
    );
  }
}
