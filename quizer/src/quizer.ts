import { createElement, render } from "./simpleReact";
import {
  IAnswerOption,
  IFormEvent,
  IQuestion,
  IQuiz,
  ParsedQuiz,
} from "./types";

interface IResults {
  correctIndices: Set<number>;
  incorrectIndices: Set<number>;
}

interface IGlobalState {
  selectedQuiz: IQuiz;
  results: IResults | undefined;
}

const globalState: IGlobalState = {
  selectedQuiz: undefined,
  results: undefined,
};

function reRender() {
  render("#quizer", Quizer());
}

export function Quizer() {
  // ! add schema validations
  try {
    const decodedQuiz: ParsedQuiz = JSON.parse(
      decodeURIComponent(window.location.search.slice(1))
    ) as ParsedQuiz;

    const parsedQuiz: IQuiz = {
      title: decodedQuiz[0] as string,
      questions: decodedQuiz.slice(1).map((question) => ({
        question: question[0],
        answerIndex: 0,
        answerOptions: (question.slice(1) as string[]).map((question) => ({
          label: question,
        })),
      })),
    };

    globalState.selectedQuiz = parsedQuiz;
    return createElement(
      "main",
      {
        style:
          "border-radius: 10px; padding: 20px; margin-top: 50px; background: white; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);",
      },
      [Quiz()]
    );
  } catch (e) {
    return ParsingFailed();
  }

  function ParsingFailed() {
    const quizExample = [
      "Margin Collapsing",
      [
        "When is a block formatting context created?",
        "overflow: hidden",
        "position: absolute",
        "display: inline-block",
        "float: left",
      ],
      [
        "When is a block formatting context created?",
        "display: inline-block",
        "position: absolute",
        "overflow: hidden",
        "float: left",
      ],
      [
        "When is a block formatting context created?",
        "float: left",
        "overflow: hidden",
        "position: absolute",
        "display: inline-block",
      ],
      [
        "When is a block formatting context created?",
        "position: absolute",
        "overflow: hidden",
        "float: left",
        "display: inline-block",
      ],
      [
        "When is a block formatting context created?",
        "overflow: hidden",
        "position: absolute",
        "display: inline-block",
        "float: left",
      ],
      [
        "When is a block formatting context created?",
        "overflow: hidden",
        "position: absolute",
        "display: inline-block",
        "float: left",
      ],
    ];
    const quizString = `${JSON.stringify(quizExample)}`;
    const quizLink = encodeURIComponent(quizString);
    const exampleUrl = `?${quizLink}`;

    return createElement(
      "main",
      {
        style:
          "height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column",
      },
      [
        createElement("p", {
          style: "font-weight: 700; font-size: 24px;",
          textContent: "It's a distastah",
        }),
        createElement("p", {
          textContent: "Failed to parse quiz",
          style: "margin-bottom: 40px;",
        }),
        createElement("footer", { style: "display: flex" }, [
          createElement("a", {
            textContent: "Try an example",
            href: exampleUrl,
            style:
              "background: white; border: none; padding: 10px 14px; border-radius: 10px; font-size: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); margin-right: 10px",
          }),
          createElement("a", {
            textContent: "Create a Quiz",
            style:
              "background: white; border: none; padding: 10px 14px; border-radius: 10px; font-size: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);",
          }),
        ]),
      ]
    );
  }
}

function Quiz() {
  const {
    selectedQuiz: { title, questions },
  } = globalState;

  return createElement(
    "form",
    {
      onsubmit: (e: IFormEvent) => {
        e.preventDefault();

        const guessedAnswers = Array.from(e.target.elements).filter(
          (element) => element.checked
        );
        let results: IResults = {
          correctIndices: new Set<number>(),
          incorrectIndices: new Set<number>(),
        };

        const allQuestionsAnswered = guessedAnswers.length === questions.length;

        if (!allQuestionsAnswered) {
          alert("Not all questions were answered!");
          return;
        }

        questions.forEach((question, i) => {
          const guessedAnswer = guessedAnswers[i].dataset.label;
          const actualAnswer =
            question.answerOptions[question.answerIndex].label;

          if (guessedAnswer === actualAnswer) {
            results.correctIndices.add(i);
          } else {
            results.incorrectIndices.add(i);
          }
        });

        globalState.results = results;
        SimpleReact.reRender();
      },
    },
    [
      createElement("h2", {
        textContent: title,
        style: "margin-bottom: 20px; font-size: 32px; font-weight: 700",
      }),
      ...(!globalState.results
        ? questions.map((question, id) => QuizQuestion({ question, id }))
        : questions.map((question, id) => QuizResult({ question, id }))),
      !globalState.results
        ? createElement("button", {
            textContent: "Submit",
          })
        : createElement("button", {
            textContent: "Retry",
            onclick: () => {
              globalState.results = undefined;
              SimpleReact.reRender();
            },
          }),
    ]
  );
}

function QuizQuestion({ question, id }: { question: IQuestion; id: number }) {
  return createElement(
    "div",
    {
      style: "margin-bottom: 20px",
    },
    [
      createElement("header", { style: "margin-bottom: 5px" }, [
        createElement("h2", {
          textContent: question.question,
          style: "font-weight: 700",
        }),
        question.subtitle &&
          createElement("p", {
            textContent: question.subtitle,
            style: "font-size: 14px",
          }),
      ]),
      QuestionAnswers({
        answerOptions: question.answerOptions,
        id,
      }),
    ]
  );
}

function QuizResult({ question, id }: { question: IQuestion; id: number }) {
  const isCorrect =
    globalState.results && globalState.results.correctIndices.has(id);
  const isIncorrect =
    globalState.results && globalState.results.incorrectIndices.has(id);

  const commonStyle = `
    margin-left: -20px;
    margin-right: -20px;
    padding: 20px;
  `;

  return createElement(
    "div",
    {
      style: [
        "margin-bottom: 20px",
        isCorrect
          ? `border-right: 10px solid lightgreen; background: rgba(0,255,0,0.2);${commonStyle}`
          : "",
        isIncorrect
          ? `border-right: 10px solid orangered; background: rgba(255,0,0,0.2);${commonStyle}`
          : "",
      ].join(";"),
    },
    [
      createElement("header", { style: "margin-bottom: 5px" }, [
        createElement("h2", {
          textContent: question.question,
          style: "font-weight: 700",
        }),
        question.subtitle &&
          createElement("p", {
            textContent: question.subtitle,
            style: "font-size: 14px",
          }),
      ]),
      createElement("p", {
        textContent: question.answerOptions[question.answerIndex].label,
      }),
    ]
  );
}

function QuestionAnswers({
  answerOptions,
  id,
}: {
  answerOptions: IAnswerOption[];
  id: number;
}) {
  return createElement(
    "ul",
    {},
    answerOptions.map((answerOption) =>
      createElement(
        "label",
        {
          style: "display: flex; align-items: center",
        },
        [
          createElement("input", {
            type: "radio",
            name: id,
            style: "margin-right: 5px",
            dataLabel: answerOption.label,
          }),
          createElement("span", { textContent: answerOption.label }),
        ]
      )
    )
  );
}
