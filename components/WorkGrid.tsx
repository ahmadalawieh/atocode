"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { pathFor } from "@/lib/content";

const filters = ["All", "WordPress", "WooCommerce", "Bilingual/RTL", "Custom plugin", "Front-end app"];

export default function WorkGrid({ projects, locale }: { projects: Project[]; locale: "en" | "ar" }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));
  return <><div className="filter-row" role="group" aria-label="Filter projects">{filters.map((filter) => <button type="button" key={filter} onClick={() => setActive(filter)} aria-pressed={active === filter} className={active === filter ? "filter active" : "filter"}>{filter}</button>)}</div><div className="project-grid">{filtered.map((project) => <article className="project-card" key={project.slug}><Link href={pathFor(locale, `/work/${project.slug}`)} className="project-image"><div className="browser-bar"><span/><span/><span/><small>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</small></div><Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></Link><div className="project-copy"><span className="eyebrow">{project.sector} / {project.tags.join(" · ")}</span><h2><Link href={pathFor(locale, `/work/${project.slug}`)}>{project.name}</Link></h2><p>{project.problem}</p><p className="project-built">{project.built}</p><Link className="text-link" href={pathFor(locale, `/work/${project.slug}`)}>{locale === "ar" ? "تفاصيل المشروع" : "View case study"} <span aria-hidden="true">↗</span></Link></div></article>)}</div>{filtered.length === 0 ? <p className="empty-state">{locale === "ar" ? "لا توجد مشاريع مؤكدة ضمن هذا التصنيف بعد." : "No confirmed projects in this category yet."}</p> : null}</>;
}
