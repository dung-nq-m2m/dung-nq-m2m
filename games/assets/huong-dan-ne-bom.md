# Hướng dẫn hình ảnh & âm thanh — Game Né bom 💣

← [Tổng quan Chương 6](HUONG-DAN-CHUONG-6.md) · Trước: [Hứng táo](huong-dan-hung-tao.md) · Tiếp: [Mê cung](huong-dan-me-cung.md)

Dành cho học sinh lớp 6 · Học viện Turtle Python

## 1. Cấu trúc thư mục

```
games/
├── ne-bom.py
├── nhac-nen.wav    ← nhạc nền lặp (tùy chọn)
├── no.wav          ← va chạm — GAME OVER
├── nen-dem.gif     ← nền bầu trời đêm (tùy chọn, mở rộng)
└── bom.gif         ← hình quả bom (tùy chọn, mở rộng)
```

**Lưu ý:** File ảnh/âm đặt **cùng thư mục** với `ne-bom.py`.

Chưa có file → nền đen, bom hình tròn đỏ, rùa xanh lá.

---

## 2. Hình nền (`nen-dem.gif`)

Game Né bom thường dùng **nền tối** (bầu trời đêm, thành phố).

| Yêu cầu | Chi tiết |
|---------|----------|
| Định dạng | **GIF** |
| Kích thước | **600×500** px |
| Gợi ý | Sao, tòa nhà silhouette, gradient đêm |

```python
nen = co_file("nen-dem.gif")  # cùng thư mục với ne-bom.py
if nen:
    man_hinh.bgpic(nen)
else:
    man_hinh.bgcolor("black")
```

**Mẹo:** Nền tối giúp bom đỏ/nổ sáng nổi bật hơn.

---

## 3. Hình quả bom

### Cách A — File GIF

```python
man_hinh.addshape(BOM_GIF)
bom.shape(BOM_GIF)
```

| Yêu cầu | Gợi ý |
|---------|-------|
| Kích thước | **40–56** px |
| Hình dạng | Bom tròn đen, hoặc 💣 có ngòi nổ |
| Nền | Trong suốt |

### Cách B — Vẽ bằng `register_shape()` (code mẫu)

```python
man_hinh.register_shape("bom_ve", (
    (0, 14), (10, 8), (12, 0), (10, -10), (0, -14),
    (-10, -10), (-12, 0), (-10, 8)
))
bom.shape("bom_ve")
bom.color("red")
```

### Va chạm 2 chiều

Né bom kiểm tra **cả X và Y** (khác Hứng táo chỉ so X):

```python
if abs(bom.xcor() - nguoi.xcor()) < 25 and abs(bom.ycor() - nguoi.ycor()) < 25:
    song = False
```

Bom to hơn → tăng ngưỡng **25 → 30–35**.

---

## 4. Nhân vật (người chơi)

| Cách | Gợi ý |
|------|-------|
| Mặc định | `shape("turtle")`, màu `lime` |
| GIF | `nguoi.gif` ~48 px — nhân vật đứng |
| Đổi hình | `addshape()` + `shape()` giống bom |

Giữ nhân vật **ở dưới màn hình** (`y ≈ -200`) để dễ né.

---

## 5. Âm thanh

| File | Khi phát | Gợi ý âm thanh |
|------|----------|----------------|
| `nhac-nen.wav` | Bắt đầu game | Nhạc nền lặp (`SND_LOOP`) |
| `no.wav` | Va chạm bom | Tiếng nổ / "boom" ngắn |

```python
THU_MUC = os.path.dirname(os.path.abspath(__file__))

def co_am(ten_file):
    path = os.path.join(THU_MUC, ten_file)
    return path if os.path.isfile(path) else None

# Bắt đầu
phat_nhac_nen()   # nhac-nen.wav

# GAME OVER
dung_nhac_nen()
phat_am("no.wav")
```

**Lưu ý:** File đặt cạnh `ne-bom.py`. Âm thanh dùng `SND_ASYNC` để không lag.

---

## 6. Khác biệt so với Hứng táo

| | Hứng táo | Né bom |
|---|----------|--------|
| Vòng lặp | `sety()` một lần / `ontimer` | `ontimer` liên tục 50ms |
| Trạng thái | Chỉ điểm | `song = True/False` |
| Tốc độ | Cố định | `toc_do` tăng mỗi 5 điểm |
| Va chạm | Chỉ trục X | Cả X và Y |
| Hiển thị | Thường | `tracer(0)` + `update()` |

---

## 7. Quy trình làm bài

1. Hiểu biến `song` và `if not song: return`.
2. Chạy `ne-bom.py` không ảnh/âm.
3. Thêm `bom.gif` hoặc hình `bom_ve`.
4. Thêm `nen-dem.gif`.
5. Thêm `no.wav` khi GAME OVER.

**Mở rộng:** Thêm `diem.wav` khi né được; hiệu ứng nhấp nháy màn hình khi thua.

---

## 8. Chạy thử

```bash
cd games
python ne-bom.py
```

Phím: **← →** di chuyển · Tránh bom rơi!
