import { createElement, SimpleReact } from "./simpleReact";
import { IQuestion, IQuiz } from "../types";
import { quizToSchema } from "../utils";

interface IState {
  quiz: IQuiz;
}

const state: IState = {
  quiz: { title: "", subtitle: "", questions: [] },
};

export function QuizBuilder() {
  return createElement("main", {}, [
    createElement(
      "form",
      {
        style:
          "border-radius: 10px; padding: 20px; margin-top: 50px; background: white; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column;",
      },
      [
        createElement(
          "header",
          {
            style:
              "display: flex; justify-content: space-between; align-items: center",
          },
          [
            createElement("h1", {
              textContent: "Builder",
              style: "font-size: 32px; font-weight: 700;",
            }),
            createElement("a", {
              textContent: "View",
              style:
                "border: 1px solid #aaa; padding: 5px 10px; border-radius: 10px; color: #aaa; font-size: 12px; cursor: pointer",
            }),
          ]
        ),
        LabelAndInput({
          label: "Title",
          value: state.quiz.title,
          onchange: (val) => {
            state.quiz.title = val;
            SimpleReact.reRender();
          },
        }),
        LabelAndInput({
          label: "Subtitle",
          value: state.quiz.subtitle,
          onchange: (val) => {
            state.quiz.subtitle = val;
            SimpleReact.reRender();
          },
        }),
      ]
    ),
    SchemaViewer(),
  ]);
}

function LabelAndInput({
  label,
  onchange,
  value,
}: {
  label: string;
  onchange: (value: string) => void;
  value: string;
}) {
  return createElement(
    "label",
    {
      textContent: label,
      style:
        "display: flex; flex-direction: column; margin-top: 20px; font-size: 14px;",
    },
    [
      createElement("input", {
        style:
          "border: none; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-top: 10px",
        oninput: (e: any) => {
          onchange(e.target.value);
        },
        value,
      }),
    ]
  );
}

function SchemaViewer() {
  const schema = quizToSchema(state.quiz);
  console.log(schema);

  return createElement("footer", {
    // textContent: schema, // ! fix this, causing issue with re-render
    style: "margin-top: 20px;",
  });
}
