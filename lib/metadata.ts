import type { Metadata } from "next";
import { getPageKind, localizePost, localizeProject, posts, projects, siteUrl } from "./content";

const titles: Record<string, string> = { home: "Ahmad Alawieh | Independent web developer", work: "Selected work", services: "Website services", hire: "Résumé and engineering work", audit: "Free website audit", blog: "Journal", about: "About Ahmad", contact: "Contact", privacy: "Privacy", checklist: "Website launch checklist" };
const descriptions: Record<string, string> = { home: "Ahmad Alawieh builds clear, maintainable websites and custom tools for businesses ready to grow.", work: "Explore websites and web tools built by Ahmad Alawieh.", services: "Website launches, improvements, WooCommerce, bilingual builds, and ongoing care.", hire: "Ahmad Alawieh's engineering experience, stack, selected work, and résumé.", audit: "Request a short, practical website audit from Ahmad Alawieh.", blog: "Practical notes on websites, e-commerce, design, and delivery.", about: "Meet Ahmad Alawieh, independent developer behind ATOCODE.", contact: "Contact Ahmad Alawieh about a website or web-tool project.", privacy: "How ATOCODE handles inquiries and optional analytics.", checklist: "A practical website launch checklist for small businesses." };
const arTitles: Record<string, string> = { home: "أحمد علاويه | مطوّر ويب مستقل", work: "الأعمال", services: "خدمات المواقع", hire: "الخبرة والسيرة الذاتية", audit: "تدقيق موقع مجاني", blog: "المدونة", about: "عن أحمد", contact: "التواصل", privacy: "الخصوصية", checklist: "قائمة إطلاق الموقع" };
const arDescriptions: Record<string, string> = { home: "أبني مواقع وأدوات ويب واضحة وسهلة الإدارة للشركات التي تريد التقدّم.", work: "تعرّف على مواقع وأدوات ويب بناها أحمد علاويه.", services: "إطلاق مواقع وتحسينها ومتاجر WooCommerce ومواقع بلغتين ومتابعة مستمرة.", hire: "خبرة أحمد علاويه التقنية وأعماله المختارة وسيرته الذاتية.", audit: "اطلب مراجعة عملية ومختصرة لموقعك.", blog: "مقالات عملية عن المواقع والمتاجر والتصميم وطريقة العمل.", about: "تعرّف على أحمد علاويه، المطوّر المستقل خلف ATOCODE.", contact: "تواصل مع أحمد علاويه بشأن موقع أو أداة ويب.", privacy: "كيف يتعامل ATOCODE مع الرسائل والتحليلات الاختيارية.", checklist: "قائمة عملية قبل إطلاق موقع شركتك." };

export function pageMetadata(locale: "en" | "ar", segments: string[]): Metadata {
  const kind = getPageKind(segments);
  const sourceProject = kind === "project" ? projects.find((p) => p.slug === segments[1]) : undefined;
  const sourcePost = kind === "post" ? posts.find((p) => p.slug === segments[1]) : undefined;
  const project = sourceProject ? localizeProject(sourceProject, locale) : undefined;
  const post = sourcePost ? localizePost(sourcePost, locale) : undefined;
  const title = project ? `${project.name} ${locale === "ar" ? "| دراسة مشروع" : "case study"}` : post ? post.title : (locale === "ar" ? arTitles : titles)[kind] || "Page not found";
  const description = project ? project.built : post ? post.summary : (locale === "ar" ? arDescriptions : descriptions)[kind] || "";
  const path = segments.length ? `/${segments.join("/")}` : "";
  const canonical = `${siteUrl}${locale === "ar" ? "/ar" : ""}${path || "/"}`;
  return { title: kind === "home" ? { absolute: title } : title, description, alternates: { canonical, languages: { en: `${siteUrl}${path || "/"}`, ar: `${siteUrl}/ar${path || "/"}` } }, openGraph: { title, description, url: canonical, images: [`/og/${kind === "project" || kind === "post" ? segments[1] : kind}.png`] }, twitter: { card: "summary_large_image", title, description } };
}
