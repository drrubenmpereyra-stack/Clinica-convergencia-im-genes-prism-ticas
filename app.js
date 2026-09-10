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
    const outputDisplay = document.getElementById('output');

    // Estructura completa del menú jerárquico
    const menuData = {
        admin: {
            nombre: "1. Administración",
            claseBtn: "btn-b1-p",
            hijos: [
                { nombre: "1.1 Pacientes", link: "pacientes.html", clase: "btn-b1-s" },
                { nombre: "1.2 Contabilidad", link: "contabilidad.html", clase: "btn-b1-s", desc: "Módulo de gestión contable, honorarios y balance institucional." },
                { nombre: "1.3 Agenda", link: "agenda.html", clase: "btn-b1-s", desc: "Módulo de gestión agenda.Turnos, horarios." },
                { nombre: "1.4 Central formularios", link: "central_form.html", clase: "btn-b1-s", desc: "Repositorio unificado de fichas clínicas y escalas estandarizadas." }
            ]
        },
        estrategias: {
            nombre: "2. Estrategias y Técnicas",
            claseBtn: "btn-b2-p",
            hijos: [
                {
                    nombre: "2.1 Cartografía de la Intersubjetividad",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.1.1 Aquí y ahora - HPA", link: "aqui_y_ahora.html", clase: "btn-b2-t" },
                        { nombre: "2.1.2 Validación empática como freno de emergencia", clase: "btn-b2-t", desc: "Técnica de regulación afectiva y freno de emergencia en desbordes." },
                        { nombre: "2.1.3 Monitoreo y uso contratransferencia somática", clase: "btn-b2-t", desc: "Lectura de marcadores somáticos del analista como brújula clínica." },
                        { nombre: "2.1.4 Encuadre, sincronización vocal, focusing e interpretación", clase: "btn-b2-t", desc: "Convergencia entre sincronía prosódica, focusing corporal e intervención." }
                    ]
                },
                {
                    nombre: "2.2 Memoria Traumática y el a posteriori",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.2.1", clase: "btn-b2-t", desc: "Componente A de Memoria Traumática." },
                        { nombre: "2.2.2", clase: "btn-b2-t", desc: "Componente B de Memoria Traumática." }
                    ]
                },
                {
                    nombre: "2.3 Circuitos de recompensa",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.3.1", clase: "btn-b2-t", desc: "Circuitos de recompensa - Subcomponente 1." },
                        { nombre: "2.3.2", clase: "btn-b2-t", desc: "Circuitos de recompensa - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.4 La interfaz cuerpo mente",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.4.1", clase: "btn-b2-t", desc: "Interfaz cuerpo mente - Subcomponente 1." },
                        { nombre: "2.4.2", clase: "btn-b2-t", desc: "Interfaz cuerpo mente - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.5 Neurobiología de la repetición",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.5.1", clase: "btn-b2-t", desc: "Neurobiología de la repetición - Subcomponente 1." },
                        { nombre: "2.5.2", clase: "btn-b2-t", desc: "Neurobiología de la repetición - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.6 Plasticidad simbólica y sináptica",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.6.1", clase: "btn-b2-t", desc: "Plasticidad simbólica y sináptica - Subcomponente 1." },
                        { nombre: "2.6.2", clase: "btn-b2-t", desc: "Plasticidad simbólica y sináptica - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.7 Arquitectura del sueño y función alucinatoria",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.7.1", clase: "btn-b2-t", desc: "Arquitectura del sueño - Subcomponente 1." },
                        { nombre: "2.7.2", clase: "btn-b2-t", desc: "Arquitectura del sueño - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.8 El Ello somático y T. Psicosomáticos",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.8.1", clase: "btn-b2-t", desc: "Ello somático - Subcomponente 1." },
                        { nombre: "2.8.2", clase: "btn-b2-t", desc: "Ello somático - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.9 Focalización en estructuras límbicas",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.9.1", clase: "btn-b2-t", desc: "Estructuras límbicas - Subcomponente 1." },
                        { nombre: "2.9.2", clase: "btn-b2-t", desc: "Estructuras límbicas - Subcomponente 2." }
                    ]
                },
                {
                    nombre: "2.10 Ética de la singularidad en la era tecnológica",
                    clase: "btn-b2-s",
                    nietos: [
                        { nombre: "2.10.1", clase: "btn-b2-t", desc: "Ética de la singularidad - Subcomponente 1." },
                        { nombre: "2.10.2", clase: "btn-b2-t", desc: "Ética de la singularidad - Subcomponente 2." }
                    ]
                }
            ]
        },
        especiales: {
            nombre: "3. Estrategias especiales I",
            claseBtn: "btn-b3-p",
            hijos: [
                { 
                    nombre: "3.1 Situaciones de duelo", 
                    clase: "btn-b3-s",
                    nietos: [
                        { nombre: "3.1.1", clase: "btn-b3-t", desc: "Duelo - Subcomponente 1." },
                        { nombre: "3.1.2", clase: "btn-b3-t", desc: "Duelo - Subcomponente 2." }
                    ]
                },
                { 
                    nombre: "3.2 Situaciones de crisis", 
                    clase: "btn-b3-s",
                    nietos: [
                        { nombre: "3.2.1", clase: "btn-b3-t", desc: "Crisis - Subcomponente 1." },
                        { nombre: "3.2.2", clase: "btn-b3-t", desc: "Crisis - Subcomponente 2." }
                    ]
                },
                { 
                    nombre: "3.3 Situaciones de Suicidio", 
                    clase: "btn-b3-s",
                    nietos: [
                        { nombre: "3.3.1", clase: "btn-b3-t", desc: "Suicidio - Subcomponente 1." },
                        { nombre: "3.3.2", clase: "btn-b3-t", desc: "Suicidio - Subcomponente 2." }
                    ]
                }
            ]
        },
        rubricas: {
            nombre: "4. Rúbricas de Consultas",
            claseBtn: "btn-b4-p",
            hijos: [
                { nombre: "4.1 Escalas de Evaluación Clínica", clase: "btn-b4-s", desc: "Instrumentos estandarizados de medición." },
                { nombre: "4.2 Indicadores de Convergencia", clase: "btn-b4-s", desc: "Parámetros de evolución conjunta." }
            ]
        },
        historia: {
            nombre: "5. Historia Clínica",
            claseBtn: "btn-b5-p",
            hijos: [
                { nombre: "5.1 Registro de Sesiones", link: "registro_sesiones", clase: "btn-b5-s", desc: "Bitácora cronológica e intervenciones registradas." },
                { nombre: "5.2 Evoluciones y Notas Clínicas", clase: "btn-b5-s", desc: "Historial de progresos terapéuticos." }
            ]
        },
        salir: {
            nombre: "6. Salir",
            claseBtn: "btn-b6-p",
            accion: () => ejecutarSalidaCinematografica()
        }
    };
