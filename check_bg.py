import cv2
import numpy as np

f = cv2.imread("all_inspect_frames/frame_100.jpg")
h, w, _ = f.shape

# Sample various background locations
samples = {
    "top_left": f[20, 20],
    "top_mid": f[20, w//2],
    "top_right": f[20, w-20],
    "bot_left": f[h-20, 20],
    "bot_mid": f[h-20, w//2],
    "bot_right": f[h-20, w-20],
    "mid_left": f[h//2, 20],
    "mid_right": f[h//2, w-20],
}

print("Background samples (BGR -> RGB -> HEX):")
for name, bgr in samples.items():
    b, g, r = int(bgr[0]), int(bgr[1]), int(bgr[2])
    print(f"  {name:10s}: RGB({r:3d}, {g:3d}, {b:3d}) -> #{r:02x}{g:02x}{b:02x}")
