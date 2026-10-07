from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

out = "public/resume-placeholder.pdf"
c = canvas.Canvas(out, pagesize=A4)
w, h = A4
c.setFillColor(HexColor("#0a0a0f"))
c.rect(0, 0, w, h, fill=1, stroke=0)
c.setFillColor(HexColor("#ff794f"))
c.setFont("Helvetica-Bold", 15)
c.drawString(48, h - 62, "<A/>  ATOCODE")
c.setFillColor(HexColor("#f6f3ee"))
c.setFont("Helvetica-Bold", 29)
c.drawString(48, h - 132, "Ahmad Alawieh")
c.setFont("Helvetica", 14)
c.drawString(48, h - 162, "Independent web developer")
c.setStrokeColor(HexColor("#5b5659"))
c.line(48, h - 187, w - 48, h - 187)
c.setFillColor(HexColor("#ff794f"))
c.setFont("Helvetica-Bold", 13)
c.drawString(48, h - 230, "PLACEHOLDER - NOT A COMPLETE RESUME")
c.setFillColor(HexColor("#f6f3ee"))
c.setFont("Helvetica", 11)
for i, line in enumerate([
    "This file is temporary. Verified dates, employers, education, and role history",
    "must be supplied by Ahmad before sharing it as a job application.",
    "",
    "Selected work: B1 Ventures, Kaizen Firm, Umbrella500.",
    "Focus: WordPress, WooCommerce, custom plugins, multilingual sites,",
    "React, Next.js, TypeScript, and front-end delivery.",
    "",
    "GitHub: github.com/ahmadalawieh",
    "LinkedIn: linkedin.com/in/ahmadalawieh",
    "Email: ahmad.alawieh77@gmail.com",
]):
    c.drawString(48, h - 262 - i * 22, line)
c.setFont("Helvetica", 9)
c.setFillColor(HexColor("#b9b6b2"))
c.drawString(48, 46, "ATOCODE  /  atocode.online")
c.save()
