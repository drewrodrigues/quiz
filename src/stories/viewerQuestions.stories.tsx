import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ViewerQuestions } from "../components/viewer/viewerQuestions";
import { trueFalseTemplate } from "../utils/templates";

export default {
  title: "Viewer/Questions",
  component: ViewerQuestions,
} as ComponentMeta<typeof ViewerQuestions>;

const Template: ComponentStory<typeof ViewerQuestions> = (args) => (
  <ViewerQuestions {...args} />
);

export const _default = Template.bind({});
_default.args = {
  quiz: trueFalseTemplate,
};

export const incorrect = Template.bind({});
incorrect.args = {
  quiz: trueFalseTemplate,
  answers: [0, 1],
};

export const correct = Template.bind({});
correct.args = {
  quiz: trueFalseTemplate,
  answers: [1, 0],
};

export const mixed = Template.bind({});
mixed.args = {
  quiz: trueFalseTemplate,
  answers: [1, 1],
};
