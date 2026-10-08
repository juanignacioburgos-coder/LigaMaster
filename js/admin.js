/**
 * LIGAMASTER - PANEL DE GESTIÓN Y ADMINISTRACIÓN INSTITUCIONAL (BACKOFFICE INSTITUCIONAL)
 * Módulo de Control de Competiciones, Turnos, Padrón de Jugadores, Tribunal y Tesorería
 */

import {
  getDb,
  saveDb,
  resetDb,
  getActiveLeagueId,
  setActiveLeagueId,
  getLeagueById,
  getRegionsAndLeagues,
  getLeagueSeries,
  addAuditLogEntry,
  getAuditLog
} from './data.js';

import { getClubBadgeSvg } from './badges.js';
import {
  getCurrentRole,
  getCurrentUser,
  logout,
  login,
  ROLES,
  isAdmin,
  isReferee,
  getAdminPin,
  getRefereePin,
  verifyAdminPin,
  setCustomAdminPin,
  setCustomRefereePin
} from './auth.js';
import { showToast } from './toast.js';
import { resolveBrandLogo } from './sponsors-data.js';

// Estado Interno del Panel Administrativo
let currentAdminTab = 'dashboard'; // 'dashboard' | 'matches' | 'clubs' | 'sanctions' | 'treasury' | 'settings'
let currentAdminSeries = 'honor';
let currentAdminClubId = null;

/**
 * Inicializa el Módulo de Administración
 */
export function initAdmin() {
  // Escuchar cambios de autenticación para re-renderizar
  window.addEventListener('ligamaster:auth-changed', () => {
    if (document.getElementById('admin-view')?.classList.contains('active')) {
      renderAdminView();
    }
  });

  // Escuchar cambios de liga
  window.addEventListener('ligamaster:league-changed', () => {
    if (document.getElementById('admin-view')?.classList.contains('active')) {
      currentAdminClubId = null;
      renderAdminView();
    }
  });

  setupAdminModals();
}

/**
 * Renderiza la Vista del Panel de Administración
 */
export function renderAdminView() {
  const container = document.getElementById('admin-view');
  if (!container) return;

  const role = getCurrentRole();
  const activeId = getActiveLeagueId();
  const league = getLeagueById(activeId);
  const db = getDb(activeId);

  // Si no está autenticado, mostrar la compuerta institucional de acceso
  if (role === ROLES.PUBLIC) {
    container.innerHTML = `
      <div class="platform-container">
        <div class="admin-gate-card">
          <div class="admin-gate-icon">🔐</div>
          <h2>Portal de Gestión Institucional</h2>
          <p>
            Acceso restringido para la Directiva de <strong>${league.name}</strong>, Presidentes de Clubes y Turnos Oficiales de Cancha.
          </p>

          <form id="admin-gate-login-form">
            <div style="margin-bottom: 1rem; text-align: left;">
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--color-text-main);">Dirigente o Usuario</label>
              <input type="text" id="gate-input-user" class="series-select" style="width: 100%; padding: 0.75rem 1rem;" placeholder="ej: Claudio Pampaloni (Presidente de la Asociación)" required>
            </div>
            <div style="margin-bottom: 1.25rem; text-align: left;">
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--color-text-main);">PIN de Seguridad</label>
              <input type="password" id="gate-input-pin" class="series-select" style="width: 100%; padding: 0.75rem 1rem;" placeholder="••••" maxlength="6" required autofocus>
              <small style="display: block; margin-top: 0.4rem; font-size: 0.75rem; color: var(--color-text-muted);">
                Demostración: Directiva General = <code>9999</code> • Turno de Cancha = <code>1234</code>
              </small>
              <div id="gate-error-msg" style="display: none; color: var(--color-primary); font-size: 0.8rem; font-weight: 700; margin-top: 0.5rem;"></div>
            </div>
            <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 0.95rem;">
              Ingresar al Panel de Control
            </button>
          </form>

          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-muted);">
            ¿Necesitas habilitar tu asociación? Comunícate con soporte institucional en <strong>contacto@ligamaster.cl</strong>
          </div>
        </div>
      </div>
    `;

    // Listener del form de acceso
    document.getElementById('admin-gate-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('gate-input-user')?.value || '';
      const pin = document.getElementById('gate-input-pin')?.value || '';
      const errorEl = document.getElementById('gate-error-msg');

      const res = login(pin, user);
      if (res.success) {
        renderAdminView();
      } else {
        if (errorEl) {
          errorEl.textContent = res.message;
          errorEl.style.display = 'block';
        }
      }
    });

    return;
  }

  // Usuario autenticado (Directiva o Turno)
  const isDirectiva = role === ROLES.ADMIN;
  const roleTitle = isDirectiva ? 'Directiva General' : 'Turno de Cancha';
  const roleEmoji = isDirectiva ? '🏛️' : '⏱️';
  const regions = getRegionsAndLeagues();

  // Si es Turno de Cancha, su único módulo habilitado es Matches (Planillas y Marcadores)
  if (!isDirectiva) {
    currentAdminTab = 'matches';
  }

  // Asegurar club activo inicial
  if (!currentAdminClubId && db.clubs && db.clubs.length > 0) {
    currentAdminClubId = db.clubs[0].id;
  }

  let html = `
    <div class="platform-container">
      
      <!-- Hero Superior del Panel Administrativo -->
      <div class="admin-hero-card">
        <div class="admin-hero-left">
          <div class="admin-hero-crest">
            ${getClubBadgeSvg(league.badgeId || 'asociacion-arauco', 52)}
          </div>
          <div class="admin-hero-info">
            <h2>Panel de Gestión: ${league.name}</h2>
            <div class="admin-hero-meta">
              <span class="admin-role-badge">${roleEmoji} ${roleTitle}</span>
              <span>Usuario: <strong>${getCurrentUser()}</strong></span>
              <span>•</span>
              <span>${league.commune}</span>
              ${league.isDemo ? '<span class="admin-badge admin-badge-warning">Modo Demostración</span>' : '<span class="admin-badge admin-badge-success">Oficial Producción</span>'}
            </div>
          </div>
        </div>

        <div class="admin-hero-actions">
          <!-- Selector rápido de liga para directivos -->
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Liga:</label>
            <select id="admin-quick-league-select" class="series-select" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
  `;

  regions.forEach(r => {
    html += `<optgroup label="${r.regionName}">`;
    r.leagues.forEach(l => {
      html += `<option value="${l.id}" ${l.id === activeId ? 'selected' : ''}>${l.name} (${l.isDemo ? 'Demo' : 'Oficial'})</option>`;
    });
    html += `</optgroup>`;
  });

  html += `
            </select>
          </div>

          <button class="btn-admin-action" id="btn-admin-view-public" title="Ver sitio público">
            👁️ Ver Web Pública
          </button>
          <button class="btn-admin-action danger" id="btn-admin-logout" title="Cerrar sesión administrativa">
            ✕ Salir
          </button>
        </div>
      </div>

      <!-- Barra de Navegación del Panel (Tabs protegidos por RBAC) -->
      <div class="admin-subnav-bar">
        ${isDirectiva ? `
          <button class="admin-subnav-btn ${currentAdminTab === 'dashboard' ? 'active' : ''}" data-admin-tab="dashboard">
            📊 Resumen
          </button>
        ` : ''}
        <button class="admin-subnav-btn ${currentAdminTab === 'matches' ? 'active' : ''}" data-admin-tab="matches">
          ⚽ Partidos y Marcadores ${!isDirectiva ? '(Planilla Oficial)' : ''}
        </button>
        ${isDirectiva ? `
          <button class="admin-subnav-btn ${currentAdminTab === 'clubs' ? 'active' : ''}" data-admin-tab="clubs">
            🛡️ Clubes y Padrón
          </button>
          <button class="admin-subnav-btn ${currentAdminTab === 'sanctions' ? 'active' : ''}" data-admin-tab="sanctions">
            ⚖️ Tribunal de Penas
          </button>
          <button class="admin-subnav-btn ${currentAdminTab === 'treasury' ? 'active' : ''}" data-admin-tab="treasury">
            💰 Tesorería y Caja
          </button>
          <button class="admin-subnav-btn ${currentAdminTab === 'settings' ? 'active' : ''}" data-admin-tab="settings">
            ⚙️ Configuración y Seguridad
          </button>
        ` : `
          <div style="margin-left: auto; display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: #f59e0b; padding: 0.35rem 0.65rem; background: rgba(245, 158, 11, 0.1); border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.2);">
            <span>🔒</span>
            <span>Turno Arbitral: Acceso exclusivo a planillas y marcadores</span>
          </div>
        `}
      </div>

      <!-- Contenedor del Módulo Activo -->
      <div id="admin-tab-container">
        <!-- Render dinámico según currentAdminTab -->
      </div>

    </div>
  `;

  container.innerHTML = html;

  // Listeners de la barra superior
  document.getElementById('admin-quick-league-select')?.addEventListener('change', (e) => {
    setActiveLeagueId(e.target.value);
  });

  document.getElementById('btn-admin-view-public')?.addEventListener('click', () => {
    if (window.ligamasterNavigate) window.ligamasterNavigate('home-view');
  });

  document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
    if (confirm('¿Deseas cerrar la sesión administrativa?')) {
      logout();
      if (window.ligamasterNavigate) window.ligamasterNavigate('home-view');
    }
  });

  // Listeners de las pestañas
  container.querySelectorAll('.admin-subnav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.admin-subnav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAdminTab = btn.getAttribute('data-admin-tab');
      renderAdminActiveTab(db, league);
    });
  });

  // Renderizar la pestaña activa inicial
  renderAdminActiveTab(db, league);
}

/**
 * Enruta la renderización de la pestaña seleccionada
 */
function renderAdminActiveTab(db, league) {
  const container = document.getElementById('admin-tab-container');
  if (!container) return;

  const role = getCurrentRole();
  const isDirectiva = role === ROLES.ADMIN;

  if (!isDirectiva && currentAdminTab !== 'matches') {
    currentAdminTab = 'matches';
    showToast('Acceso Restringido: El rol Turno de Cancha solo tiene autorización para planillas y marcadores.', 'warning');
  }

  switch (currentAdminTab) {
    case 'dashboard':
      renderAdminDashboard(container, db, league);
      break;
    case 'matches':
      renderAdminMatches(container, db, league);
      break;
    case 'clubs':
      renderAdminClubs(container, db, league);
      break;
    case 'sanctions':
      renderAdminSanctions(container, db, league);
      break;
    case 'treasury':
      renderAdminTreasury(container, db, league);
      break;
    case 'settings':
      renderAdminSettings(container, db, league);
      break;
    default:
      renderAdminDashboard(container, db, league);
  }
}

/**
 * ==========================================================================
 * MÓDULO 1: DASHBOARD INSTITUCIONAL
 * ==========================================================================
 */
function renderAdminDashboard(container, db, league) {
  const clubsCount = (db.clubs || []).length;
  const matches = db.matches || [];
  const matchesFinished = matches.filter(m => m.status === 'finalizado').length;
  const matchesLive = matches.filter(m => m.status === 'en_vivo').length;
  const playersCount = (db.players || []).length;

  // Calcular balance de tesorería
  const ledger = db.treasuryLedger || [];
  const totalIngresos = ledger.filter(m => m.type === 'ingreso').reduce((acc, m) => acc + (m.amount || 0), 0);
  const totalEgresos = ledger.filter(m => m.type === 'egreso').reduce((acc, m) => acc + (m.amount || 0), 0);
  const saldoCaja = totalIngresos - totalEgresos;

  // Contar futbolistas en capilla (4 amarillas) o suspendidos (5 amarillas o estado suspendido)
  const playersInWarning = (db.players || []).filter(p => p.yellowCards === 4);
  const playersSuspended = (db.players || []).filter(p => p.yellowCards >= 5 || p.status === 'suspendido');

  let html = `
    <!-- KPIs Principales -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Clubes Afiliados</span>
          <span class="admin-kpi-icon">🛡️</span>
        </div>
        <div class="admin-kpi-value">${clubsCount}</div>
        <div class="admin-kpi-sub">${league.name}</div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Partidos Oficiales</span>
          <span class="admin-kpi-icon">⚽</span>
        </div>
        <div class="admin-kpi-value">${matches.length}</div>
        <div class="admin-kpi-sub">${matchesFinished} finalizados • <strong style="color: var(--color-primary);">${matchesLive} en vivo</strong></div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Padrón de Jugadores</span>
          <span class="admin-kpi-icon">👤</span>
        </div>
        <div class="admin-kpi-value">${playersCount}</div>
        <div class="admin-kpi-sub">${playersSuspended.length} sancionados • ${playersInWarning.length} en capilla</div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Saldo Caja Chica</span>
          <span class="admin-kpi-icon">💰</span>
        </div>
        <div class="admin-kpi-value" style="color: ${saldoCaja >= 0 ? '#15803d' : '#b91c1c'};">
          $${saldoCaja.toLocaleString('es-CL')}
        </div>
        <div class="admin-kpi-sub">Ingresos: $${totalIngresos.toLocaleString('es-CL')} • Egresos: $${totalEgresos.toLocaleString('es-CL')}</div>
      </div>
    </div>

    <!-- Alertas Disciplinarias y de Cancha -->
    ${playersSuspended.length > 0 ? `
      <div class="admin-alert-box danger">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong>Alerta Disciplinaria Oficial:</strong> Hay <strong>${playersSuspended.length} jugador(es) suspendido(s)</strong> inhabilitados para jugar la próxima fecha por acumulación de 5 tarjetas amarillas o sanción del Tribunal.
          <div style="margin-top: 0.35rem; font-size: 0.78rem;">
            ${playersSuspended.map(p => `• <strong>${p.name}</strong> (${p.clubId})`).join(' ')}
          </div>
        </div>
      </div>
    ` : ''}

    ${playersInWarning.length > 0 ? `
      <div class="admin-alert-box warning">
        <div style="font-size: 1.25rem;">🟡</div>
        <div>
          <strong>Control Reglamentario (Art. 42):</strong> <strong>${playersInWarning.length} jugador(es) en capilla</strong> (4 tarjetas amarillas acumuladas). Una nueva amonestación causará suspensión automática de 1 fecha.
        </div>
      </div>
    ` : ''}

    <!-- Grilla de Acceso Rápido a Partidos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>⚽</span> Partidos de la Fecha & Marcadores Rápidos</h3>
        <button class="btn-admin-action primary" onclick="window.ligamasterOpenAddMatchModal()">
          + Programar Partido
        </button>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Encuentro</th>
                <th>Serie</th>
                <th>Recinto / Fecha</th>
                <th>Marcador</th>
                <th>Estado</th>
                <th>Ratificación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (matches.length === 0) {
    html += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No hay partidos registrados en esta liga.</td></tr>`;
  } else {
    matches.slice(0, 6).forEach(m => {
      const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: m.homeClubId };
      const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: m.awayClubId };
      const isLive = m.status === 'en_vivo';
      const isFinished = m.status === 'finalizado';

      html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 24px; height: 24px; display: inline-flex; align-items: center;">${getClubBadgeSvg(homeClub.badgeId || homeClub.id, 24)}</span>
              <strong>${homeClub.shortName || homeClub.name}</strong>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">vs</span>
              <span style="width: 24px; height: 24px; display: inline-flex; align-items: center;">${getClubBadgeSvg(awayClub.badgeId || awayClub.id, 24)}</span>
              <strong>${awayClub.shortName || awayClub.name}</strong>
            </div>
          </td>
          <td><span class="admin-badge admin-badge-info">${m.series || 'Honor'}</span></td>
          <td><small>${m.venue || 'Estadio Municipal'}<br>${m.date || 'Fin de semana'}</small></td>
          <td>
            <div class="admin-quick-score">
              <input type="number" min="0" max="99" value="${m.homeScore || 0}" id="score-h-${m.id}">
              <span>-</span>
              <input type="number" min="0" max="99" value="${m.awayScore || 0}" id="score-a-${m.id}">
            </div>
          </td>
          <td>
            <select id="status-${m.id}" class="series-select" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
              <option value="programado" ${m.status === 'programado' ? 'selected' : ''}>Programado</option>
              <option value="en_vivo" ${m.status === 'en_vivo' ? 'selected' : ''}>🔴 En Vivo</option>
              <option value="finalizado" ${m.status === 'finalizado' ? 'selected' : ''}>✓ Finalizado</option>
            </select>
          </td>
          <td>
            ${m.ratificationStatus === 'ratificado_directorio' 
              ? '<span class="admin-badge admin-badge-success">✓ Ratificado Oficial</span>' 
              : '<span class="admin-badge admin-badge-warning">Planilla Cancha</span>'}
          </td>
          <td>
            <button class="btn-admin-action primary" onclick="window.ligamasterSaveMatchScore('${m.id}')" title="Guardar marcador y actualizar tabla">
              💾 Guardar
            </button>
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * ==========================================================================
 * MÓDULO 2: GESTOR DE PARTIDOS & MARCADORES (FIXTURE)
 * ==========================================================================
 */
function renderAdminMatches(container, db, league) {
  const seriesList = getLeagueSeries(league.id);
  const matches = (db.matches || []).filter(m => !currentAdminSeries || m.series === currentAdminSeries);

  let html = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <h3><span>⚽</span> Programación & Control de Partidos</h3>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-secondary);">Filtrar por Serie:</label>
            <select id="admin-matches-series-filter" class="series-select" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">
  `;

  seriesList.forEach(s => {
    html += `<option value="${s.id}" ${s.id === currentAdminSeries ? 'selected' : ''}>${s.name}</option>`;
  });

  html += `
            </select>
          </div>
        </div>

        <button class="btn-primary-coral" onclick="window.ligamasterOpenAddMatchModal()">
          + Programar Nuevo Encuentro
        </button>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Encuentro</th>
                <th>Recinto y Fecha</th>
                <th>Árbitro & Turno</th>
                <th>Marcador</th>
                <th>Estado</th>
                <th>Acta Oficial</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (matches.length === 0) {
    html += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay partidos programados para la serie seleccionada.</td></tr>`;
  } else {
    matches.forEach(m => {
      const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: m.homeClubId };
      const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: m.awayClubId };

      html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <span style="width: 28px; height: 28px; display: inline-flex; align-items: center;">${getClubBadgeSvg(homeClub.badgeId || homeClub.id, 28)}</span>
              <div>
                <strong style="display: block;">${homeClub.name}</strong>
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">vs ${awayClub.name}</span>
              </div>
              <span style="width: 28px; height: 28px; display: inline-flex; align-items: center;">${getClubBadgeSvg(awayClub.badgeId || awayClub.id, 28)}</span>
            </div>
          </td>
          <td>
            <strong style="display: block; font-size: 0.82rem;">${m.venue || 'Estadio Municipal'}</strong>
            <small style="color: var(--color-text-muted);">${m.date || 'Por definir'}</small>
          </td>
          <td>
            <div style="font-size: 0.78rem;">
              <span>👨‍⚖️ ${m.referee || 'CAPA Oficial'}</span><br>
              <span style="color: var(--color-text-muted);">📋 Turno: ${m.turnOfficial || 'Designado por Turno'}</span>
            </div>
          </td>
          <td>
            <div class="admin-quick-score">
              <input type="number" min="0" max="99" value="${m.homeScore || 0}" id="full-score-h-${m.id}">
              <span>:</span>
              <input type="number" min="0" max="99" value="${m.awayScore || 0}" id="full-score-a-${m.id}">
            </div>
          </td>
          <td>
            <select id="full-status-${m.id}" class="series-select" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
              <option value="programado" ${m.status === 'programado' ? 'selected' : ''}>Programado</option>
              <option value="en_vivo" ${m.status === 'en_vivo' ? 'selected' : ''}>🔴 En Vivo</option>
              <option value="finalizado" ${m.status === 'finalizado' ? 'selected' : ''}>✓ Finalizado</option>
            </select>
          </td>
          <td>
            ${m.ratificationStatus === 'ratificado_directorio' 
              ? '<span class="admin-badge admin-badge-success">✓ Ratificado Directorio</span>' 
              : `<button class="btn-admin-action success" onclick="window.ligamasterRatifyMatch('${m.id}')" title="Ratificar formalmente por Directorio">Ratificar Acta</button>`}
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-admin-action primary" onclick="window.ligamasterSaveFullMatchScore('${m.id}')" title="Guardar cambios">
                💾 Guardar
              </button>
              <button class="btn-admin-action danger" onclick="window.ligamasterDeleteMatch('${m.id}')" title="Eliminar este partido">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  document.getElementById('admin-matches-series-filter')?.addEventListener('change', (e) => {
    currentAdminSeries = e.target.value;
    renderAdminMatches(container, db, league);
  });
}

/**
 * ==========================================================================
 * MÓDULO 3: DIRECTORIO DE CLUBES & PADRÓN DE JUGADORES
 * ==========================================================================
 */
function renderAdminClubs(container, db, league) {
  const clubs = db.clubs || [];
  const selectedClub = clubs.find(c => c.id === currentAdminClubId) || clubs[0];
  const clubPlayers = (db.players || []).filter(p => p.clubId === selectedClub?.id);

  let html = `
    <!-- Barra de Selección de Club -->
    <div class="admin-card" style="margin-bottom: 1.25rem;">
      <div class="admin-card-body" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-subtle); border-radius: var(--radius-sm); padding: 0.25rem;">
            ${getClubBadgeSvg(selectedClub?.badgeId || selectedClub?.id, 40)}
          </div>
          <div>
            <label style="display: block; font-size: 0.72rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">Seleccionar Club de la Liga:</label>
            <select id="admin-club-select-dropdown" class="series-select" style="font-weight: 800; font-size: 1rem; padding: 0.4rem 0.85rem;">
  `;

  clubs.forEach(c => {
    html += `<option value="${c.id}" ${c.id === selectedClub?.id ? 'selected' : ''}>${c.name} (${c.shortName || c.name})</option>`;
  });

  html += `
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary-coral" onclick="window.ligamasterOpenAddPlayerModal('${selectedClub?.id}')">
            + Inscribir Nuevo Futbolista
          </button>
        </div>
      </div>
    </div>

    <!-- Padrón de Futbolistas Inscritos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>👤</span> Padrón Oficial de Futbolistas: ${selectedClub?.name}</h3>
        <span class="admin-badge admin-badge-info">${clubPlayers.length} Inscritos en Sistema</span>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Dorsal & Futbolista</th>
                <th>RUT Chileno</th>
                <th>Serie</th>
                <th>Posición</th>
                <th>Goles</th>
                <th>Tarjetas</th>
                <th>Estado Reglamentario</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (clubPlayers.length === 0) {
    html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay futbolistas inscritos para este club aún.</td></tr>`;
  } else {
    clubPlayers.forEach(p => {
      const isSuspended = p.status === 'suspendido' || p.yellowCards >= 5;

      html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <strong style="font-family: var(--font-display); font-size: 1.1rem; color: var(--color-primary); width: 24px;">#${p.number || '-'}</strong>
              <div>
                <strong>${p.name}</strong>
                <small style="display: block; color: var(--color-text-muted);">${p.birthDate || 'Ficha Registrada'}</small>
              </div>
            </div>
          </td>
          <td><code>${p.rut || 'Pendiente'}</code></td>
          <td><span class="admin-badge admin-badge-info">${p.series || 'Honor'}</span></td>
          <td>${p.position || 'Jugador'}</td>
          <td><strong>${p.goals || 0}</strong></td>
          <td>
            <span title="Amarillas">🟨 ${p.yellowCards || 0}</span> • 
            <span title="Rojas">🟥 ${p.redCards || 0}</span>
          </td>
          <td>
            ${isSuspended 
              ? '<span class="admin-badge admin-badge-danger">🔴 Suspendido</span>' 
              : '<span class="admin-badge admin-badge-success">🟢 Habilitado</span>'}
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-admin-action ${isSuspended ? 'success' : 'danger'}" onclick="window.ligamasterTogglePlayerStatus('${p.id}')" title="Alternar habilitación / suspensión">
                ${isSuspended ? 'Habilitar' : 'Suspender'}
              </button>
              <button class="btn-admin-action danger" onclick="window.ligamasterDeletePlayer('${p.id}')" title="Eliminar del padrón">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  document.getElementById('admin-club-select-dropdown')?.addEventListener('change', (e) => {
    currentAdminClubId = e.target.value;
    renderAdminClubs(container, db, league);
  });
}

/**
 * ==========================================================================
 * MÓDULO 4: TRIBUNAL DE DISCIPLINA & PENALIDADES
 * ==========================================================================
 */
function renderAdminSanctions(container, db, league) {
  const sanctions = db.sanctionsLedger || [];
  const players = db.players || [];
  const yellowCardWarnings = players.filter(p => p.yellowCards >= 4);

  let html = `
    <!-- Alerta Informativa del Tribunal -->
    <div class="admin-alert-box info">
      <div style="font-size: 1.25rem;">⚖️</div>
      <div>
        <strong>Tribunal de Disciplina & Penalidades:</strong> Registro de penalidades según Código de Procedimientos y Penalidades Oficial. Las suspensiones por 5 amarillas se aplican en forma automática e indelegable.
      </div>
    </div>

    <!-- Tabla de Sanciones Vigentes -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>⚖️</span> Libro Oficial de Fallos & Castigos Disciplinarios</h3>
        <button class="btn-primary-coral" onclick="window.ligamasterOpenAddSanctionModal()">
          + Aplicar Sanción Disciplinaria
        </button>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Futbolista Sancionado</th>
                <th>Club</th>
                <th>Serie</th>
                <th>Causa y Artículo Reglamentario</th>
                <th>Fechas</th>
                <th>Restantes</th>
                <th>Resolución / Acta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (sanctions.length === 0) {
    html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay sanciones disciplinarias vigentes en este momento.</td></tr>`;
  } else {
    sanctions.forEach(s => {
      html += `
        <tr>
          <td><strong>${s.playerName}</strong></td>
          <td>${s.clubName}</td>
          <td><span class="admin-badge admin-badge-info">${s.series}</span></td>
          <td><small>${s.cause}</small></td>
          <td>${s.datesImposed} impuestas</td>
          <td>
            <strong style="color: ${s.datesRemaining > 0 ? '#b91c1c' : '#15803d'};">
              ${s.datesRemaining} fecha(s)
            </strong>
          </td>
          <td><small style="color: var(--color-text-muted);">${s.meetingDate || 'Tribunal de Disciplina'}</small></td>
          <td>
            ${s.datesRemaining > 0 ? `
              <button class="btn-admin-action success" onclick="window.ligamasterServeSanctionDate('${s.id}')" title="Marcar fecha cumplida">
                ✓ Cumplir Fecha
              </button>
            ` : '<span class="admin-badge admin-badge-success">Cumplida</span>'}
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Detección Automática de Tarjetas Amarillas (Capilla y Suspensión) -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>🟨</span> Control Reglamentario de Tarjetas Amarillas (Art. 42)</h3>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Club</th>
                <th>Amarillas Acumuladas</th>
                <th>Condición Reglamentaria</th>
                <th>Procedimiento</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (yellowCardWarnings.length === 0) {
    html += `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No hay jugadores en advertencia de tarjetas actualmente.</td></tr>`;
  } else {
    yellowCardWarnings.forEach(p => {
      const isOut = p.yellowCards >= 5;
      html += `
        <tr>
          <td><strong>${p.name}</strong> (#${p.number})</td>
          <td>${p.clubId}</td>
          <td><strong style="font-size: 1.1rem; color: ${isOut ? '#b91c1c' : '#b45309'};">${p.yellowCards} 🟨</strong></td>
          <td>
            ${isOut 
              ? '<span class="admin-badge admin-badge-danger">⛔ SUSPENDIDO AUTOMÁTICO</span>' 
              : '<span class="admin-badge admin-badge-warning">⚠️ EN CAPILLA (A 1 Amarilla)</span>'}
          </td>
          <td>
            <small style="color: var(--color-text-secondary);">
              ${isOut ? 'Inhabilitado de oficio para la siguiente fecha oficial.' : 'Apercibimiento reglamentario.'}
            </small>
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * ==========================================================================
 * MÓDULO 5: TESORERÍA & BALANCE INSTITUCIONAL
 * ==========================================================================
 */
function renderAdminTreasury(container, db, league) {
  const ledger = db.treasuryLedger || [];
  const totalIngresos = ledger.filter(m => m.type === 'ingreso').reduce((acc, m) => acc + (m.amount || 0), 0);
  const totalEgresos = ledger.filter(m => m.type === 'egreso').reduce((acc, m) => acc + (m.amount || 0), 0);
  const saldoLiquido = totalIngresos - totalEgresos;

  let html = `
    <!-- Resumen Financiero -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card" style="border-left: 4px solid #15803d;">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Total Ingresos Recaudados</span>
          <span class="admin-kpi-icon">📈</span>
        </div>
        <div class="admin-kpi-value" style="color: #15803d;">
          +$${totalIngresos.toLocaleString('es-CL')}
        </div>
        <div class="admin-kpi-sub">Cuotas de afiliación y aranceles</div>
      </div>

      <div class="admin-kpi-card" style="border-left: 4px solid #b91c1c;">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Total Egresos Operativos</span>
          <span class="admin-kpi-icon">📉</span>
        </div>
        <div class="admin-kpi-value" style="color: #b91c1c;">
          -$${totalEgresos.toLocaleString('es-CL')}
        </div>
        <div class="admin-kpi-sub">Arbitrajes CAPA, balones y sede</div>
      </div>

      <div class="admin-kpi-card" style="border-left: 4px solid var(--color-primary);">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Saldo Disponible en Caja</span>
          <span class="admin-kpi-icon">🏦</span>
        </div>
        <div class="admin-kpi-value">
          $${saldoLiquido.toLocaleString('es-CL')}
        </div>
        <div class="admin-kpi-sub">Caja chica y cuenta bancaria de la Asociación</div>
      </div>
    </div>

    <!-- Libro Diario de Movimientos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>💰</span> Libro Diario de Caja Chica & Tesorería</h3>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-admin-action" onclick="window.print()">
            🖨️ Imprimir Balance
          </button>
          <button class="btn-primary-coral" onclick="window.ligamasterOpenAddTreasuryModal()">
            + Registrar Movimiento
          </button>
        </div>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Folio</th>
                <th>Club / Proveedor</th>
                <th>Concepto</th>
                <th>Categoría</th>
                <th style="text-align: right;">Monto ($ CLP)</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
  `;

  if (ledger.length === 0) {
    html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay registros contables en la caja de esta liga.</td></tr>`;
  } else {
    ledger.forEach(m => {
      const isIngreso = m.type === 'ingreso';

      html += `
        <tr>
          <td><small>${m.date}</small></td>
          <td>
            ${isIngreso 
              ? '<span class="admin-badge admin-badge-success">Ingreso</span>' 
              : '<span class="admin-badge admin-badge-danger">Egreso</span>'}
          </td>
          <td><code>${m.receiptFolio || 'S/F'}</code></td>
          <td><strong>${m.clubName || 'Asociación'}</strong></td>
          <td><small>${m.concept}</small></td>
          <td><span class="admin-badge admin-badge-info">${m.category}</span></td>
          <td style="text-align: right; font-family: var(--font-display); font-weight: 800; color: ${isIngreso ? '#15803d' : '#b91c1c'};">
            ${isIngreso ? '+' : '-'}$${(m.amount || 0).toLocaleString('es-CL')}
          </td>
          <td>
            <button class="btn-admin-action danger" onclick="window.ligamasterDeleteTreasuryItem('${m.id}')" title="Eliminar registro">
              🗑️
            </button>
          </td>
        </tr>
      `;
    });
  }

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * ==========================================================================
 * MÓDULO 6: CONFIGURACIÓN INSTITUCIONAL DE LA LIGA
 * ==========================================================================
 */
function renderAdminSettings(container, db, league) {
  const lInfo = db.leagueInfo || {};

  let html = `
    <div class="admin-card" style="max-width: 800px; margin: 0 auto;">
      <div class="admin-card-header">
        <h3><span>⚙️</span> Configuración General de la Asociación</h3>
        <span class="admin-badge admin-badge-info">ID: ${league.id}</span>
      </div>

      <div class="admin-card-body">
        <form id="admin-settings-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Oficial de la Asociación</label>
              <input type="text" id="set-name" class="series-select" style="width: 100%;" value="${lInfo.name || league.name}" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Corto / Sigla</label>
              <input type="text" id="set-shortName" class="series-select" style="width: 100%;" value="${lInfo.shortName || league.shortName || ''}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Presidente de la Asociación</label>
              <input type="text" id="set-president" class="series-select" style="width: 100%;" value="${lInfo.president || league.president || ''}" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Escudo Oficial de la Asociación</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                ${lInfo.logoBase64 ? `<img src="${lInfo.logoBase64}" style="height:32px; width:32px; object-fit:contain;">` : `<div style="height:32px; width:32px; background:#ddd; border-radius:4px;"></div>`}
                <label class="btn-admin-action" style="cursor: pointer; padding: 0.3rem 0.5rem; font-size: 0.75rem;">
                  Subir Escudo
                  <input type="file" id="set-league-logo" accept="image/png, image/jpeg, image/webp" style="display: none;">
                </label>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Sede Social Oficial / Dirección</label>
              <input type="text" id="set-headquarters" class="series-select" style="width: 100%;" value="${lInfo.headquarters || 'Calle Principal s/n'}">
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Imagen de Estadio (Fondo Placas)</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                ${lInfo.stadiumBase64 ? `<img src="${lInfo.stadiumBase64}" style="height:32px; width:48px; object-fit:cover; border-radius:4px;">` : `<div style="height:32px; width:48px; background:#ddd; border-radius:4px;"></div>`}
                <label class="btn-admin-action" style="cursor: pointer; padding: 0.3rem 0.5rem; font-size: 0.75rem;">
                  Subir Foto
                  <input type="file" id="set-league-stadium" accept="image/png, image/jpeg, image/webp" style="display: none;">
                </label>
                ${lInfo.stadiumBase64 ? `<button type="button" class="btn-admin-action danger" onclick="window.ligamasterRemoveStadium()" style="padding: 0.3rem 0.5rem; font-size: 0.75rem;">X</button>` : ''}
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Temporada Vigente</label>
              <input type="text" id="set-season" class="series-select" style="width: 100%;" value="${lInfo.season || 'Campeonato Oficial 2026/27'}">
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Medio Oficial de Transmisión</label>
              <input type="text" id="set-media" class="series-select" style="width: 100%;" value="${lInfo.mediaPartner || 'Transmisiones Deportivas'}">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <button type="button" class="btn-admin-action danger" onclick="window.ligamasterResetActiveLeague('${league.id}')">
              ⚠️ Restablecer Datos de Demostración
            </button>
            <button type="submit" class="btn-primary-coral">
              💾 Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Módulo de Gestión de Auspiciadores (Placas) -->
    <div class="admin-card" style="max-width: 800px; margin: 1.5rem auto 0;">
      <div class="admin-card-header">
        <h3><span>📢</span> Auspiciadores y Patrocinadores (Placas)</h3>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <select id="new-sponsor-select" class="series-select" style="padding: 0.3rem 0.5rem; font-size: 0.8rem;">
            <option value="Personalizado...">Personalizado...</option>
            <option value="PUMA">Puma</option>
            <option value="ENTEL">Entel</option>
            <option value="BETSSON">Betsson</option>
            <option value="BANCOESTADO">BancoEstado</option>
            <option value="CRISTAL">Cristal</option>
            <option value="POWERADE">Powerade</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Mahou">Mahou</option>
            <option value="Riyadh Season">Riyadh Season</option>
            <option value="Duracell">Duracell</option>
            <option value="BKT">BKT Tires</option>
            <option value="Moeve">Moeve</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Uber Eats">Uber Eats</option>
            <option value="Airbnb">Airbnb</option>
            <option value="Luckia">Luckia</option>
          </select>
          <button class="btn-primary-coral" onclick="window.ligamasterAddSponsor(document.getElementById('new-sponsor-select').value)" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">+ Añadir</button>
        </div>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nombre del Sponsor</th>
                <th>Logo (Imagen)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${(db.sponsors || []).length === 0 ? `<tr><td colspan="3" style="text-align: center; padding: 2rem;">No hay patrocinadores configurados.</td></tr>` : 
                (db.sponsors || []).map(sp => `
                <tr>
                  <td>
                    <input type="text" value="${sp.name}" onchange="window.ligamasterUpdateSponsorName('${sp.id}', this.value)" class="series-select" style="width: 100%; max-width: 200px;">
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      ${sp.logoBase64 ? `<img src="${sp.logoBase64}" style="height: 30px; object-fit: contain; background: #fff; padding: 2px; border-radius: 4px;">` : `<span style="font-size: 0.8rem; color: #64748b;">(Solo texto)</span>`}
                      <label class="btn-admin-action" style="cursor: pointer; padding: 0.3rem 0.5rem; font-size: 0.75rem;">
                        Subir Logo
                        <input type="file" accept="image/png, image/jpeg" style="display: none;" onchange="window.ligamasterUploadSponsorLogo('${sp.id}', this)">
                      </label>
                      ${sp.logoBase64 ? `<button class="btn-admin-action danger" onclick="window.ligamasterRemoveSponsorLogo('${sp.id}')" style="padding: 0.3rem 0.5rem; font-size: 0.75rem;">🗑️ Logo</button>` : ''}
                    </div>
                  </td>
                  <td>
                    <button class="btn-admin-action danger" onclick="window.ligamasterDeleteSponsor('${sp.id}')">🗑️ Eliminar</button>
                  </td>
                </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Módulo de Carga Masiva y Respaldo de Base de Datos -->
    <div class="admin-card" style="max-width: 800px; margin: 1.5rem auto 0;">
      <div class="admin-card-header">
        <h3><span>💾</span> Carga Masiva, Respaldos y Migración de Campeonato</h3>
        <span class="admin-badge admin-badge-success">Base de Datos JSON</span>
      </div>
      <div class="admin-card-body">
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1.25rem;">
          Puedes exportar toda la base de datos de esta liga (clubes, jugadores, fixture de partidos, tribunal y estadísticas) para respaldarla en tu computador o cargar una base de datos completa de un nuevo torneo desde un archivo JSON.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <!-- Exportar -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📥</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Exportar Campeonato</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Descarga el archivo .json con toda la información vigente.</p>
            <button type="button" class="btn-primary-coral" onclick="window.ligamasterExportDatabase()" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">
              Descargar Respaldo JSON
            </button>
          </div>

          <!-- Importar -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📤</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Cargar Base de Datos</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Sube un archivo .json con los clubes y fixture completos.</p>
            <label class="btn-admin-action" style="display: block; width: 100%; font-size: 0.8rem; padding: 0.5rem; cursor: pointer; text-align: center; background: #ffffff; border: 1px solid var(--color-primary); color: var(--color-primary); font-weight: 700; border-radius: var(--radius-sm);">
              <span>Examinar Archivo...</span>
              <input type="file" id="input-import-db" accept=".json" onchange="window.ligamasterImportDatabase(event)" style="display: none;">
            </label>
          </div>

          <!-- Plantilla Modelo -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📋</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Plantilla en Blanco</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Descarga la estructura oficial vacía para armar una nueva liga.</p>
            <button type="button" class="btn-admin-action" onclick="window.ligamasterDownloadTemplate()" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; border: 1px solid var(--color-border);">
              Descargar Plantilla
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Módulo de Seguridad Institucional y Control de Acceso (PIN) -->
    <div class="admin-card" style="max-width: 800px; margin: 1.5rem auto 0;">
      <div class="admin-card-header">
        <h3><span>🔐</span> Seguridad Institucional y Claves de Acceso (PIN)</h3>
        <span class="admin-badge admin-badge-warning">Protección Anti-Fraude</span>
      </div>
      <div class="admin-card-body">
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1.25rem;">
          Para evitar que dirigentes de clubes o personas no autorizadas manipulen marcadores, sanciones, finanzas o auspiciadores, configure aquí los PINs privados de su asociación.
        </p>

        <form id="admin-security-pins-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <label style="font-size: 0.85rem; font-weight: 800; color: #ffffff;">🏛️ PIN Directiva General (Admin)</label>
                <span style="font-size: 0.7rem; color: #4ade80; font-weight: 700;">Control Total</span>
              </div>
              <p style="font-size: 0.73rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
                Permite editar auspiciadores, finanzas, sanciones y parámetros de la asociación.
              </p>
              <input type="password" id="input-new-admin-pin" class="series-select" style="width: 100%; font-size: 0.9rem;" placeholder="Nuevo PIN (mínimo 4 dígitos)" maxlength="8">
              <small style="display: block; margin-top: 0.35rem; font-size: 0.7rem; color: var(--color-text-muted);">
                PIN actual: <code>${getAdminPin() === '9999' ? '9999 (Por Defecto - Se sugiere cambiar)' : '•••• (Personalizado y Seguro)'}</code>
              </small>
            </div>

            <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <label style="font-size: 0.85rem; font-weight: 800; color: #ffffff;">⏱️ PIN Turno de Cancha (Árbitros)</label>
                <span style="font-size: 0.7rem; color: #38bdf8; font-weight: 700;">Solo Planilla</span>
              </div>
              <p style="font-size: 0.73rem; color: var(--color-text-muted); margin-bottom: 0.65rem;">
                Habilita a los turnos arbitrales para ingresar marcadores en vivo sin acceso a finanzas ni configuración.
              </p>
              <input type="password" id="input-new-referee-pin" class="series-select" style="width: 100%; font-size: 0.9rem;" placeholder="Nuevo PIN Turno" maxlength="8">
              <small style="display: block; margin-top: 0.35rem; font-size: 0.7rem; color: var(--color-text-muted);">
                PIN actual: <code>${getRefereePin() === '1234' ? '1234 (Por Defecto)' : '•••• (Personalizado)'}</code>
              </small>
            </div>
          </div>

          <div style="text-align: right;">
            <button type="submit" class="btn-primary-coral" style="padding: 0.55rem 1.25rem; font-size: 0.85rem;">
              🔒 Actualizar Claves de Seguridad
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Módulo de Libro Oficial de Auditoría y Control de Cambios -->
    <div class="admin-card" style="max-width: 800px; margin: 1.5rem auto 0;">
      <div class="admin-card-header">
        <h3><span>📜</span> Libro Oficial de Auditoría y Control de Cambios</h3>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button type="button" class="btn-admin-action" onclick="window.ligamasterExportAuditLog()" style="font-size: 0.75rem; padding: 0.35rem 0.6rem;">
            📥 Exportar Bitácora CSV
          </button>
        </div>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div style="padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-muted);">
          Trazabilidad de seguridad en tiempo real: Se registran todos los accesos, modificaciones de resultados, sanciones y movimientos de auspiciadores para prevenir fraudes.
        </div>
        <div class="admin-table-wrapper" style="max-height: 280px; overflow-y: auto;">
          <table class="admin-table" style="font-size: 0.78rem;">
            <thead>
              <tr>
                <th style="width: 130px;">Fecha / Hora</th>
                <th style="width: 150px;">Usuario / Perfil</th>
                <th style="width: 140px;">Acción Oficial</th>
                <th>Detalle del Registro</th>
              </tr>
            </thead>
            <tbody>
              ${(db.auditLog || []).length === 0 ? `<tr><td colspan="4" style="text-align: center; padding: 1.5rem; color: var(--color-text-muted);">Sin registros de auditoría recientes.</td></tr>` : 
                (db.auditLog || []).slice(0, 30).map(log => `
                <tr>
                  <td style="white-space: nowrap; font-family: var(--font-mono); color: var(--color-text-muted); font-size: 0.72rem;">${log.formattedTime || log.timestamp || 'Hoy'}</td>
                  <td>
                    <strong>${log.user || 'Directiva'}</strong>
                    <div style="font-size: 0.68rem; color: #94a3b8;">${log.role || '🏛️ Directiva'}</div>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: ${log.action?.includes('Alerta') ? '#f87171' : (log.action?.includes('Auspiciador') ? '#38bdf8' : '#4ade80')}">
                      ${log.action || 'Operación'}
                    </span>
                  </td>
                  <td style="color: var(--color-text-main); font-size: 0.75rem;">${log.details || ''}</td>
                </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const handleLeagueLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!db.leagueInfo) db.leagueInfo = {};
      db.leagueInfo.logoBase64 = ev.target.result;
      saveDb(db, league.id);
      renderAdminView();
    };
    reader.readAsDataURL(file);
  };

  const handleLeagueStadiumUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Check file size (max 1.5MB)
    if (file.size > 1.5 * 1024 * 1024) {
      showToast('La imagen es muy pesada. Intenta con una de menos de 1.5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (!db.leagueInfo) db.leagueInfo = {};
      db.leagueInfo.stadiumBase64 = ev.target.result;
      saveDb(db, league.id);
      renderAdminView();
    };
    reader.readAsDataURL(file);
  };

  window.ligamasterRemoveStadium = () => {
    if (!db.leagueInfo) return;
    db.leagueInfo.stadiumBase64 = null;
    saveDb(db, league.id);
    renderAdminView();
  };

  document.getElementById('set-league-logo')?.addEventListener('change', handleLeagueLogoUpload);
  document.getElementById('set-league-stadium')?.addEventListener('change', handleLeagueStadiumUpload);

  document.getElementById('admin-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin()) {
      showToast('Acceso Denegado: Solo el Administrador General puede modificar estos parámetros.', 'error');
      return;
    }
    if (!db.leagueInfo) db.leagueInfo = {};
    db.leagueInfo.name = document.getElementById('set-name')?.value || db.leagueInfo.name;
    db.leagueInfo.shortName = document.getElementById('set-shortName')?.value || db.leagueInfo.shortName;
    db.leagueInfo.president = document.getElementById('set-president')?.value || db.leagueInfo.president;
    db.leagueInfo.headquarters = document.getElementById('set-headquarters')?.value || db.leagueInfo.headquarters;
    db.leagueInfo.season = document.getElementById('set-season')?.value || db.leagueInfo.season;
    db.leagueInfo.mediaPartner = document.getElementById('set-media')?.value || db.leagueInfo.mediaPartner;

    saveDb(db, league.id);
    addAuditLogEntry('Configuración Actualizada', 'Parámetros institucionales de la liga guardados con éxito');
    showToast('Configuración guardada exitosamente.', 'success');
    renderAdminView();
  });

  // Listener para el formulario de claves de seguridad
  document.getElementById('admin-security-pins-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin()) {
      showToast('Acceso Denegado: Solo la Directiva General puede modificar claves de seguridad.', 'error');
      return;
    }
    const newAdminPin = document.getElementById('input-new-admin-pin')?.value.trim();
    const newRefPin = document.getElementById('input-new-referee-pin')?.value.trim();

    let changes = 0;
    if (newAdminPin) {
      if (newAdminPin.length < 4) {
        showToast('El PIN de Administrador debe tener al menos 4 caracteres.', 'error');
        return;
      }
      setCustomAdminPin(newAdminPin);
      changes++;
    }
    if (newRefPin) {
      if (newRefPin.length < 4) {
        showToast('El PIN de Turno debe tener al menos 4 caracteres.', 'error');
        return;
      }
      setCustomRefereePin(newRefPin);
      changes++;
    }

    if (changes > 0) {
      showToast('🔒 Claves de seguridad actualizadas con éxito.', 'success');
      renderAdminView();
    } else {
      showToast('Ingrese un nuevo PIN para actualizar.', 'info');
    }
  });
}

// Exportador del Libro de Auditoría a CSV
window.ligamasterExportAuditLog = () => {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const logs = db.auditLog || [];
  if (logs.length === 0) {
    showToast('No hay registros de auditoría para exportar.', 'info');
    return;
  }
  const headers = ['Fecha/Hora', 'Usuario', 'Rol', 'Accion', 'Detalles'];
  const rows = logs.map(l => [
    `"${l.formattedTime || ''}"`,
    `"${l.user || ''}"`,
    `"${l.role || ''}"`,
    `"${l.action || ''}"`,
    `"${(l.details || '').replace(/"/g, '""')}"`
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `bitacora_auditoria_${activeId}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Bitácora oficial de auditoría descargada en CSV.', 'success');
};

/**
 * ==========================================================================
 * ACCIONES Y CONTROLADORES GLOBALES (EXPUESTOS A WINDOW)
 * ==========================================================================
 */

// Guardar marcador rápido de dashboard
window.ligamasterSaveMatchScore = (matchId) => {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(item => item.id === matchId);
  if (!m) return;

  const hScore = parseInt(document.getElementById(`score-h-${matchId}`)?.value || '0', 10);
  const aScore = parseInt(document.getElementById(`score-a-${matchId}`)?.value || '0', 10);
  const status = document.getElementById(`status-${matchId}`)?.value || m.status;

  m.homeScore = hScore;
  m.awayScore = aScore;
  m.status = status;

  saveDb(db, activeId);
  recalculateStandings(db, m.series);
  saveDb(db, activeId);

  const hClub = (db.clubs || []).find(c => c.id === m.homeClubId)?.name || 'Local';
  const aClub = (db.clubs || []).find(c => c.id === m.awayClubId)?.name || 'Visita';
  addAuditLogEntry('Marcador Actualizado', `${hClub} ${hScore} - ${aScore} ${aClub} (Estado: ${status})`);

  showToast(`Marcador actualizado: ${hScore} - ${aScore} (${status}). Posiciones recalculadas.`, 'success');
  renderAdminView();
};

// Guardar marcador completo desde tab matches
window.ligamasterSaveFullMatchScore = (matchId) => {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(item => item.id === matchId);
  if (!m) return;

  const hScore = parseInt(document.getElementById(`full-score-h-${matchId}`)?.value || '0', 10);
  const aScore = parseInt(document.getElementById(`full-score-a-${matchId}`)?.value || '0', 10);
  const status = document.getElementById(`full-status-${matchId}`)?.value || m.status;

  m.homeScore = hScore;
  m.awayScore = aScore;
  m.status = status;

  saveDb(db, activeId);
  recalculateStandings(db, m.series);
  saveDb(db, activeId);

  const hClub = (db.clubs || []).find(c => c.id === m.homeClubId)?.name || 'Local';
  const aClub = (db.clubs || []).find(c => c.id === m.awayClubId)?.name || 'Visita';
  addAuditLogEntry('Marcador Oficial', `${hClub} ${hScore} : ${aScore} ${aClub} (${status})`);

  showToast(`Partido guardado: ${hScore} : ${aScore} (${status}).`, 'success');
  renderAdminView();
};

// Ratificar partido formalmente por Directorio
window.ligamasterRatifyMatch = (matchId) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo el Directorio General puede ratificar actas arbitrales.', 'error');
    return;
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(item => item.id === matchId);
  if (!m) return;

  m.ratificationStatus = 'ratificado_directorio';
  m.ratificationLabel = 'Oficializado y Ratificado por Directorio';

  saveDb(db, activeId);
  const hClub = (db.clubs || []).find(c => c.id === m.homeClubId)?.name || 'Local';
  const aClub = (db.clubs || []).find(c => c.id === m.awayClubId)?.name || 'Visita';
  addAuditLogEntry('Acta Ratificada', `Planilla oficializada por Directorio: ${hClub} vs ${aClub}`);

  showToast('Planilla del partido oficializada y ratificada por la Directiva.', 'success');
  renderAdminView();
};

// Eliminar partido
window.ligamasterDeleteMatch = (matchId) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General puede eliminar partidos del fixture.', 'error');
    return;
  }
  if (!confirm('¿Seguro que deseas eliminar este partido del calendario?')) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const m = (db.matches || []).find(item => item.id === matchId);
  const hClub = (db.clubs || []).find(c => c.id === m?.homeClubId)?.name || 'Local';
  const aClub = (db.clubs || []).find(c => c.id === m?.awayClubId)?.name || 'Visita';
  db.matches = (db.matches || []).filter(item => item.id !== matchId);
  saveDb(db, activeId);
  addAuditLogEntry('Partido Eliminado', `Se eliminó del fixture el duelo ${hClub} vs ${aClub}`);
  renderAdminView();
};

// Alternar estado de futbolista (Habilitado / Suspendido)
window.ligamasterTogglePlayerStatus = (playerId) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo el Tribunal de Penas / Directiva puede alterar sanciones de jugadores.', 'error');
    return;
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const p = (db.players || []).find(item => item.id === playerId);
  if (!p) return;

  if (p.status === 'suspendido') {
    p.status = 'habilitado';
    p.yellowCards = 0; // Levanta sanción
    addAuditLogEntry('Tribunal de Penas', `Sanción levantada: Jugador ${p.name} queda HABILITADO`);
    showToast(`Futbolista ${p.name} ha sido HABILITADO.`, 'success');
  } else {
    p.status = 'suspendido';
    addAuditLogEntry('Tribunal de Penas', `Sanción aplicada: Jugador ${p.name} queda SUSPENDIDO`);
    showToast(`Futbolista ${p.name} ha sido SUSPENDIDO reglamentariamente.`, 'warning');
  }

  saveDb(db, activeId);
  renderAdminView();
};

// Eliminar futbolista
window.ligamasterDeletePlayer = (playerId) => {
  if (!confirm('¿Seguro que deseas eliminar a este jugador del padrón oficial?')) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  db.players = (db.players || []).filter(p => p.id !== playerId);
  saveDb(db, activeId);
  renderAdminView();
};

// Cumplir fecha de sanción
window.ligamasterServeSanctionDate = (sanctionId) => {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const s = (db.sanctionsLedger || []).find(item => item.id === sanctionId);
  if (!s) return;

  s.datesRemaining = Math.max(0, (s.datesRemaining || 1) - 1);
  s.datesServed = (s.datesServed || 0) + 1;

  if (s.datesRemaining === 0) {
    s.status = 'cumplida';
    // Rehabilitar futbolista si estaba en el padrón
    const p = (db.players || []).find(item => item.name.toLowerCase() === s.playerName.toLowerCase());
    if (p) p.status = 'habilitado';
    showToast(`¡Sanción cumplida en su totalidad! El jugador ${s.playerName} queda habilitado.`, 'success');
  } else {
    showToast(`Fecha computada. Fechas restantes de castigo: ${s.datesRemaining}.`, 'info');
  }

  saveDb(db, activeId);
  renderAdminView();
};

// Eliminar movimiento de tesorería
window.ligamasterDeleteTreasuryItem = (itemId) => {
  if (!confirm('¿Eliminar este registro contable de la caja?')) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  db.treasuryLedger = (db.treasuryLedger || []).filter(m => m.id !== itemId);
  saveDb(db, activeId);
  renderAdminView();
};

// Restablecer liga a datos de demostración
window.ligamasterResetActiveLeague = (leagueId) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General (Administrador) puede restablecer la liga.', 'error');
    return;
  }
  const enteredPin = prompt('⚠️ ACCIÓN CRÍTICA DE SEGURIDAD:\nPara restablecer toda la base de datos oficial a sus valores de fábrica, ingrese el PIN de Administrador:');
  if (!enteredPin || !verifyAdminPin(enteredPin)) {
    showToast('PIN incorrecto o cancelado. Operación cancelada por seguridad institucional.', 'error');
    return;
  }
  resetDb(leagueId);
  addAuditLogEntry('Restablecimiento de Fábrica', 'Base de datos restaurada por el Administrador General');
  showToast('Base de datos restablecida a sus valores originales.', 'info');
  renderAdminView();
};

/**
 * Recalcula la tabla de posiciones tras modificar un partido
 */
function recalculateStandings(db, series = 'honor') {
  if (!db.clubs || !db.matches) return;

  const seriesMatches = db.matches.filter(m => m.series === series && m.status === 'finalizado');
  const statsMap = {};

  // Inicializar mapa de clubes
  db.clubs.forEach(c => {
    statsMap[c.id] = {
      clubId: c.id,
      clubName: c.name,
      pj: 0, pg: 0, pe: 0, pp: 0,
      gf: 0, gc: 0, dg: 0, pts: 0
    };
  });

  // Procesar partidos finalizados
  seriesMatches.forEach(m => {
    const h = statsMap[m.homeClubId];
    const a = statsMap[m.awayClubId];
    if (!h || !a) return;

    h.pj += 1;
    a.pj += 1;
    h.gf += m.homeScore || 0;
    h.gc += m.awayScore || 0;
    a.gf += m.awayScore || 0;
    a.gc += m.homeScore || 0;

    if (m.homeScore > m.awayScore) {
      h.pg += 1;
      h.pts += 3;
      a.pp += 1;
    } else if (m.homeScore < m.awayScore) {
      a.pg += 1;
      a.pts += 3;
      h.pp += 1;
    } else {
      h.pe += 1;
      h.pts += 1;
      a.pe += 1;
      a.pts += 1;
    }

    h.dg = h.gf - h.gc;
    a.dg = a.gf - a.gc;
  });

  // Ordenar por Puntos, luego Diferencia de Gol, luego Goles a Favor
  const sorted = Object.values(statsMap).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    return b.gf - a.gf;
  });

  sorted.forEach((row, idx) => {
    row.pos = idx + 1;
  });

  if (!db.standings) db.standings = {};
  db.standings[series] = sorted;
}

/**
 * ==========================================================================
 * MODALES DE CREACIÓN (PARTIDO, JUGADOR, SANCIÓN, TESORERÍA)
 * ==========================================================================
 */
function setupAdminModals() {
  // Modal Programar Partido
  window.ligamasterOpenAddMatchModal = () => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const seriesList = getLeagueSeries(activeId);
    const clubs = db.clubs || [];
    const venues = db.venues || [];

    const modal = document.getElementById('modal-admin-add-match');
    if (!modal) return;

    const body = modal.querySelector('.modal-body');
    if (body) {
      body.innerHTML = `
        <form id="form-admin-add-match">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Local</label>
              <select id="new-match-home" class="series-select" style="width: 100%;" required>
                ${clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Visita</label>
              <select id="new-match-away" class="series-select" style="width: 100%;" required>
                ${clubs.map((c, i) => `<option value="${c.id}" ${i === 1 ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Serie</label>
              <select id="new-match-series" class="series-select" style="width: 100%;">
                ${seriesList.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Recinto / Cancha</label>
              <select id="new-match-venue" class="series-select" style="width: 100%;">
                ${venues.map(v => `<option value="${v.name}">${v.name}</option>`).join('')}
                <option value="Estadio Municipal">Estadio Municipal</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Fecha & Hora</label>
              <input type="text" id="new-match-date" class="series-select" style="width: 100%;" placeholder="ej: Domingo • 16:30 hrs" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Árbitro Asignado</label>
              <input type="text" id="new-match-referee" class="series-select" style="width: 100%;" placeholder="ej: Colegio CAPA" value="Colegio de Árbitros Oficial">
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Guardar & Programar Partido
          </button>
        </form>
      `;

      document.getElementById('form-admin-add-match')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const homeId = document.getElementById('new-match-home')?.value;
        const awayId = document.getElementById('new-match-away')?.value;
        if (homeId === awayId) {
          showToast('El equipo local y visita no pueden ser el mismo.', 'error');
          return;
        }

        const newMatch = {
          id: `match-${activeId}-${Date.now().toString().slice(-4)}`,
          series: document.getElementById('new-match-series')?.value || 'honor',
          round: "Fecha Oficial",
          homeClubId: homeId,
          awayClubId: awayId,
          venue: document.getElementById('new-match-venue')?.value || 'Estadio Municipal',
          date: document.getElementById('new-match-date')?.value || 'Fin de semana',
          referee: document.getElementById('new-match-referee')?.value || 'Terna Oficial',
          turnOfficial: 'Designado por Directorio',
          status: 'programado',
          homeScore: 0,
          awayScore: 0,
          events: []
        };

        if (!db.matches) db.matches = [];
        db.matches.unshift(newMatch);
        saveDb(db, activeId);

        modal.classList.remove('active');
        showToast('Partido programado exitosamente.', 'success');
        renderAdminView();
      });
    }

    modal.classList.add('active');
  };

  // Modal Inscribir Futbolista
  window.ligamasterOpenAddPlayerModal = (defaultClubId = null) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const seriesList = getLeagueSeries(activeId);
    const clubs = db.clubs || [];

    const modal = document.getElementById('modal-admin-add-player');
    if (!modal) return;

    const body = modal.querySelector('.modal-body');
    if (body) {
      body.innerHTML = `
        <form id="form-admin-add-player">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Afiliado</label>
            <select id="new-player-club" class="series-select" style="width: 100%;" required>
              ${clubs.map(c => `<option value="${c.id}" ${c.id === defaultClubId ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Completo del Futbolista</label>
              <input type="text" id="new-player-name" class="series-select" style="width: 100%;" placeholder="ej: Esteban Paredes" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">RUT Chileno</label>
              <input type="text" id="new-player-rut" class="series-select" style="width: 100%;" placeholder="ej: 18.234.567-8" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Dorsal (#)</label>
              <input type="number" id="new-player-number" min="1" max="99" class="series-select" style="width: 100%;" value="9" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Serie</label>
              <select id="new-player-series" class="series-select" style="width: 100%;">
                ${seriesList.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Posición</label>
              <select id="new-player-pos" class="series-select" style="width: 100%;">
                <option value="Delantero">Delantero</option>
                <option value="Volante">Volante</option>
                <option value="Defensa">Defensa</option>
                <option value="Arquero">Arquero</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Confirmar Inscripción Oficial
          </button>
        </form>
      `;

      document.getElementById('form-admin-add-player')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPlayer = {
          id: `p-${Date.now().toString().slice(-5)}`,
          clubId: document.getElementById('new-player-club')?.value,
          series: document.getElementById('new-player-series')?.value || 'honor',
          rut: document.getElementById('new-player-rut')?.value || 'Sin RUT',
          name: document.getElementById('new-player-name')?.value || 'Jugador',
          number: parseInt(document.getElementById('new-player-number')?.value || '9', 10),
          position: document.getElementById('new-player-pos')?.value || 'Delantero',
          goals: 0,
          assists: 0,
          yellowCards: 0,
          redCards: 0,
          status: 'habilitado',
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
        };

        if (!db.players) db.players = [];
        db.players.unshift(newPlayer);
        saveDb(db, activeId);

        modal.classList.remove('active');
        showToast(`Futbolista ${newPlayer.name} inscrito exitosamente en el club.`, 'success');
        renderAdminView();
      });
    }

    modal.classList.add('active');
  };

  // Modal Aplicar Sanción Disciplinaria
  window.ligamasterOpenAddSanctionModal = () => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const clubs = db.clubs || [];

    const modal = document.getElementById('modal-admin-add-sanction');
    if (!modal) return;

    const body = modal.querySelector('.modal-body');
    if (body) {
      body.innerHTML = `
        <form id="form-admin-add-sanction">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club del Jugador</label>
              <select id="sanc-club" class="series-select" style="width: 100%;" required>
                ${clubs.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre del Futbolista</label>
              <input type="text" id="sanc-player" class="series-select" style="width: 100%;" placeholder="ej: Esteban Carriel" required>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Causa Reglamentaria / Fallo Disciplinario</label>
            <textarea id="sanc-cause" class="series-select" style="width: 100%; height: 70px; resize: vertical;" placeholder="ej: Expulsión con Roja Directa: Agresión verbal a juez de línea (Art. 54 Reglamento de Competición)" required></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Fechas de Suspensión</label>
              <input type="number" id="sanc-dates" min="1" max="20" class="series-select" style="width: 100%;" value="2" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nº de Acta del Tribunal</label>
              <input type="text" id="sanc-acta" class="series-select" style="width: 100%;" value="Sesión Tribunal de Disciplina (Acta Nº 15)">
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Registrar Fallo Disciplinario
          </button>
        </form>
      `;

      document.getElementById('form-admin-add-sanction')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const dates = parseInt(document.getElementById('sanc-dates')?.value || '1', 10);
        const playerName = document.getElementById('sanc-player')?.value || 'Jugador';

        const newSanction = {
          id: `sanc-${Date.now().toString().slice(-4)}`,
          playerName: playerName,
          clubName: document.getElementById('sanc-club')?.value || 'Club',
          series: 'Serie de Honor',
          cause: document.getElementById('sanc-cause')?.value || 'Sanción disciplinaria',
          datesImposed: dates,
          datesServed: 0,
          datesRemaining: dates,
          status: 'vigente',
          meetingDate: document.getElementById('sanc-acta')?.value || 'Acta Oficial'
        };

        if (!db.sanctionsLedger) db.sanctionsLedger = [];
        db.sanctionsLedger.unshift(newSanction);

        // Suspender al jugador si existe en el padrón
        const p = (db.players || []).find(item => item.name.toLowerCase() === playerName.toLowerCase());
        if (p) p.status = 'suspendido';

        saveDb(db, activeId);
        modal.classList.remove('active');
        showToast(`Sanción disciplinaria aplicada: ${playerName} inhabilitado por ${dates} fecha(s).`, 'warning');
        renderAdminView();
      });
    }

    modal.classList.add('active');
  };

  // Modal Registrar Movimiento Tesorería
  window.ligamasterOpenAddTreasuryModal = () => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const clubs = db.clubs || [];

    const modal = document.getElementById('modal-admin-add-treasury');
    if (!modal) return;

    const body = modal.querySelector('.modal-body');
    if (body) {
      body.innerHTML = `
        <form id="form-admin-add-treasury">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Tipo de Movimiento</label>
              <select id="mov-type" class="series-select" style="width: 100%;">
                <option value="ingreso">🟢 Ingreso a Caja</option>
                <option value="egreso">🔴 Egreso / Gasto</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Monto en Pesos ($ CLP)</label>
              <input type="number" id="mov-amount" min="100" step="500" class="series-select" style="width: 100%; font-weight: 800;" placeholder="ej: 45000" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Categoría</label>
              <select id="mov-cat" class="series-select" style="width: 100%;">
                <option value="Cuota de Inscripción">Cuota de Inscripción</option>
                <option value="Honorarios Arbitrales">Honorarios Arbitrales</option>
                <option value="Multa Tribunal de Penas">Multa Tribunal de Penas</option>
                <option value="Implementación Deportiva">Implementación Deportiva</option>
                <option value="Mantención y Operación">Mantención Sede / Operación</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nº de Folio / Comprobante</label>
              <input type="text" id="mov-folio" class="series-select" style="width: 100%;" value="REC-${Date.now().toString().slice(-4)}" required>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club o Entidad Relacionada</label>
            <select id="mov-club" class="series-select" style="width: 100%;">
              <option value="Asociación">Asociación (General)</option>
              ${clubs.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
            </select>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Concepto / Glosa Detallada</label>
            <input type="text" id="mov-concept" class="series-select" style="width: 100%;" placeholder="ej: Pago arbitraje terna Fecha 8" required>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Guardar Movimiento Contable
          </button>
        </form>
      `;

      document.getElementById('form-admin-add-treasury')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

        const newMov = {
          id: `mov-${Date.now().toString().slice(-5)}`,
          date: dateStr,
          type: document.getElementById('mov-type')?.value || 'ingreso',
          category: document.getElementById('mov-cat')?.value || 'General',
          clubName: document.getElementById('mov-club')?.value || 'Asociación',
          concept: document.getElementById('mov-concept')?.value || 'Movimiento de caja',
          amount: parseInt(document.getElementById('mov-amount')?.value || '0', 10),
          receiptFolio: document.getElementById('mov-folio')?.value || 'REC-000',
          status: 'pagado'
        };

        if (!db.treasuryLedger) db.treasuryLedger = [];
        db.treasuryLedger.unshift(newMov);
        saveDb(db, activeId);

        modal.classList.remove('active');
        showToast(`Movimiento de $${newMov.amount.toLocaleString('es-CL')} registrado con éxito.`, 'success');
        renderAdminView();
      });
    }

    modal.classList.add('active');
  };
}

// ==========================================================================
// MÓDULO DE GESTIÓN Y MIGRACIÓN DE BASE DE DATOS (IMPORT / EXPORT JSON)
// ==========================================================================

window.ligamasterExportDatabase = () => {
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `ligamaster_campeonato_${activeId}_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('Base de datos exportada en formato JSON.', 'success');
};

window.ligamasterImportDatabase = (event) => {
  const file = event?.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported || typeof imported !== 'object') {
        throw new Error('Estructura de archivo inválida.');
      }
      if (!imported.clubs && !imported.matches && !imported.leagueInfo) {
        showToast('El archivo no contiene un formato de campeonato válido de LigaMaster.', 'error');
        return;
      }
      const activeId = getActiveLeagueId();
      saveDb(imported, activeId);
      showToast('¡Campeonato y base de datos importados con éxito!', 'success');
      window.dispatchEvent(new CustomEvent('ligamaster:league-changed', { detail: activeId }));
      renderAdminView();
    } catch (err) {
      showToast('Error al importar el archivo JSON: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
};

window.ligamasterDownloadTemplate = () => {
  const template = {
    leagueInfo: {
      name: "Nombre de la Nueva Asociación o Liga",
      shortName: "LIGA",
      president: "Nombre del Presidente",
      commune: "Comuna, Región",
      season: "Temporada 2026/27",
      headquarters: "Dirección de la sede",
      founded: 1980,
      totalClubs: 8
    },
    seriesList: [
      { id: "honor", name: "Serie de Honor (Primera)", shortName: "Honor" },
      { id: "senior_35", name: "Serie Senior (35+ Años)", shortName: "Senior" },
      { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil" }
    ],
    clubs: [
      {
        id: "club-1",
        name: "Club Deportivo Ejemplo 1",
        shortName: "Ejemplo 1",
        founded: 1950,
        president: "Dirigente 1",
        stadium: "Estadio Municipal",
        colors: { primary: "#e62238", secondary: "#ffffff" },
        badgeId: "asociacion-arauco",
        description: "Club participante del torneo oficial."
      },
      {
        id: "club-2",
        name: "Club Deportivo Ejemplo 2",
        shortName: "Ejemplo 2",
        founded: 1962,
        president: "Dirigente 2",
        stadium: "Cancha Municipal",
        colors: { primary: "#131b2e", secondary: "#f59e0b" },
        badgeId: "asociacion-arauco",
        description: "Club participante del torneo oficial."
      }
    ],
    players: [
      {
        id: "p-101",
        clubId: "club-1",
        name: "Juan Pérez González",
        nickname: "El Tanque",
        rut: "18.345.678-9",
        dorsal: 9,
        position: "Delantero Centro",
        series: "honor",
        isCaptain: true,
        stats: { matches: 5, goals: 4, assists: 1, yellowCards: 1, redCards: 0 }
      }
    ],
    matches: [
      {
        id: "match-101",
        round: 1,
        series: "honor",
        date: "2026-10-10",
        time: "16:00",
        venue: "Estadio Municipal",
        homeClubId: "club-1",
        awayClubId: "club-2",
        homeScore: 0,
        awayScore: 0,
        status: "programado",
        scorers: [],
        cards: []
      }
    ],
    standings: {
      honor: [],
      senior_35: [],
      juvenil: []
    },
    sanctions: [],
    treasuryLedger: [],
    venues: [
      { id: "v-1", name: "Estadio Municipal", address: "Av. Principal s/n", surface: "Pasto Sintético FIFA" }
    ]
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `plantilla_campeonato_ligamaster.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('Plantilla de campeonato descargada.', 'success');
};

/**
 * ==========================================================================
 * MÉTODOS DE SPONSORS (PATROCINADORES)
 * ==========================================================================
 */

const PREDEFINED_SVGS = {
  "PUMA": `<svg viewBox="0 0 110 36" width="110" height="36" xmlns="http://www.w3.org/2000/svg"><path d="M42 9c-2.4-2.8-5.6-4.5-9.3-4.5-2.2 0-4.3.6-6 1.8l1.4 2.8c1.3-.8 2.8-1.3 4.4-1.3 2.8 0 5.2 1.3 6.9 3.4l-4.1 3c-1.1-.8-2.6-1.3-4.1-1.3-3.8 0-7 3.2-7 7s3.2 7 7 7c3.8 0 7-3.2 7-7 0-.5-.1-1-.2-1.5l3.8-3.1 2.8 2.3 2.5-2.1-5.1-6zm-17.5 13.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#ffffff"/><text x="56" y="24" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="18" fill="#ffffff" letter-spacing="1">PUMA</text></svg>`,
  "Microsoft": `<svg viewBox="0 0 120 30" width="120" height="30" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="4" width="10.5" height="10.5" fill="#f25022"/><rect x="12" y="4" width="10.5" height="10.5" fill="#7fba00"/><rect x="0" y="16" width="10.5" height="10.5" fill="#00a4ef"/><rect x="12" y="16" width="10.5" height="10.5" fill="#ffb900"/><text x="30" y="21" font-family="'Segoe UI', -apple-system, sans-serif" font-weight="600" font-size="15" fill="#ffffff" letter-spacing="-0.3">Microsoft</text></svg>`,
  "Mahou": `<svg viewBox="0 0 95 34" width="95" height="34" xmlns="http://www.w3.org/2000/svg"><g fill="#ffffff"><polygon points="26,6 27.5,9.5 31,9.8 28.3,12.2 29.1,15.7 26,13.9 22.9,15.7 23.7,12.2 21,9.8 24.5,9.5"/><polygon points="37,4 38.5,7.5 42,7.8 39.3,10.2 40.1,13.7 37,11.9 33.9,13.7 34.7,10.2 32,7.8 35.5,7.5"/><polygon points="48,2 49.8,6 54,6.4 50.8,9.3 51.7,13.5 48,11.3 44.3,13.5 45.2,9.3 42,6.4 46.2,6"/><polygon points="59,4 60.5,7.5 64,7.8 61.3,10.2 62.1,13.7 59,11.9 55.9,13.7 56.7,10.2 54,7.8 57.5,7.5"/><polygon points="70,6 71.5,9.5 75,9.8 72.3,12.2 73.1,15.7 70,13.9 66.9,15.7 67.7,12.2 65,9.8 68.5,9.5"/></g><text x="48" y="28" font-family="'Times New Roman', Georgia, serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle" letter-spacing="1">Mahou</text></svg>`,
  "Riyadh Season": `<svg viewBox="0 0 110 38" width="110" height="38" xmlns="http://www.w3.org/2000/svg"><circle cx="55" cy="11" r="8" fill="none" stroke="#ffffff" stroke-width="1.8"/><path d="M55 1v3M55 17v3M45 11h3M62 11h3M48 4l2.5 2.5M59.5 15.5l2.5 2.5M48 18l2.5-2.5M59.5 6.5l2.5-2.5" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/><text x="55" y="27" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">RIYADH SEASON</text></svg>`,
  "Duracell": `<svg viewBox="0 0 120 30" width="120" height="30" xmlns="http://www.w3.org/2000/svg"><text x="60" y="22" font-family="'Arial Black', Impact, sans-serif" font-weight="900" font-size="17" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">DURACELL</text></svg>`,
  "BKT": `<svg viewBox="0 0 95 34" width="95" height="34" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="87" height="26" rx="4" fill="#ffffff"/><text x="47" y="21" font-family="'Arial Black', sans-serif" font-weight="900" font-size="14" fill="#000000" text-anchor="middle" font-style="italic" letter-spacing="0.5">BKT</text><text x="47" y="27" font-family="sans-serif" font-weight="700" font-size="4.5" fill="#333333" text-anchor="middle" letter-spacing="1">TIRES</text></svg>`,
  "Moeve": `<svg viewBox="0 0 95 32" width="95" height="32" xmlns="http://www.w3.org/2000/svg"><text x="47" y="23" font-family="'Outfit', 'Helvetica Neue', sans-serif" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">moeve</text></svg>`,
  "Volkswagen": `<svg viewBox="0 0 36 36" width="36" height="36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="16.5" fill="none" stroke="#ffffff" stroke-width="2.2"/><circle cx="18" cy="18" r="14.5" fill="none" stroke="#ffffff" stroke-width="0.8"/><path d="M11 9.5l4 12 3-8.5 3 8.5 4-12M12.5 24l5.5-9 5.5 9" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

window.ligamasterAddSponsor = (presetName) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General (Administrador) puede gestionar auspiciadores.', 'error');
    return;
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (!db.sponsors) db.sponsors = [];
  
  let finalName = presetName || 'Nuevo Sponsor';
  if (finalName === 'Personalizado...') {
    finalName = 'Nuevo Sponsor';
  }
  
  const logoDataUrl = resolveBrandLogo(finalName);

  const id = `sponsor-${Date.now()}`;
  db.sponsors.push({ id, name: finalName, logoBase64: logoDataUrl });
  saveDb(db, activeId);
  addAuditLogEntry('Auspiciador Añadido', `Se agregó la marca publicitaria "${finalName}"`);
  showToast(`Auspiciador "${finalName}" añadido con éxito`, 'success');
  renderAdminView();
};

window.ligamasterDeleteSponsor = (id) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General (Administrador) puede eliminar auspiciadores.', 'error');
    return;
  }
  if (!confirm('¿Eliminar este auspiciador?')) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (db.sponsors) {
    const sp = db.sponsors.find(s => s.id === id);
    const spName = sp?.name || id;
    db.sponsors = db.sponsors.filter(s => s.id !== id);
    saveDb(db, activeId);
    addAuditLogEntry('Auspiciador Eliminado', `Se removió la marca publicitaria "${spName}"`);
    showToast(`Auspiciador "${spName}" eliminado`, 'info');
    renderAdminView();
  }
};

window.ligamasterUpdateSponsorName = (id, newName) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General puede modificar auspiciadores.', 'error');
    return;
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const sp = (db.sponsors || []).find(s => s.id === id);
  if (sp) {
    const oldName = sp.name;
    sp.name = newName;
    if (!sp.logoBase64) {
      sp.logoBase64 = resolveBrandLogo(newName);
    }
    saveDb(db, activeId);
    addAuditLogEntry('Auspiciador Modificado', `Marca renombrada de "${oldName}" a "${newName}"`);
    showToast('Nombre actualizado', 'success');
  }
};

window.ligamasterRemoveSponsorLogo = (id) => {
  if (!isAdmin()) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const sp = (db.sponsors || []).find(s => s.id === id);
  if (sp) {
    sp.logoBase64 = null;
    saveDb(db, activeId);
    addAuditLogEntry('Logo Auspiciador Removido', `Se quitó el logo de "${sp.name}"`);
    renderAdminView();
  }
};

window.ligamasterUploadSponsorLogo = (id, inputEl) => {
  if (!isAdmin()) {
    showToast('Acceso Denegado: Solo la Directiva General puede subir logos.', 'error');
    return;
  }
  if (!inputEl.files || inputEl.files.length === 0) return;
  
  const file = inputEl.files[0];
  if (file.size > 500 * 1024) { // Max 500KB
    showToast('El logo es muy pesado. Máximo 500KB.', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const sp = (db.sponsors || []).find(s => s.id === id);
    if (sp) {
      sp.logoBase64 = e.target.result;
      saveDb(db, activeId);
      addAuditLogEntry('Logo Auspiciador Actualizado', `Se cargó logo personalizado para "${sp.name}"`);
      renderAdminView();
      showToast('Logo cargado exitosamente', 'success');
    }
  };
  reader.readAsDataURL(file);
};
