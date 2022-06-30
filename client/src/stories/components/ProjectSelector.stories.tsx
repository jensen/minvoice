import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";
import CacheProvider from "../../context/cache";

import ProjectSelector from "../../components/ProjectSelector";

export default {
  title: "components/ProjectSelector",
  component: ProjectSelector,
} as ComponentMeta<typeof ProjectSelector>;

export const Default: ComponentStory<typeof ProjectSelector> = (args) => (
  <ProjectSelector {...args} />
);
