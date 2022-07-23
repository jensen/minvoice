import { rest } from "msw";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { parameters } from "../../../.storybook/preview";

import EntryListQuery from "../../components/queries/EntryListQuery";

export default {
  title: "queries/EntryListQuery",
  component: EntryListQuery,
  args: {
    year: 2022,
    month: 6,
    day: 1,
  },
} as ComponentMeta<typeof EntryListQuery>;

export const Default: ComponentStory<typeof EntryListQuery> = (args) => (
  <EntryListQuery {...args} />
);

export const Empty: ComponentStory<typeof EntryListQuery> = (args) => (
  <EntryListQuery {...args} />
);

Empty.parameters = {
  msw: {
    handlers: [
      rest.get("/api/entries", (request, response, context) =>
        response(
          context.json({
            success: true,
            entries: [],
          })
        )
      ),
      ...parameters.msw.handlers,
    ],
  },
};
