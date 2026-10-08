import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { createTwc } from "react-twc";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const twx = createTwc({ compose: cn });
