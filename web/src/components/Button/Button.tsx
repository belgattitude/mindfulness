import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type { TwcComponentProps } from "react-twc";

import { twx } from "@/components/utils";

const button = cva(
  "bg-title-color-400 font-family-button hover:bg-title-color-300 rounded-3xl border text-white",
  {
    defaultVariants: {
      $intent: "primary",
      $size: "md",
    },
    variants: {
      $intent: {
        primary: "",
        secondary: "bg-white text-gray-800",
      },
      $size: {
        lg: "px-6 py-4",
        md: "px-4 py-2",
        sm: "rounded-xl px-2 py-1",
      },
    },
  }
);

type ButtonProps = TwcComponentProps<"button"> & VariantProps<typeof button>;

export const Button = twx.button<ButtonProps>(({ $intent, $size }) =>
  button({ $intent, $size })
);
