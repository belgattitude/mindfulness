import { clsx } from "clsx";
import type { FC } from "react";

import { Button } from "@/components/Button/Button";

interface Props {
  collapse: boolean;
  render: boolean;
}
export const BannerAlert: FC<Props> = (props) => {
  const { collapse = false, render = true } = props;
  if (!render) {
    return null;
  }
  return (
    <div
      data-test-id="top-banner"
      className={clsx(
        "bg-brand-color-300 font-family-primary flex items-center justify-center space-x-3 p-1 font-light text-white",
        {
          "h-0 -translate-y-60": collapse,
        }
      )}
    >
      <span className="text-lg font-light">
        Inscriptions ouvertes pour nos prochains stages
      </span>
      <Button
        className="rounded-sm bg-pink-400 font-light hover:bg-pink-600"
        $size="sm"
      >
        Info et réservations
      </Button>
    </div>
  );
};
