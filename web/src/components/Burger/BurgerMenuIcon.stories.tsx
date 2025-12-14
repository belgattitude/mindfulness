import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BurgerMenuIcon } from '@/components/Burger/BurgerMenuIcon';
import { useState } from 'react';

const meta: Meta<typeof BurgerMenuIcon> = {
  title: 'Ui/BurgerMenuIcon',
  component: BurgerMenuIcon,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    // layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BurgerMenuIcon>;

export const Default: Story = {
  args: {},
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <div className={'flex border border-amber-400 text-amber-700'}>
        <BurgerMenuIcon
          {...args}
          isOpen={isOpen}
          handleClick={() => setIsOpen((prevState) => !prevState)}
          className={'size-[64px]'}
        />
      </div>
    );
  },
};
