/**
 * Lógica de Auditoría Antifrágil y Ética Humana - Innovar UNTREF
 */

const AUTORES_BASE = ["codina", "universidad nacional de mar del plata", "untref", "unesco"];
const CONCEPTOS_BASE = ["ética", "integridad", "transparencia", "sesgo", "alucinación", "responsabilidad", "plagio", "pensamiento crítico"];
const NUCLEOS_REFLEXIVOS = ["considero", "discrepo", "mi análisis", "perspectiva", "juicio", "responsabilidad", "intervine", "modifiqué", "mi criterio", "decidí", "evalué"];

function calcularEntropia(texto) {
    if (!texto) return 0;
    const oraciones = texto.split(/[.!?]+/).map(o => o.trim()).filter(o => o.length > 5);
    if (oraciones.length < 2) return 50; 
    
    const longitudes = oraciones.map(o => o.split(/\s+/).length);
    const media = longitudes.reduce((acc, val) => acc + val, 0) / longitudes.length;
    const sumaDiferenciasCuadrado = longitudes.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
    const varianza = sumaDiferenciasCuadrado / longitudes.length;
    
    let score = (varianza / 30) * 100;
    return Math.min(Math.max(Math.round(score), 0), 100);
}

function validarFuentes(texto) {
    const regexCita = /\(([A-Za-záéíóúÁÉÍÓÚñÑ\s]+),\s*\d{4}\)/g;
    let match;
    let fuentesEncontradas = [];
    
    while ((match = regexCita.exec(texto)) !== null) {
        fuentesEncontradas.push(match[1].toLowerCase().trim());
    }
    
    if (fuentesEncontradas.length === 0) return { validez: 0, alertas: [] };

    let fuentesValidas = 0;
    let alertas = [];

    fuentesEncontradas.forEach(fuente => {
        const esValida = AUTORES_BASE.some(autor => fuente.includes(autor) || autor.includes(fuente));
        if (esValida) {
            fuentesValidas++;
        } else {
            alertas.push(`La fuente citada (${fuente}) no se encuentra en la matriz bibliográfica.`);
        }
    });

    const validez = Math.round((fuentesValidas / fuentesEncontradas.length) * 100);
    return { validez, alertas };
}

function validarConceptos(conceptosTexto) {
    const conceptosUsuario = conceptosTexto.toLowerCase();
    let encontrados = 0;
    CONCEPTOS_BASE.forEach(concepto => {
        if (conceptosUsuario.includes(concepto)) encontrados++;
    });
    return encontrados > 0 ? 100 : 0;
}

function validarEticaHumana(texto) {
    const textoLow = texto.toLowerCase();
    let reflexiones = 0;
    NUCLEOS_REFLEXIVOS.forEach(nucleo => {
        if (textoLow.includes(nucleo)) reflexiones++;
    });
    
    // Requiere al menos 2 núcleos reflexivos y longitud razonable
    const esReflexivo = reflexiones >= 2 && texto.length > 100;
    return { esReflexivo, score: esReflexivo ? 100 : (reflexiones > 0 ? 50 : 10) };
}

function procesarRelatoria(data) {
    let advertencias = [];

    // --- EVALUACIÓN HUMANA ---
    
    // 1. Integridad Humana (Negro)
    const tieneContenidoNegro = data.ideaCentral.length > 50 && data.problema.length > 50 && data.hipotesis.length > 50;
    const conceptosScore = validarConceptos(data.conceptos);
    let integridadHumana = tieneContenidoNegro ? 50 : 20;
    integridadHumana += (conceptosScore * 0.5);
    
    if (conceptosScore === 0) advertencias.push("Falta rigor teórico en Conceptos Críticos.");

    // 2. Adaptación Humana (Verde)
    const verdeStr = data.verde.toLowerCase();
    const catalizadorEsEtico = verdeStr.includes('adapt') || verdeStr.includes('transform') || verdeStr.includes('propia') || verdeStr.includes('ética');
    const adaptacionHumana = catalizadorEsEtico ? 100 : 40;
    if (!catalizadorEsEtico) advertencias.push("El Catalizador Ético debe explicar explícitamente tu intervención.");

    // 3. Crítica Humana (Evaluación de Ética Humana)
    const eticaHumana = validarEticaHumana(data.evaluacionEtica);
    const criticaHumana = eticaHumana.score;
    if (!eticaHumana.esReflexivo) advertencias.push("Evaluación Ética: Tu justificación carece de núcleos semánticos reflexivos. Profundiza por qué tu juicio es superior.");
    
    // Entropía Humana
    const entropiaHumana = calcularEntropia(data.verde + " " + data.evaluacionEtica);
    if (entropiaHumana < 15 && data.evaluacionEtica.length > 100) {
        advertencias.push("El ritmo de escritura en tu evaluación humana se asemeja al de un LLM.");
    }
    
    // Trazabilidad Humana (Prompt)
    const trazabilidadHumana = data.prompt.length > 20 ? 100 : 20;

    // --- EVALUACIÓN DE LA IA BASE ---
    
    const validacionFuentes = validarFuentes(data.rojo);
    if (validacionFuentes.alertas.length > 0) advertencias = advertencias.concat(validacionFuentes.alertas);
    
    // Integridad IA (depende de alucinaciones)
    let integridadIA = 80;
    if (data.iaCheckboxes.includes("alucinacion")) integridadIA = 20;
    
    // Crítica IA (depende de sesgos y neutralidad)
    let criticaIA = 50; // La IA suele ser neutral
    if (data.iaCheckboxes.includes("neutral")) criticaIA = 40;
    if (data.iaCheckboxes.includes("sesgo")) criticaIA = 10;
    
    // Adaptación IA (La IA no se adapta éticamente, genera de cero)
    let adaptacionIA = 30;
    
    // Trazabilidad IA
    let trazabilidadIA = data.iaCheckboxes.includes("transparencia") ? 80 : 30;
    
    // SCORE DE INTEGRIDAD TOTAL
    // (Calidad Relatoría + Auditoría + Ética Humana) / 3
    const scoreTotal = Math.round((integridadHumana + adaptacionHumana + criticaHumana) / 3);

    return {
        scoresHumano: {
            integridad: Math.min(integridadHumana, 100),
            critica: Math.min(criticaHumana, 100),
            trazabilidad: trazabilidadHumana,
            adaptacion: adaptacionHumana
        },
        scoresIA: {
            integridad: integridadIA,
            critica: criticaIA,
            trazabilidad: trazabilidadIA,
            adaptacion: adaptacionIA
        },
        scoreTotal: scoreTotal,
        advertencias: advertencias
    };
}
