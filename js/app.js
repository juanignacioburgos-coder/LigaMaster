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
import { showToast } from './toast.js';

// Fallback de imágenes SVG seguras y offline
const FALLBACK_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23131b2e'/><circle cx='50' cy='40' r='22' fill='%23334155'/><path d='M20 90c0-18 14-26 30-26s30 8 30 26z' fill='%23334155'/></svg>";
const FALLBACK_NEWS = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%230f172a'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-weight='800' font-size='18'>LIGAMASTER OFICIAL</text></svg>";

if (typeof window !== 'undefined') {
  window.ligamasterImageFallback = (img, type = 'avatar') => {
    if (!img) return;
    img.onerror = null;
    img.src = type === 'news' ? FALLBACK_NEWS : FALLBACK_AVATAR;
  };
}

// Estado Global de Navegación y Filtros
let currentActiveView = 'home-view';
let currentActiveSeries = 'honor';
let currentActiveClubId = 'club-arauco';
let currentActivePlayerId = null;
let currentPlayerFilterClubId = 'all';
let currentPlayerSearchQuery = '';
let playerRosterLimit = 48;
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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initLigaMaster());
  } else {
    initLigaMaster();
  }
}

/**
 * Inicialización General de LigaMaster
 */
function initLigaMaster() {
  const db = getDb();
  if (db.clubs && db.clubs.length > 0) {
    currentActiveClubId = db.clubs[0].id;
  }
  currentActivePlayerId = null;
  currentPlayerFilterClubId = 'all';
  currentPlayerSearchQuery = '';
  playerRosterLimit = 48;

  const seriesList = db.seriesList || [];
  if (currentActiveSeries !== 'all' && seriesList.length > 0 && !seriesList.some(s => s.id === currentActiveSeries)) {
    currentActiveSeries = seriesList[0].id;
  }
  updateSeriesSelectDropdowns(seriesList);

  setupNavigationRouting();
  setupGlobalModals();
  setupGlobalSearch();
  setupSeriesFilters();
  setupMultiLeagueHandlers();
  setupFooterLinks();

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
    if (currentActiveSeries !== 'all' && !supportedIds.includes(currentActiveSeries)) {
      currentActiveSeries = supportedIds[0] || 'honor';
    }
    updateSeriesSelectDropdowns(seriesList);

    // Ajustar club y jugador activo a la nueva liga
    if (db.clubs && db.clubs.length > 0) {
      currentActiveClubId = db.clubs[0].id;
    }
    currentActivePlayerId = null;
    currentPlayerFilterClubId = 'all';
    currentPlayerSearchQuery = '';
    playerRosterLimit = 48;

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

  let seriesOptionsHtml = '';
  list.forEach(s => {
    seriesOptionsHtml += `<option value="${s.id}">${s.name || s.shortName || s.id}</option>`;
  });

  if (globalSelect) {
    globalSelect.innerHTML = `<option value="all">Todas las Categorías / Series</option>` + seriesOptionsHtml;
    globalSelect.value = currentActiveSeries;
  }
  if (standingsSelect) {
    standingsSelect.innerHTML = seriesOptionsHtml;
    standingsSelect.value = (currentActiveSeries === 'all') ? (list[0] ? list[0].id : '') : currentActiveSeries;
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

  if (top5.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">📊</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Posiciones</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">No hay partidos computados en esta serie aún.</div>
      </div>
    `;
    return;
  }

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

  if (scorers.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">⚽</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Goleadores</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">Aún no se registran goles en las planillas de juego.</div>
      </div>
    `;
    return;
  }

  let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
  scorers.forEach((p, idx) => {
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;" onclick="window.ligamasterSelectPlayer('${p.id}')">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}" style="width: 24px; height: 24px; font-size: 0.75rem;">
            ${idx + 1}
          </span>
          <img src="${p.avatar}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 32px; height: 32px; border-radius: var(--radius-xs); object-fit: cover;">
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

  if (news.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">📰</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Comunicados</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">No hay notas de prensa publicadas en esta liga.</div>
      </div>
    `;
    return;
  }

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
    if (matches.length === 0) {
      nextContainer.innerHTML = `
        <div class="empty-state-box" style="padding: 1.5rem 1rem;">
          <span class="empty-state-icon">⚽</span>
          <div class="empty-state-title" style="font-size: 0.95rem;">Sin Partidos Próximos</div>
          <div class="empty-state-desc" style="font-size: 0.8rem;">No hay compromisos agendados para esta serie.</div>
        </div>
      `;
    } else {
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
  }

  // Renderizar tabla resumida
  const summaryBox = document.getElementById('league-summary-standings-box');
  if (summaryBox) {
    const standings = (db.standings && db.standings[currentActiveSeries]) || [];
    if (standings.length === 0) {
      summaryBox.innerHTML = `
        <div class="empty-state-box" style="padding: 1.5rem 1rem;">
          <span class="empty-state-icon">📊</span>
          <div class="empty-state-title" style="font-size: 0.95rem;">Tabla Pendiente</div>
          <div class="empty-state-desc" style="font-size: 0.8rem;">Sin estadísticas calculadas aún.</div>
        </div>
      `;
    } else {
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
  }

  // Renderizar clubes afiliados
  const clubsGrid = document.getElementById('league-clubs-grid');
  if (clubsGrid) {
    if (!db.clubs || !db.clubs.length) {
      clubsGrid.innerHTML = `
        <div style="grid-column: 1/-1;">
          <div class="empty-state-box">
            <span class="empty-state-icon">🛡️</span>
            <div class="empty-state-title">Sin Clubes Registrados</div>
            <div class="empty-state-desc">Esta liga no cuenta con clubes registrados en su directorio.</div>
          </div>
        </div>
      `;
    } else {
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
  const pillsContainer = document.getElementById('standings-series-pills-container');

  // Asegurar que currentActiveSeries pertenezca a la liga activa
  const seriesList = db.seriesList || [];
  if (currentActiveSeries !== 'all' && seriesList.length > 0 && !seriesList.some(s => s.id === currentActiveSeries)) {
    currentActiveSeries = seriesList[0].id;
  }

  // Renderizar pastillas de selección rápida de series
  if (pillsContainer) {
    let pillsHtml = '<div class="series-pills-scroll">';
    seriesList.forEach(s => {
      const isActive = s.id === currentActiveSeries;
      pillsHtml += `
        <button class="series-pill-btn ${isActive ? 'active' : ''}" onclick="window.ligamasterSetSeries('${s.id}')">
          <span>🏆 ${s.name || s.shortName}</span>
        </button>
      `;
    });
    pillsHtml += '</div>';
    pillsContainer.innerHTML = pillsHtml;
  }

  // Sincronizar select si existe
  const standingsSelect = document.getElementById('standings-series-select');
  if (standingsSelect && standingsSelect.value !== currentActiveSeries) {
    standingsSelect.value = currentActiveSeries;
  }

  const activeStandingsSeries = (currentActiveSeries === 'all') ? (seriesList[0] ? seriesList[0].id : 'honor') : currentActiveSeries;

  if (labelEl) {
    const seriesObj = seriesList.find(s => s.id === activeStandingsSeries) || seriesList[0] || { name: 'Serie de Honor' };
    labelEl.textContent = `${db.leagueInfo?.season || 'Campeonato Oficial'} • ${league.name} • ${seriesObj.name}`;
  }

  if (!tbody) return;

  const standings = (db.standings && db.standings[activeStandingsSeries]) || [];
  if (standings.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" style="padding: 3rem 1rem;">
          <div class="empty-state-box">
            <span class="empty-state-icon">📋</span>
            <div class="empty-state-title">Sin Tabla Registrada</div>
            <div class="empty-state-desc">Actualmente no hay estadísticas de tabla computadas para esta serie en ${league.name}.</div>
          </div>
        </td>
      </tr>`;
    return;
  }

  let html = '';
  standings.forEach((row, idx) => {
    const isChampionZone = idx < 2;
    const isRelegationZone = idx >= standings.length - 2;
    const club = (db.clubs || []).find(c => c.id === (row.clubId || row.teamId));
    const badgeId = (club && club.badgeId) || row.clubId || row.teamId;
    const clubName = row.clubName || (club ? club.name : 'Club');
    const pos = row.pos ?? row.position ?? (idx + 1);
    const pj = row.pj ?? row.played ?? 0;
    const pg = row.pg ?? row.won ?? 0;
    const pe = row.pe ?? row.drawn ?? 0;
    const pp = row.pp ?? row.lost ?? 0;
    const gf = row.gf ?? row.goalsFor ?? 0;
    const gc = row.gc ?? row.goalsAgainst ?? 0;
    const dg = row.dg ?? row.goalDiff ?? (gf - gc);
    const pts = row.pts ?? row.points ?? 0;

    let formPillsHtml = '';
    const formList = Array.isArray(row.form) && row.form.length > 0 ? row.form : ['V', 'E', 'D'];
    formList.forEach(f => {
      const cls = f === 'V' ? 'win' : (f === 'E' ? 'draw' : 'loss');
      formPillsHtml += `<span class="form-pill ${cls}">${f}</span>`;
    });

    html += `
      <tr onclick="window.ligamasterSelectTeam('${row.clubId || (club && club.id)}')" style="cursor: pointer; ${isChampionZone ? 'border-left: 3px solid var(--color-success);' : (isRelegationZone ? 'border-left: 3px solid var(--color-danger);' : '')}">
        <td class="text-center">
          <span class="table-pos-badge ${idx === 0 ? 'gold' : (idx === 1 ? 'silver' : (idx === 2 ? 'bronze' : ''))}">
            ${pos}
          </span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest">
              ${getClubBadgeSvg(badgeId, 30)}
            </div>
            <span class="table-team-name">${clubName}</span>
          </div>
        </td>
        <td class="text-center">${pj}</td>
        <td class="text-center">${pg}</td>
        <td class="text-center">${pe}</td>
        <td class="text-center">${pp}</td>
        <td class="text-center">${gf}</td>
        <td class="text-center">${gc}</td>
        <td class="text-center" style="font-weight: 700; color: ${dg > 0 ? 'var(--color-success)' : (dg < 0 ? 'var(--color-danger)' : 'var(--color-text-secondary)')};">
          ${dg > 0 ? `+${dg}` : dg}
        </td>
        <td class="pts-cell">${pts}</td>
        <td class="text-center">
          <div class="form-pills">
            ${formPillsHtml}
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
  const matches = (db.matches || []).filter(m => currentActiveSeries === 'all' || m.series === currentActiveSeries);

  if (matches.length === 0) {
    matchesContainer.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">📅</span>
          <div class="empty-state-title">Sin Partidos Programados</div>
          <div class="empty-state-desc">No hay compromisos oficiales registrados en el fixture para esta categoría.</div>
        </div>
      </div>
    `;
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
  const matches = (db.matches || []).filter(m => (currentActiveSeries === 'all' || m.series === currentActiveSeries) && (m.status === 'finalizado' || m.status === 'en_vivo'));

  if (matches.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">⏱️</span>
          <div class="empty-state-title">Sin Resultados Oficiales</div>
          <div class="empty-state-desc">Aún no se registran resultados oficiales para esta serie en la jornada.</div>
        </div>
      </div>
    `;
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
  const seriesList = db.seriesList || [
    { id: 'primera_adulta', name: 'Primera Adulta' },
    { id: 'senior', name: 'Senior' },
    { id: 'super_senior', name: 'Súper Senior' },
    { id: 'juvenil', name: 'Juvenil' }
  ];

  // Asegurar serie activa válida
  if (!seriesList.some(s => s.id === currentActiveSeries)) {
    currentActiveSeries = seriesList[0].id;
  }
  const currentSeriesObj = seriesList.find(s => s.id === currentActiveSeries) || seriesList[0];

  if (currentTeamTab === 'plantel') {
    const seriesPlayers = (db.players || []).filter(p => p.clubId === club.id && p.series === currentActiveSeries);
    const totalClubPlayers = (db.players || []).filter(p => p.clubId === club.id).length;

    let html = `
      <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-xs);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.25rem;">
              Plantel Oficial por Series • ${club.name}
            </h4>
            <p style="font-size: 0.82rem; color: var(--color-text-secondary);">
              Total: <strong>${totalClubPlayers} futbolistas federados</strong> en el club, distribuidos en sus 4 categorías oficiales.
            </p>
          </div>
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--color-primary); background: var(--color-primary-light); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); border: 1px solid var(--color-primary-border);">
            ${currentSeriesObj.name}: ${seriesPlayers.length} Jugadores
          </span>
        </div>

        <!-- Selector Rápido de Serie del Club -->
        <div class="series-pills-scroll">
          ${seriesList.map(s => {
            const count = (db.players || []).filter(p => p.clubId === club.id && p.series === s.id).length;
            const isActive = s.id === currentActiveSeries;
            return `
              <button class="series-pill-btn ${isActive ? 'active' : ''}" onclick="window.ligamasterSetSeries('${s.id}')">
                <span>${s.name || s.shortName}</span>
                <span class="series-pill-badge">${count}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;

    if (seriesPlayers.length === 0) {
      html += `
        <div class="empty-state-box" style="padding: 3rem 1rem;">
          <span class="empty-state-icon">👥</span>
          <div class="empty-state-title">Sin Futbolistas Inscritos</div>
          <div class="empty-state-desc">No hay futbolistas inscritos para ${currentSeriesObj.name} en ${club.name}.</div>
        </div>
      `;
    } else {
      html += '<div class="roster-grid">';
      seriesPlayers.forEach(p => {
        const dorsalNum = p.dorsal ?? p.number ?? '-';
        const positionLabel = p.specificPosition ? `${p.position} (${p.specificPosition})` : (p.position || 'Jugador');
        const isSuspended = p.status === 'Suspendido';

        html += `
          <div class="player-roster-card" onclick="window.ligamasterSelectPlayer('${p.id}')">
            <div class="roster-avatar-box">
              <img src="${p.photo || p.avatar || FALLBACK_AVATAR}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" class="roster-avatar-img">
              <span class="roster-number-badge">#${dorsalNum}</span>
            </div>
            <div class="roster-info" style="flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                <h4 style="margin: 0; font-size: 0.95rem;">${p.name}</h4>
                ${p.isCaptain ? '<span style="font-size: 0.65rem; background: #fef3c7; color: #b45309; padding: 0.1rem 0.4rem; border-radius: var(--radius-xs); font-weight: 800; border: 1px solid #fde68a;">⭐ CAPITÁN</span>' : ''}
              </div>
              <span class="position" style="color: var(--color-primary); font-weight: 600;">${positionLabel}</span>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); margin-top: 0.2rem; display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                ${p.age ? `<span>${p.age} años</span> •` : ''}
                ${p.preferredFoot ? `<span>Pie ${p.preferredFoot}</span> •` : ''}
                <span class="rut">RUT: ${p.rut || 'Pendiente'}</span>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center;">
              <span style="font-size: 0.68rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: var(--radius-xs); background: ${isSuspended ? 'var(--color-danger-bg)' : 'var(--color-success-bg)'}; color: ${isSuspended ? 'var(--color-danger)' : 'var(--color-success)'};">
                ${p.status || 'Activo'}
              </span>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    container.innerHTML = html;
  } else if (currentTeamTab === 'partidos') {
    const clubMatches = (db.matches || []).filter(m => (m.homeClubId === club.id || m.awayClubId === club.id) && (!currentActiveSeries || m.series === currentActiveSeries));
    const finishedMatches = clubMatches.filter(m => m.status === 'finalizado');
    const upcomingMatches = clubMatches.filter(m => m.status !== 'finalizado');

    let html = `
      <div style="margin-bottom: 2rem;">
        <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; box-shadow: var(--shadow-xs);">
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.2rem;">
              Partidos & Fixture • ${club.name}
            </h4>
            <span style="font-size: 0.82rem; color: var(--color-text-secondary);">
              Categoría: <strong>${currentSeriesObj.name}</strong> • 3 Fechas jugadas, ${upcomingMatches.length} pendientes.
            </span>
          </div>
          <div class="series-pills-scroll">
            ${seriesList.map(s => `
              <button class="series-pill-btn ${s.id === currentActiveSeries ? 'active' : ''}" onclick="window.ligamasterSetSeries('${s.id}')">
                <span>${s.shortName || s.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="view-title-row" style="margin-bottom: 1rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800;">
            Partidos Disputados (3 Fechas Jugadas) • ${currentSeriesObj.name}
          </h4>
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-success); background: var(--color-success-bg); padding: 0.25rem 0.65rem; border-radius: var(--radius-full);">
            ${finishedMatches.length} Partidos Oficiales Sellados
          </span>
        </div>
    `;

    if (finishedMatches.length === 0) {
      html += `
        <div class="empty-state-box" style="padding: 2rem;">
          <span class="empty-state-icon">⚽</span>
          <div class="empty-state-title">Sin Partidos Jugados</div>
          <div class="empty-state-desc">Aún no se registran actas cerradas para este club.</div>
        </div>
      `;
    } else {
      html += '<div class="matches-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; margin-bottom: 2rem;">';
      finishedMatches.forEach(m => {
        const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: 'Local', shortName: 'Local' };
        const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: 'Visita', shortName: 'Visita' };
        const sObj = seriesList.find(s => s.id === m.series) || { shortName: m.series };
        const isWin = (m.homeClubId === club.id && m.homeScore > m.awayScore) || (m.awayClubId === club.id && m.awayScore > m.homeScore);
        const isDraw = m.homeScore === m.awayScore;

        html += `
          <div class="match-card" style="border-left: 4px solid ${isWin ? 'var(--color-success)' : (isDraw ? 'var(--color-warning)' : 'var(--color-danger)')};">
            <div class="match-card-header">
              <span>${m.round || 'Fecha Oficial'} • <strong>${sObj.shortName || sObj.name}</strong></span>
              <span class="match-status-badge finished">FINALIZADO</span>
            </div>
            <div class="match-teams-row">
              <div class="match-team-col">
                <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 36)}</div>
                <div class="match-team-name">${homeClub.name}</div>
              </div>
              <div class="match-score-col">
                <div class="match-score-box">
                  <span>${m.homeScore}</span>
                  <span style="color: var(--color-text-muted);">-</span>
                  <span>${m.awayScore}</span>
                </div>
                <span style="font-size: 0.68rem; font-weight: 800; color: ${isWin ? 'var(--color-success)' : (isDraw ? 'var(--color-warning)' : 'var(--color-danger)')}; margin-top: 0.35rem;">
                  ${isWin ? 'TRIUNFO' : (isDraw ? 'EMPATE' : 'DERROTA')}
                </span>
              </div>
              <div class="match-team-col">
                <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 36)}</div>
                <div class="match-team-name">${awayClub.name}</div>
              </div>
            </div>
            <div class="match-card-footer">
              <span style="font-size: 0.72rem; color: var(--color-text-muted);">${m.venue || 'Estadio Municipal'}</span>
              <button class="btn-outline-coral" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
                Ver Acta
              </button>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    // Próximos Partidos
    html += `
      <div class="view-title-row" style="margin-bottom: 1rem;">
        <h4 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 800;">
          Próximos Encuentros Programados (Fechas 4 a 9)
        </h4>
        <span style="font-size: 0.78rem; color: var(--color-text-muted);">
          ${upcomingMatches.length} Fechas Pendientes
        </span>
      </div>
    `;

    if (upcomingMatches.length === 0) {
      html += `
        <div class="empty-state-box" style="padding: 2rem;">
          <span class="empty-state-icon">📅</span>
          <div class="empty-state-title">Fixture Concluido</div>
          <div class="empty-state-desc">No hay más partidos agendados en esta fase.</div>
        </div>
      `;
    } else {
      html += '<div class="matches-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem;">';
      upcomingMatches.slice(0, 6).forEach(m => {
        const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: 'Local', shortName: 'Local' };
        const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: 'Visita', shortName: 'Visita' };
        const sObj = seriesList.find(s => s.id === m.series) || { shortName: m.series };

        html += `
          <div class="match-card">
            <div class="match-card-header">
              <span>${m.round || 'Fecha Oficial'} • <strong>${sObj.shortName || sObj.name}</strong></span>
              <span class="match-status-badge scheduled">PROGRAMADO</span>
            </div>
            <div class="match-teams-row">
              <div class="match-team-col">
                <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 36)}</div>
                <div class="match-team-name">${homeClub.name}</div>
              </div>
              <div class="match-score-col">
                <div class="match-vs-box">VS</div>
                <span style="font-size: 0.7rem; color: var(--color-primary); font-weight: 800; margin-top: 0.3rem;">${m.date ? (m.date.split('•')[1] || '16:00') : '16:00'}</span>
              </div>
              <div class="match-team-col">
                <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 36)}</div>
                <div class="match-team-name">${awayClub.name}</div>
              </div>
            </div>
            <div class="match-card-footer">
              <span style="font-size: 0.72rem; color: var(--color-text-muted);">${m.venue || 'Estadio Municipal'}</span>
              <button class="btn-outline-coral" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
                Detalle
              </button>
            </div>
          </div>
        `;
      });
      html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
  } else if (currentTeamTab === 'estadisticas') {
    const sStandings = (db.standings && db.standings[currentActiveSeries]) || [];
    const clubEntry = sStandings.find(r => r.clubId === club.id) || {
      pos: '-', pj: 3, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0
    };
    const seriesPlayers = (db.players || []).filter(p => p.clubId === club.id && p.series === currentActiveSeries);
    const topScorers = [...seriesPlayers].sort((a, b) => ((b.stats?.goals ?? b.goals ?? 0) - (a.stats?.goals ?? a.goals ?? 0))).slice(0, 4);

    container.innerHTML = `
      <div>
        <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--color-text-main);">
              Estadísticas Oficiales en ${currentSeriesObj.name}
            </h4>
            <span style="font-size: 0.8rem; color: var(--color-text-secondary);">
              Balance computado tras las primeras 3 fechas de la temporada regular.
            </span>
          </div>
          <div class="series-pills-scroll">
            ${seriesList.map(s => `
              <button class="series-pill-btn ${s.id === currentActiveSeries ? 'active' : ''}" onclick="window.ligamasterSetSeries('${s.id}')">
                <span>${s.shortName || s.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="player-metric-box highlight">
            <div class="player-metric-label">Puntos Oficiales</div>
            <div class="player-metric-value">${clubEntry.pts} PTS</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Posición en Serie</div>
            <div class="player-metric-value">${clubEntry.pos}º Lugar</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Partidos Jugados</div>
            <div class="player-metric-value">${clubEntry.pj} PJ</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Victorias (PG)</div>
            <div class="player-metric-value" style="color: var(--color-success);">${clubEntry.pg}</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Goles a Favor</div>
            <div class="player-metric-value">${clubEntry.gf}</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Goles en Contra</div>
            <div class="player-metric-value">${clubEntry.gc}</div>
          </div>
          <div class="player-metric-box">
            <div class="player-metric-label">Diferencia de Gol</div>
            <div class="player-metric-value" style="color: ${clubEntry.dg >= 0 ? 'var(--color-success)' : 'var(--color-danger)'};">
              ${clubEntry.dg >= 0 ? '+' : ''}${clubEntry.dg}
            </div>
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; margin-bottom: 1rem;">
            Máximos Artilleros del Club (${currentSeriesObj.name})
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
            ${topScorers.map(p => `
              <div style="display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer;" onclick="window.ligamasterSelectPlayer('${p.id}')">
                <div style="width: 40px; height: 40px; border-radius: var(--radius-xs); overflow: hidden; background: var(--color-bg-subtle);">
                  <img src="${p.photo || p.avatar || FALLBACK_AVATAR}" style="width: 100%; height: 100%; object-fit: cover;" onerror="window.ligamasterImageFallback(this, 'avatar')">
                </div>
                <div style="flex: 1;">
                  <strong style="display: block; font-size: 0.88rem; color: var(--color-text-main);">${p.name}</strong>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">${p.specificPosition || p.position} • #${p.dorsal || p.number || '-'}</span>
                </div>
                <div style="text-align: right;">
                  <span style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 900; color: var(--color-primary);">${p.stats?.goals ?? p.goals ?? 0}</span>
                  <span style="display: block; font-size: 0.65rem; color: var(--color-text-muted); text-transform: uppercase;">Goles</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    // Resumen: Estatus Multi-Series y Reseña Institucional
    let seriesCardsHtml = '';
    seriesList.forEach(s => {
      const sStandings = (db.standings && db.standings[s.id]) || [];
      const clubEntry = sStandings.find(r => r.clubId === club.id);
      const sPlayers = (db.players || []).filter(p => p.clubId === club.id && p.series === s.id);
      const isCurrent = s.id === currentActiveSeries;

      seriesCardsHtml += `
        <div class="club-series-card ${isCurrent ? 'is-active-series' : ''}">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: var(--color-text-main);">
                ${s.name}
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: var(--radius-full); background: ${isCurrent ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)'}; color: ${isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)'};">
                ${sPlayers.length} Jugadores
              </span>
            </div>

            ${clubEntry ? `
              <div style="display: flex; align-items: baseline; gap: 0.75rem; margin: 0.75rem 0;">
                <span style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; color: ${clubEntry.pos === 1 ? 'var(--color-gold)' : (clubEntry.pos <= 3 ? 'var(--color-primary)' : 'var(--color-text-main)')};">
                  ${clubEntry.pos}º
                </span>
                <span style="font-size: 0.82rem; color: var(--color-text-secondary); font-weight: 600;">
                  Lugar de la tabla (${clubEntry.pts} pts)
                </span>
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
                <strong>${clubEntry.pj} PJ:</strong> ${clubEntry.pg} PG • ${clubEntry.pe} PE • ${clubEntry.pp} PP<br>
                <strong>Goles:</strong> ${clubEntry.gf} GF / ${clubEntry.gc} GC (${clubEntry.dg >= 0 ? '+' : ''}${clubEntry.dg} DG)
              </div>
              <div style="display: flex; align-items: center; gap: 0.35rem; margin-bottom: 1rem;">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); margin-right: 0.25rem;">Racha:</span>
                ${(clubEntry.form || ['V', 'V', 'V']).map(f => `<span class="form-pill ${f === 'V' ? 'win' : (f === 'E' ? 'draw' : 'loss')}">${f}</span>`).join('')}
              </div>
            ` : `
              <div style="padding: 1rem 0; font-size: 0.8rem; color: var(--color-text-muted);">
                Serie formativa / sin tabla activa.
              </div>
            `}
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button class="btn-outline-coral" style="flex: 1; font-size: 0.75rem; padding: 0.4rem 0.5rem;" onclick="window.ligamasterViewClubSeriesRoster('${club.id}', '${s.id}')">
              Ver Plantel (${sPlayers.length})
            </button>
            <button class="btn-outline-coral" style="font-size: 0.75rem; padding: 0.4rem 0.6rem;" onclick="window.ligamasterViewSeriesStandings('${s.id}')" title="Ver tabla de esta serie">
              Tabla
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div>
        <div style="margin-bottom: 1rem;">
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.25rem;">
            Rendimiento por Series • Campeonato Oficial 2026/27 (3 Fechas Jugadas)
          </h3>
          <p style="font-size: 0.82rem; color: var(--color-text-secondary);">
            Resumen comparativo de la campaña del club en cada una de sus series federadas.
          </p>
        </div>

        <!-- Grilla de las 4 Series -->
        <div class="club-series-grid">
          ${seriesCardsHtml}
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem; box-shadow: var(--shadow-xs);">
            <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Reseña Histórica & Palmarés</h4>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6;">${club.regionalRecord || club.description || 'Institución afiliada formalmente a la Asociación.'}</p>
          </div>
          <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem; box-shadow: var(--shadow-xs);">
            <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Ficha Institucional</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem; color: var(--color-text-secondary);">
              <li><strong>Estadio:</strong> ${club.stadium || 'Estadio Municipal'}</li>
              <li><strong>Presidente:</strong> ${club.president || 'Directorio Oficial'}</li>
              <li><strong>Fundación:</strong> ${club.exactFoundationDate || club.founded || 'Oficial'}</li>
              <li><strong>Estado ANFA:</strong> <span style="color: var(--color-success); font-weight: 800;">Vigente / Federado</span></li>
            </ul>
          </div>
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
 * 7. RENDERIZADO: JUGADOR (PADRÓN GENERAL Y FICHA PROFESIONAL)
 * ==========================================================================
 */
function renderPlayerView() {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const clubSelect = document.getElementById('player-select-club');
  const playerSelect = document.getElementById('player-select-individual');
  const searchInput = document.getElementById('player-search-input');
  const profileCard = document.getElementById('player-profile-card');
  const directoryContainer = document.getElementById('player-roster-directory-container');

  const seriesList = db.seriesList || [];

  // 1. Llenar select de clubes (con opción Padrón General)
  if (clubSelect) {
    let clubOptionsHtml = '<option value="all">Todos los Clubes (Padrón General)</option>';
    (db.clubs || []).forEach(c => {
      clubOptionsHtml += `<option value="${c.id}">${c.name}</option>`;
    });
    clubSelect.innerHTML = clubOptionsHtml;
    clubSelect.value = currentPlayerFilterClubId || 'all';
  }

  // 2. Sincronizar input de búsqueda
  if (searchInput && searchInput.value !== currentPlayerSearchQuery) {
    searchInput.value = currentPlayerSearchQuery;
  }

  // 3. Filtrar padrón de futbolistas
  let filteredPlayers = (db.players || []).slice();

  // Filtro por Club
  if (currentPlayerFilterClubId && currentPlayerFilterClubId !== 'all') {
    filteredPlayers = filteredPlayers.filter(p => p.clubId === currentPlayerFilterClubId);
  }

  // Filtro por Serie (desde el selector global en la cabecera si no es 'all')
  if (currentActiveSeries && currentActiveSeries !== 'all') {
    filteredPlayers = filteredPlayers.filter(p => p.series === currentActiveSeries);
  }

  // Filtro por Búsqueda de Texto (nombre, dorsal, posición o club)
  const q = (currentPlayerSearchQuery || '').trim().toLowerCase();
  if (q) {
    filteredPlayers = filteredPlayers.filter(p => {
      const nameMatch = (p.name || '').toLowerCase().includes(q);
      const dorsalMatch = String(p.dorsal ?? p.number ?? '').includes(q);
      const posMatch = (p.position || '').toLowerCase().includes(q) ||
                       (p.specificPosition || '').toLowerCase().includes(q);
      const clubObj = (db.clubs || []).find(c => c.id === p.clubId);
      const clubMatch = clubObj ? clubObj.name.toLowerCase().includes(q) : false;
      return nameMatch || dorsalMatch || posMatch || clubMatch;
    });
  }

  // 4. Llenar select de Ficha Individual
  if (playerSelect) {
    let pOptionsHtml = `<option value="">-- Ver Todos los Futbolistas (Padrón: ${filteredPlayers.length}) --</option>`;
    filteredPlayers.forEach(p => {
      const dorsalNum = p.dorsal ?? p.number ?? '-';
      const cObj = (db.clubs || []).find(c => c.id === p.clubId);
      const sObj = seriesList.find(s => s.id === p.series);
      const seriesLabel = sObj ? (sObj.shortName || sObj.name) : (p.series || '');
      pOptionsHtml += `<option value="${p.id}">#${dorsalNum} - ${p.name} (${cObj ? cObj.shortName || cObj.name : ''} • ${seriesLabel})</option>`;
    });
    playerSelect.innerHTML = pOptionsHtml;

    if (currentActivePlayerId && !filteredPlayers.some(p => p.id === currentActivePlayerId)) {
      currentActivePlayerId = null;
    }
    playerSelect.value = currentActivePlayerId || '';
  }

  // 5. Renderizar Ficha Individual (solo si hay jugador activo seleccionado)
  const activePlayer = currentActivePlayerId ? (db.players || []).find(p => p.id === currentActivePlayerId) : null;

  if (activePlayer && profileCard) {
    profileCard.style.display = 'flex';
    const club = (db.clubs || []).find(c => c.id === activePlayer.clubId) || { name: "Club Oficial" };
    const seriesObj = seriesList.find(s => s.id === activePlayer.series);

    const pImg = document.getElementById('player-profile-img');
    if (pImg) {
      pImg.onerror = () => { pImg.src = FALLBACK_AVATAR; };
      pImg.src = activePlayer.photo || activePlayer.avatar || FALLBACK_AVATAR;
    }
    const dorsalEl = document.getElementById('player-profile-dorsal');
    if (dorsalEl) dorsalEl.textContent = `#${activePlayer.dorsal ?? activePlayer.number ?? '-'}`;
    
    const nameEl = document.getElementById('player-profile-name');
    if (nameEl) nameEl.textContent = activePlayer.name;

    const crestEl = document.getElementById('player-profile-crest');
    if (crestEl) crestEl.innerHTML = getClubBadgeSvg(club.badgeId || activePlayer.clubId, 26);

    const clubEl = document.getElementById('player-profile-club');
    if (clubEl) clubEl.textContent = club.name;

    const seriesEl = document.getElementById('player-profile-series');
    if (seriesEl) seriesEl.textContent = seriesObj ? (seriesObj.shortName || seriesObj.name) : (activePlayer.series || '1ª Adulta');

    const posEl = document.getElementById('player-profile-pos');
    if (posEl) posEl.textContent = activePlayer.specificPosition ? `${activePlayer.position} (${activePlayer.specificPosition})` : (activePlayer.position || 'Jugador');

    const statusEl = document.getElementById('player-profile-status');
    if (statusEl) {
      const isSuspended = activePlayer.status === 'Suspendido';
      statusEl.textContent = isSuspended ? 'SUSPENDIDO ANFA' : 'CARNET ANFA VIGENTE';
      statusEl.style.backgroundColor = isSuspended ? 'var(--color-danger-bg)' : 'var(--color-success-bg)';
      statusEl.style.color = isSuspended ? 'var(--color-danger)' : 'var(--color-success)';
    }

    const pStats = activePlayer.stats || {};
    document.getElementById('player-metric-goals').textContent = pStats.goals ?? activePlayer.goals ?? 0;
    document.getElementById('player-metric-assists').textContent = pStats.assists ?? activePlayer.assists ?? 0;
    document.getElementById('player-metric-matches').textContent = pStats.matches ?? activePlayer.matchesPlayed ?? 3;
    document.getElementById('player-metric-starters').textContent = pStats.matches ?? activePlayer.matchesPlayed ?? 3;
    document.getElementById('player-metric-minutes').textContent = (pStats.matches ?? 3) * 90;
    document.getElementById('player-metric-yellows').textContent = pStats.yellowCards ?? activePlayer.yellowCards ?? 0;
    document.getElementById('player-metric-reds').textContent = pStats.redCards ?? activePlayer.redCards ?? 0;
  } else if (profileCard) {
    profileCard.style.display = 'none';
  }

  // 6. Renderizar Directorio / Padrón General de Futbolistas
  if (directoryContainer) {
    let dirHtml = '';
    const isFiltered = (currentPlayerFilterClubId !== 'all') || (currentActiveSeries && currentActiveSeries !== 'all') || Boolean(q) || Boolean(currentActivePlayerId);
    
    dirHtml += `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
          <h3 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; color: var(--color-text-main); margin: 0;">
            Padrón Oficial de Futbolistas
          </h3>
          <span style="background: var(--color-bg-subtle); color: var(--color-text-secondary); font-size: 0.78rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 999px; border: 1px solid var(--color-border);">
            ${filteredPlayers.length} jugadores encontrados
          </span>
          ${isFiltered ? `
            <span style="font-size: 0.78rem; color: var(--color-primary); font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
              • Filtros aplicados
            </span>
          ` : ''}
        </div>
        ${isFiltered ? `
          <button class="btn-outline-coral" onclick="window.ligamasterClearPlayerSelection()" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
            ✕ Anular Filtros (Ver Todos)
          </button>
        ` : ''}
      </div>
    `;

    if (filteredPlayers.length === 0) {
      dirHtml += `
        <div class="empty-state-box" style="padding: 3rem 1.5rem; text-align: center; background: #fff; border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.75rem;">🔍</span>
          <div style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 0.35rem;">
            No se encontraron futbolistas
          </div>
          <div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
            No existen registros con los criterios de búsqueda o filtros seleccionados en esta liga.
          </div>
          <button class="btn-primary" onclick="window.ligamasterClearPlayerSelection()" style="padding: 0.5rem 1.25rem; font-size: 0.82rem;">
            Ver Todos los Futbolistas
          </button>
        </div>
      `;
    } else {
      const sliceLimit = playerRosterLimit || 48;
      const displayList = filteredPlayers.slice(0, sliceLimit);

      dirHtml += `<div class="roster-grid">`;
      displayList.forEach(p => {
        const clubObj = (db.clubs || []).find(c => c.id === p.clubId) || { name: 'Club Oficial' };
        const sObj = seriesList.find(s => s.id === p.series);
        const sName = sObj ? (sObj.shortName || sObj.name) : (p.series || 'Serie Oficial');
        const dorsalNum = p.dorsal ?? p.number ?? '-';
        const isSelected = p.id === currentActivePlayerId;
        const pStats = p.stats || {};
        const goals = pStats.goals ?? p.goals ?? 0;
        const assists = pStats.assists ?? p.assists ?? 0;
        const matches = pStats.matches ?? p.matchesPlayed ?? 3;
        const isSuspended = p.status === 'Suspendido';

        dirHtml += `
          <div class="player-roster-card ${isSelected ? 'active-selected-card' : ''}" 
               onclick="window.ligamasterSelectPlayer('${p.id}')"
               style="${isSelected ? 'border-color: var(--color-primary); box-shadow: 0 0 0 2px rgba(224, 76, 56, 0.25);' : ''} flex-direction: column; align-items: stretch; gap: 0.75rem; padding: 1rem;">
            
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div class="roster-avatar-box">
                <img src="${p.photo || p.avatar || FALLBACK_AVATAR}" alt="${p.name}" class="roster-avatar-img" onerror="window.ligamasterImageFallback(this, 'avatar')">
                <span class="roster-number-badge">#${dorsalNum}</span>
              </div>
              <div style="flex: 1; min-width: 0;">
                <h4 style="font-family: var(--font-display); font-size: 0.92rem; font-weight: 800; color: var(--color-text-main); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${p.name}">
                  ${p.name}
                </h4>
                <div style="display: flex; align-items: center; gap: 0.35rem; margin-top: 0.2rem; font-size: 0.75rem; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  <span style="display: inline-flex; align-items: center; width: 14px; height: 14px;">${getClubBadgeSvg(clubObj.badgeId || p.clubId, 14)}</span>
                  <span style="font-weight: 600;">${clubObj.shortName || clubObj.name}</span>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              <span style="background: var(--color-primary-bg, #fff1f0); color: var(--color-primary); font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;">
                ${sName}
              </span>
              <span style="background: var(--color-bg-subtle); color: var(--color-text-secondary); font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 4px;">
                ${p.specificPosition || p.position || 'Jugador'}
              </span>
              <span style="font-size: 0.68rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; ${isSuspended ? 'background: var(--color-danger-bg); color: var(--color-danger);' : 'background: var(--color-success-bg); color: var(--color-success);'}">
                ${isSuspended ? 'SUSPENDIDO' : 'HABILITADO'}
              </span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 0.5rem; font-size: 0.72rem; color: var(--color-text-secondary);">
              <div>⚽ <strong style="color: var(--color-text-main);">${goals}</strong> goles</div>
              <div>🎯 <strong style="color: var(--color-text-main);">${assists}</strong> asist.</div>
              <div>👕 <strong style="color: var(--color-text-main);">${matches}</strong> PJ</div>
              <span style="color: var(--color-primary); font-weight: 800; font-size: 0.72rem;">Ficha →</span>
            </div>

          </div>
        `;
      });
      dirHtml += `</div>`;

      // Botón "Cargar Más" si hay más futbolistas que el límite actual
      if (filteredPlayers.length > sliceLimit) {
        dirHtml += `
          <div style="text-align: center; margin-top: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
            <button class="btn-primary" onclick="window.ligamasterLoadMorePlayers()" style="padding: 0.6rem 1.5rem; font-size: 0.85rem; font-weight: 700;">
              Cargar más futbolistas (+48)
            </button>
            <button class="btn-outline-coral" onclick="window.ligamasterShowAllPlayers()" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
              Mostrar todos (${filteredPlayers.length})
            </button>
          </div>
        `;
      }
    }

    directoryContainer.innerHTML = dirHtml;
  }
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
  const card = document.getElementById('player-profile-card');
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

window.ligamasterClearPlayerSelection = () => {
  currentPlayerFilterClubId = 'all';
  currentPlayerSearchQuery = '';
  currentActivePlayerId = null;
  playerRosterLimit = 48;
  const searchInput = document.getElementById('player-search-input');
  if (searchInput) searchInput.value = '';
  const clubSelect = document.getElementById('player-select-club');
  if (clubSelect) clubSelect.value = 'all';
  const playerSelect = document.getElementById('player-select-individual');
  if (playerSelect) playerSelect.value = '';
  renderPlayerView();
  showToast('Filtro de jugadores anulado. Mostrando padrón completo.', 'info');
};

window.ligamasterLoadMorePlayers = () => {
  playerRosterLimit = (playerRosterLimit || 48) + 48;
  renderPlayerView();
};

window.ligamasterShowAllPlayers = () => {
  playerRosterLimit = 99999;
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
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="padding: 3rem 1rem;">
          <div class="empty-state-box">
            <span class="empty-state-icon">📈</span>
            <div class="empty-state-title">Sin Estadísticas Registradas</div>
            <div class="empty-state-desc">Actualmente no hay datos individuales disponibles para esta categoría en la liga activa.</div>
          </div>
        </td>
      </tr>
    `;
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
            <img src="${p.avatar}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 38px; height: 38px; border-radius: var(--radius-xs); object-fit: cover;">
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
    if (currentActiveSeries === 'all' || p.series === currentActiveSeries) {
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

  if (news.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">📰</span>
          <div class="empty-state-title">Sin Noticias Publicadas</div>
          <div class="empty-state-desc">No hay comunicados oficiales o notas de prensa activas en este momento.</div>
        </div>
      </div>
    `;
    return;
  }

  let html = '';
  news.forEach(n => {
    html += `
      <article class="news-card">
        <div class="news-img-box">
          <img src="${n.image}" alt="${n.title}" onerror="window.ligamasterImageFallback(this, 'news')" class="news-img">
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
            <img src="${p.photo || p.avatar || FALLBACK_AVATAR}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 22px; height: 22px; border-radius: var(--radius-xs); object-fit: cover;">
            <strong>${p.name} (#${p.dorsal || p.number || '-'})</strong>
            <small>${p.specificPosition || p.position}</small>
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
  const playerSeriesSelect = document.getElementById('player-select-series');

  window.ligamasterSetSeries = (val) => {
    if (!val) return;
    currentActiveSeries = val;
    const db = getDb();
    updateSeriesSelectDropdowns(db.seriesList || []);
    renderHomeView();
    renderLeagueView();
    renderStandingsView();
    renderCalendarView();
    renderResultsView();
    renderTeamView();
    renderPlayerView();
    renderStatsView();
    window.dispatchEvent(new CustomEvent('ligamaster:series-changed', { detail: val }));
  };

  globalSelect?.addEventListener('change', (e) => window.ligamasterSetSeries(e.target.value));
  standingsSelect?.addEventListener('change', (e) => window.ligamasterSetSeries(e.target.value));

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

  // Selectores y Filtros de la vista de jugador
  document.getElementById('player-select-club')?.addEventListener('change', (e) => {
    currentPlayerFilterClubId = e.target.value;
    currentActivePlayerId = null;
    renderPlayerView();
  });

  document.getElementById('player-search-input')?.addEventListener('input', (e) => {
    currentPlayerSearchQuery = e.target.value;
    currentActivePlayerId = null;
    renderPlayerView();
  });

  document.getElementById('player-select-individual')?.addEventListener('change', (e) => {
    currentActivePlayerId = e.target.value || null;
    renderPlayerView();
    if (currentActivePlayerId) {
      document.getElementById('player-profile-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  document.getElementById('btn-clear-player-filter')?.addEventListener('click', () => {
    window.ligamasterClearPlayerSelection();
  });
}

window.ligamasterViewClubSeriesRoster = (clubId, seriesId) => {
  currentActiveClubId = clubId;
  currentActiveSeries = seriesId;
  currentTeamTab = 'plantel';
  document.querySelectorAll('.team-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-team-tab') === 'plantel');
  });
  navigateTo('team-view');
  renderTeamView();
};

window.ligamasterViewSeriesStandings = (seriesId) => {
  window.ligamasterSetSeries(seriesId);
  navigateTo('standings-view');
};

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

/**
 * ==========================================================================
 * DOCUMENTOS INSTITUCIONALES Y ENLACES FOOTER
 * ==========================================================================
 */
function setupFooterLinks() {
  const docs = {
    reglamento: {
      title: 'Reglamento Oficial de Competiciones ANFA 2026',
      badge: '📜 BASES OFICIALES',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Asociación de Fútbol de Arauco • Afiliada a ANFA Biobío</strong>
            <span>Estatutos vigentes aprobados en Asamblea General de Clubes 2026.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">1. Series en Competencia</h4>
            <p>El campeonato oficial comprende las series de <strong>Honor (Primera)</strong>, <strong>Senior (35+ Años)</strong>, <strong>Segunda Adulta</strong>, <strong>Tercera Adulta</strong>, <strong>Super Senior (45+)</strong> y <strong>Juvenil (Sub-17)</strong>. Es obligación de los clubes presentar nómina en al menos 4 series federadas.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">2. Control de Fichas y Cédula de Identidad</h4>
            <p>Todo jugador debe presentar su Cédula de Identidad física vigente previo al inicio del encuentro ante la mesa de turno. Jugador sin carnet físico o digital validado en sistema no puede ingresar al terreno de juego.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">3. Régimen Disciplinario</h4>
            <p>Acumulación de 3 tarjetas amarillas acarrea automáticamente 1 fecha de suspensión. La tarjeta roja directa implica suspensión preventiva inmediata a la espera del fallo de los días martes del Tribunal de Penas.</p>
          </div>
        </div>
      `
    },
    arbitros: {
      title: 'Colegio de Árbitros Profesionales & Amateur (CAPA)',
      badge: '⚖️ CUERPO REFERIL',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Ternas y Designaciones Oficiales 2026</strong>
            <span>Garantía de imparcialidad, cronometraje oficial y fe pública en el campo deportivo.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Designación de Árbitros</h4>
            <p>Las ternas arbitrales son sorteadas de forma autónoma cada jueves a las 20:00 hrs en la sesión de mesa ejecutiva, garantizando que ningún árbitro dirija al mismo club más de dos fechas consecutivas.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Entrega de Informes</h4>
            <p>Los jueces tienen un plazo fatal de 24 horas posteriores al pitazo final para entregar la planilla física y ratificar los incidentes en el portal digital de la Asociación.</p>
          </div>
        </div>
      `
    },
    actas: {
      title: 'Planillas Oficiales de Cancha y Turnos',
      badge: '📋 PROTOCOLO DE PARTIDO',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Planilla Digital Unificada LigaMaster</strong>
            <span>Registro digitalizado de anotaciones, tarjetas, minutos de juego y sustituciones.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Firma de Capitanes</h4>
            <p>Al término de cada compromiso, los capitanes de ambos clubes deben firmar el acta oficial junto al árbitro central. La firma certifica el resultado final y los goles registrados.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Observaciones y Apelaciones</h4>
            <p>Cualquier reclamo por suplantación o irregularidad técnica debe ser estampada en el dorso de la planilla antes de los 15 minutos de finalizado el cotejo.</p>
          </div>
        </div>
      `
    },
    contacto: {
      title: 'Contacto Institucional • Mesa de Ayuda',
      badge: '📞 DIRECTORIO ANFA',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Atención a Dirigentes y Medios de Comunicación</strong>
            <span>Sede Social: Esmeralda 450, Arauco, Región del Biobío.</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-muted); font-weight: 800; display: block;">Correo Electrónico</span>
              <strong style="color: var(--color-primary); font-size: 0.9rem;">contacto@ligamaster.cl</strong>
            </div>
            <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-muted); font-weight: 800; display: block;">Turnos y Canchas</span>
              <strong style="color: var(--color-text-main); font-size: 0.9rem;">+56 9 8452 1190</strong>
            </div>
          </div>
          <p>Horario de atención presencial para trámites de pases y habilitaciones: Martes y Jueves de 19:30 a 22:00 hrs.</p>
        </div>
      `
    },
    terminos: {
      title: 'Términos, Condiciones y Privacidad Deportiva',
      badge: '🔒 PROTECCIÓN DE DATOS',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Uso de Datos en LigaMaster</strong>
            <span>Conformidad con la Ley 19.628 sobre protección de la vida privada en Chile.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Padrón Deportivo y Estadísticas Públicas</h4>
            <p>Los nombres de futbolistas, números de camiseta, fotografías de campo y cómputo de goles forman parte del padrón de difusión deportiva de interés comunitario.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Derechos de Imagen</h4>
            <p>Las transmisiones fotográficas y audiovisuales en recintos deportivos municipales se rigen bajo los convenios comunitarios de la Asociación y sus medios asociados.</p>
          </div>
        </div>
      `
    },
    postular: {
      title: 'Postula tu Asociación a LigaMaster Chile',
      badge: '🚀 EXPANSIÓN NACIONAL',
      html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Lleva tu liga al estándar profesional de LaLiga</strong>
            <span>Tablas en vivo, padrón de jugadores, control financiero y diseño broadcast.</span>
          </div>
          <p>Si eres presidente de una Asociación ANFA o liga independiente en cualquier región de Chile, puedes habilitar tu propia plataforma deportiva con tu escudo, tus clubes y tus canchas.</p>
          <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
            <p style="margin-bottom: 0.5rem; font-weight: 700; color: var(--color-text-main);">Escríbenos directamente para solicitar demostración personalizada:</p>
            <a href="mailto:alianzas@ligamaster.cl" class="btn-primary-coral" style="display: inline-flex; text-decoration: none; padding: 0.5rem 1.25rem; font-size: 0.85rem; margin-top: 0.25rem;">
              Solicitar Demostración (alianzas@ligamaster.cl)
            </a>
          </div>
        </div>
      `
    }
  };

  const bindBtn = (id, key) => {
    document.getElementById(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      const doc = docs[key];
      if (!doc) return;
      const modal = document.getElementById('modal-institutional-info');
      const titleEl = document.getElementById('institutional-modal-title');
      const bodyEl = document.getElementById('institutional-modal-body');
      if (modal && titleEl && bodyEl) {
        titleEl.innerHTML = `<span style="font-size: 0.72rem; color: var(--color-primary); display: block; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 0.15rem;">${doc.badge}</span>${doc.title}`;
        bodyEl.innerHTML = doc.html;
        modal.classList.add('active');
      }
    });
  };

  bindBtn('footer-btn-reglamento', 'reglamento');
  bindBtn('footer-btn-arbitros', 'arbitros');
  bindBtn('footer-btn-actas', 'actas');
  bindBtn('footer-btn-contacto', 'contacto');
  bindBtn('footer-btn-terminos', 'terminos');
  bindBtn('footer-btn-postular', 'postular');
}
