/**
 * LigaMaster - Base de Datos Oficial
 * Asociación de Fútbol de Arauco (Región del Biobío, Chile)
 * Sede Oficial: Calle Julio Montt Nº 386, Población 10 de Julio, Arauco
 * 
 * 10 Clubes Oficiales, 4 Series Reglamentarias, 800 Futbolistas Inscritos en Padrón Oficial
 */

import { LIGA_DEMO_DATA } from './data_liga_demo.js';
import { OFFICIAL_SPONSORS_INIT, resolveBrandLogo } from './sponsors-data.js';

export const STORAGE_KEY = 'LIGAMASTER_ARAUCO_DB_V15';

export const INITIAL_DATA = {
  ...LIGA_DEMO_DATA,
  regulations: {
    code: "REGLAMENTO-OFICIAL-COMPETICION-2026",
    disciplinaryCode: "Código de Procedimientos y Penalidades Oficial",
    substitutionRule: "Máximo 5 sustituciones en un máximo de 3 ventanas de interrupción por equipo (excluyendo entretiempo).",
    cardRules: {
      yellowAccumulation: 5,
      yellowWarning: 4,
      doubleYellow: 1,
      directRed: "2 a 4 fechas según tipificación en informe del árbitro central (CAPA)"
    },
    cupQualification: {
      regional: "Torneo Regional de Campeones (Clasifican el Campeón y Subcampeón comunal de Primera Adulta, Senior 35 y Súper Senior 45)",
      national: "Torneo Nacional de Clubes Campeones (Clasifica el Campeón Regional)"
    }
  },
  selectionInfo: {
    name: "Selección Oficial de Fútbol de Arauco",
    shortName: "Selección de Arauco",
    association: "Asociación de Fútbol de Arauco",
    regionalBody: "Comité Regional de Fútbol",
    season: "Torneo Regional de Selecciones 2026",
    colors: "Camiseta Roja Tricolor, Pantalón Blanco, Medias Rojas",
    nickname: "La Roja de Arauco / Los Costinos",
    venue: "Estadio Municipal Ramón Burgos Loyola",
    officialMedia: {
      name: "Voz Deportiva",
      channels: "Facebook Live & YouTube",
      coverage: "Transmisión oficial exclusiva de la campaña de Arauco en el Torneo Regional 2026"
    },
    honor: {
      seriesName: "Serie Primera Adulta",
      status: "clasificada",
      statusBadge: "🔥 ¡CLASIFICADA A CUARTOS DE FINAL!",
      badgeClass: "badge-live",
      headline: "Arauco avanza a Cuartos de Final con un contundente global de 11 a 5",
      summary: "La Selección Adulta de Arauco selló su paso a la ronda de los 8 mejores del Biobío. En la ida disputada en el Estadio Ramón Burgos vapuleó a Cavecur por 8-1, y en la revancha en Curanilahue cayó 3-4 en un electrizante partido, asegurando su clasificación a Cuartos de Final."
    }
  },
  mediaGallery: {
    photos: [
      {
        id: "photo-1",
        title: "Clásico comunal en el Estadio Ramón Burgos",
        match: "Fecha 3 • Campeonato Oficial",
        date: "27 de Septiembre 2026",
        venue: "Estadio Municipal Ramón Burgos",
        author: "Prensa AFA Arauco",
        url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "photo-2",
        title: "Disputa de balón en Serie Senior",
        match: "Fecha 2 • Serie Senior",
        date: "20 de Septiembre 2026",
        venue: "Estadio Sebastián Gaete",
        author: "Voz Deportiva",
        url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80"
      }
    ],
    videos: [
      {
        id: "vid-1",
        title: "Golazo de tiro libre Fecha 3 Primera Adulta",
        category: "Gol de la Fecha",
        duration: "0:45",
        views: "1.420 reproducciones",
        thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Impresionante remate al ángulo en el clásico comunal."
      }
    ]
  },
  venues: [
    {
      id: "estadio-ramon-burgos",
      name: "Estadio Municipal Ramón Burgos Loyola",
      shortName: "Estadio Ramón Burgos",
      address: "Avenida Prat s/n, Arauco",
      surfaceType: "sintetico",
      surface: "Pasto Sintético Certificado FIFA",
      capacity: "2.500 personas",
      lighting: "Iluminación Artificial LED (Habilitado Turno Nocturno)",
      coordinates: "-37.2472, -73.3168",
      status: "habilitada",
      statusLabel: "🟢 Habilitada (Cancha Principal)",
      usageNotes: "Sede principal comunal de la Serie Primera Adulta (Honor), clásicos y selecciones.",
      features: ["⚡ Pasto Sintético", "💡 Torres LED", "🚿 Camarines Nuevos", "📻 Cabina de Transmisión"],
      mapsUrl: "https://maps.google.com/?q=Estadio+Municipal+Ramon+Burgos+Arauco",
      photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      isMain: true
    },
    {
      id: "estadio-sebastian-gaete",
      name: "Estadio Sebastián Gaete",
      shortName: "Estadio Sebastián Gaete",
      address: "Sector Céntrico, Arauco",
      surfaceType: "sintetico",
      surface: "Pasto Sintético de Alto Tráfico",
      capacity: "1.200 personas",
      lighting: "Iluminación Artificial",
      coordinates: "-37.2435, -73.3195",
      status: "habilitada",
      statusLabel: "🟢 Habilitada (Cancha Oficial)",
      usageNotes: "Recinto céntrico de alto tráfico comunal, sede de series Senior, Súper Senior y Juvenil.",
      features: ["⚡ Pasto Sintético", "💡 Iluminación", "🚿 Camarines", "🏟️ Graderías Techadas"],
      mapsUrl: "https://maps.google.com/?q=Estadio+Sebastian+Gaete+Arauco",
      photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
      isMain: false
    }
  ],
  sponsors: JSON.parse(JSON.stringify(OFFICIAL_SPONSORS_INIT))
};

export const OFFICIAL_ARAUCO_VENUES = INITIAL_DATA.venues;

export const MULTI_LEAGUE_STORE = {
  arauco: INITIAL_DATA
};

export const REGIONS_AND_LEAGUES = [
  {
    regionId: "biobio",
    regionName: "Región del Biobío",
    leagues: [
      {
        id: "arauco",
        name: "Asociación de Fútbol de Arauco",
        shortName: "AFA Arauco",
        badgeId: "asociacion-arauco",
        commune: "Arauco (Capital Comunal)",
        founded: "01 de octubre de 1940 (86 años de historia)",
        president: "Claudio Pampaloni Altamirano",
        totalClubs: 10,
        status: "oficial",
        statusLabel: "Asociación Oficial",
        isDemo: false
      },
      {
        id: "curanilahue",
        name: "Asociación de Fútbol de Curanilahue",
        shortName: "AF Curanilahue",
        badgeId: "asociacion-curanilahue",
        commune: "Curanilahue",
        founded: "15 de mayo de 1952",
        president: "Directiva Asociación Curanilahue",
        totalClubs: 8,
        status: "asociacion_disponible",
        statusLabel: "Plataforma Habilitada",
        isDemo: true
      },
      {
        id: "lebu",
        name: "Asociación de Fútbol de Lebu",
        shortName: "AF Lebu",
        badgeId: "asociacion-lebu",
        commune: "Lebu (Capital Provincial)",
        founded: "22 de agosto de 1948",
        president: "Directiva Asociación Lebu",
        totalClubs: 8,
        status: "asociacion_disponible",
        statusLabel: "Plataforma Habilitada",
        isDemo: true
      },
      {
        id: "canete",
        name: "Asociación de Fútbol de Cañete",
        shortName: "AF Cañete",
        badgeId: "asociacion-canete",
        commune: "Cañete",
        founded: "12 de noviembre de 1955",
        president: "Directiva Asociación Cañete",
        totalClubs: 8,
        status: "asociacion_disponible",
        statusLabel: "Plataforma Habilitada",
        isDemo: true
      }
    ]
  }
];

const memStorage = new Map();

function safeStorageGet(key) {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch (e) {}
  return memStorage.get(key) || null;
}

function safeStorageSet(key, value) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  } catch (e) {}
  memStorage.set(key, String(value));
}

export function getActiveLeagueId() {
  const saved = safeStorageGet('LIGAMASTER_ACTIVE_LEAGUE_ID');
  if (saved && REGIONS_AND_LEAGUES[0].leagues.some(l => l.id === saved)) {
    return saved;
  }
  return 'arauco';
}

export function setActiveLeagueId(leagueId) {
  const valid = REGIONS_AND_LEAGUES[0].leagues.some(l => l.id === leagueId) ? leagueId : 'arauco';
  safeStorageSet('LIGAMASTER_ACTIVE_LEAGUE_ID', valid);
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('ligamaster:league-changed', { detail: valid }));
  }
}

export function getLeagueById(leagueId) {
  const target = leagueId || getActiveLeagueId();
  for (const reg of REGIONS_AND_LEAGUES) {
    const found = reg.leagues.find(l => l.id === target);
    if (found) return found;
  }
  return REGIONS_AND_LEAGUES[0].leagues[0];
}

export function getRegionsAndLeagues() {
  return REGIONS_AND_LEAGUES;
}

export function getLeagueSeries(leagueId = null) {
  const db = getDb(leagueId);
  return db.seriesList || INITIAL_DATA.seriesList;
}

/**
 * Generador modular de datos para asociaciones de la plataforma LigaMaster
 */
function generateModularAssociationDb(leagueId, leagueName, commune) {
  const clubCatalog = {
    curanilahue: [
      { name: "Club Deportivo Curanilahue", color: "#16a34a", stadium: "Estadio Municipal Raúl Erazo" },
      { name: "Club Minero Colico", color: "#0f172a", stadium: "Cancha Colico Norte" },
      { name: "Club Deportivo Miraflores", color: "#2563eb", stadium: "Estadio Municipal Raúl Erazo" },
      { name: "Club Deportivo Arturo Prat", color: "#dc2626", stadium: "Cancha Prat Curanilahue" },
      { name: "Club Deportivo Estrella Verde", color: "#059669", stadium: "Estadio Municipal Raúl Erazo" },
      { name: "Club Huracán de Curanilahue", color: "#d97706", stadium: "Cancha Huracán" },
      { name: "Club Unión Central Minera", color: "#7c3aed", stadium: "Estadio Municipal Raúl Erazo" },
      { name: "Club Juventud de Curanilahue", color: "#ea580c", stadium: "Cancha Juventud" }
    ],
    lebu: [
      { name: "Club Deportivo Boca Lebu", color: "#2563eb", stadium: "Estadio Municipal de Lebu" },
      { name: "Club Social y Deportivo Lebu", color: "#dc2626", stadium: "Estadio Municipal de Lebu" },
      { name: "Club Deportivo Victoria", color: "#16a34a", stadium: "Cancha Victoria" },
      { name: "Club Deportivo Costanera", color: "#0284c7", stadium: "Estadio Municipal de Lebu" },
      { name: "Club Estrella del Mar", color: "#0d9488", stadium: "Cancha Costanera Sur" },
      { name: "Club Deportivo Laja Lebu", color: "#d97706", stadium: "Estadio Municipal de Lebu" },
      { name: "Club Juventud Lebu", color: "#7c3aed", stadium: "Cancha El Carbón" },
      { name: "Club Defensor Santa Fe", color: "#b91c1c", stadium: "Estadio Municipal de Lebu" }
    ],
    canete: [
      { name: "Club Deportivo Alianza Cañete", color: "#2563eb", stadium: "Estadio Fiscal de Cañete" },
      { name: "Club Deportivo Cañete", color: "#dc2626", stadium: "Estadio Fiscal de Cañete" },
      { name: "Club Barrio Norte Cañete", color: "#16a34a", stadium: "Cancha Barrio Norte" },
      { name: "Club Deportivo Lautaro", color: "#d97706", stadium: "Estadio Fiscal de Cañete" },
      { name: "Club Huracán de Cañete", color: "#059669", stadium: "Cancha Huracán Cañete" },
      { name: "Club Deportivo Pangue", color: "#0284c7", stadium: "Estadio Fiscal de Cañete" },
      { name: "Club Juvenil Cayucupil", color: "#7c3aed", stadium: "Cancha Cayucupil" },
      { name: "Club Real Victoria", color: "#b91c1c", stadium: "Estadio Fiscal de Cañete" }
    ]
  };

  const clubsInfo = clubCatalog[leagueId] || clubCatalog.curanilahue;
  const seriesList = [
    { id: 'primera_adulta', name: 'Primera Adulta (Honor)', shortName: '1ª Adulta', order: 1 },
    { id: 'senior', name: 'Serie Senior (35+)', shortName: 'Senior', order: 2 },
    { id: 'super_senior', name: 'Serie Súper Senior (45+)', shortName: 'Súper Senior', order: 3 },
    { id: 'juvenil', name: 'Serie Juvenil (Sub-18)', shortName: 'Juvenil', order: 4 }
  ];

  const clubs = clubsInfo.map((ci, idx) => ({
    id: `club-${leagueId}-${idx + 1}`,
    name: ci.name,
    shortName: ci.name.replace("Club Deportivo ", "").replace("Club ", ""),
    badgeId: `club-${leagueId}-${idx + 1}`,
    primaryColor: ci.color,
    secondaryColor: "#ffffff",
    founded: "1960",
    stadium: ci.stadium,
    president: `Directiva ${ci.name}`,
    statusLegal: "Personalidad Jurídica Vigente",
    series: ['primera_adulta', 'senior', 'super_senior', 'juvenil'],
    titles: `${(idx % 4) + 1} Títulos Comunales`,
    description: `Institución deportiva oficial afiliada a la ${leagueName}.`
  }));

  const standings = {};
  seriesList.forEach(s => {
    standings[s.id] = clubs.map((c, i) => ({
      position: i + 1,
      clubId: c.id,
      clubName: c.name,
      pj: 3,
      pg: i < 3 ? 3 - i : (i < 6 ? 1 : 0),
      pe: i === 3 || i === 4 ? 1 : 0,
      pp: i >= 5 ? 2 : 0,
      gf: 7 - i > 0 ? 7 - i : 1,
      gc: i + 1,
      dg: (7 - i > 0 ? 7 - i : 1) - (i + 1),
      pts: i === 0 ? 9 : (i === 1 ? 6 : (i === 2 ? 4 : (i === 3 ? 4 : (i === 4 ? 2 : 0)))),
      form: ["W", "W", i % 2 === 0 ? "W" : "D"]
    }));
  });

  const players = [];
  const positions = ["Portero", "Defensa Central", "Lateral", "Mediocampista", "Delantero"];
  clubs.forEach((c, cIdx) => {
    seriesList.forEach((s) => {
      positions.forEach((pos, pIdx) => {
        const num = (pIdx * 2) + 1;
        players.push({
          id: `p-${leagueId}-${c.id}-${s.id}-${num}`,
          name: `Jugador ${c.shortName} #${num}`,
          rut: `1${cIdx + 2}.${pIdx + 1}00.${s.order}00-K`,
          clubId: c.id,
          clubName: c.name,
          series: s.id,
          number: num,
          position: pos,
          specificPosition: pos,
          birthDate: "1994-05-12",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
          status: "Activo",
          regAnfa: `REG-${leagueId.toUpperCase()}-${cIdx+1}${num}`,
          matchesPlayed: 3,
          goals: pos === "Delantero" ? (3 - (cIdx % 3)) : 0,
          yellowCards: cIdx % 2,
          redCards: 0,
          stats: {
            goals: pos === "Delantero" ? (3 - (cIdx % 3)) : 0,
            assists: 1,
            matches: 3,
            yellowCards: cIdx % 2,
            redCards: 0
          }
        });
      });
    });
  });

  const matches = [
    {
      id: `m-${leagueId}-f1-1`,
      round: 1,
      roundName: "Jornada 1",
      series: "primera_adulta",
      date: "2026-09-06",
      time: "15:30",
      homeClubId: clubs[0].id,
      awayClubId: clubs[1].id,
      homeScore: 3,
      awayScore: 1,
      status: "finalizado",
      venue: clubs[0].stadium,
      referee: "Colegio de Árbitros Oficial"
    },
    {
      id: `m-${leagueId}-f2-1`,
      round: 2,
      roundName: "Jornada 2",
      series: "primera_adulta",
      date: "2026-09-13",
      time: "15:30",
      homeClubId: clubs[2].id,
      awayClubId: clubs[0].id,
      homeScore: 0,
      awayScore: 2,
      status: "finalizado",
      venue: clubs[2].stadium,
      referee: "Colegio de Árbitros Oficial"
    },
    {
      id: `m-${leagueId}-f3-1`,
      round: 3,
      roundName: "Jornada 3",
      series: "primera_adulta",
      date: "2026-09-20",
      time: "15:30",
      homeClubId: clubs[0].id,
      awayClubId: clubs[3].id,
      homeScore: 2,
      awayScore: 1,
      status: "finalizado",
      venue: clubs[0].stadium,
      referee: "Colegio de Árbitros Oficial"
    },
    {
      id: `m-${leagueId}-f4-1`,
      round: 4,
      roundName: "Jornada 4",
      series: "primera_adulta",
      date: "2026-10-04",
      time: "15:30",
      homeClubId: clubs[1].id,
      awayClubId: clubs[2].id,
      homeScore: null,
      awayScore: null,
      status: "programado",
      venue: clubs[1].stadium,
      referee: "Por Designar"
    }
  ];

  return {
    league: {
      id: leagueId,
      name: leagueName,
      commune: commune,
      season: "Temporada 2026",
      totalClubs: clubs.length,
      currentRound: 4
    },
    seriesList: seriesList,
    clubs: clubs,
    standings: standings,
    players: players,
    matches: matches,
    scorers: standings['primera_adulta'].map((st, i) => ({
      playerId: `p-${leagueId}-${st.clubId}-primera_adulta-9`,
      name: `Goleador ${st.clubName}`,
      clubId: st.clubId,
      clubName: st.clubName,
      goals: 4 - (i % 3),
      matches: 3
    })),
    news: [
      {
        id: `news-${leagueId}-1`,
        title: `Fixture y programación oficial en ${leagueName}`,
        date: "02 de Octubre, 2026",
        category: "Oficial",
        summary: `La ${leagueName} inicia su fase regular en la plataforma LigaMaster con seguimiento en tiempo real.`,
        content: `Todos los clubes afiliados a la ${leagueName} ya cuentan con sus planteles y fixture homologados en LigaMaster.`,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        author: `Directiva ${leagueName}`
      }
    ],
    sponsors: JSON.parse(JSON.stringify(OFFICIAL_SPONSORS_INIT))
  };
}

/**
 * Retorna la base de datos oficial de la liga activa o solicitada
 */
export function getDb(leagueId = null) {
  const currentId = leagueId || getActiveLeagueId() || 'arauco';

  if (currentId === 'arauco') {
    const storageKey = `LIGAMASTER_LEAGUE_ARAUCO_V15`;
    try {
      const raw = safeStorageGet(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        let updated = false;

        // Autocorrección: Garantizar que todos los sponsors tengan logo oficial
        if (parsed.sponsors && Array.isArray(parsed.sponsors)) {
          parsed.sponsors.forEach(s => {
            if (!s.logoBase64) {
              s.logoBase64 = resolveBrandLogo(s.name);
              updated = true;
            }
          });
        }

        // Autocorrección: Garantizar registro de auditoría institucional
        if (!parsed.auditLog || !Array.isArray(parsed.auditLog)) {
          parsed.auditLog = [
            {
              id: 'audit-init',
              timestamp: new Date().toISOString(),
              formattedTime: 'Temporada Oficial',
              user: 'Sistema LigaMaster',
              role: '🏛️ Directiva',
              action: 'Apertura de Libro Digital',
              details: 'Libro oficial de actas y trazabilidad institucional habilitado para protección de datos.'
            }
          ];
          updated = true;
        }

        // Autocorrección: Garantizar recintos oficiales de Arauco (Ramón Burgos y Sebastián Gaete)
        if (!parsed.venues || !Array.isArray(parsed.venues) || parsed.venues.length < 2) {
          parsed.venues = JSON.parse(JSON.stringify(OFFICIAL_ARAUCO_VENUES));
          updated = true;
        }

        // Normalizar recintos de partidos de Arauco entre Ramón Burgos y Sebastián Gaete
        if (parsed.matches && Array.isArray(parsed.matches)) {
          parsed.matches.forEach((m, idx) => {
            if (!m.venueId || (!m.venueId.includes('ramon-burgos') && !m.venueId.includes('sebastian-gaete'))) {
              if (m.series === 'primera_adulta' || m.series === 'honor' || idx % 2 === 0) {
                m.venueId = 'estadio-ramon-burgos';
                m.venue = 'Estadio Municipal Ramón Burgos';
              } else {
                m.venueId = 'estadio-sebastian-gaete';
                m.venue = 'Estadio Sebastián Gaete';
              }
              updated = true;
            }
            if (!Array.isArray(m.scorers)) {
              m.scorers = [];
              updated = true;
            }
            if (!Array.isArray(m.timeline)) {
              m.timeline = [];
              updated = true;
            }
          });
        }

        if (updated) saveDb(parsed, 'arauco');
        return parsed;
      }
    } catch (e) {
      console.error("Error leyendo base de datos de Arauco", e);
    }
    const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
    cloned.venues = JSON.parse(JSON.stringify(OFFICIAL_ARAUCO_VENUES));
    if (cloned.matches && Array.isArray(cloned.matches)) {
      cloned.matches.forEach((m, idx) => {
        if (!m.venueId || (!m.venueId.includes('ramon-burgos') && !m.venueId.includes('sebastian-gaete'))) {
          if (m.series === 'primera_adulta' || m.series === 'honor' || idx % 2 === 0) {
            m.venueId = 'estadio-ramon-burgos';
            m.venue = 'Estadio Municipal Ramón Burgos';
          } else {
            m.venueId = 'estadio-sebastian-gaete';
            m.venue = 'Estadio Sebastián Gaete';
          }
        }
        if (!Array.isArray(m.scorers)) m.scorers = [];
        if (!Array.isArray(m.timeline)) m.timeline = [];
      });
    }
    if (!cloned.auditLog) {
      cloned.auditLog = [
        {
          id: 'audit-init',
          timestamp: new Date().toISOString(),
          formattedTime: 'Temporada Oficial',
          user: 'Sistema LigaMaster',
          role: '🏛️ Directiva',
          action: 'Apertura de Libro Digital',
          details: 'Libro oficial de actas y trazabilidad institucional habilitado.'
        }
      ];
    }
    saveDb(cloned, 'arauco');
    return cloned;
  }

  // Multi-Asociación dinámica (Curanilahue, Lebu, Cañete)
  const storageKey = `LIGAMASTER_LEAGUE_${currentId.toUpperCase()}_V1`;
  try {
    const raw = safeStorageGet(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      let updated = false;

      if (parsed.sponsors && Array.isArray(parsed.sponsors)) {
        parsed.sponsors.forEach(s => {
          if (!s.logoBase64) {
            s.logoBase64 = resolveBrandLogo(s.name);
            updated = true;
          }
        });
      }

      if (!parsed.auditLog || !Array.isArray(parsed.auditLog)) {
        parsed.auditLog = [
          {
            id: 'audit-init',
            timestamp: new Date().toISOString(),
            formattedTime: 'Temporada Oficial',
            user: 'Sistema LigaMaster',
            role: '🏛️ Directiva',
            action: 'Apertura de Libro Digital',
            details: 'Libro oficial de actas y trazabilidad institucional habilitado.'
          }
        ];
        updated = true;
      }

      if (updated) saveDb(parsed, currentId);
      return parsed;
    }
  } catch (e) {}

  const leagueInfo = getLeagueById(currentId);
  const modularDb = generateModularAssociationDb(currentId, leagueInfo.name, leagueInfo.commune);
  if (!modularDb.auditLog) {
    modularDb.auditLog = [
      {
        id: 'audit-init',
        timestamp: new Date().toISOString(),
        formattedTime: 'Temporada Oficial',
        user: 'Sistema LigaMaster',
        role: '🏛️ Directiva',
        action: 'Apertura de Libro Digital',
        details: 'Libro oficial de actas y trazabilidad institucional habilitado.'
      }
    ];
  }
  saveDb(modularDb, currentId);
  return modularDb;
}

/**
 * Guarda el estado de la base de datos
 */
export function saveDb(data, leagueId = null) {
  const currentId = leagueId || getActiveLeagueId() || 'arauco';
  const storageKey = currentId === 'arauco' ? `LIGAMASTER_LEAGUE_ARAUCO_V15` : `LIGAMASTER_LEAGUE_${currentId.toUpperCase()}_V1`;

  try {
    safeStorageSet(storageKey, JSON.stringify(data));
    if (currentId === 'arauco') {
      safeStorageSet(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error("Error guardando base de datos", e);
  }
}

/**
 * Restaura la base de datos a sus valores oficiales
 */
export function resetDb(leagueId = null) {
  const currentId = leagueId || getActiveLeagueId() || 'arauco';
  if (currentId === 'arauco') {
    const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveDb(cloned, 'arauco');
    return cloned;
  }
  const leagueInfo = getLeagueById(currentId);
  const modularDb = generateModularAssociationDb(currentId, leagueInfo.name, leagueInfo.commune);
  saveDb(modularDb, currentId);
  return modularDb;
}

// Métodos de conveniencia para la aplicación
export function getClubById(clubId, leagueId = null) {
  const db = getDb(leagueId);
  return (db.clubs || []).find(c => c.id === clubId);
}

export function getAllClubs(leagueId = null) {
  const db = getDb(leagueId);
  return db.clubs || [];
}

export function getPlayerById(playerId, leagueId = null) {
  const db = getDb(leagueId);
  return (db.players || []).find(p => p.id === playerId);
}

export function getPlayersByClub(clubId, leagueId = null) {
  const db = getDb(leagueId);
  return (db.players || []).filter(p => p.clubId === clubId);
}

export function getMatchesByRound(roundNumber, leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.round === roundNumber);
}

export function getMatchesByClub(clubId, leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.homeClubId === clubId || m.awayClubId === clubId);
}

export function getUpcomingMatches(leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.status === 'programado');
}

export function getRecentResults(leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.status === 'finalizado');
}

export function getStandings(seriesId = 'primera_adulta', leagueId = null) {
  const db = getDb(leagueId);
  return (db.standings && db.standings[seriesId]) || [];
}

export function getLiveMatches(leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.status === 'en_vivo');
}

export function getMatchesByVenue(venueId, leagueId = null) {
  const db = getDb(leagueId);
  return (db.matches || []).filter(m => m.venueId === venueId);
}

export function getVenues(leagueId = null) {
  const db = getDb(leagueId);
  if (db.venues && Array.isArray(db.venues) && db.venues.length > 0) {
    return db.venues;
  }
  return OFFICIAL_ARAUCO_VENUES;
}

export function updateVenueStatus(venueId, status, statusLabel, leagueId = null) {
  const currentId = leagueId || getActiveLeagueId() || 'arauco';
  const db = getDb(currentId);
  if (!db.venues) db.venues = JSON.parse(JSON.stringify(OFFICIAL_ARAUCO_VENUES));
  const v = db.venues.find(item => item.id === venueId);
  if (v) {
    v.status = status;
    v.statusLabel = statusLabel;
    saveDb(db, currentId);
  }
}

/**
 * Recalcula la tabla de posiciones oficial para la serie indicada
 */
export function recalculateStandings(db, series = 'primera_adulta') {
  if (!db.clubs || !db.matches) return [];

  const targetSeries = (series === 'honor') ? 'primera_adulta' : series;
  const seriesMatches = db.matches.filter(m => (m.series === targetSeries || (targetSeries === 'primera_adulta' && m.series === 'honor')) && (m.status === 'finalizado' || m.status === 'en_vivo'));

  if (!db.standings) db.standings = {};

  const statsMap = {};
  db.clubs.forEach(c => {
    statsMap[c.id] = {
      clubId: c.id,
      clubName: c.name,
      played: 0, won: 0, drawn: 0, lost: 0,
      gf: 0, ga: 0, gd: 0, points: 0,
      pj: 0, pg: 0, pe: 0, pp: 0, pts: 0
    };
  });

  seriesMatches.forEach(m => {
    const h = statsMap[m.homeClubId];
    const a = statsMap[m.awayClubId];
    if (!h || !a) return;

    const hs = parseInt(m.homeScore ?? 0, 10);
    const as = parseInt(m.awayScore ?? 0, 10);

    h.played += 1; h.pj += 1;
    a.played += 1; a.pj += 1;
    h.gf += hs;
    h.ga += as;
    a.gf += as;
    a.ga += hs;

    if (hs > as) {
      h.won += 1; h.pg += 1;
      h.points += 3; h.pts += 3;
      a.lost += 1; a.pp += 1;
    } else if (hs < as) {
      a.won += 1; a.pg += 1;
      a.points += 3; a.pts += 3;
      h.lost += 1; h.pp += 1;
    } else {
      h.drawn += 1; h.pe += 1;
      h.points += 1; h.pts += 1;
      a.drawn += 1; a.pe += 1;
      a.points += 1; a.pts += 1;
    }

    h.gd = h.gf - h.ga;
    a.gd = a.gf - a.ga;
  });

  const sorted = Object.values(statsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  sorted.forEach((item, idx) => {
    item.position = idx + 1;
  });

  db.standings[targetSeries] = sorted;
  return sorted;
}


export function getSelectionInfo(leagueId = null) {
  const db = getDb(leagueId);
  return db.selectionInfo || INITIAL_DATA.selectionInfo;
}

export function getNews(leagueId = null) {
  const db = getDb(leagueId);
  return db.news || [];
}

export function addNews(newsItem, leagueId = null) {
  const db = getDb(leagueId);
  if (!db.news) db.news = [];
  
  const newItem = {
    id: `news-${Date.now()}`,
    title: newsItem.title || "Comunicado Oficial",
    category: newsItem.category || "Torneo Oficial",
    categoryBadge: newsItem.categoryBadge || "📢 COMUNICADO",
    date: "Recién publicado",
    readTime: "2 min de lectura",
    author: newsItem.author || db.leagueInfo?.name || "Directiva de Liga",
    hero: false,
    image: newsItem.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
    excerpt: newsItem.excerpt || "",
    content: newsItem.content || newsItem.excerpt || "",
    tags: [db.leagueInfo?.shortName || "LigaMaster"]
  };

  db.news.unshift(newItem);
  saveDb(db, leagueId);

  window.dispatchEvent(new CustomEvent('ligapro:news-updated', { detail: newItem }));
  return newItem;
}

export function getMediaGallery(leagueId = null) {
  const db = getDb(leagueId);
  return db.mediaGallery || INITIAL_DATA.mediaGallery;
}

export function addMediaPhoto(photoItem, leagueId = null) {
  const db = getDb(leagueId);
  if (!db.mediaGallery) db.mediaGallery = { photos: [], videos: [] };
  
  const newPhoto = {
    id: `photo-${Date.now()}`,
    title: photoItem.title || "Postal de Cancha",
    match: photoItem.match || "Jornada Oficial",
    date: "Reciente",
    venue: photoItem.venue || (db.venues && db.venues[0] ? db.venues[0].name : "Recinto Oficial"),
    author: photoItem.author || "Prensa Oficial",
    url: photoItem.url
  };

  db.mediaGallery.photos.unshift(newPhoto);
  saveDb(db, leagueId);
  window.dispatchEvent(new CustomEvent('ligapro:media-updated', { detail: { type: 'photo', item: newPhoto } }));
  return newPhoto;
}

export function addMediaVideo(videoItem, leagueId = null) {
  const db = getDb(leagueId);
  if (!db.mediaGallery) db.mediaGallery = { photos: [], videos: [] };

  const newVideo = {
    id: `vid-${Date.now()}`,
    title: videoItem.title || "Jugada Destacada",
    category: videoItem.category || "Gol de la Fecha",
    duration: videoItem.duration || "1:00",
    views: "1 reproducción",
    thumbnail: videoItem.thumbnail || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
    videoUrl: videoItem.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: videoItem.description || ""
  };

  db.mediaGallery.videos.unshift(newVideo);
  saveDb(db, leagueId);
  window.dispatchEvent(new CustomEvent('ligapro:media-updated', { detail: { type: 'video', item: newVideo } }));
  return newVideo;
}

/**
 * Registra una acción oficial en el Libro Digital de Auditoría y Trazabilidad
 */
export function addAuditLogEntry(action, details, leagueId = null) {
  try {
    const currentId = leagueId || getActiveLeagueId() || 'arauco';
    const db = getDb(currentId);
    if (!db.auditLog || !Array.isArray(db.auditLog)) db.auditLog = [];

    let user = 'Dirigente Oficial';
    let role = 'admin';
    try {
      if (typeof localStorage !== 'undefined') {
        user = localStorage.getItem('LIGAMASTER_CURRENT_USER_V1') || 'Directiva General';
        role = localStorage.getItem('LIGAMASTER_CURRENT_ROLE_V1') || 'admin';
      }
    } catch (e) {}

    const now = new Date();
    const formattedTime = now.toLocaleString('es-CL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const entry = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: now.toISOString(),
      formattedTime,
      user,
      role: role === 'admin' ? '🏛️ Directiva' : (role === 'referee' ? '⏱️ Turno' : 'Visitante'),
      action,
      details
    };

    db.auditLog.unshift(entry);
    if (db.auditLog.length > 80) {
      db.auditLog = db.auditLog.slice(0, 80);
    }
    saveDb(db, currentId);
    return entry;
  } catch (err) {
    console.error('Error en addAuditLogEntry:', err);
    return null;
  }
}

/**
 * Retorna el libro de auditoría de la liga activa
 */
export function getAuditLog(leagueId = null) {
  const currentId = leagueId || getActiveLeagueId() || 'arauco';
  const db = getDb(currentId);
  return db.auditLog || [];
}
