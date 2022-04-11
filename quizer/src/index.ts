import { Quizer } from "./quizer";
import { render } from "./simpleReact";

document.addEventListener("DOMContentLoaded", () => {
  render("#index", Quizer());
});
