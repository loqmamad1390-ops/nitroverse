// ============================================
// NitroVerse League System
// مدیریت لیگ‌ها، صعود، سقوط و رقابت
// ============================================

(function() {
  'use strict';

  // ==========================================
  // کلیدهای localStorage
  // ==========================================
  const KEYS = {
    USER_LEAGUE: 'nv_user_league',
    LEAGUE_HISTORY: 'nv_league_history',
    PROMOTION_COUNT: 'nv_promotion_count',
  };

  // ==========================================
  // وضعیت فعلی کاربر
  // ==========================================
  function getUserScore() {
    try {
      const history = JSON.parse(localStorage.getItem('nv_quiz_history') || '[]');
      return history.reduce((sum, h) => sum + (h.score || 0), 0);
    } catch {
      return 0;
    }
  }

  function getUserLeague() {
    try {
      const saved = localStorage.getItem(KEYS.USER_LEAGUE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    
    // اگر ذخیره نشده، بر اساس امتیاز محاسبه کن
    const score = getUserScore();
    const league = window.getLeagueByScore(score);
    return league;
  }

  function saveUserLeague(league) {
    localStorage.setItem(KEYS.USER_LEAGUE, JSON.stringify(league));
  }

  // ==========================================
  // توابع اصلی لیگ
  // ==========================================

  function getCurrentLeague() {
    const score = getUserScore();
    const league = window.getLeagueByScore(score);
    saveUserLeague(league);
    return league;
  }

  function getNextLeague() {
    const score = getUserScore();
    return window.getNextLeague(score);
  }

  function getLeagueProgress() {
    const score = getUserScore();
    const current = getCurrentLeague();
    const next = getNextLeague();

    if (!next) {
      return {
        current: current,
        next: null,
        progress: 100,
        isMaxLevel: true,
        message: '🌟 شما در بالاترین سطح لیگ هستید!'
      };
    }

    const range = next.maxScore - current.minScore;
    const achieved = score - current.minScore;
    const progress = Math.min(100, Math.max(0, (achieved / range) * 100));

    return {
      current: current,
      next: next,
      progress: Math.round(progress),
      isMaxLevel: false,
      needed: next.maxScore - score,
      message: `${progress >= 80 ? '🔥 نزدیک به صعود هستی!' : '💪 ادامه بده تا به لیگ بعدی برسی!'}`
    };
  }

  function checkPromotion() {
    const score = getUserScore();
    const current = getUserLeague();
    const correct = window.getLeagueByScore(score);

    // اگر لیگ تغییر کرده = صعود
    if (current.id !== correct.id) {
      const history = JSON.parse(localStorage.getItem(KEYS.LEAGUE_HISTORY) || '[]');
      history.push({
        from: current.name,
        to: correct.name,
        date: Date.now(),
        score: score,
      });
      localStorage.setItem(KEYS.LEAGUE_HISTORY, JSON.stringify(history.slice(-20)));

      // تعداد صعودها
      const count = parseInt(localStorage.getItem(KEYS.PROMOTION_COUNT) || '0', 10);
      localStorage.setItem(KEYS.PROMOTION_COUNT, String(count + 1));

      saveUserLeague(correct);
      return {
        promoted: true,
        from: current,
        to: correct,
        history: history,
      };
    }

    return {
      promoted: false,
      current: current,
    };
  }

  // ==========================================
  // دریافت سوالات لیگ
  // ==========================================

  function getLeagueQuestions(leagueId) {
    const league = window.getLeagueById(leagueId);
    if (!league) return [];
    return league.questions || [];
  }

  function getRandomQuestions(leagueId, count = 5) {
    const questions = getLeagueQuestions(leagueId);
    if (questions.length === 0) return [];

    // شافل کردن و انتخاب تعداد
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // ==========================================
  // رندر المان‌های لیگ در صفحه
  // ==========================================

  function renderLeagueCard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const progress = getLeagueProgress();
    const current = progress.current;

    container.innerHTML = `
      <div class="league-card glow-card" style="border-top: 3px solid ${current.color || '#00eaff'};">
        <div class="league-header">
          <span class="league-icon" style="font-size: 2.4rem;">${current.icon || '🏆'}</span>
          <div>
            <h3 style="color: ${current.color || '#00eaff'};">${current.name}</h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">${current.nameEn || ''}</p>
          </div>
        </div>
        <p style="color: var(--text-secondary); margin: 12px 0;">${current.description || ''}</p>
        <div class="league-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress.progress}%; background: ${current.color || '#00eaff'};"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
            <span>${current.minScore}</span>
            <span>${progress.isMaxLevel ? '♾️' : progress.next?.maxScore || '∞'}</span>
          </div>
        </div>
        <div style="margin-top: 12px; font-size: 0.9rem; color: ${progress.progress >= 80 ? '#22c55e' : 'var(--text-secondary)'};">
          ${progress.message}
          ${!progress.isMaxLevel ? `<br><span style="font-size: 0.8rem;">نیاز به ${progress.needed} امتیاز برای صعود</span>` : ''}
        </div>
        <div style="margin-top: 12px; font-size: 0.85rem; color: var(--neon-gold);">
          🎁 پاداش قهرمان: ${current.prize || '200 N-Coins'}
        </div>
      </div>
    `;
  }

  function renderLeagueHistory(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const history = JSON.parse(localStorage.getItem(KEYS.LEAGUE_HISTORY) || '[]');

    if (history.length === 0) {
      container.innerHTML = `<p style="color: var(--text-secondary);">هنوز هیچ صعودی نداشتی. 💪</p>`;
      return;
    }

    container.innerHTML = `
      <div class="league-history">
        <h4 style="color: var(--neon-cyan); margin-bottom: 12px;">📜 تاریخچه صعودها</h4>
        ${history.slice().reverse().map(item => `
          <div class="history-item" style="display: flex; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <span>${item.from} → ${item.to}</span>
            <span style="color: var(--text-secondary); font-size: 0.8rem;">${new Date(item.date).toLocaleDateString('fa-IR')}</span>
          </div>
        `).join('')}
        <div style="margin-top: 10px; font-size: 0.85rem; color: var(--text-secondary);">
          🏅 تعداد کل صعودها: ${history.length}
        </div>
      </div>
    `;
  }

  // ==========================================
  // اکپورت
  // ==========================================

  window.Leagues = {
    getCurrentLeague,
    getNextLeague,
    getLeagueProgress,
    checkPromotion,
    getLeagueQuestions,
    getRandomQuestions,
    renderLeagueCard,
    renderLeagueHistory,
    getUserScore,
    KEYS,
  };

  console.log('🏆 NitroVerse Leagues loaded!');
})();