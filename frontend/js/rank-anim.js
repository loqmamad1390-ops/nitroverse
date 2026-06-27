// ============================================
// NitroVerse Rank System (Enhanced)
// ============================================

(function() {
  const RANKS = [
    { key: 'normal', name: 'Normal 🌱', min: 0, icon96: 'assets/ranks/normal_96.png', icon256: 'assets/ranks/normal_256.png' },
    { key: 'bronze', name: 'Bronze 🥉', min: 500, icon96: 'assets/ranks/bronze_96.png', icon256: 'assets/ranks/bronze_256.png' },
    { key: 'silver', name: 'Silver 🥈', min: 1000, icon96: 'assets/ranks/silver_96.png', icon256: 'assets/ranks/silver_256.png' },
    { key: 'gold', name: 'Gold 🥇', min: 1500, icon96: 'assets/ranks/gold_96.png', icon256: 'assets/ranks/gold_256.png' },
    { key: 'diamond', name: 'Diamond 💎', min: 2200, icon96: 'assets/ranks/diamond_96.png', icon256: 'assets/ranks/diamond_256.png' },
    { key: 'legendary', name: 'Legendary ⭐', min: 3000, icon96: 'assets/ranks/legendary_96.png', icon256: 'assets/ranks/legendary_256.png' },
    { key: 'immortal', name: 'Immortal 👑', min: 4000, icon96: 'assets/ranks/immortal_96.png', icon256: 'assets/ranks/immortal_256.png' },
  ];

  const RATING_KEY = 'nv_rating';
  const HISTORY_KEY = 'nv_quiz_history';

  // ============================================
  // Core Functions
  // ============================================

  function getRating() {
    return parseInt(localStorage.getItem(RATING_KEY) || '0', 10);
  }

  function setRating(value) {
    localStorage.setItem(RATING_KEY, String(Math.max(0, Math.round(value))));
  }

  function getRankByRating(rating) {
    let result = RANKS[0];
    for (const rank of RANKS) {
      if (rating >= rank.min) result = rank;
    }
    return result;
  }

  function getNextRank(rating) {
    for (let i = 0; i < RANKS.length; i++) {
      if (rating < RANKS[i].min) {
        return {
          next: RANKS[i],
          gap: RANKS[i].min - rating,
          index: i,
        };
      }
    }
    return null;
  }

  function getHighestRating() {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    let max = 0;
    for (const entry of history) {
      if (entry.ratingAfter && entry.ratingAfter > max) {
        max = entry.ratingAfter;
      }
    }
    return Math.max(max, getRating());
  }

  // ============================================
  // Performance Calculation
  // ============================================

  function applyPerformance({ accuracy, avgTimeSec, avgDiffScore, timeLimitSec = 60 }) {
    const before = getRating();
    
    // فاکتورهای اصلی
    const accuracyFactor = Math.max(0, (accuracy - 0.3) / 0.7); // 0 تا 1
    const timeFactor = Math.max(0, 1 - (avgTimeSec / timeLimitSec)); // 0 تا 1
    const diffFactor = Math.min(1, avgDiffScore * 1.5); // 0 تا 1

    // امتیاز ترکیبی (0 تا 1)
    const performance = (accuracyFactor * 0.5 + timeFactor * 0.3 + diffFactor * 0.2);
    
    // تغییر Rating (بین -30 تا +50)
    const delta = Math.round((performance - 0.3) * 120);
    const clampedDelta = Math.max(-30, Math.min(50, delta));
    
    const after = Math.max(0, before + clampedDelta);
    setRating(after);

    const beforeRank = getRankByRating(before);
    const afterRank = getRankByRating(after);

    return {
      ratingBefore: before,
      ratingAfter: after,
      delta: clampedDelta,
      rankBefore: beforeRank,
      rankAfter: afterRank,
      performance: performance,
    };
  }

  // ============================================
  // Expose to Global
  // ============================================

  window.NVRank = {
    RANKS,
    getRating,
    setRating,
    getRankByRating,
    getNextRank,
    getHighestRating,
    applyPerformance,
  };

  console.log('🏆 NitroVerse Rank System loaded!');
})();