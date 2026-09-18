"""
Generate assets/og-image.png  (1200 x 630, wedding invitation preview card)
Run:  python assets/_gen_og.py
"""
import os
os.environ.setdefault('PYTHONIOENCODING', 'utf-8')

from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display

W, H = 1200, 630
img = Image.new('RGBA', (W, H))
draw = ImageDraw.Draw(img)

# ── content (keep in sync with config.js) ─────────────────────────
GROOM_AR, BRIDE_AR = 'يوسف', 'هدى'
NAMES_EN = 'YOUSSEF  &  HUDA'
DATE_AR  = 'الأحد ٤ أكتوبر ٢٠٢٦'
DATE_EN  = 'Sunday,  4 October  2026'
TIME_EN  = '8 : 00   IN   THE   EVENING'
HASHTAG  = '#YoussefAndHuda'

# ── palette (mirrors tokens.css: burgundy ink, gold accents, cream) ─
CREAM_TOP  = (253, 250, 243, 255)
CREAM_BOT  = (244, 236, 224, 255)
GOLD       = (184, 134, 60,  255)
GOLD_SOFT  = (217, 174, 108, 255)
CLAY       = (125, 84,  17,  255)
CLAY_LT    = (217, 174, 108, 255)
INK        = (94,  19,  39,  255)

# ── gradient background ───────────────────────────────────────────
for y in range(H):
    t = y / H
    r = int(CREAM_TOP[0]*(1-t) + CREAM_BOT[0]*t)
    g = int(CREAM_TOP[1]*(1-t) + CREAM_BOT[1]*t)
    b = int(CREAM_TOP[2]*(1-t) + CREAM_BOT[2]*t)
    draw.line([(0, y), (W-1, y)], fill=(r, g, b, 255))

# ── dot pattern ───────────────────────────────────────────────────
for dx in range(14, W, 28):
    for dy in range(14, H, 28):
        draw.ellipse([dx-1.2, dy-1.2, dx+1.2, dy+1.2], fill=(184, 134, 60, 40))

# ── double border frame ───────────────────────────────────────────
draw.rectangle([22, 18, W-23, H-19], outline=GOLD, width=2)
draw.rectangle([34, 30, W-35, H-31], outline=(184, 134, 60, 120), width=1)

# ── corner diamonds ───────────────────────────────────────────────
def diamond(cx, cy, s):
    return [(cx, cy-s), (cx+s, cy), (cx, cy+s), (cx-s, cy)]

for cx, cy in [(22, 18), (W-22, 18), (22, H-18), (W-22, H-18)]:
    draw.polygon(diamond(cx, cy, 14), fill=CLAY)
    draw.polygon(diamond(cx, cy, 8),  fill=CLAY_LT)

# ── font helpers ──────────────────────────────────────────────────
F = r'C:\Windows\Fonts'

def fnt(names, size):
    for n in (names if isinstance(names, list) else [names]):
        p = os.path.join(F, n)
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

# Traditional Arabic (trado) renders all Arabic chars cleanly
AR   = ['trado.ttf', 'arabtype.ttf', 'segoeui.ttf']
SERF = ['georgia.ttf',  'times.ttf']
BOLD = ['georgiab.ttf', 'georgia.ttf']
SANS = ['arialbd.ttf',  'arial.ttf']
THIN = ['arial.ttf',    'calibri.ttf']

f_bismi    = fnt(AR,   32)
f_label    = fnt(THIN, 13)
f_ar_name  = fnt(AR,   74)
f_amp      = fnt(SERF, 44)
f_en_name  = fnt(BOLD, 22)
f_date_ar  = fnt(AR,   26)
f_date_en  = fnt(SERF, 30)
f_time     = fnt(THIN, 13)
f_hash     = fnt(THIN, 12)

# ── text helpers ──────────────────────────────────────────────────
def ar(text):
    return get_display(arabic_reshaper.reshape(text))

def tw(text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return bb[2] - bb[0]

def th(text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return bb[3] - bb[1]

def centered(text, y, font, color):
    x = (W - tw(text, font)) // 2
    draw.text((x, y), text, font=font, fill=color)

def divider(y, span=180):
    cx = W // 2
    draw.line([(cx - span, y), (cx - 28, y)], fill=GOLD, width=1)
    draw.polygon([(cx, y-7),(cx+8,y),(cx,y+7),(cx-8,y)], fill=(184,134,60,170))
    draw.polygon([(cx, y-4),(cx+5,y),(cx,y+4),(cx-5,y)], fill=GOLD)
    draw.line([(cx + 28, y), (cx + span, y)], fill=GOLD, width=1)

def lsp(text, gap=4):
    return (' ' * gap).join(list(text))

# ── Bismillah (plain — no diacritics for clean rendering) ─────────
centered(ar('بسم الله الرحمن الرحيم'), 56, f_bismi, INK)

# ── top divider ───────────────────────────────────────────────────
divider(100, span=190)

# ── "THE WEDDING OF" ──────────────────────────────────────────────
centered(lsp('THE  WEDDING  OF', 4), 118, f_label, GOLD)

# ── arch frame ────────────────────────────────────────────────────
ax1, ax2, ay1, ay2 = 418, 782, 148, 374
arc_h = 52
draw.arc( [ax1,      ay1,      ax2,      ay1+arc_h*2], 180, 0, fill=GOLD,           width=2)
draw.line([(ax1,     ay1+arc_h),(ax1, ay2)],            fill=GOLD,           width=2)
draw.line([(ax2,     ay1+arc_h),(ax2, ay2)],            fill=GOLD,           width=2)
draw.line([(ax1, ay2),(ax2, ay2)],                      fill=GOLD,           width=2)
p = 13
draw.arc( [ax1+p, ay1+p, ax2-p, ay1+arc_h*2-p], 180, 0, fill=(184,134,60,110), width=1)
draw.line([(ax1+p, ay1+arc_h+2),(ax1+p, ay2-p)], fill=(184,134,60,110), width=1)
draw.line([(ax2-p, ay1+arc_h+2),(ax2-p, ay2-p)], fill=(184,134,60,110), width=1)
draw.line([(ax1+p, ay2-p),(ax2-p, ay2-p)],        fill=(184,134,60,110), width=1)

# ── groom name ────────────────────────────────────────────────────
centered(ar(GROOM_AR), 166, f_ar_name, INK)

# ── "&" ───────────────────────────────────────────────────────────
centered('&', 238, f_amp, GOLD_SOFT)

# ── bride name ────────────────────────────────────────────────────
centered(ar(BRIDE_AR), 284, f_ar_name, INK)

# ── English names ─────────────────────────────────────────────────
centered(NAMES_EN, 388, f_en_name, GOLD)

# ── middle divider ────────────────────────────────────────────────
divider(420, span=215)

# ── hatched date band ─────────────────────────────────────────────
band = Image.new('RGBA', (W-68, 88), (0,0,0,0))
bd   = ImageDraw.Draw(band)
for x in range(-88, W-68, 14):
    bd.line([(x,0),(x+88,88)], fill=(184,134,60,34), width=1)
bd.rectangle([0,0,W-69,87], fill=(184,134,60,18))
img.alpha_composite(band, dest=(34, 434))

# ── Arabic date ───────────────────────────────────────────────────
centered(ar(DATE_AR), 442, f_date_ar, INK)

# ── English date ──────────────────────────────────────────────────
centered(DATE_EN, 476, f_date_en, INK)

# ── time ──────────────────────────────────────────────────────────
centered(lsp(TIME_EN, 2), 522, f_time, GOLD)

# ── hashtag ───────────────────────────────────────────────────────
centered(lsp(HASHTAG, 2), 576, f_hash, GOLD_SOFT)

# ── save ─────────────────────────────────────────────────────────
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'og-image.png')
img.convert('RGB').save(out, 'PNG', optimize=True)
print(f'Saved {out}  ({W}x{H})')
