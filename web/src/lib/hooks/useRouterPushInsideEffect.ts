import { useRouter } from "next/router";
import type { NextRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

/**
 * Allow to use nextjs router.push() inside an effect or callback.
 * @see https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
 *
 * @example
 * ```
 * const push = useRouterPushInsideEffect()
 *
 * useEffect(() => {
 *     getAuthenticationStatus().then(authenticated => {
 *         if (!authenticated) {
 *            push('/login')
 *         }
 *     })
 * }, [push])
 * ```
 */
export const useRouterPushInsideEffect = (): NextRouter["push"] => {
  const router = useRouter();
  const routerRef = useRef(router);

  // Keep the latest router without changing the returned push identity
  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  return useCallback<NextRouter["push"]>(
    (...args) => routerRef.current.push(...args),
    []
  );
};
