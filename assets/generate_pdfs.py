#!/usr/bin/env python3
"""Generate Scotoma Spotter lead magnet PDFs with updated visual treatment."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Frame, PageTemplate, BaseDocTemplate
)
from reportlab.pdfgen import canvas
import os

# ── COLORS ──
CHARCOAL = HexColor('#2D3039')
BRONZE = HexColor('#C4935A')
CREAM = HexColor('#FAF8F5')
LIGHT_GRAY = HexColor('#F0EEEB')
MUTED = HexColor('#888888')
DARK_BG = HexColor('#2D3039')
WHITE = white

PAGE_W, PAGE_H = letter
MARGIN = 72  # 1 inch

# ── STYLES ──
def make_styles(is_cover=False):
    text_color = WHITE if is_cover else CHARCOAL
    styles = {}

    styles['title'] = ParagraphStyle(
        'title', fontName='Times-Roman', fontSize=36, leading=42,
        textColor=text_color, spaceAfter=12
    )
    styles['subtitle'] = ParagraphStyle(
        'subtitle', fontName='Times-Italic', fontSize=16, leading=22,
        textColor=BRONZE, spaceAfter=16
    )
    styles['tagline'] = ParagraphStyle(
        'tagline', fontName='Helvetica', fontSize=11, leading=16,
        textColor=HexColor('#999999') if is_cover else HexColor('#666666'), spaceAfter=8
    )
    styles['attribution'] = ParagraphStyle(
        'attribution', fontName='Helvetica', fontSize=10, leading=14,
        textColor=HexColor('#999999') if is_cover else HexColor('#666666')
    )
    styles['section_label'] = ParagraphStyle(
        'section_label', fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=BRONZE, spaceAfter=4, spaceBefore=0,
        tracking=1.5
    )
    styles['heading'] = ParagraphStyle(
        'heading', fontName='Times-Roman', fontSize=28, leading=34,
        textColor=text_color, spaceAfter=6
    )
    styles['heading_em'] = ParagraphStyle(
        'heading_em', fontName='Times-Italic', fontSize=24, leading=30,
        textColor=BRONZE, spaceAfter=16
    )
    styles['sub_label'] = ParagraphStyle(
        'sub_label', fontName='Helvetica-Bold', fontSize=9, leading=12,
        textColor=BRONZE, spaceBefore=18, spaceAfter=8
    )
    styles['body'] = ParagraphStyle(
        'body', fontName='Helvetica', fontSize=10.5, leading=16,
        textColor=text_color, spaceAfter=10
    )
    styles['callout'] = ParagraphStyle(
        'callout', fontName='Helvetica', fontSize=10.5, leading=16,
        textColor=CHARCOAL, spaceAfter=0
    )
    styles['checkbox'] = ParagraphStyle(
        'checkbox', fontName='Helvetica', fontSize=10.5, leading=18,
        textColor=text_color, spaceAfter=4, leftIndent=28
    )
    styles['question'] = ParagraphStyle(
        'question', fontName='Times-Italic', fontSize=12, leading=18,
        textColor=CHARCOAL, leftIndent=16, spaceAfter=0
    )
    styles['url'] = ParagraphStyle(
        'url', fontName='Helvetica', fontSize=10, leading=14,
        textColor=BRONZE
    )
    styles['copyright'] = ParagraphStyle(
        'copyright', fontName='Helvetica', fontSize=8, leading=12,
        textColor=MUTED
    )
    return styles


def draw_cover(c, title_lines, subtitle, tagline, width=PAGE_W, height=PAGE_H):
    """Draw a dark cover page."""
    # Dark background
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=True, stroke=False)

    # Bronze rule
    y = height - 160
    c.setStrokeColor(BRONZE)
    c.setLineWidth(2)
    c.line(MARGIN, y, MARGIN + 300, y)

    # Title
    c.setFillColor(WHITE)
    c.setFont('Times-Roman', 36)
    y -= 50
    for line in title_lines:
        c.drawString(MARGIN, y, line)
        y -= 44

    # Subtitle (bronze italic)
    y -= 10
    c.setFillColor(BRONZE)
    c.setFont('Times-Italic', 16)
    for line in (subtitle if isinstance(subtitle, list) else [subtitle]):
        c.drawString(MARGIN, y, line)
        y -= 22

    # Tagline
    y -= 12
    c.setFillColor(HexColor('#999999'))
    c.setFont('Helvetica', 11)
    c.drawString(MARGIN, y, tagline)

    # Bottom attribution
    y_bottom = 100
    c.setStrokeColor(BRONZE)
    c.setLineWidth(1.5)
    c.line(MARGIN, y_bottom + 30, MARGIN + 250, y_bottom + 30)

    c.setFillColor(HexColor('#CCCCCC'))
    c.setFont('Helvetica', 10)
    c.drawString(MARGIN, y_bottom + 8, "Dr. Shannon S. Jennings  |  Syncovate")
    c.setFillColor(HexColor('#999999'))
    c.setFont('Helvetica', 9)
    c.drawString(MARGIN, y_bottom - 10, "syncovatellc.com")


def draw_footer(c, page_num):
    """Draw footer on interior pages."""
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 8)
    footer_text = "syncovatellc.com  |  Dr. J  |  \u00a9 2026 Syncovate LLC"
    c.drawCentredString(PAGE_W / 2, 36, footer_text)


def draw_bronze_rule(c, x, y, width=400):
    """Draw a bronze horizontal rule."""
    c.setStrokeColor(BRONZE)
    c.setLineWidth(1.5)
    c.line(x, y, x + width, y)


def draw_callout_box(c, text, x, y, box_width, styles):
    """Draw a callout box with light gray bg and bronze left border. Returns y after box."""
    from reportlab.platypus import Paragraph as P
    from reportlab.lib.utils import simpleSplit

    # Measure text height
    p = P(text, styles['callout'])
    w, h = p.wrap(box_width - 32, 1000)

    box_h = h + 24  # padding
    box_y = y - box_h

    # Light gray background
    c.setFillColor(LIGHT_GRAY)
    c.roundRect(x, box_y, box_width, box_h, 4, fill=True, stroke=False)

    # Bronze left border
    c.setStrokeColor(BRONZE)
    c.setLineWidth(3)
    c.line(x + 2, box_y + 4, x + 2, box_y + box_h - 4)

    # Draw text
    p.drawOn(c, x + 16, box_y + 10)

    return box_y - 8


def draw_question_box(c, text, x, y, box_width, styles):
    """Draw a question callout with bronze left border and italic text."""
    from reportlab.platypus import Paragraph as P

    p = P(f"<i>{text}</i>", styles['question'])
    w, h = p.wrap(box_width - 32, 1000)

    box_h = h + 20
    box_y = y - box_h

    # Bronze left border only (no bg)
    c.setStrokeColor(BRONZE)
    c.setLineWidth(3)
    c.line(x + 2, box_y + 4, x + 2, box_y + box_h - 4)

    p.drawOn(c, x + 16, box_y + 8)

    return box_y - 8


def draw_checkboxes(c, items, x, y, styles):
    """Draw checkbox items. Returns y after items."""
    for item in items:
        # Bronze checkbox outline
        c.setStrokeColor(BRONZE)
        c.setLineWidth(1)
        c.rect(x, y - 2, 14, 14, fill=False, stroke=True)

        # Text
        c.setFillColor(CHARCOAL)
        c.setFont('Helvetica', 10.5)

        # Wrap long text
        from reportlab.lib.utils import simpleSplit
        lines = simpleSplit(item, 'Helvetica', 10.5, PAGE_W - 2*MARGIN - 40)
        for i, line in enumerate(lines):
            c.drawString(x + 24, y + 1 - (i * 15), line)

        y -= max(len(lines) * 15 + 6, 22)

    return y


def draw_interior_page(c, content_func, page_num):
    """Set up a white interior page and call content_func to draw content."""
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=True, stroke=False)
    content_func(c)
    draw_footer(c, page_num)


def draw_text_block(c, text, x, y, max_width, style_name='body', styles=None):
    """Draw a paragraph of text, returns y after text."""
    from reportlab.platypus import Paragraph as P
    s = styles[style_name] if styles else make_styles()['body']
    p = P(text, s)
    w, h = p.wrap(max_width, 1000)
    p.drawOn(c, x, y - h)
    return y - h - s.spaceAfter


# ════════════════════════════════════════════
#  PDF 1: FOUNDER'S PRE-SCOTOMA CHECKLIST
# ════════════════════════════════════════════

def generate_checklist_pdf(output_path):
    c = canvas.Canvas(output_path, pagesize=letter)
    styles = make_styles(is_cover=False)
    content_w = PAGE_W - 2 * MARGIN

    # ── PAGE 1: COVER ──
    draw_cover(c,
        title_lines=["The Founder's", "Pre-Scotoma Checklist"],
        subtitle="5 Systems to Build Before You Need Them",
        tagline="Because the habits that got you here won't get you there."
    )
    c.showPage()

    # ── PAGE 2: INTRODUCTION ──
    def intro_page(c):
        y = PAGE_H - MARGIN
        c.setFillColor(BRONZE)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(MARGIN, y, "INTRODUCTION")
        y -= 16
        draw_bronze_rule(c, MARGIN, y, content_w)
        y -= 40
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Roman', 28)
        c.drawString(MARGIN, y, "You're Ahead of the Pattern.")
        y -= 32
        c.setFillColor(BRONZE)
        c.setFont('Times-Italic', 22)
        c.drawString(MARGIN, y, "Keep it that way.")
        y -= 40

        paragraphs = [
            "You took the Scotoma Spotter and scored Early. That's good news. It means you can still see most of what's happening in your business. You know your people, you know your numbers, and when something shifts, you feel it.",
            "That advantage has an expiration date.",
            "Every founder I've worked with who hit a wall at 50 people tells me the same thing: \"I wish I'd built this when I was small enough to do it right.\" The systems that protect your visibility don't build themselves. And by the time you need them, you're too busy fighting fires to create them.",
            "This checklist is the five things they wish they'd known. Not theory. Not frameworks. Five specific systems you can start building this week \u2014 while you're still small enough to get them right the first time.",
            "Each one takes less than an hour to start. None of them require a consultant. All of them will save you from becoming the bottleneck you swore you'd never be."
        ]
        for para in paragraphs:
            y = draw_text_block(c, para, MARGIN, y, content_w, 'body', styles)
            y -= 4

    draw_interior_page(c, intro_page, 2)
    c.showPage()

    # ── PAGES 3-7: SYSTEMS 1-5 ──
    systems = [
        {
            'num': '1', 'title': 'The Decision Map',
            'why': 'Right now, you make most decisions because you\'re the fastest and best-informed person in the room. That works at 10 people. At 30, every decision that queues behind your calendar costs the business hours of waiting time \u2014 and your team stops even trying to make the call on their own.',
            'trap': 'Everything runs through you. Your calendar becomes the bottleneck. Your best people stop bringing you problems \u2014 not because there aren\'t any, but because they assume you\'ll just handle it yourself. You\'ve accidentally trained the whole operation to wait for permission.',
            'items': [
                'List every decision someone brought to you this week',
                'Sort into: Must stay with me / Hand off with guardrails / Should have handed off months ago',
                'Hand one item from the third column to someone this week',
                'Write down the guardrails so they know the boundaries'
            ]
        },
        {
            'num': '2', 'title': 'The Communication Cadence',
            'why': 'Information in your company currently flows through you. You\'re the router, the translator, and the switchboard. That means nothing moves when you\'re not in the room \u2014 and your team only knows what you remember to tell them.',
            'trap': 'You become the single point of failure for information flow. Things fall through cracks not because people aren\'t paying attention, but because the information never reached them. You hear about problems after they\'ve already become expensive.',
            'items': [
                'Set a weekly 30-minute team huddle (same time, same day, every week)',
                'Create a simple format: What\'s working / What\'s stuck / What do you need from me',
                'Commit to it for 8 weeks before judging whether it\'s working',
                'Stop being the person who forwards information \u2014 let the huddle do it'
            ]
        },
        {
            'num': '3', 'title': 'The Role Handshake',
            'why': 'Job descriptions describe qualifications. Role handshakes describe reality: what this person owns, what they decide, where their authority ends, and what comes back to you. Without them, you get overlapping efforts, dropped balls, and the slow drain of \'I thought you were handling that.\'',
            'trap': 'Roles were assigned on the fly as you grew. Nobody wrote anything down because everyone just knew. Now you have three people who think they own the same thing, two things nobody owns, and a key person doing a job their title doesn\'t describe. The informal structure becomes invisible walls.',
            'items': [
                'Pick your three most critical roles (not titles \u2014 roles)',
                'For each: write what they OWN, what they DECIDE, what comes to YOU',
                'Sit down with each person and align on the handshake',
                'Revisit every 6 months as the business changes'
            ]
        },
        {
            'num': '4', 'title': 'The Feedback Loop',
            'why': 'The higher you go, the more filtered your information becomes. People perform \'fine\' for leadership. They save the real conversation for each other \u2014 or for their next employer. Without a deliberate feedback loop, you\'re leading with incomplete data and you don\'t know it.',
            'trap': 'Everyone says \'things are fine\' and you believe them. The first sign of trouble is a resignation letter, not a conversation. By the time the relational fracture becomes visible to you, it\'s been spreading for months. Your open-door policy feels open to you. It doesn\'t feel open to them.',
            'items': [
                'Ask one trusted person: \'What\'s the one thing people aren\'t saying out loud?\'',
                'Create a monthly anonymous pulse check (3 questions max, keep it simple)',
                'When you hear something hard, take one visible action within 48 hours',
                'Stop asking \'How\'s everything going?\' \u2014 ask \'What\'s the hardest part of your job right now?\''
            ]
        },
        {
            'num': '5', 'title': 'The Succession Seed',
            'why': 'Even at 15 people, you need someone who could run things if you stepped away for a week. Not because you\'re planning to leave \u2014 but because a business that can\'t survive without you isn\'t a business. It\'s a job with your name on the building.',
            'trap': 'You can\'t take a vacation without your phone blowing up. Every emergency routes to you because nobody else has the context or authority to handle it. You tell yourself you\'ll \'start developing people when things slow down\' \u2014 but things never slow down when everything runs through one person.',
            'items': [
                'Identify one person who could cover for you for 48 hours',
                'Start sharing context with them: why you make the decisions you make, not just what',
                'Give them one real decision to own this month \u2014 and resist checking on it',
                'Book one day off in the next 30 days and actually take it'
            ]
        }
    ]

    for i, sys in enumerate(systems):
        def make_system_page(sys_data):
            def draw(c):
                y = PAGE_H - MARGIN
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, f"SYSTEM {sys_data['num']} OF 5")
                y -= 16
                draw_bronze_rule(c, MARGIN, y, content_w)
                y -= 44
                c.setFillColor(CHARCOAL)
                c.setFont('Times-Roman', 28)
                c.drawString(MARGIN, y, sys_data['title'])
                y -= 34

                # WHY IT MATTERS
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "WHY IT MATTERS")
                y -= 20
                y = draw_text_block(c, sys_data['why'], MARGIN, y, content_w, 'body', styles)
                y -= 8

                # THE FOUNDER TRAP (callout)
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "THE FOUNDER TRAP")
                y -= 16
                y = draw_callout_box(c, sys_data['trap'], MARGIN, y, content_w, styles)
                y -= 8

                # BUILD IT NOW
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "BUILD IT NOW")
                y -= 22
                y = draw_checkboxes(c, sys_data['items'], MARGIN, y, styles)
            return draw

        draw_interior_page(c, make_system_page(sys), i + 3)
        c.showPage()

    # ── PAGE 8: CLOSING ──
    def closing_page(c):
        y = PAGE_H - MARGIN
        draw_bronze_rule(c, MARGIN, y, content_w)
        y -= 40
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Roman', 26)
        c.drawString(MARGIN, y, "You Don't Need a Consultant Yet.")
        y -= 30

        closing = [
            "But you do need these systems before the blind spots form.",
            "If you build them now, you'll be one of the rare founders who scales without hitting the wall. Not because you were smarter or luckier \u2014 but because you were intentional about the architecture while you could still see the whole picture.",
            "The founders who navigate the next stage well are the ones who build before they need to. You're doing that right now.",
            "When you're ready for an outside eye \u2014 someone who can see what proximity and familiarity hide \u2014 that's what Syncovate is for."
        ]
        for para in closing:
            y = draw_text_block(c, para, MARGIN, y, content_w, 'body', styles)
            y -= 4

        y -= 20
        draw_bronze_rule(c, MARGIN, y, 250)
        y -= 30
        # "Dr. J" in script font
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Italic', 26)
        c.drawString(MARGIN, y, "Dr. J")
        y -= 24
        c.setFillColor(BRONZE)
        c.setFont('Helvetica', 10)
        c.drawString(MARGIN, y, "syncovatellc.com")
        y -= 22
        c.setFillColor(HexColor('#666666'))
        c.setFont('Helvetica', 9)
        c.drawString(MARGIN, y, "Share the Scotoma Spotter:")
        y -= 14
        c.setFillColor(CHARCOAL)
        c.drawString(MARGIN, y, "spotter.syncovatellc.com")
        y -= 22
        c.setFillColor(HexColor('#666666'))
        c.setFont('Helvetica', 9)
        c.drawString(MARGIN, y, "Connect on LinkedIn:")
        y -= 14
        c.setFillColor(CHARCOAL)
        c.drawString(MARGIN, y, "linkedin.com/in/shannonsjennings")

    draw_interior_page(c, closing_page, 8)
    c.save()
    print(f"Generated: {output_path}")


# ════════════════════════════════════════════
#  PDF 2: 7 DECISIONS THAT DETERMINE...
# ════════════════════════════════════════════

def generate_decisions_pdf(output_path):
    c = canvas.Canvas(output_path, pagesize=letter)
    styles = make_styles(is_cover=False)
    content_w = PAGE_W - 2 * MARGIN

    # ── PAGE 1: COVER ──
    draw_cover(c,
        title_lines=["7 Decisions That", "Determine If You", "Scale or Stall"],
        subtitle=["The choices nobody tells you about", "between 25 and 75 employees."],
        tagline="You're making these decisions right now \u2014 whether you know it or not."
    )
    c.showPage()

    # ── PAGE 2: INTRODUCTION ──
    def intro_page(c):
        y = PAGE_H - MARGIN
        c.setFillColor(BRONZE)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(MARGIN, y, "INTRODUCTION")
        y -= 16
        draw_bronze_rule(c, MARGIN, y, content_w)
        y -= 40
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Roman', 26)
        c.drawString(MARGIN, y, "You're in the Builder Stage.")
        y -= 30
        c.setFillColor(BRONZE)
        c.setFont('Times-Italic', 20)
        c.drawString(MARGIN, y, "That's the best and worst place to be.")
        y -= 38

        paragraphs = [
            "You took the Scotoma Spotter and landed in the Builder stage. That means you're big enough to need real systems but still small enough to build them right. Most founders miss this window entirely.",
            "Between 25 and 75 employees, there are seven decisions that quietly determine whether your business scales smoothly or hits a wall you didn't see coming. You're making these decisions right now \u2014 most of them by default, not by design.",
            "The founders who stall aren't less talented. They just didn't realize which decisions were load-bearing until something broke.",
            "This guide names each one, shows you what happens when you get it wrong, and gives you a question to pressure-test where you actually stand."
        ]
        for para in paragraphs:
            y = draw_text_block(c, para, MARGIN, y, content_w, 'body', styles)
            y -= 4

    draw_interior_page(c, intro_page, 2)
    c.showPage()

    # ── PAGES 3-9: DECISIONS 1-7 ──
    decisions = [
        {
            'num': '1', 'title': 'Who Decides What',
            'decision': 'At some point, you stopped being the person who does everything and became the person who decides everything. That\'s progress \u2014 but it\'s also a trap. The real decision is: which decisions stay with you, and which ones do you push down? Most founders hold too many, not because they don\'t trust their team, but because letting go of decisions feels like letting go of control.',
            'wrong': 'Every decision queues behind your calendar. Your team stops bringing you options and starts bringing you problems \u2014 because they know you\'ll just decide anyway. The people who could step up don\'t, because there\'s no room. You\'ve accidentally built an organization that can\'t move without you.',
            'question': 'If you disappeared for two weeks, which decisions would your team make confidently \u2014 and which ones would just wait?'
        },
        {
            'num': '2', 'title': 'When to Stop Hiring for\nSkills and Start Hiring for Seats',
            'decision': 'Early on, you hire people who can do things. That\'s smart. But at some point you need to shift from hiring skills to filling seats \u2014 defined roles with clear ownership, authority, and accountability. This is the moment when \'we need someone who can handle X\' becomes \'we need a role that owns X, and here\'s what that role decides.\'',
            'wrong': 'You end up with a collection of talented individuals who don\'t know where their job ends and someone else\'s begins. You have three people who think they own client relationships and zero people who own the process between departments. Talent without structure creates friction, not speed.',
            'question': 'Could a stranger look at your team and know \u2014 without asking you \u2014 who owns what?'
        },
        {
            'num': '3', 'title': 'How Information Flows When\nYou\'re Not in the Room',
            'decision': 'Right now, you\'re probably the main conduit for information. You hear something from the field, you tell the office. You get a customer complaint, you tell the team. You\'re the switchboard. The decision is: do you build a communication system that works without you, or do you keep being the router?',
            'wrong': 'Information gets trapped in silos. The field doesn\'t know what the office knows. Customer-facing people make promises that operations can\'t keep. Problems get discovered at delivery instead of at origin. And you spend a third of your day just moving information from one person to another.',
            'question': 'If something went wrong on a project today, how many phone calls would it take before the right person knew about it?'
        },
        {
            'num': '4', 'title': 'Whether to Promote Your\nBest Doer Into Management',
            'decision': 'Your best electrician, your top salesperson, your most reliable project manager \u2014 they\'ve earned a promotion. But the skills that made them great at doing the work are not the same skills that make someone great at managing people who do the work. This is one of the most consequential decisions you\'ll make, and most founders get it wrong at least once.',
            'wrong': 'You lose your best performer and gain a mediocre manager. The person is frustrated because they were great at their old job and struggling at the new one. Their team is frustrated because they need leadership, not a super-doer who does their work for them. And you can\'t demote them without it feeling like punishment.',
            'question': 'Is the person you\'re about to promote genuinely excited about developing other people \u2014 or are they just the most deserving of a reward?'
        },
        {
            'num': '5', 'title': 'What You Measure and\nWhat You Tolerate',
            'decision': 'Every organization has two sets of standards: the ones on the wall and the ones that actually get enforced. The decision is whether those match. What you tolerate becomes your real standard \u2014 regardless of what you say the standard is. At 15 people, culture was you. At 50, culture is what happens when you\'re not in the room.',
            'wrong': 'Your core values say \'accountability\' but nobody gets held to it. Your standards say \'quality first\' but you keep rewarding speed. Your team reads the gap between what you say and what you tolerate \u2014 and they follow the tolerance, not the talk. Over time, your best people leave because the culture isn\'t what they signed up for.',
            'question': 'What behavior are you tolerating right now that contradicts something you say you value?'
        },
        {
            'num': '6', 'title': 'When to Fix It Right\nvs. Keep Moving',
            'decision': 'Growth creates operational debt \u2014 the workarounds, the temporary fixes, the \'we\'ll deal with that later\' decisions. The question isn\'t whether you have operational debt. You do. The decision is which debts are load-bearing and which ones can wait. Get this wrong in either direction and you either stall from over-engineering or break from under-building.',
            'wrong': 'You keep adding speed on top of a foundation that wasn\'t built for it. The spreadsheet that should be a system. The process that only works because one person remembers how. The role that three people share but nobody owns. Each one is fine on its own. Together, they\'re a cascade waiting to happen.',
            'question': 'What\'s on your \'fix it later\' list that would cause a real crisis if it broke tomorrow?'
        },
        {
            'num': '7', 'title': 'Who Tells You the Truth',
            'decision': 'The higher you go, the more filtered your information becomes. People tell you what they think you want to hear. They perform \'fine\' when you ask how things are going. The decision is whether you actively build a channel for unfiltered truth \u2014 or whether you accept the curated version and hope it\'s close enough.',
            'wrong': 'You\'re leading with incomplete data and you don\'t know it. The first sign of a relational fracture is a resignation, not a conversation. Your \'open door\' policy feels open to you but not to them. And the person who would tell you the hard truth \u2014 they\'ve been watching to see if it\'s actually safe to speak up. If you\'ve never made it safe, they never will.',
            'question': 'When was the last time someone on your team told you something you genuinely didn\'t want to hear?'
        }
    ]

    for i, dec in enumerate(decisions):
        def make_decision_page(dec_data):
            def draw(c):
                y = PAGE_H - MARGIN
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, f"DECISION {dec_data['num']} OF 7")
                y -= 16
                draw_bronze_rule(c, MARGIN, y, content_w)
                y -= 40

                # Title (may be multi-line)
                c.setFillColor(CHARCOAL)
                c.setFont('Times-Roman', 28)
                for line in dec_data['title'].split('\n'):
                    c.drawString(MARGIN, y, line)
                    y -= 34
                y -= 4

                # THE DECISION
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "THE DECISION")
                y -= 20
                y = draw_text_block(c, dec_data['decision'], MARGIN, y, content_w, 'body', styles)
                y -= 8

                # WHAT GOES WRONG (callout)
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "WHAT GOES WRONG")
                y -= 16
                y = draw_callout_box(c, dec_data['wrong'], MARGIN, y, content_w, styles)
                y -= 8

                # THE HONEST QUESTION
                c.setFillColor(BRONZE)
                c.setFont('Helvetica-Bold', 9)
                c.drawString(MARGIN, y, "THE HONEST QUESTION")
                y -= 16
                y = draw_question_box(c, dec_data['question'], MARGIN, y, content_w, styles)
            return draw

        draw_interior_page(c, make_decision_page(dec), i + 3)
        c.showPage()

    # ── PAGE 10: CLOSING ──
    def closing_page(c):
        y = PAGE_H - MARGIN
        draw_bronze_rule(c, MARGIN, y, content_w)
        y -= 40
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Roman', 26)
        c.drawString(MARGIN, y, "Seven Decisions. One Window.")
        y -= 30

        closing = [
            "You're making these decisions right now. The only question is whether you're making them intentionally or by default.",
            "The builder stage doesn't last forever. The patterns you set at 30 people become the operating system at 80. The informal workarounds become invisible walls. The roles you assigned on the fly become permanent structures.",
            "You don't need to get all seven right this week. But you need to know which ones are load-bearing for your business right now \u2014 and make those deliberately.",
            "If you want someone to walk through these with you \u2014 someone who's sat in the room with founders at exactly this stage and seen which decisions were the turning points \u2014 that's what the Builder's Blind Spot Scan is for."
        ]
        for para in closing:
            y = draw_text_block(c, para, MARGIN, y, content_w, 'body', styles)
            y -= 4

        y -= 20
        draw_bronze_rule(c, MARGIN, y, 250)
        y -= 30
        # "Dr. J" in script font
        c.setFillColor(CHARCOAL)
        c.setFont('Times-Italic', 26)
        c.drawString(MARGIN, y, "Dr. J")
        y -= 24
        c.setFillColor(BRONZE)
        c.setFont('Helvetica', 10)
        c.drawString(MARGIN, y, "syncovatellc.com")
        y -= 22
        c.setFillColor(HexColor('#666666'))
        c.setFont('Helvetica', 9)
        c.drawString(MARGIN, y, "Share the Scotoma Spotter:")
        y -= 14
        c.setFillColor(CHARCOAL)
        c.drawString(MARGIN, y, "spotter.syncovatellc.com")
        y -= 22
        c.setFillColor(HexColor('#666666'))
        c.setFont('Helvetica', 9)
        c.drawString(MARGIN, y, "Connect on LinkedIn:")
        y -= 14
        c.setFillColor(CHARCOAL)
        c.drawString(MARGIN, y, "linkedin.com/in/shannonsjennings")

    draw_interior_page(c, closing_page, 10)
    c.save()
    print(f"Generated: {output_path}")


if __name__ == '__main__':
    assets_dir = os.path.dirname(os.path.abspath(__file__))
    generate_checklist_pdf(os.path.join(assets_dir, 'founders-pre-scotoma-checklist.pdf'))
    generate_decisions_pdf(os.path.join(assets_dir, '7-decisions-scale-or-stall.pdf'))
    print("Done!")
