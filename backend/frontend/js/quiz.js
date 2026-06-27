// ============================================
// NitroVerse Quiz Engine (Enhanced)
// ============================================

const QUESTION_TIME = 60;
const HISTORY_KEY = 'nv_quiz_history';
const SAVE_KEY = 'nv_last_quiz';

// ============================================
// Question Bank (با تنوع بیشتر)
// ============================================
const QUESTIONS = [
  // آسان
  { q: 'عدد ۲ + ۲ چند می‌شود؟', opts: ['۲', '۳', '۴', '۵'], a: 2, diff: 'آسان' },
  { q: 'کدام‌یک حیوان است؟', opts: ['کتاب', 'درخت', 'سگ', 'صندلی'], a: 2, diff: 'آسان' },
  { q: 'پایتخت ایران کدام است؟', opts: ['مشهد', 'شیراز', 'تهران', 'قم'], a: 2, diff: 'آسان' },
  { q: 'کدام‌یک میوه است؟', opts: ['سیب', 'سنگ', 'خاک', 'چوب'], a: 0, diff: 'آسان' },
  { q: 'آب در دمای صفر درجه چه می‌شود؟', opts: ['جوش می‌آید', 'یخ می‌زند', 'تبخیر می‌شود', 'می‌سوزد'], a: 1, diff: 'آسان' },

  // متوسط
  { q: 'مولکول آب از چه عناصری تشکیل شده؟', opts: ['هیدروژن و اکسیژن', 'کربن و اکسیژن', 'نیتروژن و هیدروژن', 'فقط اکسیژن'], a: 0, diff: 'متوسط' },
  { q: 'عدد پی تقریباً چند است؟', opts: ['۲.۱۴', '۳.۱۴', '۴.۱۳', '۳.۴۱'], a: 1, diff: 'متوسط' },
  { q: 'نویسنده شاهنامه کیست؟', opts: ['مولوی', 'فردوسی', 'سعدی', 'حافظ'], a: 1, diff: 'متوسط' },
  { q: 'مرکز منظومه شمسی چیست؟', opts: ['زمین', 'خورشید', 'ماه', 'زهره'], a: 1, diff: 'متوسط' },
  { q: 'کدام کشور در آسیا نیست؟', opts: ['چین', 'ژاپن', 'مصر', 'هند'], a: 2, diff: 'متوسط' },

  // سخت
  { q: 'اولین زبان برنامه‌نویسی جهان چیست؟', opts: ['Python', 'C', 'Fortran', 'Assembly'], a: 2, diff: 'سخت' },
  { q: 'کدام دانشمند نظریه نسبیت را مطرح کرد؟', opts: ['نیوتن', 'انیشتین', 'گالیله', 'ماکسول'], a: 1, diff: 'سخت' },
  { q: 'در مدارهای منطقی، دروازه AND چه کاری انجام می‌دهد؟', opts: ['OR', 'جمع', 'ضرب منطقی', 'منفی‌سازی'], a: 2, diff: 'سخت' },
  { q: 'کدام‌یک از الگوریتم‌ها برای مرتب‌سازی استفاده می‌شود؟', opts: ['Dijkstra', 'Quick Sort', 'DFS', 'AES'], a: 1, diff: 'سخت' },
  { q: 'در هوش مصنوعی، یادگیری نظارت‌شده به چه معناست؟', opts: ['یادگیری بدون داده', 'یادگیری با داده‌ی برچسب‌خورده', 'یادگیری از خطا', 'هیچ‌کدام'], a: 1, diff: 'سخت' },
];

// ============================================
// State
// ============================================
let state = {
  index: 0,
  score: 0,
  correctCount: 0,
  streak: 0,
  timer: QUESTION_TIME,
  timerHandle: null,
  isAnswered: false,
  selectedAnswer: null,
  questions: [],
  responseTimes: [],
  isFinished: false,
};

// ============================================
// DOM Refs
// ============================================
const $ = (id) => document.getElementById(id);
const dom = {
  current: $('current'),
  total: $('total'),
  timer: $('timer'),
  scoreHud: $('scoreHud'),
  streak: $('streak'),
  difficulty: $('difficulty'),
  questionText: $('questionText'),
  options: $('optionsContainer'),
  nextBtn: $('nextBtn'),
  progressFill: $('progressFill'),
  resultArea: $('resultArea'),
  finalScore: $('finalScore'),
  resultStats: $('resultStats'),
};

// ============================================
// Core Functions
// ============================================

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  // انتخاب سوالات بر اساس سختی ذخیره‌شده
  const diff = localStorage.getItem('nv_diff') || 'متوسط';
  const filtered = QUESTIONS.filter(q => q.diff === diff);
  state.questions = shuffle(filtered.length > 0 ? filtered : QUESTIONS);
  
  if (state.questions.length === 0) {
    state.questions = shuffle([...QUESTIONS]);
  }

  state.index = 0;
  state.score = 0;
  state.correctCount = 0;
  state.streak = 0;
  state.responseTimes = [];
  state.isFinished = false;

  dom.total.textContent = state.questions.length;
  showQuestion();
}

function showQuestion() {
  if (state.index >= state.questions.length) {
    finishQuiz();
    return;
  }

  const q = state.questions[state.index];
  dom.current.textContent = state.index + 1;
  dom.difficulty.textContent = 'سختی: ' + q.diff;
  dom.questionText.textContent = q.q;
  dom.isAnswered = false;
  dom.nextBtn.disabled = true;

  // گزینه‌ها
  dom.options.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.textContent = opt;
    div.dataset.index = i;
    div.addEventListener('click', () => selectAnswer(i));
    dom.options.appendChild(div);
  });

  // به‌روزرسانی پیشرفت
  updateProgress();
  startTimer();
}

function selectAnswer(index) {
  if (state.isAnswered) return;
  state.isAnswered = true;
  state.selectedAnswer = index;

  const q = state.questions[state.index];
  const opts = dom.options.querySelectorAll('.option');
  
  // زمان پاسخ
  const elapsed = Math.max(0, QUESTION_TIME - state.timer);
  state.responseTimes.push(elapsed);

  // محاسبه امتیاز
  const diffMul = q.diff === 'سخت' ? 3 : q.diff === 'متوسط' ? 2 : 1;
  const speedMul = 1 + (state.timer / QUESTION_TIME);
  let delta = 0;

  opts.forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q.a) el.classList.add('correct');
    if (i === index && i !== q.a) el.classList.add('wrong');
  });

  if (index === q.a) {
    state.correctCount++;
    state.streak++;
    delta = Math.round(10 * diffMul * speedMul + (state.streak > 1 ? (state.streak - 1) * 2 : 0));
    state.score += delta;
  } else {
    state.streak = 0;
  }

  dom.scoreHud.textContent = state.score;
  dom.streak.textContent = state.streak;
  dom.nextBtn.disabled = false;
  stopTimer();
}

function nextQuestion() {
  state.index++;
  showQuestion();
}

function finishQuiz() {
  state.isFinished = true;
  stopTimer();

  const total = state.questions.length;
  const avg = total > 0 ? Math.round(state.score / total) : 0;

  // ذخیره نتیجه
  const result = {
    date: Date.now(),
    score: state.score,
    total: total,
    correct: state.correctCount,
    avgPerQ: avg,
    username: localStorage.getItem('nv_username') || 'Guest',
  };

  // ذخیره در تاریخچه
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  history.push(result);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-50)));
  localStorage.setItem(SAVE_KEY, JSON.stringify(result));

  // ===== محاسبه رنک =====
  if (window.NVRank) {
    const accuracy = state.correctCount / total;
    const avgTime = state.responseTimes.length > 0 
      ? state.responseTimes.reduce((a, b) => a + b, 0) / state.responseTimes.length 
      : QUESTION_TIME;
    
    const diffMap = (d) => d === 'سخت' ? 0.9 : d === 'متوسط' ? 0.6 : 0.3;
    const avgDiff = state.questions.reduce((a, q) => a + diffMap(q.diff), 0) / total;

    const rankResult = window.NVRank.applyPerformance({
      accuracy,
      avgTimeSec: avgTime,
      avgDiffScore: avgDiff,
      timeLimitSec: QUESTION_TIME,
    });

    if (rankResult) {
      result.ratingBefore = rankResult.ratingBefore;
      result.ratingAfter = rankResult.ratingAfter;
      result.ratingDelta = rankResult.delta;
      result.rankBefore = rankResult.rankBefore?.name;
      result.rankAfter = rankResult.rankAfter?.name;

      // انیمیشن صعود رنک
      if (window.NVRankAnim && rankResult.rankBefore?.key !== rankResult.rankAfter?.key) {
        window.NVRankAnim.show({
          rankKey: rankResult.rankAfter.key,
          rankName: rankResult.rankAfter.name,
          icon256: rankResult.rankAfter.icon256,
          ratingAfter: rankResult.ratingAfter,
          delta: rankResult.delta,
          mode: 'rankup',
        });
      }
    }
  }

  // نمایش نتیجه
  showResult(result);
}

function showResult(result) {
  dom.questionArea.style.display = 'none';
  dom.hud.style.display = 'none';
  dom.resultArea.style.display = 'block';

  dom.finalScore.textContent = result.score;

  let statsHTML = `
    <div class="stat-item"><span class="label">پاسخ درست</span><div class="number">${result.correct}/${result.total}</div></div>
    <div class="stat-item"><span class="label">میانگین هر سؤال</span><div class="number">${result.avgPerQ}</div></div>
  `;

  if (result.ratingAfter !== undefined) {
    statsHTML += `
      <div class="stat-item"><span class="label">رنک جدید</span><div class="number" style="color:var(--neon-gold)">${result.rankAfter || '—'}</div></div>
      <div class="stat-item"><span class="label">Rating</span><div class="number">${result.ratingAfter} (${result.ratingDelta >= 0 ? '+' : ''}${result.ratingDelta})</div></div>
    `;
  }

  dom.resultStats.innerHTML = statsHTML;
}

// ============================================
// Timer
// ============================================
function startTimer() {
  stopTimer();
  state.timer = QUESTION_TIME;
  dom.timer.textContent = state.timer;
  
  state.timerHandle = setInterval(() => {
    state.timer--;
    dom.timer.textContent = state.timer;
    if (state.timer <= 0) {
      stopTimer();
      autoFail();
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerHandle) {
    clearInterval(state.timerHandle);
    state.timerHandle = null;
  }
}

function autoFail() {
  if (state.isAnswered) return;
  state.isAnswered = true;
  
  const q = state.questions[state.index];
  const opts = dom.options.querySelectorAll('.option');
  
  opts.forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q.a) el.classList.add('correct');
  });

  dom.nextBtn.disabled = false;
  state.responseTimes.push(QUESTION_TIME);
  state.streak = 0;
  dom.streak.textContent = state.streak;
}

// ============================================
// UI Helpers
// ============================================
function updateProgress() {
  const total = state.questions.length;
  const pct = total > 0 ? Math.round((state.index / total) * 100) : 0;
  dom.progressFill.style.width = Math.min(pct, 100) + '%';
}

// ============================================
// Event Listeners
// ============================================
dom.nextBtn.addEventListener('click', nextQuestion);

// ============================================
// Expose
// ============================================
window.startQuiz = startQuiz;
window.QUESTIONS = QUESTIONS; // برای استفاده در جای دیگر

console.log('🧠 NitroVerse Quiz Engine loaded!');