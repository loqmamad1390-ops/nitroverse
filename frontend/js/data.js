// ============================================
// NitroVerse Data Layer (FULL VERSION)
// تمام داده‌های استاتیک پروژه در یک جا
// ============================================

const NitroData = {
  // ==========================================
  // ۱. لیگ‌ها (با جزئیات کامل)
  // ==========================================
  leagues: [
    {
      id: 'kharazmi',
      name: 'لیگ خوارزمی',
      nameEn: 'Kharazmi League',
      level: 1,
      icon: '⚙️',
      color: '#00bfff',
      minScore: 0,
      maxScore: 499,
      description: 'سطح ۱ – آغاز راه. مخصوص تازه‌واردها.',
      longDescription: 'لیگ خوارزمی برای کسانی است که تازه وارد دنیای نیتروورس شده‌اند. سوالات ساده ولی آموزنده در حوزه علوم پایه، ریاضی و منطق.',
      prize: '200 N-Coins',
      badge: 'assets/leagues/kharazmi.png',
      questions: [
        { q: '۲ + ۲ چند می‌شود؟', opts: ['۲', '۳', '۴', '۵'], a: 2, diff: 'آسان' },
        { q: 'پایتخت ایران کدام است؟', opts: ['مشهد', 'شیراز', 'تهران', 'قم'], a: 2, diff: 'آسان' },
        { q: 'کدام‌یک حیوان است؟', opts: ['کتاب', 'درخت', 'سگ', 'صندلی'], a: 2, diff: 'آسان' },
        { q: 'آب در دمای صفر چه می‌شود؟', opts: ['جوش می‌آید', 'یخ می‌زند', 'تبخیر می‌شود', 'می‌سوزد'], a: 1, diff: 'آسان' },
        { q: 'کدام‌یک میوه است؟', opts: ['سیب', 'سنگ', 'خاک', 'چوب'], a: 0, diff: 'آسان' },
        { q: 'چند تا پا داریم؟', opts: ['۱', '۲', '۳', '۴'], a: 1, diff: 'آسان' },
        { q: 'آسمان چه رنگی است؟', opts: ['سبز', 'آبی', 'قرمز', 'زرد'], a: 1, diff: 'آسان' },
        { q: 'کدام‌یک عدد است؟', opts: ['الف', 'ب', '۳', 'چ'], a: 2, diff: 'آسان' },
        { q: 'خورشید چه نوع جسمی است؟', opts: ['سیاره', 'ستاره', 'ماه', 'کهکشان'], a: 1, diff: 'آسان' },
        { q: 'کدام‌یک وسیله نقلیه است؟', opts: ['میز', 'صندلی', 'ماشین', 'کتاب'], a: 2, diff: 'آسان' },
      ]
    },
    {
      id: 'avicenna',
      name: 'لیگ ابن‌سینا',
      nameEn: 'Avicenna League',
      level: 2,
      icon: '🧠',
      color: '#a94eff',
      minScore: 500,
      maxScore: 1499,
      description: 'سطح ۲ – لیگ اندیشه و تحلیل.',
      longDescription: 'لیگ ابن‌سینا برای ذهن‌های جستجوگر و تحلیل‌گر. سوالات علمی، تحلیلی و ترکیبی برای کسانی که در لیگ خوارزمی برنده شده‌اند.',
      prize: '500 N-Coins + مدال نقره',
      badge: 'assets/leagues/avicenna.png',
      questions: [
        { q: 'مولکول آب از چه عناصری تشکیل شده؟', opts: ['هیدروژن و اکسیژن', 'کربن و اکسیژن', 'نیتروژن و هیدروژن', 'فقط اکسیژن'], a: 0, diff: 'متوسط' },
        { q: 'عدد پی تقریباً چند است؟', opts: ['۲.۱۴', '۳.۱۴', '۴.۱۳', '۳.۴۱'], a: 1, diff: 'متوسط' },
        { q: 'نویسنده شاهنامه کیست؟', opts: ['مولوی', 'فردوسی', 'سعدی', 'حافظ'], a: 1, diff: 'متوسط' },
        { q: 'مرکز منظومه شمسی چیست؟', opts: ['زمین', 'خورشید', 'ماه', 'زهره'], a: 1, diff: 'متوسط' },
        { q: 'کدام کشور در آسیا نیست؟', opts: ['چین', 'ژاپن', 'مصر', 'هند'], a: 2, diff: 'متوسط' },
        { q: 'سریع‌ترین حیوان خشکی چیست؟', opts: ['یوزپلنگ', 'شیر', 'پلنگ', 'گرگ'], a: 0, diff: 'متوسط' },
        { q: 'کدام گاز بیشترین درصد هوا را تشکیل می‌دهد؟', opts: ['اکسیژن', 'نیتروژن', 'دی‌اکسید کربن', 'آرگون'], a: 1, diff: 'متوسط' },
        { q: 'کدام اختراع قدیمی‌تر است؟', opts: ['چرخ', 'کاغذ', 'باروت', 'قطب‌نما'], a: 0, diff: 'متوسط' },
        { q: 'بلندترین کوه ایران کدام است؟', opts: ['دماوند', 'البرز', 'زردکوه', 'سبلان'], a: 0, diff: 'متوسط' },
        { q: 'کدام عنصر شیمیایی با نماد Fe مشخص می‌شود؟', opts: ['آهن', 'مس', 'طلا', 'نقره'], a: 0, diff: 'متوسط' },
      ]
    },
    {
      id: 'biruni',
      name: 'لیگ بیرونی',
      nameEn: 'Biruni League',
      level: 3,
      icon: '🔬',
      color: '#ffd700',
      minScore: 1500,
      maxScore: Infinity,
      description: 'سطح ۳ – لیگ نخبگان.',
      longDescription: 'لیگ بیرونی برای نخبگان و برترین‌ها. سوالات بسیار دشوار و مفهومی با چالش‌های تکنولوژی، هوش مصنوعی و علوم پیشرفته.',
      prize: '1000 N-Coins + مدال طلایی + تاج',
      badge: 'assets/leagues/biruni.png',
      questions: [
        { q: 'اولین زبان برنامه‌نویسی جهان چیست؟', opts: ['Python', 'C', 'Fortran', 'Assembly'], a: 2, diff: 'سخت' },
        { q: 'کدام دانشمند نظریه نسبیت را مطرح کرد؟', opts: ['نیوتن', 'انیشتین', 'گالیله', 'ماکسول'], a: 1, diff: 'سخت' },
        { q: 'در مدارهای منطقی، دروازه AND چه کاری انجام می‌دهد؟', opts: ['OR', 'جمع', 'ضرب منطقی', 'منفی‌سازی'], a: 2, diff: 'سخت' },
        { q: 'کدام‌یک از الگوریتم‌ها برای مرتب‌سازی استفاده می‌شود؟', opts: ['Dijkstra', 'Quick Sort', 'DFS', 'AES'], a: 1, diff: 'سخت' },
        { q: 'در هوش مصنوعی، یادگیری نظارت‌شده به چه معناست؟', opts: ['یادگیری بدون داده', 'یادگیری با داده‌ی برچسب‌خورده', 'یادگیری از خطا', 'هیچ‌کدام'], a: 1, diff: 'سخت' },
        { q: 'کدام معماری پردازنده در اکثر گوشی‌های هوشمند استفاده می‌شود؟', opts: ['x86', 'ARM', 'MIPS', 'RISC-V'], a: 1, diff: 'سخت' },
        { q: 'الگوریتم RSA بر پایه چه مسئله ریاضی است؟', opts: ['فاکتورگیری اعداد بزرگ', 'لگاریتم گسسته', 'مسئله کیسه', 'بازه هش'], a: 0, diff: 'سخت' },
        { q: 'کدام پروتکل برای ایمن‌سازی وب استفاده می‌شود؟', opts: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], a: 2, diff: 'سخت' },
        { q: 'کدام سیستم عامل متن‌باز است؟', opts: ['Windows', 'macOS', 'Linux', 'iOS'], a: 2, diff: 'سخت' },
        { q: 'در بلاک‌چین، «هش» چیست؟', opts: ['یک نوع رمزنگاری', 'تابع یک‌طرفه', 'کلید خصوصی', 'کیف پول'], a: 1, diff: 'سخت' },
      ]
    }
  ],

  // ==========================================
  // ۲. گروه‌های پیش‌فرض (بیشتر)
  // ==========================================
  defaultGroups: [
    {
      id: 'space_pioneers',
      name: 'پیشتازان فضا',
      icon: '🚀',
      description: 'ما اولین اتحاد نیتروورس هستیم. هدف ما تسخیر تمامی لیگ‌هاست.',
      members: 12,
      maxMembers: 50,
      xp: 12500,
      level: 3,
      createdAt: '2025-01-15',
      tags: ['حرفه‌ای', 'فعال', 'رقابتی']
    },
    {
      id: 'cyber_ninja',
      name: 'سایبر نینجا',
      icon: '🥷',
      description: 'سریع، بی‌صدا و مرگبار. در تاریکی کد می‌زنیم و در نور پیروز می‌شویم.',
      members: 45,
      maxMembers: 50,
      xp: 8200,
      level: 2,
      createdAt: '2025-02-01',
      tags: ['تکنولوژی', 'هک', 'تیم']
    },
    {
      id: 'phoenix_fire',
      name: 'ققنوس آتشین',
      icon: '🔥',
      description: 'برای کسانی که هرگز تسلیم نمی‌شوند. از خاکستر خود برمی‌خیزیم.',
      members: 50,
      maxMembers: 50,
      xp: 21000,
      level: 4,
      createdAt: '2024-12-10',
      tags: ['پیشرو', 'قهرمان', 'اسطوره']
    },
    {
      id: 'code_masters',
      name: 'استادان کد',
      icon: '💻',
      description: 'جایی که کد به هنر تبدیل می‌شود. برنامه‌نویسان نخبه نیتروورس.',
      members: 8,
      maxMembers: 30,
      xp: 4500,
      level: 2,
      createdAt: '2025-03-01',
      tags: ['برنامه‌نویسی', 'الگوریتم', 'سخت']
    },
    {
      id: 'ai_innovators',
      name: 'نوآوران هوش مصنوعی',
      icon: '🤖',
      description: 'ما آینده را با هوش مصنوعی می‌سازیم. هر روز یک ایده جدید!',
      members: 18,
      maxMembers: 40,
      xp: 9800,
      level: 3,
      createdAt: '2025-02-20',
      tags: ['AI', 'یادگیری ماشین', 'فناوری']
    },
    {
      id: 'quantum_brains',
      name: 'مغزهای کوانتومی',
      icon: '⚛️',
      description: 'تفکر کوانتومی، حل مسائل پیچیده. جایگاه نخبگان علمی.',
      members: 6,
      maxMembers: 20,
      xp: 3200,
      level: 1,
      createdAt: '2025-03-15',
      tags: ['فیزیک', 'ریاضی', 'علم']
    }
  ],

  // ==========================================
  // ۳. آیتم‌های فروشگاه (بیشتر)
  // ==========================================
  shopItems: {
    custom: [
      { id: 'avatar_frame_gold', name: 'قاب طلایی آواتار', icon: '🟡', price: 50, currency: 'coins', description: 'آواتار شما را درخشان می‌کند' },
      { id: 'avatar_frame_blue', name: 'قاب آبی نئونی', icon: '🔵', price: 30, currency: 'coins', description: 'قاب آبی با افکت نئونی' },
      { id: 'avatar_frame_purple', name: 'قاب بنفش سلطنتی', icon: '🟣', price: 45, currency: 'coins', description: 'قاب بنفش برای افراد خاص' },
      { id: 'avatar_frame_rainbow', name: 'قاب رنگین‌کمان', icon: '🌈', price: 80, currency: 'coins', description: 'همه رنگ‌ها در یک قاب' },
      { id: 'font_elite', name: 'فونت Elite', icon: '🅰️', price: 2, currency: 'nitro', description: 'فونت خاص برای پروفایل' },
      { id: 'font_neon', name: 'فونت نئونی', icon: '🅱️', price: 3, currency: 'nitro', description: 'فونت با افکت نئون' },
      { id: 'theme_darkspace', name: 'تم Dark Space', icon: '🌌', price: 1, currency: 'legend', description: 'تم تاریک کهکشانی' },
      { id: 'theme_cyberpunk', name: 'تم سایبرپانک', icon: '💜', price: 2, currency: 'legend', description: 'تم سایبرپانک با رنگ‌های نئونی' },
    ],
    honor: [
      { id: 'badge_earlybird', name: 'کاربر اولیه', icon: '🐣', price: 1, currency: 'nitro', description: 'اولین کاربران نیتروورس' },
      { id: 'badge_scientist', name: 'نابغه علم', icon: '🔬', price: 3, currency: 'nitro', description: 'برای عاشقان علم' },
      { id: 'badge_master', name: 'استاد رقابت', icon: '🏅', price: 2, currency: 'legend', description: 'برای قهرمانان رقابت‌ها' },
      { id: 'badge_legend', name: 'افسانه نیترو', icon: '⭐', price: 5, currency: 'legend', description: 'فقط برای بهترین‌ها' },
      { id: 'badge_teacher', name: 'معلم نیترو', icon: '📚', price: 2, currency: 'nitro', description: 'برای کسانی که به دیگران یاد می‌دهند' },
      { id: 'badge_innovator', name: 'نوآور', icon: '💡', price: 4, currency: 'nitro', description: 'برای ایده‌های جدید و خلاقانه' },
    ],
    effects: [
      { id: 'effect_glow', name: 'افکت درخشان', icon: '✨', price: 40, currency: 'coins', description: 'بدنت درخشان می‌شود' },
      { id: 'effect_fire', name: 'افکت شعله‌ای', icon: '🔥', price: 2, currency: 'nitro', description: 'شعله‌های آتش دورت را می‌گیرند' },
      { id: 'effect_star', name: 'افکت ستاره‌ای', icon: '🌟', price: 1, currency: 'legend', description: 'ستاره‌ها دورت می‌چرخند' },
      { id: 'effect_lightning', name: 'افکت برق', icon: '⚡', price: 3, currency: 'nitro', description: 'برق‌های نئونی دورت می‌پیچند' },
      { id: 'effect_rainbow', name: 'افکت رنگین‌کمان', icon: '🌈', price: 5, currency: 'legend', description: 'رنگ‌های زیبا دورت می‌چرخند' },
      { id: 'effect_snow', name: 'افکت برفی', icon: '❄️', price: 2, currency: 'nitro', description: 'برف می‌بارد!' },
    ]
  },

  // ==========================================
  // ۴. دستاوردها (بیشتر)
  // ==========================================
  achievements: [
    { id: 'first_play', title: 'اولین بازی!', desc: 'اولین باری که در آزمون شرکت کردی.', icon: '🎯', category: 'بازی', points: 10 },
    { id: 'ten_correct', title: '۱۰ پاسخ صحیح!', desc: '۱۰ پاسخ صحیح گرفتی!', icon: '💡', category: 'دقت', points: 20 },
    { id: 'fifty_points', title: '۵۰ امتیاز!', desc: '۵۰ امتیاز در مجموع گرفتی!', icon: '🔥', category: 'امتیاز', points: 30 },
    { id: 'three_days', title: '۳ روز فعال!', desc: '۳ روز پشت سر هم فعالیت کردی.', icon: '📅', category: 'فعالیت', points: 25 },
    { id: 'hundred_points', title: '۱۰۰ امتیاز!', desc: 'به ۱۰۰ امتیاز رسیدی!', icon: '🏆', category: 'امتیاز', points: 40 },
    { id: 'immortal', title: 'رنک ایمورتال!', desc: 'رتبه ۱ در لیدربورد رو کسب کردی!', icon: '👑', category: 'رنک', points: 100 },
    { id: 'perfect_score', title: 'نمره کامل!', desc: 'همه سوالات رو درست جواب دادی!', icon: '🎯', category: 'دقت', points: 50 },
    { id: 'speed_demon', title: 'شیطان سرعت!', desc: '۱۰ سوال را در کمتر از ۳۰ ثانیه جواب دادی!', icon: '⚡', category: 'سرعت', points: 35 },
    { id: 'social_butterfly', title: 'پروانه اجتماعی!', desc: 'به ۵ گروه مختلف پیوستی!', icon: '🦋', category: 'اجتماعی', points: 20 },
    { id: 'legendary_rank', title: 'رنک افسانه‌ای!', desc: 'به رنک افسانه‌ای رسیدی!', icon: '⭐', category: 'رنک', points: 75 },
    { id: 'shopaholic', title: 'خریدار حرفه‌ای!', desc: '۱۰ آیتم از فروشگاه خریدی!', icon: '🛍️', category: 'فروشگاه', points: 30 },
    { id: 'millionaire', title: 'میلیونر!', desc: '۱۰۰۰ امتیاز جمع کردی!', icon: '💰', category: 'امتیاز', points: 60 },
  ],

  // ==========================================
  // ۵. پیام‌های انگیزشی (بیشتر)
  // ==========================================
  motivationalQuotes: [
    'هر روز یک قدم به جلو! 🚀',
    'ذهن تو قدرتمندترین سلاح‌ته! 💪',
    'یادگیری هیچوقت متوقف نمی‌شود! 📚',
    'تو می‌توانی! فقط باور کن! ✨',
    'هر شکست یه درس بزرگه! 🎯',
    'آینده از آنِ کسانی‌ست که امروز می‌آموزند! 🌟',
    'با تلاش امروز، قهرمان فردا باش! 🏆',
    'هیچ چیز غیرممکن نیست! 🔥',
    'بهترین زمان برای شروع، همینه! ⏰',
    'هر روز یک فرصت جدید است! 🌅',
    'تفاوت را ایجاد کن! 💡',
    'بزرگ‌ترین ریسک، ریسک نکردن است! 🎲',
    'موفقیت حاصل عادت‌های کوچک است! 📈',
    'به خودت ایمان داشته باش! 🌟',
    'تو از آنچه فکر می‌کنی قوی‌تری! 💪',
  ],

  // ==========================================
  // ۶. سوالات پراکنده (برای حالت‌های مختلف)
  // ==========================================
  randomQuestions: {
    technology: [
      { q: 'کدام زبان برای توسعه وب استفاده می‌شود؟', opts: ['Python', 'JavaScript', 'C++', 'Java'], a: 1, diff: 'متوسط' },
      { q: 'مخفف HTML چیست؟', opts: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'None'], a: 0, diff: 'آسان' },
      { q: 'کدام شرکت سازنده آیفون است؟', opts: ['Samsung', 'Apple', 'Google', 'Microsoft'], a: 1, diff: 'آسان' },
      { q: 'سیستم‌عامل اندروید متعلق به کدام شرکت است؟', opts: ['Apple', 'Microsoft', 'Google', 'Samsung'], a: 2, diff: 'آسان' },
      { q: 'کدام یک زبان برنامه‌نویسی سطح پایین است؟', opts: ['Python', 'Java', 'Assembly', 'Ruby'], a: 2, diff: 'سخت' },
    ],
    science: [
      { q: 'نور از چه چیزی تشکیل شده است؟', opts: ['الکترون', 'فوتون', 'پروتون', 'نوترون'], a: 1, diff: 'متوسط' },
      { q: 'سریع‌ترین سرعت در جهان چیست؟', opts: ['صوت', 'نور', 'باد', 'موشک'], a: 1, diff: 'آسان' },
      { q: 'DNA مخفف چیست؟', opts: ['Deoxyribonucleic Acid', 'Dynamic Nucleic Acid', 'Digital Network Access', 'None'], a: 0, diff: 'متوسط' },
      { q: 'کدام سیاره به سیاره سرخ معروف است؟', opts: ['زهره', 'مریخ', 'مشتری', 'زحل'], a: 1, diff: 'آسان' },
      { q: 'انرژی هسته‌ای از چه فرآیندی تولید می‌شود؟', opts: ['شکافت هسته‌ای', 'همجوشی هسته‌ای', 'هر دو', 'هیچ‌کدام'], a: 2, diff: 'سخت' },
    ],
    history: [
      { q: 'جنگ جهانی دوم کی شروع شد؟', opts: ['۱۹۳۹', '۱۹۴۱', '۱۹۴۵', '۱۹۳۷'], a: 0, diff: 'متوسط' },
      { q: 'کشور ایران چند سال قدمت دارد؟', opts: ['۲۵۰۰ سال', '۴۰۰۰ سال', '۷۰۰۰ سال', '۱۰۰۰۰ سال'], a: 0, diff: 'متوسط' },
      { q: 'بزرگترین امپراتوری تاریخ کدام است؟', opts: ['روم', 'مغول', 'بریتانیا', 'عثمانی'], a: 2, diff: 'سخت' },
      { q: 'مخترع برق کیست؟', opts: ['تسلا', 'ادیسون', 'فرانکلین', 'ولتا'], a: 1, diff: 'متوسط' },
      { q: 'کشور مصر باستان به چه چیزی معروف بود؟', opts: ['اهرام', 'برج ایفل', 'دیوار چین', 'تاج محل'], a: 0, diff: 'آسان' },
    ],
    math: [
      { q: 'ریشه دوم ۱۶ چند است؟', opts: ['۲', '۴', '۸', '۱۶'], a: 1, diff: 'آسان' },
      { q: 'عدد ۱۰۰ به باینری چند است؟', opts: ['۱۰۱۰۰۱۰', '۱۱۰۰۱۰۰', '۱۱۱۱۰۰', '۱۰۰۱۰۱۰'], a: 1, diff: 'سخت' },
      { q: 'مساحت دایره با شعاع ۳ چند است؟ (π=۳.۱۴)', opts: ['۱۸.۸۴', '۲۸.۲۶', '۳۷.۶۸', '۴۷.۱'], a: 1, diff: 'متوسط' },
      { q: '۵! چند است؟', opts: ['۶۰', '۱۲۰', '۲۴۰', '۳۶۰'], a: 1, diff: 'متوسط' },
      { q: 'یک زاویه ۹۰ درجه چه نام دارد؟', opts: ['تند', 'باز', 'قائمه', 'منفرجه'], a: 2, diff: 'آسان' },
    ]
  },

  // ==========================================
  // ۷. استان‌ها و شهرهای ایران
  // ==========================================
  provinces: {
    'تهران': ['تهران', 'اسلام‌شهر', 'شهریار', 'ورامین', 'پردیس', 'ملارد', 'قرچک'],
    'اصفهان': ['اصفهان', 'کاشان', 'نجف‌آباد', 'شهرضا', 'خمینی‌شهر', 'فلاورجان'],
    'خراسان رضوی': ['مشهد', 'نیشابور', 'سبزوار', 'قوچان', 'کاشمر', 'تربت حیدریه'],
    'فارس': ['شیراز', 'مرودشت', 'کازرون', 'جهرم', 'فیروزآباد', 'لار'],
    'آذربایجان شرقی': ['تبریز', 'مراغه', 'میانه', 'اهر', 'بناب', 'سراب'],
    'گیلان': ['رشت', 'انزلی', 'لاهیجان', 'آستارا', 'فومن', 'رودسر'],
    'مازندران': ['ساری', 'بابل', 'آمل', 'قائم‌شهر', 'بهشهر', 'نوشهر'],
    'کرمان': ['کرمان', 'سیرجان', 'رفسنجان', 'بم', 'زرند', 'جیرفت'],
    'خوزستان': ['اهواز', 'آبادان', 'خرمشهر', 'دزفول', 'اندیمشک', 'شوشتر'],
    'یزد': ['یزد', 'میبد', 'اردکان', 'بافق', 'مهریز'],
    'قزوین': ['قزوین', 'تاکستان', 'الوند', 'بوئین‌زهرا'],
    'کردستان': ['سنندج', 'بانه', 'سقز', 'مریوان', 'دیواندره'],
    'سیستان و بلوچستان': ['زاهدان', 'چابهار', 'ایرانشهر', 'زابل', 'خاش'],
    'هرمزگان': ['بندرعباس', 'میناب', 'بندرلنگه', 'قشم', 'کیش'],
    'البرز': ['کرج', 'نظرآباد', 'هشتگرد', 'طالقان'],
    'همدان': ['همدان', 'ملایر', 'نهاوند', 'تویسرکان'],
    'کرمانشاه': ['کرمانشاه', 'کنگاور', 'صحنه', 'سنقر'],
    'لرستان': ['خرم‌آباد', 'بروجرد', 'دورود', 'الیگودرز'],
    'زنجان': ['زنجان', 'ابهر', 'خرم‌دره', 'ماه‌نشان'],
    'سمنان': ['سمنان', 'دامغان', 'شاهرود', 'گرمسار'],
  },

  // ==========================================
  // ۸. پیام‌های خطا و موفقیت
  // ==========================================
  messages: {
    success: {
      login: '✅ ورود موفق! خوش برگشتی!',
      register: '✅ ثبت‌نام موفق! حالا وارد شو!',
      save: '✅ اطلاعات ذخیره شد!',
      buy: '🎉 خرید موفق! آیتم به موجودی اضافه شد!',
      join: '✅ به گروه پیوستی!',
      leave: '✅ از گروه خارج شدی!',
      send: '✅ پیام ارسال شد!',
      achievement: '🎖️ دستاورد جدید! تبریک!',
      rankup: '🎊 صعود کردی! به رنک جدید رسیدی!',
    },
    error: {
      login: '❌ ایمیل یا رمز عبور اشتباه است!',
      register: '❌ خطا در ثبت‌نام. دوباره تلاش کن!',
      required: '❌ همه فیلدها را پر کن!',
      password: '❌ رمز باید حداقل ۸ کاراکتر باشد!',
      match: '❌ رمزها یکسان نیستند!',
      email: '❌ ایمیل معتبر وارد کن!',
      network: '❌ خطا در ارتباط با سرور!',
      notFound: '❌ موردی پیدا نشد!',
      limit: '❌ به حد مجاز رسیدی!',
    }
  },

  // ==========================================
  // ۹. تنظیمات پیش‌فرض بازی
  // ==========================================
  gameSettings: {
    defaultDifficulty: 'متوسط',
    defaultCategory: 'عمومی',
    questionTime: 60,
    maxQuestions: 10,
    dailyBonus: 20,
    streakBonus: 5,
    rankPoints: {
      normal: 10,
      bronze: 15,
      silver: 20,
      gold: 30,
      diamond: 40,
      legendary: 60,
      immortal: 100,
    },
    leagueRewards: {
      kharazmi: { coins: 200, nitro: 5, legend: 1 },
      avicenna: { coins: 500, nitro: 15, legend: 3 },
      biruni: { coins: 1000, nitro: 30, legend: 10 },
    }
  },
};

// ==========================================
// توابع کمکی (بیشتر)
// ==========================================

function getLeagueByScore(score) {
  const leagues = NitroData.leagues;
  for (const league of leagues) {
    if (score >= league.minScore && score < league.maxScore) {
      return league;
    }
  }
  return leagues[leagues.length - 1];
}

function getLeagueById(id) {
  return NitroData.leagues.find(l => l.id === id) || null;
}

function getNextLeague(currentScore) {
  const leagues = NitroData.leagues;
  for (const league of leagues) {
    if (currentScore < league.maxScore) {
      return league;
    }
  }
  return null;
}

function getRandomQuote() {
  const quotes = NitroData.motivationalQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getShopItemsByCategory(category) {
  return NitroData.shopItems[category] || [];
}

function getAllShopItems() {
  return [
    ...NitroData.shopItems.custom,
    ...NitroData.shopItems.honor,
    ...NitroData.shopItems.effects,
  ];
}

function getAchievementById(id) {
  return NitroData.achievements.find(a => a.id === id) || null;
}

function getProvinceCities(province) {
  return NitroData.provinces[province] || [];
}

function getAllProvinces() {
  return Object.keys(NitroData.provinces);
}

function getRandomQuestionsByCategory(category, count = 5) {
  const questions = NitroData.randomQuestions[category] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function getMessage(type, key) {
  return NitroData.messages[type]?.[key] || 'پیام نامشخص';
}

function getGameSetting(key) {
  return NitroData.gameSettings[key] || null;
}

function getLeagueReward(leagueId) {
  return NitroData.gameSettings.leagueRewards[leagueId] || null;
}

function getAchievementsByCategory(category) {
  return NitroData.achievements.filter(a => a.category === category);
}

function getTopGroups(limit = 5) {
  return [...NitroData.defaultGroups]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, limit);
}

// ==========================================
// اکپورت
// ==========================================

window.NitroData = NitroData;
window.getLeagueByScore = getLeagueByScore;
window.getLeagueById = getLeagueById;
window.getNextLeague = getNextLeague;
window.getRandomQuote = getRandomQuote;
window.getShopItemsByCategory = getShopItemsByCategory;
window.getAllShopItems = getAllShopItems;
window.getAchievementById = getAchievementById;
window.getProvinceCities = getProvinceCities;
window.getAllProvinces = getAllProvinces;
window.getRandomQuestionsByCategory = getRandomQuestionsByCategory;
window.getMessage = getMessage;
window.getGameSetting = getGameSetting;
window.getLeagueReward = getLeagueReward;
window.getAchievementsByCategory = getAchievementsByCategory;
window.getTopGroups = getTopGroups;

console.log('📦 NitroData (FULL VERSION) loaded successfully!');
console.log(`📊 ${NitroData.leagues.length} لیگ, ${NitroData.defaultGroups.length} گروه, ${NitroData.achievements.length} دستاورد`);