import type { Meta, StoryObj } from '@storybook/nextjs';
import { MainHeader } from './MainHeader';
import { siteConfig } from '@/config/site.config';

const meta: Meta<typeof MainHeader> = {
  title: 'MainHeader',
  component: MainHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MainHeader>;

export const Default: Story = {
  args: {
    mainNavLinks: siteConfig.mainNavLinks,
  },
};
