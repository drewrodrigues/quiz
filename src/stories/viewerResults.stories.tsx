import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { QuizResults } from "../components/viewer/viewerResults";
import { resultsFromQuiz } from "../utils/resultsFromQuiz";
import { trueFalseTemplate } from "../utils/templates";

export default {
  title: "QuizResults",
  component: QuizResults,
} as ComponentMeta<typeof QuizResults>;

const Template: ComponentStory<typeof QuizResults> = (args) => (
  <div className="p-[20px]">
    <QuizResults {...args} />
  </div>
);

export const middle = Template.bind({});
middle.args = resultsFromQuiz(trueFalseTemplate, [1, 1]);

export const allCorrect = Template.bind({});
allCorrect.args = {
  ...resultsFromQuiz(trueFalseTemplate, [1, 0]),
};

export const allWrong = Template.bind({});
allWrong.args = { ...resultsFromQuiz(trueFalseTemplate, [0, 1]) };
