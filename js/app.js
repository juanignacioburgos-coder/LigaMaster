/**
 * LIGAMASTER - PLATAFORMA OFICIAL DEL FÚTBOL AMATEUR CHILENO
 * Controlador Principal de Vistas, Enrutador y Arquitectura Multi-Liga
 */

import {
  getDb,
  saveDb,
  getRegionsAndLeagues,
  getActiveLeagueId,
  setActiveLeagueId,
  getLeagueById
} from './data.js';

import { getClubBadgeSvg, getSelectionBadgeSvg } from './badges.js';
import { initAdmin, renderAdminView } from './admin.js';
import { initAuth, updateAuthUI, getCurrentRole, ROLES } from './auth.js';

// Estado Global de Navegación y Filtros
let currentActiveView = 'home-view';
let currentActiveSeries = 'honor';
let currentActiveClubId = 'club-arauco';
let currentActivePlayerId = 'p-jr-9';
let currentActiveRound = 8;
let currentStatCategory = 'goleadores';
let currentTeamTab = 'resumen';

// Mapeo de Vistas para Hash y Navegación
const VIEW_MAP = {
  'home': 'home-view',
  'home-view': 'home-view',
  'liga': 'league-view',
  'league-view': 'league-view',
  'competicion': 'league-view',
  'tabla': 'standings-view',
  'standings-view': 'standings-view',
  'posiciones': 'standings-view',
  'calendario': 'calendar-view',
  'calendar-view': 'calendar-view',
  'fixture': 'calendar-view',
  'resultados': 'results-view',
  'results-view': 'results-view',
  'equipos': 'team-view',
  'team-view': 'team-view',
  'clubes': 'team-view',
  'jugadores': 'player-view',
  'player-view': 'player-view',
  'estadisticas': 'stats-view',
  'stats-view': 'stats-view',
  'goleadores': 'stats-view',
  'noticias': 'news-view',
  'news-view': 'news-view',
  'prensa': 'news-view',
  'admin': 'admin-view',
  'admin-view': 'admin-view',
  'panel': 'admin-view',
  'gestion': 'admin-view'
};

document.addEventListener('DOMContentLoaded', () => {
  initLigaMaster();
});

/**
 * Inicialización General de LigaMaster
 */
function initLigaMaster() {
  const db = getDb();
  if (db.clubs && db.clubs.length > 0) {
    currentActiveClubId = db.clubs[0].id;
  }
  if (db.players && db.players.length > 0) {
    currentActivePlayerId = db.players[0].id;
  }
  updateSeriesSelectDropdowns(db.seriesList || []);

  setupNavigationRouting();
  setupGlobalModals();
  setupGlobalSearch();
  setupSeriesFilters();
  setupMultiLeagueHandlers();

  initAuth();
  initAdmin();

  // Renderizar vistas con los datos iniciales
  renderActiveLeagueContext();
  renderHomeView();
  renderLeagueView();
  renderStandingsView();
  renderCalendarView();
  renderResultsView();
  renderTeamView();
  renderPlayerView();
  renderStatsView();
  renderNewsView();

  // Escuchar cambio de hash en URL
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

/**
 * Control Centralizado de Enrutamiento de Vistas
 */
function navigateTo(targetViewId, scroll = true) {
  const mappedId = VIEW_MAP[targetViewId] || targetViewId;
  const viewEl = document.getElementById(mappedId);
  if (!viewEl) return;

  currentActiveView = mappedId;

  // Actualizar visibilidad de vistas
  document.querySelectorAll('.platform-view').forEach(v => {
    v.classList.remove('active');
  });
  viewEl.classList.add('active');

  // Actualizar links activos en barra superior
  document.querySelectorAll('.platform-nav-link').forEach(link => {
    const target = link.getAttribute('data-nav');
    if (target === mappedId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Actualizar links activos en barra contextual
  document.querySelectorAll('.league-subnav-link').forEach(link => {
    const target = link.getAttribute('data-nav');
    if (target === mappedId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cerrar menú móvil si está abierto
  closeModal('modal-mobile-menu');

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Refrescar vistas específicas según el destino
  if (mappedId === 'team-view') renderTeamView();
  if (mappedId === 'player-view') renderPlayerView();
  if (mappedId === 'standings-view') renderStandingsView();
  if (mappedId === 'stats-view') renderStatsView();
  if (mappedId === 'admin-view') renderAdminView();
}
window.ligamasterNavigate = navigateTo;

function handleHashChange() {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash && VIEW_MAP[hash]) {
    navigateTo(VIEW_MAP[hash], false);
  }
}

function setupNavigationRouting() {
  // Manejador de clics en cualquier botón con data-nav
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      e.preventDefault();
      const target = navBtn.getAttribute('data-nav');
      if (target) {
        navigateTo(target);
      }
    }
  });

  // Logo lleva a Home
  document.getElementById('brand-home-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('home-view');
  });

  // Botón Ver Ligas del Hero
  document.getElementById('hero-btn-ver-ligas')?.addEventListener('click', () => {
    openModal('modal-league-picker');
  });

  document.getElementById('nav-btn-ligas-picker')?.addEventListener('click', () => {
    openModal('modal-league-picker');
  });

  document.getElementById('mobile-btn-ligas')?.addEventListener('click', () => {
    closeModal('modal-mobile-menu');
    openModal('modal-league-picker');
  });
}

/**
 * ==========================================================================
 * GESTIÓN MULTI-LIGA
 * ==========================================================================
 */
function setupMultiLeagueHandlers() {
  document.getElementById('btn-trigger-league-picker')?.addEventListener('click', () => {
    openModal('modal-league-picker');
  });

  window.addEventListener('ligamaster:league-changed', (e) => {
    const leagueId = e.detail;
    const db = getDb(leagueId);

    // Ajustar series de la nueva liga
    const seriesList = db.seriesList || [];
    const supportedIds = seriesList.map(s => s.id);
    if (!supportedIds.includes(currentActiveSeries)) {
      currentActiveSeries = supportedIds[0] || 'honor';
    }
    updateSeriesSelectDropdowns(seriesList);

    // Ajustar club y jugador activo a la nueva liga
    if (db.clubs && db.clubs.length > 0) {
      currentActiveClubId = db.clubs[0].id;
    }
    if (db.players && db.players.length > 0) {
      currentActivePlayerId = db.players[0].id;
    }

    renderActiveLeagueContext();
    renderHomeView();
    renderLeagueView();
    renderStandingsView();
    renderCalendarView();
    renderResultsView();
    renderTeamView();
    renderPlayerView();
    renderStatsView();
    renderNewsView();
    renderLeaguePickerModal();
  });

  window.ligamasterSwitchLeague = (leagueId) => {
    setActiveLeagueId(leagueId);
    closeModal('modal-league-picker');
    navigateTo('league-view');
  };
}

function updateSeriesSelectDropdowns(seriesList) {
  const globalSelect = document.getElementById('global-series-select');
  const standingsSelect = document.getElementById('standings-series-select');

  const list = seriesList && seriesList.length > 0 ? seriesList : [
    { id: 'honor', name: 'Serie de Honor (Primera)' },
    { id: 'senior_35', name: 'Serie Senior (35+ Años)' },
    { id: 'juvenil', name: 'Serie Juvenil (Sub-17)' }
  ];

  let optionsHtml = '';
  list.forEach(s => {
    optionsHtml += `<option value="${s.id}">${s.name || s.shortName || s.id}</option>`;
  });

  if (globalSelect) {
    globalSelect.innerHTML = optionsHtml;
    globalSelect.value = currentActiveSeries;
  }
  if (standingsSelect) {
    standingsSelect.innerHTML = optionsHtml;
    standingsSelect.value = currentActiveSeries;
  }
}

function renderActiveLeagueContext() {
  const activeId = getActiveLeagueId();
  const league = getLeagueById(activeId);
  const crestEl = document.getElementById('context-league-crest');
  const nameEl = document.getElementById('context-league-name');
  const regionEl = document.getElementById('context-league-region');
  const demoBanner = document.getElementById('league-demo-banner');
  const demoNoticeText = document.getElementById('league-demo-notice-text');

  if (crestEl) {
    crestEl.innerHTML = getClubBadgeSvg(league.badgeId || 'asociacion-arauco', 28);
  }
  if (nameEl) {
    nameEl.textContent = league.name;
  }
  if (regionEl) {
    regionEl.textContent = `${league.commune} • ${league.statusLabel}`;
  }

  if (demoBanner) {
    if (league.isDemo) {
      demoBanner.style.display = 'block';
      if (demoNoticeText) {
        demoNoticeText.textContent = `Entorno de Demostración: Estructura de liga preconfigurada (${league.name}) para presentación e integración a LigaMaster.`;
      }
    } else {
      demoBanner.style.display = 'none';
    }
  }
}

/**
 * ==========================================================================
 * 1. RENDERIZADO: HOME VIEW
 * ==========================================================================
 */
function renderHomeView() {
  renderHomeLeaguesGrid();
  renderHomeFeaturedMatches();
  renderHomeMiniStandings();
  renderHomeMiniScorers();
  renderHomeMiniNews();
}

function renderHomeLeaguesGrid() {
  const container = document.getElementById('home-leagues-grid');
  if (!container) return;
  const regions = getRegionsAndLeagues();
  const activeId = getActiveLeagueId();

  let html = '';
  regions.forEach(reg => {
    reg.leagues.forEach(league => {
      const isActive = league.id === activeId;
      html += `
        <div class="league-picker-card ${isActive ? 'active-league' : ''}" onclick="window.ligamasterSwitchLeague('${league.id}')">
          <div>
            <div class="league-picker-header">
              <div class="league-picker-crest">
                ${getClubBadgeSvg(league.badgeId || 'asociacion-arauco', 40)}
              </div>
              <div class="league-picker-meta">
                <h4>${league.name}</h4>
                <span>${reg.regionName} • ${league.commune}</span>
              </div>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span class="league-picker-badge ${league.isDemo ? 'demo' : 'active'}">
                ${league.isDemo ? '🟡 Demostración Multi-Liga' : '🟢 Torneo Oficial en Vivo'}
              </span>
            </div>
            <p style="font-size: 0.78rem; color: var(--color-text-secondary); line-height: 1.4;">
              ${league.isDemo ? 'Estructura configurada para integración y registro de clubes comunales.' : `${league.totalClubs} Clubes afiliados • Presidente: ${league.president}.`}
            </p>
          </div>
          <div class="league-picker-footer">
            <span>${league.totalClubs} Clubes</span>
            <div class="league-picker-cta">
              <span>Ingresar</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = html;
}
    });
  });

  container.innerHTML = html;
}

function renderHomeFeaturedMatches() {
  const container = document.getElementById('home-featured-matches-grid');
  if (!container) return;
  const db = getDb();
  const matches = (db.matches || []).filter(m => m.series === currentActiveSeries).slice(0, 3);

  if (matches.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 2rem;">Actualmente no hay partidos programados para esta serie.</div>`;
    return;
  }

  let html = '';
  matches.forEach(m => {
    const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: "Local", shortName: "Local" };
    const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: "Visita", shortName: "Visita" };
    const isLive = m.status === 'en_vivo';
    const isFinished = m.status === 'finalizado';

    html += `
      <div class="match-card">
        <div class="match-card-header">
          <span>${m.round || 'Fecha Oficial'}</span>
          <span class="match-status-badge ${isLive ? 'live' : (isFinished ? 'finished' : 'scheduled')}">
            ${isLive ? `● EN VIVO (${m.currentMinute}')` : (isFinished ? 'FINALIZADO' : 'PROGRAMADO')}
          </span>
        </div>

        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">
              ${getClubBadgeSvg(m.homeClubId, 44)}
            </div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>

          <div class="match-score-col">
            ${isLive || isFinished ? `
              <div class="match-score-box">
                <span>${m.homeScore}</span>
                <span style="color: var(--color-text-muted);">-</span>
                <span>${m.awayScore}</span>
              </div>
            ` : `
              <div class="match-vs-box">VS</div>
              <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-primary); margin-top: 0.35rem;">
                ${m.date ? m.date.split('•')[1] || '16:30' : '16:30'}
              </div>
            `}
          </div>

          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">
              ${getClubBadgeSvg(m.awayClubId, 44)}
            </div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>

        <div class="match-card-footer">
          <div class="match-venue-info" title="${m.venue}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Ficha
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderHomeMiniStandings() {
  const container = document.getElementById('home-mini-standings-container');
  if (!container) return;
  const db = getDb();
  const standings = (db.standings && db.standings[currentActiveSeries]) || [];
  const top5 = standings.slice(0, 5);

  let html = `
    <table class="sports-table">
      <thead>
        <tr>
          <th style="width: 35px;">#</th>
          <th>Club</th>
          <th class="text-center">PJ</th>
          <th class="text-center">DG</th>
          <th class="text-center" style="color: var(--color-primary);">PTS</th>
        </tr>
      </thead>
      <tbody>
  `;

  top5.forEach((row, idx) => {
    html += `
      <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer;">
        <td>
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}">
            ${row.pos}
          </span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest" style="width: 22px; height: 22px;">
              ${getClubBadgeSvg(row.clubId, 22)}
            </div>
            <span class="table-team-name" style="font-size: 0.82rem;">${row.clubName}</span>
          </div>
        </td>
        <td class="text-center">${row.pj}</td>
        <td class="text-center">${row.dg > 0 ? `+${row.dg}` : row.dg}</td>
        <td class="pts-cell" style="font-size: 0.9rem;">${row.pts}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function renderHomeMiniScorers() {
  const container = document.getElementById('home-mini-scorers-container');
  if (!container) return;
  const db = getDb();
  const scorers = getSortedPlayersByStat('goals').slice(0, 4);

  let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
  scorers.forEach((p, idx) => {
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;" onclick="window.ligamasterSelectPlayer('${p.id}')">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}" style="width: 24px; height: 24px; font-size: 0.75rem;">
            ${idx + 1}
          </span>
          <img src="${p.avatar}" alt="${p.name}" style="width: 32px; height: 32px; border-radius: var(--radius-xs); object-fit: cover;">
          <div>
            <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-text-main);">${p.name}</div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted);">${p.clubName}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <strong style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; color: var(--color-primary);">${p.goals}</strong>
          <span style="font-size: 0.68rem; color: var(--color-text-muted); display: block;">goles</span>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

function renderHomeMiniNews() {
  const container = document.getElementById('home-mini-news-container');
  if (!container) return;
  const db = getDb();
  const news = (db.news || []).slice(0, 2);

  let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
  news.forEach(n => {
    html += `
      <div style="cursor: pointer;" onclick="window.ligamasterOpenNews('${n.id}')">
        <span style="font-size: 0.68rem; font-weight: 800; color: var(--color-primary); text-transform: uppercase;">${n.category}</span>
        <h4 style="font-family: var(--font-display); font-size: 0.9rem; font-weight: 800; color: var(--color-text-main); margin: 0.2rem 0; line-height: 1.3;">
          ${n.title}
        </h4>
        <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${n.excerpt}
        </p>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

/**
 * ==========================================================================
 * 2. RENDERIZADO: LIGA (COMPETICIÓN)
 * ==========================================================================
 */
function renderLeagueView() {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const league = getLeagueById(activeId);

  const crestBox = document.getElementById('league-hero-crest');
  if (crestBox) {
    crestBox.innerHTML = getClubBadgeSvg(league.badgeId || 'asociacion-arauco', 64);
  }

  const titleEl = document.getElementById('league-page-title');
  if (titleEl) titleEl.textContent = league.name;

  const clubsCountEl = document.getElementById('league-total-clubs-label');
  if (clubsCountEl) clubsCountEl.textContent = `${db.clubs ? db.clubs.length : 10} Instituciones Oficiales`;

  // Renderizar próximos partidos de liga
  const nextContainer = document.getElementById('league-next-matches-grid');
  if (nextContainer) {
    const matches = (db.matches || []).filter(m => m.series === currentActiveSeries).slice(0, 2);
    let html = '';
    matches.forEach(m => {
      const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: "Local" };
      const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: "Visita" };
      html += `
        <div class="match-card">
          <div class="match-card-header">
            <span>${m.round}</span>
            <span class="match-status-badge ${m.status === 'en_vivo' ? 'live' : 'scheduled'}">${m.status === 'en_vivo' ? 'EN VIVO' : 'PROGRAMADO'}</span>
          </div>
          <div class="match-teams-row">
            <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
              <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 40)}</div>
              <div class="match-team-name">${homeClub.name}</div>
            </div>
            <div class="match-score-col">
              <div class="match-vs-box">VS</div>
              <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 700; margin-top: 0.2rem;">${m.date.split('•')[1] || '16:30'}</span>
            </div>
            <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
              <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 40)}</div>
              <div class="match-team-name">${awayClub.name}</div>
            </div>
          </div>
          <div class="match-card-footer">
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">${m.venue}</span>
            <button class="btn-outline-coral" style="padding: 0.2rem 0.6rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">Detalles</button>
          </div>
        </div>
      `;
    });
    nextContainer.innerHTML = html;
  }

  // Renderizar tabla resumida
  const summaryBox = document.getElementById('league-summary-standings-box');
  if (summaryBox) {
    const standings = (db.standings && db.standings[currentActiveSeries]) || [];
    let html = `
      <table class="sports-table" style="font-size: 0.8rem;">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Equipo</th>
            <th class="text-center">PJ</th>
            <th class="text-center">PTS</th>
          </tr>
        </thead>
        <tbody>
    `;
    standings.slice(0, 6).forEach(row => {
      const club = (db.clubs || []).find(c => c.id === row.clubId);
      const bId = (club && club.badgeId) || row.clubId;
      html += `
        <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer;">
          <td><span class="table-pos-badge" style="width: 22px; height: 22px; font-size: 0.7rem;">${row.pos}</span></td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="width: 18px; height: 18px; display: inline-flex;">${getClubBadgeSvg(bId, 18)}</span>
              <strong style="font-size: 0.8rem;">${row.clubName}</strong>
            </div>
          </td>
          <td class="text-center">${row.pj}</td>
          <td class="pts-cell" style="font-size: 0.88rem;">${row.pts}</td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    summaryBox.innerHTML = html;
  }

  // Renderizar clubes afiliados
  const clubsGrid = document.getElementById('league-clubs-grid');
  if (clubsGrid) {
    let html = '';
    (db.clubs || []).forEach(club => {
      html += `
        <div class="club-compact-card" onclick="window.ligamasterSelectTeam('${club.id}')">
          <div class="club-compact-crest">
            ${getClubBadgeSvg(club.badgeId || club.id, 38)}
          </div>
          <div class="club-compact-info">
            <h4>${club.name}</h4>
            <span>Fundado: ${club.exactFoundationDate || club.founded || 'Oficial'}</span>
          </div>
        </div>
      `;
    });
    clubsGrid.innerHTML = html;
  }
}

/**
 * ==========================================================================
 * 3. RENDERIZADO: TABLA DE POSICIONES
 * ==========================================================================
 */
function renderStandingsView() {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const league = getLeagueById(activeId);
  const tbody = document.getElementById('standings-table-body');
  const labelEl = document.getElementById('standings-series-label');

  if (labelEl) {
    const seriesObj = (db.seriesList || []).find(s => s.id === currentActiveSeries) || { name: 'Serie de Honor' };
    labelEl.textContent = `${db.leagueInfo?.season || 'Campeonato Oficial'} • ${league.name} • ${seriesObj.name}`;
  }

  if (!tbody) return;

  const standings = (db.standings && db.standings[currentActiveSeries]) || [];
  if (standings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">Actualmente no hay estadísticas de tabla disponibles para esta serie en ${league.name}.</td></tr>`;
    return;
  }

  let html = '';
  standings.forEach((row, idx) => {
    const isChampionZone = idx < 2;
    const isRelegationZone = idx >= standings.length - 2;
    const club = (db.clubs || []).find(c => c.id === row.clubId);
    const badgeId = (club && club.badgeId) || row.clubId;

    html += `
      <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer; ${isChampionZone ? 'border-left: 3px solid var(--color-success);' : (isRelegationZone ? 'border-left: 3px solid var(--color-danger);' : '')}">
        <td class="text-center">
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}">
            ${row.pos}
          </span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest">
              ${getClubBadgeSvg(badgeId, 30)}
            </div>
            <span class="table-team-name">${row.clubName}</span>
          </div>
        </td>
        <td class="text-center">${row.pj}</td>
        <td class="text-center">${row.pg}</td>
        <td class="text-center">${row.pe}</td>
        <td class="text-center">${row.pp}</td>
        <td class="text-center">${row.gf}</td>
        <td class="text-center">${row.gc}</td>
        <td class="text-center" style="font-weight: 700; color: ${row.dg > 0 ? 'var(--color-success)' : (row.dg < 0 ? 'var(--color-danger)' : 'var(--color-text-secondary)')};">
          ${row.dg > 0 ? `+${row.dg}` : row.dg}
        </td>
        <td class="pts-cell">${row.pts}</td>
        <td class="text-center">
          <div class="form-pills">
            <span class="form-pill win">V</span>
            <span class="form-pill win">V</span>
            <span class="form-pill draw">E</span>
            <span class="form-pill win">V</span>
            <span class="form-pill loss">D</span>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

/**
 * ==========================================================================
 * 4. RENDERIZADO: CALENDARIO (FIXTURE)
 * ==========================================================================
 */
function renderCalendarView() {
  const pillsContainer = document.getElementById('calendar-round-pills');
  const matchesContainer = document.getElementById('calendar-matches-grid');
  if (!pillsContainer || !matchesContainer) return;

  // Generar pastillas de jornadas
  let pillsHtml = '';
  for (let i = 1; i <= 14; i++) {
    pillsHtml += `
      <button class="matchday-pill-btn ${i === currentActiveRound ? 'active' : ''}" onclick="window.ligamasterSelectRound(${i})">
        Fecha ${i}
      </button>
    `;
  }
  pillsContainer.innerHTML = pillsHtml;

  // Generar partidos de la fecha seleccionada
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const matches = (db.matches || []).filter(m => m.series === currentActiveSeries);

  if (matches.length === 0) {
    matchesContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay compromisos registrados en el fixture para esta categoría.</div>`;
    return;
  }

  let html = '';
  matches.forEach(m => {
    const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: "Local" };
    const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: "Visita" };

    html += `
      <div class="match-card">
        <div class="match-card-header">
          <span>${m.round || `Fecha ${currentActiveRound} • ${db.leagueInfo?.shortName}`}</span>
          <span class="match-status-badge ${m.status === 'en_vivo' ? 'live' : (m.status === 'finalizado' ? 'finished' : 'scheduled')}">
            ${m.status === 'en_vivo' ? 'EN VIVO' : (m.status === 'finalizado' ? 'FINALIZADO' : 'PROGRAMADO')}
          </span>
        </div>
        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 44)}</div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>
          <div class="match-score-col">
            ${m.status === 'en_vivo' || m.status === 'finalizado' ? `
              <div class="match-score-box">
                <span>${m.homeScore}</span>
                <span style="color: var(--color-text-muted);">-</span>
                <span>${m.awayScore}</span>
              </div>
            ` : `
              <div class="match-vs-box">VS</div>
              <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-primary); margin-top: 0.3rem;">
                ${m.date ? m.date.split('•')[1] || '16:30' : '16:30'}
              </span>
            `}
          </div>
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 44)}</div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>
        <div class="match-card-footer">
          <div class="match-venue-info">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Detalle
          </button>
        </div>
      </div>
    `;
  });

  matchesContainer.innerHTML = html;
}

window.ligamasterSelectRound = (round) => {
  currentActiveRound = round;
  renderCalendarView();
};

/**
 * ==========================================================================
 * 5. RENDERIZADO: RESULTADOS
 * ==========================================================================
 */
function renderResultsView() {
  const container = document.getElementById('results-matches-grid');
  if (!container) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);

  // Partidos jugados o en disputa
  const matches = (db.matches || []).filter(m => m.series === currentActiveSeries && (m.status === 'finalizado' || m.status === 'en_vivo'));

  if (matches.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 3rem;">Aún no se registran resultados oficiales para esta serie en la jornada.</div>`;
    return;
  }

  let html = '';
  matches.forEach(m => {
    const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: "Local" };
    const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: "Visita" };
    const isLive = m.status === 'en_vivo';

    let incidenciasStr = 'Acta cerrada sin observaciones.';
    if (m.events && m.events.length > 0) {
      incidenciasStr = m.events.map(ev => {
        const icon = ev.type === 'gol' ? '⚽' : (ev.type === 'amarilla' ? '🟨' : (ev.type === 'roja' ? '🟥' : '⏱️'));
        return `${icon} ${ev.minute}' ${ev.playerName}`;
      }).join(' • ');
    }

    html += `
      <div class="match-card" style="border-left: 4px solid ${isLive ? 'var(--color-primary)' : 'var(--color-success)'};">
        <div class="match-card-header">
          <span>${m.round || 'Marcador Oficial'}</span>
          <span class="match-status-badge ${isLive ? 'live' : 'finished'}">
            ${isLive ? `● EN VIVO (${m.currentMinute}')` : 'ACTA SELLADA'}
          </span>
        </div>
        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 44)}</div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>
          <div class="match-score-col">
            <div class="match-score-box">
              <span>${m.homeScore}</span>
              <span style="color: var(--color-text-muted);">-</span>
              <span>${m.awayScore}</span>
            </div>
            <span style="font-size: 0.68rem; color: var(--color-text-muted); margin-top: 0.35rem;">
              ${isLive ? `1er Tiempo ${m.currentMinute}'` : "Final 90'"}
            </span>
          </div>
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 44)}</div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>

        <!-- Goleadores e Incidencias del Partido -->
        <div style="background-color: var(--color-bg-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; font-size: 0.78rem;">
          <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Goles e Incidencias:</strong>
          <div style="color: var(--color-text-secondary); line-height: 1.4;">
            ${incidenciasStr}
          </div>
        </div>

        <div class="match-card-footer">
          <div class="match-venue-info">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue} • Árbitro: ${m.referee}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Ver Acta
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * ==========================================================================
 * 6. RENDERIZADO: EQUIPO (CLUB)
 * ==========================================================================
 */
function renderTeamView() {
  const activeId = getActiveLeagueId();
  const league = getLeagueById(activeId);
  const db = getDb(activeId);

  // Validar que el club activo pertenezca a la liga actual
  if (!db.clubs || db.clubs.length === 0) return;
  if (!db.clubs.some(c => c.id === currentActiveClubId)) {
    currentActiveClubId = db.clubs[0].id;
  }

  const strip = document.getElementById('team-view-clubs-strip');
  if (strip) {
    let stripHtml = '';
    (db.clubs || []).forEach(club => {
      const isSelected = club.id === currentActiveClubId;
      stripHtml += `
        <button class="club-strip-item ${isSelected ? 'active' : ''}" onclick="window.ligamasterSelectTeam('${club.id}')">
          <div class="club-strip-crest">${getClubBadgeSvg(club.badgeId || club.id, 24)}</div>
          <span class="club-strip-name">${club.shortName}</span>
        </button>
      `;
    });
    strip.innerHTML = stripHtml;
  }

  const currentClub = (db.clubs || []).find(c => c.id === currentActiveClubId) || db.clubs[0];
  if (!currentClub) return;

  // Header del club
  const crestEl = document.getElementById('team-hero-crest');
  if (crestEl) crestEl.innerHTML = getClubBadgeSvg(currentClub.badgeId || currentClub.id, 80);

  const nameEl = document.getElementById('team-hero-name');
  if (nameEl) nameEl.textContent = currentClub.name;

  const locEl = document.getElementById('team-hero-locality');
  if (locEl) locEl.textContent = `${currentClub.neighborhood || league.commune} • ${league.name}`;

  const foundedEl = document.getElementById('team-meta-founded');
  if (foundedEl) foundedEl.textContent = currentClub.exactFoundationDate || currentClub.founded || 'Fundado oficialmente';

  const stadiumEl = document.getElementById('team-meta-stadium');
  if (stadiumEl) stadiumEl.textContent = currentClub.stadium;

  const titlesEl = document.getElementById('team-meta-titles');
  if (titlesEl) titlesEl.textContent = `${currentClub.titlesComunalesHonor || currentClub.titles || 0} Títulos de Honor`;

  // Renderizar contenido de las tabs del club
  renderTeamTabContent(currentClub);
}

function renderTeamTabContent(club) {
  const container = document.getElementById('team-tab-content-container');
  if (!container) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);

  // Filtrar jugadores de este club
  const players = (db.players || []).filter(p => p.clubId === club.id && p.series === currentActiveSeries);

  if (currentTeamTab === 'plantel') {
    let html = '<div class="roster-grid">';
    if (players.length === 0) {
      html += `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 2rem;">No hay futbolistas inscritos para esta serie en el club.</div>`;
    } else {
      players.forEach(p => {
        html += `
          <div class="player-roster-card" onclick="window.ligamasterSelectPlayer('${p.id}')">
            <div class="roster-avatar-box">
              <img src="${p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}" alt="${p.name}" class="roster-avatar-img">
              <span class="roster-number-badge">#${p.number}</span>
            </div>
            <div class="roster-info">
              <h4>${p.name}</h4>
              <span class="position">${p.position}</span>
              <span class="rut">RUT: ${p.rut}</span>
            </div>
          </div>
        `;
      });
    }
    html += '</div>';
    container.innerHTML = html;
  } else if (currentTeamTab === 'partidos') {
    container.innerHTML = `
      <div style="background: #fff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center;">
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">Historial de Partidos • ${club.name}</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted);">
          7 Partidos oficiales disputados en la temporada regular de ${db.leagueInfo?.name || 'la Asociación'}.
        </p>
      </div>
    `;
  } else if (currentTeamTab === 'estadisticas') {
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem;">
        <div class="player-metric-box highlight"><div class="player-metric-label">Goles a Favor</div><div class="player-metric-value">16</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Goles en Contra</div><div class="player-metric-value">9</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Diferencia</div><div class="player-metric-value" style="color: var(--color-success);">+7</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Amarillas</div><div class="player-metric-value">12</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Rojas</div><div class="player-metric-value">1</div></div>
      </div>
    `;
  } else {
    // Resumen
    const seriesListItems = (club.series || ['honor']).map(s => {
      const sObj = (db.seriesList || []).find(item => item.id === s);
      return `<li>✓ ${sObj ? sObj.name : s}</li>`;
    }).join('');

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Reseña Histórica & Palmarés</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6;">${club.regionalRecord || club.description || 'Institución afiliada formalmente a la Asociación.'}</p>
        </div>
        <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Categorías Oficiales</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${seriesListItems}
          </ul>
        </div>
      </div>
    `;
  }
}

window.ligamasterSelectTeam = (clubId) => {
  currentActiveClubId = clubId;
  navigateTo('team-view');
  renderTeamView();
};

/**
 * ==========================================================================
 * 7. RENDERIZADO: JUGADOR (FICHA PROFESIONAL)
 * ==========================================================================
 */
function renderPlayerView() {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const clubSelect = document.getElementById('player-select-club');
  const playerSelect = document.getElementById('player-select-individual');

  // Llenar select de clubes de la liga activa
  if (clubSelect) {
    clubSelect.innerHTML = '';
    (db.clubs || []).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      clubSelect.appendChild(opt);
    });
    if (!db.clubs.some(c => c.id === currentActiveClubId)) {
      currentActiveClubId = db.clubs[0] ? db.clubs[0].id : '';
    }
    clubSelect.value = currentActiveClubId;
  }

  // Llenar select de jugadores del club actual
  if (playerSelect) {
    playerSelect.innerHTML = '';
    const clubPlayers = (db.players || []).filter(p => p.clubId === currentActiveClubId);
    clubPlayers.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `#${p.number} - ${p.name} (${p.position})`;
      playerSelect.appendChild(opt);
    });
    if (!clubPlayers.some(p => p.id === currentActivePlayerId)) {
      currentActivePlayerId = clubPlayers[0] ? clubPlayers[0].id : (db.players && db.players[0] ? db.players[0].id : '');
    }
    playerSelect.value = currentActivePlayerId;
  }

  const player = (db.players || []).find(p => p.id === currentActivePlayerId) || db.players[0];
  if (!player) return;

  const club = (db.clubs || []).find(c => c.id === player.clubId) || { name: "Club Oficial" };

  // Renderizar Ficha
  document.getElementById('player-profile-img').src = player.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
  document.getElementById('player-profile-dorsal').textContent = `#${player.number}`;
  document.getElementById('player-profile-name').textContent = player.name;
  document.getElementById('player-profile-crest').innerHTML = getClubBadgeSvg(club.badgeId || player.clubId, 26);
  document.getElementById('player-profile-club').textContent = club.name;
  document.getElementById('player-profile-pos').textContent = player.position;

  document.getElementById('player-metric-goals').textContent = player.goals || 0;
  document.getElementById('player-metric-assists').textContent = player.assists || 0;
  document.getElementById('player-metric-matches').textContent = player.matchesPlayed || 0;
  document.getElementById('player-metric-starters').textContent = player.matchesPlayed || 0;
  document.getElementById('player-metric-minutes').textContent = player.minutesPlayed || 0;
  document.getElementById('player-metric-yellows').textContent = player.yellowCards || 0;
  document.getElementById('player-metric-reds').textContent = player.redCards || 0;
}

window.ligamasterSelectPlayer = (playerId) => {
  const db = getDb();
  const player = (db.players || []).find(p => p.id === playerId);
  if (player) {
    currentActiveClubId = player.clubId;
    currentActivePlayerId = player.id;
  }
  navigateTo('player-view');
  renderPlayerView();
};

/**
 * ==========================================================================
 * 8. RENDERIZADO: ESTADÍSTICAS
 * ==========================================================================
 */
function renderStatsView() {
  const tbody = document.getElementById('stats-table-body');
  const metricHeader = document.getElementById('stats-metric-header');
  if (!tbody || !metricHeader) return;

  let metricKey = 'goals';
  let metricTitle = 'GOLES';

  if (currentStatCategory === 'asistencias') {
    metricKey = 'assists';
    metricTitle = 'ASISTENCIAS';
  } else if (currentStatCategory === 'amarillas') {
    metricKey = 'yellowCards';
    metricTitle = 'TARJETAS AMARILLAS';
  } else if (currentStatCategory === 'rojas') {
    metricKey = 'redCards';
    metricTitle = 'TARJETAS ROJAS';
  } else if (currentStatCategory === 'porteros') {
    metricKey = 'minutesPlayed';
    metricTitle = 'MINUTOS JUGADOS';
  }

  metricHeader.textContent = metricTitle;

  const sortedPlayers = getSortedPlayersByStat(metricKey);

  if (sortedPlayers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">Actualmente no hay estadísticas disponibles para esta selección.</td></tr>`;
    return;
  }

  let html = '';
  sortedPlayers.forEach((p, idx) => {
    const val = p[metricKey] || 0;
    const pj = p.matchesPlayed || 1;
    const avg = (val / pj).toFixed(2);

    html += `
      <tr onclick="window.ligamasterSelectPlayer('${p.id}')" style="cursor: pointer;">
        <td class="text-center">
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}">
            ${idx + 1}
          </span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${p.avatar}" alt="${p.name}" style="width: 38px; height: 38px; border-radius: var(--radius-xs); object-fit: cover;">
            <div>
              <strong style="font-family: var(--font-display); font-size: 0.95rem; color: var(--color-text-main); display: block;">${p.name}</strong>
              <small style="color: var(--color-text-muted); font-size: 0.75rem;">#${p.number} • ${p.position}</small>
            </div>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 24px; height: 24px; display: inline-flex;">${getClubBadgeSvg(p.badgeId || p.clubId, 24)}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-secondary);">${p.clubName}</span>
          </div>
        </td>
        <td class="pts-cell" style="font-size: 1.15rem;">${val}</td>
        <td class="text-center">${pj}</td>
        <td class="text-center" style="font-weight: 700; color: var(--color-text-muted);">${avg}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function getSortedPlayersByStat(key) {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const list = [];
  (db.players || []).forEach(p => {
    if (p.series === currentActiveSeries) {
      const club = (db.clubs || []).find(c => c.id === p.clubId) || { name: "Club" };
      list.push({
        ...p,
        clubName: club.name,
        badgeId: club.badgeId || p.clubId
      });
    }
  });

  return list.sort((a, b) => (b[key] || 0) - (a[key] || 0));
}

/**
 * ==========================================================================
 * 9. RENDERIZADO: NOTICIAS
 * ==========================================================================
 */
function renderNewsView() {
  const container = document.getElementById('official-news-grid');
  if (!container) return;
  const db = getDb();
  const news = db.news || [];

  let html = '';
  news.forEach(n => {
    html += `
      <article class="news-card">
        <div class="news-img-box">
          <img src="${n.image}" alt="${n.title}" class="news-img">
          <span class="news-tag">${n.category}</span>
        </div>
        <div class="news-content">
          <div>
            <div class="news-date">${n.date}</div>
            <h3 class="news-title">${n.title}</h3>
            <p class="news-excerpt">${n.excerpt}</p>
          </div>
          <button class="news-read-cta" onclick="window.ligamasterOpenNews('${n.id}')">
            <span>Leer Noticia Completa</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

window.ligamasterOpenNews = (newsId) => {
  const db = getDb();
  const news = (db.news || []).find(n => n.id === newsId);
  if (!news) return;

  const titleEl = document.getElementById('news-modal-title');
  const bodyEl = document.getElementById('news-modal-body');

  if (titleEl) titleEl.textContent = news.title;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <img src="${news.image}" alt="${news.title}" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
      <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">${news.category} • ${news.date}</div>
      <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1rem;">
        ${news.content || news.excerpt}
      </p>
      <div style="font-size: 0.75rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
        Emitido por Departamento de Prensa de la Asociación de Fútbol de Arauco.
      </div>
    `;
  }

  openModal('modal-news-reader');
};

window.ligamasterOpenMatchDetail = (matchId) => {
  const db = getDb();
  const match = (db.matches || []).find(m => m.id === matchId);
  if (!match) return;

  const homeClub = (db.clubs || []).find(c => c.id === match.homeClubId) || { name: "Local" };
  const awayClub = (db.clubs || []).find(c => c.id === match.awayClubId) || { name: "Visita" };

  const titleEl = document.getElementById('match-modal-title');
  const bodyEl = document.getElementById('match-modal-body');

  if (titleEl) titleEl.textContent = `${homeClub.name} vs ${awayClub.name}`;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem; background: var(--color-bg-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
        <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">${match.round}</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
          <div style="text-align: center;">
            <div style="width: 50px; height: 50px; margin: 0 auto 0.35rem auto;">${getClubBadgeSvg(match.homeClubId, 50)}</div>
            <strong style="font-size: 0.9rem;">${homeClub.name}</strong>
          </div>
          <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-primary);">
            ${match.homeScore} - ${match.awayScore}
          </div>
          <div style="text-align: center;">
            <div style="width: 50px; height: 50px; margin: 0 auto 0.35rem auto;">${getClubBadgeSvg(match.awayClubId, 50)}</div>
            <strong style="font-size: 0.9rem;">${awayClub.name}</strong>
          </div>
        </div>
      </div>

      <div style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.6;">
        <p><strong>Recinto:</strong> ${match.venue}</p>
        <p><strong>Árbitro Central:</strong> ${match.referee}</p>
        <p><strong>Turno Oficial ANFA:</strong> Don Sergio Viveros</p>
        <p><strong>Estado del Acta:</strong> Acta de Cancha Oficializada con firma digital de capitanes.</p>
      </div>
    `;
  }

  openModal('modal-match-detail');
};

/**
 * ==========================================================================
 * BUSCADOR GLOBAL (COMMAND PALETTE)
 * ==========================================================================
 */
function setupGlobalSearch() {
  const searchInput = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('global-search-results');

  // Atajo de teclado Ctrl+K o Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal('modal-global-search');
      setTimeout(() => searchInput?.focus(), 100);
    }
  });

  document.getElementById('btn-open-search')?.addEventListener('click', () => {
    openModal('modal-global-search');
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); padding: 1.5rem; font-size: 0.85rem;">Escribe el nombre de un club, futbolista, liga o recinto...</div>`;
      return;
    }

    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    let html = '';

    // Buscar Clubes
    const matchedClubs = (db.clubs || []).filter(c => c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q));
    if (matchedClubs.length > 0) {
      html += `<div class="search-results-group"><div class="search-group-title">🛡️ Clubes Afiliados</div>`;
      matchedClubs.forEach(c => {
        html += `
          <div class="search-result-item" onclick="window.ligamasterSelectTeam('${c.id}'); closeModal('modal-global-search');">
            <span style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;">${getClubBadgeSvg(c.badgeId || c.id, 22)}</span>
            <strong>${c.name}</strong>
            <small>Club Oficial</small>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Buscar Jugadores
    const matchedPlayers = (db.players || []).filter(p => p.name.toLowerCase().includes(q) || (p.rut && p.rut.includes(q)));
    if (matchedPlayers.length > 0) {
      html += `<div class="search-results-group"><div class="search-group-title">👤 Futbolistas</div>`;
      matchedPlayers.slice(0, 5).forEach(p => {
        html += `
          <div class="search-result-item" onclick="window.ligamasterSelectPlayer('${p.id}'); closeModal('modal-global-search');">
            <img src="${p.avatar}" alt="${p.name}" style="width: 22px; height: 22px; border-radius: var(--radius-xs); object-fit: cover;">
            <strong>${p.name} (#${p.number})</strong>
            <small>${p.position}</small>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Buscar Ligas
    const regions = getRegionsAndLeagues();
    const matchedLeagues = [];
    regions.forEach(r => {
      r.leagues.forEach(l => {
        if (l.name.toLowerCase().includes(q) || l.commune.toLowerCase().includes(q)) {
          matchedLeagues.push(l);
        }
      });
    });

    if (matchedLeagues.length > 0) {
      html += `<div class="search-results-group"><div class="search-group-title">🏆 Competiciones & Ligas</div>`;
      matchedLeagues.forEach(l => {
        html += `
          <div class="search-result-item" onclick="window.ligamasterSwitchLeague('${l.id}'); closeModal('modal-global-search');">
            <span style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;">${getClubBadgeSvg(l.badgeId || 'asociacion-arauco', 22)}</span>
            <strong>${l.name}</strong>
            <small>${l.commune} • ${l.statusLabel}</small>
          </div>
        `;
      });
      html += `</div>`;
    }

    if (!html) {
      html = `<div style="text-align: center; color: var(--color-text-muted); padding: 1.5rem; font-size: 0.85rem;">No se encontraron resultados para "${q}".</div>`;
    }

    resultsContainer.innerHTML = html;
  });
}

/**
 * ==========================================================================
 * FILTROS & TABS INTERNAS
 * ==========================================================================
 */
function setupSeriesFilters() {
  const globalSelect = document.getElementById('global-series-select');
  const standingsSelect = document.getElementById('standings-series-select');

  const onSeriesChange = (val) => {
    currentActiveSeries = val;
    if (globalSelect) globalSelect.value = val;
    if (standingsSelect) standingsSelect.value = val;
    renderHomeView();
    renderLeagueView();
    renderStandingsView();
    renderCalendarView();
    renderResultsView();
    renderStatsView();
  };

  globalSelect?.addEventListener('change', (e) => onSeriesChange(e.target.value));
  standingsSelect?.addEventListener('change', (e) => onSeriesChange(e.target.value));

  // Pastillas de estadísticas
  document.querySelectorAll('.stats-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stats-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentStatCategory = btn.getAttribute('data-stat-category') || 'goleadores';
      renderStatsView();
    });
  });

  // Tabs internas de equipo
  document.querySelectorAll('.team-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.team-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTeamTab = btn.getAttribute('data-team-tab') || 'resumen';
      const db = getDb();
      const club = (db.clubs || []).find(c => c.id === currentActiveClubId) || db.clubs[0];
      renderTeamTabContent(club);
    });
  });

  // Selectores de la vista de jugador
  document.getElementById('player-select-club')?.addEventListener('change', (e) => {
    currentActiveClubId = e.target.value;
    const db = getDb();
    const firstPlayer = (db.players || []).find(p => p.clubId === currentActiveClubId);
    if (firstPlayer) currentActivePlayerId = firstPlayer.id;
    renderPlayerView();
  });

  document.getElementById('player-select-individual')?.addEventListener('change', (e) => {
    currentActivePlayerId = e.target.value;
    renderPlayerView();
  });
}

/**
 * ==========================================================================
 * MODALES Y AYUDAS GLOBALES
 * ==========================================================================
 */
function setupGlobalModals() {
  // Botones de cierre de modal
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  // Cerrar al hacer clic en el backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Tecla Escape cierra modales
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  // Botón login
  document.getElementById('btn-open-login')?.addEventListener('click', () => {
    if (getCurrentRole() !== ROLES.PUBLIC) {
      navigateTo('admin-view');
    } else {
      openModal('modal-login');
    }
  });

  // Menú móvil
  document.getElementById('btn-mobile-menu')?.addEventListener('click', () => {
    openModal('modal-mobile-menu');
  });

  // Rellenar lista del modal de ligas
  renderLeaguePickerModal();
}

function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}
window.openModal = openModal;

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}
window.closeModal = closeModal;

function renderLeaguePickerModal() {
  const container = document.getElementById('league-picker-modal-list');
  if (!container) return;
  const regions = getRegionsAndLeagues();
  const activeId = getActiveLeagueId();

  let html = '';
  regions.forEach(r => {
    html += `
      <div style="margin-bottom: 1.25rem;">
        <div style="font-family: var(--font-display); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem;">
          📍 ${r.regionName}
        </div>
    `;

    r.leagues.forEach(l => {
      const isSel = l.id === activeId;
      html += `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border: 1px solid ${isSel ? 'var(--color-primary)' : 'var(--color-border)'}; border-radius: var(--radius-sm); margin-bottom: 0.5rem; cursor: pointer; background: ${isSel ? 'var(--color-primary-light)' : '#ffffff'}; transition: all 0.15s ease;" onclick="window.ligamasterSwitchLeague('${l.id}')">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getClubBadgeSvg(l.badgeId || 'asociacion-arauco', 32)}
            </div>
            <div>
              <strong style="font-family: var(--font-display); font-size: 0.92rem; color: var(--color-text-main); display: block;">${l.name}</strong>
              <small style="color: var(--color-text-muted); font-size: 0.75rem;">${l.commune} • ${l.statusLabel}</small>
            </div>
          </div>
          <span style="font-size: 0.75rem; font-weight: 800; color: ${isSel ? 'var(--color-primary)' : 'var(--color-text-muted)'};">${isSel ? '✓ ACTIVA' : 'Seleccionar'}</span>
        </div>
      `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}
