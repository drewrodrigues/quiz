import React from "react";
import {
  multipleChoiceExample,
  mixedExample,
  trueFalseExample,
} from "../../utils/templates";
import { TemplateCard } from "./templateCard";

const examples = [trueFalseExample, multipleChoiceExample, mixedExample];

export function Templates(): React.ReactElement {
  return (
    <div>
      <h2 className="font-bold text-[32px] mb-[20px]">Templates</h2>

      <section className="flex mx-[-10px] flex-wrap">
        {examples.map((example) => (
          <TemplateCard quiz={example} />
        ))}
      </section>
    </div>
  );
}
