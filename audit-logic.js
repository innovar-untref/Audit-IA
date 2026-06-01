/**
 * Lógica de Auditoría Antifrágil - Innovar UNTREF
 * Evalúa si el estudiante ha ejercido su ética y pensamiento crítico.
 */

function procesarRelatoria(data) {
    const { negro, verde, rojo, modelo, origen } = data;

    // 1. Análisis de Autoría (Negro)
    const autoríaScore = negro.length > 300 ? 40 : 10;

    // 2. Análisis del Catalizador Ético (Verde)
    // El estudiante debe explicar cómo adaptó la idea de la IA a su pensamiento.
    const catalizadorEsEtico = verde.toLowerCase().includes('adapt') || 
                               verde.toLowerCase().includes('transform') || 
                               verde.toLowerCase().includes('mi propia');
    const verdeScore = catalizadorEsEtico ? 30 : 0;

    // 3. Análisis de Auditoría (Rojo)
    // El estudiante debe auditar, no solo pegar.
    const auditoriaEsCritica = rojo.toLowerCase().includes('error') || 
                               rojo.toLowerCase().includes('sesgo') || 
                               rojo.toLowerCase().includes('hallazgo');
    const rojoScore = auditoriaEsCritica ? 30 : 0;

    const total = autoríaScore + verdeScore + rojoScore;

    return {
        score: total,
        estado: total >= 80 ? "ANTIFRÁGIL" : (total >= 50 ? "ROBUSTO" : "FRÁGIL"),
        feedback: catalizadorEsEtico ? 
            "Tu integración de ideas externas refleja una ética sólida." : 
            "Atención: El catalizador debe reflejar cómo transformaste la idea externa en pensamiento propio."
    };
}
