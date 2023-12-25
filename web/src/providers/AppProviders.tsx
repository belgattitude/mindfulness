import type { FC, PropsWithChildren } from 'react';

import { ReactQueryClientProvider } from './ReactQueryClientProvider';

type Props = PropsWithChildren;

export const AppProviders: FC<Props> = (props) => {
  const { children } = props;
  return <ReactQueryClientProvider>{children}</ReactQueryClientProvider>;
};
