import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Clock } from "../../../components/shared/Icons";
import Button from "../../../components/shared/Button";

export default {
  title: "shared/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
  children: "Primary",
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
  children: "Secondary",
};

export const Danger = Template.bind({});

Danger.args = {
  variant: "danger",
  children: "Danger",
};

export const WithIcon: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>
    <Clock />
  </Button>
);

WithIcon.args = {
  variant: "primary",
};
