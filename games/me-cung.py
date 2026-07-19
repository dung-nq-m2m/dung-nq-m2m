"""
Game: Mê cung 🏰
Học viện Turtle Python - Lớp 6

↑ ↓ ← → tìm ngôi sao vàng
Mỗi bức tường = một đoạn thẳng (x1, y1) → (x2, y2)
"""
import turtle

man_hinh = turtle.Screen()
man_hinh.title("Mê cung 🏰")
man_hinh.bgcolor("white")
man_hinh.setup(500, 500)
man_hinh.tracer(0)

tuong = turtle.Turtle()
tuong.speed(0)
tuong.pensize(4)
tuong.color("navy")
tuong.hideturtle()

# Danh sách tường (x1, y1, x2, y2) — dùng chung để VẼ + VA CHẠM
# Lối đi: góc trên-trái (rùa) → góc dưới-phải (sao vàng)
DANH_SACH_TUONG = [
    # ===== Tường ngoài =====
    (-180, 180, 180, 180),
    (180, 180, 180, -180),
    (180, -180, -180, -180),
    (-180, -180, -180, 180),

    # ===== Hàng 1 (y = 100): hành lang trên, lối mở bên phải =====
    (-180, 100, 60, 100),
    (100, 100, 180, 100),

    # ===== Cột dọc từ hàng 1 xuống =====
    (60, 100, 60, 20),
    (100, 100, 100, -20),

    # ===== Hàng 2 (y = 20) =====
    (-180, 20, -60, 20),
    (-20, 20, 60, 20),
    (100, 20, 140, 20),

    # ===== Cột giữa =====
    (-60, 20, -60, -60),
    (-20, 20, -20, -100),
    (140, 20, 140, -100),

    # ===== Hàng 3 (y = -60) =====
    (-180, -60, -60, -60),
    (20, -60, 140, -60),

    # ===== Hàng 4 (y = -100) =====
    (-20, -100, 100, -100),
    (-180, -100, -100, -100),

    # ===== Cột gần đích =====
    (100, -100, 100, -180),
    (-100, -100, -100, -140),

    # ===== Hàng dưới cùng — chừa lối tới sao vàng (phải) =====
    (-180, -140, 60, -140),
]


def ve_tuong(x1, y1, x2, y2):
    tuong.penup()
    tuong.goto(x1, y1)
    tuong.pendown()
    tuong.goto(x2, y2)


def ve_me_cung():
    for x1, y1, x2, y2 in DANH_SACH_TUONG:
        ve_tuong(x1, y1, x2, y2)


def cham_tuong(x, y):
    """True nếu điểm (x, y) chạm gần một bức tường."""
    for x1, y1, x2, y2 in DANH_SACH_TUONG:
        if y1 == y2:  # ngang
            if min(x1, x2) - 8 <= x <= max(x1, x2) + 8:
                if abs(y - y1) < 12:
                    return True
        if x1 == x2:  # dọc
            if min(y1, y2) - 8 <= y <= max(y1, y2) + 8:
                if abs(x - x1) < 12:
                    return True
    return False


ve_me_cung()

dich = turtle.Turtle()
dich.shape("circle")
dich.color("gold")
dich.penup()
dich.goto(140, -160)
dich.shapesize(1.5, 1.5)

rua = turtle.Turtle()
rua.shape("turtle")
rua.color("green")
rua.penup()
rua.goto(-150, 140)
rua.setheading(270)

buoc = 20
thang = False

thong_bao = turtle.Turtle()
thong_bao.hideturtle()
thong_bao.penup()
thong_bao.goto(0, 210)
thong_bao.write(
    "↑↓←→ tìm sao vàng — không xuyên tường!",
    align="center",
    font=("Arial", 12, "bold")
)

man_hinh.update()


def kiem_tra_thang():
    global thang
    if abs(rua.xcor() - dich.xcor()) < 25 and abs(rua.ycor() - dich.ycor()) < 25:
        thang = True
        thong_bao.clear()
        thong_bao.write(
            "🎉 THẮNG RỒI!",
            align="center",
            font=("Arial", 22, "bold")
        )
        man_hinh.update()


def di_chuyen(huong):
    if thang:
        return

    x_cu = rua.xcor()
    y_cu = rua.ycor()
    rua.setheading(huong)
    rua.forward(buoc)

    if cham_tuong(rua.xcor(), rua.ycor()):
        rua.goto(x_cu, y_cu)
    else:
        kiem_tra_thang()
    man_hinh.update()


def di_len():
    di_chuyen(90)


def di_xuong():
    di_chuyen(270)


def di_trai():
    di_chuyen(180)


def di_phai():
    di_chuyen(0)


man_hinh.listen()
man_hinh.onkey(di_len, "Up")
man_hinh.onkey(di_xuong, "Down")
man_hinh.onkey(di_trai, "Left")
man_hinh.onkey(di_phai, "Right")

turtle.done()
