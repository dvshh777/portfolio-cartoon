import cv2
import numpy as np
import os
import json

video_path = os.path.join("public", "character.mp4")
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error: Could not open video:", video_path)
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"Video Info: {width}x{height}, Total Frames: {total_frames}, FPS: {fps}, Duration: {duration:.2f}s")

# Let's check background color from first frame corners
ret, frame = cap.read()
if ret:
    # Sample top-left, top-right, bottom-left, bottom-right corners
    corners = [
        frame[10:30, 10:30],
        frame[10:30, width-30:width-10],
        frame[height-30:height-10, 10:30],
        frame[height-30:height-10, width-30:width-10]
    ]
    mean_bgr = np.mean([np.mean(c, axis=(0, 1)) for c in corners], axis=0)
    b, g, r = int(mean_bgr[0]), int(mean_bgr[1]), int(mean_bgr[2])
    hex_color = f"#{r:02x}{g:02x}{b:02x}"
    print(f"Detected Background BGR: ({b}, {g}, {r}) -> RGB: ({r}, {g}, {b}) -> Hex: {hex_color}")

# Let's inspect some frames across the video and save a contact sheet or individual inspection frames
os.makedirs("inspect_frames", exist_ok=True)
cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

sample_indices = np.linspace(0, total_frames - 1, min(total_frames, 32), dtype=int)
for idx in sample_indices:
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, f = cap.read()
    if ret:
        cv2.imwrite(f"inspect_frames/frame_{idx:04d}.jpg", f)

print(f"Saved {len(sample_indices)} sample frames to inspect_frames/")
cap.release()
