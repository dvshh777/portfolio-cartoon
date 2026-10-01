import cv2
import numpy as np

# Let's inspect the transition from UP-RIGHT (188..194) to RIGHT (58..68)
cap = cv2.VideoCapture("public/character.mp4")

frames_to_show = [186, 188, 190, 192, 194, 54, 56, 58, 60, 64, 68, 70]
montage = np.zeros((2 * 160, 6 * 160, 3), dtype=np.uint8)

for i, fn in enumerate(frames_to_show):
    cap.set(cv2.CAP_PROP_POS_FRAMES, fn)
    ret, frame = cap.read()
    if ret:
        crop = frame[50:650, 750:1170]
        thumb = cv2.resize(crop, (160, 160))
        cv2.putText(thumb, f"F:{fn}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
        r = i // 6
        c = i % 6
        montage[r*160:(r+1)*160, c*160:(c+1)*160] = thumb

cv2.imwrite("transition_check.jpg", montage)
print("Saved transition_check.jpg")
cap.release()
