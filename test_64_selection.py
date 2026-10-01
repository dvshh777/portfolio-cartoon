import cv2
import numpy as np
import os

# Let's define the 64-frame mapping precisely
# 8 segments of 8 frames each:

# Compass landmarks:
# idx 0: RIGHT (frame 70)
# idx 8: DOWN-RIGHT (frame 86)
# idx 16: DOWN (frame 108)
# idx 24: DOWN-LEFT (frame 134)
# idx 32: LEFT (frame 156)
# idx 40: UP-LEFT (frame 174)
# idx 48: UP (frame 182)
# idx 56: UP-RIGHT (frame 190)

# Let's inspect the exact frames around each segment to ensure no blinks and even angular spacing
seg0_1 = [70, 72, 74, 75, 82, 83, 84, 85] # 0 to 7 -> 8 is 86 (RIGHT to DOWN-RIGHT)
seg1_2 = [86, 88, 91, 94, 97, 100, 105, 107] # 8 to 15 -> 16 is 108 (DOWN-RIGHT to DOWN)
seg2_3 = [108, 111, 114, 117, 120, 123, 130, 132] # 16 to 23 -> 24 is 134 (DOWN to DOWN-LEFT)
seg3_4 = [134, 137, 140, 143, 145, 150, 152, 154] # 24 to 31 -> 32 is 156 (DOWN-LEFT to LEFT)
seg4_5 = [156, 158, 161, 163, 166, 168, 171, 173] # 32 to 39 -> 40 is 174 (LEFT to UP-LEFT)
seg5_6 = [174, 175, 176, 177, 178, 179, 180, 181] # 40 to 47 -> 48 is 182 (UP-LEFT to UP)
seg6_7 = [182, 183, 184, 185, 186, 187, 188, 189] # 48 to 55 -> 56 is 190 (UP to UP-RIGHT)
seg7_8 = [190, 192, 194, 54, 56, 58, 62, 66]     # 56 to 63 -> wrap to 0 (70) (UP-RIGHT to RIGHT)

all_64_indices = seg0_1 + seg1_2 + seg2_3 + seg3_4 + seg4_5 + seg5_6 + seg6_7 + seg7_8
print(f"Total frame count: {len(all_64_indices)}")

cap = cv2.VideoCapture("public/character.mp4")

# Create a montage of all 64 frames (8 rows x 8 cols)
rows, cols = 8, 8
cell_w, cell_h = 140, 140
montage = np.zeros((rows * cell_h, cols * cell_w, 3), dtype=np.uint8)

compass_names = {
    0: "RIGHT (0°)",
    8: "DOWN-RIGHT (45°)",
    16: "DOWN (90°)",
    24: "DOWN-LEFT (135°)",
    32: "LEFT (180°)",
    40: "UP-LEFT (225°)",
    48: "UP (270°)",
    56: "UP-RIGHT (315°)"
}

for i, fn in enumerate(all_64_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
    ret, frame = cap.read()
    if ret:
        crop = frame[50:650, 750:1170]
        thumb = cv2.resize(crop, (cell_w, cell_h))
        # Draw frame number and if it's compass landmark
        color = (0, 255, 255) if i in compass_names else (0, 255, 0)
        cv2.putText(thumb, f"{i}:F{fn}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
        r = i // cols
        c = i % cols
        montage[r*cell_h:(r+1)*cell_h, c*cell_w:(c+1)*cell_w] = thumb

cv2.imwrite("montage_all_64.jpg", montage)
print("Saved montage_all_64.jpg")

# Also check center frame
center_frame_idx = 234
cap.set(cv2.CAP_PROP_POS_FRAMES, center_frame_idx)
ret, c_frame = cap.read()
if ret:
    cv2.imwrite("center_preview.jpg", c_frame)

cap.release()
