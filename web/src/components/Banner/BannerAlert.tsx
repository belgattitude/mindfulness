import { clsx } from 'clsx';
import type { FC } from 'react';
import { Button } from '@/components/Button/Button';

type Props = {
  collapse: boolean;
  render: boolean;
};
export const BannerAlert: FC<Props> = (props) => {
  const { collapse = false, render = true } = props;
  if (!render) {
    return <></>;
  }
  return (
    <div
      data-test-id={'top-banner'}
      className={clsx(
        'transition-all-1s flex items-center justify-center space-x-3 bg-brand-color-300 p-1 font-family-primary font-light text-white',
        {
          ['-translate-y-60 h-0']: collapse,
        }
      )}
    >
      <span className={'text-lg font-light'}>
        Inscriptions ouvertes pour nos prochains stages
      </span>
      <Button
        className={'rounded bg-pink-400 font-light hover:bg-pink-600'}
        $size={'sm'}
      >
        Info et réservations
      </Button>
    </div>
  );
};
