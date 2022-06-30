import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from "../../components/Header";

export default {
  title: "components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = () => <Header />;
