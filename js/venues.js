/**
 * LigaPro Amateur - Módulo de Canchas y Estadios Oficiales
 * Asociación de Fútbol Amateur de Arauco (ANFA Biobío)
 * 
 * Recintos Oficiales:
 * 1. Estadio Municipal Ramón Burgos (Pasto Sintético, Iluminación LED, Principal)
 * 2. Estadio Sebastián Gaete (Pasto Sintético, Céntrico)
 * 3. Cancha El Sausalito (Pasto Natural, Reabierta 2026, solo 3 usos en el año por lluvia)
 */

import { getDb, getVenues, updateVenueStatus } from './data.js';
import { canManageSanctions } from './auth.js';

export function initVenuesModule() {
  renderVenuesView();
}

/**
 * Renderiza la sección completa de Canchas y Recintos Deportivos
 */
export function renderVenuesView() {
  const container = document.getElementById('venues-container');
  if (!container) return;

  const db = getDb();
  const venues = getVenues();
  const matches = db.matches || [];

  let html = `
    <!-- Banner Informativo Oficial de Canchas -->
    <div class="content-card" style="margin-bottom: 2rem; border-left: 4px solid var(--accent-pitch); background: linear-gradient(135deg, rgba(7,20,15,0.85) 0%, rgba(13,21,34,0.95) 100%);">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.4rem;">
            <span style="font-size: 1.4rem;">🏟️</span>
            <h3 style="margin: 0; font-size: 1.25rem; color: #fff;">Recintos Deportivos Oficiales de la Comuna de Arauco</h3>
          </div>
          <p style="font-size: 0.88rem; color: #cbd5e1; max-width: 820px; line-height: 1.55; margin: 0;">
            El Campeonato Oficial ANFA Arauco 2026 se concentra en <strong>2 recintos sintéticos principales</strong>: el 
            <strong>Estadio Municipal Ramón Burgos</strong> (sede principal de Honor y clásicos comunales) y el 
            <strong>Estadio Sebastián Gaete</strong> (recinto céntrico de alto tráfico). La histórica <strong>Cancha El Sausalito</strong> 
            (pasto natural) fue reincorporada este año, pero <em>ha podido utilizarse solo 3 veces</em> debido a las condiciones climáticas costeras y drenaje del terreno.
          </p>
        </div>
        <div style="display: flex; gap: 0.6rem; align-items: center;">
          <span class="status-badge habilitado" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">
            🟢 2 Canchas Sintéticas Activas
          </span>
          <span class="status-badge alerta" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">
            🟡 1 Recinto Natural Condicionado
          </span>
        </div>
      </div>
    </div>

    <!-- Grid de Tarjetas de Estadios -->
    <div class="venues-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
  `;

  venues.forEach(venue => {
    // Filtrar partidos programados en esta cancha
    const venueMatches = matches.filter(m => m.venueId === venue.id || (m.venue && m.venue.toLowerCase().includes(venue.shortName.toLowerCase())));

    const isSintetico = venue.surfaceType === 'sintetico';
    const surfaceBadge = isSintetico 
      ? `<span class="venue-surface-pill pill-sintetico">⚡ Pasto Sintético</span>`
      : `<span class="venue-surface-pill pill-natural">🌱 Pasto Natural</span>`;

    const statusPill = venue.status === 'habilitada'
      ? `<span class="venue-status-pill status-ok">${venue.statusLabel || '🟢 Habilitada'}</span>`
      : `<span class="venue-status-pill status-alert">${venue.statusLabel || '🟡 Uso Condicionado'}</span>`;

    html += `
      <div class="venue-card" id="venue-card-${venue.id}">
        <!-- Foto de Cabecera con Badges -->
        <div class="venue-photo-wrapper">
          <img src="${venue.photo}" alt="${venue.name}" class="venue-img" loading="lazy">
          <div class="venue-overlay-gradient"></div>
          <div class="venue-badge-group">
            ${surfaceBadge}
            ${statusPill}
          </div>
          <div class="venue-title-overlay">
            <h4 class="venue-name">${venue.name}</h4>
            <span class="venue-commune">📍 ${venue.address}</span>
          </div>
        </div>

        <!-- Cuerpo con Ficha Técnica -->
        <div class="venue-body">
          <p class="venue-usage-notes">${venue.usageNotes}</p>

          <div class="venue-specs-list">
            <div class="venue-spec-item">
              <span class="spec-label">💡 Iluminación:</span>
              <span class="spec-val">${venue.lighting}</span>
            </div>
            <div class="venue-spec-item">
              <span class="spec-label">👥 Capacidad:</span>
              <span class="spec-val">${venue.capacity}</span>
            </div>
            <div class="venue-spec-item">
              <span class="spec-label">📐 Coordenadas GPS:</span>
              <span class="spec-val font-mono" style="font-size: 0.76rem;">${venue.coordinates}</span>
            </div>
          </div>

          <!-- Etiquetas de Características -->
          <div class="venue-tags-row">
            ${(venue.features || []).map(f => `<span class="venue-feature-tag">${f}</span>`).join('')}
          </div>

          <!-- Partidos Asignados a esta Cancha -->
          <div class="venue-matches-box">
            <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
              <span>📅 Partidos en esta Cancha:</span>
              <span style="color: #94a3b8;">${venueMatches.length} programados</span>
            </div>
            ${venueMatches.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                ${venueMatches.map(m => `
                  <div class="venue-match-pill">
                    <span style="font-weight: 700;">${m.date.split('•')[0] || m.date}</span>
                    <span style="color: #f8fafc;">${getClubName(m.homeClubId, db)} vs ${getClubName(m.awayClubId, db)}</span>
                    <span class="status-badge ${m.status === 'en_vivo' ? 'alerta' : 'habilitado'}" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">
                      ${m.status === 'en_vivo' ? 'EN VIVO' : m.status}
                    </span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">
                No hay partidos oficiales asignados a este recinto para la jornada de hoy.
              </div>
            `}
          </div>

          <!-- Acciones: Google Maps y Administración -->
          <div class="venue-actions-row">
            <a href="${venue.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-maps" title="Abrir ubicación exacta en Google Maps">
              <span>🗺️</span> Cómo Llegar (Google Maps)
            </a>
            ${canManageSanctions() ? `
              <button class="btn btn-sm btn-secondary btn-toggle-venue-status" data-id="${venue.id}">
                ⚙️ Estado
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  // Escuchar eventos para cambiar estado de cancha (solo Directiva)
  document.querySelectorAll('.btn-toggle-venue-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const vId = btn.getAttribute('data-id');
      const v = venues.find(item => item.id === vId);
      if (!v) return;

      const newStatus = v.status === 'habilitada' ? 'restringida' : 'habilitada';
      const newLabel = newStatus === 'habilitada' ? '🟢 Habilitada (Cancha Oficial)' : '🟡 Uso Condicionado / En Evaluación';

      updateVenueStatus(vId, newStatus, newLabel);
      if (window.showToast) window.showToast(`Estado de ${v.shortName} actualizado a: ${newLabel}`);
      renderVenuesView();
    });
  });
}

function getClubName(clubId, db) {
  const c = (db.clubs || []).find(item => item.id === clubId);
  return c ? (c.shortName || c.name) : clubId;
}
