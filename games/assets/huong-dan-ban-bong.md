# Hướng dẫn hình ảnh & âm thanh — Game Bắn bóng ⚽

← [Tổng quan Chương 6](HUONG-DAN-CHUONG-6.md) · Trước: [Đua xe](huong-dan-dua-xe.md)

Dành cho học sinh lớp 6 · Học viện Turtle Python — **Dự án cuối Chương 6**

## 1. Cấu trúc thư mục

```
games/
├── ban-bong.py
├── nen-san.gif      ← sân / không gian bắn (tùy chọn)
├── sung.gif         ← súng / tàu (tùy chọn)
├── muc-tieu.gif     ← mục tiêu / bóng bay (tùy chọn)
├── ban.wav          ← bắn đạn
├── trung.wav        ← trúng mục tiêu
└── thang.wav        ← thắng — hết mục tiêu
```

**Lưu ý:** File ảnh/âm đặt **cùng thư mục** với `ban-bong.py` — không cần thư mục `assets` con.

Chưa có file → nền navy, súng tam giác vàng, mục tiêu hình tròn.

---

## 2. Hình nền (`nen-san.gif`)

| Yêu cầu | Chi tiết |
|---------|----------|
| Định dạng | **GIF** |
| Kích thước | **600×500** px |
| Gợi ý | Sân cỏ, không gian, gradient xanh đậm |

```python
nen = co_file("nen-san.gif")
if nen:
    man_hinh.bgpic(nen)
else:
    man_hinh.bgcolor("navy")
```

Code tìm file bằng:

```python
THU_MUC = os.path.dirname(os.path.abspath(__file__))

def co_file(ten_file):
    duong_dan = os.path.join(THU_MUC, ten_file)
    return duong_dan if os.path.isfile(duong_dan) else None
```

---

## 3. Hình súng (`sung.gif`)

Súng đứng **dưới màn hình**, hướng lên (`setheading(90)`).

### Cách A — GIF

```python
man_hinh.addshape(SUNG_GIF)
sung.shape(SUNG_GIF)
```

`SUNG_GIF = co_file("sung.gif")`

| Yêu cầu | Gợi ý |
|---------|-------|
| Kích thước | **48×64** px |
| Hướng | Mũi súng hướng **lên** trong ảnh |

### Cách B — Tam giác mặc định

```python
sung.shape("triangle")
sung.color("yellow")
sung.setheading(90)
```

---

## 4. Hình mục tiêu (`muc-tieu.gif`)

Game tạo **5 mục tiêu** bằng vòng lặp `for`. Mỗi mục tiêu là một `Turtle`.

### Dùng GIF cho tất cả mục tiêu

```python
man_hinh.addshape(MT_GIF)

for i in range(5):
    mt = turtle.Turtle()
    mt.shape(MT_GIF)
    mt.penup()
    mt.goto(-200 + i * 100, 150)
    muc_tieu.append(mt)
```

`MT_GIF = co_file("muc-tieu.gif")`

| Yêu cầu | Gợi ý |
|---------|-------|
| Kích thước | **40–50** px |
| Hình dạng | Bóng bay, bong bóng, đĩa bay |
| Màu | Có thể dùng 1 GIF hoặc nhiều màu `circle` |

### Va chạm — `distance()`

```python
if vien.distance(mt) < 25:
```

Mục tiêu to hơn → tăng ngưỡng **25 → 30–40**.

---

## 5. Đạn (viên đạn)

Đạn tạo động khi bấm Space — thường **không cần GIF** (hình tròn nhỏ trắng):

```python
vien.shape("circle")
vien.color("white")
vien.shapesize(0.4, 0.4)
```

**Mở rộng:** `dan.gif` 16×16 px nếu muốn đạn là ngôi sao / laser.

---

## 6. Âm thanh

| File | Khi phát | Gợi ý |
|------|----------|-------|
| `ban.wav` | Bấm Space | "Pew", "whoosh" ngắn |
| `trung.wav` | `distance() < 25` | "Pop", "explosion" nhỏ |
| `thang.wav` | `muc_tieu` rỗng | Fanfare ngắn, "victory" |

```python
def ban():
    phat_am("ban.wav")
    # ... tạo viên đạn

# Trong cap_nhat(), khi trúng:
phat_am("trung.wav")

# Khi thắng:
phat_am("thang.wav")
```

---

## 7. Khác biệt — quản lý nhiều đối tượng

| Khái niệm | Code |
|-----------|------|
| Danh sách đạn | `dan = []` |
| Danh sách mục tiêu | `muc_tieu = []` |
| Thêm đạn | `dan.append(vien)` |
| Xóa an toàn | `for vien in dan[:]:` |
| Kiểm tra trúng | `vien.distance(mt) < 25` |
| Thắng | `if not muc_tieu:` |

**Quan trọng:** Dùng `dan[:]` và `muc_tieu[:]` khi xóa trong vòng lặp!

---

## 8. Quy trình làm bài (dự án cuối)

1. Vẽ sơ đồ duyệt `dan` và `muc_tieu`.
2. Code logic từ giả mã — chạy không ảnh/âm.
3. Thêm `muc-tieu.gif` hoặc giữ hình tròn màu.
4. Thêm `sung.gif` và `nen-san.gif`.
5. Thêm `ban.wav` + `trung.wav` + `thang.wav`.
6. **Tự thiết kế game mới** — áp dụng kiến trúc 4 tầng!

---

## 9. Chạy thử

```bash
cd games
python ban-bong.py
```

Phím: **← →** di chuyển súng · **Space** bắn · Bắn hết 5 mục tiêu để **THẮNG**!
