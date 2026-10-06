/* Програмний генератор навчальної 4-кубітної схеми Куперберга.
   SVG створюється безпосередньо у браузері, без Python та без PNG для схеми. */
(function () {
    const NS = "http://www.w3.org/2000/svg";
    const info = document.getElementById("circuit4-stage-info");
    const label = document.getElementById("circuit4-step");
    const container = document.getElementById("circuit4-container");
    const prev = document.getElementById("circuit4-prev");
    const next = document.getElementById("circuit4-next");
    const full = document.getElementById("circuit4-full");
    if (!info || !label || !container || !prev || !next || !full) return;

    const stages = [
        { name: "Початок: чотири кубіти |0000⟩", gates: [] },
        { name: "Крок 1: створення суперпозиції — H на всіх 4 кубітах", gates: [
            {type:"H",q:0,col:0},{type:"H",q:1,col:0},{type:"H",q:2,col:0},{type:"H",q:3,col:0}
        ]},
        { name: "Крок 2: структурне перетворення — каскад CNOT", gates: [
            {type:"H",q:0,col:0},{type:"H",q:1,col:0},{type:"H",q:2,col:0},{type:"H",q:3,col:0},
            {type:"CNOT",control:0,target:2,col:1},{type:"CNOT",control:1,target:3,col:1},
            {type:"CNOT",control:0,target:1,col:2},{type:"CNOT",control:2,target:3,col:2}
        ]},
        { name: "Крок 3: фазове просіювання — P(π/2), P(π/4), P(π/8), P(π/16) та CZ", gates: [
            {type:"H",q:0,col:0},{type:"H",q:1,col:0},{type:"H",q:2,col:0},{type:"H",q:3,col:0},
            {type:"CNOT",control:0,target:2,col:1},{type:"CNOT",control:1,target:3,col:1},
            {type:"CNOT",control:0,target:1,col:2},{type:"CNOT",control:2,target:3,col:2},
            {type:"P(π/2)",q:0,col:3},{type:"P(π/4)",q:1,col:3},{type:"P(π/8)",q:2,col:3},{type:"P(π/16)",q:3,col:3},
            {type:"CZ",control:0,target:2,col:4},{type:"CZ",control:1,target:3,col:4}
        ]},
        { name: "Крок 4: фінальна інтерференція — H та вимірювання", gates: [
            {type:"H",q:0,col:0},{type:"H",q:1,col:0},{type:"H",q:2,col:0},{type:"H",q:3,col:0},
            {type:"CNOT",control:0,target:2,col:1},{type:"CNOT",control:1,target:3,col:1},
            {type:"CNOT",control:0,target:1,col:2},{type:"CNOT",control:2,target:3,col:2},
            {type:"P(π/2)",q:0,col:3},{type:"P(π/4)",q:1,col:3},{type:"P(π/8)",q:2,col:3},{type:"P(π/16)",q:3,col:3},
            {type:"CZ",control:0,target:2,col:4},{type:"CZ",control:1,target:3,col:4},
            {type:"H",q:0,col:5},{type:"H",q:1,col:5},{type:"H",q:2,col:5},{type:"H",q:3,col:5},
            {type:"M",q:0,col:6},{type:"M",q:1,col:6},{type:"M",q:2,col:6},{type:"M",q:3,col:6}
        ]}
    ];

    let current = 0;
    function el(tag, attrs, text) {
        const node = document.createElementNS(NS, tag);
        Object.entries(attrs || {}).forEach(([k,v]) => node.setAttribute(k,v));
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function drawGate(svg, gate, x, y0, gap) {
        if (gate.type === "CNOT" || gate.type === "CZ") {
            const y1 = y0 + gate.control * gap;
            const y2 = y0 + gate.target * gap;
            svg.appendChild(el("line", {x1:x,y1:y1,x2:x,y2:y2,stroke:"#38bdf8","stroke-width":"3"}));
            svg.appendChild(el("circle", {cx:x,cy:y1,r:7,fill:"#38bdf8"}));
            if (gate.type === "CNOT") {
                svg.appendChild(el("circle", {cx:x,cy:y2,r:14,fill:"none",stroke:"#38bdf8","stroke-width":"3"}));
                svg.appendChild(el("line", {x1:x,y1:y2-14,x2:x,y2:y2+14,stroke:"#38bdf8","stroke-width":"3"}));
                svg.appendChild(el("line", {x1:x-14,y1:y2,x2:x+14,y2:y2,stroke:"#38bdf8","stroke-width":"3"}));
            } else {
                svg.appendChild(el("circle", {cx:x,cy:y2,r:10,fill:"#070c18",stroke:"#38bdf8","stroke-width":"3"}));
            }
            return;
        }
        const y = y0 + gate.q * gap;
        const width = gate.type.startsWith("P(") ? 82 : 50;
        svg.appendChild(el("rect", {x:x-width/2,y:y-21,width:width,height:42,rx:6,fill:"#0b1120",stroke:"#38bdf8","stroke-width":"2"}));
        svg.appendChild(el("text", {x:x,y:y+5,"text-anchor":"middle",fill:"#fff","font-size":"13","font-family":"Arial, sans-serif","font-weight":"700"}, gate.type));
    }

    function render(step) {
        current = Math.max(0, Math.min(stages.length - 1, step));
        const y0 = 70, gap = 55, x0 = 165, colW = 112;
        const width = 990, height = 300;
        const svg = el("svg", {viewBox:`0 0 ${width} ${height}`,role:"img","aria-label":"Програмно створена квантова схема Куперберга-4"});
        svg.appendChild(el("rect", {x:0,y:0,width:width,height:height,rx:8,fill:"#050911"}));
        for (let q=0;q<4;q++) {
            const y=y0+q*gap;
            svg.appendChild(el("text", {x:25,y:y+6,fill:"#cbd5e1","font-size":"16","font-family":"Arial, sans-serif"}, `q${q}`));
            svg.appendChild(el("line", {x1:65,y1:y,x2:925,y2:y,stroke:"#64748b","stroke-width":"2"}));
            svg.appendChild(el("text", {x:940,y:y+6,fill:"#94a3b8","font-size":"14","font-family":"Arial, sans-serif"}, "M"));
        }
        ["Superposition","Cascade","Oracle","Phase","CZ","Interference","Measure"].forEach((t,i)=>{
            svg.appendChild(el("text", {x:x0+i*colW,y:24,"text-anchor":"middle",fill:"#38bdf8","font-size":"12","font-family":"Arial, sans-serif"}, t));
        });
        stages[current].gates.forEach(g => drawGate(svg,g,x0+g.col*colW,y0,gap));
        container.innerHTML="";
        container.appendChild(svg);
        label.textContent=`Крок ${current} / ${stages.length-1}`;
        info.textContent=stages[current].name;
        if (window.renderKuperberg4Stage) window.renderKuperberg4Stage(current);
        prev.disabled=current===0;
        next.disabled=current===stages.length-1;
    }

    prev.addEventListener("click",()=>render(current-1));
    next.addEventListener("click",()=>render(current+1));
    full.addEventListener("click",()=>render(stages.length-1));
    window.showKuperberg4Circuit=function(){
        document.getElementById("circuit4-generator").hidden=false;
        render(0);
    };
    render(0);
})();
