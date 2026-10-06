const algorithms={
  "grover": {
    "title": "Алгоритм Гровера",
    "image": "images/grover.png",
    "result": "{'11': 1024}",
    "code": "# 1. Примусово вказуємо matplotlib працювати в безвіконному режимі\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nfrom qiskit import QuantumCircuit\n\n# 2. Створюємо схему\nqc = QuantumCircuit(2, 2)\nqc.h([0, 1])\nqc.barrier(label=\"Init\")\nqc.cz(0, 1)\nqc.barrier(label=\"Oracle\")\nqc.h([0, 1])\nqc.x([0, 1])\nqc.cz(0, 1)\nqc.x([0, 1])\nqc.h([0, 1])\nqc.barrier(label=\"Diffusion\")\nqc.measure([0, 1], [0, 1])\n\n# 3. Малюємо і зберігаємо у файл напряму\nfig = qc.draw(output='mpl', style='iqp', scale=1.3)\nfig.savefig('grover_beautiful.png', dpi=300, bbox_inches='tight')\nplt.close(fig)\n\nprint(\"Файл 'grover_beautiful.png' успішно збережено!\")\n"
  },
  "kuperberg_2": {
    "title": "Куперберг (2 кубіти)",
    "image": "images/kuperberg_2.png",
    "result": "Результат моделювання для 2 кубітів.",
    "code": "# 1. Налаштовуємо matplotlib у безвіконному режимі\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nimport numpy as np\nfrom qiskit import QuantumCircuit\n\n# 2. Створюємо 2-кубітну схему для алгоритму Куперберга\nqc = QuantumCircuit(2, 2)\n\n# Крок 1: Ініціалізація суперпозиції\nqc.h([0, 1])\nqc.barrier(label=\"Init\")\n\n# Крок 2: Структурні перетворення та оракул (компактний каскад для 2 кубітів)\nqc.cx(0, 1)\nqc.barrier(label=\"Oracle\")\n\n# Крок 3: Фазові оператори\nqc.p(np.pi / 2, 0)\nqc.p(np.pi / 4, 1)\nqc.cz(0, 1)\nqc.barrier(label=\"Phase\")\n\n# Крок 4: Фінальна інтерференція та вимірювання\nqc.h([0, 1])\nqc.measure([0, 1], [0, 1])\n\n# 3. Малюємо цілісно в одну лінію (fold=-1) та зберігаємо\nfig = qc.draw(output='mpl', style='iqp', scale=1.2, fold=-1)\nfig.savefig('kuperberg_2qubit.png', dpi=300, bbox_inches='tight')\nplt.close(fig)\n\nprint(\"Схему 2-кубітного Куперберга успішно збережено як 'kuperberg_2qubit.png'!\")\n\n"
  },
  "kuperberg_4": {
    "title": "Розширена модель Куперберга (4 кубіти)",
    "image": "images/kuperberg_4.png",
    "result": "Результат моделювання для 4 кубітів.",
    "code": "# 1. Налаштовуємо matplotlib у безвіконному режимі\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nimport numpy as np\nfrom qiskit import QuantumCircuit\n\n# 2. Створюємо квантову схему на 4 кубіти для алгоритму Куперберга\nqc = QuantumCircuit(4, 4)\n\n# Крок 1: Ініціалізація суперпозиції (адамари на всі кубіти)\nqc.h(range(4))\nqc.barrier(label=\"Superposition\")\n\n# Крок 2: Структурні перетворення та оракул (каскад вентилів CNOT)\nqc.cx(0, 2)\nqc.cx(1, 3)\nqc.cx(0, 1)\nqc.cx(2, 3)\nqc.barrier(label=\"Oracle / Cascade\")\n\n# Крок 3: Фазові оператори (характерні для алгоритму Куперберга)\nfor q in range(4):\n    qc.p(np.pi / (2**q), q)\n\nqc.cz(0, 2)\nqc.cz(1, 3)\nqc.barrier(label=\"Phase Shift\")\n\n# Крок 4: Фінальна інтерференція (декогеренція/адамари) та вимірювання\nqc.h(range(4))\nqc.barrier(label=\"Interference\")\nqc.measure(range(4), range(4))\n\n# 3. Генерація графічної схеми у високій якості та збереження\nfig = qc.draw(output='mpl', style='iqp', scale=1.2)\nfig.savefig('kuperberg_4qubit.png', dpi=300, bbox_inches='tight')\nplt.close(fig)\n\nprint(\"Схему алгоритму Куперберга успішно згенеровано та збережено як 'kuperberg_4qubit.png'!\")\n"
  },
  "shor_7": {
    "title": "Алгоритм Шора (7 кубітів)",
    "image": "images/shor_7.png",
    "result": "Результат моделювання для схеми Шора на 7 кубітах.",
    "code": "# 1. Налаштовуємо matplotlib у безвіконному режимі\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nimport numpy as np\nfrom qiskit import QuantumCircuit\n\n# 2. Створюємо схему на 7 кубітів та 4 класичні біти\nqc = QuantumCircuit(7, 4)\n\n# Етап 1: Ініціалізація суперпозиції\nqc.h(range(4))\nqc.x(4)\nqc.barrier(label=\"Init\")\n\n# Етап 2: Модулярне піднесення до степеня\nqc.cp(np.pi / 4, 0, 4)\nqc.cp(np.pi / 2, 1, 4)\nqc.cp(np.pi, 2, 4)\nqc.barrier(label=\"Mod Exp\")\n\n# Етап 3: Обернене квантове перетворення Фур'є (QFT dagger)\nqc.h(3)\nqc.cp(-np.pi / 2, 2, 3)\nqc.h(2)\nqc.cp(-np.pi / 4, 1, 2)\nqc.cp(-np.pi / 8, 0, 2)\nqc.h(1)\nqc.cp(-np.pi / 2, 0, 1)\nqc.h(0)\nqc.barrier(label=\"QFT Dagger\")\n\n# Етап 4: Вимірювання\nqc.measure(range(4), range(4))\n\n# 3. Малюємо всю схему в одну лінію (fold=-1) та зберігаємо\nfig = qc.draw(output='mpl', style='iqp', scale=1.0, fold=-1)\nfig.savefig('shor_7qubit_single.png', dpi=300, bbox_inches='tight')\nplt.close(fig)\n\nprint(\"Цілісну схему успішно збережено як 'shor_7qubit_single.png'!\")\n\n\n"
  }
};
const descriptions={
  "grover": "<p>Алгоритм Гровера використовується для пошуку потрібного елемента у невпорядкованій множині. У базовій 2-кубітній моделі початкова суперпозиція проходить через оракул та дифузор, після чого вимірювання дає цільовий стан.</p><p>У цій моделі цільовим є стан <b>|11⟩</b>.</p>",
  "kuperberg_2": "<p>У 2-кубітній моделі показано навчальну квантову схему з етапами суперпозиції, структурного перетворення, фазових операцій та вимірювання.</p>",
  "kuperberg_4": "<p><b>Масштабована 4-кубіт модель з розширеним каскадом CNOT/CZ-вентилів</b> слугує для форм неабелевої заплутаності та використання багаторівневої сітки фазових поворотів P(π/2), P(π/4), P(π/8) під час процедури просіювання (Sieving).</p><p>Загальний стан системи після виконання алгоритму визначається як:</p><p>Повноцінний алгоритм використовує два 2-кубітні регістри. Завдяки комбінації SWAP-каскадів та дробових фазових поворотів здійснюється ефективне фазове просіювання (sieving), що зменшує розмірність шуканої підгрупи. Математично цей процес описується виразом:</p><p>Повний квантовий конвеєр 4-кубітної моделі Куперберга: від створення суперпозиції H⁴ та заплутування через U<sub>f</sub> до фазового зсуву, спектрального аналізу за допомогою QFT та фінального вимірювання M<sup>⊗4</sup>.</p>",
  "shor_7": "<p>Алгоритм Шора використовує квантове перетворення Фур’є для пошуку періоду функції. У цій роботі наведено навчальну 7-кубітну схему з 4 класичними бітами для вимірювання.</p>"
};
const formulas={
  "grover": "<div class=\"formula\">\\(|\\psi\\rangle=\\frac{1}{2}(|00\\rangle+|01\\rangle+|10\\rangle+|11\\rangle)\\)</div><div class=\"formula\">\\(U_w|x\\rangle=(-1)^{f(x)}|x\\rangle\\)</div><div class=\"formula\">\\(U_{diff}=2|\\psi\\rangle\\langle\\psi|-I\\)</div>",
  "kuperberg_2": "<div class=\"formula\">\\(|\\psi\\rangle=H|0\\rangle\\otimes H|0\\rangle\\)</div><div class=\"formula\">\\(D_n=\\langle r,s\\mid r^n=s^2=1,\\ srs=r^{-1}\\rangle\\)</div>",
  "kuperberg_4": "<div class=\"formula\">\\(|\\psi_{final}\\rangle=(QFT_2\\otimes P^{m})\\cdot P(\\varphi)\\cdot U_f\\cdot H^{\\otimes4}|0\\rangle^{\\otimes4}\\)</div><div class=\"formula\">\\(|\\psi_{sieving}\\rangle=Sieving\\left(H^{\\otimes4}|0\\rangle^{\\otimes4}\\xrightarrow{U_f^{CNOT}}|\\psi_{ent}\\rangle\\xrightarrow{P(\\varphi)}\\frac{1}{2}\\sum_{k=0}^{3}e^{i\\varphi_k}|k\\rangle\\right)\\)</div><div class=\"formula\">\\(Circuit_{D_M}=M^{\\otimes4}\\cdot QFT_2\\cdot U_{Phase}(\\pi/2)\\cdot U_f^{CNOT}\\cdot H^{\\otimes4}|0\\rangle^{\\otimes4}\\)</div>",
  "shor_7": "<div class=\"formula\">\\(f(x)=a^x\\bmod N\\)</div><div class=\"formula\">\\(QFT|x\\rangle=\\frac{1}{\\sqrt{2^n}}\\sum_{k=0}^{2^n-1}e^{2\\pi i xk/2^n}|k\\rangle\\)</div>"
};


const kuperberg2Stages = [
  {
    title: "Етап 1. Ініціалізація та Квантова Суперпозиція",
    text: "На першому етапі готуються два регістри кубітів. За допомогою перетворення Адамара (H) перший регістр переводиться у стан рівномірної суперпозиції всіх можливих елементів групи G.",
    formula: String.raw`|\psi_1\rangle = \frac{1}{\sqrt{|G|}} \sum_{g \in G} |g\rangle |0\rangle`,
    points: ["Створення початкового стану кубітів |0⟩^{\otimes n}.", "Застосування вентилів Адамара до вхідного регістра."]
  },
  {
    title: "Етап 2. Виклик Квантового Оракула U_f",
    text: "Оракул обчислює функцію f(g) у другому регістрі. Завдяки заплутуванню (Entanglement) стан першого регістра пов'язується зі значенням функції.",
    formula: String.raw`|\psi_2\rangle = \frac{1}{\sqrt{|G|}} \sum_{g \in G} |g\rangle |f(g)\rangle`,
    points: ["Заплутування вхідного та вихідного регістрів.", "Збереження властивості прихованого зсуву f(g_1) = f(g_2)."]
  },
  {
    title: "Етап 3. Редукція та генерація фазових станів",
    text: "Вимірювання другого регістра редукує стан першого регістра до випадкової пари, що відрізняється на прихований зсув s. Це створює так званий фазовий кубіт (Phase State).",
    formula: String.raw`|\phi(k)\rangle = \frac{1}{\sqrt{2}} \left( |0\rangle + e^{\frac{2\pi i k s}{N}} |1\rangle \right)`,
    points: ["Отримання кубітів із фазовою інформацією про значення s.", "Параметр k обирається випадковим чином при кожному запуску."]
  },
  {
    title: "Етап 4. Фазове просіювання (Phase Sieving)",
    text: "Основне ядро алгоритму Куперберга. Квантові стани комбінуються парами за допомогою алгоритму поєднання (combination algorithm) для зменшення значення фазового коефіцієнта k до менших степенів двійки.",
    formula: String.raw`|\phi(k_1)\rangle \otimes |\phi(k_2)\rangle \xrightarrow{\text{Sieving}} |\phi(k_1-k_2)\rangle`,
    points: ["Рекурсивне комбінування та вимірювання допоміжних кубітів.", "Зменшення кількості невідомих змінних до одного біта."]
  },
  {
    title: "Етап 5. Вимірювання та обчислення зсуву s",
    text: "Коли параметр k зводиться до N/2, застосовується вентиль Адамара та виконується фінальне вимірювання у Z-базисі. Це дає біт прихованого значення s. Повторення процедури дозволяє повністю відновити значення s.",
    formula: String.raw`\text{Результат: } s = (s_1, s_2, \dots, s_n) \in \mathbb{Z}_N`,
    points: ["Фінальне деструктивне вимірювання результуючого кубіта.", "Точне відновлення значення прихованого елемента s."]
  }
];


const kuperberg4Stages = [
  {
    title: "Етап 1. Ініціалізація та Квантова Суперпозиція",
    text: "На першому етапі готуються чотири кубіти. За допомогою перетворення Адамара (H) вони переводяться у стан рівномірної суперпозиції всіх можливих базисних станів.",
    formula: String.raw`|\psi_1\rangle = \frac{1}{\sqrt{|G|}} \sum_{g \in G} |g\rangle |0\rangle`,
    points: ["Створення початкового стану |0000⟩.", "Застосування вентилів Адамара до всіх чотирьох кубітів."]
  },
  {
    title: "Етап 2. Виклик Квантового Оракула U_f",
    text: "Оракул U_f створює структурний зв'язок між кубітами. У 4-кубітній навчальній моделі це представлено каскадом CNOT, який формує заплутаний стан системи.",
    formula: String.raw`|\psi_2\rangle = U_f |\psi_1\rangle = \frac{1}{\sqrt{|G|}} \sum_{g \in G} |g\rangle |f(g)\rangle`,
    points: ["Формування заплутування між кубітами.", "Каскад CNOT реалізує структурне перетворення моделі."]
  },
  {
    title: "Етап 3. Редукція та генерація фазових станів",
    text: "Після структурного перетворення додається фазова інформація. Для чотирьох кубітів використовуються дробові фазові повороти з різними кутами.",
    formula: String.raw`|\phi(k)\rangle = \frac{1}{\sqrt{2}} \left( |0\rangle + e^{\frac{2\pi i k s}{N}} |1\rangle \right)`,
    points: ["Фазова інформація кодується у станах кубітів.", "Використовуються P(π/2), P(π/4), P(π/8) та P(π/16)."]
  },
  {
    title: "Етап 4. Фазове просіювання (Phase Sieving)",
    text: "Основне ядро алгоритму Куперберга. Квантові стани комбінуються для зменшення фазового коефіцієнта k. У 4-кубітній моделі цей етап показано через фазові оператори та CZ-взаємодії.",
    formula: String.raw`|\phi(k_1)\rangle \otimes |\phi(k_2)\rangle \xrightarrow{\text{Sieving}} |\phi(k_1-k_2)\rangle`,
    points: ["Комбінування фазових станів.", "Застосування CZ для взаємодії відповідних кубітів."]
  },
  {
    title: "Етап 5. Вимірювання та обчислення зсуву s",
    text: "На завершальному етапі виконується інтерференція за допомогою H та фінальне вимірювання всіх чотирьох кубітів. Отримані біти використовуються для відновлення прихованого зсуву s.",
    formula: String.raw`\text{Результат: } s = (s_1, s_2, \dots, s_n) \in \mathbb{Z}_N`,
    points: ["Застосування фінальних вентилів Адамара.", "Вимірювання чотирьох кубітів та отримання класичного результату."]
  }
];

function renderKuperberg2Stage(index){
  const block=document.getElementById("kuperberg-stages-block");
  const titleEl=document.getElementById("kuperberg-stage-title");
  const content=document.getElementById("kuperberg-stage-content");
  const general=document.getElementById("general-formulas-block");
  if(!block || !content) return;
  const stage=kuperberg2Stages[Math.max(0,Math.min(kuperberg2Stages.length-1,index))];
  block.hidden=false;
  if(general) general.hidden=true;
  titleEl.textContent=stage.title;
  content.innerHTML=`<p class="stage-explanation">${stage.text}</p><div class="formula stage-formula">\\[${stage.formula}\\]</div><ul class="key-points">${stage.points.map(point=>`<li>${point}</li>`).join("")}</ul>`;
  if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([content]);
}


function renderKuperberg4Stage(index){
  const block=document.getElementById("kuperberg-stages-block");
  const titleEl=document.getElementById("kuperberg-stage-title");
  const content=document.getElementById("kuperberg-stage-content");
  const general=document.getElementById("general-formulas-block");
  if(!block || !content) return;
  const stage=kuperberg4Stages[Math.max(0,Math.min(kuperberg4Stages.length-1,index))];
  block.hidden=false;
  if(general) general.hidden=true;
  titleEl.textContent=stage.title;
  content.innerHTML=`<p class="stage-explanation">${stage.text}</p><div class="formula stage-formula">\\[${stage.formula}\\]</div><ul class="key-points">${stage.points.map(point=>`<li>${point}</li>`).join("")}</ul>`;
  if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([content]);
}

const buttons=document.getElementById("algo-buttons");
const title=document.getElementById("algo-title");
const description=document.getElementById("algo-description");
const formula=document.getElementById("algo-formulas");
const image=document.getElementById("algo-image");
const result=document.getElementById("algo-result");
const code=document.getElementById("algo-code");
const copy=document.getElementById("copy-code");
const download=document.getElementById("download-code");

function showAlgorithm(id){
 const a=algorithms[id];
 if(!a) return;
 if(title) title.textContent=a.title;
 description.innerHTML=descriptions[id]||"";
 formula.innerHTML=formulas[id]||"";
 if(id === "kuperberg_2" && window.showKuperberg2Circuit){
   document.getElementById("circuit-generator").hidden = false;
   document.getElementById("circuit4-generator").hidden = true;
   window.showKuperberg2Circuit();
   image.hidden = false;
   image.src = a.image;
   renderKuperberg2Stage(0);
 } else if(id === "kuperberg_4" && window.showKuperberg4Circuit){
   document.getElementById("circuit-generator").hidden = true;
   document.getElementById("circuit4-generator").hidden = false;
   const stageBlock=document.getElementById("kuperberg-stages-block");
   if(stageBlock) stageBlock.hidden=false;
   const generalBlock=document.getElementById("general-formulas-block");
   if(generalBlock) generalBlock.hidden=true;
   window.showKuperberg4Circuit();
   renderKuperberg4Stage(0);
   image.hidden = false;
   image.src=a.image;
   image.onerror=()=>{image.alt="Файл схеми не знайдено: "+a.image;};
 } else {
   document.getElementById("circuit-generator").hidden = true;
   document.getElementById("circuit4-generator").hidden = true;
   const stageBlock=document.getElementById("kuperberg-stages-block");
   if(stageBlock) stageBlock.hidden=true;
   const generalBlock=document.getElementById("general-formulas-block");
   if(generalBlock) generalBlock.hidden=false;
   image.hidden = false;
   image.src=a.image;
   image.onerror=()=>{image.alt="Файл схеми не знайдено: "+a.image;};
 }
 result.textContent=a.result;
 code.textContent=a.code;
 document.querySelectorAll(".algo-buttons button").forEach(b=>b.classList.toggle("active",b.dataset.id===id));
 if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([formula]);
}

Object.keys(algorithms).forEach(id=>{
 const b=document.createElement("button");
 b.type="button"; b.dataset.id=id; b.textContent = algorithms[id].title.replace("Алгоритм ","");
 b.addEventListener("click",()=>showAlgorithm(id));
 buttons.appendChild(b);
});

copy.addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(code.textContent); copy.textContent="Скопійовано ✓"; setTimeout(()=>copy.textContent="Скопіювати код",1500);}
 catch(e){const t=document.createElement("textarea");t.value=code.textContent;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();}
});

download.addEventListener("click",()=>{
 const active=document.querySelector(".algo-buttons button.active");
 const id=active?active.dataset.id:"grover";
 const blob=new Blob([code.textContent],{type:"text/plain;charset=utf-8"});
 const url=URL.createObjectURL(blob); const a=document.createElement("a");
 a.href=url; a.download=id+".py"; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

showAlgorithm("grover");
