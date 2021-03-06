import { ComponentStory, ComponentMeta } from "@storybook/react";

import Modal from "../../../components/shared/Modal";

export default {
  title: "shared/Modal",
  component: Modal,
  args: {
    onClose: () => null,
  },
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>Content</Modal>
);
