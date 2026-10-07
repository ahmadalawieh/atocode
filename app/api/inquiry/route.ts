import { NextRequest, NextResponse } from "next/server";

const recent = new Map<string, number>();
const MAX_AGE = 60_000;

function validString(value: unknown, min: number, max: number) {
  return typeof value === "string" && value.trim().length >= min && value.length <= max;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.company_website) return NextResponse.json({ ok: true });
  const type = body.type;
  if (!["audit", "project", "checklist"].includes(String(type)) || !validString(body.name, 2, 100) || !validString(body.email, 5, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email)) || (type !== "checklist" && !validString(body.message, 10, 3000))) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  if (type === "audit" && !body.website) return NextResponse.json({ error: "Please add your website URL for the audit." }, { status: 400 });
  if (body.website && (!validString(body.website, 8, 300) || !/^https?:\/\//i.test(String(body.website)))) return NextResponse.json({ error: "Enter a full website URL." }, { status: 400 });

  // Best-effort per-instance throttle; use a shared store for multi-instance production limits.
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  if (recent.size > 1000) for (const [ip, time] of recent) if (now - time > MAX_AGE) recent.delete(ip);
  if (now - (recent.get(key) || 0) < MAX_AGE) return NextResponse.json({ error: "Please wait a minute before sending another request." }, { status: 429 });
  recent.set(key, now);

  const endpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mzdwydpa";
  const form = new URLSearchParams();
  for (const field of ["name", "email", "website", "message", "type"]) if (body[field]) form.set(field, String(body[field]));
  form.set("_subject", `ATOCODE ${type} request from ${String(body.name)}`);
  try {
    const result = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" }, body: form.toString(), cache: "no-store" });
    if (!result.ok) { recent.delete(key); return NextResponse.json({ error: "Delivery failed. Please email Ahmad directly." }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch {
    recent.delete(key);
    return NextResponse.json({ error: "Delivery is unavailable. Please email Ahmad directly." }, { status: 502 });
  }
}
