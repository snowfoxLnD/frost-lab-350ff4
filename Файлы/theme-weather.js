/* ════════════════════════════════════════════════════════════
   AKSO · THEMES + LINKON WEATHER  (тестовый модуль)
   8 палитр (4 сезона × день/ночь), переключатель на навигации,
   выбор сезона в Досье, голографический виджет погоды Линкона.
   ════════════════════════════════════════════════════════════ */
(function(){

/* ---------- ПАЛИТРЫ ---------- */
const THEMES={
  /* ── ВСЕ ТЁМНЫЕ. day = чуть светлее/теплее, night = глубже ── */
  winterNight:{mode:'dark',bg:'#060e1a',card:'rgba(9,20,37,.72)',ice:'#a8d8f0',icdim:'#4a8ab0',cop:'#c49a6c',txt:'#d4e8f5',mut:'#7a9ab8',bdr:'rgba(168,216,240,.14)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(42,108,176,.2),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(74,138,176,.16),transparent 60%),linear-gradient(180deg,#040912,#060e1a 45%,#08182b)'},
  winterDay:{mode:'dark',bg:'#0a1626',card:'rgba(16,30,50,.72)',ice:'#bfe6ff',icdim:'#5a9ac4',cop:'#d3a878',txt:'#e2f1fb',mut:'#8fb0cc',bdr:'rgba(190,228,255,.16)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(60,130,200,.26),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(90,154,196,.2),transparent 60%),linear-gradient(180deg,#081424,#0a1626 45%,#0c2236)'},
  summerNight:{mode:'dark',bg:'#0a1719',card:'rgba(18,38,40,.74)',ice:'#7fd8d0',icdim:'#3f8a8c',cop:'#c9b07a',txt:'#d4eeea',mut:'#6f9a96',bdr:'rgba(127,216,208,.15)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(58,120,128,.34),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(78,189,213,.16),transparent 60%),linear-gradient(180deg,#071213,#0a1719 45%,#0d2024)'},
  summerDay:{mode:'dark',bg:'#0c1f22',card:'rgba(20,44,46,.72)',ice:'#8fe8df',icdim:'#4ebdd5',cop:'#d8b98a',txt:'#dcf2ee',mut:'#7aa8a4',bdr:'rgba(143,232,223,.16)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(78,189,213,.3),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(127,216,208,.2),transparent 60%),linear-gradient(180deg,#0a1a1c,#0c1f22 45%,#0f2629)'},
  autumnNight:{mode:'dark',bg:'#131015',card:'rgba(30,22,26,.76)',ice:'#fec579',icdim:'#d98f4a',cop:'#c97f52',txt:'#f0dcc0',mut:'#a08a78',bdr:'rgba(254,197,121,.15)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(209,92,29,.26),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(155,114,82,.24),transparent 60%),linear-gradient(180deg,#0e0b10,#131015 45%,#1a1411)'},
  autumnDay:{mode:'dark',bg:'#1a1410',card:'rgba(38,28,20,.74)',ice:'#ffd089',icdim:'#ed9e51',cop:'#d88a5a',txt:'#f4e2c8',mut:'#b09478',bdr:'rgba(255,208,137,.16)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(242,167,45,.3),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(209,92,29,.2),transparent 60%),linear-gradient(180deg,#140f0b,#1a1410 45%,#20180f)'},
  springNight:{mode:'dark',bg:'#241a26',card:'rgba(52,36,48,.72)',ice:'#f0b8c4',icdim:'#c97f9a',cop:'#a9c2a8',txt:'#f4e6ec',mut:'#bba0b0',bdr:'rgba(240,184,196,.18)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(201,127,154,.34),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(120,160,140,.26),transparent 60%),linear-gradient(180deg,#1c1420,#241a26 45%,#2c2030)'},
  springDay:{mode:'dark',bg:'#2a2030',card:'rgba(58,42,56,.7)',ice:'#f6c8d2',icdim:'#d68fa8',cop:'#b2cbb0',txt:'#f7ebf0',mut:'#c4abba',bdr:'rgba(246,200,210,.18)',
    grad:'radial-gradient(60% 50% at 20% 0%,rgba(227,160,180,.3),transparent 60%),radial-gradient(70% 60% at 50% 110%,rgba(150,180,160,.26),transparent 60%),linear-gradient(180deg,#221a28,#2a2030 45%,#322638)'},
};
const SEASONS=[['winter','❄ Зима'],['spring','🌸 Весна'],['summer','☀ Лето'],['autumn','🍁 Осень']];

/* ---------- CSS ---------- */
const css=`
body[data-theme]::before{background:var(--grad)!important;}
/* top nav follows theme tint */
body[data-theme] #main-nav{background:color-mix(in srgb,var(--bg) 92%,transparent)!important;border-bottom-color:var(--bdr)!important;}
/* === перекраска компонентов под тему (НЕ трогаем WU и Мифы) === */
body[data-theme] .nav-logo{color:var(--ice)!important;}
body[data-theme] .nav-logo-img{filter:drop-shadow(0 0 8px color-mix(in srgb,var(--ice) 45%,transparent))!important;}
/* карточки историй/пациента */
body[data-theme] .story-card,body[data-theme] .pcard,body[data-theme] .ccard,body[data-theme] [class*="card-frame"]{background:var(--card)!important;border-color:var(--bdr)!important;}
/* поиск */
body[data-theme] .search-box,body[data-theme] #search-input,body[data-theme] [class*="search"]{background:color-mix(in srgb,var(--bg) 70%,transparent)!important;border-color:var(--bdr)!important;}
/* досье: все панели */
body[data-theme] .ds-card,body[data-theme] .ds-zayne,body[data-theme] .ds-ach,body[data-theme] .ds-accat,body[data-theme] .ds-io,body[data-theme] .ds-tools .ds-tbtn,body[data-theme] .ds-ach .ds-ic{background:var(--card)!important;}
body[data-theme] .ds-card,body[data-theme] .ds-zayne,body[data-theme] .ds-ach,body[data-theme] .ds-accat,body[data-theme] .ds-io{border-color:var(--bdr)!important;}
/* каналы внизу — общий блок (если не wu/myth) */
body[data-theme] .ch-bar{background:var(--card)!important;border-color:var(--bdr)!important;}

/* === Рецепт: ледяная «бумага» в цветах Аксо (не коричневый) === */
body[data-theme] .ds-rx{background:linear-gradient(160deg,#eef6fc,#dcebf6)!important;color:#16242f!important;border:1px solid color-mix(in srgb,var(--ice) 50%,#9fc4dd)!important;}
body[data-theme] .ds-rx::before{background:repeating-linear-gradient(180deg,#3a6f93 0 6px,transparent 6px 14px)!important;opacity:.5!important;}
body[data-theme] .ds-rx-symbol{color:#2f6f93!important;}
body[data-theme] .ds-rx-t{color:#4a6675!important;}
body[data-theme] .ds-rx-d{color:#6a8696!important;}
body[data-theme] .ds-rx-body{color:#16242f!important;}
body[data-theme] .ds-rx-roll{color:#2f6f93!important;border-color:rgba(47,111,147,.4)!important;}
body[data-theme] .ds-rx-roll:hover{background:rgba(47,111,147,.08)!important;}
body[data-theme] .ds-rx-sig{color:#2f6f93!important;}
/* Зейн-реплика: ледяной пузырь в цветах Аксо (как рецепт) */
body[data-theme] .ds-zb{background:linear-gradient(160deg,#eef6fc,#dcebf6)!important;color:#16242f!important;}
body[data-theme] .ds-zb::before{border-right-color:#dcebf6!important;}
body[data-theme] .ds-zsig{color:#2f6f93!important;}

/* === Текст карточек: ярче и в палитре === */
body[data-theme] .mc-diag{color:color-mix(in srgb,var(--txt) 88%,transparent)!important;}
body[data-theme] .mc-diag .k{color:var(--ice)!important;opacity:.95;}
body[data-theme] .mc-field{color:color-mix(in srgb,var(--txt) 70%,transparent)!important;}
body[data-theme] .mc-title{color:var(--ice)!important;}
body[data-theme] .mc-date{color:color-mix(in srgb,var(--txt) 65%,transparent)!important;}
body[data-theme] .mc-open{color:var(--ice)!important;}

/* === Бегущая строка с цитатами Зейна — в палитре сезона === */
body[data-theme] .hero-marquee{
  border-top-color:color-mix(in srgb,var(--ice) 18%,transparent)!important;
  border-bottom-color:color-mix(in srgb,var(--ice) 18%,transparent)!important;}
body[data-theme] .marquee-quote{color:color-mix(in srgb,var(--ice) 70%,transparent)!important;}
body[data-theme] .marquee-sep{color:color-mix(in srgb,var(--cop) 60%,transparent)!important;}


/* === ИСКЛЮЧЕНИЕ: на вкладках WU и Мифы вернуть ОРИГИНАЛЬНЫЕ фоны === */
/* WU — агрессивная красная подсветка (восстановлено) */
body[data-tab="wu"]::before{
  background:
    radial-gradient(58% 60% at 8% 38%,rgba(255,45,75,.28),transparent 60%),
    radial-gradient(46% 50% at 88% 72%,rgba(70,200,255,.10),transparent 60%),
    radial-gradient(70% 50% at 50% 115%,rgba(150,30,72,.22),transparent 62%),
    linear-gradient(180deg,#08060c 0%,#0c0810 45%,#150a17 100%)!important;}
/* Мифы — нефрит + золото (оригинал) */
body[data-tab="myths"]::before{
  background:
    radial-gradient(55% 50% at 20% 10%,rgba(118,208,189,.12),transparent 60%),
    radial-gradient(50% 50% at 85% 20%,rgba(200,170,110,.10),transparent 58%),
    radial-gradient(70% 55% at 50% 115%,rgba(40,60,90,.30),transparent 62%),
    linear-gradient(180deg,#060910 0%,#0a0f1c 100%)!important;}
body[data-tab="wu"] #main-nav,body[data-tab="myths"] #main-nav{background:rgba(6,14,26,.94)!important;}

/* === ИСКЛЮЧЕНИЕ: вкладка газеты держит свой собственный фон (не зависит от сезона) === */
body[data-tab="newspaper"]::before{
  background:
    radial-gradient(60% 50% at 20% 0%,rgba(180,140,80,.10),transparent 60%),
    radial-gradient(70% 60% at 80% 110%,rgba(40,30,20,.30),transparent 60%),
    linear-gradient(180deg,#0a0810 0%,#0c0a14 100%)!important;}
body[data-tab="newspaper"] #main-nav{background:rgba(10,8,16,.94)!important;}
/* и не перекрашивать сами панели WU/Мифов (на всякий случай — они со своими классами, мы их и не трогаем) */

/* === МАСШТАБ === */
#zoomCtl{position:fixed;right:14px;bottom:16px;z-index:210;display:flex;flex-direction:column;gap:6px;}
#zoomCtl button{width:36px;height:36px;border-radius:50%;border:1px solid var(--bdr);background:rgba(6,14,26,.9);color:var(--ice);font-family:'JetBrains Mono',monospace;font-size:.9rem;cursor:pointer;transition:.25s;box-shadow:0 2px 10px rgba(0,0,0,.4);}
#zoomCtl button:hover{border-color:var(--ice);box-shadow:0 0 12px color-mix(in srgb,var(--ice) 30%,transparent);}
@media(max-width:980px){#zoomCtl{right:10px;bottom:12px;}#zoomCtl button{width:34px;height:34px;}}

body.theme-light h1,body.theme-light .site-title,body.theme-light .ds-h-title,body.theme-light .hero-title{text-shadow:0 0 18px color-mix(in srgb,var(--ice) 18%,transparent)!important;}
body.theme-light{color-scheme:light;}
/* nav theme toggle */
#themeToggle{position:fixed;top:10px;right:14px;z-index:210;font-family:'JetBrains Mono',monospace;font-size:1rem;line-height:1;color:var(--ice);background:rgba(6,14,26,.9);border:1px solid var(--bdr);border-radius:50%;width:36px;height:36px;cursor:pointer;transition:.3s;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.4);}
#themeToggle:hover{border-color:var(--ice);box-shadow:0 0 14px color-mix(in srgb,var(--ice) 35%,transparent);}
@media(max-width:980px){#themeToggle{top:8px;right:10px;width:32px;height:32px;font-size:.9rem;}}
/* season selector in dossier */
#themeToggle{display:none!important;}
.ds-season{display:flex;flex-direction:column;gap:10px;border:1px solid var(--bdr);background:rgba(0,0,0,.12);padding:12px 14px;margin-bottom:18px;}
.ds-season-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.ds-season .lbl{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--icdim);width:100%;}
.ds-season button{font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.06em;color:var(--txt);border:1px solid var(--bdr);background:transparent;padding:8px 12px;cursor:pointer;transition:.25s;border-radius:3px;}
.ds-season button:hover{border-color:var(--ice);}
.ds-season button.on{background:color-mix(in srgb,var(--ice) 16%,transparent);border-color:var(--ice);color:var(--ice);}
.ds-season .auto-season-btn,.ds-season .auto-mode-btn{margin-left:auto;}

/* ---------- WEATHER (голографические часы охотника) ---------- */
.wx{position:relative;border:1px solid color-mix(in srgb,var(--ice) 35%,transparent);background:linear-gradient(135deg,color-mix(in srgb,var(--ice) 9%,transparent),transparent 70%),rgba(6,14,26,.35);
  padding:16px 18px;margin-bottom:18px;overflow:hidden;border-radius:4px;
  box-shadow:inset 0 0 30px color-mix(in srgb,var(--ice) 8%,transparent),0 0 24px color-mix(in srgb,var(--ice) 6%,transparent);}
.wx::before{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,color-mix(in srgb,var(--ice) 6%,transparent) 0 1px,transparent 1px 3px);opacity:.5;mix-blend-mode:screen;animation:wxScan 8s linear infinite;}
@keyframes wxScan{to{background-position:0 60px;}}
.wx::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--ice),transparent);opacity:.6;animation:wxSweep 4s ease-in-out infinite;}
@keyframes wxSweep{0%,100%{transform:translateY(0);opacity:.2}50%{transform:translateY(120px);opacity:.6}}
.wx-top{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.24em;text-transform:uppercase;color:var(--icdim);margin-bottom:12px;position:relative;z-index:2;}
.wx-top .dot{width:6px;height:6px;border-radius:50%;background:var(--ice);box-shadow:0 0 8px var(--ice);animation:wxPulse 1.6s ease-in-out infinite;}
@keyframes wxPulse{0%,100%{opacity:.4}50%{opacity:1}}
.wx-main{display:flex;align-items:center;gap:18px;position:relative;z-index:2;}
.wx-icon{font-size:2.8rem;filter:drop-shadow(0 0 10px color-mix(in srgb,var(--ice) 50%,transparent));}
.wx-temp{font-family:'Orbitron',monospace;font-weight:700;font-size:2.2rem;color:var(--ice);text-shadow:0 0 20px color-mix(in srgb,var(--ice) 40%,transparent);line-height:1;}
.wx-cond{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.1em;color:var(--txt);margin-top:4px;}
.wx-meta{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.08em;color:var(--mut);margin-top:3px;}
.wx-city{margin-left:auto;text-align:right;}
.wx-city .c1{font-family:'Cinzel',serif;font-size:.7rem;letter-spacing:.18em;color:var(--ice);}
.wx-city .c2{font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mut);margin-top:2px;}
.wx-extra{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:14px;margin-top:12px;padding-top:10px;border-top:1px dashed color-mix(in srgb,var(--bdr) 60%,transparent);font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.08em;color:var(--icdim);}
.wx-extra .wx-e-item{display:inline-flex;align-items:center;gap:4px;}
.wx-advice{position:relative;z-index:2;margin-top:14px;padding-top:12px;border-top:1px dashed var(--bdr);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1rem;line-height:1.5;color:var(--txt);}
.wx-advice .who{font-family:'JetBrains Mono',monospace;font-style:normal;font-size:.46rem;letter-spacing:.16em;text-transform:uppercase;color:var(--cop);display:block;margin-top:6px;}
@media(max-width:560px){.wx-temp{font-size:1.8rem}.wx-icon{font-size:2.2rem}.wx-main{gap:12px}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---------- ПРИМЕНЕНИЕ ТЕМЫ ---------- */
function curState(){
  let s=null;try{s=JSON.parse(localStorage.getItem('akso_theme')||'null');}catch(e){}
  // legacy migration: старая схема использовала s.auto={true|false} для обоих
  if(s&&'auto' in s){
    if(s.seasonAuto===undefined)s.seasonAuto=s.auto;
    if(s.modeAuto===undefined)s.modeAuto=s.auto;
  }
  const m=new Date().getMonth(),h=new Date().getHours();
  const autoSeason=(m>=2&&m<=4)?'spring':(m>=5&&m<=7)?'summer':(m>=8&&m<=10)?'autumn':'winter';
  const autoMode=(h>=7&&h<19)?'day':'night';
  if(!s)return {season:autoSeason,mode:autoMode,seasonAuto:true,modeAuto:true};
  return {
    season:s.seasonAuto?autoSeason:(s.season||autoSeason),
    mode:s.modeAuto?autoMode:(s.mode||autoMode),
    seasonAuto:!!s.seasonAuto,
    modeAuto:!!s.modeAuto,
  };
}
function save(s){try{localStorage.setItem('akso_theme',JSON.stringify(s));}catch(e){}}
function applyTheme(){
  const s=curState();
  const key=s.season+(s.mode==='day'?'Day':'Night');
  const t=THEMES[key]||THEMES.winterNight;
  const r=document.documentElement.style;
  r.setProperty('--bg',t.bg);r.setProperty('--card',t.card);r.setProperty('--ice',t.ice);
  r.setProperty('--icdim',t.icdim);r.setProperty('--cop',t.cop);r.setProperty('--txt',t.txt);
  r.setProperty('--mut',t.mut);r.setProperty('--bdr',t.bdr);r.setProperty('--grad',t.grad);
  document.body.setAttribute('data-theme',key);
  document.body.classList.toggle('theme-light',false);
  document.body.classList.toggle('theme-dark',true);
  // update season buttons
  document.querySelectorAll('.ds-season [data-season]').forEach(b=>b.classList.toggle('on',!s.seasonAuto&&b.dataset.season===s.season));
  const sab=document.querySelector('.ds-season .auto-season-btn');if(sab)sab.classList.toggle('on',!!s.seasonAuto);
  // update mode buttons
  document.querySelectorAll('.ds-season [data-mode]').forEach(b=>b.classList.toggle('on',!s.modeAuto&&b.dataset.mode===s.mode));
  const mab=document.querySelector('.ds-season .auto-mode-btn');if(mab)mab.classList.toggle('on',!!s.modeAuto);
  // refresh weather
  renderWeather();
}
function setMode(mode){let s=null;try{s=JSON.parse(localStorage.getItem('akso_theme')||'null');}catch(e){}s=s||{};s.mode=mode;s.modeAuto=false;delete s.auto;save(s);applyTheme();}
function setModeAuto(){let s=null;try{s=JSON.parse(localStorage.getItem('akso_theme')||'null');}catch(e){}s=s||{};s.modeAuto=true;delete s.auto;save(s);applyTheme();}
function setSeason(season){let s=null;try{s=JSON.parse(localStorage.getItem('akso_theme')||'null');}catch(e){}s=s||{};s.season=season;s.seasonAuto=false;delete s.auto;save(s);applyTheme();}
function setSeasonAuto(){let s=null;try{s=JSON.parse(localStorage.getItem('akso_theme')||'null');}catch(e){}s=s||{};s.seasonAuto=true;delete s.auto;save(s);applyTheme();}
// legacy aliases
function toggleMode(){const s=curState();setMode(s.mode==='day'?'night':'day');}
function setAuto(){setSeasonAuto();setModeAuto();}

/* ---------- ПОГОДА (детерминированно по дате — у всех одинаково) ---------- */
function seedFromDate(d){const k=d.getFullYear()*1000+ (Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)); // day-of-year
  // simple LCG
  let x=(k*9301+49297)%233280;return ()=>{x=(x*9301+49297)%233280;return x/233280;};}
const WX_BY_SEASON={
  winter:[['❄','Снег',-8,2],['🌨️','Метель',-12,-2],['☁','Пасмурно',-5,1],['🌫️','Морозный туман',-7,-1],['☀','Ясно, морозно',-10,-3]],
  spring:[['🌧️','Дождь',6,12],['⛅','Переменно',8,15],['🌸','Ясно',12,19],['🌫️','Туман',5,10],['🌦️','Морось',7,13]],
  summer:[['☀','Жарко',24,31],['⛅','Тепло',20,26],['🌊','Морской бриз',19,24],['⛈️','Гроза',18,25],['🌧️','Ливень',17,22]],
  autumn:[['🍁','Ясно, прохладно',8,14],['🌧️','Дождь',5,11],['🌫️','Сумеречный туман',4,9],['☁','Пасмурно',6,12],['💨','Ветрено',3,9]],
};
/* массив на каждое условие — выбор по дате (один и тот же у всех в этот день) */
const ZAYNE_WX={
  'Снег':[
    'Снег. Шарф и перчатки — не обсуждается. Я серьёзно.',
    'Снежно. Натяни шапку до бровей и не геройствуй.',
    'Снег. Я был бы спокойнее, если бы ты осталась дома.',
    'Снежит. Возьми термос. Никаких возражений.',
  ],
  'Метель':[
    'Метель. Сегодня лучше остаться в тепле. Архив подождёт.',
    'Метель. Если выйдешь — слой пуха, не меньше. Я проверю.',
    'Метель. Дороги опасны. Подожди, как стихнет.',
  ],
  'Пасмурно':[
    'Пасмурно. Возьми слой потеплее, к вечеру похолодает.',
    'Пасмурно и тихо. Хорошее утро для длинного шарфа.',
    'Пасмурно. Согрейся изнутри — что-нибудь горячее в термос.',
  ],
  'Морозный туман':[
    'Морозный туман. Дыши через шарф и не торопись на льду.',
    'Туман с инеем. Шаги короче, ладони в карманах.',
    'Морозный туман. Я бы предпочёл, чтобы ты не выходила пока.',
  ],
  'Ясно, морозно':[
    'Ясно, но обманчиво холодно. Тёплая куртка обязательна.',
    'Ясное небо не обманывайся. Минус и ветер — это всё ещё минус и ветер.',
    'Морозно и ясно. Идеальный день для прогулки, если оденешься как надо.',
  ],
  'Дождь':[
    'Дождь. Зонт — или будешь у меня на приёме с простудой.',
    'Дождит. Возьми с собой запасные носки. Доверься профессионалу.',
    'Дождь. Капюшон, водолазка, и не задерживайся на улице.',
  ],
  'Переменно':[
    'Переменно. Возьми что-то на случай дождя.',
    'Небо непредсказуемое. Слой плюс зонт — и не прогадаешь.',
    'Переменно. Лучше перестраховаться, чем мокнуть.',
  ],
  'Ясно':[
    'Ясно. Редкий повод не кутаться — но воду пить не забывай.',
    'Ясно и тепло. Можно выдохнуть и побыть на солнце подольше.',
    'Ясно. Я бы посоветовал прогулку. Подальше от экранов.',
  ],
  'Туман':[
    'Туман. Будь внимательнее в дороге, я волнуюсь.',
    'Туман плотный. Светоотражатели — не лишние.',
    'Туман. Не спеши, дыши ровно.',
  ],
  'Морось':[
    'Морось. Лёгкий капюшон не помешает.',
    'Мелкая морось. Очки придётся протирать чаще.',
    'Морось — обманчиво. К концу прогулки вымокнешь насквозь.',
  ],
  'Жарко':[
    'Жарко. Пей воду, держись тени. Перегрев — это не шутки.',
    'Жара. Светлая одежда, головной убор, никаких подвигов на солнце.',
    'Жарко. Я бы советовал переждать пик в помещении.',
  ],
  'Тепло':[
    'Тепло и мягко. Идеальный день, чтобы выдохнуть.',
    'Тепло. Лёгкий слой, удобная обувь. Не задерживайся в кабинете.',
    'Тепло. Хороший день, чтобы дойти куда-то пешком.',
  ],
  'Морской бриз':[
    'Морской бриз. Лёгкая ветровка — и можно к воде.',
    'Бриз свежий. Возьми что-то с длинным рукавом на вечер.',
    'Морской бриз. Хороший повод подышать.',
  ],
  'Гроза':[
    'Гроза. Никаких прогулок под открытым небом, поняла?',
    'Гроза. Сиди дома. Это не обсуждается.',
    'Гроза. Если уже на улице — внутрь, немедленно.',
  ],
  'Ливень':[
    'Ливень. Останься внутри, я заварю тебе что-нибудь тёплое.',
    'Ливень. Зонт не спасёт. Перенеси дела.',
    'Ливень. Дороги залило — лучше переждать.',
  ],
  'Ясно, прохладно':[
    'Ясно и прохладно. Кардиган — твой друг сегодня.',
    'Прохладно, но солнечно. Тонкий шарф, и можно гулять долго.',
    'Свежо и ясно. Лучшая погода для длинной прогулки.',
  ],
  'Сумеречный туман':[
    'Сумеречный туман. Осторожнее на дороге, не спеши.',
    'Туман сумерек. Возьми шарф — потянет сыростью.',
    'Сумеречный туман. Не люблю такую погоду на твоих маршрутах.',
  ],
  'Ветрено':[
    'Ветрено. Застегнись как следует, продует.',
    'Сильный ветер. Капюшон, перчатки, никаких лёгких курток.',
    'Ветрено. Если волосы распущены — собери, отвлекать будут.',
  ],
};
function pickAdvice(cond,rng){
  const arr=ZAYNE_WX[cond];
  if(!arr||!arr.length)return 'Одевайся по погоде и береги себя.';
  return arr[Math.floor(rng()*arr.length)];
}

/* ---------- фаза луны и восход/закат для Linkon (φ≈50° N) ---------- */
function moonPhase(d){
  const ref=Date.UTC(2000,0,6,18,14); // известное новолуние 6 янв 2000 18:14 UTC
  const synodic=29.530588853*864e5;
  const k=((d.getTime()-ref)%synodic+synodic)%synodic/synodic; // 0..1
  const phases=[
    [.03,'🌑','Новолуние'],[.22,'🌒','Растущий серп'],[.28,'🌓','Первая четверть'],
    [.47,'🌔','Растущая луна'],[.53,'🌕','Полнолуние'],[.72,'🌖','Убывающая луна'],
    [.78,'🌗','Последняя четверть'],[.97,'🌘','Убывающий серп'],[1.01,'🌑','Новолуние'],
  ];
  for(const [t,ic,n] of phases) if(k<t) return {icon:ic,name:n};
  return {icon:'🌑',name:'Новолуние'};
}
function sunTimes(d){
  // упрощённая формула, φ=50° N, без учёта долготы и DST — для виджета достаточно
  const n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);
  const phi=50*Math.PI/180;
  const delta=-23.44*Math.PI/180*Math.cos(2*Math.PI/365*(n+10));
  const arg=-Math.tan(phi)*Math.tan(delta);
  if(arg>=1) return {rise:'—',set:'—'};       // полярная ночь
  if(arg<=-1)return {rise:'00:00',set:'24:00'};// полярный день
  const omega=Math.acos(arg)*12/Math.PI;
  const fmt=h=>{const m=Math.round((h%1)*60);return String(Math.floor(h)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
  return {rise:fmt(12-omega),set:fmt(12+omega)};
}
function renderWeather(){
  const host=document.getElementById('wxWidget');if(!host)return;
  const s=curState();
  const rng=seedFromDate(new Date());
  const list=WX_BY_SEASON[s.season]||WX_BY_SEASON.winter;
  const pick=list[Math.floor(rng()*list.length)];
  const [icon,cond,lo,hi]=pick;
  const temp=Math.round(lo+rng()*(hi-lo));
  const wind=Math.round(2+rng()*22);
  const hum=Math.round(40+rng()*55);
  const advice=pickAdvice(cond,rng);
  const moon=moonPhase(new Date());
  const sun=sunTimes(new Date());
  const dateStr=new Date().toLocaleDateString('ru-RU',{day:'numeric',month:'long'});
  host.innerHTML=`
    <div class="wx-top"><span class="dot"></span>Linkon Weather · Hunter Watch · ${dateStr}</div>
    <div class="wx-main">
      <div class="wx-icon">${icon}</div>
      <div>
        <div class="wx-temp">${temp>0?'+':''}${temp}°</div>
        <div class="wx-cond">${cond}</div>
        <div class="wx-meta">ветер ${wind} км/ч · влажность ${hum}%</div>
      </div>
      <div class="wx-city"><div class="c1">ЛИНКОН</div><div class="c2">Linkon City</div></div>
    </div>
    <div class="wx-extra">
      <span class="wx-e-item" title="Фаза луны">${moon.icon} ${moon.name}</span>
      <span class="wx-e-item" title="Восход">↑ ${sun.rise}</span>
      <span class="wx-e-item" title="Закат">↓ ${sun.set}</span>
    </div>
    <div class="wx-advice">«${advice}»<span class="who">— Dr. Zayne · что надеть</span></div>`;
}

/* ---------- МОНТАЖ ЭЛЕМЕНТОВ ---------- */
function mount(){
  // 2) season+mode selector + weather widget in dossier
  const wrap=document.querySelector('#tab-dossier .ds-wrap');
  if(wrap&&!document.getElementById('wxWidget')){
    const wx=document.createElement('div');wx.className='wx';wx.id='wxWidget';
    const sel=document.createElement('div');sel.className='ds-season';
    sel.innerHTML=
      '<div class="ds-season-row">'
      +'<span class="lbl">Сезон оформления</span>'
      +SEASONS.map(([k,n])=>`<button data-season="${k}" onclick="aksoTheme.setSeason('${k}')">${n}</button>`).join('')
      +'<button class="auto-season-btn" onclick="aksoTheme.setSeasonAuto()">⏱ Авто сезон</button>'
      +'</div>'
      +'<div class="ds-season-row">'
      +'<span class="lbl">Смена</span>'
      +'<button data-mode="day" onclick="aksoTheme.setMode(\'day\')">🌤 Дневная смена</button>'
      +'<button data-mode="night" onclick="aksoTheme.setMode(\'night\')">🌙 Ночная смена</button>'
      +'<button class="auto-mode-btn" onclick="aksoTheme.setModeAuto()">⏱ Авто</button>'
      +'</div>';
    const head=wrap.querySelector('.ds-head');
    if(head){head.insertAdjacentElement('afterend',sel);sel.insertAdjacentElement('afterend',wx);}
    else{wrap.insertBefore(wx,wrap.firstChild);wrap.insertBefore(sel,wrap.firstChild);}
  }
  // remove legacy floating button if present from earlier sessions
  const stale=document.getElementById('themeToggle');if(stale)stale.remove();
  applyTheme();
}

window.aksoTheme={setSeason,setSeasonAuto,setMode,setModeAuto,setAuto,toggleMode,applyTheme};
// apply palette ASAP (before mount, to avoid flash), then mount UI when DOM ready
applyTheme();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
// re-mount if dossier built later / nav re-rendered
setTimeout(mount,600);setTimeout(mount,1600);

/* ── tab tracking (для исключения WU/Мифов из перекраски) ── */
function tagTab(t){document.body.setAttribute('data-tab',t||'all');}
(function(){
  function hook(){
    if(window.__aksoTabHook)return;
    if(typeof window.navGo==='function'){
      const o=window.navGo;window.navGo=function(section,btn){tagTab(section);return o.apply(this,arguments);};window.__aksoTabHook=1;
    }
    if(typeof window.switchTab==='function'){
      const s=window.switchTab;window.switchTab=function(tab,btn){tagTab(tab);return s.apply(this,arguments);};
    }
  }
  hook();setTimeout(hook,400);setTimeout(hook,1200);
  tagTab('all');
})();

/* ── масштаб A- / A+ ── */
(function(){
  let z=1;try{z=parseFloat(localStorage.getItem('akso_zoom')||'1')||1;}catch(e){}
  function applyZoom(){document.documentElement.style.fontSize=(z*100)+'%';}
  function setZoom(v){z=Math.min(1.4,Math.max(0.8,Math.round(v*20)/20));try{localStorage.setItem('akso_zoom',z);}catch(e){}applyZoom();}
  function build(){
    if(document.getElementById('zoomCtl'))return;
    const w=document.createElement('div');w.id='zoomCtl';
    w.innerHTML='<button title="Крупнее" id="zPlus">A+</button><button title="Мельче" id="zMinus">A−</button>';
    document.body.appendChild(w);
    w.querySelector('#zPlus').onclick=()=>setZoom(z+0.05);
    w.querySelector('#zMinus').onclick=()=>setZoom(z-0.05);
  }
  applyZoom();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
  setTimeout(build,600);
})();

})();
