import { createElement, render } from "./simpleReact";
import { IQuestion } from "./types";

interface IState {
  title: string;
  questions: IQuestion[];
}

const state: IState = {
  title: "",
  questions: [],
};

function reRender() {
  const root = createElement("main", {}, [TitleSelector()]);
  render("#quizBuilder", root);
}

function TitleSelector() {}

document.addEventListener("DOMContentLoaded", () => {
  // TODO: add schema validations

  reRender();
});
