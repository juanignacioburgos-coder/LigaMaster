/**
 * LIGAMASTER - MÓDULO DE COMPETICIÓN: LIGUILLAS, PLAYOFFS, FAIR PLAY Y VALLA MENOS BATIDA
 * Gestión de llaves eliminatorias, cuadros de copa, clasificación ANFA, trofeos de conducta y porteros.
 */

import {
  getDb,
  saveDb,
  getActiveLeagueId,
  getLeagueById,
  addAuditLogEntry
} from './data.js';

import { getClubBadgeSvg } from './badges.js';
import { isAdmin } from './auth.js';
import { showToast } from './toast.js';

/**
 * Plantilla por defecto de Liguilla Oficial para Serie de Honor
 */
export const DEFAULT_PLAYOFFS_HONOR = {
  season: "2026",
  title: "Liguilla Oficial por el Campeonato y Cupos Regionales ANFA",
  description: "Clasifican los 8 mejores de la fase regular. Llaves de ida y vuelta en Cuartos y Semifinales. Gran Final Única en Estadio Municipal.",
  rounds: [
    {
      id: "cuartos",
      name: "Cuartos de Final (Ida y Vuelta)",
      matches: [
        {
          id: "qf-1",
          name: "Llave 1 (1º vs 8º)",
          homeClubId: "demo-ohiggins",
          awayClubId: "demo-copihues",
          homeLeg1: 3,
          awayLeg1: 1,
          homeLeg2: 2,
          awayLeg2: 2,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "finalizado",
          winnerClubId: "demo-ohiggins",
          venueLeg1: "Estadio Las Vertientes",
          venueLeg2: "Estadio El Roble",
          dateLeg1: "27 Sep • 16:00",
          dateLeg2: "04 Oct • 16:00"
        },
        {
          id: "qf-2",
          name: "Llave 2 (4º vs 5º)",
          homeClubId: "demo-arauco",
          awayClubId: "demo-realcordillera",
          homeLeg1: 2,
          awayLeg1: 0,
          homeLeg2: 1,
          awayLeg2: 2,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "finalizado",
          winnerClubId: "demo-arauco",
          venueLeg1: "Complejo Andino",
          venueLeg2: "Estadio Municipal",
          dateLeg1: "27 Sep • 16:00",
          dateLeg2: "04 Oct • 16:00"
        },
        {
          id: "qf-3",
          name: "Llave 3 (2º vs 7º)",
          homeClubId: "demo-colocolo",
          awayClubId: "demo-sanlorenzo",
          homeLeg1: 1,
          awayLeg1: 1,
          homeLeg2: 3,
          awayLeg2: 1,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "finalizado",
          winnerClubId: "demo-colocolo",
          venueLeg1: "Estadio El Carbón",
          venueLeg2: "Cancha Arellano",
          dateLeg1: "27 Sep • 16:00",
          dateLeg2: "04 Oct • 16:00"
        },
        {
          id: "qf-4",
          name: "Llave 4 (3º vs 6º)",
          homeClubId: "demo-playabrava",
          awayClubId: "demo-estrelladelsur",
          homeLeg1: 0,
          awayLeg1: 1,
          homeLeg2: 2,
          awayLeg2: 1,
          penaltiesHome: 4,
          penaltiesAway: 3,
          status: "finalizado",
          winnerClubId: "demo-playabrava",
          venueLeg1: "Cancha El Morro",
          venueLeg2: "Estadio Costanera",
          dateLeg1: "27 Sep • 16:00",
          dateLeg2: "04 Oct • 16:00"
        }
      ]
    },
    {
      id: "semis",
      name: "Semifinales (Ida y Vuelta)",
      matches: [
        {
          id: "sf-1",
          name: "Semifinal A",
          homeClubId: "demo-ohiggins",
          awayClubId: "demo-arauco",
          homeLeg1: 2,
          awayLeg1: 2,
          homeLeg2: null,
          awayLeg2: null,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "en_disputa",
          winnerClubId: null,
          venueLeg1: "Estadio Municipal",
          venueLeg2: "Estadio El Roble",
          dateLeg1: "11 Oct • 16:00",
          dateLeg2: "18 Oct • 16:00"
        },
        {
          id: "sf-2",
          name: "Semifinal B",
          homeClubId: "demo-colocolo",
          awayClubId: "demo-playabrava",
          homeLeg1: 1,
          awayLeg1: 0,
          homeLeg2: null,
          awayLeg2: null,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "en_disputa",
          winnerClubId: null,
          venueLeg1: "Estadio Costanera",
          venueLeg2: "Cancha Arellano",
          dateLeg1: "11 Oct • 16:00",
          dateLeg2: "18 Oct • 16:00"
        }
      ]
    },
    {
      id: "final",
      name: "Gran Final y Podio ANFA",
      matches: [
        {
          id: "fn-1",
          name: "Gran Final Comunal (Por la Corona y Cupo Regional 1)",
          homeClubId: null,
          awayClubId: null,
          placeholderHome: "Ganador Semifinal A",
          placeholderAway: "Ganador Semifinal B",
          homeScore: null,
          awayScore: null,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "programado",
          winnerClubId: null,
          venue: "Estadio Municipal Ramón Burgos Loyola",
          date: "25 de Octubre • 17:30 hrs"
        },
        {
          id: "fn-3rd",
          name: "Definición 3º Lugar (Repechaje Regional 2)",
          homeClubId: null,
          awayClubId: null,
          placeholderHome: "Perdedor Semifinal A",
          placeholderAway: "Perdedor Semifinal B",
          homeScore: null,
          awayScore: null,
          penaltiesHome: null,
          penaltiesAway: null,
          status: "programado",
          winnerClubId: null,
          venue: "Estadio Municipal Ramón Burgos Loyola",
          date: "25 de Octubre • 15:00 hrs"
        }
      ]
    }
  ]
};

/**
 * Obtiene o inicializa los datos de liguilla para la serie especificada
 */
export function getPlayoffsData(leagueId = null, seriesId = 'primera_adulta') {
  const activeId = leagueId || getActiveLeagueId();
  const db = getDb(activeId);

  if (!db.playoffs) {
    db.playoffs = {};
  }

  if (!db.playoffs[seriesId]) {
    // Si es honor en arauco, cargar la plantilla oficial
    if (seriesId === 'primera_adulta' || seriesId === 'honor') {
      db.playoffs[seriesId] = JSON.parse(JSON.stringify(DEFAULT_PLAYOFFS_HONOR));
    } else {
      // Generar dinámicamente según los 4 u 8 mejores de esa serie
      db.playoffs[seriesId] = generateDynamicPlayoffBracket(db, seriesId);
    }
    saveDb(db, activeId);
  }

  return db.playoffs[seriesId];
}

/**
 * Genera un cuadro eliminatorio dinámico basado en las posiciones de la serie
 */
function generateDynamicPlayoffBracket(db, seriesId) {
  const clubs = db.clubs || [];
  const standings = (db.standings && db.standings[seriesId]) || [];

  const topClubs = standings.slice(0, 4).map(st => st.clubId);
  const c1 = topClubs[0] || (clubs[0] ? clubs[0].id : null);
  const c2 = topClubs[1] || (clubs[1] ? clubs[1].id : null);
  const c3 = topClubs[2] || (clubs[2] ? clubs[2].id : null);
  const c4 = topClubs[3] || (clubs[3] ? clubs[3].id : null);

  return {
    season: "2026",
    title: `Liguilla Final Oficial • ${seriesId.toUpperCase()}`,
    description: "Definición de Campeonato de la Serie entre los 4 mejores clasificados.",
    rounds: [
      {
        id: "semis",
        name: "Semifinales (Ida y Vuelta)",
        matches: [
          {
            id: `sf-${seriesId}-1`,
            name: "Semifinal 1 (1º vs 4º)",
            homeClubId: c1,
            awayClubId: c4,
            homeLeg1: 2,
            awayLeg1: 1,
            homeLeg2: 1,
            awayLeg2: 0,
            penaltiesHome: null,
            penaltiesAway: null,
            status: "finalizado",
            winnerClubId: c1,
            venueLeg1: "Estadio Cancha 1",
            venueLeg2: "Estadio Principal",
            dateLeg1: "04 Oct • 15:00",
            dateLeg2: "11 Oct • 15:00"
          },
          {
            id: `sf-${seriesId}-2`,
            name: "Semifinal 2 (2º vs 3º)",
            homeClubId: c2,
            awayClubId: c3,
            homeLeg1: 1,
            awayLeg1: 1,
            homeLeg2: 2,
            awayLeg2: 1,
            penaltiesHome: null,
            penaltiesAway: null,
            status: "finalizado",
            winnerClubId: c2,
            venueLeg1: "Estadio Cancha 2",
            venueLeg2: "Estadio Principal",
            dateLeg1: "04 Oct • 15:00",
            dateLeg2: "11 Oct • 15:00"
          }
        ]
      },
      {
        id: "final",
        name: "Gran Final",
        matches: [
          {
            id: `fn-${seriesId}-1`,
            name: "Final de Campeonato",
            homeClubId: c1,
            awayClubId: c2,
            placeholderHome: "Ganador Semifinal 1",
            placeholderAway: "Ganador Semifinal 2",
            homeScore: null,
            awayScore: null,
            penaltiesHome: null,
            penaltiesAway: null,
            status: "programado",
            winnerClubId: null,
            venue: "Estadio Municipal",
            date: "18 de Octubre • 16:30 hrs"
          }
        ]
      }
    ]
  };
}

/**
 * ============================================================================
 * 1. RENDERIZADO DEL CUADRO DE LIGUILLA (BRACKET)
 * ============================================================================
 */
export function renderPlayoffsBracket(containerEl, seriesId = 'primera_adulta') {
  if (!containerEl) return;
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const league = getLeagueById(activeId);
  const playoffs = getPlayoffsData(activeId, seriesId);
  const clubsMap = {};
  (db.clubs || []).forEach(c => { clubsMap[c.id] = c; });

  const adminActive = isAdmin();

  let html = `
    <div class="playoffs-container">
      <!-- Encabezado de la Liguilla -->
      <div class="playoffs-banner-card">
        <div class="playoffs-banner-icon">🏆</div>
        <div class="playoffs-banner-info">
          <div class="playoffs-badge-row">
            <span class="badge-accent">ANFA OFICIAL</span>
            <span class="badge-subtle">TEMPORADA 2026</span>
            ${adminActive ? '<span class="badge-admin" style="background:#fee2e2; color:#b91c1c; font-weight:800; font-size:0.7rem; padding:0.15rem 0.5rem; border-radius:4px;">MODO ADMIN ACTIVO: EDICIÓN HABILITADA</span>' : ''}
          </div>
          <h2 class="playoffs-title">${playoffs.title}</h2>
          <p class="playoffs-subtitle">${playoffs.description}</p>
        </div>
        <div class="playoffs-banner-actions">
          <div class="regional-quota-pill" title="Premios deportivos aprobados por Consejo de Presidentes">
            <span style="font-size:1.1rem;">🎟️</span>
            <div>
              <strong style="display:block; font-size:0.75rem; color:#f59e0b;">2 CUPOS REGIONALES</strong>
              <small style="font-size:0.68rem; color:#cbd5e1;">Al Torneo de Campeones Biobío</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuadro de Llaves (Bracket) -->
      <div class="bracket-scroll-wrapper">
        <div class="bracket-grid">
  `;

  // Iterar por cada ronda (Cuartos, Semis, Final)
  (playoffs.rounds || []).forEach((round, rIdx) => {
    html += `
      <div class="bracket-round-column" data-round-id="${round.id}">
        <div class="bracket-round-header">
          <span class="round-step-tag">FASE ${rIdx + 1}</span>
          <h3 class="round-step-title">${round.name}</h3>
        </div>
        <div class="bracket-matches-list">
    `;

    round.matches.forEach((m) => {
      const homeClub = clubsMap[m.homeClubId] || { name: m.placeholderHome || 'Por Definir', shortName: m.placeholderHome || 'Por Definir' };
      const awayClub = clubsMap[m.awayClubId] || { name: m.placeholderAway || 'Por Definir', shortName: m.placeholderAway || 'Por Definir' };

      // Calcular marcador global con validación estricta de números
      let globalHome = 0;
      let globalAway = 0;
      let hasGlobal = false;

      const hasLeg1 = typeof m.homeLeg1 === 'number' && typeof m.awayLeg1 === 'number';
      const hasLeg2 = typeof m.homeLeg2 === 'number' && typeof m.awayLeg2 === 'number';
      const hasSingle = typeof m.homeScore === 'number' && typeof m.awayScore === 'number';

      if (hasLeg1) {
        globalHome += m.homeLeg1;
        globalAway += m.awayLeg1;
        hasGlobal = true;
      }
      if (hasLeg2) {
        globalHome += m.homeLeg2;
        globalAway += m.awayLeg2;
      }
      if (hasSingle) {
        globalHome = m.homeScore;
        globalAway = m.awayScore;
        hasGlobal = true;
      }

      const isHomeWinner = m.winnerClubId && m.winnerClubId === m.homeClubId;
      const isAwayWinner = m.winnerClubId && m.winnerClubId === m.awayClubId;

      let statusBadge = '';
      if (m.status === 'finalizado') {
        statusBadge = '<span class="bracket-status-tag finished">✓ Finalizado</span>';
      } else if (m.status === 'en_disputa') {
        statusBadge = '<span class="bracket-status-tag live">⚡ En Disputa</span>';
      } else {
        statusBadge = '<span class="bracket-status-tag scheduled">📅 Programado</span>';
      }

      html += `
        <div class="bracket-card ${m.status === 'finalizado' ? 'is-finished' : ''}" data-match-id="${m.id}">
          <div class="bracket-card-top">
            <span class="bracket-match-name">${m.name}</span>
            ${statusBadge}
          </div>

          <!-- Equipo 1 (Local) -->
          <div class="bracket-team-row ${isHomeWinner ? 'is-winner' : ''}">
            <div class="bracket-team-info">
              <span class="bracket-team-crest">${m.homeClubId ? getClubBadgeSvg(m.homeClubId, 22) : '⚽'}</span>
              <span class="bracket-team-name ${isHomeWinner ? 'font-bold' : ''}">${homeClub.name}</span>
            </div>
            <div class="bracket-scores-box">
              ${typeof m.homeLeg1 === 'number' ? `<span class="score-leg" title="Ida">${m.homeLeg1}</span>` : ''}
              ${typeof m.homeLeg2 === 'number' ? `<span class="score-leg" title="Vuelta">${m.homeLeg2}</span>` : ''}
              ${hasGlobal ? `<strong class="score-global ${isHomeWinner ? 'winner-text' : ''}" title="Global">${globalHome}</strong>` : ''}
              ${!hasGlobal ? `<span class="score-leg" style="opacity: 0.5;">-</span>` : ''}
              ${isHomeWinner ? `<span class="winner-crown-icon" title="Clasificado">✓</span>` : ''}
            </div>
          </div>

          <!-- Equipo 2 (Visita) -->
          <div class="bracket-team-row ${isAwayWinner ? 'is-winner' : ''}">
            <div class="bracket-team-info">
              <span class="bracket-team-crest">${m.awayClubId ? getClubBadgeSvg(m.awayClubId, 22) : '⚽'}</span>
              <span class="bracket-team-name ${isAwayWinner ? 'font-bold' : ''}">${awayClub.name}</span>
            </div>
            <div class="bracket-scores-box">
              ${typeof m.awayLeg1 === 'number' ? `<span class="score-leg" title="Ida">${m.awayLeg1}</span>` : ''}
              ${typeof m.awayLeg2 === 'number' ? `<span class="score-leg" title="Vuelta">${m.awayLeg2}</span>` : ''}
              ${hasGlobal ? `<strong class="score-global ${isAwayWinner ? 'winner-text' : ''}" title="Global">${globalAway}</strong>` : ''}
              ${!hasGlobal ? `<span class="score-leg" style="opacity: 0.5;">-</span>` : ''}
              ${isAwayWinner ? `<span class="winner-crown-icon" title="Clasificado">✓</span>` : ''}
            </div>
          </div>

          <!-- Footer de la Llave -->
          <div class="bracket-card-footer">
            <div class="bracket-meta-info">
              ${m.penaltiesHome !== null && m.penaltiesAway !== null ? `<span class="badge-penalties" title="Definición a penales">🎯 Penales: ${m.penaltiesHome}-${m.penaltiesAway}</span>` : ''}
              <span class="bracket-venue-label">🏟️ ${m.venueLeg2 || m.venue || 'Estadio Municipal'}</span>
            </div>
            ${adminActive ? `
              <button class="btn-bracket-edit" onclick="window.ligamasterOpenEditPlayoff('${m.id}', '${seriesId}')" title="Modificar marcadores y clasificado">
                ✏️ Editar
              </button>
            ` : ''}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `
        </div>
      </div>

      <!-- Cuadro de Clasificación al Torneo Regional de Campeones -->
      <div class="playoffs-podium-card">
        <div class="podium-header">
          <span style="font-size: 1.25rem;">🏅</span>
          <h3>Clasificados Oficiales al Torneo Regional de Campeones ANFA 2027</h3>
        </div>
        <div class="podium-grid">
          <div class="podium-slot champion">
            <div class="podium-badge">🥇 CAMPEÓN COMUNAL</div>
            <div class="podium-team">
              <span class="podium-crest">${getClubBadgeSvg('demo-ohiggins', 42)}</span>
              <div>
                <strong>C.D. O'Higgins</strong>
                <small>Cupo Biobío Nº 1</small>
              </div>
            </div>
            <div class="podium-status">Candidato Firme al Título</div>
          </div>

          <div class="podium-slot runnerup">
            <div class="podium-badge">🥈 SUBCAMPEÓN COMUNAL</div>
            <div class="podium-team">
              <span class="podium-crest">${getClubBadgeSvg('demo-colocolo', 42)}</span>
              <div>
                <strong>Colo Colo Local</strong>
                <small>Cupo Biobío Nº 2</small>
              </div>
            </div>
            <div class="podium-status">En Disputa Semifinales</div>
          </div>

          <div class="podium-slot third">
            <div class="podium-badge">🥉 TERCER LUGAR</div>
            <div class="podium-team">
              <span class="podium-crest">${getClubBadgeSvg('demo-arauco', 42)}</span>
              <div>
                <strong>C.D. Arauco</strong>
                <small>Repechaje Provincial</small>
              </div>
            </div>
            <div class="podium-status">En Disputa Semifinales</div>
          </div>
        </div>
      </div>
    </div>
  `;

  containerEl.innerHTML = html;
}

/**
 * ============================================================================
 * 2. RANKING OFICIAL FAIR PLAY (TROFEO AL JUEGO LIMPIO ANFA)
 * ============================================================================
 */
export function calculateFairPlayRanking(leagueId = null, seriesId = 'primera_adulta') {
  const activeId = leagueId || getActiveLeagueId();
  const db = getDb(activeId);
  const clubs = db.clubs || [];
  const players = db.players || [];

  // Calcular tarjetas amarillas y rojas por club en la serie
  const fairPlayMap = {};
  clubs.forEach(c => {
    fairPlayMap[c.id] = {
      club: c,
      pj: 3, // Fechas oficiales disputadas
      yellowCards: 0,
      redCards: 0,
      penaltyPoints: 0,
      conductStatus: 'Ejemplar'
    };
  });

  // Tomar las tarjetas acumuladas por los jugadores
  players.forEach(p => {
    if (seriesId === 'all' || p.series === seriesId || (!p.series && seriesId === 'primera_adulta')) {
      if (fairPlayMap[p.clubId]) {
        const y = p.stats?.yellowCards || 0;
        const r = p.stats?.redCards || 0;
        fairPlayMap[p.clubId].yellowCards += y;
        fairPlayMap[p.clubId].redCards += r;
      }
    }
  });

  // Aplicar baremo reglamentario ANFA: 1 pt por amarilla, 3 pts por roja
  const ranking = Object.values(fairPlayMap).map(row => {
    row.penaltyPoints = (row.yellowCards * 1) + (row.redCards * 3);
    const avg = row.pj > 0 ? (row.penaltyPoints / row.pj) : 0;
    row.average = parseFloat(avg.toFixed(2));

    if (avg <= 11.5) {
      row.conductStatus = 'Ejemplar';
      row.statusClass = 'conduct-exemplary';
    } else if (avg <= 13.5) {
      row.conductStatus = 'Aceptable';
      row.statusClass = 'conduct-good';
    } else if (avg <= 15.5) {
      row.conductStatus = 'Bajo Advertencia';
      row.statusClass = 'conduct-warning';
    } else {
      row.conductStatus = 'Riesgo Sanción ANFA';
      row.statusClass = 'conduct-danger';
    }

    return row;
  });

  // Ordenar de menor a mayor puntaje de penalización
  ranking.sort((a, b) => {
    if (a.penaltyPoints !== b.penaltyPoints) return a.penaltyPoints - b.penaltyPoints;
    if (a.redCards !== b.redCards) return a.redCards - b.redCards;
    return a.yellowCards - b.yellowCards;
  });

  return ranking;
}

export function renderFairPlayView(containerEl, seriesId = 'primera_adulta') {
  if (!containerEl) return;
  const ranking = calculateFairPlayRanking(null, seriesId);

  let html = `
    <div class="fairplay-wrapper">
      <!-- Banner Informativo de Fair Play -->
      <div class="fairplay-banner">
        <div class="fairplay-banner-icon">🛡️</div>
        <div>
          <h3>Trofeo Oficial Juego Limpio & Fair Play ANFA 2026</h3>
          <p>
            Reconocimiento anual a la institución más disciplinada. Baremo oficial: 
            <strong>1 punto por Tarjeta Amarilla</strong> y <strong>3 puntos por Tarjeta Roja Directa</strong>. Menor puntaje = Mejor posición.
          </p>
        </div>
      </div>

      <!-- Tabla de Posiciones Fair Play -->
      <div class="table-wrapper-card">
        <div class="sports-table-responsive">
          <table class="sports-table" id="fairplay-table">
            <thead>
              <tr>
                <th style="width: 50px;" class="text-center">#</th>
                <th>CLUB DEPORTIVO</th>
                <th class="text-center" title="Partidos Jugados">PJ</th>
                <th class="text-center" title="Tarjetas Amarillas (1 pt)">🟨 AMARILLAS</th>
                <th class="text-center" title="Tarjetas Rojas (3 pts)">🟥 ROJAS</th>
                <th class="text-center" title="Puntaje de Penalización" style="color: var(--color-primary); font-weight:800;">PTS PENALIZACIÓN</th>
                <th class="text-center" title="Promedio por Partido">PROMEDIO</th>
                <th class="text-center">ESTADO DISCIPLINARIO</th>
              </tr>
            </thead>
            <tbody>
  `;

  ranking.forEach((r, idx) => {
    const pos = idx + 1;
    let badgePos = '';
    if (pos === 1) badgePos = '<span class="fairplay-trophy-badge" title="Líder Trofeo Fair Play">🥇 TROFEO FAIR PLAY</span>';
    else if (pos === 2) badgePos = '<span class="fairplay-subtrophy-badge">🥈 2º Lugar</span>';
    else if (pos === 3) badgePos = '<span class="fairplay-subtrophy-badge">🥉 3º Lugar</span>';

    html += `
      <tr style="${pos === 1 ? 'background: rgba(16, 185, 129, 0.05); font-weight: 600;' : ''}">
        <td class="text-center">
          <span class="table-pos-badge ${pos === 1 ? 'gold' : (pos === 2 ? 'silver' : (pos === 3 ? 'bronze' : ''))}">${pos}</span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest">${getClubBadgeSvg(r.club.id, 28)}</div>
            <div>
              <span class="table-team-name">${r.club.name}</span>
              ${badgePos}
            </div>
          </div>
        </td>
        <td class="text-center">${r.pj}</td>
        <td class="text-center"><span class="badge-card-yellow">${r.yellowCards}</span></td>
        <td class="text-center"><span class="badge-card-red">${r.redCards}</span></td>
        <td class="text-center pts-cell" style="font-size: 1.1rem; color: ${pos === 1 ? '#10b981' : '#e51b24'};">${r.penaltyPoints}</td>
        <td class="text-center" style="font-weight:700; color:var(--color-text-muted);">${r.average}</td>
        <td class="text-center">
          <span class="conduct-pill ${r.statusClass}">${r.conductStatus}</span>
        </td>
      </tr>
    `;
  });

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  containerEl.innerHTML = html;
}

/**
 * ============================================================================
 * 3. RANKING DE VALLA MENOS BATIDA (GUANTE DE ORO / MEJOR PORTERO)
 * ============================================================================
 */
export function calculateVallaMenosBatida(leagueId = null, seriesId = 'primera_adulta') {
  const activeId = leagueId || getActiveLeagueId();
  const db = getDb(activeId);
  const clubs = db.clubs || [];
  const players = db.players || [];
  const standings = (db.standings && db.standings[seriesId]) || [];

  const standingsMap = {};
  standings.forEach(st => { standingsMap[st.clubId] = st; });

  // Buscar el portero principal de cada club en esta serie
  const goalkeepers = [];

  clubs.forEach(c => {
    const st = standingsMap[c.id] || { pj: 3, gc: 3 };
    const clubGks = players.filter(p => p.clubId === c.id && (p.position === 'Arquero' || p.specificPosition === 'Portero') && (seriesId === 'all' || p.series === seriesId));
    const mainGk = clubGks[0] || {
      id: `gk-${c.id}`,
      name: `Portero Titular ${c.shortName}`,
      dorsal: 1,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      stats: { matches: st.pj || 3 }
    };

    const pj = st.pj || 3;
    const gc = st.gc !== undefined ? st.gc : Math.floor(Math.random() * 4) + 1;
    const cleanSheets = Math.max(0, pj - gc);
    const avg = pj > 0 ? (gc / pj) : 0;

    goalkeepers.push({
      gk: mainGk,
      club: c,
      pj: pj,
      gc: gc,
      cleanSheets: cleanSheets,
      avgConceded: parseFloat(avg.toFixed(2))
    });
  });

  // Ordenar por menor promedio de goles recibidos, luego más vallas invictas
  goalkeepers.sort((a, b) => {
    if (a.avgConceded !== b.avgConceded) return a.avgConceded - b.avgConceded;
    if (b.cleanSheets !== a.cleanSheets) return b.cleanSheets - a.cleanSheets;
    return a.gc - b.gc;
  });

  return goalkeepers;
}

export function renderVallaMenosBatidaView(containerEl, seriesId = 'primera_adulta') {
  if (!containerEl) return;
  const list = calculateVallaMenosBatida(null, seriesId);

  let html = `
    <div class="valla-wrapper">
      <!-- Banner Informativo Valla Menos Batida -->
      <div class="valla-banner">
        <div class="valla-banner-icon">🧤</div>
        <div>
          <h3>Guante de Oro • Trofeo a la Valla Menos Batida 2026</h3>
          <p>
            Premio oficial ANFA al arquero y bloque defensivo con el menor promedio de goles recibidos por encuentro en la temporada.
          </p>
        </div>
      </div>

      <!-- Tabla de Porteros -->
      <div class="table-wrapper-card">
        <div class="sports-table-responsive">
          <table class="sports-table" id="valla-table">
            <thead>
              <tr>
                <th style="width: 50px;" class="text-center">#</th>
                <th>PORTERO TITULAR</th>
                <th>CLUB</th>
                <th class="text-center" title="Partidos Jugados">PJ</th>
                <th class="text-center" title="Goles en Contra (Recibidos)">GOLES RECIBIDOS (GC)</th>
                <th class="text-center" title="Partidos con Arco en Cero">🧤 VALLAS INVICTAS</th>
                <th class="text-center" title="Promedio de Goles Recibidos por Partido" style="color: var(--color-primary); font-weight:800;">PROMEDIO / PJ</th>
                <th class="text-center">DISTINCIÓN OFICIAL</th>
              </tr>
            </thead>
            <tbody>
  `;

  list.forEach((item, idx) => {
    const pos = idx + 1;
    let badgeHtml = '';
    if (pos === 1) badgeHtml = '<span class="guante-oro-badge">🧤 GUANTE DE ORO 2026</span>';
    else if (pos === 2) badgeHtml = '<span class="guante-plata-badge">🥈 Guante de Plata</span>';
    else if (pos === 3) badgeHtml = '<span class="guante-bronce-badge">🥉 Guante de Bronce</span>';

    html += `
      <tr style="${pos === 1 ? 'background: rgba(245, 158, 11, 0.05); font-weight:600;' : ''}">
        <td class="text-center">
          <span class="table-pos-badge ${pos === 1 ? 'gold' : (pos === 2 ? 'silver' : (pos === 3 ? 'bronze' : ''))}">${pos}</span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${item.gk.avatar || item.gk.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}" alt="${item.gk.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 38px; height: 38px; border-radius: var(--radius-xs); object-fit: cover;">
            <div>
              <strong style="font-family: var(--font-display); font-size: 0.95rem; color: var(--color-text-main); display: block;">${item.gk.name}</strong>
              <small style="color: var(--color-text-muted); font-size: 0.75rem;">#${item.gk.dorsal || 1} • Guardameta Oficial</small>
            </div>
          </div>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest">${getClubBadgeSvg(item.club.id, 24)}</div>
            <span class="table-team-name">${item.club.name}</span>
          </div>
        </td>
        <td class="text-center">${item.pj}</td>
        <td class="text-center" style="font-weight:700; color: ${item.gc <= 2 ? '#10b981' : '#e51b24'}; font-size:1.05rem;">${item.gc}</td>
        <td class="text-center"><span class="badge-cleansheet">🛡️ ${item.cleanSheets}</span></td>
        <td class="text-center pts-cell" style="font-size: 1.15rem; color: ${pos === 1 ? '#f59e0b' : 'inherit'};">${item.avgConceded}</td>
        <td class="text-center">${badgeHtml}</td>
      </tr>
    `;
  });

  html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  containerEl.innerHTML = html;
}

/**
 * ============================================================================
 * 4. EDICIÓN ADMIN DE MARCADORES DE LIGUILLA
 * ============================================================================
 */
let currentEditingMatchId = null;
let currentEditingSeriesId = 'primera_adulta';

export function openEditPlayoffModal(matchId, seriesId = 'primera_adulta') {
  if (!isAdmin()) {
    showToast('Acceso restringido: Solo la Directiva General puede editar marcadores de Liguilla', 'error');
    return;
  }

  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const playoffs = getPlayoffsData(activeId, seriesId);
  const clubsMap = {};
  (db.clubs || []).forEach(c => { clubsMap[c.id] = c; });

  let foundMatch = null;
  let foundRound = null;

  for (const r of (playoffs.rounds || [])) {
    const m = r.matches.find(item => item.id === matchId);
    if (m) {
      foundMatch = m;
      foundRound = r;
      break;
    }
  }

  if (!foundMatch) {
    showToast('No se encontró el partido en la liguilla', 'error');
    return;
  }

  currentEditingMatchId = matchId;
  currentEditingSeriesId = seriesId;

  const modal = document.getElementById('modal-edit-playoff');
  if (!modal) return;

  const titleEl = document.getElementById('edit-playoff-title');
  const homeNameEl = document.getElementById('edit-playoff-home-name');
  const awayNameEl = document.getElementById('edit-playoff-away-name');
  const inputHomeLeg1 = document.getElementById('edit-playoff-home-leg1');
  const inputAwayLeg1 = document.getElementById('edit-playoff-away-leg1');
  const inputHomeLeg2 = document.getElementById('edit-playoff-home-leg2');
  const inputAwayLeg2 = document.getElementById('edit-playoff-away-leg2');
  const inputPenHome = document.getElementById('edit-playoff-pen-home');
  const inputPenAway = document.getElementById('edit-playoff-pen-away');
  const selectStatus = document.getElementById('edit-playoff-status');
  const selectWinner = document.getElementById('edit-playoff-winner');

  const homeClub = clubsMap[foundMatch.homeClubId] || { name: foundMatch.placeholderHome || 'Local' };
  const awayClub = clubsMap[foundMatch.awayClubId] || { name: foundMatch.placeholderAway || 'Visita' };

  if (titleEl) titleEl.textContent = `Editar Marcador • ${foundMatch.name}`;
  if (homeNameEl) homeNameEl.textContent = homeClub.name;
  if (awayNameEl) awayNameEl.textContent = awayClub.name;

  if (inputHomeLeg1) inputHomeLeg1.value = foundMatch.homeLeg1 ?? (foundMatch.homeScore ?? '');
  if (inputAwayLeg1) inputAwayLeg1.value = foundMatch.awayLeg1 ?? (foundMatch.awayScore ?? '');
  if (inputHomeLeg2) inputHomeLeg2.value = foundMatch.homeLeg2 ?? '';
  if (inputAwayLeg2) inputAwayLeg2.value = foundMatch.awayLeg2 ?? '';
  if (inputPenHome) inputPenHome.value = foundMatch.penaltiesHome ?? '';
  if (inputPenAway) inputPenAway.value = foundMatch.penaltiesAway ?? '';
  if (selectStatus) selectStatus.value = foundMatch.status || 'finalizado';

  if (selectWinner) {
    selectWinner.innerHTML = `
      <option value="">-- Automático por Goles Globales --</option>
      ${foundMatch.homeClubId ? `<option value="${foundMatch.homeClubId}" ${foundMatch.winnerClubId === foundMatch.homeClubId ? 'selected' : ''}>Avanza ${homeClub.name}</option>` : ''}
      ${foundMatch.awayClubId ? `<option value="${foundMatch.awayClubId}" ${foundMatch.winnerClubId === foundMatch.awayClubId ? 'selected' : ''}>Avanza ${awayClub.name}</option>` : ''}
    `;
  }

  modal.classList.add('active');
}

export function saveEditPlayoffModal() {
  if (!isAdmin()) {
    showToast('Acceso restringido a Directiva General', 'error');
    return;
  }

  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const playoffs = getPlayoffsData(activeId, currentEditingSeriesId);

  let targetMatch = null;
  let targetRound = null;

  for (const r of (playoffs.rounds || [])) {
    const m = r.matches.find(item => item.id === currentEditingMatchId);
    if (m) {
      targetMatch = m;
      targetRound = r;
      break;
    }
  }

  if (!targetMatch) return;

  const hLeg1 = document.getElementById('edit-playoff-home-leg1')?.value;
  const aLeg1 = document.getElementById('edit-playoff-away-leg1')?.value;
  const hLeg2 = document.getElementById('edit-playoff-home-leg2')?.value;
  const aLeg2 = document.getElementById('edit-playoff-away-leg2')?.value;
  const pHome = document.getElementById('edit-playoff-pen-home')?.value;
  const pAway = document.getElementById('edit-playoff-pen-away')?.value;
  const status = document.getElementById('edit-playoff-status')?.value || 'finalizado';
  const customWinner = document.getElementById('edit-playoff-winner')?.value || '';

  // Actualizar valores
  if (targetRound.id === 'final') {
    targetMatch.homeScore = hLeg1 !== '' ? Number(hLeg1) : null;
    targetMatch.awayScore = aLeg1 !== '' ? Number(aLeg1) : null;
  } else {
    targetMatch.homeLeg1 = hLeg1 !== '' ? Number(hLeg1) : null;
    targetMatch.awayLeg1 = aLeg1 !== '' ? Number(aLeg1) : null;
    targetMatch.homeLeg2 = hLeg2 !== '' ? Number(hLeg2) : null;
    targetMatch.awayLeg2 = aLeg2 !== '' ? Number(aLeg2) : null;
  }

  targetMatch.penaltiesHome = pHome !== '' ? Number(pHome) : null;
  targetMatch.penaltiesAway = pAway !== '' ? Number(pAway) : null;
  targetMatch.status = status;

  // Determinar ganador
  if (customWinner) {
    targetMatch.winnerClubId = customWinner;
  } else {
    let totH = 0;
    let totA = 0;
    let hasScores = false;

    if (targetRound.id === 'final') {
      if (targetMatch.homeScore !== null && targetMatch.awayScore !== null) {
        totH = targetMatch.homeScore;
        totA = targetMatch.awayScore;
        hasScores = true;
      }
    } else {
      if (targetMatch.homeLeg1 !== null && targetMatch.awayLeg1 !== null) {
        totH += targetMatch.homeLeg1;
        totA += targetMatch.awayLeg1;
        hasScores = true;
      }
      if (targetMatch.homeLeg2 !== null && targetMatch.awayLeg2 !== null) {
        totH += targetMatch.homeLeg2;
        totA += targetMatch.awayLeg2;
        hasScores = true;
      }
    }

    if (hasScores) {
      if (totH > totA) {
        targetMatch.winnerClubId = targetMatch.homeClubId;
      } else if (totA > totH) {
        targetMatch.winnerClubId = targetMatch.awayClubId;
      } else {
        // Empate global: chequear penales
        if (targetMatch.penaltiesHome !== null && targetMatch.penaltiesAway !== null) {
          targetMatch.winnerClubId = targetMatch.penaltiesHome > targetMatch.penaltiesAway ? targetMatch.homeClubId : targetMatch.awayClubId;
        } else {
          targetMatch.winnerClubId = null;
        }
      }
    }
  }

  // Guardar estado de la liguilla primero
  saveDb(db, activeId);

  // Trazabilidad y Auditoría Institucional en el libro de actas
  addAuditLogEntry(
    'playoffs_update_match',
    `Marcador de liguilla actualizado en ${targetMatch.name}: Ganador=${targetMatch.winnerClubId || 'Pendiente'}, Estado=${targetMatch.status}`,
    activeId
  );

  // Cerrar modal
  document.getElementById('modal-edit-playoff')?.classList.remove('active');

  // Re-renderizar
  const container = document.getElementById('standings-playoffs-panel');
  if (container) {
    renderPlayoffsBracket(container, currentEditingSeriesId);
  }

  showToast('Marcador de Liguilla actualizado exitosamente', 'success');
}
