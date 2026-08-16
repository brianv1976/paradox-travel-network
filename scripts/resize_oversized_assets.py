"""One-off: right-size local image assets that were shipped at their raw
upload resolution despite rendering as small fixed logos/avatars. Resizes
in place, ~2.5x the largest known CSS render size (retina-safe headroom),
preserving format/mode (including alpha) so no code references change."""
from PIL import Image
import os

TARGETS = [
    ("public/assets/partners/exoticca.png", None, 130),       # h-14 max render, wide logo
    ("public/assets/partners/virgin-voyages.png", 150, 160),  # ~50x56 max render
    ("public/assets/partners/project-expedition.jpg", 130, None),  # width-constrained
    ("public/assets/Headshot.png", 160, 160),                 # 56x56 avatar
    ("public/Web Logo.png", 560, None),                       # navbar, ~214px widest
]

for path, max_w, max_h in TARGETS:
    im = Image.open(path)
    w, h = im.size
    before_bytes = os.path.getsize(path)

    if max_w and max_h:
        scale = min(max_w / w, max_h / h)
    elif max_w:
        scale = max_w / w
    else:
        scale = max_h / h

    if scale >= 1:
        print(f"SKIP (already small): {path} {w}x{h}")
        continue

    new_size = (round(w * scale), round(h * scale))
    resized = im.resize(new_size, Image.LANCZOS)

    save_kwargs = {}
    if path.lower().endswith((".jpg", ".jpeg")):
        save_kwargs = {"quality": 90, "optimize": True}
    else:
        save_kwargs = {"optimize": True}
    resized.save(path, **save_kwargs)

    after_bytes = os.path.getsize(path)
    print(f"{path}: {w}x{h} ({before_bytes:,}B) -> {new_size[0]}x{new_size[1]} ({after_bytes:,}B)")
