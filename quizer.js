// interface IQuiz {
//   title: string;
//   questions: IQuestion[];
// }

// interface IAnswerOption {
//   label?: string;
//   image?: string;
// }

// interface IQuestion {
//   question: string;
//   answerOptions: IAnswerOption[];
//   answerIndex: number;

//   subtitle?: string;
//   codeExample?: string;
//   image?: string;
// }

const marginCollapsingQuiz = {
  title: "Margin Collapsing",
  questions: [
    {
      question: "What will be the updated question?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [{ label: "true" }, { label: "false" }],
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

const anotherQuiz = {
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

const quizes = [marginCollapsingQuiz, anotherQuiz];

const globalState = {
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

  quizer.replaceChildren(root);
}

function createElement(elementType, attributes = {}, children = []) {
  const element = document.createElement(elementType);

  Object.entries(attributes).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (key.startsWith("data")) {
      element.dataset[key.slice(4).toLowerCase()] = value;
    } else {
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

function NavLink({ quiz, isActive, id }) {
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
      onsubmit: (e) => {
        e.preventDefault();

        const guessedAnswers = Array.from(e.target.elements).filter(
          (element) => element.checked
        );
        let results = {
          correctIndices: new Set(),
          incorrectIndices: new Set(),
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

function QuizQuestion({ question, id }) {
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

function QuizResult({ question, id }) {
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

function QuestionAnswers({ answerOptions, id }) {
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
  render();
});
