/**
 * LigaPro Evolution - Módulo de Sincronización en Tiempo Real Multi-Pestaña y Multi-Dispositivo
 * Asociación de Fútbol Amateur de Arauco
 * 
 * Implementa BroadcastChannel API y Storage Events para sincronización instantánea
 * entre ventanas/pestañas (y base para conexión WebSocket / Supabase Realtime).
 */

import { triggerGoalNotification, triggerNewsNotification } from './notifications.js';
import { getDb } from './data.js';

const CHANNEL_NAME = 'ligapro_evolution_realtime_v1';
let syncChannel = null;

/**
 * Inicializa el canal de sincronización en tiempo real
 */
export function initRealtimeSync() {
  if (typeof window === 'undefined') return;

  // 1. Inicializar BroadcastChannel si está soportado por el navegador
  if ('BroadcastChannel' in window) {
    try {
      syncChannel = new BroadcastChannel(CHANNEL_NAME);
      syncChannel.onmessage = handleIncomingSyncMessage;
    } catch (err) {
      console.warn('BroadcastChannel no disponible, utilizando almacenamiento compartido:', err);
    }
  }

  // 2. Escuchar StorageEvent como mecanismo de respaldo
  window.addEventListener('storage', (event) => {
    if (event.key === 'LIGAPRO_REALTIME_PULSE' && event.newValue) {
      try {
        const message = JSON.parse(event.newValue);
        handleIncomingSyncMessage({ data: message });
      } catch (e) {}
    }
  });

  // Exponer emisor global
  window.ligaproBroadcast = broadcastSyncEvent;
}

/**
 * Emite un evento en tiempo real para todas las demás pestañas/dispositivos
 */
export function broadcastSyncEvent(type, payload = {}) {
  const message = {
    type,
    payload,
    senderTabId: getTabSessionId(),
    timestamp: Date.now()
  };

  // Enviar a través de BroadcastChannel
  if (syncChannel) {
    try {
      syncChannel.postMessage(message);
    } catch (e) {}
  }

  // Enviar a través de localStorage para pestañas secundarias
  try {
    localStorage.setItem('LIGAPRO_REALTIME_PULSE', JSON.stringify(message));
  } catch (e) {}
}

/**
 * Procesa los mensajes recibidos desde otra pestaña
 */
function handleIncomingSyncMessage(event) {
  const message = event.data;
  if (!message || message.senderTabId === getTabSessionId()) {
    // Ignorar mensajes generados por la misma pestaña
    return;
  }

  const { type, payload } = message;

  switch (type) {
    case 'GOAL_SCORED':
      handleRealtimeGoal(payload);
      break;

    case 'NEWS_PUBLISHED':
      handleRealtimeNews(payload);
      break;

    case 'MEDIA_PUBLISHED':
      handleRealtimeMedia(payload);
      break;

    case 'MATCH_UPDATED':
      handleRealtimeMatchUpdate(payload);
      break;

    default:
      console.log('Evento en tiempo real no manejado:', type, payload);
  }
}

/**
 * Maneja la llegada de un gol marcado desde la pestaña del Árbitro
 */
function handleRealtimeGoal(payload) {
  const { playerName, playerNumber, matchTitle, score } = payload;

  // 1. Disparar celebración visual (Zumbido MSN + Overlay de Golazo)
  document.dispatchEvent(new CustomEvent('ligapro:goal-scored', {
    detail: {
      playerName: playerName || 'Jugador',
      playerNumber: playerNumber || '#'
    }
  }));

  // 2. Disparar sonido de estadio, vibración y notificación push del sistema operativo
  triggerGoalNotification({
    playerName: playerName || 'Jugador',
    playerNumber: playerNumber || '#',
    matchTitle: matchTitle || 'Partido en Vivo',
    score: score || ''
  });

  // 3. Avisar al usuario en un toast no invasivo
  if (window.showToast) {
    window.showToast(`⚽ ¡GOL EN DIRECTO! ${playerName} acaba de marcar. Tablas y marcadores actualizados.`);
  }

  // 4. Disparar evento para que las tablas y papeletas se redibujen
  window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
}

/**
 * Maneja la publicación de una nueva noticia desde la mesa directiva
 */
function handleRealtimeNews(payload) {
  const { title, category, author } = payload;

  // Disparar sonido chime de noticias y notificación nativa
  triggerNewsNotification({ title, category, author });

  // Notificar a la vista de noticias para que refresque su grilla
  window.dispatchEvent(new CustomEvent('ligapro:news-updated'));

  if (window.showToast) {
    window.showToast(`📰 Sala de Prensa: "${title}" acaba de publicarse.`);
  }
}

/**
 * Maneja la subida de una nueva foto o video desde la cancha
 */
function handleRealtimeMedia(payload) {
  const { title, type } = payload;

  window.dispatchEvent(new CustomEvent('ligapro:media-updated'));

  if (window.showToast) {
    const icon = type === 'video' ? '🎥' : '📸';
    window.showToast(`${icon} Sala de Prensa: Se ha añadido "${title || 'nuevo contenido'}" a la galería.`);
  }
}

/**
 * Maneja la actualización de partidos o marcadores
 */
function handleRealtimeMatchUpdate(payload) {
  window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
}

/**
 * Identificador único de sesión por pestaña para evitar auto-procesamiento
 */
function getTabSessionId() {
  if (!window.__ligaproTabId) {
    window.__ligaproTabId = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
  }
  return window.__ligaproTabId;
}
