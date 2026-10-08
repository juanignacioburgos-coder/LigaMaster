/**
 * LigaMaster - Módulo de Notificaciones en Vivo & Alertas de Gol
 * Estilo OneFootball • Fútbol Amateur de Arauco
 * 
 * Características:
 * - Campanita 🔔 para seguir partidos y clubes específicos (como en OneFootball).
 * - Sonido sutil y elegante de gol sintetizado mediante Web Audio API (100% offline).
 * - Vibración háptica suave y no invasiva para teléfonos móviles.
 * - Notificaciones Push del sistema operativo cuando anota tu equipo o partido seguido.
 * - Toast moderno y flotante con el marcador en vivo.
 */

import { showToast } from './toast.js';

let audioCtx = null;

// Claves de Almacenamiento Local (Configuración y Favoritos)
const STORAGE_KEYS = {
  ENABLED: 'LIGAPRO_NOTIFS_ENABLED',
  SOUND: 'LIGAPRO_NOTIFS_SOUND',
  VIBRATION: 'LIGAPRO_NOTIFS_VIBRATION',
  MODE: 'LIGAPRO_NOTIFS_MODE', // 'followed_only' | 'all'
  FOLLOWED_MATCHES: 'LIGAPRO_FOLLOWED_MATCHES',
  FOLLOWED_CLUBS: 'LIGAPRO_FOLLOWED_CLUBS'
};

/**
 * Obtiene o inicializa el contexto de audio
 */
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Sonido sutil, cristalino y elegante de gol (Estilo OneFootball)
 * Dos notas armónicas suaves con decaimiento natural (D5 -> A5)
 * Funciona 100% offline sin necesidad de descargar archivos mp3.
 */
export function playSubtleGoalAlert() {
  const settings = getNotificationSettings();
  if (!settings.sound) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Nota 1: 587.33 Hz (D5) - Chime suave preparatorio
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.20);

    // Nota 2: 880.00 Hz (A5) - Campana cristalina de confirmación de gol
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880.00, now + 0.10);
    gain2.gain.setValueAtTime(0.16, now + 0.10);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.10);
    osc2.stop(now + 0.48);
  } catch (err) {
    console.warn('Audio feedback no disponible:', err);
  }
}

// Alias para compatibilidad con llamadas y tests existentes
export const playMsnNudgeSound = playSubtleGoalAlert;
export const playGoalSound = playSubtleGoalAlert;

/**
 * Chime suave para noticias o comunicados
 */
export function playNewsChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25]; // C5 -> E5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.10, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.28);
    });
  } catch (err) {
    console.warn('Chime no disponible:', err);
  }
}

/**
 * Vibración háptica suave y breve para teléfonos celulares
 */
export function vibratePhone(pattern = [60, 40, 60]) {
  const settings = getNotificationSettings();
  if (!settings.vibration) return;

  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

/**
 * Efecto visual sutil (mantener compatibilidad)
 */
export function triggerScreenNudge() {
  if (typeof document === 'undefined') return;
  const target = document.body;
  if (!target) return;
  target.classList.remove('msn-nudge-shake');
  void target.offsetWidth;
  target.classList.add('msn-nudge-shake');
  setTimeout(() => {
    target.classList.remove('msn-nudge-shake');
  }, 400);
}

/**
 * Obtiene la configuración de notificaciones actual
 */
export function getNotificationSettings() {
  try {
    const enabled = localStorage.getItem(STORAGE_KEYS.ENABLED) !== 'false';
    const sound = localStorage.getItem(STORAGE_KEYS.SOUND) !== 'false';
    const vibration = localStorage.getItem(STORAGE_KEYS.VIBRATION) !== 'false';
    const mode = localStorage.getItem(STORAGE_KEYS.MODE) || 'followed_only'; // 'followed_only' | 'all'
    const followedMatches = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOLLOWED_MATCHES) || '[]');
    const followedClubs = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOLLOWED_CLUBS) || '[]');

    return {
      enabled,
      sound,
      vibration,
      mode,
      followedMatches: Array.isArray(followedMatches) ? followedMatches : [],
      followedClubs: Array.isArray(followedClubs) ? followedClubs : []
    };
  } catch (e) {
    return {
      enabled: true,
      sound: true,
      vibration: true,
      mode: 'followed_only',
      followedMatches: [],
      followedClubs: []
    };
  }
}

/**
 * Guarda la configuración de notificaciones
 */
export function saveNotificationSettings(settings) {
  try {
    if (settings.enabled !== undefined) localStorage.setItem(STORAGE_KEYS.ENABLED, String(settings.enabled));
    if (settings.sound !== undefined) localStorage.setItem(STORAGE_KEYS.SOUND, String(settings.sound));
    if (settings.vibration !== undefined) localStorage.setItem(STORAGE_KEYS.VIBRATION, String(settings.vibration));
    if (settings.mode !== undefined) localStorage.setItem(STORAGE_KEYS.MODE, String(settings.mode));
    if (settings.followedMatches !== undefined) localStorage.setItem(STORAGE_KEYS.FOLLOWED_MATCHES, JSON.stringify(settings.followedMatches));
    if (settings.followedClubs !== undefined) localStorage.setItem(STORAGE_KEYS.FOLLOWED_CLUBS, JSON.stringify(settings.followedClubs));
    updateNotificationUI();
  } catch (e) {}
}

/**
 * Obtiene el listado de partidos seguidos
 */
export function getFollowedMatches() {
  return getNotificationSettings().followedMatches;
}

/**
 * Verifica si un partido está en la lista de seguidos
 */
export function isMatchFollowed(matchId) {
  if (!matchId) return false;
  const list = getFollowedMatches();
  return list.includes(String(matchId));
}

/**
 * Activa o desactiva las notificaciones de un partido (Campanita estilo OneFootball)
 */
export async function toggleFollowMatch(matchId, event = null) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const cleanId = String(matchId);
  const settings = getNotificationSettings();
  let list = settings.followedMatches;
  const isFollowing = list.includes(cleanId);

  getAudioContext();

  // Si va a seguir el partido, solicitar permisos del navegador en segundo plano si aún no se han concedido
  if (!isFollowing) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      requestNotificationPermission().catch(() => {});
    }
    list.push(cleanId);
    showToast('🔔 Siguiendo partido. Recibirás alertas de gol en tu celular.', 'success');
  } else {
    list = list.filter(id => id !== cleanId);
    showToast('🔕 Dejaste de seguir este partido.', 'info');
  }

  saveNotificationSettings({ followedMatches: list });
  updateFollowButtonsUI(cleanId, !isFollowing);
  updateNotificationUI();

  return !isFollowing;
}

/**
 * Obtiene el listado de clubes seguidos
 */
export function getFollowedClubs() {
  return getNotificationSettings().followedClubs;
}

/**
 * Verifica si un club está seguido
 */
export function isClubFollowed(clubId) {
  if (!clubId) return false;
  return getFollowedClubs().includes(String(clubId));
}

/**
 * Activa o desactiva las notificaciones para todo un club
 */
export async function toggleFollowClub(clubId, event = null) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const cleanId = String(clubId);
  const settings = getNotificationSettings();
  let list = settings.followedClubs;
  const isFollowing = list.includes(cleanId);

  getAudioContext();

  if (!isFollowing) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      requestNotificationPermission().catch(() => {});
    }
    list.push(cleanId);
    showToast('🔔 Siguiendo club. Te avisaremos en cada fecha y gol.', 'success');
  } else {
    list = list.filter(id => id !== cleanId);
    showToast('🔕 Dejaste de seguir este club.', 'info');
  }

  saveNotificationSettings({ followedClubs: list });
  updateNotificationUI();
  return !isFollowing;
}

/**
 * Determina si debe dispararse una alerta para un partido determinado
 * Comprueba:
 * 1. Si las alertas globales están habilitadas.
 * 2. Si el modo es 'all' (todos los partidos).
 * 3. Si el usuario sigue el partido con la campanita.
 * 4. Si el usuario sigue a alguno de los clubes participantes.
 * 5. Si el usuario es el turno en terreno que está registrando el gol.
 */
export function shouldNotifyForMatch({ matchId, homeClubId, awayClubId, isPitchTurno = false } = {}) {
  const settings = getNotificationSettings();
  if (!settings.enabled) return false;

  // Si quien anota es el turno en la cancha, siempre recibe feedback de confirmación
  if (isPitchTurno) return true;

  // Si eligió recibir alertas de todos los partidos
  if (settings.mode === 'all') return true;

  // Comprobar si sigue este partido en particular
  if (matchId && isMatchFollowed(matchId)) return true;

  // Comprobar si sigue alguno de los dos clubes
  if (homeClubId && isClubFollowed(homeClubId)) return true;
  if (awayClubId && isClubFollowed(awayClubId)) return true;

  return false;
}

/**
 * Actualiza visualmente los botones de campanita de un partido en toda la pantalla
 */
export function updateFollowButtonsUI(matchId, isFollowed) {
  if (typeof document === 'undefined') return;
  const buttons = document.querySelectorAll(`[data-follow-match="${matchId}"]`);
  buttons.forEach(btn => {
    if (isFollowed) {
      btn.classList.add('active');
      btn.setAttribute('title', 'Siguiendo partido (Alertas activadas)');
      const label = btn.querySelector('.follow-label');
      if (label) label.textContent = 'Siguiendo';
    } else {
      btn.classList.remove('active');
      btn.setAttribute('title', 'Seguir partido (Recibir goles en celular)');
      const label = btn.querySelector('.follow-label');
      if (label) label.textContent = 'Seguir';
    }
  });
}

/**
 * Verifica si las notificaciones de sistema están permitidas en el navegador
 */
export function areNotificationsEnabled() {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  return Notification.permission === 'granted';
}

/**
 * Solicita permiso al usuario para enviar notificaciones Push nativas
 */
export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    showToast('⚠️ Tu navegador no soporta notificaciones nativas.', 'warning');
    return false;
  }

  getAudioContext();

  try {
    const permission = await Notification.requestPermission();
    updateNotificationUI();

    if (permission === 'granted') {
      localStorage.setItem(STORAGE_KEYS.ENABLED, 'true');
      showToast('🔔 Notificaciones activadas. Recibirás goles y resultados en tu celular.', 'success');
      sendWelcomeNotification();
      return true;
    } else if (permission === 'denied') {
      localStorage.setItem(STORAGE_KEYS.ENABLED, 'false');
      showToast('ℹ️ Notificaciones bloqueadas en los ajustes del navegador.', 'info');
      return false;
    }
  } catch (err) {
    console.error('Error al solicitar permiso de notificación:', err);
    return false;
  }
}

/**
 * Envía una notificación nativa al sistema operativo del celular o PC
 */
export function sendPushAlert({ title, body, icon = '⚽', tag = 'ligamaster-alert', playSound = true, vibrate = true }) {
  if (playSound) {
    playSubtleGoalAlert();
  }
  if (vibrate) {
    vibratePhone();
  }

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body,
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚽</text></svg>',
        tag,
        renotify: true
      });

      notif.onclick = () => {
        window.focus();
        notif.close();
      };
    } catch (e) {
      console.warn('Fallo al disparar notificación nativa:', e);
    }
  }
}

/**
 * Notificación de bienvenida al suscribirse
 */
function sendWelcomeNotification() {
  sendPushAlert({
    title: '⚽ LigaMaster • Fútbol de Arauco',
    body: '¡Alertas activadas! Toca la campanita 🔔 en cualquier partido para recibir sus goles al instante.',
    tag: 'ligamaster-welcome',
    playSound: false,
    vibrate: false
  });
}

/**
 * Dispara una alerta de gol oficial con diseño moderno y sutil (Estilo OneFootball)
 */
export function triggerGoalNotificationAlert({
  matchId = null,
  homeClubId = null,
  awayClubId = null,
  stadium = 'Estadio Municipal Ramón Burgos',
  homeClub = 'Local',
  awayClub = 'Visita',
  score = '1 - 0',
  scorer = 'Mauricio Neira (34\')',
  playerName = 'Mauricio Neira',
  minute = '34',
  forceAlert = false
} = {}) {
  // Comprobar si corresponde notificar según preferencias del usuario
  const shouldAlert = forceAlert || shouldNotifyForMatch({ matchId, homeClubId, awayClubId, isPitchTurno: true });
  if (!shouldAlert) return;

  // 1. Sonido sutil y elegante
  playSubtleGoalAlert();

  // 2. Micro-vibración háptica
  vibratePhone([60, 40, 60]);

  // 3. Notificación Push de sistema
  const title = `⚽ ¡GOL! ${homeClub} ${score} ${awayClub}`;
  const body = `${stadium} • ${scorer || 'Marcador actualizado en vivo'}`;

  sendPushAlert({
    title,
    body,
    tag: 'ligamaster-goal-' + Date.now(),
    playSound: false,
    vibrate: false
  });

  // 4. Celebración cinematográfica del Balón entrando al arco (¡¡¡GOLAZO!!!)
  showGoalazoCelebrationOverlay({ homeClub, awayClub, score, scorer, minute, stadium });

  // 5. Toast flotante estilo OneFootball
  showGoalAlertToast({ title, body, stadium, homeClub, awayClub, score, scorer, minute });
}

/**
 * Muestra la celebración visual en pantalla completa con el balón entrando al arco
 */
export function showGoalazoCelebrationOverlay({
  homeClub = 'Local',
  awayClub = 'Visita',
  score = '1 - 0',
  scorer = 'Jugador',
  minute = '',
  stadium = 'Estadio Oficial'
} = {}) {
  if (typeof document === 'undefined') return;

  // Remover celebración previa si estuviera abierta
  const oldCelebration = document.getElementById('goalazo-celebration-overlay');
  if (oldCelebration) oldCelebration.remove();

  const overlay = document.createElement('div');
  overlay.id = 'goalazo-celebration-overlay';
  overlay.className = 'goalazo-celebration-overlay';
  overlay.setAttribute('role', 'alertdialog');
  overlay.setAttribute('aria-label', '¡Golazo anotado!');

  overlay.innerHTML = `
    <div class="goalazo-stage">
      <svg class="goalazo-svg-goal" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet">
        <defs>
          <!-- Gradiente metálico para postes de fútbol blanco puro -->
          <linearGradient id="postMetallic" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="35%" stop-color="#f8fafc"/>
            <stop offset="70%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>

          <!-- Sombra proyectada del marco del arco -->
          <filter id="goalDropShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.8"/>
          </filter>

          <!-- Patrón de malla de red de fútbol profesional -->
          <pattern id="netMeshPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M 0 7 L 7 0 L 14 7 L 7 14 Z" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="0.85"/>
          </pattern>
          <pattern id="netMeshDepth" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="none" stroke="rgba(203,213,225,0.30)" stroke-width="0.7"/>
          </pattern>
        </defs>

        <!-- 1. Campo de Juego: Línea de Gol de Cal -->
        <line x1="20" y1="312" x2="580" y2="312" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-dasharray="14 10"/>
        
        <!-- 2. Arquillos traseros que dan profundidad 3D al arco -->
        <path d="M 88 78 L 135 118 L 135 312 L 88 312" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255,255,255,0.25)" stroke-width="2.5"/>
        <path d="M 512 78 L 465 118 L 465 312 L 512 312" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255,255,255,0.25)" stroke-width="2.5"/>

        <!-- 3. Red del fondo y techo del arco con perspectiva -->
        <polygon points="88,78 512,78 465,118 135,118" fill="url(#netMeshDepth)"/>
        <polygon points="135,118 465,118 465,312 135,312" fill="url(#netMeshPattern)"/>
        <polygon points="88,78 135,118 135,312 88,312" fill="url(#netMeshDepth)"/>
        
        <!-- Lateral derecho de red (zona donde penetra el balón y se abomba la malla) -->
        <g class="net-mesh-impact-area">
          <polygon points="512,78 465,118 465,312 512,312" fill="url(#netMeshDepth)"/>
          <line x1="512" y1="78" x2="470" y2="105" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          <line x1="470" y1="105" x2="465" y2="180" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        </g>

        <!-- 4. Marco Frontal Oficial del Arco (Blanco brillante con relieve metálico) -->
        <g filter="url(#goalDropShadow)">
          <rect x="76" y="70" width="16" height="242" rx="4" fill="url(#postMetallic)"/>
          <rect x="508" y="70" width="16" height="242" rx="4" fill="url(#postMetallic)"/>
          <rect x="76" y="70" width="448" height="16" rx="4" fill="url(#postMetallic)"/>
          <circle cx="84" cy="78" r="8" fill="#e2e8f0"/>
          <circle cx="516" cy="78" r="8" fill="#e2e8f0"/>
        </g>

        <!-- 5. Onda expansiva / flash de impacto en el ángulo -->
        <circle class="goal-impact-ring" cx="472" cy="98" r="5" fill="none"/>
      </svg>

      <!-- Balón en trayectoria con física hacia el ángulo superior -->
      <div class="goalazo-flying-ball">
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
          <polygon points="20,13 26,18 24,26 16,26 14,18" fill="#0f172a"/>
          <polygon points="20,2 24,7 16,7" fill="#0f172a"/>
          <polygon points="38,14 34,18 35,25 39,24" fill="#0f172a"/>
          <polygon points="2,14 6,18 5,25 1,24" fill="#0f172a"/>
          <polygon points="29,37 24,34 16,34 11,37 20,39" fill="#0f172a"/>
          <circle cx="15" cy="14" r="5" fill="rgba(255,255,255,0.65)"/>
        </svg>
      </div>
    </div>

    <!-- Título y Tipografía Deportiva de Explosión: ¡¡¡GOLAZO!!! -->
    <div class="goalazo-title-banner">
      <span class="goalazo-word">¡¡¡GOLAZO!!!</span>
    </div>

    <!-- Ficha Deportiva del Partido con Marcador en Vivo -->
    <div class="goalazo-card-info">
      <div class="goalazo-card-teams">
        ${homeClub} <span style="color: #facc15; font-size: 1.35rem; margin: 0 0.35rem;">${score}</span> ${awayClub}
      </div>
      <div class="goalazo-card-scorer">
        <span>⚽ ${scorer || 'Gol registrado en la mesa de control'}</span>
        ${minute && !String(scorer).includes(minute) && !String(scorer).includes("'") ? `<span style="color: #fef08a; font-family: var(--font-mono); font-size: 0.85rem;">(${minute}')</span>` : ''}
      </div>
      <div class="goalazo-card-stadium">
        🏟️ ${stadium} • <span style="color: #22c55e; font-weight: 800;">EN VIVO</span>
      </div>
      <div class="goalazo-card-dismiss-tip">
        Toca en cualquier parte de la pantalla para continuar
      </div>
    </div>
  `;

  overlay.onclick = () => {
    dismissGoalazoOverlay();
  };

  document.body.appendChild(overlay);

  const autoCloseTimer = setTimeout(() => {
    dismissGoalazoOverlay();
  }, 2800);

  overlay._autoCloseTimer = autoCloseTimer;
}

export function dismissGoalazoOverlay() {
  if (typeof document === 'undefined') return;
  const overlay = document.getElementById('goalazo-celebration-overlay');
  if (!overlay) return;

  if (overlay._autoCloseTimer) {
    clearTimeout(overlay._autoCloseTimer);
  }

  overlay.classList.add('fading-out');
  setTimeout(() => {
    if (overlay && overlay.parentElement) {
      overlay.remove();
    }
  }, 320);
}

// Alias de retrocompatibilidad y módulo en tiempo real
export const triggerMsnNudgeAlert = triggerGoalNotificationAlert;

export function triggerGoalNotification({ playerName, playerNumber, matchTitle, score, stadium, matchId, homeClubId, awayClubId } = {}) {
  let home = 'Local';
  let away = 'Visita';
  if (matchTitle && matchTitle.includes(' vs ')) {
    const parts = matchTitle.split(' vs ');
    home = parts[0].trim();
    away = parts[1].trim();
  }

  triggerGoalNotificationAlert({
    playerName,
    playerNumber,
    homeClub: home,
    awayClub: away,
    score: score || '1 - 0',
    scorer: playerName,
    stadium: stadium || 'Estadio Oficial',
    matchId,
    homeClubId,
    awayClubId,
    forceAlert: true
  });
}

export function triggerNewsNotification({ title, category, author } = {}) {
  playNewsChime();
  vibratePhone([60, 40, 60]);
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    sendPushAlert({
      title: `📰 ${category || 'OFICIAL'}: ${title || 'Nuevo Comunicado'}`,
      body: `Publicado por ${author || 'Prensa Oficial'}.`,
      tag: 'ligamaster-news-' + Date.now(),
      playSound: false,
      vibrate: false
    });
  }
}

/**
 * Muestra el toast flotante con estética deportiva y moderna (Estilo OneFootball)
 */
export function showGoalAlertToast({ title, body, stadium, homeClub, awayClub, score, scorer, minute }) {
  if (typeof document === 'undefined') return;

  const oldToast = document.querySelector('.onefootball-goal-toast') || document.querySelector('.msn-nudge-toast');
  if (oldToast) oldToast.remove();

  const toast = document.createElement('div');
  toast.className = 'onefootball-goal-toast msn-nudge-toast';
  toast.innerHTML = `
    <div style="width: 42px; height: 42px; border-radius: 10px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;">
      ⚽
    </div>
    <div style="flex: 1; min-width: 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.2rem;">
        <span style="font-size: 0.72rem; font-weight: 800; color: #22c55e; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 0.3rem;">
          <span style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 6px #22c55e;"></span>
          GOL EN VIVO
        </span>
        <span style="font-size: 0.68rem; color: #94a3b8; font-family: var(--font-mono);">${minute ? minute + "'" : 'EN VIVO'}</span>
      </div>
      <div style="font-size: 1.05rem; font-weight: 900; color: #ffffff; line-height: 1.25; margin-bottom: 0.2rem; font-family: var(--font-display);">
        ${homeClub} <span style="color: #38bdf8;">${score}</span> ${awayClub}
      </div>
      <div style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.35;">
        ${scorer ? '⚽ ' + scorer : 'Marcador actualizado en la mesa de turno'}
      </div>
      <div style="margin-top: 0.35rem; font-size: 0.72rem; color: #64748b; display: flex; align-items: center; gap: 0.35rem;">
        <span>🏟️ ${stadium}</span>
      </div>
    </div>
    <button type="button" onclick="this.parentElement.remove()" style="background: none; border: none; color: #94a3b8; font-size: 1.3rem; line-height: 1; cursor: pointer; padding: 0 0.25rem;" title="Cerrar">&times;</button>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast && toast.parentElement) {
      toast.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 350);
    }
  }, 5000);
}

// Alias de retrocompatibilidad
export const showMsnNudgeToast = showGoalAlertToast;

/**
 * Prueba interactiva de alerta de gol en celular
 */
export function testGoalAlertDemo(stadium = 'Estadio Municipal Ramón Burgos') {
  getAudioContext();

  triggerGoalNotificationAlert({
    stadium,
    homeClub: 'C.D. Arauco',
    awayClub: 'Defensor Playa Brava',
    score: '2 - 1',
    scorer: 'Mauricio Neira (34\')',
    playerName: 'Mauricio Neira',
    minute: '34',
    forceAlert: true
  });

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
    requestNotificationPermission().catch(() => {});
  }
}

// Alias de retrocompatibilidad
export const testMsnNudgeDemo = testGoalAlertDemo;

/**
 * Actualiza los contadores e indicadores de alerta en la interfaz general
 */
export function updateNotificationUI() {
  const settings = getNotificationSettings();
  const followedCount = settings.followedMatches.length;

  // Actualizar botón de la cabecera si existe
  const badge = document.getElementById('header-notif-badge');
  if (badge) {
    if (followedCount > 0) {
      badge.textContent = String(followedCount);
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  // Actualizar botones de seguimiento en todas las tarjetas visibles
  settings.followedMatches.forEach(matchId => {
    updateFollowButtonsUI(matchId, true);
  });
}

/**
 * Abre el Centro de Ajustes de Notificaciones (Estilo OneFootball)
 */
export function openNotificationSettingsModal() {
  const modal = document.getElementById('modal-notification-settings');
  if (!modal) return;
  renderNotificationSettingsModal();
  modal.classList.add('active');
}

/**
 * Cierra el modal de ajustes de notificaciones
 */
export function closeNotificationSettingsModal() {
  const modal = document.getElementById('modal-notification-settings');
  if (modal) modal.classList.remove('active');
}

/**
 * Renderiza el contenido del Centro de Ajustes de Notificaciones
 */
export function renderNotificationSettingsModal() {
  const container = document.getElementById('notification-settings-modal-body');
  if (!container) return;

  const settings = getNotificationSettings();
  const notifsGranted = areNotificationsEnabled();
  const followedCount = settings.followedMatches.length;

  let html = `
    <div style="color: #ffffff;">
      <!-- Estado de Permisos del Navegador -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span style="font-size: 1.1rem;">🔔</span>
            <strong style="font-size: 0.95rem;">Notificaciones en este Dispositivo</strong>
          </div>
          <p style="margin: 0; font-size: 0.8rem; color: #94a3b8;">
            ${notifsGranted ? 'Las alertas del sistema están habilitadas para tu navegador.' : 'Activa el permiso para recibir avisos nativos en tu celular.'}
          </p>
        </div>
        <div>
          ${!notifsGranted ? `
            <button type="button" class="btn-primary-coral" onclick="window.ligamasterRequestPermissionAndRefresh()" style="padding: 0.5rem 1rem; font-size: 0.82rem; font-weight: 800; background: #16a34a; border: none;">
              🔔 Activar Alertas
            </button>
          ` : `
            <span class="status-badge habilitado" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">
              ✓ Habilitado
            </span>
          `}
        </div>
      </div>

      <!-- Preferencias de Alerta (Estilo OneFootball) -->
      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin: 0 0 0.75rem 0;">
          Preferencias de Alertas
        </h4>

        <!-- Switch 1: Modo de Notificación -->
        <div style="display: flex; flex-direction: column; gap: 0.65rem; background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 0.75rem;">
          <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <div>
              <div style="font-size: 0.9rem; font-weight: 700;">Solo partidos que sigo con la campanita 🔔</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Comportamiento tipo OneFootball (Recomendado para no saturar).</div>
            </div>
            <input type="radio" name="notifs-mode" value="followed_only" ${settings.mode === 'followed_only' ? 'checked' : ''} onchange="window.ligamasterSetNotifsMode('followed_only')" style="width: 18px; height: 18px; accent-color: var(--color-primary);">
          </label>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 0.25rem 0;">
          <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <div>
              <div style="font-size: 0.9rem; font-weight: 700;">Todos los partidos de la fecha</div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Recibir alertas de cada gol marcado en ambos estadios.</div>
            </div>
            <input type="radio" name="notifs-mode" value="all" ${settings.mode === 'all' ? 'checked' : ''} onchange="window.ligamasterSetNotifsMode('all')" style="width: 18px; height: 18px; accent-color: var(--color-primary);">
          </label>
        </div>

        <!-- Switches de Sonido y Vibración -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <label style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Sonido Sutil 🔊</div>
              <div style="font-size: 0.72rem; color: #94a3b8;">Chime agradable</div>
            </div>
            <input type="checkbox" ${settings.sound ? 'checked' : ''} onchange="window.ligamasterToggleNotifOption('sound', this.checked)" style="width: 18px; height: 18px; accent-color: #22c55e;">
          </label>

          <label style="background: rgba(15, 23, 42, 0.6); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Vibración Móvil 📳</div>
              <div style="font-size: 0.72rem; color: #94a3b8;">Háptico suave</div>
            </div>
            <input type="checkbox" ${settings.vibration ? 'checked' : ''} onchange="window.ligamasterToggleNotifOption('vibration', this.checked)" style="width: 18px; height: 18px; accent-color: #22c55e;">
          </label>
        </div>
      </div>

      <!-- Partidos que estás siguiendo -->
      <div style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin: 0;">
            Partidos que sigues (${followedCount})
          </h4>
          ${followedCount > 0 ? `
            <button type="button" onclick="window.ligamasterClearAllFollowedMatches()" style="background: none; border: none; font-size: 0.75rem; color: #ef4444; cursor: pointer; text-decoration: underline;">
              Dejar de seguir todos
            </button>
          ` : ''}
        </div>

        ${followedCount === 0 ? `
          <div style="padding: 1.25rem; text-align: center; background: rgba(15, 23, 42, 0.4); border-radius: 10px; border: 1px dashed rgba(255,255,255,0.1);">
            <span style="font-size: 1.5rem; display: block; margin-bottom: 0.35rem;">🔔</span>
            <div style="font-size: 0.85rem; color: #cbd5e1; font-weight: 700;">No tienes partidos seguidos aún</div>
            <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.2rem;">
              Toca la <strong>campanita 🔔</strong> en cualquier partido de la fecha o del fixture para recibir alertas cuando haya gol.
            </div>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 180px; overflow-y: auto;">
            ${settings.followedMatches.map(mId => `
              <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.7); padding: 0.6rem 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 0.82rem; color: #ffffff;">Partido ID: ${mId}</span>
                <button type="button" onclick="window.ligamasterToggleFollowMatch('${mId}')" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; border-radius: 6px; padding: 0.2rem 0.5rem; font-size: 0.72rem; cursor: pointer;">
                  Dejar de seguir
                </button>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Botón de Prueba en Vivo -->
      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.85rem; border-top: 1px solid rgba(255,255,255,0.08);">
        <button type="button" class="btn-primary-coral" onclick="window.ligamasterTestTurnoNudge()" style="padding: 0.55rem 1.15rem; font-size: 0.82rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem; background: linear-gradient(135deg, #0284c7, #0369a1); border: none;">
          <span>🔔 Probar Alerta en este Celular</span>
        </button>
        <button type="button" class="btn-outline-coral" onclick="window.ligamasterCloseNotifsModal()" style="padding: 0.55rem 1rem; font-size: 0.82rem;">
          <span>Cerrar</span>
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Inicializa el módulo de notificaciones y expone métodos en window
 */
export function initNotificationsModule() {
  updateNotificationUI();

  if (typeof window !== 'undefined') {
    window.ligamasterToggleFollowMatch = toggleFollowMatch;
    window.ligamasterToggleFollowClub = toggleFollowClub;
    window.ligamasterOpenNotifsModal = openNotificationSettingsModal;
    window.ligamasterCloseNotifsModal = closeNotificationSettingsModal;
    window.ligamasterSetNotifsMode = (mode) => {
      saveNotificationSettings({ mode });
      renderNotificationSettingsModal();
    };
    window.ligamasterToggleNotifOption = (key, val) => {
      saveNotificationSettings({ [key]: val });
    };
    window.ligamasterClearAllFollowedMatches = () => {
      saveNotificationSettings({ followedMatches: [] });
      renderNotificationSettingsModal();
      showToast('Se limpiaron los partidos seguidos.', 'info');
    };
    window.ligamasterRequestPermissionAndRefresh = async () => {
      await requestNotificationPermission();
      renderNotificationSettingsModal();
    };

    window.ligamasterShowGoalazo = showGoalazoCelebrationOverlay;
    window.ligamasterDismissGoalazo = dismissGoalazoOverlay;

    // Compatibilidad retroactiva
    window.testMsnNudgeDemo = testGoalAlertDemo;
    window.triggerMsnNudgeAlert = triggerGoalNotificationAlert;
    window.playMsnNudgeSound = playSubtleGoalAlert;
    window.requestNotificationPermission = requestNotificationPermission;
  }
}
