/**
 * LigaPro Evolution - Módulo de Notificaciones Push, Alertas Móviles y Efectos Sonoros
 * Asociación de Fútbol Amateur de Arauco
 */

let audioCtx = null;

/**
 * Inicializa el contexto de audio en el primer clic o interacción del usuario
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
 * Genera un sonido de corneta de estadio y silbato de gol mediante Web Audio API
 * (Funciona 100% offline, sin requerir archivos mp3 externos)
 */
export function playGoalSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Silbatazo de árbitro (doble trino agudo ~2600Hz)
    [0, 0.18].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2600, now + offset);
      osc.frequency.exponentialRampToValueAtTime(2400, now + offset + 0.12);

      gain.gain.setValueAtTime(0.15, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.13);
    });

    // 2. Sirena / Corneta de Estadio (Acorde potente y resonante)
    const hornStart = now + 0.35;
    const freqs = [220, 277.18, 329.63, 440]; // Acorde mayor brillante

    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, hornStart);

      // Modulación tipo sirena de cancha
      osc.frequency.linearRampToValueAtTime(f * 1.05, hornStart + 0.8);
      osc.frequency.linearRampToValueAtTime(f, hornStart + 1.6);

      gain.gain.setValueAtTime(0.08, hornStart);
      gain.gain.linearRampToValueAtTime(0.12, hornStart + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, hornStart + 1.8);

      // Filtro pasa-bajos para calidez de megafonía
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, hornStart);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(hornStart);
      osc.stop(hornStart + 1.85);
    });
  } catch (err) {
    console.warn('Audio feedback no disponible:', err);
  }
}

/**
 * Chime suave de dos tonos para noticias y actualizaciones
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

      gain.gain.setValueAtTime(0.12, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.35);
    });
  } catch (err) {
    console.warn('Chime no disponible:', err);
  }
}

/**
 * Activa la vibración táctil en teléfonos móviles
 */
export function vibratePhone(pattern = [250, 100, 250, 100, 450]) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

/**
 * Verifica si el usuario tiene las notificaciones habilitadas
 */
export function areNotificationsEnabled() {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  return Notification.permission === 'granted';
}

/**
 * Solicita permiso al usuario para enviar alertas de goles al celular o PC
 */
export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    if (window.showToast) {
      window.showToast('⚠️ Tu navegador no soporta notificaciones de sistema.');
    }
    return false;
  }

  // Activar audio context con el gesto del usuario
  getAudioContext();

  try {
    const permission = await Notification.requestPermission();
    updateNotificationUI();

    if (permission === 'granted') {
      localStorage.setItem('LIGAPRO_NOTIFS_ENABLED', 'true');
      if (window.showToast) {
        window.showToast('🔔 ¡Alertas activadas! Recibirás los goles y noticias de Arauco.');
      }
      // Probar primera notificación de bienvenida
      sendWelcomeNotification();
      return true;
    } else if (permission === 'denied') {
      localStorage.setItem('LIGAPRO_NOTIFS_ENABLED', 'false');
      if (window.showToast) {
        window.showToast('ℹ️ Notificaciones bloqueadas en los ajustes de tu navegador.');
      }
      return false;
    }
  } catch (err) {
    console.error('Error al solicitar permiso de notificación:', err);
    return false;
  }
}

/**
 * Envía una notificación nativa al sistema operativo del celular o computadora
 */
export function sendPushAlert({ title, body, icon = '⚽', tag = 'ligapro-alert', playSound = true, vibrate = true }) {
  if (playSound) {
    playGoalSound();
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
    title: '⚽ LigaPro Evolution • Arauco',
    body: '¡Suscripción activa! Te avisaremos al instante cuando se marque un gol en la fecha.',
    tag: 'ligapro-welcome',
    playSound: false,
    vibrate: false
  });
}

/**
 * Envía una alerta de Gol oficial
 */
export function triggerGoalNotification({ playerName, playerNumber, matchTitle, score }) {
  const title = `⚽ ¡GOOOL DE ${playerName.toUpperCase()}!`;
  const body = `${matchTitle ? matchTitle + ' • ' : ''}Camiseta #${playerNumber || ''} acaba de anotar. ¡Marcador actualizado en vivo!`;

  sendPushAlert({
    title,
    body,
    tag: 'ligapro-goal-' + Date.now(),
    playSound: true,
    vibrate: true
  });
}

/**
 * Envía una alerta de Noticia / Comunicado oficial
 */
export function triggerNewsNotification({ title, category, author }) {
  playNewsChime();
  vibratePhone([150, 80, 150]);

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    sendPushAlert({
      title: `📰 ${category || 'OFICIAL'}: ${title}`,
      body: `Publicado por ${author || 'Prensa Oficial'}. Toca para leer la crónica completa.`,
      tag: 'ligamaster-news-' + Date.now(),
      playSound: false,
      vibrate: false
    });
  }
}

/**
 * Prueba manual para comprobar sonido, vibración y notificación push
 */
export function testGoalAlertDemo() {
  getAudioContext();
  
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
    requestNotificationPermission().then((granted) => {
      if (granted) {
        setTimeout(executeTestAlert, 500);
      } else {
        // Ejecutar sonido y vibración aunque la notificación del OS esté bloqueada
        executeTestAlert();
      }
    });
  } else {
    executeTestAlert();
  }
}

function executeTestAlert() {
  triggerGoalNotification({
    playerName: 'Mauricio Neira',
    playerNumber: '9',
    matchTitle: 'C.D. Jorge Robledo vs Brisas del Mar',
    score: 'Robledo 2 - 1 Brisas'
  });

  // Disparar overlay visual de golazo en pantalla
  document.dispatchEvent(new CustomEvent('ligapro:goal-scored', {
    detail: {
      playerName: 'Mauricio Neira (Simulación)',
      playerNumber: '9'
    }
  }));

  if (window.showToast) {
    window.showToast('🔊 Alerta de gol ejecutada: Sonido de corneta, vibración y notificación push.');
  }
}

/**
 * Actualiza el texto y apariencia de los botones de notificación en la interfaz
 */
export function updateNotificationUI() {
  const btnHeader = document.getElementById('btn-notifications-toggle');
  const icon = document.getElementById('notif-icon');
  const label = document.getElementById('notif-label');

  const enabled = areNotificationsEnabled();

  if (btnHeader) {
    if (enabled) {
      btnHeader.classList.add('notifs-active');
      if (icon) icon.textContent = '🔔';
      if (label) label.textContent = 'Alertas: ON';
      btnHeader.title = 'Alertas de gol activadas en tu dispositivo (haz clic para probar)';
    } else {
      btnHeader.classList.remove('notifs-active');
      if (icon) icon.textContent = '🔕';
      if (label) label.textContent = 'Activar Alertas';
      btnHeader.title = 'Activar alertas de gol y noticias en tu celular o PC';
    }
  }

  // Actualizar banners o widgets en la página
  const bannerBtn = document.getElementById('btn-banner-activate-notifs');
  if (bannerBtn) {
    if (enabled) {
      bannerBtn.innerHTML = '<span>✓</span> <span>Alertas Activadas en tu Celular</span>';
      bannerBtn.classList.remove('btn-fifa-glow');
      bannerBtn.classList.add('btn-secondary');
    } else {
      bannerBtn.innerHTML = '<span>🔔</span> <span>Activar Alertas en mi Celular</span>';
      bannerBtn.classList.add('btn-fifa-glow');
      bannerBtn.classList.remove('btn-secondary');
    }
  }
}

/**
 * Inicializa los controladores de eventos para el módulo de notificaciones
 */
export function initNotificationsModule() {
  updateNotificationUI();

  // Botón en cabecera
  const btnHeader = document.getElementById('btn-notifications-toggle');
  btnHeader?.addEventListener('click', () => {
    if (areNotificationsEnabled()) {
      testGoalAlertDemo();
    } else {
      requestNotificationPermission();
    }
  });

  // Botón del banner promocional en la Sala de Prensa
  const bannerBtn = document.getElementById('btn-banner-activate-notifs');
  bannerBtn?.addEventListener('click', () => {
    if (areNotificationsEnabled()) {
      testGoalAlertDemo();
    } else {
      requestNotificationPermission();
    }
  });

  const testBtn = document.getElementById('btn-test-goal-alert');
  testBtn?.addEventListener('click', () => {
    testGoalAlertDemo();
  });
}
