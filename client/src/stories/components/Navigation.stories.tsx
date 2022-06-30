import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "../../components/Navigation";

export default {
  title: "components/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

export const Default: ComponentStory<typeof Navigation> = () => <Navigation />;
