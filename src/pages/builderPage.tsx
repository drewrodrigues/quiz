import React, { useState } from "react";
import { BuilderAnswerSet } from "../components/builder/builderAnswerSet";
import { BuilderQuestion } from "../components/builder/builderQuestion";
import { SchemaViewer } from "../components/builder/schemaViewer";
import { LabelAndInput } from "../components/labelAndInput";
import { IAnswerOption, IQuestion, IQuiz } from "../types";

const BLANK_QUESTION: IQuestion = {
  question: "",
  answerIndex: -1,
  answerOptions: [],
};
const BLANK_QUIZ: IQuiz = { title: "", subtitle: "", questions: [] };

export function QuizBuilder() {
  const [quiz, setQuiz] = useState<IQuiz>(BLANK_QUIZ);

  function onNewQuestionClick(e: React.MouseEvent) {
    e.preventDefault();
    setQuiz((q) => ({ ...quiz, questions: [...q.questions, BLANK_QUESTION] }));
  }

  function onUpdateQuestion(questionIndex: number, updatedQuestion: IQuestion) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function onDeleteQuestionClick(index: number) {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: newQuestions });
  }

  function onUpdateAnswers(
    questionIndex: number,
    updatedAnswers: IAnswerOption[]
  ) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].answerOptions = updatedAnswers;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  return (
    <>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="font-bold text-[32px]">Builder</h1>
        <button className="border cursor-pointer p-[5px] rounded-half">
          View
        </button>
      </header>

      <form className="rounded bg-gray-50 shadow">
        <section className="px-[40px] pt-[40px]">
          <LabelAndInput
            label="Title"
            value={quiz.title}
            onChange={(val) => setQuiz((q) => ({ ...q, title: val }))}
          />
          <LabelAndInput
            label="Subtitle"
            value={quiz.subtitle}
            onChange={(val) => setQuiz((q) => ({ ...q, subtitle: val }))}
          />
        </section>

        {quiz.questions.map((question, questionIndex) => (
          <section key={questionIndex}>
            <hr className="border" />

            <BuilderQuestion
              question={question}
              onDelete={() => onDeleteQuestionClick(questionIndex)}
              onUpdate={(updatedQuestion) =>
                onUpdateQuestion(questionIndex, updatedQuestion)
              }
            >
              <BuilderAnswerSet
                answerOptions={question.answerOptions}
                onUpdate={(updatedAnswers) =>
                  onUpdateAnswers(questionIndex, updatedAnswers)
                }
              />
            </BuilderQuestion>
          </section>
        ))}
        <button
          className="p-[10px] border-t mt-[40px] flex justify-center bg-gray-200 text-gray-500 text-[12px] rounded-bl rounded-br w-full"
          onClick={onNewQuestionClick}
        >
          Add Question
        </button>
      </form>

      <SchemaViewer quiz={quiz} />
    </>
  );
}
