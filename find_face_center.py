import cv2
import numpy as np

img = cv2.imread("center_preview.jpg")
h, w, _ = img.shape
print(f"Image shape: {w}x{h}")

# Robin's eyes are in the mask:
# Robin's green eyes have high green values
# Let's inspect Robin's eyes region:
# In the center preview, Robin's eyes are roughly at x: 900..1020, y: 440..500
# Let's draw crosshairs at (960, 480) and test
test_vis = img.copy()
cv2.circle(test_vis, (960, 480), 8, (0, 255, 255), -1)
cv2.line(test_vis, (960-50, 480), (960+50, 480), (0, 255, 255), 2)
cv2.line(test_vis, (960, 480-50), (960, 480+50), (0, 255, 255), 2)
cv2.imwrite("face_center_test.jpg", test_vis[300:700, 750:1170])
print("Face center tested at (960, 480), which is exactly x = 50.0%, y = 44.44% of 1920x1080")
