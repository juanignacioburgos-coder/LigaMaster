/**
 * LigaMaster - Base de Datos Oficial ANFA Arauco
 * Asociación de Fútbol Amateur de Arauco (Región del Biobío, Chile)
 * Sede Oficial: Calle Julio Montt Nº 386, Población 10 de Julio, Arauco
 * Afiliada a ANFA Región del Biobío y ANFA Nacional de Chile
 * 
 * 10 Clubes Oficiales, 4 Series Reglamentarias, 800 Futbolistas Inscritos con Carnet ANFA
 */

import { LIGA_DEMO_DATA } from './data_liga_demo.js';

export const STORAGE_KEY = 'LIGAMASTER_ARAUCO_DB_V15';

export const INITIAL_DATA = {
  ...LIGA_DEMO_DATA,
  regulations: {
    code: "REGLAMENTO-OFICIAL-ANFA-BIOBIO-2026",
    disciplinaryCode: "Código de Procedimientos y Penalidades ANFA Nacional",
    substitutionRule: "Máximo 5 sustituciones en un máximo de 3 ventanas de interrupción por equipo (excluyendo entretiempo).",
    cardRules: {
      yellowAccumulation: 5,
      yellowWarning: 4,
      doubleYellow: 1,
      directRed: "2 a 4 fechas según tipificación en informe del árbitro central (CAPA)"
    },
    cupQualification: {
      regional: "Copa de Campeones ANFA Biobío (Clasifican el Campeón y Subcampeón comunal de Primera Adulta, Senior 35 y Súper Senior 45)",
      national: "Campeonato Nacional de Clubes Campeones ANFA (Clasifica el Campeón Regional de ANFA Biobío)"
    }
  },
  selectionInfo: {
    name: "Selección Oficial de Fútbol de Arauco",
    shortName: "Selección de Arauco",
    association: "Asociación de Fútbol Amateur de Arauco",
    regionalBody: "ANFA Región del Biobío",
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
  }
};

export const MULTI_LEAGUE_STORE = {
  arauco: INITIAL_DATA,
  'liga-demo': INITIAL_DATA
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
        statusLabel: "Asociación Oficial ANFA",
        isDemo: false
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
  return 'arauco';
}

export function setActiveLeagueId(leagueId) {
  safeStorageSet('LIGAMASTER_ACTIVE_LEAGUE_ID', 'arauco');
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('ligamaster:league-changed', { detail: 'arauco' }));
  }
}

export function getLeagueById(leagueId) {
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
 * Retorna la base de datos oficial de Arauco
 */
export function getDb(leagueId = null) {
  const storageKey = `LIGAMASTER_LEAGUE_ARAUCO_V15`;

  try {
    const raw = safeStorageGet(storageKey);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error leyendo base de datos de Arauco", e);
  }

  const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveDb(cloned, 'arauco');
  return cloned;
}

/**
 * Guarda el estado de la base de datos de Arauco
 */
export function saveDb(data, leagueId = null) {
  const storageKey = `LIGAMASTER_LEAGUE_ARAUCO_V15`;

  try {
    safeStorageSet(storageKey, JSON.stringify(data));
    safeStorageSet(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando base de datos de Arauco", e);
  }
}

/**
 * Restaura la base de datos de Arauco a sus valores oficiales
 */
export function resetDb(leagueId = null) {
  const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveDb(cloned, 'arauco');
  return cloned;
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
