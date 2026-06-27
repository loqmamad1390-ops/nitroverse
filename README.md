# ⚡ NitroVerse

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-black?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-lightblue?style=flat-square&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Status](https://img.shields.io/badge/Status-Online-brightgreen?style=flat-square)](https://nitroverse1.onrender.com)

<p align="center">
  <a href="https://nitroverse1.onrender.com">
    <img src="https://img.shields.io/badge/🚀_مشاهده_پروژه_آنلاین-00eaff?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo">
  </a>
</p>

---

## 📖 درباره پروژه

**NitroVerse** یک پلتفرم **آموزشی-رقابتی** است که با هدف ترکیب **یادگیری، رقابت و هوش مصنوعی** ساخته شده. کاربران با پاسخ به سوالات علمی، امتیاز جمع می‌کنند، رنک خود را بالا می‌برند و در لیگ‌های مختلف رقابت می‌کنند.

> **چشم‌انداز:** ساخت اولین سیستم آموزشی مبتنی بر هوش مصنوعی ایرانی 🇮🇷

---

## 🎯 ویژگی‌های اصلی

| بخش               | توضیح                                            |
| ----------------- | ------------------------------------------------ |
| 👤 **احراز هویت** | ثبت‌نام و ورود با JWT و کوکی‌های امن             |
| 🎮 **بازی**       | آزمون‌های علمی با سه سطح سختی (آسان، متوسط، سخت) |
| 🏆 **رنکینگ**     | ۷ سطح رنک از Normal تا Immortal 👑               |
| 📊 **لیدربورد**   | رتبه‌بندی کاربران با فیلتر استان و جستجو         |
| 🏅 **لیگ‌ها**     | سه لیگ علمی: خوارزمی، ابن‌سینا، بیرونی           |
| 🎖️ **دستاوردها**  | ۱۲ دستاورد با نوار پیشرفت                        |
| 🛍️ **فروشگاه**    | ۱۸ آیتم با سه ارز مختلف                          |
| 👥 **اتحادها**    | ایجاد و عضویت در گروه‌های کاربری                 |
| 📈 **پروفایل**    | نمودارهای عملکرد و تاریخچه فعالیت                |
| 📜 **قوانین**     | مقررات استفاده از پلتفرم                         |

---

## 🛠️ تکنولوژی‌ها

**بک‌اند:**

- Python 3.11+
- Flask 3.0.0
- SQLAlchemy 3.1.1 (ORM)
- JWT 4.6.0 (احراز هویت)
- Bcrypt 1.0.1 (هش رمز)
- SQLite 3.x (دیتابیس)
- Gunicorn 21.2.0 (سرور)

**فرانت‌اند:**

- HTML5 + CSS3
- JavaScript (Vanilla JS)
- Chart.js (نمودار)
- FontAwesome (آیکون)

---

## 📁 ساختار پروژه

Nitro/
├── backend/
│ ├── app/
│ │ ├── routes/
│ │ │ ├── auth.py
│ │ │ ├── admin.py
│ │ │ ├── profile.py
│ │ │ ├── quiz.py
│ │ │ ├── leaderboard.py
│ │ │ ├── shop.py
│ │ │ ├── rank.py
│ │ │ ├── achievements.py
│ │ │ ├── groups.py
│ │ │ └── leagues.py
│ │ ├── models.py
│ │ ├── extensions.py
│ │ ├── config.py
│ │ └── init.py
│ ├── static/
│ ├── run.py
│ ├── requirements.txt
│ └── nitroverse.db
├── Procfile
├── start.bat
└── README.md

---

## 🚀 اجرا

**روی Render (آنلاین):**
https://nitroverse-5r5s.onrender.com

> ⚠️ سرویس رایگان است و ممکن است ۳۰-۵۰ ثانیه تأخیر داشته باشد
