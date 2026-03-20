#!/usr/bin/env python3
"""Generate the Founder's Pre-Scotoma Checklist PDF for Syncovate."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
import os

# Brand colors
CHARCOAL = HexColor("#252830")
BRONZE = HexColor("#C4935A")
OFFWHITE = HexColor("#FAF8F5")
MUTED = HexColor("#B0ADA8")
DARK_SURFACE = HexColor("#2E313A")

OUTPUT = os.path.join(os.path.dirname(__file__), "founders-pre-scotoma-checklist.pdf")

W, H = letter  # 612 x 792

# Styles
heading_style = ParagraphStyle(
    'Heading', fontName='Times-Roman', fontSize=22, leading=28,
    textColor=OFFWHITE, alignment=TA_LEFT
)
body_style = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=11, leading=16,
    textColor=OFFWHITE, alignment=TA_LEFT
)
body_muted = ParagraphStyle(
    'BodyMuted', fontName='Helvetica', fontSize=10, leading=15,
    textColor=MUTED, alignment=TA_LEFT
)
small_style = ParagraphStyle(
    'Small', fontName='Helvetica', fontSize=9, leading=13,
    textColor=MUTED, alignment=TA_CENTER
)


def draw_bg(c):
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_bronze_line(c, x, y, width):
    c.setStrokeColor(BRONZE)
    c.setLineWidth(1.5)
    c.line(x, y, x + width, y)


def draw_checkbox(c, x, y, text):
    """Draw a checkbox with label. Returns height used."""
    # Box
    c.setStrokeColor(BRONZE)
    c.setLineWidth(1)
    c.rect(x, y - 2, 14, 14, fill=0, stroke=1)
    # Text
    c.setFont("Helvetica", 10.5)
    c.setFillColor(OFFWHITE)
    c.drawString(x + 22, y + 1, text)
    return 22


def page_cover(c):
    draw_bg(c)
    # Bronze accent line
    draw_bronze_line(c, 1 * inch, H - 2.5 * inch, 4 * inch)

    # Title
    c.setFont("Times-Roman", 32)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, H - 3.2 * inch, "The Founder's")
    c.drawString(1 * inch, H - 3.75 * inch, "Pre-Scotoma Checklist")

    # Subtitle
    c.setFont("Times-Italic", 18)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, H - 4.5 * inch, "5 Systems to Build Before You Need Them")

    # Tagline
    c.setFont("Helvetica", 11)
    c.setFillColor(MUTED)
    c.drawString(1 * inch, H - 5.2 * inch, "Because the habits that got you here won't get you there.")

    # Author
    draw_bronze_line(c, 1 * inch, 2.2 * inch, 2.5 * inch)
    c.setFont("Helvetica", 10)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, 1.9 * inch, "Dr. Shannon Jennings  |  Syncovate")
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED)
    c.drawString(1 * inch, 1.6 * inch, "syncovatellc.com")


def page_intro(c):
    draw_bg(c)
    y = H - 1.5 * inch

    # Page header
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "INTRODUCTION")
    y -= 0.15 * inch
    draw_bronze_line(c, 1 * inch, y, 4.5 * inch)
    y -= 0.6 * inch

    c.setFont("Times-Roman", 22)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, "You're Ahead of the Pattern.")
    y -= 0.2 * inch
    c.setFont("Times-Italic", 22)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "Keep it that way.")
    y -= 0.7 * inch

    paras = [
        "You took the Scotoma Spotter and scored Early. That's good news. It means you can still see most of what's happening in your business. You know your people, you know your numbers, and when something shifts, you feel it.",
        "That advantage has an expiration date.",
        "Every founder I've worked with who hit a wall at 50 people tells me the same thing: \"I wish I'd built this when I was small enough to do it right.\" The systems that protect your visibility don't build themselves. And by the time you need them, you're too busy fighting fires to create them.",
        "This checklist is the five things they wish they'd known. Not theory. Not frameworks. Five specific systems you can start building this week \u2014 while you're still small enough to get them right the first time.",
        "Each one takes less than an hour to start. None of them require a consultant. All of them will save you from becoming the bottleneck you swore you'd never be."
    ]

    text_width = W - 2 * inch
    for para_text in paras:
        p = Paragraph(para_text, body_style)
        pw, ph = p.wrap(text_width, 500)
        if y - ph < 1 * inch:
            break
        p.drawOn(c, 1 * inch, y - ph)
        y -= ph + 10


def page_system(c, num, name, why, trap, actions, checks):
    draw_bg(c)
    y = H - 1.5 * inch
    text_width = W - 2 * inch

    # System number
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, f"SYSTEM {num} OF 5")
    y -= 0.15 * inch
    draw_bronze_line(c, 1 * inch, y, 4.5 * inch)
    y -= 0.6 * inch

    # Name
    c.setFont("Times-Roman", 24)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, name)
    y -= 0.6 * inch

    # Why it matters
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "WHY IT MATTERS")
    y -= 0.35 * inch

    p = Paragraph(why, body_style)
    pw, ph = p.wrap(text_width, 300)
    p.drawOn(c, 1 * inch, y - ph)
    y -= ph + 0.35 * inch

    # The founder trap
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "THE FOUNDER TRAP")
    y -= 0.35 * inch

    # Trap box
    c.setFillColor(DARK_SURFACE)
    trap_p = Paragraph(trap, body_style)
    tw, th = trap_p.wrap(text_width - 0.6 * inch, 300)
    box_h = th + 0.4 * inch
    c.roundRect(1 * inch, y - box_h, text_width, box_h, 6, fill=1, stroke=0)
    trap_p.drawOn(c, 1 * inch + 0.3 * inch, y - box_h + 0.2 * inch)
    y -= box_h + 0.35 * inch

    # Build it now
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "BUILD IT NOW")
    y -= 0.4 * inch

    for check_text in checks:
        h_used = draw_checkbox(c, 1 * inch, y, check_text)
        y -= h_used


def page_closing(c):
    draw_bg(c)
    y = H - 2 * inch

    draw_bronze_line(c, 1 * inch, y + 0.3 * inch, 4.5 * inch)

    c.setFont("Times-Roman", 22)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, "You Don't Need a Consultant Yet.")
    y -= 0.55 * inch

    text_width = W - 2 * inch
    paras = [
        "But you do need these systems before the blind spots form.",
        "If you build them now, you'll be one of the rare founders who scales without hitting the wall. Not because you were smarter or luckier \u2014 but because you were intentional about the architecture while you could still see the whole picture.",
        "The founders who navigate the next stage well are the ones who build before they need to. You're doing that right now.",
        "When you're ready for an outside eye \u2014 someone who can see what proximity and familiarity hide \u2014 that's what Syncovate is for."
    ]

    for para_text in paras:
        p = Paragraph(para_text, body_style)
        pw, ph = p.wrap(text_width, 300)
        p.drawOn(c, 1 * inch, y - ph)
        y -= ph + 12

    y -= 0.3 * inch
    draw_bronze_line(c, 1 * inch, y, 3 * inch)
    y -= 0.5 * inch

    c.setFont("Helvetica", 11)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "syncovatellc.com")
    y -= 0.3 * inch

    c.setFont("Helvetica", 10)
    c.setFillColor(MUTED)
    c.drawString(1 * inch, y, "Take the Scotoma Spotter:")
    y -= 0.25 * inch
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, "spotter.syncovatellc.com")

    y -= 0.8 * inch
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED)
    c.drawString(1 * inch, y, "\u00a9 2026 Syncovate LLC  |  Niles, Michigan")


def main():
    c = canvas.Canvas(OUTPUT, pagesize=letter)
    c.setTitle("The Founder's Pre-Scotoma Checklist")
    c.setAuthor("Dr. Shannon Sheehan Jennings, PsyD")
    c.setSubject("5 Systems to Build Before You Need Them")

    # Page 1: Cover
    page_cover(c)
    c.showPage()

    # Page 2: Intro
    page_intro(c)
    c.showPage()

    # Pages 3-7: Systems
    systems = [
        {
            "num": 1, "name": "The Decision Map",
            "why": "Right now, you make most decisions because you're the fastest and best-informed person in the room. That works at 10 people. At 30, every decision that queues behind your calendar costs the business hours of waiting time \u2014 and your team stops even trying to make the call on their own.",
            "trap": "Everything runs through you. Your calendar becomes the bottleneck. Your best people stop bringing you problems \u2014 not because there aren't any, but because they assume you'll just handle it yourself. You've accidentally trained the whole operation to wait for permission.",
            "checks": [
                "List every decision someone brought to you this week",
                "Sort into: Must stay with me / Hand off with guardrails / Should have handed off months ago",
                "Hand one item from the third column to someone this week",
                "Write down the guardrails so they know the boundaries"
            ]
        },
        {
            "num": 2, "name": "The Communication Cadence",
            "why": "Information in your company currently flows through you. You're the router, the translator, and the switchboard. That means nothing moves when you're not in the room \u2014 and your team only knows what you remember to tell them.",
            "trap": "You become the single point of failure for information flow. Things fall through cracks not because people aren't paying attention, but because the information never reached them. You hear about problems after they've already become expensive.",
            "checks": [
                "Set a weekly 30-minute team huddle (same time, same day, every week)",
                "Create a simple format: What's working / What's stuck / What do you need from me",
                "Commit to it for 8 weeks before judging whether it's working",
                "Stop being the person who forwards information \u2014 let the huddle do it"
            ]
        },
        {
            "num": 3, "name": "The Role Handshake",
            "why": "Job descriptions describe qualifications. Role handshakes describe reality: what this person owns, what they decide, where their authority ends, and what comes back to you. Without them, you get overlapping efforts, dropped balls, and the slow drain of 'I thought you were handling that.'",
            "trap": "Roles were assigned on the fly as you grew. Nobody wrote anything down because everyone just knew. Now you have three people who think they own the same thing, two things nobody owns, and a key person doing a job their title doesn't describe. The informal structure becomes invisible walls.",
            "checks": [
                "Pick your three most critical roles (not titles \u2014 roles)",
                "For each: write what they OWN, what they DECIDE, what comes to YOU",
                "Sit down with each person and align on the handshake",
                "Revisit every 6 months as the business changes"
            ]
        },
        {
            "num": 4, "name": "The Feedback Loop",
            "why": "The higher you go, the more filtered your information becomes. People perform 'fine' for leadership. They save the real conversation for each other \u2014 or for their next employer. Without a deliberate feedback loop, you're leading with incomplete data and you don't know it.",
            "trap": "Everyone says 'things are fine' and you believe them. The first sign of trouble is a resignation letter, not a conversation. By the time the relational fracture becomes visible to you, it's been spreading for months. Your open-door policy feels open to you. It doesn't feel open to them.",
            "checks": [
                "Ask one trusted person: 'What's the one thing people aren't saying out loud?'",
                "Create a monthly anonymous pulse check (3 questions max, keep it simple)",
                "When you hear something hard, take one visible action within 48 hours",
                "Stop asking 'How's everything going?' \u2014 ask 'What's the hardest part of your job right now?'"
            ]
        },
        {
            "num": 5, "name": "The Succession Seed",
            "why": "Even at 15 people, you need someone who could run things if you stepped away for a week. Not because you're planning to leave \u2014 but because a business that can't survive without you isn't a business. It's a job with your name on the building.",
            "trap": "You can't take a vacation without your phone blowing up. Every emergency routes to you because nobody else has the context or authority to handle it. You tell yourself you'll 'start developing people when things slow down' \u2014 but things never slow down when everything runs through one person.",
            "checks": [
                "Identify one person who could cover for you for 48 hours",
                "Start sharing context with them: why you make the decisions you make, not just what",
                "Give them one real decision to own this month \u2014 and resist checking on it",
                "Book one day off in the next 30 days and actually take it"
            ]
        }
    ]

    for sys in systems:
        page_system(c, sys["num"], sys["name"], sys["why"], sys["trap"], [], sys["checks"])
        c.showPage()

    # Page 8: Closing
    page_closing(c)
    c.showPage()

    c.save()
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    main()
