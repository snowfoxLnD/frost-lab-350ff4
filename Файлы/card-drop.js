/* ════════════════════════════════════════════════════════════
   CARD DROP NOTIFICATION · Silent Underflow
   Уведомление о новой карте. Дождь/лёд вместо осенних листьев.
   Правится здесь, не трогая index.html.
   ════════════════════════════════════════════════════════════ */
(function(){
  // ─── Настройки уведомления ───────────────────────────────
  const CARD = {
    title:   'Silent Underflow',
    sub:     'Мультибаннер · 5★',
    status:  'доступна',
    image:   './Файлы/Silent Underflow/cover.png',
    link:    'https://teletype.in/@snowfox_lnd/silentunderflow',
    headline:'Вышла новая карта!',
    showOncePerDay: true,
    delayMs: 1400
  };

  // ─── Стили ───────────────────────────────────────────────
  const css = `
  #cardDrop{position:fixed;top:84px;right:-460px;z-index:140;width:min(380px,92vw);
    background:linear-gradient(160deg,rgba(10,22,38,.97),rgba(8,14,26,.97));
    border:1px solid rgba(120,170,214,.45);
    box-shadow:0 20px 55px rgba(0,0,0,.6),0 0 40px rgba(80,150,220,.18);
    overflow:hidden;transition:right .7s cubic-bezier(.2,.85,.25,1);font-family:'Raleway',sans-serif;}
  #cardDrop.on{right:22px;}
  #cardDrop .cd-glow{position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(120% 80% at 80% 0%,rgba(120,180,255,.20),transparent 60%);}
  #cardDrop .cd-img{position:relative;height:150px;overflow:hidden;}
  #cardDrop .cd-img img{width:100%;height:100%;object-fit:cover;object-position:center 22%;
    transform:scale(1.05);transition:transform 6s ease;}
  #cardDrop.on .cd-img img{transform:scale(1.16);}
  #cardDrop .cd-img::after{content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 40%,rgba(8,14,26,.65) 80%,rgba(8,14,26,.97) 100%);}
  #cardDrop .cd-badge{position:absolute;top:12px;left:12px;z-index:2;
    font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;
    color:#cfe6ff;background:rgba(10,20,40,.7);border:1px solid rgba(120,170,214,.5);padding:6px 12px;}
  #cardDrop .cd-status{position:absolute;top:12px;right:12px;z-index:2;display:flex;align-items:center;gap:6px;
    font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.16em;text-transform:uppercase;
    color:#a8d8f0;background:rgba(10,20,40,.7);border:1px solid rgba(120,170,214,.4);padding:6px 10px;}
  #cardDrop .cd-status .dot{width:6px;height:6px;border-radius:50%;background:#56b0ff;
    box-shadow:0 0 8px #56b0ff;animation:cdPulse 1.4s ease-in-out infinite;}
  @keyframes cdPulse{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
  #cardDrop .cd-body{position:relative;padding:14px 18px 18px;z-index:2;}
  #cardDrop .cd-headline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.4rem;
    color:#bfe0ff;margin-bottom:2px;text-shadow:0 0 24px rgba(120,180,255,.35);}
  #cardDrop .cd-title{font-family:'Orbitron',monospace;font-weight:700;font-size:.9rem;letter-spacing:.05em;color:#eef6ff;}
  #cardDrop .cd-sub{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.18em;text-transform:uppercase;
    color:#72a0c7;margin-top:5px;}
  #cardDrop .cd-x{position:absolute;top:10px;right:10px;z-index:5;width:28px;height:28px;border-radius:50%;
    border:1px solid rgba(120,170,214,.5);background:rgba(8,14,26,.9);color:#a8d8f0;font-size:.85rem;cursor:pointer;
    line-height:1;display:flex;align-items:center;justify-content:center;transition:.3s;}
    #cardDrop .cd-x:hover{color:#eef6ff;border-color:#eef6ff;transform:scale(1.1);}
  /* капли дождя внутри баннера */
  #cardDrop .cd-rain{position:absolute;top:-12px;z-index:2;width:1px;height:14px;pointer-events:none;
    background:linear-gradient(180deg,transparent,rgba(170,216,240,.85));
    animation:cdRain linear forwards;}
  @keyframes cdRain{to{transform:translateY(200px);opacity:0;}}
  @media(max-width:640px){
    #cardDrop{top:auto;bottom:-440px;right:50%;transform:translateX(50%);width:min(340px,88vw);}
    #cardDrop.on{bottom:18px;right:50%;transform:translateX(50%);}
    #cardDrop .cd-img{height:100px;}
    #cardDrop .cd-img img{object-position:center 18%;}
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
    el.querySelector('.cd-img').style.cursor='pointer';
    el.querySelector('.cd-img').onclick=()=>{if(CARD.link)window.open(CARD.link,'_blank');};
    return el;
  }

  function rain(el){
    for(let i=0;i<16;i++){
      const dr=document.createElement('span');dr.className='cd-rain';
      dr.style.left=(Math.random()*100)+'%';
      dr.style.animationDuration=(.5+Math.random()*.7)+'s';
      dr.style.animationDelay=(Math.random()*2)+'s';
      el.appendChild(dr);
      setTimeout(()=>dr.remove(),9000);
    }
  }

  let elRef=null;
  function show(){
    if(elRef)return;
    elRef=build();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{elRef.classList.add('on');rain(elRef.querySelector('.cd-img'));}));
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
  const site=document.getElementById('site');
  if(site&&site.classList.contains('vis'))maybeShow();
})();
