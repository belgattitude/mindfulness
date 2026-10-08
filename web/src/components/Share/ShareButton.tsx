"use client";

import { Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  /** Title of the shared page */
  title: string;
  text?: string | undefined;
  className?: string;
}

/**
 * Shares the current page: the share sheet when the device has one (phones),
 * otherwise the link is copied to the clipboard.
 */
export const ShareButton: FC<Props> = (props) => {
  const { title, text, className } = props;
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

  const share = async () => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // Share sheet closed by the user
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={() => {
        void share();
      }}
      className={twMerge(
        "border-brand-color-400 text-title-color-800 hover:bg-brand-color-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-white px-4 py-2.5 text-sm font-medium outline-green-500 transition-colors",
        className
      )}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Share2 aria-hidden="true" className="size-4" />
      )}
      {/* Announced to screen readers when the link is copied */}
      <span aria-live="polite">{copied ? "Lien copié" : "Partager"}</span>
    </button>
  );
};
