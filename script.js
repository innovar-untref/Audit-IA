let chartInstance = null;

function cargarEjemplo() {
    document.getElementById('titulo').value = "El sesgo algorítmico en la evaluación universitaria";
    
    document.getElementById('idea-central').value = "La evaluación mediante IA tiende a estandarizar el pensamiento crítico, invisibilizando la divergencia cognitiva del estudiante.";
    document.getElementById('problema-autor').value = "Codina expone que la delegación acrítica de funciones evaluativas erosiona el rol pedagógico.";
    document.getElementById('hipotesis').value = "El uso de IA sin catalizador ético produce un 'efecto eco' que premia la homogeneidad por sobre la innovación.";
    document.getElementById('hipotesis-auxiliares').value = "1. Los LLMs promedian la creatividad. 2. Los estudiantes adaptan su estilo para complacer al algoritmo.";
    document.getElementById('conceptos-criticos').value = "Ética, sesgo algorítmico, integridad académica, pensamiento crítico.";
    document.getElementById('consenso-disenso').value = "Consenso con Codina respecto a la responsabilidad intransferible del autor.";
    
    document.getElementById('uso-ia-relatoria').value = "si_parcial";
    document.getElementById('modelo-usado').value = "chatgpt";
    
    document.getElementById('prompt').value = "Actúa como un experto en pedagogía. Enumera 3 problemas del uso de IA en la evaluación universitaria. Responde en 2 párrafos.";
    
    document.getElementById('rojo').value = "El uso de la Inteligencia Artificial en la evaluación universitaria presenta desafíos significativos. En primer lugar, la IA puede introducir sesgos algorítmicos si ha sido entrenada con datos no representativos, lo que afecta la equidad de las calificaciones. En segundo lugar, existe el riesgo de alucinaciones donde el sistema inventa respuestas. Como señala (Codina, 2023), esto puede generar un falso sentido de objetividad matemática en un proceso que es inherentemente humano cualitativo.";
    
    document.getElementById('ia-sesgo').checked = true;
    document.getElementById('ia-neutral').checked = true;

    document.getElementById('verde').value = "Tomé la estructura de GPT-4 y transformé sus argumentos neutros incorporando mi propia postura. Apliqué las guías del Protocolo de uso de IA de la UNTREF.";
    
    document.getElementById('evaluacion-etica').value = "Mi análisis humano es superior porque el modelo ofrece una visión plana y estandarizada. Yo consideré el contexto real del aula en la UNTREF. Intervine el texto para darle responsabilidad ética, ya que discrepo con la objetividad matemática que sugiere la máquina. Mi criterio es indelegable.";
    document.getElementById('meta-prompt').value = "";
    document.getElementById('contenedor-modelos').classList.add('hidden');
    document.getElementById('btn-generar-meta').disabled = false;
    document.getElementById('btn-generar-meta').textContent = "1. Generar Meta-Prompt de Auditoría";
}

function generarMetaPromptAnimado() {
    const textoRojo = document.getElementById('rojo').value.trim();
    if (!textoRojo) {
        alert("El Contenedor Rojo está vacío. Por favor, ingresa el output de la IA primero para generar el meta-prompt.");
        return;
    }
    
    const metaPrompt = `Actúa como auditor experto en integridad académica. Analiza críticamente el siguiente texto, detecta alucinaciones, sesgos ideológicos, clichés sintácticos y falta de fuentes veraces. Compara el contenido con normas académicas internacionales: ${textoRojo}`;
    
    const textArea = document.getElementById('meta-prompt');
    const btn = document.getElementById('btn-generar-meta');
    
    btn.disabled = true;
    btn.textContent = "Generando...";
    textArea.value = "";
    
    let i = 0;
    const speed = 10; // milisegundos por caracter
    
    function typeWriter() {
        if (i < metaPrompt.length) {
            textArea.value += metaPrompt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            btn.textContent = "¡Meta-Prompt Generado!";
            document.getElementById('contenedor-modelos').classList.remove('hidden');
            document.getElementById('btn-copiar-prompt').classList.remove('hidden');
        }
    }
    
    typeWriter();
}

function copiarPromptSolo() {
    const metaPrompt = document.getElementById('meta-prompt').value;
    navigator.clipboard.writeText(metaPrompt).then(() => {
        const btn = document.getElementById('btn-copiar-prompt');
        const originalText = btn.innerHTML;
        btn.innerHTML = "✅ ¡Copiado!";
        setTimeout(() => btn.innerHTML = originalText, 2000);
    }).catch(err => {
        alert("Error al copiar: " + err);
    });
}

function copiarYAbrir(url) {
    const metaPrompt = document.getElementById('meta-prompt').value;
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(metaPrompt).then(() => {
        // Redirigir a la URL del modelo
        window.open(url, '_blank');
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
        alert("No se pudo copiar automáticamente. Por favor, cópialo manualmente de la caja de texto.");
        window.open(url, '_blank');
    });
}

function verificarDeclaracion() {
    const isChecked = document.getElementById('declaracion-jurada').checked;
    const btnPdf = document.getElementById('btn-export-pdf');
    if (isChecked) {
        btnPdf.classList.remove('disabled');
        btnPdf.removeAttribute('disabled');
    } else {
        btnPdf.classList.add('disabled');
        btnPdf.setAttribute('disabled', 'true');
    }
}

function auditar() {
    const data = {
        titulo: document.getElementById('titulo').value.trim(),
        ideaCentral: document.getElementById('idea-central').value.trim(),
        problema: document.getElementById('problema-autor').value.trim(),
        hipotesis: document.getElementById('hipotesis').value.trim(),
        hipotesisAux: document.getElementById('hipotesis-auxiliares').value.trim(),
        conceptos: document.getElementById('conceptos-criticos').value.trim(),
        consenso: document.getElementById('consenso-disenso').value.trim(),
        usoIARelatoria: document.getElementById('uso-ia-relatoria').value,
        modeloUsado: document.getElementById('modelo-usado').value,
        prompt: document.getElementById('prompt').value.trim(),
        rojo: document.getElementById('rojo').value.trim(),
        verde: document.getElementById('verde').value.trim(),
        evaluacionEtica: document.getElementById('evaluacion-etica').value.trim()
    };

    // Validación de campos vacíos
    for (const key in data) {
        if (data[key] === "") {
            alert("Por favor, completa todos los campos (incluyendo la Evaluación de Ética Humana) antes de auditar.");
            return;
        }
    }

    const iaCheckboxes = [];
    if(document.getElementById('ia-transparencia').checked) iaCheckboxes.push('transparencia');
    if(document.getElementById('ia-sesgo').checked) iaCheckboxes.push('sesgo');
    if(document.getElementById('ia-alucinacion').checked) iaCheckboxes.push('alucinacion');
    if(document.getElementById('ia-neutral').checked) iaCheckboxes.push('neutral');
    
    data.iaCheckboxes = iaCheckboxes;

    const resultado = procesarRelatoria(data);
    
    // Alertas
    const alertasContainer = document.getElementById('alertas-pedagogicas');
    const listaAlertas = document.getElementById('lista-alertas');
    listaAlertas.innerHTML = "";
    
    if (resultado.advertencias.length > 0) {
        alertasContainer.classList.remove('hidden');
        resultado.advertencias.forEach(adv => {
            const li = document.createElement('li');
            li.textContent = adv;
            listaAlertas.appendChild(li);
        });
    } else {
        alertasContainer.classList.add('hidden');
    }

    // Resumen Crítico
    const resumenTexto = `La relatoría analizada obtiene un Score de Integridad de ${resultado.scoreTotal}/100. ` +
        (resultado.scoreTotal >= 80 ? `Se evidencia una fuerte apropiación crítica y uso ético de la Inteligencia Artificial. ` : 
        (resultado.scoreTotal >= 50 ? `El proceso muestra un nivel aceptable de integridad, aunque con áreas de mejora en la justificación y trazabilidad. ` : 
        `Se detectan deficiencias significativas en el uso transparente y ético de la IA, requiriendo revisión profunda. `)) +
        (resultado.advertencias.length > 0 ? `Se registraron ${resultado.advertencias.length} advertencias pedagógicas a considerar.` : `No se detectaron anomalías mayores en la auditoría.`);
        
    document.getElementById('resumen-critico-texto').textContent = resumenTexto;

    document.getElementById('dashboard').style.display = 'block';
    
    // Score Badge
    const scoreBadge = document.getElementById('score-total');
    scoreBadge.textContent = `${resultado.scoreTotal}/100`;
    if (resultado.scoreTotal > 80) scoreBadge.style.backgroundColor = 'var(--accent-green)';
    else if (resultado.scoreTotal > 50) scoreBadge.style.backgroundColor = 'var(--untref-gold)';
    else scoreBadge.style.backgroundColor = 'var(--accent-red)';
    
    // Radar Dual
    if (chartInstance) chartInstance.destroy();
    
    chartInstance = new Chart(document.getElementById('myChart'), {
        type: 'radar',
        data: {
            labels: ['Integridad', 'Crítica', 'Trazabilidad', 'Adaptación'],
            datasets: [
                {
                    label: 'Intervención Ética Humana',
                    data: [
                        resultado.scoresHumano.integridad,
                        resultado.scoresHumano.critica,
                        resultado.scoresHumano.trazabilidad,
                        resultado.scoresHumano.adaptacion
                    ],
                    backgroundColor: 'rgba(46, 125, 50, 0.4)', // Verde
                    borderColor: 'rgba(46, 125, 50, 1)',
                    pointBackgroundColor: 'rgba(46, 125, 50, 1)'
                },
                {
                    label: 'Base IA Generativa',
                    data: [
                        resultado.scoresIA.integridad,
                        resultado.scoresIA.critica,
                        resultado.scoresIA.trazabilidad,
                        resultado.scoresIA.adaptacion
                    ],
                    backgroundColor: 'rgba(198, 40, 40, 0.2)', // Rojo
                    borderColor: 'rgba(198, 40, 40, 1)',
                    pointBackgroundColor: 'rgba(198, 40, 40, 1)'
                }
            ]
        },
        options: {
            scales: { r: { angleLines: { display: true }, suggestedMin: 0, suggestedMax: 100 } },
            animation: false // Desactivar animación para captura instantánea en PDF
        }
    });

    // QR
    document.getElementById("qr-container").innerHTML = "";
    const qrData = `Audit-IA | Título: ${data.titulo} | Score Final: ${resultado.scoreTotal} | DJ: Firmada | Fecha: ${new Date().toISOString().split('T')[0]}`;
    new QRCode(document.getElementById("qr-container"), { 
        text: qrData, width: 120, height: 120, colorDark: "#003366", colorLight: "#ffffff"
    });
}

function generarPDF() {
    if(!document.getElementById('declaracion-jurada').checked) {
        alert("Debes aceptar la Declaración Ética Obligatoria para generar el reporte.");
        return;
    }

    // Construir estructura estructurada para el PDF temporal
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = "40px";
    tempDiv.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
    tempDiv.style.color = "#333";
    tempDiv.style.background = "#fff";
    tempDiv.style.width = "800px";
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-9999px";
    tempDiv.style.left = "-9999px";
    
    // Encabezado Institucional
    tempDiv.innerHTML = `
        <h1 style="color:#002c5c; text-align:center;">UNTREF - Auditoría Pedagógica</h1>
        <h2 style="text-align:center; margin-bottom: 30px;">Protocolo de Integridad</h2>
        <h3>Título: ${document.getElementById('titulo').value}</h3>
        <hr>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color:#222; border-left:4px solid #222; padding-left:10px;">Relatoría Argumentativa</h3>
            <p><strong>Idea Central:</strong> ${document.getElementById('idea-central').value}</p>
            <p><strong>Problema del Autor:</strong> ${document.getElementById('problema-autor').value}</p>
            <p><strong>Hipótesis:</strong> ${document.getElementById('hipotesis').value}</p>
            <p><strong>Conceptos Críticos:</strong> ${document.getElementById('conceptos-criticos').value}</p>
        </div>
        <hr>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color:#0288d1; border-left:4px solid #0288d1; padding-left:10px;">Declaración de Uso Previo de IA</h3>
            <p><strong>Uso de IA en Relatoría:</strong> ${document.getElementById('uso-ia-relatoria').options[document.getElementById('uso-ia-relatoria').selectedIndex].text}</p>
            <p><strong>Modelo(s) Utilizado(s):</strong> ${document.getElementById('modelo-usado').options[document.getElementById('modelo-usado').selectedIndex].text}</p>
        </div>
        <hr>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color:#c62828; border-left:4px solid #c62828; padding-left:10px;">Auditoría Ética de la IA</h3>
            <p><strong>Output Base IA:</strong> ${document.getElementById('rojo').value}</p>
            <p><strong>Evaluación Ética Humana:</strong> ${document.getElementById('evaluacion-etica').value}</p>
        </div>
        <hr>

        <div style="margin-bottom: 20px; padding: 15px; background: #fdfbf7; border-left: 5px solid #d4af37; border-radius: 6px;">
            <h3 style="color:#002c5c; margin-top:0;">Resumen Crítico de Auditoría</h3>
            <p>${document.getElementById('resumen-critico-texto').textContent}</p>
        </div>
        <hr>

        <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <h3 style="color:#002c5c;">Declaración de uso de IAG y Citas APA</h3>
            <p><em>"La IAG es un recurso institucional. Su uso debe ser transparente, siguiendo normas APA, y nunca debe reemplazar el proceso de aprendizaje autónomo."</em></p>
            <p><strong>Score de Integridad del Proceso: ${document.getElementById('score-total').textContent}</strong></p>
        </div>
    `;

    document.body.appendChild(tempDiv);

    // Clonar canvas
    const canvas = document.getElementById('myChart');
    const imgData = canvas.toDataURL("image/png");
    const img = document.createElement('img');
    img.src = imgData;
    img.style.width = "400px";
    img.style.display = "block";
    img.style.margin = "0 auto";
    
    const divGrafico = document.createElement('div');
    divGrafico.style.textAlign = "center";
    divGrafico.style.pageBreakInside = "avoid";
    divGrafico.appendChild(img);
    tempDiv.appendChild(divGrafico);

    // Clonar QR
    const qrCanvas = document.querySelector('#qr-container canvas');
    if (qrCanvas) {
        const qrImgData = qrCanvas.toDataURL("image/png");
        const qrImg = document.createElement('img');
        qrImg.src = qrImgData;
        qrImg.style.width = "120px";
        qrImg.style.display = "block";
        qrImg.style.margin = "20px auto 0 auto";
        
        const divQR = document.createElement('div');
        divQR.style.textAlign = "center";
        divQR.style.pageBreakInside = "avoid";
        divQR.appendChild(qrImg);
        tempDiv.appendChild(divQR);
    }

    const opt = {
        margin:       15,
        filename:     'Auditoria_CrossModel_UNTREF.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const btnPdf = document.getElementById('btn-export-pdf');
    const originalText = btnPdf.textContent;
    btnPdf.textContent = "Generando PDF...";
    btnPdf.classList.add('disabled');
    btnPdf.disabled = true;

    // Usar setTimeout para asegurar que el DOM se haya actualizado y las imágenes cargadas
    setTimeout(() => {
        html2pdf().set(opt).from(tempDiv).save().then(() => {
            document.body.removeChild(tempDiv);
            btnPdf.textContent = originalText;
            btnPdf.classList.remove('disabled');
            btnPdf.disabled = false;
        }).catch(err => {
            console.error(err);
            document.body.removeChild(tempDiv);
            btnPdf.textContent = originalText;
            btnPdf.classList.remove('disabled');
            btnPdf.disabled = false;
            alert("Hubo un error al generar el PDF.");
        });
    }, 800);
}
