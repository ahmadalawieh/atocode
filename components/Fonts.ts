import { Cairo, Manrope } from "next/font/google";

const display = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const arabic = Cairo({ subsets: ["arabic", "latin"], weight: "variable", variable: "--font-arabic", display: "swap" });

export const fontClasses = `${display.variable} ${arabic.variable}`;
