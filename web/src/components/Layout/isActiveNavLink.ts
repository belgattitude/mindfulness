import type { MainNavLinks } from "@/config/site.config";

/** Whether a menu link matches the current path (shared by the menus) */
export const isActiveNavLink = (
  currentPath: string,
  link: Pick<MainNavLinks[number], "href" | "activeMenu">
): boolean => {
  if (currentPath === "/") {
    return link.href === "/";
  }
  const activePaths = Array.isArray(link.activeMenu)
    ? link.activeMenu
    : [link.href];
  return activePaths.some(
    (activePath) => link.href !== "/" && currentPath.startsWith(activePath)
  );
};
