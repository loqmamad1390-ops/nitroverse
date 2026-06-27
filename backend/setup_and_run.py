# setup_and_run.py
import os
import subprocess
import webbrowser
import time

def setup_database():
    print("📦 Creating database...")
    
    if os.path.exists("nitroverse.db"):
        os.remove("nitroverse.db")
        print("  ✅ Old database removed")
    
    import shutil
    if os.path.exists("migrations"):
        shutil.rmtree("migrations")
        print("  ✅ Old migrations removed")
    
    subprocess.run(["flask", "db", "init"], check=False)
    subprocess.run(["flask", "db", "migrate", "-m", "Initial migration"], check=False)
    subprocess.run(["flask", "db", "upgrade"], check=False)
    
    print("  ✅ Database created!")

def open_frontend():
    time.sleep(2)
    frontend_path = os.path.join(os.path.dirname(os.getcwd()), "frontend", "index.html")
    if os.path.exists(frontend_path):
        webbrowser.open(frontend_path)
        print(f"  ✅ Frontend opened")
    else:
        print("  ⚠️ Open frontend/index.html manually")

if __name__ == "__main__":
    print("=" * 50)
    print("🔥 NITROVERSE - Starting...")
    print("=" * 50)
    print()
    
    setup_database()
    open_frontend()
    print("\n🚀 Backend running at: http://localhost:5000")
    print("   Press Ctrl+C to stop\n")
    
    subprocess.run(["python", "run.py"])