import { ComponentStory, ComponentMeta } from "@storybook/react";

import EntryList from "../../components/EntryList";

export default {
  title: "components/EntryList",
  component: EntryList,
} as ComponentMeta<typeof EntryList>;

export const Default: ComponentStory<typeof EntryList> = (args) => (
  <EntryList {...args} />
);

Default.args = {
  entries: [
    {
      id: 1,
      description: "First entry description",
      date: new Date("2022-06-01T07:00:00Z"),
      seconds: 4000,
      projectId: 1,
      project: {
        id: 1,
        code: "FIRST",
        name: "First Project",
        clientId: 1,
        client: {
          id: 1,
          name: "First Client",
        },
      },
    },
  ],
};
