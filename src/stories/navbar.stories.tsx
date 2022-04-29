import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Navbar } from "../components/layout/navbar";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => (
  <BrowserRouter>
    <Navbar {...args} />
  </BrowserRouter>
);

const rightLinks = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Builder" },
];

const rightButton = {
  label: "Back",
  href: "#",
};

export const OnlyLinks = Template.bind({});
OnlyLinks.args = {
  rightLinks,
};

export const OnlyButton = Template.bind({});
OnlyButton.args = { rightButton };

export const WithAll = Template.bind({});
WithAll.args = {
  rightLinks,
  rightButton,
  subtitle: "Some Subtitle",
};
