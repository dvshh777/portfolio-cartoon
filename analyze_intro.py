import cv2
import numpy as np
import os

# Let's inspect the transition at the beginning:
# check frames 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
cap = cv2.VideoCapture(os.path.join("public", "character.mp4"))

print("First 15 frames background color (at 20, 20):")
for i in range(15):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if ret:
        b, g, r = frame[20, 20]
        print(f"Frame {i:2d}: RGB({r}, {g}, {b})")

# Let's see what happens throughout the entire video
# Let's find:
# 1. Frames where head is stationary vs moving
# 2. Track motion or detect face orientation
cap.release()
