import { HttpServiceUnavailable } from "@httpx/exception";

import { isHttpFetchErrorLike } from "@/lib/typeguards";

import { getGraphQLUrl } from "../config/graphql.config";

export const getGraphqlRequestCatcher = (e: unknown): never => {
  // grahql-request is not really cool at all
  if (
    // covers server-side node-fetch
    (isHttpFetchErrorLike(e) &&
      ["ECONNREFUSED", "ECONNRESET"].includes(e?.code ?? "")) ||
    // covers cross-fetch / browser-ponyfill on client side
    (e instanceof Error && /network.*fail/iu.test(e.message))
  ) {
    const details = [
      "code" in e ? e.code : undefined,
      "message" in e ? e.message : undefined,
    ]
      .filter((v) => typeof v === "string")
      .join(", ");

    throw new HttpServiceUnavailable({
      message: `Cannot contact the server (${details})`,
      url: getGraphQLUrl(),
    });
  }
  throw e;
};

/**
 * Awaits a graphql request, converting network errors with getGraphqlRequestCatcher
 */
export const withGraphqlRequestCatcher = async <T>(
  request: Promise<T>
): Promise<T> => {
  try {
    return await request;
  } catch (error) {
    return getGraphqlRequestCatcher(error);
  }
};
