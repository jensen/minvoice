import { ComponentStory, ComponentMeta } from "@storybook/react";

import DaySelectorQuery from "../../queries/DaySelectorQuery";

export default {
  title: "queries/DaySelectorQuery",
  component: DaySelectorQuery,
  args: {
    year: 2022,
    month: 6,
    day: 1,
  },
} as ComponentMeta<typeof DaySelectorQuery>;

export const Default: ComponentStory<typeof DaySelectorQuery> = (args) => (
  <DaySelectorQuery {...args} />
);
