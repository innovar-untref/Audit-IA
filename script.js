function auditar() {
    const rojo = document.getElementById('rojo').value;
    const esAntifragil = (rojo.length > 50 && (rojo.includes('sesgo') || rojo.includes('error')));
    
    document.getElementById('dashboard').style.display = 'block';
    new Chart(document.getElementById('myChart'), {
        type: 'radar',
        data: {
            labels: ['Integridad', 'Crítica', 'Trazabilidad', 'Adaptación'],
            datasets: [{ label: 'Score de Auditoría', data: [esAntifragil ? 90 : 40, 80, 95, 70], backgroundColor: 'rgba(0, 51, 102, 0.2)' }]
        }
    });
    document.getElementById("qr-container").innerHTML = "";
    new QRCode(document.getElementById("qr-container"), { text: "Auditoria:" + document.getElementById('titulo').value, width: 100, height: 100 });
}
