import cv2
import numpy as np
import os

video_path = os.path.join("public", "character.mp4")
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

os.makedirs("all_inspect_frames", exist_ok=True)

# Check background color on frame 100
cap.set(cv2.CAP_PROP_POS_FRAMES, 100)
ret, frame = cap.read()
if ret:
    h, w, _ = frame.shape
    # corners on frame 100
    c1 = frame[10:50, 10:50]
    c2 = frame[10:50, w-50:w-10]
    c3 = frame[h-50:h-10, 10:50]
    c4 = frame[h-50:h-10, w-50:w-10]
    mean_bgr = np.mean([np.mean(c, axis=(0, 1)) for c in [c1, c2, c3, c4]], axis=0)
    b, g, r = int(mean_bgr[0]), int(mean_bgr[1]), int(mean_bgr[2])
    print(f"Frame 100 Background RGB: ({r}, {g}, {b}) -> Hex: #{r:02x}{g:02x}{b:02x}")

# Save every 2nd or 3rd frame or specific ranges to inspect closely
for idx in range(0, total_frames, 2):
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f"all_inspect_frames/frame_{idx:03d}.jpg", frame)

print(f"Saved {total_frames // 2} frames to all_inspect_frames/")
cap.release()
