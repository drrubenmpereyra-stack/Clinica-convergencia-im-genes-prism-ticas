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
    console.log("Firebase conectado exitosamente.");
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const appContainer = document.getElementById('app-container');
    const userInput = document.getElementById('user-input');
    const passInput = document.getElementById('pass-input');
    const btnLogin = document.getElementById('btn-login');
    const loginError = document.getElementById('login-error');

    const fila1 = document.getElementById('fila-1');
    const fila2 = document.getElementById('fila-2');
    const fila3 = document.getElementById('fila-3');
    const contenidoPrincipal = document.getElementById('contenido-principal');
    const despedidaOverlay = document.getElementById('despedida-overlay');

    // Validación de Login
    btnLogin.addEventListener('click', realizarLogin);
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') realizarLogin();
    });

    function realizarLogin() {
        const usuario = userInput.value.trim();
        const password = passInput.value.trim();

        if (usuario === "DRPEREYRA" && password === "235689") {
            loginOverlay.style.display = 'none';
            appContainer.style.display = 'block';
            inicializarApp();
        } else {
            loginError.style.display = 'block';
        }
    }

    // Estructura completa de la botonera y navegación
    const menuData = {
        admin: {
            titulo: "1. Administración",
            botonesFila2: [
                { texto: '1.1 Pacientes', link: 'pacientes.html' },
                { texto: '1.2 Contabilidad', vista: { titulo: '1.2 Contabilidad', desc: 'Módulo de gestión contable, honorarios y balance institucional.' } },
                { texto: '1.3 Central formularios', vista: { titulo: '1.3 Central Formularios', desc: 'Repositorio unificado de fichas clínicas y escalas estandarizadas.' } }
            ]
        },
        estrategias: {
            titulo: "2. Estrategias y Técnicas",
            botonesFila2: [
                { texto: '2.1 Cartografía de la Intersubjetividad', subgrupo: 'cartografia' },
                { texto: '2.2 Memoria Traumática y el a posteriori', subgrupo: 'memoria' },
                { texto: '2.3 Circuitos de recompensa', subgrupo: 'recompensa' },
                { texto: '2.4 La interfaz cuerpo mente', subgrupo: 'cuerpomente' },
                { texto: '2.5 Neurobiología de la repetición', subgrupo: 'repeticion' },
                { texto: '2.6 Plasticidad simbólica y sináptica', subgrupo: 'plasticidad' },
                { texto: '2.7 Arquitectura del sueño y función alucinatoria', subgrupo: 'sueno' },
                { texto: '2.8 El Ello somático y T. Psicosomáticos', subgrupo: 'ello' },
                { texto: '2.9 Focalización en estructuras límbicas', subgrupo: 'limbicas' },
                { texto: '2.10 Ética de la singularidad en la era tecnológica', subgrupo: 'etica' }
            ],
            subgrupos: {
                cartografia: [
                    { texto: '2.1.1 Aquí y ahora - HPA', link: 'aqui_y_ahora.html' },
                    { texto: '2.1.2 Validación empática como freno de emergencia', vista: { titulo: '2.1.2 Validación Empática', desc: 'Técnica de regulación afectiva y freno de emergencia en desbordes.' } },
                    { texto: '2.1.3 Monitoreo y uso contratransferencia somática', vista: { titulo: '2.1.3 Contratransferencia Somática', desc: 'Lectura de marcadores somáticos del analista como brújula clínica.' } },
                    { texto: '2.1.4 Encuadre, sincronización vocal, focusing e interpretación', vista: { titulo: '2.1.4 Encuadre y Focusing', desc: 'Convergencia entre sincronía prosódica, focusing corporal e intervención analítica.' } }
                ],
                memoria: [
                    { texto: '2.2.1 [Configuración pendiente]', vista: { titulo: '2.2.1 Memoria Traumática - Componente A', desc: 'Módulo en desarrollo para procesamiento de huellas mnémicas.' } },
                    { texto: '2.2.2 [Configuración pendiente]', vista: { titulo: '2.2.2 Memoria Traumática - Componente B', desc: 'Módulo en desarrollo para reestructuración del a posteriori.' } }
                ],
                recompensa: [
                    { texto: '2.3.1 [Configuración pendiente]', vista: { titulo: '2.3.1 Circuitos de Recompensa - Dopamina', desc: 'Abordaje de la desregulación hedónica y circuitos dopaminérgicos.' } },
                    { texto: '2.3.2 [Configuración pendiente]', vista: { titulo: '2.3.2 Circuitos de Recompensa - Regulación', desc: 'Estrategias de modulación del deseo y habituación.' } }
                ],
                cuerpomente: [
                    { texto: '2.4.1 [Configuración pendiente]', vista: { titulo: '2.4.1 Interfaz Cuerpo Mente - Somatización', desc: 'Mapeo de la traducción somatosensorial.' } },
                    { texto: '2.4.2 [Configuración pendiente]', vista: { titulo: '2.4.2 Interfaz Cuerpo Mente - Alexitimia', desc: 'Abordaje de pacientes con déficit en simbolización afectiva.' } }
                ],
                repeticion: [
                    { texto: '2.5.1 [Configuración pendiente]', vista: { titulo: '2.5.1 Neurobiología de la Repetición - Automatismos', desc: 'Estudio de surcos sinápticos consolidados y compulsión.' } },
                    { texto: '2.5.2 [Configuración pendiente]', vista: { titulo: '2.5.2 Neurobiología de la Repetición - Plasticidad Activa', desc: 'Protocolos de interrupción del circuito repetitivo.' } }
                ],
                plasticidad: [
                    { texto: '2.6.1 [Configuración pendiente]', vista: { titulo: '2.6.1 Plasticidad Simbólica y Sináptica - Metáfora', desc: 'Impacto de la intervención significante en la neurogénesis.' } },
                    { texto: '2.6.2 [Configuración pendiente]', vista: { titulo: '2.6.2 Plasticidad Simbólica y Sináptica - Consolidación', desc: 'Fijación de nuevas redes asociativas.' } }
                ],
                sueno: [
                    { texto: '2.7.1 [Configuración pendiente]', vista: { titulo: '2.7.1 Arquitectura del Sueño - MOR y Procesamiento', desc: 'Rol del sueño REM en la metabolización afectiva.' } },
                    { texto: '2.7.2 [Configuración pendiente]', vista: { titulo: '2.7.2 Función Alucinatoria - Onirismo Despierto', desc: 'Capacidad representacional y ensoñación.' } }
                ],
                ello: [
                    { texto: '2.8.1 [Configuración pendiente]', vista: { titulo: '2.8.1 Ello Somático - Pulsión y Biología', desc: 'Anclaje biológico de las mociones pulsionales.' } },
                    { texto: '2.8.2 [Configuración pendiente]', vista: { titulo: '2.8.2 Trastornos Psicosomáticos - Clínica del Órgano', desc: 'Abordaje convergente de patologías somáticas severas.' } }
                ],
                limbicas: [
                    { texto: '2.9.1 [Configuración pendiente]', vista: { titulo: '2.9.1 Focalización en Estructuras Límbicas - Amígdala', desc: 'Regulación de reactividad amigdalina.' } },
                    { texto: '2.9.2 [Configuración pendiente]', vista: { titulo: '2.9.2 Focalización en Estructuras Límbicas - Hipocampo', desc: 'Integración contextual de memorias emocionales.' } }
                ],
                etica: [
                    { texto: '2.10.1 [Configuración pendiente]', vista: { titulo: '2.10.1 Ética de la Singularidad - Era Digital', desc: 'Sujeto y subjetividad en entornos algorítmicos.' } },
                    { texto: '2.10.2 [Configuración pendiente]', vista: { titulo: '2.10.2 Ética de la Singularidad - Intimidad', desc: 'Preservación del psiquismo frente a la hiperconectividad.' } }
                ]
            }
        },
        especiales: {
            titulo: "3. Estrategias especiales I",
            botonesFila2: [
                { texto: '3.1 Situaciones de duelo', vista: { titulo: '3.1 Situaciones de Duelo', desc: 'Protocolos de elaboración y duelo patológico.' } },
                { texto: '3.1.1 [Subcomponente Duelo A]', vista: { titulo: '3.1.1 Duelo Agudo y Respuesta Somática', desc: 'Contención en fase aguda.' } },
                { texto: '3.1.2 [Subcomponente Duelo B]', vista: { titulo: '3.1.2 Duelo Crónico y Melancolización', desc: 'Abordaje estructural.' } },
                { texto: '3.2 Situaciones de crisis', vista: { titulo: '3.2 Situaciones de Crisis', desc: 'Intervención temprana en crisis subjetivas agudas.' } },
                { texto: '3.2.1 [Subcomponente Crisis A]', vista: { titulo: '3.2.1 Evaluación de Riesgo Inmediato', desc: 'Protocolos de estabilización.' } },
                { texto: '3.2.2 [Subcomponente Crisis B]', vista: { titulo: '3.2.2 Red de Apoyo y Derivación', desc: 'Coordinación interdisciplinaria.' } },
                { texto: '3.3 Situaciones de Suicidio', vista: { titulo: '3.3 Situaciones de Suicidio', desc: 'Prevención, contención y evaluación de ideación suicida.' } },
                { texto: '3.3.1 [Subcomponente Suicidio A]', vista: { titulo: '3.3.1 Mapeo de Ideación y Contrato', desc: 'Estrategias de seguridad clínica.' } },
                { texto: '3.3.2 [Subcomponente Suicidio B]', vista: { titulo: '3.3.2 Intervención Familiar y Postvención', desc: 'Soporte al entorno vincular.' } }
            ]
        },
        rubricas: {
            titulo: "4. Rúbricas de Consultas",
            botonesFila2: [
                { texto: '4.1 Escalas de Evaluación Clínica', vista: { titulo: '4.1 Rúbricas y Escalas', desc: 'Instrumentos estandarizados de medición sintomática e intersubjetiva.' } },
                { texto: '4.2 Indicadores de Convergencia', vista: { titulo: '4.2 Indicadores de Convergencia', desc: 'Parámetros de evolución conjunta psicoanálisis-neurobiología.' } }
            ]
        },
        historia: {
            titulo: "5. Historia Clínica",
            botonesFila2: [
                { texto: '5.1 Registro de Sesiones', vista: { titulo: '5.1 Registro de Sesiones', desc: 'Bitácora cronológica e intervenciones registradas por paciente.' } },
                { texto: '5.2 Evoluciones y Notas Clínicas', vista: { titulo: '5.2 Evoluciones Clínicas', desc: 'Historial de progresos terapéuticos.' } }
            ]
        }
    };

    function inicializarApp() {
        // Construir Fila 1 (Botones Principales 1 a 6)
        fila1.innerHTML = '';
        
        const categorias = [
            { id: 'admin', texto: '1. Administración' },
            { id: 'estrategias', texto: '2. Estrategias y Técnicas' },
            { id: 'especiales', texto: '3. Estrategias especiales I' },
            { id: 'rubricas', texto: '4. Rúbricas de Consultas' },
            { id: 'historia', texto: '5. Historia Clínica' },
            { id: 'salir', texto: '6. Salir' }
        ];

        categorias.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'btn-menu btn-nivel-1';
            btn.textContent = cat.texto;

            if (cat.id === 'salir') {
                btn.className = 'btn-menu btn-salir';
                btn.addEventListener('click', ejecutarSalida);
            } else {
                btn.addEventListener('click', () => {
                    fila2.innerHTML = '';
                    fila3.innerHTML = '';
                    cargarFila2(menuData[cat.id]);
                });
            }
            fila1.appendChild(btn);
        });

        // Cargar por defecto la sección de Administración al iniciar sesión
        cargarFila2(menuData.admin);
    }

    function cargarFila2(seccionObj) {
        fila2.innerHTML = '';
        fila3.innerHTML = '';

        if (seccionObj && seccionObj.botonesFila2) {
            seccionObj.botonesFila2.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'btn-menu btn-nivel-2';
                btn.textContent = item.texto;

                btn.addEventListener('click', () => {
                    fila3.innerHTML = '';
                    if (item.link) {
                        cargarArchivoExterno(item.link);
                    } else if (item.subgrupo) {
                        cargarFila3(seccionObj.subgrupos[item.subgrupo]);
                    } else if (item.vista) {
                        mostrarVista(item.vista.titulo, item.vista.desc);
                    }
                });

                fila2.appendChild(btn);
            });
        }
    }

    function cargarFila3(subbotones) {
        fila3.innerHTML = '';
        subbotones.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'btn-menu btn-nivel-3';
            btn.textContent = item.texto;

            btn.addEventListener('click', () => {
                if (item.link) {
                    cargarArchivoExterno(item.link);
                } else if (item.vista) {
                    mostrarVista(item.vista.titulo, item.vista.desc);
                }
            });

            fila3.appendChild(btn);
        });
    }

    function mostrarVista(titulo, descripcion) {
        contenidoPrincipal.innerHTML = `
            <h2>${titulo}</h2>
            <p>${descripcion}</p>
            <hr style="border:0; border-top:1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #64748b; font-size: 0.9rem;">Estado del módulo sincronizado con Firebase Database.</p>
        `;
    }

    function cargarArchivoExterno(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Archivo no encontrado');
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const mainContent = doc.querySelector('main') || doc.body;
                contenidoPrincipal.innerHTML = mainContent.innerHTML;
            })
            .catch(error => {
                contenidoPrincipal.innerHTML = `
                    <h2>Módulo: ${url}</h2>
                    <p>No se encontró el archivo físico <strong>${url}</strong> en el servidor local, pero el enlace de navegación está activo.</p>
                `;
            });
    }

    function ejecutarSalida() {
        despedidaOverlay.style.display = 'flex';
        setTimeout(() => {
            location.reload();
        }, 3500);
    }
});