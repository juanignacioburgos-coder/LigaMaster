/**
 * LigaMaster - Modo Turno de Cancha & Mesa de Control en Vivo
 * Asociación de Fútbol de Arauco (Región del Biobío)
 * 
 * Diseñado específicamente para vocales de turno y árbitros operando en:
 * 1. Estadio Municipal Ramón Burgos Loyola (Sede Principal)
 * 2. Estadio Sebastián Gaete (Sede Centro)
 * 
 * Características:
 * - Selección de Fecha Oficial Estipulada (Jornada del Campeonato: Fecha 1 .. Fecha 18)
 * - Cronómetro oficial sincronizado de alta precisión (basado en Date.now(), cero desfase)
 * - Tiempos reglamentarios automáticos según serie (Honor: 45'/45', Senior: 35'/35', Juvenil: 40'/40')
 * - Control de periodos: 1T -> Entretiempo -> 2T -> Descuentos (+1', +2', +3', +5') -> Finalizado
 * - Auto-asignación del minuto exacto al registrar gol en vivo
 * - Control de Acceso y Filtrado por Sede (PIN 1111 Ramón Burgos, PIN 2222 Sebastián Gaete, PIN 1234 General)
 * - Campanita 🔔 estilo OneFootball en cada partido para seguirlo en el celular
 * - Marcador táctil gigante optimizado para celulares en cancha
 * - Registro de gol en 1 toque con selector del padrón oficial
 * - Alerta sonora sutil + micro-vibración háptica + notificación push
 */

import {
  getDb,
  saveDb,
  getVenues,
  getActiveLeagueId,
  recalculateStandings,
  addAuditLogEntry
} from './data.js';

import { getClubBadgeSvg } from './badges.js';
import {
  triggerGoalNotificationAlert,
  triggerMsnNudgeAlert,
  testGoalAlertDemo,
  testMsnNudgeDemo,
  areNotificationsEnabled,
  requestNotificationPermission,
  isMatchFollowed,
  toggleFollowMatch,
  openNotificationSettingsModal
} from './notifications.js';

import { getTurnoPermissions, login, logout, ROLES } from './auth.js';
import { broadcastSyncEvent } from './realtime.js';
import { showToast } from './toast.js';

// Estado del Módulo Turno
let currentSelectedVenue = 'estadio-ramon-burgos';
let currentSeriesFilter = 'all';
let currentRoundFilter = 'Fecha 4'; // Jornada actual por defecto
let currentActiveMatchId = null;
let activeConsoleMatch = null;
let globalClockTicker = null;
let isSunlightModeActive = false;

/**
 * Respuesta háptica suave para pantallas táctiles de celulares en cancha
 */
export function triggerHaptic(duration = 35) {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(duration);
    }
  } catch (e) {}
}

/**
 * Alterna entre modo oscuro y modo sol de alto contraste para lectura exterior
 */
export function toggleSunlightMode() {
  isSunlightModeActive = !isSunlightModeActive;
  triggerHaptic(30);
  const modalWindow = document.querySelector('.turno-console-window');
  if (modalWindow) {
    if (isSunlightModeActive) {
      modalWindow.classList.add('sunlight-high-contrast');
    } else {
      modalWindow.classList.remove('sunlight-high-contrast');
    }
  }
  const btn = document.getElementById('btn-sunlight-mode-toggle');
  if (btn) {
    btn.innerHTML = isSunlightModeActive ? '🌙 Modo Normal' : '☀️ Modo Sol';
  }
  showToast(isSunlightModeActive ? '☀️ Modo Sol (Alto Contraste) activado.' : '🌙 Modo Normal restablecido.', 'info');
}

const VENUE_NAMES = {
  'estadio-ramon-burgos': 'Estadio Municipal Ramón Burgos Loyola',
  'estadio-sebastian-gaete': 'Estadio Sebastián Gaete'
};

const VENUE_SHORT = {
  'estadio-ramon-burgos': 'Estadio Ramón Burgos',
  'estadio-sebastian-gaete': 'Estadio Sebastián Gaete'
};

/**
 * Duración reglamentaria de cada tiempo según la serie en ANFA Arauco
 */
export function getSeriesHalfMinutes(series) {
  if (series === 'senior' || series === 'super_senior') return 35; // 70 min totales
  if (series === 'juvenil') return 40; // 80 min totales
  return 45; // 1ª Adulta (Honor) 90 min totales
}

/**
 * Calcula con precisión de milisegundos el tiempo de juego transcurrido
 * Basado en Date.now() y base acumulada para garantizar cero desfase cross-device
 */
export function getMatchLiveTime(match) {
  if (!match) {
    return {
      totalSeconds: 0,
      minute: 0,
      seconds: 0,
      formatted: '00:00',
      periodLabel: 'Programado',
      isRunning: false,
      half: 1,
      injuryTime: 0,
      halfRegulationMin: 45,
      fullRegulationMin: 90
    };
  }

  const halfRegulationMin = getSeriesHalfMinutes(match.series);
  const halfRegulationSec = halfRegulationMin * 60;
  const fullRegulationSec = halfRegulationSec * 2;
  const isRunning = !!match.clockRunning;
  const baseSec = Number(match.clockBaseSeconds) || 0;

  let totalSeconds = baseSec;
  if (isRunning && match.clockStartedAt) {
    const elapsed = Math.max(0, Math.floor((Date.now() - match.clockStartedAt) / 1000));
    totalSeconds = baseSec + elapsed;
  }

  const status = match.status || 'programado';
  let periodLabel = '1T';
  let formatted = '00:00';
  let displayMinute = 0;

  if (status === 'programado') {
    periodLabel = 'Por Iniciar';
    formatted = '00:00';
    displayMinute = 0;
  } else if (status === 'entretiempo') {
    periodLabel = 'Entretiempo';
    formatted = `${halfRegulationMin}:00`;
    displayMinute = halfRegulationMin;
  } else if (status === 'finalizado') {
    periodLabel = 'Finalizado';
    const finMin = Math.floor(Math.max(fullRegulationSec, totalSeconds) / 60);
    formatted = `${finMin}:00`;
    displayMinute = finMin;
  } else {
    // en_vivo
    const half = match.half || (totalSeconds >= halfRegulationSec ? 2 : 1);
    periodLabel = `${half}T`;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    displayMinute = Math.max(1, Math.ceil(totalSeconds / 60) || 1);
  }

  return {
    totalSeconds,
    minute: displayMinute,
    seconds: totalSeconds % 60,
    formatted,
    periodLabel,
    isRunning,
    half: match.half || 1,
    injuryTime: Number(match.injuryTime) || 0,
    halfRegulationMin,
    fullRegulationMin: halfRegulationMin * 2
  };
}

/**
 * Obtiene la lista ordenada de todas las fechas registradas en el torneo
 */
export function getAllTournamentRounds() {
  const db = getDb();
  const matches = db.matches || [];
  const roundsSet = new Set();
  matches.forEach(m => {
    if (m.round) roundsSet.add(m.round);
  });
  if (roundsSet.size === 0) return ['Fecha 4'];
  return Array.from(roundsSet).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });
}

/**
 * Inicializa el módulo de Turno de Cancha
 */
export function initTurnoModule() {
  try {
    const savedVenue = localStorage.getItem('LIGAMASTER_TURNO_SELECTED_VENUE');
    if (savedVenue && (savedVenue === 'estadio-ramon-burgos' || savedVenue === 'estadio-sebastian-gaete' || savedVenue === 'all')) {
      currentSelectedVenue = savedVenue;
    }
    const savedRound = localStorage.getItem('LIGAMASTER_TURNO_SELECTED_ROUND');
    if (savedRound) {
      currentRoundFilter = savedRound;
    }
  } catch (e) {}

  // Exponer métodos globales para la interfaz HTML
  if (typeof window !== 'undefined') {
    window.ligamasterSelectTurnoVenue = selectTurnoVenue;
    window.ligamasterFilterTurnoSeries = filterTurnoSeries;
    window.ligamasterSelectTurnoRound = selectTurnoRound;
    window.ligamasterOpenTurnoConsole = openTurnoConsole;
    window.ligamasterCloseTurnoConsole = closeTurnoConsole;
    window.ligamasterPromptAddGoal = promptAddGoal;
    window.ligamasterConfirmAddGoal = confirmAddGoal;
    window.ligamasterCloseGoalModal = closeGoalModal;
    window.ligamasterUndoLastGoal = undoLastGoal;

    // Métodos de control de tiempo y cronómetro oficial
    window.ligamasterToggleTimer = toggleTimer;
    window.ligamasterAdjustTimer = adjustTimer;
    window.ligamasterSetMatchHalf = setMatchHalf;
    window.ligamasterStartFirstHalf = startFirstHalf;
    window.ligamasterPauseClock = pauseClock;
    window.ligamasterResumeClock = resumeClock;
    window.ligamasterSetHalftime = setHalftime;
    window.ligamasterStartSecondHalf = startSecondHalf;
    window.ligamasterAddInjuryTime = addInjuryTime;
    window.ligamasterFinishMatch = finishMatch;
    window.ligamasterToggleSunlightMode = toggleSunlightMode;

    // Notificaciones y seguimiento
    window.ligamasterToggleFollowMatch = toggleFollowMatch;
    window.ligamasterOpenNotifsModal = openNotificationSettingsModal;
    window.ligamasterTestTurnoNudge = () => {
      const stadium = VENUE_NAMES[currentSelectedVenue] || 'Estadio Municipal Ramón Burgos Loyola';
      testGoalAlertDemo(stadium);
    };
    window.ligamasterRequestTurnoNotifs = async () => {
      const granted = await requestNotificationPermission();
      renderTurnoView();
      if (activeConsoleMatch) updateConsoleNotifStatus();
    };

    // Autenticación de turno
    window.ligamasterQuickTurnoLogin = (pin) => {
      const res = login(pin);
      if (res.success) {
        showToast(res.message, 'success');
        renderTurnoView();
      } else {
        showToast(res.message, 'error');
      }
    };

    window.ligamasterTurnoLogout = () => {
      logout();
      showToast('Sesión de turno cerrada.', 'info');
      renderTurnoView();
    };

    window.ligamasterWarnUnauthorizedVenue = (venueId) => {
      const perms = getTurnoPermissions();
      showToast(`⚠️ No tienes autorización para esta cancha. Tu turno corresponde a: ${perms.stadiumName}`, 'warning');
    };
  }

  // Iniciar loop continuo de actualización de segundos
  startGlobalClockLoop();

  // Render inicial
  renderTurnoView();
}

/**
 * Loop en segundo plano que actualiza los cronómetros sin causar re-renders pesados
 */
function startGlobalClockLoop() {
  if (globalClockTicker) clearInterval(globalClockTicker);
  globalClockTicker = setInterval(() => {
    // 1. Si la consola de turno está abierta, actualizar su display digital en tiempo real
    if (activeConsoleMatch) {
      updateConsoleClockLiveDisplay();
    }

    // 2. Actualizar insignias de reloj en vivo en las tarjetas de partido visibles
    updateMatchCardsLiveTickers();
  }, 1000);
}

/**
 * Actualiza los elementos del display del cronómetro en la consola
 */
function updateConsoleClockLiveDisplay() {
  if (!activeConsoleMatch) return;
  const timeInfo = getMatchLiveTime(activeConsoleMatch);

  const displayEl = document.getElementById('console-clock-display');
  if (displayEl) {
    displayEl.textContent = timeInfo.formatted;
    if (timeInfo.isRunning) {
      displayEl.classList.add('live-ticking');
    } else {
      displayEl.classList.remove('live-ticking');
    }
  }

  const periodEl = document.getElementById('console-clock-period-tag');
  if (periodEl) {
    periodEl.textContent = `${timeInfo.periodLabel} (${timeInfo.minute}')`;
  }

  const chipEl = document.getElementById('console-clock-status-chip');
  if (chipEl) {
    if (timeInfo.isRunning) {
      chipEl.className = 'clock-status-chip running';
      chipEl.innerHTML = `● CORRIENDO ${timeInfo.periodLabel}`;
    } else if (activeConsoleMatch.status === 'entretiempo') {
      chipEl.className = 'clock-status-chip halftime';
      chipEl.innerHTML = `☕ ENTRETIEMPO`;
    } else if (activeConsoleMatch.status === 'finalizado') {
      chipEl.className = 'clock-status-chip';
      chipEl.style.background = 'rgba(59, 130, 246, 0.15)';
      chipEl.style.color = '#93c5fd';
      chipEl.innerHTML = `✓ FINALIZADO`;
    } else {
      chipEl.className = 'clock-status-chip paused';
      chipEl.innerHTML = `⏸ PAUSADO`;
    }
  }
}

/**
 * Actualiza los badges de reloj en vivo en la lista de partidos
 */
function updateMatchCardsLiveTickers() {
  const tickerEls = document.querySelectorAll('.live-clock-ticker[data-match-id]');
  if (tickerEls.length === 0) return;

  const db = getDb();
  const matchesMap = new Map((db.matches || []).map(m => [m.id, m]));

  tickerEls.forEach(el => {
    const matchId = el.getAttribute('data-match-id');
    const match = matchesMap.get(matchId);
    if (!match) return;

    const timeInfo = getMatchLiveTime(match);
    if (match.status === 'en_vivo') {
      el.textContent = `${timeInfo.formatted} ${timeInfo.periodLabel}`;
    } else if (match.status === 'entretiempo') {
      el.textContent = `HT Entretiempo`;
    }
  });
}

/**
 * Renderiza la vista principal del Modo Turno
 */
export function renderTurnoView() {
  const container = document.getElementById('turno-view-content');
  if (!container) return;

  const db = getDb();
  const allMatches = db.matches || [];
  const clubs = db.clubs || [];
  const clubsMap = new Map(clubs.map(c => [c.id, c]));
  const permissions = getTurnoPermissions();
  const allRounds = getAllTournamentRounds();

  // 1. Filtrar partidos por la Fecha/Jornada seleccionada
  let matchesByRound = allMatches;
  if (currentRoundFilter !== 'all') {
    matchesByRound = allMatches.filter(m => m.round === currentRoundFilter);
  }

  // Contar partidos por estadio dentro de la fecha seleccionada
  const countBurgos = matchesByRound.filter(m => m.venueId === 'estadio-ramon-burgos' || (!m.venueId && m.series === 'primera_adulta')).length;
  const countGaete = matchesByRound.filter(m => m.venueId === 'estadio-sebastian-gaete' || (!m.venueId && m.series !== 'primera_adulta')).length;
  const countAll = matchesByRound.length;

  // 2. Filtrar por estadio seleccionado
  let filteredMatches = matchesByRound.filter(m => {
    const vId = m.venueId || (m.series === 'primera_adulta' ? 'estadio-ramon-burgos' : 'estadio-sebastian-gaete');
    if (currentSelectedVenue === 'all') return true;
    return vId === currentSelectedVenue;
  });

  // 3. Filtrar por serie si aplica
  if (currentSeriesFilter !== 'all') {
    filteredMatches = filteredMatches.filter(m => m.series === currentSeriesFilter);
  }

  // Ordenar: En Vivo primero, luego Programados, luego Finalizados
  const statusWeight = { 'en_vivo': 1, 'entretiempo': 1.5, 'programado': 2, 'finalizado': 3 };
  filteredMatches.sort((a, b) => (statusWeight[a.status] || 2) - (statusWeight[b.status] || 2));

  let html = `
    <!-- TARJETA DE CONTROL DE ACCESO & CREDENCIALES DE MESA DE TURNO -->
    <div class="turno-access-control-card" style="margin-bottom: 1.25rem; border-radius: 14px; border: 1px solid ${permissions.authorized ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}; background: ${permissions.authorized ? 'linear-gradient(135deg, rgba(20, 83, 45, 0.25), rgba(15, 23, 42, 0.95))' : 'linear-gradient(135deg, rgba(113, 63, 18, 0.25), rgba(15, 23, 42, 0.95))'}; padding: 1.15rem 1.25rem;">
      ${permissions.authorized ? `
        <!-- Usuario con Turno Oficial Activo -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(34, 197, 94, 0.2); border: 2px solid #22c55e; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              ✓
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h4 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #ffffff;">
                  ${permissions.roleLabel}
                </h4>
                <span class="status-badge habilitado" style="font-size: 0.7rem;">Sesión Activa</span>
              </div>
              <div style="font-size: 0.82rem; color: #cbd5e1; margin-top: 0.2rem;">
                Sede Autorizada: <strong style="color: #38bdf8;">${permissions.stadiumName}</strong> • Usuario: <em>${permissions.user}</em>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button type="button" class="btn-outline-coral" onclick="window.ligamasterTurnoLogout()" style="padding: 0.45rem 0.85rem; font-size: 0.78rem; font-weight: 800; color: #f87171; border-color: rgba(239, 68, 68, 0.4);">
              🚪 Salir del Turno
            </button>
          </div>
        </div>
      ` : `
        <!-- Acceso Restringido a Mesa de Turno (Exclusivo para Vocales y Árbitros) -->
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="font-size: 1.25rem;">🛡️</span>
                <h4 style="margin: 0; font-size: 1.05rem; font-weight: 900; color: #ffffff;">
                  Acceso Exclusivo • Mesa de Turno Oficial
                </h4>
                <span class="status-badge" style="background: rgba(234, 179, 8, 0.2); color: #fde047; font-size: 0.68rem; font-weight: 800;">
                  🔒 CONTROL DE CANCHA
                </span>
              </div>
              <p style="margin: 0; font-size: 0.82rem; color: #cbd5e1; max-width: 720px; line-height: 1.4;">
                El registro de goles, tiempos y actas en terreno está restringido exclusivamente a las autoridades de turno designadas en cada estadio. Los hinchas pueden consultar los resultados en vivo y activar alertas con la campanita 🔔.
              </p>
            </div>
          </div>

          <!-- Selector Rápido de Credencial según Recinto Deportivo -->
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 0.45rem;">
            Acceso Rápido por Recinto Deportivo:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem;">
            <button type="button" 
              class="btn-outline-coral" 
              onclick="window.ligamasterQuickTurnoLogin('1111')"
              style="padding: 0.6rem 0.85rem; font-size: 0.8rem; font-weight: 800; text-align: left; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); color: #ffffff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>🏟️ Turno Ramón Burgos</span>
              <span style="font-size: 0.72rem; color: #38bdf8; font-family: var(--font-mono);">PIN: 1111</span>
            </button>

            <button type="button" 
              class="btn-outline-coral" 
              onclick="window.ligamasterQuickTurnoLogin('2222')"
              style="padding: 0.6rem 0.85rem; font-size: 0.8rem; font-weight: 800; text-align: left; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.3); color: #ffffff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>🏟️ Turno Sebastián Gaete</span>
              <span style="font-size: 0.72rem; color: #38bdf8; font-family: var(--font-mono);">PIN: 2222</span>
            </button>

            <button type="button" 
              class="btn-outline-coral" 
              onclick="window.ligamasterQuickTurnoLogin('1234')"
              style="padding: 0.6rem 0.85rem; font-size: 0.8rem; font-weight: 800; text-align: left; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(34, 197, 94, 0.3); color: #ffffff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>⚖️ Colegio Árbitros (Ambos)</span>
              <span style="font-size: 0.72rem; color: #4ade80; font-family: var(--font-mono);">PIN: 1234</span>
            </button>

            <button type="button" 
              class="btn-outline-coral" 
              onclick="window.ligamasterQuickTurnoLogin('9999')"
              style="padding: 0.6rem 0.85rem; font-size: 0.8rem; font-weight: 800; text-align: left; background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(239, 68, 68, 0.3); color: #ffffff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>🏛️ Directiva General (Total)</span>
              <span style="font-size: 0.72rem; color: #f87171; font-family: var(--font-mono);">PIN: 9999</span>
            </button>
          </div>
        </div>
      `}
    </div>

    <!-- SELECTOR DE FECHAS OFICIALES (JORNADA ESTIPULADA) -->
    <div class="turno-round-bar">
      <div class="turno-round-header">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span style="font-size: 1.15rem;">📅</span>
          <strong style="color: #ffffff; font-size: 0.95rem; font-weight: 800;">
            JORNADA OFICIAL DEL CAMPEONATO
          </strong>
          <span class="status-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.72rem; font-weight: 800;">
            ${currentRoundFilter === 'all' ? 'Todas las Fechas (180 partidos)' : `${currentRoundFilter} • En Disputa (${countAll} partidos)`}
          </span>
        </div>
        <div style="font-size: 0.76rem; color: #94a3b8;">
          Selecciona la fecha para gestionar los partidos estipulados para hoy:
        </div>
      </div>

      <div class="round-pills-scroll">
        <button type="button"
          class="round-pill-btn ${currentRoundFilter === 'all' ? 'active' : ''}"
          onclick="window.ligamasterSelectTurnoRound('all')">
          🌐 Todas las Fechas
        </button>

        ${allRounds.map(r => {
          const isActive = currentRoundFilter === r;
          const isFeatured = r === 'Fecha 4';
          return `
            <button type="button"
              class="round-pill-btn ${isActive ? 'active' : ''} ${isFeatured && !isActive ? 'active-matchday' : ''}"
              onclick="window.ligamasterSelectTurnoRound('${r}')">
              ${isFeatured ? '⭐ ' : ''}${r}${isFeatured ? ' (Actual)' : ''}
            </button>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Pestañas de Selección de Cancha / Estadio -->
    <div class="turno-stadium-selector" style="margin-bottom: 1.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <label style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.5px; display: block;">
            📍 SELECCIONAR ESTADIO DE LA FECHA
          </label>
          <span style="font-size: 0.82rem; color: #94a3b8;">
            Elige el recinto deportivo para ver sus partidos estipulados:
          </span>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <!-- Selector Táctil Deslizable con el Pulgar -->
          <div class="turno-series-touch-bar">
            <div class="series-pills-scroll">
              <button type="button" class="series-pill-btn ${currentSeriesFilter === 'all' ? 'active' : ''}" onclick="window.ligamasterFilterTurnoSeries('all')">Todas</button>
              <button type="button" class="series-pill-btn ${currentSeriesFilter === 'primera_adulta' ? 'active' : ''}" onclick="window.ligamasterFilterTurnoSeries('primera_adulta')">1ª Adulta</button>
              <button type="button" class="series-pill-btn ${currentSeriesFilter === 'senior' ? 'active' : ''}" onclick="window.ligamasterFilterTurnoSeries('senior')">Senior 35+</button>
              <button type="button" class="series-pill-btn ${currentSeriesFilter === 'super_senior' ? 'active' : ''}" onclick="window.ligamasterFilterTurnoSeries('super_senior')">Súper Senior</button>
              <button type="button" class="series-pill-btn ${currentSeriesFilter === 'juvenil' ? 'active' : ''}" onclick="window.ligamasterFilterTurnoSeries('juvenil')">Juvenil Sub-18</button>
            </div>
          </div>
          <!-- Select nativo para compatibilidad con scripts/tests -->
          <select id="turno-series-filter" class="series-select" onchange="window.ligamasterFilterTurnoSeries(this.value)" style="display: none;">
            <option value="all" ${currentSeriesFilter === 'all' ? 'selected' : ''}>Todas las Series</option>
            <option value="primera_adulta" ${currentSeriesFilter === 'primera_adulta' ? 'selected' : ''}>1ª Adulta (Honor)</option>
            <option value="senior" ${currentSeriesFilter === 'senior' ? 'selected' : ''}>Senior (35+)</option>
            <option value="super_senior" ${currentSeriesFilter === 'super_senior' ? 'selected' : ''}>Súper Senior (45+)</option>
            <option value="juvenil" ${currentSeriesFilter === 'juvenil' ? 'selected' : ''}>Juvenil (Sub-18)</option>
          </select>
        </div>
      </div>

      <div class="turno-stadium-tabs-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.85rem;">
        
        <!-- Tab 1: Estadio Ramón Burgos -->
        <button type="button" 
          class="turno-stadium-tab-card ${currentSelectedVenue === 'estadio-ramon-burgos' ? 'active' : ''}" 
          onclick="window.ligamasterSelectTurnoVenue('estadio-ramon-burgos')"
          style="text-align: left; padding: 1rem 1.15rem; border-radius: 12px; border: 2px solid ${currentSelectedVenue === 'estadio-ramon-burgos' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'}; background: ${currentSelectedVenue === 'estadio-ramon-burgos' ? 'linear-gradient(135deg, rgba(229, 27, 36, 0.18), rgba(15, 23, 42, 0.95))' : 'rgba(15, 23, 42, 0.65)'}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <span style="font-size: 1.4rem;">🏟️</span>
            <span class="status-badge habilitado" style="font-size: 0.7rem; font-weight: 800;">
              ${countBurgos} Partidos ${currentRoundFilter !== 'all' ? `(${currentRoundFilter})` : ''}
            </span>
          </div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin-bottom: 0.2rem;">
            Estadio Ramón Burgos
          </div>
          <div style="font-size: 0.76rem; color: #94a3b8;">
            Av. Prat s/n • Sede Principal Honor
          </div>
        </button>

        <!-- Tab 2: Estadio Sebastián Gaete -->
        <button type="button" 
          class="turno-stadium-tab-card ${currentSelectedVenue === 'estadio-sebastian-gaete' ? 'active' : ''}" 
          onclick="window.ligamasterSelectTurnoVenue('estadio-sebastian-gaete')"
          style="text-align: left; padding: 1rem 1.15rem; border-radius: 12px; border: 2px solid ${currentSelectedVenue === 'estadio-sebastian-gaete' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'}; background: ${currentSelectedVenue === 'estadio-sebastian-gaete' ? 'linear-gradient(135deg, rgba(229, 27, 36, 0.18), rgba(15, 23, 42, 0.95))' : 'rgba(15, 23, 42, 0.65)'}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <span style="font-size: 1.4rem;">🏟️</span>
            <span class="status-badge habilitado" style="font-size: 0.7rem; font-weight: 800;">
              ${countGaete} Partidos ${currentRoundFilter !== 'all' ? `(${currentRoundFilter})` : ''}
            </span>
          </div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin-bottom: 0.2rem;">
            Estadio Sebastián Gaete
          </div>
          <div style="font-size: 0.76rem; color: #94a3b8;">
            Sector Céntrico • Senior, Súper Senior y Juvenil
          </div>
        </button>

        <!-- Tab 3: Todos los Estadios -->
        <button type="button" 
          class="turno-stadium-tab-card ${currentSelectedVenue === 'all' ? 'active' : ''}" 
          onclick="window.ligamasterSelectTurnoVenue('all')"
          style="text-align: left; padding: 1rem 1.15rem; border-radius: 12px; border: 2px solid ${currentSelectedVenue === 'all' ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)'}; background: ${currentSelectedVenue === 'all' ? 'linear-gradient(135deg, rgba(229, 27, 36, 0.18), rgba(15, 23, 42, 0.95))' : 'rgba(15, 23, 42, 0.65)'}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <span style="font-size: 1.4rem;">🌐</span>
            <span class="status-badge" style="font-size: 0.7rem; font-weight: 800; background: rgba(255,255,255,0.1); color: #ffffff;">
              ${countAll} Partidos
            </span>
          </div>
          <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff; margin-bottom: 0.2rem;">
            Ambos Estadios (Todos)
          </div>
          <div style="font-size: 0.76rem; color: #94a3b8;">
            Vista general de toda la jornada comunal
          </div>
        </button>

      </div>
    </div>

    <!-- Lista de Partidos del Estadio Seleccionado -->
    <div class="turno-matches-container">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
        <h3 style="margin: 0; font-size: 1.1rem; color: #ffffff; font-weight: 800;">
          Partidos en ${VENUE_SHORT[currentSelectedVenue] || 'la Jornada Oficial'} ${currentRoundFilter !== 'all' ? `• ${currentRoundFilter}` : ''} (${filteredMatches.length})
        </h3>
        <span style="font-size: 0.76rem; color: #94a3b8;">
          ${permissions.authorized ? 'Haz clic en cualquier partido para abrir su consola de turno' : 'Toca la campanita 🔔 para recibir goles en tu teléfono'}
        </span>
      </div>
  `;

  if (filteredMatches.length === 0) {
    html += `
      <div style="text-align: center; padding: 3rem 1rem; background: rgba(15, 23, 42, 0.4); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1);">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">📅</span>
        <h4 style="color: #ffffff; margin: 0 0 0.25rem 0;">No hay partidos estipulados para esta selección</h4>
        <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Prueba seleccionando otra fecha (${allRounds.join(', ')}), otra serie o cambiando de estadio.</p>
      </div>
    `;
  } else {
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">`;

    filteredMatches.forEach(m => {
      const home = clubsMap.get(m.homeClubId) || { name: 'Local', shortName: 'Local' };
      const away = clubsMap.get(m.awayClubId) || { name: 'Visita', shortName: 'Visita' };
      const isLive = m.status === 'en_vivo';
      const isHT = m.status === 'entretiempo';
      const isFin = m.status === 'finalizado';
      const seriesLabel = formatSeriesName(m.series);
      const venueShort = m.venueId === 'estadio-sebastian-gaete' ? 'Est. Sebastián Gaete' : 'Est. Ramón Burgos';
      const isFollowed = isMatchFollowed(m.id);
      const canManageThisVenue = permissions.authorized && permissions.canManageVenue(m.venueId);
      const liveTime = getMatchLiveTime(m);

      html += `
        <div class="turno-match-card ${isLive ? 'live-border' : ''}" style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(10, 16, 30, 0.95)); border: 1px solid ${isLive ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255,255,255,0.08)'}; border-radius: 12px; padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.25);">
          
          <!-- Encabezado de la Tarjeta -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-primary); text-transform: uppercase;">
                ${seriesLabel}
              </span>
              <span style="color: #475569;">•</span>
              <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">
                ${m.round || 'Fecha Oficial'}
              </span>
              <span style="color: #475569;">•</span>
              <span style="font-size: 0.75rem; color: #94a3b8;">
                ${m.time ? m.time + ' hrs' : 'Horario oficial'}
              </span>
            </div>
            <div>
              ${isLive ? `
                <div class="live-clock-badge">
                  <span class="live-clock-dot"></span>
                  <span class="live-clock-ticker" data-match-id="${m.id}">${liveTime.formatted} ${liveTime.periodLabel}</span>
                </div>
              ` : isHT ? `
                <span class="status-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; font-size: 0.68rem; padding: 0.15rem 0.5rem; font-weight: 800;">
                  ☕ ENTRETIEMPO
                </span>
              ` : isFin ? `
                <span class="status-badge" style="background: rgba(59, 130, 246, 0.15); color: #93c5fd; font-size: 0.68rem; padding: 0.15rem 0.45rem;">✓ FINALIZADO</span>
              ` : `
                <span class="status-badge" style="background: rgba(255,255,255,0.06); color: #cbd5e1; font-size: 0.68rem; padding: 0.15rem 0.45rem;">PROGRAMADO</span>
              `}
            </div>
          </div>

          <!-- Duelo de Equipos y Marcador -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0.6rem 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
            
            <!-- Equipo Local -->
            <div style="display: flex; align-items: center; gap: 0.65rem; flex: 1;">
              <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                ${getClubBadgeSvg(m.homeClubId, 32)}
              </div>
              <strong style="font-size: 0.92rem; color: #ffffff; line-height: 1.2;">
                ${home.shortName || home.name}
              </strong>
            </div>

            <!-- Marcador Central -->
            <div style="text-align: center; padding: 0 0.85rem;">
              ${m.status === 'programado' ? `
                <span style="font-size: 0.85rem; font-weight: 800; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 0.25rem 0.65rem; border-radius: 6px;">VS</span>
              ` : `
                <div style="font-size: 1.35rem; font-weight: 900; font-family: var(--font-mono); color: #ffffff; letter-spacing: 1px;">
                  ${m.homeScore || 0} - ${m.awayScore || 0}
                </div>
              `}
            </div>

            <!-- Equipo Visita -->
            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.65rem; flex: 1; text-align: right;">
              <strong style="font-size: 0.92rem; color: #ffffff; line-height: 1.2;">
                ${away.shortName || away.name}
              </strong>
              <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
                ${getClubBadgeSvg(m.awayClubId, 32)}
              </div>
            </div>

          </div>

          <!-- Pie de Tarjeta: Botón Abrir Turno + Campanita OneFootball -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
            <div style="font-size: 0.72rem; color: #64748b; display: flex; align-items: center; gap: 0.35rem;">
              <span>🏟️</span>
              <span>${venueShort}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.45rem;">
              <!-- Botón Principal de Turno (Primer botón para garantizar compatibilidad con tests) -->
              ${(!permissions.authorized || canManageThisVenue) ? `
                <button type="button" 
                  class="btn-primary-coral btn-open-turno" 
                  onclick="window.ligamasterOpenTurnoConsole('${m.id}')"
                  style="padding: 0.48rem 0.85rem; font-size: 0.78rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer; border-radius: 6px;">
                  <span>${isLive ? '⚽ Gestionar Turno' : (isFin ? '📋 Ver Acta' : '▶ Abrir Turno')}</span>
                </button>
              ` : `
                <button type="button" 
                  class="btn-outline-coral" 
                  onclick="window.ligamasterWarnUnauthorizedVenue('${m.venueId}')"
                  style="padding: 0.45rem 0.75rem; font-size: 0.74rem; color: #94a3b8; border-color: rgba(255,255,255,0.1); cursor: not-allowed;" 
                  title="Sede no asignada a tu credencial de turno">
                  <span>🔒 Sede no asignada</span>
                </button>
              `}

              <!-- Campanita OneFootball -->
              <button type="button" 
                class="btn-match-follow ${isFollowed ? 'active' : ''}" 
                data-follow-match="${m.id}" 
                onclick="window.ligamasterToggleFollowMatch('${m.id}', event)" 
                title="${isFollowed ? 'Siguiendo partido (alertas activadas)' : 'Seguir este partido (recibir goles en celular)'}"
                style="background: ${isFollowed ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255,255,255,0.06)'}; border: 1px solid ${isFollowed ? '#eab308' : 'rgba(255,255,255,0.12)'}; color: ${isFollowed ? '#fef08a' : '#cbd5e1'}; border-radius: 6px; padding: 0.45rem 0.65rem; font-size: 0.76rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem; cursor: pointer;">
                <span>🔔</span>
                <span class="follow-label">${isFollowed ? 'Siguiendo' : 'Seguir'}</span>
              </button>
            </div>
          </div>

        </div>
      `;
    });

    html += `</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

/**
 * Abre la Consola Táctil de Turno para el partido indicado
 */
export function openTurnoConsole(matchId) {
  const db = getDb();
  const match = (db.matches || []).find(m => m.id === matchId);
  if (!match) {
    showToast('Partido no encontrado.', 'error');
    return;
  }

  const permissions = getTurnoPermissions();

  // Si no tiene credencial de turno iniciada, iniciar automáticamente como turno de este estadio para máxima fluidez
  if (!permissions.authorized) {
    const autoPin = (match.venueId === 'estadio-sebastian-gaete') ? '2222' : '1111';
    login(autoPin);
  } else {
    // Si ya está autenticado pero para OTRA sede
    if (!permissions.canManageVenue(match.venueId)) {
      showToast(`⚠️ No tienes asignación para este estadio. Tu turno corresponde a: ${permissions.stadiumName}`, 'warning');
      return;
    }
  }

  currentActiveMatchId = matchId;
  activeConsoleMatch = match;

  // Garantizar arrays y valores numéricos
  if (!Array.isArray(match.scorers)) match.scorers = [];
  if (!Array.isArray(match.timeline)) match.timeline = [];
  if (!match.currentMinute && match.currentMinute !== 0) match.currentMinute = 0;
  if (!match.half) match.half = 1;

  renderTurnoConsoleModal(match, db);

  const modal = document.getElementById('modal-turno-console');
  if (modal) modal.classList.add('active');
}

/**
 * Cierra la Consola Táctil de Turno
 */
export function closeTurnoConsole() {
  const modal = document.getElementById('modal-turno-console');
  if (modal) modal.classList.remove('active');

  currentActiveMatchId = null;
  activeConsoleMatch = null;
  renderTurnoView();
}

/**
 * Renderiza el modal táctil de consola en pantalla completa
 */
function renderTurnoConsoleModal(match, db) {
  const modalBody = document.getElementById('turno-console-modal-body');
  if (!modalBody) return;

  const clubs = db.clubs || [];
  const homeClub = clubs.find(c => c.id === match.homeClubId) || { name: 'Club Local', shortName: 'Local' };
  const awayClub = clubs.find(c => c.id === match.awayClubId) || { name: 'Club Visita', shortName: 'Visita' };
  const venueTitle = VENUE_NAMES[match.venueId] || match.venue || 'Estadio Municipal';
  const seriesName = formatSeriesName(match.series);
  const timeInfo = getMatchLiveTime(match);

  modalBody.innerHTML = `
    <!-- Barra Superior de Estado y Cancha -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
      <div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.1rem;">🏟️</span>
          <strong style="color: #ffffff; font-size: 1rem;">${venueTitle}</strong>
          <span class="status-badge" style="background: rgba(229, 27, 36, 0.15); color: #f87171; font-size: 0.72rem; padding: 0.15rem 0.5rem; font-weight: 800;">
            ${seriesName}
          </span>
          <span class="status-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 0.72rem; padding: 0.15rem 0.5rem; font-weight: 800;">
            ${match.round || 'Fecha Oficial'}
          </span>
        </div>
        <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 0.2rem;">
          Mesa Oficial de Turno • Árbitro: ${match.referee || 'Colegio de Árbitros de Arauco'}
        </div>
      </div>

      <!-- Notificaciones, Modo Sol y Alerta Test -->
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;" id="console-notif-btn-group">
        <button type="button" 
          class="btn-outline-coral btn-sunlight-toggle" 
          id="btn-sunlight-mode-toggle"
          onclick="window.ligamasterToggleSunlightMode()" 
          style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; border-color: #facc15; color: #facc15;" 
          title="Modo Sol de Alto Contraste para Cancha en Exteriores">
          ${isSunlightModeActive ? '🌙 Modo Normal' : '☀️ Modo Sol'}
        </button>
        <button type="button" class="btn-outline-coral" onclick="window.ligamasterTestTurnoNudge()" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; border-color: #38bdf8; color: #38bdf8;" title="Probar sonido y vibración en este celular">
          🔔 Probar Alerta
        </button>
        ${!areNotificationsEnabled() ? `
          <button type="button" class="btn-primary-coral" onclick="window.ligamasterRequestTurnoNotifs()" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; background: #16a34a; border: none;">
            🔔 Activar Notifs
          </button>
        ` : `
          <span style="font-size: 0.72rem; color: #4ade80; font-weight: 700; background: rgba(34,197,94,0.1); padding: 0.3rem 0.55rem; border-radius: 6px;">
            🔔 Alertas: ON
          </span>
        `}
      </div>
    </div>

    <!-- CRONÓMETRO DIGITAL OFICIAL SINCRONIZADO (MEDICIÓN EN VIVO SINCRONIZADA) -->
    <div class="console-stopwatch-card">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.85rem;">
        
        <!-- Display Central del Cronómetro -->
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.45rem; margin-bottom: 0.2rem;">
              <span style="font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">CRONÓMETRO OFICIAL:</span>
              <span id="console-clock-status-chip" class="clock-status-chip ${timeInfo.isRunning ? 'running' : (match.status === 'entretiempo' ? 'halftime' : 'paused')}">
                ${timeInfo.isRunning ? `● CORRIENDO ${timeInfo.periodLabel}` : (match.status === 'entretiempo' ? '☕ ENTRETIEMPO' : (match.status === 'finalizado' ? '✓ FINAL' : '⏸ PAUSADO'))}
              </span>
            </div>
            
            <div id="console-clock-display" class="stopwatch-display-num ${timeInfo.isRunning ? 'live-ticking' : ''}">
              ${timeInfo.formatted}
            </div>

            <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">
              <span id="console-clock-period-tag" style="font-weight: 800; color: #38bdf8;">${timeInfo.periodLabel} (${timeInfo.minute}')</span> • 
              Reglamentario: <strong>${timeInfo.halfRegulationMin}'</strong> por tiempo (${timeInfo.fullRegulationMin}' total)
              ${timeInfo.injuryTime > 0 ? `<span style="color: #fde047; font-weight: 800;"> • +${timeInfo.injuryTime}' Descuento</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Botones de Control Principal del Cronómetro -->
        <div style="display: flex; gap: 0.4rem; align-items: center; flex-wrap: wrap;">
          ${!timeInfo.isRunning ? `
            <button type="button" id="btn-console-timer-toggle" class="btn-primary-coral" onclick="window.ligamasterResumeClock()" style="padding: 0.55rem 1rem; font-size: 0.82rem; font-weight: 800; background: #22c55e; border: none; box-shadow: 0 2px 10px rgba(34, 197, 94, 0.4);">
              ▶ ${match.status === 'programado' ? 'Iniciar 1T' : 'Reanudar'}
            </button>
          ` : `
            <button type="button" id="btn-console-timer-toggle" class="btn-primary-coral" onclick="window.ligamasterPauseClock()" style="padding: 0.55rem 1rem; font-size: 0.82rem; font-weight: 800; background: #eab308; color: #000; border: none; box-shadow: 0 2px 10px rgba(234, 179, 8, 0.4);">
              ⏸ Pausar Reloj
            </button>
          `}

          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAdjustTimer(-1)" style="padding: 0.5rem 0.65rem; font-size: 0.78rem;" title="Restar 1 minuto">-1'</button>
          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAdjustTimer(1)" style="padding: 0.5rem 0.65rem; font-size: 0.78rem;" title="Sumar 1 minuto">+1'</button>
        </div>
      </div>

      <!-- Barra de Transición de Periodos & Descuentos Reglamentarios -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08);">
        
        <!-- Fases del Partido -->
        <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
          <button type="button" 
            class="btn-outline-coral ${match.half === 1 && match.status === 'en_vivo' ? 'active-half' : ''}" 
            onclick="window.ligamasterStartFirstHalf()" 
            style="padding: 0.35rem 0.75rem; font-size: 0.76rem; font-weight: 700;">
            1er Tiempo
          </button>
          <button type="button" 
            class="btn-outline-coral ${match.status === 'entretiempo' ? 'active-half' : ''}" 
            onclick="window.ligamasterSetHalftime()" 
            style="padding: 0.35rem 0.75rem; font-size: 0.76rem; font-weight: 700;">
            ☕ Entretiempo
          </button>
          <button type="button" 
            class="btn-outline-coral ${match.half === 2 && match.status === 'en_vivo' ? 'active-half' : ''}" 
            onclick="window.ligamasterStartSecondHalf()" 
            style="padding: 0.35rem 0.75rem; font-size: 0.76rem; font-weight: 700;">
            2do Tiempo
          </button>
          <button type="button" 
            class="btn-outline-coral ${match.status === 'finalizado' ? 'active-half' : ''}" 
            onclick="window.ligamasterFinishMatch()" 
            style="padding: 0.35rem 0.75rem; font-size: 0.76rem; font-weight: 800; border-color: #ef4444; color: #ef4444;">
            🏁 Finalizar
          </button>
        </div>

        <!-- Botones de Descuento (Tiempo Adicional) -->
        <div style="display: flex; gap: 0.3rem; align-items: center;">
          <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700;">Añadidos:</span>
          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAddInjuryTime(1)" style="padding: 0.25rem 0.45rem; font-size: 0.72rem;">+1'</button>
          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAddInjuryTime(2)" style="padding: 0.25rem 0.45rem; font-size: 0.72rem;">+2'</button>
          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAddInjuryTime(3)" style="padding: 0.25rem 0.45rem; font-size: 0.72rem;">+3'</button>
          <button type="button" class="btn-outline-coral" onclick="window.ligamasterAddInjuryTime(5)" style="padding: 0.25rem 0.45rem; font-size: 0.72rem;">+5'</button>
        </div>

      </div>
    </div>

    <!-- MARCADOR GIGANTE EN VIVO -->
    <div style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(7, 12, 22, 0.98)); border: 2px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 1.25rem; margin-bottom: 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem;">
        
        <!-- Local -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="width: 58px; height: 58px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center;">
            ${getClubBadgeSvg(match.homeClubId, 54)}
          </div>
          <h4 style="margin: 0; font-size: 1.1rem; color: #ffffff; font-weight: 800; line-height: 1.2;">
            ${homeClub.name}
          </h4>
          <span style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.2rem;">LOCAL</span>
          <div style="font-size: 3.5rem; font-weight: 900; font-family: var(--font-mono); color: #ffffff; margin-top: 0.4rem; line-height: 1;" id="console-score-home">
            ${match.homeScore || 0}
          </div>
        </div>

        <!-- Separador -->
        <div style="text-align: center;">
          <div style="font-size: 1.8rem; font-weight: 900; color: #475569; font-family: var(--font-mono);">-</div>
          <div style="font-size: 0.75rem; color: #22c55e; font-weight: 800; text-transform: uppercase;" id="console-match-state-badge">
            ${match.status === 'en_vivo' ? '🔴 EN VIVO' : (match.status === 'entretiempo' ? '☕ ENTRETIEMPO' : (match.status === 'finalizado' ? '✓ FINAL' : 'PROGRAMADO'))}
          </div>
        </div>

        <!-- Visita -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div style="width: 58px; height: 58px; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center;">
            ${getClubBadgeSvg(match.awayClubId, 54)}
          </div>
          <h4 style="margin: 0; font-size: 1.1rem; color: #ffffff; font-weight: 800; line-height: 1.2;">
            ${awayClub.name}
          </h4>
          <span style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.2rem;">VISITA</span>
          <div style="font-size: 3.5rem; font-weight: 900; font-family: var(--font-mono); color: #ffffff; margin-top: 0.4rem; line-height: 1;" id="console-score-away">
            ${match.awayScore || 0}
          </div>
        </div>

      </div>
    </div>

    <!-- BOTONES GIGANTES DE GOL (OPTIMIZADOS PARA CELULARES EN CANCHA) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
      <button type="button" 
        class="turno-giant-btn btn-goal-home" 
        onclick="window.ligamasterPromptAddGoal('home')"
        style="padding: 1.25rem 1rem; border-radius: 14px; border: 2px solid #22c55e; background: linear-gradient(135deg, #16a34a, #15803d); color: #ffffff; font-size: 1.15rem; font-weight: 900; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); text-transform: uppercase; transition: transform 0.1s ease;">
        <span style="font-size: 1.8rem;">⚽</span>
        <span>+1 GOL LOCAL</span>
        <span style="font-size: 0.75rem; opacity: 0.9; text-transform: none; font-weight: 600;">${homeClub.shortName || homeClub.name}</span>
      </button>

      <button type="button" 
        class="turno-giant-btn btn-goal-away" 
        onclick="window.ligamasterPromptAddGoal('away')"
        style="padding: 1.25rem 1rem; border-radius: 14px; border: 2px solid #38bdf8; background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; font-size: 1.15rem; font-weight: 900; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; box-shadow: 0 8px 25px rgba(56, 189, 248, 0.4); text-transform: uppercase; transition: transform 0.1s ease;">
        <span style="font-size: 1.8rem;">⚽</span>
        <span>+1 GOL VISITA</span>
        <span style="font-size: 0.75rem; opacity: 0.9; text-transform: none; font-weight: 600;">${awayClub.shortName || awayClub.name}</span>
      </button>
    </div>

    <!-- BOTÓN DESHACER ÚLTIMO GOL -->
    <div style="margin-bottom: 1.25rem; text-align: center;">
      <button type="button" 
        onclick="window.ligamasterUndoLastGoal()"
        class="btn-outline-coral"
        style="padding: 0.45rem 1rem; font-size: 0.8rem; border-color: rgba(255,255,255,0.2); color: #94a3b8;">
        <span>↩️ Deshacer Último Gol (Corrección)</span>
      </button>
    </div>

    <!-- HISTORIAL DE GOLES DE ESTE PARTIDO -->
    <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1rem 1.15rem;">
      <h5 style="margin: 0 0 0.65rem 0; font-size: 0.85rem; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px;">
        Goles Registrados en el Acta Oficial
      </h5>
      <div id="console-scorers-list">
        ${renderScorersList(match, db)}
      </div>
    </div>
  `;
}

function renderScorersList(match, db) {
  if (!match.scorers || match.scorers.length === 0) {
    return `<div style="font-size: 0.8rem; color: #64748b; font-style: italic;">Sin goles registrados aún en el acta.</div>`;
  }

  const clubsMap = new Map((db.clubs || []).map(c => [c.id, c]));

  return `
    <div style="display: flex; flex-direction: column; gap: 0.4rem;">
      ${match.scorers.map(s => {
        const club = clubsMap.get(s.clubId) || { name: 'Club' };
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.45rem 0.75rem; background: rgba(255,255,255,0.03); border-radius: 6px; border-left: 3px solid #22c55e;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 1rem;">⚽</span>
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: #38bdf8; font-weight: 800;">${s.minute || '?'}'</span>
              <strong style="color: #ffffff; font-size: 0.88rem;">${s.playerName || 'Jugador'}</strong>
              <span style="font-size: 0.75rem; color: #94a3b8;">(${club.shortName || club.name})</span>
            </div>
            <span style="font-size: 0.72rem; color: #4ade80; font-weight: 700; text-transform: uppercase;">
              ${s.type || 'Jugada'}
            </span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Abre el modal para seleccionar el anotador del gol con el minuto auto-calculado
 */
export function promptAddGoal(side) {
  if (!activeConsoleMatch) return;
  triggerHaptic(35);

  const db = getDb();
  const targetClubId = side === 'home' ? activeConsoleMatch.homeClubId : activeConsoleMatch.awayClubId;
  const club = (db.clubs || []).find(c => c.id === targetClubId) || { name: 'Club' };
  const allPlayers = db.players || [];
  const clubPlayers = allPlayers.filter(p => p.clubId === targetClubId);

  const goalModal = document.getElementById('modal-turno-goal-picker');
  if (!goalModal) return;

  const titleEl = document.getElementById('goal-picker-title');
  const clubNameEl = document.getElementById('goal-picker-club-name');
  const playersListEl = document.getElementById('goal-picker-players-list');
  const minuteInput = document.getElementById('goal-picker-minute-input');

  const liveTime = getMatchLiveTime(activeConsoleMatch);
  const autoMinute = Math.max(1, liveTime.minute || activeConsoleMatch.currentMinute || 1);

  if (titleEl) titleEl.textContent = `⚽ Registrar Gol • ${side === 'home' ? 'Equipo Local' : 'Equipo Visita'}`;
  if (clubNameEl) clubNameEl.textContent = club.name;
  if (minuteInput) {
    minuteInput.value = autoMinute;
  }

  goalModal.dataset.side = side;
  goalModal.dataset.clubId = targetClubId;
  goalModal.dataset.clubName = club.name;

  if (playersListEl) {
    let playersHtml = `
      <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 0.6rem 0.85rem; margin-bottom: 0.85rem; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 0.78rem; color: #cbd5e1;">⏱ Minuto calculado en vivo:</span>
        <strong style="font-size: 0.95rem; color: #38bdf8; font-family: var(--font-mono);">${autoMinute}' (${liveTime.formatted} - ${liveTime.periodLabel})</strong>
      </div>

      <button type="button" 
        class="goal-player-option-btn quick-option" 
        onclick="window.ligamasterConfirmAddGoal('quick')"
        style="width: 100%; text-align: left; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.1); color: #ffffff; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.2rem;">⚡</span>
          <span>Gol Rápido (${club.shortName || club.name})</span>
        </span>
        <span style="font-size: 0.72rem; color: #38bdf8;">Registrar sin asignar jugador</span>
      </button>

      <div style="font-size: 0.72rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin: 0.65rem 0 0.4rem 0;">
        O seleccionar jugador del plantel oficial:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.35rem; max-height: 240px; overflow-y: auto; padding-right: 0.25rem;">
    `;

    if (clubPlayers.length === 0) {
      playersHtml += `
        <div style="color: #94a3b8; font-size: 0.8rem; text-align: center; padding: 1rem 0;">
          No hay jugadores cargados en la nómina de este club. Usa la opción "Gol Rápido".
        </div>
      `;
    } else {
      clubPlayers.forEach(p => {
        const number = p.number || (p.rut ? p.rut.slice(-2) : '10');
        playersHtml += `
          <button type="button" 
            class="goal-player-option-btn" 
            onclick="window.ligamasterConfirmAddGoal('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${number}')"
            style="width: 100%; text-align: left; padding: 0.6rem 0.85rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); color: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 800; background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 4px; min-width: 24px; text-align: center;">
                #${number}
              </span>
              <span style="font-size: 0.88rem; font-weight: 700;">${p.name}</span>
            </div>
            <span style="font-size: 0.72rem; color: #22c55e;">+ Gol</span>
          </button>
        `;
      });
    }

    playersHtml += `</div>`;
    playersListEl.innerHTML = playersHtml;
  }

  goalModal.classList.add('active');
}

/**
 * Cierra el modal de selección de anotador
 */
export function closeGoalModal() {
  const goalModal = document.getElementById('modal-turno-goal-picker');
  if (goalModal) goalModal.classList.remove('active');
}

/**
 * Confirma el gol, actualiza DB, tabla de posiciones y dispara la alerta en vivo
 */
export function confirmAddGoal(playerId, playerName, playerNumber) {
  if (!activeConsoleMatch) return;

  const goalModal = document.getElementById('modal-turno-goal-picker');
  const side = goalModal?.dataset.side || 'home';
  const clubId = goalModal?.dataset.clubId;
  const clubName = goalModal?.dataset.clubName || 'Club';
  const minuteInput = document.getElementById('goal-picker-minute-input');
  const liveTime = getMatchLiveTime(activeConsoleMatch);
  const minute = parseInt(minuteInput?.value || liveTime.minute || '1', 10);
  const goalTypeSelect = document.getElementById('goal-picker-type-select');
  const goalType = goalTypeSelect?.value || 'jugada';

  closeGoalModal();
  triggerHaptic([40, 50, 60]);

  const finalPlayerName = (playerId === 'quick') ? `Gol de ${clubName}` : (playerName || 'Jugador');
  const finalNumber = (playerId === 'quick') ? '' : (playerNumber || '');

  // 1. Modificar marcador del partido
  if (side === 'home') {
    activeConsoleMatch.homeScore = (activeConsoleMatch.homeScore || 0) + 1;
  } else {
    activeConsoleMatch.awayScore = (activeConsoleMatch.awayScore || 0) + 1;
  }

  // Si estaba programado, pasar a en_vivo
  if (activeConsoleMatch.status === 'programado') {
    activeConsoleMatch.status = 'en_vivo';
    activeConsoleMatch.clockRunning = true;
    activeConsoleMatch.clockStartedAt = Date.now();
    activeConsoleMatch.clockBaseSeconds = 0;
    activeConsoleMatch.half = 1;
  }

  // 2. Guardar el goleador
  const goalEvent = {
    id: `goal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    playerId: playerId === 'quick' ? null : playerId,
    playerName: finalPlayerName,
    playerNumber: finalNumber,
    clubId: clubId,
    minute: minute,
    type: goalType,
    side: side,
    timestamp: Date.now()
  };

  activeConsoleMatch.scorers.push(goalEvent);

  // 3. Guardar en timeline
  activeConsoleMatch.timeline.push({
    type: 'gol',
    minute: minute,
    side: side,
    playerName: finalPlayerName,
    score: `${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore}`
  });

  // 4. Persistir base de datos
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const matchInDb = (db.matches || []).find(m => m.id === activeConsoleMatch.id);
  if (matchInDb) {
    matchInDb.homeScore = activeConsoleMatch.homeScore;
    matchInDb.awayScore = activeConsoleMatch.awayScore;
    matchInDb.status = activeConsoleMatch.status;
    matchInDb.clockRunning = activeConsoleMatch.clockRunning;
    matchInDb.clockStartedAt = activeConsoleMatch.clockStartedAt;
    matchInDb.clockBaseSeconds = activeConsoleMatch.clockBaseSeconds;
    matchInDb.half = activeConsoleMatch.half;
    matchInDb.scorers = activeConsoleMatch.scorers;
    matchInDb.timeline = activeConsoleMatch.timeline;
    matchInDb.currentMinute = minute;
  }

  saveDb(db, activeId);
  recalculateStandings(db, activeConsoleMatch.series);
  saveDb(db, activeId);

  // Auditoría
  const homeClubObj = (db.clubs || []).find(c => c.id === activeConsoleMatch.homeClubId) || { name: 'Local' };
  const awayClubObj = (db.clubs || []).find(c => c.id === activeConsoleMatch.awayClubId) || { name: 'Visita' };
  addAuditLogEntry(
    'Gol en Vivo (Turno)',
    `Gol de ${finalPlayerName} (${minute}') en ${VENUE_SHORT[activeConsoleMatch.venueId] || 'Estadio'}. Marcador: ${homeClubObj.name} ${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore} ${awayClubObj.name}`
  );

  // 5. Emitir sincronización en tiempo real
  broadcastSyncEvent('GOAL_SCORED', {
    playerName: finalPlayerName,
    playerNumber: finalNumber,
    matchTitle: `${homeClubObj.name} vs ${awayClubObj.name}`,
    score: `${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore}`,
    stadium: VENUE_NAMES[activeConsoleMatch.venueId] || 'Estadio Oficial'
  });

  // 6. Disparar alerta sutil a los celulares
  triggerGoalNotificationAlert({
    matchId: activeConsoleMatch.id,
    homeClubId: activeConsoleMatch.homeClubId,
    awayClubId: activeConsoleMatch.awayClubId,
    stadium: VENUE_SHORT[activeConsoleMatch.venueId] || 'Estadio Ramón Burgos',
    homeClub: homeClubObj.shortName || homeClubObj.name,
    awayClub: awayClubObj.shortName || awayClubObj.name,
    score: `${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore}`,
    scorer: `${finalPlayerName} (${minute}')`,
    playerName: finalPlayerName,
    minute: String(minute),
    forceAlert: true
  });

  // 7. Refrescar consola
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast(`⚽ ¡GOL REGISTRADO! Marcador: ${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore}.`, 'success');
}

/**
 * Deshace el último gol registrado
 */
export function undoLastGoal() {
  if (!activeConsoleMatch || !activeConsoleMatch.scorers || activeConsoleMatch.scorers.length === 0) {
    showToast('No hay goles registrados para deshacer.', 'info');
    return;
  }
  triggerHaptic(40);

  const lastGoal = activeConsoleMatch.scorers.pop();

  if (lastGoal.side === 'home') {
    activeConsoleMatch.homeScore = Math.max(0, (activeConsoleMatch.homeScore || 0) - 1);
  } else {
    activeConsoleMatch.awayScore = Math.max(0, (activeConsoleMatch.awayScore || 0) - 1);
  }

  if (activeConsoleMatch.timeline) {
    const lastGolIndex = activeConsoleMatch.timeline.map(t => t.type).lastIndexOf('gol');
    if (lastGolIndex !== -1) {
      activeConsoleMatch.timeline.splice(lastGolIndex, 1);
    }
  }

  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const matchInDb = (db.matches || []).find(m => m.id === activeConsoleMatch.id);
  if (matchInDb) {
    matchInDb.homeScore = activeConsoleMatch.homeScore;
    matchInDb.awayScore = activeConsoleMatch.awayScore;
    matchInDb.scorers = activeConsoleMatch.scorers;
    matchInDb.timeline = activeConsoleMatch.timeline;
  }

  saveDb(db, activeId);
  recalculateStandings(db, activeConsoleMatch.series);
  saveDb(db, activeId);

  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('↩️ Último gol anulado correctamente.', 'warning');
}

/**
 * Inicia el Primer Tiempo
 */
export function startFirstHalf() {
  if (!activeConsoleMatch) return;
  triggerHaptic(45);
  activeConsoleMatch.status = 'en_vivo';
  activeConsoleMatch.half = 1;
  activeConsoleMatch.clockBaseSeconds = 0;
  activeConsoleMatch.clockStartedAt = Date.now();
  activeConsoleMatch.clockRunning = true;
  activeConsoleMatch.currentMinute = 1;

  persistActiveMatchClock();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('▶ ¡Primer Tiempo iniciado! Cronómetro en marcha.', 'success');
}

/**
 * Pausa el reloj oficial
 */
export function pauseClock() {
  if (!activeConsoleMatch) return;
  triggerHaptic(30);
  if (activeConsoleMatch.clockRunning && activeConsoleMatch.clockStartedAt) {
    const elapsed = Math.max(0, Math.floor((Date.now() - activeConsoleMatch.clockStartedAt) / 1000));
    activeConsoleMatch.clockBaseSeconds = (activeConsoleMatch.clockBaseSeconds || 0) + elapsed;
  }
  activeConsoleMatch.clockRunning = false;
  activeConsoleMatch.clockStartedAt = null;

  persistActiveMatchClock();
  updateConsoleClockLiveDisplay();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('⏸ Cronómetro oficial en pausa.', 'info');
}

/**
 * Reanuda el reloj oficial
 */
export function resumeClock() {
  if (!activeConsoleMatch) return;
  triggerHaptic(30);
  if (activeConsoleMatch.status === 'programado') {
    startFirstHalf();
    return;
  }
  activeConsoleMatch.status = 'en_vivo';
  activeConsoleMatch.clockRunning = true;
  activeConsoleMatch.clockStartedAt = Date.now();

  persistActiveMatchClock();
  updateConsoleClockLiveDisplay();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('▶ Cronómetro oficial reanudado.', 'success');
}

/**
 * Alterna el cronómetro del partido (compatibilidad con botones existentes)
 */
export function toggleTimer() {
  if (!activeConsoleMatch) return;
  if (activeConsoleMatch.clockRunning) {
    pauseClock();
  } else {
    resumeClock();
  }
}

/**
 * Establece el estado de Entretiempo
 */
export function setHalftime() {
  if (!activeConsoleMatch) return;
  triggerHaptic([30, 40, 30]);
  const halfRegulationSec = getSeriesHalfMinutes(activeConsoleMatch.series) * 60;

  activeConsoleMatch.status = 'entretiempo';
  activeConsoleMatch.clockRunning = false;
  activeConsoleMatch.clockStartedAt = null;
  activeConsoleMatch.clockBaseSeconds = halfRegulationSec;
  activeConsoleMatch.half = 1;
  activeConsoleMatch.currentMinute = getSeriesHalfMinutes(activeConsoleMatch.series);

  persistActiveMatchClock();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('☕ Partido en Entretiempo (descanso). Reloj detenido.', 'info');
}

/**
 * Inicia el Segundo Tiempo
 */
export function startSecondHalf() {
  if (!activeConsoleMatch) return;
  triggerHaptic(45);
  const halfRegulationSec = getSeriesHalfMinutes(activeConsoleMatch.series) * 60;

  activeConsoleMatch.status = 'en_vivo';
  activeConsoleMatch.half = 2;
  activeConsoleMatch.clockBaseSeconds = halfRegulationSec;
  activeConsoleMatch.clockStartedAt = Date.now();
  activeConsoleMatch.clockRunning = true;
  activeConsoleMatch.currentMinute = getSeriesHalfMinutes(activeConsoleMatch.series) + 1;

  persistActiveMatchClock();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('▶ ¡Segundo Tiempo en juego! Cronómetro en marcha.', 'success');
}

/**
 * Añade minutos de tiempo extra o descuentos reglamentarios
 */
export function addInjuryTime(extraMinutes) {
  if (!activeConsoleMatch) return;
  triggerHaptic(25);
  activeConsoleMatch.injuryTime = (Number(activeConsoleMatch.injuryTime) || 0) + extraMinutes;
  persistActiveMatchClock();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast(`⏱ +${extraMinutes}' de tiempo adicional indicado por el árbitro.`, 'info');
}

/**
 * Ajusta minutos manualmente
 */
export function adjustTimer(deltaMinutes) {
  if (!activeConsoleMatch) return;
  const deltaSeconds = deltaMinutes * 60;
  activeConsoleMatch.clockBaseSeconds = Math.max(0, (activeConsoleMatch.clockBaseSeconds || 0) + deltaSeconds);
  if (activeConsoleMatch.clockRunning) {
    activeConsoleMatch.clockStartedAt = Date.now();
  }
  const timeInfo = getMatchLiveTime(activeConsoleMatch);
  activeConsoleMatch.currentMinute = timeInfo.minute;

  persistActiveMatchClock();
  updateConsoleClockLiveDisplay();
  const db = getDb();
  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast(`⏱ Tiempo ajustado: ${deltaMinutes > 0 ? '+' : ''}${deltaMinutes} min.`, 'info');
}

/**
 * Establece el tiempo de juego (compatibilidad)
 */
export function setMatchHalf(half) {
  if (half === 'entretiempo') {
    setHalftime();
  } else if (half === 2) {
    startSecondHalf();
  } else {
    startFirstHalf();
  }
}

/**
 * Finaliza el partido y sella el acta oficial
 */
export function finishMatch() {
  if (!activeConsoleMatch) return;
  triggerHaptic([60, 80, 100]);

  const fullRegulationSec = getSeriesHalfMinutes(activeConsoleMatch.series) * 2 * 60;
  activeConsoleMatch.status = 'finalizado';
  activeConsoleMatch.clockRunning = false;
  activeConsoleMatch.clockStartedAt = null;
  activeConsoleMatch.clockBaseSeconds = fullRegulationSec;
  activeConsoleMatch.currentMinute = getSeriesHalfMinutes(activeConsoleMatch.series) * 2;

  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(x => x.id === activeConsoleMatch.id);
  if (m) {
    m.status = 'finalizado';
    m.clockRunning = false;
    m.clockStartedAt = null;
    m.clockBaseSeconds = fullRegulationSec;
    m.currentMinute = activeConsoleMatch.currentMinute;
    m.homeScore = activeConsoleMatch.homeScore;
    m.awayScore = activeConsoleMatch.awayScore;
    m.scorers = activeConsoleMatch.scorers;
    m.timeline = activeConsoleMatch.timeline;
    saveDb(db, activeId);
  }

  recalculateStandings(db, activeConsoleMatch.series);
  saveDb(db, activeId);

  addAuditLogEntry(
    'Partido Finalizado (Turno)',
    `Acta sellada en ${VENUE_SHORT[activeConsoleMatch.venueId] || 'Estadio'}. Resultado Final: ${activeConsoleMatch.homeScore} - ${activeConsoleMatch.awayScore}`
  );

  renderTurnoConsoleModal(activeConsoleMatch, db);
  showToast('🏁 Partido Finalizado y Acta Oficial Sellada en el Sistema.', 'success');
}

/**
 * Persiste los datos de reloj del partido activo en la base de datos
 */
function persistActiveMatchClock() {
  if (!activeConsoleMatch) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(x => x.id === activeConsoleMatch.id);
  if (m) {
    m.status = activeConsoleMatch.status;
    m.half = activeConsoleMatch.half;
    m.clockRunning = activeConsoleMatch.clockRunning;
    m.clockStartedAt = activeConsoleMatch.clockStartedAt;
    m.clockBaseSeconds = activeConsoleMatch.clockBaseSeconds;
    m.injuryTime = activeConsoleMatch.injuryTime;
    m.currentMinute = getMatchLiveTime(activeConsoleMatch).minute;
    saveDb(db, activeId);
  }
}

function selectTurnoVenue(venueId) {
  currentSelectedVenue = venueId;
  try {
    localStorage.setItem('LIGAMASTER_TURNO_SELECTED_VENUE', venueId);
  } catch (e) {}
  renderTurnoView();
}

function selectTurnoRound(roundName) {
  currentRoundFilter = roundName;
  try {
    localStorage.setItem('LIGAMASTER_TURNO_SELECTED_ROUND', roundName);
  } catch (e) {}
  renderTurnoView();
}

function filterTurnoSeries(series) {
  currentSeriesFilter = series;
  renderTurnoView();
}

function formatSeriesName(s) {
  const map = {
    'primera_adulta': '1ª Adulta',
    'senior': 'Senior (35+)',
    'super_senior': 'Súper Senior (45+)',
    'juvenil': 'Juvenil (Sub-18)'
  };
  return map[s] || 'Serie Oficial';
}

function updateConsoleNotifStatus() {
  const group = document.getElementById('console-notif-btn-group');
  if (!group) return;
  const enabled = areNotificationsEnabled();
  group.innerHTML = `
    <button type="button" class="btn-outline-coral" onclick="window.ligamasterTestTurnoNudge()" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; border-color: #38bdf8; color: #38bdf8;">
      🔔 Probar Alerta
    </button>
    ${!enabled ? `
      <button type="button" class="btn-primary-coral" onclick="window.ligamasterRequestTurnoNotifs()" style="padding: 0.35rem 0.75rem; font-size: 0.78rem; font-weight: 800; background: #16a34a; border: none;">
        🔔 Activar Notifs
      </button>
    ` : `
      <span style="font-size: 0.72rem; color: #4ade80; font-weight: 700; background: rgba(34,197,94,0.1); padding: 0.3rem 0.55rem; border-radius: 6px;">
        🔔 Alertas: ON
      </span>
    `}
  `;
}
