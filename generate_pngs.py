import zlib
import struct
import math

def create_png(width, height, pixels):
    # pixels is a list of rows, each row is a list of (r, g, b, a) tuples
    raw_data = bytearray()
    for row in pixels:
        raw_data.append(0)  # filter type 0 (None)
        for r, g, b, a in row:
            raw_data.extend([int(r), int(g), int(b), int(a)])
    
    compressed = zlib.compress(raw_data, 9)
    
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    header = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png_bytes = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', header) + chunk(b'IDAT', compressed) + chunk(b'IEND', b'')
    return png_bytes

SIZE = 256

def draw_steam(x, y):
    # Steam logo: dark blue circle, white pipe
    cx, cy, r = 128, 128, 110
    dx, dy = x - cx, y - cy
    dist_sq = dx*dx + dy*dy
    if dist_sq > r*r:
        return (0, 0, 0, 0)
    
    # Outer circle background
    # Gradient from #142236 to #091322
    t = (y / SIZE)
    bg_r = int(20 * (1-t) + 9 * t)
    bg_g = int(34 * (1-t) + 19 * t)
    bg_b = int(54 * (1-t) + 34 * t)
    
    # White steam crank graphics
    # Large circle at (160, 110), r=32
    d1 = math.hypot(x - 160, y - 110)
    # Small circle at (96, 170), r=18
    d2 = math.hypot(x - 96, y - 170)
    
    # Connecting rod line from (96,170) to (160,110)
    # Line segment distance
    x1, y1, x2, y2 = 96, 170, 160, 110
    length = math.hypot(x2 - x1, y2 - y1)
    vx, vy = (x2 - x1)/length, (y2 - y1)/length
    # Projection
    proj = (x - x1)*vx + (y - y1)*vy
    if 0 <= proj <= length:
        perp = abs((x - x1)*(-vy) + (y - y1)*vx)
    else:
        perp = 999
        
    if d1 <= 28 or d2 <= 16 or perp <= 12 or (x < 110 and abs(y - 170) < 12 and x > 60):
        # Hole in large circle
        if d1 <= 14 or d2 <= 8:
            return (bg_r, bg_g, bg_b, 255)
        return (255, 255, 255, 255)
        
    return (bg_r, bg_g, bg_b, 255)

print("Helper script ready")
