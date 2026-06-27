// NitroVerse Main JS
document.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 NitroVerse loaded!");
    
    // نمایش نام کاربری در نوار
    const user = getCurrentUser();
    if (user && document.getElementById("username-display")) {
        document.getElementById("username-display").textContent = user.username;
    }
});

// Toast notification
function showToast(message, type = "ok") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
