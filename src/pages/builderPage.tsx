import React, { useState } from "react";
import { AnswerSet } from "../components/builder/answerSet";
import { LabelAndInput } from "../components/labelAndInput";
import { IAnswerOption, IQuestion, IQuiz } from "../types";

const BLANK_QUESTION: IQuestion = {
  question: "",
  answerIndex: -1,
  answerOptions: [],
};
const BLANK_QUIZ = { title: "", subtitle: "", questions: [] };
const BLANK_ANSWER: IAnswerOption = { label: "" };

export function QuizBuilder() {
  const [quiz, setQuiz] = useState<IQuiz>(BLANK_QUIZ);

  function onNewQuestionClick(e: React.MouseEvent) {
    e.preventDefault();
    setQuiz((q) => ({ ...quiz, questions: [...q.questions, BLANK_QUESTION] }));
  }

  function onNewAnswer(e: React.MouseEvent, questionIndex: number) {
    e.preventDefault();
    const updatedQuestion = { ...quiz.questions[questionIndex] };
    updatedQuestion.answerOptions = [
      ...updatedQuestion.answerOptions,
      BLANK_ANSWER,
    ];
    const updatedQuiz: IQuiz = { ...quiz };
    updatedQuiz.questions[questionIndex] = updatedQuestion;
    setQuiz(updatedQuiz);
  }

  function onDeleteAnswer(questionIndex: number, answerIndex: number) {
    const updatedQuiz: IQuiz = { ...quiz };
    let updatedAnswers = updatedQuiz.questions[questionIndex].answerOptions;
    updatedAnswers = [
      ...updatedAnswers.slice(0, answerIndex),
      ...updatedAnswers.slice(answerIndex + 1),
    ];
    updatedQuiz.questions[questionIndex].answerOptions = updatedAnswers;
    setQuiz(updatedQuiz);
  }

  function onDeleteQuestionClick(e: React.MouseEvent, index: number) {
    e.preventDefault();
    const newQuestions = [
      ...quiz.questions.slice(0, index),
      ...quiz.questions.slice(index + 1),
    ];
    setQuiz((q) => ({ ...quiz, questions: newQuestions }));
  }

  return (
    <form className="">
      <header className="flex justify-between items-center px-[40px] pt-[40px]">
        <h1 className="font-bold text-[32px]">Builder</h1>
        <button className="border cursor-pointer p-[5px] rounded-half">
          View
        </button>
      </header>

      <hr className="my-[40px] border" />

      <section className="px-[40px]">
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
        <>
          <hr className="my-[40px] border" />

          <section className="px-[40px]">
            <button
              className="rounded-half p-[5px] bg-red-200 text-red-500 text-[12px] mb-[20px]"
              onClick={(e) => onDeleteQuestionClick(e, questionIndex)}
            >
              Delete Question
            </button>

            <LabelAndInput
              label="Question"
              value={quiz.subtitle}
              onChange={(val) => setQuiz((q) => ({ ...q, subtitle: val }))}
            />

            <AnswerSet
              answers={question.answerOptions}
              onUpdate={() => null}
              onDeleteAnswer={(answerIndex) =>
                onDeleteAnswer(questionIndex, answerIndex)
              }
            />

            <button
              className="rounded-half p-[5px] bg-green-200 text-green-500 text-[12px]"
              onClick={(e) => onNewAnswer(e, questionIndex)}
            >
              Add Answer
            </button>
          </section>
        </>
      ))}

      <button
        className="p-[10px] border-t mt-[40px] flex justify-center bg-gray-200 text-gray-500 text-[12px] rounded-bl rounded-br w-full"
        onClick={onNewQuestionClick}
      >
        Add Question
      </button>
    </form>
  );
}
