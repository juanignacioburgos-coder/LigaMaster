/**
 * LigaMaster - Módulo de Progressive Web App (PWA) & Sincronización en Terreno
 * Proporciona soporte nativo para instalación en celular (Android & iOS) y
 * monitoreo de conectividad en cancha (Online / Offline).
 */

import { showToast } from './toast.js';

let deferredInstallPrompt = null;
let isAppInstalled = false;

/**
 * Inicializa el soporte PWA y los detectores de conectividad
 */
export function initPwaModule() {
  // 1. Registro del Service Worker
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    // Solo registrar en protocolos HTTP/HTTPS (evitar error en file://)
    if (window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[LigaMaster PWA] Service Worker registrado con éxito:', reg.scope);
        })
        .catch((err) => {
          console.warn('[LigaMaster PWA] No se pudo registrar Service Worker:', err);
        });
    }
  }

  // 2. Escuchar evento de instalación nativa en Android/Chrome/Edge
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevenir el banner automático por defecto
      e.preventDefault();
      deferredInstallPrompt = e;
      updateInstallButtonsUI(true);
    });

    // Detectar cuando ya se completó la instalación
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      isAppInstalled = true;
      updateInstallButtonsUI(false);
      showToast('🎉 ¡LigaMaster se instaló correctamente en tu dispositivo!', 'success');
    });

    // Detectar si ya se ejecuta como standalone (PWA abierta desde la pantalla de inicio)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      isAppInstalled = true;
      updateInstallButtonsUI(false);
    }

    // 3. Monitoreo de conectividad (Online / Offline en cancha)
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Estado inicial de conectividad
    updateNetworkIndicator(navigator.onLine);

    // Exponer funciones globales para interacción HTML
    window.ligamasterInstallApp = installLigaMasterApp;
    window.ligamasterShowIosInstallModal = showIosInstallModal;
    window.ligamasterCloseIosInstallModal = closeIosInstallModal;
  }
}

/**
 * Actualiza la visibilidad de los botones de instalación en la UI
 */
function updateInstallButtonsUI(canInstall) {
  const installBtns = document.querySelectorAll('.btn-pwa-install');
  installBtns.forEach(btn => {
    if (isAppInstalled) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-flex';
    }
  });
}

/**
 * Detecta si el dispositivo es iOS (iPhone / iPad)
 */
export function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

/**
 * Dispara la instalación nativa o guía al usuario en iPhone
 */
export async function installLigaMasterApp() {
  if (isIosDevice()) {
    showIosInstallModal();
    return;
  }

  if (!deferredInstallPrompt) {
    // Si no está el prompt nativo disponible (ej. navegador de escritorio o ya instalado)
    showToast('ℹ️ LigaMaster ya está lista o disponible para agregar a tu pantalla de inicio.', 'info');
    showIosInstallModal();
    return;
  }

  try {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('⚽ Instalando LigaMaster en tu pantalla de inicio...', 'success');
    }
    deferredInstallPrompt = null;
  } catch (err) {
    console.error('Error al solicitar instalación PWA:', err);
    showIosInstallModal();
  }
}

/**
 * Abre el modal explicativo de instalación para iOS / Safari
 */
export function showIosInstallModal() {
  const modal = document.getElementById('modal-pwa-ios-install');
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Cierra el modal de instalación
 */
export function closeIosInstallModal() {
  const modal = document.getElementById('modal-pwa-ios-install');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Maneja el evento de reconexión a Internet
 */
function handleOnlineStatus() {
  updateNetworkIndicator(true);
  showToast('🟢 Conexión a Internet restablecida. Datos sincronizados con la liga.', 'success');
}

/**
 * Maneja la pérdida de conexión en la cancha
 */
function handleOfflineStatus() {
  updateNetworkIndicator(false);
  showToast('🟡 Sin conexión a Internet. Modo Cancha Autónomo activado (Tiempos y goles guardados localmente).', 'warning');
}

/**
 * Actualiza el indicador visual de red en la cabecera / consola
 */
export function updateNetworkIndicator(isOnline) {
  const badge = document.getElementById('platform-network-status-badge');
  if (!badge) return;

  if (isOnline) {
    badge.className = 'network-status-badge online';
    badge.innerHTML = `
      <span class="network-dot online"></span>
      <span class="network-text">En Línea</span>
    `;
    badge.title = 'Conectado a Internet • Sincronización en tiempo real activa';
  } else {
    badge.className = 'network-status-badge offline';
    badge.innerHTML = `
      <span class="network-dot offline"></span>
      <span class="network-text">Modo Cancha (Offline)</span>
    `;
    badge.title = 'Sin conexión a Internet • Todos los cambios se guardan localmente y se sincronizarán al recuperar señal';
  }
}
