/* =========================================================
   ОГЭ БЕЗ ПАНИКИ — логика тренажёра
   ========================================================= */

/* ---------- Бара: три состояния в SVG ---------- */
const CAPY = {
  neutral: `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="46" ry="34" fill="#C19A6B" stroke="#8B6B43" stroke-width="3"/>
    <ellipse cx="27" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="93" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="60" cy="86" rx="26" ry="16" fill="#D8B68B" stroke="#8B6B43" stroke-width="2"/>
    <path d="M40 62 h14" stroke="#4A3620" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M66 62 h14" stroke="#4A3620" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="53" cy="84" r="2.6" fill="#4A3620"/>
    <circle cx="67" cy="84" r="2.6" fill="#4A3620"/>
    <path d="M54 92 Q60 95 66 92" stroke="#4A3620" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </svg>`,
  happy: `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="46" ry="34" fill="#C19A6B" stroke="#8B6B43" stroke-width="3"/>
    <ellipse cx="27" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="93" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="60" cy="86" rx="26" ry="16" fill="#D8B68B" stroke="#8B6B43" stroke-width="2"/>
    <path d="M38 60 Q47 53 56 60" stroke="#4A3620" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M64 60 Q73 53 82 60" stroke="#4A3620" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cx="53" cy="84" r="2.6" fill="#4A3620"/>
    <circle cx="67" cy="84" r="2.6" fill="#4A3620"/>
    <path d="M50 91 Q60 99 70 91" stroke="#4A3620" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M16 30 L21 37 M104 30 L99 37" stroke="#FFC857" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`,
  oops: `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="46" ry="34" fill="#C19A6B" stroke="#8B6B43" stroke-width="3"/>
    <ellipse cx="27" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="93" cy="42" rx="9" ry="7" fill="#8B6B43"/>
    <ellipse cx="60" cy="86" rx="26" ry="16" fill="#D8B68B" stroke="#8B6B43" stroke-width="2"/>
    <circle cx="47" cy="61" r="8" fill="#fff" stroke="#4A3620" stroke-width="2.4"/>
    <circle cx="73" cy="61" r="8" fill="#fff" stroke="#4A3620" stroke-width="2.4"/>
    <circle cx="47" cy="62" r="3.2" fill="#4A3620"/>
    <circle cx="73" cy="62" r="3.2" fill="#4A3620"/>
    <circle cx="53" cy="84" r="2.6" fill="#4A3620"/>
    <circle cx="67" cy="84" r="2.6" fill="#4A3620"/>
    <ellipse cx="60" cy="94" rx="5" ry="6" fill="#4A3620"/>
  </svg>`
};

function setMascot(elm, state){
  elm.innerHTML = CAPY[state];
  elm.classList.remove('mascot-pop');
  void elm.offsetWidth;
  elm.classList.add('mascot-pop');
}

/* ---------- Сообщения ---------- */
const RIGHT_MESSAGES = [
  "Вот. Мозг всё-таки не зря сегодня пришёл.",
  "Красиво. Даже подозрительно.",
  "Есть. Без жертв и потерь.",
  "Математика сегодня решила нас не добивать.",
  "Так и запишем: это было правильно.",
  "+1 к шансу спокойно пережить ОГЭ.",
  "Бара одобряет. А она редко ошибается."
];
const WRONG_FIRST_MESSAGES = [
  "Так. Интересная версия. Но математика с ней не согласна.",
  "Почти. Где-то потерялся один маленький, но очень наглый момент.",
  "Не-а. Задача решила устроить проверку характера.",
  "Мы сейчас либо решаем задачу, либо задача решает нас.",
  "Версия смелая. Ответ, правда, другой.",
  "Математическая полиция сообщает: что-то пошло не туда."
];
const WRONG_REPEAT_MESSAGES = [
  "Ладно. Теперь уже без паники. Смотрим условие ещё раз.",
  "Мы явно что-то упускаем. И оно буквально написано в условии.",
  "Бара предлагает перечитать задачу. Бара знает.",
  "Такое бывает. Сейчас найдём, где спряталась ошибка."
];
const HARD_MESSAGES = [
  "Окей. Это уже не разминка.",
  "Так, здесь математика решила показать характер.",
  "Соберись. Сейчас будет тот самый момент.",
  "Если что, мы не обязаны любить эту задачу. Мы обязаны её решить."
];
const FINAL_HIGH = ["Вот это уже выглядит уверенно.", "Бара снимает шляпу. Математическую.", "ОГЭ пока не побеждён, но уже заметно нервничает."];
const FINAL_MID = ["Нормальная база. Теперь понятно, что именно стоит подтянуть."];
const FINAL_LOW = ["Это не катастрофа. Зато теперь у нас есть список тем, с которыми надо разобраться.", "Результат получен. Паниковать бессмысленно, работать есть над чем."];

function pickMsg(arr, idx){ return arr[idx % arr.length]; }
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* =========================================================
   ДАННЫЕ ЗАДАНИЙ — все ответы проверены независимым пересчётом
   ========================================================= */
const GRID_FIGURE = `<div class="prompt-figure"><svg width="150" height="98" viewBox="0 0 150 98">
  <g stroke="#3A3D4D" stroke-width="1">
    <line x1="10" y1="10" x2="140" y2="10"/><line x1="10" y1="36" x2="140" y2="36"/>
    <line x1="10" y1="62" x2="140" y2="62"/><line x1="10" y1="88" x2="140" y2="88"/>
    <line x1="10" y1="10" x2="10" y2="88"/><line x1="36" y1="10" x2="36" y2="88"/>
    <line x1="62" y1="10" x2="62" y2="88"/><line x1="88" y1="10" x2="88" y2="88"/>
    <line x1="114" y1="10" x2="114" y2="88"/><line x1="140" y1="10" x2="140" y2="88"/>
  </g>
  <polygon points="10,10 88,10 88,36 140,36 140,88 10,88" fill="#8B5CF6" fill-opacity="0.28" stroke="#8B5CF6" stroke-width="2.5"/>
</svg></div>`;

const TASKS = [
  {
    id:1, section:"Алгебра", topic:"Дроби", type:"input",
    prompt:`<p>Найдите значение выражения:</p><p class="sub">9/5 &nbsp;·&nbsp; 2/3</p>`,
    placeholder:"Введите число",
    correct:1.2, tolerance:0.01,
    hint:"Умножение дробей: числитель на числитель, знаменатель на знаменатель. Сократить можно и до, и после умножения.",
    explain:"9/5 · 2/3 = (9·2)/(5·3) = 18/15 = 6/5 = 1,2."
  },
  {
    id:2, section:"Алгебра", topic:"Координатная прямая", type:"single",
    prompt:`<p>На координатной прямой отмечены числа p, q и r в таком порядке слева направо: r, q, p.</p><p class="sub">Какая из разностей положительна?</p>`,
    options:["q − p", "q − r", "r − p", "ни одна из них"],
    correct:1,
    hint:"Разность двух чисел положительна, если из большего вычесть меньшее. Кто здесь правее — тот и больше.",
    explain:"На прямой r самое левое (наименьшее), затем q, затем p (наибольшее). Значит q &gt; r, и разность q − r положительна. Остальные разности отрицательны."
  },
  {
    id:3, section:"Алгебра", topic:"Степени", type:"input", hard:true,
    prompt:`<p>Найдите значение выражения</p><p class="sub">a<sup>3,33</sup> : (a<sup>2,11</sup> · a<sup>2,22</sup>)</p><p class="sub">при a = 2/7.</p>`,
    placeholder:"Введите число",
    correct:3.5, tolerance:0.01,
    hint:"Сначала сложи показатели в знаменателе, потом вычти из показателя в числителе: a^m : a^n = a^(m−n).",
    explain:"2,11 + 2,22 = 4,33. Тогда выражение равно a^(3,33−4,33) = a⁻¹ = 1/a. При a = 2/7 получаем 1 : (2/7) = 7/2 = 3,5."
  },
  {
    id:4, section:"Алгебра", topic:"Уравнения", type:"input", hard:true,
    prompt:`<p>Найдите корень уравнения:</p><p class="sub">(x + 3)² = (x + 8)²</p>`,
    placeholder:"Введите число",
    correct:-5.5, tolerance:0.01,
    hint:"Раскрой обе скобки по формуле квадрата суммы и сократи одинаковые x². Останется линейное уравнение.",
    explain:"x² + 6x + 9 = x² + 16x + 64 → 6x + 9 = 16x + 64 → −55 = 10x → x = −5,5."
  },
  {
    id:5, section:"Практика", topic:"Вероятность", type:"input",
    prompt:`<p>У бабушки 10 чашек: 7 с красными цветами, остальные с синими. Бабушка наливает чай в случайно выбранную чашку.</p><p class="sub">Найдите вероятность того, что это будет чашка с синими цветами.</p>`,
    placeholder:"Введите число",
    correct:0.3, tolerance:0.01,
    hint:"Вероятность = число нужных исходов / всего исходов.",
    explain:"Синих чашек 10 − 7 = 3. Вероятность = 3/10 = 0,3."
  },
  {
    id:6, section:"Алгебра", topic:"Неравенства", type:"input",
    prompt:`<p>Решите неравенство:</p><p class="sub">−2x + 5 ≤ −3x − 3</p><p class="sub">В ответ запишите правую границу решения (то есть такое x, начиная с которого неравенство выполняется).</p>`,
    placeholder:"Введите число",
    correct:-8, tolerance:0.01,
    hint:"Перенеси все x в одну сторону, числа — в другую: −2x + 3x ≤ −3 − 5.",
    explain:"−2x + 3x ≤ −3 − 5 → x ≤ −8. Решение: x ≤ −8."
  },
  {
    id:7, section:"Практика", topic:"Текстовые задачи", type:"input",
    prompt:`<p>На высоте 2205 м над уровнем моря атмосферное давление составляет 550 мм рт. ст. При подъёме на каждые 10,5 м давление уменьшается примерно на 1 мм рт. ст.</p><p class="sub">Определите атмосферное давление на высоте 1995 м над уровнем моря (в мм рт. ст.).</p>`,
    placeholder:"Введите число",
    correct:570, tolerance:0.01,
    hint:"1995 м ниже, чем 2205 м. Найди разницу высот, раздели на 10,5 — получишь, на сколько мм увеличится давление.",
    explain:"Разница высот: 2205 − 1995 = 210 м, это ниже — значит, давление растёт. 210 : 10,5 = 20 (интервалов), рост давления 20 мм рт. ст. Итог: 550 + 20 = 570."
  },
  {
    id:8, section:"Геометрия", topic:"Площади фигур", type:"input",
    prompt:`<p>Площадь четырёхугольника можно вычислить по формуле S = (d₁·d₂·sin α) / 2, где d₁ и d₂ — длины диагоналей, α — угол между ними.</p><p class="sub">Найдите длину диагонали d₂, если d₁ = 6, sin α = 1/3, а S = 19.</p>`,
    placeholder:"Введите число",
    correct:19, tolerance:0.01,
    hint:"Подставь известные значения в формулу и вырази d₂: сначала перемножь d₁ и sin α в знаменателе.",
    explain:"d₂ = 2S / (d₁·sin α) = (2·19) / (6·1/3) = 38 / 2 = 19."
  },
  {
    id:9, section:"Геометрия", topic:"Ромб", type:"input",
    prompt:`<p>Сторона ромба равна 4, а один из его углов равен 150°.</p><p class="sub">Найдите высоту этого ромба.</p>`,
    placeholder:"Введите число",
    correct:2, tolerance:0.01,
    hint:"Высота ромба = сторона × синус угла. sin 150° = sin 30° (это соседний угол).",
    explain:"h = a · sin α = 4 · sin 150° = 4 · 0,5 = 2."
  },
  {
    id:10, section:"Геометрия", topic:"Окружности", type:"input",
    prompt:`<p>В треугольнике ABC угол C равен 30°, AB = 16.</p><p class="sub">Найдите радиус окружности, описанной около этого треугольника.</p>`,
    placeholder:"Введите число",
    correct:16, tolerance:0.01,
    hint:"Теорема синусов: сторона / sin(противолежащего угла) = 2R.",
    explain:"AB / sin C = 2R → 16 / sin 30° = 16 / 0,5 = 32 = 2R → R = 16."
  },
  {
    id:11, section:"Геометрия", topic:"Параллелограмм", type:"input", hard:true,
    prompt:`<p>Площадь параллелограмма ABCD равна 180. Точка E — середина стороны AB.</p><p class="sub">Найдите площадь трапеции DAEC.</p>`,
    placeholder:"Введите число",
    correct:135, tolerance:0.01,
    hint:"Диагональ AC делит параллелограмм на два равных по площади треугольника. Попробуй координатный метод: расставь A(0,0), B(b,0), D(d1,d2), C=B+D.",
    explain:"Если задать координаты A(0,0), B(b,0), D(d1,d2), C=(b+d1,d2), то площадь параллелограмма равна b·d2 = 180. Площадь трапеции DAEC (через формулу площади многоугольника) оказывается равна (3/4)·b·d2 = 0,75·180 = 135. Это соотношение сохраняется для параллелограмма любой формы."
  },
  {
    id:12, section:"Геометрия", topic:"Площади фигур", type:"input",
    prompt:`<p>На клетчатой бумаге с размером клетки 1×1 изображена фигура.</p>${GRID_FIGURE}<p class="sub">Найдите площадь фигуры.</p>`,
    placeholder:"Введите число",
    correct:13, tolerance:0.01,
    hint:"Раздели фигуру на два прямоугольника по линиям сетки и сложи их площади.",
    explain:"Фигуру можно разбить на два прямоугольника: 3×1 = 3 (верхняя узкая часть) и 5×2 = 10 (нижняя широкая часть). Итого: 3 + 10 = 13."
  },
  {
    id:13, section:"Геометрия", topic:"Свойства фигур", type:"single",
    prompt:`<p>Какое из следующих утверждений верно?</p>`,
    options:[
      "Все диаметры окружности равны между собой.",
      "Диагональ трапеции делит её на два равных треугольника.",
      "Площадь любого параллелограмма равна произведению длин его сторон."
    ],
    correct:0,
    hint:"Проверь каждое утверждение на конкретном примере — контрпример сразу покажет, что утверждение неверно.",
    explain:"Все диаметры окружности проходят через центр и равны 2R — утверждение 1 верно. Диагональ трапеции обычно делит её на треугольники разной площади (утверждение 2 неверно). Площадь параллелограмма равна a·b·sin α, а не просто a·b, кроме случая прямоугольника (утверждение 3 неверно)."
  },
  {
    id:14, section:"Практика", topic:"Текстовые задачи", type:"input",
    prompt:`<p>Первые 300 км автомобиль ехал со скоростью 60 км/ч, следующие 300 км — со скоростью 100 км/ч, а последние 300 км — со скоростью 75 км/ч.</p><p class="sub">Найдите среднюю скорость автомобиля на протяжении всего пути (в км/ч).</p>`,
    placeholder:"Введите число",
    correct:75, tolerance:0.01,
    hint:"Средняя скорость — это всё расстояние, делённое на всё время, а не среднее арифметическое трёх скоростей.",
    explain:"Общее расстояние: 900 км. Время: 300/60 + 300/100 + 300/75 = 5 + 3 + 4 = 12 ч. Средняя скорость: 900 / 12 = 75 км/ч."
  },
  {
    id:15, section:"Алгебра", topic:"Функции", type:"input",
    prompt:`<p>Найдите угловой коэффициент функции:</p><p class="sub">y = 3x − 4</p>`,
    placeholder:"Введите число",
    correct:3, tolerance:0.01,
    hint:"В уравнении y = kx + b число k перед x — это и есть угловой коэффициент.",
    explain:"В функции y = 3x − 4 коэффициент перед x равен 3 — это и есть угловой коэффициент."
  },
  {
    id:16, section:"Алгебра", topic:"Функции", type:"input",
    prompt:`<p>При каком значении x график функции y = 2x − 6 пересекает ось Ox?</p>`,
    placeholder:"Введите число",
    correct:3, tolerance:0.01,
    hint:"На оси Ox значение y всегда равно нулю. Подставь y = 0 и реши уравнение относительно x.",
    explain:"2x − 6 = 0 → 2x = 6 → x = 3."
  },
  {
    id:17, section:"Алгебра", topic:"Корни", type:"input",
    prompt:`<p>Найдите значение выражения:</p><p class="sub">√48 : √3</p>`,
    placeholder:"Введите число",
    correct:4, tolerance:0.01,
    hint:"√a : √b = √(a:b), если a, b ≥ 0.",
    explain:"√48 : √3 = √(48:3) = √16 = 4."
  },
  {
    id:18, section:"Практика", topic:"Статистика", type:"input",
    prompt:`<p>В таблице показано количество осадков (в мм) за 5 дней недели: 0, 3, 12, 0, 5.</p><p class="sub">Найдите среднее количество осадков за эти 5 дней.</p>`,
    placeholder:"Введите число",
    correct:4, tolerance:0.01,
    hint:"Среднее арифметическое — сумма всех значений, делённая на их количество.",
    explain:"(0 + 3 + 12 + 0 + 5) / 5 = 20 / 5 = 4."
  }
];

/* =========================================================
   ДОСТИЖЕНИЯ
   ========================================================= */
const ACHIEVEMENTS = [
  {id:'first', emoji:'🏆', name:'Первый результат'},
  {id:'streak10', emoji:'🔥', name:'10 правильных подряд'},
  {id:'fullmode', emoji:'🧠', name:'Математический режим'},
  {id:'flawless', emoji:'🎯', name:'Без ошибок'},
  {id:'bara', emoji:'🦫', name:'Одобрено Барой'}
];
let unlockedAch = new Set();
let newlyUnlocked = [];

function loadAchievements(){
  try{
    const raw = localStorage.getItem('ogebp_achievements');
    if (raw) unlockedAch = new Set(JSON.parse(raw));
  }catch(e){ unlockedAch = new Set(); }
}
function saveAchievements(){
  try{ localStorage.setItem('ogebp_achievements', JSON.stringify([...unlockedAch])); }catch(e){}
}
function unlockAchievement(id){
  if (unlockedAch.has(id)) return;
  unlockedAch.add(id);
  newlyUnlocked.push(id);
  saveAchievements();
}
function renderBadgesRow(){
  const row = el('badgesRow');
  row.innerHTML = '';
  ACHIEVEMENTS.forEach(a=>{
    const chip = document.createElement('div');
    chip.className = 'badge-chip' + (unlockedAch.has(a.id) ? ' unlocked' : '');
    chip.textContent = a.emoji;
    chip.title = a.name + (unlockedAch.has(a.id) ? '' : ' (пока не получено)');
    row.appendChild(chip);
  });
}

/* =========================================================
   СОСТОЯНИЕ
   ========================================================= */
let order = [];
let cursor = 0;
let userAnswers = {};
let isReviewMode = false;
let currentMode = 'full';
let reviewSourceIndices = [];
let currentStreak = 0;
let hadWrongAttemptThisRun = false;
let startTime = 0;
let msgCounter = 0;

const el = (id)=>document.getElementById(id);
const screens = {
  start: el('screen-start'),
  modes: el('screen-modes'),
  quiz: el('screen-quiz'),
  result: el('screen-result')
};

function showScreen(name){
  Object.values(screens).forEach(s=>s.classList.remove('active'));
  screens[name].classList.add('active');
  el('topbar').hidden = (name !== 'quiz');
  window.scrollTo(0,0);
}

function shuffle(arr){
  const a = [...arr];
  for (let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function parseUserNumber(str){
  if (str == null) return NaN;
  str = String(str).trim().replace(',', '.');
  if (str === '') return NaN;
  if (str.includes('/')){
    const parts = str.split('/');
    if (parts.length===2){
      const a = parseFloat(parts[0]), b = parseFloat(parts[1]);
      if (!isNaN(a) && !isNaN(b) && b!==0) return a/b;
    }
    return NaN;
  }
  return parseFloat(str);
}

function ruWord(n, one, few, many){
  const n10 = n % 10, n100 = n % 100;
  if (n10===1 && n100!==11) return one;
  if (n10>=2 && n10<=4 && (n100<10 || n100>=20)) return few;
  return many;
}

/* =========================================================
   РЕЖИМЫ
   ========================================================= */
function updateReviewModeButton(){
  const btn = el('modeReview');
  const sub = el('reviewModeSub');
  if (reviewSourceIndices.length > 0){
    btn.disabled = false;
    sub.textContent = `${reviewSourceIndices.length} ${ruWord(reviewSourceIndices.length,'задание','задания','заданий')} с ошибками`;
  } else {
    btn.disabled = true;
    sub.textContent = 'пока нечего повторять';
  }
}

function startQuiz(modeName){
  currentMode = modeName;
  isReviewMode = (modeName === 'review');
  const allIdx = TASKS.map((_,i)=>i);

  if (modeName === 'quick') order = shuffle(allIdx).slice(0,6);
  else if (modeName === 'full') order = shuffle(allIdx);
  else if (modeName === 'review') {
    order = [...reviewSourceIndices];
    if (order.length === 0){ order = shuffle(allIdx).slice(0,6); isReviewMode=false; currentMode='quick'; }
  }

  cursor = 0;
  userAnswers = {};
  currentStreak = 0;
  hadWrongAttemptThisRun = false;
  startTime = Date.now();
  showScreen('quiz');
  renderQuiz();
}

/* =========================================================
   РЕНДЕР ЗАДАНИЯ
   ========================================================= */
function currentTaskIndex(){ return order[cursor]; }
function currentTask(){ return TASKS[currentTaskIndex()]; }

function countCorrectInOrder(){
  let c = 0;
  order.forEach(i=>{ if (userAnswers[i] && userAnswers[i].finalized && userAnswers[i].isCorrect) c++; });
  return c;
}
function countAnsweredInOrder(){
  let c = 0;
  order.forEach(i=>{ if (userAnswers[i] && userAnswers[i].finalized) c++; });
  return c;
}

function renderMilestone(){
  const total = order.length;
  const n = cursor+1;
  const task = currentTask();
  const banner = el('milestoneBanner');
  if (task.hard){
    banner.hidden = false;
    banner.textContent = pickMsg(HARD_MESSAGES, currentTaskIndex());
    return;
  }
  if (total >= 8 && n === 5){
    banner.hidden = false;
    banner.textContent = "5 заданий позади. Уже поздно отступать.";
    return;
  }
  if (total >= 10 && n === Math.round(total/2)){
    banner.hidden = false;
    banner.textContent = `${n}/${total}. Мы официально в середине этого приключения.`;
    return;
  }
  if (n === total && total > 1){
    banner.hidden = false;
    banner.textContent = "Последний рывок. Потом можно снова притворяться, что ты не видел математику.";
    return;
  }
  banner.hidden = true;
}

function renderQuiz(){
  const total = order.length;
  const task = currentTask();
  const taskIdx = currentTaskIndex();

  el('progressLabel').textContent = `Задание ${cursor+1} из ${total}`;
  const answered = countAnsweredInOrder();
  el('accuracyLabel').textContent = answered > 0 ? `Точность: ${Math.round(countCorrectInOrder()/answered*100)}%` : '';
  el('progressFill').style.width = `${Math.round(cursor/total*100)}%`;
  el('categoryTag').textContent = task.section;
  el('topicTag').textContent = task.topic;
  el('btnBack').disabled = (cursor === 0);
  el('scoreCount').textContent = countCorrectInOrder();

  renderMilestone();

  el('prompt').innerHTML = task.prompt;

  const zone = el('answerZone');
  zone.innerHTML = '';
  const rec = userAnswers[taskIdx];

  if (task.type === 'input'){
    const wrap = document.createElement('div');
    wrap.className = 'input-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'text-input';
    input.placeholder = task.placeholder || 'Введите ответ';
    input.id = 'answerInput';
    input.autocomplete = 'off';
    if (rec) input.value = rec.given || '';
    if (rec && rec.finalized) input.disabled = true;
    wrap.appendChild(input);
    zone.appendChild(wrap);
    input.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter'){
        const r = userAnswers[taskIdx];
        if (!r || !r.finalized) handleCheck();
      }
    });
  } else {
    const list = document.createElement('div');
    list.className = 'option-list';
    task.options.forEach((optText, i)=>{
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'option-btn single';
      b.dataset.idx = i;
      b.innerHTML = `<span class="opt-mark"></span><span>${optText}</span>`;
      if (rec && rec.given && rec.given.includes(i)) b.classList.add('selected');
      if (rec && rec.finalized) { b.disabled = true; b.classList.add('locked'); }
      b.addEventListener('click', ()=>{
        const r = userAnswers[taskIdx];
        if (r && r.finalized) return;
        list.querySelectorAll('.option-btn').forEach(x=>x.classList.remove('selected'));
        b.classList.add('selected');
      });
      list.appendChild(b);
    });
    zone.appendChild(list);
  }

  const fb = el('feedback');
  const btnCheck = el('btnCheck');
  const btnNext = el('btnNext');
  const btnReveal = el('btnReveal');

  if (rec && rec.finalized){
    renderFinalizedView(rec, task);
    btnCheck.hidden = true;
    btnNext.hidden = false;
    btnNext.textContent = (cursor === total-1) ? 'Показать результат →' : 'Дальше →';
    setMascot(el('mascotQuiz'), rec.isCorrect ? 'happy' : 'oops');
  } else if (rec && rec.attempts > 0){
    fb.hidden = true;
    btnCheck.hidden = false;
    btnNext.hidden = true;
    btnReveal.hidden = false;
    renderRetryFeedback(rec, task, false);
  } else {
    fb.hidden = true;
    fb.className = 'feedback';
    btnCheck.hidden = false;
    btnNext.hidden = true;
    btnReveal.hidden = true;
    setMascot(el('mascotQuiz'), 'neutral');
  }
}

function markOptionCorrectness(task, rec){
  if (task.type !== 'single') return;
  const buttons = el('answerZone').querySelectorAll('.option-btn');
  buttons.forEach((b,i)=>{
    if (i === task.correct) b.classList.add('correct-mark');
    else if (rec.given && rec.given.includes(i)) b.classList.add('wrong-mark');
  });
}

function renderFinalizedView(rec, task){
  const fb = el('feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (rec.isCorrect ? 'is-correct' : 'is-wrong-final');
  el('feedbackMsg').textContent = rec.isCorrect ? pickMsg(RIGHT_MESSAGES, rec.msgSeed||0) : (rec.revealed ? 'Ладно, разбираем вместе:' : pickMsg(WRONG_REPEAT_MESSAGES, rec.msgSeed||0));
  el('feedbackExplain').hidden = false;
  el('feedbackExplain').textContent = task.explain;
  el('btnReveal').hidden = true;
  el('answerZone').querySelectorAll('.text-input').forEach(i=>i.disabled=true);
  el('answerZone').querySelectorAll('.option-btn').forEach(b=>{ b.disabled=true; b.classList.add('locked'); });
  markOptionCorrectness(task, rec);
}

function renderRetryFeedback(rec, task){
  const fb = el('feedback');
  fb.hidden = false;
  fb.className = 'feedback is-wrong-retry';
  if (rec.attempts <= 1){
    el('feedbackMsg').textContent = pickMsg(WRONG_FIRST_MESSAGES, msgCounter);
    el('feedbackExplain').hidden = true;
  } else {
    el('feedbackMsg').textContent = pickMsg(WRONG_REPEAT_MESSAGES, msgCounter);
    el('feedbackExplain').hidden = false;
    el('feedbackExplain').textContent = 'Подсказка: ' + task.hint;
  }
  el('btnReveal').hidden = false;
  setMascot(el('mascotQuiz'), 'oops');
}

/* =========================================================
   ПРОВЕРКА ОТВЕТА
   ========================================================= */
function pulseNoSelection(){
  const zone = el('answerZone');
  zone.classList.remove('shake-soft');
  void zone.offsetWidth;
  zone.classList.add('shake-soft');
}

function handleCheck(){
  const taskIdx = currentTaskIndex();
  const task = currentTask();
  let rec = userAnswers[taskIdx] || { attempts:0, finalized:false, given:null, isCorrect:false, firstTryCorrect:false, revealed:false };
  if (rec.finalized) return;

  let isCorrectNow = false, given = null;
  if (task.type === 'input'){
    const input = el('answerInput');
    given = input.value;
    const val = parseUserNumber(given);
    if (!isNaN(val)) isCorrectNow = Math.abs(val - task.correct) < (task.tolerance || 0.01);
  } else {
    const sel = el('answerZone').querySelector('.option-btn.selected');
    if (!sel){ pulseNoSelection(); return; }
    const i = parseInt(sel.dataset.idx,10);
    given = [i];
    isCorrectNow = (i === task.correct);
  }

  rec.attempts++;
  rec.given = given;
  if (rec.attempts === 1) rec.firstTryCorrect = isCorrectNow;
  msgCounter++;
  rec.msgSeed = msgCounter;

  if (isCorrectNow){
    finalizeQuestion(rec, task, taskIdx, true, false);
  } else {
    hadWrongAttemptThisRun = true;
    if (rec.attempts >= 3){
      finalizeQuestion(rec, task, taskIdx, false, false);
    } else {
      userAnswers[taskIdx] = rec;
      const card = document.querySelector('.quiz-card');
      card.classList.remove('shake-soft'); void card.offsetWidth; card.classList.add('shake-soft');
      renderRetryFeedback(rec, task);
      el('btnCheck').hidden = false;
      el('btnNext').hidden = true;
    }
  }
}

function handleReveal(){
  const taskIdx = currentTaskIndex();
  const task = currentTask();
  const rec = userAnswers[taskIdx] || { attempts:1, finalized:false, given:null, isCorrect:false, firstTryCorrect:false };
  rec.revealed = true;
  finalizeQuestion(rec, task, taskIdx, false, true);
}

function finalizeQuestion(rec, task, taskIdx, isCorrect, revealed){
  rec.isCorrect = isCorrect;
  rec.finalized = true;
  rec.revealed = revealed || rec.revealed;
  userAnswers[taskIdx] = rec;

  if (rec.firstTryCorrect){ currentStreak++; if (currentStreak >= 10) unlockAchievement('streak10'); }
  else { currentStreak = 0; }

  if (!isReviewMode){
    if (!isCorrect && !reviewSourceIndices.includes(taskIdx)) reviewSourceIndices.push(taskIdx);
    if (isCorrect && reviewSourceIndices.includes(taskIdx)) reviewSourceIndices = reviewSourceIndices.filter(i=>i!==taskIdx);
  }

  const fb = el('feedback');
  fb.hidden = false;
  fb.className = 'feedback ' + (isCorrect ? 'is-correct' : 'is-wrong-final');
  el('feedbackMsg').textContent = isCorrect ? pickMsg(RIGHT_MESSAGES, rec.msgSeed||0) : (rec.revealed ? 'Ладно, разбираем вместе:' : pickMsg(WRONG_REPEAT_MESSAGES, rec.msgSeed||0));
  el('feedbackExplain').hidden = false;
  el('feedbackExplain').textContent = task.explain;
  el('btnReveal').hidden = true;

  setMascot(el('mascotQuiz'), isCorrect ? 'happy' : 'oops');
  if (!isCorrect){
    const card = document.querySelector('.quiz-card');
    card.classList.remove('shake-soft'); void card.offsetWidth; card.classList.add('shake-soft');
  }

  if (task.type === 'input') { const i = el('answerInput'); if (i) i.disabled = true; }
  else { el('answerZone').querySelectorAll('.option-btn').forEach(b=>{ b.disabled=true; b.classList.add('locked'); }); markOptionCorrectness(task, rec); }

  el('btnCheck').hidden = true;
  const btnNext = el('btnNext');
  btnNext.hidden = false;
  btnNext.textContent = (cursor === order.length-1) ? 'Показать результат →' : 'Дальше →';

  el('scoreCount').textContent = countCorrectInOrder();
  const answered = countAnsweredInOrder();
  el('accuracyLabel').textContent = answered > 0 ? `Точность: ${Math.round(countCorrectInOrder()/answered*100)}%` : '';
}

/* =========================================================
   НАВИГАЦИЯ
   ========================================================= */
function goNext(){
  if (cursor < order.length - 1){ cursor++; renderQuiz(); }
  else finishQuiz();
}
function goBack(){
  if (cursor > 0){ cursor--; renderQuiz(); }
}

/* =========================================================
   ФИНАЛ
   ========================================================= */
function formatTime(ms){
  const s = Math.round(ms/1000);
  const m = Math.floor(s/60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2,'0')}`;
}

function finishQuiz(){
  const total = order.length;
  let correct = 0;
  order.forEach(i=>{ if (userAnswers[i] && userAnswers[i].isCorrect) correct++; });
  const wrong = total - correct;
  const percent = Math.round((correct/total)*100);
  const elapsed = Date.now() - startTime;

  newlyUnlocked = [];
  const firstTime = !unlockedAch.has('first');
  if (firstTime) unlockAchievement('first');
  if (currentMode === 'full') unlockAchievement('fullmode');
  if (wrong === 0 && !hadWrongAttemptThisRun && total >= 5) unlockAchievement('flawless');
  if (currentMode === 'review' && percent === 100 && total > 0) unlockAchievement('bara');

  el('scoreFrac').textContent = `${correct}/${total}`;
  el('scorePct').textContent = `${percent}%`;
  el('statTime').textContent = formatTime(elapsed);
  el('statCorrect').textContent = correct;
  el('statWrong').textContent = wrong;
  el('resultBarFill').style.width = '0%';

  let message, mascotState;
  if (percent >= 85){ message = pickRandom(FINAL_HIGH); mascotState='happy'; }
  else if (percent >= 50){ message = pickRandom(FINAL_MID); mascotState='neutral'; }
  else { message = pickRandom(FINAL_LOW); mascotState='oops'; }
  el('resultMessage').textContent = message;
  setMascot(el('mascotResult'), mascotState);

  const topicsWrap = el('resultTopics');
  const topicsList = el('topicsList');
  topicsList.innerHTML = '';
  if (reviewSourceIndices.length > 0){
    const bySection = {};
    reviewSourceIndices.forEach(i=>{
      const s = TASKS[i].section;
      bySection[s] = (bySection[s]||0) + 1;
    });
    Object.entries(bySection).forEach(([section,count])=>{
      const row = document.createElement('div');
      row.className = 'topic-row';
      row.innerHTML = `<span>${section}</span><span class="count">${count} ${ruWord(count,'ошибка','ошибки','ошибок')}</span>`;
      topicsList.appendChild(row);
    });
    topicsWrap.hidden = false;
  } else {
    topicsWrap.hidden = true;
  }

  const achWrap = el('resultAchievements');
  const achList = el('achList');
  achList.innerHTML = '';
  if (newlyUnlocked.length > 0){
    newlyUnlocked.forEach(id=>{
      const a = ACHIEVEMENTS.find(x=>x.id===id);
      if (!a) return;
      const item = document.createElement('div');
      item.className = 'ach-item';
      item.innerHTML = `<span class="ach-emoji">${a.emoji}</span><span class="ach-name">${a.name}</span>`;
      achList.appendChild(item);
    });
    achWrap.hidden = false;
  } else {
    achWrap.hidden = true;
  }

  updateReviewModeButton();
  el('btnReviewMistakes').hidden = reviewSourceIndices.length === 0;

  showScreen('result');
  requestAnimationFrame(()=>{ setTimeout(()=>{ el('resultBarFill').style.width = percent + '%'; }, 60); });
}

/* =========================================================
   ИНИЦИАЛИЗАЦИЯ
   ========================================================= */
loadAchievements();
renderBadgesRow();
updateReviewModeButton();
setMascot(el('mascotStart'), 'neutral');
setMascot(el('mascotModes'), 'happy');

el('btnGoModes').addEventListener('click', ()=>{ updateReviewModeButton(); showScreen('modes'); });
el('btnBackToStart').addEventListener('click', ()=>{ renderBadgesRow(); showScreen('start'); });
el('modeQuick').addEventListener('click', ()=>startQuiz('quick'));
el('modeFull').addEventListener('click', ()=>startQuiz('full'));
el('modeReview').addEventListener('click', ()=>{ if (!el('modeReview').disabled) startQuiz('review'); });

el('btnCheck').addEventListener('click', handleCheck);
el('btnReveal').addEventListener('click', handleReveal);
el('btnNext').addEventListener('click', goNext);
el('btnBack').addEventListener('click', goBack);

el('btnReviewMistakes').addEventListener('click', ()=>startQuiz('review'));
el('btnAgain').addEventListener('click', ()=>startQuiz(currentMode === 'review' ? 'full' : currentMode));
el('btnHome').addEventListener('click', ()=>{ renderBadgesRow(); showScreen('start'); });
