import type { Metadata } from "next";
import { fontClasses } from "@/components/Fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atocode.online"),
  title: { default: "Ahmad Alawieh | ATOCODE", template: "%s | Ahmad Alawieh" },
  description: "Ahmad Alawieh builds clear, maintainable websites, e-commerce stores, and custom web tools for businesses.",
  openGraph: { type: "website", images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={fontClasses}><body>{children}</body></html>;
}
