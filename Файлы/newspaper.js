/* ═══════════════════════════════════════════════════════════════════
   AKSO ARCHIVE · THE LINKON TIMES (газета Линкона)
   Отдельная вкладка со своим оформлением — НЕ зависит от сезонов.
   • Дневные заголовки + поисковые запросы Зейна (рандом по дате)
   • Архив всех карт Зейна (5★ и 4★), сгруппированный по годам
   ═══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ──────────────  ДАННЫЕ  ────────────── */

// каждая запись: [категория, заголовок (короткий), лид (развёрнутый)]
const HEADLINES=[
  // --- ПОГОДА И КРИО ---
  ['СНЕЖНЫЙ ФРОНТ','Северный фронт накроет город к выходным','Холодный фронт со стороны Сноуфилда сдвигается к юго-востоку. Линкон ждёт резкое похолодание — синоптики советуют достать тёплое.'],
  ['КРИО-РЕПОРТАЖ','Метель в Сноуфилде превысила норму','За сутки выпало 38 см снега. Школы перешли на сокращённый день, дороги — на специальный режим.'],
  ['МЕТЕО','Ветер, туман и осторожность','Завтра — пасмурно, северо-восточный ветер, к вечеру морозный туман. Берегите дыхательные пути.'],
  ['СЕВЕРНОЕ СИЯНИЕ','После полуночи — слабый авроральный отклик','Наблюдателям советуют выезжать в северные районы. Лучшее окно — между двумя и четырьмя часами.'],
  ['КЛИМАТ','Снежная линия сдвинулась к городу','Институт криогеографии зафиксировал самый ранний переход снежной линии за последние пять лет. Объяснения пока нет.'],
  ['ОЖИДАНИЕ','В Линкон возвращается аномально тёплая погода','Метеоцентр обещает потепление до плюс пяти на выходных. Возможна оттепель, потом снова мороз.'],

  // --- АКСО И МЕДИЦИНА ---
  ['СВОДКА АКСО','Хирург закрыл операционную в 04:12','По данным больницы, операция длилась шесть часов. Пациент в стабильном состоянии, имена сторон не разглашаются.'],
  ['НАУКА','Лаборатория Аксо приблизилась к новому открытию','Источник в Эвол-кардиолаборатории сообщил о неожиданном результате эксперимента. Подробности — после рецензирования.'],
  ['ОТЧЁТ ЛАБОРАТОРИИ','Регенерация миокарда: третий успешный цикл','Эвол-кардиолаборатория подтвердила третью успешную процедуру. Модель показала выживаемость выше 90%.'],
  ['ОБЪЯВЛЕНИЕ','Аксо ищет ночных дежурных кардиохирургов','Больница объявила набор. Резюме принимают до конца месяца, требования стандартные.'],
  ['МЕДИЦИНА','Сезонная вакцинация — последняя неделя','Кампания заканчивается в воскресенье. Районные поликлиники работают без выходных.'],
  ['ВОЛОНТЁРСТВО','«Котики Аксо» открыли новые часы','Пять пушистых волонтёров — для маленьких пациентов. Принимают со вторника, расписание у дежурной сестры.'],
  ['КОНФЕРЕНЦИЯ','«Линкон Кардио-2026» собрала три тысячи специалистов','На пленарных заседаниях — представители Аксо, Скайхэйвена и трёх международных школ. Главная тема года — Эвол-протоколы.'],
  ['СТАТИСТИКА','Аксо отчиталась о квартальной нагрузке','Плановые операции выросли на 6%, экстренные — снизились на 3%. Средний возраст пациента — 41 год.'],
  ['АНОНС','Кардиохирургическая конференция — на следующей неделе','Открытие — за главным врачом Аксо. Доступ для прессы — по аккредитации.'],

  // --- ПОДЗЕМКА / ЭВЕР ---
  ['ПОДЗЕМКА','На третьем уровне зафиксирована аномальная активность','Подразделение ЭВЕР отчиталось: пострадавших нет, периметр взят под контроль. Жителям соседних районов рекомендуют не паниковать.'],
  ['ЭВЕР','Учения в северном секторе прошли по плану','Подразделения отработали взаимодействие с эвакуационной службой. Цель — повышение готовности к чрезвычайным ситуациям.'],
  ['ПОДЗЕМКА','Карта уровней Подземки обновлена','Картографический отдел опубликовал актуальный план — добавлены два перехода, один помечен как закрытый.'],
  ['ЭВЕР','Открыт новый набор в специальный корпус','Минимальный возраст — 22 года, обязательный медосмотр в Аксо. Бонус — увеличенный отпуск и санаторий.'],
  ['ХРОНИКА','Спокойная неделя в Подземке','Сводок об аномалиях не поступало пять дней подряд. Эксперты осторожны — затишье часто предшествует всплеску.'],

  // --- ОБРАЗОВАНИЕ ---
  ['ОБРАЗОВАНИЕ','Скайхэйвен выпустила очередной поток медиков','Из стен Медицинской школы вышли 217 специалистов. Лучшие распределены в Аксо и в региональные центры.'],
  ['СКАЙХЭЙВЕН','Открыта новая лаборатория биоинженерии','Спонсор — частный фонд. Студенты получат доступ к оборудованию нового поколения с сентябрьского семестра.'],
  ['ОТКРЫТЫЙ ДЕНЬ','Скайхэйвен приглашает абитуриентов в субботу','Экскурсии по корпусам, встреча с приёмной комиссией, лекции преподавателей. Вход свободный, регистрация — на сайте.'],
  ['ГРАНТ','Лабораториям выделены новые средства','Объявлены пять победителей внутреннего конкурса. Среди них — две группы из Эвол-кардиолаборатории.'],

  // --- ФИНАНСЫ / ЭОНКОР (намёки на Валко) ---
  ['РЫНОК','Акции «ЭонКор Тек» снизились на 4,7%','По итогам торгов день закрыли в красной зоне. Аналитики ждут завтрашнего квартального отчёта.'],
  ['ЭОНКОР','Корпорация анонсировала новое подразделение','«ЭонКор Тек» объявил о запуске отдела перспективных исследований. Подробности — на пресс-конференции через две недели.'],
  ['СЛУХИ','У штаб-квартиры «ЭонКор» замечено движение','Несколько ночей подряд горит свет на верхних этажах. По неофициальным данным — готовится крупный анонс с новым лицом.'],
  ['ЭКОНОМИКА','Линкон-индекс закрылся в плюсе на 1,2%','Локомотивы недели — медтех и финансовый сектор. ЭонКор пока в минусе — рынок ждёт официального заявления.'],
  ['АНОНС','«ЭонКор» обещает раскрыть карты в начале июля','Пресс-служба корпорации не комментирует, но дата уже указана в годовом календаре инвесторов.'],
  ['СЛУХИ','Около «ЭонКор» замечена частная медицинская карета','Подробности неизвестны. Пресс-служба корпорации отказалась от комментариев — обычное молчание перед громким объявлением.'],

  // --- КУЛЬТУРА ---
  ['МУЗЫКА ГОРОДА','Концерт камерной классики собрал полный зал','В библиотеке Скайхэйвена сыграли программу Шопена. Один зритель ушёл, не дождавшись бис-номера — редакция не знает, кто это был.'],
  ['КУЛЬТУРА','Выставка ледяных скульптур открылась у Аксо','Главный экспонат — олень в натуральную величину. Прогноз обещает простоять до конца следующей недели.'],
  ['ПРЕМЬЕРА','В Линкон-театре — премьера осенней пьесы','Сценарий — современная переработка классики. Билеты распроданы на месяц вперёд.'],
  ['ГАЛЕРЕЯ','Выставка пейзажей Сноуфилда в Северной галерее','Художник работал над серией пять лет, снимая натуру при разной погоде. Открытие — в пятницу.'],
  ['КИНО','Документальный фильм о Подземке снимут к зиме','Авторы получили разрешение на съёмку в первых двух секторах. Финансирование — независимое.'],

  // --- ТРАНСПОРТ ---
  ['ТРАНСПОРТ','Метро Линкона переходит на ночной режим','Последний поезд отправляется в 01:30. Дневное расписание не меняется.'],
  ['АВТО','Центральные улицы закрыты для реконструкции','Работы продлятся до конца недели. Транспортная схема изменена, объездные маршруты — на электронных табло.'],
  ['АВТО','Спорткар недели — у северной парковки Аксо','Сине-серый купе третий день подряд занимает одно и то же место. Имя владельца редакция не разглашает.'],

  // --- СПОРТ ---
  ['СПОРТ','Зимний марафон Линкона установил новый рекорд','Весь подиум заняли бегуны из Сноуфилда. Главный приз — годовой абонемент на канатную дорогу.'],
  ['СПОРТ','Хоккейная команда взяла в состав двух новичков','Тренерский штаб делает ставку на молодёжь. Первый матч сезона — через две недели.'],
  ['СПОРТ','Скайхэйвен открыл студенческую лыжную трассу','Восемь километров перепада высот, инфраструктура построена за лето. Для студентов — бесплатно.'],

  // --- КРИМИНАЛ ---
  ['КРИМИНАЛ','Тихая ночь в Линконе: шесть вызовов','Все по мелочам. Полиция отчиталась о выходе в плановый режим патрулирования.'],
  ['ПОЛИЦИЯ','Найдена пропавшая собака с северной улицы','Хозяева ищут владельца уже неделю. Кличка — Аика, северная подпалая лайка.'],
  ['ОТДЕЛЬНО','Угнанный из Аксо электрокар вернули хозяйке','Машина простояла на парковке выходные. Камеры зафиксировали номер уже к вечеру.'],

  // --- АСТРОНОМИЯ ---
  ['КАЛЕНДАРЬ','Через неделю — суперлуние','Обсерватория Скайхэйвена приглашает на ночные сессии. Регистрация открыта, мест немного.'],
  ['АСТРОНОМИЯ','Метеорный поток будет виден лучше всего в среду','Подходящие условия — за городом, в районе Сноуфилда. Лучшее время — между тремя и пятью утра.'],

  // --- РАЗНОЕ ---
  ['ОБЪЯВЛЕНИЕ','Найдена связка ключей у северного выхода Аксо','Серебряный карабин, чёрный брелок. Спросить у дежурной по этажу.'],
  ['ИСТОРИЯ','Архив Линкона выложил новые материалы','Опубликованы фотографии первой больницы Аксо — снимки 1980-х годов. Доступ свободный.'],
  ['ЕДА','Открылась пекарня на углу Северной и Маркеса','Утром — шесть видов хлеба, после полудня — выпечка с какао. Цены умеренные.'],
  ['ТЕХНОЛОГИИ','В аэропорту Линкона ввели новую систему регистрации','Время прохождения сократилось вдвое. Очереди практически исчезли — кроме пиковых часов.'],
  ['ЗООПАРК','Городской зоопарк сообщает о пополнении','Северный сектор примет двух полярных лисят. Имена выбирают читатели через сайт.'],
];

const ZAYNE_SEARCHES=[
  'микрохирургия аортального клапана пошагово',
  'тёплое какао рецепт без сахара',
  'кашемировый шарф длинный тёмно-серый купить',
  'как мягко сказать пациентке что я волнуюсь',
  'декаф и гипотензивные взаимодействия',
  'расписание лекций Скайхэйвен осень 2026',
  'новые исследования протокор-синдром PubMed',
  'регенерация миокарда последние работы',
  'замена контактных линз по подписке Линкон',
  'как уговорить уйти с работы вовремя',
  'оптимальный сон хирурга после ночной смены',
  'кожаный блокнот A5 жёсткая обложка',
  'транспортировка донорских сердец стандарты',
  'статистика нагрузки операционной Аксо за год',
  'старый стетоскоп замена мембраны 4-го поколения',
  'тихий ресторан Линкон ужин до 22:00',
  'нейтрализация аномального протокора первая помощь',
  'как мягко отменить запланированный отпуск',
  'идеи подарка близкому человеку на день рождения',
  'ЭКГ норма у молодого взрослого',
  'когда можно поесть после 4-часовой операции',
  'снежный шар с оленем внутри купить',
  'правила перевозки криоконтейнера в самолёте',
  'школа классической гитары для занятых',
  'инструмент для резьбы по нефриту начинающим',
  'кашемировое одеяло двуспальное вес',
  'тёплая обувь зима 2026 ортопедическая',
  'почему я волнуюсь когда она опаздывает',
  'осенний концерт камерной музыки Линкон афиша',
  'дыхательная техника 4-7-8',
];

// Карты Зейна по годам и звёздам (даты в формате YYYY-MM-DD).
// Источник: loveanddeepspace.wiki.gg/wiki/Zayne_Memories (актуально на июнь 2026).
const ZAYNE_CARDS_5={
  2024:[
    ['2024-01-18','Cozy Afternoon','Xspace Echo · стартовая'],
    ['2024-01-18','Gentle Twilight','Xspace Echo · стартовая'],
    ['2024-01-18','Business Trip','Xspace Echo · стартовая'],
    ['2024-01-18','Promise Everlasting','Xspace Echo · стартовая'],
    ['2024-01-18','Forever Sealed','Xspace Echo · стартовая'],
    ['2024-02-05','Drunken Intimacy','Veiled Whispers'],
    ['2024-02-21','Medical Rescue','Before Dawn'],
    ['2024-03-11','Heart Within Reach','Lingering Gaze'],
    ['2024-04-30','Exclusive Tutorial','Double Kiss'],
    ['2024-06-07','Snowfall Embrace','Trace Of Divinity · Solar'],
    ['2024-06-07','Snowfall Encounter','Trace Of Divinity · Solar'],
    ['2024-06-25','Snowy Serenity','Entwined Shadows'],
    ['2024-08-07','Misty Invasion','Misty Invasion · ивент'],
    ['2024-09-07','Eternal Attachment','Destined Reunion'],
    ['2024-09-23','Moonlit Dream','Wander In Wonder'],
    ['2024-09-30','Frozen Nightfall','Chansia Journey'],
    ['2024-10-31','Heartstring Notes','Heartstring Notes'],
    ['2024-11-12','Fluffy Treatment','Yes, Cat Caretaker'],
    ['2024-12-18','Engraved Affection','Heartfelt Gift'],
    ['2024-12-31','Absolute Zeal','Nightly Rendezvous'],
  ],
  2025:[
    ['2025-02-10','Immediate Disorder',"Tomorrow's Catch-22"],
    ['2025-03-09','Everlasting Wish','Everlasting Wish'],
    ['2025-04-30','Fragrant Possession','Spring and Flowers'],
    ['2025-07-03','Iceborn Warmth','Witnessed By Deepspace'],
    ['2025-08-12','Runaway Waves','You And Midsummer'],
    ['2025-08-31','Dawnbreak Promise','Dawnbreak Promise'],
    ['2025-09-25',"Diviner's Stillness",'Edge Of Continuum · Solar'],
    ['2025-09-25',"Diviner's Hymn",'Edge Of Continuum · Solar'],
    ['2025-10-29','Chilling Crescendo','Heartbeats Ablaze'],
    ['2025-12-31',"Aeon's Canon",'Throne of Eros'],
  ],
  2026:[
    ['2026-01-23',"Secret's Kiss",'Secret\'s Kiss'],
    ['2026-02-10','Entwined Kites','Mortality\'s Tenderness'],
    ['2026-04-30','Silent Underflow','Lingering Lust'],
  ],
};

const ZAYNE_CARDS_4={
  2024:[
    ['2024-01-18','Fragmented Dreams','Xspace Echo · стартовая'],
    ['2024-01-18','Delicacy','Xspace Echo · стартовая'],
    ['2024-01-18','Secret Fairytale','Xspace Echo · стартовая'],
    ['2024-01-18','Thoughtful Words','Xspace Echo · стартовая'],
    ['2024-01-18','Fleeting Sweetness','Xspace Echo · стартовая'],
    ['2024-01-18','Beginning','Xspace Echo · стартовая'],
    ['2024-01-18','A Long Night','Xspace Echo · стартовая'],
    ['2024-01-18','Destiny','Xspace Echo · стартовая'],
    ['2024-01-18','Everlasting Snowdrop','Xspace Echo · стартовая'],
    ['2024-01-18','Glittering Lights','Xspace Echo · стартовая'],
    ['2024-01-18','Ramblings Come True','Xspace Echo · стартовая'],
    ['2024-01-18','Sweet Conspiracy','Xspace Echo · стартовая'],
    ['2024-01-18','Surprise Encounter','Xspace Echo · стартовая'],
    ['2024-01-18','Lingering Warmth','Oracle of Stars · Heartbeat Ripples'],
    ['2024-02-05',"Dawn's Shadows",'10 Days With You'],
    ['2024-02-21','End Of Depths','Oracle of Stars · Traversing Deepspace'],
    ['2024-05-14','Heartstring Healer','Promise Season 3'],
    ['2024-06-07',"Forest's Slumber",'Master of Fate Rehearsal · Solar'],
    ['2024-06-07',"Forest's Breeze",'Bamboo Divination · Solar'],
    ['2024-08-23','Doomsday','10 Days With You'],
    ['2024-09-14','Dream Revisited','Promise Season 5'],
    ['2024-12-31','Silent Poem','Fondness Treasure'],
    ['2024-12-31','Stacked Pulses','Tour Shop'],
  ],
  2025:[
    ['2025-01-10','Steamy Proximity','Promise Season 7'],
    ['2025-01-22','Cherished Longing','Fortune Grocery'],
    ['2025-06-24','5th Intercostal Space','10 Days With You'],
    ['2025-07-03','Morning Drift','Promise Season 10'],
    ['2025-09-25',"Finale's Ache",'God of Annihilation Rehearsal · Solar'],
    ['2025-09-25',"Finale's Perpetuity",'Realm Everlost · Solar'],
    ['2025-10-29','Holding Autumn','Promise Season 12'],
    ['2025-12-31','Frost Salvation','Illusia Locus · ивент'],
  ],
  2026:[
    ['2026-03-01','Chasing Silhouettes','Promise Season 14'],
    ['2026-05-10','Blooming Hour','10 Days With You'],
  ],
};


/* ──────────────  CSS  ──────────────
   Свой dark-newsprint палитра, независимая от сезонов.
   !important чтобы перебить theme-weather. */

const css=`
/* контейнер вкладки полностью самостоятельный */
#tab-newspaper{padding:30px 0 70px;}
.nws{
  --nws-bg:#0d0c14;
  --nws-bg2:#100f1a;
  --nws-paper:#e8dfca;
  --nws-text:#d9cfb6;
  --nws-text-dim:#a89e89;
  --nws-amber:#c9a062;
  --nws-amber-soft:#a4825a;
  --nws-ribbon:#9c3a3a;
  --nws-line:rgba(232,223,202,.18);
  --nws-line-soft:rgba(232,223,202,.08);

  position:relative;color:var(--nws-text);
  background:
    repeating-linear-gradient(0deg,var(--nws-line-soft) 0 1px,transparent 1px 4px),
    linear-gradient(180deg,var(--nws-bg) 0%,var(--nws-bg2) 100%);
  padding:30px 28px 34px;border:1px solid var(--nws-line);
  box-shadow:0 0 40px rgba(0,0,0,.5) inset, 0 8px 22px rgba(0,0,0,.35);
  font-family:'Cormorant Garamond',Georgia,serif;font-size:1.02rem;line-height:1.55;
}
.nws::before,.nws::after{
  content:'';position:absolute;left:14px;right:14px;height:1px;background:var(--nws-amber-soft);opacity:.7;}
.nws::before{top:10px;}.nws::after{bottom:10px;}

/* ── шапка ── */
.nws-masthead{text-align:center;border-bottom:3px double var(--nws-amber-soft);padding:0 0 18px;margin-bottom:18px;}
.nws-pre{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.4em;color:var(--nws-amber);margin-bottom:8px;}
.nws-title{font-family:'Audiowide',sans-serif;font-size:clamp(1.8rem,5vw,3.2rem);letter-spacing:.14em;color:var(--nws-paper);line-height:1;margin:0;}
.nws-title em{font-style:normal;color:var(--nws-amber);}
.nws-meta{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.18em;color:var(--nws-text-dim);text-transform:uppercase;}
.nws-meta span+span{}

/* ── лента «главная новость» ── */
.nws-lead{padding:18px 4px;border-top:1px solid var(--nws-line);border-bottom:1px solid var(--nws-line);margin-bottom:22px;}
.nws-kicker{display:inline-block;background:var(--nws-ribbon);color:#f4ecdc;padding:3px 10px;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;margin-bottom:10px;}
.nws-headline{font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.4rem,3.2vw,2.1rem);line-height:1.18;color:var(--nws-paper);margin:0 0 10px;font-weight:700;letter-spacing:.005em;}
.nws-lede{font-style:italic;color:var(--nws-text);font-size:1.05rem;}

/* ── свернутые секции ── */
.nws-sect{border-top:1px solid var(--nws-line);margin-top:6px;}
.nws-sect summary{list-style:none;cursor:pointer;padding:14px 6px;display:flex;align-items:center;gap:14px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--nws-amber);transition:color .2s;}
.nws-sect summary:hover{color:var(--nws-paper);}
.nws-sect summary::-webkit-details-marker{display:none;}
.nws-sect summary::before{content:'▸';font-size:.8rem;color:var(--nws-amber);transition:transform .25s;display:inline-block;}
.nws-sect[open] summary::before{transform:rotate(90deg);}
.nws-sect summary .nws-rule{flex:1;height:1px;background:var(--nws-amber-soft);opacity:.5;}
.nws-sect-body{padding:6px 6px 22px;}

/* колонки новостей */
.nws-chronicle{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;}
.nws-news{border-left:2px solid var(--nws-amber-soft);padding:2px 0 2px 14px;}
.nws-news h4{font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;color:var(--nws-paper);margin:0 0 5px;font-weight:700;line-height:1.2;}
.nws-news p{margin:0;font-size:.95rem;color:var(--nws-text);}

/* поисковые запросы */
.nws-search-box{background:rgba(0,0,0,.25);border:1px dashed var(--nws-line);padding:14px 16px;}
.nws-search-label{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.22em;text-transform:uppercase;color:var(--nws-text-dim);margin-bottom:10px;}
.nws-search-q{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--nws-paper);padding:5px 0;border-bottom:1px dotted var(--nws-line);display:flex;gap:10px;}
.nws-search-q:last-child{border:none;}
.nws-search-q::before{content:'⌕';color:var(--nws-amber);flex-shrink:0;}

/* архив карт */
.nws-archive-yr{margin-bottom:16px;}
.nws-yr-head{display:flex;align-items:baseline;gap:14px;font-family:'Audiowide',sans-serif;font-size:1.6rem;color:var(--nws-amber);margin:0 0 8px;letter-spacing:.06em;}
.nws-yr-head .cnt{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;color:var(--nws-text-dim);}
.nws-card-row{display:grid;grid-template-columns:80px 1fr 1fr;gap:8px 14px;padding:6px 0;border-bottom:1px dotted var(--nws-line-soft);font-size:.92rem;align-items:baseline;}
.nws-card-row:last-child{border:none;}
.nws-card-date{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--nws-text-dim);letter-spacing:.06em;}
.nws-card-name{color:var(--nws-paper);font-style:italic;}
.nws-card-banner{font-size:.78rem;color:var(--nws-text-dim);}
@media(max-width:640px){
  .nws-card-row{grid-template-columns:64px 1fr;}
  .nws-card-banner{grid-column:1/-1;padding-left:64px;}
}

/* факты */
.nws-facts-group{margin-bottom:18px;}
.nws-fg-h{font-family:'Audiowide',sans-serif;font-size:1.2rem;color:var(--nws-amber);letter-spacing:.08em;margin:0 0 8px;}
.nws-fact{display:grid;grid-template-columns:160px 1fr;gap:8px 16px;padding:5px 0;border-bottom:1px dotted var(--nws-line-soft);font-size:.94rem;}
.nws-fact:last-child{border:none;}
.nws-fact dt{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--nws-text-dim);padding-top:3px;}
.nws-fact dd{margin:0;color:var(--nws-text);}
@media(max-width:640px){
  .nws-fact{grid-template-columns:1fr;gap:2px;}
  .nws-fact dt{font-size:.52rem;}
}

/* итог */
.nws-foot{margin-top:24px;padding-top:14px;border-top:1px solid var(--nws-line);text-align:center;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.3em;color:var(--nws-text-dim);text-transform:uppercase;}
.nws-read-btn{display:inline-block;padding:9px 18px;background:rgba(0,0,0,.3);border:1px solid var(--nws-amber-soft);
  color:var(--nws-paper);font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.22em;
  text-transform:uppercase;cursor:pointer;transition:background .2s,border-color .2s,color .2s;}
.nws-read-btn:hover{background:color-mix(in srgb,var(--nws-amber) 16%,rgba(0,0,0,.3));border-color:var(--nws-amber);color:var(--nws-paper);}
.nws-read-mark{display:inline-block;padding:9px 18px;border:1px dashed color-mix(in srgb,var(--nws-amber) 50%,transparent);
  color:var(--nws-amber);font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;}
.nws-foot-tag{margin-top:10px;font-size:.5rem;}
`;


/* ──────────────  УТИЛИТЫ  ────────────── */

/* ────────  УТИЛИТЫ  ──────── */

// ISO-номер недели: понедельник как день 1
function isoWeek(d){
  const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const day=t.getUTCDay()||7;
  t.setUTCDate(t.getUTCDate()+4-day);
  const yStart=new Date(Date.UTC(t.getUTCFullYear(),0,1));
  return {week:Math.ceil(((t-yStart)/864e5+1)/7), year:t.getUTCFullYear()};
}
// диапазон недели: понедельник — воскресенье
function weekRange(d){
  const day=d.getDay()||7;
  const mon=new Date(d);mon.setDate(d.getDate()-(day-1));
  const sun=new Date(mon);sun.setDate(mon.getDate()+6);
  return [mon,sun];
}
// seed одной недели — стабильный pseudo-rng
function seedFromWeek(d){
  const w=isoWeek(d);
  let x=(w.year*100+w.week)*9301+49297;x%=233280;
  return ()=>{x=(x*9301+49297)%233280;return x/233280;};
}
function seedFromDate(d){return seedFromWeek(d);} // legacy alias
function pickN(arr,n,rng){
  const a=arr.slice();
  const out=[];
  while(out.length<n&&a.length){
    const i=Math.floor(rng()*a.length);
    out.push(a.splice(i,1)[0]);
  }
  return out;
}
function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]);}


/* ──────────────  РЕНДЕР  ────────────── */

function render(){
  const host=document.getElementById('tab-newspaper');if(!host)return;
  const d=new Date();
  const rng=seedFromDate(d);

  // дневная подборка
  const lead=HEADLINES[Math.floor(rng()*HEADLINES.length)];
  const chronicle=pickN(HEADLINES.filter(h=>h!==lead),5,rng);
  const searches=pickN(ZAYNE_SEARCHES,6,rng);

  const [mon,sun]=weekRange(d);
  const w=isoWeek(d);
  const sameMonth=mon.getMonth()===sun.getMonth();
  const fmt=(x,opt)=>x.toLocaleDateString('ru-RU',opt);
  const dateStr=sameMonth
    ? `${mon.getDate()}–${sun.getDate()} ${fmt(sun,{month:'long',year:'numeric'})}`
    : `${fmt(mon,{day:'numeric',month:'long'})} — ${fmt(sun,{day:'numeric',month:'long',year:'numeric'})}`;
  const issueNo='№ '+String(w.week).padStart(2,'0')+' · '+w.year;
  const weekKey=`${w.year}-W${String(w.week).padStart(2,'0')}`;
  const isRead=Array.isArray((window.DS||{}).newspaperReads)&&window.DS.newspaperReads.includes(weekKey);

  // архив карт по годам
  const archiveHTML=(rarity,dict)=>{
    const years=Object.keys(dict).sort((a,b)=>b-a);
    return years.map(yr=>{
      const items=dict[yr];
      return `<div class="nws-archive-yr">
        <h4 class="nws-yr-head">${yr}<span class="cnt">${rarity} · ${items.length} карт</span></h4>
        ${items.map(([dt,name,banner])=>`
          <div class="nws-card-row">
            <div class="nws-card-date">${dt.slice(8,10)}.${dt.slice(5,7)}</div>
            <div class="nws-card-name">${esc(name)}</div>
            <div class="nws-card-banner">${esc(banner)}</div>
          </div>`).join('')}
      </div>`;
    }).join('');
  };

  host.innerHTML=`
    <div class="nws">
      <div class="nws-masthead">
        <div class="nws-pre">L · I · N · K · O · N · C · I · T · Y</div>
        <h1 class="nws-title">THE LINKON <em>TIMES</em></h1>
        <div class="nws-meta">
          <span>Неделя · ${esc(dateStr)}</span>
          <span>Выпуск ${esc(issueNo)}</span>
          <span>Цена · бесплатно</span>
        </div>
      </div>

      <div class="nws-lead">
        <span class="nws-kicker">${esc(lead[0])}</span>
        <h2 class="nws-headline">${esc(lead[1])}</h2>
        <p class="nws-lede">${esc(lead[2])}</p>
      </div>

      <details class="nws-sect" open>
        <summary>Хроника Линкона <span class="nws-rule"></span></summary>
        <div class="nws-sect-body">
          <div class="nws-chronicle">
            ${chronicle.map(([k,h,t])=>`<div class="nws-news"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
          </div>
        </div>
      </details>

      <details class="nws-sect" open>
        <summary>Запросы доктора · сегодня <span class="nws-rule"></span></summary>
        <div class="nws-sect-body">
          <div class="nws-search-box">
            <div class="nws-search-label">// История поиска Dr. Zayne · ${esc(dateStr)}</div>
            ${searches.map(q=>`<div class="nws-search-q">${esc(q)}</div>`).join('')}
          </div>
        </div>
      </details>

      <details class="nws-sect">
        <summary>Архив воспоминаний · 5★ <span class="nws-rule"></span></summary>
        <div class="nws-sect-body">${archiveHTML('5★',ZAYNE_CARDS_5)}</div>
      </details>

      <details class="nws-sect">
        <summary>Архив воспоминаний · 4★ <span class="nws-rule"></span></summary>
        <div class="nws-sect-body">${archiveHTML('4★',ZAYNE_CARDS_4)}</div>
      </details>


      <div class="nws-foot">
        ${isRead
          ? '<span class="nws-read-mark">✓ выпуск прочитан · отметка стоит</span>'
          : `<button class="nws-read-btn" type="button" onclick="window.__nwsMarkRead&&window.__nwsMarkRead('${weekKey}')">Прочитано · поставить отметку</button>`}
        <div class="nws-foot-tag">— The Linkon Times · собрано для Архива Аксо —</div>
      </div>
    </div>`;
}


/* ──────────────  МОНТАЖ  ────────────── */

function injectStyle(){
  if(document.getElementById('nws-style'))return;
  const s=document.createElement('style');s.id='nws-style';s.textContent=css;document.head.appendChild(s);
}

function ensureNavButton(){
  // добавляем кнопку «Газета» в верхнее меню после «Карточки»
  if(document.getElementById('nws-navbtn'))return;
  const menu=document.querySelector('.nav-menu');if(!menu)return;
  const cardsBtn=Array.from(menu.querySelectorAll('button.nav-link')).find(b=>b.textContent.trim().toLowerCase().includes('карточк'));
  const btn=document.createElement('button');
  btn.className='nav-link';btn.id='nws-navbtn';btn.textContent='Газета';
  btn.setAttribute('onclick',"navGo('newspaper',this)");
  if(cardsBtn&&cardsBtn.nextSibling)menu.insertBefore(btn,cardsBtn.nextSibling);else menu.appendChild(btn);
}

function ensureTabBtn(){
  // скрытая tab-btn чтобы switchTab её нашёл
  if(document.getElementById('tbtn-newspaper'))return;
  const row=document.querySelector('.tabs-nav');if(!row)return;
  const b=document.createElement('button');
  b.className='tab-btn';b.id='tbtn-newspaper';b.style.display='none';
  b.setAttribute('onclick',"switchTab('newspaper',this)");
  row.appendChild(b);
}

function ensureTabPane(){
  if(document.getElementById('tab-newspaper'))return;
  // вставим перед #tab-dossier
  const dossier=document.getElementById('tab-dossier');
  const wrap=document.createElement('div');
  wrap.className='tab-pane';wrap.id='tab-newspaper';
  if(dossier&&dossier.parentNode)dossier.parentNode.insertBefore(wrap,dossier);
  else{
    // фолбэк — приклеить в site-container
    const site=document.getElementById('site')||document.body;
    site.appendChild(wrap);
  }
}

function patchNavGoForNewspaper(){
  // navGo вычисляет, прятать ли tabs-nav, по списку 'myths/wu/dossier'.
  // Добавим в этот список 'newspaper' через переопределение.
  const orig=window.navGo;
  if(!orig||orig.__patched)return;
  window.navGo=function(section,navBtn){
    const r=orig.apply(this,arguments);
    if(section==='newspaper'){
      const tabsNav=document.querySelector('.tabs-nav');if(tabsNav)tabsNav.style.display='none';
    }
    return r;
  };
  window.navGo.__patched=true;
}

function mount(){
  injectStyle();
  ensureTabBtn();
  ensureTabPane();
  ensureNavButton();
  patchNavGoForNewspaper();
  render();
}

// сохранить недельную отметку в досье + проверить ачивку
window.__nwsMarkRead=function(weekKey){
  if(!window.DS)return;
  if(!Array.isArray(window.DS.newspaperReads))window.DS.newspaperReads=[];
  if(window.DS.newspaperReads.includes(weekKey))return;
  window.DS.newspaperReads.push(weekKey);
  if(typeof window.dsSave==='function')window.dsSave();
  if(window.DS.newspaperReads.length>=10 && typeof window.dsUnlock==='function')window.dsUnlock('news10');
  render();
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
else mount();
// повторные мойнты на случай поздней инициализации nav
setTimeout(mount,400);setTimeout(mount,1400);

})();
