import { ComponentStory, ComponentMeta } from "@storybook/react";

import Table from "../../../components/shared/Table";

export default {
  title: "shared/Table",
  component: Table,
  args: {
    columns: [
      { label: "First", accessor: "first" },
      { label: "Second", accessor: "second" },
    ],
    rows: [
      { id: 1, first: "First First", second: "Second First" },
      { id: 2, first: "First Second", second: "Second Second" },
    ],
  },
} as ComponentMeta<typeof Table>;

export const Default: ComponentStory<typeof Table> = (args) => (
  <Table {...args} />
);

export const WithColumnWidth: ComponentStory<typeof Table> = (args) => (
  <Table
    {...args}
    columns={[
      { label: "First", accessor: "first", width: "20%" },
      { label: "Second", accessor: "second" },
    ]}
  />
);
