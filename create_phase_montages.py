import cv2
import numpy as np

def make_montage(frame_numbers, out_name, cols=5):
    rows = (len(frame_numbers) + cols - 1) // cols
    cell_w, cell_h = 160, 160
    montage = np.zeros((rows * cell_h, cols * cell_w, 3), dtype=np.uint8)
    for i, fn in enumerate(frame_numbers):
        img_path = f"rotation_frames/f_{fn:03d}.jpg"
        img = cv2.imread(img_path)
        if img is not None:
            thumb = cv2.resize(img, (cell_w, cell_h))
            r = i // cols
            c = i % cols
            montage[r*cell_h:(r+1)*cell_h, c*cell_w:(c+1)*cell_w] = thumb
    cv2.imwrite(out_name, montage)
    print(f"Wrote {out_name}")

# Range 1: Turning right (50 to 75)
make_montage(list(range(50, 76, 2)), "montage_turn_right.jpg", cols=5)

# Range 2: Right to Down (74 to 104)
make_montage(list(range(74, 105, 2)), "montage_right_to_down.jpg", cols=5)

# Range 3: Down to Left (104 to 138)
make_montage(list(range(104, 139, 2)), "montage_down_to_left.jpg", cols=5)

# Range 4: Left to Up (138 to 175)
make_montage(list(range(138, 176, 2)), "montage_left_to_up.jpg", cols=5)

# Range 5: Up to Center (174 to 214)
make_montage(list(range(174, 215, 2)), "montage_up_to_center.jpg", cols=5)
