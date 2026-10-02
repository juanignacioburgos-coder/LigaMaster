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

export const STORAGE_KEY = 'ANFA_ARAUCO_DB_V13';

export const INITIAL_DATA = {
  leagueInfo: {
    name: "Asociación de Fútbol Amateur de Arauco",
    shortName: "ANFA Arauco",
    commune: "Arauco, Región del Biobío, Chile",
    headquarters: "Julio Montt Nº 386, Población 10 de Julio, Arauco",
    season: "Campeonato Oficial 2026",
    activeSeries: "honor",
    totalClubs: 10,
    governingBodies: {
      regional: "ANFA Región del Biobío",
      national: "Asociación Nacional de Fútbol Amateur (ANFA Chile)",
      referees: "Colegio de Árbitros de la Provincia de Arauco (CAPA)"
    },
    activeMatchId: "match-arauco-01"
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
      regionalRecord: "Club Deportivo Pelantaro Atlético, institución decana fundada el 20 de agosto de 1929 (presidida por Eliseo Osvaldo Carril Flores). Histórica presencia en Copa de Campeones Senior 35 y Súper Senior 45 ANFA Biobío, con escuelas formativas juveniles activas.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil"],
      statusLegal: "Personalidad Jurídica vigente Nº 189 - Registro Nacional Deportivo IND"
    },
    {
      id: "club-arturo-prat",
      name: "Club Deportivo Arturo Prat",
      shortName: "Arturo Prat",
      foundation: "1952",
      exactFoundationDate: "21 de mayo de 1952",
      neighborhood: "Calle California N° 205, Sector California, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#1e3a8a", secondary: "#ffffff" },
      badgeEmoji: "⚓",
      titlesComunalesHonor: 5,
      regionalRecord: "Sede social en Calle California N° 205. Campeón Comunal de Serie de Honor y Segunda Adulta. Semifinalista de zona en Copa de Campeones Senior 35 ANFA Biobío y activo trabajo en series formativas.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 304 - Municipalidad de Arauco"
    },
    {
      id: "club-jorge-robledo",
      name: "Club Deportivo Jorge Robledo",
      shortName: "Jorge Robledo",
      foundation: "1954",
      exactFoundationDate: "14 de junio de 1954",
      neighborhood: "Sector Plazoleta Fresia / Barrio Estación, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#2563eb", secondary: "#ffffff" },
      badgeEmoji: "⭐",
      titlesComunalesHonor: 8,
      regionalRecord: "Bautizado en honor al astro chileno-británico George Robledo Oliver (campeón FA Cup 1952 con Newcastle United). Campeón de Primera Adulta de la Asociación de Fútbol de Arauco en reiteradas temporadas y participante habitual de la Copa de Campeones Regional ANFA Biobío.",
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
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#15803d", secondary: "#facc15" },
      badgeEmoji: "🏹",
      titlesComunalesHonor: 5,
      regionalRecord: "Fundado el 3 de agosto de 1965 (RUT 73.406.300-2). Más de seis décadas de vida institucional plasmadas en el documental 'Un Solo Corazón'. Campeón Comunal de Honor (2011) y destacado semillero de series juveniles que nutren a la selección comunal de Arauco.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente RUT 73.406.300-2"
    },
    {
      id: "club-colo-colo",
      name: "Club Deportivo Colo Colo",
      shortName: "Colo Colo (Arauco)",
      foundation: "1961",
      exactFoundationDate: "19 de abril de 1961",
      neighborhood: "Población 10 de Julio, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#0f172a", secondary: "#ffffff" },
      badgeEmoji: "🦅",
      titlesComunalesHonor: 5,
      regionalRecord: "Vecino a la sede de la Asociación. Campeón Comunal Oficial de Serie de Honor en los torneos 2008, 2011 y 2014. Participante en torneos provinciales de la Asociación Arauco y clasificatorias zonales de la Copa de Campeones ANFA Biobío.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45"],
      statusLegal: "Personalidad Jurídica vigente Nº 481"
    },
    {
      id: "club-brisas-del-mar",
      name: "Club Deportivo Brisas del Mar",
      shortName: "Brisas del Mar",
      foundation: "1965",
      exactFoundationDate: "18 de septiembre de 1965",
      neighborhood: "Caleta de Tubul, Comuna de Arauco",
      stadium: "Cancha Comunitaria de Tubul / Estadio Municipal de Arauco",
      colors: { primary: "#059669", secondary: "#ffffff" },
      badgeEmoji: "🌊",
      titlesComunalesHonor: 6,
      regionalRecord: "Orgullo deportivo de la caleta pesquera de Tubul. En la edición 2026 de la Copa de Campeones ANFA Región del Biobío alcanzó la Gran Final del Grupo 2 Zona Arauco frente a UD Maitenes de Carampangue (tras superar a Bernardo O'Higgins de Lebu). Campeón Comunal Serie de Honor 2023.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 720 - ANFA Biobío"
    },
    {
      id: "club-celulosa-arauco",
      name: "Club Deportivo Celulosa Arauco",
      shortName: "Celulosa Arauco",
      foundation: "1972",
      exactFoundationDate: "26 de agosto de 1972",
      neighborhood: "Villa Los Lingues / Sector Complejo Industrial, Arauco",
      stadium: "Estadio Ramón Burgos, Arauco",
      colors: { primary: "#dc2626", secondary: "#facc15" },
      badgeEmoji: "🌲",
      titlesComunalesHonor: 7,
      regionalRecord: "Fundado el 26 de agosto de 1972 al alero de los trabajadores del complejo forestal e industrial de Arauco. Localía propia en el Estadio Ramón Burgos. Múltiples coronas comunales en Honor, Senior y Juvenil, y competidor de la Copa de Campeones ANFA Biobío.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45", "Juvenil", "Infantil"],
      statusLegal: "Personalidad Jurídica vigente Nº 840"
    },
    {
      id: "club-gente-de-mar",
      name: "Club Deportivo Gente de Mar",
      shortName: "Gente de Mar",
      foundation: "1976",
      exactFoundationDate: "08 de octubre de 1976",
      neighborhood: "Sede Social Calle O'Higgins S/N, Arauco",
      stadium: "Estadio Municipal de Arauco",
      colors: { primary: "#0284c7", secondary: "#ffffff" },
      badgeEmoji: "⛵",
      titlesComunalesHonor: 3,
      regionalRecord: "Sede social en Calle O'Higgins S/N. Institución arraigada en las familias de la pesca artesanal y faenas del mar de Arauco. Competidor regular en Serie de Honor, Senior, Súper Senior y categorías formativas en el campeonato comunal de ANFA Arauco.",
      seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Súper Senior 45"],
      statusLegal: "Personalidad Jurídica vigente Nº 932"
    },
    {
      id: "club-real-jose-maria",
      name: "Club Deportivo Real José María FC",
      shortName: "Real José María",
      foundation: "2026",
      exactFoundationDate: "30 de enero de 2026",
      neighborhood: "Comuna de Arauco",
      stadium: "Estadio Sebastián Gaete / Estadio Ramón Burgos",
      colors: { primary: "#dc2626", secondary: "#1e3a8a", trim: "#ffffff" },
      badgeEmoji: "👑",
      titlesComunalesHonor: 0,
      contactEmail: "realjosemariafc@gmail.com",
      motto: "Un club con VALORES 🤝⚽ ~Real José María FC~ ❤️💙",
      sponsor: "JUGA BET",
      regionalRecord: "Fundado el 30 de enero de 2026 en la comuna de Arauco. Es el 10° club oficial aceptado en la prestigiosa Asociación de Fútbol Amateur de Arauco y la institución deportiva más joven de los más de 450 clubes de la Región del Biobío. Compite activamente en 2da Infantil, Senior, 1era Adulta, Honor y Super Senior.",
      seriesParticipantes: ["2da Infantil", "Senior", "1era Adulta", "Honor", "Super Senior"],
      statusLegal: "Inscripción Oficial Asociación de Fútbol Amateur de Arauco / ANFA Biobío (2026)"
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

export function getDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error leyendo base de datos", e);
  }
  saveDb(INITIAL_DATA);
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

export function saveDb(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error escribiendo en localStorage", e);
  }
}

export function resetDb() {
  saveDb(INITIAL_DATA);
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

/**
 * Catálogo Oficial de Asociaciones ANFA Disponibles
 * Permite presentar LigaPro a cualquier mesa directiva comunal o regional de Chile
 */
export const AVAILABLE_ASSOCIATIONS = [
  {
    id: "arauco",
    name: "Asociación de Fútbol Amateur de Arauco",
    shortName: "ANFA Arauco",
    region: "Región del Biobío",
    commune: "Arauco (Costa Histórica)",
    headquarters: "Julio Montt Nº 386, Arauco",
    badgeEmoji: "⚓",
    accentColor: "#00e676",
    stadium: "Estadio Municipal de Arauco",
    clubsCount: 10,
    tagline: "10 Clubes Federados • Temporada Oficial 2026"
  },
  {
    id: "lebu",
    name: "Asociación de Fútbol de Lebu",
    shortName: "ANFA Lebu",
    region: "Región del Biobío",
    commune: "Lebu (Capital Provincial de Arauco)",
    headquarters: "Sector Boca Lebu / Plaza de Armas",
    badgeEmoji: "🌊",
    accentColor: "#00f2fe",
    stadium: "Estadio Municipal de Lebu",
    clubsCount: 6,
    tagline: "Decana Provincial • 6 Clubes en Competencia"
  },
  {
    id: "canete",
    name: "Asociación de Fútbol de Cañete",
    shortName: "ANFA Cañete",
    region: "Región del Biobío",
    commune: "Cañete (Tierra Histórica)",
    headquarters: "Avenida Saavedra / Plaza Caupolicán",
    badgeEmoji: "🌲",
    accentColor: "#ffb703",
    stadium: "Estadio Fiscal de Cañete",
    clubsCount: 6,
    tagline: "Tradición y Patrimonio • 6 Clubes Federados"
  },
  {
    id: "curanilahue",
    name: "Asociación de Fútbol de Curanilahue",
    shortName: "ANFA Curanilahue",
    region: "Región del Biobío",
    commune: "Curanilahue (Zona Carbonífera)",
    headquarters: "Avenida Arturo Prat, Curanilahue",
    badgeEmoji: "⛏️",
    accentColor: "#f43f5e",
    stadium: "Estadio Municipal Raúl Erazo",
    clubsCount: 4,
    tagline: "Fuerza Minera • 4 Clubes Históricos"
  },
  {
    id: "concepcion",
    name: "Asociación de Fútbol de Concepción",
    shortName: "ANFA Concepción",
    region: "Región del Biobío",
    commune: "Concepción (Capital Regional)",
    headquarters: "Sector Collao, Concepción",
    badgeEmoji: "🦁",
    accentColor: "#8b5cf6",
    stadium: "Campos Deportivos Bellavista / Nonguén",
    clubsCount: 4,
    tagline: "Fútbol Metropolitano • Decanos Regionales"
  }
];

export function getActiveAssociation() {
  const db = getDb();
  const currentId = db.leagueInfo?.associationId || 'arauco';
  return AVAILABLE_ASSOCIATIONS.find(a => a.id === currentId) || AVAILABLE_ASSOCIATIONS[0];
}

export function switchAssociation(targetId) {
  const target = AVAILABLE_ASSOCIATIONS.find(a => a.id === targetId);
  if (!target) return;

  if (targetId === 'arauco') {
    saveDb(INITIAL_DATA);
    window.dispatchEvent(new CustomEvent('ligapro:association-changed', { detail: target }));
    return;
  }

  // Generar datos contextualizados para la asociación elegida
  const newDb = JSON.parse(JSON.stringify(INITIAL_DATA));
  newDb.leagueInfo.associationId = target.id;
  newDb.leagueInfo.name = target.name;
  newDb.leagueInfo.shortName = target.shortName;
  newDb.leagueInfo.commune = target.commune;
  newDb.leagueInfo.headquarters = target.headquarters;
  newDb.leagueInfo.badgeEmoji = target.badgeEmoji;
  newDb.leagueInfo.accentColor = target.accentColor;
  newDb.leagueInfo.totalClubs = target.clubsCount;

  if (targetId === 'lebu') {
    newDb.clubs = [
      { id: "lebu-penarol", name: "C.D. Peñarol de Lebu", shortName: "Peñarol", badgeEmoji: "🟡", founded: "1947", stadium: "Estadio Municipal de Lebu", titles: 9, colors: "Amarillo y Negro", series: ["honor", "senior_35", "juvenil"] },
      { id: "lebu-victoria", name: "C.D. Victoria", shortName: "Victoria", badgeEmoji: "🔴", founded: "1938", stadium: "Estadio Municipal de Lebu", titles: 8, colors: "Rojo y Blanco", series: ["honor", "senior_35", "juvenil"] },
      { id: "lebu-esmeralda", name: "C.D. Esmeralda", shortName: "Esmeralda", badgeEmoji: "🟢", founded: "1952", stadium: "Estadio Municipal de Lebu", titles: 6, colors: "Verde Esperanza", series: ["honor", "senior_35", "juvenil"] },
      { id: "lebu-colocolo", name: "C.D. Colo-Colo Lebu", shortName: "Colo-Colo", badgeEmoji: "⚪", founded: "1960", stadium: "Estadio Municipal de Lebu", titles: 5, colors: "Blanco y Negro", series: ["honor", "senior_35", "juvenil"] },
      { id: "lebu-playa", name: "C.D. Playa Grande", shortName: "Playa Grande", badgeEmoji: "🌊", founded: "1974", stadium: "Estadio Municipal de Lebu", titles: 4, colors: "Azul Marino", series: ["honor", "senior_35", "juvenil"] },
      { id: "lebu-leones", name: "C.D. Los Leones de Lebu", shortName: "Los Leones", badgeEmoji: "🦁", founded: "1982", stadium: "Estadio Municipal de Lebu", titles: 3, colors: "Naranjo y Negro", series: ["honor", "senior_35", "juvenil"] }
    ];
    newDb.matches = [
      {
        id: "match-lebu-01",
        series: "honor",
        round: "Fecha 6 • Clásico del Puerto de Lebu",
        homeClubId: "lebu-penarol",
        awayClubId: "lebu-victoria",
        venue: "Estadio Municipal de Lebu",
        date: "Domingo • 16:00 hrs",
        status: "en_vivo",
        currentMinute: 38,
        half: 1,
        homeScore: 2,
        awayScore: 1,
        referee: "Marcos Retamal (CAPA Lebu)",
        events: [
          { type: "gol", minute: 12, playerName: "Álvaro Riquelme", teamId: "lebu-penarol", description: "Cabezazo al segundo palo" },
          { type: "gol", minute: 26, playerName: "Cristián Alarcón", teamId: "lebu-victoria", description: "Tiro libre directo" },
          { type: "gol", minute: 35, playerName: "Diego Neira", teamId: "lebu-penarol", description: "Remate cruzado" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
      }
    ];
    newDb.leagueInfo.activeMatchId = "match-lebu-01";
  } else if (targetId === 'canete') {
    newDb.clubs = [
      { id: "canete-alianza", name: "C.D. Alianza de Cañete", shortName: "Alianza", badgeEmoji: "🔵", founded: "1945", stadium: "Estadio Fiscal de Cañete", titles: 10, colors: "Azul y Blanco", series: ["honor", "senior_35", "juvenil"] },
      { id: "canete-juvenil", name: "C.D. Juvenil Cañete", shortName: "Juvenil", badgeEmoji: "⭐", founded: "1956", stadium: "Estadio Fiscal de Cañete", titles: 7, colors: "Verde y Blanco", series: ["honor", "senior_35", "juvenil"] },
      { id: "canete-caupolican", name: "C.D. Caupolicán de Cañete", shortName: "Caupolicán", badgeEmoji: "🏹", founded: "1963", stadium: "Estadio Fiscal de Cañete", titles: 6, colors: "Rojo Furia", series: ["honor", "senior_35", "juvenil"] },
      { id: "canete-lagranja", name: "C.D. La Granja", shortName: "La Granja", badgeEmoji: "🌾", founded: "1978", stadium: "Estadio Fiscal de Cañete", titles: 4, colors: "Amarillo Dorado", series: ["honor", "senior_35", "juvenil"] }
    ];
    newDb.matches = [
      {
        id: "match-canete-01",
        series: "honor",
        round: "Fecha 7 • Torneo Oficial ANFA Cañete",
        homeClubId: "canete-alianza",
        awayClubId: "canete-juvenil",
        venue: "Estadio Fiscal de Cañete",
        date: "Hoy • 16:30 hrs",
        status: "en_vivo",
        currentMinute: 55,
        half: 2,
        homeScore: 1,
        awayScore: 0,
        referee: "Javier Bastías (Árbitros ANFA)",
        events: [
          { type: "gol", minute: 41, playerName: "Mauricio Linco", teamId: "canete-alianza", description: "Definición mano a mano" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: false, refereeConfirmed: false }
      }
    ];
    newDb.leagueInfo.activeMatchId = "match-canete-01";
  } else if (targetId === 'concepcion') {
    newDb.clubs = [
      { id: "conce-cochrane", name: "C.D. Lord Cochrane", shortName: "Lord Cochrane", badgeEmoji: "⚓", founded: "1916", stadium: "Campos Nonguén", titles: 14, colors: "Azul Marino", series: ["honor", "senior_35", "juvenil"] },
      { id: "conce-pedro", name: "C.D. Pedro del Río", shortName: "Pedro del Río", badgeEmoji: "🌊", founded: "1948", stadium: "Cancha Zañartu", titles: 8, colors: "Celeste y Blanco", series: ["honor", "senior_35", "juvenil"] },
      { id: "conce-kennedy", name: "C.D. Juventud Kennedy", shortName: "Juv. Kennedy", badgeEmoji: "🦅", founded: "1967", stadium: "Complejo Bellavista", titles: 6, colors: "Rojo Carmesí", series: ["honor", "senior_35", "juvenil"] }
    ];
    newDb.matches = [
      {
        id: "match-conce-01",
        series: "honor",
        round: "Fecha 5 • Clásico Tradicional Penquista",
        homeClubId: "conce-cochrane",
        awayClubId: "conce-pedro",
        venue: "Campos Deportivos Nonguén, Concepción",
        date: "En Directo • 17:00 hrs",
        status: "en_vivo",
        currentMinute: 62,
        half: 2,
        homeScore: 3,
        awayScore: 2,
        referee: "Pablo Henríquez (Asociación Concepción)",
        events: [
          { type: "gol", minute: 15, playerName: "Matías Soto", teamId: "conce-cochrane", description: "Golazo de volea" },
          { type: "gol", minute: 28, playerName: "Gonzalo Riffo", teamId: "conce-pedro", description: "Tiro penal" },
          { type: "gol", minute: 58, playerName: "Esteban Valenzuela", teamId: "conce-cochrane", description: "Cabezazo esquinado" }
        ],
        signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
      }
    ];
    newDb.leagueInfo.activeMatchId = "match-conce-01";
  }

  saveDb(newDb);
  window.dispatchEvent(new CustomEvent('ligapro:association-changed', { detail: target }));
}

/**
 * Exporta toda la base de datos comunal a un archivo JSON para respaldo
 */
export function exportDbAsJson() {
  const db = getDb();
  const jsonStr = JSON.stringify(db, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const assoc = db.leagueInfo?.shortName?.replace(/\s+/g, '_') || 'ANFA';
  a.download = `${assoc}_Respaldo_Oficial_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Importa y restaura una base de datos desde un archivo JSON
 */
export function importDbFromJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.leagueInfo && parsed.clubs) {
      saveDb(parsed);
      return { success: true, message: "Base de datos de la Asociación restaurada con éxito." };
    }
    return { success: false, message: "El archivo no posee una estructura válida de ANFA." };
  } catch (err) {
    return { success: false, message: "Error al procesar el archivo JSON: " + err.message };
  }
}

/**
 * Obtiene la lista de recintos y canchas oficiales
 */
export function getVenues() {
  const db = getDb();
  return db.venues || INITIAL_DATA.venues;
}

/**
 * Permite a la Directiva actualizar el estado de una cancha (ej. suspender por lluvia)
 */
export function updateVenueStatus(venueId, status, statusLabel) {
  const db = getDb();
  if (!db.venues) db.venues = JSON.parse(JSON.stringify(INITIAL_DATA.venues));
  const v = db.venues.find(item => item.id === venueId);
  if (v) {
    v.status = status;
    v.statusLabel = statusLabel;
    saveDb(db);
    return { success: true, venue: v };
  }
  return { success: false, message: "Cancha no encontrada" };
}

/**
 * Obtiene el partido activo actual
 */
export function getActiveMatch() {
  const db = getDb();
  const matchId = db.leagueInfo?.activeMatchId || 'match-arauco-01';
  return db.matches.find(m => m.id === matchId) || db.matches[0];
}

/**
 * Cambia el partido activo y notifica globalmente
 */
export function setActiveMatch(matchId) {
  const db = getDb();
  const exists = db.matches.find(m => m.id === matchId);
  if (!exists) return false;
  
  db.leagueInfo.activeMatchId = matchId;
  saveDb(db);

  // Despachar evento para sincronizar vistas
  window.dispatchEvent(new CustomEvent('ligapro:match-changed', {
    detail: { matchId, match: exists }
  }));
  return true;
}

/**
 * Retorna todos los partidos en vivo o de la jornada simultánea
 */
export function getLiveMatches() {
  const db = getDb();
  return db.matches.filter(m => m.status === 'en_vivo');
}

/**
 * Retorna partidos asignados a un recinto específico
 */
export function getMatchesByVenue(venueId) {
  const db = getDb();
  return db.matches.filter(m => m.venueId === venueId);
}

/**
 * Retorna la información oficial de la Selección Comunal de Arauco
 */
export function getSelectionInfo() {
  const db = getDb();
  return db.selectionInfo || INITIAL_DATA.selectionInfo;
}

/**
 * Retorna las noticias oficiales vigentes (con fallback a INITIAL_DATA)
 */
export function getNews() {
  const db = getDb();
  if (!db.news || !Array.isArray(db.news) || db.news.length === 0) {
    db.news = JSON.parse(JSON.stringify(INITIAL_DATA.news));
    saveDb(db);
  }
  return db.news;
}

/**
 * Agrega una nueva noticia al feed de la Sala de Prensa
 */
export function addNews(newsItem) {
  const db = getDb();
  if (!db.news) db.news = JSON.parse(JSON.stringify(INITIAL_DATA.news));
  
  const newItem = {
    id: `news-${Date.now()}`,
    title: newsItem.title || "Comunicado Oficial",
    category: newsItem.category || "Torneo Oficial",
    categoryBadge: newsItem.categoryBadge || "📢 COMUNICADO",
    date: "Recién publicado",
    readTime: "2 min de lectura",
    author: newsItem.author || "Directiva ANFA Arauco",
    hero: false,
    image: newsItem.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
    excerpt: newsItem.excerpt || "",
    content: newsItem.content || newsItem.excerpt || "",
    tags: newsItem.tags || ["ANFA Arauco"]
  };

  db.news.unshift(newItem);
  saveDb(db);

  window.dispatchEvent(new CustomEvent('ligapro:news-updated', { detail: newItem }));
  return newItem;
}

/**
 * Retorna la galería multimedia oficial (fotos y videos)
 */
export function getMediaGallery() {
  const db = getDb();
  if (!db.mediaGallery || !db.mediaGallery.photos || !db.mediaGallery.videos) {
    db.mediaGallery = JSON.parse(JSON.stringify(INITIAL_DATA.mediaGallery));
    saveDb(db);
  }
  return db.mediaGallery;
}

/**
 * Agrega una foto a la galería multimedia
 */
export function addMediaPhoto(photoItem) {
  const db = getDb();
  if (!db.mediaGallery) db.mediaGallery = JSON.parse(JSON.stringify(INITIAL_DATA.mediaGallery));
  
  const newPhoto = {
    id: `photo-${Date.now()}`,
    title: photoItem.title || "Postal de Cancha",
    match: photoItem.match || "Jornada Oficial",
    date: "Reciente",
    venue: photoItem.venue || "Estadio Municipal Ramón Burgos",
    author: photoItem.author || "Prensa Arauco",
    url: photoItem.url
  };

  db.mediaGallery.photos.unshift(newPhoto);
  saveDb(db);
  window.dispatchEvent(new CustomEvent('ligapro:media-updated', { detail: { type: 'photo', item: newPhoto } }));
  return newPhoto;
}

/**
 * Agrega un video o gol a la videoteca oficial
 */
export function addMediaVideo(videoItem) {
  const db = getDb();
  if (!db.mediaGallery) db.mediaGallery = JSON.parse(JSON.stringify(INITIAL_DATA.mediaGallery));

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
  saveDb(db);
  window.dispatchEvent(new CustomEvent('ligapro:media-updated', { detail: { type: 'video', item: newVideo } }));
  return newVideo;
}

