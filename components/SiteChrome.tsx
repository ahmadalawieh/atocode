import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import TrackLink from "./TrackLink";
import { pathFor } from "@/lib/content";

export default function SiteChrome({ locale, currentPath, children }: { locale: "en" | "ar"; currentPath: string; children: React.ReactNode }) {
  const ar = locale === "ar";
  const nav = ar ? [["/work", "الأعمال"], ["/services", "الخدمات"], ["/about", "عنّي"], ["/blog", "المدونة"], ["/hire", "للتوظيف"]] : [["/work", "Work"], ["/services", "Services"], ["/about", "About"], ["/blog", "Journal"], ["/hire", "For hiring"]];
  const alternate = ar ? currentPath || "/" : `/ar${currentPath || ""}`;
  const analytics = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return <div className="site-shell" lang={locale} dir={ar ? "rtl" : "ltr"}>
    <a className="skip-link" href="#main">{ar ? "تخطّ إلى المحتوى" : "Skip to content"}</a>
    <header className="site-header"><div className="header-inner">
      <Link className="wordmark" href={pathFor(locale)} aria-label="ATOCODE home"><Image src="/brand-mark.svg" alt="" width={26} height={26} /><span>ATOCODE</span></Link>
      <nav className="primary-nav" aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}>{nav.map(([path, name]) => <Link key={path} href={pathFor(locale, path)}>{name}</Link>)}</nav>
      <details className="mobile-nav"><summary>{ar ? "القائمة" : "Menu"}</summary><nav aria-label={ar ? "التنقل على الهاتف" : "Mobile navigation"}>{nav.map(([path, name]) => <Link key={path} href={pathFor(locale, path)}>{name}</Link>)}</nav></details>
      <div className="header-actions"><Link className="lang-link" href={alternate} hrefLang={ar ? "en" : "ar"} aria-label={ar ? "English" : "العربية"}>{ar ? "EN" : "عربي"}</Link><TrackLink href={pathFor(locale, "/audit")} event="audit_cta" className="button button-small">{ar ? "تدقيق مجاني" : "Get a free audit"}<span aria-hidden="true">↗</span></TrackLink></div>
    </div></header>
    <main id="main">{children}</main>
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Link href={pathFor(locale)} className="wordmark"><Image src="/brand-mark.svg" alt="" width={26} height={26} /><span>ATOCODE</span></Link><p>{ar ? "مواقع وتطبيقات ويب يبنيها أحمد علاويه." : "Websites and web tools built by Ahmad Alawieh."}</p></div>
        <div className="footer-links"><Link href={pathFor(locale, "/work")}>{ar ? "الأعمال" : "Work"}</Link><Link href={pathFor(locale, "/services")}>{ar ? "الخدمات" : "Services"}</Link><Link href={pathFor(locale, "/checklist")}>{ar ? "قائمة الإطلاق" : "Launch checklist"}</Link><Link href={pathFor(locale, "/contact")}>{ar ? "التواصل" : "Contact"}</Link><Link href={pathFor(locale, "/privacy")}>{ar ? "الخصوصية" : "Privacy"}</Link></div>
        <div className="footer-links"><a href="https://github.com/ahmadalawieh" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/ahmadalawieh" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:ahmad.alawieh77@gmail.com">ahmad.alawieh77@gmail.com</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} ATOCODE / Ahmad Alawieh</span><span>Beirut, Lebanon · {ar ? "أعمل مع عملاء حول العالم" : "Working across borders"}</span></div>
    </footer>
    <aside aria-label={ar ? "تواصل سريع" : "Quick contact"}><a className="whatsapp" href="https://wa.me/96170332361?text=Hi%20Ahmad%2C%20I%27d%20like%20to%20discuss%20a%20website%20project." target="_blank" rel="noopener noreferrer" aria-label={ar ? "راسلني عبر واتساب" : "Message Ahmad on WhatsApp"} title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9.2 9.2 0 0 1-4-.9L3 21l1.9-5.5a9.2 9.2 0 0 1-.9-4A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z"/><path d="M9 8.8c.2 2.5 2.1 4.5 4.7 5l1.2-1.1 2 1.1c-.7 1.8-2 2.1-3.8 1.5a9 9 0 0 1-4.5-4.1C8 9.5 8.3 8 9 8.8Z"/></svg></a></aside>
    {analytics ? <><Script defer data-domain={analytics} src="https://plausible.io/js/script.js" strategy="afterInteractive" /><Script id="atocode-events" strategy="afterInteractive">{`document.addEventListener('click',function(e){var a=e.target.closest('[data-track]');if(a&&window.plausible)window.plausible(a.dataset.track)})`}</Script></> : null}
  </div>;
}
