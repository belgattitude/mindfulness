"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

import { reactQueryConfig } from "@/config/react-query.config";

let browserQueryClient: QueryClient | undefined;

/**
 * A new client for each server render (never shared between requests), a
 * single one in the browser.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 */
const getQueryClient = (): QueryClient => {
  if (isServer) {
    return new QueryClient(reactQueryConfig);
  }
  browserQueryClient ??= new QueryClient(reactQueryConfig);
  return browserQueryClient;
};

type Props = PropsWithChildren;

export const ReactQueryClientProvider: FC<Props> = (props) => {
  const { children } = props;
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
