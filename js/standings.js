/**
 * LigaPro Amateur - Cálculo de Tablas de Posiciones por Serie y Tabla General
 * Asociación ANFA Arauco
 */

import { getDb } from './data.js';
import { getClubBadgeSvg } from './badges.js';

let selectedSeries = 'honor'; // 'honor', 'senior_35', 'juvenil', 'general'

export function calculateStandings(seriesId = selectedSeries) {
  const db = getDb();
  const clubs = db.clubs;
  const matches = db.matches || [];

  // Si es la Tabla General Acumulada de Clubes
  if (seriesId === 'general') {
    return calculateGeneralClubStandings();
  }

  const baseStandings = (db.standingsBySeries && db.standingsBySeries[seriesId]) 
    ? db.standingsBySeries[seriesId] 
    : (db.standingsBySeries?.honor || []);

  const tableMap = {};
  clubs.forEach(c => {
    tableMap[c.id] = {
      club: c,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0
    };
  });

  // 1. Cargar estadísticas base de la serie
  baseStandings.forEach(base => {
    if (tableMap[base.clubId]) {
      tableMap[base.clubId].pj += base.played;
      tableMap[base.clubId].pg += base.won;
      tableMap[base.clubId].pe += base.drawn;
      tableMap[base.clubId].pp += base.lost;
      tableMap[base.clubId].gf += base.gf;
      tableMap[base.clubId].gc += base.gc;
      tableMap[base.clubId].pts += (base.won * 3) + (base.drawn * 1);
    }
  });

  // 2. Sumar partidos en vivo o finalizados de esta serie
  const activeMatch = matches.find(m => m.id === db.leagueInfo.activeMatchId);
  if (activeMatch && activeMatch.series === seriesId && (activeMatch.status === 'en_vivo' || activeMatch.status === 'finalizado')) {
    const home = tableMap[activeMatch.homeClubId];
    const away = tableMap[activeMatch.awayClubId];

    if (home && away) {
      home.pj += 1;
      away.pj += 1;
      home.gf += activeMatch.homeScore;
      home.gc += activeMatch.awayScore;
      away.gf += activeMatch.awayScore;
      away.gc += activeMatch.homeScore;

      if (activeMatch.homeScore > activeMatch.awayScore) {
        home.pg += 1;
        home.pts += 3;
        away.pp += 1;
      } else if (activeMatch.homeScore < activeMatch.awayScore) {
        away.pg += 1;
        away.pts += 3;
        home.pp += 1;
      } else {
        home.pe += 1;
        home.pts += 1;
        away.pe += 1;
        away.pts += 1;
      }
    }
  }

  // 3. Ordenar tabla (Puntos, DG, GF)
  const standingsArray = Object.values(tableMap).map(row => {
    row.dg = row.gf - row.gc;
    return row;
  });

  standingsArray.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    return b.gf - a.gf;
  });

  return standingsArray;
}

/**
 * Calcula la Tabla General Acumulada de Clubes (Suma de Series)
 * Determina el Campeón General Institucional de ANFA Arauco
 */
function calculateGeneralClubStandings() {
  const db = getDb();
  const clubs = db.clubs;
  const seriesKeys = ['honor', 'senior_35', 'juvenil'];

  const generalMap = {};
  clubs.forEach(c => {
    generalMap[c.id] = {
      club: c,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      dg: 0,
      pts: 0,
      honorPts: 0,
      seniorPts: 0,
      juvenilPts: 0
    };
  });

  seriesKeys.forEach(sKey => {
    const seriesStandings = calculateStandings(sKey);
    seriesStandings.forEach(row => {
      const gRow = generalMap[row.club.id];
      if (gRow) {
        gRow.pj += row.pj;
        gRow.pg += row.pg;
        gRow.pe += row.pe;
        gRow.pp += row.pp;
        gRow.gf += row.gf;
        gRow.gc += row.gc;
        gRow.pts += row.pts;

        if (sKey === 'honor') gRow.honorPts = row.pts;
        if (sKey === 'senior_35') gRow.seniorPts = row.pts;
        if (sKey === 'juvenil') gRow.juvenilPts = row.pts;
      }
    });
  });

  const arr = Object.values(generalMap).map(row => {
    row.dg = row.gf - row.gc;
    return row;
  });

  arr.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    return b.gf - a.gf;
  });

  return arr;
}

/**
 * Renderiza la vista de tablas con selector de serie
 */
export function renderStandingsView(containerId = 'standings-table-body') {
  renderSeriesSelectorHeader();

  const container = document.getElementById(containerId);
  if (!container) return;

  const standings = calculateStandings(selectedSeries);
  let html = '';

  standings.forEach((row, index) => {
    const pos = index + 1;
    let posClass = 'pos-other';
    if (pos === 1) posClass = 'pos-1';
    else if (pos === 2) posClass = 'pos-2';
    else if (pos === 3) posClass = 'pos-3';

    // Badge clasificatorio a Copa de Campeones para el 1º y 2º
    const isCupZone = (pos === 1 || pos === 2) && selectedSeries !== 'general';
    const cupLabel = isCupZone ? `<span title="Clasifica a Copa de Campeones ANFA Biobío" style="font-size: 0.65rem; background: rgba(37,99,235,0.25); color: #93c5fd; padding: 0.1rem 0.4rem; border-radius: 4px; border: 1px solid rgba(37,99,235,0.4); margin-left: 5px;">COPA REGIONAL</span>` : '';

    html += `
      <tr>
        <td><span class="pos-badge ${posClass}">${pos}</span></td>
        <td class="td-team">
          <span class="table-club-crest" style="display:inline-flex; align-items:center; justify-content:center; flex-shrink: 0;">
            ${getClubBadgeSvg(row.club.id, 28)}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 0.3rem;">
              <span>${row.club.name}</span>
              ${cupLabel}
            </div>
            <small style="color: var(--text-muted); font-size: 0.72rem;">${row.club.neighborhood}</small>
          </div>
        </td>
        <td>${row.pj}</td>
        <td>${row.pg}</td>
        <td>${row.pe}</td>
        <td>${row.pp}</td>
        <td>${row.gf}</td>
        <td>${row.gc}</td>
        <td style="font-weight: 700; color: ${row.dg > 0 ? '#34d399' : row.dg < 0 ? '#f87171' : 'inherit'}">
          ${row.dg > 0 ? '+' + row.dg : row.dg}
        </td>
        <td><span class="points-pill">${row.pts}</span></td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

/**
 * Renderiza el selector de serie sobre la tabla
 */
function renderSeriesSelectorHeader() {
  const container = document.getElementById('standings-series-selector');
  if (!container) return;

  const seriesOptions = [
    { id: 'honor', label: 'Serie de Honor (1ra Adulta)' },
    { id: 'senior_35', label: 'Senior (35+ Años)' },
    { id: 'juvenil', label: 'Serie Juvenil (Sub-17)' },
    { id: 'general', label: '🏆 Tabla General Acumulada de Clubes' }
  ];

  let html = '';
  seriesOptions.forEach(opt => {
    const isActive = opt.id === selectedSeries;
    html += `
      <button class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}" data-series-id="${opt.id}" style="border-radius: var(--radius-full);">
        ${opt.label}
      </button>
    `;
  });

  container.innerHTML = html;

  // Listeners para cambiar serie
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      selectedSeries = e.currentTarget.getAttribute('data-series-id');
      renderStandingsView();
      
      const titleEl = document.getElementById('standings-series-title');
      if (titleEl) {
        if (selectedSeries === 'honor') titleEl.textContent = 'Serie de Honor (Primera Adulta) - Clasificatoria Copa de Campeones';
        else if (selectedSeries === 'senior_35') titleEl.textContent = 'Serie Senior (35+ Años) - Campeonato Oficial';
        else if (selectedSeries === 'juvenil') titleEl.textContent = 'Serie Juvenil (Sub-17) - Semillero Comunal';
        else titleEl.textContent = 'Tabla General Acumulada de Clubes (Suma de Todas las Series)';
      }
    });
  });
}

/**
 * Tabla de Goleadores (Pichichi de Arauco)
 */
export function renderTopScorersView(containerId = 'top-scorers-list') {
  const container = document.getElementById('top-scorers-list');
  if (!container) return;

  const db = getDb();
  const players = [...db.players];
  const clubsMap = {};
  db.clubs.forEach(c => { clubsMap[c.id] = c; });

  players.sort((a, b) => b.goals - a.goals);
  const topList = players.slice(0, 6);

  let html = '';
  topList.forEach((p, index) => {
    const club = clubsMap[p.clubId] || { shortName: 'Club', badgeEmoji: '⚽' };
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-weight: 800; font-family: var(--font-display); width: 20px; color: ${index === 0 ? 'var(--accent-gold)' : 'var(--text-muted)'}">#${index + 1}</span>
          <img src="${p.avatar}" alt="${p.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-subtle);">
          <div>
            <div style="font-weight: 700; font-size: 0.88rem;">${p.name} ${p.nickname ? `<span style="color: var(--accent-gold); font-size: 0.75rem;">(${p.nickname})</span>` : ''}</div>
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.3rem; margin-top: 0.15rem;">
              <span style="display: inline-flex; align-items: center;">${getClubBadgeSvg(p.clubId, 16)}</span>
              <span>${club.shortName} • #${p.number}</span>
            </div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-family: var(--font-display); font-weight: 900; font-size: 1.15rem; color: var(--accent-gold);">${p.goals}</div>
          <div style="font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">Goles</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
