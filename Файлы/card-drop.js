/* ════════════════════════════════════════════════════════════
   CARD DROP NOTIFICATION · Holding Autumn
   Отдельный модуль уведомления о новой карте (осенние вайбы).
   Правится здесь, не трогая index.html.
   ════════════════════════════════════════════════════════════ */
(function(){
  // ─── Настройки уведомления ───────────────────────────────
  const CARD = {
    title:   'Holding Autumn',
    sub:     'Боевой Пропуск · 4★',
    status:  'доступна',                       // статус карты
    image:   './Файлы/holding_autumn.jpg',        // картинка карты
    link:    'https://teletype.in/@snowfox_lnd/holdingautumn',
    headline:'Вышла новая карта!',
    showOncePerDay: true,                          // не спамить каждый заход
    delayMs: 1400                                  // задержка после входа
  };

  // ─── Стили ───────────────────────────────────────────────
  const css = `
  #cardDrop{position:fixed;top:84px;right:-460px;z-index:140;width:min(380px,92vw);
    background:linear-gradient(160deg,rgba(38,20,12,.97),rgba(24,14,10,.97));
    border:1px solid rgba(214,150,90,.45);
    box-shadow:0 20px 55px rgba(0,0,0,.6),0 0 40px rgba(214,120,60,.15);
    overflow:hidden;transition:right .7s cubic-bezier(.2,.85,.25,1);font-family:'Raleway',sans-serif;}
  #cardDrop.on{right:22px;}
  #cardDrop .cd-glow{position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(120% 80% at 80% 0%,rgba(255,170,80,.18),transparent 60%);}
  #cardDrop .cd-img{position:relative;height:150px;overflow:hidden;}
  #cardDrop .cd-img img{width:100%;height:100%;object-fit:cover;object-position:center 28%;
    transform:scale(1.05);transition:transform 6s ease;}
  #cardDrop.on .cd-img img{transform:scale(1.16);}
  #cardDrop .cd-img::after{content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 40%,rgba(24,14,10,.65) 80%,rgba(24,14,10,.97) 100%);}
  #cardDrop .cd-badge{position:absolute;top:12px;left:12px;z-index:2;
    font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;
    color:#ffe2b0;background:rgba(40,20,10,.7);border:1px solid rgba(214,150,90,.5);padding:6px 12px;}
  #cardDrop .cd-status{position:absolute;top:12px;right:12px;z-index:2;display:flex;align-items:center;gap:6px;
    font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;
    color:#ffce9a;background:rgba(40,20,10,.7);border:1px solid rgba(214,150,90,.4);padding:6px 10px;}
  #cardDrop .cd-status .dot{width:6px;height:6px;border-radius:50%;background:#ffb056;
    box-shadow:0 0 8px #ffb056;animation:cdPulse 1.4s ease-in-out infinite;}
  @keyframes cdPulse{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
  #cardDrop .cd-body{position:relative;padding:14px 18px 18px;z-index:2;}
  #cardDrop .cd-headline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.4rem;
    color:#ffd9a8;margin-bottom:2px;text-shadow:0 0 24px rgba(255,170,80,.3);}
  #cardDrop .cd-title{font-family:'Orbitron',monospace;font-weight:700;font-size:.9rem;letter-spacing:.05em;color:#fff3e2;}
  #cardDrop .cd-sub{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;
    color:#c79a72;margin-top:5px;}
  #cardDrop .cd-x{position:absolute;top:10px;right:10px;z-index:5;width:28px;height:28px;border-radius:50%;
    border:1px solid rgba(214,150,90,.5);background:rgba(24,14,10,.9);color:#ffce9a;font-size:.85rem;cursor:pointer;
    line-height:1;display:flex;align-items:center;justify-content:center;transition:.3s;}
    #cardDrop .cd-x:hover{color:#fff3e2;border-color:#fff3e2;transform:scale(1.1);}
  /* falling leaves inside the banner */
  #cardDrop .cd-leaf{position:absolute;top:-16px;z-index:2;font-size:.9rem;pointer-events:none;opacity:.85;
    animation:cdFall linear forwards;}
  @keyframes cdFall{to{transform:translateY(190px) rotate(360deg);opacity:0;}}
  @media(max-width:640px){
    /* перенос баннера ВНИЗ экрана + компактный вид (раньше перекрывал контент сверху) */
    #cardDrop{top:auto;bottom:-440px;right:50%;transform:translateX(50%);width:min(340px,88vw);}
    #cardDrop.on{bottom:18px;right:50%;transform:translateX(50%);}
    #cardDrop .cd-img{height:100px;}
    #cardDrop .cd-img img{object-position:center 22%;}
    #cardDrop .cd-body{padding:10px 14px 14px;}
    #cardDrop .cd-title{font-size:1rem!important;}
    #cardDrop .cd-headline{font-size:.78rem!important;}
    #cardDrop .cd-sub{font-size:.65rem!important;margin-top:3px!important;}
    #cardDrop .cd-x{top:8px;right:8px;width:26px;height:26px;}
    #cardDrop .cd-badge,#cardDrop .cd-status{font-size:.5rem!important;}
  }
  `;
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);

  // ─── Разметка ────────────────────────────────────────────
  function build(){
    const el=document.createElement('div');el.id='cardDrop';
    el.innerHTML=`
      <button class="cd-x" title="Закрыть">✕</button>
      <div class="cd-glow"></div>
      <div class="cd-img">
        <span class="cd-badge">${CARD.sub}</span>
        <span class="cd-status"><span class="dot"></span>${CARD.status}</span>
        <img src="${CARD.image}" alt="${CARD.title}" onerror="this.style.display='none'">
      </div>
      <div class="cd-body">
        <div class="cd-headline">${CARD.headline}</div>
        <div class="cd-title">${CARD.title}</div>
        <div class="cd-sub">статус: ${CARD.status}</div>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('.cd-x').onclick=hide;
    // клик по баннеру -> на вкладку Карточки
    el.querySelector('.cd-img').style.cursor='pointer';
    el.querySelector('.cd-img').onclick=()=>{if(CARD.link)window.open(CARD.link,'_blank');};
    return el;
  }

  function leaves(el){
    const glyphs=['🍁','🍂','🍁'];
    for(let i=0;i<7;i++){
      const lf=document.createElement('span');lf.className='cd-leaf';lf.textContent=glyphs[i%glyphs.length];
      lf.style.left=(8+Math.random()*84)+'%';
      lf.style.animationDuration=(3.5+Math.random()*2.5)+'s';
      lf.style.animationDelay=(Math.random()*2)+'s';
      el.appendChild(lf);
      setTimeout(()=>lf.remove(),7000);
    }
  }

  let elRef=null,hideTimer=null;
  function show(){
    if(elRef)return;
    elRef=build();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{elRef.classList.add('on');leaves(elRef.querySelector('.cd-img'));}));
    // авто-сворачивание: показать крестик и оставить висеть, не закрывать насильно
    
  }
  function hide(){
    if(!elRef)return;
    elRef.classList.remove('on');
    setTimeout(()=>{if(elRef){elRef.remove();elRef=null;}},700);
  }

  function maybeShow(){
    if(CARD.showOncePerDay){
      const key='akso_carddrop_'+CARD.title;
      const today=new Date().toDateString();
      let seen=null;try{seen=localStorage.getItem(key);}catch(e){}
      if(seen===today)return;
      try{localStorage.setItem(key,today);}catch(e){}
    }
    setTimeout(show,CARD.delayMs);
  }

  // ─── Запуск: после входа в архив ─────────────────────────
  const _enter=window.enterSite;
  window.enterSite=function(){
    if(typeof _enter==='function')_enter();
    maybeShow();
  };
  // если уже внутри сайта (перезагрузка на месте)
  const site=document.getElementById('site');
  if(site&&site.classList.contains('vis'))maybeShow();
})();
