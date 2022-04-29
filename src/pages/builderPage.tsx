import React, { useEffect, useState } from "react";
import {
  BuilderAnswerSet,
  BuilderQuestion,
  SchemaViewer,
  UrlViewer,
} from "../components/builder";
import { LabelAndInput } from "../components/labelAndInput";
import { IAnswerOption, IQuestion, IQuiz } from "../types";
import { quizToViewerUrl } from "../utils/encoding";

const BLANK_QUESTION: IQuestion = {
  questionTitle: "",
  answerIndex: -1, // TODO: make UI say that an answer index needs to be selected
  answerOptions: [],
};
const BLANK_QUIZ: IQuiz = { title: "", subtitle: "", questions: [] };

export function QuizBuilder() {
  const [quiz, setQuiz] = useState<IQuiz>(() => {
    try {
      const parsedCachedQuiz = JSON.parse(
        localStorage.getItem("STORED_QUIZ")!
      ) as unknown as IQuiz;
      if (!parsedCachedQuiz) return BLANK_QUIZ;
      return parsedCachedQuiz;
    } catch (e) {
      return BLANK_QUIZ;
    }
  });

  const viewerUrl = quizToViewerUrl(quiz);
  const builderViewerUrl = `${viewerUrl}&fromBuilder=true`;

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

  function onMarkCorrect(questionIndex: number, answerIndex: number) {
    const updatedQuestions = [...quiz.questions];

    updatedQuestions[questionIndex].answerIndex = answerIndex;

    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("STORED_QUIZ", JSON.stringify(quiz));
    }, 0);
  }, [quiz]);

  return (
    <>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="font-bold text-[32px]">Builder</h1>
        <a
          className="cursor-pointer px-[12px] py-[5px] rounded-half bg-gray-100 text-gray-500 text-[14px]"
          href={builderViewerUrl}
        >
          View
        </a>
      </header>

      <UrlViewer quiz={quiz} />

      <form>
        <h2 className="mb-[20px]">Details</h2>
        <section className="p-[40px] rounded bg-gray-50 shadow mb-[20px]">
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

        <h2 className="mb-[20px]">Questions</h2>
        <section className="">
          {quiz.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <BuilderQuestion
                question={question}
                onDelete={() => onDeleteQuestionClick(questionIndex)}
                onUpdate={(updatedQuestion) =>
                  onUpdateQuestion(questionIndex, updatedQuestion)
                }
              >
                <BuilderAnswerSet
                  answerOptions={question.answerOptions}
                  correctAnswerIndex={question.answerIndex}
                  onMarkCorrect={(answerIndex) =>
                    onMarkCorrect(questionIndex, answerIndex)
                  }
                  onUpdate={(updatedAnswers) =>
                    onUpdateAnswers(questionIndex, updatedAnswers)
                  }
                />
              </BuilderQuestion>
            </div>
          ))}
        </section>
        <button
          className="p-[10px] flex justify-center bg-gray-100 text-gray-500 text-[12px] rounded w-full shadow"
          onClick={onNewQuestionClick}
        >
          Add Question
        </button>
      </form>

      <SchemaViewer quiz={quiz} />
    </>
  );
}
