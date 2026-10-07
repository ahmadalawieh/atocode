import type { Metadata } from "next";
import { fontClasses } from "@/components/Fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atocode.online"),
  title: { default: "أحمد علاويه | ATOCODE", template: "%s | أحمد علاويه" },
  description: "أبني مواقع وأدوات ويب واضحة وسهلة الإدارة للشركات التي تريد التقدّم.",
  openGraph: { type: "website", images: ["/og/default.png"] },
  twitter: { card: "summary_large_image" },
};

export default function ArabicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" className={fontClasses}><body>{children}</body></html>;
}
