"use client";

import { useState } from "react";

export default function InquiryForm({ type = "audit", locale = "en" }: { type?: "audit" | "project" | "checklist"; locale?: "en" | "ar" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const ar = locale === "ar";
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, type }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      setStatus("success");
      setMessage(ar ? "وصلت رسالتك. سأردّ عليك قريباً." : "Thanks. Your request is in, and I'll reply by email.");
      if ("plausible" in window) (window as Window & { plausible: (name: string) => void }).plausible(type === "checklist" ? "checklist_signup" : "form_submit");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send the request.");
    }
  }
  return <form className="inquiry-form" onSubmit={submit} noValidate={false}>
    <div className="field-grid"><label>{ar ? "الاسم" : "Name"}<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label><label>{ar ? "البريد الإلكتروني" : "Email"}<input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div>
    {type !== "checklist" ? <><label>{type === "audit" ? (ar ? "رابط الموقع" : "Website URL") : (ar ? "رابط الموقع (اختياري)" : "Website (optional)")}<input name="website" type="url" inputMode="url" placeholder="https://" required={type === "audit"} maxLength={300} /></label><label>{ar ? "ما الذي تحتاجه؟" : "What do you need?"}<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder={ar ? "أخبرني عن الموقع أو المشروع" : "A few lines about the site or project"} /></label></> : null}
    <div className="honeypot" aria-hidden="true"><label>Leave this blank<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" disabled={status === "sending"} type="submit">{status === "sending" ? (ar ? "جارٍ الإرسال…" : "Sending…") : type === "checklist" ? (ar ? "أرسل القائمة" : "Send me the checklist") : (ar ? "أرسل الطلب" : "Send request")} <span aria-hidden="true">↗</span></button>
    <p role="status" aria-live="polite" className={status === "error" ? "form-message error" : "form-message"}>{message}</p>
  </form>;
}
