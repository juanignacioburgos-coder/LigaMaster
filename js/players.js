/**
 * LigaMaster - Fichas de Jugadores, Registros Oficiales y Padrón de Clubes
 * Asociación de Fútbol de Arauco
 */

import { getDb, saveDb } from './data.js';
import { getClubBadgeSvg } from './badges.js';

let filterClubId = 'all';
let filterSeriesId = 'all';
let filterStatus = 'all';
let searchQuery = '';

export function initPlayersModule() {
  renderClubFilterOptions();
  renderPlayersView();
  renderSanctionsView();
  renderClubsHistoryView();
  renderRegulationsView();
  setupPlayerEventListeners();
}

function renderClubFilterOptions() {
  const db = getDb();
  const select = document.getElementById('filter-player-club');
  if (!select) return;

  let html = `<option value="all">Todos los Clubes de Arauco (${db.clubs.length})</option>`;
  db.clubs.forEach(c => {
    html += `<option value="${c.id}">${c.badgeEmoji} ${c.name}</option>`;
  });
  select.innerHTML = html;
}

const SERIES_LABELS = {
  honor: "Serie de Honor",
  senior_35: "Senior 35+",
  super_senior_45: "Súper Senior 45+",
  juvenil: "Juvenil Sub-17",
  infantil: "Primera Infantil Sub-15",
  segunda_adulta: "Segunda Adulta"
};

export function renderPlayersView() {
  const db = getDb();
  const container = document.getElementById('players-cards-grid');
  if (!container) return;

  const clubsMap = {};
  db.clubs.forEach(c => { clubsMap[c.id] = c; });

  const filtered = db.players.filter(p => {
    const matchClub = filterClubId === 'all' || p.clubId === filterClubId;
    const matchSeries = filterSeriesId === 'all' || p.series === filterSeriesId;
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.rut.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClub && matchSeries && matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <span style="font-size: 2.5rem;">🔍</span>
        <p style="margin-top: 0.5rem; font-size: 1rem;">No se encontraron fichas de jugadores con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(p => {
    const club = clubsMap[p.clubId] || { name: 'Club Comunal', badgeEmoji: '⚽', shortName: 'Club' };
    const isSuspended = p.status === 'suspendido';
    const seriesLabel = SERIES_LABELS[p.series] || 'Serie Oficial';

    html += `
      <div class="player-official-card" data-player-id="${p.id}">
        <div class="card-hologram-strip"></div>
        
        <div class="card-header-area">
          <div>
            <span class="card-league-tag" style="display:inline-flex; align-items:center; gap:0.35rem;">
              ${getClubBadgeSvg(p.clubId, 18)} ${club.shortName}
            </span>
            <span style="font-size: 0.68rem; background: rgba(59,130,246,0.15); color: #93c5fd; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700; margin-left: 0.3rem;">${seriesLabel}</span>
          </div>
          <span class="status-badge ${isSuspended ? 'suspendido' : 'habilitado'}">
            ${isSuspended ? '⛔ Inhabilitado' : '✓ Ficha Habilitada'}
          </span>
        </div>

        <div class="card-body-area">
          <div class="card-photo-wrapper">
            <img src="${p.avatar}" alt="${p.name}" class="card-photo">
            <span class="card-number-tag">#${p.number}</span>
          </div>
          <div class="card-player-info">
            <h4>${p.name}</h4>
            <div class="club-name">${p.position}</div>
            <div class="rut-text">RUT: ${p.rut}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.15rem;">Nacimiento: ${p.birthDate}</div>
            <div style="font-size: 0.68rem; color: #94a3b8; font-family: monospace; margin-top: 0.2rem;">N° Registro: ${p.regAnfa || `REG-AR-${p.number || '01'}`}</div>
          </div>
        </div>

        <div class="card-stats-row">
          <div class="card-stat-item">
            <div class="val">${p.matchesPlayed || 0}</div>
            <div class="lbl">PJ</div>
          </div>
          <div class="card-stat-item">
            <div class="val" style="color: var(--accent-gold);">${p.goals || 0}</div>
            <div class="lbl">Goles</div>
          </div>
          <div class="card-stat-item">
            <div class="val" style="color: var(--accent-yellow-card);">${p.yellowCards || 0}</div>
            <div class="lbl">Amarillas</div>
          </div>
          <div class="card-stat-item">
            <div class="val" style="color: var(--accent-red-card);">${p.redCards || 0}</div>
            <div class="lbl">Rojas</div>
          </div>
        </div>

        ${p.sanctionNotes ? `
          <div style="margin: 0.6rem 0.75rem 0; font-size: 0.72rem; color: #f87171; background: rgba(239,68,68,0.1); padding: 0.4rem 0.6rem; border-radius: 4px; border-left: 2px solid #ef4444;">
            ⚠️ ${p.sanctionNotes}
          </div>
        ` : ''}

        <div style="margin: 0.6rem 0.75rem 0.75rem; padding: 0.45rem 0.7rem; background: rgba(0, 255, 133,0.06); border: 1px solid rgba(0, 255, 133,0.2); border-radius: 6px; display: flex; align-items: center; justify-content: space-between; font-size: 0.74rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span>🪪</span>
            <span style="color: #cbd5e1;">Registro Oficial: <strong style="color: #fff; font-family: monospace;">AR-${p.id.slice(-4).toUpperCase()}</strong></span>
          </div>
          <span class="status-badge ${p.status === 'suspendido' ? 'suspendido' : 'habilitado'}" style="font-size: 0.65rem; padding: 0.15rem 0.45rem;">
            ${p.status === 'suspendido' ? '⛔ Sancionado' : '✓ Plastificado al Día'}
          </span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

export function renderSanctionsView() {
  const db = getDb();
  const container = document.getElementById('sanctions-table-body');
  if (!container) return;

  const sanctions = db.sanctionsLedger || [];
  if (sanctions.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">
          No hay jugadores cumpliendo sanciones en este momento. Juego limpio en la liga.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  sanctions.forEach(s => {
    html += `
      <tr>
        <td style="font-weight: 700;">${s.playerName}</td>
        <td style="color: #60a5fa;">${s.clubName}</td>
        <td style="max-width: 320px; font-size: 0.8rem;">${s.cause}</td>
        <td style="text-align: center;"><span class="status-badge alerta">${s.datesImposed} fecha(s)</span></td>
        <td style="text-align: center; font-weight: 800; color: #f87171;">${s.datesRemaining} restante(s)</td>
        <td>
          <span class="status-badge ${s.status === 'vigente' ? 'suspendido' : 'habilitado'}">
            ${s.status === 'vigente' ? '⛔ Vigente' : '✓ Cumplida'}
          </span>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renderiza la sección de Clubes Oficiales de la Asociación con datos puros y documentados
 */
export function renderClubsHistoryView() {
  const container = document.getElementById('clubs-history-grid');
  if (!container) return;

  const db = getDb();
  let html = '';

  db.clubs.forEach(c => {
    const seriesBadges = (c.seriesParticipantes || []).map(s => 
      `<span style="background: rgba(255,255,255,0.06); padding: 0.15rem 0.45rem; border-radius: 4px; font-size: 0.68rem; color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);">${s}</span>`
    ).join(' ');

    html += `
      <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid ${c.colors.primary};">
        <div>
          <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="display:inline-flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.05); padding: 0.35rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">${getClubBadgeSvg(c.id, 46)}</span>
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #fff;">${c.name}</h3>
                <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700;">Fundado: ${c.exactFoundationDate || c.foundation}</span>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-family: var(--font-display); font-weight: 900; font-size: 1.2rem; color: var(--accent-gold);">${c.titlesComunalesHonor || 0}</div>
              <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">Títulos Honor</div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 0.65rem; border-radius: 6px; font-size: 0.78rem; color: #e2e8f0; line-height: 1.6; margin-bottom: 0.75rem;">
            <strong style="color: var(--accent-pitch);">🏆 Historial & Copas Regionales:</strong><br>
            ${c.regionalRecord}
          </div>

          <div style="margin-bottom: 0.75rem;">
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 0.3rem;">Series en Competencia:</div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
              ${seriesBadges}
            </div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 0.55rem 0.75rem; border-radius: 6px; font-size: 0.72rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); margin-top: 0.5rem;">
          📍 <strong>Sede:</strong> ${c.neighborhood}<br>
          🏟️ <strong>Estadio:</strong> ${c.stadium} • <span style="color: #93c5fd;">${c.statusLegal || 'Afiliado Oficial'}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renderiza la sección del Reglamento Oficial de Competición
 */
export function renderRegulationsView() {
  const container = document.getElementById('regulations-content-box');
  if (!container) return;

  const db = getDb();
  const regs = db.regulations;
  const series = db.seriesList;

  let seriesTableHtml = '';
  series.forEach(s => {
    seriesTableHtml += `
      <tr>
        <td style="font-weight: 700; color: #fff;">${s.name}</td>
        <td><span class="status-badge habilitado">${s.ageLimit}</span></td>
        <td style="font-family: var(--font-display); font-weight: 800; color: var(--accent-pitch);">${s.halfDuration * 2}' (${s.halfDuration} min x tiempo)</td>
        <td style="font-size: 0.75rem; color: #93c5fd;">${s.regionalCup}</td>
      </tr>
    `;
  });

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--accent-pitch);">
        <h5 style="font-weight: 800; font-size: 0.85rem; color: #fff; margin-bottom: 0.3rem;">Régimen de Sustituciones Oficiales</h5>
        <p style="font-size: 0.78rem; color: #94a3b8;">${regs.substitutionRule}</p>
      </div>

      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--accent-yellow-card);">
        <h5 style="font-weight: 800; font-size: 0.85rem; color: #fff; margin-bottom: 0.3rem;">Régimen Disciplinario de Tarjetas</h5>
        <p style="font-size: 0.78rem; color: #94a3b8;">
          • <strong>5 Amarillas Acumuladas:</strong> 1 fecha de suspensión automática (Art. 42).<br>
          • <strong>Doble Amarilla en Partido:</strong> 1 fecha de suspensión.<br>
          • <strong>Roja Directa:</strong> ${regs.cardRules.directRed}.
        </p>
      </div>

      <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border-left: 3px solid #3b82f6;">
        <h5 style="font-weight: 800; font-size: 0.85rem; color: #fff; margin-bottom: 0.3rem;">Clasificación a Copas Oficiales</h5>
        <p style="font-size: 0.78rem; color: #94a3b8;">
          • <strong>Regional:</strong> ${regs.cupQualification.regional}.<br>
          • <strong>Nacional:</strong> ${regs.cupQualification.national}.
        </p>
      </div>
    </div>

    <table class="roster-table" style="margin-top: 1rem;">
      <thead>
        <tr>
          <th>Serie Oficial</th>
          <th>Límite de Edad Reglamentario</th>
          <th>Tiempo de Juego Oficial</th>
          <th>Copa Regional Clasificatoria</th>
        </tr>
      </thead>
      <tbody>
        ${seriesTableHtml}
      </tbody>
    </table>
  `;
}

function setupPlayerEventListeners() {
  const searchInput = document.getElementById('search-player-input');
  const seriesFilter = document.getElementById('filter-player-series');
  const clubFilter = document.getElementById('filter-player-club');
  const statusFilter = document.getElementById('filter-player-status');

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderPlayersView();
  });

  seriesFilter?.addEventListener('change', (e) => {
    filterSeriesId = e.target.value;
    renderPlayersView();
  });

  clubFilter?.addEventListener('change', (e) => {
    filterClubId = e.target.value;
    renderPlayersView();
  });

  statusFilter?.addEventListener('change', (e) => {
    filterStatus = e.target.value;
    renderPlayersView();
  });

  // Botón para exportar el padrón oficial comunal a archivo CSV
  document.getElementById('btn-export-players-csv')?.addEventListener('click', () => {
    exportPlayersToCsv();
  });
}

/**
 * Exporta el padrón oficial de jugadores de la Asociación a CSV descargable
 */
export function exportPlayersToCsv() {
  const db = getDb();
  const clubsMap = {};
  db.clubs.forEach(c => { clubsMap[c.id] = c; });

  const headers = ["N° Registro Oficial", "Nombre Completo", "RUT", "Club", "Serie Oficial", "Posición", "Fecha Nacimiento", "Partidos Jugados", "Goles", "Tarjetas Amarillas", "Tarjetas Rojas", "Estado Federado"];
  const rows = db.players.map(p => {
    const club = clubsMap[p.clubId]?.name || 'Club Comunal';
    const series = SERIES_LABELS[p.series] || p.series;
    return [
      `"${p.regAnfa || ('REG-AR-' + (p.number || '01'))}"`,
      `"${p.name}"`,
      `"${p.rut}"`,
      `"${club}"`,
      `"${series}"`,
      `"${p.position}"`,
      `"${p.birthDate || ''}"`,
      p.matchesPlayed || 0,
      p.goals || 0,
      p.yellowCards || 0,
      p.redCards || 0,
      `"${p.status === 'habilitado' ? 'Habilitado (Ficha Vigente)' : 'Inhabilitado'}"`
    ].join(';');
  });

  const csvContent = "\uFEFF" + [headers.join(';'), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LigaMaster_Arauco_Padron_Oficial_Jugadores_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
