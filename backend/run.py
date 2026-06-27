from app import create_app
from app.extensions import db
from flask_migrate import upgrade, init, migrate
import os

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        # اگر دیتابیس وجود نداشت، بسازش
        if not os.path.exists('nitroverse.db'):
            print("🔧 Creating database...")
            db.create_all()
            print("✅ Database created!")
        else:
            print("✅ Database already exists.")
    
    app.run(host="0.0.0.0", port=5000, debug=True)