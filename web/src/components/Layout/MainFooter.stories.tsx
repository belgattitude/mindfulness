import type { Meta, StoryObj } from '@storybook/nextjs';
import { MainFooter } from '@/components/Layout/MainFooter';
import { siteConfig } from '@/config/site.config';

const meta: Meta<typeof MainFooter> = {
  title: 'Layout/MainFooter',
  component: MainFooter,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    mainNavLinks: siteConfig.mainNavLinks,
  },
};

export default meta;
type Story = StoryObj<typeof MainFooter>;

export const Default: Story = {
  args: {
    // mainNavLinks: siteConfig.mainNavLinks,
  },
};
