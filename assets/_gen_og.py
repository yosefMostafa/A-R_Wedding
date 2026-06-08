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

# ── palette ───────────────────────────────────────────────────────
CREAM_TOP  = (246, 239, 221, 255)
CREAM_BOT  = (228, 213, 179, 255)
GOLD       = (110, 82,  50,  255)
GOLD_SOFT  = (156, 119, 72,  255)
CLAY       = (130, 95,  55,  255)
CLAY_LT    = (176, 138, 90,  255)
INK        = (22,  22,  22,  255)

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
        draw.ellipse([dx-1.2, dy-1.2, dx+1.2, dy+1.2], fill=(110, 82, 50, 28))

# ── double border frame ───────────────────────────────────────────
draw.rectangle([22, 18, W-23, H-19], outline=GOLD, width=2)
draw.rectangle([34, 30, W-35, H-31], outline=(110, 82, 50, 110), width=1)

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
    draw.polygon([(cx, y-7),(cx+8,y),(cx,y+7),(cx-8,y)], fill=(110,82,50,160))
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
ax1, ax2, ay1, ay2 = 418, 782, 148, 402
arc_h = 52
draw.arc( [ax1,      ay1,      ax2,      ay1+arc_h*2], 180, 0, fill=GOLD,           width=2)
draw.line([(ax1,     ay1+arc_h),(ax1, ay2)],            fill=GOLD,           width=2)
draw.line([(ax2,     ay1+arc_h),(ax2, ay2)],            fill=GOLD,           width=2)
draw.line([(ax1, ay2),(ax2, ay2)],                      fill=GOLD,           width=2)
p = 13
draw.arc( [ax1+p, ay1+p, ax2-p, ay1+arc_h*2-p], 180, 0, fill=(110,82,50,100), width=1)
draw.line([(ax1+p, ay1+arc_h+2),(ax1+p, ay2-p)], fill=(110,82,50,100), width=1)
draw.line([(ax2-p, ay1+arc_h+2),(ax2-p, ay2-p)], fill=(110,82,50,100), width=1)
draw.line([(ax1+p, ay2-p),(ax2-p, ay2-p)],        fill=(110,82,50,100), width=1)

# ── groom name ────────────────────────────────────────────────────
centered(ar('أحمد'), 176, f_ar_name, INK)

# ── "&" ───────────────────────────────────────────────────────────
centered('&', 250, f_amp, GOLD_SOFT)

# ── bride name ────────────────────────────────────────────────────
centered(ar('ريهام'), 300, f_ar_name, INK)

# ── English names ─────────────────────────────────────────────────
centered('AHMED  &  REHAM', 390, f_en_name, GOLD)

# ── middle divider ────────────────────────────────────────────────
divider(420, span=215)

# ── hatched date band ─────────────────────────────────────────────
band = Image.new('RGBA', (W-68, 88), (0,0,0,0))
bd   = ImageDraw.Draw(band)
for x in range(-88, W-68, 14):
    bd.line([(x,0),(x+88,88)], fill=(110,82,50,30), width=1)
bd.rectangle([0,0,W-69,87], fill=(110,82,50,16))
img.alpha_composite(band, dest=(34, 434))

# ── Arabic date ───────────────────────────────────────────────────
centered(ar('الجمعة ٢٦ يونيو ٢٠٢٦'), 442, f_date_ar, INK)

# ── English date ──────────────────────────────────────────────────
centered('Friday,  26 June  2026', 476, f_date_en, INK)

# ── time ──────────────────────────────────────────────────────────
centered(lsp('7 : 00   IN   THE   EVENING', 2), 522, f_time, GOLD)

# ── hashtag ───────────────────────────────────────────────────────
centered(lsp('#AhmedAndReham', 2), 576, f_hash, GOLD_SOFT)

# ── tennis ball (bottom-right accent) ────────────────────────────
bx, by, br = 1116, 545, 30
draw.ellipse([bx-br-10, by-br-10, bx+br+10, by+br+10], outline=(110,82,50,55), width=1)
draw.ellipse([bx-br,    by-br,    bx+br,    by+br   ], fill=(195, 215, 40, 230))
draw.arc([bx-br-9, by-br, bx+br-9, by+br], 340, 200, fill=(255,255,255,200), width=3)
draw.arc([bx-br+9, by-br, bx+br+9, by+br], 160,  20, fill=(255,255,255,200), width=3)

# ── save ─────────────────────────────────────────────────────────
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'og-image.png')
img.convert('RGB').save(out, 'PNG', optimize=True)
print(f'Saved {out}  ({W}x{H})')
