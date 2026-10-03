/**
 * LIGAMASTER - SISTEMA DE AUTENTICACIÓN, ROLES Y ACCESO INSTITUCIONAL (RBAC)
 * Fútbol Amateur de Chile
 * 
 * Roles:
 * 1. 'public'  : Aficionado / Espectador (Solo Lectura)
 * 2. 'referee' : Turno de Cancha / Árbitro Oficial (PIN: 1234 ó 2026) - Marcador en vivo y actas
 * 3. 'admin'   : Directiva General / Tribunal de Disciplina / Tesorería (PIN: 9999) - Control Total
 */

const ROLE_STORAGE_KEY = 'LIGAMASTER_CURRENT_ROLE_V1';
const USER_STORAGE_KEY = 'LIGAMASTER_CURRENT_USER_V1';

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
  const userName = user.trim() || 'Dirigente Oficial';

  if (PINS.ADMIN.includes(cleanPin)) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.ADMIN);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

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
      message: '¡Bienvenido! Sesión habilitada con Control Total Directivo.'
    };
  }

  if (PINS.REFEREE.includes(cleanPin)) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.REFEREE);
        localStorage.setItem(USER_STORAGE_KEY, userName);
      }
    } catch (e) {}

    updateAuthUI(ROLES.REFEREE);
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ligamaster:auth-changed', {
        detail: { role: ROLES.REFEREE, user: userName }
      }));
    }

    return {
      success: true,
      role: ROLES.REFEREE,
      roleLabel: 'Turno Oficial de Cancha',
      message: '¡Turno Habilitado! Acceso para registro de marcador y planillas.'
    };
  }

  return {
    success: false,
    message: 'PIN incorrecto. Ingrese 9999 para Directiva General o 1234 para Turno de Cancha.'
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
        <span>Turno Cancha</span>
      `;
      loginBtn.title = "Sesión Activa: Turno Oficial de Cancha";
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
