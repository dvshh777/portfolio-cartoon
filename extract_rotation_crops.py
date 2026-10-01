import cv2
import numpy as np
import os

cap = cv2.VideoCapture("public/character.mp4")

# Let's save face crops for every single frame from 45 to 215
os.makedirs("rotation_frames", exist_ok=True)

for i in range(45, 215):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        # Crop Robin's face
        crop = frame[50:650, 750:1170]
        # Overlay frame index
        vis = crop.copy()
        cv2.putText(vis, f"F:{i}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 2)
        cv2.imwrite(f"rotation_frames/f_{i:03d}.jpg", vis)

print("Saved frames 45 to 214 in rotation_frames/")
cap.release()
