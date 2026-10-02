(() => {
  // js/data.js
  var STORAGE_KEY = "LIGAMASTER_ARAUCO_DB_V14";
  var INITIAL_DATA = {
    leagueInfo: {
      name: "Asociaci\xF3n de F\xFAtbol de Arauco",
      shortName: "AFA Arauco",
      foundationDate: "01 de octubre de 1940",
      anniversary: "Fundada el 1 de Octubre de 1940 (86 a\xF1os de historia). 10\xAA agrupaci\xF3n m\xE1s antigua de la Regi\xF3n del Biob\xEDo (de 33 asociaciones).",
      president: "Claudio Pampaloni Altamirano",
      mediaPartner: "Voz Deportiva (Transmisi\xF3n oficial lunes, mi\xE9rcoles y viernes 20:00 hrs)",
      commune: "Arauco, Regi\xF3n del Biob\xEDo, Chile",
      headquarters: "Julio Montt N\xBA 386, Poblaci\xF3n 10 de Julio, Arauco",
      season: "Campeonato Oficial 2026/27",
      activeSeries: "honor",
      totalClubs: 10,
      governingBodies: {
        regional: "ANFA Regi\xF3n del Biob\xEDo",
        national: "Asociaci\xF3n Nacional de F\xFAtbol Amateur (ANFA Chile)",
        referees: "Colegio de \xC1rbitros de la Provincia de Arauco (CAPA)",
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
        name: "Estadio Municipal Ram\xF3n Burgos",
        shortName: "Estadio Ram\xF3n Burgos",
        commune: "Arauco",
        surface: "Pasto Sint\xE9tico Certificado",
        surfaceType: "sintetico",
        lighting: "Iluminaci\xF3n Artificial LED (Apta nocturna)",
        capacity: "2.500 espectadores",
        address: "Avenida Prat s/n, Arauco",
        mapsUrl: "https://maps.google.com/?q=Estadio+Municipal+Ramon+Burgos+Arauco",
        status: "habilitada",
        statusLabel: "\u{1F7E2} Habilitada (Cancha Principal)",
        usageNotes: "Principal recinto deportivo comunal. Alberga el 65% de la fecha oficial de Honor, Senior y Juvenil.",
        photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
        coordinates: "-37.2472, -73.3181",
        features: ["Pasto Sint\xE9tico", "Iluminaci\xF3n LED", "Grader\xEDas Techadas", "Camarines CAPA"]
      },
      {
        id: "estadio-sebastian-gaete",
        name: "Estadio Sebasti\xE1n Gaete",
        shortName: "Estadio Sebasti\xE1n Gaete",
        commune: "Arauco",
        surface: "Pasto Sint\xE9tico de Alto Tr\xE1fico",
        surfaceType: "sintetico",
        lighting: "Torres de Focos Perimetrales",
        capacity: "1.200 espectadores",
        address: "Sector C\xE9ntrico, Arauco",
        mapsUrl: "https://maps.google.com/?q=Estadio+Sebastian+Gaete+Arauco",
        status: "habilitada",
        statusLabel: "\u{1F7E2} Habilitada (Cancha Oficial)",
        usageNotes: "Ubicaci\xF3n c\xE9ntrica en la ciudad. Sede continua de series Segunda Adulta, Senior 35 y categor\xEDas infantiles.",
        photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
        coordinates: "-37.2435, -73.3210",
        features: ["Pasto Sint\xE9tico", "Ubicaci\xF3n C\xE9ntrica", "Cierre Perimetral", "Mesa de Turno Techada"]
      },
      {
        id: "cancha-sausalito",
        name: "Cancha El Sausalito",
        shortName: "Cancha El Sausalito",
        commune: "Arauco",
        surface: "Pasto Natural Tradicional",
        surfaceType: "natural",
        lighting: "Sin iluminaci\xF3n artificial (Solo partidos diurnos)",
        capacity: "600 espectadores (per\xEDmetro natural)",
        address: "Camino El Sausalito, Arauco",
        mapsUrl: "https://maps.google.com/?q=Cancha+Sausalito+Arauco",
        status: "restringida",
        statusLabel: "\u{1F7E1} Uso Condicionado / En Evaluaci\xF3n",
        usageNotes: "\u26A0\uFE0F Recinto tradicional de pasto natural. Reabierto este a\xF1o 2026 pero utilizado solo 3 veces en la temporada debido a las lluvias y saturaci\xF3n del terreno.",
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
      disciplinaryCode: "C\xF3digo de Procedimientos y Penalidades ANFA Nacional",
      substitutionRule: "M\xE1ximo 5 sustituciones en un m\xE1ximo de 3 ventanas de interrupci\xF3n por equipo (excluyendo entretiempo).",
      cardRules: {
        yellowAccumulation: 5,
        // 5 amarillas = 1 fecha automática de suspensión
        yellowWarning: 4,
        // 4 amarillas = alerta preventiva
        doubleYellow: 1,
        // Doble amarilla en un partido = 1 fecha de suspensión
        directRed: "2 a 4 fechas seg\xFAn tipificaci\xF3n en informe del \xE1rbitro central (CAPA)"
      },
      cupQualification: {
        regional: "Copa de Campeones ANFA Biob\xEDo (Clasifican el Campe\xF3n y Subcampe\xF3n comunal de Honor, Senior 35 y S\xFAper Senior 45)",
        national: "Campeonato Nacional de Clubes Campeones ANFA (Clasifica el Campe\xF3n Regional de ANFA Biob\xEDo)"
      },
      generalTableScoring: {
        description: "La Tabla General de Clubes suma el rendimiento de todas las series de la jornada dominical para determinar el Campe\xF3n General Comunal de la Asociaci\xF3n.",
        weights: {
          honor: 3,
          // Victoria en Honor otorga 3 pts al club
          segunda: 2,
          // Victoria en Segunda otorga 2 pts al club
          senior35: 2,
          // Victoria en Senior otorga 2 pts al club
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
        ageLimit: "Todo Competidor (Sin l\xEDmite de edad)",
        halfDuration: 45,
        // 2 tiempos de 45 min
        regionalCup: "Copa de Campeones Serie de Honor ANFA Biob\xEDo",
        ballSize: "N\xBA 5 Oficial",
        active: true
      },
      {
        id: "segunda_adulta",
        name: "Serie Segunda Adulta (Reserva)",
        shortName: "Segunda",
        ageLimit: "Todo Competidor",
        halfDuration: 40,
        // 2 tiempos de 40 min
        regionalCup: "Competencia de Reserva Comunal",
        ballSize: "N\xBA 5 Oficial",
        active: false
      },
      {
        id: "senior_35",
        name: "Serie Senior (35+ A\xF1os)",
        shortName: "Senior 35",
        ageLimit: "35 a\xF1os cumplidos en el a\xF1o calendario en curso",
        halfDuration: 40,
        // 2 tiempos de 40 min
        regionalCup: "Copa de Campeones Senior 35 ANFA Biob\xEDo",
        ballSize: "N\xBA 5 Oficial",
        active: false
      },
      {
        id: "super_senior_45",
        name: "Serie S\xFAper Senior (45+ A\xF1os)",
        shortName: "S\xFAper Senior 45",
        ageLimit: "45 a\xF1os cumplidos en el a\xF1o calendario en curso",
        halfDuration: 35,
        // 2 tiempos de 35 min
        regionalCup: "Copa de Campeones S\xFAper Senior 45 ANFA Biob\xEDo",
        ballSize: "N\xBA 5 Oficial",
        active: false
      },
      {
        id: "juvenil",
        name: "Serie Juvenil (Sub-17)",
        shortName: "Juvenil",
        ageLimit: "Menores de 17 a\xF1os al 31 de diciembre",
        halfDuration: 40,
        // 2 tiempos de 40 min
        regionalCup: "Torneo Regional de Selecciones Juveniles ANFA",
        ballSize: "N\xBA 5 Oficial",
        active: false
      },
      {
        id: "infantil",
        name: "Serie Primera Infantil (Sub-15)",
        shortName: "Infantil",
        ageLimit: "Menores de 15 a\xF1os al 31 de diciembre",
        halfDuration: 35,
        // 2 tiempos de 35 min
        regionalCup: "Torneo Regional Infantil ANFA Biob\xEDo",
        ballSize: "N\xBA 5 Oficial",
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
        neighborhood: "Sector Centro / Sede Hist\xF3rica, Arauco",
        stadium: "Estadio Municipal de Arauco",
        colors: { primary: "#0f766e", secondary: "#ffffff" },
        badgeEmoji: "\u{1F6E1}\uFE0F",
        titlesComunalesHonor: 11,
        regionalRecord: "Fundado el 1 de enero de 1939 (87 a\xF1os de trayectoria ininterrumpida). M\xFAltiple representante comunal en la Copa de Campeones ANFA Regi\xF3n del Biob\xEDo en Serie de Honor y Senior. Campe\xF3n Comunal de Honor en 2012, 2015, 2018 y 2022.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 412 - ANFA Arauco / ANFA Biob\xEDo"
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
        badgeEmoji: "\u2694\uFE0F",
        titlesComunalesHonor: 6,
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 208 - ANFA Arauco"
      },
      {
        id: "club-arturo-prat",
        name: "Club Deportivo Arturo Prat",
        shortName: "Arturo Prat",
        foundation: "1952",
        exactFoundationDate: "22 de septiembre de 1952",
        neighborhood: "Calle California N\xB0 205, Sector California, Arauco",
        stadium: "Estadio Sebasti\xE1n Gaete",
        colors: { primary: "#0f172a", secondary: "#facc15" },
        badgeEmoji: "\u2693",
        titlesComunalesHonor: 5,
        regionalRecord: "Fundado el 22 de septiembre de 1952 en el sector California. El ancla dorada y estrella naval representan el coraje marinero de sus fundadores en el campeonato comunal.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 304 - Municipalidad de Arauco"
      },
      {
        id: "club-jorge-robledo",
        name: "Club Deportivo Jorge Robledo",
        shortName: "Jorge Robledo",
        foundation: "1954",
        exactFoundationDate: "26 de febrero de 1954",
        neighborhood: "Sector Plazoleta Fresia / Barrio Estaci\xF3n, Arauco",
        stadium: "Estadio Ram\xF3n Burgos",
        colors: { primary: "#0284c7", secondary: "#ffffff" },
        badgeEmoji: "\u2B50",
        titlesComunalesHonor: 8,
        regionalRecord: "Fundado el 26 de febrero de 1954 en homenaje a George Robledo Oliver, gloria nacional en Newcastle United y campe\xF3n de Inglaterra. Escudo con la cl\xE1sica chilena acrob\xE1tica.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 552 - ANFA Biob\xEDo"
      },
      {
        id: "club-caupolican",
        name: "Club Deportivo Caupolic\xE1n",
        shortName: "Caupolic\xE1n",
        foundation: "1965",
        exactFoundationDate: "03 de agosto de 1965",
        neighborhood: "Poblaci\xF3n Caupolic\xE1n / Sede Social, Arauco",
        stadium: "Estadio Sebasti\xE1n Gaete",
        colors: { primary: "#dc2626", secondary: "#ffffff" },
        badgeEmoji: "\u{1F3F9}",
        titlesComunalesHonor: 5,
        regionalRecord: "Fundado el 3 de agosto de 1965. Franjas albirrojas y medall\xF3n de Caupolic\xE1n. Reconocido por su rica vida comunitaria y prol\xEDfica cantera juvenil en Arauco.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente RUT 73.406.300-2"
      },
      {
        id: "club-colo-colo",
        name: "Club Deportivo Colo Colo",
        shortName: "Colo Colo (Arauco)",
        foundation: "1948",
        exactFoundationDate: "16 de febrero de 1948",
        neighborhood: "Poblaci\xF3n 10 de Julio, Arauco",
        stadium: "Estadio Municipal Ram\xF3n Burgos",
        colors: { primary: "#000000", secondary: "#ffffff" },
        badgeEmoji: "\u{1F985}",
        titlesComunalesHonor: 5,
        regionalRecord: "Fundado el 16 de febrero de 1948 en Poblaci\xF3n 10 de Julio. Escudo tricolor con el busto del cacique. M\xFAltiple campe\xF3n comunal y participante en la Copa de Campeones ANFA Biob\xEDo.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 481"
      },
      {
        id: "club-gente-de-mar",
        name: "Club Deportivo Gente de Mar",
        shortName: "Gente de Mar",
        foundation: "1960",
        exactFoundationDate: "10 de enero de 1960",
        neighborhood: "Sede Social Calle O'Higgins S/N, Arauco",
        stadium: "Estadio Municipal Ram\xF3n Burgos",
        colors: { primary: "#1e3a8a", secondary: "#ffffff" },
        badgeEmoji: "\u26F5",
        titlesComunalesHonor: 3,
        regionalRecord: "Fundado el 10 de enero de 1960 por pescadores artesanales y trabajadores del borde costero de Arauco. Escudo circular blanco y azul marino con gran ancla de leva.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 932"
      },
      {
        id: "club-celulosa-arauco",
        name: "Club Deportivo Celulosa Arauco",
        shortName: "Celulosa Arauco",
        foundation: "1972",
        exactFoundationDate: "16 de agosto de 1972",
        neighborhood: "Villa Los Lingues / Sector Complejo Industrial, Arauco",
        stadium: "Estadio Ram\xF3n Burgos, Arauco",
        colors: { primary: "#15803d", secondary: "#ffffff" },
        badgeEmoji: "\u{1F332}",
        titlesComunalesHonor: 7,
        regionalRecord: "Fundado el 16 de agosto de 1972 por los trabajadores forestales de Celulosa Arauco. Franjas verdes y blancas, 7 campeonatos comunales de Honor e infraestructura modelo.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 840"
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
        badgeEmoji: "\u{1F30A}",
        titlesComunalesHonor: 6,
        regionalRecord: "Fundado el 25 de diciembre de 1978 (en Navidad) en Caleta Tubul. Emblema azul y oro con nav\xEDo navegante. Campe\xF3n Comunal de Honor 2023 y finalista de la Copa de Campeones Regional 2026.",
        seriesParticipantes: ["Honor", "Segunda Adulta", "Senior 35", "S\xFAper Senior 45", "Juvenil", "Infantil"],
        statusLegal: "Personalidad Jur\xEDdica vigente N\xBA 720 - ANFA Biob\xEDo"
      },
      {
        id: "club-real-jose-maria",
        name: "Club Deportivo Real Jos\xE9 Mar\xEDa FC",
        shortName: "Real Jos\xE9 Mar\xEDa",
        foundation: "2026",
        exactFoundationDate: "30 de enero de 2026",
        neighborhood: "Comuna de Arauco",
        stadium: "Estadio Sebasti\xE1n Gaete / Estadio Ram\xF3n Burgos",
        colors: { primary: "#1e3a8a", secondary: "#dc2626", trim: "#facc15" },
        badgeEmoji: "\u{1F451}",
        titlesComunalesHonor: 0,
        contactEmail: "realjosemariafc@gmail.com",
        motto: "Un club con VALORES \u{1F91D}\u26BD ~Real Jos\xE9 Mar\xEDa FC~ \u2764\uFE0F\u{1F499}",
        sponsor: "JUGA BET",
        regionalRecord: "Fundado el 30 de enero de 2026 en la comuna de Arauco. Es el 10\xB0 club oficial aceptado en la AFA Arauco y la instituci\xF3n m\xE1s joven del Biob\xEDo. Gran corona imperial dorada y pasi\xF3n azulgrana.",
        seriesParticipantes: ["2da Infantil", "Senior", "1era Adulta", "Honor", "Super Senior"],
        statusLegal: "Inscripci\xF3n Oficial Asociaci\xF3n de F\xFAtbol de Arauco / ANFA Biob\xEDo (2026)"
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
        name: "Patricio Alarc\xF3n",
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
        name: "Rodrigo S\xE1ez",
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
        sanctionNotes: "ADVERTENCIA ANFA (Art. 42): 4 tarjetas amarillas acumuladas. Pr\xF3xima amonestaci\xF3n acarrea 1 fecha autom\xE1tica de suspensi\xF3n.",
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
        sanctionNotes: "SUSPENSI\xD3N ANFA: Expulsado con Roja Directa en Fecha 6 vs Pelantaro. 2 fechas pendientes seg\xFAn fallo de Tribunal de Honor.",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
      },
      // C.D. Brisas del Mar (Tubul) - Serie de Honor
      {
        id: "p-bm-1",
        clubId: "club-brisas-del-mar",
        series: "honor",
        rut: "16.780.122-8",
        name: "Manuel San Mart\xEDn",
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
        name: "Crist\xF3bal Henr\xEDquez",
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
        sanctionNotes: "SUSPENSI\xD3N ANFA (Art. 42): Acumulaci\xF3n reglamentaria de 5 tarjetas amarillas. Inhabilitado autom\xE1ticamente para la Fecha 8.",
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
        name: "Sebasti\xE1n Mu\xF1oz",
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
        name: "Mat\xEDas Leal",
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
        sanctionNotes: "Convocado a Selecci\xF3n Comunal Adulta de Arauco 2026.",
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
        sanctionNotes: "Convocado a Selecci\xF3n Comunal Adulta de Arauco 2026.",
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
        name: "Joaqu\xEDn Concha",
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
        position: "Volante de Contenci\xF3n",
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
        name: "Claudio Abarz\xFAa",
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
        name: "V\xEDctor Hugo Parra",
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
        name: "Ra\xFAl Alarc\xF3n",
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
        name: "Benjam\xEDn Espinoza",
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
        name: "Mat\xEDas Contreras",
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
        name: "Nicol\xE1s Garrido",
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
        name: "Marcelo Y\xE1\xF1ez",
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
        round: "Fecha 8 \u2022 Serie de Honor (Cl\xE1sico Comunal)",
        homeClubId: "club-jorge-robledo",
        awayClubId: "club-brisas-del-mar",
        venue: "Estadio Municipal Ram\xF3n Burgos",
        venueId: "estadio-ramon-burgos",
        date: "Hoy \u2022 16:30 hrs",
        status: "en_vivo",
        currentMinute: 42,
        half: 1,
        homeScore: 1,
        awayScore: 1,
        referee: "Carlos Henr\xEDquez Gonz\xE1lez (CAPA)",
        refereeAssistant1: "Juan P\xE9rez Cartes",
        refereeAssistant2: "Roberto Alvear Oporto",
        turnOfficial: "Don Sergio Viveros (Director de Turno ANFA)",
        shiftOperator: { name: "Don Sergio Viveros", clubId: "club-gente-de-mar", isNeutral: true, verifiedAnfa: true },
        paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
        paperSheetSignedBy: "Rodrigo S\xE1ez (Capit\xE1n Jorge Robledo), Alexis Guajardo (Capit\xE1n Brisas del Mar), Carlos Henr\xEDquez (CAPA)",
        ratificationStatus: "preliminar_cancha",
        ratificationLabel: "Marcador en Cancha (Firmado por Capitanes y \xC1rbitro)",
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
            description: "Zurdazo potente al \xE1ngulo tras pase filtrado al borde del \xE1rea."
          },
          {
            type: "tarjeta_amarilla",
            teamId: "club-jorge-robledo",
            minute: 27,
            playerId: "p-jr-4",
            playerName: "Rodrigo S\xE1ez",
            reason: "Infracci\xF3n t\xE1ctica en mitad de cancha (4ta amonestaci\xF3n acumulada)."
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
          homeCaptainName: "Rodrigo S\xE1ez",
          awayCaptainConfirmed: true,
          awayCaptainName: "Alexis Guajardo",
          refereeConfirmed: false,
          signedPhysicalSheet: true
        }
      },
      {
        id: "match-arauco-02",
        series: "honor",
        round: "Fecha 8 \u2022 Serie de Honor",
        homeClubId: "club-arauco",
        awayClubId: "club-arturo-prat",
        venue: "Estadio Sebasti\xE1n Gaete",
        venueId: "estadio-sebastian-gaete",
        date: "Hoy \u2022 16:45 hrs (Simult\xE1neo)",
        status: "en_vivo",
        currentMinute: 28,
        half: 1,
        homeScore: 2,
        awayScore: 0,
        referee: "H\xE9ctor J\xE9lvez (CAPA)",
        refereeAssistant1: "Marcos Cares",
        refereeAssistant2: "Esteban Nova",
        turnOfficial: "Don Osvaldo Concha (Director de Turno ANFA)",
        shiftOperator: { name: "Don Osvaldo Concha", clubId: "club-pelantaro", isNeutral: true, verifiedAnfa: true },
        paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
        paperSheetSignedBy: "Mat\xEDas Contreras (Capit\xE1n C.D. Arauco), Joaqu\xEDn Concha (Capit\xE1n Arturo Prat), H\xE9ctor J\xE9lvez (CAPA)",
        ratificationStatus: "preliminar_cancha",
        ratificationLabel: "Marcador en Cancha (Firmado por Capitanes y \xC1rbitro)",
        rosterChecked: true,
        events: [
          {
            type: "gol",
            teamId: "club-arauco",
            minute: 11,
            playerId: "p-ar-11",
            playerName: "Mat\xEDas Contreras",
            assistPlayerId: "p-ar-10",
            assistPlayerName: "Claudio Neira",
            description: "Definici\xF3n cruzada rasante tras veloz desborde por banda izquierda."
          },
          {
            type: "tarjeta_amarilla",
            teamId: "club-arturo-prat",
            minute: 19,
            playerId: "p-ap-8",
            playerName: "Nicol\xE1s Garrido",
            reason: "Falta t\xE1ctica en tres cuartos de cancha (corta avance prometedor)."
          },
          {
            type: "gol",
            teamId: "club-arauco",
            minute: 25,
            playerId: "p-ar-9",
            playerName: "Alexis Cartes",
            assistPlayerId: "p-ar-11",
            assistPlayerName: "Mat\xEDas Contreras",
            description: "Cabezazo colocado junto al vertical derecho tras tiro de esquina."
          }
        ],
        signatures: {
          homeCaptainConfirmed: true,
          homeCaptainName: "Mat\xEDas Contreras",
          awayCaptainConfirmed: true,
          awayCaptainName: "Joaqu\xEDn Concha",
          refereeConfirmed: false,
          signedPhysicalSheet: true
        }
      },
      {
        id: "match-arauco-03",
        series: "honor",
        round: "Fecha 8 \u2022 Serie de Honor",
        homeClubId: "club-celulosa-arauco",
        awayClubId: "club-colo-colo",
        venue: "Estadio Municipal Ram\xF3n Burgos",
        venueId: "estadio-ramon-burgos",
        date: "Ma\xF1ana \u2022 15:30 hrs",
        status: "programado",
        currentMinute: 0,
        half: 1,
        homeScore: 0,
        awayScore: 0,
        referee: "Miguel Sanhueza (CAPA)",
        turnOfficial: "Hern\xE1n Cuevas",
        shiftOperator: { name: "Hern\xE1n Cuevas", clubId: "club-arturo-prat", isNeutral: true, verifiedAnfa: true },
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
        round: "Fecha 8 \u2022 Serie de Honor",
        homeClubId: "club-caupolican",
        awayClubId: "club-real-jose-maria",
        venue: "Estadio Sebasti\xE1n Gaete",
        venueId: "estadio-sebastian-gaete",
        date: "Ma\xF1ana \u2022 17:30 hrs",
        status: "programado",
        currentMinute: 0,
        half: 1,
        homeScore: 0,
        awayScore: 0,
        referee: "Roberto D\xEDaz (CAPA)",
        turnOfficial: "Mario Garc\xE9s",
        shiftOperator: { name: "Mario Garc\xE9s", clubId: "club-colo-colo", isNeutral: true, verifiedAnfa: true },
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
        round: "Fecha 8 \u2022 Serie de Honor",
        homeClubId: "club-gente-de-mar",
        awayClubId: "club-pelantaro",
        venue: "Cancha El Sausalito",
        venueId: "cancha-sausalito",
        date: "Ayer \u2022 17:00 hrs",
        status: "finalizado",
        currentMinute: 90,
        half: 2,
        homeScore: 2,
        awayScore: 2,
        referee: "Eduardo Concha (CAPA)",
        turnOfficial: "Sergio Viveros",
        shiftOperator: { name: "Sergio Viveros", clubId: "club-brisas-del-mar", isNeutral: true, verifiedAnfa: true },
        paperSheetPhotoUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
        paperSheetSignedBy: "Capit\xE1n Gente de Mar, Capit\xE1n Pelantaro, \xC1rbitro Eduardo Concha",
        ratificationStatus: "ratificado_directorio",
        ratificationLabel: "Oficializado y Ratificado por Directorio ANFA",
        rosterChecked: true,
        events: [
          { type: "gol", teamId: "club-gente-de-mar", minute: 14, playerName: "Jorge Basaure", description: "Definici\xF3n rasante" },
          { type: "gol", teamId: "club-pelantaro", minute: 31, playerName: "Rodrigo Toledo", description: "Tiro libre potente" },
          { type: "gol", teamId: "club-pelantaro", minute: 67, playerName: "Diego Abarz\xFAa", description: "Remate al \xE1ngulo" },
          { type: "gol", teamId: "club-gente-de-mar", minute: 88, playerName: "Jorge Basaure", description: "Gol ag\xF3nico de penal" }
        ],
        signatures: {
          homeCaptainConfirmed: true,
          awayCaptainConfirmed: true,
          refereeConfirmed: true,
          signedPhysicalSheet: true
        }
      },
      { id: "match-15-1", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-arauco", awayClubId: "club-gente-de-mar", homeScore: 0, awayScore: 4, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
      { id: "match-15-2", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-brisas-del-mar", awayClubId: "club-real-jose-maria", homeScore: 0, awayScore: 5, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
      { id: "match-15-3", series: "honor", round: "Fecha 15", status: "programado", homeClubId: "club-colo-colo", awayClubId: "club-caupolican", homeScore: 0, awayScore: 0, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
      { id: "match-15-4", series: "honor", round: "Fecha 15", status: "finalizado", homeClubId: "club-arturo-prat", awayClubId: "club-jorge-robledo", homeScore: 3, awayScore: 2, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "20/09/2026", referee: "Asignado por ANFA" },
      { id: "match-14-1", series: "honor", round: "Fecha 14", status: "finalizado", homeClubId: "club-real-jose-maria", awayClubId: "club-jorge-robledo", homeScore: 11, awayScore: 0, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "13/09/2026", referee: "Asignado por ANFA" },
      { id: "match-14-2", series: "honor", round: "Fecha 14", status: "finalizado", homeClubId: "club-celulosa-arauco", awayClubId: "club-colo-colo", homeScore: 0, awayScore: 2, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "13/09/2026", referee: "Asignado por ANFA" },
      { id: "match-13-1", series: "honor", round: "Fecha 13", status: "finalizado", homeClubId: "club-celulosa-arauco", awayClubId: "club-real-jose-maria", homeScore: 0, awayScore: 3, venue: "Estadio Municipal Ram\xF3n Burgos", venueId: "estadio-ramon-burgos", date: "06/09/2026", referee: "Asignado por ANFA" }
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
        cause: "Expulsi\xF3n con Roja Directa: Agresi\xF3n verbal a juez de l\xEDnea en Fecha 6 vs Pelantaro (Art. 54 Reglamento ANFA)",
        datesImposed: 3,
        datesServed: 1,
        datesRemaining: 2,
        status: "vigente",
        meetingDate: "12/09/2026 - Sesi\xF3n Tribunal de Honor ANFA Arauco (Acta N\xBA 14)"
      },
      {
        id: "sanc-arauco-02",
        playerId: "p-bm-3",
        playerName: "Crist\xF3bal Henr\xEDquez",
        clubName: "C.D. Brisas del Mar (Tubul)",
        series: "Serie de Honor",
        cause: "Acumulaci\xF3n reglamentaria de 5 tarjetas amarillas (Art. 42 Reglamento ANFA)",
        datesImposed: 1,
        datesServed: 0,
        datesRemaining: 1,
        status: "vigente",
        meetingDate: "16/09/2026 - Notificaci\xF3n Autom\xE1tica Sistema ANFA"
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
        category: "Cuota de Inscripci\xF3n",
        clubId: "club-jorge-robledo",
        clubName: "C.D. Jorge Robledo",
        concept: "Arancel oficial anual de afiliaci\xF3n y competencia - Temporada 2026 (Todas las series)",
        amount: 6e4,
        receiptFolio: "ING-2026-081",
        status: "pagado"
      },
      {
        id: "mov-02",
        date: "02/09/2026",
        type: "ingreso",
        category: "Cuota de Inscripci\xF3n",
        clubId: "club-brisas-del-mar",
        clubName: "C.D. Brisas del Mar (Tubul)",
        concept: "Arancel oficial anual de afiliaci\xF3n y competencia - Temporada 2026 (Todas las series)",
        amount: 6e4,
        receiptFolio: "ING-2026-082",
        status: "pagado"
      },
      {
        id: "mov-03",
        date: "05/09/2026",
        type: "ingreso",
        category: "Cuota de Inscripci\xF3n",
        clubId: "club-arauco",
        clubName: "C.D. Arauco",
        concept: "Arancel oficial anual de afiliaci\xF3n y competencia - Temporada 2026",
        amount: 6e4,
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
        concept: "Arancel disciplinario expulsi\xF3n directa Esteban Carriel (Fallo Acta N\xBA 14)",
        amount: 5e3,
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
        concept: "Arancel reglamentario acumulaci\xF3n 5 amonestaciones jugador C. Henr\xEDquez (Art. 42 ANFA)",
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
        concept: "Pago honorarios terna arbitral Fecha 7 - Colegio de \xC1rbitros de la Provincia de Arauco (CAPA)",
        amount: 45e3,
        receiptFolio: "EGR-2026-034",
        status: "pagado"
      },
      {
        id: "mov-07",
        date: "10/09/2026",
        type: "egreso",
        category: "Implementaci\xF3n Deportiva",
        clubId: "asociacion",
        clubName: "ANFA Arauco",
        concept: "Adquisici\xF3n de lote de balones oficiales N\xBA 5 reglamentarios ANFA",
        amount: 38e3,
        receiptFolio: "EGR-2026-035",
        status: "pagado"
      },
      {
        id: "mov-08",
        date: "15/09/2026",
        type: "egreso",
        category: "Mantenci\xF3n y Operaci\xF3n",
        clubId: "asociacion",
        clubName: "ANFA Arauco",
        concept: "Gastos de secretar\xEDa, papeler\xEDa oficial de actas y mantenci\xF3n sede Julio Montt 386",
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
      name: "Selecci\xF3n Oficial de F\xFAtbol de Arauco",
      shortName: "Selecci\xF3n de Arauco",
      association: "Asociaci\xF3n de F\xFAtbol Amateur de Arauco",
      regionalBody: "ANFA Regi\xF3n del Biob\xEDo",
      season: "Torneo Regional de Selecciones 2026",
      colors: "Camiseta Roja Tricolor, Pantal\xF3n Blanco, Medias Rojas",
      nickname: "La Roja de Arauco / Los Costinos",
      venue: "Estadio Municipal Ram\xF3n Burgos Loyola",
      officialMedia: {
        name: "TV Sports Laraquete",
        channels: "Facebook Live & YouTube",
        coverage: "Transmisi\xF3n oficial exclusiva de la campa\xF1a de Arauco en el Torneo Regional 2026"
      },
      honor: {
        seriesName: "Serie de Honor (Adulta)",
        status: "clasificada",
        statusBadge: "\u{1F525} \xA1CLASIFICADA A CUARTOS DE FINAL!",
        badgeClass: "badge-live",
        headline: "Arauco avanza a Cuartos de Final con un contundente global de 11 a 5",
        summary: "La Selecci\xF3n Adulta de Arauco sell\xF3 su paso a la ronda de los 8 mejores del Biob\xEDo. En la ida disputada en el Estadio Ram\xF3n Burgos vapule\xF3 a Cavecur por 8-1, y en la revancha en Curanilahue cay\xF3 3-4 en un electrizante partido, asegurando su clasificaci\xF3n a Cuartos de Final.",
        firstRoundMatches: [
          {
            phase: "Partido de Ida (Octavos de Final)",
            date: "06 de septiembre de 2026",
            venue: "Estadio Municipal Ram\xF3n Burgos Loyola, Arauco",
            homeTeam: "Selecci\xF3n de Arauco",
            homeScore: 8,
            awayTeam: "Cavecur (Canal Vecinal Curanilahue)",
            awayScore: 1,
            summary: "Goleada hist\xF3rica en el Ram\xF3n Burgos con triplete de Rodrigo Romero y doblete de Felipe Alarc\xF3n."
          },
          {
            phase: "Partido de Vuelta (Octavos de Final)",
            date: "13 de septiembre de 2026",
            venue: "Estadio Parque Urbano, Curanilahue",
            homeTeam: "Cavecur (Canal Vecinal Curanilahue)",
            homeScore: 4,
            awayTeam: "Selecci\xF3n de Arauco",
            awayScore: 3,
            summary: "Encuentro de alta intensidad en pasto sint\xE9tico donde Arauco administr\xF3 la ventaja y timbr\xF3 los pasajes a Cuartos."
          }
        ],
        nextMatch: {
          stage: "Cuartos de Final (Fase 2)",
          status: "sorteo_pendiente",
          drawDate: "Martes 22 de Septiembre de 2026",
          drawLocation: "Sede ANFA Regi\xF3n del Biob\xEDo (Concepci\xF3n)",
          notes: "El sorteo oficial de parejas de Cuartos de Final se desarrollar\xE1 tras el receso de Fiestas Patrias.",
          projectedOpponent: "Selecci\xF3n de Lebu o Selecci\xF3n de Ca\xF1ete",
          matchTitle: "Cl\xE1sico Provincial de la Costa: Rumbo a Semifinales",
          venue: "Estadio Municipal Ram\xF3n Burgos Loyola (Pasto Sint\xE9tico)",
          venueAddress: "Avenida Prat s/n, Arauco",
          mapsUrl: "https://maps.google.com/?q=Estadio+Municipal+Ramon+Burgos+Arauco",
          ticketInfo: "$2.000 General \u2022 $1.000 Socios ANFA \u2022 Ni\xF1os Gratis",
          referees: "Terna Arbitral designada por Colegio Regional ANFA Biob\xEDo"
        },
        staff: [
          { role: "Director T\xE9cnico", name: "Cristi\xE1n G\xF3mez", club: "Real Jos\xE9 Mar\xEDa (ex Lota Schwager)", notes: "Exfutbolista profesional y DT de Real Jos\xE9 Mar\xEDa" },
          { role: "Ayudante T\xE9cnico", name: "Claudio Mora", club: "Real Jos\xE9 Mar\xEDa", notes: "Estratega t\xE1ctico asistente" },
          { role: "Preparador F\xEDsico", name: "Alexis Burgos", club: "Real Jos\xE9 Mar\xEDa", notes: "Acondicionamiento f\xEDsico de alto rendimiento" },
          { role: "Kinesi\xF3logo / Salud", name: "Jorge S\xE1ez", club: "CESFAM Arauco / Real Jos\xE9 Mar\xEDa", notes: "Atenci\xF3n m\xE9dica en campo" },
          { role: "Coordinador General", name: "Marcelo Romero", club: "Real Jos\xE9 Mar\xEDa", notes: "Fundador de Real Jos\xE9 Mar\xEDa y gestor comunal" }
        ],
        // Nómina Oficial de 29 Convocados (20 de Real José María + 9 de Clubes Tradicionales)
        squad: [
          // 20 Jugadores de Real José María (Aporte Mayoritario a la Selección de Arauco 2026)
          { id: "sel-rjm-1", number: 1, name: "Marco Silva", position: "Arquero Titular", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-081", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-2", number: 12, name: "Crist\xF3bal Salgado", position: "Arquero", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-082", matches: 0, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-3", number: 3, name: "Cristi\xE1n Bustos", position: "Defensa Central", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-083", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-4", number: 2, name: "Fernando Sanhueza", position: "Defensa Central", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-084", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-5", number: 13, name: "Jonathan Y\xE1\xF1ez", position: "Lateral Derecho", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-085", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-6", number: 6, name: "Kevin Morales", position: "Lateral Izquierdo", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-086", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-7", number: 5, name: "Patricio Monsalve", position: "Volante de Contenci\xF3n", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-087", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-8", number: 8, name: "Sebasti\xE1n Valenzuela", position: "Volante Mixto", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-088", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-9", number: 10, name: "Felipe Alarc\xF3n", position: "Volante Creativo", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-089", matches: 2, goals: 3, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-10", number: 7, name: "Mat\xEDas Oporto", position: "Extremo Derecho", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-090", matches: 2, goals: 2, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-11", number: 11, name: "Diego C\xE1rdenas", position: "Extremo Izquierdo", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-091", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-12", number: 9, name: "Rodrigo Romero", position: "Centrodelantero", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-092", matches: 2, goals: 3, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-13", number: 14, name: "Brayan Neira", position: "Defensa Polifuncional", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-093", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-14", number: 15, name: "Ignacio Saavedra", position: "Mediocampista", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-094", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-15", number: 16, name: "Carlos Mellado", position: "Volante de Salida", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-095", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-16", number: 17, name: "Gonzalo Chand\xEDa", position: "Delantero", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-096", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-17", number: 18, name: "Lucas Beltr\xE1n", position: "Lateral", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-097", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-18", number: 19, name: "Camilo Sep\xFAlveda", position: "Volante Mixto", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-098", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-19", number: 20, name: "Javier Henr\xEDquez", position: "Puntero", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-099", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-rjm-20", number: 25, name: "Daniel Fuentes", position: "Arquero de Reserva", clubId: "club-real-jose-maria", clubName: "C.D. Real Jos\xE9 Mar\xEDa", clubBadge: "\u{1F451}", regAnfa: "REG-ANFA-AR-2026-100", matches: 0, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80" },
          // 9 Jugadores de Clubes Tradicionales de ANFA Arauco
          { id: "sel-h21", number: 4, name: "Rodrigo S\xE1ez", position: "Defensa Central (Capit\xE1n)", clubId: "club-jorge-robledo", clubName: "C.D. Jorge Robledo", clubBadge: "\u2B50", regAnfa: "REG-ANFA-AR-2020-014", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h22", number: 22, name: "Mauricio Neira", position: "Volante Creativo", clubId: "club-jorge-robledo", clubName: "C.D. Jorge Robledo", clubBadge: "\u2B50", regAnfa: "REG-ANFA-AR-2018-092", matches: 2, goals: 1, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h23", number: 23, name: "Sebasti\xE1n Beltr\xE1n", position: "Defensa Central", clubId: "club-arauco", clubName: "C.D. Arauco", clubBadge: "\u{1F6E1}\uFE0F", regAnfa: "REG-ANFA-AR-2019-041", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h24", number: 24, name: "Mat\xEDas Contreras", position: "Puntero Izquierdo", clubId: "club-arauco", clubName: "C.D. Arauco", clubBadge: "\u{1F6E1}\uFE0F", regAnfa: "REG-ANFA-AR-2022-118", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h25", number: 21, name: "Alexis Guajardo", position: "Delantero Centro", clubId: "club-brisas-del-mar", clubName: "C.D. Brisas del Mar (Tubul)", clubBadge: "\u{1F30A}", regAnfa: "REG-ANFA-AR-2017-055", matches: 2, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h26", number: 26, name: "Nicol\xE1s Garrido", position: "Volante Mixto", clubId: "club-arturo-prat", clubName: "C.D. Arturo Prat", clubBadge: "\u2693", regAnfa: "REG-ANFA-AR-2021-032", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h27", number: 27, name: "Rodrigo Toledo", position: "Volante de Contenci\xF3n", clubId: "club-pelantaro", clubName: "C.D. Pelantaro", clubBadge: "\u2694\uFE0F", regAnfa: "REG-ANFA-AR-2019-077", matches: 2, goals: 0, yellowCards: 1, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h28", number: 28, name: "Lucas Carrillo", position: "Lateral Derecho", clubId: "club-caupolican", clubName: "C.D. Caupolic\xE1n", clubBadge: "\u{1F3F9}", regAnfa: "REG-ANFA-AR-2023-019", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80" },
          { id: "sel-h29", number: 29, name: "V\xEDctor Hugo Parra", position: "Mediocampista", clubId: "club-celulosa-arauco", clubName: "C.D. Celulosa Arauco", clubBadge: "\u{1F332}", regAnfa: "REG-ANFA-AR-2020-064", matches: 1, goals: 0, yellowCards: 0, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
        ]
      },
      juvenil: {
        seriesName: "Serie Juvenil (Sub-17)",
        status: "eliminada",
        statusBadge: "\u26AA ELIMINADA CON HONOR (Fase Octavos)",
        badgeClass: "status-badge",
        headline: "Victoria 2-1 en Curanilahue que cerr\xF3 con honor la campa\xF1a juvenil",
        summary: "La Selecci\xF3n Juvenil Sub-17 de Arauco cay\xF3 en la ida 0-5 ante Cavecur en el Estadio Ram\xF3n Burgos, pero mostr\xF3 car\xE1cter y temple comunal en la vuelta en el Estadio Parque Urbano de Curanilahue, imponi\xE9ndose por 2-1 como forastero. Aunque el global favoreci\xF3 a Cavecur, la Asociaci\xF3n ANFA Arauco destaca el esp\xEDritu deportivo y la proyecci\xF3n del semillero comunal.",
        firstRoundMatches: [
          {
            phase: "Partido de Ida (Octavos de Final)",
            date: "06 de septiembre de 2026",
            venue: "Estadio Municipal Ram\xF3n Burgos Loyola, Arauco",
            homeTeam: "Selecci\xF3n Juvenil Arauco",
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
            awayTeam: "Selecci\xF3n Juvenil Arauco",
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
          { role: "Director T\xE9cnico", name: "Pablo Andr\xE9s Arias Santib\xE1\xF1ez", club: "ANFA Arauco", notes: "Director T\xE9cnico Oficial Selecci\xF3n Juvenil Sub-17 Arauco 2026" },
          { role: "Asistente T\xE9cnico", name: "Diego Alexis Valenzuela", club: "ANFA Arauco", notes: "Asistente T\xE9cnico / Preparador de Porteros" },
          { role: "Preparador F\xEDsico", name: "Juan Andr\xE9s Leal Vega", club: "ANFA Arauco", notes: "Preparaci\xF3n F\xEDsica y Rendimiento Atl\xE9tico" },
          { role: "Preparador de Arqueros", name: "Danny Lorenzo Meza Huenuil", club: "ANFA Arauco", notes: "Entrenador Especializado de Porter\xEDa" }
        ],
        officialSquad30: [
          { num: 1, name: "Crist\xF3bal Orlando Acu\xF1a Vargas", pos: "Arquero", club: "ANFA Arauco" },
          { num: 2, name: "Ricardo Andr\xE9s Aguilar Navarrete", pos: "Defensa", club: "ANFA Arauco" },
          { num: 3, name: "Rafael Antonio Burgos Denis", pos: "Defensa", club: "ANFA Arauco" },
          { num: 4, name: "Agust\xEDn Alonso Ceballos Figueroa", pos: "Defensa", club: "ANFA Arauco" },
          { num: 5, name: "Alexander Jerem\xEDas Concha O\xF1ate", pos: "Volante", club: "ANFA Arauco" },
          { num: 6, name: "Maximiliano Esteban Garret\xF3n Mu\xF1oz", pos: "Volante", club: "ANFA Arauco" },
          { num: 7, name: "Sebasti\xE1n Alejandro Guti\xE9rrez Paredes", pos: "Delantero", club: "ANFA Arauco" },
          { num: 8, name: "Franco Agust\xEDn Hermosilla Salazar", pos: "Volante", club: "ANFA Arauco" },
          { num: 9, name: "Omar Francisco Henr\xEDquez Varela", pos: "Delantero", club: "ANFA Arauco" },
          { num: 10, name: "Ian Vicente Leal Carrillo", pos: "Volante Creativo", club: "ANFA Arauco" },
          { num: 11, name: "Mart\xEDn Alonso Leal Concha", pos: "Extremo", club: "ANFA Arauco" },
          { num: 12, name: "Sebasti\xE1n Le\xF3n M\xE9ndez Bahamondes", pos: "Arquero", club: "ANFA Arauco" },
          { num: 13, name: "Joaqu\xEDn Alexander Efra\xEDn Meza Garret\xF3n", pos: "Defensa Central", club: "ANFA Arauco" },
          { num: 14, name: "Alexander Stein Monsalve Rifo", pos: "Mediocampista", club: "ANFA Arauco" },
          { num: 15, name: "Mateo Ezequiel Montoya Inzunza", pos: "Volante", club: "ANFA Arauco" },
          { num: 16, name: "Crist\xF3bal Alejandro Opazo Medina", pos: "Lateral", club: "ANFA Arauco" },
          { num: 17, name: "Antonio Andr\xE9s Pardo Rodr\xEDguez", pos: "Volante", club: "ANFA Arauco" },
          { num: 18, name: "Samuel Ignacio Poblete Varela", pos: "Delantero", club: "ANFA Arauco" },
          { num: 19, name: "Ricardo Andr\xE9s Pradenas Aguilar", pos: "Defensa", club: "ANFA Arauco" },
          { num: 20, name: "Enrique Alejandro Quevedo Far\xEDas", pos: "Mediocampista", club: "ANFA Arauco" },
          { num: 21, name: "Gabriel Andr\xE9s Ruiz Zambrano", pos: "Delantero", club: "ANFA Arauco" },
          { num: 22, name: "Alonso Antonio S\xE1ez Hidalgo", pos: "Lateral", club: "ANFA Arauco" },
          { num: 23, name: "Alan Gabriel S\xE1ez Iturra", pos: "Defensa Central", club: "ANFA Arauco" },
          { num: 24, name: "H\xE9ctor Fernando Ulloa Quilam\xE1n", pos: "Volante", club: "ANFA Arauco" },
          { num: 25, name: "Diego Alonso Ulloa Rivas", pos: "Arquero", club: "ANFA Arauco" },
          { num: 26, name: "Leonardo Alexis Valenzuela Leal", pos: "Defensa", club: "ANFA Arauco" },
          { num: 27, name: "Joaqu\xEDn Octavio Vallejos Espinoza", pos: "Volante", club: "ANFA Arauco" },
          { num: 28, name: "Mat\xEDas Alejandro V\xE1squez Castro", pos: "Extremo", club: "ANFA Arauco" },
          { num: 29, name: "Pedro Andr\xE9s Vega Lizama", pos: "Delantero", club: "ANFA Arauco" },
          { num: 30, name: "Mat\xEDas Alfonso Vilo Carrillo", pos: "Lateral", club: "ANFA Arauco" }
        ],
        featuredYoungsters: [
          { name: "Ian Vicente Leal Carrillo", club: "ANFA Arauco", position: "Volante Creativo (#10)", notes: "Convocado oficial. Talento y visi\xF3n ofensiva." },
          { name: "Omar Francisco Henr\xEDquez Varela", club: "ANFA Arauco", position: "Delantero (#9)", notes: "Convocado oficial. Referente de \xE1rea del semillero." },
          { name: "Joaqu\xEDn Alexander Efra\xEDn Meza", club: "ANFA Arauco", position: "Defensa (#13)", notes: "Convocado oficial. Solvencia y quite en retaguardia." },
          { name: "Mart\xEDn Alonso Leal Concha", club: "ANFA Arauco", position: "Extremo (#11)", notes: "Convocado oficial. Velocidad y desborde por la banda." }
        ]
      }
    },
    /**
     * Sala de Prensa, Noticias Oficiales y Cobertura Multimedia (FIFA / Fan Hub)
     */
    news: [
      {
        id: "news-01",
        title: "Gran Cl\xE1sico en Ram\xF3n Burgos: C.D. Jorge Robledo y Brisas del Mar encienden la Fecha 8 de Honor",
        category: "Torneo Oficial",
        categoryBadge: "\u{1F525} CL\xC1SICO DE LA FECHA",
        date: "Hoy \u2022 16:30 hrs",
        readTime: "3 min de lectura",
        author: "Prensa Oficial ANFA Arauco",
        hero: true,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
        excerpt: "Con grader\xEDas colmadas en el Estadio Municipal Ram\xF3n Burgos, el puntero del campeonato y el escolta de Caleta Tubul se miden en un duelo que puede definir el liderato hacia la Copa de Campeones.",
        content: "La fiesta del f\xFAtbol amateur en Arauco vive su fecha m\xE1s vibrante. Ambos equipos llegan invictos en la segunda rueda de la Serie de Honor. El Directorio de ANFA Arauco dispuso un contingente especial de seguridad y terna arbitral colegiada de CAPA para garantizar un espect\xE1culo deportivo de primer nivel para todas las familias que asistan al estadio.",
        tags: ["Fecha 8", "Serie de Honor", "Copa de Campeones"]
      },
      {
        id: "news-02",
        title: "N\xF3mina Oficial: Selecci\xF3n Sub-15 de Arauco inicia microciclo rumbo al Campeonato Regional",
        category: "Selecci\xF3n Comunal",
        categoryBadge: "\u{1F1E8}\u{1F1F1} SEMILLERO ANFA",
        date: "Ayer",
        readTime: "2 min de lectura",
        author: "Cuerpo T\xE9cnico Selecci\xF3n",
        hero: false,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        excerpt: "El cuerpo t\xE9cnico comunal oficializ\xF3 la lista de 30 juveniles convocados de los 10 clubes locales para iniciar los entrenamientos nocturnos en el Estadio Sebasti\xE1n Gaete.",
        content: "Con miras al Torneo Regional de Selecciones ANFA Biob\xEDo 2026, la Asociaci\xF3n de F\xFAtbol de Arauco comenz\xF3 los trabajos f\xEDsicos y t\xE1cticos. Los entrenamientos se desarrollar\xE1n los d\xEDas martes y jueves con indumentaria oficial entregada por la asociaci\xF3n.",
        tags: ["Selecci\xF3n Arauco", "Sub-15", "Biob\xEDo 2026"]
      },
      {
        id: "news-03",
        title: "Tribunal de Penas emite Acta N\xBA 7: Resoluciones y sanciones de la \xFAltima jornada",
        category: "Tribunal & Disciplina",
        categoryBadge: "\u2696\uFE0F FALLOS DISCIPLINARIOS",
        date: "20 Septiembre",
        readTime: "4 min de lectura",
        author: "Tribunal de Honor y Disciplina",
        hero: false,
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
        excerpt: "En sesi\xF3n ordinaria en la sede institucional de Julio Montt, el tribunal resolvi\xF3 las amonestaciones del Art\xEDculo 42 y suspensiones por acumulaci\xF3n de tarjetas amarillas.",
        content: "Se recuerda a los delegados de todos los clubes asociados que las multas por tarjetas deben ser canceladas en tesorer\xEDa antes de la programaci\xF3n de la siguiente fecha para no perder puntos por secretar\xEDa.",
        tags: ["Tribunal de Penas", "Reglamento ANFA", "Actas"]
      },
      {
        id: "news-04",
        title: "Hist\xF3rico: ANFA Arauco estrena la plataforma digital LigaPro Evolution con carnets QR y Papeleta T\xE1ctil",
        category: "Institucional",
        categoryBadge: "\u{1F680} INNOVACI\xD3N DEPORTIVA",
        date: "18 Septiembre",
        readTime: "3 min de lectura",
        author: "Mesa Directiva Comunal",
        hero: false,
        image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        excerpt: "La asociaci\xF3n local da el salto tecnol\xF3gico al abandonar las planillas f\xEDsicas de papel y adoptar el nuevo sistema digital de transmisi\xF3n en vivo y control de turno.",
        content: "A trav\xE9s de esta plataforma, hinchas, \xE1rbitros y dirigentes pueden seguir los partidos en simult\xE1neo, revisar fichas de jugadores validadas y asegurar la transparencia total en la tabla de posiciones.",
        tags: ["LigaPro Evolution", "Tecnolog\xEDa", "F\xFAtbol Amateur"]
      }
    ],
    /**
     * Galería Multimedia Oficial: Fotos en Alta Resolución y Videos de Goles
     */
    mediaGallery: {
      photos: [
        {
          id: "photo-01",
          title: "Celebraci\xF3n del gol ag\xF3nico en el Ram\xF3n Burgos",
          match: "C.D. Jorge Robledo vs C.D. Brisas del Mar",
          date: "Fecha 8 \u2022 Serie de Honor",
          venue: "Estadio Municipal Ram\xF3n Burgos",
          author: "Prensa Arauco",
          url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "photo-02",
          title: "La hinchada de Tubul copando el sector de grader\xEDas con lienzos",
          match: "C.D. Brisas del Mar",
          date: "Fecha 8 \u2022 Serie de Honor",
          venue: "Estadio Municipal Ram\xF3n Burgos",
          author: "Prensa Arauco",
          url: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "photo-03",
          title: "F\xE9rrea disputa a\xE9rea en el mediocampo del Sebasti\xE1n Gaete",
          match: "C.D. Celulosa vs C.D. Arauco",
          date: "Fecha 8 \u2022 Segunda Adulta",
          venue: "Estadio Sebasti\xE1n Gaete",
          author: "Prensa Arauco",
          url: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80"
        },
        {
          id: "photo-04",
          title: "Sorteo protocolar de capitanes junto al \xE1rbitro oficial CAPA",
          match: "Protocolo Fair Play ANFA",
          date: "Fecha 8 \u2022 Serie de Honor",
          venue: "Estadio Ram\xF3n Burgos",
          author: "Prensa Arauco",
          url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
        }
      ],
      videos: [
        {
          id: "vid-01",
          title: "\xA1GOLAZO de tiro libre al \xE1ngulo de Mauricio Neira (Robledo)!",
          category: "Gol de la Fecha",
          duration: "0:45",
          views: "1.8K reproducciones",
          thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          description: "Remate imparable desde 28 metros que dej\xF3 sin opciones al arquero rival."
        },
        {
          id: "vid-02",
          title: "Penal atajado en el minuto 89 que desat\xF3 la euforia en Tubul",
          category: "Atajada Clave",
          duration: "1:15",
          views: "1.2K reproducciones",
          thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          description: "Gran estirada hacia la derecha para mantener la ventaja en el cl\xE1sico."
        },
        {
          id: "vid-03",
          title: "Festejo en camarines y c\xE1nticos de la Selecci\xF3n Sub-15",
          category: "Backstage Comunal",
          duration: "0:50",
          views: "2.4K reproducciones",
          thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          description: "La alegr\xEDa de los j\xF3venes de Arauco tras su primera victoria preparatoria."
        }
      ]
    }
  };
  var REGIONS_AND_LEAGUES = [
    {
      regionId: "biobio",
      regionName: "Regi\xF3n del Biob\xEDo",
      leagues: [
        {
          id: "arauco",
          name: "Asociaci\xF3n de F\xFAtbol de Arauco",
          shortName: "AFA Arauco",
          badgeId: "asociacion-arauco",
          commune: "Arauco (Costa Hist\xF3rica)",
          founded: "01 de octubre de 1940 (86 a\xF1os)",
          president: "Claudio Pampaloni Altamirano",
          totalClubs: 10,
          status: "active",
          statusLabel: "Campeonato Oficial 2026/27",
          isDemo: false
        },
        {
          id: "lebu",
          name: "Asociaci\xF3n de F\xFAtbol de Lebu",
          shortName: "ANFA Lebu",
          badgeId: "asociacion-lebu",
          commune: "Lebu (Capital Provincial)",
          founded: "15 de mayo de 1948 (78 a\xF1os)",
          president: "Manuel Cuevas Saavedra",
          totalClubs: 8,
          status: "demo",
          statusLabel: "Demostraci\xF3n de Liga",
          isDemo: true
        },
        {
          id: "canete",
          name: "Asociaci\xF3n de F\xFAtbol de Ca\xF1ete",
          shortName: "ANFA Ca\xF1ete",
          badgeId: "asociacion-canete",
          commune: "Ca\xF1ete (Tierra Hist\xF3rica)",
          founded: "12 de octubre de 1955 (71 a\xF1os)",
          president: "H\xE9ctor Maldonado Viveros",
          totalClubs: 8,
          status: "demo",
          statusLabel: "Demostraci\xF3n de Liga",
          isDemo: true
        }
      ]
    },
    {
      regionId: "metropolitana",
      regionName: "Regi\xF3n Metropolitana",
      leagues: [
        {
          id: "cordillera",
          name: "Liga Cordillera Santiago",
          shortName: "Liga Cordillera",
          badgeId: "asociacion-cordillera",
          commune: "Santiago Oriente",
          founded: "18 de marzo de 1994 (32 a\xF1os)",
          president: "Gonzalo Vald\xE9s Rivas",
          totalClubs: 8,
          status: "demo",
          statusLabel: "Demostraci\xF3n de Liga",
          isDemo: true
        }
      ]
    }
  ];
  var MULTI_LEAGUE_STORE = {
    arauco: INITIAL_DATA,
    lebu: {
      leagueInfo: {
        name: "Asociaci\xF3n de F\xFAtbol de Lebu",
        shortName: "ANFA Lebu",
        leagueId: "lebu",
        badgeId: "asociacion-lebu",
        foundationDate: "15 de mayo de 1948 (78 a\xF1os)",
        anniversary: "Fundada el 15 de mayo de 1948. Asociaci\xF3n decana provincial del puerto pesquero y carbon\xEDfero de Lebu.",
        president: "Manuel Cuevas Saavedra",
        mediaPartner: "Transmisiones Puerto Lebu & Radio Lebu Deportes",
        commune: "Lebu (Capital Provincial de Arauco)",
        headquarters: "Sector Boca Lebu / Calle Latorre N\xBA 210, Lebu",
        season: "Campeonato Oficial 2026/27",
        activeSeries: "honor",
        totalClubs: 8,
        isDemo: true,
        demoNotice: "Entorno de demostraci\xF3n para incorporaci\xF3n de ANFA Lebu a LigaMaster",
        governingBodies: {
          regional: "ANFA Regi\xF3n del Biob\xEDo",
          national: "Asociaci\xF3n Nacional de F\xFAtbol Amateur (ANFA Chile)",
          referees: "Cuerpo de \xC1rbitros ANFA Lebu",
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
          surface: "Pasto Sint\xE9tico Certificado",
          surfaceType: "sintetico",
          lighting: "Iluminaci\xF3n Artificial LED",
          capacity: "3.000 espectadores",
          address: "Calle Mackay s/n, Lebu",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada (Cancha Principal)",
          usageNotes: "Principal recinto del puerto provincial. Alberga los compromisos dominicales de Honor y Senior.",
          photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico", "Iluminaci\xF3n LED", "Grader\xEDas Techadas", "Camarines Oficiales"]
        },
        {
          id: "cancha-boca-lebu",
          name: "Cancha Boca Lebu",
          shortName: "Cancha Boca Lebu",
          commune: "Lebu",
          surface: "Pasto Sint\xE9tico de Alto Tr\xE1fico",
          surfaceType: "sintetico",
          lighting: "Torres Perimetrales",
          capacity: "1.200 espectadores",
          address: "Sector Puerto / Caleta Pesquera, Lebu",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada",
          usageNotes: "Emplazada en la desembocadura del R\xEDo Lebu, tradicional sede de las series Segunda y Juvenil.",
          photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico", "Entorno Costero", "Camarines"]
        }
      ],
      regulations: {
        code: "REGLAMENTO-ANFA-LEBU-2026",
        disciplinaryCode: "C\xF3digo de Procedimientos y Penalidades ANFA Nacional",
        substitutionRule: "M\xE1ximo 5 sustituciones en 3 ventanas reglamentarias.",
        cardRules: { yellowAccumulation: 5, yellowWarning: 4, doubleYellow: 1, directRed: "2 a 4 fechas" },
        cupQualification: { regional: "Copa de Campeones ANFA Biob\xEDo" }
      },
      seriesList: [
        { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
        { id: "senior_35", name: "Serie Senior (35+ A\xF1os)", shortName: "Senior 35", ageLimit: "35 a\xF1os cumplidos", halfDuration: 40, active: false },
        { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil", ageLimit: "Menores de 17 a\xF1os", halfDuration: 40, active: false }
      ],
      clubs: [
        {
          id: "club-lebu-penarol",
          name: "C.D. Pe\xF1arol de Lebu",
          shortName: "Pe\xF1arol Lebu",
          badgeId: "club-lebu-penarol",
          founded: "12 de octubre de 1947",
          exactFoundationDate: "12 de octubre de 1947",
          stadium: "Estadio Municipal de Lebu",
          neighborhood: "Sector Cerro La Cruz, Lebu",
          titlesComunalesHonor: 9,
          colors: "Amarillo y Negro",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Instituci\xF3n aurinegra de gran arraigo popular en el puerto de Lebu. Nueve veces monarca comunal de Primera Adulta."
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
          regionalRecord: "El club decano de la comuna de Lebu, fundado en 1938 con rica tradici\xF3n y 8 t\xEDtulos comunales."
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
          regionalRecord: "Nacido del gremio de pescadores artesanales del R\xEDo Lebu. Gran potencia f\xEDsica y local\xEDa inexpugnable."
        },
        {
          id: "club-lebu-carbon",
          name: "C.D. Carbon\xEDfero Lebu",
          shortName: "Carbon\xEDfero",
          badgeId: "club-lebu-carbon",
          founded: "21 de mayo de 1942",
          exactFoundationDate: "21 de mayo de 1942",
          stadium: "Estadio Municipal de Lebu",
          neighborhood: "Sector Mina Fortuna, Lebu",
          titlesComunalesHonor: 7,
          colors: "Negro Carb\xF3n y \xC1mbar",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Heredero de la epopeya obrera minera de Lebu. S\xEDmbolo del coraje del carb\xF3n con siete campeonatos oficiales."
        },
        {
          id: "club-lebu-esmeralda",
          name: "C.D. Esmeralda",
          shortName: "Esmeralda",
          badgeId: "club-lebu-esmeralda",
          founded: "19 de noviembre de 1952",
          exactFoundationDate: "19 de noviembre de 1952",
          stadium: "Estadio Municipal de Lebu",
          neighborhood: "Poblaci\xF3n Esmeralda, Lebu",
          titlesComunalesHonor: 5,
          colors: "Verde Esmeralda y Blanco",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Representante cl\xE1sico del f\xFAtbol barrial lebulense y reconocido semillero formativo de divisiones inferiores."
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
          regionalRecord: "Fuerte identidad mar\xEDtima ligada al extenso litoral lebulense y destacada presencia en series adultas."
        },
        {
          id: "club-lebu-leones",
          name: "C.D. Los Leones de Lebu",
          shortName: "Los Leones",
          badgeId: "club-lebu-leones",
          founded: "30 de agosto de 1982",
          exactFoundationDate: "30 de agosto de 1982",
          stadium: "Estadio Municipal de Lebu",
          neighborhood: "Poblaci\xF3n Santa Fe, Lebu",
          titlesComunalesHonor: 3,
          colors: "Naranjo y Negro",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Elenco fundado en la d\xE9cada de los ochenta con gran arrastre juvenil y un tricampeonato de honor."
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
          regionalRecord: "Tradici\xF3n popular en el sector alto de la ciudad, con 5 t\xEDtulos comunales y constante animaci\xF3n de la tabla."
        }
      ],
      players: [
        {
          id: "p-lebu-1",
          name: "\xC1lvaro Riquelme Neira",
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
          name: "Cristi\xE1n Alarc\xF3n Pe\xF1a",
          clubId: "club-lebu-victoria",
          series: "honor",
          number: 10,
          position: "Volante de Creaci\xF3n",
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
          name: "Juan Pablo Bast\xEDas",
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
          name: "Mat\xEDas Saavedra Fierro",
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
          round: "Fecha 7 \u2022 Cl\xE1sico del Puerto de Lebu",
          homeClubId: "club-lebu-penarol",
          awayClubId: "club-lebu-victoria",
          venue: "Estadio Municipal de Lebu",
          date: "Hoy \u2022 16:30 hrs",
          status: "en_vivo",
          currentMinute: 38,
          half: 1,
          homeScore: 2,
          awayScore: 1,
          referee: "Marcos Retamal (Cuerpo ANFA Lebu)",
          events: [
            { type: "gol", minute: 12, playerName: "\xC1lvaro Riquelme", teamId: "club-lebu-penarol", description: "Cabezazo al segundo palo tras tiro de esquina" },
            { type: "gol", minute: 26, playerName: "Cristi\xE1n Alarc\xF3n", teamId: "club-lebu-victoria", description: "Tiro libre directo al \xE1ngulo superior" },
            { type: "gol", minute: 35, playerName: "Diego Neira", teamId: "club-lebu-penarol", description: "Remate cruzado tras pase filtrado" }
          ],
          signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
        },
        {
          id: "match-lebu-02",
          series: "honor",
          round: "Fecha 7 \u2022 Duelo Costero",
          homeClubId: "club-lebu-pesquero",
          awayClubId: "club-lebu-carbon",
          venue: "Cancha Boca Lebu",
          date: "Hoy \u2022 14:00 hrs",
          status: "finalizado",
          currentMinute: 90,
          half: 2,
          homeScore: 2,
          awayScore: 1,
          referee: "Gonzalo Riffo (ANFA Lebu)",
          events: [
            { type: "gol", minute: 18, playerName: "Juan Pablo Bast\xEDas", teamId: "club-lebu-pesquero", description: "Remate colocado desde el borde del \xE1rea" },
            { type: "gol", minute: 55, playerName: "Mat\xEDas Saavedra", teamId: "club-lebu-carbon", description: "Tiro penal" },
            { type: "gol", minute: 82, playerName: "Juan Pablo Bast\xEDas", teamId: "club-lebu-pesquero", description: "Definici\xF3n cruzada ante salida del arquero" }
          ],
          signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: true }
        },
        {
          id: "match-lebu-03",
          series: "honor",
          round: "Fecha 8 \u2022 Oficial",
          homeClubId: "club-lebu-esmeralda",
          awayClubId: "club-lebu-playa",
          venue: "Estadio Municipal de Lebu",
          date: "Domingo \u2022 15:00 hrs",
          status: "programado",
          currentMinute: 0,
          half: 1,
          homeScore: 0,
          awayScore: 0,
          referee: "Por designar (Colegio de \xC1rbitros)",
          events: [],
          signatures: { homeCaptainConfirmed: false, awayCaptainConfirmed: false, refereeConfirmed: false }
        },
        {
          id: "match-lebu-04",
          series: "honor",
          round: "Fecha 8 \u2022 Oficial",
          homeClubId: "club-lebu-leones",
          awayClubId: "club-lebu-colocolo",
          venue: "Estadio Municipal de Lebu",
          date: "Domingo \u2022 17:00 hrs",
          status: "programado",
          currentMinute: 0,
          half: 1,
          homeScore: 0,
          awayScore: 0,
          referee: "Por designar (Colegio de \xC1rbitros)",
          events: [],
          signatures: { homeCaptainConfirmed: false, awayCaptainConfirmed: false, refereeConfirmed: false }
        }
      ],
      standings: {
        honor: [
          { pos: 1, clubId: "club-lebu-penarol", clubName: "C.D. Pe\xF1arol de Lebu", pj: 7, pg: 5, pe: 1, pp: 1, gf: 16, gc: 7, dg: 9, pts: 16 },
          { pos: 2, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 7, pg: 4, pe: 2, pp: 1, gf: 14, gc: 8, dg: 6, pts: 14 },
          { pos: 3, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 7, pg: 4, pe: 1, pp: 2, gf: 13, gc: 9, dg: 4, pts: 13 },
          { pos: 4, clubId: "club-lebu-carbon", clubName: "C.D. Carbon\xEDfero Lebu", pj: 7, pg: 3, pe: 2, pp: 2, gf: 11, gc: 10, dg: 1, pts: 11 },
          { pos: 5, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 7, pg: 2, pe: 3, pp: 2, gf: 9, gc: 9, dg: 0, pts: 9 },
          { pos: 6, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 7, pg: 2, pe: 1, pp: 4, gf: 8, gc: 12, dg: -4, pts: 7 },
          { pos: 7, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 7, pg: 1, pe: 3, pp: 3, gf: 7, gc: 12, dg: -5, pts: 6 },
          { pos: 8, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 7, pg: 1, pe: 1, pp: 5, gf: 6, gc: 17, dg: -11, pts: 4 }
        ],
        senior_35: [
          { pos: 1, clubId: "club-lebu-carbon", clubName: "C.D. Carbon\xEDfero Lebu", pj: 6, pg: 5, pe: 1, pp: 0, gf: 15, gc: 4, dg: 11, pts: 16 },
          { pos: 2, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 6, pg: 4, pe: 1, pp: 1, gf: 12, gc: 6, dg: 6, pts: 13 },
          { pos: 3, clubId: "club-lebu-penarol", clubName: "C.D. Pe\xF1arol de Lebu", pj: 6, pg: 3, pe: 2, pp: 1, gf: 10, gc: 7, dg: 3, pts: 11 },
          { pos: 4, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 6, pg: 2, pe: 2, pp: 2, gf: 9, gc: 9, dg: 0, pts: 8 },
          { pos: 5, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 6, pg: 2, pe: 1, pp: 3, gf: 7, gc: 10, dg: -3, pts: 7 },
          { pos: 6, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 6, pg: 1, pe: 2, pp: 3, gf: 6, gc: 11, dg: -5, pts: 5 },
          { pos: 7, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 6, pg: 1, pe: 1, pp: 4, gf: 5, gc: 12, dg: -7, pts: 4 },
          { pos: 8, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 6, pg: 0, pe: 2, pp: 4, gf: 4, gc: 13, dg: -9, pts: 2 }
        ],
        juvenil: [
          { pos: 1, clubId: "club-lebu-penarol", clubName: "C.D. Pe\xF1arol de Lebu", pj: 5, pg: 4, pe: 1, pp: 0, gf: 14, gc: 3, dg: 11, pts: 13 },
          { pos: 2, clubId: "club-lebu-esmeralda", clubName: "C.D. Esmeralda", pj: 5, pg: 3, pe: 2, pp: 0, gf: 11, gc: 4, dg: 7, pts: 11 },
          { pos: 3, clubId: "club-lebu-pesquero", clubName: "C.D. Pesquero Lebu", pj: 5, pg: 3, pe: 0, pp: 2, gf: 9, gc: 7, dg: 2, pts: 9 },
          { pos: 4, clubId: "club-lebu-victoria", clubName: "C.D. Victoria de Lebu", pj: 5, pg: 2, pe: 1, pp: 2, gf: 8, gc: 8, dg: 0, pts: 7 },
          { pos: 5, clubId: "club-lebu-carbon", clubName: "C.D. Carbon\xEDfero Lebu", pj: 5, pg: 2, pe: 0, pp: 3, gf: 7, gc: 9, dg: -2, pts: 6 },
          { pos: 6, clubId: "club-lebu-playa", clubName: "C.D. Playa Grande", pj: 5, pg: 1, pe: 1, pp: 3, gf: 5, gc: 10, dg: -5, pts: 4 },
          { pos: 7, clubId: "club-lebu-colocolo", clubName: "C.D. Colo-Colo Lebu", pj: 5, pg: 1, pe: 0, pp: 4, gf: 4, gc: 12, dg: -8, pts: 3 },
          { pos: 8, clubId: "club-lebu-leones", clubName: "C.D. Los Leones de Lebu", pj: 5, pg: 0, pe: 1, pp: 4, gf: 3, gc: 13, dg: -10, pts: 1 }
        ]
      },
      news: [
        {
          id: "news-lebu-01",
          title: "Vibrante Cl\xE1sico del Puerto: Pe\xF1arol y Victoria disputan la cima de Honor",
          category: "Torneo Oficial",
          categoryBadge: "\u26BD CL\xC1SICO PORTUARIO",
          date: "02 de Octubre, 2026",
          readTime: "3 min de lectura",
          author: "Prensa ANFA Lebu",
          hero: true,
          image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
          excerpt: "Con lleno absoluto en las grader\xEDas del Estadio Municipal de Lebu, el choque aurinegro y albirrojo enciende la s\xE9ptima fecha oficial.",
          content: "El cl\xE1sico m\xE1s esperado del f\xFAtbol lebulense convoc\xF3 a m\xE1s de 1.800 fan\xE1ticos en el Estadio Municipal. Pe\xF1arol se puso en ventaja temprana, pero Victoria contest\xF3 con un golazo de tiro libre antes del descanso.",
          tags: ["ANFA Lebu", "Cl\xE1sico del Puerto", "Serie de Honor"]
        },
        {
          id: "news-lebu-02",
          title: "ANFA Lebu proyecta modernizaci\xF3n de camarines y luminarias en Cancha Boca Lebu",
          category: "Infraestructura",
          categoryBadge: "\u{1F3D7}\uFE0F OBRAS Y MEJORAS",
          date: "28 de Septiembre, 2026",
          readTime: "2 min de lectura",
          author: "Directiva Comunal",
          hero: false,
          image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80",
          excerpt: "Comit\xE9 directivo comunal gestiona recursos para optimizar las instalaciones del tradicional recinto pesquero costero.",
          content: "Con miras a la temporada 2027, la Asociaci\xF3n de F\xFAtbol de Lebu present\xF3 el expediente t\xE9cnico para la renovaci\xF3n integral del sistema de iluminaci\xF3n de la Cancha Boca Lebu.",
          tags: ["Lebu", "Cancha Boca Lebu", "Infraestructura"]
        }
      ],
      mediaGallery: {
        photos: [
          {
            id: "photo-lebu-01",
            title: "Postal del Cl\xE1sico en el Municipal de Lebu",
            match: "Pe\xF1arol vs Victoria",
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
        name: "Asociaci\xF3n de F\xFAtbol de Ca\xF1ete",
        shortName: "ANFA Ca\xF1ete",
        leagueId: "canete",
        badgeId: "asociacion-canete",
        foundationDate: "12 de octubre de 1955 (71 a\xF1os)",
        anniversary: "Fundada el 12 de octubre de 1955. Asociaci\xF3n hist\xF3rica de la Provincia de Arauco en el cono sur del Biob\xEDo.",
        president: "H\xE9ctor Maldonado Viveros",
        mediaPartner: "Ca\xF1ete Deportes Digital",
        commune: "Ca\xF1ete (Tierra Hist\xF3rica)",
        headquarters: "Avenida Saavedra / Pasaje Los Notros, Ca\xF1ete",
        season: "Campeonato Oficial 2026/27",
        activeSeries: "honor",
        totalClubs: 8,
        isDemo: true,
        demoNotice: "Entorno de demostraci\xF3n para incorporaci\xF3n de ANFA Ca\xF1ete a LigaMaster",
        governingBodies: {
          regional: "ANFA Regi\xF3n del Biob\xEDo",
          national: "Asociaci\xF3n Nacional de F\xFAtbol Amateur (ANFA Chile)",
          referees: "Cuerpo Arbitral Comunal de Ca\xF1ete",
          broadcast: "Ca\xF1ete Deportes Digital"
        },
        activeMatchId: "match-canete-01"
      },
      venues: [
        {
          id: "estadio-fiscal-canete",
          name: "Estadio Fiscal de Ca\xF1ete",
          shortName: "Estadio Fiscal",
          commune: "Ca\xF1ete",
          surface: "Pasto Sint\xE9tico FIFA Quality",
          surfaceType: "sintetico",
          lighting: "Iluminaci\xF3n Artificial LED",
          capacity: "2.800 espectadores",
          address: "Calle Saavedra s/n, Ca\xF1ete",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada (Cancha Principal)",
          usageNotes: "Principal reducto comunal con certificaci\xF3n de pasto sint\xE9tico de alto rendimiento.",
          photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico FIFA", "Iluminaci\xF3n LED", "Grader\xEDas Techadas"]
        },
        {
          id: "cancha-caupolican",
          name: "Cancha Complejo Deportivo Caupolic\xE1n",
          shortName: "Cancha Caupolic\xE1n",
          commune: "Ca\xF1ete",
          surface: "Pasto Sint\xE9tico",
          surfaceType: "sintetico",
          lighting: "Torres Perimetrales",
          capacity: "1.000 espectadores",
          address: "Sector Barrio Norte, Ca\xF1ete",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada",
          usageNotes: "Sede de campeonatos infantiles y series senior comunales.",
          photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico", "Camarines"]
        }
      ],
      regulations: {
        code: "REGLAMENTO-ANFA-CANETE-2026",
        disciplinaryCode: "C\xF3digo de Procedimientos y Penalidades ANFA",
        substitutionRule: "5 sustituciones por elenco en 3 ventanas reglamentarias.",
        cardRules: { yellowAccumulation: 5, yellowWarning: 4, doubleYellow: 1, directRed: "2 a 4 fechas" },
        cupQualification: { regional: "Copa de Campeones ANFA Biob\xEDo" }
      },
      seriesList: [
        { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
        { id: "senior_35", name: "Serie Senior (35+ A\xF1os)", shortName: "Senior 35", ageLimit: "35 a\xF1os cumplidos", halfDuration: 40, active: false },
        { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil", ageLimit: "Menores de 17 a\xF1os", halfDuration: 40, active: false }
      ],
      clubs: [
        {
          id: "club-canete-alianza",
          name: "C.D. Alianza de Ca\xF1ete",
          shortName: "Alianza Ca\xF1ete",
          badgeId: "club-canete-alianza",
          founded: "18 de septiembre de 1945",
          exactFoundationDate: "18 de septiembre de 1945",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Sector Centro, Ca\xF1ete",
          titlesComunalesHonor: 11,
          colors: "Azul y Blanco",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "El club m\xE1s laureado en la historia de ANFA Ca\xF1ete con 11 estrellas de Primera Adulta."
        },
        {
          id: "club-canete-juvenil",
          name: "C.D. Juvenil Ca\xF1ete",
          shortName: "Juvenil Ca\xF1ete",
          badgeId: "club-canete-juvenil",
          founded: "15 de julio de 1956",
          exactFoundationDate: "15 de julio de 1956",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Poblaci\xF3n La Granja",
          titlesComunalesHonor: 8,
          colors: "Verde y Blanco",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Instituci\xF3n de gran tradici\xF3n formativa y constante protagonista de liguillas finales."
        },
        {
          id: "club-canete-caupolican",
          name: "C.D. Caupolic\xE1n de Ca\xF1ete",
          shortName: "Caupolic\xE1n",
          badgeId: "club-canete-caupolican",
          founded: "22 de agosto de 1963",
          exactFoundationDate: "22 de agosto de 1963",
          stadium: "Cancha Caupolic\xE1n",
          neighborhood: "Barrio Norte, Ca\xF1ete",
          titlesComunalesHonor: 7,
          colors: "Rojo Furia",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Heredero de la bravura hist\xF3rica ca\xF1etina, reconocido por su aguerrido estilo de juego."
        },
        {
          id: "club-canete-tucapel",
          name: "C.D. Tucapel Ca\xF1ete",
          shortName: "Tucapel",
          badgeId: "club-canete-tucapel",
          founded: "12 de marzo de 1959",
          exactFoundationDate: "12 de marzo de 1959",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Sector Fuerte Tucapel",
          titlesComunalesHonor: 6,
          colors: "Verde Bosque y Blanco",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Club hist\xF3rico ligado al patrimonio del hist\xF3rico Fuerte Tucapel y gran animador comarcal."
        },
        {
          id: "club-canete-lagranja",
          name: "C.D. La Granja",
          shortName: "La Granja",
          badgeId: "club-canete-lagranja",
          founded: "4 de octubre de 1978",
          exactFoundationDate: "4 de octubre de 1978",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Villa La Granja",
          titlesComunalesHonor: 4,
          colors: "Amarillo Dorado",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Representante de los sectores agr\xEDcolas y residenciales del oriente comunal."
        },
        {
          id: "club-canete-lautaro",
          name: "C.D. Lautaro de Ca\xF1ete",
          shortName: "Lautaro",
          badgeId: "club-canete-lautaro",
          founded: "14 de enero de 1968",
          exactFoundationDate: "14 de enero de 1968",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Sector Cayucupil, Ca\xF1ete",
          titlesComunalesHonor: 5,
          colors: "Azul Marino",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Emblema del valle de Cayucupil con s\xF3lida hinchada rural y t\xEDtulos en series mayores."
        },
        {
          id: "club-canete-ferro",
          name: "C.D. Ferroviario Ca\xF1ete",
          shortName: "Ferroviario",
          badgeId: "club-canete-ferro",
          founded: "19 de noviembre de 1952",
          exactFoundationDate: "19 de noviembre de 1952",
          stadium: "Estadio Fiscal de Ca\xF1ete",
          neighborhood: "Sector Antigua Estaci\xF3n",
          titlesComunalesHonor: 5,
          colors: "Negro y Blanco",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Heredero de la \xE9poca del ferrocarril a Lebu y Ca\xF1ete. Fuerte identidad gremial ferroviaria."
        },
        {
          id: "club-canete-galvarino",
          name: "C.D. Galvarino",
          shortName: "Galvarino",
          badgeId: "club-canete-galvarino",
          founded: "7 de junio de 1971",
          exactFoundationDate: "7 de junio de 1971",
          stadium: "Cancha Caupolic\xE1n",
          neighborhood: "Poblaci\xF3n Galvarino",
          titlesComunalesHonor: 3,
          colors: "Blanco y Granate",
          series: ["honor", "senior_35", "juvenil"],
          regionalRecord: "Club de fuerte vocaci\xF3n social y destacada participaci\xF3n en series de f\xFAtbol infantil."
        }
      ],
      players: [
        {
          id: "p-canete-1",
          name: "Mauricio Linco Huenchull\xE1n",
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
          name: "Rodrigo Millanao S\xE1ez",
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
          name: "Javier Huenchull\xE1n Alvear",
          clubId: "club-canete-caupolican",
          series: "honor",
          number: 8,
          position: "Volante de Contenci\xF3n",
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
          round: "Fecha 7 \u2022 Torneo Oficial ANFA Ca\xF1ete",
          homeClubId: "club-canete-alianza",
          awayClubId: "club-canete-juvenil",
          venue: "Estadio Fiscal de Ca\xF1ete",
          date: "Hoy \u2022 16:30 hrs",
          status: "en_vivo",
          currentMinute: 55,
          half: 2,
          homeScore: 1,
          awayScore: 0,
          referee: "Javier Bast\xEDas (\xC1rbitros ANFA)",
          events: [
            { type: "gol", minute: 41, playerName: "Mauricio Linco", teamId: "club-canete-alianza", description: "Definici\xF3n mano a mano tras tiro libre r\xE1pido" }
          ],
          signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: false, refereeConfirmed: false }
        },
        {
          id: "match-canete-02",
          series: "honor",
          round: "Fecha 7 \u2022 Oficial",
          homeClubId: "club-canete-caupolican",
          awayClubId: "club-canete-tucapel",
          venue: "Cancha Caupolic\xE1n",
          date: "Hoy \u2022 14:30 hrs",
          status: "finalizado",
          currentMinute: 90,
          half: 2,
          homeScore: 3,
          awayScore: 2,
          referee: "Patricio Alarc\xF3n",
          events: [
            { type: "gol", minute: 15, playerName: "Javier Huenchull\xE1n", teamId: "club-canete-caupolican", description: "Tiro libre potente" },
            { type: "gol", minute: 34, playerName: "Esteban Leviqueo", teamId: "club-canete-tucapel", description: "Remate cruzado" },
            { type: "gol", minute: 68, playerName: "Javier Huenchull\xE1n", teamId: "club-canete-caupolican", description: "Cabezazo al \xE1ngulo" }
          ],
          signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: true }
        },
        {
          id: "match-canete-03",
          series: "honor",
          round: "Fecha 8 \u2022 Oficial",
          homeClubId: "club-canete-lagranja",
          awayClubId: "club-canete-lautaro",
          venue: "Estadio Fiscal de Ca\xF1ete",
          date: "Domingo \u2022 15:30 hrs",
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
          { pos: 1, clubId: "club-canete-alianza", clubName: "C.D. Alianza de Ca\xF1ete", pj: 7, pg: 6, pe: 1, pp: 0, gf: 18, gc: 5, dg: 13, pts: 19 },
          { pos: 2, clubId: "club-canete-caupolican", clubName: "C.D. Caupolic\xE1n de Ca\xF1ete", pj: 7, pg: 5, pe: 0, pp: 2, gf: 15, gc: 9, dg: 6, pts: 15 },
          { pos: 3, clubId: "club-canete-juvenil", clubName: "C.D. Juvenil Ca\xF1ete", pj: 7, pg: 4, pe: 1, pp: 2, gf: 13, gc: 8, dg: 5, pts: 13 },
          { pos: 4, clubId: "club-canete-tucapel", clubName: "C.D. Tucapel Ca\xF1ete", pj: 7, pg: 3, pe: 2, pp: 2, gf: 12, gc: 11, dg: 1, pts: 11 },
          { pos: 5, clubId: "club-canete-lautaro", clubName: "C.D. Lautaro de Ca\xF1ete", pj: 7, pg: 3, pe: 1, pp: 3, gf: 10, gc: 11, dg: -1, pts: 10 },
          { pos: 6, clubId: "club-canete-lagranja", clubName: "C.D. La Granja", pj: 7, pg: 2, pe: 1, pp: 4, gf: 8, gc: 14, dg: -6, pts: 7 },
          { pos: 7, clubId: "club-canete-ferro", clubName: "C.D. Ferroviario Ca\xF1ete", pj: 7, pg: 1, pe: 1, pp: 5, gf: 7, gc: 15, dg: -8, pts: 4 },
          { pos: 8, clubId: "club-canete-galvarino", clubName: "C.D. Galvarino", pj: 7, pg: 0, pe: 1, pp: 6, gf: 5, gc: 15, dg: -10, pts: 1 }
        ],
        senior_35: [
          { pos: 1, clubId: "club-canete-alianza", clubName: "C.D. Alianza de Ca\xF1ete", pj: 6, pg: 5, pe: 1, pp: 0, gf: 14, gc: 4, dg: 10, pts: 16 },
          { pos: 2, clubId: "club-canete-juvenil", clubName: "C.D. Juvenil Ca\xF1ete", pj: 6, pg: 4, pe: 1, pp: 1, gf: 11, gc: 6, dg: 5, pts: 13 },
          { pos: 3, clubId: "club-canete-tucapel", clubName: "C.D. Tucapel Ca\xF1ete", pj: 6, pg: 3, pe: 1, pp: 2, gf: 10, gc: 8, dg: 2, pts: 10 },
          { pos: 4, clubId: "club-canete-caupolican", clubName: "C.D. Caupolic\xE1n de Ca\xF1ete", pj: 6, pg: 3, pe: 0, pp: 3, gf: 8, gc: 9, dg: -1, pts: 9 },
          { pos: 5, clubId: "club-canete-lautaro", clubName: "C.D. Lautaro de Ca\xF1ete", pj: 6, pg: 2, pe: 1, pp: 3, gf: 7, gc: 10, dg: -3, pts: 7 },
          { pos: 6, clubId: "club-canete-lagranja", clubName: "C.D. La Granja", pj: 6, pg: 1, pe: 2, pp: 3, gf: 6, gc: 9, dg: -3, pts: 5 },
          { pos: 7, clubId: "club-canete-ferro", clubName: "C.D. Ferroviario Ca\xF1ete", pj: 6, pg: 1, pe: 1, pp: 4, gf: 5, gc: 11, dg: -6, pts: 4 },
          { pos: 8, clubId: "club-canete-galvarino", clubName: "C.D. Galvarino", pj: 6, pg: 0, pe: 1, pp: 5, gf: 3, gc: 12, dg: -9, pts: 1 }
        ]
      },
      news: [
        {
          id: "news-canete-01",
          title: "Alianza de Ca\xF1ete sostiene liderato invicto tras ajustada victoria ante Juvenil",
          category: "Torneo Oficial",
          categoryBadge: "\u{1F3C6} PUNTERO INVICTO",
          date: "02 de Octubre, 2026",
          readTime: "3 min de lectura",
          author: "Prensa Ca\xF1ete Deportes",
          hero: true,
          image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1000&q=80",
          excerpt: "Con solitaria anotaci\xF3n de tiro libre, Alianza super\xF3 a su escolta en el sint\xE9tico del Estadio Fiscal.",
          content: "El cuadro azul y blanco suma 19 unidades en siete fechas disputadas, consolid\xE1ndose como el principal candidato al boleto comunal para la Copa de Campeones ANFA Biob\xEDo 2027.",
          tags: ["ANFA Ca\xF1ete", "Alianza", "Serie de Honor"]
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
        foundationDate: "18 de marzo de 1994 (32 a\xF1os)",
        anniversary: "Fundada el 18 de marzo de 1994. Tradicional torneo amateur del sector oriente de la Regi\xF3n Metropolitana.",
        president: "Gonzalo Vald\xE9s Rivas",
        mediaPartner: "Cordillera TV Streaming & Digital",
        commune: "Santiago Oriente (Las Condes / Lo Barnechea)",
        region: "Regi\xF3n Metropolitana",
        headquarters: "Avenida Las Condes 12400, Santiago",
        season: "Torneo Apertura 2026",
        activeSeries: "honor",
        totalClubs: 8,
        isDemo: true,
        demoNotice: "Entorno de demostraci\xF3n para ligas metropolitanas en LigaMaster",
        governingBodies: {
          regional: "Comit\xE9 de Ligas Independientes de Santiago",
          national: "F\xFAtbol Amateur Federado RM",
          referees: "Asociaci\xF3n Central de \xC1rbitros de Santiago",
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
          surface: "Pasto Sint\xE9tico Pro 60mm",
          surfaceType: "sintetico",
          lighting: "Iluminaci\xF3n Artificial LED",
          capacity: "1.500 espectadores",
          address: "Av. Las Condes 12400, Santiago",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada (Cancha Pro)",
          usageNotes: "Centro neur\xE1lgico del torneo con canchas reglamentarias y tecnolog\xEDa de filmaci\xF3n autom\xE1tica.",
          photo: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico Pro", "Iluminaci\xF3n LED", "Estacionamiento Privado", "C\xE1maras Autom\xE1ticas"]
        },
        {
          id: "estadio-san-carlos-oriente",
          name: "Estadio San Carlos Oriente",
          shortName: "San Carlos Oriente",
          commune: "Santiago Oriente",
          surface: "Pasto Sint\xE9tico",
          surfaceType: "sintetico",
          lighting: "Torres Perimetrales",
          capacity: "1.000 espectadores",
          address: "Sector San Carlos, Las Condes",
          status: "habilitada",
          statusLabel: "\u{1F7E2} Habilitada",
          usageNotes: "Recinto alternativo para duelos simult\xE1neos de fin de semana.",
          photo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
          features: ["Pasto Sint\xE9tico", "Camarines VIP"]
        }
      ],
      regulations: {
        code: "REGLAMENTO-CORDILLERA-2026",
        disciplinaryCode: "C\xF3digo de Procedimientos Liga Cordillera",
        substitutionRule: "Sustituciones libres en tres pausas de juego.",
        cardRules: { yellowAccumulation: 4, yellowWarning: 3, doubleYellow: 1, directRed: "2 fechas" },
        cupQualification: { regional: "Torneo Metropolitano de Campeones" }
      },
      seriesList: [
        { id: "honor", name: "Serie de Honor (Primera Adulta)", shortName: "Honor", ageLimit: "Todo Competidor", halfDuration: 45, active: true },
        { id: "senior_35", name: "Serie Senior (35+ A\xF1os)", shortName: "Senior 35", ageLimit: "35 a\xF1os cumplidos", halfDuration: 40, active: false }
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
          regionalRecord: "Club fundador de la liga y heptacampe\xF3n metropolitano con juego de posesi\xF3n y velocidad."
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
          regionalRecord: "Instituci\xF3n de gran despliegue en torneos de invierno con cinco t\xEDtulos de apertura."
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
          regionalRecord: "Cuatro veces campe\xF3n de honor con un plantel estructurado por experimentados ex universitarios."
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
          regionalRecord: "Elenco reconocido por su s\xF3lida l\xEDnea defensiva y constante presencia en semifinales."
        },
        {
          id: "club-cord-cristobal",
          name: "C.D. San Crist\xF3bal Amateur",
          shortName: "San Crist\xF3bal",
          badgeId: "club-cord-cristobal",
          founded: "15 de enero de 2005",
          exactFoundationDate: "15 de enero de 2005",
          stadium: "Estadio San Carlos Oriente",
          neighborhood: "Providencia / Las Condes",
          titlesComunalesHonor: 3,
          colors: "Naranjo y Negro",
          series: ["honor", "senior_35"],
          regionalRecord: "Instituci\xF3n din\xE1mica con gran afici\xF3n juvenil y tres trofeos en sus vitrinas."
        },
        {
          id: "club-cord-condes",
          name: "C.D. Las Condes Amateur",
          shortName: "Las Condes",
          badgeId: "club-cord-condes",
          founded: "10 de abril de 2001",
          exactFoundationDate: "10 de abril de 2001",
          stadium: "Complejo Deportivo Cordillera",
          neighborhood: "Col\xF3n Oriente",
          titlesComunalesHonor: 4,
          colors: "Azul Marino y Rojo",
          series: ["honor", "senior_35"],
          regionalRecord: "Tradicional animador comunal con destacada participaci\xF3n en series Senior 35."
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
          regionalRecord: "Equipo de r\xE1pida evoluci\xF3n competitiva con 2 coronas de torneo corto."
        },
        {
          id: "club-cord-sanramon",
          name: "C.D. Quebrada San Ram\xF3n",
          shortName: "Quebrada San Ram\xF3n",
          badgeId: "club-cord-sanramon",
          founded: "14 de junio de 2008",
          exactFoundationDate: "14 de junio de 2008",
          stadium: "Complejo Deportivo Cordillera",
          neighborhood: "Precordillera",
          titlesComunalesHonor: 2,
          colors: "Verde Oliva y Negro",
          series: ["honor", "senior_35"],
          regionalRecord: "Fuerte local\xEDa precordillerana y elenco muy combativo en balones detenidos."
        }
      ],
      players: [
        {
          id: "p-cord-1",
          name: "Sebasti\xE1n Larra\xEDn Mackenna",
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
          name: "Nicol\xE1s Echeverr\xEDa Cruz",
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
          name: "Tom\xE1s Mackenna Vald\xE9s",
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
          round: "Fecha 7 \u2022 Cl\xE1sico Cordillera",
          homeClubId: "club-cord-central",
          awayClubId: "club-cord-andes",
          venue: "Complejo Deportivo Cordillera",
          date: "Hoy \u2022 17:00 hrs",
          status: "en_vivo",
          currentMinute: 65,
          half: 2,
          homeScore: 2,
          awayScore: 2,
          referee: "Pablo Henr\xEDquez (Asoc. \xC1rbitros Santiago)",
          events: [
            { type: "gol", minute: 14, playerName: "Sebasti\xE1n Larra\xEDn", teamId: "club-cord-central", description: "Volea desde 25 metros" },
            { type: "gol", minute: 31, playerName: "Nicol\xE1s Echeverr\xEDa", teamId: "club-cord-andes", description: "Anticipo de cabeza" },
            { type: "gol", minute: 48, playerName: "Nicol\xE1s Echeverr\xEDa", teamId: "club-cord-andes", description: "Tiro penal cruzado" },
            { type: "gol", minute: 62, playerName: "Sebasti\xE1n Larra\xEDn", teamId: "club-cord-central", description: "Tiro libre al \xE1ngulo" }
          ],
          signatures: { homeCaptainConfirmed: true, awayCaptainConfirmed: true, refereeConfirmed: false }
        },
        {
          id: "match-cord-02",
          series: "honor",
          round: "Fecha 7 \u2022 Apertura",
          homeClubId: "club-cord-oriente",
          awayClubId: "club-cord-manquehue",
          venue: "Estadio San Carlos Oriente",
          date: "Hoy \u2022 15:00 hrs",
          status: "finalizado",
          currentMinute: 90,
          half: 2,
          homeScore: 1,
          awayScore: 0,
          referee: "Ignacio Soto",
          events: [
            { type: "gol", minute: 73, playerName: "Tom\xE1s Mackenna", teamId: "club-cord-oriente", description: "Zurdazo rasante" }
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
          { pos: 6, clubId: "club-cord-cristobal", clubName: "C.D. San Crist\xF3bal Amateur", pj: 7, pg: 2, pe: 1, pp: 4, gf: 9, gc: 13, dg: -4, pts: 7 },
          { pos: 7, clubId: "club-cord-dehesa", clubName: "C.D. La Dehesa F.C.", pj: 7, pg: 1, pe: 1, pp: 5, gf: 7, gc: 15, dg: -8, pts: 4 },
          { pos: 8, clubId: "club-cord-sanramon", clubName: "C.D. Quebrada San Ram\xF3n", pj: 7, pg: 1, pe: 0, pp: 6, gf: 6, gc: 14, dg: -8, pts: 3 }
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
          title: "Intenso empate en el cl\xE1sico entre Cordillera Central y Andes Santiago",
          category: "Torneo Apertura",
          categoryBadge: "\u26A1 CL\xC1SICO METROPOLITANO",
          date: "02 de Octubre, 2026",
          readTime: "3 min de lectura",
          author: "Prensa Cordillera TV",
          hero: true,
          image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
          excerpt: "Con dos goles de Larra\xEDn y un doblete de Echeverr\xEDa, los punteros igualaron en el Complejo Cordillera.",
          content: "En un partido de ritmo vertiginoso, Central y Andes dividieron puntos ante m\xE1s de 800 asistentes en las canchas de Las Condes.",
          tags: ["Liga Cordillera", "Cl\xE1sico", "Apertura 2026"]
        }
      ],
      mediaGallery: { photos: [], videos: [] }
    }
  };
  var memStorage = /* @__PURE__ */ new Map();
  function safeStorageGet(key) {
    try {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (e) {
    }
    return memStorage.get(key) || null;
  }
  function safeStorageSet(key, value) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
    }
    memStorage.set(key, String(value));
  }
  function getActiveLeagueId() {
    return safeStorageGet("LIGAMASTER_ACTIVE_LEAGUE_ID") || "arauco";
  }
  function setActiveLeagueId(leagueId) {
    safeStorageSet("LIGAMASTER_ACTIVE_LEAGUE_ID", leagueId);
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("ligamaster:league-changed", { detail: leagueId }));
    }
  }
  function getLeagueById(leagueId) {
    for (const reg of REGIONS_AND_LEAGUES) {
      const found = reg.leagues.find((l) => l.id === leagueId);
      if (found) return found;
    }
    return REGIONS_AND_LEAGUES[0].leagues[0];
  }
  function getRegionsAndLeagues() {
    return REGIONS_AND_LEAGUES;
  }
  function getLeagueSeries(leagueId = null) {
    const db = getDb(leagueId);
    return db.seriesList || MULTI_LEAGUE_STORE.arauco.seriesList;
  }
  function getDb(leagueId = null) {
    const targetLeague = leagueId || getActiveLeagueId() || "arauco";
    const storageKey = `LIGAMASTER_LEAGUE_${targetLeague.toUpperCase()}_V1`;
    try {
      const raw = safeStorageGet(storageKey);
      if (raw) {
        return JSON.parse(raw);
      }
      if (targetLeague === "arauco") {
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
    const source = MULTI_LEAGUE_STORE[targetLeague] || MULTI_LEAGUE_STORE.arauco;
    const cloned = JSON.parse(JSON.stringify(source));
    saveDb(cloned, targetLeague);
    return cloned;
  }
  function saveDb(data, leagueId = null) {
    const targetLeague = leagueId || data.leagueInfo && data.leagueInfo.leagueId || getActiveLeagueId() || "arauco";
    const storageKey = `LIGAMASTER_LEAGUE_${targetLeague.toUpperCase()}_V1`;
    try {
      safeStorageSet(storageKey, JSON.stringify(data));
      if (targetLeague === "arauco") {
        safeStorageSet(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error(`Error guardando base de datos de ${targetLeague}`, e);
    }
  }
  function resetDb(leagueId = null) {
    const targetLeague = leagueId || getActiveLeagueId() || "arauco";
    const source = MULTI_LEAGUE_STORE[targetLeague] || MULTI_LEAGUE_STORE.arauco;
    const cloned = JSON.parse(JSON.stringify(source));
    saveDb(cloned, targetLeague);
    return cloned;
  }
  var AVAILABLE_ASSOCIATIONS = REGIONS_AND_LEAGUES.flatMap((r) => r.leagues.map((l) => ({
    id: l.id,
    name: l.name,
    shortName: l.shortName,
    region: r.regionName,
    commune: l.commune,
    headquarters: l.commune,
    badgeEmoji: "\u26BD",
    accentColor: "#e51b24",
    stadium: "Estadio Oficial",
    clubsCount: l.totalClubs,
    tagline: l.statusLabel
  })));

  // js/badges.js
  var CLUB_BADGES_SVG = {
    // 1. ASOCIACIÓN DE FÚTBOL ARAUCO (AFA) / SELECCIÓN COMUNAL
    // Corona mural dorada de 5 almenas, borde verde y rojo, cabeza de toqui mapuche con trarilonco azul/blanco, letras AFA y Arauco
    "asociacion-arauco": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-afa" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="afa-gold-wall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#ca8a04" />
        </linearGradient>
      </defs>
      <!-- Corona Mural de 5 Almenas (Castillo Dorado Comunal) -->
      <path d="M 32 30 L 32 20 L 40 20 L 40 24 L 48 20 L 56 24 L 64 20 L 72 24 L 80 20 L 88 20 L 88 30 Z" fill="url(#afa-gold-wall)" stroke="#a16207" stroke-width="1.5" />
      <line x1="32" y1="28" x2="88" y2="28" stroke="#713f12" stroke-width="1" />
      
      <!-- Escudo Base con borde verde y rojo -->
      <path d="M 34 32 L 86 32 C 86 70 60 88 60 88 C 60 88 34 70 34 32 Z" fill="#ffffff" stroke="#16a34a" stroke-width="3.5" />
      <path d="M 37 34 L 83 34 C 83 68 60 84 60 84 C 60 84 37 68 37 34 Z" fill="#ffffff" stroke="#dc2626" stroke-width="1.8" />
      
      <!-- Texto Superior: Asociaci\xF3n de F\xFAtbol -->
      <text x="60" y="42" font-family="'Inter', sans-serif" font-weight="900" font-size="5" fill="#15803d" text-anchor="middle" letter-spacing="0.2">ASOCIACI\xD3N DE F\xDATBOL</text>
      
      <!-- Cabeza de Guerrero Mapuche de Perfil con Trarilonco Azul y Blanco -->
      <g transform="translate(42, 45) scale(0.38)">
        <!-- Perfil y trarilonco -->
        <path d="M 12 12 Q 22 2 34 10 Q 42 16 45 28 C 45 36 38 42 36 50 C 35 55 28 62 20 64 C 14 62 10 52 14 44 C 18 36 12 28 8 20 Z" fill="#1e3a8a" />
        <path d="M 16 16 Q 25 10 33 16 Q 38 20 40 30 C 40 38 34 42 32 48 Q 28 55 22 57 C 18 55 15 48 18 40 C 22 32 17 24 14 18 Z" fill="#ffffff" />
        <path d="M 22 22 Q 28 18 33 22 Q 36 26 37 34 C 36 40 32 44 30 48 Q 26 52 22 53 Z" fill="#1e3a8a" />
      </g>
      
      <!-- Siglas AFA en azul estilizado a la derecha -->
      <text x="74" y="55" font-family="'Outfit', sans-serif" font-weight="900" font-size="8.5" fill="#1d4ed8" text-anchor="middle" font-style="italic">A</text>
      <text x="74" y="63" font-family="'Outfit', sans-serif" font-weight="900" font-size="8.5" fill="#1d4ed8" text-anchor="middle" font-style="italic">F</text>
      <text x="74" y="71" font-family="'Outfit', sans-serif" font-weight="900" font-size="8.5" fill="#1d4ed8" text-anchor="middle" font-style="italic">A</text>
      
      <!-- Nombre Arauco abajo en rojo -->
      <text x="60" y="80" font-family="'Inter', sans-serif" font-weight="900" font-size="6.5" fill="#dc2626" text-anchor="middle" letter-spacing="0.5">Arauco</text>
    </svg>
  `,
    "seleccion-arauco": (size = 36) => CLUB_BADGES_SVG["asociacion-arauco"](size),
    // 2. CLUB DEPORTIVO PELANTARO (Fundado: 20 de agosto de 1929 - El Decano)
    // Escudo blanco con borde azul marino, jinete Toqui Pelantaro a caballo con lanza
    "club-pelantaro": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-pelantaro" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo base blanco con borde azul -->
      <path d="M 60 12 C 92 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 28 12 60 12 Z" fill="#ffffff" stroke="#1d4ed8" stroke-width="4.5" />
      <path d="M 60 17 C 88 17 100 28 100 56 C 100 85 60 105 60 105 C 60 105 20 85 20 56 C 20 28 32 17 60 17 Z" fill="none" stroke="#93c5fd" stroke-width="1.5" />
      
      <!-- Encabezado PELANTARO -->
      <text x="60" y="32" font-family="'Inter', sans-serif" font-weight="900" font-size="9" fill="#1e3a8a" text-anchor="middle" letter-spacing="0.5">PELANTARO</text>
      
      <!-- Silueta del Guerrero Toqui Pelantaro a caballo con lanza -->
      <g transform="translate(60, 58) scale(0.65)">
        <!-- Caballo al galope en azul -->
        <path d="M -22 14 C -28 10 -30 2 -24 -6 C -18 -12 -8 -10 2 -8 C 12 -6 22 -14 30 -6 C 36 0 32 12 24 16 C 18 20 8 16 0 18 C -8 20 -16 18 -22 14 Z" fill="#1d4ed8" />
        <!-- Patas delanteras y traseras -->
        <path d="M 18 14 L 32 30 L 26 32 L 14 18 Z" fill="#1d4ed8" />
        <path d="M -16 14 L -24 32 L -29 30 L -20 12 Z" fill="#1d4ed8" />
        <!-- Jinete con lanza -->
        <circle cx="2" cy="-14" r="5" fill="#1d4ed8" />
        <path d="M -4 -8 L 8 -6 L 2 6 L -6 4 Z" fill="#1d4ed8" />
        <!-- Lanza inclinada -->
        <line x1="-28" y1="-26" x2="34" y2="12" stroke="#1e3a8a" stroke-width="3" stroke-linecap="round" />
      </g>
      
      <!-- Subt\xEDtulo ARAUCO 1929 -->
      <text x="60" y="90" font-family="'Inter', sans-serif" font-weight="800" font-size="7.5" fill="#1e3a8a" text-anchor="middle">ARAUCO</text>
      <text x="60" y="100" font-family="'Inter', sans-serif" font-weight="800" font-size="7" fill="#64748b" text-anchor="middle">\u2022 1929 \u2022</text>
    </svg>
  `,
    // 3. CLUB DEPORTIVO ARAUCO (Fundado: 1 de enero de 1939)
    // Escudo blanco con borde rojo, 2 leones rampantes rojos sosteniendo balón central
    "club-arauco": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-arauco" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo base blanco con borde rojo carmes\xED -->
      <path d="M 60 12 C 92 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 28 12 60 12 Z" fill="#ffffff" stroke="#dc2626" stroke-width="4.5" />
      
      <!-- Cinta Superior: CLUB DEPORTIVO -->
      <path d="M 28 26 Q 60 30 92 26 L 90 35 Q 60 38 30 35 Z" fill="#dc2626" />
      <text x="60" y="33" font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">CLUB DEPORTIVO</text>
      
      <!-- Dos Leones Rampantes Rojos -->
      <!-- Le\xF3n Izquierdo -->
      <g transform="translate(38, 62) scale(0.48)">
        <path d="M -8 -20 C -2 -24 6 -20 4 -12 C 2 -6 8 0 10 8 C 12 16 6 24 2 30 C -2 36 -10 32 -14 26 C -18 20 -16 12 -12 6 C -8 0 -12 -14 -8 -20 Z" fill="#dc2626" />
        <path d="M 2 -4 L 14 -10 L 12 -4 Z" fill="#dc2626" />
        <path d="M 4 8 L 18 8 L 14 14 Z" fill="#dc2626" />
        <path d="M -6 24 L -16 36 L -10 38 Z" fill="#dc2626" />
      </g>
      <!-- Le\xF3n Derecho -->
      <g transform="translate(82, 62) scale(-0.48, 0.48)">
        <path d="M -8 -20 C -2 -24 6 -20 4 -12 C 2 -6 8 0 10 8 C 12 16 6 24 2 30 C -2 36 -10 32 -14 26 C -18 20 -16 12 -12 6 C -8 0 -12 -14 -8 -20 Z" fill="#dc2626" />
        <path d="M 2 -4 L 14 -10 L 12 -4 Z" fill="#dc2626" />
        <path d="M 4 8 L 18 8 L 14 14 Z" fill="#dc2626" />
        <path d="M -6 24 L -16 36 L -10 38 Z" fill="#dc2626" />
      </g>
      
      <!-- Bal\xF3n de F\xFAtbol Cl\xE1sico en el Centro -->
      <circle cx="60" cy="62" r="9" fill="#ffffff" stroke="#000000" stroke-width="1.2" />
      <polygon points="60,57 64,60 62,64 58,64 56,60" fill="#000000" />
      
      <!-- Texto Inferior ARAUCO -->
      <text x="60" y="88" font-family="'Inter', sans-serif" font-weight="900" font-size="9" fill="#dc2626" text-anchor="middle" letter-spacing="1">ARAUCO</text>
      <text x="60" y="98" font-family="'Inter', sans-serif" font-weight="700" font-size="6.5" fill="#475569" text-anchor="middle">1939</text>
    </svg>
  `,
    // 4. CLUB DEPORTIVO ARTURO PRAT (Fundado: 22 de septiembre de 1952)
    // Escudo circular negro y amarillo/dorado con gran ancla, estrella arriba y balón
    "club-arturo-prat": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-arturo-prat" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prat-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
      </defs>
      <!-- C\xEDrculo Base Negro con Borde Dorado -->
      <circle cx="60" cy="60" r="50" fill="#090d16" stroke="url(#prat-gold)" stroke-width="5" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(234,179,8,0.4)" stroke-width="1" />
      
      <!-- Texto Superior Circular: CLUB DEPORTIVO -->
      <text x="60" y="27" font-family="'Inter', sans-serif" font-weight="800" font-size="6.5" fill="#eab308" text-anchor="middle" letter-spacing="0.5">CLUB DEPORTIVO</text>
      
      <!-- Estrella Dorada Superior -->
      <polygon points="60,32 62,37 67,37 63,40 65,45 60,42 55,45 57,40 53,37 58,37" fill="url(#prat-gold)" />
      
      <!-- Gran Ancla Naval Dorada -->
      <g transform="translate(60, 60) scale(0.65)" stroke="url(#prat-gold)" fill="none" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="0" cy="-22" r="6" fill="url(#prat-gold)" />
        <line x1="0" y1="-16" x2="0" y2="24" />
        <line x1="-14" y1="-8" x2="14" y2="-8" />
        <path d="M -22 10 C -16 26 16 26 22 10" />
        <polygon points="-24,10 -20,10 -22,4" fill="url(#prat-gold)" />
        <polygon points="24,10 20,10 22,4" fill="url(#prat-gold)" />
      </g>
      
      <!-- Bal\xF3n de F\xFAtbol en el ancla -->
      <circle cx="60" cy="62" r="5" fill="#ffffff" stroke="#000000" stroke-width="0.8" />
      
      <!-- Texto Inferior: ARTURO PRAT 1952 -->
      <text x="60" y="93" font-family="'Inter', sans-serif" font-weight="900" font-size="7.5" fill="#eab308" text-anchor="middle" letter-spacing="0.5">ARTURO PRAT</text>
      <text x="60" y="101" font-family="'Inter', sans-serif" font-weight="700" font-size="6" fill="#cbd5e1" text-anchor="middle">1952</text>
    </svg>
  `,
    // 5. CLUB DEPORTIVO BRISAS DEL MAR (Fundado: 25 de diciembre de 1978)
    // Escudo ondulado marino en amarillo y azul real, barco navegando y balón arriba a la izquierda
    "club-brisas-del-mar": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-brisas" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo con forma de cresta ondulada -->
      <path d="M 20 28 Q 60 16 100 28 Q 106 65 60 110 Q 14 65 20 28 Z" fill="#2563eb" stroke="#fbbf24" stroke-width="4.5" />
      
      <!-- Mitad Superior Amarilla -->
      <path d="M 21 29 Q 60 17 99 29 Q 102 52 80 55 Q 60 58 40 55 Q 21 52 21 29 Z" fill="#facc15" />
      
      <!-- Texto Superior: C. D. BRISAS DEL MAR -->
      <text x="60" y="38" font-family="'Inter', sans-serif" font-weight="900" font-size="7" fill="#1e3a8a" text-anchor="middle">C. D.</text>
      <text x="60" y="47" font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="#1e3a8a" text-anchor="middle" letter-spacing="0.3">BRISAS DEL MAR</text>
      
      <!-- Bal\xF3n arriba a la izquierda -->
      <circle cx="34" cy="42" r="5" fill="#ffffff" stroke="#000000" stroke-width="0.8" />
      
      <!-- Barco Pesquero Tradicional con casco rojo y velas sobre olas -->
      <g transform="translate(60, 72) scale(0.65)">
        <!-- Casco del barco -->
        <path d="M -22 4 L 22 4 L 16 16 L -16 16 Z" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
        <!-- Cabina y m\xE1stil -->
        <rect x="-8" y="-6" width="16" height="10" fill="#ffffff" stroke="#1e3a8a" stroke-width="1" />
        <line x1="0" y1="-16" x2="0" y2="4" stroke="#713f12" stroke-width="2" />
        <!-- Olas marinas en azul -->
        <path d="M -30 18 Q -15 14 0 18 Q 15 22 30 18" stroke="#60a5fa" stroke-width="3" fill="none" stroke-linecap="round" />
      </g>
      
      <!-- A\xF1o 1978 -->
      <text x="60" y="98" font-family="'Inter', sans-serif" font-weight="800" font-size="7" fill="#fef08a" text-anchor="middle">1978</text>
    </svg>
  `,
    // 6. CLUB DEPORTIVO CAUPOLICÁN (Fundado: 3 de agosto de 1965)
    // Escudo circular con franjas verticales rojas y blancas, medallón plateado con relieve del Toqui Caupolicán
    "club-caupolican": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-caupolican" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="caupolican-inner-circle">
          <circle cx="60" cy="60" r="48" />
        </clipPath>
      </defs>
      <!-- Borde exterior rojo -->
      <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#dc2626" stroke-width="5" />
      
      <!-- Franjas verticales rojas y blancas -->
      <g clip-path="url(#caupolican-inner-circle)">
        <rect x="0" y="0" width="120" height="120" fill="#ffffff" />
        <rect x="20" y="0" width="16" height="120" fill="#dc2626" />
        <rect x="52" y="0" width="16" height="120" fill="#dc2626" />
        <rect x="84" y="0" width="16" height="120" fill="#dc2626" />
      </g>
      
      <!-- Medall\xF3n Central Plateado con el Perfil de Caupolic\xE1n -->
      <circle cx="60" cy="60" r="28" fill="#e2e8f0" stroke="#475569" stroke-width="2.5" />
      <circle cx="60" cy="60" r="25" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
      
      <!-- Perfil de Caupolic\xE1n con Pluma Mapuche -->
      <g transform="translate(48, 46) scale(0.42)">
        <path d="M 12 8 Q 18 2 26 4 C 34 6 38 14 36 24 C 34 32 36 38 32 46 C 28 54 20 58 14 56 C 8 50 12 40 14 32 C 16 26 12 18 10 14 Z" fill="#334155" />
        <!-- Pluma guerrera superior -->
        <path d="M 22 6 Q 30 -10 34 -16 Q 36 -6 28 4 Z" fill="#dc2626" />
      </g>
      
      <!-- Texto Circular Superior e Inferior -->
      <path id="caupo-curve-top" d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
      <path id="caupo-curve-bot" d="M 98 60 A 38 38 0 0 1 22 60" fill="none" />
      <text font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="#1e293b">
        <textPath href="#caupo-curve-top" startOffset="50%" text-anchor="middle">C.D. CAUPOLICAN</textPath>
      </text>
      <text font-family="'Inter', sans-serif" font-weight="800" font-size="6.5" fill="#dc2626">
        <textPath href="#caupo-curve-bot" startOffset="50%" text-anchor="middle">ARAUCO \u2022 1965</textPath>
      </text>
    </svg>
  `,
    // 7. CLUB DEPORTIVO CELULOSA (Fundado: 16 de agosto de 1972)
    // Escudo circular con franjas verticales verdes y blancas, aro verde exterior con texto completo
    "club-celulosa": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-celulosa" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="celulosa-inner">
          <circle cx="60" cy="60" r="34" />
        </clipPath>
      </defs>
      <!-- Aro Verde Exterior -->
      <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#15803d" stroke-width="5" />
      <circle cx="60" cy="60" r="48" fill="#15803d" />
      <circle cx="60" cy="60" r="35" fill="#ffffff" stroke="#166534" stroke-width="2" />
      
      <!-- Franjas Verdes y Blancas en el Centro -->
      <g clip-path="url(#celulosa-inner)">
        <rect x="20" y="20" width="80" height="80" fill="#ffffff" />
        <rect x="30" y="20" width="12" height="80" fill="#15803d" />
        <rect x="54" y="20" width="12" height="80" fill="#15803d" />
        <rect x="78" y="20" width="12" height="80" fill="#15803d" />
      </g>
      
      <!-- Textos en el Aro Verde Oficial -->
      <text x="60" y="21" font-family="'Inter', sans-serif" font-weight="900" font-size="5" fill="#ffffff" text-anchor="middle" letter-spacing="0.2">CLUB DEPORTIVO CELULOSA</text>
      <text x="60" y="104" font-family="'Inter', sans-serif" font-weight="800" font-size="4.8" fill="#facc15" text-anchor="middle" letter-spacing="0.2">ARAUCO \u2022 FUND. 16-AGOSTO-1972</text>
      
      <!-- Bal\xF3n en el coraz\xF3n -->
      <circle cx="60" cy="60" r="8" fill="#ffffff" stroke="#15803d" stroke-width="1.2" />
      <polygon points="60,56 63,58 62,62 58,62 57,58" fill="#15803d" />
    </svg>
  `,
    // 8. CLUB DEPORTIVO COLO-COLO DE ARAUCO (Fundado: 16 de febrero de 1948)
    // Escudo con borde ajedrezado/dentado, franjas verde/blanca/roja, cacique Colo-Colo arriba y cinta roja
    "club-colo-colo": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-colo-colo" xmlns="http://www.w3.org/2000/svg">
      <!-- Borde Dentado / Ajedrezado tradicional Mapuche -->
      <path d="M 60 10 L 105 24 L 105 68 C 105 98 60 114 60 114 C 60 114 15 98 15 68 L 15 24 Z" fill="#000000" stroke="#ffffff" stroke-width="2" />
      <path d="M 60 14 L 101 26 L 101 66 C 101 94 60 108 60 108 C 60 108 19 94 19 66 L 19 26 Z" fill="#ffffff" />
      
      <!-- Franjas Horizontales: Verde, Blanco y Rojo -->
      <path d="M 20 45 L 100 45 L 100 60 L 20 60 Z" fill="#15803d" />
      <path d="M 20 60 L 100 60 L 100 75 L 20 75 Z" fill="#ffffff" />
      <path d="M 20 75 L 100 75 L 100 88 C 90 98 60 106 60 106 C 60 106 30 98 20 88 Z" fill="#dc2626" />
      
      <!-- Busto del Cacique Colo-Colo en Perfil -->
      <g transform="translate(48, 20) scale(0.42)">
        <path d="M 12 12 Q 20 4 28 6 Q 36 10 38 20 C 38 28 34 34 32 40 C 28 46 22 50 16 48 C 10 44 12 36 14 28 Z" fill="#1e293b" />
        <!-- Pluma blanca en la nuca -->
        <path d="M 16 10 Q 10 -4 6 -12 Q 12 -4 18 8 Z" fill="#ffffff" stroke="#000000" stroke-width="1" />
        <rect x="18" y="16" width="14" height="4" fill="#dc2626" />
      </g>
      
      <!-- Cinta Roja Inferior: COLO COLO ARAUCO -->
      <rect x="24" y="80" width="72" height="13" rx="3" fill="#b91c1c" stroke="#ffffff" stroke-width="0.8" />
      <text x="60" y="89" font-family="'Inter', sans-serif" font-weight="900" font-size="6.2" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">COLO COLO</text>
      <text x="60" y="99" font-family="'Inter', sans-serif" font-weight="800" font-size="6" fill="#facc15" text-anchor="middle">ARAUCO \u2022 1948</text>
    </svg>
  `,
    // 9. CLUB DEPORTIVO GENTE DE MAR (Fundado: 10 de enero de 1960)
    // Escudo circular blanco con borde azul marino, gran ancla azul marina con soga entrelazada
    "club-gente-de-mar": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-gente-de-mar" xmlns="http://www.w3.org/2000/svg">
      <!-- C\xEDrculo Base Blanco con Borde Azul Marino Grueso -->
      <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#1e3a8a" stroke-width="5" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#93c5fd" stroke-width="1.5" />
      
      <!-- Siglas C. D. arriba -->
      <text x="38" y="32" font-family="'Inter', sans-serif" font-weight="900" font-size="8" fill="#1e3a8a" text-anchor="middle">C.</text>
      <text x="82" y="32" font-family="'Inter', sans-serif" font-weight="900" font-size="8" fill="#1e3a8a" text-anchor="middle">D.</text>
      
      <!-- Gran Ancla Naval Azul Marino con Cuerda Enrollada -->
      <g transform="translate(60, 56) scale(0.72)" stroke="#1e3a8a" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="0" cy="-24" r="7" fill="#ffffff" stroke-width="4" />
        <line x1="0" y1="-17" x2="0" y2="28" />
        <line x1="-16" y1="-8" x2="16" y2="-8" />
        <!-- U\xF1as del ancla -->
        <path d="M -26 12 C -20 34 20 34 26 12" />
        <polygon points="-28,12 -23,12 -26,5" fill="#1e3a8a" />
        <polygon points="28,12 23,12 26,5" fill="#1e3a8a" />
        <!-- Soga marina enrollada en dorado -->
        <path d="M -6 -18 Q 8 -12 -4 -6 Q 8 0 -2 8 Q 8 16 0 24" stroke="#ca8a04" stroke-width="2.5" fill="none" />
      </g>
      
      <!-- Cinta Inferior: Gente de Mar -->
      <path d="M 28 88 Q 60 96 92 88 L 88 98 Q 60 106 32 98 Z" fill="#1e3a8a" />
      <text x="60" y="96" font-family="'Inter', sans-serif" font-weight="900" font-size="6.8" fill="#ffffff" text-anchor="middle" letter-spacing="0.3">Gente de Mar</text>
      <text x="60" y="104" font-family="'Inter', sans-serif" font-weight="700" font-size="5.5" fill="#64748b" text-anchor="middle">1960</text>
    </svg>
  `,
    // 10. CLUB DEPORTIVO JORGE ROBLEDO (Fundado: 26 de febrero de 1954)
    // Escudo azul celeste apuntado, silueta de futbolista chilena/remate en blanco, estrellas
    "club-jorge-robledo": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-jorge-robledo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="robledo-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="60%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#0369a1" />
        </linearGradient>
      </defs>
      <!-- Escudo apuntado en degrad\xE9 celeste/azul con borde blanco -->
      <path d="M 60 12 L 104 26 L 104 68 C 104 94 60 112 60 112 C 60 112 16 94 16 68 L 16 26 Z" fill="url(#robledo-blue)" stroke="#ffffff" stroke-width="4" />
      <path d="M 60 17 L 98 29 L 98 66 C 98 89 60 105 60 105 C 60 105 22 89 22 66 L 22 29 Z" fill="none" stroke="#bae6fd" stroke-width="1.2" />
      
      <!-- Iniciales J y R estilizadas -->
      <text x="32" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" opacity="0.85">J</text>
      <text x="88" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" opacity="0.85" text-anchor="end">R</text>
      
      <!-- Silueta del jugador en tijera / chilena acrob\xE1tica al centro -->
      <g transform="translate(60, 52) scale(0.65)">
        <!-- Cabeza y cuerpo horizontal -->
        <circle cx="12" cy="10" r="5" fill="#ffffff" />
        <path d="M 8 10 L -4 2 L 6 -10 L 14 -4 Z" fill="#ffffff" />
        <!-- Pierna que remata arriba -->
        <path d="M -4 2 L -14 -16 L -8 -18 L 0 -4 Z" fill="#ffffff" />
        <!-- Pierna de apoyo -->
        <path d="M 4 -10 L 16 -18 L 22 -14 L 10 -4 Z" fill="#ffffff" />
        <!-- Bal\xF3n en el aire -->
        <circle cx="-18" cy="-22" r="5.5" fill="#facc15" stroke="#ffffff" stroke-width="1" />
      </g>
      
      <!-- Cinta Inferior: JORGE ROBLEDO 1954 -->
      <rect x="22" y="82" width="76" height="13" rx="2" fill="#ffffff" />
      <text x="60" y="91" font-family="'Inter', sans-serif" font-weight="900" font-size="6.2" fill="#0369a1" text-anchor="middle" letter-spacing="0.3">JORGE ROBLEDO</text>
      <text x="60" y="103" font-family="'Inter', sans-serif" font-weight="800" font-size="6.5" fill="#facc15" text-anchor="middle">ARAUCO \u2022 1954</text>
    </svg>
  `,
    // 11. CLUB DEPORTIVO REAL JOSÉ MARÍA (Fundado: 30 de enero de 2026)
    // Escudo tipo realeza español azulgrana con gran corona real dorada y balón al centro
    "club-real-jose-maria": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-real-jose-maria" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rjm-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
      </defs>
      
      <!-- Corona Real Imperial en la c\xFAspide -->
      <g transform="translate(60, 24) scale(0.65)">
        <path d="M -30 6 L 30 6 L 24 -14 L 12 -4 L 0 -18 L -12 -4 L -24 -14 Z" fill="url(#rjm-gold)" stroke="#713f12" stroke-width="2" />
        <circle cx="0" cy="-20" r="3.5" fill="#dc2626" />
        <circle cx="-24" cy="-15" r="2.5" fill="#2563eb" />
        <circle cx="24" cy="-15" r="2.5" fill="#2563eb" />
        <!-- Joyas en la base de la corona -->
        <rect x="-28" y="2" width="56" height="5" fill="#b91c1c" stroke="#713f12" stroke-width="1" />
      </g>
      
      <!-- Escudo Espa\xF1ol Cuartelado Azul y Rojo -->
      <path d="M 60 28 C 88 28 102 38 102 68 C 102 96 60 114 60 114 C 60 114 18 96 18 68 C 18 38 32 28 60 28 Z" fill="#1e3a8a" stroke="url(#rjm-gold)" stroke-width="4.5" />
      
      <!-- Franjas Rojas en el interior -->
      <path d="M 40 30 L 52 30 L 52 108 C 46 104 40 98 40 94 Z" fill="#dc2626" />
      <path d="M 68 30 L 80 30 L 80 94 C 80 98 74 104 68 108 Z" fill="#dc2626" />
      
      <!-- Bal\xF3n de F\xFAtbol Dorado en el centro -->
      <circle cx="60" cy="64" r="11" fill="#ffffff" stroke="url(#rjm-gold)" stroke-width="2" />
      <polygon points="60,58 65,61 63,67 57,67 55,61" fill="#1e3a8a" />
      
      <!-- Cinta / Letras: REAL JOS\xC9 MAR\xCDA F.C. -->
      <rect x="22" y="84" width="76" height="12" rx="3" fill="#0f172a" stroke="url(#rjm-gold)" stroke-width="1" />
      <text x="60" y="92.5" font-family="'Inter', sans-serif" font-weight="900" font-size="5.5" fill="#fde047" text-anchor="middle" letter-spacing="0.3">REAL JOS\xC9 MAR\xCDA</text>
      <text x="60" y="102" font-family="'Inter', sans-serif" font-weight="800" font-size="6" fill="#ffffff" text-anchor="middle">\u2022 2026 \u2022</text>
    </svg>
  `,
    "club-celulosa-arauco": (size = 36) => CLUB_BADGES_SVG["club-celulosa"](size),
    "club-colo-colo-arauco": (size = 36) => CLUB_BADGES_SVG["club-colo-colo"](size),
    "asociacion-futbol-arauco": (size = 36) => CLUB_BADGES_SVG["asociacion-arauco"](size),
    // ==========================================
    // ESCUDOS DE OTRAS ASOCIACIONES (MULTI-LIGA)
    // ==========================================
    "asociacion-lebu": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#1e3a8a" stroke-width="5" />
      <circle cx="60" cy="60" r="46" fill="#1e3a8a" />
      <path d="M 60 26 L 60 76 M 42 42 L 78 42 M 36 64 C 42 82 78 82 84 64" stroke="#f59e0b" stroke-width="5" fill="none" stroke-linecap="round" />
      <circle cx="60" cy="68" r="8" fill="#ffffff" />
      <text x="60" y="100" font-family="'Outfit', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle" letter-spacing="1">ANFA LEBU</text>
    </svg>
  `,
    "asociacion-canete": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#15803d" stroke="#f59e0b" stroke-width="4.5" />
      <polygon points="60,28 72,48 94,48 76,62 82,84 60,70 38,84 44,62 26,48 48,48" fill="#f59e0b" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">CA\xD1ETE</text>
    </svg>
  `,
    "asociacion-cordillera": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 18 24 L 102 24 L 88 106 L 32 106 Z" fill="#0f172a" stroke="#0284c7" stroke-width="4.5" />
      <polygon points="34,80 50,44 66,74 76,52 92,80" fill="#38bdf8" />
      <polygon points="50,44 56,58 44,58" fill="#ffffff" />
      <polygon points="76,52 82,62 70,62" fill="#ffffff" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">CORDILLERA</text>
    </svg>
  `,
    // ==========================================
    // ESCUDOS DE CLUBES DE OTRAS LIGAS (DEMO)
    // ==========================================
    "club-lebu-pesquero": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="#1e3a8a" stroke="#ffffff" stroke-width="4" />
      <path d="M 60 25 L 60 85 M 40 45 L 80 45 M 35 70 Q 60 95 85 70" stroke="#f59e0b" stroke-width="6" fill="none" stroke-linecap="round" />
      <text x="60" y="105" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">PESQUERO</text>
    </svg>
  `,
    "club-lebu-carbon": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,15 105,40 105,90 60,115 15,90 15,40" fill="#0f172a" stroke="#f59e0b" stroke-width="4.5" />
      <line x1="38" y1="42" x2="82" y2="86" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" />
      <line x1="82" y1="42" x2="38" y2="86" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" />
      <text x="60" y="104" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">CARB\xD3N</text>
    </svg>
  `,
    "club-canete-tucapel": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#15803d" stroke="#ffffff" stroke-width="4.5" />
      <circle cx="60" cy="54" r="22" fill="#ffffff" />
      <path d="M 60 38 L 60 70 M 46 54 L 74 54" stroke="#15803d" stroke-width="4" stroke-linecap="round" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">TUCAPEL</text>
    </svg>
  `,
    "club-cord-andes": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 15 L 105 35 L 95 95 L 60 115 L 25 95 L 15 35 Z" fill="#0284c7" stroke="#ffffff" stroke-width="4" />
      <polygon points="60,35 78,72 42,72" fill="#ffffff" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">LOS ANDES</text>
    </svg>
  `,
    "club-lebu-penarol": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#0f172a" stroke="#eab308" stroke-width="4.5" />
      <rect x="36" y="24" width="12" height="60" fill="#eab308" />
      <rect x="54" y="24" width="12" height="64" fill="#eab308" />
      <rect x="72" y="24" width="12" height="60" fill="#eab308" />
      <circle cx="60" cy="94" r="5" fill="#ffffff" />
      <text x="60" y="106" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">PE\xD1AROL</text>
    </svg>
  `,
    "club-lebu-victoria": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#ffffff" stroke="#dc2626" stroke-width="4.5" />
      <path d="M 32 30 L 60 85 L 88 30 L 76 30 L 60 65 L 44 30 Z" fill="#dc2626" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#0f172a" text-anchor="middle">VICTORIA</text>
    </svg>
  `,
    "club-canete-alianza": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#1d4ed8" stroke="#ffffff" stroke-width="4.5" />
      <line x1="28" y1="36" x2="92" y2="36" stroke="#ffffff" stroke-width="3" />
      <text x="60" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">ALIANZA</text>
      <polygon points="60,68 64,78 74,78 66,84 69,94 60,88 51,94 54,84 46,78 56,78" fill="#fde047" />
    </svg>
  `,
    "club-canete-caupolican": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="4.5" />
      <circle cx="60" cy="52" r="18" fill="#ffffff" />
      <line x1="42" y1="74" x2="78" y2="32" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">CAUPOLIC\xC1N</text>
    </svg>
  `,
    "club-cord-central": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,14 106,36 94,96 60,114 26,96 14,36" fill="#1e3a8a" stroke="#38bdf8" stroke-width="4" />
      <polygon points="34,80 50,44 66,74 76,52 92,80" fill="#38bdf8" />
      <text x="60" y="100" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">CENTRAL</text>
    </svg>
  `,
    "club-cord-oriente": (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#881337" stroke="#eab308" stroke-width="4" />
      <polygon points="60,32 70,52 92,52 74,66 80,88 60,74 40,88 46,66 28,52 50,52" fill="#eab308" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">ORIENTE</text>
    </svg>
  `
  };
  function getClubBadgeSvg(clubId, size = 36) {
    if (!clubId) {
      return CLUB_BADGES_SVG["asociacion-arauco"](size);
    }
    if (CLUB_BADGES_SVG[clubId]) {
      return CLUB_BADGES_SVG[clubId](size);
    }
    if (clubId === "seleccion-arauco" || clubId === "asociacion-arauco") {
      return CLUB_BADGES_SVG["asociacion-arauco"](size);
    }
    const hash = String(clubId).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#dc2626", "#1d4ed8", "#16a34a", "#d97706", "#7c3aed", "#0284c7", "#0f172a"];
    const bg = colors[hash % colors.length];
    const initial = clubId.replace("club-", "").charAt(0).toUpperCase();
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="${bg}" stroke="#ffffff" stroke-width="4.5" />
      <circle cx="60" cy="58" r="22" fill="#ffffff" />
      <text x="60" y="67" font-family="'Outfit', sans-serif" font-weight="900" font-size="24" fill="${bg}" text-anchor="middle">${initial}</text>
    </svg>
  `;
  }

  // js/auth.js
  var ROLE_STORAGE_KEY = "LIGAMASTER_CURRENT_ROLE_V1";
  var USER_STORAGE_KEY = "LIGAMASTER_CURRENT_USER_V1";
  var ROLES = {
    PUBLIC: "public",
    REFEREE: "referee",
    ADMIN: "admin"
  };
  var PINS = {
    REFEREE: ["1234", "2026"],
    ADMIN: ["9999"]
  };
  function initAuth() {
    const currentRole = getCurrentRole();
    updateAuthUI(currentRole);
    setupAuthFormListener();
  }
  function getCurrentRole() {
    try {
      return localStorage.getItem(ROLE_STORAGE_KEY) || ROLES.PUBLIC;
    } catch (e) {
      return ROLES.PUBLIC;
    }
  }
  function getCurrentUser() {
    try {
      return localStorage.getItem(USER_STORAGE_KEY) || "Invitado";
    } catch (e) {
      return "Invitado";
    }
  }
  function login(pin, user = "") {
    const cleanPin = String(pin).trim();
    const userName = user.trim() || "Dirigente ANFA";
    if (PINS.ADMIN.includes(cleanPin)) {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(ROLE_STORAGE_KEY, ROLES.ADMIN);
          localStorage.setItem(USER_STORAGE_KEY, userName);
        }
      } catch (e) {
      }
      updateAuthUI(ROLES.ADMIN);
      if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        window.dispatchEvent(new CustomEvent("ligamaster:auth-changed", {
          detail: { role: ROLES.ADMIN, user: userName }
        }));
      }
      return {
        success: true,
        role: ROLES.ADMIN,
        roleLabel: "Directiva ANFA",
        message: "\xA1Bienvenido! Sesi\xF3n habilitada con Control Total Directivo."
      };
    }
    if (PINS.REFEREE.includes(cleanPin)) {
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(ROLE_STORAGE_KEY, ROLES.REFEREE);
          localStorage.setItem(USER_STORAGE_KEY, userName);
        }
      } catch (e) {
      }
      updateAuthUI(ROLES.REFEREE);
      if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        window.dispatchEvent(new CustomEvent("ligamaster:auth-changed", {
          detail: { role: ROLES.REFEREE, user: userName }
        }));
      }
      return {
        success: true,
        role: ROLES.REFEREE,
        roleLabel: "Turno Oficial de Cancha",
        message: "\xA1Turno Habilitado! Acceso para registro de marcador y planillas."
      };
    }
    return {
      success: false,
      message: "PIN incorrecto. Ingrese 9999 para Directiva ANFA o 1234 para Turno de Cancha."
    };
  }
  function logout() {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(ROLE_STORAGE_KEY, ROLES.PUBLIC);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
    }
    updateAuthUI(ROLES.PUBLIC);
    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("ligamaster:auth-changed", {
        detail: { role: ROLES.PUBLIC }
      }));
    }
  }
  function updateAuthUI(role = null) {
    if (typeof document === "undefined") return;
    const currentRole = role || getCurrentRole();
    const loginBtn = document.getElementById("btn-open-login");
    const navAdmin = document.getElementById("nav-btn-admin");
    const mobileAdmin = document.getElementById("mobile-btn-admin");
    if (loginBtn) {
      if (currentRole === ROLES.ADMIN) {
        loginBtn.innerHTML = `
        <span>\u{1F3DB}\uFE0F</span>
        <span>Directiva ANFA</span>
      `;
        loginBtn.title = "Sesi\xF3n Activa: Directiva ANFA (Clic para abrir panel o cerrar sesi\xF3n)";
        loginBtn.classList.add("active");
      } else if (currentRole === ROLES.REFEREE) {
        loginBtn.innerHTML = `
        <span>\u23F1\uFE0F</span>
        <span>Turno Cancha</span>
      `;
        loginBtn.title = "Sesi\xF3n Activa: Turno Oficial de Cancha";
        loginBtn.classList.add("active");
      } else {
        loginBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Iniciar Sesi\xF3n</span>
      `;
        loginBtn.title = "Acceso a Dirigentes y Turnos de Cancha";
        loginBtn.classList.remove("active");
      }
    }
    if (navAdmin) {
      navAdmin.style.display = "inline-flex";
    }
    if (mobileAdmin) {
      mobileAdmin.style.display = "block";
    }
  }
  function setupAuthFormListener() {
    const form = document.getElementById("form-platform-login");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userInput = document.getElementById("login-input-user") || form.querySelector('input[type="text"]');
      const pinInput = document.getElementById("login-input-pin") || form.querySelector('input[type="password"]');
      const errorEl = document.getElementById("login-error-msg");
      const pin = pinInput?.value || "";
      const user = userInput?.value || "";
      const res = login(pin, user);
      if (res.success) {
        if (errorEl) errorEl.style.display = "none";
        if (window.closeModal) window.closeModal("modal-login");
        if (window.ligamasterNavigate) {
          window.ligamasterNavigate("admin-view");
        } else {
          window.location.hash = "admin";
        }
        if (pinInput) pinInput.value = "";
      } else {
        if (errorEl) {
          errorEl.textContent = res.message;
          errorEl.style.display = "block";
        } else if (typeof window !== "undefined" && window.showToast) {
          window.showToast(res.message, "error");
        } else {
          alert(res.message);
        }
      }
    });
  }

  // js/toast.js
  function showToast(message, type = "success") {
    if (typeof document === "undefined") {
      console.log(`[Toast ${type}]: ${message}`);
      return;
    }
    let container = document.getElementById("ligamaster-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "ligamaster-toast-container";
      container.className = "ligamaster-toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `ligamaster-toast ligamaster-toast-${type}`;
    const iconMap = {
      success: "\u2713",
      error: "\u2715",
      warning: "\u26A0\uFE0F",
      info: "\u2139\uFE0F"
    };
    toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || "\u2139\uFE0F"}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close-btn" aria-label="Cerrar notificaci\xF3n">&times;</button>
  `;
    toast.querySelector(".toast-close-btn")?.addEventListener("click", () => {
      dismissToast(toast);
    });
    container.appendChild(toast);
    setTimeout(() => {
      dismissToast(toast);
    }, 3800);
  }
  function dismissToast(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.add("fade-out");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 260);
  }
  if (typeof window !== "undefined") {
    window.showToast = showToast;
  }

  // js/admin.js
  var currentAdminTab = "dashboard";
  var currentAdminSeries = "honor";
  var currentAdminClubId = null;
  function initAdmin() {
    window.addEventListener("ligamaster:auth-changed", () => {
      if (document.getElementById("admin-view")?.classList.contains("active")) {
        renderAdminView();
      }
    });
    window.addEventListener("ligamaster:league-changed", () => {
      if (document.getElementById("admin-view")?.classList.contains("active")) {
        currentAdminClubId = null;
        renderAdminView();
      }
    });
    setupAdminModals();
  }
  function renderAdminView() {
    const container = document.getElementById("admin-view");
    if (!container) return;
    const role = getCurrentRole();
    const activeId = getActiveLeagueId();
    const league = getLeagueById(activeId);
    const db = getDb(activeId);
    if (role === ROLES.PUBLIC) {
      container.innerHTML = `
      <div class="platform-container">
        <div class="admin-gate-card">
          <div class="admin-gate-icon">\u{1F510}</div>
          <h2>Portal de Gesti\xF3n Institucional</h2>
          <p>
            Acceso restringido para la Directiva de <strong>${league.name}</strong>, Presidentes de Clubes y Turnos Oficiales de Cancha.
          </p>

          <form id="admin-gate-login-form">
            <div style="margin-bottom: 1rem; text-align: left;">
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--color-text-main);">Dirigente o Usuario</label>
              <input type="text" id="gate-input-user" class="series-select" style="width: 100%; padding: 0.75rem 1rem;" placeholder="ej: Claudio Pampaloni (Presidente ANFA)" required>
            </div>
            <div style="margin-bottom: 1.25rem; text-align: left;">
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--color-text-main);">PIN de Seguridad</label>
              <input type="password" id="gate-input-pin" class="series-select" style="width: 100%; padding: 0.75rem 1rem;" placeholder="\u2022\u2022\u2022\u2022" maxlength="6" required autofocus>
              <small style="display: block; margin-top: 0.4rem; font-size: 0.75rem; color: var(--color-text-muted);">
                Demostraci\xF3n: Directiva ANFA = <code>9999</code> \u2022 Turno de Cancha = <code>1234</code>
              </small>
              <div id="gate-error-msg" style="display: none; color: var(--color-primary); font-size: 0.8rem; font-weight: 700; margin-top: 0.5rem;"></div>
            </div>
            <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 0.95rem;">
              Ingresar al Panel de Control
            </button>
          </form>

          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-muted);">
            \xBFNecesitas habilitar tu asociaci\xF3n? Comun\xEDcate con soporte institucional en <strong>contacto@ligamaster.cl</strong>
          </div>
        </div>
      </div>
    `;
      document.getElementById("admin-gate-login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = document.getElementById("gate-input-user")?.value || "";
        const pin = document.getElementById("gate-input-pin")?.value || "";
        const errorEl = document.getElementById("gate-error-msg");
        const res = login(pin, user);
        if (res.success) {
          renderAdminView();
        } else {
          if (errorEl) {
            errorEl.textContent = res.message;
            errorEl.style.display = "block";
          }
        }
      });
      return;
    }
    const isDirectiva = role === ROLES.ADMIN;
    const roleTitle = isDirectiva ? "Directiva ANFA" : "Turno de Cancha";
    const roleEmoji = isDirectiva ? "\u{1F3DB}\uFE0F" : "\u23F1\uFE0F";
    const regions = getRegionsAndLeagues();
    if (!currentAdminClubId && db.clubs && db.clubs.length > 0) {
      currentAdminClubId = db.clubs[0].id;
    }
    let html = `
    <div class="platform-container">
      
      <!-- Hero Superior del Panel Administrativo -->
      <div class="admin-hero-card">
        <div class="admin-hero-left">
          <div class="admin-hero-crest">
            ${getClubBadgeSvg(league.badgeId || "asociacion-arauco", 52)}
          </div>
          <div class="admin-hero-info">
            <h2>Panel de Gesti\xF3n: ${league.name}</h2>
            <div class="admin-hero-meta">
              <span class="admin-role-badge">${roleEmoji} ${roleTitle}</span>
              <span>Usuario: <strong>${getCurrentUser()}</strong></span>
              <span>\u2022</span>
              <span>${league.commune}</span>
              ${league.isDemo ? '<span class="admin-badge admin-badge-warning">Modo Demostraci\xF3n</span>' : '<span class="admin-badge admin-badge-success">Oficial Producci\xF3n</span>'}
            </div>
          </div>
        </div>

        <div class="admin-hero-actions">
          <!-- Selector r\xE1pido de liga para directivos -->
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-secondary); text-transform: uppercase;">Liga:</label>
            <select id="admin-quick-league-select" class="series-select" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
  `;
    regions.forEach((r) => {
      html += `<optgroup label="${r.regionName}">`;
      r.leagues.forEach((l) => {
        html += `<option value="${l.id}" ${l.id === activeId ? "selected" : ""}>${l.name} (${l.isDemo ? "Demo" : "Oficial"})</option>`;
      });
      html += `</optgroup>`;
    });
    html += `
            </select>
          </div>

          <button class="btn-admin-action" id="btn-admin-view-public" title="Ver sitio p\xFAblico">
            \u{1F441}\uFE0F Ver Web P\xFAblica
          </button>
          <button class="btn-admin-action danger" id="btn-admin-logout" title="Cerrar sesi\xF3n administrativa">
            \u2715 Salir
          </button>
        </div>
      </div>

      <!-- Barra de Navegaci\xF3n del Panel (Tabs) -->
      <div class="admin-subnav-bar">
        <button class="admin-subnav-btn ${currentAdminTab === "dashboard" ? "active" : ""}" data-admin-tab="dashboard">
          \u{1F4CA} Resumen
        </button>
        <button class="admin-subnav-btn ${currentAdminTab === "matches" ? "active" : ""}" data-admin-tab="matches">
          \u26BD Partidos y Marcadores
        </button>
        <button class="admin-subnav-btn ${currentAdminTab === "clubs" ? "active" : ""}" data-admin-tab="clubs">
          \u{1F6E1}\uFE0F Clubes y Padr\xF3n
        </button>
        <button class="admin-subnav-btn ${currentAdminTab === "sanctions" ? "active" : ""}" data-admin-tab="sanctions">
          \u2696\uFE0F Tribunal de Penas
        </button>
        <button class="admin-subnav-btn ${currentAdminTab === "treasury" ? "active" : ""}" data-admin-tab="treasury">
          \u{1F4B0} Tesorer\xEDa y Caja
        </button>
        <button class="admin-subnav-btn ${currentAdminTab === "settings" ? "active" : ""}" data-admin-tab="settings">
          \u2699\uFE0F Configuraci\xF3n
        </button>
      </div>

      <!-- Contenedor del M\xF3dulo Activo -->
      <div id="admin-tab-container">
        <!-- Render din\xE1mico seg\xFAn currentAdminTab -->
      </div>

    </div>
  `;
    container.innerHTML = html;
    document.getElementById("admin-quick-league-select")?.addEventListener("change", (e) => {
      setActiveLeagueId(e.target.value);
    });
    document.getElementById("btn-admin-view-public")?.addEventListener("click", () => {
      if (window.ligamasterNavigate) window.ligamasterNavigate("home-view");
    });
    document.getElementById("btn-admin-logout")?.addEventListener("click", () => {
      if (confirm("\xBFDeseas cerrar la sesi\xF3n administrativa?")) {
        logout();
        if (window.ligamasterNavigate) window.ligamasterNavigate("home-view");
      }
    });
    container.querySelectorAll(".admin-subnav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".admin-subnav-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentAdminTab = btn.getAttribute("data-admin-tab");
        renderAdminActiveTab(db, league);
      });
    });
    renderAdminActiveTab(db, league);
  }
  function renderAdminActiveTab(db, league) {
    const container = document.getElementById("admin-tab-container");
    if (!container) return;
    switch (currentAdminTab) {
      case "dashboard":
        renderAdminDashboard(container, db, league);
        break;
      case "matches":
        renderAdminMatches(container, db, league);
        break;
      case "clubs":
        renderAdminClubs(container, db, league);
        break;
      case "sanctions":
        renderAdminSanctions(container, db, league);
        break;
      case "treasury":
        renderAdminTreasury(container, db, league);
        break;
      case "settings":
        renderAdminSettings(container, db, league);
        break;
      default:
        renderAdminDashboard(container, db, league);
    }
  }
  function renderAdminDashboard(container, db, league) {
    const clubsCount = (db.clubs || []).length;
    const matches = db.matches || [];
    const matchesFinished = matches.filter((m) => m.status === "finalizado").length;
    const matchesLive = matches.filter((m) => m.status === "en_vivo").length;
    const playersCount = (db.players || []).length;
    const ledger = db.treasuryLedger || [];
    const totalIngresos = ledger.filter((m) => m.type === "ingreso").reduce((acc, m) => acc + (m.amount || 0), 0);
    const totalEgresos = ledger.filter((m) => m.type === "egreso").reduce((acc, m) => acc + (m.amount || 0), 0);
    const saldoCaja = totalIngresos - totalEgresos;
    const playersInWarning = (db.players || []).filter((p) => p.yellowCards === 4);
    const playersSuspended = (db.players || []).filter((p) => p.yellowCards >= 5 || p.status === "suspendido");
    let html = `
    <!-- KPIs Principales -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Clubes Afiliados</span>
          <span class="admin-kpi-icon">\u{1F6E1}\uFE0F</span>
        </div>
        <div class="admin-kpi-value">${clubsCount}</div>
        <div class="admin-kpi-sub">${league.name}</div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Partidos Oficiales</span>
          <span class="admin-kpi-icon">\u26BD</span>
        </div>
        <div class="admin-kpi-value">${matches.length}</div>
        <div class="admin-kpi-sub">${matchesFinished} finalizados \u2022 <strong style="color: var(--color-primary);">${matchesLive} en vivo</strong></div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Padr\xF3n de Jugadores</span>
          <span class="admin-kpi-icon">\u{1F464}</span>
        </div>
        <div class="admin-kpi-value">${playersCount}</div>
        <div class="admin-kpi-sub">${playersSuspended.length} sancionados \u2022 ${playersInWarning.length} en capilla</div>
      </div>

      <div class="admin-kpi-card">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Saldo Caja Chica</span>
          <span class="admin-kpi-icon">\u{1F4B0}</span>
        </div>
        <div class="admin-kpi-value" style="color: ${saldoCaja >= 0 ? "#15803d" : "#b91c1c"};">
          $${saldoCaja.toLocaleString("es-CL")}
        </div>
        <div class="admin-kpi-sub">Ingresos: $${totalIngresos.toLocaleString("es-CL")} \u2022 Egresos: $${totalEgresos.toLocaleString("es-CL")}</div>
      </div>
    </div>

    <!-- Alertas Disciplinarias y de Cancha -->
    ${playersSuspended.length > 0 ? `
      <div class="admin-alert-box danger">
        <div style="font-size: 1.25rem;">\u26A0\uFE0F</div>
        <div>
          <strong>Alerta Disciplinaria ANFA:</strong> Hay <strong>${playersSuspended.length} jugador(es) suspendido(s)</strong> inhabilitados para jugar la pr\xF3xima fecha por acumulaci\xF3n de 5 tarjetas amarillas o sanci\xF3n del Tribunal.
          <div style="margin-top: 0.35rem; font-size: 0.78rem;">
            ${playersSuspended.map((p) => `\u2022 <strong>${p.name}</strong> (${p.clubId})`).join(" ")}
          </div>
        </div>
      </div>
    ` : ""}

    ${playersInWarning.length > 0 ? `
      <div class="admin-alert-box warning">
        <div style="font-size: 1.25rem;">\u{1F7E1}</div>
        <div>
          <strong>Control Reglamentario (Art. 42):</strong> <strong>${playersInWarning.length} jugador(es) en capilla</strong> (4 tarjetas amarillas acumuladas). Una nueva amonestaci\xF3n causar\xE1 suspensi\xF3n autom\xE1tica de 1 fecha.
        </div>
      </div>
    ` : ""}

    <!-- Grilla de Acceso R\xE1pido a Partidos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>\u26BD</span> Partidos de la Fecha & Marcadores R\xE1pidos</h3>
        <button class="btn-admin-action primary" onclick="window.ligamasterOpenAddMatchModal()">
          + Programar Partido
        </button>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Encuentro</th>
                <th>Serie</th>
                <th>Recinto / Fecha</th>
                <th>Marcador</th>
                <th>Estado</th>
                <th>Ratificaci\xF3n</th>
                <th>Acci\xF3n</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (matches.length === 0) {
      html += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No hay partidos registrados en esta liga.</td></tr>`;
    } else {
      matches.slice(0, 6).forEach((m) => {
        const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: m.homeClubId };
        const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: m.awayClubId };
        const isLive = m.status === "en_vivo";
        const isFinished = m.status === "finalizado";
        html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 24px; height: 24px; display: inline-flex; align-items: center;">${getClubBadgeSvg(homeClub.badgeId || homeClub.id, 24)}</span>
              <strong>${homeClub.shortName || homeClub.name}</strong>
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">vs</span>
              <span style="width: 24px; height: 24px; display: inline-flex; align-items: center;">${getClubBadgeSvg(awayClub.badgeId || awayClub.id, 24)}</span>
              <strong>${awayClub.shortName || awayClub.name}</strong>
            </div>
          </td>
          <td><span class="admin-badge admin-badge-info">${m.series || "Honor"}</span></td>
          <td><small>${m.venue || "Estadio Municipal"}<br>${m.date || "Fin de semana"}</small></td>
          <td>
            <div class="admin-quick-score">
              <input type="number" min="0" max="99" value="${m.homeScore || 0}" id="score-h-${m.id}">
              <span>-</span>
              <input type="number" min="0" max="99" value="${m.awayScore || 0}" id="score-a-${m.id}">
            </div>
          </td>
          <td>
            <select id="status-${m.id}" class="series-select" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
              <option value="programado" ${m.status === "programado" ? "selected" : ""}>Programado</option>
              <option value="en_vivo" ${m.status === "en_vivo" ? "selected" : ""}>\u{1F534} En Vivo</option>
              <option value="finalizado" ${m.status === "finalizado" ? "selected" : ""}>\u2713 Finalizado</option>
            </select>
          </td>
          <td>
            ${m.ratificationStatus === "ratificado_directorio" ? '<span class="admin-badge admin-badge-success">\u2713 Ratificado ANFA</span>' : '<span class="admin-badge admin-badge-warning">Planilla Cancha</span>'}
          </td>
          <td>
            <button class="btn-admin-action primary" onclick="window.ligamasterSaveMatchScore('${m.id}')" title="Guardar marcador y actualizar tabla">
              \u{1F4BE} Guardar
            </button>
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
  }
  function renderAdminMatches(container, db, league) {
    const seriesList = getLeagueSeries(league.id);
    const matches = (db.matches || []).filter((m) => !currentAdminSeries || m.series === currentAdminSeries);
    let html = `
    <div class="admin-card">
      <div class="admin-card-header">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <h3><span>\u26BD</span> Programaci\xF3n & Control de Partidos</h3>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-secondary);">Filtrar por Serie:</label>
            <select id="admin-matches-series-filter" class="series-select" style="padding: 0.35rem 0.75rem; font-size: 0.82rem;">
  `;
    seriesList.forEach((s) => {
      html += `<option value="${s.id}" ${s.id === currentAdminSeries ? "selected" : ""}>${s.name}</option>`;
    });
    html += `
            </select>
          </div>
        </div>

        <button class="btn-primary-coral" onclick="window.ligamasterOpenAddMatchModal()">
          + Programar Nuevo Encuentro
        </button>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Encuentro</th>
                <th>Recinto y Fecha</th>
                <th>\xC1rbitro & Turno</th>
                <th>Marcador</th>
                <th>Estado</th>
                <th>Acta Oficial</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (matches.length === 0) {
      html += `<tr><td colspan="7" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay partidos programados para la serie seleccionada.</td></tr>`;
    } else {
      matches.forEach((m) => {
        const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: m.homeClubId };
        const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: m.awayClubId };
        html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <span style="width: 28px; height: 28px; display: inline-flex; align-items: center;">${getClubBadgeSvg(homeClub.badgeId || homeClub.id, 28)}</span>
              <div>
                <strong style="display: block;">${homeClub.name}</strong>
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">vs ${awayClub.name}</span>
              </div>
              <span style="width: 28px; height: 28px; display: inline-flex; align-items: center;">${getClubBadgeSvg(awayClub.badgeId || awayClub.id, 28)}</span>
            </div>
          </td>
          <td>
            <strong style="display: block; font-size: 0.82rem;">${m.venue || "Estadio Municipal"}</strong>
            <small style="color: var(--color-text-muted);">${m.date || "Por definir"}</small>
          </td>
          <td>
            <div style="font-size: 0.78rem;">
              <span>\u{1F468}\u200D\u2696\uFE0F ${m.referee || "CAPA Oficial"}</span><br>
              <span style="color: var(--color-text-muted);">\u{1F4CB} Turno: ${m.turnOfficial || "Designado ANFA"}</span>
            </div>
          </td>
          <td>
            <div class="admin-quick-score">
              <input type="number" min="0" max="99" value="${m.homeScore || 0}" id="full-score-h-${m.id}">
              <span>:</span>
              <input type="number" min="0" max="99" value="${m.awayScore || 0}" id="full-score-a-${m.id}">
            </div>
          </td>
          <td>
            <select id="full-status-${m.id}" class="series-select" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
              <option value="programado" ${m.status === "programado" ? "selected" : ""}>Programado</option>
              <option value="en_vivo" ${m.status === "en_vivo" ? "selected" : ""}>\u{1F534} En Vivo</option>
              <option value="finalizado" ${m.status === "finalizado" ? "selected" : ""}>\u2713 Finalizado</option>
            </select>
          </td>
          <td>
            ${m.ratificationStatus === "ratificado_directorio" ? '<span class="admin-badge admin-badge-success">\u2713 Ratificado Directorio</span>' : `<button class="btn-admin-action success" onclick="window.ligamasterRatifyMatch('${m.id}')" title="Ratificar formalmente por Directorio ANFA">Ratificar Acta</button>`}
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-admin-action primary" onclick="window.ligamasterSaveFullMatchScore('${m.id}')" title="Guardar cambios">
                \u{1F4BE} Guardar
              </button>
              <button class="btn-admin-action danger" onclick="window.ligamasterDeleteMatch('${m.id}')" title="Eliminar este partido">
                \u{1F5D1}\uFE0F
              </button>
            </div>
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
    document.getElementById("admin-matches-series-filter")?.addEventListener("change", (e) => {
      currentAdminSeries = e.target.value;
      renderAdminMatches(container, db, league);
    });
  }
  function renderAdminClubs(container, db, league) {
    const clubs = db.clubs || [];
    const selectedClub = clubs.find((c) => c.id === currentAdminClubId) || clubs[0];
    const clubPlayers = (db.players || []).filter((p) => p.clubId === selectedClub?.id);
    let html = `
    <!-- Barra de Selecci\xF3n de Club -->
    <div class="admin-card" style="margin-bottom: 1.25rem;">
      <div class="admin-card-body" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-subtle); border-radius: var(--radius-sm); padding: 0.25rem;">
            ${getClubBadgeSvg(selectedClub?.badgeId || selectedClub?.id, 40)}
          </div>
          <div>
            <label style="display: block; font-size: 0.72rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">Seleccionar Club de la Liga:</label>
            <select id="admin-club-select-dropdown" class="series-select" style="font-weight: 800; font-size: 1rem; padding: 0.4rem 0.85rem;">
  `;
    clubs.forEach((c) => {
      html += `<option value="${c.id}" ${c.id === selectedClub?.id ? "selected" : ""}>${c.name} (${c.shortName || c.name})</option>`;
    });
    html += `
            </select>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button class="btn-primary-coral" onclick="window.ligamasterOpenAddPlayerModal('${selectedClub?.id}')">
            + Inscribir Nuevo Futbolista
          </button>
        </div>
      </div>
    </div>

    <!-- Padr\xF3n de Futbolistas Inscritos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>\u{1F464}</span> Padr\xF3n Oficial de Futbolistas: ${selectedClub?.name}</h3>
        <span class="admin-badge admin-badge-info">${clubPlayers.length} Inscritos en Sistema</span>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Dorsal & Futbolista</th>
                <th>RUT Chileno</th>
                <th>Serie</th>
                <th>Posici\xF3n</th>
                <th>Goles</th>
                <th>Tarjetas</th>
                <th>Estado Reglamentario</th>
                <th>Acci\xF3n</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (clubPlayers.length === 0) {
      html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay futbolistas inscritos para este club a\xFAn.</td></tr>`;
    } else {
      clubPlayers.forEach((p) => {
        const isSuspended = p.status === "suspendido" || p.yellowCards >= 5;
        html += `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <strong style="font-family: var(--font-display); font-size: 1.1rem; color: var(--color-primary); width: 24px;">#${p.number || "-"}</strong>
              <div>
                <strong>${p.name}</strong>
                <small style="display: block; color: var(--color-text-muted);">${p.birthDate || "Ficha ANFA"}</small>
              </div>
            </div>
          </td>
          <td><code>${p.rut || "Pendiente"}</code></td>
          <td><span class="admin-badge admin-badge-info">${p.series || "Honor"}</span></td>
          <td>${p.position || "Jugador"}</td>
          <td><strong>${p.goals || 0}</strong></td>
          <td>
            <span title="Amarillas">\u{1F7E8} ${p.yellowCards || 0}</span> \u2022 
            <span title="Rojas">\u{1F7E5} ${p.redCards || 0}</span>
          </td>
          <td>
            ${isSuspended ? '<span class="admin-badge admin-badge-danger">\u{1F534} Suspendido</span>' : '<span class="admin-badge admin-badge-success">\u{1F7E2} Habilitado</span>'}
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn-admin-action ${isSuspended ? "success" : "danger"}" onclick="window.ligamasterTogglePlayerStatus('${p.id}')" title="Alternar habilitaci\xF3n / suspensi\xF3n">
                ${isSuspended ? "Habilitar" : "Suspender"}
              </button>
              <button class="btn-admin-action danger" onclick="window.ligamasterDeletePlayer('${p.id}')" title="Eliminar del padr\xF3n">
                \u{1F5D1}\uFE0F
              </button>
            </div>
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
    document.getElementById("admin-club-select-dropdown")?.addEventListener("change", (e) => {
      currentAdminClubId = e.target.value;
      renderAdminClubs(container, db, league);
    });
  }
  function renderAdminSanctions(container, db, league) {
    const sanctions = db.sanctionsLedger || [];
    const players = db.players || [];
    const yellowCardWarnings = players.filter((p) => p.yellowCards >= 4);
    let html = `
    <!-- Alerta Informativa del Tribunal -->
    <div class="admin-alert-box info">
      <div style="font-size: 1.25rem;">\u2696\uFE0F</div>
      <div>
        <strong>Tribunal de Honor & Disciplina ANFA:</strong> Registro de penalidades seg\xFAn C\xF3digo de Procedimientos y Penalidades de ANFA Chile. Las suspensiones por 5 amarillas se aplican en forma autom\xE1tica e indelegable.
      </div>
    </div>

    <!-- Tabla de Sanciones Vigentes -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>\u2696\uFE0F</span> Libro Oficial de Fallos & Castigos Disciplinarios</h3>
        <button class="btn-primary-coral" onclick="window.ligamasterOpenAddSanctionModal()">
          + Aplicar Sanci\xF3n Disciplinaria
        </button>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Futbolista Sancionado</th>
                <th>Club</th>
                <th>Serie</th>
                <th>Causa y Art\xEDculo ANFA</th>
                <th>Fechas</th>
                <th>Restantes</th>
                <th>Resoluci\xF3n / Acta</th>
                <th>Acci\xF3n</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (sanctions.length === 0) {
      html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay sanciones disciplinarias vigentes en este momento.</td></tr>`;
    } else {
      sanctions.forEach((s) => {
        html += `
        <tr>
          <td><strong>${s.playerName}</strong></td>
          <td>${s.clubName}</td>
          <td><span class="admin-badge admin-badge-info">${s.series}</span></td>
          <td><small>${s.cause}</small></td>
          <td>${s.datesImposed} impuestas</td>
          <td>
            <strong style="color: ${s.datesRemaining > 0 ? "#b91c1c" : "#15803d"};">
              ${s.datesRemaining} fecha(s)
            </strong>
          </td>
          <td><small style="color: var(--color-text-muted);">${s.meetingDate || "Tribunal ANFA"}</small></td>
          <td>
            ${s.datesRemaining > 0 ? `
              <button class="btn-admin-action success" onclick="window.ligamasterServeSanctionDate('${s.id}')" title="Marcar fecha cumplida">
                \u2713 Cumplir Fecha
              </button>
            ` : '<span class="admin-badge admin-badge-success">Cumplida</span>'}
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Detecci\xF3n Autom\xE1tica de Tarjetas Amarillas (Capilla y Suspensi\xF3n) -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>\u{1F7E8}</span> Control Reglamentario de Tarjetas Amarillas (Art. 42 ANFA)</h3>
      </div>
      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Jugador</th>
                <th>Club</th>
                <th>Amarillas Acumuladas</th>
                <th>Condici\xF3n Reglamentaria</th>
                <th>Procedimiento</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (yellowCardWarnings.length === 0) {
      html += `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">No hay jugadores en advertencia de tarjetas actualmente.</td></tr>`;
    } else {
      yellowCardWarnings.forEach((p) => {
        const isOut = p.yellowCards >= 5;
        html += `
        <tr>
          <td><strong>${p.name}</strong> (#${p.number})</td>
          <td>${p.clubId}</td>
          <td><strong style="font-size: 1.1rem; color: ${isOut ? "#b91c1c" : "#b45309"};">${p.yellowCards} \u{1F7E8}</strong></td>
          <td>
            ${isOut ? '<span class="admin-badge admin-badge-danger">\u26D4 SUSPENDIDO AUTOM\xC1TICO</span>' : '<span class="admin-badge admin-badge-warning">\u26A0\uFE0F EN CAPILLA (A 1 Amarilla)</span>'}
          </td>
          <td>
            <small style="color: var(--color-text-secondary);">
              ${isOut ? "Inhabilitado de oficio para la siguiente fecha oficial." : "Apercibimiento reglamentario."}
            </small>
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
  }
  function renderAdminTreasury(container, db, league) {
    const ledger = db.treasuryLedger || [];
    const totalIngresos = ledger.filter((m) => m.type === "ingreso").reduce((acc, m) => acc + (m.amount || 0), 0);
    const totalEgresos = ledger.filter((m) => m.type === "egreso").reduce((acc, m) => acc + (m.amount || 0), 0);
    const saldoLiquido = totalIngresos - totalEgresos;
    let html = `
    <!-- Resumen Financiero -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card" style="border-left: 4px solid #15803d;">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Total Ingresos Recaudados</span>
          <span class="admin-kpi-icon">\u{1F4C8}</span>
        </div>
        <div class="admin-kpi-value" style="color: #15803d;">
          +$${totalIngresos.toLocaleString("es-CL")}
        </div>
        <div class="admin-kpi-sub">Cuotas de afiliaci\xF3n y aranceles</div>
      </div>

      <div class="admin-kpi-card" style="border-left: 4px solid #b91c1c;">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Total Egresos Operativos</span>
          <span class="admin-kpi-icon">\u{1F4C9}</span>
        </div>
        <div class="admin-kpi-value" style="color: #b91c1c;">
          -$${totalEgresos.toLocaleString("es-CL")}
        </div>
        <div class="admin-kpi-sub">Arbitrajes CAPA, balones y sede</div>
      </div>

      <div class="admin-kpi-card" style="border-left: 4px solid var(--color-primary);">
        <div class="admin-kpi-top">
          <span class="admin-kpi-label">Saldo Disponible en Caja</span>
          <span class="admin-kpi-icon">\u{1F3E6}</span>
        </div>
        <div class="admin-kpi-value">
          $${saldoLiquido.toLocaleString("es-CL")}
        </div>
        <div class="admin-kpi-sub">Caja chica y cuenta bancaria ANFA</div>
      </div>
    </div>

    <!-- Libro Diario de Movimientos -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3><span>\u{1F4B0}</span> Libro Diario de Caja Chica & Tesorer\xEDa ANFA</h3>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-admin-action" onclick="window.print()">
            \u{1F5A8}\uFE0F Imprimir Balance
          </button>
          <button class="btn-primary-coral" onclick="window.ligamasterOpenAddTreasuryModal()">
            + Registrar Movimiento
          </button>
        </div>
      </div>

      <div class="admin-card-body" style="padding: 0;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Folio</th>
                <th>Club / Proveedor</th>
                <th>Concepto</th>
                <th>Categor\xEDa</th>
                <th style="text-align: right;">Monto ($ CLP)</th>
                <th>Acci\xF3n</th>
              </tr>
            </thead>
            <tbody>
  `;
    if (ledger.length === 0) {
      html += `<tr><td colspan="8" style="text-align: center; color: var(--color-text-muted); padding: 3rem;">No hay registros contables en la caja de esta liga.</td></tr>`;
    } else {
      ledger.forEach((m) => {
        const isIngreso = m.type === "ingreso";
        html += `
        <tr>
          <td><small>${m.date}</small></td>
          <td>
            ${isIngreso ? '<span class="admin-badge admin-badge-success">Ingreso</span>' : '<span class="admin-badge admin-badge-danger">Egreso</span>'}
          </td>
          <td><code>${m.receiptFolio || "S/F"}</code></td>
          <td><strong>${m.clubName || "Asociaci\xF3n"}</strong></td>
          <td><small>${m.concept}</small></td>
          <td><span class="admin-badge admin-badge-info">${m.category}</span></td>
          <td style="text-align: right; font-family: var(--font-display); font-weight: 800; color: ${isIngreso ? "#15803d" : "#b91c1c"};">
            ${isIngreso ? "+" : "-"}$${(m.amount || 0).toLocaleString("es-CL")}
          </td>
          <td>
            <button class="btn-admin-action danger" onclick="window.ligamasterDeleteTreasuryItem('${m.id}')" title="Eliminar registro">
              \u{1F5D1}\uFE0F
            </button>
          </td>
        </tr>
      `;
      });
    }
    html += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
  }
  function renderAdminSettings(container, db, league) {
    const lInfo = db.leagueInfo || {};
    let html = `
    <div class="admin-card" style="max-width: 800px; margin: 0 auto;">
      <div class="admin-card-header">
        <h3><span>\u2699\uFE0F</span> Configuraci\xF3n General de la Asociaci\xF3n</h3>
        <span class="admin-badge admin-badge-info">ID: ${league.id}</span>
      </div>

      <div class="admin-card-body">
        <form id="admin-settings-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Oficial de la Asociaci\xF3n</label>
              <input type="text" id="set-name" class="series-select" style="width: 100%;" value="${lInfo.name || league.name}" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Corto / Sigla</label>
              <input type="text" id="set-shortName" class="series-select" style="width: 100%;" value="${lInfo.shortName || league.shortName || ""}">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Presidente de la Asociaci\xF3n</label>
              <input type="text" id="set-president" class="series-select" style="width: 100%;" value="${lInfo.president || league.president || ""}" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Comuna y Regi\xF3n</label>
              <input type="text" id="set-commune" class="series-select" style="width: 100%;" value="${lInfo.commune || league.commune || ""}">
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Sede Social Oficial / Direcci\xF3n</label>
            <input type="text" id="set-headquarters" class="series-select" style="width: 100%;" value="${lInfo.headquarters || "Calle Principal s/n"}">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Temporada Vigente</label>
              <input type="text" id="set-season" class="series-select" style="width: 100%;" value="${lInfo.season || "Campeonato Oficial 2026/27"}">
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Medio Oficial de Transmisi\xF3n</label>
              <input type="text" id="set-media" class="series-select" style="width: 100%;" value="${lInfo.mediaPartner || "Transmisiones Deportivas"}">
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
            <button type="button" class="btn-admin-action danger" onclick="window.ligamasterResetActiveLeague('${league.id}')">
              \u26A0\uFE0F Restablecer Datos de Demostraci\xF3n
            </button>
            <button type="submit" class="btn-primary-coral">
              \u{1F4BE} Guardar Configuraci\xF3n
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- M\xF3dulo de Carga Masiva y Respaldo de Base de Datos -->
    <div class="admin-card" style="max-width: 800px; margin: 1.5rem auto 0;">
      <div class="admin-card-header">
        <h3><span>\u{1F4BE}</span> Carga Masiva, Respaldos y Migraci\xF3n de Campeonato</h3>
        <span class="admin-badge admin-badge-success">Base de Datos JSON</span>
      </div>
      <div class="admin-card-body">
        <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1.25rem;">
          Puedes exportar toda la base de datos de esta liga (clubes, jugadores, fixture de partidos, tribunal y estad\xEDsticas) para respaldarla en tu computador o cargar una base de datos completa de un nuevo torneo desde un archivo JSON.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <!-- Exportar -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">\u{1F4E5}</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Exportar Campeonato</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Descarga el archivo .json con toda la informaci\xF3n vigente.</p>
            <button type="button" class="btn-primary-coral" onclick="window.ligamasterExportDatabase()" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;">
              Descargar Respaldo JSON
            </button>
          </div>

          <!-- Importar -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">\u{1F4E4}</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Cargar Base de Datos</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Sube un archivo .json con los clubes y fixture completos.</p>
            <label class="btn-admin-action" style="display: block; width: 100%; font-size: 0.8rem; padding: 0.5rem; cursor: pointer; text-align: center; background: #ffffff; border: 1px solid var(--color-primary); color: var(--color-primary); font-weight: 700; border-radius: var(--radius-sm);">
              <span>Examinar Archivo...</span>
              <input type="file" id="input-import-db" accept=".json" onchange="window.ligamasterImportDatabase(event)" style="display: none;">
            </label>
          </div>

          <!-- Plantilla Modelo -->
          <div style="background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1rem; text-align: center;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">\u{1F4CB}</div>
            <h4 style="font-size: 0.9rem; margin-bottom: 0.35rem;">Plantilla en Blanco</h4>
            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 1rem;">Descarga la estructura oficial vac\xEDa para armar una nueva liga.</p>
            <button type="button" class="btn-admin-action" onclick="window.ligamasterDownloadTemplate()" style="width: 100%; font-size: 0.8rem; padding: 0.5rem; border: 1px solid var(--color-border);">
              Descargar Plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
    container.innerHTML = html;
    document.getElementById("admin-settings-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!db.leagueInfo) db.leagueInfo = {};
      db.leagueInfo.name = document.getElementById("set-name")?.value || db.leagueInfo.name;
      db.leagueInfo.shortName = document.getElementById("set-shortName")?.value || db.leagueInfo.shortName;
      db.leagueInfo.president = document.getElementById("set-president")?.value || db.leagueInfo.president;
      db.leagueInfo.commune = document.getElementById("set-commune")?.value || db.leagueInfo.commune;
      db.leagueInfo.headquarters = document.getElementById("set-headquarters")?.value || db.leagueInfo.headquarters;
      db.leagueInfo.season = document.getElementById("set-season")?.value || db.leagueInfo.season;
      db.leagueInfo.mediaPartner = document.getElementById("set-media")?.value || db.leagueInfo.mediaPartner;
      saveDb(db, league.id);
      showToast("Configuraci\xF3n guardada exitosamente.", "success");
      renderAdminView();
    });
  }
  window.ligamasterSaveMatchScore = (matchId) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const m = (db.matches || []).find((item) => item.id === matchId);
    if (!m) return;
    const hScore = parseInt(document.getElementById(`score-h-${matchId}`)?.value || "0", 10);
    const aScore = parseInt(document.getElementById(`score-a-${matchId}`)?.value || "0", 10);
    const status = document.getElementById(`status-${matchId}`)?.value || m.status;
    m.homeScore = hScore;
    m.awayScore = aScore;
    m.status = status;
    saveDb(db, activeId);
    recalculateStandings(db, m.series);
    saveDb(db, activeId);
    showToast(`Marcador actualizado: ${hScore} - ${aScore} (${status}). Posiciones recalculadas.`, "success");
    renderAdminView();
  };
  window.ligamasterSaveFullMatchScore = (matchId) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const m = (db.matches || []).find((item) => item.id === matchId);
    if (!m) return;
    const hScore = parseInt(document.getElementById(`full-score-h-${matchId}`)?.value || "0", 10);
    const aScore = parseInt(document.getElementById(`full-score-a-${matchId}`)?.value || "0", 10);
    const status = document.getElementById(`full-status-${matchId}`)?.value || m.status;
    m.homeScore = hScore;
    m.awayScore = aScore;
    m.status = status;
    saveDb(db, activeId);
    recalculateStandings(db, m.series);
    saveDb(db, activeId);
    showToast(`Partido guardado: ${hScore} : ${aScore} (${status}).`, "success");
    renderAdminView();
  };
  window.ligamasterRatifyMatch = (matchId) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const m = (db.matches || []).find((item) => item.id === matchId);
    if (!m) return;
    m.ratificationStatus = "ratificado_directorio";
    m.ratificationLabel = "Oficializado y Ratificado por Directorio ANFA";
    saveDb(db, activeId);
    showToast("Planilla del partido oficializada y ratificada por la Directiva.", "success");
    renderAdminView();
  };
  window.ligamasterDeleteMatch = (matchId) => {
    if (!confirm("\xBFSeguro que deseas eliminar este partido del calendario?")) return;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    db.matches = (db.matches || []).filter((m) => m.id !== matchId);
    saveDb(db, activeId);
    renderAdminView();
  };
  window.ligamasterTogglePlayerStatus = (playerId) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const p = (db.players || []).find((item) => item.id === playerId);
    if (!p) return;
    if (p.status === "suspendido") {
      p.status = "habilitado";
      p.yellowCards = 0;
      showToast(`Futbolista ${p.name} ha sido HABILITADO.`, "success");
    } else {
      p.status = "suspendido";
      showToast(`Futbolista ${p.name} ha sido SUSPENDIDO reglamentariamente.`, "warning");
    }
    saveDb(db, activeId);
    renderAdminView();
  };
  window.ligamasterDeletePlayer = (playerId) => {
    if (!confirm("\xBFSeguro que deseas eliminar a este jugador del padr\xF3n oficial?")) return;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    db.players = (db.players || []).filter((p) => p.id !== playerId);
    saveDb(db, activeId);
    renderAdminView();
  };
  window.ligamasterServeSanctionDate = (sanctionId) => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const s = (db.sanctionsLedger || []).find((item) => item.id === sanctionId);
    if (!s) return;
    s.datesRemaining = Math.max(0, (s.datesRemaining || 1) - 1);
    s.datesServed = (s.datesServed || 0) + 1;
    if (s.datesRemaining === 0) {
      s.status = "cumplida";
      const p = (db.players || []).find((item) => item.name.toLowerCase() === s.playerName.toLowerCase());
      if (p) p.status = "habilitado";
      showToast(`\xA1Sanci\xF3n cumplida en su totalidad! El jugador ${s.playerName} queda habilitado.`, "success");
    } else {
      showToast(`Fecha computada. Fechas restantes de castigo: ${s.datesRemaining}.`, "info");
    }
    saveDb(db, activeId);
    renderAdminView();
  };
  window.ligamasterDeleteTreasuryItem = (itemId) => {
    if (!confirm("\xBFEliminar este registro contable de la caja?")) return;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    db.treasuryLedger = (db.treasuryLedger || []).filter((m) => m.id !== itemId);
    saveDb(db, activeId);
    renderAdminView();
  };
  window.ligamasterResetActiveLeague = (leagueId) => {
    if (!confirm("\xBFSeguro que deseas restablecer esta liga a sus datos originales de f\xE1brica? Se perder\xE1n las modificaciones locales.")) return;
    resetDb(leagueId);
    showToast("Base de datos restablecida a sus valores originales.", "info");
    renderAdminView();
  };
  function recalculateStandings(db, series = "honor") {
    if (!db.clubs || !db.matches) return;
    const seriesMatches = db.matches.filter((m) => m.series === series && m.status === "finalizado");
    const statsMap = {};
    db.clubs.forEach((c) => {
      statsMap[c.id] = {
        clubId: c.id,
        clubName: c.name,
        pj: 0,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
        dg: 0,
        pts: 0
      };
    });
    seriesMatches.forEach((m) => {
      const h = statsMap[m.homeClubId];
      const a = statsMap[m.awayClubId];
      if (!h || !a) return;
      h.pj += 1;
      a.pj += 1;
      h.gf += m.homeScore || 0;
      h.gc += m.awayScore || 0;
      a.gf += m.awayScore || 0;
      a.gc += m.homeScore || 0;
      if (m.homeScore > m.awayScore) {
        h.pg += 1;
        h.pts += 3;
        a.pp += 1;
      } else if (m.homeScore < m.awayScore) {
        a.pg += 1;
        a.pts += 3;
        h.pp += 1;
      } else {
        h.pe += 1;
        h.pts += 1;
        a.pe += 1;
        a.pts += 1;
      }
      h.dg = h.gf - h.gc;
      a.dg = a.gf - a.gc;
    });
    const sorted = Object.values(statsMap).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      return b.gf - a.gf;
    });
    sorted.forEach((row, idx) => {
      row.pos = idx + 1;
    });
    if (!db.standings) db.standings = {};
    db.standings[series] = sorted;
  }
  function setupAdminModals() {
    window.ligamasterOpenAddMatchModal = () => {
      const activeId = getActiveLeagueId();
      const db = getDb(activeId);
      const seriesList = getLeagueSeries(activeId);
      const clubs = db.clubs || [];
      const venues = db.venues || [];
      const modal = document.getElementById("modal-admin-add-match");
      if (!modal) return;
      const body = modal.querySelector(".modal-body");
      if (body) {
        body.innerHTML = `
        <form id="form-admin-add-match">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Local</label>
              <select id="new-match-home" class="series-select" style="width: 100%;" required>
                ${clubs.map((c) => `<option value="${c.id}">${c.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Visita</label>
              <select id="new-match-away" class="series-select" style="width: 100%;" required>
                ${clubs.map((c, i) => `<option value="${c.id}" ${i === 1 ? "selected" : ""}>${c.name}</option>`).join("")}
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Serie</label>
              <select id="new-match-series" class="series-select" style="width: 100%;">
                ${seriesList.map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Recinto / Cancha</label>
              <select id="new-match-venue" class="series-select" style="width: 100%;">
                ${venues.map((v) => `<option value="${v.name}">${v.name}</option>`).join("")}
                <option value="Estadio Municipal">Estadio Municipal</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Fecha & Hora</label>
              <input type="text" id="new-match-date" class="series-select" style="width: 100%;" placeholder="ej: Domingo \u2022 16:30 hrs" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">\xC1rbitro Asignado</label>
              <input type="text" id="new-match-referee" class="series-select" style="width: 100%;" placeholder="ej: Colegio CAPA" value="Colegio de \xC1rbitros Oficial">
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Guardar & Programar Partido
          </button>
        </form>
      `;
        document.getElementById("form-admin-add-match")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const homeId = document.getElementById("new-match-home")?.value;
          const awayId = document.getElementById("new-match-away")?.value;
          if (homeId === awayId) {
            showToast("El equipo local y visita no pueden ser el mismo.", "error");
            return;
          }
          const newMatch = {
            id: `match-${activeId}-${Date.now().toString().slice(-4)}`,
            series: document.getElementById("new-match-series")?.value || "honor",
            round: "Fecha Oficial",
            homeClubId: homeId,
            awayClubId: awayId,
            venue: document.getElementById("new-match-venue")?.value || "Estadio Municipal",
            date: document.getElementById("new-match-date")?.value || "Fin de semana",
            referee: document.getElementById("new-match-referee")?.value || "Terna Oficial",
            turnOfficial: "Designado por Directorio ANFA",
            status: "programado",
            homeScore: 0,
            awayScore: 0,
            events: []
          };
          if (!db.matches) db.matches = [];
          db.matches.unshift(newMatch);
          saveDb(db, activeId);
          modal.classList.remove("active");
          showToast("Partido programado exitosamente.", "success");
          renderAdminView();
        });
      }
      modal.classList.add("active");
    };
    window.ligamasterOpenAddPlayerModal = (defaultClubId = null) => {
      const activeId = getActiveLeagueId();
      const db = getDb(activeId);
      const seriesList = getLeagueSeries(activeId);
      const clubs = db.clubs || [];
      const modal = document.getElementById("modal-admin-add-player");
      if (!modal) return;
      const body = modal.querySelector(".modal-body");
      if (body) {
        body.innerHTML = `
        <form id="form-admin-add-player">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club Afiliado</label>
            <select id="new-player-club" class="series-select" style="width: 100%;" required>
              ${clubs.map((c) => `<option value="${c.id}" ${c.id === defaultClubId ? "selected" : ""}>${c.name}</option>`).join("")}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre Completo del Futbolista</label>
              <input type="text" id="new-player-name" class="series-select" style="width: 100%;" placeholder="ej: Esteban Paredes" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">RUT Chileno</label>
              <input type="text" id="new-player-rut" class="series-select" style="width: 100%;" placeholder="ej: 18.234.567-8" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Dorsal (#)</label>
              <input type="number" id="new-player-number" min="1" max="99" class="series-select" style="width: 100%;" value="9" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Serie</label>
              <select id="new-player-series" class="series-select" style="width: 100%;">
                ${seriesList.map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Posici\xF3n</label>
              <select id="new-player-pos" class="series-select" style="width: 100%;">
                <option value="Delantero">Delantero</option>
                <option value="Volante">Volante</option>
                <option value="Defensa">Defensa</option>
                <option value="Arquero">Arquero</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Confirmar Inscripci\xF3n Oficial
          </button>
        </form>
      `;
        document.getElementById("form-admin-add-player")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const newPlayer = {
            id: `p-${Date.now().toString().slice(-5)}`,
            clubId: document.getElementById("new-player-club")?.value,
            series: document.getElementById("new-player-series")?.value || "honor",
            rut: document.getElementById("new-player-rut")?.value || "Sin RUT",
            name: document.getElementById("new-player-name")?.value || "Jugador",
            number: parseInt(document.getElementById("new-player-number")?.value || "9", 10),
            position: document.getElementById("new-player-pos")?.value || "Delantero",
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            status: "habilitado",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
          };
          if (!db.players) db.players = [];
          db.players.unshift(newPlayer);
          saveDb(db, activeId);
          modal.classList.remove("active");
          showToast(`Futbolista ${newPlayer.name} inscrito exitosamente en el club.`, "success");
          renderAdminView();
        });
      }
      modal.classList.add("active");
    };
    window.ligamasterOpenAddSanctionModal = () => {
      const activeId = getActiveLeagueId();
      const db = getDb(activeId);
      const clubs = db.clubs || [];
      const modal = document.getElementById("modal-admin-add-sanction");
      if (!modal) return;
      const body = modal.querySelector(".modal-body");
      if (body) {
        body.innerHTML = `
        <form id="form-admin-add-sanction">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club del Jugador</label>
              <select id="sanc-club" class="series-select" style="width: 100%;" required>
                ${clubs.map((c) => `<option value="${c.name}">${c.name}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Nombre del Futbolista</label>
              <input type="text" id="sanc-player" class="series-select" style="width: 100%;" placeholder="ej: Esteban Carriel" required>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Causa Reglamentaria / Fallo ANFA</label>
            <textarea id="sanc-cause" class="series-select" style="width: 100%; height: 70px; resize: vertical;" placeholder="ej: Expulsi\xF3n con Roja Directa: Agresi\xF3n verbal a juez de l\xEDnea (Art. 54 Reglamento ANFA)" required></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Fechas de Suspensi\xF3n</label>
              <input type="number" id="sanc-dates" min="1" max="20" class="series-select" style="width: 100%;" value="2" required>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">N\xBA de Acta del Tribunal</label>
              <input type="text" id="sanc-acta" class="series-select" style="width: 100%;" value="Sesi\xF3n Tribunal ANFA (Acta N\xBA 15)">
            </div>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Registrar Fallo Disciplinario
          </button>
        </form>
      `;
        document.getElementById("form-admin-add-sanction")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const dates = parseInt(document.getElementById("sanc-dates")?.value || "1", 10);
          const playerName = document.getElementById("sanc-player")?.value || "Jugador";
          const newSanction = {
            id: `sanc-${Date.now().toString().slice(-4)}`,
            playerName,
            clubName: document.getElementById("sanc-club")?.value || "Club",
            series: "Serie de Honor",
            cause: document.getElementById("sanc-cause")?.value || "Sanci\xF3n disciplinaria",
            datesImposed: dates,
            datesServed: 0,
            datesRemaining: dates,
            status: "vigente",
            meetingDate: document.getElementById("sanc-acta")?.value || "Acta Oficial"
          };
          if (!db.sanctionsLedger) db.sanctionsLedger = [];
          db.sanctionsLedger.unshift(newSanction);
          const p = (db.players || []).find((item) => item.name.toLowerCase() === playerName.toLowerCase());
          if (p) p.status = "suspendido";
          saveDb(db, activeId);
          modal.classList.remove("active");
          showToast(`Sanci\xF3n disciplinaria aplicada: ${playerName} inhabilitado por ${dates} fecha(s).`, "warning");
          renderAdminView();
        });
      }
      modal.classList.add("active");
    };
    window.ligamasterOpenAddTreasuryModal = () => {
      const activeId = getActiveLeagueId();
      const db = getDb(activeId);
      const clubs = db.clubs || [];
      const modal = document.getElementById("modal-admin-add-treasury");
      if (!modal) return;
      const body = modal.querySelector(".modal-body");
      if (body) {
        body.innerHTML = `
        <form id="form-admin-add-treasury">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Tipo de Movimiento</label>
              <select id="mov-type" class="series-select" style="width: 100%;">
                <option value="ingreso">\u{1F7E2} Ingreso a Caja</option>
                <option value="egreso">\u{1F534} Egreso / Gasto</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Monto en Pesos ($ CLP)</label>
              <input type="number" id="mov-amount" min="100" step="500" class="series-select" style="width: 100%; font-weight: 800;" placeholder="ej: 45000" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Categor\xEDa</label>
              <select id="mov-cat" class="series-select" style="width: 100%;">
                <option value="Cuota de Inscripci\xF3n">Cuota de Inscripci\xF3n</option>
                <option value="Honorarios Arbitrales">Honorarios Arbitrales</option>
                <option value="Multa Tribunal de Penas">Multa Tribunal de Penas</option>
                <option value="Implementaci\xF3n Deportiva">Implementaci\xF3n Deportiva</option>
                <option value="Mantenci\xF3n y Operaci\xF3n">Mantenci\xF3n Sede / Operaci\xF3n</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">N\xBA de Folio / Comprobante</label>
              <input type="text" id="mov-folio" class="series-select" style="width: 100%;" value="REC-${Date.now().toString().slice(-4)}" required>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Club o Entidad Relacionada</label>
            <select id="mov-club" class="series-select" style="width: 100%;">
              <option value="Asociaci\xF3n">Asociaci\xF3n (General)</option>
              ${clubs.map((c) => `<option value="${c.name}">${c.name}</option>`).join("")}
            </select>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">Concepto / Glosa Detallada</label>
            <input type="text" id="mov-concept" class="series-select" style="width: 100%;" placeholder="ej: Pago arbitraje terna Fecha 8" required>
          </div>

          <button type="submit" class="btn-primary-coral" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Guardar Movimiento Contable
          </button>
        </form>
      `;
        document.getElementById("form-admin-add-treasury")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const now = /* @__PURE__ */ new Date();
          const dateStr = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;
          const newMov = {
            id: `mov-${Date.now().toString().slice(-5)}`,
            date: dateStr,
            type: document.getElementById("mov-type")?.value || "ingreso",
            category: document.getElementById("mov-cat")?.value || "General",
            clubName: document.getElementById("mov-club")?.value || "Asociaci\xF3n",
            concept: document.getElementById("mov-concept")?.value || "Movimiento de caja",
            amount: parseInt(document.getElementById("mov-amount")?.value || "0", 10),
            receiptFolio: document.getElementById("mov-folio")?.value || "REC-000",
            status: "pagado"
          };
          if (!db.treasuryLedger) db.treasuryLedger = [];
          db.treasuryLedger.unshift(newMov);
          saveDb(db, activeId);
          modal.classList.remove("active");
          showToast(`Movimiento de $${newMov.amount.toLocaleString("es-CL")} registrado con \xE9xito.`, "success");
          renderAdminView();
        });
      }
      modal.classList.add("active");
    };
  }
  window.ligamasterExportDatabase = () => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `ligamaster_campeonato_${activeId}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Base de datos exportada en formato JSON.", "success");
  };
  window.ligamasterImportDatabase = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported || typeof imported !== "object") {
          throw new Error("Estructura de archivo inv\xE1lida.");
        }
        if (!imported.clubs && !imported.matches && !imported.leagueInfo) {
          showToast("El archivo no contiene un formato de campeonato v\xE1lido de LigaMaster.", "error");
          return;
        }
        const activeId = getActiveLeagueId();
        saveDb(imported, activeId);
        showToast("\xA1Campeonato y base de datos importados con \xE9xito!", "success");
        window.dispatchEvent(new CustomEvent("ligamaster:league-changed", { detail: activeId }));
        renderAdminView();
      } catch (err) {
        showToast("Error al importar el archivo JSON: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  };
  window.ligamasterDownloadTemplate = () => {
    const template = {
      leagueInfo: {
        name: "Nombre de la Nueva Asociaci\xF3n o Liga",
        shortName: "LIGA",
        president: "Nombre del Presidente",
        commune: "Comuna, Regi\xF3n",
        season: "Temporada 2026/27",
        headquarters: "Direcci\xF3n de la sede",
        founded: 1980,
        totalClubs: 8
      },
      seriesList: [
        { id: "honor", name: "Serie de Honor (Primera)", shortName: "Honor" },
        { id: "senior_35", name: "Serie Senior (35+ A\xF1os)", shortName: "Senior" },
        { id: "juvenil", name: "Serie Juvenil (Sub-17)", shortName: "Juvenil" }
      ],
      clubs: [
        {
          id: "club-1",
          name: "Club Deportivo Ejemplo 1",
          shortName: "Ejemplo 1",
          founded: 1950,
          president: "Dirigente 1",
          stadium: "Estadio Municipal",
          colors: { primary: "#e62238", secondary: "#ffffff" },
          badgeId: "asociacion-arauco",
          description: "Club participante del torneo oficial."
        },
        {
          id: "club-2",
          name: "Club Deportivo Ejemplo 2",
          shortName: "Ejemplo 2",
          founded: 1962,
          president: "Dirigente 2",
          stadium: "Cancha Municipal",
          colors: { primary: "#131b2e", secondary: "#f59e0b" },
          badgeId: "asociacion-arauco",
          description: "Club participante del torneo oficial."
        }
      ],
      players: [
        {
          id: "p-101",
          clubId: "club-1",
          name: "Juan P\xE9rez Gonz\xE1lez",
          nickname: "El Tanque",
          rut: "18.345.678-9",
          dorsal: 9,
          position: "Delantero Centro",
          series: "honor",
          isCaptain: true,
          stats: { matches: 5, goals: 4, assists: 1, yellowCards: 1, redCards: 0 }
        }
      ],
      matches: [
        {
          id: "match-101",
          round: 1,
          series: "honor",
          date: "2026-10-10",
          time: "16:00",
          venue: "Estadio Municipal",
          homeClubId: "club-1",
          awayClubId: "club-2",
          homeScore: 0,
          awayScore: 0,
          status: "programado",
          scorers: [],
          cards: []
        }
      ],
      standings: {
        honor: [],
        senior_35: [],
        juvenil: []
      },
      sanctions: [],
      treasuryLedger: [],
      venues: [
        { id: "v-1", name: "Estadio Municipal", address: "Av. Principal s/n", surface: "Pasto Sint\xE9tico FIFA" }
      ]
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `plantilla_campeonato_ligamaster.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Plantilla de campeonato descargada.", "success");
  };

  // js/app.js
  var FALLBACK_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23131b2e'/><circle cx='50' cy='40' r='22' fill='%23334155'/><path d='M20 90c0-18 14-26 30-26s30 8 30 26z' fill='%23334155'/></svg>";
  var FALLBACK_NEWS = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect width='400' height='250' fill='%230f172a'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-weight='800' font-size='18'>LIGAMASTER OFICIAL</text></svg>";
  if (typeof window !== "undefined") {
    window.ligamasterImageFallback = (img, type = "avatar") => {
      if (!img) return;
      img.onerror = null;
      img.src = type === "news" ? FALLBACK_NEWS : FALLBACK_AVATAR;
    };
  }
  var currentActiveView = "home-view";
  var currentActiveSeries = "honor";
  var currentActiveClubId = "club-arauco";
  var currentActivePlayerId = "p-jr-9";
  var currentActiveRound = 8;
  var currentStatCategory = "goleadores";
  var currentTeamTab = "resumen";
  var VIEW_MAP = {
    "home": "home-view",
    "home-view": "home-view",
    "liga": "league-view",
    "league-view": "league-view",
    "competicion": "league-view",
    "tabla": "standings-view",
    "standings-view": "standings-view",
    "posiciones": "standings-view",
    "calendario": "calendar-view",
    "calendar-view": "calendar-view",
    "fixture": "calendar-view",
    "resultados": "results-view",
    "results-view": "results-view",
    "equipos": "team-view",
    "team-view": "team-view",
    "clubes": "team-view",
    "jugadores": "player-view",
    "player-view": "player-view",
    "estadisticas": "stats-view",
    "stats-view": "stats-view",
    "goleadores": "stats-view",
    "noticias": "news-view",
    "news-view": "news-view",
    "prensa": "news-view",
    "admin": "admin-view",
    "admin-view": "admin-view",
    "panel": "admin-view",
    "gestion": "admin-view"
  };
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => initLigaMaster());
    } else {
      initLigaMaster();
    }
  }
  function initLigaMaster() {
    const db = getDb();
    if (db.clubs && db.clubs.length > 0) {
      currentActiveClubId = db.clubs[0].id;
    }
    if (db.players && db.players.length > 0) {
      currentActivePlayerId = db.players[0].id;
    }
    updateSeriesSelectDropdowns(db.seriesList || []);
    setupNavigationRouting();
    setupGlobalModals();
    setupGlobalSearch();
    setupSeriesFilters();
    setupMultiLeagueHandlers();
    setupFooterLinks();
    initAuth();
    initAdmin();
    renderActiveLeagueContext();
    renderHomeView();
    renderLeagueView();
    renderStandingsView();
    renderCalendarView();
    renderResultsView();
    renderTeamView();
    renderPlayerView();
    renderStatsView();
    renderNewsView();
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
  }
  function navigateTo(targetViewId, scroll = true) {
    const mappedId = VIEW_MAP[targetViewId] || targetViewId;
    const viewEl = document.getElementById(mappedId);
    if (!viewEl) return;
    currentActiveView = mappedId;
    document.querySelectorAll(".platform-view").forEach((v) => {
      v.classList.remove("active");
    });
    viewEl.classList.add("active");
    document.querySelectorAll(".platform-nav-link").forEach((link) => {
      const target = link.getAttribute("data-nav");
      if (target === mappedId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    document.querySelectorAll(".league-subnav-link").forEach((link) => {
      const target = link.getAttribute("data-nav");
      if (target === mappedId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    closeModal("modal-mobile-menu");
    if (scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (mappedId === "team-view") renderTeamView();
    if (mappedId === "player-view") renderPlayerView();
    if (mappedId === "standings-view") renderStandingsView();
    if (mappedId === "stats-view") renderStatsView();
    if (mappedId === "admin-view") renderAdminView();
  }
  window.ligamasterNavigate = navigateTo;
  function handleHashChange() {
    const hash = window.location.hash.replace("#", "").trim();
    if (hash && VIEW_MAP[hash]) {
      navigateTo(VIEW_MAP[hash], false);
    }
  }
  function setupNavigationRouting() {
    document.addEventListener("click", (e) => {
      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        e.preventDefault();
        const target = navBtn.getAttribute("data-nav");
        if (target) {
          navigateTo(target);
        }
      }
    });
    document.getElementById("brand-home-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("home-view");
    });
    document.getElementById("hero-btn-ver-ligas")?.addEventListener("click", () => {
      openModal("modal-league-picker");
    });
    document.getElementById("nav-btn-ligas-picker")?.addEventListener("click", () => {
      openModal("modal-league-picker");
    });
    document.getElementById("mobile-btn-ligas")?.addEventListener("click", () => {
      closeModal("modal-mobile-menu");
      openModal("modal-league-picker");
    });
  }
  function setupMultiLeagueHandlers() {
    document.getElementById("btn-trigger-league-picker")?.addEventListener("click", () => {
      openModal("modal-league-picker");
    });
    window.addEventListener("ligamaster:league-changed", (e) => {
      const leagueId = e.detail;
      const db = getDb(leagueId);
      const seriesList = db.seriesList || [];
      const supportedIds = seriesList.map((s) => s.id);
      if (!supportedIds.includes(currentActiveSeries)) {
        currentActiveSeries = supportedIds[0] || "honor";
      }
      updateSeriesSelectDropdowns(seriesList);
      if (db.clubs && db.clubs.length > 0) {
        currentActiveClubId = db.clubs[0].id;
      }
      if (db.players && db.players.length > 0) {
        currentActivePlayerId = db.players[0].id;
      }
      renderActiveLeagueContext();
      renderHomeView();
      renderLeagueView();
      renderStandingsView();
      renderCalendarView();
      renderResultsView();
      renderTeamView();
      renderPlayerView();
      renderStatsView();
      renderNewsView();
      renderLeaguePickerModal();
    });
    window.ligamasterSwitchLeague = (leagueId) => {
      setActiveLeagueId(leagueId);
      closeModal("modal-league-picker");
      navigateTo("league-view");
    };
  }
  function updateSeriesSelectDropdowns(seriesList) {
    const globalSelect = document.getElementById("global-series-select");
    const standingsSelect = document.getElementById("standings-series-select");
    const list = seriesList && seriesList.length > 0 ? seriesList : [
      { id: "honor", name: "Serie de Honor (Primera)" },
      { id: "senior_35", name: "Serie Senior (35+ A\xF1os)" },
      { id: "juvenil", name: "Serie Juvenil (Sub-17)" }
    ];
    let optionsHtml = "";
    list.forEach((s) => {
      optionsHtml += `<option value="${s.id}">${s.name || s.shortName || s.id}</option>`;
    });
    if (globalSelect) {
      globalSelect.innerHTML = optionsHtml;
      globalSelect.value = currentActiveSeries;
    }
    if (standingsSelect) {
      standingsSelect.innerHTML = optionsHtml;
      standingsSelect.value = currentActiveSeries;
    }
  }
  function renderActiveLeagueContext() {
    const activeId = getActiveLeagueId();
    const league = getLeagueById(activeId);
    const crestEl = document.getElementById("context-league-crest");
    const nameEl = document.getElementById("context-league-name");
    const regionEl = document.getElementById("context-league-region");
    const demoBanner = document.getElementById("league-demo-banner");
    const demoNoticeText = document.getElementById("league-demo-notice-text");
    if (crestEl) {
      crestEl.innerHTML = getClubBadgeSvg(league.badgeId || "asociacion-arauco", 28);
    }
    if (nameEl) {
      nameEl.textContent = league.name;
    }
    if (regionEl) {
      regionEl.textContent = `${league.commune} \u2022 ${league.statusLabel}`;
    }
    if (demoBanner) {
      if (league.isDemo) {
        demoBanner.style.display = "block";
        if (demoNoticeText) {
          demoNoticeText.textContent = `Entorno de Demostraci\xF3n: Estructura de liga preconfigurada (${league.name}) para presentaci\xF3n e integraci\xF3n a LigaMaster.`;
        }
      } else {
        demoBanner.style.display = "none";
      }
    }
  }
  function renderHomeView() {
    renderHomeLeaguesGrid();
    renderHomeFeaturedMatches();
    renderHomeMiniStandings();
    renderHomeMiniScorers();
    renderHomeMiniNews();
  }
  function renderHomeLeaguesGrid() {
    const container = document.getElementById("home-leagues-grid");
    if (!container) return;
    const regions = getRegionsAndLeagues();
    const activeId = getActiveLeagueId();
    let html = "";
    regions.forEach((reg) => {
      reg.leagues.forEach((league) => {
        const isActive = league.id === activeId;
        html += `
        <div class="league-picker-card ${isActive ? "active-league" : ""}" onclick="window.ligamasterSwitchLeague('${league.id}')">
          <div>
            <div class="league-picker-header">
              <div class="league-picker-crest">
                ${getClubBadgeSvg(league.badgeId || "asociacion-arauco", 40)}
              </div>
              <div class="league-picker-meta">
                <h4>${league.name}</h4>
                <span>${reg.regionName} \u2022 ${league.commune}</span>
              </div>
            </div>
            <div style="margin-bottom: 0.75rem;">
              <span class="league-picker-badge ${league.isDemo ? "demo" : "active"}">
                ${league.isDemo ? "\u{1F7E1} Demostraci\xF3n Multi-Liga" : "\u{1F7E2} Torneo Oficial en Vivo"}
              </span>
            </div>
            <p style="font-size: 0.78rem; color: var(--color-text-secondary); line-height: 1.4;">
              ${league.isDemo ? "Estructura configurada para integraci\xF3n y registro de clubes comunales." : `${league.totalClubs} Clubes afiliados \u2022 Presidente: ${league.president}.`}
            </p>
          </div>
          <div class="league-picker-footer">
            <span>${league.totalClubs} Clubes</span>
            <div class="league-picker-cta">
              <span>Ingresar</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        </div>
      `;
      });
    });
    container.innerHTML = html;
  }
  function renderHomeFeaturedMatches() {
    const container = document.getElementById("home-featured-matches-grid");
    if (!container) return;
    const db = getDb();
    const matches = (db.matches || []).filter((m) => m.series === currentActiveSeries).slice(0, 3);
    if (matches.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 2rem;">Actualmente no hay partidos programados para esta serie.</div>`;
      return;
    }
    let html = "";
    matches.forEach((m) => {
      const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: "Local", shortName: "Local" };
      const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: "Visita", shortName: "Visita" };
      const isLive = m.status === "en_vivo";
      const isFinished = m.status === "finalizado";
      html += `
      <div class="match-card">
        <div class="match-card-header">
          <span>${m.round || "Fecha Oficial"}</span>
          <span class="match-status-badge ${isLive ? "live" : isFinished ? "finished" : "scheduled"}">
            ${isLive ? `\u25CF EN VIVO (${m.currentMinute}')` : isFinished ? "FINALIZADO" : "PROGRAMADO"}
          </span>
        </div>

        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">
              ${getClubBadgeSvg(m.homeClubId, 44)}
            </div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>

          <div class="match-score-col">
            ${isLive || isFinished ? `
              <div class="match-score-box">
                <span>${m.homeScore}</span>
                <span style="color: var(--color-text-muted);">-</span>
                <span>${m.awayScore}</span>
              </div>
            ` : `
              <div class="match-vs-box">VS</div>
              <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-primary); margin-top: 0.35rem;">
                ${m.date ? m.date.split("\u2022")[1] || "16:30" : "16:30"}
              </div>
            `}
          </div>

          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">
              ${getClubBadgeSvg(m.awayClubId, 44)}
            </div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>

        <div class="match-card-footer">
          <div class="match-venue-info" title="${m.venue}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Ficha
          </button>
        </div>
      </div>
    `;
    });
    container.innerHTML = html;
  }
  function renderHomeMiniStandings() {
    const container = document.getElementById("home-mini-standings-container");
    if (!container) return;
    const db = getDb();
    const standings = db.standings && db.standings[currentActiveSeries] || [];
    const top5 = standings.slice(0, 5);
    if (top5.length === 0) {
      container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">\u{1F4CA}</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Posiciones</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">No hay partidos computados en esta serie a\xFAn.</div>
      </div>
    `;
      return;
    }
    let html = `
    <table class="sports-table">
      <thead>
        <tr>
          <th style="width: 35px;">#</th>
          <th>Club</th>
          <th class="text-center">PJ</th>
          <th class="text-center">DG</th>
          <th class="text-center" style="color: var(--color-primary);">PTS</th>
        </tr>
      </thead>
      <tbody>
  `;
    top5.forEach((row, idx) => {
      html += `
      <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer;">
        <td>
          <span class="table-pos-badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : idx === 2 ? "bronze" : ""}">
            ${row.pos}
          </span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest" style="width: 22px; height: 22px;">
              ${getClubBadgeSvg(row.clubId, 22)}
            </div>
            <span class="table-team-name" style="font-size: 0.82rem;">${row.clubName}</span>
          </div>
        </td>
        <td class="text-center">${row.pj}</td>
        <td class="text-center">${row.dg > 0 ? `+${row.dg}` : row.dg}</td>
        <td class="pts-cell" style="font-size: 0.9rem;">${row.pts}</td>
      </tr>
    `;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
  }
  function renderHomeMiniScorers() {
    const container = document.getElementById("home-mini-scorers-container");
    if (!container) return;
    const db = getDb();
    const scorers = getSortedPlayersByStat("goals").slice(0, 4);
    if (scorers.length === 0) {
      container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">\u26BD</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Goleadores</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">A\xFAn no se registran goles en las planillas de juego.</div>
      </div>
    `;
      return;
    }
    let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
    scorers.forEach((p, idx) => {
      html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--color-border-subtle); cursor: pointer;" onclick="window.ligamasterSelectPlayer('${p.id}')">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span class="table-pos-badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : idx === 2 ? "bronze" : ""}" style="width: 24px; height: 24px; font-size: 0.75rem;">
            ${idx + 1}
          </span>
          <img src="${p.avatar}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 32px; height: 32px; border-radius: var(--radius-xs); object-fit: cover;">
          <div>
            <div style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-text-main);">${p.name}</div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted);">${p.clubName}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <strong style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 900; color: var(--color-primary);">${p.goals}</strong>
          <span style="font-size: 0.68rem; color: var(--color-text-muted); display: block;">goles</span>
        </div>
      </div>
    `;
    });
    html += "</div>";
    container.innerHTML = html;
  }
  function renderHomeMiniNews() {
    const container = document.getElementById("home-mini-news-container");
    if (!container) return;
    const db = getDb();
    const news = (db.news || []).slice(0, 2);
    if (news.length === 0) {
      container.innerHTML = `
      <div class="empty-state-box" style="padding: 1.5rem 1rem;">
        <span class="empty-state-icon">\u{1F4F0}</span>
        <div class="empty-state-title" style="font-size: 0.95rem;">Sin Comunicados</div>
        <div class="empty-state-desc" style="font-size: 0.8rem;">No hay notas de prensa publicadas en esta liga.</div>
      </div>
    `;
      return;
    }
    let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
    news.forEach((n) => {
      html += `
      <div style="cursor: pointer;" onclick="window.ligamasterOpenNews('${n.id}')">
        <span style="font-size: 0.68rem; font-weight: 800; color: var(--color-primary); text-transform: uppercase;">${n.category}</span>
        <h4 style="font-family: var(--font-display); font-size: 0.9rem; font-weight: 800; color: var(--color-text-main); margin: 0.2rem 0; line-height: 1.3;">
          ${n.title}
        </h4>
        <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${n.excerpt}
        </p>
      </div>
    `;
    });
    html += "</div>";
    container.innerHTML = html;
  }
  function renderLeagueView() {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const league = getLeagueById(activeId);
    const crestBox = document.getElementById("league-hero-crest");
    if (crestBox) {
      crestBox.innerHTML = getClubBadgeSvg(league.badgeId || "asociacion-arauco", 64);
    }
    const titleEl = document.getElementById("league-page-title");
    if (titleEl) titleEl.textContent = league.name;
    const clubsCountEl = document.getElementById("league-total-clubs-label");
    if (clubsCountEl) clubsCountEl.textContent = `${db.clubs ? db.clubs.length : 10} Instituciones Oficiales`;
    const nextContainer = document.getElementById("league-next-matches-grid");
    if (nextContainer) {
      const matches = (db.matches || []).filter((m) => m.series === currentActiveSeries).slice(0, 2);
      if (matches.length === 0) {
        nextContainer.innerHTML = `
        <div class="empty-state-box" style="padding: 1.5rem 1rem;">
          <span class="empty-state-icon">\u26BD</span>
          <div class="empty-state-title" style="font-size: 0.95rem;">Sin Partidos Pr\xF3ximos</div>
          <div class="empty-state-desc" style="font-size: 0.8rem;">No hay compromisos agendados para esta serie.</div>
        </div>
      `;
      } else {
        let html = "";
        matches.forEach((m) => {
          const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: "Local" };
          const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: "Visita" };
          html += `
          <div class="match-card">
            <div class="match-card-header">
              <span>${m.round}</span>
              <span class="match-status-badge ${m.status === "en_vivo" ? "live" : "scheduled"}">${m.status === "en_vivo" ? "EN VIVO" : "PROGRAMADO"}</span>
            </div>
            <div class="match-teams-row">
              <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
                <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 40)}</div>
                <div class="match-team-name">${homeClub.name}</div>
              </div>
              <div class="match-score-col">
                <div class="match-vs-box">VS</div>
                <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 700; margin-top: 0.2rem;">${m.date.split("\u2022")[1] || "16:30"}</span>
              </div>
              <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
                <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 40)}</div>
                <div class="match-team-name">${awayClub.name}</div>
              </div>
            </div>
            <div class="match-card-footer">
              <span style="font-size: 0.75rem; color: var(--color-text-muted);">${m.venue}</span>
              <button class="btn-outline-coral" style="padding: 0.2rem 0.6rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">Detalles</button>
            </div>
          </div>
        `;
        });
        nextContainer.innerHTML = html;
      }
    }
    const summaryBox = document.getElementById("league-summary-standings-box");
    if (summaryBox) {
      const standings = db.standings && db.standings[currentActiveSeries] || [];
      if (standings.length === 0) {
        summaryBox.innerHTML = `
        <div class="empty-state-box" style="padding: 1.5rem 1rem;">
          <span class="empty-state-icon">\u{1F4CA}</span>
          <div class="empty-state-title" style="font-size: 0.95rem;">Tabla Pendiente</div>
          <div class="empty-state-desc" style="font-size: 0.8rem;">Sin estad\xEDsticas calculadas a\xFAn.</div>
        </div>
      `;
      } else {
        let html = `
        <table class="sports-table" style="font-size: 0.8rem;">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Equipo</th>
              <th class="text-center">PJ</th>
              <th class="text-center">PTS</th>
            </tr>
          </thead>
          <tbody>
      `;
        standings.slice(0, 6).forEach((row) => {
          const club = (db.clubs || []).find((c) => c.id === row.clubId);
          const bId = club && club.badgeId || row.clubId;
          html += `
          <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer;">
            <td><span class="table-pos-badge" style="width: 22px; height: 22px; font-size: 0.7rem;">${row.pos}</span></td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span style="width: 18px; height: 18px; display: inline-flex;">${getClubBadgeSvg(bId, 18)}</span>
                <strong style="font-size: 0.8rem;">${row.clubName}</strong>
              </div>
            </td>
            <td class="text-center">${row.pj}</td>
            <td class="pts-cell" style="font-size: 0.88rem;">${row.pts}</td>
          </tr>
        `;
        });
        html += "</tbody></table>";
        summaryBox.innerHTML = html;
      }
    }
    const clubsGrid = document.getElementById("league-clubs-grid");
    if (clubsGrid) {
      if (!db.clubs || !db.clubs.length) {
        clubsGrid.innerHTML = `
        <div style="grid-column: 1/-1;">
          <div class="empty-state-box">
            <span class="empty-state-icon">\u{1F6E1}\uFE0F</span>
            <div class="empty-state-title">Sin Clubes Registrados</div>
            <div class="empty-state-desc">Esta liga no cuenta con clubes registrados en su directorio.</div>
          </div>
        </div>
      `;
      } else {
        let html = "";
        (db.clubs || []).forEach((club) => {
          html += `
          <div class="club-compact-card" onclick="window.ligamasterSelectTeam('${club.id}')">
            <div class="club-compact-crest">
              ${getClubBadgeSvg(club.badgeId || club.id, 38)}
            </div>
            <div class="club-compact-info">
              <h4>${club.name}</h4>
              <span>Fundado: ${club.exactFoundationDate || club.founded || "Oficial"}</span>
            </div>
          </div>
        `;
        });
        clubsGrid.innerHTML = html;
      }
    }
  }
  function renderStandingsView() {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const league = getLeagueById(activeId);
    const tbody = document.getElementById("standings-table-body");
    const labelEl = document.getElementById("standings-series-label");
    if (labelEl) {
      const seriesObj = (db.seriesList || []).find((s) => s.id === currentActiveSeries) || { name: "Serie de Honor" };
      labelEl.textContent = `${db.leagueInfo?.season || "Campeonato Oficial"} \u2022 ${league.name} \u2022 ${seriesObj.name}`;
    }
    if (!tbody) return;
    const standings = db.standings && db.standings[currentActiveSeries] || [];
    if (standings.length === 0) {
      tbody.innerHTML = `
      <tr>
        <td colspan="11" style="padding: 3rem 1rem;">
          <div class="empty-state-box">
            <span class="empty-state-icon">\u{1F4CB}</span>
            <div class="empty-state-title">Sin Tabla Registrada</div>
            <div class="empty-state-desc">Actualmente no hay estad\xEDsticas de tabla computadas para esta serie en ${league.name}.</div>
          </div>
        </td>
      </tr>`;
      return;
    }
    let html = "";
    standings.forEach((row, idx) => {
      const isChampionZone = idx < 2;
      const isRelegationZone = idx >= standings.length - 2;
      const club = (db.clubs || []).find((c) => c.id === row.clubId);
      const badgeId = club && club.badgeId || row.clubId;
      html += `
      <tr onclick="window.ligamasterSelectTeam('${row.clubId}')" style="cursor: pointer; ${isChampionZone ? "border-left: 3px solid var(--color-success);" : isRelegationZone ? "border-left: 3px solid var(--color-danger);" : ""}">
        <td class="text-center">
          <span class="table-pos-badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : idx === 2 ? "bronze" : ""}">
            ${row.pos}
          </span>
        </td>
        <td>
          <div class="table-team-cell">
            <div class="table-team-crest">
              ${getClubBadgeSvg(badgeId, 30)}
            </div>
            <span class="table-team-name">${row.clubName}</span>
          </div>
        </td>
        <td class="text-center">${row.pj}</td>
        <td class="text-center">${row.pg}</td>
        <td class="text-center">${row.pe}</td>
        <td class="text-center">${row.pp}</td>
        <td class="text-center">${row.gf}</td>
        <td class="text-center">${row.gc}</td>
        <td class="text-center" style="font-weight: 700; color: ${row.dg > 0 ? "var(--color-success)" : row.dg < 0 ? "var(--color-danger)" : "var(--color-text-secondary)"};">
          ${row.dg > 0 ? `+${row.dg}` : row.dg}
        </td>
        <td class="pts-cell">${row.pts}</td>
        <td class="text-center">
          <div class="form-pills">
            <span class="form-pill win">V</span>
            <span class="form-pill win">V</span>
            <span class="form-pill draw">E</span>
            <span class="form-pill win">V</span>
            <span class="form-pill loss">D</span>
          </div>
        </td>
      </tr>
    `;
    });
    tbody.innerHTML = html;
  }
  function renderCalendarView() {
    const pillsContainer = document.getElementById("calendar-round-pills");
    const matchesContainer = document.getElementById("calendar-matches-grid");
    if (!pillsContainer || !matchesContainer) return;
    let pillsHtml = "";
    for (let i = 1; i <= 14; i++) {
      pillsHtml += `
      <button class="matchday-pill-btn ${i === currentActiveRound ? "active" : ""}" onclick="window.ligamasterSelectRound(${i})">
        Fecha ${i}
      </button>
    `;
    }
    pillsContainer.innerHTML = pillsHtml;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const matches = (db.matches || []).filter((m) => m.series === currentActiveSeries);
    if (matches.length === 0) {
      matchesContainer.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">\u{1F4C5}</span>
          <div class="empty-state-title">Sin Partidos Programados</div>
          <div class="empty-state-desc">No hay compromisos oficiales registrados en el fixture para esta categor\xEDa.</div>
        </div>
      </div>
    `;
      return;
    }
    let html = "";
    matches.forEach((m) => {
      const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: "Local" };
      const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: "Visita" };
      html += `
      <div class="match-card">
        <div class="match-card-header">
          <span>${m.round || `Fecha ${currentActiveRound} \u2022 ${db.leagueInfo?.shortName}`}</span>
          <span class="match-status-badge ${m.status === "en_vivo" ? "live" : m.status === "finalizado" ? "finished" : "scheduled"}">
            ${m.status === "en_vivo" ? "EN VIVO" : m.status === "finalizado" ? "FINALIZADO" : "PROGRAMADO"}
          </span>
        </div>
        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 44)}</div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>
          <div class="match-score-col">
            ${m.status === "en_vivo" || m.status === "finalizado" ? `
              <div class="match-score-box">
                <span>${m.homeScore}</span>
                <span style="color: var(--color-text-muted);">-</span>
                <span>${m.awayScore}</span>
              </div>
            ` : `
              <div class="match-vs-box">VS</div>
              <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--color-primary); margin-top: 0.3rem;">
                ${m.date ? m.date.split("\u2022")[1] || "16:30" : "16:30"}
              </span>
            `}
          </div>
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 44)}</div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>
        <div class="match-card-footer">
          <div class="match-venue-info">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Detalle
          </button>
        </div>
      </div>
    `;
    });
    matchesContainer.innerHTML = html;
  }
  window.ligamasterSelectRound = (round) => {
    currentActiveRound = round;
    renderCalendarView();
  };
  function renderResultsView() {
    const container = document.getElementById("results-matches-grid");
    if (!container) return;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const matches = (db.matches || []).filter((m) => m.series === currentActiveSeries && (m.status === "finalizado" || m.status === "en_vivo"));
    if (matches.length === 0) {
      container.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">\u23F1\uFE0F</span>
          <div class="empty-state-title">Sin Resultados Oficiales</div>
          <div class="empty-state-desc">A\xFAn no se registran resultados oficiales para esta serie en la jornada.</div>
        </div>
      </div>
    `;
      return;
    }
    let html = "";
    matches.forEach((m) => {
      const homeClub = (db.clubs || []).find((c) => c.id === m.homeClubId) || { name: "Local" };
      const awayClub = (db.clubs || []).find((c) => c.id === m.awayClubId) || { name: "Visita" };
      const isLive = m.status === "en_vivo";
      let incidenciasStr = "Acta cerrada sin observaciones.";
      if (m.events && m.events.length > 0) {
        incidenciasStr = m.events.map((ev) => {
          const icon = ev.type === "gol" ? "\u26BD" : ev.type === "amarilla" ? "\u{1F7E8}" : ev.type === "roja" ? "\u{1F7E5}" : "\u23F1\uFE0F";
          return `${icon} ${ev.minute}' ${ev.playerName}`;
        }).join(" \u2022 ");
      }
      html += `
      <div class="match-card" style="border-left: 4px solid ${isLive ? "var(--color-primary)" : "var(--color-success)"};">
        <div class="match-card-header">
          <span>${m.round || "Marcador Oficial"}</span>
          <span class="match-status-badge ${isLive ? "live" : "finished"}">
            ${isLive ? `\u25CF EN VIVO (${m.currentMinute}')` : "ACTA SELLADA"}
          </span>
        </div>
        <div class="match-teams-row">
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.homeClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(homeClub.badgeId || m.homeClubId, 44)}</div>
            <div class="match-team-name">${homeClub.name}</div>
          </div>
          <div class="match-score-col">
            <div class="match-score-box">
              <span>${m.homeScore}</span>
              <span style="color: var(--color-text-muted);">-</span>
              <span>${m.awayScore}</span>
            </div>
            <span style="font-size: 0.68rem; color: var(--color-text-muted); margin-top: 0.35rem;">
              ${isLive ? `1er Tiempo ${m.currentMinute}'` : "Final 90'"}
            </span>
          </div>
          <div class="match-team-col" onclick="window.ligamasterSelectTeam('${m.awayClubId}')">
            <div class="match-team-crest">${getClubBadgeSvg(awayClub.badgeId || m.awayClubId, 44)}</div>
            <div class="match-team-name">${awayClub.name}</div>
          </div>
        </div>

        <!-- Goleadores e Incidencias del Partido -->
        <div style="background-color: var(--color-bg-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; font-size: 0.78rem;">
          <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Goles e Incidencias:</strong>
          <div style="color: var(--color-text-secondary); line-height: 1.4;">
            ${incidenciasStr}
          </div>
        </div>

        <div class="match-card-footer">
          <div class="match-venue-info">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>${m.venue} \u2022 \xC1rbitro: ${m.referee}</span>
          </div>
          <button class="btn-outline-coral" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" onclick="window.ligamasterOpenMatchDetail('${m.id}')">
            Ver Acta
          </button>
        </div>
      </div>
    `;
    });
    container.innerHTML = html;
  }
  function renderTeamView() {
    const activeId = getActiveLeagueId();
    const league = getLeagueById(activeId);
    const db = getDb(activeId);
    if (!db.clubs || db.clubs.length === 0) return;
    if (!db.clubs.some((c) => c.id === currentActiveClubId)) {
      currentActiveClubId = db.clubs[0].id;
    }
    const strip = document.getElementById("team-view-clubs-strip");
    if (strip) {
      let stripHtml = "";
      (db.clubs || []).forEach((club) => {
        const isSelected = club.id === currentActiveClubId;
        stripHtml += `
        <button class="club-strip-item ${isSelected ? "active" : ""}" onclick="window.ligamasterSelectTeam('${club.id}')">
          <div class="club-strip-crest">${getClubBadgeSvg(club.badgeId || club.id, 24)}</div>
          <span class="club-strip-name">${club.shortName}</span>
        </button>
      `;
      });
      strip.innerHTML = stripHtml;
    }
    const currentClub = (db.clubs || []).find((c) => c.id === currentActiveClubId) || db.clubs[0];
    if (!currentClub) return;
    const crestEl = document.getElementById("team-hero-crest");
    if (crestEl) crestEl.innerHTML = getClubBadgeSvg(currentClub.badgeId || currentClub.id, 80);
    const nameEl = document.getElementById("team-hero-name");
    if (nameEl) nameEl.textContent = currentClub.name;
    const locEl = document.getElementById("team-hero-locality");
    if (locEl) locEl.textContent = `${currentClub.neighborhood || league.commune} \u2022 ${league.name}`;
    const foundedEl = document.getElementById("team-meta-founded");
    if (foundedEl) foundedEl.textContent = currentClub.exactFoundationDate || currentClub.founded || "Fundado oficialmente";
    const stadiumEl = document.getElementById("team-meta-stadium");
    if (stadiumEl) stadiumEl.textContent = currentClub.stadium;
    const titlesEl = document.getElementById("team-meta-titles");
    if (titlesEl) titlesEl.textContent = `${currentClub.titlesComunalesHonor || currentClub.titles || 0} T\xEDtulos de Honor`;
    renderTeamTabContent(currentClub);
  }
  function renderTeamTabContent(club) {
    const container = document.getElementById("team-tab-content-container");
    if (!container) return;
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const players = (db.players || []).filter((p) => p.clubId === club.id && p.series === currentActiveSeries);
    if (currentTeamTab === "plantel") {
      let html = '<div class="roster-grid">';
      if (players.length === 0) {
        html += `
        <div style="grid-column: 1/-1;">
          <div class="empty-state-box">
            <span class="empty-state-icon">\u{1F465}</span>
            <div class="empty-state-title">Sin Futbolistas Inscritos</div>
            <div class="empty-state-desc">No hay futbolistas inscritos para esta serie en ${club.name}.</div>
          </div>
        </div>
      `;
      } else {
        players.forEach((p) => {
          html += `
          <div class="player-roster-card" onclick="window.ligamasterSelectPlayer('${p.id}')">
            <div class="roster-avatar-box">
              <img src="${p.avatar || FALLBACK_AVATAR}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" class="roster-avatar-img">
              <span class="roster-number-badge">#${p.number}</span>
            </div>
            <div class="roster-info">
              <h4>${p.name}</h4>
              <span class="position">${p.position}</span>
              <span class="rut">RUT: ${p.rut}</span>
            </div>
          </div>
        `;
        });
      }
      html += "</div>";
      container.innerHTML = html;
    } else if (currentTeamTab === "partidos") {
      container.innerHTML = `
      <div style="background: #fff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center;">
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; margin-bottom: 0.5rem;">Historial de Partidos \u2022 ${club.name}</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted);">
          7 Partidos oficiales disputados en la temporada regular de ${db.leagueInfo?.name || "la Asociaci\xF3n"}.
        </p>
      </div>
    `;
    } else if (currentTeamTab === "estadisticas") {
      container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem;">
        <div class="player-metric-box highlight"><div class="player-metric-label">Goles a Favor</div><div class="player-metric-value">16</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Goles en Contra</div><div class="player-metric-value">9</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Diferencia</div><div class="player-metric-value" style="color: var(--color-success);">+7</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Amarillas</div><div class="player-metric-value">12</div></div>
        <div class="player-metric-box"><div class="player-metric-label">Rojas</div><div class="player-metric-value">1</div></div>
      </div>
    `;
    } else {
      const seriesListItems = (club.series || ["honor"]).map((s) => {
        const sObj = (db.seriesList || []).find((item) => item.id === s);
        return `<li>\u2713 ${sObj ? sObj.name : s}</li>`;
      }).join("");
      container.innerHTML = `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Rese\xF1a Hist\xF3rica & Palmar\xE9s</h4>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6;">${club.regionalRecord || club.description || "Instituci\xF3n afiliada formalmente a la Asociaci\xF3n."}</p>
        </div>
        <div style="background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.75rem;">
          <h4 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">Categor\xEDas Oficiales</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-secondary);">
            ${seriesListItems}
          </ul>
        </div>
      </div>
    `;
    }
  }
  window.ligamasterSelectTeam = (clubId) => {
    currentActiveClubId = clubId;
    navigateTo("team-view");
    renderTeamView();
  };
  function renderPlayerView() {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const clubSelect = document.getElementById("player-select-club");
    const playerSelect = document.getElementById("player-select-individual");
    if (clubSelect) {
      clubSelect.innerHTML = "";
      (db.clubs || []).forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        clubSelect.appendChild(opt);
      });
      if (!db.clubs.some((c) => c.id === currentActiveClubId)) {
        currentActiveClubId = db.clubs[0] ? db.clubs[0].id : "";
      }
      clubSelect.value = currentActiveClubId;
    }
    if (playerSelect) {
      playerSelect.innerHTML = "";
      const clubPlayers = (db.players || []).filter((p) => p.clubId === currentActiveClubId);
      clubPlayers.forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p.id;
        opt.textContent = `#${p.number} - ${p.name} (${p.position})`;
        playerSelect.appendChild(opt);
      });
      if (!clubPlayers.some((p) => p.id === currentActivePlayerId)) {
        currentActivePlayerId = clubPlayers[0] ? clubPlayers[0].id : db.players && db.players[0] ? db.players[0].id : "";
      }
      playerSelect.value = currentActivePlayerId;
    }
    const player = (db.players || []).find((p) => p.id === currentActivePlayerId) || db.players[0];
    if (!player) return;
    const club = (db.clubs || []).find((c) => c.id === player.clubId) || { name: "Club Oficial" };
    const pImg = document.getElementById("player-profile-img");
    if (pImg) {
      pImg.onerror = () => {
        pImg.src = FALLBACK_AVATAR;
      };
      pImg.src = player.avatar || FALLBACK_AVATAR;
    }
    document.getElementById("player-profile-dorsal").textContent = `#${player.number}`;
    document.getElementById("player-profile-name").textContent = player.name;
    document.getElementById("player-profile-crest").innerHTML = getClubBadgeSvg(club.badgeId || player.clubId, 26);
    document.getElementById("player-profile-club").textContent = club.name;
    document.getElementById("player-profile-pos").textContent = player.position;
    document.getElementById("player-metric-goals").textContent = player.goals || 0;
    document.getElementById("player-metric-assists").textContent = player.assists || 0;
    document.getElementById("player-metric-matches").textContent = player.matchesPlayed || 0;
    document.getElementById("player-metric-starters").textContent = player.matchesPlayed || 0;
    document.getElementById("player-metric-minutes").textContent = player.minutesPlayed || 0;
    document.getElementById("player-metric-yellows").textContent = player.yellowCards || 0;
    document.getElementById("player-metric-reds").textContent = player.redCards || 0;
  }
  window.ligamasterSelectPlayer = (playerId) => {
    const db = getDb();
    const player = (db.players || []).find((p) => p.id === playerId);
    if (player) {
      currentActiveClubId = player.clubId;
      currentActivePlayerId = player.id;
    }
    navigateTo("player-view");
    renderPlayerView();
  };
  function renderStatsView() {
    const tbody = document.getElementById("stats-table-body");
    const metricHeader = document.getElementById("stats-metric-header");
    if (!tbody || !metricHeader) return;
    let metricKey = "goals";
    let metricTitle = "GOLES";
    if (currentStatCategory === "asistencias") {
      metricKey = "assists";
      metricTitle = "ASISTENCIAS";
    } else if (currentStatCategory === "amarillas") {
      metricKey = "yellowCards";
      metricTitle = "TARJETAS AMARILLAS";
    } else if (currentStatCategory === "rojas") {
      metricKey = "redCards";
      metricTitle = "TARJETAS ROJAS";
    } else if (currentStatCategory === "porteros") {
      metricKey = "minutesPlayed";
      metricTitle = "MINUTOS JUGADOS";
    }
    metricHeader.textContent = metricTitle;
    const sortedPlayers = getSortedPlayersByStat(metricKey);
    if (sortedPlayers.length === 0) {
      tbody.innerHTML = `
      <tr>
        <td colspan="6" style="padding: 3rem 1rem;">
          <div class="empty-state-box">
            <span class="empty-state-icon">\u{1F4C8}</span>
            <div class="empty-state-title">Sin Estad\xEDsticas Registradas</div>
            <div class="empty-state-desc">Actualmente no hay datos individuales disponibles para esta categor\xEDa en la liga activa.</div>
          </div>
        </td>
      </tr>
    `;
      return;
    }
    let html = "";
    sortedPlayers.forEach((p, idx) => {
      const val = p[metricKey] || 0;
      const pj = p.matchesPlayed || 1;
      const avg = (val / pj).toFixed(2);
      html += `
      <tr onclick="window.ligamasterSelectPlayer('${p.id}')" style="cursor: pointer;">
        <td class="text-center">
          <span class="table-pos-badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : idx === 2 ? "bronze" : ""}">
            ${idx + 1}
          </span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${p.avatar}" alt="${p.name}" onerror="window.ligamasterImageFallback(this, 'avatar')" style="width: 38px; height: 38px; border-radius: var(--radius-xs); object-fit: cover;">
            <div>
              <strong style="font-family: var(--font-display); font-size: 0.95rem; color: var(--color-text-main); display: block;">${p.name}</strong>
              <small style="color: var(--color-text-muted); font-size: 0.75rem;">#${p.number} \u2022 ${p.position}</small>
            </div>
          </div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 24px; height: 24px; display: inline-flex;">${getClubBadgeSvg(p.badgeId || p.clubId, 24)}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-secondary);">${p.clubName}</span>
          </div>
        </td>
        <td class="pts-cell" style="font-size: 1.15rem;">${val}</td>
        <td class="text-center">${pj}</td>
        <td class="text-center" style="font-weight: 700; color: var(--color-text-muted);">${avg}</td>
      </tr>
    `;
    });
    tbody.innerHTML = html;
  }
  function getSortedPlayersByStat(key) {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    const list = [];
    (db.players || []).forEach((p) => {
      if (p.series === currentActiveSeries) {
        const club = (db.clubs || []).find((c) => c.id === p.clubId) || { name: "Club" };
        list.push({
          ...p,
          clubName: club.name,
          badgeId: club.badgeId || p.clubId
        });
      }
    });
    return list.sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }
  function renderNewsView() {
    const container = document.getElementById("official-news-grid");
    if (!container) return;
    const db = getDb();
    const news = db.news || [];
    if (news.length === 0) {
      container.innerHTML = `
      <div style="grid-column: 1/-1;">
        <div class="empty-state-box">
          <span class="empty-state-icon">\u{1F4F0}</span>
          <div class="empty-state-title">Sin Noticias Publicadas</div>
          <div class="empty-state-desc">No hay comunicados oficiales o notas de prensa activas en este momento.</div>
        </div>
      </div>
    `;
      return;
    }
    let html = "";
    news.forEach((n) => {
      html += `
      <article class="news-card">
        <div class="news-img-box">
          <img src="${n.image}" alt="${n.title}" onerror="window.ligamasterImageFallback(this, 'news')" class="news-img">
          <span class="news-tag">${n.category}</span>
        </div>
        <div class="news-content">
          <div>
            <div class="news-date">${n.date}</div>
            <h3 class="news-title">${n.title}</h3>
            <p class="news-excerpt">${n.excerpt}</p>
          </div>
          <button class="news-read-cta" onclick="window.ligamasterOpenNews('${n.id}')">
            <span>Leer Noticia Completa</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </article>
    `;
    });
    container.innerHTML = html;
  }
  window.ligamasterOpenNews = (newsId) => {
    const db = getDb();
    const news = (db.news || []).find((n) => n.id === newsId);
    if (!news) return;
    const titleEl = document.getElementById("news-modal-title");
    const bodyEl = document.getElementById("news-modal-body");
    if (titleEl) titleEl.textContent = news.title;
    if (bodyEl) {
      bodyEl.innerHTML = `
      <img src="${news.image}" alt="${news.title}" style="width: 100%; max-height: 280px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
      <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">${news.category} \u2022 ${news.date}</div>
      <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1rem;">
        ${news.content || news.excerpt}
      </p>
      <div style="font-size: 0.75rem; color: var(--color-text-muted); border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
        Emitido por Departamento de Prensa de la Asociaci\xF3n de F\xFAtbol de Arauco.
      </div>
    `;
    }
    openModal("modal-news-reader");
  };
  window.ligamasterOpenMatchDetail = (matchId) => {
    const db = getDb();
    const match = (db.matches || []).find((m) => m.id === matchId);
    if (!match) return;
    const homeClub = (db.clubs || []).find((c) => c.id === match.homeClubId) || { name: "Local" };
    const awayClub = (db.clubs || []).find((c) => c.id === match.awayClubId) || { name: "Visita" };
    const titleEl = document.getElementById("match-modal-title");
    const bodyEl = document.getElementById("match-modal-body");
    if (titleEl) titleEl.textContent = `${homeClub.name} vs ${awayClub.name}`;
    if (bodyEl) {
      bodyEl.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem; background: var(--color-bg-subtle); padding: 1.25rem; border-radius: var(--radius-md);">
        <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">${match.round}</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem;">
          <div style="text-align: center;">
            <div style="width: 50px; height: 50px; margin: 0 auto 0.35rem auto;">${getClubBadgeSvg(match.homeClubId, 50)}</div>
            <strong style="font-size: 0.9rem;">${homeClub.name}</strong>
          </div>
          <div style="font-family: var(--font-display); font-size: 2rem; font-weight: 900; color: var(--color-primary);">
            ${match.homeScore} - ${match.awayScore}
          </div>
          <div style="text-align: center;">
            <div style="width: 50px; height: 50px; margin: 0 auto 0.35rem auto;">${getClubBadgeSvg(match.awayClubId, 50)}</div>
            <strong style="font-size: 0.9rem;">${awayClub.name}</strong>
          </div>
        </div>
      </div>

      <div style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.6;">
        <p><strong>Recinto:</strong> ${match.venue}</p>
        <p><strong>\xC1rbitro Central:</strong> ${match.referee}</p>
        <p><strong>Turno Oficial ANFA:</strong> Don Sergio Viveros</p>
        <p><strong>Estado del Acta:</strong> Acta de Cancha Oficializada con firma digital de capitanes.</p>
      </div>
    `;
    }
    openModal("modal-match-detail");
  };
  function setupGlobalSearch() {
    const searchInput = document.getElementById("global-search-input");
    const resultsContainer = document.getElementById("global-search-results");
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openModal("modal-global-search");
        setTimeout(() => searchInput?.focus(), 100);
      }
    });
    document.getElementById("btn-open-search")?.addEventListener("click", () => {
      openModal("modal-global-search");
      setTimeout(() => searchInput?.focus(), 100);
    });
    searchInput?.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); padding: 1.5rem; font-size: 0.85rem;">Escribe el nombre de un club, futbolista, liga o recinto...</div>`;
        return;
      }
      const activeId = getActiveLeagueId();
      const db = getDb(activeId);
      let html = "";
      const matchedClubs = (db.clubs || []).filter((c) => c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q));
      if (matchedClubs.length > 0) {
        html += `<div class="search-results-group"><div class="search-group-title">\u{1F6E1}\uFE0F Clubes Afiliados</div>`;
        matchedClubs.forEach((c) => {
          html += `
          <div class="search-result-item" onclick="window.ligamasterSelectTeam('${c.id}'); closeModal('modal-global-search');">
            <span style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;">${getClubBadgeSvg(c.badgeId || c.id, 22)}</span>
            <strong>${c.name}</strong>
            <small>Club Oficial</small>
          </div>
        `;
        });
        html += `</div>`;
      }
      const matchedPlayers = (db.players || []).filter((p) => p.name.toLowerCase().includes(q) || p.rut && p.rut.includes(q));
      if (matchedPlayers.length > 0) {
        html += `<div class="search-results-group"><div class="search-group-title">\u{1F464} Futbolistas</div>`;
        matchedPlayers.slice(0, 5).forEach((p) => {
          html += `
          <div class="search-result-item" onclick="window.ligamasterSelectPlayer('${p.id}'); closeModal('modal-global-search');">
            <img src="${p.avatar}" alt="${p.name}" style="width: 22px; height: 22px; border-radius: var(--radius-xs); object-fit: cover;">
            <strong>${p.name} (#${p.number})</strong>
            <small>${p.position}</small>
          </div>
        `;
        });
        html += `</div>`;
      }
      const regions = getRegionsAndLeagues();
      const matchedLeagues = [];
      regions.forEach((r) => {
        r.leagues.forEach((l) => {
          if (l.name.toLowerCase().includes(q) || l.commune.toLowerCase().includes(q)) {
            matchedLeagues.push(l);
          }
        });
      });
      if (matchedLeagues.length > 0) {
        html += `<div class="search-results-group"><div class="search-group-title">\u{1F3C6} Competiciones & Ligas</div>`;
        matchedLeagues.forEach((l) => {
          html += `
          <div class="search-result-item" onclick="window.ligamasterSwitchLeague('${l.id}'); closeModal('modal-global-search');">
            <span style="width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center;">${getClubBadgeSvg(l.badgeId || "asociacion-arauco", 22)}</span>
            <strong>${l.name}</strong>
            <small>${l.commune} \u2022 ${l.statusLabel}</small>
          </div>
        `;
        });
        html += `</div>`;
      }
      if (!html) {
        html = `<div style="text-align: center; color: var(--color-text-muted); padding: 1.5rem; font-size: 0.85rem;">No se encontraron resultados para "${q}".</div>`;
      }
      resultsContainer.innerHTML = html;
    });
  }
  function setupSeriesFilters() {
    const globalSelect = document.getElementById("global-series-select");
    const standingsSelect = document.getElementById("standings-series-select");
    const onSeriesChange = (val) => {
      currentActiveSeries = val;
      if (globalSelect) globalSelect.value = val;
      if (standingsSelect) standingsSelect.value = val;
      renderHomeView();
      renderLeagueView();
      renderStandingsView();
      renderCalendarView();
      renderResultsView();
      renderStatsView();
    };
    globalSelect?.addEventListener("change", (e) => onSeriesChange(e.target.value));
    standingsSelect?.addEventListener("change", (e) => onSeriesChange(e.target.value));
    document.querySelectorAll(".stats-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".stats-pill-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentStatCategory = btn.getAttribute("data-stat-category") || "goleadores";
        renderStatsView();
      });
    });
    document.querySelectorAll(".team-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".team-tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentTeamTab = btn.getAttribute("data-team-tab") || "resumen";
        const db = getDb();
        const club = (db.clubs || []).find((c) => c.id === currentActiveClubId) || db.clubs[0];
        renderTeamTabContent(club);
      });
    });
    document.getElementById("player-select-club")?.addEventListener("change", (e) => {
      currentActiveClubId = e.target.value;
      const db = getDb();
      const firstPlayer = (db.players || []).find((p) => p.clubId === currentActiveClubId);
      if (firstPlayer) currentActivePlayerId = firstPlayer.id;
      renderPlayerView();
    });
    document.getElementById("player-select-individual")?.addEventListener("change", (e) => {
      currentActivePlayerId = e.target.value;
      renderPlayerView();
    });
  }
  function setupGlobalModals() {
    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        if (modal) modal.classList.remove("active");
      });
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach((m) => m.classList.remove("active"));
      }
    });
    document.getElementById("btn-open-login")?.addEventListener("click", () => {
      if (getCurrentRole() !== ROLES.PUBLIC) {
        navigateTo("admin-view");
      } else {
        openModal("modal-login");
      }
    });
    document.getElementById("btn-mobile-menu")?.addEventListener("click", () => {
      openModal("modal-mobile-menu");
    });
    renderLeaguePickerModal();
  }
  function openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add("active");
  }
  window.openModal = openModal;
  function closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove("active");
  }
  window.closeModal = closeModal;
  function renderLeaguePickerModal() {
    const container = document.getElementById("league-picker-modal-list");
    if (!container) return;
    const regions = getRegionsAndLeagues();
    const activeId = getActiveLeagueId();
    let html = "";
    regions.forEach((r) => {
      html += `
      <div style="margin-bottom: 1.25rem;">
        <div style="font-family: var(--font-display); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem;">
          \u{1F4CD} ${r.regionName}
        </div>
    `;
      r.leagues.forEach((l) => {
        const isSel = l.id === activeId;
        html += `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border: 1px solid ${isSel ? "var(--color-primary)" : "var(--color-border)"}; border-radius: var(--radius-sm); margin-bottom: 0.5rem; cursor: pointer; background: ${isSel ? "var(--color-primary-light)" : "#ffffff"}; transition: all 0.15s ease;" onclick="window.ligamasterSwitchLeague('${l.id}')">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${getClubBadgeSvg(l.badgeId || "asociacion-arauco", 32)}
            </div>
            <div>
              <strong style="font-family: var(--font-display); font-size: 0.92rem; color: var(--color-text-main); display: block;">${l.name}</strong>
              <small style="color: var(--color-text-muted); font-size: 0.75rem;">${l.commune} \u2022 ${l.statusLabel}</small>
            </div>
          </div>
          <span style="font-size: 0.75rem; font-weight: 800; color: ${isSel ? "var(--color-primary)" : "var(--color-text-muted)"};">${isSel ? "\u2713 ACTIVA" : "Seleccionar"}</span>
        </div>
      `;
      });
      html += `</div>`;
    });
    container.innerHTML = html;
  }
  function setupFooterLinks() {
    const docs = {
      reglamento: {
        title: "Reglamento Oficial de Competiciones ANFA 2026",
        badge: "\u{1F4DC} BASES OFICIALES",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Asociaci\xF3n de F\xFAtbol de Arauco \u2022 Afiliada a ANFA Biob\xEDo</strong>
            <span>Estatutos vigentes aprobados en Asamblea General de Clubes 2026.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">1. Series en Competencia</h4>
            <p>El campeonato oficial comprende las series de <strong>Honor (Primera)</strong>, <strong>Senior (35+ A\xF1os)</strong>, <strong>Segunda Adulta</strong>, <strong>Tercera Adulta</strong>, <strong>Super Senior (45+)</strong> y <strong>Juvenil (Sub-17)</strong>. Es obligaci\xF3n de los clubes presentar n\xF3mina en al menos 4 series federadas.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">2. Control de Fichas y C\xE9dula de Identidad</h4>
            <p>Todo jugador debe presentar su C\xE9dula de Identidad f\xEDsica vigente previo al inicio del encuentro ante la mesa de turno. Jugador sin carnet f\xEDsico o digital validado en sistema no puede ingresar al terreno de juego.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">3. R\xE9gimen Disciplinario</h4>
            <p>Acumulaci\xF3n de 3 tarjetas amarillas acarrea autom\xE1ticamente 1 fecha de suspensi\xF3n. La tarjeta roja directa implica suspensi\xF3n preventiva inmediata a la espera del fallo de los d\xEDas martes del Tribunal de Penas.</p>
          </div>
        </div>
      `
      },
      arbitros: {
        title: "Colegio de \xC1rbitros Profesionales & Amateur (CAPA)",
        badge: "\u2696\uFE0F CUERPO REFERIL",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Ternas y Designaciones Oficiales 2026</strong>
            <span>Garant\xEDa de imparcialidad, cronometraje oficial y fe p\xFAblica en el campo deportivo.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Designaci\xF3n de \xC1rbitros</h4>
            <p>Las ternas arbitrales son sorteadas de forma aut\xF3noma cada jueves a las 20:00 hrs en la sesi\xF3n de mesa ejecutiva, garantizando que ning\xFAn \xE1rbitro dirija al mismo club m\xE1s de dos fechas consecutivas.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Entrega de Informes</h4>
            <p>Los jueces tienen un plazo fatal de 24 horas posteriores al pitazo final para entregar la planilla f\xEDsica y ratificar los incidentes en el portal digital de la Asociaci\xF3n.</p>
          </div>
        </div>
      `
      },
      actas: {
        title: "Planillas Oficiales de Cancha y Turnos",
        badge: "\u{1F4CB} PROTOCOLO DE PARTIDO",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Planilla Digital Unificada LigaMaster</strong>
            <span>Registro digitalizado de anotaciones, tarjetas, minutos de juego y sustituciones.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Firma de Capitanes</h4>
            <p>Al t\xE9rmino de cada compromiso, los capitanes de ambos clubes deben firmar el acta oficial junto al \xE1rbitro central. La firma certifica el resultado final y los goles registrados.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Observaciones y Apelaciones</h4>
            <p>Cualquier reclamo por suplantaci\xF3n o irregularidad t\xE9cnica debe ser estampada en el dorso de la planilla antes de los 15 minutos de finalizado el cotejo.</p>
          </div>
        </div>
      `
      },
      contacto: {
        title: "Contacto Institucional \u2022 Mesa de Ayuda",
        badge: "\u{1F4DE} DIRECTORIO ANFA",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Atenci\xF3n a Dirigentes y Medios de Comunicaci\xF3n</strong>
            <span>Sede Social: Esmeralda 450, Arauco, Regi\xF3n del Biob\xEDo.</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-muted); font-weight: 800; display: block;">Correo Electr\xF3nico</span>
              <strong style="color: var(--color-primary); font-size: 0.9rem;">contacto@ligamaster.cl</strong>
            </div>
            <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-muted); font-weight: 800; display: block;">Turnos y Canchas</span>
              <strong style="color: var(--color-text-main); font-size: 0.9rem;">+56 9 8452 1190</strong>
            </div>
          </div>
          <p>Horario de atenci\xF3n presencial para tr\xE1mites de pases y habilitaciones: Martes y Jueves de 19:30 a 22:00 hrs.</p>
        </div>
      `
      },
      terminos: {
        title: "T\xE9rminos, Condiciones y Privacidad Deportiva",
        badge: "\u{1F512} PROTECCI\xD3N DE DATOS",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Uso de Datos en LigaMaster</strong>
            <span>Conformidad con la Ley 19.628 sobre protecci\xF3n de la vida privada en Chile.</span>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Padr\xF3n Deportivo y Estad\xEDsticas P\xFAblicas</h4>
            <p>Los nombres de futbolistas, n\xFAmeros de camiseta, fotograf\xEDas de campo y c\xF3mputo de goles forman parte del padr\xF3n de difusi\xF3n deportiva de inter\xE9s comunitario.</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.4rem;">Derechos de Imagen</h4>
            <p>Las transmisiones fotogr\xE1ficas y audiovisuales en recintos deportivos municipales se rigen bajo los convenios comunitarios de la Asociaci\xF3n y sus medios asociados.</p>
          </div>
        </div>
      `
      },
      postular: {
        title: "Postula tu Asociaci\xF3n a LigaMaster Chile",
        badge: "\u{1F680} EXPANSI\xD3N NACIONAL",
        html: `
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: var(--color-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border-left: 3px solid var(--color-primary);">
            <strong style="color: var(--color-text-main); display: block; margin-bottom: 0.25rem;">Lleva tu liga al est\xE1ndar profesional de LaLiga</strong>
            <span>Tablas en vivo, padr\xF3n de jugadores, control financiero y dise\xF1o broadcast.</span>
          </div>
          <p>Si eres presidente de una Asociaci\xF3n ANFA o liga independiente en cualquier regi\xF3n de Chile, puedes habilitar tu propia plataforma deportiva con tu escudo, tus clubes y tus canchas.</p>
          <div style="background: #fff; border: 1px solid var(--color-border); padding: 1rem; border-radius: var(--radius-sm); text-align: center;">
            <p style="margin-bottom: 0.5rem; font-weight: 700; color: var(--color-text-main);">Escr\xEDbenos directamente para solicitar demostraci\xF3n personalizada:</p>
            <a href="mailto:alianzas@ligamaster.cl" class="btn-primary-coral" style="display: inline-flex; text-decoration: none; padding: 0.5rem 1.25rem; font-size: 0.85rem; margin-top: 0.25rem;">
              Solicitar Demostraci\xF3n (alianzas@ligamaster.cl)
            </a>
          </div>
        </div>
      `
      }
    };
    const bindBtn = (id, key) => {
      document.getElementById(id)?.addEventListener("click", (e) => {
        e.preventDefault();
        const doc = docs[key];
        if (!doc) return;
        const modal = document.getElementById("modal-institutional-info");
        const titleEl = document.getElementById("institutional-modal-title");
        const bodyEl = document.getElementById("institutional-modal-body");
        if (modal && titleEl && bodyEl) {
          titleEl.innerHTML = `<span style="font-size: 0.72rem; color: var(--color-primary); display: block; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 0.15rem;">${doc.badge}</span>${doc.title}`;
          bodyEl.innerHTML = doc.html;
          modal.classList.add("active");
        }
      });
    };
    bindBtn("footer-btn-reglamento", "reglamento");
    bindBtn("footer-btn-arbitros", "arbitros");
    bindBtn("footer-btn-actas", "actas");
    bindBtn("footer-btn-contacto", "contacto");
    bindBtn("footer-btn-terminos", "terminos");
    bindBtn("footer-btn-postular", "postular");
  }
})();
