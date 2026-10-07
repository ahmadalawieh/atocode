import projectsData from "@/content/projects.json";
import postsData from "@/content/posts.json";
import projectsArabic from "@/content/projects-ar.json";
import postsArabic from "@/content/posts-ar.json";

export const projects = projectsData;
export const posts = postsData;
export type Project = (typeof projects)[number];
export type Post = (typeof posts)[number];
export function localizeProject(project: Project, locale: "en" | "ar"): Project {
  if (locale === "en") return project;
  return { ...project, ...projectsArabic[project.slug as keyof typeof projectsArabic] };
}
export function localizePost(post: Post, locale: "en" | "ar"): Post {
  if (locale === "en") return post;
  return { ...post, ...postsArabic[post.slug as keyof typeof postsArabic] };
}
export const siteUrl = "https://atocode.online";

export const pathFor = (locale: "en" | "ar", path = "") => `${locale === "ar" ? "/ar" : ""}${path || "/"}`;

export function getPageKind(segments: string[]) {
  if (segments.length === 0) return "home";
  if (segments[0] === "work" && segments.length === 2 && projects.some((p) => p.slug === segments[1])) return "project";
  if (segments[0] === "blog" && segments.length === 2 && posts.some((p) => p.slug === segments[1])) return "post";
  if (segments.length === 1 && ["work", "services", "hire", "audit", "blog", "about", "contact", "privacy", "checklist"].includes(segments[0])) return segments[0];
  return "not-found";
}

export const allRoutes = [[], ...["work", "services", "hire", "audit", "blog", "about", "contact", "privacy", "checklist"].map((s) => [s]), ...projects.map((p) => ["work", p.slug]), ...posts.map((p) => ["blog", p.slug])];
