// ============================================
// NitroVerse Auth Helpers (FULL VERSION)
// با پشتیبانی از userId برای جداسازی داده‌ها
// ============================================

const API = window.NitroAPI;

// ==========================================
// کلیدهای localStorage
// ==========================================
const AUTH_KEYS = {
  TOKEN: 'nv_token',
  USER: 'nv_user',
  USER_ID: 'nv_user_id',
  USERNAME: 'nv_username',
  USER_EMAIL: 'nv_user_email',
  GUEST_DATA_MIGRATED: 'nv_guest_migrated',
};

// ==========================================
// توابع اصلی کاربر
// ==========================================

function getUserId() {
  return localStorage.getItem(AUTH_KEYS.USER_ID) || 'guest_' + Date.now();
}

function setUserId(id) {
  localStorage.setItem(AUTH_KEYS.USER_ID, id);
}

function getUsername() {
  return localStorage.getItem(AUTH_KEYS.USERNAME) || 'کاربر';
}

function setUsername(name) {
  localStorage.setItem(AUTH_KEYS.USERNAME, name);
}

function getUserEmail() {
  return localStorage.getItem(AUTH_KEYS.USER_EMAIL) || '';
}

function setUserEmail(email) {
  localStorage.setItem(AUTH_KEYS.USER_EMAIL, email);
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEYS.USER) || 'null');
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user));
}

function isLoggedIn() {
  return !!localStorage.getItem(AUTH_KEYS.TOKEN);
}

function getToken() {
  return localStorage.getItem(AUTH_KEYS.TOKEN);
}

function setToken(token) {
  localStorage.setItem(AUTH_KEYS.TOKEN, token);
}

// ==========================================
// توابع کلیدهای کاربرمحور (برای داده‌ها)
// ==========================================

function getUserKey(baseKey) {
  const userId = getUserId();
  return `${baseKey}_${userId}`;
}

function getUserData(baseKey, defaultValue = null) {
  try {
    const key = getUserKey(baseKey);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setUserData(baseKey, data) {
  try {
    const key = getUserKey(baseKey);
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function clearUserData(baseKey) {
  try {
    const key = getUserKey(baseKey);
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function clearAllUserData() {
  const userId = getUserId();
  const keys = [
    'nv_quiz_history',
    'nv_achievements',
    'nv_rating',
    'nv_balance',
    'nv_shop_items',
    'nv_last_quiz',
    'nv_league_history',
    'nv_promotion_count',
    'nv_my_groups',
    'nv_group_invites',
    'nv_chat_messages',
  ];
  
  keys.forEach(key => {
    localStorage.removeItem(`${key}_${userId}`);
  });
}

// ==========================================
// مهاجرت داده‌های مهمان به کاربر جدید
// ==========================================

function migrateGuestData(newUserId) {
  const guestKeys = [
    'nv_quiz_history',
    'nv_achievements',
    'nv_rating',
    'nv_balance',
    'nv_shop_items',
    'nv_last_quiz',
    'nv_league_history',
    'nv_promotion_count',
    'nv_my_groups',
    'nv_group_invites',
    'nv_chat_messages',
  ];
  
  let migratedCount = 0;
  
  guestKeys.forEach(key => {
    const guestData = localStorage.getItem(key);
    if (guestData) {
      const newKey = `${key}_${newUserId}`;
      // اگه داده جدید وجود نداشت، منتقل کن
      if (!localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, guestData);
        migratedCount++;
      }
    }
  });
  
  if (migratedCount > 0) {
    localStorage.setItem(AUTH_KEYS.GUEST_DATA_MIGRATED, 'true');
    console.log(`✅ ${migratedCount} مورد داده از مهمان به کاربر منتقل شد`);
  }
  
  return migratedCount;
}

// ==========================================
// لاگین
// ==========================================

async function loginUser(email, password) {
  try {
    const result = await API.login({ email, password });
    
    if (result.accessToken) {
      // ذخیره اطلاعات اصلی
      setToken(result.accessToken);
      setCurrentUser(result.user);
      
      // ذخیره اطلاعات کاربر
      const userId = result.user.id || result.user.username || 'user_' + Date.now();
      setUserId(userId);
      setUsername(result.user.username || 'کاربر');
      setUserEmail(result.user.email || email);
      
      // ===== مهاجرت داده‌های مهمان =====
      const migrated = migrateGuestData(userId);
      
      // ===== مقداردهی اولیه برای کاربر جدید =====
      if (migrated === 0) {
        // اگه داده‌ای نبود، مقداردهی اولیه کن
        initializeUserData(userId);
      }
      
      return {
        success: true,
        user: result.user,
        migrated: migrated,
      };
    }
    
    return {
      success: false,
      error: result.error || 'خطا در ورود',
    };
    
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'خطا در ارتباط با سرور',
    };
  }
}

// ==========================================
// ثبت‌نام
// ==========================================

async function registerUser(data) {
  try {
    const result = await API.register(data);
    
    if (result.message === 'registered' || result.user) {
      // بعد از ثبت‌نام، کاربر رو لاگین کن
      const loginResult = await loginUser(data.email, data.password);
      return loginResult;
    }
    
    return {
      success: false,
      error: result.error || 'خطا در ثبت‌نام',
    };
    
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      error: 'خطا در ارتباط با سرور',
    };
  }
}

// ==========================================
// مقداردهی اولیه داده‌های کاربر
// ==========================================

function initializeUserData(userId) {
  const defaultData = {
    'nv_quiz_history': [],
    'nv_achievements': {},
    'nv_rating': 0,
    'nv_balance': { coins: 150, nitro: 10, legend: 1 },
    'nv_shop_items': [],
    'nv_my_groups': [],
    'nv_chat_messages': { general: [] },
  };
  
  Object.entries(defaultData).forEach(([key, value]) => {
    const userKey = `${key}_${userId}`;
    if (!localStorage.getItem(userKey)) {
      localStorage.setItem(userKey, JSON.stringify(value));
    }
  });
  
  console.log('✅ داده‌های اولیه برای کاربر جدید مقداردهی شد:', userId);
}

// ==========================================
// خروج
// ==========================================

async function logoutUser(redirect = true) {
  try {
    await API.logout();
  } catch (e) {
    console.warn('Logout API error:', e);
  }
  
  // پاک کردن اطلاعات کاربری
  localStorage.removeItem(AUTH_KEYS.TOKEN);
  localStorage.removeItem(AUTH_KEYS.USER);
  localStorage.removeItem(AUTH_KEYS.USER_ID);
  localStorage.removeItem(AUTH_KEYS.USERNAME);
  localStorage.removeItem(AUTH_KEYS.USER_EMAIL);
  
  // ===== انتخاب: پاک کردن داده‌های مهمان یا نگه‌داشتن =====
  // اگه می‌خوای داده‌های مهمان هم پاک بشه:
  // clearGuestData();
  
  if (redirect) {
    window.location.href = 'index.html';
  }
}

// ==========================================
// پاک کردن داده‌های مهمان
// ==========================================

function clearGuestData() {
  const guestKeys = [
    'nv_quiz_history',
    'nv_achievements',
    'nv_rating',
    'nv_balance',
    'nv_shop_items',
    'nv_last_quiz',
    'nv_league_history',
    'nv_promotion_count',
    'nv_my_groups',
    'nv_group_invites',
    'nv_chat_messages',
  ];
  
  guestKeys.forEach(key => {
    const data = localStorage.getItem(key);
    // اگه داده متعلق به مهمان باشه (کلید بدون userId)
    if (data) {
      localStorage.removeItem(key);
    }
  });
  
  localStorage.removeItem(AUTH_KEYS.GUEST_DATA_MIGRATED);
}

// ==========================================
// بررسی لاگین
// ==========================================

async function requireAuth() {
  if (!isLoggedIn()) {
    // ذخیره صفحه فعلی برای بازگشت بعد از لاگین
    localStorage.setItem('nv_redirect_after_login', window.location.pathname);
    window.location.href = 'login.html';
    return false;
  }
  
  // ===== اعتبارسنجی توکن با سرور (اختیاری) =====
  // اگه می‌خوای توکن رو با سرور چک کنی:
  // try {
  //   await API.getMe();
  // } catch {
  //   logoutUser(false);
  //   window.location.href = 'login.html';
  //   return false;
  // }
  
  return true;
}

// ==========================================
// چک کردن کاربر مهمان
// ==========================================

function isGuest() {
  const userId = getUserId();
  return userId.startsWith('guest_');
}

function getGuestId() {
  return getUserId();
}

// ==========================================
// اکپورت
// ==========================================

window.Auth = {
  // توابع اصلی
  getUserId,
  setUserId,
  getUsername,
  setUsername,
  getUserEmail,
  setUserEmail,
  getCurrentUser,
  setCurrentUser,
  isLoggedIn,
  getToken,
  setToken,
  
  // توابع داده‌های کاربر
  getUserKey,
  getUserData,
  setUserData,
  clearUserData,
  clearAllUserData,
  
  // توابع اصلی
  loginUser,
  registerUser,
  logoutUser,
  requireAuth,
  
  // مهاجرت و مقداردهی
  migrateGuestData,
  initializeUserData,
  clearGuestData,
  
  // ابزارها
  isGuest,
  getGuestId,
  
  // کلیدها
  AUTH_KEYS,
};

// ==========================================
// خودکار: حفاظت از صفحات
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const protectedPages = [
    "profile.html",
    "game.html",
    "quiz.html",
    "shop.html",
    "groups.html",
    "dashboard.html",
    "achievements.html",
    "leaderboard.html",
    "rank.html",
  ];
  
  const currentPage = window.location.pathname.split("/").pop();
  
  if (protectedPages.includes(currentPage)) {
    requireAuth();
  }
  
  // ===== نمایش نام کاربری در المان‌ها =====
  const usernameEl = document.getElementById('displayUsername');
  if (usernameEl && isLoggedIn()) {
    usernameEl.textContent = getUsername();
  }
});

console.log('🔐 Auth system loaded successfully!');
console.log(`👤 Current user: ${getUsername()} (${getUserId()})`);