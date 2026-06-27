# backend/app/routes/admin.py
from flask import Blueprint, jsonify, render_template_string
from ..extensions import db
from ..models import User, Profile, RefreshToken, QuizHistory, UserAchievement, UserItem, UserBalance, Group, GroupMember, League

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

# یه صفحه HTML ساده برای ساخت دیتابیس
HTML_PAGE = """
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ساخت دیتابیس | NitroVerse</title>
    <style>
        body {
            font-family: 'Vazirmatn', sans-serif;
            background: #0a0f1f;
            color: #00eaff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            flex-direction: column;
        }
        .card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(0,234,255,0.2);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 0 40px rgba(0,234,255,0.05);
        }
        h1 { font-size: 1.8rem; margin-bottom: 10px; }
        p { color: #aab0c8; line-height: 1.8; }
        .btn {
            background: rgba(0,234,255,0.1);
            border: 1px solid #00eaff;
            color: #00eaff;
            padding: 14px 40px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 10px;
        }
        .btn:hover {
            background: #00eaff;
            color: #000;
            box-shadow: 0 0 30px rgba(0,234,255,0.3);
        }
        .status {
            margin-top: 15px;
            padding: 10px;
            border-radius: 10px;
            font-weight: 600;
            display: none;
        }
        .status.success {
            display: block;
            background: rgba(34,197,94,0.1);
            border: 1px solid #22c55e;
            color: #22c55e;
        }
        .status.error {
            display: block;
            background: rgba(239,68,68,0.1);
            border: 1px solid #ef4444;
            color: #ef4444;
        }
        .status.info {
            display: block;
            background: rgba(0,234,255,0.05);
            border: 1px solid rgba(0,234,255,0.2);
            color: #00eaff;
        }
        .tables {
            margin-top: 15px;
            font-size: 0.85rem;
            color: #aab0c8;
            text-align: right;
            padding: 10px;
            background: rgba(255,255,255,0.03);
            border-radius: 10px;
            display: none;
        }
        .tables.show { display: block; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🔧 ساخت دیتابیس</h1>
        <p>برای ساخت جداول دیتابیس، روی دکمه زیر کلیک کن.</p>
        <button class="btn" id="createBtn">🚀 ساخت دیتابیس</button>
        <div id="status" class="status"></div>
        <div id="tablesList" class="tables"></div>
        <p style="margin-top:15px; font-size:0.7rem; opacity:0.3;">
            ⚠️ فقط برای استفاده‌ی مدیریتی
        </p>
    </div>

    <script>
        document.getElementById('createBtn').addEventListener('click', async function() {
            const status = document.getElementById('status');
            const tablesList = document.getElementById('tablesList');
            
            status.className = 'status info';
            status.textContent = '⏳ در حال ساخت دیتابیس...';
            status.style.display = 'block';
            
            this.disabled = true;
            
            try {
                const response = await fetch('/admin/create-db');
                const result = await response.json();
                
                if (result.success) {
                    status.className = 'status success';
                    status.textContent = '✅ ' + result.message;
                    
                    if (result.tables && result.tables.length > 0) {
                        tablesList.innerHTML = '📋 جداول ساخته شده:<br>' + result.tables.map(t => '&nbsp;&nbsp;• ' + t).join('<br>');
                        tablesList.className = 'tables show';
                    }
                } else {
                    status.className = 'status error';
                    status.textContent = '❌ ' + (result.error || 'خطا در ساخت دیتابیس');
                }
            } catch (error) {
                status.className = 'status error';
                status.textContent = '❌ خطا: ' + error.message;
            } finally {
                this.disabled = false;
            }
        });
    </script>
</body>
</html>
"""

@admin_bp.route("/")
def admin_panel():
    return render_template_string(HTML_PAGE)

@admin_bp.route("/create-db")
def create_database():
    try:
        db.create_all()
        
        # لیست جداول
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        tables = inspector.get_table_names()
        
        return {
            "success": True,
            "message": "دیتابیس با موفقیت ساخته شد!",
            "tables": tables
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500