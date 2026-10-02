/**
 * LIGAMASTER - SISTEMA DE NOTIFICACIONES TOAST BROADCAST
 * Feedback no-bloqueante y accesible para acciones de usuario y administración
 */

export function showToast(message, type = 'success') {
  if (typeof document === 'undefined') {
    console.log(`[Toast ${type}]: ${message}`);
    return;
  }

  let container = document.getElementById('ligamaster-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ligamaster-toast-container';
    container.className = 'ligamaster-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `ligamaster-toast ligamaster-toast-${type}`;

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close-btn" aria-label="Cerrar notificación">&times;</button>
  `;

  toast.querySelector('.toast-close-btn')?.addEventListener('click', () => {
    dismissToast(toast);
  });

  container.appendChild(toast);

  // Auto descartar tras 3.8s
  setTimeout(() => {
    dismissToast(toast);
  }, 3800);
}

function dismissToast(toast) {
  if (!toast || !toast.parentElement) return;
  toast.classList.add('fade-out');
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 260);
}

if (typeof window !== 'undefined') {
  window.showToast = showToast;
}
