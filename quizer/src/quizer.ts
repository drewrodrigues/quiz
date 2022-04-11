import { ParsedQuiz } from "./parsingExample";
import { quizes } from "./questions";
import { IAnswerOption, IFormEvent, IQuestion, IQuiz } from "./types";

interface IResults {
  correctIndices: Set<number>;
  incorrectIndices: Set<number>;
}

interface IGlobalState {
  selectedQuiz: IQuiz;
  results: IResults | undefined;
}

const globalState: IGlobalState = {
  selectedQuiz: quizes[0],
  results: undefined,
};

function render() {
  const quizer = document.querySelector("#quizer");

  const root = createElement(
    "main",
    { style: "border-radius: 10px; border: 1px solid #ccc; padding: 20px;" },
    [Nav(), globalState.selectedQuiz ? Quiz() : undefined]
  );

  quizer!.replaceChildren(root);
}

function createElement(
  elementType: string,
  attributes: object = {},
  children: any[] = []
) {
  const element = document.createElement(elementType);

  Object.entries(attributes).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (key.startsWith("data")) {
      element.dataset[key.slice(4).toLowerCase()] = value;
    } else {
      // @ts-ignore
      element[key] = value;
    }
  });

  children.forEach((child) => {
    if (child) {
      element.appendChild(child);
    }
  });

  return element;
}

function NavLink({
  quiz,
  isActive,
  id,
}: {
  quiz: IQuiz;
  isActive: boolean;
  id: number;
}) {
  return createElement("a", {
    href: `#quiz/${id}`,
    textContent: quiz.title,
    style: `margin: 0 10px; ${
      isActive ? "border-bottom: 1px solid #ccc" : undefined
    }`,
    onclick: () => {
      globalState.selectedQuiz = quiz;
      render();
    },
  });
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
        render();
      },
    },
    [
      createElement("h2", {
        textContent: title,
        style: "margin-bottom: 40px; font-size: 32px; font-weight: 700",
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
              render();
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

function Nav() {
  return createElement(
    "nav",
    { style: "display: flex; margin: 0 -10px; margin-bottom: 25px;" },
    quizes.map((quiz, index) =>
      NavLink({
        quiz,
        isActive: globalState.selectedQuiz === quiz,
        id: index,
      })
    )
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const decodedQuiz: ParsedQuiz = JSON.parse(
    decodeURIComponent(window.location.search.slice(1))
  ) as ParsedQuiz;

  const parsedQuiz: IQuiz = {
    title: decodedQuiz[0],
    questions: decodedQuiz.slice(1).map((question) => ({
      question: question[0],
      answerIndex: 0,
      answerOptions: (question.slice(1) as string[]).map((question) => ({
        label: question,
      })),
    })),
  };

  globalState.selectedQuiz = parsedQuiz;

  render();
});
