import type { TwcComponentProps } from 'react-twc';
import { cva, type VariantProps } from 'class-variance-authority';
import { twx } from '@/components/utils';

const button = cva(
  'rounded-3xl border bg-title-color-400 font-family-button text-white hover:bg-title-color-300',
  {
    variants: {
      $size: {
        sm: 'rounded-xl px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-4',
      },
      $intent: {
        primary: '',
        secondary: 'bg-white text-gray-800',
      },
    },
    defaultVariants: {
      $intent: 'primary',
      $size: 'md',
    },
  }
);

type ButtonProps = TwcComponentProps<'button'> & VariantProps<typeof button>;

export const Button = twx.button<ButtonProps>(({ $intent, $size }) =>
  button({ $intent, $size })
);
