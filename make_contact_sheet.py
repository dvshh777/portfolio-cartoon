import cv2
import numpy as np
import os

video_path = os.path.join("public", "character.mp4")
cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# We have 240 frames total. Let's sample every 5 frames: 0, 5, 10, ... 235 (48 frames)
# Let's arrange them into a grid of 6 rows x 8 cols or 8 rows x 6 cols to see the timeline clearly
cols = 8
rows = 6
target_w = 240
target_h = 135
grid = np.zeros((rows * target_h, cols * target_w, 3), dtype=np.uint8)

for i in range(rows * cols):
    frame_idx = int(i * (total_frames - 1) / (rows * cols - 1))
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        thumb = cv2.resize(frame, (target_w, target_h))
        # Draw frame number
        cv2.putText(thumb, f"F:{frame_idx}", (10, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        r = i // cols
        c = i % cols
        grid[r*target_h:(r+1)*target_h, c*target_w:(c+1)*target_w] = thumb

cv2.imwrite("contact_sheet.jpg", grid)
print(f"Contact sheet saved to contact_sheet.jpg (total frames: {total_frames})")
cap.release()
