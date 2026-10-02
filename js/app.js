/**
 * LigaPro Amateur - Controlador Principal de la Aplicación
 * Asociación de Fútbol Amateur de Arauco (ANFA Biobío)
 */

import { getDb, resetDb, exportDbAsJson, importDbFromJson, AVAILABLE_ASSOCIATIONS, getActiveAssociation, switchAssociation } from './data.js';
import { initAuth, getCurrentRole } from './auth.js';
import { initPapeleta, renderPapeletaHeader, renderPapeletaRoster, renderPapeletaTimeline, renderMulticanchaBar, saveEventFromModal } from './papeleta.js';
import { renderStandingsView, renderTopScorersView, initLaLigaStats, renderLaLigaStatsTable } from './standings.js';
import { getClubBadgeSvg } from './badges.js';
import { initPlayersModule, renderPlayersView, renderSanctionsView, renderClubsHistoryView, renderRegulationsView } from './players.js';
import { initVenuesModule, renderVenuesView } from './venues.js';
import { initSeleccionModule, renderSeleccionView } from './seleccion.js';
import { initTreasuryModule, renderTreasuryOverview, renderTransactionsTable } from './treasury.js';
import { initCMS } from './cms.js';
import { initNewsModule, renderNewsView } from './news.js';
import { initNotificationsModule, testGoalAlertDemo } from './notifications.js';
import { initRealtimeSync } from './realtime.js';

// Notificación Toast Global
window.showToast = function(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚽</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  initAuth();
  initRealtimeSync();
  initNotificationsModule();
  window.testGoalAlert = testGoalAlertDemo;

  // Registrar Service Worker para PWA y alertas en segundo plano
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  initNewsModule();
  setupNavigationTabs();
  setupAssociationSwitcher();
  renderWebClubesStrip();
  initPapeleta();
  renderStandingsView();
  renderTopScorersView();
  initLaLigaStats();
  initPlayersModule();
  renderFixtureView();
  initVenuesModule();
  initSeleccionModule();
  initTreasuryModule();
  initCMS();
  setupGlobalModals();
  setupResetButton();
  setupDatabaseBackupControls();
  setupGoalCelebration();
}

/**
 * Cambio Centralizado de Pestaña (Escritorio + Móvil + PWA)
 */
export function switchTab(targetViewId) {
  if (!targetViewId) return;

  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const mobileNavButtons = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn[data-target]');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item[data-target]');
  const tabViews = document.querySelectorAll('.tab-view');

  tabButtons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-target') === targetViewId);
  });

  mobileNavButtons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-target') === targetViewId);
  });

  mobileMenuItems.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-target') === targetViewId);
  });

  tabViews.forEach(v => {
    v.classList.toggle('active', v.id === targetViewId);
  });

  // Cerrar bottom sheet de menú móvil si está abierto
  const modalMobileMenu = document.getElementById('modal-mobile-menu');
  if (modalMobileMenu) {
    modalMobileMenu.classList.remove('active');
  }

  // Desplazamiento suave al inicio de la página en móvil
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Sincronización en tiempo real al cambiar de pestaña
  if (targetViewId === 'news-view') {
    renderNewsView();
  } else if (targetViewId === 'papeleta-view') {
    renderMulticanchaBar();
    renderPapeletaHeader();
    renderPapeletaRoster();
    renderPapeletaTimeline();
  } else if (targetViewId === 'standings-view') {
    renderStandingsView();
    renderTopScorersView();
    renderLaLigaStatsTable();
  } else if (targetViewId === 'players-view') {
    renderPlayersView();
  } else if (targetViewId === 'clubs-view') {
    renderClubsHistoryView();
  } else if (targetViewId === 'regulations-view') {
    renderRegulationsView();
  } else if (targetViewId === 'sanctions-view') {
    renderSanctionsView();
  } else if (targetViewId === 'fixture-view') {
    renderFixtureView();
  } else if (targetViewId === 'venues-view') {
    renderVenuesView();
  } else if (targetViewId === 'seleccion-view') {
    renderSeleccionView();
  } else if (targetViewId === 'treasury-view') {
    renderTreasuryOverview();
    renderTransactionsTable();
  }
}

/**
 * Control de Navegación entre Pestañas (Escritorio y Móvil)
 */
function setupNavigationTabs() {
  window.ligaproSwitchTab = switchTab;

  // 1. Pestañas de escritorio
  const desktopButtons = document.querySelectorAll('.nav-tab-btn');
  desktopButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetViewId = btn.getAttribute('data-target');
      switchTab(targetViewId);
    });
  });

  // 2. Barra fija inferior para celulares (Bottom Tab Bar)
  const mobileNavButtons = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn[data-target]');
  mobileNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetViewId = btn.getAttribute('data-target');
      switchTab(targetViewId);
    });
  });

  // 3. Botón "Más" y Bottom Sheet de navegación en celular
  const btnMoreMenu = document.getElementById('btn-mobile-more-menu');
  const modalMobileMenu = document.getElementById('modal-mobile-menu');
  const btnCloseMobileMenu = document.getElementById('modal-mobile-menu-close');

  if (btnMoreMenu && modalMobileMenu) {
    btnMoreMenu.addEventListener('click', () => {
      modalMobileMenu.classList.add('active');
    });
  }

  if (btnCloseMobileMenu && modalMobileMenu) {
    btnCloseMobileMenu.addEventListener('click', () => {
      modalMobileMenu.classList.remove('active');
    });
  }

  if (modalMobileMenu) {
    modalMobileMenu.addEventListener('click', (e) => {
      if (e.target === modalMobileMenu) {
        modalMobileMenu.classList.remove('active');
      }
    });
  }

  // 4. Elementos dentro del Bottom Sheet
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item[data-target]');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetViewId = item.getAttribute('data-target');
      switchTab(targetViewId);
    });
  });

  // 5. Botones de acción rápida dentro del menú móvil (Compartir y Cambiar Rol)
  const btnMobileShare = document.getElementById('btn-mobile-share-app');
  if (btnMobileShare) {
    btnMobileShare.addEventListener('click', () => {
      if (modalMobileMenu) modalMobileMenu.classList.remove('active');
      const shareModal = document.getElementById('modal-share');
      if (shareModal) shareModal.classList.add('active');
    });
  }

  const btnMobileRole = document.getElementById('btn-mobile-change-role');
  if (btnMobileRole) {
    btnMobileRole.addEventListener('click', () => {
      if (modalMobileMenu) modalMobileMenu.classList.remove('active');
      const welcomePortal = document.getElementById('modal-welcome-portal');
      const loginModal = document.getElementById('modal-login');
      if (welcomePortal) {
        welcomePortal.classList.add('active');
      } else if (loginModal) {
        loginModal.classList.add('active');
      }
    });
  }
}

/**
 * Renderiza el Fixture Oficial de ANFA Arauco
 */
function renderFixtureView() {
  const container = document.getElementById('fixture-matches-list');
  if (!container) return;

  const db = getDb();
  const clubsMap = {};
  db.clubs.forEach(c => { clubsMap[c.id] = c; });

  let html = '';
  db.matches.forEach(m => {
    const home = clubsMap[m.homeClubId] || { name: 'Local', badgeEmoji: '⚓' };
    const away = clubsMap[m.awayClubId] || { name: 'Visita', badgeEmoji: '🌊' };

    let statusPill = `<span class="status-badge habilitado">Programado</span>`;
    if (m.status === 'en_vivo') {
      statusPill = `<span class="badge-live">EN VIVO</span>`;
    } else if (m.status === 'finalizado') {
      statusPill = `<span class="status-badge" style="background: rgba(59,130,246,0.15); color: #93c5fd;">Finalizado</span>`;
    }

    html += `
      <div class="content-card" style="margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div style="flex: 1; min-width: 250px;">
          <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase;">
            ${m.round} • ${m.date}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            📍 ${m.venue} • 👔 Árbitro: ${m.referee}
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; font-size: 1.1rem; font-weight: 800;">
            <div style="flex: 1; text-align: right;">${home.name} ${home.badgeEmoji}</div>
            <div style="background: rgba(0,0,0,0.4); padding: 0.2rem 0.8rem; border-radius: 6px; font-family: var(--font-display); color: ${m.status === 'en_vivo' ? 'var(--accent-pitch)' : 'inherit'};">
              ${m.status === 'programado' ? 'vs' : `${m.homeScore} - ${m.awayScore}`}
            </div>
            <div style="flex: 1; text-align: left;">${away.badgeEmoji} ${away.name}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          ${statusPill}
          <button class="btn btn-sm ${m.status === 'en_vivo' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ligaproSelectMatch('${m.id}'); document.querySelector('[data-target=\\'papeleta-view\\']')?.click();">
            ${m.status === 'en_vivo' ? '🔴 Seguir Cancha en Vivo' : '🔍 Ver Ficha del Partido'}
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Modales Globales
 */
function setupGlobalModals() {
  const eventModalBackdrop = document.getElementById('modal-event-backdrop');
  const eventModalClose = document.getElementById('modal-event-close');
  const eventModalCancel = document.getElementById('modal-event-cancel');
  const eventModalSave = document.getElementById('modal-event-save');

  eventModalClose?.addEventListener('click', () => eventModalBackdrop?.classList.remove('active'));
  eventModalCancel?.addEventListener('click', () => eventModalBackdrop?.classList.remove('active'));
  eventModalSave?.addEventListener('click', () => saveEventFromModal());

  window.addEventListener('click', (e) => {
    if (e.target === eventModalBackdrop) {
      eventModalBackdrop.classList.remove('active');
    }
    const sheetModal = document.getElementById('modal-view-sheet-backdrop');
    if (e.target === sheetModal) {
      sheetModal.classList.remove('active');
    }
    const roleModal = document.getElementById('modal-role-backdrop');
    if (e.target === roleModal) {
      roleModal.classList.remove('active');
    }
    const shareModal = document.getElementById('modal-share-social-backdrop');
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
    }
    const demoModal = document.getElementById('modal-request-demo-backdrop');
    if (e.target === demoModal) {
      demoModal.classList.remove('active');
    }
  });
}

/**
 * Configuración del Selector de Asociaciones (Multi-Comuna)
 */
function setupAssociationSwitcher() {
  const select = document.getElementById('select-active-association');
  const activeAssocId = getActiveAssociation();

  if (select) {
    select.innerHTML = AVAILABLE_ASSOCIATIONS.map(a => 
      `<option value="${a.id}" ${a.id === activeAssocId ? 'selected' : ''}>${a.name} (${a.region})</option>`
    ).join('');

    select.addEventListener('change', (e) => {
      const targetId = e.target.value;
      switchAssociation(targetId);
      const selectedName = select.options[select.selectedIndex]?.text || targetId;
      window.showToast(`Demostración adaptada a: ${selectedName}`);
    });
  }

  // Botones de cambio rápido en el panel comercial de la vista "business-view"
  document.querySelectorAll('.btn-switch-demo').forEach(btn => {
    btn.addEventListener('click', () => {
      const assocId = btn.getAttribute('data-assoc');
      if (assocId) {
        switchAssociation(assocId);
        if (select) select.value = assocId;
        window.showToast(`Cargando datos oficiales de demostración: ${assocId.toUpperCase()}`);
        document.querySelector('[data-target="papeleta-view"]')?.click();
      }
    });
  });

  // Evento global cuando cambia la asociación activa
  window.addEventListener('ligapro:association-changed', (e) => {
    const db = getDb();
    const assocId = e.detail;

    if (select && select.value !== assocId) {
      select.value = assocId;
    }

    // Actualizar encabezados
    const titleEl = document.getElementById('header-league-title');
    if (titleEl) titleEl.textContent = db.leagueInfo.name;
    const subEl = document.getElementById('header-league-subtitle');
    if (subEl) subEl.textContent = `${db.leagueInfo.shortName} • ${db.leagueInfo.season || 'Temporada Oficial'}`;

    // Re-renderizar módulos con la nueva asociación
    renderPapeletaHeader();
    renderStandingsView();
    renderTopScorersView();
    renderFixtureView();
    renderClubsHistoryView();
    renderPlayersView();
    renderSanctionsView();
    renderRegulationsView();
    renderVenuesView();
    renderSeleccionView();
  });
}

/**
 * Modales de Difusión en Redes Sociales y Solicitud de Demostración Comercial
 */
function setupCommercialAndSocialModals() {
  const shareModal = document.getElementById('modal-share-social-backdrop');
  const shareOpenBtn = document.getElementById('btn-open-share-modal');
  const heroShareBtn = document.getElementById('btn-hero-share');
  const shareCloseBtn = document.getElementById('modal-share-social-close');
  const shareCancelBtn = document.getElementById('modal-share-social-cancel');

  const openShare = () => shareModal?.classList.add('active');
  const closeShare = () => shareModal?.classList.remove('active');

  shareOpenBtn?.addEventListener('click', openShare);
  heroShareBtn?.addEventListener('click', openShare);
  shareCloseBtn?.addEventListener('click', closeShare);
  shareCancelBtn?.addEventListener('click', closeShare);

  // Modal QR para celular
  const qrModal = document.getElementById('modal-mobile-qr');
  const qrOpenBtn = document.getElementById('btn-open-mobile-qr');
  const qrCloseBtn = document.getElementById('modal-mobile-qr-close');
  qrOpenBtn?.addEventListener('click', () => {
    const currentUrl = window.location.origin && window.location.origin.startsWith('http') ? window.location.href : 'https://ligamaster.app';
    const qrImg = document.getElementById('modal-qr-img');
    const qrCode = document.getElementById('modal-qr-code-text');
    const qrIpUrl = document.getElementById('qr-ip-url');
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`;
    if (qrCode) qrCode.textContent = currentUrl;
    if (qrIpUrl) qrIpUrl.textContent = currentUrl;
    qrModal?.classList.add('active');
  });
  qrCloseBtn?.addEventListener('click', () => qrModal?.classList.remove('active'));

  const demoModal = document.getElementById('modal-request-demo-backdrop');
  const demoOpenBtn = document.getElementById('btn-open-demo-modal');
  const heroDemoBtn = document.getElementById('btn-hero-whatsapp');
  const demoCloseBtn = document.getElementById('modal-request-demo-close');
  const demoCancelBtn = document.getElementById('modal-request-demo-cancel');

  const openDemo = () => demoModal?.classList.add('active');
  const closeDemo = () => demoModal?.classList.remove('active');

  demoOpenBtn?.addEventListener('click', openDemo);
  heroDemoBtn?.addEventListener('click', openDemo);
  demoCloseBtn?.addEventListener('click', closeDemo);
  demoCancelBtn?.addEventListener('click', closeDemo);

  // Botones para elegir planes de contratación
  document.querySelectorAll('.btn-choose-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      const planSelect = document.getElementById('demo-contact-plan');
      if (planSelect && plan) {
        let found = false;
        for (let i = 0; i < planSelect.options.length; i++) {
          if (planSelect.options[i].value.includes(plan) || plan.includes(planSelect.options[i].value)) {
            planSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          const opt = new Option(plan, plan, true, true);
          planSelect.add(opt);
        }
      }
      openDemo();
    });
  });

  // Botones de 1-clic para copiar textos al portapapeles
  document.querySelectorAll('.btn-copy-text').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const text = (targetEl.innerText || targetEl.textContent || '').trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            const orig = btn.textContent;
            btn.textContent = '¡Copiado! ✓';
            setTimeout(() => { btn.textContent = orig; }, 2000);
            window.showToast('📋 Texto copiado al portapapeles. ¡Listo para pegar!');
          }).catch(() => fallbackCopy(text, btn));
        } else {
          fallbackCopy(text, btn);
        }
      }
    });
  });

  function fallbackCopy(text, btn) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      const orig = btn.textContent;
      btn.textContent = '¡Copiado! ✓';
      setTimeout(() => { btn.textContent = orig; }, 2000);
      window.showToast('📋 Texto copiado al portapapeles.');
    } catch(e) {
      window.showToast('Error al copiar automáticamente.');
    }
    document.body.removeChild(ta);
  }

  // Formulario de solicitud de demostración comercial vía WhatsApp
  const demoForm = document.getElementById('form-request-demo');
  demoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('demo-contact-name')?.value || 'Dirigente Deportivo';
    const league = document.getElementById('demo-contact-league')?.value || 'Asociación ANFA';
    const role = document.getElementById('demo-contact-role')?.value || 'Directiva';
    const plan = document.getElementById('demo-contact-plan')?.value || 'Plan Pro Asociación';

    const msg = `¡Hola! Me contacto para solicitar una demostración oficial de LigaPro Amateur para nuestra liga:\n\n` +
      `👤 Nombre: ${name}\n` +
      `⚽ Asociación / Comuna: ${league}\n` +
      `📋 Cargo o Rol: ${role}\n` +
      `💎 Plan de Interés: ${plan}\n\n` +
      `Quisiéramos conocer los detalles para implementarlo en nuestro próximo campeonato ANFA.`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    closeDemo();
    window.showToast('📲 Abriendo WhatsApp con los datos de tu asociación...');
  });
}

/**
 * Botón para reiniciar datos demo oficiales de Arauco
 */
function setupResetButton() {
  const resetBtn = document.getElementById('btn-reset-demo');
  resetBtn?.addEventListener('click', () => {
    if (confirm("¿Deseas reiniciar los datos a la demostración oficial de ANFA Arauco? Esto es ideal para una nueva presentación.")) {
      resetDb();
      initApp();
      window.showToast("Datos de ANFA Arauco reiniciados con éxito.");
    }
  });
}

/**
 * Controles de Copia de Seguridad y Restauración de Base de Datos
 */
function setupDatabaseBackupControls() {
  document.getElementById('btn-export-full-db')?.addEventListener('click', () => {
    exportDbAsJson();
    if (window.showToast) window.showToast("Copia de seguridad oficial descargada en archivo JSON.");
  });

  const importInput = document.getElementById('input-import-db');
  importInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = importDbFromJson(event.target.result);
        if (result.success) {
          initApp();
          if (window.showToast) window.showToast(result.message);
        } else {
          alert(result.message);
        }
      };
      reader.readAsText(file);
    }
  });

  document.getElementById('btn-reset-full-db')?.addEventListener('click', () => {
    if (confirm("¿Estás seguro de restablecer todos los datos al estado oficial de demostración de ANFA Arauco?")) {
      resetDb();
      initApp();
      if (window.showToast) window.showToast("Base de datos comunal restablecida a la demo oficial.");
    }
  });
}

/**
 * Efectos Visuales: Zumbido y Celebración de Goles (Fase 1)
 */
function setupGoalCelebration() {
  document.addEventListener('ligapro:goal-scored', (e) => {
    const { playerName, playerNumber } = e.detail;
    const overlay = document.getElementById('goal-celebration-overlay');
    const playerText = document.getElementById('goal-celebration-player');
    
    if (overlay && playerText) {
      playerText.textContent = `#${playerNumber} - ${playerName}`;
      
      // Activar overlay
      overlay.classList.add('active');
      
      // Activar zumbido MSN en el body
      document.body.classList.add('buzz-active');
      
      // Limpiar después de 3.5 segundos
      setTimeout(() => {
        overlay.classList.remove('active');
        document.body.classList.remove('buzz-active');
      }, 3500);
    }
  });
}

/**
 * Tira Superior Web Clubes (Estilo LaLiga EA Sports)
 * Muestra los 10 clubes oficiales en miniatura circular interactiva
 */
export function renderWebClubesStrip() {
  const container = document.getElementById('laliga-clubes-list');
  if (!container) return;
  const db = getDb();
  let html = '';
  db.clubs.forEach(c => {
    html += `
      <button class="laliga-club-item" onclick="window.ligaproSelectClub('${c.id}'); document.querySelector('[data-target=\\'players-view\\']')?.click();" title="${c.name} • Fundado: ${c.exactFoundationDate}">
        <span style="display: inline-flex; align-items: center;">${getClubBadgeSvg(c.id, 28)}</span>
        <span class="club-mini-name">${c.shortName}</span>
      </button>
    `;
  });
  container.innerHTML = html;
}


