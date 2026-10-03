/**
 * LigaMaster - Módulo Oficial de la Selección de Fútbol de Arauco
 * Asociación de Fútbol de Arauco
 * 
 * Cobertura del Campeonato Regional de Selecciones 2026:
 * - Serie de Honor: ¡Clasificada a Cuartos de Final tras vencer a Cavecur (Global 11-5)!
 * - Sorteo de Cuartos de Final: Martes 22 de Septiembre de 2026 (Sede Regional)
 * - Serie Juvenil Sub-17: Campaña formativa con triunfo 2-1 en Curanilahue
 * - Nómina Oficial: 29 futbolistas convocados (20 del C.D. Real José María + 9 de clubes tradicionales)
 * - Cuerpo Técnico: Liderado por el DT Cristián Gómez (exfutbolista profesional y DT Real José María)
 * - Transmisión Oficial: TV Sports Laraquete
 */

import { getSelectionInfo, getDb } from './data.js';
import { getClubBadgeSvg, getSelectionBadgeSvg } from './badges.js';

let squadFilter = 'all'; // 'all', 'rjm', 'tradicionales'

export function initSeleccionModule() {
  renderSeleccionView();

  // Re-renderizar si cambia de asociación o datos
  window.addEventListener('ligapro:association-changed', () => {
    renderSeleccionView();
  });
}

export function renderSeleccionView() {
  const container = document.getElementById('seleccion-container');
  if (!container) return;

  const sel = getSelectionInfo();
  const honor = sel.honor;
  const juvenil = sel.juvenil;
  const next = honor.nextMatch;

  // Filtrado de la nómina de 29 jugadores
  let filteredSquad = honor.squad;
  if (squadFilter === 'rjm') {
    filteredSquad = honor.squad.filter(p => p.clubId === 'club-real-jose-maria');
  } else if (squadFilter === 'tradicionales') {
    filteredSquad = honor.squad.filter(p => p.clubId !== 'club-real-jose-maria');
  }

  let squadHtml = '';
  filteredSquad.forEach(p => {
    const badgeSvg = getClubBadgeSvg(p.clubId, 22);
    squadHtml += `
      <div class="selection-player-card">
        <div class="sel-player-avatar-box">
          <img src="${p.avatar}" alt="${p.name}" class="sel-player-img" loading="lazy">
          <span class="sel-player-num">${p.number}</span>
        </div>
        <div class="sel-player-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.2rem;">
            <strong class="sel-player-name">${p.name}</strong>
            <span style="font-size: 0.65rem; color: #64748b; font-family: monospace;">${p.regAnfa || ''}</span>
          </div>
          <span class="sel-player-pos">${p.position}</span>
          
          <div class="sel-player-origin" title="Club de pertenencia en la comuna de Arauco">
            <span class="sel-club-badge-svg">${badgeSvg}</span>
            <span class="sel-club-name">${p.clubName}</span>
          </div>

          <div class="sel-player-stats">
            <span>👕 ${p.matches} PJ</span>
            <span>⚽ ${p.goals} Goles</span>
            ${p.yellowCards > 0 ? `<span>🟨 ${p.yellowCards}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  });

  let staffHtml = '';
  honor.staff.forEach(st => {
    staffHtml += `
      <div class="sel-staff-pill">
        <span class="sel-staff-role">${st.role}:</span>
        <strong class="sel-staff-name">${st.name}</strong>
        <span class="sel-staff-club">(${st.club})</span>
      </div>
    `;
  });

  let youngstersHtml = '';
  juvenil.featuredYoungsters.forEach(y => {
    youngstersHtml += `
      <div class="sel-youngster-card">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <strong>⭐ ${y.name}</strong>
          <span class="sel-badge-origin">${y.club}</span>
        </div>
        <div style="font-size: 0.76rem; color: #94a3b8; margin-top: 0.2rem;">
          ${y.position} • <em>${y.notes}</em>
        </div>
      </div>
    `;
  });

  let sub17StaffHtml = '';
  (juvenil.staff || []).forEach(st => {
    sub17StaffHtml += `
      <div class="sel-staff-pill" style="border-left: 3px solid #38bdf8;">
        <span class="sel-staff-role">${st.role}:</span>
        <strong class="sel-staff-name">${st.name}</strong>
        <span class="sel-staff-club" style="color: #94a3b8; font-size: 0.72rem;">(${st.notes})</span>
      </div>
    `;
  });

  let sub17SquadHtml = '';
  (juvenil.officialSquad30 || []).forEach(p => {
    sub17SquadHtml += `
      <div class="sel-sub17-player-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.6rem; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; font-size: 0.78rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="display: inline-flex; width: 20px; height: 20px; border-radius: 50%; background: #1e3a8a; color: #fff; font-weight: 800; font-size: 0.68rem; align-items: center; justify-content: center;">${p.num}</span>
          <strong style="color: #f1f5f9;">${p.name}</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="color: #38bdf8; font-size: 0.72rem; font-weight: 600;">${p.pos}</span>
          <span style="font-size: 0.65rem; color: #64748b; background: rgba(255,255,255,0.05); padding: 0.1rem 0.35rem; border-radius: 4px;">Asoc. Arauco</span>
        </div>
      </div>
    `;
  });

  const selBadgeSvg = getSelectionBadgeSvg(72);

  const html = `
    <!-- Banner Héroe Selección de Arauco con Escudo Oficial Vectorial -->
    <div class="selection-hero-banner">
      <div class="selection-hero-topline">
        <div class="selection-hero-badge">
          <span>🇨🇱</span>
          <span>SELECCIÓN OFICIAL DE LA COMUNA • ASOCIACIÓN DE FÚTBOL DE ARAUCO</span>
        </div>
        <div class="media-partner-tag" title="Canal deportivo de la Provincia de Arauco">
          <span>📹 Cobertura Oficial: <strong>${sel.officialMedia.name}</strong> (${sel.officialMedia.channels})</span>
        </div>
      </div>

      <div class="selection-hero-main-row">
        <div class="selection-hero-crest-box">
          ${selBadgeSvg}
        </div>
        <div class="selection-hero-text">
          <h2>La Roja de Arauco • Torneo Regional de Selecciones 2026</h2>
          <p class="selection-hero-sub">
            Representativo oficial de la <strong>Asociación de Fútbol Amateur de Arauco</strong> en el torneo federado más importante de la Región del Biobío.
          </p>
        </div>
      </div>

      <!-- Resumen KPI de Participación -->
      <div class="selection-kpi-bar">
        <div class="sel-kpi-item active">
          <span class="sel-kpi-label">Serie de Honor (Adulta)</span>
          <strong class="sel-kpi-val" style="color: var(--accent-pitch);">¡Clasificada a Cuartos! 🔥</strong>
          <span style="font-size: 0.7rem; color: #a7f3d0;">Global: Arauco 11 - 5 Cavecur</span>
        </div>
        <div class="sel-kpi-item">
          <span class="sel-kpi-label">Serie Juvenil (Sub-17)</span>
          <strong class="sel-kpi-val" style="color: #cbd5e1;">Campaña Formativa (Octavos)</strong>
          <span style="font-size: 0.7rem; color: #94a3b8;">Triunfo 2-1 en Curanilahue</span>
        </div>
        <div class="sel-kpi-item">
          <span class="sel-kpi-label">Recinto de Localía</span>
          <strong class="sel-kpi-val">Estadio Ramón Burgos 🏟️</strong>
          <span style="font-size: 0.7rem; color: #93c5fd;">Pasto Sintético Certificado</span>
        </div>
        <div class="sel-kpi-item">
          <span class="sel-kpi-label">Convocatoria Comunal</span>
          <strong class="sel-kpi-val">29 Futbolistas</strong>
          <span style="font-size: 0.7rem; color: #fde047;">20 de Real José María + 9 comunales</span>
        </div>
      </div>
    </div>

    <!-- SECCIÓN 1: SERIE DE HONOR (CLASIFICADA TRAS SUPERAR A CAVECUR) -->
    <div class="content-card selection-section-card honor-card">
      <div class="card-title-row" style="margin-bottom: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.4rem;">🏆</span>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; color: #fff;">${honor.seriesName}</h3>
            <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700;">
              Clasificada a Cuartos de Final (1ª Ronda Grupo 2 superada)
            </span>
          </div>
        </div>
        <span class="badge-live" style="font-size: 0.8rem; padding: 0.35rem 0.85rem;">
          ${honor.statusBadge}
        </span>
      </div>

      <p style="font-size: 0.88rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.25rem;">
        ${honor.summary}
      </p>

      <!-- HISTORIAL OFICIAL DE LA SERIE 1ª RONDA (IDA Y VUELTA VS CAVECUR) -->
      <div class="previous-round-history-box" style="background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
        <h5 style="margin: 0 0 0.75rem 0; font-size: 0.82rem; color: #93c5fd; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem;">
          <span>📋 Registro Oficial de Octavos de Final (Grupo 2 Regional)</span>
        </h5>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem;">
          <!-- Partido de Ida -->
          <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; border-left: 3px solid var(--accent-pitch);">
            <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: #94a3b8; margin-bottom: 0.3rem;">
              <span>📅 Ida • 06/09/2026</span>
              <span>🏟️ Estadio Ramón Burgos</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 0.95rem;">
              <span style="color: #fff;">Arauco (Local)</span>
              <span style="color: var(--accent-pitch); font-size: 1.2rem; background: rgba(0,230,118,0.15); padding: 0.1rem 0.6rem; border-radius: 4px;">8 - 1</span>
              <span style="color: #cbd5e1;">Cavecur</span>
            </div>
            <p style="font-size: 0.72rem; color: #94a3b8; margin: 0.4rem 0 0 0;">
              Goleada categórica con hat-trick de Rodrigo Romero y doblete de Felipe Alarcón.
            </p>
          </div>

          <!-- Partido de Vuelta -->
          <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.75rem; border-left: 3px solid var(--accent-gold);">
            <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: #94a3b8; margin-bottom: 0.3rem;">
              <span>📅 Vuelta • 13/09/2026</span>
              <span>🏟️ Estadio Parque Urbano</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 0.95rem;">
              <span style="color: #cbd5e1;">Cavecur (Local)</span>
              <span style="color: #facc15; font-size: 1.2rem; background: rgba(250,204,21,0.15); padding: 0.1rem 0.6rem; border-radius: 4px;">4 - 3</span>
              <span style="color: #fff;">Arauco</span>
            </div>
            <p style="font-size: 0.72rem; color: #94a3b8; margin: 0.4rem 0 0 0;">
              Duelo de alta tensión en Curanilahue; Arauco administró su amplia ventaja del choque de ida.
            </p>
          </div>
        </div>
      </div>

      <!-- Ficha del Próximo Hito: Sorteo Oficial de Cuartos de Final (Martes 22 Septiembre) -->
      <div class="selection-clash-box">
        <div class="clash-header">
          <span class="clash-stage-badge">⚔️ ${next.stage}</span>
          <span class="clash-date">🗳️ Sorteo: <strong>${next.drawDate}</strong></span>
        </div>

        <div style="padding: 1rem; text-align: center;">
          <div style="display: inline-block; background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); color: #93c5fd; padding: 0.35rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.75rem;">
            📌 Estado: Sorteo de Cuartos de Final programado tras Fiestas Patrias
          </div>
          <h4 style="color: #fff; margin: 0 0 0.5rem 0; font-size: 1.15rem;">
            ${next.matchTitle}
          </h4>
          <p style="color: #cbd5e1; font-size: 0.85rem; max-width: 600px; margin: 0 auto 1rem auto; line-height: 1.5;">
            ${next.notes} Posible rival provincial en la llave de eliminación directa: <strong>${next.projectedOpponent}</strong>.
          </p>
          
          <div style="display: flex; justify-content: center; gap: 1.5rem; font-size: 0.82rem; color: #94a3b8; flex-wrap: wrap;">
            <span>🏟️ <strong>Recinto Local:</strong> ${next.venue}</span>
            <span>🎫 <strong>Valores:</strong> ${next.ticketInfo}</span>
            <span>⚖️ <strong>Arbitraje:</strong> ${next.referees}</span>
          </div>

          <div style="margin-top: 1rem;">
            <a href="${next.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-cyan" style="text-decoration: none;">
              🗺️ Ubicación GPS Estadio Ramón Burgos
            </a>
          </div>
        </div>
      </div>

      <!-- Cuerpo Técnico Oficial con DT Cristián Gómez -->
      <div style="margin: 1.5rem 0 1rem 0;">
        <h5 style="font-size: 0.82rem; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.4rem;">
          <span>👔 Cuerpo Técnico Oficial de la Selección (Staff Real José María / Asoc. Arauco)</span>
        </h5>
        <div class="sel-staff-grid">
          ${staffHtml}
        </div>
      </div>

      <!-- Plantel Convocado de Honor con Filtros de Origen (20 de Real José María + 9 Tradicionales) -->
      <div style="margin-top: 1.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h4 style="margin: 0; font-size: 1.1rem; color: #fff;">👕 Nómina Oficial de 29 Convocados</h4>
            <span style="font-size: 0.75rem; color: var(--text-muted);">
              20 futbolistas del C.D. Real José María más 9 referentes de los clubes tradicionales de la comuna
            </span>
          </div>
          <button class="btn btn-sm btn-whatsapp" id="btn-share-selection-wa">
            <span>💬</span> Alentar a la Selección en WhatsApp
          </button>
        </div>

        <!-- Filtro Rápido de Nómina -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
          <button class="btn btn-xs ${squadFilter === 'all' ? 'btn-primary' : 'btn-outline-pitch'}" id="btn-filter-squad-all">
            Todos (${honor.squad.length})
          </button>
          <button class="btn btn-xs ${squadFilter === 'rjm' ? 'btn-primary' : 'btn-outline-pitch'}" id="btn-filter-squad-rjm">
            👑 Aporte Real José María (20)
          </button>
          <button class="btn btn-xs ${squadFilter === 'tradicionales' ? 'btn-primary' : 'btn-outline-pitch'}" id="btn-filter-squad-trad">
            ⚓ Clubes Tradicionales (9)
          </button>
        </div>

        <div class="selection-squad-grid">
          ${squadHtml}
        </div>
      </div>
    </div>

    <!-- SECCIÓN 2: SERIE JUVENIL SUB-17 (BALANCE CON HONOR Y VICTORIA DE VISITA) -->
    <div class="content-card selection-section-card juvenil-card" style="margin-top: 1.5rem; border-left: 4px solid #64748b;">
      <div class="card-title-row" style="margin-bottom: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.3rem;">🌱</span>
          <div>
            <h3 style="margin: 0; font-size: 1.15rem; color: #fff;">${juvenil.seriesName}</h3>
            <span style="font-size: 0.72rem; color: #94a3b8;">Primera Fase • Torneo Regional de Selecciones</span>
          </div>
        </div>
        <span class="status-badge" style="background: rgba(148, 163, 184, 0.2); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3);">
          ${juvenil.statusBadge}
        </span>
      </div>

      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; border: 1px solid var(--border-subtle);">
        <strong style="color: #e2e8f0; font-size: 0.9rem; display: block; margin-bottom: 0.35rem;">
          ${juvenil.headline}
        </strong>
        <p style="font-size: 0.84rem; color: #94a3b8; line-height: 1.6; margin: 0;">
          ${juvenil.summary}
        </p>

        <!-- Resultados de Ida y Vuelta Juvenil -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.6rem; margin-top: 0.8rem;">
          <div style="background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.78rem;">
            <div style="color: #94a3b8;">📅 Ida (Ramón Burgos, 06/09):</div>
            <strong style="color: #f87171;">Arauco Sub-17 0 - 5 Cavecur Sub-17</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.78rem;">
            <div style="color: #94a3b8;">📅 Vuelta (Parque Urbano, 13/09):</div>
            <strong style="color: #34d399;">Cavecur Sub-17 1 - 2 Arauco Sub-17 (Victoria de Visita)</strong>
          </div>
        </div>

        <!-- Cuerpo Técnico Oficial Sub-17 (4 Miembros Oficiales) -->
        <div style="margin-top: 1rem;">
          <h5 style="font-size: 0.8rem; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>👔 Cuerpo Técnico Oficial Selección Sub-17 (Oficialización @asociacionfutbolarauco)</span>
          </h5>
          <div class="sel-staff-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
            ${sub17StaffHtml}
          </div>
        </div>
      </div>

      <!-- Nómina Oficial de 30 Jugadores Sub-17 Nominados 2026 -->
      <div style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.4rem;">
          <div>
            <h5 style="font-size: 0.86rem; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; display: flex; align-items: center; gap: 0.4rem;">
              <span>📋 Nómina Oficial: 30 Nominados Selección Juvenil Sub-17 Arauco 2026</span>
            </h5>
            <span style="font-size: 0.72rem; color: #94a3b8;">
              Nómina comunal oficial de la Selección de Arauco para el Torneo Regional de Selecciones 2026
            </span>
          </div>
          <span class="badge badge-info" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 4px; background: rgba(56,189,248,0.15); color: #38bdf8; border: 1px solid rgba(56,189,248,0.3);">
            30 Futbolistas Convocados
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 0.45rem;">
          ${sub17SquadHtml}
        </div>
      </div>

      <div>
        <h5 style="font-size: 0.82rem; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">
          ⭐ Jugadores Destacados del Semillero Juvenil de Arauco
        </h5>
        <div class="sel-youngsters-grid">
          ${youngstersHtml}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Listeners de los filtros de la nómina
  document.getElementById('btn-filter-squad-all')?.addEventListener('click', () => {
    squadFilter = 'all';
    renderSeleccionView();
  });
  document.getElementById('btn-filter-squad-rjm')?.addEventListener('click', () => {
    squadFilter = 'rjm';
    renderSeleccionView();
  });
  document.getElementById('btn-filter-squad-trad')?.addEventListener('click', () => {
    squadFilter = 'tradicionales';
    renderSeleccionView();
  });

  // Botón de WhatsApp para alentar a la Selección
  document.getElementById('btn-share-selection-wa')?.addEventListener('click', () => {
    const text = `¡Todos a apoyar a la Selección de Fútbol de Arauco en el Torneo Regional de Selecciones 2026! 🇨🇱⚽ La Serie de Honor avanzó a Cuartos de Final tras superar a Cavecur (Global 11-5). El DT Cristián Gómez y los 29 seleccionados esperan rival en el sorteo de este martes 22 de septiembre. ¡Vamos Arauco! Revisa la nómina completa y cobertura de TV Sports Laraquete aquí: http://localhost:8080`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  });
}
