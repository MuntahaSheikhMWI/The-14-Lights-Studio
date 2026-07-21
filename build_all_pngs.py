import os
import zlib
import struct
import math

SIZE = 256

def create_png(width, height, pixels):
    raw_data = bytearray()
    for row in pixels:
        raw_data.append(0)  # filter type 0
        for r, g, b, a in row:
            raw_data.extend([int(r), int(g), int(b), int(a)])
    
    compressed = zlib.compress(raw_data, 9)
    
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    header = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', header) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')

def generate_steam():
    pixels = []
    cx, cy, r = 128, 128, 115
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            dx, dy = x - cx, y - cy
            dist = math.hypot(dx, dy)
            if dist > r + 1:
                row.append((0, 0, 0, 0))
            else:
                alpha = 255 if dist <= r - 1 else int(255 * (r + 1 - dist) / 2)
                # Background gradient
                t = y / SIZE
                br = int(20 * (1-t) + 9 * t)
                bg = int(34 * (1-t) + 19 * t)
                bb = int(54 * (1-t) + 34 * t)
                
                # Steam mechanism shapes
                d1 = math.hypot(x - 165, y - 110)
                d2 = math.hypot(x - 95, y - 175)
                
                # Rod connecting
                vx, vy = (165 - 95)/80.6, (110 - 175)/80.6
                proj = (x - 95)*vx + (y - 175)*vy
                perp = abs((x - 95)*(-vy) + (y - 175)*vx)
                is_rod = (0 <= proj <= 80.6 and perp <= 14)
                is_arm = (x <= 95 and abs(y - 175) <= 14 and x >= 40)
                
                is_white = (d1 <= 32 or d2 <= 20 or is_rod or is_arm)
                is_hole = (d1 <= 16 or d2 <= 9)
                
                if is_white and not is_hole:
                    row.append((255, 255, 255, alpha))
                else:
                    row.append((br, bg, bb, alpha))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_xbox():
    pixels = []
    cx, cy, r = 128, 128, 115
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            dx, dy = x - cx, y - cy
            dist = math.hypot(dx, dy)
            if dist > r + 1:
                row.append((0, 0, 0, 0))
            else:
                alpha = 255 if dist <= r - 1 else int(255 * (r + 1 - dist) / 2)
                # Green metallic sphere
                angle = math.atan2(dy, dx)
                nx, ny = dx/r, dy/r
                radial = dist / r
                
                # X cutout curves
                # Top cutout, bottom cutout, left cutout, right cutout
                abs_x = abs(dx)
                abs_y = abs(dy)
                
                # X shape
                is_x_gap = False
                if abs_y > 10 and abs_x < (abs_y * 0.85 + 8) and abs_x > (abs_y * 0.4 - 5):
                    if dy < -10 and abs_x < 75:
                        is_x_gap = True
                    elif dy > 10 and abs_x < 85:
                        is_x_gap = True
                
                if is_x_gap:
                    row.append((16, 124, 65, alpha))
                else:
                    # Metallic green gradient
                    gr = int(35 + 120 * (1 - radial*0.6))
                    gg = int(140 + 105 * (1 - radial*0.5))
                    gb = int(20 + 30 * (1 - radial*0.6))
                    row.append((gr, gg, gb, alpha))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_playstation():
    pixels = []
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            # Vertical P
            in_p = False
            if 105 <= x <= 142 and 35 <= y <= 210:
                in_p = True
            elif 135 <= x <= 205 and 35 <= y <= 125:
                # Top loop of P
                dp = math.hypot(x - 142, y - 80)
                if 25 <= dp <= 52:
                    in_p = True
            
            # Horizontal S shadow shapes (Yellow, Teal, Blue)
            # Yellow bottom-left curve
            in_yellow = False
            if 30 <= x <= 130 and 175 <= y <= 215:
                if math.hypot((x - 80)/1.2, y - 195) <= 28:
                    in_yellow = True
            
            # Teal middle S curve
            in_teal = False
            if 90 <= x <= 185 and 165 <= y <= 220:
                if math.hypot((x - 135)/1.4, y - 190) <= 22 and not in_p:
                    in_teal = True
                    
            # Blue right S shadow curve
            in_blue = False
            if 150 <= x <= 230 and 155 <= y <= 225:
                if math.hypot((x - 185)/1.5, y - 185) <= 28 and not in_p:
                    in_blue = True
            
            if in_p:
                row.append((223, 0, 36, 255)) # Red
            elif in_yellow:
                row.append((243, 195, 0, 255)) # Yellow
            elif in_teal:
                row.append((0, 176, 185, 255)) # Teal
            elif in_blue:
                row.append((0, 114, 206, 255)) # Blue
            else:
                row.append((0, 0, 0, 0))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_unity():
    pixels = []
    cx, cy = 128, 128
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            dx, dy = x - cx, y - cy
            dist = math.hypot(dx, dy)
            # Hexagon outline / 3D cube frame
            angle = math.atan2(dy, dx)
            # 6-fold symmetry
            sec = math.floor((angle + math.pi/6) / (math.pi/3))
            rot_angle = angle - sec * (math.pi/3)
            r_hex = dist * math.cos(rot_angle)
            
            if 65 <= r_hex <= 105:
                # 3 spokes
                spoke_angle = math.fmod(angle + 4*math.pi, 2*math.pi/3)
                if abs(spoke_angle - math.pi/3) < 0.18 or r_hex >= 85:
                    row.append((255, 255, 255, 255))
                else:
                    row.append((0, 0, 0, 0))
            else:
                row.append((0, 0, 0, 0))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_unreal():
    # Unreal Engine 'U' glyph in dark circle
    pixels = []
    cx, cy, r = 128, 128, 115
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            dx, dy = x - cx, y - cy
            dist = math.hypot(dx, dy)
            if dist > r:
                row.append((0, 0, 0, 0))
            else:
                # Outer white circle ring
                if dist >= r - 8:
                    row.append((255, 255, 255, 255))
                else:
                    # Unreal U glyph
                    # Central U body
                    ux = (x - cx)
                    uy = (y - cy)
                    in_u = False
                    if -45 <= ux <= 45 and -50 <= uy <= 50:
                        # U curve
                        if uy > 0 and math.hypot(ux, uy) <= 45 and math.hypot(ux, uy) >= 15:
                            in_u = True
                        elif uy <= 0 and (15 <= abs(ux) <= 45):
                            in_u = True
                        # Sharp U horns at top
                        if uy < -20 and (abs(ux) >= 20):
                            in_u = True
                    
                    if in_u:
                        row.append((255, 255, 255, 255))
                    else:
                        row.append((5, 5, 7, 255))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_meta():
    # Meta infinity loop icon
    pixels = []
    cx, cy = 128, 128
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            dx, dy = x - cx, y - cy
            # Lemniscate of Bernoulli or twin circles
            d_left = math.hypot(dx + 42, dy)
            d_right = math.hypot(dx - 42, dy)
            
            in_loop = (28 <= d_left <= 56) or (28 <= d_right <= 56)
            if in_loop:
                row.append((6, 104, 225, 255)) # Meta Blue
            else:
                row.append((0, 0, 0, 0))
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

def generate_nvidia():
    # Nvidia green eye square
    pixels = []
    for y in range(SIZE):
        row = []
        for x in range(SIZE):
            # Rounded rectangle container
            dx = max(0, abs(x - 128) - 90)
            dy = max(0, abs(y - 128) - 90)
            if dx*dx + dy*dy > 30*30:
                row.append((0, 0, 0, 0))
            else:
                # Bright NVIDIA Green background
                # White spiral eye logo inside
                eyex = x - 128
                eyey = y - 128
                r_eye = math.hypot(eyex, eyey)
                
                # Right square backdrop
                in_white_sq = (eyex >= -10 and abs(eyey) <= 55)
                
                # Eye arcs
                in_eye_arc = (35 <= r_eye <= 65 and eyex <= 10)
                in_pupil = (10 <= r_eye <= 25)
                
                if (in_eye_arc or in_white_sq) and not in_pupil:
                    row.append((255, 255, 255, 255))
                else:
                    row.append((118, 185, 0, 255)) # Nvidia Green #76B900
        pixels.append(row)
    return create_png(SIZE, SIZE, pixels)

os.makedirs('public/platforms', exist_ok=True)
with open('public/platforms/steam.png', 'wb') as f: f.write(generate_steam())
with open('public/platforms/xbox.png', 'wb') as f: f.write(generate_xbox())
with open('public/platforms/playstation.png', 'wb') as f: f.write(generate_playstation())
with open('public/platforms/unity.png', 'wb') as f: f.write(generate_unity())
with open('public/platforms/unreal.png', 'wb') as f: f.write(generate_unreal())
with open('public/platforms/meta.png', 'wb') as f: f.write(generate_meta())
with open('public/platforms/nvidia.png', 'wb') as f: f.write(generate_nvidia())

print("All 7 PNG files built successfully!")
