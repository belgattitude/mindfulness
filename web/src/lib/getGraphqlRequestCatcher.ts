import { HttpServiceUnavailable } from '@httpx/exception';
import { isHttpFetchErrorLike } from '@/lib/typeguards';
import { getGraphQLUrl } from '../config/graphql.config';

export const getGraphqlRequestCatcher = (e: unknown) => {
  // grahql-request is not really cool at all
  if (
    // covers server-side node-fetch
    (isHttpFetchErrorLike(e) &&
      ['ECONNREFUSED', 'ECONNRESET'].includes(e?.code ?? '')) ||
    // covers cross-fetch / browser-ponyfill on client side
    (e instanceof Error && /network(.*)fail/i.test(e.message))
  ) {
    const details = [
      'code' in e ? e.code : undefined,
      'message' in e ? e.message : undefined,
    ]
      .filter((v) => typeof v === 'string')
      .join(', ');

    throw new HttpServiceUnavailable({
      url: getGraphQLUrl(),
      message: `Cannot contact the server (${details})`,
    });
  }
  throw e;
};
