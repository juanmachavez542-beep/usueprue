// scripts/antibot.js
(function() {
    // 1. Honeypot Check
    const honeypot = document.getElementById('website_url');
    if (honeypot && honeypot.value !== '') {
        console.log('Bot detectado via Honeypot');
        document.body.innerHTML = ''; // Ocultar todo si es bot
        return;
    }

    // 2. JS Challenge (Simple Math o Time check)
    const startTime = Date.now();
    window.addEventListener('load', function() {
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        
        // Si carga en menos de 50ms, probablemente es un bot headless
        if (loadTime < 50) {
            console.log('Bot detectado via Load Time');
            // Opcional: redirigir a una página de error
        }

        // 3. Fingerprinting básico
        const fingerprint = {
            ua: navigator.userAgent,
            screen: `${window.screen.width}x${window.screen.height}`,
            colorDepth: window.screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
        };
        console.log('Fingerprint:', fingerprint);
    });

    // 4. Regex Anti-Spam en inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Regex para bloquear inyección de scripts o caracteres extraños masivos
            const spamRegex = /<script|javascript:|onerror=/i;
            if (spamRegex.test(this.value)) {
                this.value = this.value.replace(spamRegex, '');
                alert('Caracteres no válidos detectados');
            }
        });
    });
})();
