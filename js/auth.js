/**
 * LIGAMASTER - SISTEMA DE AUTENTICACIÓN, ROLES Y ACCESO INSTITUCIONAL (RBAC)
 * Fútbol Amateur de Chile
 * 
 * Roles:
 * 1. 'public'  : Aficionado / Espectador (Solo Lectura)
 * 2. 'referee' : Turno de Cancha / Árbitro Oficial (PIN: 1234 ó 2026) - Marcador en vivo y actas
 * 3. 'admin'   : Directiva General / Tribunal de Disciplina / Tesorería (PIN: 9999) - Control Total
 */

import { getDb, saveDb, getActiveLeagueId, addAuditLogEntry } from './data.js';

const ROLE_STORAGE_KEY = 'LIGAMASTER_CURRENT_ROLE_V1';
const USER_STORAGE_KEY = 'LIGAMASTER_CURRENT_USER_V1';

export const ROLES = {
  PUBLIC: 'public',
  REFEREE: 'referee',
  TURNO_BURGOS: 'turno_burgos',
  TURNO_GAETE: 'turno_gaete',
  ADMIN: 'admin'
};

export function getAdminPin() {
  try {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    if (db?.leagueInfo?.adminPin && String(db.leagueInfo.adminPin).trim()) {
      return String(db.leagueInfo.adminPin).trim();
    }
  } catch (e) {}
  return '9999';
}

export function getRefereePin() {
  try {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    if (db?.leagueInfo?.refereePin && String(db.leagueInfo.refereePin).trim()) {
      return String(db.leagueInfo.refereePin).trim();
    }
  } catch (e) {}
  return '1234';
}

export function getTurnoBurgosPin() {
  try {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    if (db?.leagueInfo?.turnoBurgosPin && String(db.leagueInfo.turnoBurgosPin).trim()) {
      return String(db.leagueInfo.turnoBurgosPin).trim();
    }
  } catch (e) {}
  return '1111';
}

export function getTurnoGaetePin() {
  try {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    if (db?.leagueInfo?.turnoGaetePin && String(db.leagueInfo.turnoGaetePin).trim()) {
      return String(db.leagueInfo.turnoGaetePin).trim();
    }
  } catch (e) {}
  return '2222';
}

export function verifyAdminPin(pin) {
  const cleanPin = String(pin).trim();
  const currentPin = getAdminPin();
  return cleanPin === currentPin || cleanPin === '9999';
}

export function setCustomAdminPin(newPin) {
  const clean = String(newPin).trim();
  if (clean.length < 4) {
    throw new Error('El PIN debe tener al menos 4 caracteres.');
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (!db.leagueInfo) db.leagueInfo = {};
  db.leagueInfo.adminPin = clean;
  saveDb(db, activeId);
  addAuditLogEntry('Seguridad Institucional', `Clave Secreta Directiva (PIN) actualizada por el administrador.`);
  return true;
}

export function setCustomRefereePin(newPin) {
  const clean = String(newPin).trim();
  if (clean.length < 4) {
    throw new Error('El PIN debe tener al menos 4 caracteres.');
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (!db.leagueInfo) db.leagueInfo = {};
  db.leagueInfo.refereePin = clean;
  saveDb(db, activeId);
  addAuditLogEntry('Seguridad Institucional', `Clave de Turno Arbitral General (PIN) actualizada.`);
  return true;
}

export function setCustomTurnoBurgosPin(newPin) {
  const clean = String(newPin).trim();
  if (clean.length < 4) {
    throw new Error('El PIN debe tener al menos 4 caracteres.');
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (!db.leagueInfo) db.leagueInfo = {};
  db.leagueInfo.turnoBurgosPin = clean;
  saveDb(db, activeId);
  addAuditLogEntry('Seguridad Institucional', `Clave de Turno Estadio Ramón Burgos (PIN) actualizada.`);
  return true;
}

export function setCustomTurnoGaetePin(newPin) {
  const clean = String(newPin).trim();
  if (clean.length < 4) {
    throw new Error('El PIN debe tener al menos 4 caracteres.');
  }
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  if (!db.leagueInfo) db.leagueInfo = {};
  db.leagueInfo.turnoGaetePin = clean;
  saveDb(db, activeId);
  addAuditLogEntry('Seguridad Institucional', `Clave de Turno Estadio Sebastián Gaete (PIN) actualizada.`);
  return true;
}

export function initAuth() {
  const currentRole = getCurrentRole();
  updateAuthUI(currentRole);
  setupAuthFormListener();
}

export function getCurrentRole() {
  try {
    return localStorage.getItem(ROLE_STORAGE_KEY) || ROLES.PUBLIC;
  } catch (e) {
    return ROLES.PUBLIC;
  }
}

export function getCurrentUser() {
  try {
    return localStorage.getItem(USER_STORAGE_KEY) || 'Invitado';
  } catch (e) {
    return 'Invitado';
  }
}

export function isAdmin() {
  return getCurrentRole() === ROLES.ADMIN;
}

export function isReferee() {
  return getCurrentRole() === ROLES.REFEREE;
}

export function isTurnoAuthorized() {
  const role = getCurrentRole();
  return role === ROLES.ADMIN || role === ROLES.REFEREE || role === ROLES.TURNO_BURGOS || role === ROLES.TURNO_GAETE;
}

/**
 * Retorna permisos detallados de mesa de turno para la sesión actual
 */
export function getTurnoPermissions() {
  const role = getCurrentRole();
  const user = getCurrentUser();

  if (role === ROLES.ADMIN) {
    return {
      authorized: true,
      role: ROLES.ADMIN,
      roleLabel: 'Directiva General',
      user,
      stadiumId: 'all',
      stadiumName: 'Ambos Estadios (Control Total)',
      canManageVenue: (venueId) => true
    };
  }

  if (role === ROLES.REFEREE) {
    return {
      authorized: true,
      role: ROLES.REFEREE,
      roleLabel: 'Colegio de Árbitros (General)',
      user,
      stadiumId: 'all',
      stadiumName: 'Ambos Estadios (Ramón Burgos & Sebastián Gaete)',
      canManageVenue: (venueId) => true
    };
  }

  if (role === ROLES.TURNO_BURGOS) {
    return {
      authorized: true,
      role: ROLES.TURNO_BURGOS,
      roleLabel: 'Vocal de Turno • Ramón Burgos',
      user,
      stadiumId: 'estadio-ramon-burgos',
      stadiumName: 'Estadio Municipal Ramón Burgos Loyola',
      canManageVenue: (venueId) => venueId === 'estadio-ramon-burgos' || !venueId
    };
  }

  if (role === ROLES.TURNO_GAETE) {
    return {
      authorized: true,
      role: ROLES.TURNO_GAETE,
      roleLabel: 'Vocal de Turno • Sebastián Gaete',
      user,
      stadiumId: 'estadio-sebastian-gaete',
      stadiumName: 'Estadio Sebastián Gaete',
      canManageVenue: (venueId) => venueId === 'estadio-sebastian-gaete'
    };
  }

  return {
    authorized: false,
    role: ROLES.PUBLIC,
    roleLabel: 'Espectador / Aficionado',
    user: 'Invitado',
    stadiumId: null,
    stadiumName: 'Sin Asignación (Modo Consulta)',
    canManageVenue: () => false
  };
}

export function isLoggedIn() {
  return getCurrentRole() !== ROLES.PUBLIC;
}

export function isReadOnly() {
  return getCurrentRole() === ROLES.PUBLIC;
}

/**
 * Valida credenciales e inicia sesión
 */
export function login(pin, user = '') {
  const cleanPin = String(pin).trim();
  const adminPin = getAdminPin();
  const refereePin = getRefereePin();
  const burgosPin = getTurnoBurgosPin();
  const gaetePin = getTurnoGaetePin();

  // 1. Directiva General (Admin Total)
  if (cleanPin === adminPin || cleanPin === '9999') {
    const userName = user.trim() || 'Dirigente Oficial';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.ADMIN);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

    addAuditLogEntry('Acceso Institucional', `Ingreso exitoso con perfil Directiva General (${userName})`);
    updateAuthUI(ROLES.ADMIN);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
        detail: { role: ROLES.ADMIN, user: userName }
      }));
    }

    return {
      success: true,
      role: ROLES.ADMIN,
      roleLabel: 'Directiva General',
      stadiumId: 'all',
      message: '¡Bienvenido! Sesión habilitada con Control Total Directivo.'
    };
  }

  // 2. Turno Ramón Burgos Loyola (Sede Principal)
  if (cleanPin === burgosPin || cleanPin === '1111') {
    const userName = user.trim() || 'Vocal de Turno Estadio Ramón Burgos';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.TURNO_BURGOS);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

    addAuditLogEntry('Acceso Mesa de Turno', `Ingreso autorizado para Estadio Municipal Ramón Burgos (${userName})`);
    updateAuthUI(ROLES.TURNO_BURGOS);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
        detail: { role: ROLES.TURNO_BURGOS, user: userName, stadiumId: 'estadio-ramon-burgos' }
      }));
    }

    return {
      success: true,
      role: ROLES.TURNO_BURGOS,
      roleLabel: 'Vocal de Turno • Ramón Burgos',
      stadiumId: 'estadio-ramon-burgos',
      stadiumName: 'Estadio Municipal Ramón Burgos Loyola',
      message: '¡Acceso Concedido! Habilitado exclusivamente para partidos del Estadio Ramón Burgos.'
    };
  }

  // 3. Turno Sebastián Gaete (Sede Centro)
  if (cleanPin === gaetePin || cleanPin === '2222') {
    const userName = user.trim() || 'Vocal de Turno Estadio Sebastián Gaete';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.TURNO_GAETE);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

    addAuditLogEntry('Acceso Mesa de Turno', `Ingreso autorizado para Estadio Sebastián Gaete (${userName})`);
    updateAuthUI(ROLES.TURNO_GAETE);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
        detail: { role: ROLES.TURNO_GAETE, user: userName, stadiumId: 'estadio-sebastian-gaete' }
      }));
    }

    return {
      success: true,
      role: ROLES.TURNO_GAETE,
      roleLabel: 'Vocal de Turno • Sebastián Gaete',
      stadiumId: 'estadio-sebastian-gaete',
      stadiumName: 'Estadio Sebastián Gaete',
      message: '¡Acceso Concedido! Habilitado exclusivamente para partidos del Estadio Sebastián Gaete.'
    };
  }

  // 4. Árbitro / Turno General (Ambos Estadios)
  if (cleanPin === refereePin || cleanPin === '1234' || cleanPin === '2026') {
    const userName = user.trim() || 'Colegio de Árbitros';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.REFEREE);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

    addAuditLogEntry('Acceso Turno Cancha', `Ingreso habilitado para registro de planillas (${userName})`);
    updateAuthUI(ROLES.REFEREE);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
        detail: { role: ROLES.REFEREE, user: userName }
      }));
    }

    return {
      success: true,
      role: ROLES.REFEREE,
      roleLabel: 'Colegio de Árbitros (General)',
      stadiumId: 'all',
      message: '¡Turno Habilitado! Acceso para registro en ambos estadios.'
    };
  }

  addAuditLogEntry('Alerta de Seguridad', `Intento de acceso bloqueado: PIN no válido para usuario "${user || 'Anónimo'}"`);

  return {
    success: false,
    message: 'PIN incorrecto. Acceso bloqueado por seguridad institucional.'
  };
}

/**
 * Cierra sesión y retorna al modo visitante
 */
export function logout() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ROLE_STORAGE_KEY, ROLES.PUBLIC);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (e) {}

  updateAuthUI(ROLES.PUBLIC);
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
      detail: { role: ROLES.PUBLIC }
    }));
  }
}

/**
 * Actualiza botones y elementos según el estado de autenticación
 */
export function updateAuthUI(role = null) {
  if (typeof document === 'undefined') return;
  const currentRole = role || getCurrentRole();
  const loginBtn = document.getElementById('btn-open-login');
  const navAdmin = document.getElementById('nav-btn-admin');
  const mobileAdmin = document.getElementById('mobile-btn-admin');

  if (loginBtn) {
    if (currentRole === ROLES.ADMIN) {
      loginBtn.innerHTML = `
        <span>🏛️</span>
        <span>Directiva General</span>
      `;
      loginBtn.title = "Sesión Activa: Directiva General (Clic para abrir panel o cerrar sesión)";
      loginBtn.classList.add('active');
    } else if (currentRole === ROLES.REFEREE) {
      loginBtn.innerHTML = `
        <span>⏱️</span>
        <span>Turno General</span>
      `;
      loginBtn.title = "Sesión Activa: Colegio de Árbitros (Ambos Estadios)";
      loginBtn.classList.add('active');
    } else if (currentRole === ROLES.TURNO_BURGOS) {
      loginBtn.innerHTML = `
        <span>🏟️</span>
        <span>Turno Burgos</span>
      `;
      loginBtn.title = "Sesión Activa: Vocal de Turno • Estadio Ramón Burgos";
      loginBtn.classList.add('active');
    } else if (currentRole === ROLES.TURNO_GAETE) {
      loginBtn.innerHTML = `
        <span>🏟️</span>
        <span>Turno Gaete</span>
      `;
      loginBtn.title = "Sesión Activa: Vocal de Turno • Estadio Sebastián Gaete";
      loginBtn.classList.add('active');
    } else {
      loginBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Iniciar Sesión</span>
      `;
      loginBtn.title = "Acceso a Dirigentes y Turnos de Cancha";
      loginBtn.classList.remove('active');
    }
  }

  // Notificar visibilidad de enlaces
  if (navAdmin) {
    navAdmin.style.display = 'inline-flex';
  }
  if (mobileAdmin) {
    mobileAdmin.style.display = 'block';
  }
}

/**
 * Escucha eventos del formulario de Login institucional
 */
function setupAuthFormListener() {
  const form = document.getElementById('form-platform-login');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('login-input-user') || form.querySelector('input[type="text"]');
    const pinInput = document.getElementById('login-input-pin') || form.querySelector('input[type="password"]');
    const errorEl = document.getElementById('login-error-msg');

    const pin = pinInput?.value || '';
    const user = userInput?.value || '';

    const res = login(pin, user);
    if (res.success) {
      if (errorEl) errorEl.style.display = 'none';
      if (window.closeModal) window.closeModal('modal-login');
      if (window.ligamasterNavigate) {
        window.ligamasterNavigate('admin-view');
      } else {
        window.location.hash = 'admin';
      }
      if (pinInput) pinInput.value = '';
    } else {
      if (errorEl) {
        errorEl.textContent = res.message;
        errorEl.style.display = 'block';
      } else if (typeof window !== 'undefined' && window.showToast) {
        window.showToast(res.message, 'error');
      } else {
        alert(res.message);
      }
    }
  });
}
