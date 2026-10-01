import cv2
import numpy as np

# In 1920x1080, where is Robin's face?
# Let's inspect frame 10 to find head bounds
f = cv2.imread("all_inspect_frames/frame_010.jpg")
h, w, _ = f.shape
# Robin is centered horizontally, head in top half
# Let's test a crop: y: 50 to 600, x: 750 to 1170
head_crop = f[50:650, 750:1170]
cv2.imwrite("head_sample.jpg", head_crop)

# Let's create a visual contact sheet of Robin's face every 4 frames from 0 to 239
cap = cv2.VideoCapture("public/character.mp4")
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

rows = 12
cols = 5
# 60 frames sampled
sampled_indices = np.linspace(2, total_frames - 1, rows * cols, dtype=int)
sheet = np.zeros((rows * 150, cols * 150, 3), dtype=np.uint8)

for i, idx in enumerate(sampled_indices):
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, frame = cap.read()
    if ret:
        crop = frame[50:650, 750:1170]
        thumb = cv2.resize(crop, (150, 150))
        cv2.putText(thumb, f"{idx}", (5, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        r = i // cols
        c = i % cols
        sheet[r*150:(r+1)*150, c*150:(c+1)*150] = thumb

cv2.imwrite("face_sheet.jpg", sheet)
print("Saved face_sheet.jpg")
cap.release()
