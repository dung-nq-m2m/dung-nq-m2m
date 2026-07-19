# 🐢 Học viện Turtle Python

Giáo trình điện tử dành cho học sinh lớp 6 — **Ths. Nguyễn Quốc Dũng**

## Cấu trúc dự án

```
turtle_code/
├── index.html          # Trang chủ
├── lesson.html         # Trang bài học (template chung)
├── challenges.html     # Thử thách
├── games.html          # Game Turtle
├── teacher.html        # Khu vực giáo viên
├── css/style.css       # Giao diện Scratch-style
├── js/                 # Logic frontend
├── data/
│   ├── chapters.json   # Cấu trúc chương trình
│   ├── challenges.json
│   ├── games.json
│   ├── teacher.json
│   └── lessons/        # Nội dung từng bài (JSON)
└── games/              # File Python game mẫu
```

## Chạy thử trên máy

Website là static HTML — cần chạy qua local server (trình duyệt chặn fetch file JSON khi mở trực tiếp):

```bash
# Python 3
python -m http.server 8080

# Hoặc Node.js
npx serve .
```

Mở trình duyệt: http://localhost:8080

## Thêm bài học mới

1. Tạo file `data/lessons/ten-bai.json` theo mẫu `forward.json`
2. Thêm entry vào `data/chapters.json`
3. Cập nhật `prev` / `next` giữa các bài liền kề

## Bố cục mỗi bài học

Mỗi bài JSON gồm: Mục tiêu → Giải thích → Animation → Code → Kết quả → Ghi nhớ → Bài tập → Infographic → Quiz

## Triển khai miễn phí

- **GitHub Pages**: push repo → Settings → Pages → branch `main`
- **Cloudflare Pages**: kết nối repo, build command để trống, output `/`

## Tiến độ học

Website lưu bài đã hoàn thành vào `localStorage` khi học sinh trả lời đúng quiz.

## Mở rộng sau này

- Thêm Pyodide để chạy Python trực tiếp trên trình duyệt
- Firebase cho đăng nhập và đồng bộ tiến độ
- Next.js nếu cần quản lý nội dung phức tạp hơn

## Bài học đã có nội dung

| Chương | Bài |
|--------|-----|
| 1 | Turtle là gì?, Cài đặt Python, Chương trình đầu tiên |
| 2 | forward(), backward(), left(), right(), penup/pendown |
| 3 | pencolor(), fillcolor(), begin_fill(), end_fill() |
| 4 | Hình vuông, Tam giác, Ngôi sao, Đa giác |
| 5 | onclick(), onscreenclick(), onkeypress(), listen() |
| 6 | Hứng táo, Né bom, Mê cung, Đua xe, Bắn bóng |

Toàn bộ **23 bài học** đã có nội dung đầy đủ.

### Chương 6 — Quy trình dạy Game

1. Kiến trúc 4 tầng (Khởi tạo → Nhập → Logic → Hiển thị)
2. Biểu đồ thuật toán + bảng biến
3. Giả mã (pseudocode) — học sinh tự gõ
4. Giáo viên mở code tại trang **Giáo viên** (mã: `dungnq`, đổi trong `data/config.json`)

Code Chương 6 và trang Game **bị khóa** cho đến khi GV nhập mã trên trình duyệt lớp.

## Game Python (thư mục `games/`)

| Game | File | Điều khiển |
|------|------|------------|
| Bắn bóng | ban-bong.py | ← → Space |
| Hứng táo | hung-tao.py | ← → Space |
| Né bom | ne-bom.py | ← → |
| Mê cung | me-cung.py | ↑ ↓ ← → |
| Rắn săn mồi | ran-san-moi.py | ↑ ↓ ← → |
| Flappy Bird | flappy-bird.py | Space |
| Đua xe | dua-xe.py | ← → |
| Space Invader | space-invader.py | ← → Space |

### Chương 6 — Hình ảnh & âm thanh

Tổng quan: [`games/assets/HUONG-DAN-CHUONG-6.md`](games/assets/HUONG-DAN-CHUONG-6.md)

| Bài | Hướng dẫn | File game |
|-----|-----------|-----------|
| Hứng táo | [huong-dan-hung-tao.md](games/assets/huong-dan-hung-tao.md) | `hung-tao.py` |
| Né bom | [huong-dan-ne-bom.md](games/assets/huong-dan-ne-bom.md) | `ne-bom.py` |
| Mê cung | [huong-dan-me-cung.md](games/assets/huong-dan-me-cung.md) | `me-cung.py` |
| Đua xe | [huong-dan-dua-xe.md](games/assets/huong-dan-dua-xe.md) | `dua-xe.py` |
| Bắn bóng | [huong-dan-ban-bong.md](games/assets/huong-dan-ban-bong.md) | `ban-bong.py` |

Trên website, mỗi bài Chương 6 có thẻ **Hình ảnh & âm thanh** tóm tắt file cần chuẩn bị.

### Hình ảnh & âm thanh (tóm tắt)

- **Hình:** chỉ **GIF** (`bgpic`, `addshape`) · ~600×500 nền · 32–64 px vật thể
- **Âm thanh:** chỉ **WAV** trên Windows (`winsound`, `SND_ASYNC`)
