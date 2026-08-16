from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
cream = (247, 244, 239)
ocean_dark = (6, 99, 115)
ink = (27, 26, 23)
gold = (245, 171, 43)

img = Image.new("RGB", (W, H), cream)
draw = ImageDraw.Draw(img)

draw.rectangle([0, 0, W, 10], fill=ocean_dark)
draw.rectangle([0, 0, int(W * 0.35), 10], fill=gold)

logo = Image.open("public/Web Logo.png").convert("RGBA")
logo_w = 550
logo_h = int(logo.height * (logo_w / logo.width))
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
lx = (W - logo_w) // 2
ly = 150
img.paste(logo, (lx, ly), logo)


def find_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


tagline_font = find_font(["C:/Windows/Fonts/georgiai.ttf", "C:/Windows/Fonts/georgia.ttf"], 40)
tagline = "Travel Beyond Expectations."
bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
tw = bbox[2] - bbox[0]
draw.text(((W - tw) / 2, ly + logo_h + 55), tagline, font=tagline_font, fill=ink)

sub_font = find_font(["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"], 26)
sub = "Book it yourself, or plan it with a real travel advisor."
bbox2 = draw.textbbox((0, 0), sub, font=sub_font)
sw = bbox2[2] - bbox2[0]
draw.text(((W - sw) / 2, ly + logo_h + 115), sub, font=sub_font, fill=(107, 107, 98))

img.save("public/social-share.jpg", quality=90)
print("saved", img.size)
