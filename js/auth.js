/**
 * LigaPro Amateur - Sistema de Autenticación, Roles y Permisos (RBAC)
 * Asociación ANFA Arauco
 * 
 * Roles:
 * 1. 'public'  : Modo Hincha / Espectador (Solo Lectura) - Candado de protección activo
 * 2. 'referee' : Turno de Cancha / Árbitro Oficial (PIN: 1234 ó 2026) - Aislado a su recinto asignado
 * 3. 'admin'   : Directiva ANFA Arauco / Tribunal de Penas (PIN: 9999) - Control Total
 */

import { getDb, setActiveMatch } from './data.js';

const ROLE_STORAGE_KEY = 'LIGAPRO_CURRENT_ROLE_V2';
const ASSIGNED_MATCH_KEY = 'LIGAPRO_ASSIGNED_MATCH_V2';

export const ROLES = {
  PUBLIC: 'public',
  REFEREE: 'referee',
  ADMIN: 'admin'
};

const PINS = {
  REFEREE: ['1234', '2026'],
  ADMIN: ['9999']
};

export function initAuth() {
  const currentRole = getCurrentRole();
  updateRoleUI(currentRole);
  setupAuthModalListeners();
  setupWelcomePortal();
}

export function getCurrentRole() {
  return localStorage.getItem(ROLE_STORAGE_KEY) || ROLES.PUBLIC;
}

export function getAssignedMatchId() {
  return localStorage.getItem(ASSIGNED_MATCH_KEY) || 'match-arauco-01';
}

export function isReadOnly() {
  return getCurrentRole() === ROLES.PUBLIC;
}

/**
 * Valida si el usuario actual tiene permisos de edición sobre un partido específico.
 * - Admin: Puede editar cualquier partido.
 * - Turno (Referee): Solo puede editar el partido de la cancha que tiene asignada.
 */
export function canEditMatch(matchId = null) {
  const role = getCurrentRole();
  if (role === ROLES.ADMIN) return true;
  if (role === ROLES.REFEREE) {
    if (!matchId) return true;
    return matchId === getAssignedMatchId();
  }
  return false;
}

export function canManageSanctions() {
  return getCurrentRole() === ROLES.ADMIN;
}

export function switchRole(targetRole, enteredPin = '', assignedMatchId = null) {
  if (targetRole === ROLES.PUBLIC) {
    localStorage.setItem(ROLE_STORAGE_KEY, ROLES.PUBLIC);
    updateRoleUI(ROLES.PUBLIC);
    if (window.showToast) window.showToast('⚽ Modo Aficionado / Visita: Acceso completo a Sala de Prensa y Partidos');
    return { success: true };
  }

  if (targetRole === ROLES.REFEREE) {
    const isValidPin = PINS.REFEREE.includes(enteredPin) || PINS.ADMIN.includes(enteredPin);
    if (isValidPin) {
      localStorage.setItem(ROLE_STORAGE_KEY, ROLES.REFEREE);
      const matchToAssign = assignedMatchId || getAssignedMatchId();
      localStorage.setItem(ASSIGNED_MATCH_KEY, matchToAssign);
      
      setActiveMatch(matchToAssign);
      updateRoleUI(ROLES.REFEREE);

      const db = getDb();
      const matchObj = db.matches?.find(m => m.id === matchToAssign);
      const venueName = matchObj ? matchObj.venue : 'Cancha Oficial';
      if (window.showToast) window.showToast(`⏱️ Turno de Cancha Habilitado en: ${venueName}`);
      return { success: true };
    }
    return { success: false, message: 'PIN incorrecto. (PIN de Árbitro/Turno: 1234 ó 2026)' };
  }

  if (targetRole === ROLES.ADMIN) {
    if (PINS.ADMIN.includes(enteredPin)) {
      localStorage.setItem(ROLE_STORAGE_KEY, ROLES.ADMIN);
      updateRoleUI(ROLES.ADMIN);
      if (window.showToast) window.showToast('🏛️ Modo Directiva ANFA Habilitado (Control Total)');
      return { success: true };
    }
    return { success: false, message: 'PIN incorrecto. (PIN de Directiva ANFA: 9999)' };
  }

  return { success: false, message: 'Rol no válido' };
}

/**
 * Actualiza los elementos de la interfaz según el rol activo y cancha asignada
 */
export function updateRoleUI(role) {
  const roleLabel = document.getElementById('current-role-label');
  const headerLoginBtn = document.getElementById('btn-header-login');

  const db = getDb();
  const assignedId = getAssignedMatchId();
  const assignedMatch = db.matches?.find(m => m.id === assignedId);
  const venueShort = assignedMatch?.venueId === 'estadio-sebastian-gaete' 
    ? 'Est. Sebastián Gaete' 
    : 'Est. Ramón Burgos';

  if (roleLabel) {
    if (role === ROLES.PUBLIC) {
      roleLabel.textContent = 'Perfil: Visita / Cambiar';
    } else if (role === ROLES.REFEREE) {
      roleLabel.textContent = `⏱️ Árbitro (${venueShort})`;
    } else if (role === ROLES.ADMIN) {
      roleLabel.textContent = '🏛️ Directiva ANFA';
    }
  }

  if (headerLoginBtn) {
    if (role === ROLES.PUBLIC) {
      headerLoginBtn.className = 'btn btn-sm btn-login btn-fifa-glow';
      headerLoginBtn.innerHTML = `<span>⚡</span> <span id="current-role-label">Perfil: Visita / Cambiar</span>`;
      headerLoginBtn.title = "Cambiar calidad de acceso (Visita / Árbitro / Directiva)";
    } else if (role === ROLES.REFEREE) {
      headerLoginBtn.className = 'btn btn-sm btn-secondary';
      headerLoginBtn.innerHTML = `<span>⏱️</span> <span id="current-role-label">Turno: ${venueShort}</span> <span class="btn-logout-trigger" title="Cambiar perfil" style="margin-left: 6px; font-weight: 800;">✕</span>`;
      headerLoginBtn.title = `Sesión activa de Turno en ${venueShort}. Clic para cambiar de calidad.`;
    } else if (role === ROLES.ADMIN) {
      headerLoginBtn.className = 'btn btn-sm btn-secondary';
      headerLoginBtn.innerHTML = `<span>🏛️</span> <span id="current-role-label">Directiva ANFA</span> <span class="btn-logout-trigger" title="Cambiar perfil" style="margin-left: 6px; font-weight: 800;">✕</span>`;
      headerLoginBtn.title = "Sesión activa de Directiva ANFA. Clic para cambiar de calidad.";
    }
  }

  // Ocultar pestañas privadas de tesorería y base de datos al público general
  const treasuryTab = document.getElementById('tab-btn-treasury');
  const backupTab = document.getElementById('tab-btn-backup');
  const cmsTab = document.getElementById('tab-btn-cms');
  const isAdmin = role === ROLES.ADMIN;
  const isReferee = role === ROLES.REFEREE;

  if (treasuryTab) treasuryTab.style.display = isAdmin ? 'inline-flex' : 'none';
  if (backupTab) backupTab.style.display = isAdmin ? 'inline-flex' : 'none';
  if (cmsTab) cmsTab.style.display = (isAdmin || isReferee) ? 'inline-flex' : 'none';

  // Opciones de administración en el menú móvil (Bottom Sheet)
  const mobileTreasury = document.getElementById('mobile-menu-treasury');
  const mobileCms = document.getElementById('mobile-menu-cms');
  if (mobileTreasury) mobileTreasury.style.display = isAdmin ? 'flex' : 'none';
  if (mobileCms) mobileCms.style.display = (isAdmin || isReferee) ? 'flex' : 'none';

  // Barra de herramientas del Turno para el partido activo
  const turnoBar = document.getElementById('turno-operator-bar');
  if (turnoBar) {
    turnoBar.style.display = (isAdmin || isReferee) ? 'flex' : 'none';
  }

  // Ocultar banner de bloqueo en modo visita para una experiencia más limpia
  const lockBanner = document.getElementById('papeleta-lock-notice');
  if (lockBanner) {
    lockBanner.style.display = 'none';
  }

  // Si no es admin y está visualizando una pestaña privada de tesorería/bd, redirigir a noticias
  if (!isAdmin) {
    const activeView = document.querySelector('.tab-view.active');
    if (activeView && (activeView.id === 'treasury-view' || activeView.id === 'backup-view')) {
      document.querySelector('[data-target="news-view"]')?.click();
    }
  }

  // Si es público, ocultar también CMS
  if (role === ROLES.PUBLIC) {
    const activeView = document.querySelector('.tab-view.active');
    if (activeView && activeView.id === 'cms-view') {
      document.querySelector('[data-target="news-view"]')?.click();
    }
  }

  // Notificar a todos los módulos para actualizar botones bloqueados/visibles
  window.dispatchEvent(new CustomEvent('ligapro:role-changed', { detail: { role } }));
}

/**
 * Configuración del Portal de Bienvenida FIFA y selección de experiencia
 */
function setupWelcomePortal() {
  const portalModal = document.getElementById('modal-welcome-portal');
  const headerLoginBtn = document.getElementById('btn-header-login');
  const pinContainer = document.getElementById('welcome-pin-form-container');
  const pinInput = document.getElementById('welcome-input-pin');
  const pinTitle = document.getElementById('welcome-pin-title');
  const pinError = document.getElementById('welcome-pin-error');
  const submitPinBtn = document.getElementById('welcome-btn-submit-pin');

  let pendingRole = null;

  // Abrir portal al pulsar el botón de perfil
  headerLoginBtn?.addEventListener('click', (e) => {
    if (e?.target?.classList?.contains('btn-logout-trigger')) {
      e.stopPropagation();
      switchRole(ROLES.PUBLIC);
      return;
    }
    portalModal?.classList.add('active');
    if (pinContainer) pinContainer.style.display = 'none';
  });

  // Mostrar automáticamente el portal de bienvenida si es la primera visita
  if (!localStorage.getItem('LIGAPRO_PORTAL_SHOWN_V2')) {
    setTimeout(() => {
      portalModal?.classList.add('active');
    }, 450);
  }

  // Selección de experiencia Aficionado / Visita
  window.ligaproSelectExperience = (role) => {
    localStorage.setItem('LIGAPRO_PORTAL_SHOWN_V2', 'true');
    switchRole(ROLES.PUBLIC);
    portalModal?.classList.remove('active');
    document.querySelector('[data-target="news-view"]')?.click();
  };

  // Solicitar PIN para Árbitro o Directiva
  window.ligaproPromptRolePin = (role) => {
    pendingRole = role;
    if (pinContainer) {
      pinContainer.style.display = 'block';
      if (pinTitle) {
        pinTitle.textContent = role === 'referee' 
          ? '⏱️ Acceso Árbitro de Turno (PIN: 1234)' 
          : '🏛️ Acceso Mesa Directiva ANFA (PIN: 9999)';
      }
      if (pinError) pinError.style.display = 'none';
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  };

  submitPinBtn?.addEventListener('click', () => {
    const pin = (pinInput?.value || '').trim();
    if (!pendingRole) return;

    const res = switchRole(pendingRole, pin);
    if (res.success) {
      localStorage.setItem('LIGAPRO_PORTAL_SHOWN_V2', 'true');
      portalModal?.classList.remove('active');
      if (pendingRole === 'referee') {
        document.querySelector('[data-target="cms-view"]')?.click();
      } else if (pendingRole === 'admin') {
        document.querySelector('[data-target="news-view"]')?.click();
      }
    } else {
      if (pinError) {
        pinError.textContent = res.message || 'Credencial incorrecta';
        pinError.style.display = 'block';
      }
    }
  });

  pinInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitPinBtn?.click();
  });
}

function setupAuthModalListeners() {
  const roleTriggerBtn = document.getElementById('btn-open-role-modal');
  const portalModal = document.getElementById('modal-welcome-portal');
  roleTriggerBtn?.addEventListener('click', () => {
    portalModal?.classList.add('active');
  });
}
