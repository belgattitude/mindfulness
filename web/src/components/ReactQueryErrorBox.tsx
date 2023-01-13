// Till react-query / suspense is out of experimental
import type { FC } from 'react';

type Props = {
  e: unknown;
};

const getErrorMsg = (e: unknown) => {
  if (typeof e === 'string') {
    return e;
  }
  if (e instanceof Error) {
    return e.message;
  }
  return 'Unknown error';
};

export const ReactQueryErrorBox: FC<Props> = ({ e }) => {
  return (
    <div>
      <h1>Ooops, sorry we've run into an error</h1>
      <p>{getErrorMsg(e)}</p>
    </div>
  );
};
