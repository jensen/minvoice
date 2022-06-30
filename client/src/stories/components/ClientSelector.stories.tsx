import { ComponentStory, ComponentMeta } from "@storybook/react";

import ClientSelector from "../../components/ClientSelector";

const clients = [
  {
    id: 1,
    name: "First",
    projects: [
      {
        id: 1,
        name: "First Project",
      },
    ],
  },
  {
    id: 2,
    name: "Second",
  },
];

export default {
  title: "components/ClientSelector",
  component: ClientSelector,
  argTypes: {
    value: { control: { type: "number" } },
  },
  args: {
    clients,
  },
} as ComponentMeta<typeof ClientSelector>;

export const NoSelection: ComponentStory<typeof ClientSelector> = (args) => (
  <ClientSelector {...args}></ClientSelector>
);

export const WithDefaultValue: ComponentStory<typeof ClientSelector> = (
  args
) => <ClientSelector {...args}></ClientSelector>;

WithDefaultValue.args = {
  value: 2,
};
