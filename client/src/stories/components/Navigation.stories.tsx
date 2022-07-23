import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navigation from "../../components/layout/Navigation";

export default {
  title: "components/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

export const Default: ComponentStory<typeof Navigation> = () => <Navigation />;
