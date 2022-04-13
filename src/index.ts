import { QuizBuilder } from "./quizBuilder";
import { Quizer } from "./quizer";
import { SimpleReact } from "./simpleReact";

// ? thoughts: think about keeping track of the parent and index so we can easily replace elements in the dom (re-render)

// ! naive routing -- improve this
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    SimpleReact.render("#index", Quizer);
  } else {
    SimpleReact.render("#index", QuizBuilder);
  }
});
