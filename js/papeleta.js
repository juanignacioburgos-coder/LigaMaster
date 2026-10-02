/**
 * LigaPro Amateur - Motor de Papeleta Digital de Turno en Vivo
 * Asociación ANFA Arauco
 * Control de incidencias, cronómetro, validación anti-suplantación y firmas arbitrales
 */

import { getDb, saveDb, setActiveMatch } from './data.js';
import { renderStandingsView, renderTopScorersView } from './standings.js';
import { renderPlayersView, renderSanctionsView } from './players.js';
import { canEditMatch, canManageSanctions, isReadOnly } from './auth.js';
import { renderTreasuryOverview, renderTransactionsTable } from './treasury.js';
import { getClubBadgeSvg } from './badges.js';

let timerInterval = null;
let currentActiveTeamTab = 'home'; // 'home' o 'away'
let isDualScreenActive = false;

export function initPapeleta() {
  renderMulticanchaBar();
  setupDualScreenToggle();
  renderPapeletaHeader();
  renderPapeletaRoster();
  renderPapeletaTimeline();
  setupEventListeners();
  setupQuickDigitizeModule();
  setupBlankSheetModule();
  setupSignedSheetModal();

  // Escuchar cambios de rol de seguridad
  window.addEventListener('ligapro:role-changed', () => {
    renderMulticanchaBar();
    renderPapeletaHeader();
    renderPapeletaRoster();
  });

  // Escuchar cambios de partido activo (Multi-Cancha)
  window.addEventListener('ligapro:match-changed', () => {
    renderMulticanchaBar();
    renderPapeletaHeader();
    renderPapeletaRoster();
    renderPapeletaTimeline();
    renderDualScreenView();
  });
}

/**
 * Renderiza el encabezado del partido, marcador y permisos según rol
 */
export function renderPapeletaHeader() {
  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId) || db.matches[0];
  const homeClub = db.clubs.find(c => c.id === match.homeClubId);
  const awayClub = db.clubs.find(c => c.id === match.awayClubId);

  // Nombres y escudos
  const homeNameEl = document.getElementById('match-home-name');
  const awayNameEl = document.getElementById('match-away-name');
  const homeBadgeEl = document.getElementById('match-home-badge');
  const awayBadgeEl = document.getElementById('match-away-badge');
  const homeScoreEl = document.getElementById('match-home-score');
  const awayScoreEl = document.getElementById('match-away-score');
  const matchClockEl = document.getElementById('match-clock-minute');
  const matchHalfEl = document.getElementById('match-half-label');
  const matchStatusBadgeEl = document.getElementById('match-status-badge');
  const matchVenueEl = document.getElementById('match-venue-label');
  const matchRefereeEl = document.getElementById('match-referee-label');

  if (homeNameEl) homeNameEl.textContent = homeClub ? homeClub.name : 'Equipo Local';
  if (awayNameEl) awayNameEl.textContent = awayClub ? awayClub.name : 'Equipo Visita';
  if (homeBadgeEl) homeBadgeEl.innerHTML = homeClub ? getClubBadgeSvg(homeClub.id, 56) : '⚓';
  if (awayBadgeEl) awayBadgeEl.innerHTML = awayClub ? getClubBadgeSvg(awayClub.id, 56) : '🌊';
  if (homeScoreEl) homeScoreEl.textContent = match.homeScore;
  if (awayScoreEl) awayScoreEl.textContent = match.awayScore;
  if (matchClockEl) matchClockEl.textContent = `${match.currentMinute}'`;
  if (matchHalfEl) matchHalfEl.textContent = match.half === 1 ? '1er Tiempo' : '2do Tiempo';
  if (matchVenueEl) matchVenueEl.textContent = `🏟️ ${match.venue}`;
  if (matchRefereeEl) matchRefereeEl.textContent = `👔 ${match.referee}`;

  if (matchStatusBadgeEl) {
    if (match.status === 'en_vivo') {
      matchStatusBadgeEl.className = 'badge-live';
      matchStatusBadgeEl.innerHTML = 'EN VIVO • EN DIRECTO';
    } else if (match.status === 'finalizado') {
      matchStatusBadgeEl.className = 'status-badge';
      matchStatusBadgeEl.style.background = 'rgba(59, 130, 246, 0.2)';
      matchStatusBadgeEl.style.color = '#93c5fd';
      matchStatusBadgeEl.innerHTML = '✓ PARTIDO FINALIZADO Y SELLADO';
    } else {
      matchStatusBadgeEl.className = 'status-badge';
      matchStatusBadgeEl.innerHTML = 'PROGRAMADO';
    }
  }

  // Control de interfaz según Rol (Modo Público / Hincha vs Turno de Cancha)
  const editAllowed = canEditMatch(match.id);
  const lockNotice = document.getElementById('papeleta-lock-notice');
  const controllerBar = document.querySelector('.match-controller-bar');
  const antiFraudBanner = document.getElementById('match-antifraud-banner');
  const shiftOperatorLabel = document.getElementById('shift-operator-info');

  // En modo público: ocultar barra de botones de edición y cartel de bloqueo
  if (lockNotice) lockNotice.style.display = 'none';
  if (controllerBar) {
    controllerBar.style.display = editAllowed ? 'flex' : 'none';
  }

  // Banner público de Fe Pública / Anti-Fraude con botón para ver foto de papeleta firmada
  if (antiFraudBanner) {
    antiFraudBanner.style.display = 'flex';
    const statusText = document.getElementById('antifraud-status-text');
    if (statusText) {
      statusText.textContent = match.ratificationLabel || 'Marcador firmado en cancha por capitanes y árbitro';
    }
  }

  if (shiftOperatorLabel && match.shiftOperator) {
    shiftOperatorLabel.textContent = `Mesa de Turno: ${match.shiftOperator.name} (${match.shiftOperator.isNeutral ? 'Neutral' : 'Club Asignado'})`;
  }

  // Deshabilitar / Habilitar botones de acción en cancha si está editando
  const btnGoal = document.getElementById('btn-open-goal-modal');
  const btnCard = document.getElementById('btn-open-card-modal');
  const btnSub = document.getElementById('btn-open-sub-modal');
  const btnTimer = document.getElementById('btn-toggle-clock');
  const btnFinalize = document.getElementById('btn-finalize-match');

  const disableActions = !editAllowed || match.status === 'finalizado';
  if (btnGoal) btnGoal.disabled = disableActions;
  if (btnCard) btnCard.disabled = disableActions;
  if (btnSub) btnSub.disabled = disableActions;
  if (btnTimer) btnTimer.disabled = disableActions;
  if (btnFinalize) btnFinalize.disabled = !editAllowed || match.status === 'finalizado';

  // Nombres en selector de nómina
  const tabHomeBtn = document.getElementById('papeleta-tab-home');
  const tabAwayBtn = document.getElementById('papeleta-tab-away');
  if (tabHomeBtn && homeClub) tabHomeBtn.innerHTML = `${homeClub.badgeEmoji} Nómina ${homeClub.shortName}`;
  if (tabAwayBtn && awayClub) tabAwayBtn.innerHTML = `${awayClub.badgeEmoji} Nómina ${awayClub.shortName}`;

  // Firmas
  renderSignatures(match);
}

/**
 * Renderiza la nómina de jugadores para el check-in previo
 */
export function renderPapeletaRoster() {
  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId) || db.matches[0];
  const targetClubId = currentActiveTeamTab === 'home' ? match.homeClubId : match.awayClubId;
  const clubPlayers = db.players.filter(p => p.clubId === targetClubId);

  const container = document.getElementById('papeleta-roster-body');
  if (!container) return;

  const canEdit = canEditMatch() && match.status !== 'finalizado';

  let html = '';
  clubPlayers.forEach(p => {
    const isSuspended = p.status === 'suspendido';
    const isWarning = p.yellowCards >= 4 && !isSuspended;

    let statusHtml = '';
    if (isSuspended) {
      statusHtml = `<span class="status-badge suspendido" title="${p.sanctionNotes}">⛔ Inhabilitado ANFA</span>`;
    } else if (isWarning) {
      statusHtml = `<span class="status-badge alerta" title="Al borde de suspensión por 4 amarillas">⚠️ 4 Amarillas</span>`;
    } else {
      statusHtml = `<span class="status-badge habilitado">✓ Habilitado</span>`;
    }

    html += `
      <tr style="${isSuspended ? 'opacity: 0.6; background: rgba(239, 68, 68, 0.05);' : ''}">
        <td><span class="player-number-badge">${p.number}</span></td>
        <td>
          <div class="player-identity-cell">
            <img src="${p.avatar}" alt="${p.name}" class="player-avatar-mini">
            <div>
              <div style="font-weight: 700; ${isSuspended ? 'text-decoration: line-through; color: #f87171;' : ''}">${p.name}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">RUT: ${p.rut} • ${p.position}</div>
            </div>
          </div>
        </td>
        <td>${statusHtml}</td>
        <td style="text-align: center;">
          <input type="checkbox" ${!isSuspended ? 'checked' : 'disabled'} ${!canEdit ? 'disabled' : ''} style="cursor: pointer; width: 18px; height: 18px; accent-color: #10b981;" title="${isSuspended ? 'Inhabilitado por Tribunal de Penas ANFA' : 'Ficha de presencia verificada'}">
        </td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renderiza la línea de tiempo de incidencias del partido
 */
export function renderPapeletaTimeline() {
  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId) || db.matches[0];
  const container = document.getElementById('match-events-timeline');
  if (!container) return;

  if (!match.events || match.events.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem 1rem;">
        <span style="font-size: 2rem;">📋</span>
        <p style="margin-top: 0.5rem; font-size: 0.85rem;">No hay incidencias registradas aún en esta papeleta oficial.</p>
      </div>
    `;
    return;
  }

  const sortedEvents = [...match.events].reverse();
  let html = '';

  sortedEvents.forEach(ev => {
    let iconClass = 'event-icon-gol';
    let iconSymbol = '⚽';
    let label = '¡GOL!';

    if (ev.type === 'tarjeta_amarilla') {
      iconClass = 'event-icon-amarilla';
      iconSymbol = '🟨';
      label = 'Tarjeta Amarilla';
    } else if (ev.type === 'tarjeta_roja') {
      iconClass = 'event-icon-roja';
      iconSymbol = '🟥';
      label = 'Tarjeta Roja (Expulsión)';
    } else if (ev.type === 'cambio') {
      iconClass = 'event-icon-cambio';
      iconSymbol = '🔄';
      label = 'Sustitución';
    }

    html += `
      <div class="timeline-event-card">
        <div class="event-icon-badge ${iconClass}">${iconSymbol}</div>
        <div class="event-content">
          <div class="event-header">
            <span class="event-player">${ev.playerName}</span>
            <span class="event-minute">${ev.minute}'</span>
          </div>
          <div class="event-desc">
            <strong style="color: var(--text-primary);">${label}:</strong> ${ev.description || ev.reason || ''}
            ${ev.assistPlayerName ? `<div style="color: var(--accent-gold); font-size: 0.72rem;">Asistencia: ${ev.assistPlayerName}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renderiza las firmas oficiales con control de acceso
 */
function renderSignatures(match) {
  const container = document.getElementById('match-signatures-container');
  if (!container) return;

  const sigs = match.signatures || {};
  const canSign = canEditMatch() && match.status !== 'finalizado';

  container.innerHTML = `
    <div class="signature-item">
      <div class="sig-status-icon">${sigs.homeCaptainConfirmed ? '✅' : '⏳'}</div>
      <div class="sig-role">Capitán Local</div>
      <div class="sig-name">${sigs.homeCaptainName || 'Capitán Local'}</div>
      <button class="btn btn-sm ${sigs.homeCaptainConfirmed ? 'btn-secondary' : 'btn-primary'}" id="btn-sign-home" ${!canSign ? 'disabled' : ''}>
        ${sigs.homeCaptainConfirmed ? '✓ Firmado' : 'Firmar Acta'}
      </button>
    </div>

    <div class="signature-item">
      <div class="sig-status-icon">${sigs.awayCaptainConfirmed ? '✅' : '⏳'}</div>
      <div class="sig-role">Capitán Visita</div>
      <div class="sig-name">${sigs.awayCaptainName || 'Capitán Visita'}</div>
      <button class="btn btn-sm ${sigs.awayCaptainConfirmed ? 'btn-secondary' : 'btn-primary'}" id="btn-sign-away" ${!canSign ? 'disabled' : ''}>
        ${sigs.awayCaptainConfirmed ? '✓ Firmado' : 'Firmar Acta'}
      </button>
    </div>

    <div class="signature-item">
      <div class="sig-status-icon">${sigs.refereeConfirmed ? '✅' : '⏳'}</div>
      <div class="sig-role">Árbitro Oficial ANFA</div>
      <div class="sig-name">${match.referee || 'Árbitro'}</div>
      <button class="btn btn-sm ${sigs.refereeConfirmed ? 'btn-secondary' : 'btn-warning'}" id="btn-sign-referee" ${!canSign ? 'disabled' : ''}>
        ${sigs.refereeConfirmed ? '✓ Validado' : 'Validar y Cerrar'}
      </button>
    </div>
  `;

  if (canSign) {
    document.getElementById('btn-sign-home')?.addEventListener('click', () => toggleSignature('homeCaptainConfirmed'));
    document.getElementById('btn-sign-away')?.addEventListener('click', () => toggleSignature('awayCaptainConfirmed'));
    document.getElementById('btn-sign-referee')?.addEventListener('click', () => toggleSignature('refereeConfirmed'));
  }
}

function toggleSignature(key) {
  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId);
  if (!match) return;

  match.signatures[key] = !match.signatures[key];
  saveDb(db);
  renderPapeletaHeader();
  window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
  window.showToast(`Firma arbitral/capitán registrada exitosamente.`);
}

function setupEventListeners() {
  const tabHome = document.getElementById('papeleta-tab-home');
  const tabAway = document.getElementById('papeleta-tab-away');

  tabHome?.addEventListener('click', () => {
    currentActiveTeamTab = 'home';
    tabHome.classList.add('active');
    tabAway?.classList.remove('active');
    renderPapeletaRoster();
  });

  tabAway?.addEventListener('click', () => {
    currentActiveTeamTab = 'away';
    tabAway.classList.add('active');
    tabHome?.classList.remove('active');
    renderPapeletaRoster();
  });

  // Cronómetro
  const timerToggleBtn = document.getElementById('btn-toggle-clock');
  timerToggleBtn?.addEventListener('click', () => {
    if (!canEditMatch()) {
      window.showToast('🔒 Requiere autenticarse como Árbitro (PIN: 2026)');
      return;
    }

    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerToggleBtn.innerHTML = '▶ Reanudar';
      timerToggleBtn.classList.remove('btn-danger');
      timerToggleBtn.classList.add('btn-secondary');
      window.showToast('Cronómetro en pausa.');
    } else {
      timerToggleBtn.innerHTML = '⏸ Pausar';
      timerToggleBtn.classList.remove('btn-secondary');
      timerToggleBtn.classList.add('btn-danger');
      window.showToast('Cronómetro oficial corriendo.');
      timerInterval = setInterval(() => {
        const db = getDb();
        const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId);
        if (match && match.status === 'en_vivo') {
          match.currentMinute = (match.currentMinute || 0) + 1;
          if (match.currentMinute > 90) {
            match.currentMinute = 90;
            clearInterval(timerInterval);
            timerInterval = null;
          }
          saveDb(db);
          document.getElementById('match-clock-minute').textContent = `${match.currentMinute}'`;
        }
      }, 3000);
    }
  });

  document.getElementById('btn-open-goal-modal')?.addEventListener('click', () => {
    if (!canEditMatch()) {
      window.showToast('🔒 Requiere autenticarse como Árbitro (PIN: 2026)');
      return;
    }
    openEventModal('gol');
  });

  document.getElementById('btn-open-card-modal')?.addEventListener('click', () => {
    if (!canEditMatch()) {
      window.showToast('🔒 Requiere autenticarse como Árbitro (PIN: 2026)');
      return;
    }
    openEventModal('tarjeta');
  });

  document.getElementById('btn-open-sub-modal')?.addEventListener('click', () => {
    if (!canEditMatch()) {
      window.showToast('🔒 Requiere autenticarse como Árbitro (PIN: 2026)');
      return;
    }
    openEventModal('cambio');
  });

  document.getElementById('btn-finalize-match')?.addEventListener('click', () => {
    finalizeMatchOfficial();
  });

  document.getElementById('btn-print-papeleta')?.addEventListener('click', () => {
    window.print();
  });
}

function openEventModal(type) {
  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId);
  const homeClub = db.clubs.find(c => c.id === match.homeClubId);
  const awayClub = db.clubs.find(c => c.id === match.awayClubId);

  const modalBackdrop = document.getElementById('modal-event-backdrop');
  const modalTitle = document.getElementById('modal-event-title');
  const eventTypeInput = document.getElementById('modal-event-type');
  const teamSelect = document.getElementById('modal-event-team');
  const playerSelect = document.getElementById('modal-event-player');
  const minuteInput = document.getElementById('modal-event-minute');
  const cardTypeGroup = document.getElementById('modal-card-type-group');
  const assistGroup = document.getElementById('modal-assist-group');
  const reasonGroup = document.getElementById('modal-reason-group');

  if (!modalBackdrop) return;

  eventTypeInput.value = type;
  minuteInput.value = match.currentMinute || 45;

  teamSelect.innerHTML = `
    <option value="${homeClub.id}">${homeClub.badgeEmoji} ${homeClub.name} (Local)</option>
    <option value="${awayClub.id}">${awayClub.badgeEmoji} ${awayClub.name} (Visita)</option>
  `;

  if (type === 'gol') {
    modalTitle.innerHTML = '⚽ Registrar Gol en Vivo';
    cardTypeGroup.style.display = 'none';
    assistGroup.style.display = 'block';
    reasonGroup.style.display = 'none';
  } else if (type === 'tarjeta') {
    modalTitle.innerHTML = '🟨 Registrar Tarjeta Disciplinaria ANFA';
    cardTypeGroup.style.display = 'block';
    assistGroup.style.display = 'none';
    reasonGroup.style.display = 'block';
  } else {
    modalTitle.innerHTML = '🔄 Registrar Sustitución Reglamentaria';
    cardTypeGroup.style.display = 'none';
    assistGroup.style.display = 'none';
    reasonGroup.style.display = 'block';
  }

  const updatePlayerList = () => {
    const selectedTeamId = teamSelect.value;
    const teamPlayers = db.players.filter(p => p.clubId === selectedTeamId && p.status === 'habilitado');
    playerSelect.innerHTML = teamPlayers.map(p => `
      <option value="${p.id}">#${p.number} - ${p.name} (${p.position})</option>
    `).join('');

    const assistSelect = document.getElementById('modal-event-assist');
    if (assistSelect) {
      assistSelect.innerHTML = `<option value="">(Sin Asistencia / Jugada Individual)</option>` +
        teamPlayers.map(p => `<option value="${p.id}">#${p.number} - ${p.name}</option>`).join('');
    }
  };

  teamSelect.onchange = updatePlayerList;
  updatePlayerList();

  modalBackdrop.classList.add('active');
}

export function saveEventFromModal() {
  if (!canEditMatch()) {
    window.showToast('🔒 Requiere autenticación como Árbitro con PIN (2026)');
    return;
  }

  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId);
  if (!match) return;

  const eventType = document.getElementById('modal-event-type').value;
  const teamId = document.getElementById('modal-event-team').value;
  const playerId = document.getElementById('modal-event-player').value;
  const minute = parseInt(document.getElementById('modal-event-minute').value, 10) || match.currentMinute;
  const cardType = document.getElementById('modal-card-type').value;
  const assistId = document.getElementById('modal-event-assist').value;
  const reasonText = document.getElementById('modal-event-reason').value || '';

  const player = db.players.find(p => p.id === playerId);
  const assistPlayer = assistId ? db.players.find(p => p.id === assistId) : null;

  if (eventType === 'gol') {
    if (teamId === match.homeClubId) {
      match.homeScore += 1;
    } else {
      match.awayScore += 1;
    }

    if (player) player.goals = (player.goals || 0) + 1;
    if (assistPlayer) assistPlayer.assists = (assistPlayer.assists || 0) + 1;

    match.events.push({
      type: 'gol',
      teamId,
      minute,
      playerId,
      playerName: player ? player.name : 'Jugador',
      assistPlayerId: assistId || null,
      assistPlayerName: assistPlayer ? assistPlayer.name : null,
      description: 'Gol oficial registrado en planilla de turno ANFA Arauco.'
    });

    window.showToast(`⚽ ¡GOL DE ${player ? player.name.toUpperCase() : 'EQUIPO'}!`);
  } else if (eventType === 'tarjeta') {
    const isRed = cardType === 'roja';
    if (player) {
      if (isRed) {
        player.redCards = (player.redCards || 0) + 1;
        player.status = 'suspendido';
        player.sanctionNotes = `SUSPENSIÓN ANFA: Expulsado con roja directa (${reasonText || 'Falta grave'}). Pasa a Tribunal de Honor.`;
        
        db.sanctionsLedger.push({
          id: `sanc-${Date.now()}`,
          playerId: player.id,
          playerName: player.name,
          clubName: db.clubs.find(c => c.id === teamId)?.name || 'Club',
          cause: `Tarjeta Roja Directa: ${reasonText || 'Falta grave en informe arbitral'}`,
          datesImposed: 2,
          datesServed: 0,
          datesRemaining: 2,
          status: 'vigente',
          meetingDate: 'Sesión Tribunal de Honor ANFA Arauco'
        });

        window.showToast(`🟥 TARJETA ROJA: ${player.name} expulsado y suspendido.`);
      } else {
        player.yellowCards = (player.yellowCards || 0) + 1;
        if (player.yellowCards >= 5) {
          player.status = 'suspendido';
          player.sanctionNotes = `SUSPENSIÓN ANFA (Art. 42): Acumulación de 5 tarjetas amarillas. Inhabilitado para el próximo partido.`;
          window.showToast(`⚠️ ALERTA DISCIPLINARIA ANFA: ${player.name} acumuló su 5ta amarilla y queda inhabilitado.`);
        } else {
          window.showToast(`🟨 Tarjeta Amarilla registrada para ${player.name}.`);
        }
      }
    }

    match.events.push({
      type: isRed ? 'tarjeta_roja' : 'tarjeta_amarilla',
      teamId,
      minute,
      playerId,
      playerName: player ? player.name : 'Jugador',
      reason: reasonText || (isRed ? 'Falta antideportiva grave' : 'Falta táctica')
    });
  }

  saveDb(db);
  renderPapeletaHeader();
  renderPapeletaRoster();
  renderPapeletaTimeline();
  renderStandingsView();
  renderTopScorersView();
  renderPlayersView();
  renderSanctionsView();

  window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
  document.getElementById('modal-event-backdrop')?.classList.remove('active');
}

function finalizeMatchOfficial() {
  if (!canEditMatch()) {
    window.showToast('🔒 Requiere autenticarse como Árbitro con PIN (2026)');
    return;
  }

  const db = getDb();
  const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId);
  if (!match) return;

  if (match.status === 'finalizado') {
    window.showToast('Este partido ya fue cerrado oficialmente.');
    return;
  }

  if (confirm("¿Estás seguro de FINALIZAR Y SELLAR la papeleta oficial de ANFA Arauco? El resultado quedará homologado y se cerrará el acta.")) {
    match.status = 'finalizado';
    match.signatures.refereeConfirmed = true;
    match.currentMinute = 90;
    
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    saveDb(db);
    renderPapeletaHeader();
    renderStandingsView();
    window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
    window.showToast('🏆 ACTA ARBITRAL SELLADA Y HOMOLOGADA POR ANFA ARAUCO.');
  }
}

/**
 * Módulo de Digitalización Rápida (Foto-Papeleta ANFA Arauco)
 * Soluciona el flujo real: los turnos llenan en papel el domingo,
 * y luego suben la foto y digitan el resultado en 2 minutos.
 */
let currentUploadedPhoto = null;

const SAMPLE_ACTA_SVG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" style="background:#fefefe; font-family:sans-serif;">
  <rect width="100%" height="100%" fill="#fafafa"/>
  <rect x="15" y="15" width="570" height="350" fill="none" stroke="#475569" stroke-width="2"/>
  <text x="300" y="45" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">ASOCIACIÓN DE FÚTBOL AMATEUR DE ARAUCO</text>
  <text x="300" y="62" font-size="10" font-weight="bold" fill="#64748b" text-anchor="middle">ACTA ARBITRAL OFICIAL FIRMADA EN CANCHA • ANFA BIOBÍO</text>
  <line x1="25" y1="72" x2="575" y2="72" stroke="#0f172a" stroke-width="1.5"/>
  
  <text x="35" y="95" font-size="11" fill="#1e293b">Partido: C.D. Jorge Robledo (2) vs C.D. Brisas del Mar (1)</text>
  <text x="35" y="115" font-size="11" fill="#1e293b">Cancha: Estadio Municipal de Arauco • Serie: Honor • Fecha 8</text>
  <text x="35" y="135" font-size="11" fill="#1e293b">Árbitro: Carlos Henríquez G. (Colegio Árbitros Arauco - CAPA)</text>

  <rect x="35" y="150" width="255" height="110" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="45" y="170" font-size="10" font-weight="bold" fill="#0f172a">Goles y Tarjetas Local (Robledo):</text>
  <text x="45" y="190" font-size="10" fill="#334155">• Min 18' Gol Mauricio Neira (#9)</text>
  <text x="45" y="208" font-size="10" fill="#334155">• Min 54' Gol Gonzalo Mellado (#8)</text>
  <text x="45" y="226" font-size="10" fill="#dc2626">• Min 27' T. Amarilla Rodrigo Sáez (5ta Art. 42)</text>

  <rect x="310" y="150" width="255" height="110" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="170" font-size="10" font-weight="bold" fill="#0f172a">Goles y Tarjetas Visita (Brisas):</text>
  <text x="320" y="190" font-size="10" fill="#334155">• Min 34' Gol Alexis Guajardo (#9)</text>
  <text x="320" y="208" font-size="10" fill="#334155">• Sin expulsados en el equipo visitante</text>

  <path d="M 50 310 Q 80 280 110 310 T 160 300" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="50" y="328" font-size="9" font-weight="bold" fill="#1e293b">Firma Cap. Local</text>
  
  <path d="M 230 308 Q 260 278 290 308 T 330 298" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="230" y="328" font-size="9" font-weight="bold" fill="#1e293b">Firma Cap. Visita</text>

  <path d="M 410 305 Q 440 275 470 305 T 510 295" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <text x="410" y="328" font-size="9" font-weight="bold" fill="#1e293b">Firma Árbitro CAPA</text>

  <circle cx="510" cy="110" r="28" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,2"/>
  <text x="510" y="108" font-size="7" font-weight="bold" fill="#dc2626" text-anchor="middle">ANFA ARAUCO</text>
  <text x="510" y="118" font-size="6" fill="#dc2626" text-anchor="middle">OFICIALIZADO</text>
</svg>
`);

function setupQuickDigitizeModule() {
  const openBtn = document.getElementById('btn-open-quick-digitize');
  const modal = document.getElementById('modal-quick-digitize-backdrop');
  const closeBtn = document.getElementById('modal-quick-digitize-close');
  const cancelBtn = document.getElementById('modal-quick-digitize-cancel');
  const matchSelect = document.getElementById('quick-select-match');
  const photoInput = document.getElementById('quick-photo-input');
  const sampleBtn = document.getElementById('btn-use-sample-photo');
  const previewContainer = document.getElementById('quick-photo-preview-container');
  const previewImg = document.getElementById('quick-photo-preview');
  const photoName = document.getElementById('quick-photo-name');
  const form = document.getElementById('form-quick-digitize');

  if (!modal) return;

  const populateMatches = () => {
    const db = getDb();
    const clubsMap = {};
    db.clubs.forEach(c => { clubsMap[c.id] = c; });

    if (matchSelect) {
      matchSelect.innerHTML = db.matches.map(m => {
        const h = clubsMap[m.homeClubId]?.name || 'Local';
        const a = clubsMap[m.awayClubId]?.name || 'Visita';
        const st = m.status === 'finalizado' ? '✓ CERRADO' : (m.status === 'en_vivo' ? 'EN VIVO' : 'PROGRAMADO');
        return `<option value="${m.id}">${m.round}: ${h} vs ${a} [${st}]</option>`;
      }).join('');
    }
    updateQuickLabels();
  };

  const updateQuickLabels = () => {
    const db = getDb();
    const matchId = matchSelect?.value;
    const match = db.matches.find(m => m.id === matchId) || db.matches[0];
    if (!match) return;

    const homeClub = db.clubs.find(c => c.id === match.homeClubId);
    const awayClub = db.clubs.find(c => c.id === match.awayClubId);

    const lblHome = document.getElementById('quick-lbl-home');
    const lblAway = document.getElementById('quick-lbl-away');
    const inputHome = document.getElementById('quick-score-home');
    const inputAway = document.getElementById('quick-score-away');

    if (lblHome && homeClub) lblHome.textContent = `Goles ${homeClub.name} (Local)`;
    if (lblAway && awayClub) lblAway.textContent = `Goles ${awayClub.name} (Visita)`;
    if (inputHome) inputHome.value = match.homeScore || 0;
    if (inputAway) inputAway.value = match.awayScore || 0;
  };

  openBtn?.addEventListener('click', () => {
    populateMatches();
    modal.classList.add('active');
  });

  matchSelect?.addEventListener('change', updateQuickLabels);

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
  cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));

  sampleBtn?.addEventListener('click', () => {
    currentUploadedPhoto = SAMPLE_ACTA_SVG;
    if (previewImg) previewImg.src = SAMPLE_ACTA_SVG;
    if (previewContainer) previewContainer.style.display = 'block';
    if (photoName) photoName.textContent = '✓ Acta_Fisica_Firmada_Fecha8_Arauco.jpg (Muestra Oficial con Timbre ANFA)';
    if (window.showToast) window.showToast("Foto de acta física oficial cargada.");
  });

  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        currentUploadedPhoto = event.target.result;
        if (previewImg) previewImg.src = currentUploadedPhoto;
        if (previewContainer) previewContainer.style.display = 'block';
        if (photoName) photoName.textContent = `📷 ${file.name} (${(file.size / 1024).toFixed(1)} KB - Listo para archivar)`;
      };
      reader.readAsDataURL(file);
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const db = getDb();
    const matchId = matchSelect.value;
    const match = db.matches.find(m => m.id === matchId);
    if (!match) return;

    const homeScore = parseInt(document.getElementById('quick-score-home').value, 10) || 0;
    const awayScore = parseInt(document.getElementById('quick-score-away').value, 10) || 0;
    const notes = document.getElementById('quick-match-notes').value;

    match.homeScore = homeScore;
    match.awayScore = awayScore;
    match.status = 'finalizado';
    match.currentMinute = 90;
    match.signatures.homeCaptainConfirmed = true;
    match.signatures.awayCaptainConfirmed = true;
    match.signatures.refereeConfirmed = true;
    match.photoActaUrl = currentUploadedPhoto || SAMPLE_ACTA_SVG;
    match.quickDigitized = true;
    match.digitizedAt = new Date().toLocaleString('es-CL');
    match.observations = notes || "Partido homologado mediante transcripción rápida express con respaldo fotográfico de papeleta física.";

    // Actualizar tabla de posiciones de la serie correspondiente
    const seriesStandings = db.standingsBySeries[match.series || 'honor'];
    if (seriesStandings) {
      const homeRow = seriesStandings.find(r => r.clubId === match.homeClubId);
      const awayRow = seriesStandings.find(r => r.clubId === match.awayClubId);

      if (homeRow && awayRow) {
        homeRow.played += 1;
        awayRow.played += 1;
        homeRow.gf += homeScore;
        homeRow.gc += awayScore;
        awayRow.gf += awayScore;
        awayRow.gc += homeScore;

        if (homeScore > awayScore) {
          homeRow.won += 1;
          awayRow.lost += 1;
        } else if (homeScore < awayScore) {
          awayRow.won += 1;
          homeRow.lost += 1;
        } else {
          homeRow.drawn += 1;
          awayRow.drawn += 1;
        }
      }
    }

    // Registrar automáticamente arancel arbitral en tesorería para demostrar integración automática
    if (!db.treasuryLedger) db.treasuryLedger = [];
    const folioNum = String(db.treasuryLedger.length + 86).padStart(3, '0');
    db.treasuryLedger.push({
      id: `mov-${Date.now()}`,
      date: new Date().toLocaleDateString('es-CL'),
      type: "egreso",
      category: "Honorarios Arbitrales",
      clubId: "asociacion",
      clubName: "ANFA Arauco",
      concept: `Pago honorarios terna CAPA por acta física digitalizada: ${match.round}`,
      amount: 45000,
      receiptFolio: `EGR-2026-${folioNum}`,
      status: "pagado"
    });

    saveDb(db);
    renderPapeletaHeader();
    renderStandingsView();
    renderTopScorersView();
    renderTreasuryOverview();
    renderTransactionsTable();

    window.dispatchEvent(new CustomEvent('ligapro:match-updated'));
    modal.classList.remove('active');
    if (window.showToast) {
      window.showToast("✓ ACTA FÍSICA DIGITALIZADA Y HOMOLOGADA EN ANFA ARAUCO.");
    }
  });
}

function setupBlankSheetModule() {
  const openBtn = document.getElementById('btn-print-blank-sheet');
  const modal = document.getElementById('modal-blank-sheet-backdrop');
  const closeBtn = document.getElementById('modal-blank-sheet-close');
  const seriesSelect = document.getElementById('blank-sheet-series');
  const seriesLabel = document.getElementById('blank-sheet-series-label');
  const printTrigger = document.getElementById('btn-print-blank-trigger');

  if (!modal) return;

  const renderBlankRows = () => {
    const homeTbody = document.getElementById('blank-sheet-rows-home');
    const awayTbody = document.getElementById('blank-sheet-rows-away');
    let rowsHtml = '';
    for (let i = 1; i <= 20; i++) {
      rowsHtml += `
        <tr style="height: 22px;">
          <td style="border: 1px solid #94a3b8; text-align: center; font-weight: bold; background: #f8fafc;">${i}</td>
          <td style="border: 1px solid #94a3b8; padding-left: 4px;">&nbsp;</td>
          <td style="border: 1px solid #94a3b8;">&nbsp;</td>
          <td style="border: 1px solid #94a3b8;">&nbsp;</td>
          <td style="border: 1px solid #94a3b8;">&nbsp;</td>
        </tr>
      `;
    }
    if (homeTbody) homeTbody.innerHTML = rowsHtml;
    if (awayTbody) awayTbody.innerHTML = rowsHtml;
  };

  openBtn?.addEventListener('click', () => {
    renderBlankRows();
    modal.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => modal.classList.remove('active'));

  seriesSelect?.addEventListener('change', (e) => {
    if (seriesLabel) {
      const selectedOption = e.target.options[e.target.selectedIndex];
      seriesLabel.textContent = selectedOption ? selectedOption.text : 'Honor';
    }
  });

  printTrigger?.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Modal público para inspeccionar la fotografía del acta física firmada en cancha
 */
export function setupSignedSheetModal() {
  const openBtns = document.querySelectorAll('.btn-open-signed-sheet, #btn-view-signed-sheet');
  const modal = document.getElementById('modal-view-sheet-backdrop');
  const closeBtn = document.getElementById('modal-view-sheet-close');
  const cancelBtn = document.getElementById('modal-view-sheet-cancel');
  const imgEl = document.getElementById('view-sheet-image');
  const detailsEl = document.getElementById('view-sheet-details');

  const openSheet = () => {
    const db = getDb();
    const match = db.matches.find(m => m.id === db.leagueInfo.activeMatchId) || db.matches[0];
    if (!match || !modal) return;

    if (imgEl) {
      imgEl.src = match.paperSheetPhotoUrl || match.photoActaUrl || SAMPLE_ACTA_SVG;
    }

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="background: rgba(0,0,0,0.5); padding: 0.85rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-top: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <span class="status-badge ${match.ratificationStatus === 'ratificado_directorio' ? 'habilitado' : 'alerta'}">
              ${match.ratificationStatus === 'ratificado_directorio' ? '✓ Ratificado por Directorio ANFA' : '⏳ Marcador de Cancha (Firmado)'}
            </span>
            <span style="font-size: 0.75rem; color: #94a3b8;">Fecha: ${match.date} • Recinto: ${match.venue}</span>
          </div>
          <div style="font-size: 0.8rem; color: #e2e8f0; line-height: 1.5;">
            <div>✍️ <strong>Firmas en el papel:</strong> ${match.paperSheetSignedBy || 'Capitanes de ambos clubes y Árbitro CAPA'}</div>
            <div>👔 <strong>Director de Mesa / Turno:</strong> ${match.shiftOperator?.name || match.turnOfficial || 'Turno Oficial ANFA'} (${match.shiftOperator?.clubId ? 'Club Neutral Designado' : 'Mesa ANFA'})</div>
            <div style="margin-top: 0.4rem; color: var(--accent-pitch); font-size: 0.74rem;">
              🛡️ <em>Esta fotografía constituye fe pública comunal. Cualquier diferencia entre el marcador digital y esta planilla física firmada tiene validez legal la planilla física.</em>
            </div>
          </div>
        </div>
      `;
    }

    modal.classList.add('active');
  };

  openBtns.forEach(btn => btn.addEventListener('click', openSheet));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  cancelBtn?.addEventListener('click', () => modal?.classList.remove('active'));
}

/**
 * Renderiza la barra superior de recintos y partidos simultáneos (Multi-Cancha)
 */
export function renderMulticanchaBar() {
  const container = document.getElementById('multicancha-chips-track');
  if (!container) return;

  const db = getDb();
  const currentActiveId = db.leagueInfo?.activeMatchId || 'match-arauco-01';
  const matches = db.matches || [];

  // Ordenar para mostrar primero los que están 'en_vivo'
  const sortedMatches = [...matches].sort((a, b) => {
    if (a.status === 'en_vivo' && b.status !== 'en_vivo') return -1;
    if (b.status === 'en_vivo' && a.status !== 'en_vivo') return 1;
    return 0;
  });

  const clubsMap = {};
  db.clubs.forEach(c => clubsMap[c.id] = c);

  let html = '';
  sortedMatches.forEach(m => {
    const isSelected = m.id === currentActiveId;
    const home = clubsMap[m.homeClubId] || { shortName: 'Local', badgeEmoji: '⚓' };
    const away = clubsMap[m.awayClubId] || { shortName: 'Visita', badgeEmoji: '🌊' };

    let venueIcon = '🏟️';
    let venueShort = m.venue;
    if (m.venueId === 'estadio-ramon-burgos') {
      venueShort = 'Est. Ramón Burgos';
    } else if (m.venueId === 'estadio-sebastian-gaete') {
      venueShort = 'Est. Sebastián Gaete';
    } else if (m.venueId === 'cancha-sausalito') {
      venueIcon = '🌱';
      venueShort = 'Cancha El Sausalito';
    }

    let statusPill = '';
    if (m.status === 'en_vivo') {
      statusPill = `<span class="multicancha-live-badge"><span class="multicancha-pulse-dot"></span> EN VIVO ${m.currentMinute}'</span>`;
    } else if (m.status === 'finalizado') {
      statusPill = `<span class="multicancha-fin-badge">FINALIZADO</span>`;
    } else {
      statusPill = `<span class="multicancha-prog-badge">PROGRAMADO</span>`;
    }

    html += `
      <div class="multicancha-chip ${isSelected ? 'active' : ''}" data-match-id="${m.id}" title="Ver partido en ${venueShort}">
        <div class="multicancha-chip-header">
          <span class="multicancha-venue-tag">${venueIcon} ${venueShort}</span>
          ${statusPill}
        </div>
        <div class="multicancha-chip-teams">
          <span class="team-tag" style="display:inline-flex; align-items:center; gap:0.3rem;">
            ${getClubBadgeSvg(m.homeClubId, 18)} ${home.shortName}
          </span>
          <span class="chip-score ${m.status === 'en_vivo' ? 'live' : ''}">${m.status === 'programado' ? 'vs' : `${m.homeScore} - ${m.awayScore}`}</span>
          <span class="team-tag" style="display:inline-flex; align-items:center; gap:0.3rem;">
            ${away.shortName} ${getClubBadgeSvg(m.awayClubId, 18)}
          </span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Asignar listeners a cada chip para cambiar de cancha en 1 clic
  container.querySelectorAll('.multicancha-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const matchId = chip.getAttribute('data-match-id');
      if (matchId) {
        setActiveMatch(matchId);
      }
    });
  });
}

/**
 * Control del Modo Doble Cancha (Multipantalla)
 */
export function setupDualScreenToggle() {
  const toggleBtn = document.getElementById('btn-toggle-dual-view');
  const labelEl = document.getElementById('btn-toggle-dual-label');
  const singleCard = document.getElementById('single-match-header-card');
  const dualContainer = document.getElementById('multicancha-dual-container');

  toggleBtn?.addEventListener('click', () => {
    isDualScreenActive = !isDualScreenActive;

    if (isDualScreenActive) {
      if (singleCard) singleCard.style.display = 'none';
      if (dualContainer) dualContainer.style.display = 'grid';
      if (labelEl) labelEl.textContent = 'Ver Cancha Única';
      toggleBtn.classList.remove('btn-outline-pitch');
      toggleBtn.classList.add('btn-primary');
      renderDualScreenView();
      window.showToast('📺 Modo Doble Cancha Activado: Monitoreo en Paralelo');
    } else {
      if (singleCard) singleCard.style.display = 'block';
      if (dualContainer) dualContainer.style.display = 'none';
      if (labelEl) labelEl.textContent = 'Modo Doble Cancha';
      toggleBtn.classList.remove('btn-primary');
      toggleBtn.classList.add('btn-outline-pitch');
    }
  });
}

/**
 * Renderiza los partidos simultáneos lado a lado en modo doble cancha
 */
export function renderDualScreenView() {
  const dualContainer = document.getElementById('multicancha-dual-container');
  if (!dualContainer || !isDualScreenActive) return;

  const db = getDb();
  // Mostrar los 2 partidos principales (en vivo o de los dos estadios principales)
  const liveMatches = db.matches.filter(m => m.status === 'en_vivo');
  const displayMatches = liveMatches.length >= 2 ? liveMatches.slice(0, 2) : db.matches.slice(0, 2);

  const clubsMap = {};
  db.clubs.forEach(c => clubsMap[c.id] = c);

  let html = '';
  displayMatches.forEach((m, idx) => {
    const home = clubsMap[m.homeClubId] || { name: 'Local', shortName: 'Local', badgeEmoji: '⚓' };
    const away = clubsMap[m.awayClubId] || { name: 'Visita', shortName: 'Visita', badgeEmoji: '🌊' };
    const venueObj = db.venues?.find(v => v.id === m.venueId) || { name: m.venue, photo: '' };

    // Lista de últimos goles
    const goals = (m.events || []).filter(e => e.type === 'gol');
    const goalsHtml = goals.length > 0 ? goals.map(g => `
      <div style="font-size: 0.76rem; color: #cbd5e1; display: flex; align-items: center; gap: 0.4rem; margin-top: 0.2rem;">
        <span>⚽ ${g.minute}'</span> <strong>${g.playerName}</strong> (${clubsMap[g.teamId]?.shortName || ''})
      </div>
    `).join('') : '<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Sin goles registrados aún</div>';

    html += `
      <div class="dual-screen-card" style="border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; background: rgba(13,21,34,0.95); overflow: hidden;">
        <div style="position: relative; height: 110px; background: url('${venueObj.photo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80'}') center/cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,21,34,0.95) 0%, rgba(13,21,34,0.3) 100%);"></div>
          <div style="position: absolute; top: 10px; left: 12px; right: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span class="badge-live" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">🔴 CANCHA ${idx + 1}: ${m.status === 'en_vivo' ? `EN VIVO ${m.currentMinute}'` : 'FINALIZADO'}</span>
            <span style="font-size: 0.72rem; color: #fff; background: rgba(0,0,0,0.6); padding: 0.2rem 0.5rem; border-radius: 4px;">${m.round.split('•')[0] || 'Fecha 8'}</span>
          </div>
          <div style="position: absolute; bottom: 8px; left: 12px;">
            <h4 style="margin: 0; font-size: 0.95rem; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">🏟️ ${m.venue}</h4>
          </div>
        </div>

        <div style="padding: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; text-align: center;">
            <div style="flex: 1;">
              <div style="display: flex; justify-content: center; margin-bottom: 0.35rem;">${getClubBadgeSvg(m.homeClubId, 48)}</div>
              <strong style="font-size: 0.85rem; display: block; margin-top: 0.2rem;">${home.name}</strong>
            </div>

            <div style="padding: 0.4rem 1rem; background: rgba(0,0,0,0.5); border-radius: 8px; border: 1px solid var(--border-subtle);">
              <div style="font-size: 1.8rem; font-weight: 900; font-family: var(--font-display); color: var(--accent-pitch); letter-spacing: 2px;">
                ${m.homeScore} : ${m.awayScore}
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.1rem;">⏱️ ${m.half === 1 ? '1er Tiempo' : '2do Tiempo'}</div>
            </div>

            <div style="flex: 1;">
              <div style="display: flex; justify-content: center; margin-bottom: 0.35rem;">${getClubBadgeSvg(m.awayClubId, 48)}</div>
              <strong style="font-size: 0.85rem; display: block; margin-top: 0.2rem;">${away.name}</strong>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.25); border-radius: 6px; padding: 0.6rem 0.8rem; margin-bottom: 0.8rem;">
            <span style="font-size: 0.72rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase;">Incidencias de Gol:</span>
            ${goalsHtml}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            <span>👔 Árbitro: ${m.referee.split('(')[0]}</span>
            <span>Mesa: ${m.shiftOperator?.name?.split('(')[0] || 'Turno Oficial'}</span>
          </div>

          <button class="btn btn-sm btn-secondary" style="width: 100%; justify-content: center;" onclick="window.ligaproSelectMatch('${m.id}')">
            🔍 Abrir Papeleta Completa & Nómina
          </button>
        </div>
      </div>
    `;
  });

  dualContainer.innerHTML = html;
}

// Selector global accesible desde botones HTML
window.ligaproSelectMatch = (matchId) => {
  setActiveMatch(matchId);
  const toggleBtn = document.getElementById('btn-toggle-dual-view');
  if (isDualScreenActive && toggleBtn) {
    toggleBtn.click();
  }
};


