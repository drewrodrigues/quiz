import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Error } from "../components/error/error";

export default {
  title: "Errors",
  component: Error,
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = (args) => (
  <Error {...args} />
);

export const _default = Template.bind({});
_default.args = {};

export const custom = Template.bind({});
custom.args = {
  title: "Failed to show page",
  subtitle: "A subtitle goes here",
};
