/**
 * LigaPro Amateur - Base de Datos Oficial ANFA Arauco
 * Asociación de Fútbol Amateur de Arauco (Región del Biobío, Chile)
 * Sede Oficial: Calle Julio Montt Nº 386, Población 10 de Julio, Arauco
 * Afiliada a ANFA Región del Biobío y ANFA Nacional de Chile
 * 
 * DATOS PUROS Y REGLAMENTARIOS:
 * - 10 Clubes Oficiales con historia documentada, fechas de fundación exactas y palmarés.
 * - Estructura de Series y Categorías Oficiales de ANFA.
 * - Registro de participaciones en Copa de Campeones ANFA Biobío y Torneo Nacional.
 */

import { LIGA_DEMO_DATA } from './data_liga_demo.js';

export const STORAGE_KEY = 'LIGAMASTER_ARAUCO_DB_V14';

export const INITIAL_DATA = {
  leagueInfo: {
    name: "Asociación de Fútbol de Arauco",
    shortName: "AFA Arauco",
    foundationDate: "01 de octubre de 1940",
    anniversary: "Fundada el 1 de Octubre de 1940 (86 años de historia). 10ª agrupación más antigua de la Región del Biobío (de 33 asociaciones).",
    president: "Claudio Pampaloni Altamirano",
    mediaPartner: "Voz Deportiva (Transmisión oficial lunes, miércoles y viernes 20:00 hrs)",
    commune: "Arauco, Región del Biobío, Chile",
    headquarters: "Julio Montt Nº 386, Población 10 de Julio, Arauco",
    season: "Campeonato Oficial 2026/27",
    activeSeries: "honor",
    totalClubs: 10,
    governingBodies: {
      regional: "ANFA Región del Biobío",
      national: "Asociación Nacional de Fútbol Amateur (ANFA Chile)",
      referees: "Colegio de Árbitros de la Provincia de Arauco (CAPA)",
      broadcast: "Voz Deportiva"
    },
    activeMatchId: "match-arauco-01",
    leagueId: "arauco",
    badgeId: "asociacion-arauco",
    isDemo: false
  },

  /**
   * Recintos y Canchas Oficiales de ANFA Arauco
   * Los 2 recintos principales habilitados más la Cancha El Sausalito
   */
  venues: [
    {
      id: "estadio-ramon-burgos",
      name: "Estadio Municipal Ramón Burgos",
      shortName: "Estadio Ramón Burgos",
      commune: "Arauco",
      surface: "Pasto Sintético Certificado",
      surfaceType: "sintetico",
      lighting: "Iluminación Artificial LED (Apta nocturna)",
      capacity: "2.500 espectadores",
      address: "Avenida Prat s/n, Arauco",
      mapsUrl: "https://maps.google.com/?q=Estadio+Municipal+Ramon+Burgos+Arauco",
      status: "habilitada",
      statusLabel: "🟢 Habilitada (Cancha Principal)",
      usageNotes: "Principal recinto deportivo comunal. Alberga el 65% de la fecha oficial de Honor, Senior y Juvenil.",
      photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
      coordinates: "-37.2472, -73.3181",
      features: ["Pasto Sintético", "Iluminación LED", "Graderías Techadas", "Camarines CAPA"]
    },
    {
      id: "estadio-sebastian-gaete",
      name: "Estadio Sebastián Gaete",
      shortName: "Estadio Sebastián Gaete",
      commune: "Arauco",
      surface: "Pasto Sintético de Alto Tráfico",
      surfaceType: "sintetico",
      lighting: "Torres de Focos Perimetrales",
      capacity: "1.200 espectadores",
      address: "Sector Céntrico, Arauco",
      mapsUrl: "https://maps.google.com/?q=Estadio+Sebastian+Gaete+Arauco",
      status: "habilitada",
      statusLabel: "🟢 Habilitada (Cancha Oficial)",
      usageNotes: "Ubicación céntrica en la ciudad. Sede continua de series Segunda Adulta, Senior 35 y categorías infantiles.",
      photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
      coordinates: "-37.2435, -73.3210",
      features: ["Pasto Sintético", "Ubicación Céntrica", "Cierre Perimetral", "Mesa de Turno Techada"]
    },
    {
      id: "cancha-sausalito",
      name: "Cancha El Sausalito",
      shortName: "Cancha El Sausalito",
      commune: "Arauco",
      surface: "Pasto Natural Tradicional",
      surfaceType: "natural",
      lighting: "Sin iluminación artificial (Solo partidos diurnos)",
      capacity: "600 espectadores (perímetro natural)",
      address: "Camino El Sausalito, Arauco",
      mapsUrl: "https://maps.google.com/?q=Cancha+Sausalito+Arauco",
      status: "restringida",
      statusLabel: "🟡 Uso Condicionado / En Evaluación",
      usageNotes: "⚠️ Recinto tradicional de pasto natural. Reabierto este año 2026 pero utilizado solo 3 veces en la temporada debido a las lluvias y saturación del terreno.",
      photo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
      coordinates: "-37.2510, -73.3050",
      features: ["Pasto Natural Tradicional", "Partidos Diurnos", "Drenaje Natural Lento", "Solo 3 Usos en 2026"]
    }
  ],

  /**
   * Reglamento Oficial de Competición ANFA Arauco / ANFA Biobío
   * Especificaciones técnicas por serie, tiempos de juego y edades
   */
  regulations: {
    code: "REGLAMENTO-OFICIAL-ANFA-BIOBIO-2026",
    disciplinaryCode: "Código de Procedimientos y Penalidades ANFA Nacional",
    substitutionRule: "Máximo 5 sustituciones en un máximo de 3 ventanas de interrupción por equipo (excluyendo entretiempo).",
    cardRules: {
      yellowAccumulation: 5, // 5 amarillas = 1 fecha automática de suspensión
      yellowWarning: 4,      // 4 amarillas = alerta preventiva
      doubleYellow: 1,       // Doble amarilla en un partido = 1 fecha de suspensión
      directRed: "2 a 4 fechas según tipificación en informe del árbitro central (CAPA)"
    },
    cupQualification: {
      regional: "Copa de Campeones ANFA Biobío (Clasifican el Campeón y Subcampeón comunal de Honor, Senior 35 y Súper Senior 45)",
      national: "Campeonato Nacional de Clubes Campeones ANFA (Clasifica el Campeón Regional de ANFA Biobío)"
    },
    generalTableScoring: {
      description: "La Tabla General de Clubes suma el rendimiento de todas las series de la jornada dominical para determinar el Campeón General Comunal de la Asociación.",
      weights: {
        honor: 3,       // Victoria en Honor otorga 3 pts al club
        segunda: 2,     // Victoria en Segunda otorga 2 pts al club
        senior35: 2,    // Victoria en Senior otorga 2 pts al club
        superSenior45: 2,
        juvenil: 2,
        infantil: 1
      }
    }
  },

  /**
   * Series / Categorías Oficiales que componen la competencia
   */
  seriesList: [
    {
      id: "honor",
      name: "Serie de Honor (Primera Adulta)",
      shortName: "Honor",
      ageLimit: "Todo Competidor (Sin límite de edad)",
      halfDuration: 45, // 2 tiempos de 45 min
      regionalCup: "Copa de Campeones Serie de Honor ANFA Biobío",
      ballSize: "Nº 5 Oficial",
      active: true
    },
    {
      id: "segunda_adulta",
      name: "Serie Segunda Adulta (Reserva)",
      shortName: "Segunda",
      ageLimit: "Todo Competidor",
      halfDuration: 40, // 2 tiempos de 40 min
      regionalCup: "Competencia de Reserva Comunal",
      ballSize: "Nº 5 Oficial",
      active: false
    },
    {
      id: "senior_35",
      name: "Serie Senior (35+ Años)",
      shortName: "Senior 35",
      ageLimit: "35 años cumplidos en el año calendario en curso",
      halfDuration: 40, // 2 tiempos de 40 min
      regionalCup: "Copa de Campeones Senior 35 ANFA Biobío",
      ballSize: "Nº 5 Oficial",
      active: false
    },
    {
      id: "super_senior_45",
      name: "Serie Súper Senior (45+ Años)",
      shortName: "Súper Senior 45",
      ageLimit: "45 años cumplidos en el año calendario en curso",
      halfDuration: 35, // 2 tiempos de 35 min
      regionalCup: "Copa de Campeones Súper Senior 45 ANFA Biobío",
      ballSize: "Nº 5 Oficial",
      active: false
    },
    {
      id: "juvenil",
      name: "Serie Juvenil (Sub-17)",
      shortName: "Juvenil",
      ageLimit: "Menores de 17 años al 31 de diciembre",
      halfDuration: 40, // 2 tiempos de 40 min
      regionalCup: "Torneo Regional de Selecciones Juveniles ANFA",
      ballSize: "Nº 5 Oficial",
      active: false
    },
    {
      id: "infantil",
      name: "Serie Primera Infantil (Sub-15)",
      shortName: "Infantil",
      ageLimit: "Menores de 15 años al 31 de diciembre",
      halfDuration: 35, // 2 tiempos de 35 min
      regionalCup: "Torneo Regional Infantil ANFA Biobío",
      ballSize: "Nº 5 Oficial",
      active: false
    }
  ],

  /**
   * Nómina Oficial de los 10 Clubes de la Asociación de Fútbol de Arauco
   * Con fechas de fundación exactas, registros de copas regionales y categorías en competencia
   */
  clubs: [
    {
      id: "club-arauco",
      name: "Club Deportivo Arauco",
      shortName: "Arauco",
      foundation: "1939",
      exactFoundationDate: "01 de enero de 1939",
      neighborhood: "Sector Centro / Sede Histórica, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#0f766e", secondary: "#ffffff" },
      badgeEmoji: "🛡️",
      titlesComunalesHonor: 11,
      regionalRecord: "Fundado el 1 de enero de 1939 (87 años de trayectoria ininterrumpida). Múltiple representante comunal en la Copa de Campeones ANFA Región del Biobío en Serie de Honor y Senior. Campeón Comunal de Honor en 2012, 2015, 2018 y 2022.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 412 - ANFA Arauco / ANFA Biobío"
    },
    {
      id: "club-pelantaro",
      name: "Club Deportivo Pelantaro",
      shortName: "Pelantaro",
      foundation: "1929",
      exactFoundationDate: "20 de agosto de 1929",
      neighborhood: "Sector Pelantaro / Centro, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#b91c1c", secondary: "#ffffff" },
      badgeEmoji: "⚔️",
      titlesComunalesHonor: 6,
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 208 - ANFA Arauco"
    },
    {
      id: "club-arturo-prat",
      name: "Club Deportivo Arturo Prat",
      shortName: "Arturo Prat",
      foundation: "1952",
      exactFoundationDate: "22 de septiembre de 1952",
      neighborhood: "Calle California N° 205, Sector California, Arauco",
      stadium: "Estadio Sebastián Gaete",
      colors: { primary: "#0f172a", secondary: "#facc15" },
      badgeEmoji: "⚓",
      titlesComunalesHonor: 5,
      regionalRecord: "Fundado el 22 de septiembre de 1952 en el sector California. El ancla dorada y estrella naval representan el coraje marinero de sus fundadores en el campeonato comunal.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 304 - Municipalidad de Arauco"
    },
    {
      id: "club-jorge-robledo",
      name: "Club Deportivo Jorge Robledo",
      shortName: "Jorge Robledo",
      foundation: "1954",
      exactFoundationDate: "26 de febrero de 1954",
      neighborhood: "Sector Plazoleta Fresia / Barrio Estación, Arauco",
      stadium: "Estadio Ramón Burgos",
      colors: { primary: "#0284c7", secondary: "#ffffff" },
      badgeEmoji: "⭐",
      titlesComunalesHonor: 8,
      regionalRecord: "Fundado el 26 de febrero de 1954 en homenaje a George Robledo Oliver, gloria nacional en Newcastle United y campeón de Inglaterra. Escudo con la clásica chilena acrobática.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 552 - ANFA Biobío"
    },
    {
      id: "club-caupolican",
      name: "Club Deportivo Caupolicán",
      shortName: "Caupolicán",
      foundation: "1965",
      exactFoundationDate: "03 de agosto de 1965",
      neighborhood: "Población Caupolicán / Sede Social, Arauco",
      stadium: "Estadio Sebastián Gaete",
      colors: { primary: "#dc2626", secondary: "#ffffff" },
      badgeEmoji: "🏹",
      titlesComunalesHonor: 5,
      regionalRecord: "Fundado el 3 de agosto de 1965. Franjas albirrojas y medallón de Caupolicán. Reconocido por su rica vida comunitaria y prolífica cantera juvenil en Arauco.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente RUT 73.406.300-2"
    },
    {
      id: "club-colo-colo",
      name: "Club Deportivo Colo Colo",
      shortName: "Colo Colo (Arauco)",
      foundation: "1948",
      exactFoundationDate: "16 de febrero de 1948",
      neighborhood: "Población 10 de Julio, Arauco",
      stadium: "Estadio Municipal Ramón Burgos",
      colors: { primary: "#000000", secondary: "#ffffff" },
      badgeEmoji: "🦅",
      titlesComunalesHonor: 5,
      regionalRecord: "Fundado el 16 de febrero de 1948 en Población 10 de Julio. Escudo tricolor con el busto del cacique. Múltiple campeón comunal y participante en la Copa de Campeones ANFA Biobío.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil"],
      statusLegal: "Personalidad Jurídica vigente Nº 481"
    },
    {
      id: "club-gente-de-mar",
      name: "Club Deportivo Gente de Mar",
      shortName: "Gente de Mar",
      foundation: "1960",
      exactFoundationDate: "10 de enero de 1960",
      neighborhood: "Sede Social Calle O'Higgins S/N, Arauco",
      stadium: "Estadio Municipal Ramón Burgos",
      colors: { primary: "#1e3a8a", secondary: "#ffffff" },
      badgeEmoji: "⛵",
      titlesComunalesHonor: 3,
      regionalRecord: "Fundado el 10 de enero de 1960 por pescadores artesanales y trabajadores del borde costero de Arauco. Escudo circular blanco y azul marino con gran ancla de leva.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil"],
      statusLegal: "Personalidad Jurídica vigente Nº 932"
    },
    {
      id: "club-celulosa-arauco",
      name: "Club Deportivo Celulosa Arauco",
      shortName: "Celulosa Arauco",
      foundation: "1972",
      exactFoundationDate: "16 de agosto de 1972",
      neighborhood: "Villa Los Lingues / Sector Complejo Industrial, Arauco",
      stadium: "Estadio Ramón Burgos, Arauco",
      colors: { primary: "#15803d", secondary: "#ffffff" },
      badgeEmoji: "🌲",
      titlesComunalesHonor: 7,
      regionalRecord: "Fundado el 16 de agosto de 1972 por los trabajadores forestales de Celulosa Arauco. Franjas verdes y blancas, 7 campeonatos comunales de Honor e infraestructura modelo.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 840"
    },
    {
      id: "club-brisas-del-mar",
      name: "Club Deportivo Brisas del Mar",
      shortName: "Brisas del Mar",
      foundation: "1978",
      exactFoundationDate: "25 de diciembre de 1978",
      neighborhood: "Caleta de Tubul, Comuna de Arauco",
      stadium: "Cancha Comunitaria de Tubul / Estadio Municipal de Arauco",
      colors: { primary: "#2563eb", secondary: "#facc15" },
      badgeEmoji: "🌊",
      titlesComunalesHonor: 6,
      regionalRecord: "Fundado el 25 de diciembre de 1978 (en Navidad) en Caleta Tubul. Emblema azul y oro con navío navegante. Campeón Comunal de Honor 2023 y finalista de la Copa de Campeones Regional 2026.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 720 - ANFA Biobío"
    },
    {
      id: "club-real-jose-maria",
      name: "Club Deportivo Real José María FC",
      shortName: "Real José María",
      foundation: "2026",
      exactFoundationDate: "30 de enero de 2026",
      neighborhood: "Comuna de Arauco",
      stadium: "Estadio Sebastián Gaete / Estadio Ramón Burgos",
      colors: { primary: "#1e3a8a", secondary: "#dc2626", trim: "#facc15" },
      badgeEmoji: "👑",
      titlesComunalesHonor: 0,
      contactEmail: "realjosemariafc@gmail.com",
      motto: "Un club con VALORES 🤝⚽ ~Real José María FC~ ❤️💙",
      sponsor: "JUGA BET",
      regionalRecord: "Fundado el 30 de enero de 2026 en la comuna de Arauco. Es el 10° club oficial aceptado en la AFA Arauco y la institución más joven del Biobío. Gran corona imperial dorada y pasión azulgrana.",
      seriesParticipantes: ["2da Infantil", "Senior", "1era Adulta", "Honor", "Super Senior"],
      statusLegal: "Inscripción Oficial Asociación de Fútbol de Arauco / ANFA Biobío (2026)"
    }
  ],

  /**
   * Nóminas de Jugadores con Series asignadas
   */
  players: [
    // ==========================================
    // SERIE DE HONOR (PRIMERA ADULTA)
    // ==========================================
    // C.D. Jorge Robledo - Serie de Honor
    {
      id: "p-jr-1",
      clubId: "club-jorge-robledo",
      series: "honor",
      rut: "17.890.342-1",
      name: "Patricio Alarcón",
      number: 1,
      position: "Arquero",
      birthDate: "1992-04-12",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 0,
      assists: 1,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-jr-4",
      clubId: "club-jorge-robledo",
      series: "honor",
      rut: "18.321.654-7",
      name: "Rodrigo Sáez",
      number: 4,
      position: "Defensa Central",
      birthDate: "1994-08-20",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 1,
      assists: 0,
      yellowCards: 4,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "ADVERTENCIA ANFA (Art. 42): 4 tarjetas amarillas acumuladas. Próxima amonestación acarrea 1 fecha automática de suspensión.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-jr-8",
      clubId: "club-jorge-robledo",
      series: "honor",
      rut: "19.112.443-K",
      name: "Gonzalo Mellado",
      number: 8,
      position: "Mediocampista",
      birthDate: "1996-02-15",
      matchesPlayed: 7,
      minutesPlayed: 600,
      goals: 4,
      assists: 6,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-jr-9",
      clubId: "club-jorge-robledo",
      series: "honor",
      rut: "18.990.211-3",
      name: "Mauricio Neira",
      number: 9,
      position: "Delantero Centro",
      birthDate: "1993-11-04",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 10,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-jr-11",
      clubId: "club-jorge-robledo",
      series: "honor",
      rut: "20.145.890-2",
      name: "Esteban Carriel",
      number: 11,
      position: "Extremo Izquierdo",
      birthDate: "1999-07-29",
      matchesPlayed: 5,
      minutesPlayed: 410,
      goals: 3,
      assists: 4,
      yellowCards: 0,
      redCards: 1,
      status: "suspendido",
      sanctionNotes: "SUSPENSIÓN ANFA: Expulsado con Roja Directa en Fecha 6 vs Pelantaro. 2 fechas pendientes según fallo de Tribunal de Honor.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Brisas del Mar (Tubul) - Serie de Honor
    {
      id: "p-bm-1",
      clubId: "club-brisas-del-mar",
      series: "honor",
      rut: "16.780.122-8",
      name: "Manuel San Martín",
      number: 1,
      position: "Arquero",
      birthDate: "1989-10-18",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-bm-3",
      clubId: "club-brisas-del-mar",
      series: "honor",
      rut: "18.445.671-5",
      name: "Cristóbal Henríquez",
      number: 3,
      position: "Defensa Central",
      birthDate: "1994-03-08",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 1,
      assists: 0,
      yellowCards: 5,
      redCards: 0,
      status: "suspendido",
      sanctionNotes: "SUSPENSIÓN ANFA (Art. 42): Acumulación reglamentaria de 5 tarjetas amarillas. Inhabilitado automáticamente para la Fecha 8.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-bm-9",
      clubId: "club-brisas-del-mar",
      series: "honor",
      rut: "17.901.442-9",
      name: "Alexis Guajardo",
      number: 9,
      position: "Delantero Centro",
      birthDate: "1991-05-19",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 9,
      assists: 3,
      yellowCards: 3,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-bm-10",
      clubId: "club-brisas-del-mar",
      series: "honor",
      rut: "18.889.332-1",
      name: "Camilo Salgado",
      number: 10,
      position: "Mediocampista Ofensivo",
      birthDate: "1995-09-14",
      matchesPlayed: 7,
      minutesPlayed: 620,
      goals: 5,
      assists: 7,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Arauco - Serie de Honor
    {
      id: "p-ar-10",
      clubId: "club-arauco",
      series: "honor",
      rut: "17.654.321-9",
      name: "Sebastián Muñoz",
      number: 10,
      position: "Mediocampista",
      birthDate: "1990-11-12",
      matchesPlayed: 8,
      minutesPlayed: 710,
      goals: 6,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Celulosa Arauco - Serie de Honor
    {
      id: "p-ca-9",
      clubId: "club-celulosa-arauco",
      series: "honor",
      rut: "19.789.001-K",
      name: "Matías Leal",
      number: 9,
      position: "Delantero Centro",
      birthDate: "1997-06-30",
      matchesPlayed: 7,
      minutesPlayed: 620,
      goals: 8,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Real José María - Serie de Honor (Nuevo Ingreso)
    {
      id: "p-rjm-10",
      clubId: "club-real-jose-maria",
      series: "honor",
      rut: "21.034.567-8",
      name: "Kevin Cifuentes",
      number: 10,
      position: "Mediocampista Ofensivo",
      birthDate: "2002-09-17",
      matchesPlayed: 7,
      minutesPlayed: 620,
      goals: 7,
      assists: 6,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "Convocado a Selección Comunal Adulta de Arauco 2026.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-rjm-7",
      clubId: "club-real-jose-maria",
      series: "honor",
      rut: "20.551.489-3",
      name: "Felipe Valenzuela",
      number: 7,
      position: "Extremo Derecho",
      birthDate: "2001-03-22",
      matchesPlayed: 7,
      minutesPlayed: 590,
      goals: 4,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "Convocado a Selección Comunal Adulta de Arauco 2026.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Colo Colo (Arauco) - Serie de Honor
    {
      id: "p-cc-8",
      clubId: "club-colo-colo",
      series: "honor",
      rut: "18.112.774-5",
      name: "David Morales",
      number: 8,
      position: "Volante Mixto",
      birthDate: "1993-05-14",
      matchesPlayed: 7,
      minutesPlayed: 630,
      goals: 3,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Arturo Prat - Serie de Honor
    {
      id: "p-ap-9",
      clubId: "club-arturo-prat",
      series: "honor",
      rut: "19.330.129-4",
      name: "Joaquín Concha",
      number: 9,
      position: "Delantero Centro",
      birthDate: "1996-10-05",
      matchesPlayed: 7,
      minutesPlayed: 610,
      goals: 5,
      assists: 1,
      yellowCards: 3,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Gente de Mar - Serie de Honor
    {
      id: "p-gm-11",
      clubId: "club-gente-de-mar",
      series: "honor",
      rut: "18.776.432-6",
      name: "Jorge Basaure",
      number: 11,
      position: "Delantero",
      birthDate: "1995-01-19",
      matchesPlayed: 8,
      minutesPlayed: 700,
      goals: 4,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },

    // ==========================================
    // SERIE SENIOR (35+ AÑOS)
    // ==========================================
    // C.D. Pelantaro - Serie Senior 35+
    {
      id: "p-pl-5",
      clubId: "club-pelantaro",
      series: "senior_35",
      rut: "15.432.899-3",
      name: "Rodrigo Toledo",
      number: 5,
      position: "Volante de Contención",
      birthDate: "1987-02-28",
      matchesPlayed: 8,
      minutesPlayed: 640,
      goals: 4,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-pl-9",
      clubId: "club-pelantaro",
      series: "senior_35",
      rut: "14.980.123-2",
      name: "Claudio Abarzúa",
      number: 9,
      position: "Delantero",
      birthDate: "1985-07-11",
      matchesPlayed: 7,
      minutesPlayed: 560,
      goals: 6,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Celulosa Arauco - Serie Senior 35+
    {
      id: "p-ca-sn7",
      clubId: "club-celulosa-arauco",
      series: "senior_35",
      rut: "15.109.876-1",
      name: "Víctor Hugo Parra",
      number: 7,
      position: "Mediocampista",
      birthDate: "1986-04-03",
      matchesPlayed: 7,
      minutesPlayed: 560,
      goals: 7,
      assists: 4,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Brisas del Mar - Serie Senior 35+
    {
      id: "p-bm-sn10",
      clubId: "club-brisas-del-mar",
      series: "senior_35",
      rut: "14.887.654-K",
      name: "Raúl Alarcón",
      number: 10,
      position: "Enganche",
      birthDate: "1984-12-09",
      matchesPlayed: 7,
      minutesPlayed: 560,
      goals: 5,
      assists: 6,
      yellowCards: 0,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },

    // ==========================================
    // SERIE JUVENIL (SUB-17)
    // ==========================================
    // C.D. Caupolicán - Serie Juvenil
    {
      id: "p-cp-juv10",
      clubId: "club-caupolican",
      series: "juvenil",
      rut: "22.345.109-8",
      name: "Ignacio Araneda",
      number: 10,
      position: "Mediocampista Creativo",
      birthDate: "2009-03-14",
      matchesPlayed: 6,
      minutesPlayed: 480,
      goals: 5,
      assists: 4,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "Seleccionado Comunal Sub-17 de Arauco.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "p-cp-juv9",
      clubId: "club-caupolican",
      series: "juvenil",
      rut: "22.678.901-2",
      name: "Lucas Carrillo",
      number: 9,
      position: "Delantero Centro",
      birthDate: "2009-08-22",
      matchesPlayed: 6,
      minutesPlayed: 480,
      goals: 6,
      assists: 1,
      yellowCards: 0,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Jorge Robledo - Serie Juvenil
    {
      id: "p-jr-juv7",
      clubId: "club-jorge-robledo",
      series: "juvenil",
      rut: "22.450.812-3",
      name: "Benjamín Espinoza",
      number: 7,
      position: "Extremo Derecho",
      birthDate: "2009-05-18",
      matchesPlayed: 6,
      minutesPlayed: 480,
      goals: 6,
      assists: 5,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Arauco - Serie Juvenil
    {
      id: "p-ar-juv11",
      clubId: "club-arauco",
      series: "juvenil",
      rut: "22.560.129-0",
      name: "Matías Contreras",
      number: 11,
      position: "Delantero",
      birthDate: "2009-11-03",
      matchesPlayed: 6,
      minutesPlayed: 470,
      goals: 4,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80"
    },

    // ==========================================
    // SERIE SEGUNDA ADULTA (RESERVA)
    // ==========================================
    // C.D. Arturo Prat - Segunda Adulta
    {
      id: "p-ap-seg8",
      clubId: "club-arturo-prat",
      series: "segunda_adulta",
      rut: "19.982.341-7",
      name: "Nicolás Garrido",
      number: 8,
      position: "Mediocampista",
      birthDate: "1998-04-19",
      matchesPlayed: 6,
      minutesPlayed: 480,
      goals: 3,
      assists: 3,
      yellowCards: 1,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80"
    },

    // C.D. Real José María - Segunda Adulta
    {
      id: "p-rjm-seg9",
      clubId: "club-real-jose-maria",
      series: "segunda_adulta",
      rut: "20.890.312-5",
      name: "Marcelo Yáñez",
      number: 9,
      position: "Delantero Centro",
      birthDate: "2001-12-08",
      matchesPlayed: 6,
      minutesPlayed: 480,
      goals: 5,
      assists: 1,
      yellowCards: 0,
      redCards: 0,
      status: "habilitado",
      sanctionNotes: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ],

  /**
   * Partidos oficiales con serie vinculada
   */
  matches: [
    {
      id: "match-arauco-01",
      series: "honor",
      round: "Fecha 8 • Serie de Honor (Clásico Comunal)",
      homeClubId: "club-jorge-robledo",
      awayClubId: "club-brisas-del-mar",
      venue: "Estadio Municipal Ramón Burgos",
      venueId: "estadio-ramon-burgos",
      date: "Hoy • 16:30 hrs",
      status: "en_vivo",
      currentMinute: 42,
      half: 1,
      homeScore: 1,
      awayScore: 1,
      referee: "Carlos Henríquez González (CAPA)",
      refereeAssistant1: "Juan Pérez Cartes",
      refereeAssistant2: "Roberto Alvear Oporto",
      turnOfficial: "Don Sergio Viveros (Director de Turno ANFA)",
      shiftOperator: { name: "Don Sergio Viveros", clubId: "club-gente-de-mar", isNeutral: true, verifiedAnfa: true },
      paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
      paperSheetSignedBy: "Rodrigo Sáez (Capitán Jorge Robledo), Alexis Guajardo (Capitán Brisas del Mar), Carlos Henríquez (CAPA)",
      ratificationStatus: "preliminar_cancha",
      ratificationLabel: "Marcador en Cancha (Firmado por Capitanes y Árbitro)",
      rosterChecked: true,
      events: [
        {
          type: "gol",
          teamId: "club-jorge-robledo",
          minute: 18,
          playerId: "p-jr-9",
          playerName: "Mauricio Neira",
          assistPlayerId: "p-jr-8",
          assistPlayerName: "Gonzalo Mellado",
          description: "Zurdazo potente al ángulo tras pase filtrado al borde del área."
        },
        {
          type: "tarjeta_amarilla",
          teamId: "club-jorge-robledo",
          minute: 27,
          playerId: "p-jr-4",
          playerName: "Rodrigo Sáez",
          reason: "Infracción táctica en mitad de cancha (4ta amonestación acumulada)."
        },
        {
          type: "gol",
          teamId: "club-brisas-del-mar",
          minute: 34,
          playerId: "p-bm-9",
          playerName: "Alexis Guajardo",
          assistPlayerId: "p-bm-10",
          assistPlayerName: "Camilo Salgado",
          description: "Cabezazo tras centro de tiro de esquina servido desde la derecha."
        }
      ],
      signatures: {
        homeCaptainConfirmed: true,
        homeCaptainName: "Rodrigo Sáez",
        awayCaptainConfirmed: true,
        awayCaptainName: "Alexis Guajardo",
        refereeConfirmed: false,
        signedPhysicalSheet: true
      }
    },
    {
      id: "match-arauco-02",
      series: "honor",
      round: "Fecha 8 • Serie de Honor",
      homeClubId: "club-arauco",
      awayClubId: "club-arturo-prat",
      venue: "Estadio Sebastián Gaete",
      venueId: "estadio-sebastian-gaete",
      date: "Hoy • 16:45 hrs (Simultáneo)",
      status: "en_vivo",
      currentMinute: 28,
      half: 1,
      homeScore: 2,
      awayScore: 0,
      referee: "Héctor Jélvez (CAPA)",
      refereeAssistant1: "Marcos Cares",
      refereeAssistant2: "Esteban Nova",
      turnOfficial: "Don Osvaldo Concha (Director de Turno ANFA)",
      shiftOperator: { name: "Don Osvaldo Concha", clubId: "club-pelantaro", isNeutral: true, verifiedAnfa: true },
      paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
      paperSheetSignedBy: "Matías Contreras (Capitán C.D. Arauco), Joaquín Concha (Capitán Arturo Prat), Héctor Jélvez (CAPA)",
      ratificationStatus: "preliminar_cancha",
      ratificationLabel: "Marcador en Cancha (Firmado por Capitanes y Árbitro)",
      rosterChecked: true,
      events: [
        {
          type: "gol",
          teamId: "club-arauco",
          minute: 11,
          playerId: "p-ar-11",
          playerName: "Matías Contreras",
          assistPlayerId: "p-ar-10",
          assistPlayerName: "Claudio Neira",
          description: "Definición cruzada rasante tras veloz desborde por banda izquierda."
        },
        {
          type: "tarjeta_amarilla",
          teamId: "club-arturo-prat",
          minute: 19,
          playerId: "p-ap-8",
          playerName: "Nicolás Garrido",
          reason: "Falta táctica en tres cuartos de cancha (corta avance prometedor)."
        },
        {
          type: "gol",
          teamId: "club-arauco",
          minute: 25,
          playerId: "p-ar-9",
          playerName: "Alexis Cartes",
          assistPlayerId: "p-ar-11",
          assistPlayerName: "Matías Contreras",
          description: "Cabezazo colocado junto al vertical derecho tras tiro de esquina."
        }
      ],
      signatures: {
        homeCaptainConfirmed: true,
        homeCaptainName: "Matías Contreras",
        awayCaptainConfirmed: true,
        awayCaptainName: "Joaquín Concha",
        refereeConfirmed: false,
        signedPhysicalSheet: true
      }
    },
    {
      id: "match-arauco-03",
      series: "honor",
      round: "Fecha 8 • Serie de Honor",
      homeClubId: "club-celulosa-arauco",
      awayClubId: "club-colo-colo",
      venue: "Estadio Municipal Ramón Burgos",
      venueId: "estadio-ramon-burgos",
      date: "Mañana • 15:30 hrs",
      status: "programado",
      currentMinute: 0,
      half: 1,
      homeScore: 0,
      awayScore: 0,
      referee: "Miguel Sanhueza (CAPA)",
      turnOfficial: "Hernán Cuevas",
      shiftOperator: { name: "Hernán Cuevas", clubId: "club-arturo-prat", isNeutral: true, verifiedAnfa: true },
      rosterChecked: false,
      events: [],
      signatures: {
        homeCaptainConfirmed: false,
        awayCaptainConfirmed: false,
        refereeConfirmed: false,
        signedPhysicalSheet: false
      }
    },
    {
      id: "match-arauco-04",
      series: "honor",
      round: "Fecha 8 • Serie de Honor",
      homeClubId: "club-caupolican",
      awayClubId: "club-real-jose-maria",
      venue: "Estadio Sebastián Gaete",
      venueId: "estadio-sebastian-gaete",
      date: "Mañana • 17:30 hrs",
      status: "programado",
      currentMinute: 0,
      half: 1,
      homeScore: 0,
      awayScore: 0,
      referee: "Roberto Díaz (CAPA)",
      turnOfficial: "Mario Garcés",
      shiftOperator: { name: "Mario Garcés", clubId: "club-colo-colo", isNeutral: true, verifiedAnfa: true },
      rosterChecked: false,
      events: [],
      signatures: {
        homeCaptainConfirmed: false,
        awayCaptainConfirmed: false,
        refereeConfirmed: false,
        signedPhysicalSheet: false
      }
    },
    {
      id: "match-arauco-05",
      series: "honor",
      round: "Fecha 8 • Serie de Honor",
      homeClubId: "club-gente-de-mar",
      awayClubId: "club-pelantaro",
      venue: "Cancha El Sausalito",
      venueId: "cancha-sausalito",
      date: "Ayer • 17:00 hrs",
      status: "finalizado",
      currentMinute: 90,
      half: 2,
      homeScore: 2,
      awayScore: 2,
      referee: "Eduardo Concha (CAPA)",
      turnOfficial: "Sergio Viveros",
      shiftOperator: { name: "Sergio Viveros", clubId: "club-brisas-del-mar", isNeutral: true, verifiedAnfa: true },
      paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
      paperSheetSignedBy: "Capitán Gente de Mar, Capitán Pelantaro, Árbitro Eduardo Concha",
      ratificationStatus: "ratificado_directorio",
      ratificationLabel: "Oficializado y Ratificado por Directorio ANFA",
      rosterChecked: true,
      events: [
        { type: "gol", teamId: "club-gente-de-mar", minute: 14, playerName: "Jorge Basaure", description: "Definición rasante" },
        { type: "gol", teamId: "club-pelantaro", minute: 31, playerName: "Rodrigo Toledo", description: "Tiro libre potente" },
        { type: "gol", teamId: "club-pelantaro", minute: 67, playerName: "Diego Abarzúa", description: "Remate al ángulo" },
        { type: "gol", teamId: "club-gente-de-mar", minute: 88, playerName: "Jorge Basaure", description: "Gol agónico de penal" }
      ],
      signatures: {
        homeCaptainConfirmed: true,
        awayCaptainConfirmed: true,
        refereeConfirmed: true,
        signedPhysicalSheet: true
      }
    },
    { id: "match-15-1", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-arauco", awayClubId: "club-gente-de-mar", homeScore: 0, awayScore: 4, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
    { id: "match-15-2", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-brisas-del-mar", awayClubId: "club-real-jose-maria", homeScore: 0, awayScore: 5, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
    { id: "match-15-3", series: "honor", round: "Fecha 15", status: "programado", homeClubId: "club-colo-colo", awayClubId: "club-caupolican", homeScore: 0, awayScore: 0, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
    { id: "match-15-4", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-arturo-prat", awayClubId: "club-jorge-robledo", homeScore: 3, awayScore: 2, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
    { id: "match-14-1", series: "honor", round: "Fecha 14", status: "finalizado", homeClubId: "club-real-jose-maria", awayClubId: "club-jorge-robledo", homeScore: 11, awayScore: 0, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "13/09/2026", referee: "Asignado por ANFA" },
    { id: "match-14-2", series: "honor", round: "Fecha 14", status: "finalizado", homeClubId: "club-celulosa-arauco", awayClubId: "club-colo-colo", homeScore: 0, awayScore: 2, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "13/09/2026", referee: "Asignado por ANFA" },
    { id: "match-13-1", series: "honor", round: "Fecha 13", status: "finalizado", homeClubId: "club-celulosa-arauco", awayClubId: "club-real-jose-maria", homeScore: 0, awayScore: 3, venue: "Estadio Municipal Ramón Burgos", venueId: "estadio-ramon-burgos", date: "06/09/2026", referee: "Asignado por ANFA" }
  ],

  /**
   * Bases de puntuación por serie para los 10 clubes
   */
  standingsBySeries: {
    honor: [
      { clubId: "club-real-jose-maria", played: 7, won: 7, drawn: 0, lost: 0, gf: 61, gc: 0 },
      { clubId: "club-brisas-del-mar", played: 9, won: 6, drawn: 0, lost: 3, gf: 25, gc: 0 },
      { clubId: "club-gente-de-mar", played: 9, won: 6, drawn: 0, lost: 3, gf: 23, gc: 0 },
      { clubId: "club-colo-colo", played: 9, won: 5, drawn: 0, lost: 4, gf: 19, gc: 0 },
      { clubId: "club-arturo-prat", played: 8, won: 4, drawn: 1, lost: 3, gf: 23, gc: 0 },
      { clubId: "club-celulosa-arauco", played: 9, won: 3, drawn: 0, lost: 6, gf: 13, gc: 0 },
      { clubId: "club-jorge-robledo", played: 8, won: 1, drawn: 1, lost: 6, gf: 7, gc: 0 },
      { clubId: "club-arauco", played: 9, won: 1, drawn: 0, lost: 8, gf: 8, gc: 0 }
    ],
    senior_35: [
      { clubId: "club-celulosa-arauco", played: 7, won: 6, drawn: 0, lost: 1, gf: 20, gc: 6 },
      { clubId: "club-brisas-del-mar", played: 7, won: 5, drawn: 1, lost: 1, gf: 18, gc: 9 },
      { clubId: "club-pelantaro", played: 7, won: 4, drawn: 2, lost: 1, gf: 15, gc: 8 },
      { clubId: "club-arauco", played: 7, won: 4, drawn: 1, lost: 2, gf: 14, gc: 11 },
      { clubId: "club-jorge-robledo", played: 7, won: 3, drawn: 2, lost: 2, gf: 13, gc: 10 },
      { clubId: "club-arturo-prat", played: 7, won: 3, drawn: 1, lost: 3, gf: 12, gc: 13 },
      { clubId: "club-gente-de-mar", played: 7, won: 2, drawn: 1, lost: 4, gf: 10, gc: 15 },
      { clubId: "club-colo-colo", played: 7, won: 1, drawn: 2, lost: 4, gf: 9, gc: 16 },
      { clubId: "club-caupolican", played: 7, won: 1, drawn: 0, lost: 6, gf: 6, gc: 19 },
      { clubId: "club-real-jose-maria", played: 7, won: 0, drawn: 2, lost: 5, gf: 5, gc: 20 }
    ],
    juvenil: [
      { clubId: "club-jorge-robledo", played: 6, won: 5, drawn: 1, lost: 0, gf: 17, gc: 5 },
      { clubId: "club-arauco", played: 6, won: 4, drawn: 1, lost: 1, gf: 15, gc: 7 },
      { clubId: "club-caupolican", played: 6, won: 4, drawn: 0, lost: 2, gf: 13, gc: 9 },
      { clubId: "club-brisas-del-mar", played: 6, won: 3, drawn: 1, lost: 2, gf: 12, gc: 10 },
      { clubId: "club-celulosa-arauco", played: 6, won: 3, drawn: 0, lost: 3, gf: 11, gc: 11 },
      { clubId: "club-pelantaro", played: 6, won: 2, drawn: 1, lost: 3, gf: 9, gc: 12 },
      { clubId: "club-real-jose-maria", played: 6, won: 2, drawn: 0, lost: 4, gf: 8, gc: 13 },
      { clubId: "club-arturo-prat", played: 6, won: 1, drawn: 1, lost: 4, gf: 6, gc: 14 },
      { clubId: "club-colo-colo", played: 6, won: 1, drawn: 0, lost: 5, gf: 5, gc: 16 },
      { clubId: "club-gente-de-mar", played: 6, won: 0, drawn: 1, lost: 5, gf: 4, gc: 18 }
    ]
  },

  sanctionsLedger: [
    {
      id: "sanc-arauco-01",
      playerId: "p-jr-11",
      playerName: "Esteban Carriel",
      clubName: "Club Deportivo Jorge Robledo",
      series: "Serie de Honor",
      cause: "Expulsión con Roja Directa: Agresión verbal a juez de línea en Fecha 6 vs Pelantaro (Art. 54 Reglamento ANFA)",
      datesImposed: 3,
      datesServed: 1,
      datesRemaining: 2,
      status: "vigente",
      meetingDate: "12/09/2026 - Sesión Tribunal de Honor ANFA Arauco (Acta Nº 14)"
    },
    {
      id: "sanc-arauco-02",
      playerId: "p-bm-3",
      playerName: "Cristóbal Henríquez",
      clubName: "C.D. Brisas del Mar (Tubul)",
      series: "Serie de Honor",
      cause: "Acumulación reglamentaria de 5 tarjetas amarillas (Art. 42 Reglamento ANFA)",
      datesImposed: 1,
      datesServed: 0,
      datesRemaining: 1,
      status: "vigente",
      meetingDate: "16/09/2026 - Notificación Automática Sistema ANFA"
    }
  ],

  /**
   * Libro de Tesorería y Caja Chica - Asociación de Fútbol Amateur de Arauco
   * Supera el módulo contable de SUYMI con balances en tiempo real y comprobantes
   */
  treasuryLedger: [
    {
      id: "mov-01",
      date: "01/09/2026",
      type: "ingreso",
      category: "Cuota de Inscripción",
      clubId: "club-jorge-robledo",
      clubName: "C.D. Jorge Robledo",
      concept: "Arancel oficial anual de afiliación y competencia - Temporada 2026 (Todas las series)",
      amount: 60000,
      receiptFolio: "ING-2026-081",
      status: "pagado"
    },
    {
      id: "mov-02",
      date: "02/09/2026",
      type: "ingreso",
      category: "Cuota de Inscripción",
      clubId: "club-brisas-del-mar",
      clubName: "C.D. Brisas del Mar (Tubul)",
      concept: "Arancel oficial anual de afiliación y competencia - Temporada 2026 (Todas las series)",
      amount: 60000,
      receiptFolio: "ING-2026-082",
      status: "pagado"
    },
    {
      id: "mov-03",
      date: "05/09/2026",
      type: "ingreso",
      category: "Cuota de Inscripción",
      clubId: "club-arauco",
      clubName: "C.D. Arauco",
      concept: "Arancel oficial anual de afiliación y competencia - Temporada 2026",
      amount: 60000,
      receiptFolio: "ING-2026-083",
      status: "pagado"
    },
    {
      id: "mov-04",
      date: "14/09/2026",
      type: "ingreso",
      category: "Multa Tribunal de Penas",
      clubId: "club-jorge-robledo",
      clubName: "C.D. Jorge Robledo",
      concept: "Arancel disciplinario expulsión directa Esteban Carriel (Fallo Acta Nº 14)",
      amount: 5000,
      receiptFolio: "ING-2026-095",
      status: "pagado"
    },
    {
      id: "mov-05",
      date: "17/09/2026",
      type: "ingreso",
      category: "Multa Tarjetas Amarillas",
      clubId: "club-brisas-del-mar",
      clubName: "C.D. Brisas del Mar (Tubul)",
      concept: "Arancel reglamentario acumulación 5 amonestaciones jugador C. Henríquez (Art. 42 ANFA)",
      amount: 2500,
      receiptFolio: "ING-2026-098",
      status: "pagado"
    },
    {
      id: "mov-06",
      date: "07/09/2026",
      type: "egreso",
      category: "Honorarios Arbitrales",
      clubId: "asociacion",
      clubName: "ANFA Arauco",
      concept: "Pago honorarios terna arbitral Fecha 7 - Colegio de Árbitros de la Provincia de Arauco (CAPA)",
      amount: 45000,
      receiptFolio: "EGR-2026-034",
      status: "pagado"
    },
    {
      id: "mov-07",
      date: "10/09/2026",
      type: "egreso",
      category: "Implementación Deportiva",
      clubId: "asociacion",
      clubName: "ANFA Arauco",
      concept: "Adquisición de lote de balones oficiales Nº 5 reglamentarios ANFA",
      amount: 38000,
      receiptFolio: "EGR-2026-035",
      status: "pagado"
    },
    {
      id: "mov-08",
      date: "15/09/2026",
      type: "egreso",
      category: "Mantención y Operación",
      clubId: "asociacion",
      clubName: "ANFA Arauco",
      concept: "Gastos de secretaría, papelería oficial de actas y mantención sede Julio Montt 386",
      amount: 18500,
      receiptFolio: "EGR-2026-036",
      status: "pagado"
    }
  ],

  /**
   * Selección Oficial de Fútbol de Arauco
   * Campeonato Regional de Selecciones ANFA Región del Biobío 2026
   * Datos 100% fidedignos verificados en ANFA Biobío y TV Sports Laraquete
   */
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
      name: "TV Sports Laraquete",
      channels: "Facebook Live & YouTube",
      coverage: "Transmisión oficial exclusiva de la campaña de Arauco en el Torneo Regional 2026"
    },
    honor: {
      seriesName: "Serie de Honor (Adulta)",
      status: "clasificada",
      statusBadge: "🔥 ¡CLASIFICADA A CUARTOS DE FINAL!",
      badgeClass: "badge-live",
      headline: "Arauco avanza a Cuartos de Final con un contundente global de 11 a 5",
      summary: "La Selección Adulta de Arauco selló su paso a la ronda de los 8 mejores del Biobío. En la ida disputada en el Estadio Ramón Burgos vapuleó a Cavecur por 8-1, y en la revancha en Curanilahue cayó 3-4 en un electrizante partido, asegurando su clasificación a Cuartos de Final.",
      firstRoundMatches: [
        {
          phase: "Partido de Ida (Octavos de Final)",
          date: "06 de septiembre de 2026",
          venue: "Estadio Municipal Ramón Burgos Loyola, Arauco",
          homeTeam: "Selección de Arauco",
          homeScore: 8,
          awayTeam: "Cavecur (Canal Vecinal Curanilahue)",
          awayScore: 1,
          summary: "Goleada histórica en el Ramón Burgos con triplete de Rodrigo Romero y doblete de Felipe Alarcón."
        },
        {
          phase: "Partido de Vuelta (Octavos de Final)",
          date: "13 de septiembre de 2026",
          venue: "Estadio Parque Urbano, Curanilahue",
          homeTeam: "Cavecur (Canal Vecinal Curanilahue)",
          homeScore: 4,
          awayTeam: "Selección de Arauco",
          awayScore: 3,
          summary: "Encuentro de alta intensidad en pasto sintético donde Arauco administró la ventaja y timbró los pasajes a Cuartos."
        }
      ],
      nextMatch: {
        stage: "Cuartos de Final (Fase 2)",
        status: "sorteo_pendiente",
        drawDate: "Martes 22 de Septiembre de 2026",
        drawLocation: "Sede ANFA Región del Biobío (Concepción)",
        notes: "El sorteo oficial de parejas de Cuartos de Final se desarrollará tras el receso de Fiestas Patrias.",
        projectedOpponent: "Selección de Lebu o Selección de Cañete",
        matchTitle: "Clásico Provincial de la Costa: Rumbo a Semifinales",
        venue: "Estadio Municipal Ramón Burgos Loyola (Pasto Sintético)",
        venueAddress: "Avenida Prat s/n, Arauco",
        mapsUrl: "https://maps.google.com/?q=Estadio+Municipal+Ramon+Burgos+Arauco",
        ticketInfo: "$2.000 General • $1.000 Socios ANFA • Niños Gratis",
        referees: "Terna Arbitral designada por Colegio Regional ANFA Biobío"
      },
      staff: [
        { role: "Director Técnico", name: "Cristián Gómez", club: "Real José María (ex Lota Schwager)", notes: "Exfutbolista profesional y DT de Real José María" },
        { role: "Ayudante Técnico", name: "Claudio Mora", club: "Real José María", notes: "Estratega táctico asistente" },
        { role: "Preparador Físico", name: "Alexis Burgos", club: "Real José María", notes: "Acondicionamiento físico de alto rendimiento" },
        { role: "Kinesiólogo / Salud", name: "Jorge Sáez", club: "CESFAM Arauco / Real José María", notes: "Atención médica en campo" },
        { role: "Coordinador General", name: "Marcelo Romero", club: "Real José María", notes: "Fundador de Real José María y gestor comunal" }
      ],
      // Nómina Oficial de 29 Convocados (20 de Real José María + 9 de Clubes Tradicionales)
      squad: [
        // 20 Jugadores de Real José María (Aporte Mayoritario a la Selección de Arauco 2026)
        { id: "sel-rjm-1", number: 1, name: "Marco Silva", position: "Arquero Titular", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-081", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-2", number: 12, name: "Cristóbal Salgado", position: "Arquero", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-082", matches: 0, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-3", number: 3, name: "Cristián Bustos", position: "Defensa Central", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-083", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-4", number: 2, name: "Fernando Sanhueza", position: "Defensa Central", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-084", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-5", number: 13, name: "Jonathan Yáñez", position: "Lateral Derecho", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-085", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-6", number: 6, name: "Kevin Morales", position: "Lateral Izquierdo", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-086", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-7", number: 5, name: "Patricio Monsalve", position: "Volante de Contención", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-087", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-8", number: 8, name: "Sebastián Valenzuela", position: "Volante Mixto", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-088", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-9", number: 10, name: "Felipe Alarcón", position: "Volante Creativo", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-089", matches: 2, goals: 3, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-10", number: 7, name: "Matías Oporto", position: "Extremo Derecho", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-090", matches: 2, goals: 2, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-11", number: 11, name: "Diego Cárdenas", position: "Extremo Izquierdo", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-091", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-12", number: 9, name: "Rodrigo Romero", position: "Centrodelantero", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-092", matches: 2, goals: 3, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-13", number: 14, name: "Brayan Neira", position: "Defensa Polifuncional", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-093", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-14", number: 15, name: "Ignacio Saavedra", position: "Mediocampista", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-094", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-15", number: 16, name: "Carlos Mellado", position: "Volante de Salida", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-095", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-16", number: 17, name: "Gonzalo Chandía", position: "Delantero", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-096", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-17", number: 18, name: "Lucas Beltrán", position: "Lateral", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-097", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-18", number: 19, name: "Camilo Sepúlveda", position: "Volante Mixto", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-098", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-19", number: 20, name: "Javier Henríquez", position: "Puntero", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-099", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-rjm-20", number: 25, name: "Daniel Fuentes", position: "Arquero de Reserva", clubId: "club-real-jose-maria", clubName: "C.D. Real José María", clubBadge: "👑", regAnfa: "REG-ANFA-AR-2026-100", matches: 0, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },

        // 9 Jugadores de Clubes Tradicionales de ANFA Arauco
        { id: "sel-h21", number: 4, name: "Rodrigo Sáez", position: "Defensa Central (Capitán)", clubId: "club-jorge-robledo", clubName: "C.D. Jorge Robledo", clubBadge: "⭐", regAnfa: "REG-ANFA-AR-2020-014", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h22", number: 22, name: "Mauricio Neira", position: "Volante Creativo", clubId: "club-jorge-robledo", clubName: "C.D. Jorge Robledo", clubBadge: "⭐", regAnfa: "REG-ANFA-AR-2018-092", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h23", number: 23, name: "Sebastián Beltrán", position: "Defensa Central", clubId: "club-arauco", clubName: "C.D. Arauco", clubBadge: "🛡️", regAnfa: "REG-ANFA-AR-2019-041", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h24", number: 24, name: "Matías Contreras", position: "Puntero Izquierdo", clubId: "club-arauco", clubName: "C.D. Arauco", clubBadge: "🛡️", regAnfa: "REG-ANFA-AR-2022-118", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h25", number: 21, name: "Alexis Guajardo", position: "Delantero Centro", clubId: "club-brisas-del-mar", clubName: "C.D. Brisas del Mar (Tubul)", clubBadge: "🌊", regAnfa: "REG-ANFA-AR-2017-055", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h26", number: 26, name: "Nicolás Garrido", position: "Volante Mixto", clubId: "club-arturo-prat", clubName: "C.D. Arturo Prat", clubBadge: "⚓", regAnfa: "REG-ANFA-AR-2021-032", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h27", number: 27, name: "Rodrigo Toledo", position: "Volante de Contención", clubId: "club-pelantaro", clubName: "C.D. Pelantaro", clubBadge: "⚔️", regAnfa: "REG-ANFA-AR-2019-077", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h28", number: 28, name: "Lucas Carrillo", position: "Lateral Derecho", clubId: "club-caupolican", clubName: "C.D. Caupolicán", clubBadge: "🏹", regAnfa: "REG-ANFA-AR-2023-019", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
        { id: "sel-h29", number: 29, name: "Víctor Hugo Parra", position: "Mediocampista", clubId: "club-celulosa-arauco", clubName: "C.D. Celulosa Arauco", clubBadge: "🌲", regAnfa: "REG-ANFA-AR-2020-064", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
      ]
    },
    juvenil: {
      seriesName: "Serie Juvenil (Sub-17)",
      status: "eliminada",
      statusBadge: "⚪ ELIMINADA CON HONOR (Fase Octavos)",
      badgeClass: "status-badge",
      headline: "Victoria 2-1 en Curanilahue que cerró con honor la campaña juvenil",
      summary: "La Selección Juvenil Sub-17 de Arauco cayó en la ida 0-5 ante Cavecur en el Estadio Ramón Burgos, pero mostró carácter y temple comunal en la vuelta en el Estadio Parque Urbano de Curanilahue, imponiéndose por 2-1 como forastero. Aunque el global favoreció a Cavecur, la Asociación ANFA Arauco destaca el espíritu deportivo y la proyección del semillero comunal.",
      firstRoundMatches: [
        {
          phase: "Partido de Ida (Octavos de Final)",
          date: "06 de septiembre de 2026",
          venue: "Estadio Municipal Ramón Burgos Loyola, Arauco",
          homeTeam: "Selección Juvenil Arauco",
          homeScore: 0,
          awayTeam: "Cavecur Juvenil (Curanilahue)",
          awayScore: 5
        },
        {
          phase: "Partido de Vuelta (Octavos de Final)",
          date: "13 de septiembre de 2026",
          venue: "Estadio Parque Urbano, Curanilahue",
          homeTeam: "Cavecur Juvenil (Curanilahue)",
          homeScore: 1,
          awayTeam: "Selección Juvenil Arauco",
          awayScore: 2
        }
      ],
      finalRecord: {
        matchesPlayed: 2,
        won: 1,
        drawn: 0,
        lost: 1,
        goalsFor: 2,
        goalsAgainst: 6,
        globalRound: "Arauco Sub-17 2 - 6 Cavecur Sub-17 (Global)"
      },
      staff: [
        { role: "Director Técnico", name: "Pablo Andrés Arias Santibáñez", club: "ANFA Arauco", notes: "Director Técnico Oficial Selección Juvenil Sub-17 Arauco 2026" },
        { role: "Asistente Técnico", name: "Diego Alexis Valenzuela", club: "ANFA Arauco", notes: "Asistente Técnico / Preparador de Porteros" },
        { role: "Preparador Físico", name: "Juan Andrés Leal Vega", club: "ANFA Arauco", notes: "Preparación Física y Rendimiento Atlético" },
        { role: "Preparador de Arqueros", name: "Danny Lorenzo Meza Huenuil", club: "ANFA Arauco", notes: "Entrenador Especializado de Portería" }
      ],
      officialSquad30: [
        { num: 1, name: "Cristóbal Orlando Acuña Vargas", pos: "Arquero", club: "ANFA Arauco" },
        { num: 2, name: "Ricardo Andrés Aguilar Navarrete", pos: "Defensa", club: "ANFA Arauco" },
        { num: 3, name: "Rafael Antonio Burgos Denis", pos: "Defensa", club: "ANFA Arauco" },
        { num: 4, name: "Agustín Alonso Ceballos Figueroa", pos: "Defensa", club: "ANFA Arauco" },
        { num: 5, name: "Alexander Jeremías Concha Oñate", pos: "Volante", club: "ANFA Arauco" },
        { num: 6, name: "Maximiliano Esteban Garretón Muñoz", pos: "Volante", club: "ANFA Arauco" },
        { num: 7, name: "Sebastián Alejandro Gutiérrez Paredes", pos: "Delantero", club: "ANFA Arauco" },
        { num: 8, name: "Franco Agustín Hermosilla Salazar", pos: "Volante", club: "ANFA Arauco" },
        { num: 9, name: "Omar Francisco Henríquez Varela", pos: "Delantero", club: "ANFA Arauco" },
        { num: 10, name: "Ian Vicente Leal Carrillo", pos: "Volante Creativo", club: "ANFA Arauco" },
        { num: 11, name: "Martín Alonso Leal Concha", pos: "Extremo", club: "ANFA Arauco" },
        { num: 12, name: "Sebastián León Méndez Bahamondes", pos: "Arquero", club: "ANFA Arauco" },
        { num: 13, name: "Joaquín Alexander Efraín Meza Garretón", pos: "Defensa Central", club: "ANFA Arauco" },
        { num: 14, name: "Alexander Stein Monsalve Rifo", pos: "Mediocampista", club: "ANFA Arauco" },
        { num: 15, name: "Mateo Ezequiel Montoya Inzunza", pos: "Volante", club: "ANFA Arauco" },
        { num: 16, name: "Cristóbal Alejandro Opazo Medina", pos: "Lateral", club: "ANFA Arauco" },
        { num: 17, name: "Antonio Andrés Pardo Rodríguez", pos: "Volante", club: "ANFA Arauco" },
        { num: 18, name: "Samuel Ignacio Poblete Varela", pos: "Delantero", club: "ANFA Arauco" },
        { num: 19, name: "Ricardo Andrés Pradenas Aguilar", pos: "Defensa", club: "ANFA Arauco" },
        { num: 20, name: "Enrique Alejandro Quevedo Farías", pos: "Mediocampista", club: "ANFA Arauco" },
        { num: 21, name: "Gabriel Andrés Ruiz Zambrano", pos: "Delantero", club: "ANFA Arauco" },
        { num: 22, name: "Alonso Antonio Sáez Hidalgo", pos: "Lateral", club: "ANFA Arauco" },
        { num: 23, name: "Alan Gabriel Sáez Iturra", pos: "Defensa Central", club: "ANFA Arauco" },
        { num: 24, name: "Héctor Fernando Ulloa Quilamán", pos: "Volante", club: "ANFA Arauco" },
        { num: 25, name: "Diego Alonso Ulloa Rivas", pos: "Arquero", club: "ANFA Arauco" },
        { num: 26, name: "Leonardo Alexis Valenzuela Leal", pos: "Defensa", club: "ANFA Arauco" },
        { num: 27, name: "Joaquín Octavio Vallejos Espinoza", pos: "Volante", club: "ANFA Arauco" },
        { num: 28, name: "Matías Alejandro Vásquez Castro", pos: "Extremo", club: "ANFA Arauco" },
        { num: 29, name: "Pedro Andrés Vega Lizama", pos: "Delantero", club: "ANFA Arauco" },
        { num: 30, name: "Matías Alfonso Vilo Carrillo", pos: "Lateral", club: "ANFA Arauco" }
      ],
      featuredYoungsters: [
        { name: "Ian Vicente Leal Carrillo", club: "ANFA Arauco", position: "Volante Creativo (#10)", notes: "Convocado oficial. Talento y visión ofensiva." },
        { name: "Omar Francisco Henríquez Varela", club: "ANFA Arauco", position: "Delantero (#9)", notes: "Convocado oficial. Referente de área del semillero." },
        { name: "Joaquín Alexander Efraín Meza", club: "ANFA Arauco", position: "Defensa (#13)", notes: "Convocado oficial. Solvencia y quite en retaguardia." },
        { name: "Martín Alonso Leal Concha", club: "ANFA Arauco", position: "Extremo (#11)", notes: "Convocado oficial. Velocidad y desborde por la banda." }
      ]
    }
  },

  /**
   * Sala de Prensa, Noticias Oficiales y Cobertura Multimedia (FIFA / Fan Hub)
   */
  news: [
    {
      id: "news-01",
      title: "Gran Clásico en Ramón Burgos: C.D. Jorge Robledo y Brisas del Mar encienden la Fecha 8 de Honor",
      category: "Torneo Oficial",
      categoryBadge: "🔥 CLÁSICO DE LA FECHA",
      date: "Hoy • 16:30 hrs",
      readTime: "3 min de lectura",
      author: "Prensa Oficial ANFA Arauco",
      hero: true,
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
      excerpt: "Con graderías colmadas en el Estadio Municipal Ramón Burgos, el puntero del campeonato y el escolta de Caleta Tubul se miden en un duelo que puede definir el liderato hacia la Copa de Campeones.",
      content: "La fiesta del fútbol amateur en Arauco vive su fecha más vibrante. Ambos equipos llegan invictos en la segunda rueda de la Serie de Honor. El Directorio de ANFA Arauco dispuso un contingente especial de seguridad y terna arbitral colegiada de CAPA para garantizar un espectáculo deportivo de primer nivel para todas las familias que asistan al estadio.",
      tags: ["Fecha 8", "Serie de Honor", "Copa de Campeones"]
    },
    {
      id: "news-02",
      title: "Nómina Oficial: Selección Sub-15 de Arauco inicia microciclo rumbo al Campeonato Regional",
      category: "Selección Comunal",
      categoryBadge: "🇨🇱 SEMILLERO ANFA",
      date: "Ayer",
      readTime: "2 min de lectura",
      author: "Cuerpo Técnico Selección",
      hero: false,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
      excerpt: "El cuerpo técnico comunal oficializó la lista de 30 juveniles convocados de los 10 clubes locales para iniciar los entrenamientos nocturnos en el Estadio Sebastián Gaete.",
      content: "Con miras al Torneo Regional de Selecciones ANFA Biobío 2026, la Asociación de Fútbol de Arauco comenzó los trabajos físicos y tácticos. Los entrenamientos se desarrollarán los días martes y jueves con indumentaria oficial entregada por la asociación.",
      tags: ["Selección Arauco", "Sub-15", "Biobío 2026"]
    },
    {
      id: "news-03",
      title: "Tribunal de Penas emite Acta Nº 7: Resoluciones y sanciones de la última jornada",
      category: "Tribunal & Disciplina",
      categoryBadge: "⚖️ FALLOS DISCIPLINARIOS",
      date: "20 Septiembre",
      readTime: "4 min de lectura",
      author: "Tribunal de Honor y Disciplina",
      hero: false,
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
      excerpt: "En sesión ordinaria en la sede institucional de Julio Montt, el tribunal resolvió las amonestaciones del Artículo 42 y suspensiones por acumulación de tarjetas amarillas.",
      content: "Se recuerda a los delegados de todos los clubes asociados que las multas por tarjetas deben ser canceladas en tesorería antes de la programación de la siguiente fecha para no perder puntos por secretaría.",
      tags: ["Tribunal de Penas", "Reglamento ANFA", "Actas"]
    },
    {
      id: "news-04",
      title: "Histórico: ANFA Arauco estrena la plataforma digital LigaPro Evolution con carnets QR y Papeleta Táctil",
      category: "Institucional",
      categoryBadge: "🚀 INNOVACIÓN DEPORTIVA",
      date: "18 Septiembre",
      readTime: "3 min de lectura",
      author: "Mesa Directiva Comunal",
      hero: false,
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
      excerpt: "La asociación local da el salto tecnológico al abandonar las planillas físicas de papel y adoptar el nuevo sistema digital de transmisión en vivo y control de turno.",
      content: "A través de esta plataforma, hinchas, árbitros y dirigentes pueden seguir los partidos en simultáneo, revisar fichas de jugadores validadas y asegurar la transparencia total en la tabla de posiciones.",
      tags: ["LigaPro Evolution", "Tecnología", "Fútbol Amateur"]
    }
  ],

  /**
   * Galería Multimedia Oficial: Fotos en Alta Resolución y Videos de Goles
   */
  mediaGallery: {
    photos: [
      {
        id: "photo-01",
        title: "Celebración del gol agónico en el Ramón Burgos",
        match: "C.D. Jorge Robledo vs C.D. Brisas del Mar",
        date: "Fecha 8 • Serie de Honor",
        venue: "Estadio Municipal Ramón Burgos",
        author: "Prensa Arauco",
        url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "photo-02",
        title: "La hinchada de Tubul copando el sector de graderías con lienzos",
        match: "C.D. Brisas del Mar",
        date: "Fecha 8 • Serie de Honor",
        venue: "Estadio Municipal Ramón Burgos",
        author: "Prensa Arauco",
        url: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "photo-03",
        title: "Férrea disputa aérea en el mediocampo del Sebastián Gaete",
        match: "C.D. Celulosa vs C.D. Arauco",
        date: "Fecha 8 • Segunda Adulta",
        venue: "Estadio Sebastián Gaete",
        author: "Prensa Arauco",
        url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "photo-04",
        title: "Sorteo protocolar de capitanes junto al árbitro oficial CAPA",
        match: "Protocolo Fair Play ANFA",
        date: "Fecha 8 • Serie de Honor",
        venue: "Estadio Ramón Burgos",
        author: "Prensa Arauco",
        url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    videos: [
      {
        id: "vid-01",
        title: "¡GOLAZO de tiro libre al ángulo de Mauricio Neira (Robledo)!",
        category: "Gol de la Fecha",
        duration: "0:45",
        views: "1.8K reproducciones",
        thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Remate imparable desde 28 metros que dejó sin opciones al arquero rival."
      },
      {
        id: "vid-02",
        title: "Penal atajado en el minuto 89 que desató la euforia en Tubul",
        category: "Atajada Clave",
        duration: "1:15",
        views: "1.2K reproducciones",
        thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Gran estirada hacia la derecha para mantener la ventaja en el clásico."
      },
      {
        id: "vid-03",
        title: "Festejo en camarines y cánticos de la Selección Sub-15",
        category: "Backstage Comunal",
        duration: "0:50",
        views: "2.4K reproducciones",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "La alegría de los jóvenes de Arauco tras su primera victoria preparatoria."
      }
    ]
  }
};


/**
 * ==========================================================================
 * ARQUITECTURA MULTI-LIGA DE CHILE (REGIONES, ASOCIACIONES Y LIGAS)
 * ==========================================================================
 */

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
        commune: "Arauco (Costa Histórica)",
        founded: "01 de octubre de 1940 (86 años)",
        president: "Claudio Pampaloni Altamirano",
        totalClubs: 10,
        status: "active",
        statusLabel: "Campeonato Oficial 2026/27",
        isDemo: false
      },
      {
        id: "lebu",
        name: "Asociación de Fútbol de Lebu",
        shortName: "ANFA Lebu",
        badgeId: "asociacion-lebu",
        commune: "Lebu (Capital Provincial)",
        founded: "15 de mayo de 1948 (78 años)",
        president: "Manuel Cuevas Saavedra",
        totalClubs: 8,
        status: "demo",
        statusLabel: "Demostración de Liga",
        isDemo: true
      },
      {
        id: "canete",
        name: "Asociación de Fútbol de Cañete",
        shortName: "ANFA Cañete",
        badgeId: "asociacion-canete",
        commune: "Cañete (Tierra Histórica)",
        founded: "12 de octubre de 1955 (71 años)",
        president: "Héctor Maldonado Viveros",
        totalClubs: 8,
        status: "demo",
        statusLabel: "Demostración de Liga",
        isDemo: true
      },
      {
        id: "liga-demo",
        name: "Liga Demo",
        shortName: "Liga Demo",
        badgeId: "asociacion-arauco",
        commune: "Comuna Modelo (800 Jugadores)",
        founded: "Temporada Oficial 2026/27",
        president: "Patricio Morales Vega",
        totalClubs: 10,
        status: "demo",
        statusLabel: "Campeonato Demo Oficial (800 Jugadores)",
        isDemo: true
      }
    ]
  },
  {
    regionId: "metropolitana",
    regionName: "Región Metropolitana",
    leagues: [
      {
        id: "cordillera",
        name: "Liga Cordillera Santiago",
        shortName: "Liga Cordillera",
        badgeId: "asociacion-cordillera",
        commune: "Santiago Oriente",
        founded: "18 de marzo de 1994 (32 años)",
        president: "Gonzalo Valdés Rivas",
        totalClubs: 8,
        status: "demo",
        statusLabel: "Demostración de Liga",
        isDemo: true
      }
    ]
  }
];

export const MULTI_LEAGUE_STORE = {
  arauco: INITIAL_DATA,
  'liga-demo': LIGA_DEMO_DATA,

  lebu: {
    leagueInfo: {
      name: "Asociación de Fútbol de Lebu",
      shortName: "ANFA Lebu",
      leagueId: "lebu",
      badgeId: "asociacion-lebu",
      foundationDate: "15 de mayo de 1948 (78 años)",
      anniversary: "Fundada el 15 de mayo de 1948. Asociación decana provincial del puerto pesquero y carbonífero de Lebu.",
      president: "Manuel Cuevas Saavedra",
      mediaPartner: "Transmisiones Puerto Lebu & Radio Lebu Deportes",
      commune: "Lebu (Capital Provincial de Arauco)",
      headquarters: "Sector Boca Lebu / Calle Latorre Nº 210, Lebu",
      season: "Campeonato Oficial 2026/27",
      activeSeries: "honor",
      totalClubs: 8,
      isDemo: true,
      demoNotice: "Entorno de demostración para incorporación de ANFA Lebu a LigaMaster",
      governingBodies: {
        regional: "ANFA Región del Biobío",
        national: "Asociación Nacional de Fútbol Amateur (ANFA Chile)",
        referees: "Cuerpo de Árbitros ANFA Lebu",
        broadcast: "Transmisiones Puerto Lebu"
      },
      activeMatchId: "match-lebu-01"
    },

    venues: [
      {
        id: "estadio-municipal-lebu",
        name: "Estadio Municipal de Lebu",
        shortName: "Estadio Municipal",
        commune: "Lebu",
        surface: "Pasto Sintético Certificado",
        surfaceType: "sintetico",
        lighting: "Iluminación Artificial LED",
        capacity: "3.000 espectadores",
        address: "Calle Mackay s/n, Lebu",
        status: "habilitada",
        statusLabel: "🟢 Habilitada (Cancha Principal)",
        usageNotes: "Principal recinto del puerto provincial. Alberga los compromisos dominicales de Honor y Senior.",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético", "Iluminación LED", "Graderías Techadas", "Camarines Oficiales"]
      },
      {
        id: "cancha-boca-lebu",
        name: "Cancha Boca Lebu",
        shortName: "Cancha Boca Lebu",
        commune: "Lebu",
        surface: "Pasto Sintético de Alto Tráfico",
        surfaceType: "sintetico",
        lighting: "Torres Perimetrales",
        capacity: "1.200 espectadores",
        address: "Sector Puerto / Caleta Pesquera, Lebu",
        status: "habilitada",
        statusLabel: "🟢 Habilitada",
        usageNotes: "Emplazada en la desembocadura del Río Lebu, tradicional sede de las series Segunda y Juvenil.",
        photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético", "Entorno Costero", "Camarines"]
      }
    ],

    regulations: {
      code: "REGLAMENTO-ANFA-LEBU-2026",
      disciplinaryCode: "Código de Procedimientos y Penalidades ANFA Nacional",
      substitutionRule: "Máximo 5 sustituciones en 3 ventanas reglamentarias.",
      cardRules: { yellowAccumulation: 5, yellowWarning: 4, doubleYellow: 1, directRed: "2 a 4 fechas" },
      cupQualification: { regional: "Copa de Campeones ANFA Biobío" }
    },

    seriesList: [
      { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
      { id: "senior_35", name: "Serie Senior (35+ Años)", shortName: "Senior 35", ageLimit: "35 años cumplidos", halfDuration: 40, active: false },
      { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil", ageLimit: "Menores de 17 años", halfDuration: 40, active: false }
    ],

    clubs: [
      {
        id: "club-lebu-penarol",
        name: "C.D. Peñarol de Lebu",
        shortName: "Peñarol Lebu",
        badgeId: "club-lebu-penarol",
        founded: "12 de octubre de 1947",
        exactFoundationDate: "12 de octubre de 1947",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Sector Cerro La Cruz, Lebu",
        titlesComunalesHonor: 9,
        colors: "Amarillo y Negro",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Institución aurinegra de gran arraigo popular en el puerto de Lebu. Nueve veces monarca comunal de Primera Adulta."
      },
      {
        id: "club-lebu-victoria",
        name: "C.D. Victoria de Lebu",
        shortName: "Victoria Lebu",
        badgeId: "club-lebu-victoria",
        founded: "4 de mayo de 1938",
        exactFoundationDate: "4 de mayo de 1938",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Sector Centro, Lebu",
        titlesComunalesHonor: 8,
        colors: "Rojo y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "El club decano de la comuna de Lebu, fundado en 1938 con rica tradición y 8 títulos comunales."
      },
      {
        id: "club-lebu-pesquero",
        name: "C.D. Pesquero Lebu",
        shortName: "Pesquero Lebu",
        badgeId: "club-lebu-pesquero",
        founded: "18 de agosto de 1965",
        exactFoundationDate: "18 de agosto de 1965",
        stadium: "Cancha Boca Lebu",
        neighborhood: "Caleta Pesquera, Lebu",
        titlesComunalesHonor: 6,
        colors: "Azul Marino y Dorado",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Nacido del gremio de pescadores artesanales del Río Lebu. Gran potencia física y localía inexpugnable."
      },
      {
        id: "club-lebu-carbon",
        name: "C.D. Carbonífero Lebu",
        shortName: "Carbonífero",
        badgeId: "club-lebu-carbon",
        founded: "21 de mayo de 1942",
        exactFoundationDate: "21 de mayo de 1942",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Sector Mina Fortuna, Lebu",
        titlesComunalesHonor: 7,
        colors: "Negro Carbón y Ámbar",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Heredero de la epopeya obrera minera de Lebu. Símbolo del coraje del carbón con siete campeonatos oficiales."
      },
      {
        id: "club-lebu-esmeralda",
        name: "C.D. Esmeralda",
        shortName: "Esmeralda",
        badgeId: "club-lebu-esmeralda",
        founded: "19 de noviembre de 1952",
        exactFoundationDate: "19 de noviembre de 1952",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Población Esmeralda, Lebu",
        titlesComunalesHonor: 5,
        colors: "Verde Esmeralda y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Representante clásico del fútbol barrial lebulense y reconocido semillero formativo de divisiones inferiores."
      },
      {
        id: "club-lebu-playa",
        name: "C.D. Playa Grande",
        shortName: "Playa Grande",
        badgeId: "club-lebu-playa",
        founded: "10 de enero de 1974",
        exactFoundationDate: "10 de enero de 1974",
        stadium: "Cancha Boca Lebu",
        neighborhood: "Sector Playa Grande, Lebu",
        titlesComunalesHonor: 4,
        colors: "Azul Celeste y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Fuerte identidad marítima ligada al extenso litoral lebulense y destacada presencia en series adultas."
      },
      {
        id: "club-lebu-leones",
        name: "C.D. Los Leones de Lebu",
        shortName: "Los Leones",
        badgeId: "club-lebu-leones",
        founded: "30 de agosto de 1982",
        exactFoundationDate: "30 de agosto de 1982",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Población Santa Fe, Lebu",
        titlesComunalesHonor: 3,
        colors: "Naranjo y Negro",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Elenco fundado en la década de los ochenta con gran arrastre juvenil y un tricampeonato de honor."
      },
      {
        id: "club-lebu-colocolo",
        name: "C.D. Colo-Colo Lebu",
        shortName: "Colo-Colo Lebu",
        badgeId: "club-lebu-colocolo",
        founded: "14 de junio de 1960",
        exactFoundationDate: "14 de junio de 1960",
        stadium: "Estadio Municipal de Lebu",
        neighborhood: "Sector Alto Lebu",
        titlesComunalesHonor: 5,
        colors: "Blanco y Negro",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Tradición popular en el sector alto de la ciudad, con 5 títulos comunales y constante animación de la tabla."
      }
    ],

    players: [
      {
        id: "p-lebu-1",
        name: "Álvaro Riquelme Neira",
        clubId: "club-lebu-penarol",
        series: "honor",
        number: 9,
        position: "Centrodelantero",
        rut: "18.441.205-3",
        age: 26,
        goals: 7,
        assists: 3,
        yellowCards: 2,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 620,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-lebu-2",
        name: "Cristián Alarcón Peña",
        clubId: "club-lebu-victoria",
        series: "honor",
        number: 10,
        position: "Volante de Creación",
        rut: "17.920.314-8",
        age: 28,
        goals: 5,
        assists: 6,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 630,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-lebu-3",
        name: "Diego Neira Cuevas",
        clubId: "club-lebu-penarol",
        series: "honor",
        number: 7,
        position: "Extremo Derecho",
        rut: "19.330.112-4",
        age: 24,
        goals: 4,
        assists: 5,
        yellowCards: 3,
        redCards: 0,
        matchesPlayed: 6,
        minutesPlayed: 510,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-lebu-4",
        name: "Juan Pablo Bastías",
        clubId: "club-lebu-pesquero",
        series: "honor",
        number: 11,
        position: "Puntero Izquierdo",
        rut: "18.882.110-1",
        age: 25,
        goals: 6,
        assists: 2,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 590,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-lebu-5",
        name: "Matías Saavedra Fierro",
        clubId: "club-lebu-carbon",
        series: "honor",
        number: 8,
        position: "Volante Mixto",
        rut: "17.442.991-6",
        age: 29,
        goals: 3,
        assists: 4,
        yellowCards: 4,
        redCards: 1,
        matchesPlayed: 6,
        minutesPlayed: 500,
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-lebu-6",
        name: "Rodrigo Parra Alvear",
        clubId: "club-lebu-esmeralda",
        series: "honor",
        number: 1,
        position: "Guardameta",
        rut: "16.890.312-K",
        age: 31,
        goals: 0,
        assists: 0,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 630,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
      }
    ],

    matches: [
      {
        id: "match-lebu-01",
        series: "honor",
        round: "Fecha 7 • Clásico del Puerto de Lebu",
        homeClubId: "club-lebu-penarol",
        awayClubId: "club-lebu-victoria",
        venue: "Estadio Municipal de Lebu",
        date: "Hoy • 16:30 hrs",
        status: "en_vivo",
        currentMinute: 38,
        half: 1,
        homeScore: 2,
        awayScore: 1,
        referee: "Marcos Retamal (Cuerpo ANFA Lebu)",
        events: [
          { type: "gol", minute: 12, playerName: "Álvaro Riquelme", teamId: "club-lebu-penarol", description: "Cabezazo al segundo palo tras tiro de esquina" },
          { type: "gol", minute: 26, playerName: "Cristián Alarcón", teamId: "club-lebu-victoria", description: "Tiro libre directo al ángulo superior" },
          { type: "gol", minute: 35, playerName: "Diego Neira", teamId: "club-lebu-penarol", description: "Remate cruzado tras pase filtrado" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
      },
      {
        id: "match-lebu-02",
        series: "honor",
        round: "Fecha 7 • Duelo Costero",
        homeClubId: "club-lebu-pesquero",
        awayClubId: "club-lebu-carbon",
        venue: "Cancha Boca Lebu",
        date: "Hoy • 14:00 hrs",
        status: "finalizado",
        currentMinute: 90,
        half: 2,
        homeScore: 2,
        awayScore: 1,
        referee: "Gonzalo Riffo (ANFA Lebu)",
        events: [
          { type: "gol", minute: 18, playerName: "Juan Pablo Bastías", teamId: "club-lebu-pesquero", description: "Remate colocado desde el borde del área" },
          { type: "gol", minute: 55, playerName: "Matías Saavedra", teamId: "club-lebu-carbon", description: "Tiro penal" },
          { type: "gol", minute: 82, playerName: "Juan Pablo Bastías", teamId: "club-lebu-pesquero", description: "Definición cruzada ante salida del arquero" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: true }
      },
      {
        id: "match-lebu-03",
        series: "honor",
        round: "Fecha 8 • Oficial",
        homeClubId: "club-lebu-esmeralda",
        awayClubId: "club-lebu-playa",
        venue: "Estadio Municipal de Lebu",
        date: "Domingo • 15:00 hrs",
        status: "programado",
        currentMinute: 0,
        half: 1,
        homeScore: 0,
        awayScore: 0,
        referee: "Por designar (Colegio de Árbitros)",
        events: [],
        signatures: { homeCaptainConfirmed: false, awayCaptainConfirmed: false, refereeConfirmed: false }
      },
      {
        id: "match-lebu-04",
        series: "honor",
        round: "Fecha 8 • Oficial",
        homeClubId: "club-lebu-leones",
        awayClubId: "club-lebu-colocolo",
        venue: "Estadio Municipal de Lebu",
        date: "Domingo • 17:00 hrs",
        status: "programado",
        currentMinute: 0,
        half: 1,
        homeScore: 0,
        awayScore: 0,
        referee: "Por designar (Colegio de Árbitros)",
        events: [],
        signatures: { homeCaptainConfirmed: false, awayCaptainConfirmed: false, refereeConfirmed: false }
      }
    ],

    standings: {
      honor: [
        { pos: 1, clubId: "club-lebu-penarol", clubName: "C.D. Peñarol de Lebu", pj: 7, pg: 5, pe: 1, pp: 1, gf: 16, gc: 7, dg: 9, pts: 16 },
        { pos: 2, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 7, pg: 4, pe: 2, pp: 1, gf: 14, gc: 8, dg: 6, pts: 14 },
        { pos: 3, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 7, pg: 4, pe: 1, pp: 2, gf: 13, gc: 9, dg: 4, pts: 13 },
        { pos: 4, clubId: "club-lebu-carbon", clubName: "C.D. Carbonífero Lebu", pj: 7, pg: 3, pe: 2, pp: 2, gf: 11, gc: 10, dg: 1, pts: 11 },
        { pos: 5, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 7, pg: 2, pe: 3, pp: 2, gf: 9, gc: 9, dg: 0, pts: 9 },
        { pos: 6, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 7, pg: 2, pe: 1, pp: 4, gf: 8, gc: 12, dg: -4, pts: 7 },
        { pos: 7, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 7, pg: 1, pe: 3, pp: 3, gf: 7, gc: 12, dg: -5, pts: 6 },
        { pos: 8, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 7, pg: 1, pe: 1, pp: 5, gf: 6, gc: 17, dg: -11, pts: 4 }
      ],
      senior_35: [
        { pos: 1, clubId: "club-lebu-carbon", clubName: "C.D. Carbonífero Lebu", pj: 6, pg: 5, pe: 1, pp: 0, gf: 15, gc: 4, dg: 11, pts: 16 },
        { pos: 2, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 6, pg: 4, pe: 1, pp: 1, gf: 12, gc: 6, dg: 6, pts: 13 },
        { pos: 3, clubId: "club-lebu-penarol", clubName: "C.D. Peñarol de Lebu", pj: 6, pg: 3, pe: 2, pp: 1, gf: 10, gc: 7, dg: 3, pts: 11 },
        { pos: 4, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 6, pg: 2, pe: 2, pp: 2, gf: 9, gc: 9, dg: 0, pts: 8 },
        { pos: 5, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 6, pg: 2, pe: 1, pp: 3, gf: 7, gc: 10, dg: -3, pts: 7 },
        { pos: 6, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 6, pg: 1, pe: 2, pp: 3, gf: 6, gc: 11, dg: -5, pts: 5 },
        { pos: 7, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 6, pg: 1, pe: 1, pp: 4, gf: 5, gc: 12, dg: -7, pts: 4 },
        { pos: 8, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 6, pg: 0, pe: 2, pp: 4, gf: 4, gc: 13, dg: -9, pts: 2 }
      ],
      juvenil: [
        { pos: 1, clubId: "club-lebu-penarol", clubName: "C.D. Peñarol de Lebu", pj: 5, pg: 4, pe: 1, pp: 0, gf: 14, gc: 3, dg: 11, pts: 13 },
        { pos: 2, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 5, pg: 3, pe: 2, pp: 0, gf: 11, gc: 4, dg: 7, pts: 11 },
        { pos: 3, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 5, pg: 3, pe: 0, pp: 2, gf: 9, gc: 7, dg: 2, pts: 9 },
        { pos: 4, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 5, pg: 2, pe: 1, pp: 2, gf: 8, gc: 8, dg: 0, pts: 7 },
        { pos: 5, clubId: "club-lebu-carbon", clubName: "C.D. Carbonífero Lebu", pj: 5, pg: 2, pe: 0, pp: 3, gf: 7, gc: 9, dg: -2, pts: 6 },
        { pos: 6, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 5, pg: 1, pe: 1, pp: 3, gf: 5, gc: 10, dg: -5, pts: 4 },
        { pos: 7, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 5, pg: 1, pe: 0, pp: 4, gf: 4, gc: 12, dg: -8, pts: 3 },
        { pos: 8, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 5, pg: 0, pe: 1, pp: 4, gf: 3, gc: 13, dg: -10, pts: 1 }
      ]
    },

    news: [
      {
        id: "news-lebu-01",
        title: "Vibrante Clásico del Puerto: Peñarol y Victoria disputan la cima de Honor",
        category: "Torneo Oficial",
        categoryBadge: "⚽ CLÁSICO PORTUARIO",
        date: "02 de Octubre, 2026",
        readTime: "3 min de lectura",
        author: "Prensa ANFA Lebu",
        hero: true,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
        excerpt: "Con lleno absoluto en las graderías del Estadio Municipal de Lebu, el choque aurinegro y albirrojo enciende la séptima fecha oficial.",
        content: "El clásico más esperado del fútbol lebulense convocó a más de 1.800 fanáticos en el Estadio Municipal. Peñarol se puso en ventaja temprana, pero Victoria contestó con un golazo de tiro libre antes del descanso.",
        tags: ["ANFA Lebu", "Clásico del Puerto", "Serie de Honor"]
      },
      {
        id: "news-lebu-02",
        title: "ANFA Lebu proyecta modernización de camarines y luminarias en Cancha Boca Lebu",
        category: "Infraestructura",
        categoryBadge: "🏗️ OBRAS Y MEJORAS",
        date: "28 de Septiembre, 2026",
        readTime: "2 min de lectura",
        author: "Directiva Comunal",
        hero: false,
        image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80",
        excerpt: "Comité directivo comunal gestiona recursos para optimizar las instalaciones del tradicional recinto pesquero costero.",
        content: "Con miras a la temporada 2027, la Asociación de Fútbol de Lebu presentó el expediente técnico para la renovación integral del sistema de iluminación de la Cancha Boca Lebu.",
        tags: ["Lebu", "Cancha Boca Lebu", "Infraestructura"]
      }
    ],

    mediaGallery: {
      photos: [
        {
          id: "photo-lebu-01",
          title: "Postal del Clásico en el Municipal de Lebu",
          match: "Peñarol vs Victoria",
          date: "Hoy",
          venue: "Estadio Municipal de Lebu",
          author: "Prensa Puerto Lebu",
          url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
        }
      ],
      videos: []
    }
  },

  canete: {
    leagueInfo: {
      name: "Asociación de Fútbol de Cañete",
      shortName: "ANFA Cañete",
      leagueId: "canete",
      badgeId: "asociacion-canete",
      foundationDate: "12 de octubre de 1955 (71 años)",
      anniversary: "Fundada el 12 de octubre de 1955. Asociación histórica de la Provincia de Arauco en el cono sur del Biobío.",
      president: "Héctor Maldonado Viveros",
      mediaPartner: "Cañete Deportes Digital",
      commune: "Cañete (Tierra Histórica)",
      headquarters: "Avenida Saavedra / Pasaje Los Notros, Cañete",
      season: "Campeonato Oficial 2026/27",
      activeSeries: "honor",
      totalClubs: 8,
      isDemo: true,
      demoNotice: "Entorno de demostración para incorporación de ANFA Cañete a LigaMaster",
      governingBodies: {
        regional: "ANFA Región del Biobío",
        national: "Asociación Nacional de Fútbol Amateur (ANFA Chile)",
        referees: "Cuerpo Arbitral Comunal de Cañete",
        broadcast: "Cañete Deportes Digital"
      },
      activeMatchId: "match-canete-01"
    },

    venues: [
      {
        id: "estadio-fiscal-canete",
        name: "Estadio Fiscal de Cañete",
        shortName: "Estadio Fiscal",
        commune: "Cañete",
        surface: "Pasto Sintético FIFA Quality",
        surfaceType: "sintetico",
        lighting: "Iluminación Artificial LED",
        capacity: "2.800 espectadores",
        address: "Calle Saavedra s/n, Cañete",
        status: "habilitada",
        statusLabel: "🟢 Habilitada (Cancha Principal)",
        usageNotes: "Principal reducto comunal con certificación de pasto sintético de alto rendimiento.",
        photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético FIFA", "Iluminación LED", "Graderías Techadas"]
      },
      {
        id: "cancha-caupolican",
        name: "Cancha Complejo Deportivo Caupolicán",
        shortName: "Cancha Caupolicán",
        commune: "Cañete",
        surface: "Pasto Sintético",
        surfaceType: "sintetico",
        lighting: "Torres Perimetrales",
        capacity: "1.000 espectadores",
        address: "Sector Barrio Norte, Cañete",
        status: "habilitada",
        statusLabel: "🟢 Habilitada",
        usageNotes: "Sede de campeonatos infantiles y series senior comunales.",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético", "Camarines"]
      }
    ],

    regulations: {
      code: "REGLAMENTO-ANFA-CANETE-2026",
      disciplinaryCode: "Código de Procedimientos y Penalidades ANFA",
      substitutionRule: "5 sustituciones por elenco en 3 ventanas reglamentarias.",
      cardRules: { yellowAccumulation: 5, yellowWarning: 4, doubleYellow: 1, directRed: "2 a 4 fechas" },
      cupQualification: { regional: "Copa de Campeones ANFA Biobío" }
    },

    seriesList: [
      { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
      { id: "senior_35", name: "Serie Senior (35+ Años)", shortName: "Senior 35", ageLimit: "35 años cumplidos", halfDuration: 40, active: false },
      { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil", ageLimit: "Menores de 17 años", halfDuration: 40, active: false }
    ],

    clubs: [
      {
        id: "club-canete-alianza",
        name: "C.D. Alianza de Cañete",
        shortName: "Alianza Cañete",
        badgeId: "club-canete-alianza",
        founded: "18 de septiembre de 1945",
        exactFoundationDate: "18 de septiembre de 1945",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Sector Centro, Cañete",
        titlesComunalesHonor: 11,
        colors: "Azul y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "El club más laureado en la historia de ANFA Cañete con 11 estrellas de Primera Adulta."
      },
      {
        id: "club-canete-juvenil",
        name: "C.D. Juvenil Cañete",
        shortName: "Juvenil Cañete",
        badgeId: "club-canete-juvenil",
        founded: "15 de julio de 1956",
        exactFoundationDate: "15 de julio de 1956",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Población La Granja",
        titlesComunalesHonor: 8,
        colors: "Verde y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Institución de gran tradición formativa y constante protagonista de liguillas finales."
      },
      {
        id: "club-canete-caupolican",
        name: "C.D. Caupolicán de Cañete",
        shortName: "Caupolicán",
        badgeId: "club-canete-caupolican",
        founded: "22 de agosto de 1963",
        exactFoundationDate: "22 de agosto de 1963",
        stadium: "Cancha Caupolicán",
        neighborhood: "Barrio Norte, Cañete",
        titlesComunalesHonor: 7,
        colors: "Rojo Furia",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Heredero de la bravura histórica cañetina, reconocido por su aguerrido estilo de juego."
      },
      {
        id: "club-canete-tucapel",
        name: "C.D. Tucapel Cañete",
        shortName: "Tucapel",
        badgeId: "club-canete-tucapel",
        founded: "12 de marzo de 1959",
        exactFoundationDate: "12 de marzo de 1959",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Sector Fuerte Tucapel",
        titlesComunalesHonor: 6,
        colors: "Verde Bosque y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Club histórico ligado al patrimonio del histórico Fuerte Tucapel y gran animador comarcal."
      },
      {
        id: "club-canete-lagranja",
        name: "C.D. La Granja",
        shortName: "La Granja",
        badgeId: "club-canete-lagranja",
        founded: "4 de octubre de 1978",
        exactFoundationDate: "4 de octubre de 1978",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Villa La Granja",
        titlesComunalesHonor: 4,
        colors: "Amarillo Dorado",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Representante de los sectores agrícolas y residenciales del oriente comunal."
      },
      {
        id: "club-canete-lautaro",
        name: "C.D. Lautaro de Cañete",
        shortName: "Lautaro",
        badgeId: "club-canete-lautaro",
        founded: "14 de enero de 1968",
        exactFoundationDate: "14 de enero de 1968",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Sector Cayucupil, Cañete",
        titlesComunalesHonor: 5,
        colors: "Azul Marino",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Emblema del valle de Cayucupil con sólida hinchada rural y títulos en series mayores."
      },
      {
        id: "club-canete-ferro",
        name: "C.D. Ferroviario Cañete",
        shortName: "Ferroviario",
        badgeId: "club-canete-ferro",
        founded: "19 de noviembre de 1952",
        exactFoundationDate: "19 de noviembre de 1952",
        stadium: "Estadio Fiscal de Cañete",
        neighborhood: "Sector Antigua Estación",
        titlesComunalesHonor: 5,
        colors: "Negro y Blanco",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Heredero de la época del ferrocarril a Lebu y Cañete. Fuerte identidad gremial ferroviaria."
      },
      {
        id: "club-canete-galvarino",
        name: "C.D. Galvarino",
        shortName: "Galvarino",
        badgeId: "club-canete-galvarino",
        founded: "7 de junio de 1971",
        exactFoundationDate: "7 de junio de 1971",
        stadium: "Cancha Caupolicán",
        neighborhood: "Población Galvarino",
        titlesComunalesHonor: 3,
        colors: "Blanco y Granate",
        series: ["honor", "senior_35", "juvenil"],
        regionalRecord: "Club de fuerte vocación social y destacada participación en series de fútbol infantil."
      }
    ],

    players: [
      {
        id: "p-canete-1",
        name: "Mauricio Linco Huenchullán",
        clubId: "club-canete-alianza",
        series: "honor",
        number: 10,
        position: "Volante Ofensivo",
        rut: "17.654.321-2",
        age: 27,
        goals: 6,
        assists: 5,
        yellowCards: 2,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 630,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-canete-2",
        name: "Rodrigo Millanao Sáez",
        clubId: "club-canete-juvenil",
        series: "honor",
        number: 9,
        position: "Delantero Centro",
        rut: "18.321.456-7",
        age: 25,
        goals: 5,
        assists: 2,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 580,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-canete-3",
        name: "Javier Huenchullán Alvear",
        clubId: "club-canete-caupolican",
        series: "honor",
        number: 8,
        position: "Volante de Contención",
        rut: "16.987.654-1",
        age: 30,
        goals: 2,
        assists: 3,
        yellowCards: 4,
        redCards: 1,
        matchesPlayed: 6,
        minutesPlayed: 520,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-canete-4",
        name: "Esteban Leviqueo Cona",
        clubId: "club-canete-tucapel",
        series: "honor",
        number: 7,
        position: "Extremo Izquierdo",
        rut: "19.112.233-4",
        age: 23,
        goals: 4,
        assists: 4,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 600,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      }
    ],

    matches: [
      {
        id: "match-canete-01",
        series: "honor",
        round: "Fecha 7 • Torneo Oficial ANFA Cañete",
        homeClubId: "club-canete-alianza",
        awayClubId: "club-canete-juvenil",
        venue: "Estadio Fiscal de Cañete",
        date: "Hoy • 16:30 hrs",
        status: "en_vivo",
        currentMinute: 55,
        half: 2,
        homeScore: 1,
        awayScore: 0,
        referee: "Javier Bastías (Árbitros ANFA)",
        events: [
          { type: "gol", minute: 41, playerName: "Mauricio Linco", teamId: "club-canete-alianza", description: "Definición mano a mano tras tiro libre rápido" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: false, refereeConfirmed: false }
      },
      {
        id: "match-canete-02",
        series: "honor",
        round: "Fecha 7 • Oficial",
        homeClubId: "club-canete-caupolican",
        awayClubId: "club-canete-tucapel",
        venue: "Cancha Caupolicán",
        date: "Hoy • 14:30 hrs",
        status: "finalizado",
        currentMinute: 90,
        half: 2,
        homeScore: 3,
        awayScore: 2,
        referee: "Patricio Alarcón",
        events: [
          { type: "gol", minute: 15, playerName: "Javier Huenchullán", teamId: "club-canete-caupolican", description: "Tiro libre potente" },
          { type: "gol", minute: 34, playerName: "Esteban Leviqueo", teamId: "club-canete-tucapel", description: "Remate cruzado" },
          { type: "gol", minute: 68, playerName: "Javier Huenchullán", teamId: "club-canete-caupolican", description: "Cabezazo al ángulo" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: true }
      },
      {
        id: "match-canete-03",
        series: "honor",
        round: "Fecha 8 • Oficial",
        homeClubId: "club-canete-lagranja",
        awayClubId: "club-canete-lautaro",
        venue: "Estadio Fiscal de Cañete",
        date: "Domingo • 15:30 hrs",
        status: "programado",
        currentMinute: 0,
        half: 1,
        homeScore: 0,
        awayScore: 0,
        referee: "Por designar",
        events: [],
        signatures: { homeCaptainConfirmed: false, awayCaptainConfirmed: false, refereeConfirmed: false }
      }
    ],

    standings: {
      honor: [
        { pos: 1, clubId: "club-canete-alianza", clubName: "C.D. Alianza de Cañete", pj: 7, pg: 6, pe: 1, pp: 0, gf: 18, gc: 5, dg: 13, pts: 19 },
        { pos: 2, clubId: "club-canete-caupolican", clubName: "C.D. Caupolicán de Cañete", pj: 7, pg: 5, pe: 0, pp: 2, gf: 15, gc: 9, dg: 6, pts: 15 },
        { pos: 3, clubId: "club-canete-juvenil", clubName: "C.D. Juvenil Cañete", pj: 7, pg: 4, pe: 1, pp: 2, gf: 13, gc: 8, dg: 5, pts: 13 },
        { pos: 4, clubId: "club-canete-tucapel", clubName: "C.D. Tucapel Cañete", pj: 7, pg: 3, pe: 2, pp: 2, gf: 12, gc: 11, dg: 1, pts: 11 },
        { pos: 5, clubId: "club-canete-lautaro", clubName: "C.D. Lautaro de Cañete", pj: 7, pg: 3, pe: 1, pp: 3, gf: 10, gc: 11, dg: -1, pts: 10 },
        { pos: 6, clubId: "club-canete-lagranja", clubName: "C.D. La Granja", pj: 7, pg: 2, pe: 1, pp: 4, gf: 8, gc: 14, dg: -6, pts: 7 },
        { pos: 7, clubId: "club-canete-ferro", clubName: "C.D. Ferroviario Cañete", pj: 7, pg: 1, pe: 1, pp: 5, gf: 7, gc: 15, dg: -8, pts: 4 },
        { pos: 8, clubId: "club-canete-galvarino", clubName: "C.D. Galvarino", pj: 7, pg: 0, pe: 1, pp: 6, gf: 5, gc: 15, dg: -10, pts: 1 }
      ],
      senior_35: [
        { pos: 1, clubId: "club-canete-alianza", clubName: "C.D. Alianza de Cañete", pj: 6, pg: 5, pe: 1, pp: 0, gf: 14, gc: 4, dg: 10, pts: 16 },
        { pos: 2, clubId: "club-canete-juvenil", clubName: "C.D. Juvenil Cañete", pj: 6, pg: 4, pe: 1, pp: 1, gf: 11, gc: 6, dg: 5, pts: 13 },
        { pos: 3, clubId: "club-canete-tucapel", clubName: "C.D. Tucapel Cañete", pj: 6, pg: 3, pe: 1, pp: 2, gf: 10, gc: 8, dg: 2, pts: 10 },
        { pos: 4, clubId: "club-canete-caupolican", clubName: "C.D. Caupolicán de Cañete", pj: 6, pg: 3, pe: 0, pp: 3, gf: 8, gc: 9, dg: -1, pts: 9 },
        { pos: 5, clubId: "club-canete-lautaro", clubName: "C.D. Lautaro de Cañete", pj: 6, pg: 2, pe: 1, pp: 3, gf: 7, gc: 10, dg: -3, pts: 7 },
        { pos: 6, clubId: "club-canete-lagranja", clubName: "C.D. La Granja", pj: 6, pg: 1, pe: 2, pp: 3, gf: 6, gc: 9, dg: -3, pts: 5 },
        { pos: 7, clubId: "club-canete-ferro", clubName: "C.D. Ferroviario Cañete", pj: 6, pg: 1, pe: 1, pp: 4, gf: 5, gc: 11, dg: -6, pts: 4 },
        { pos: 8, clubId: "club-canete-galvarino", clubName: "C.D. Galvarino", pj: 6, pg: 0, pe: 1, pp: 5, gf: 3, gc: 12, dg: -9, pts: 1 }
      ]
    },

    news: [
      {
        id: "news-canete-01",
        title: "Alianza de Cañete sostiene liderato invicto tras ajustada victoria ante Juvenil",
        category: "Torneo Oficial",
        categoryBadge: "🏆 PUNTERO INVICTO",
        date: "02 de Octubre, 2026",
        readTime: "3 min de lectura",
        author: "Prensa Cañete Deportes",
        hero: true,
        image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80",
        excerpt: "Con solitaria anotación de tiro libre, Alianza superó a su escolta en el sintético del Estadio Fiscal.",
        content: "El cuadro azul y blanco suma 19 unidades en siete fechas disputadas, consolidándose como el principal candidato al boleto comunal para la Copa de Campeones ANFA Biobío 2027.",
        tags: ["ANFA Cañete", "Alianza", "Serie de Honor"]
      }
    ],

    mediaGallery: { photos: [], videos: [] }
  },

  cordillera: {
    leagueInfo: {
      name: "Liga Cordillera Santiago",
      shortName: "Liga Cordillera",
      leagueId: "cordillera",
      badgeId: "asociacion-cordillera",
      foundationDate: "18 de marzo de 1994 (32 años)",
      anniversary: "Fundada el 18 de marzo de 1994. Tradicional torneo amateur del sector oriente de la Región Metropolitana.",
      president: "Gonzalo Valdés Rivas",
      mediaPartner: "Cordillera TV Streaming & Digital",
      commune: "Santiago Oriente (Las Condes / Lo Barnechea)",
      region: "Región Metropolitana",
      headquarters: "Avenida Las Condes 12400, Santiago",
      season: "Torneo Apertura 2026",
      activeSeries: "honor",
      totalClubs: 8,
      isDemo: true,
      demoNotice: "Entorno de demostración para ligas metropolitanas en LigaMaster",
      governingBodies: {
        regional: "Comité de Ligas Independientes de Santiago",
        national: "Fútbol Amateur Federado RM",
        referees: "Asociación Central de Árbitros de Santiago",
        broadcast: "Cordillera TV Streaming"
      },
      activeMatchId: "match-cord-01"
    },

    venues: [
      {
        id: "complejo-cordillera",
        name: "Complejo Deportivo Cordillera",
        shortName: "Complejo Cordillera",
        commune: "Santiago Oriente",
        surface: "Pasto Sintético Pro 60mm",
        surfaceType: "sintetico",
        lighting: "Iluminación Artificial LED",
        capacity: "1.500 espectadores",
        address: "Av. Las Condes 12400, Santiago",
        status: "habilitada",
        statusLabel: "🟢 Habilitada (Cancha Pro)",
        usageNotes: "Centro neurálgico del torneo con canchas reglamentarias y tecnología de filmación automática.",
        photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético Pro", "Iluminación LED", "Estacionamiento Privado", "Cámaras Automáticas"]
      },
      {
        id: "estadio-san-carlos-oriente",
        name: "Estadio San Carlos Oriente",
        shortName: "San Carlos Oriente",
        commune: "Santiago Oriente",
        surface: "Pasto Sintético",
        surfaceType: "sintetico",
        lighting: "Torres Perimetrales",
        capacity: "1.000 espectadores",
        address: "Sector San Carlos, Las Condes",
        status: "habilitada",
        statusLabel: "🟢 Habilitada",
        usageNotes: "Recinto alternativo para duelos simultáneos de fin de semana.",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        features: ["Pasto Sintético", "Camarines VIP"]
      }
    ],

    regulations: {
      code: "REGLAMENTO-CORDILLERA-2026",
      disciplinaryCode: "Código de Procedimientos Liga Cordillera",
      substitutionRule: "Sustituciones libres en tres pausas de juego.",
      cardRules: { yellowAccumulation: 4, yellowWarning: 3, doubleYellow: 1, directRed: "2 fechas" },
      cupQualification: { regional: "Torneo Metropolitano de Campeones" }
    },

    seriesList: [
      { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
      { id: "senior_35", name: "Serie Senior (35+ Años)", shortName: "Senior 35", ageLimit: "35 años cumplidos", halfDuration: 40, active: false }
    ],

    clubs: [
      {
        id: "club-cord-central",
        name: "C.D. Cordillera Central",
        shortName: "Cordillera Central",
        badgeId: "club-cord-central",
        founded: "18 de marzo de 1994",
        exactFoundationDate: "18 de marzo de 1994",
        stadium: "Complejo Deportivo Cordillera",
        neighborhood: "Las Condes",
        titlesComunalesHonor: 7,
        colors: "Azul Francia y Blanco",
        series: ["honor", "senior_35"],
        regionalRecord: "Club fundador de la liga y heptacampeón metropolitano con juego de posesión y velocidad."
      },
      {
        id: "club-cord-andes",
        name: "C.D. Andes Santiago",
        shortName: "Andes Santiago",
        badgeId: "club-cord-andes",
        founded: "12 de noviembre de 1998",
        exactFoundationDate: "12 de noviembre de 1998",
        stadium: "Complejo Deportivo Cordillera",
        neighborhood: "Lo Barnechea",
        titlesComunalesHonor: 5,
        colors: "Celeste Glaciar y Blanco",
        series: ["honor", "senior_35"],
        regionalRecord: "Institución de gran despliegue en torneos de invierno con cinco títulos de apertura."
      },
      {
        id: "club-cord-oriente",
        name: "C.D. Real Oriente",
        shortName: "Real Oriente",
        badgeId: "club-cord-oriente",
        founded: "24 de mayo de 2002",
        exactFoundationDate: "24 de mayo de 2002",
        stadium: "Estadio San Carlos Oriente",
        neighborhood: "San Carlos",
        titlesComunalesHonor: 4,
        colors: "Granate y Oro",
        series: ["honor", "senior_35"],
        regionalRecord: "Cuatro veces campeón de honor con un plantel estructurado por experimentados ex universitarios."
      },
      {
        id: "club-cord-manquehue",
        name: "C.D. Manquehue Sur",
        shortName: "Manquehue Sur",
        badgeId: "club-cord-manquehue",
        founded: "30 de julio de 1996",
        exactFoundationDate: "30 de julio de 1996",
        stadium: "Complejo Deportivo Cordillera",
        neighborhood: "Cerro Manquehue",
        titlesComunalesHonor: 4,
        colors: "Verde y Azul",
        series: ["honor", "senior_35"],
        regionalRecord: "Elenco reconocido por su sólida línea defensiva y constante presencia en semifinales."
      },
      {
        id: "club-cord-cristobal",
        name: "C.D. San Cristóbal Amateur",
        shortName: "San Cristóbal",
        badgeId: "club-cord-cristobal",
        founded: "15 de enero de 2005",
        exactFoundationDate: "15 de enero de 2005",
        stadium: "Estadio San Carlos Oriente",
        neighborhood: "Providencia / Las Condes",
        titlesComunalesHonor: 3,
        colors: "Naranjo y Negro",
        series: ["honor", "senior_35"],
        regionalRecord: "Institución dinámica con gran afición juvenil y tres trofeos en sus vitrinas."
      },
      {
        id: "club-cord-condes",
        name: "C.D. Las Condes Amateur",
        shortName: "Las Condes",
        badgeId: "club-cord-condes",
        founded: "10 de abril de 2001",
        exactFoundationDate: "10 de abril de 2001",
        stadium: "Complejo Deportivo Cordillera",
        neighborhood: "Colón Oriente",
        titlesComunalesHonor: 4,
        colors: "Azul Marino y Rojo",
        series: ["honor", "senior_35"],
        regionalRecord: "Tradicional animador comunal con destacada participación en series Senior 35."
      },
      {
        id: "club-cord-dehesa",
        name: "C.D. La Dehesa F.C.",
        shortName: "La Dehesa F.C.",
        badgeId: "club-cord-dehesa",
        founded: "8 de septiembre de 2010",
        exactFoundationDate: "8 de septiembre de 2010",
        stadium: "Estadio San Carlos Oriente",
        neighborhood: "La Dehesa",
        titlesComunalesHonor: 2,
        colors: "Blanco y Dorado",
        series: ["honor", "senior_35"],
        regionalRecord: "Equipo de rápida evolución competitiva con 2 coronas de torneo corto."
      },
      {
        id: "club-cord-sanramon",
        name: "C.D. Quebrada San Ramón",
        shortName: "Quebrada San Ramón",
        badgeId: "club-cord-sanramon",
        founded: "14 de junio de 2008",
        exactFoundationDate: "14 de junio de 2008",
        stadium: "Complejo Deportivo Cordillera",
        neighborhood: "Precordillera",
        titlesComunalesHonor: 2,
        colors: "Verde Oliva y Negro",
        series: ["honor", "senior_35"],
        regionalRecord: "Fuerte localía precordillerana y elenco muy combativo en balones detenidos."
      }
    ],

    players: [
      {
        id: "p-cord-1",
        name: "Sebastián Larraín Mackenna",
        clubId: "club-cord-central",
        series: "honor",
        number: 10,
        position: "Mediocampista Ofensivo",
        rut: "18.109.876-3",
        age: 27,
        goals: 7,
        assists: 6,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 630,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-cord-2",
        name: "Nicolás Echeverría Cruz",
        clubId: "club-cord-andes",
        series: "honor",
        number: 9,
        position: "Goleador Central",
        rut: "17.890.123-5",
        age: 29,
        goals: 6,
        assists: 2,
        yellowCards: 2,
        redCards: 0,
        matchesPlayed: 7,
        minutesPlayed: 610,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "p-cord-3",
        name: "Tomás Mackenna Valdés",
        clubId: "club-cord-oriente",
        series: "honor",
        number: 11,
        position: "Extremo Derecho",
        rut: "19.001.234-8",
        age: 24,
        goals: 5,
        assists: 4,
        yellowCards: 1,
        redCards: 0,
        matchesPlayed: 6,
        minutesPlayed: 540,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      }
    ],

    matches: [
      {
        id: "match-cord-01",
        series: "honor",
        round: "Fecha 7 • Clásico Cordillera",
        homeClubId: "club-cord-central",
        awayClubId: "club-cord-andes",
        venue: "Complejo Deportivo Cordillera",
        date: "Hoy • 17:00 hrs",
        status: "en_vivo",
        currentMinute: 65,
        half: 2,
        homeScore: 2,
        awayScore: 2,
        referee: "Pablo Henríquez (Asoc. Árbitros Santiago)",
        events: [
          { type: "gol", minute: 14, playerName: "Sebastián Larraín", teamId: "club-cord-central", description: "Volea desde 25 metros" },
          { type: "gol", minute: 31, playerName: "Nicolás Echeverría", teamId: "club-cord-andes", description: "Anticipo de cabeza" },
          { type: "gol", minute: 48, playerName: "Nicolás Echeverría", teamId: "club-cord-andes", description: "Tiro penal cruzado" },
          { type: "gol", minute: 62, playerName: "Sebastián Larraín", teamId: "club-cord-central", description: "Tiro libre al ángulo" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
      },
      {
        id: "match-cord-02",
        series: "honor",
        round: "Fecha 7 • Apertura",
        homeClubId: "club-cord-oriente",
        awayClubId: "club-cord-manquehue",
        venue: "Estadio San Carlos Oriente",
        date: "Hoy • 15:00 hrs",
        status: "finalizado",
        currentMinute: 90,
        half: 2,
        homeScore: 1,
        awayScore: 0,
        referee: "Ignacio Soto",
        events: [
          { type: "gol", minute: 73, playerName: "Tomás Mackenna", teamId: "club-cord-oriente", description: "Zurdazo rasante" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: true }
      }
    ],

    standings: {
      honor: [
        { pos: 1, clubId: "club-cord-central", clubName: "C.D. Cordillera Central", pj: 7, pg: 5, pe: 2, pp: 0, gf: 17, gc: 7, dg: 10, pts: 17 },
        { pos: 2, clubId: "club-cord-andes", clubName: "C.D. Andes Santiago", pj: 7, pg: 4, pe: 2, pp: 1, gf: 15, gc: 9, dg: 6, pts: 14 },
        { pos: 3, clubId: "club-cord-oriente", clubName: "C.D. Real Oriente", pj: 7, pg: 4, pe: 1, pp: 2, gf: 12, gc: 8, dg: 4, pts: 13 },
        { pos: 4, clubId: "club-cord-manquehue", clubName: "C.D. Manquehue Sur", pj: 7, pg: 3, pe: 2, pp: 2, gf: 11, gc: 10, dg: 1, pts: 11 },
        { pos: 5, clubId: "club-cord-condes", clubName: "C.D. Las Condes Amateur", pj: 7, pg: 3, pe: 1, pp: 3, gf: 10, gc: 11, dg: -1, pts: 10 },
        { pos: 6, clubId: "club-cord-cristobal", clubName: "C.D. San Cristóbal Amateur", pj: 7, pg: 2, pe: 1, pp: 4, gf: 9, gc: 13, dg: -4, pts: 7 },
        { pos: 7, clubId: "club-cord-dehesa", clubName: "C.D. La Dehesa F.C.", pj: 7, pg: 1, pe: 1, pp: 5, gf: 7, gc: 15, dg: -8, pts: 4 },
        { pos: 8, clubId: "club-cord-sanramon", clubName: "C.D. Quebrada San Ramón", pj: 7, pg: 1, pe: 0, pp: 6, gf: 6, gc: 14, dg: -8, pts: 3 }
      ],
      senior_35: [
        { pos: 1, clubId: "club-cord-central", clubName: "C.D. Cordillera Central", pj: 6, pg: 5, pe: 1, pp: 0, gf: 13, gc: 4, dg: 9, pts: 16 },
        { pos: 2, clubId: "club-cord-condes", clubName: "C.D. Las Condes Amateur", pj: 6, pg: 4, pe: 1, pp: 1, gf: 12, gc: 7, dg: 5, pts: 13 },
        { pos: 3, clubId: "club-cord-andes", clubName: "C.D. Andes Santiago", pj: 6, pg: 3, pe: 2, pp: 1, gf: 10, gc: 7, dg: 3, pts: 11 },
        { pos: 4, clubId: "club-cord-oriente", clubName: "C.D. Real Oriente", pj: 6, pg: 3, pe: 1, pp: 2, gf: 9, gc: 8, dg: 1, pts: 10 }
      ]
    },

    news: [
      {
        id: "news-cord-01",
        title: "Intenso empate en el clásico entre Cordillera Central y Andes Santiago",
        category: "Torneo Apertura",
        categoryBadge: "⚡ CLÁSICO METROPOLITANO",
        date: "02 de Octubre, 2026",
        readTime: "3 min de lectura",
        author: "Prensa Cordillera TV",
        hero: true,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
        excerpt: "Con dos goles de Larraín y un doblete de Echeverría, los punteros igualaron en el Complejo Cordillera.",
        content: "En un partido de ritmo vertiginoso, Central y Andes dividieron puntos ante más de 800 asistentes en las canchas de Las Condes.",
        tags: ["Liga Cordillera", "Clásico", "Apertura 2026"]
      }
    ],

    mediaGallery: { photos: [], videos: [] }
  }
};

/**
 * ==========================================================================
 * GESTIÓN DE PERSISTENCIA Y MODELO MULTI-LIGA
 * ==========================================================================
 */

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
  return safeStorageGet('LIGAMASTER_ACTIVE_LEAGUE_ID') || 'arauco';
}

export function setActiveLeagueId(leagueId) {
  safeStorageSet('LIGAMASTER_ACTIVE_LEAGUE_ID', leagueId);
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('ligamaster:league-changed', { detail: leagueId }));
  }
}

export function getLeagueById(leagueId) {
  for (const reg of REGIONS_AND_LEAGUES) {
    const found = reg.leagues.find(l => l.id === leagueId);
    if (found) return found;
  }
  return REGIONS_AND_LEAGUES[0].leagues[0];
}

export function getRegionsAndLeagues() {
  return REGIONS_AND_LEAGUES;
}

export function getLeagueSeries(leagueId = null) {
  const db = getDb(leagueId);
  return db.seriesList || MULTI_LEAGUE_STORE.arauco.seriesList;
}

/**
 * Retorna la base de datos de la liga activa o especificada
 */
export function getDb(leagueId = null) {
  const targetLeague = leagueId || getActiveLeagueId() || 'arauco';
  const storageKey = `LIGAMASTER_LEAGUE_${targetLeague.toUpperCase()}_V1`;

  try {
    const raw = safeStorageGet(storageKey);
    if (raw) {
      return JSON.parse(raw);
    }

    // Compatibilidad retroactiva para Arauco si existía la clave previa
    if (targetLeague === 'arauco') {
      const legacyRaw = safeStorageGet(STORAGE_KEY);
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        safeStorageSet(storageKey, JSON.stringify(parsed));
        return parsed;
      }
    }
  } catch (e) {
    console.error(`Error leyendo base de datos de ${targetLeague}`, e);
  }

  // Inicializar con la tienda multi-liga predefinida
  const source = MULTI_LEAGUE_STORE[targetLeague] || MULTI_LEAGUE_STORE.arauco;
  const cloned = JSON.parse(JSON.stringify(source));
  saveDb(cloned, targetLeague);
  return cloned;
}

/**
 * Guarda el estado de la base de datos de una liga
 */
export function saveDb(data, leagueId = null) {
  const targetLeague = leagueId || (data.leagueInfo && data.leagueInfo.leagueId) || getActiveLeagueId() || 'arauco';
  const storageKey = `LIGAMASTER_LEAGUE_${targetLeague.toUpperCase()}_V1`;

  try {
    safeStorageSet(storageKey, JSON.stringify(data));
    if (targetLeague === 'arauco') {
      safeStorageSet(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error(`Error guardando base de datos de ${targetLeague}`, e);
  }
}

/**
 * Restaura la base de datos de una liga a sus valores de fábrica
 */
export function resetDb(leagueId = null) {
  const targetLeague = leagueId || getActiveLeagueId() || 'arauco';
  const source = MULTI_LEAGUE_STORE[targetLeague] || MULTI_LEAGUE_STORE.arauco;
  const cloned = JSON.parse(JSON.stringify(source));
  saveDb(cloned, targetLeague);
  return cloned;
}

// Catálogo retrocompatible de asociaciones
export const AVAILABLE_ASSOCIATIONS = REGIONS_AND_LEAGUES.flatMap(r => r.leagues.map(l => ({
  id: l.id,
  name: l.name,
  shortName: l.shortName,
  region: r.regionName,
  commune: l.commune,
  headquarters: l.commune,
  badgeEmoji: "⚽",
  accentColor: "#e51b24",
  stadium: "Estadio Oficial",
  clubsCount: l.totalClubs,
  tagline: l.statusLabel
})));

export function getActiveAssociation() {
  const activeId = getActiveLeagueId();
  return AVAILABLE_ASSOCIATIONS.find(a => a.id === activeId) || AVAILABLE_ASSOCIATIONS[0];
}

export function switchAssociation(targetId) {
  setActiveLeagueId(targetId);
}

/**
 * Exporta toda la base de datos de la liga activa a un archivo JSON para respaldo
 */
export function exportDbAsJson(leagueId = null) {
  const db = getDb(leagueId);
  const jsonStr = JSON.stringify(db, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const assoc = db.leagueInfo?.shortName?.replace(/\s+/g, '_') || 'LigaMaster';
  a.download = `${assoc}_Respaldo_Oficial_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Importa y restaura una base de datos desde un archivo JSON
 */
export function importDbFromJson(jsonString, leagueId = null) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.leagueInfo && parsed.clubs) {
      saveDb(parsed, leagueId);
      return { success: true, message: "Base de datos de la Liga restaurada con éxito." };
    }
    return { success: false, message: "El archivo no posee una estructura válida de LigaMaster." };
  } catch (err) {
    return { success: false, message: "Error al procesar el archivo JSON: " + err.message };
  }
}

/**
 * Recintos y canchas oficiales
 */
export function getVenues(leagueId = null) {
  const db = getDb(leagueId);
  return db.venues || [];
}

export function updateVenueStatus(venueId, status, statusLabel, leagueId = null) {
  const db = getDb(leagueId);
  if (!db.venues) db.venues = [];
  const v = db.venues.find(item => item.id === venueId);
  if (v) {
    v.status = status;
    v.statusLabel = statusLabel;
    saveDb(db, leagueId);
    return { success: true, venue: v };
  }
  return { success: false, message: "Cancha no encontrada" };
}

/**
 * Partido activo
 */
export function getActiveMatch(leagueId = null) {
  const db = getDb(leagueId);
  const matchId = db.leagueInfo?.activeMatchId;
  return (db.matches || []).find(m => m.id === matchId) || (db.matches && db.matches[0]);
}

export function setActiveMatch(matchId, leagueId = null) {
  const db = getDb(leagueId);
  const exists = (db.matches || []).find(m => m.id === matchId);
  if (!exists) return false;
  
  db.leagueInfo.activeMatchId = matchId;
  saveDb(db, leagueId);

  window.dispatchEvent(new CustomEvent('ligapro:match-changed', {
    detail: { matchId, match: exists }
  }));
  return true;
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
  return db.selectionInfo || MULTI_LEAGUE_STORE.arauco.selectionInfo;
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
  return db.mediaGallery || { photos: [], videos: [] };
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
