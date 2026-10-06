import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Router base derived from Vite's `base` (e.g. "/repo-name" on GitHub Pages, "" locally). */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix root-relative asset paths ("/images/a.jpg") with the deploy base. */
export const withBase = (path: string) => (path.startsWith("/") && !path.startsWith("//") ? BASE_PATH + path : path);
