import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog.html", destination: "/blog", statusCode: 301 },
      { source: "/checklist.html", destination: "/checklist", statusCode: 301 },
      { source: "/privacy.html", destination: "/privacy", statusCode: 301 },
      { source: "/articles/:slug.html", destination: "/blog/:slug", statusCode: 301 },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    ] }];
  },
};

export default nextConfig;
