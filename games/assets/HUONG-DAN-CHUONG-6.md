# Hướng dẫn Chương 6 — Hình ảnh & âm thanh cho Game

Dành cho học sinh lớp 6 · Học viện Turtle Python

Chương 6 có **5 bài game** chính. Mỗi bài có file Python và hướng dẫn riêng về hình/âm thanh.

| Bài | File game | Hướng dẫn chi tiết |
|-----|-----------|-------------------|
| 🍎 Hứng táo | `hung-tao.py` | [huong-dan-hung-tao.md](huong-dan-hung-tao.md) |
| 💣 Né bom | `ne-bom.py` | [huong-dan-ne-bom.md](huong-dan-ne-bom.md) |
| 🏰 Mê cung | `me-cung.py` | [huong-dan-me-cung.md](huong-dan-me-cung.md) |
| 🏎️ Đua xe | `dua-xe.py` | [huong-dan-dua-xe.md](huong-dan-dua-xe.md) |
| ⚽ Bắn bóng | `ban-bong.py` | [huong-dan-ban-bong.md](huong-dan-ban-bong.md) |

---

## Quy tắc chung (các game)

### Hình nền — `bgpic()`

| Yêu cầu | Chi tiết |
|---------|----------|
| Định dạng | Chỉ **GIF** |
| Kích thước | **600×500** px (khớp `setup(600, 500)`) |
| Code | `man_hinh.bgpic("đường/dẫn/nen.gif")` |

PNG/JPG phải **đổi sang GIF** trước (Paint, GIMP, hoặc trang convert online).

### Hình nhân vật / vật thể — `addshape()` + `shape()`

| Yêu cầu | Chi tiết |
|---------|----------|
| Định dạng | **GIF** (nền trong suốt tốt nhất) |
| Kích thước | **32–64** px cho vật nhỏ; súng ~48 px |
| Cách 2 | `register_shape()` vẽ đa giác — không cần file |

```python
man_hinh.addshape("assets/.../bom.gif")
bom.shape("assets/.../bom.gif")
```

### Âm thanh — `winsound` (Windows)

| Yêu cầu | Chi tiết |
|---------|----------|
| Định dạng | Chỉ **WAV** (không MP3) |
| Độ dài | **0.2 – 1 giây** |
| Code | `winsound.PlaySound(path, winsound.SND_ASYNC)` |

`SND_ASYNC` = phát không làm game bị dừng.

### Cấu trúc thư mục assets

```
games/assets/
├── HUONG-DAN-CHUONG-6.md      ← file này
├── huong-dan-hung-tao.md
├── huong-dan-ne-bom.md
├── huong-dan-me-cung.md
├── huong-dan-dua-xe.md
├── huong-dan-ban-bong.md
├── images/                    ← Hứng táo
├── sounds/                    ← Hứng táo
└── (huong-dan-*.md)

Né bom, Mê cung, Đua xe, Bắn bóng: ảnh/âm đặt **cùng thư mục** `games/` với file `.py`.
```
Nếu **chưa có file ảnh/âm**, mỗi game vẫn chạy với hình vẽ mặc định (circle, turtle, triangle…).

---

## Quy trình dạy (gợi ý)

1. **Thuật toán trước** — kiến trúc, sơ đồ, giả mã (trên website).
2. **Code logic** — học sinh tự gõ, GV mở code từng bài.
3. **Chạy game cơ bản** — không ảnh/âm.
4. **Thêm hình** — nền GIF → nhân vật/vật thể.
5. **Thêm âm thanh** — 1–2 file WAV quan trọng (trúng, thua, thắng).
6. **Tinh chỉnh** — ngưỡng va chạm, tốc độ, độ khó.

---

## Bảng file gợi ý theo game

### Hứng táo

| Loại | File | Khi dùng |
|------|------|----------|
| Nền | `images/nen-vuon.gif` | Cả game |
| Táo | `images/tao.gif` | Quả rơi |
| Âm | `sounds/hung.wav` | Hứng trúng |
| Âm | `sounds/roi.wav` | Táo xuất hiện |

### Né bom

Đặt file **cạnh** `games/ne-bom.py`:

| Loại | File | Khi dùng |
|------|------|----------|
| Âm | `nhac-nen.wav` | Nhạc nền lặp |
| Âm | `no.wav` | Va chạm / GAME OVER |
| Nền | `nen-dem.gif` | Bầu trời đêm (mở rộng) |
| Bom | `bom.gif` | Quả bom rơi (mở rộng) |

### Mê cung

Đặt file **cạnh** `games/me-cung.py`:

| Loại | File | Khi dùng |
|------|------|----------|
| Nền | `nen-me-cung.gif` | Nền mê cung (mở rộng) |
| Đích | `dich.gif` | Sao / cờ vàng |
| Âm | `thang.wav` | Khi tới đích |

### Đua xe

Đặt file **cạnh** `games/dua-xe.py`:

| Loại | File | Khi dùng |
|------|------|----------|
| Nền | `nen-duong.gif` | Đường đua |
| Xe em | `xe-em.gif` | Xe người chơi |
| Xe đối | `xe-doi.gif` | Xe đối thủ |
| Âm | `tong.wav` | Khi tông xe |

### Bắn bóng

Đặt file **cạnh** `games/ban-bong.py`:

| Loại | File | Khi dùng |
|------|------|----------|
| Nền | `nen-san.gif` | Sân bắn |
| Súng | `sung.gif` | Nhân vật |
| Mục tiêu | `muc-tieu.gif` | Bóng/balo trên cao |
| Âm | `ban.wav` | Bắn |
| Âm | `trung.wav` | Trúng mục tiêu |
| Âm | `thang.wav` | Hết mục tiêu — THẮNG |

---

## Lỗi thường gặp

| Lỗi | Cách sửa |
|-----|----------|
| `couldn't open "...gif"` | Kiểm tra tên file, đường dẫn, đúng định dạng GIF |
| Hình quá to/nhỏ | Resize ảnh; chỉnh ngưỡng va chạm / `shapesize()` |
| Không có tiếng | Dùng `.wav`, không `.mp3` |
| Nền méo | Resize ảnh về 600×500 |
| Game chậm | Ảnh GIF quá nặng; giảm màu / kích thước |

---

## Chạy thử

```bash
cd games
python hung-tao.py
python ne-bom.py
python ban-bong.py
```
