import { CSSProperties } from "react";
import { studioTheme } from "./themes/studio";
import { terracottaTheme } from "./themes/terracotta";
import { editorialTheme } from "./themes/editorial";
import { playfulTheme } from "./themes/playful";

export type ThemeName =
  | "default"
  | "fintech"
  | "saas"
  | "terracotta"
  | "studio"
  | "editorial"
  | "playful";

export interface ThemeProperties extends CSSProperties {
  [key: `--${string}`]: string | number;
}

export interface ThemeVariant {
  light: ThemeProperties;
  dark: ThemeProperties;
}

export const themes: Record<ThemeName, ThemeVariant> = {
  default: {
    light: {
      fontFamily: "var(--font-poppins)",
    },
    dark: {
      fontFamily: "var(--font-poppins)",
    },
  },
  ...playfulTheme,
  ...studioTheme,
  ...terracottaTheme,
  ...editorialTheme,
  // Add light/dark variants for fintech and saas similarly...
  fintech: {
    light: {
      fontFamily: "var(--font-roboto)",
      "--primary": "221 83% 53%",
      "--radius": "0rem",
    },
    dark: {
      fontFamily: "var(--font-roboto)",
      "--primary": "221 83% 60%",
      "--radius": "0rem",
    },
  },
  saas: {
    light: {
      fontFamily: "var(--font-montserrat)",
      "--primary": "263.87 90.29% 59.6%",
    },
    dark: {
      fontFamily: "var(--font-montserrat)",
      "--primary": "263.87 90.29% 65%",
    },
  },
};
