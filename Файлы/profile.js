/* ═══════════════════════════════════════════════════════════════════
   AKSO ARCHIVE · КАБИНЕТ ДОКТОРА (вкладка «О персонаже»)
   Меняется под сезонную палитру.
   Картотека из 5 «папок»: Анкета · Карьера · Биография · Привычки · Окружение.
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ──────────────  ДАННЫЕ  ────────────── */

const FOLDERS=[
  {id:'anketa', icon:'📋', img:'./Файлы/profile/anketa.png',   title:'Анкета',     sub:'Личное дело'},
  {id:'work',   icon:'🏥', img:'./Файлы/profile/work.png',     title:'Карьера',    sub:'Послужной список'},
  {id:'bio',    icon:'📔', img:'./Файлы/profile/bio.png',      title:'Биография',  sub:'История жизни'},
  {id:'habits', icon:'☕', img:'./Файлы/profile/habits.png',   title:'Привычки',   sub:'Характер и ритуалы'},
  {id:'people', icon:'👥', img:'./Файлы/profile/people.png',   title:'Окружение',  sub:'Близкий круг'},
];

const PROFILE={
  anketa:[
    ['Полное имя','Zayne · 黎深 · Lí Shēn'],
    ['День рождения','5 сентября'],
    ['Возраст','27 (родился 5.09.2021)'],
    ['Рост','≈ 187 см'],
    ['Цвет глаз','ореховый зелёный'],
    ['Волосы','короткие чёрные, до основания шеи'],
    ['Очки','серебряная оправа, близорукость'],
    ['Особые приметы','шрамы на предплечьях и кистях'],
    ['Эвол','Лёд'],
    ['Группа крови','AB'],
    ['Зодиак','Дева'],
    ['Гражданство','Линкон'],
  ],
  work:[
    ['Должность','Главный кардиохирург больницы Аксо (Линкон)'],
    ['Лаборатория','Старший исследователь Эвол-кардиолаборатории (АЕЦ)'],
    ['Преподавание','Научный руководитель PhD-программы Медицинской школы Скайхэйвена'],
    ['Образование','Скайхэйвен Медикал — магистратура и PhD'],
    ['В вуз поступил','в 14 лет (2035 год)'],
    ['Ключевое открытие','Гены Эвола влияют на скорость мутации клеток при развитии сердца'],
    ['Награды','«Звездолов» (Starcatcher Award, 2046, в 25 лет) · премия Линде — самый молодой обладатель'],
    ['Публикации','30+ статей первым автором в журналах с IF&nbsp;&gt;&nbsp;9.0'],
    ['Первая в мире операция','Регенерация аортального клапана с применением Эвола'],
    ['Специализации','Коррекция врождённых пороков сердца · регенерация и восстановление клапанов · трансплантация сердца'],
    ['Препараты в практике','Регулярно работает с антиагрегантами — клопидогрель в центре кардиопротокола'],
    ['Стиль работы','Хирург-перфекционист, минимальная ошибочность, известен дотошностью'],
  ],
  bio:[
    ['Семья','Оба родителя — врачи Всемирной Ассоциации Врачей; работают в долгих международных командировках'],
    ['Ритуал на ДР','Каждый год шлёт родителям видео-сообщение, что у него всё в порядке'],
    ['Детство','Чаще всего был один — родителей рядом почти не было'],
    ['MC','Знакомы с детства, дружба прервалась когда Зейн уехал'],
    ['Воссоединение','Через 10+ лет — стал её лечащим врачом по просьбе бабушки Жозефины'],
    ['Калеб','Друг с детских лет, общая компания'],
    ['Доктор Ноа','Бывший профессор и научный руководитель, продолжают совместные исследования'],
    ['Картер','Однокурсник, идейный соперник — ушёл в Protocore Enhancement'],
    ['Уильям','Друг, погибший на горе Вечной; Зейн был вынужден остановить его при необратимой трансформации в Странника'],
    ['Кошмары','С 12 лет — повторяющиеся сны; видит мир глазами альтер-эго'],
    ['Даунбрейкер','Тёмная версия Зейна из этих снов. В его реальности Странники заполнили улицы, люди заперты в домах; он живёт один в холодной, тихой, погибающей версии Линкона. Для нашего Зейна — постоянное напоминание о том, что может случиться, если он не успеет'],
  ],
  habits:[
    ['Сладкое','Тайно любит'],
    ['Алкоголь','Не пьёт — одной конфеты с ликёром достаточно, чтобы опьянеть'],
    ['Темп','Трудоголик, часто закрывает смену под утро'],
    ['Эвол в действии','При активации температура вокруг падает до экстремально низкой'],
    ['Чем занимается','Бильярд, резьба по нефриту, путешествия, музеи, парки, спорт — обычно один'],
    ['Чувство юмора','Серьёзным лицом — самые несерьёзные вещи; забавляется, наблюдая реакцию'],
    ['Маленькие животные','Слабость, хотя сам бы не признался'],
    ['Свободное время','Любит проводить наедине с собой — без шума, без компании'],
  ],
  people:[
    ['MC','Главный человек в жизни. Друг детства, лечащая пациентка, пара'],
    ['Пай','Маленький компаньон-ягнёнок — присутствие, которое не задаёт вопросов'],
    ['Калеб','Друг с детства, общая компания, регулярный контакт'],
    ['Доктор Ноа','Учитель и научный соавтор'],
    ['Грейсон','Коллега по Аксо, медицинский персонал'],
    ['Ивонн','Коллега по Аксо, медицинский персонал'],
    ['Картер','Бывший однокурсник, идейный противник'],
    ['Уильям','Утраченный друг с горы Вечной'],
    ['Родители','Работают вдали, видятся редко, переписка — видео-сообщения'],
    ['Бабушка Жозефина','Бабушка MC; именно её просьба свела их с MC снова'],
    ['Голос JP','Junta Terashima (с июня 2026; с запуска 2024 — Takuya Satō)'],
    ['Голос EN','под NDA — официально не раскрывается'],
  ],
};


/* ──────────────  CSS  ────────────── */

const css=`
#tab-profile{padding:24px 0 60px;}
.pr-wrap{position:relative;}

.pr-hdr{position:relative;text-align:center;padding:16px 14px 22px;border:1px solid var(--bdr);
  background:linear-gradient(180deg,color-mix(in srgb,var(--ice) 6%,transparent),transparent 70%),rgba(0,0,0,.18);
  margin-bottom:18px;overflow:hidden;}
.pr-hdr::before{content:'';position:absolute;left:-40px;top:-60px;width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,color-mix(in srgb,var(--cop) 30%,transparent),transparent 70%);
  filter:blur(8px);pointer-events:none;}
.pr-hdr-pre{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.32em;color:var(--cop);margin-bottom:8px;text-transform:uppercase;}
.pr-hdr h2{font-family:'Audiowide',sans-serif;font-size:clamp(1.4rem,3.8vw,2.2rem);color:var(--ice);margin:0 0 4px;letter-spacing:.1em;}
.pr-hdr .pr-sub{font-family:'Cormorant Garamond',serif;font-style:italic;color:var(--txt);font-size:1.02rem;}
.pr-hdr .pr-stamp{position:absolute;right:14px;top:14px;width:62px;height:62px;border:2px solid color-mix(in srgb,var(--ice) 70%,transparent);
  border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;
  color:var(--ice);font-family:'JetBrains Mono',monospace;font-size:.48rem;letter-spacing:.16em;text-align:center;
  transform:rotate(-8deg);opacity:.78;line-height:1.15;}
.pr-hdr .pr-stamp b{font-size:.55rem;letter-spacing:.2em;}
@media(max-width:640px){.pr-hdr .pr-stamp{position:static;margin:8px auto 0;}}

.pr-grid{display:grid;grid-template-columns:240px 1fr;gap:18px;align-items:start;}
@media(max-width:760px){.pr-grid{grid-template-columns:1fr;}}

.pr-tabs{display:flex;flex-direction:column;gap:6px;}
@media(max-width:760px){
  .pr-tabs{flex-direction:row;flex-wrap:wrap;gap:6px;overflow-x:auto;padding-bottom:4px;}
}
.pr-tab{position:relative;display:flex;align-items:center;gap:12px;padding:11px 14px;
  background:rgba(0,0,0,.18);border:1px solid var(--bdr);border-left:3px solid transparent;
  color:var(--mut);cursor:pointer;text-align:left;width:100%;font-family:inherit;
  transition:border-color .2s,background .2s,color .2s,transform .15s;}
.pr-tab:hover{color:var(--ice);background:color-mix(in srgb,var(--ice) 4%,rgba(0,0,0,.18));}
.pr-tab.on{color:var(--ice);border-left-color:var(--ice);background:color-mix(in srgb,var(--ice) 10%,rgba(0,0,0,.18));}
.pr-tab.on::after{content:'';position:absolute;right:-1px;top:50%;transform:translateY(-50%);
  width:6px;height:6px;background:var(--ice);box-shadow:0 0 10px var(--ice);border-radius:50%;}
@media(max-width:760px){
  .pr-tab{border-left:1px solid var(--bdr);border-top:3px solid transparent;flex:1 1 auto;min-width:130px;}
  .pr-tab.on{border-left-color:var(--bdr);border-top-color:var(--ice);}
  .pr-tab.on::after{right:50%;top:auto;bottom:-1px;transform:translateX(50%);}
}
.pr-tab-ic{width:40px;height:40px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:transparent;font-size:1.15rem;}
.pr-tab-ic img{width:36px;height:36px;object-fit:contain;image-rendering:pixelated;image-rendering:crisp-edges;display:block;
  filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));}
.pr-tab[data-pr-id="bio"] .pr-tab-ic img{width:42px;height:42px;}
.pr-tab-txt{display:flex;flex-direction:column;line-height:1.15;}
.pr-tab-title{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;}
.pr-tab-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.78rem;color:var(--mut);}

.pr-sheet{position:relative;background:var(--card-bg,rgba(8,14,24,.6));border:1px solid var(--bdr);
  padding:22px 24px 26px;min-height:340px;
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
  box-shadow:0 8px 28px rgba(0,0,0,.35);}
.pr-sheet::before{content:'';position:absolute;left:0;top:0;bottom:0;width:6px;
  background:repeating-linear-gradient(180deg,var(--icdim) 0 7px,transparent 7px 16px);opacity:.45;}
.pr-sheet-head{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px dashed var(--bdr);padding-bottom:10px;margin-bottom:14px;gap:14px;flex-wrap:wrap;}
.pr-sheet-h{font-family:'Playfair Display',Georgia,serif;font-size:1.45rem;color:var(--ice);margin:0;letter-spacing:.01em;}
.pr-sheet-meta{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.22em;color:var(--mut);text-transform:uppercase;}

.pr-fields{margin:0;}
.pr-row{display:grid;grid-template-columns:200px 1fr;gap:10px 18px;padding:8px 0;border-bottom:1px dotted color-mix(in srgb,var(--bdr) 60%,transparent);font-size:.96rem;align-items:baseline;}
.pr-row:last-child{border:none;}
.pr-row dt{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--cop);padding-top:3px;}
.pr-row dd{margin:0;color:var(--txt);font-family:'Cormorant Garamond',serif;font-size:1.04rem;line-height:1.45;}
@media(max-width:640px){
  .pr-row{grid-template-columns:1fr;gap:2px;padding:6px 0;}
  .pr-row dt{font-size:.5rem;}
}

.pr-sign{margin-top:20px;text-align:right;font-family:'Cormorant Garamond',serif;font-style:italic;
  color:var(--mut);font-size:.92rem;letter-spacing:.02em;}
.pr-sign::before{content:'— ';color:var(--cop);}
`;


/* ──────────────  РЕНДЕР  ────────────── */

function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);}

let _active='anketa';

function renderTabs(){
  return FOLDERS.map(f=>`
    <button class="pr-tab${f.id===_active?' on':''}" data-pr-id="${f.id}" type="button">
      <span class="pr-tab-ic">
        <img src="${f.img}" alt="" onerror="this.outerHTML='${f.icon}'">
      </span>
      <span class="pr-tab-txt">
        <span class="pr-tab-title">${esc(f.title)}</span>
        <span class="pr-tab-sub">${esc(f.sub)}</span>
      </span>
    </button>`).join('');
}

function renderSheet(){
  const f=FOLDERS.find(x=>x.id===_active)||FOLDERS[0];
  const rows=PROFILE[f.id]||[];
  const meta='раздел / '+f.title.toLowerCase();
  const signatures={
    anketa:'личное дело · карта № AH-Z-001',
    work:'послужной список · обновлено сегодня',
    bio:'выдержка из биографии · конфиденциально',
    habits:'наблюдения коллег · кабинет 4-12',
    people:'круг общения · по состоянию на текущий момент',
  };
  return `
    <div class="pr-sheet">
      <div class="pr-sheet-head">
        <h3 class="pr-sheet-h">${esc(f.title)}</h3>
        <span class="pr-sheet-meta">${esc(meta)}</span>
      </div>
      <dl class="pr-fields">
        ${rows.map(([k,v])=>`<div class="pr-row"><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}
      </dl>
      <div class="pr-sign">${esc(signatures[f.id]||'архив больницы Аксо')}</div>
    </div>`;
}

function render(){
  const host=document.getElementById('tab-profile');if(!host)return;
  host.innerHTML=`
    <div class="pr-wrap">
      <div class="pr-hdr">
        <div class="pr-hdr-pre">A K S O   H O S P I T A L   ·   КАРТА ВРАЧА</div>
        <h2>КАБИНЕТ ДОКТОРА ZAYNE</h2>
        <div class="pr-sub">Главный кардиохирург · отделение кардиохирургии</div>
        <div class="pr-stamp">АКСО<br><b>З</b><br>05·09</div>
      </div>
      <div class="pr-grid">
        <div class="pr-tabs">${renderTabs()}</div>
        <div class="pr-sheet-wrap">${renderSheet()}</div>
      </div>
    </div>`;
  host.querySelectorAll('.pr-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      _active=btn.dataset.prId;
      host.querySelectorAll('.pr-tab').forEach(b=>b.classList.toggle('on',b.dataset.prId===_active));
      const wrap=host.querySelector('.pr-sheet-wrap');
      if(wrap)wrap.innerHTML=renderSheet();
    });
  });
}


/* ──────────────  МОНТАЖ  ────────────── */

function injectStyle(){
  if(document.getElementById('pr-style'))return;
  const s=document.createElement('style');s.id='pr-style';s.textContent=css;document.head.appendChild(s);
}
function ensureNavBtn(){
  if(document.getElementById('pr-navbtn'))return;
  const menu=document.querySelector('.nav-menu');if(!menu)return;
  const dossier=Array.from(menu.querySelectorAll('button.nav-link')).find(b=>b.textContent.trim().toLowerCase().startsWith('досье'));
  const btn=document.createElement('button');
  btn.className='nav-link';btn.id='pr-navbtn';btn.textContent='О персонаже';
  btn.setAttribute('onclick',"navGo('profile',this)");
  if(dossier)menu.insertBefore(btn,dossier);else menu.appendChild(btn);
}
function ensureTabBtn(){
  if(document.getElementById('tbtn-profile'))return;
  const row=document.querySelector('.tabs-nav');if(!row)return;
  const b=document.createElement('button');
  b.className='tab-btn';b.id='tbtn-profile';b.style.display='none';
  b.setAttribute('onclick',"switchTab('profile',this)");
  row.appendChild(b);
}
function ensureTabPane(){
  if(document.getElementById('tab-profile'))return;
  const dossier=document.getElementById('tab-dossier');
  const wrap=document.createElement('div');
  wrap.className='tab-pane';wrap.id='tab-profile';
  if(dossier&&dossier.parentNode)dossier.parentNode.insertBefore(wrap,dossier);
  else (document.getElementById('site')||document.body).appendChild(wrap);
}
function patchNavGo(){
  const orig=window.navGo;if(!orig||orig.__profilePatched)return;
  window.navGo=function(section,navBtn){
    const r=orig.apply(this,arguments);
    if(section==='profile'){
      const tabsNav=document.querySelector('.tabs-nav');if(tabsNav)tabsNav.style.display='none';
    }
    return r;
  };
  window.navGo.__profilePatched=true;
}

function mount(){
  injectStyle();
  ensureTabBtn();
  ensureTabPane();
  ensureNavBtn();
  patchNavGo();
  render();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
else mount();
setTimeout(mount,400);setTimeout(mount,1400);

})();
