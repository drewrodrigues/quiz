import { IQuiz } from "../types";

export const trueFalseExample: IQuiz = {
  title: "True/False Example",
  questions: [
    {
      questionTitle: "Java and JavaScript are the same",
      // ! make boolean option easier (so these don't have to be defined)
      answerOptions: [{ label: "true" }, { label: "false" }],
      // ! this needs to be updated
      answerIndex: 1,
    },
    {
      questionTitle: "Mayonnaise is superior to ketchup on fries",
      answerOptions: [{ label: "true" }, { label: "false" }],
      answerIndex: 0,
    },
  ],
};

// TODO: add support for images -- they have to be minified
// * (support this on the client?--drag & drop & auto minify and upload to a service?)
// * stack a bunch of integrations? Code snippets from another service?
export const multipleChoiceExample: IQuiz = {
  title: "Multiple Choice",
  questions: [
    {
      questionTitle: "JavaScript Basics Quiz",
      answerOptions: [
        { label: "Something goes here" },
        { label: "Something goes here" },
        { label: "Something goes here" },
      ],
      // ! this needs to be updated
      answerIndex: 0,
    },
  ],
};

export const mixedExample: IQuiz = {
  title: "Mixed Example",
  questions: [], // TODO: build this up from the other quiz examples
};
