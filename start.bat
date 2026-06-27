@echo off
chcp 65001 > nul
title NitroVerse - Launcher

echo.
echo ============================================================
echo    🔥 NITROVERSE - PROFESSIONAL LAUNCHER
echo ============================================================
echo.

:: ============================================
:: مرحله 1: بررسی پایتون
:: ============================================
echo [1/6] Checking Python installation...
python --version > nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Python not found!
    echo.
    echo Please install Python 3.8 or higher
    echo Download: https://www.python.org/downloads/
    echo.
    echo After installation, run this file again.
    echo.
    pause
    exit /b 1
)
echo ✅ Python is installed!
echo.

:: ============================================
:: مرحله 2: پاک کردن تنظیمات آینه
:: ============================================
echo [2/6] Clearing pip mirror settings...
pip config unset global.index-url > nul 2>&1
pip config unset install.index-url > nul 2>&1
echo ✅ Mirror settings cleared!
echo.

:: ============================================
:: مرحله 3: نصب وابستگی‌ها (از منبع اصلی)
:: ============================================
echo [3/6] Installing dependencies from pypi.org...
echo This may take 2-3 minutes. Please wait...
echo.

cd backend

:: نصب از منبع اصلی با --no-cache-dir
pip install --no-cache-dir -r requirements.txt --index-url https://pypi.org/simple --progress-bar on

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Failed to install dependencies!
    echo.
    echo Possible reasons:
    echo 1. Internet connection is slow or blocked
    echo 2. Try again later
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

:: ============================================
:: مرحله 4: ساخت دیتابیس
:: ============================================
echo [4/6] Setting up database...

:: حذف دیتابیس قبلی
if exist nitroverse.db (
    del nitroverse.db
    echo    - Old database removed
)

:: حذف migrations قبلی
if exist migrations (
    rmdir /s /q migrations
    echo    - Old migrations removed
)

:: ساخت دیتابیس جدید
echo    - Initializing database...
flask db init > nul 2>&1

echo    - Creating migration...
flask db migrate -m "Initial migration" > nul 2>&1

echo    - Upgrading database...
flask db upgrade > nul 2>&1

echo.
echo ✅ Database created successfully!
echo.

:: ============================================
:: مرحله 5: باز کردن فرانت‌اند
:: ============================================
echo [5/6] Opening frontend...

:: پیدا کردن مسیر فرانت‌اند
set FRONTEND_PATH=..\frontend\index.html

if exist "%FRONTEND_PATH%" (
    start "" "%FRONTEND_PATH%"
    echo ✅ Frontend opened in browser!
) else (
    echo ⚠️ Warning: frontend/index.html not found!
    echo    Please open it manually.
)

echo.

:: ============================================
:: مرحله 6: آماده‌سازی برای اجرا
:: ============================================
echo [6/6] Preparing server...

:: تنظیم متغیرهای محیطی
set FLASK_APP=app
set FLASK_ENV=development

echo.
echo ============================================================
echo    ✅ NITROVERSE IS READY!
echo ============================================================
echo.
echo    📌 Backend:  http://localhost:5000
echo    📌 Frontend: Open in your browser
echo.
echo    💡 Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

:: اجرای بک‌اند
python run.py

:: اگر کاربر Ctrl+C زد
if errorlevel 1 (
    echo.
    echo ============================================================
    echo    👋 Server stopped. Goodbye!
    echo ============================================================
    echo.
    pause
)