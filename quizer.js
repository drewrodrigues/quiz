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
      answerOptions: [{ label: "True" }, { label: "False" }],
      answerIndex: 2,
    },
    {
      question: "What will be the updated question?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [{ label: "True" }, { label: "False" }],
      answerIndex: 2,
    },
    {
      question: "What will be the updated question?",
      subtitle: "Some subtitle goes here",
      codeExample: "",
      answerOptions: [{ label: "True" }, { label: "False" }],
      answerIndex: 2,
    },
  ],
};

const anotherQuiz = {
  title: "Another Quiz",
  questions: [
    {
      question: "What will be the result of the following?",
      codeExample: "",
      answerOptions: [{ label: "True" }, { label: "False" }],
      answerIndex: 2,
    },
  ],
};

const quizes = [marginCollapsingQuiz, anotherQuiz];

const globalState = {
  selectedQuiz: quizes[0],
};

function render() {
  const quizer = document.querySelector("#quizer");

  const root = createElement("main", {}, [
    Nav(),
    globalState.selectedQuiz ? Quiz() : undefined,
  ]);

  quizer.replaceChildren(root);
}

function createElement(elementType, attributes = {}, children = []) {
  const element = document.createElement(elementType);

  Object.entries(attributes).forEach((keyValue) => {
    const [key, value] = keyValue;
    element[key] = value;
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
  const { selectedQuiz } = globalState;

  return createElement("section", {}, [
    createElement("h2", { textContent: selectedQuiz.title }),
    ...selectedQuiz.questions.map((question, id) =>
      QuizQuestion({ question, id })
    ),
  ]);
}

function QuizQuestion({ question, id }) {
  return createElement("div", { style: "margin-bottom: 20px" }, [
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
  ]);
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
