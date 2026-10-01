import cv2
import numpy as np
import os
import json

# Ensure target directories exist
frames_dir = os.path.join("public", "frames")
os.makedirs(frames_dir, exist_ok=True)

# Compass landmarks:
# 0 (0°): RIGHT       -> Frame 70
# 8 (45°): DOWN-RIGHT -> Frame 86
# 16 (90°): DOWN      -> Frame 108
# 24 (135°): DOWN-LEFT-> Frame 134
# 32 (180°): LEFT     -> Frame 156
# 40 (225°): UP-LEFT  -> Frame 174
# 48 (270°): UP       -> Frame 182
# 56 (315°): UP-RIGHT -> Frame 190
# Center neutral:     -> Frame 234

seg0_1 = [70, 72, 74, 75, 82, 83, 84, 85]      # 0..7   (RIGHT -> DOWN-RIGHT)
seg1_2 = [86, 88, 91, 94, 97, 100, 105, 107]   # 8..15  (DOWN-RIGHT -> DOWN)
seg2_3 = [108, 111, 114, 117, 120, 123, 130, 132] # 16..23 (DOWN -> DOWN-LEFT)
seg3_4 = [134, 137, 140, 143, 145, 150, 152, 154] # 24..31 (DOWN-LEFT -> LEFT)
seg4_5 = [156, 158, 161, 163, 166, 168, 171, 173] # 32..39 (LEFT -> UP-LEFT)
seg5_6 = [174, 175, 176, 177, 178, 179, 180, 181] # 40..47 (UP-LEFT -> UP)
seg6_7 = [182, 183, 184, 185, 186, 187, 188, 189] # 48..55 (UP -> UP-RIGHT)
seg7_8 = [190, 192, 194, 54, 56, 58, 62, 66]      # 56..63 (UP-RIGHT -> RIGHT)

all_64_frames = seg0_1 + seg1_2 + seg2_3 + seg3_4 + seg4_5 + seg5_6 + seg6_7 + seg7_8
assert len(all_64_frames) == 64, f"Expected 64 frames, got {len(all_64_frames)}"

center_frame_number = 234

video_path = os.path.join("public", "character.mp4")
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(f"Error opening {video_path}")
    exit(1)

# Watermark inpainting mask in bottom right corner (y: 850..950, x: 1690..1790)
inpaint_mask = np.zeros((1080, 1920), dtype=np.uint8)
inpaint_mask[855:945, 1695:1785] = 255

def clean_frame(frame):
    # Inpaint watermark cleanly
    return cv2.inpaint(frame, inpaint_mask, 7, cv2.INPAINT_TELEA)

print("Starting extraction of 64 WebP rotation frames...")
# Pre-extract 64 frames
for i, fn in enumerate(all_64_frames):
    cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
    ret, frame = cap.read()
    if not ret:
        print(f"Warning: Failed to read frame {fn}")
        continue
    cleaned = clean_frame(frame)
    
    # Save both frame_XX.webp and XX.webp for convenience
    out_path = os.path.join(frames_dir, f"frame_{i:02d}.webp")
    out_path_num = os.path.join(frames_dir, f"{i}.webp")
    
    cv2.imwrite(out_path, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 90])
    cv2.imwrite(out_path_num, cleaned, [cv2.IMWRITE_WEBP_QUALITY, 90])

# Extract Center neutral frame
cap.set(cv2.CAP_PROP_POS_FRAMES, center_frame_number)
ret, c_frame = cap.read()
if ret:
    cleaned_center = clean_frame(c_frame)
    cv2.imwrite(os.path.join(frames_dir, "center.webp"), cleaned_center, [cv2.IMWRITE_WEBP_QUALITY, 92])
    cv2.imwrite(os.path.join("public", "center.webp"), cleaned_center, [cv2.IMWRITE_WEBP_QUALITY, 92])
    print("Center frame extracted successfully.")

cap.release()

manifest = {
    "totalFrames": 64,
    "angleStepDeg": 360.0 / 64,
    "centerFrame": "center.webp",
    "faceCenter": {"x": 0.5, "y": 0.4444},
    "backgroundColor": {
        "hex": "#940c0d",
        "rgb": [148, 12, 13],
        "glowCenter": "#c01f22"
    },
    "compassDirections": {
        "RIGHT": {"frameIndex": 0, "videoFrame": 70, "angleDeg": 0},
        "DOWN_RIGHT": {"frameIndex": 8, "videoFrame": 86, "angleDeg": 45},
        "DOWN": {"frameIndex": 16, "videoFrame": 108, "angleDeg": 90},
        "DOWN_LEFT": {"frameIndex": 24, "videoFrame": 134, "angleDeg": 135},
        "LEFT": {"frameIndex": 32, "videoFrame": 156, "angleDeg": 180},
        "UP_LEFT": {"frameIndex": 40, "videoFrame": 174, "angleDeg": 225},
        "UP": {"frameIndex": 48, "videoFrame": 182, "angleDeg": 270},
        "UP_RIGHT": {"frameIndex": 56, "videoFrame": 190, "angleDeg": 315},
        "CENTER": {"videoFrame": 234}
    },
    "frameMap": all_64_frames
}

with open(os.path.join(frames_dir, "manifest.json"), "w") as f:
    json.dump(manifest, f, indent=2)

print("Frame extraction complete! Manifest saved.")
