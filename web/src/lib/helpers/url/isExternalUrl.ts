export const isExternalUrl = (url: string): boolean =>
  !(url.startsWith("/") || url.startsWith("./"));
