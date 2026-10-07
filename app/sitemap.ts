import type { MetadataRoute } from "next";
import { allRoutes, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.flatMap((route) => {
    const path = route.length ? `/${route.join("/")}` : "/";
    return ["", "/ar"].map((prefix) => ({ url: `${siteUrl}${prefix}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route.length === 0 ? 1 : 0.6 }));
  });
}
