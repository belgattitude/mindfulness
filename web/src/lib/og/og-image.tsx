/* oxlint-disable nextjs/no-img-element -- satori renders these <img> into a png, not a page */
import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";
import sharp from "sharp";

import { siteConfig } from "@/config/site.config";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiMedia } from "@/lib/strapi/getStrapiMedia";

/** The size Facebook, LinkedIn and X expect (1.91:1), as the routes export */
const ogImageSize = { width: 1200, height: 630 };

// The theme colors (tailwind.config.cjs): satori takes inline styles only
const colors = {
  brand50: "hsl(150, 27%, 92%)",
  brand400: "hsl(150, 27%, 78%)",
  title600: "hsl(159, 30%, 40%)",
  title800: "hsl(159, 30%, 30%)",
  navTitle: "#34695d",
  text: "#404040",
};

// Read once per server, shared by every image. Literal paths: a dynamic one
// would make the build trace (and deploy) the whole project
const assets = Promise.all([
  readFile(
    path.join(
      process.cwd(),
      "assets/fonts/cormorant-garamond-latin-500-normal.woff"
    )
  ),
  readFile(
    path.join(
      process.cwd(),
      "assets/fonts/plus-jakarta-sans-latin-400-normal.woff"
    )
  ),
  readFile(
    path.join(
      process.cwd(),
      "assets/fonts/plus-jakarta-sans-latin-500-normal.woff"
    )
  ),
  readFile(path.join(process.cwd(), "public/logo/logo-sandrine.svg")),
]);

/** satori embeds jpeg and png only: webp media render blank, converted */
const supportedImageTypes = new Set(["image/jpeg", "image/png"]);

/** An image as a data url, null when it cannot be embedded */
export const fetchImageDataUrl = async (
  url: string | null
): Promise<string | null> => {
  if (url === null) {
    return null;
  }
  try {
    const response = await fetch(url);
    const type = response.headers.get("content-type")?.split(";")[0] ?? "";
    if (!response.ok) {
      return null;
    }
    const data = Buffer.from(await response.arrayBuffer());
    if (supportedImageTypes.has(type)) {
      return `data:${type};base64,${data.toString("base64")}`;
    }
    if (type === "image/webp") {
      const png = await sharp(data).png().toBuffer();
      return `data:image/png;base64,${png.toString("base64")}`;
    }
    return null;
  } catch {
    return null;
  }
};

type StrapiImage = StrapiMedia & {
  width?: number | null;
  height?: number | null;
  formats?: unknown;
};

/**
 * The image of a strapi media, its large or medium format when there is one
 * (lighter than the original), and whether it is a portrait (a poster, shown
 * whole instead of cropped)
 */
export const getStrapiOgImage = async (
  media: StrapiImage | null | undefined
): Promise<{ src: string; portrait: boolean } | null> => {
  if (!media) {
    return null;
  }
  const formats = (media.formats ?? {}) as Record<string, StrapiMedia>;
  const src = await fetchImageDataUrl(
    getStrapiMedia(formats.large ?? formats.medium ?? media)
  );
  if (src === null) {
    return null;
  }
  const { width, height } = media;
  return { src, portrait: Boolean(width && height && height >= width * 0.95) };
};

interface OgImageProps {
  /** What the page is: "Agenda", "Programme"… */
  eyebrow?: string | undefined;
  title: string;
  /** A short line under the title: dates, place… */
  subtitle?: string | undefined;
  image?: { src: string; portrait: boolean } | null | undefined;
}

/** Long titles get a smaller font to stay within three lines */
const getTitleSize = (title: string, hasImage: boolean) => {
  const length = title.length * (hasImage ? 1.35 : 1);
  if (length > 90) {
    return 48;
  }
  if (length > 60) {
    return 58;
  }
  return 70;
};

const getHost = () => {
  try {
    // Branding: the public domain, also on a preview deployment
    return new URL(siteConfig.canonicalUrl).host.replace(/^www\./u, "");
  } catch {
    return null;
  }
};

/**
 * The shared image of a page (open graph): the site look, the page title and
 * its cover. Used by the opengraph-image routes.
 */
export const renderOgImage = async (props: OgImageProps) => {
  const { eyebrow, title, subtitle, image } = props;
  const [cormorant, jakarta, jakartaMedium, logo] = await assets;
  const host = getHost();
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 48,
        gap: 48,
        backgroundColor: colors.brand400,
        backgroundImage: `radial-gradient(circle at 28% 35%, ${colors.brand50} 0%, ${colors.brand400} 70%)`,
        fontFamily: "Jakarta",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "8px 0 8px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img
            src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
            width={64}
            height={62}
            alt=""
          />
          <span style={{ color: colors.navTitle, fontSize: 30 }}>
            {siteConfig.metadata.siteTitle}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {eyebrow && (
            <span
              style={{
                color: colors.title600,
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </span>
          )}
          <span
            style={{
              color: colors.title800,
              fontFamily: "Cormorant",
              fontSize: getTitleSize(title, Boolean(image)),
              lineHeight: 1.08,
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span style={{ color: colors.text, fontSize: 26, lineHeight: 1.4 }}>
              {subtitle}
            </span>
          )}
        </div>

        <span style={{ color: colors.navTitle, fontSize: 22, opacity: 0.8 }}>
          {host ?? ""}
        </span>
      </div>

      {image && (
        <div
          style={{
            display: "flex",
            width: image.portrait ? 420 : 500,
            height: "100%",
            borderRadius: 32,
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
            boxShadow: "0 18px 40px rgba(30, 70, 55, 0.18)",
          }}
        >
          <img
            src={image.src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: image.portrait ? "contain" : "cover",
            }}
          />
        </div>
      )}
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { name: "Cormorant", data: cormorant, weight: 500, style: "normal" },
        { name: "Jakarta", data: jakarta, weight: 400, style: "normal" },
        { name: "Jakarta", data: jakartaMedium, weight: 500, style: "normal" },
      ],
    }
  );
};

/** The site link preview, also used when a page item is not found */
export const renderDefaultOgImage = async () => {
  const portrait = await readFile(
    path.join(process.cwd(), "public/images/sandrine-portrait.jpg")
  );
  return renderOgImage({
    title: "Méditation, yoga et dialogue conscient",
    subtitle: "Cours, programmes, stages et retraites, en personne et en ligne",
    image: {
      src: `data:image/jpeg;base64,${portrait.toString("base64")}`,
      // A landscape photo: cropped to fill the frame, the face stays centered
      portrait: false,
    },
  });
};
