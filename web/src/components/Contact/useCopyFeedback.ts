import { useEffect, useState } from "react";

/**
 * Copies a text to the clipboard, `copied` is true for a short while after,
 * to confirm it on the button.
 */
export const useCopyFeedback = (text: string) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return { copied, copy };
};
