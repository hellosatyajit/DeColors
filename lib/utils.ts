import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const WEBSITE_URL = 'https://www.chelsycosmetics.com';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
