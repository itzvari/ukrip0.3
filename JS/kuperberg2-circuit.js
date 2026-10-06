/* Програмний генератор навчальної 2-кубітної схеми Куперберга.
   Нічого не завантажує з images/: SVG створюється безпосередньо в браузері. */
(function () {
    const NS = "http://www.w3.org/2000/svg";
    const stepInfo = document.getElementById("circuit-stage-info");
    const stepLabel = document.getElementById("circuit-step");
    const container = document.getElementById("circuit-container");
    const prev = document.getElementById("circuit-prev");
    const next = document.getElementById("circuit-next");
    const full = document.getElementById("circuit-full");
    if (!stepInfo || !stepLabel || !container) return;

    const stages = [
        { name: "Початок: два кубіти |0⟩", gates: [] },
        { name: "Крок 1: створення суперпозиції — H на обох кубітах", gates: [
            { type: "H", q: 0, col: 0 }, { type: "H", q: 1, col: 0 }
        ]},
        { name: "Крок 2: структурне перетворення / оракул — CNOT", gates: [
            { type: "H", q: 0, col: 0 }, { type: "H", q: 1, col: 0 },
            { type: "CNOT", control: 0, target: 1, col: 1 }
        ]},
        { name: "Крок 3: фазові операції — P(π/2), P(π/4) та CZ", gates: [
            { type: "H", q: 0, col: 0 }, { type: "H", q: 1, col: 0 },
            { type: "CNOT", control: 0, target: 1, col: 1 },
            { type: "P(π/2)", q: 0, col: 2 }, { type: "P(π/4)", q: 1, col: 2 },
            { type: "CZ", control: 0, target: 1, col: 3 }
        ]},
        { name: "Крок 4: фінальна інтерференція — H та вимірювання", gates: [
            { type: "H", q: 0, col: 0 }, { type: "H", q: 1, col: 0 },
            { type: "CNOT", control: 0, target: 1, col: 1 },
            { type: "P(π/2)", q: 0, col: 2 }, { type: "P(π/4)", q: 1, col: 2 },
            { type: "CZ", control: 0, target: 1, col: 3 },
            { type: "H", q: 0, col: 4 }, { type: "H", q: 1, col: 4 },
            { type: "M", q: 0, col: 5 }, { type: "M", q: 1, col: 5 }
        ]}
    ];
    let current = 0;

    function svgEl(tag, attrs, text) {
        const el = document.createElementNS(NS, tag);
        Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, value));
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function drawGate(svg, gate, x, y0, gap) {
        const y = y0 + gate.q * gap;
        if (gate.type === "CNOT" || gate.type === "CZ") {
            const y1 = y0 + gate.control * gap;
            const y2 = y0 + gate.target * gap;
            svg.appendChild(svgEl("line", { x1:x, y1:y1, x2:x, y2:y2, stroke:"#38bdf8", "stroke-width":"3" }));
            if (gate.type === "CNOT") {
                svg.appendChild(svgEl("circle", { cx:x, cy:y1, r:7, fill:"#38bdf8" }));
                svg.appendChild(svgEl("circle", { cx:x, cy:y2, r:14, fill:"none", stroke:"#38bdf8", "stroke-width":"3" }));
                svg.appendChild(svgEl("line", { x1:x, y1:y2-14, x2:x, y2:y2+14, stroke:"#38bdf8", "stroke-width":"3" }));
                svg.appendChild(svgEl("line", { x1:x-14, y1:y2, x2:x+14, y2:y2, stroke:"#38bdf8", "stroke-width":"3" }));
            } else {
                svg.appendChild(svgEl("circle", { cx:x, cy:y1, r:7, fill:"#38bdf8" }));
                svg.appendChild(svgEl("circle", { cx:x, cy:y2, r:10, fill:"#070c18", stroke:"#38bdf8", "stroke-width":"3" }));
            }
            return;
        }
        const width = gate.type.startsWith("P(") ? 86 : 52;
        svg.appendChild(svgEl("rect", { x:x-width/2, y:y-22, width:width, height:44, rx:6, fill:"#0b1120", stroke:"#38bdf8", "stroke-width":"2" }));
        svg.appendChild(svgEl("text", { x:x, y:y+6, "text-anchor":"middle", fill:"#fff", "font-size":"15", "font-family":"Arial, sans-serif", "font-weight":"700" }, gate.type));
    }

    function render(step) {
        current = Math.max(0, Math.min(stages.length - 1, step));
        const gates = stages[current].gates;
        const cols = 6;
        const x0 = 150, colW = 120, y0 = 75, gap = 70;
        const width = 850, height = 210;
        const svg = svgEl("svg", { viewBox:`0 0 ${width} ${height}`, role:"img", "aria-label":"Програмно створена квантова схема Куперберга-2" });
        svg.appendChild(svgEl("rect", { x:0, y:0, width:width, height:height, rx:8, fill:"#050911" }));
        [0,1].forEach(q => {
            const y=y0+q*gap;
            svg.appendChild(svgEl("text", { x:25, y:y+6, fill:"#cbd5e1", "font-size":"16", "font-family":"Arial, sans-serif" }, `q${q}`));
            svg.appendChild(svgEl("line", { x1:65, y1:y, x2:790, y2:y, stroke:"#64748b", "stroke-width":"2" }));
            svg.appendChild(svgEl("text", { x:805, y:y+6, fill:"#94a3b8", "font-size":"14", "font-family":"Arial, sans-serif" }, "M"));
        });
        const labels=["Init","Oracle","Phase","Interference","Measure"];
        labels.forEach((label,i)=>{
            if(i<cols) svg.appendChild(svgEl("text", { x:x0+i*colW, y:25, "text-anchor":"middle", fill:"#38bdf8", "font-size":"13", "font-family":"Arial, sans-serif" }, label));
        });
        gates.forEach(g => drawGate(svg, g, x0 + g.col*colW, y0, gap));
        container.innerHTML = "";
        container.appendChild(svg);
        stepLabel.textContent = `Крок ${current} / ${stages.length-1}`;
        stepInfo.textContent = stages[current].name;
        if (window.renderKuperberg2Stage) window.renderKuperberg2Stage(current);
        prev.disabled = current === 0;
        next.disabled = current === stages.length-1;
    }

    prev.addEventListener("click", () => render(current - 1));
    next.addEventListener("click", () => render(current + 1));
    full.addEventListener("click", () => render(stages.length - 1));

    window.showKuperberg2Circuit = function () {
        document.getElementById("circuit-generator").hidden = false;
        document.getElementById("algo-image").hidden = true;
        render(0);
    };
    render(0);
})();
