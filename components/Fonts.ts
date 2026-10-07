import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });

export const fontClasses = `${display.variable} ${arabic.variable}`;
