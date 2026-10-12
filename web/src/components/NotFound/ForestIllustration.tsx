import type { FC } from "react";

import { cn } from "@/components/utils";

/** A pine of three tiers, standing on base */
const getPinePath = (x: number, base: number, height: number) => {
  const width = height * 0.45;
  const tiers = [
    [0, 0.42, 0.55],
    [0.22, 0.7, 0.8],
    [0.45, 0.95, 1],
  ] as const;
  const crown = tiers
    .map(([top, bottom, ratio]) => {
      const half = (width * ratio) / 2;
      const y1 = base - height + top * height;
      const y2 = base - height + bottom * height;
      return `M${x} ${y1}L${x + half} ${y2}L${x - half} ${y2}Z`;
    })
    .join("");
  return crown;
};

/** Trees along a line, heights cycling through a pattern: no randomness */
const getRow = (
  from: number,
  to: number,
  step: number,
  base: number,
  heights: readonly number[]
) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, index) =>
    getPinePath(from + index * step, base, heights[index % heights.length] ?? 0)
  ).join("");

const farTrees = getRow(10, 1190, 34, 268, [46, 60, 52, 70, 44, 58, 66]);
const midTrees = getRow(-20, 1220, 68, 322, [96, 124, 104, 138, 92, 116]);
const nearTrees = [
  [30, 230],
  [92, 186],
  [150, 262],
  [215, 168],
  // Closer to the path: they frame the scene on narrow screens (sliced)
  [300, 150],
  [352, 204],
  [880, 196],
  [934, 146],
  [985, 178],
  [1048, 252],
  [1108, 196],
  [1172, 240],
]
  .map(([x, height]) => getPinePath(x ?? 0, 384, height ?? 0))
  .join("");

/**
 * A calm forest with a path fading between the trees and a "404" signpost.
 * Drawn with the theme colors, the mist drifts slowly (still when reduced
 * motion is preferred).
 */
export const ForestIllustration: FC<{ className?: string }> = (props) => (
  <svg
    viewBox="0 0 1200 380"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
    className={cn("block w-full", props.className)}
  >
    <defs>
      <filter id="forest-blur" x="-20%" y="-50%" width="140%" height="200%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
    </defs>

    {/* A soft sun through the haze */}
    <circle cx="840" cy="118" r="120" className="fill-white/30" />
    <circle cx="840" cy="118" r="50" className="fill-white/80" />

    {/* Far hills and trees */}
    <path
      d="M0 250C150 205 290 230 420 214C560 196 690 238 830 218C960 200 1080 226 1200 210V380H0Z"
      className="fill-brand-color-200"
    />
    <path d={farTrees} className="fill-brand-color-300" />

    {/* Mist between the layers */}
    <g
      filter="url(#forest-blur)"
      className="motion-safe:animate-[mist-drift_18s_ease-in-out_infinite_alternate]"
    >
      <rect
        x="-100"
        y="252"
        width="760"
        height="34"
        rx="17"
        className="fill-white/70"
      />
      <rect
        x="620"
        y="262"
        width="680"
        height="28"
        rx="14"
        className="fill-white/60"
      />
    </g>

    {/* Middle trees and the ground */}
    <path d={midTrees} className="fill-brand-color-500" />
    <path
      d="M0 318C200 304 380 326 600 314C820 302 1000 324 1200 312V380H0Z"
      className="fill-brand-color-400"
    />

    {/* The path, narrowing until it vanishes between the trees */}
    <path
      d="M500 380C540 352 650 348 612 326C596 317 614 309 628 304L634 306C624 313 618 320 634 328C690 352 626 362 720 380Z"
      className="fill-white/75"
    />

    {/* The signpost */}
    <g>
      <rect
        x="738"
        y="300"
        width="6"
        height="64"
        rx="2"
        className="fill-title-color-700"
      />
      <path d="M700 296h86l14 15-14 15h-86z" className="fill-white" />
      <text
        x="742"
        y="317"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-title-color-700 font-family-brand text-[17px] font-medium tracking-widest"
      >
        404
      </text>
    </g>

    {/* Near trees, framing the scene */}
    <path d={nearTrees} className="fill-title-color-700" />

    {/* Front mist */}
    <g
      filter="url(#forest-blur)"
      className="motion-safe:animate-[mist-drift_24s_ease-in-out_infinite_alternate-reverse]"
    >
      <rect
        x="180"
        y="346"
        width="840"
        height="30"
        rx="15"
        className="fill-white/50"
      />
    </g>
  </svg>
);
