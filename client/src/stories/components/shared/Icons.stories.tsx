import type { IIcon } from "../../../components/shared/Icons";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import * as Icons from "../../../components/shared/Icons";

export default {
  title: "shared/Icon",
  args: {
    size: 64,
  },
} as ComponentMeta<IIcon>;

export const Clock: ComponentStory<IIcon> = (args) => <Icons.Clock {...args} />;
export const FileInvoiceDollar: ComponentStory<IIcon> = (args) => (
  <Icons.FileInvoiceDollar {...args} />
);
export const FileChartColumn: ComponentStory<IIcon> = (args) => (
  <Icons.FileChartColumn {...args} />
);
export const Table: ComponentStory<IIcon> = (args) => <Icons.Table {...args} />;
export const ArrowLeft: ComponentStory<IIcon> = (args) => (
  <Icons.ArrowLeft {...args} />
);
export const ArrowRight: ComponentStory<IIcon> = (args) => (
  <Icons.ArrowRight {...args} />
);
export const Plus: ComponentStory<IIcon> = (args) => <Icons.Plus {...args} />;
export const AngleDown: ComponentStory<IIcon> = (args) => (
  <Icons.AngleDown {...args} />
);
export const Gear: ComponentStory<IIcon> = (args) => <Icons.Gear {...args} />;
