import { Fira_Code, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

export const font_mono_override = IBM_Plex_Mono({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-mono-override",
  style: ["normal", "italic"],
});

export const font_sans_override = IBM_Plex_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-sans-override",
  style: ["normal", "italic"],
});

export const font_ascii = Fira_Code({
  weight: "variable",
  subsets: ["latin-ext"],
  variable: "--font-ascii",
  style: "normal",
});
