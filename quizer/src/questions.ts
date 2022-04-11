import { IQuiz } from "./types";

const marginCollapsingQuiz: IQuiz = {
  title: "Margin Collapsing",
  questions: [
    {
      question: "When is a block formatting context created?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [
        { label: "overflow: hidden" },
        { label: "position: absolute" },
        { label: "display: inline-block" },
        { label: "float: left" },
      ],
      // TODO
      answerIndex: 0,
    },
    {
      question: "What will be the updated question?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [{ label: "true" }, { label: "false" }],
      answerIndex: 1,
    },
    {
      question: "What will be the updated question?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [{ label: "true" }, { label: "false" }],
      answerIndex: 1,
    },
  ],
};

const anotherQuiz: IQuiz = {
  title: "Another Quiz",
  questions: [
    {
      question: "What will be the result of the following?",
      codeExample: "",
      answerOptions: [{ label: "true" }, { label: "false" }],
      answerIndex: 2,
    },
  ],
};

export const quizes: IQuiz[] = [marginCollapsingQuiz, anotherQuiz];
