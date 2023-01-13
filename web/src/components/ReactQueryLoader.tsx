import styled from '@emotion/styled';
import type { FC } from 'react';

const Ctn = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  padding: 5px;
`;
export const ReactQueryLoader: FC = () => {
  return <Ctn>Loading...</Ctn>;
};
