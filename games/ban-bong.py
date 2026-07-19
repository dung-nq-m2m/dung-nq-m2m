"""
GAME: BẮN BÓNG ⚽

← → : Di chuyển súng
SPACE: Bắn
"""

import turtle
import random


# =========================
# 1. TẠO MÀN HÌNH
# =========================

man_hinh = turtle.Screen()
man_hinh.title("Bắn bóng")
man_hinh.setup(600, 500)
man_hinh.bgcolor("navy")
man_hinh.tracer(0)


# =========================
# 2. TẠO SÚNG
# =========================

sung = turtle.Turtle()
sung.shape("triangle")
sung.color("yellow")
sung.penup()
sung.goto(0, -200)
sung.setheading(90)


# =========================
# 3. TẠO ĐIỂM
# =========================

diem = 0


bang_diem = turtle.Turtle()
bang_diem.hideturtle()
bang_diem.color("white")
bang_diem.penup()


def hien_thi_diem():
    bang_diem.clear()
    bang_diem.goto(0, 220)

    bang_diem.write(
        "Điểm: " + str(diem),
        align="center",
        font=("Arial", 16, "bold")
    )


# =========================
# 4. TẠO CÁC QUẢ BÓNG
# =========================

muc_tieu = []

for i in range(5):
    bong = turtle.Turtle()
    bong.shape("circle")
    bong.color(random.choice(["red", "orange", "pink"]))
    bong.penup()

    bong.goto(-200 + i * 100, 150)

    muc_tieu.append(bong)


# =========================
# 5. TẠO DANH SÁCH ĐẠN
# =========================

dan = []


# =========================
# 6. DI CHUYỂN SÚNG
# =========================

def sang_trai():
    sung.setx(sung.xcor() - 30)


def sang_phai():
    sung.setx(sung.xcor() + 30)


# =========================
# 7. BẮN
# =========================

def ban():
    vien_dan = turtle.Turtle()

    vien_dan.shape("circle")
    vien_dan.color("white")
    vien_dan.shapesize(0.4, 0.4)
    vien_dan.penup()

    vien_dan.goto(
        sung.xcor(),
        sung.ycor() + 20
    )

    dan.append(vien_dan)


# =========================
# 8. KIỂM TRA ĐẠN BẮN TRÚNG
# =========================

def kiem_tra_trung(vien_dan):
    global diem

    for bong in muc_tieu[:]:

        if vien_dan.distance(bong) < 25:

            bong.hideturtle()
            muc_tieu.remove(bong)

            vien_dan.hideturtle()
            dan.remove(vien_dan)

            diem = diem + 10
            hien_thi_diem()

            return True

    return False


# =========================
# 9. CẬP NHẬT GAME
# =========================

def cap_nhat():
    global diem

    # Di chuyển từng viên đạn
    for vien_dan in dan[:]:

        vien_dan.sety(vien_dan.ycor() + 10)

        # Đạn bay ra khỏi màn hình
        if vien_dan.ycor() > 250:
            vien_dan.hideturtle()
            dan.remove(vien_dan)

            continue

        # Kiểm tra bắn trúng bóng
        da_trung = kiem_tra_trung(vien_dan)

        if da_trung:
            continue

    # Kiểm tra thắng
    if len(muc_tieu) == 0:

        bang_diem.clear()
        bang_diem.goto(0, 0)

        bang_diem.write(
            "THẮNG!\nĐiểm: " + str(diem),
            align="center",
            font=("Arial", 24, "bold")
        )

        man_hinh.update()

        return

    # Cập nhật màn hình
    man_hinh.update()

    # Gọi lại hàm sau 40 mili giây
    man_hinh.ontimer(cap_nhat, 40)


# =========================
# 10. ĐIỀU KHIỂN BÀN PHÍM
# =========================

man_hinh.listen()

man_hinh.onkey(sang_trai, "Left")
man_hinh.onkey(sang_phai, "Right")
man_hinh.onkey(ban, "space")


# =========================
# 11. BẮT ĐẦU GAME
# =========================

hien_thi_diem()

cap_nhat()

turtle.done()

