import { ComponentStory, ComponentMeta } from "@storybook/react";

import Loading from "../../../components/shared/Loading";

export default {
  title: "shared/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Default: ComponentStory<typeof Loading> = () => <Loading />;
