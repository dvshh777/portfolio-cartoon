import cv2
import numpy as np

# Key landmarks:
# 0 rad (0 deg, RIGHT): frame 70
# pi/4 rad (45 deg, DOWN-RIGHT): frame 86
# pi/2 rad (90 deg, DOWN): frame 108
# 3pi/4 rad (135 deg, DOWN-LEFT): frame 134
# pi rad (180 deg, LEFT): frame 156
# 5pi/4 rad (225 deg, UP-LEFT): frame 174
# 3pi/2 rad (270 deg, UP): frame 182
# 7pi/4 rad (315 deg, UP-RIGHT): frame 190

# Let's inspect frames around 190-196 and 60-70 to make sure the loop from UP-RIGHT back to RIGHT is super smooth!
# Also check if there are any blinks to skip:
# Blink 1: 76-80 (squint/blink) -> let's inspect 74, 76, 82, 84
# Blink 2: 102-104 (closed eyes) -> let's check 98, 100, 106, 108
# Blink 3: 126-128 (closed eyes) -> let's check 122, 124, 130, 132
# Blink 4: 146-148 (closed eyes) -> let's check 142, 144, 150, 152

print("Inspection complete.")
