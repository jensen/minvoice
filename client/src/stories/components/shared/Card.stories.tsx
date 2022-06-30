import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card from "../../../components/shared/Card";

export default {
  title: "shared/Card",
  component: Card,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>Contents</Card>
);

export const WithoutPadding: ComponentStory<typeof Card> = (args) => (
  <Card {...args} padding={false}>
    Contents
  </Card>
);
