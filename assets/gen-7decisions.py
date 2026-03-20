#!/usr/bin/env python3
"""Generate '7 Decisions That Determine If You Scale or Stall' PDF for Syncovate."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
import os

# Brand colors
CHARCOAL = HexColor("#252830")
BRONZE = HexColor("#C4935A")
OFFWHITE = HexColor("#FAF8F5")
MUTED = HexColor("#B0ADA8")
DARK_SURFACE = HexColor("#2E313A")

OUTPUT = os.path.join(os.path.dirname(__file__), "7-decisions-scale-or-stall.pdf")
W, H = letter

body_style = ParagraphStyle(
    'Body', fontName='Helvetica', fontSize=11, leading=16,
    textColor=OFFWHITE, alignment=TA_LEFT
)
body_small = ParagraphStyle(
    'BodySmall', fontName='Helvetica', fontSize=10, leading=15,
    textColor=OFFWHITE, alignment=TA_LEFT
)
trap_style = ParagraphStyle(
    'Trap', fontName='Helvetica', fontSize=10, leading=15,
    textColor=OFFWHITE, alignment=TA_LEFT
)


def draw_bg(c):
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def draw_bronze_line(c, x, y, width):
    c.setStrokeColor(BRONZE)
    c.setLineWidth(1.5)
    c.line(x, y, x + width, y)


def page_cover(c):
    draw_bg(c)
    draw_bronze_line(c, 1 * inch, H - 2.5 * inch, 4 * inch)

    c.setFont("Times-Roman", 30)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, H - 3.15 * inch, "7 Decisions That")
    c.drawString(1 * inch, H - 3.65 * inch, "Determine If You")
    c.drawString(1 * inch, H - 4.15 * inch, "Scale or Stall")

    c.setFont("Times-Italic", 16)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, H - 4.85 * inch, "The choices nobody tells you about")
    c.drawString(1 * inch, H - 5.15 * inch, "between 25 and 75 employees.")

    c.setFont("Helvetica", 11)
    c.setFillColor(MUTED)
    c.drawString(1 * inch, H - 5.85 * inch, "You're making these decisions right now \u2014 whether you know it or not.")

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

    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "INTRODUCTION")
    y -= 0.15 * inch
    draw_bronze_line(c, 1 * inch, y, 4.5 * inch)
    y -= 0.6 * inch

    c.setFont("Times-Roman", 22)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, "You're in the Builder Stage.")
    y -= 0.25 * inch
    c.setFont("Times-Italic", 22)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "That's the best and worst place to be.")
    y -= 0.7 * inch

    paras = [
        "You took the Scotoma Spotter and landed in the Builder stage. That means you're big enough to need real systems but still small enough to build them right. Most founders miss this window entirely.",
        "Between 25 and 75 employees, there are seven decisions that quietly determine whether your business scales smoothly or hits a wall you didn't see coming. You're making these decisions right now \u2014 most of them by default, not by design.",
        "The founders who stall aren't less talented. They just didn't realize which decisions were load-bearing until something broke.",
        "This guide names each one, shows you what happens when you get it wrong, and gives you a question to pressure-test where you actually stand."
    ]

    text_width = W - 2 * inch
    for para_text in paras:
        p = Paragraph(para_text, body_style)
        pw, ph = p.wrap(text_width, 500)
        if y - ph < 1 * inch:
            break
        p.drawOn(c, 1 * inch, y - ph)
        y -= ph + 10


def page_decision(c, num, title, what, wrong, question):
    draw_bg(c)
    y = H - 1.5 * inch
    text_width = W - 2 * inch

    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, f"DECISION {num} OF 7")
    y -= 0.15 * inch
    draw_bronze_line(c, 1 * inch, y, 4.5 * inch)
    y -= 0.6 * inch

    c.setFont("Times-Roman", 24)
    c.setFillColor(OFFWHITE)
    # Handle long titles
    if len(title) > 38:
        words = title.split()
        mid = len(words) // 2
        line1 = ' '.join(words[:mid])
        line2 = ' '.join(words[mid:])
        c.drawString(1 * inch, y, line1)
        y -= 0.35 * inch
        c.drawString(1 * inch, y, line2)
    else:
        c.drawString(1 * inch, y, title)
    y -= 0.6 * inch

    # What this decision is
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "THE DECISION")
    y -= 0.35 * inch

    p = Paragraph(what, body_style)
    pw, ph = p.wrap(text_width, 300)
    p.drawOn(c, 1 * inch, y - ph)
    y -= ph + 0.35 * inch

    # What goes wrong
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "WHAT GOES WRONG")
    y -= 0.35 * inch

    c.setFillColor(DARK_SURFACE)
    p2 = Paragraph(wrong, trap_style)
    tw, th = p2.wrap(text_width - 0.6 * inch, 300)
    box_h = th + 0.4 * inch
    c.roundRect(1 * inch, y - box_h, text_width, box_h, 6, fill=1, stroke=0)
    p2.drawOn(c, 1 * inch + 0.3 * inch, y - box_h + 0.2 * inch)
    y -= box_h + 0.35 * inch

    # The question
    c.setFont("Helvetica", 9)
    c.setFillColor(BRONZE)
    c.drawString(1 * inch, y, "THE HONEST QUESTION")
    y -= 0.35 * inch

    # Question in italics with bronze left border
    c.setStrokeColor(BRONZE)
    c.setLineWidth(2)
    q_p = Paragraph(f'<i>{question}</i>', ParagraphStyle(
        'Q', fontName='Times-Italic', fontSize=12, leading=18,
        textColor=OFFWHITE, alignment=TA_LEFT
    ))
    qw, qh = q_p.wrap(text_width - 0.5 * inch, 200)
    c.line(1 * inch, y + 2, 1 * inch, y - qh - 4)
    q_p.drawOn(c, 1 * inch + 0.35 * inch, y - qh)


def page_closing(c):
    draw_bg(c)
    y = H - 2 * inch

    draw_bronze_line(c, 1 * inch, y + 0.3 * inch, 4.5 * inch)

    c.setFont("Times-Roman", 22)
    c.setFillColor(OFFWHITE)
    c.drawString(1 * inch, y, "Seven Decisions. One Window.")
    y -= 0.55 * inch

    text_width = W - 2 * inch
    paras = [
        "You're making these decisions right now. The only question is whether you're making them intentionally or by default.",
        "The builder stage doesn't last forever. The patterns you set at 30 people become the operating system at 80. The informal workarounds become invisible walls. The roles you assigned on the fly become permanent structures.",
        "You don't need to get all seven right this week. But you need to know which ones are load-bearing for your business right now \u2014 and make those deliberately.",
        "If you want someone to walk through these with you \u2014 someone who's sat in the room with founders at exactly this stage and seen which decisions were the turning points \u2014 that's what the Builder's Blind Spot Scan is for."
    ]

    for para_text in paras:
        p = Paragraph(para_text, body_style)
        pw, ph = p.wrap(text_width, 300)
        p.drawOn(c, 1 * inch, y - ph)
        y -= ph + 10

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
    c.setTitle("7 Decisions That Determine If You Scale or Stall")
    c.setAuthor("Dr. Shannon Sheehan Jennings, PsyD")
    c.setSubject("The choices nobody tells you about between 25 and 75 employees")

    page_cover(c)
    c.showPage()

    page_intro(c)
    c.showPage()

    decisions = [
        {
            "num": 1,
            "title": "Who Decides What",
            "what": "At some point, you stopped being the person who does everything and became the person who decides everything. That's progress \u2014 but it's also a trap. The real decision is: which decisions stay with you, and which ones do you push down? Most founders hold too many, not because they don't trust their team, but because letting go of decisions feels like letting go of control.",
            "wrong": "Every decision queues behind your calendar. Your team stops bringing you options and starts bringing you problems \u2014 because they know you'll just decide anyway. The people who could step up don't, because there's no room. You've accidentally built an organization that can't move without you.",
            "question": "If you disappeared for two weeks, which decisions would your team make confidently \u2014 and which ones would just wait?"
        },
        {
            "num": 2,
            "title": "When to Stop Hiring for Skills and Start Hiring for Seats",
            "what": "Early on, you hire people who can do things. That's smart. But at some point you need to shift from hiring skills to filling seats \u2014 defined roles with clear ownership, authority, and accountability. This is the moment when 'we need someone who can handle X' becomes 'we need a role that owns X, and here's what that role decides.'",
            "wrong": "You end up with a collection of talented individuals who don't know where their job ends and someone else's begins. You have three people who think they own client relationships and zero people who own the process between departments. Talent without structure creates friction, not speed.",
            "question": "Could a stranger look at your team and know \u2014 without asking you \u2014 who owns what?"
        },
        {
            "num": 3,
            "title": "How Information Flows When You're Not in the Room",
            "what": "Right now, you're probably the main conduit for information. You hear something from the field, you tell the office. You get a customer complaint, you tell the team. You're the switchboard. The decision is: do you build a communication system that works without you, or do you keep being the router?",
            "wrong": "Information gets trapped in silos. The field doesn't know what the office knows. Customer-facing people make promises that operations can't keep. Problems get discovered at delivery instead of at origin. And you spend a third of your day just moving information from one person to another.",
            "question": "If something went wrong on a project today, how many phone calls would it take before the right person knew about it?"
        },
        {
            "num": 4,
            "title": "Whether to Promote Your Best Doer Into Management",
            "what": "Your best electrician, your top salesperson, your most reliable project manager \u2014 they've earned a promotion. But the skills that made them great at doing the work are not the same skills that make someone great at managing people who do the work. This is one of the most consequential decisions you'll make, and most founders get it wrong at least once.",
            "wrong": "You lose your best performer and gain a mediocre manager. The person is frustrated because they were great at their old job and struggling at the new one. Their team is frustrated because they need leadership, not a super-doer who does their work for them. And you can't demote them without it feeling like punishment.",
            "question": "Is the person you're about to promote genuinely excited about developing other people \u2014 or are they just the most deserving of a reward?"
        },
        {
            "num": 5,
            "title": "What You Measure and What You Tolerate",
            "what": "Every organization has two sets of standards: the ones on the wall and the ones that actually get enforced. The decision is whether those match. What you tolerate becomes your real standard \u2014 regardless of what you say the standard is. At 15 people, culture was you. At 50, culture is what happens when you're not in the room.",
            "wrong": "Your core values say 'accountability' but nobody gets held to it. Your standards say 'quality first' but you keep rewarding speed. Your team reads the gap between what you say and what you tolerate \u2014 and they follow the tolerance, not the talk. Over time, your best people leave because the culture isn't what they signed up for.",
            "question": "What behavior are you tolerating right now that contradicts something you say you value?"
        },
        {
            "num": 6,
            "title": "When to Fix It Right vs. Keep Moving",
            "what": "Growth creates operational debt \u2014 the workarounds, the temporary fixes, the 'we'll deal with that later' decisions. The question isn't whether you have operational debt. You do. The decision is which debts are load-bearing and which ones can wait. Get this wrong in either direction and you either stall from over-engineering or break from under-building.",
            "wrong": "You keep adding speed on top of a foundation that wasn't built for it. The spreadsheet that should be a system. The process that only works because one person remembers how. The role that three people share but nobody owns. Each one is fine on its own. Together, they're a cascade waiting to happen.",
            "question": "What's on your 'fix it later' list that would cause a real crisis if it broke tomorrow?"
        },
        {
            "num": 7,
            "title": "Who Tells You the Truth",
            "what": "The higher you go, the more filtered your information becomes. People tell you what they think you want to hear. They perform 'fine' when you ask how things are going. The decision is whether you actively build a channel for unfiltered truth \u2014 or whether you accept the curated version and hope it's close enough.",
            "wrong": "You're leading with incomplete data and you don't know it. The first sign of a relational fracture is a resignation, not a conversation. Your 'open door' policy feels open to you but not to them. And the person who would tell you the hard truth \u2014 they've been watching to see if it's actually safe to speak up. If you've never made it safe, they never will.",
            "question": "When was the last time someone on your team told you something you genuinely didn't want to hear?"
        }
    ]

    for d in decisions:
        page_decision(c, d["num"], d["title"], d["what"], d["wrong"], d["question"])
        c.showPage()

    page_closing(c)
    c.showPage()

    c.save()
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    main()
