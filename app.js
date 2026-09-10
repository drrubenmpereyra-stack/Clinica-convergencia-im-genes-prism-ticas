// Configuración de Firebase provista
const firebaseConfig = {
    apiKey: "AIzaSyAd5dyriu-Z2Gms1Tq9u8A75LrQKHd0GC8",
    authDomain: "aplicacion1-c794d.firebaseapp.com",
    projectId: "aplicacion1-c794d",
    storageBucket: "aplicacion1-c794d.firebasestorage.app",
    messagingSenderId: "310699962592",
    appId: "1:310699962592:web:71794de4268e47b35da085",
    measurementId: "G-R3QHSGSNQB"
};

// Inicializar Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    const statusEl = document.getElementById('db-status');
    if (statusEl) statusEl.textContent = 'Base de datos Firebase conectada correctamente.';
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    const statusEl = document.getElementById('db-status');
    if (statusEl) statusEl.textContent = 'Error de conexión con Firebase.';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const linea1 = document.getElementById('linea-1');
    const linea2 = document.getElementById('linea-2');
    const linea3 = document.getElementById('linea-3');
    const outputDisplay = document.getElementById('output');

    // Estructura completa del menú jerárquico
    const menuData = {
        admin: {
            nombre: "1. Administración",
            claseSelect: "select-b1",
            hijos: [
                { nombre: "1.1 Pacientes", link: "pacientes.html" },
                { nombre: "1.2 Contabilidad", desc: "Módulo de gestión contable, honorarios y balance institucional." },
                { nombre: "1.3 Central formularios", desc: "Repositorio unificado de fichas clínicas y escalas estandarizadas." }
            ]
        },
        estrategias: {
            nombre: "2. Estrategias y Técnicas",
            claseSelect: "select-b2",
            hijos: [
                {
                    nombre: "2.1 Cartografía de la Intersubjetividad",
                    nietos: [
                        { nombre: "2.1.1 Aquí y ahora - HPA", link: "aqui_y_ahora.html" },
                        { nombre: "2.1.2 Validación empática como freno de emergencia", desc: "Técnica de regulación afectiva y freno de emergencia en desbordes." },
                        { nombre: "2.1.3 Monitoreo y uso contratransferencia somática", desc: "Lectura de marcadores somáticos del analista como brújula clínica." },
                        { nombre: "2.1.4 Encuadre, sincronización vocal, focusing e interpretación", desc: "Convergencia entre sincronía prosódica, focusing corporal e intervención." }
                    ]
                },
                {
                    nombre: "2.2 Memoria Traumática y el a posteriori",
                    nietos: [
                        { nombre: "2.2.1", desc: "Componente A de Memoria Traumática." },
                        { nombre: "2.2.2", desc: "Componente B de Memoria Traumática." }
                    ]
                },
                {
                    nombre: "2.3 Circuitos de recompensa",
                    nietos: [
                        { nombre: "2.3.1", desc: "Circuitos de recompensa - Subcomponente 1." },
                        { nombre: "2.3.2", desc: "Circuitos de recompensa - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.4 La interfaz cuerpo mente",
                    nietos: [
                        { nombre: "2.4.1", desc: "Interfaz cuerpo mente - Subcomponente 1." },
                        { nombre: "2.4.2", desc: "Interfaz cuerpo mente - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.5 Neurobiología de la repetición",
                    nietos: [
                        { nombre: "2.5.1", desc: "Neurobiología de la repetición - Subcomponente 1." },
                        { nombre: "2.5.2", desc: "Neurobiología de la repetición - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.6 Plasticidad simbólica y sináptica",
                    nietos: [
                        { nombre: "2.6.1", desc: "Plasticidad simbólica y sináptica - Subcomponente 1." },
                        { nombre: "2.6.2", desc: "Plasticidad simbólica y sináptica - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.7 Arquitectura del sueño y función alucinatoria",
                    nietos: [
                        { nombre: "2.7.1", desc: "Arquitectura del sueño - Subcomponente 1." },
                        { nombre: "2.7.2", desc: "Arquitectura del sueño - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.8 El Ello somático y T. Psicosomáticos",
                    nietos: [
                        { nombre: "2.8.1", desc: "Ello somático - Subcomponente 1." },
                        { nombre: "2.8.2", desc: "Ello somático - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.9 Focalización en estructuras límbicas",
                    nietos: [
                        { nombre: "2.9.1", desc: "Estructuras límbicas - Subcomponente 1." },
                        { nombre: "2.9.2", desc: "Estructuras límbicas - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.10 Ética de la singularidad en la era tecnológica",
                    nietos: [
                        { nombre: "2.10.1", desc: "Ética de la singularidad - Subcomponente 1." },
                        { nombre: "2.10.2", desc: "Ética de la singularidad - Subcomponente 2." }
                    ]
                }
            ]
        },
        especiales: {
            nombre: "3. Estrategias especiales I",
            claseSelect: "select-b3",
            hijos: [
                { 
                    nombre: "3.1 Situaciones de duelo", 
                    nietos: [
                        { nombre: "3.1.1", desc: "Duelo - Subcomponente 1." },
                        { nombre: "3.1.2", desc: "Duelo - Subcomponente 2." }
                    ]
                },
                { 
                    nombre: "3.2 Situaciones de crisis", 
                    nietos: [
                        { nombre: "3.2.1", desc: "Crisis - Subcomponente 1." },
                        { nombre: "3.2.2", desc: "Crisis - Subcomponente 2." }
                    ]
                },
                { 
                    nombre: "3.3 Situaciones de Suicidio", 
                    nietos: [
                        { nombre: "3.3.1", desc: "Suicidio - Subcomponente 1." },
                        { nombre: "3.3.2", desc: "Suicidio - Subcomponente 2." }
                    ]
                }
            ]
        },
        rubricas: {
            nombre: "4. Rúbricas de Consultas",
            claseSelect: "select-b4",
            hijos: [
                { nombre: "4.1 Escalas de Evaluación Clínica", desc: "Instrumentos estandarizados de medición." },
                { nombre: "4.2 Indicadores de Convergencia", desc: "Parámetros de evolución conjunta." }
            ]
        },
        historia: {
            nombre: "5. Historia Clínica",
            claseSelect: "select-b5",
            hijos: [
                { nombre: "5.1 Registro de Sesiones", desc: "Bitácora cronológica e intervenciones registradas." },
                { nombre: "5.2 Evoluciones y Notas Clínicas", desc: "Historial de progresos terapéuticos." }
            ]
        },
        salir: {
            nombre: "6. Salir",
            claseSelect: "select-b6",
            accion: () => ejecutarSalidaCinematografica()
        }
    };

    const btnLoginSubmit = loginForm.querySelector('button[type="submit"]');
    if (btnLoginSubmit) {
        btnLoginSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            procesarLogin();
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        procesarLogin();
    });

    function procesarLogin() {
        const usr = usernameInput.value.trim();
        const pwd = passwordInput.value.trim();

        if (usr === "DRPEREYRA" && pwd === "235689") {
            loginSection.classList.add('hidden');
            appSection.classList.remove('hidden');
            inicializarMenuPrincipal();
        } else {
            loginError.textContent = "Credenciales incorrectas. Verifique usuario y contraseña.";
        }
    }

    function inicializarMenuPrincipal() {
        linea1.innerHTML = '';
        linea2.innerHTML = '';
        linea3.innerHTML = '';

        const selectPrincipal = document.createElement('select');
        selectPrincipal.className = 'app-select select-b1';
        
        const defaultOpt = document.createElement('option');
        defaultOpt.value = "";
        defaultOpt.textContent = "-- Seleccione Categoría Principal --";
        selectPrincipal.appendChild(defaultOpt);

        Object.keys(menuData).forEach(key => {
            const item = menuData[key];
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = item.nombre;
            selectPrincipal.appendChild(opt);
        });

        selectPrincipal.addEventListener('change', (e) => {
            const key = e.target.value;
            linea2.innerHTML = '';
            linea3.innerHTML = '';

            if (!key) return;

            selectPrincipal.className = `app-select ${menuData[key].claseSelect || 'select-b1'}`;

            if (menuData[key].accion) {
                menuData[key].accion();
            } else if (menuData[key].hijos) {
                cargarSelectLinea2(menuData[key].hijos, menuData[key].claseSelect);
            }
        });

        linea1.appendChild(selectPrincipal);
    }

    function cargarSelectLinea2(hijos, clasePadre) {
        linea2.innerHTML = '';
        linea3.innerHTML = '';

        const selectL2 = document.createElement('select');
        selectL2.className = `app-select ${clasePadre || 'select-b2'}`;

        const defaultOpt = document.createElement('option');
        defaultOpt.value = "";
        defaultOpt.textContent = "-- Seleccione Subcategoría --";
        selectL2.appendChild(defaultOpt);

        hijos.forEach((hijo, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = hijo.nombre;
            selectL2.appendChild(opt);
        });

        selectL2.addEventListener('change', (e) => {
            const idx = e.target.value;
            linea3.innerHTML = '';

            if (idx === "") return;

            const hijoSeleccionado = hijos[idx];

            if (hijoSeleccionado.link) {
                mostrarIframe(hijoSeleccionado.link);
            } else if (hijoSeleccionado.desc) {
                mostrarTexto(hijoSeleccionado.nombre, hijoSeleccionado.desc);
            }

            if (hijoSeleccionado.nietos) {
                cargarSelectLinea3(hijoSeleccionado.nietos, clasePadre);
            }
        });

        linea2.appendChild(selectL2);
    }

    function cargarSelectLinea3(nietos, clasePadre) {
        linea3.innerHTML = '';

        const selectL3 = document.createElement('select');
        selectL3.className = `app-select ${clasePadre || 'select-b3'}`;

        const defaultOpt = document.createElement('option');
        defaultOpt.value = "";
        defaultOpt.textContent = "-- Seleccione Opción Final --";
        selectL3.appendChild(defaultOpt);

        nietos.forEach((nieto, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = nieto.nombre;
            selectL3.appendChild(opt);
        });

        selectL3.addEventListener('change', (e) => {
            const idx = e.target.value;
            if (idx === "") return;

            const nietoSeleccionado = nietos[idx];

            if (nietoSeleccionado.link) {
                mostrarIframe(nietoSeleccionado.link);
            } else if (nietoSeleccionado.desc) {
                mostrarTexto(nietoSeleccionado.nombre, nietoSeleccionado.desc);
            }
        });

        linea3.appendChild(selectL3);
    }

    function mostrarTexto(titulo, desc) {
        outputDisplay.innerHTML = `<strong>${titulo}</strong><br><span style="color:#d8b4fe;">${desc}</span>`;
    }

    function mostrarIframe(url) {
        outputDisplay.innerHTML = `
            <div style="width: 100%; height: 550px; overflow: hidden; background: transparent;">
                <iframe src="${url}" style="width: 100%; height: 100%; border: none; background: transparent;" title="Módulo Externo Independiente"></iframe>
            </div>
        `;
    }

    function ejecutarSalidaCinematografica() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, #181028 0%, #0a0612 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.8s ease-in-out;
            box-sizing: border-box;
            padding: 20px;
            text-align: center;
        `;

        overlay.innerHTML = `
            <style>
                @keyframes spinPrism {
                    0% { transform: rotate(0deg) scale(0.95); filter: drop-shadow(0 0 15px rgba(186,85,211,0.6)); }
                    50% { transform: rotate(180deg) scale(1.05); filter: drop-shadow(0 0 35px rgba(216,180,254,0.9)); }
                    100% { transform: rotate(360deg) scale(0.95); filter: drop-shadow(0 0 15px rgba(186,85,211,0.6)); }
                }
                @keyframes pulseWave {
                    0% { opacity: 0.3; transform: scale(0.9); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                    100% { opacity: 0.3; transform: scale(0.9); }
                }
                @keyframes textFadeUp {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .prism-svg {
                    width: 120px;
                    height: 120px;
                    animation: spinPrism 6s linear infinite;
                    margin-bottom: 25px;
                }
                .cinematic-text {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #f3e8ff;
                    font-size: 1.5rem;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    text-shadow: 0 0 20px rgba(186,85,211,0.8);
                    animation: textFadeUp 1.2s ease forwards;
                    max-width: 650px;
                    line-height: 1.4;
                }
            </style>
            <svg class="prism-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 90,80 10,80" stroke="#d8b4fe" stroke-width="2" stroke-linejoin="round" fill="rgba(186,85,211,0.15)" />
                <polygon points="50,30 75,70 25,70" stroke="#c084fc" stroke-width="1.5" stroke-linejoin="round" fill="rgba(160,32,240,0.2)" />
                <circle cx="50" cy="50" r="6" fill="#f3e8ff" style="animation: pulseWave 2s infinite ease-in-out;" />
                <line x1="50" y1="10" x2="50" y2="50" stroke="#e2b7ff" stroke-width="1" stroke-dasharray="3 3" />
            </svg>
            <div class="cinematic-text">Gracias por utilizar Visiones prismáticas Convergencia, hasta la próxima.</div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => { overlay.style.opacity = '1'; }, 50);

        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                location.reload();
            }, 800);
        }, 3500);
    }
});
