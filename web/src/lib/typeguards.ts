export type UrlRelativePath = `/${string}`;

export const isUrlRelativePath = (v: string): v is UrlRelativePath =>
  typeof (v as unknown) === "string" && v.startsWith("/");
