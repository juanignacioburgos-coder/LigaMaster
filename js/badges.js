/**
 * LigaPro Amateur - Catálogo Oficial de Escudos Vectoriales (SVG)
 * Asociación de Fútbol Amateur de Arauco (ANFA Arauco / ANFA Biobío)
 * 
 * Diseños heráldicos vectoriales optimizados para alta definición,
 * preservando la identidad patrimonial de cada institución.
 */

export const CLUB_BADGES_SVG = {
  // 1. Club Deportivo Arauco (Fundado el 01/01/1939 - Tradición Marina y Decana)
  'club-arauco': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-arauco" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-cda-navy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e3a8a" />
        </linearGradient>
        <linearGradient id="grad-cda-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
      </defs>
      <!-- Escudo base -->
      <path d="M 60 10 C 95 10 110 20 110 55 C 110 92 60 114 60 114 C 60 114 10 92 10 55 C 10 20 25 10 60 10 Z" fill="url(#grad-cda-navy)" stroke="url(#grad-cda-gold)" stroke-width="4" />
      <path d="M 60 16 C 90 16 102 24 102 54 C 102 86 60 106 60 106 C 60 106 18 86 18 54 C 18 24 30 16 60 16 Z" fill="none" stroke="rgba(251,191,36,0.3)" stroke-width="1.5" />
      <!-- Barra Superior Dorada -->
      <path d="M 22 28 Q 60 32 98 28 L 102 38 Q 60 43 18 38 Z" fill="url(#grad-cda-gold)" />
      <text x="60" y="37" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="10" fill="#0f172a" text-anchor="middle" letter-spacing="1">C. D. ARAUCO</text>
      <!-- Ancla Histórica Marina -->
      <g transform="translate(60, 68) scale(0.65)" stroke="url(#grad-cda-gold)" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="0" cy="-28" r="8" fill="url(#grad-cda-gold)" />
        <line x1="0" y1="-20" x2="0" y2="28" />
        <line x1="-16" y1="-8" x2="16" y2="-8" />
        <path d="M -26 12 C -20 32 20 32 26 12" />
        <polygon points="-28,12 -23,12 -26,6" fill="url(#grad-cda-gold)" />
        <polygon points="28,12 23,12 26,6" fill="url(#grad-cda-gold)" />
      </g>
      <!-- Año 1939 -->
      <text x="60" y="100" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="9" fill="#fbbf24" text-anchor="middle">1939</text>
    </svg>
  `,

  // 2. Club Deportivo Pelantaro (Fundado el 20/08/1929 - Los Guerreros Toqui)
  'club-pelantaro': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-pelantaro" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="pelantaro-clip">
          <path d="M 60 10 C 95 10 108 22 108 55 C 108 92 60 114 60 114 C 60 114 12 92 12 55 C 12 22 25 10 60 10 Z" />
        </clipPath>
      </defs>
      <!-- Fondo y Franjas Verdes y Blancas -->
      <g clip-path="url(#pelantaro-clip)">
        <rect x="0" y="0" width="120" height="120" fill="#ffffff" />
        <rect x="12" y="0" width="24" height="120" fill="#15803d" />
        <rect x="48" y="0" width="24" height="120" fill="#15803d" />
        <rect x="84" y="0" width="24" height="120" fill="#15803d" />
        <!-- Franja Roja Superior -->
        <rect x="0" y="0" width="120" height="42" fill="#dc2626" />
        <text x="60" y="24" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1">PELANTARO</text>
        <text x="60" y="36" font-family="'Inter', system-ui, sans-serif" font-weight="700" font-size="8" fill="#fecaca" text-anchor="middle">FUNDADO 1929</text>
      </g>
      <!-- Silueta Lanza / Flecha Toqui y Balón -->
      <circle cx="60" cy="68" r="18" fill="#1e293b" stroke="#ffffff" stroke-width="2.5" />
      <path d="M 50 68 L 70 68 M 60 58 L 60 78" stroke="#ffffff" stroke-width="2" />
      <polygon points="60,46 54,58 66,58" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" />
      <!-- Borde general -->
      <path d="M 60 10 C 95 10 108 22 108 55 C 108 92 60 114 60 114 C 60 114 12 92 12 55 C 12 22 25 10 60 10 Z" fill="none" stroke="#dc2626" stroke-width="4" />
    </svg>
  `,

  // 3. Club Deportivo Arturo Prat (Fundado el 21/05/1952 - Sector California)
  'club-arturo-prat': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-prat" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-prat-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="100%" stop-color="#091e42" />
        </linearGradient>
      </defs>
      <!-- Blasón Francés Azul Marino -->
      <path d="M 20 15 L 100 15 L 100 65 C 100 95 60 112 60 112 C 60 112 20 95 20 65 Z" fill="url(#grad-prat-blue)" stroke="#38bdf8" stroke-width="3.5" />
      <path d="M 26 21 L 94 21 L 94 64 C 94 88 60 104 60 104 C 60 104 26 88 26 64 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
      <!-- Texto Superior -->
      <rect x="22" y="16" width="76" height="18" fill="#ffffff" />
      <text x="60" y="29" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="9.5" fill="#1e3a8a" text-anchor="middle" letter-spacing="0.5">ARTURO PRAT</text>
      <!-- Timón y Ancla de la Marina -->
      <circle cx="60" cy="62" r="20" fill="none" stroke="#38bdf8" stroke-width="3" />
      <line x1="60" y1="38" x2="60" y2="86" stroke="#38bdf8" stroke-width="2.5" />
      <line x1="36" y1="62" x2="84" y2="62" stroke="#38bdf8" stroke-width="2.5" />
      <line x1="43" y1="45" x2="77" y2="79" stroke="#38bdf8" stroke-width="2" />
      <line x1="43" y1="79" x2="77" y2="45" stroke="#38bdf8" stroke-width="2" />
      <circle cx="60" cy="62" r="7" fill="#ffffff" stroke="#1e3a8a" stroke-width="2" />
      <!-- Año y Sector -->
      <text x="60" y="98" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="8.5" fill="#e0f2fe" text-anchor="middle">1952 • CALIFORNIA</text>
    </svg>
  `,

  // 4. Club Deportivo Jorge Robledo (Fundado el 14/06/1954 - Plazoleta Fresia / Estación)
  'club-jorge-robledo': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-robledo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-robledo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
      </defs>
      <!-- Escudo Azul Real y Oro -->
      <path d="M 60 10 L 105 22 L 105 65 C 105 96 60 114 60 114 C 60 114 15 96 15 65 L 15 22 Z" fill="#1d4ed8" stroke="url(#grad-robledo-gold)" stroke-width="4" />
      <!-- Mitad izquierda con rayas doradas -->
      <path d="M 60 10 L 15 22 L 15 65 C 15 96 60 114 60 114 Z" fill="#1e40af" />
      <line x1="28" y1="26" x2="28" y2="82" stroke="rgba(245,158,11,0.4)" stroke-width="5" />
      <line x1="44" y1="20" x2="44" y2="98" stroke="rgba(245,158,11,0.4)" stroke-width="5" />
      <!-- Gran Estrella Dorada (Homenaje a George Robledo Campeón FA Cup) -->
      <polygon points="60,26 64,38 77,38 67,46 71,58 60,50 49,58 53,46 43,38 56,38" fill="url(#grad-robledo-gold)" stroke="#ffffff" stroke-width="1" />
      <!-- Balón de Cuero de época -->
      <circle cx="60" cy="74" r="14" fill="#ffffff" stroke="#1d4ed8" stroke-width="2" />
      <circle cx="60" cy="74" r="5" fill="#f59e0b" />
      <!-- Nombre de la Institución -->
      <rect x="20" y="92" width="80" height="15" rx="3" fill="#0f172a" stroke="url(#grad-robledo-gold)" stroke-width="1" />
      <text x="60" y="103" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="8" fill="#f59e0b" text-anchor="middle" letter-spacing="0.5">JORGE ROBLEDO</text>
    </svg>
  `,

  // 5. Club Deportivo Caupolicán (Fundado el 03/08/1965 - 'Un Solo Corazón')
  'club-caupolican': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-caupolican" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo Verde Esmeralda y Dorado -->
      <path d="M 60 12 C 96 12 108 26 108 58 C 108 92 60 114 60 114 C 60 114 12 92 12 58 C 12 26 24 12 60 12 Z" fill="#166534" stroke="#eab308" stroke-width="4" />
      <!-- Triángulo / Araucaria Nativa -->
      <polygon points="60,34 40,78 80,78" fill="#14532d" stroke="#facc15" stroke-width="2" />
      <polygon points="60,42 46,74 74,74" fill="#15803d" />
      <rect x="57" y="78" width="6" height="10" fill="#78350f" />
      <!-- Estrella Mapuche de 8 puntas (Guñelve) -->
      <g transform="translate(60, 32) scale(0.6)">
        <polygon points="0,-12 4,-4 12,0 4,4 0,12 -4,4 -12,0 -4,-4" fill="#facc15" />
        <polygon points="-8,-8 0,-4 8,-8 4,0 8,8 0,4 -8,8 -4,0" fill="#facc15" />
      </g>
      <!-- Texto -->
      <text x="60" y="24" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="9" fill="#fef08a" text-anchor="middle" letter-spacing="1">CAUPOLICÁN</text>
      <text x="60" y="102" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="8.5" fill="#fef08a" text-anchor="middle">1965 • ARAUCO</text>
    </svg>
  `,

  // 6. Club Deportivo Colo-Colo Arauco (Fundado el 19/04/1961 - Población 10 de Julio)
  'club-colo-colo': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-colocolo" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo Albo con cabecera tricolor -->
      <path d="M 60 12 L 104 22 L 104 68 C 104 96 60 114 60 114 C 60 114 16 96 16 68 L 16 22 Z" fill="#ffffff" stroke="#0f172a" stroke-width="4" />
      <!-- Franja Superior Negra y Roja -->
      <path d="M 16 22 L 104 22 L 104 38 L 16 38 Z" fill="#0f172a" />
      <rect x="16" y="38" width="88" height="4" fill="#dc2626" />
      <text x="60" y="33" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="8.5" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">COLO-COLO ARAUCO</text>
      <!-- Perfil del Cacique Mapuche con Pluma -->
      <circle cx="60" cy="66" r="18" fill="#0f172a" />
      <polygon points="60,40 56,54 64,54" fill="#dc2626" />
      <circle cx="60" cy="66" r="15" fill="#ffffff" />
      <path d="M 52 64 C 55 58 65 58 68 64 C 68 74 52 74 52 64 Z" fill="#0f172a" />
      <!-- Año 1961 -->
      <text x="60" y="102" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="9" fill="#0f172a" text-anchor="middle">1961</text>
    </svg>
  `,

  // 7. Club Deportivo Brisas del Mar (Fundado el 18/09/1965 - Caleta de Tubul)
  'club-brisas-del-mar': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-brisas" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-brisas-sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="50%" stop-color="#0369a1" />
          <stop offset="100%" stop-color="#075985" />
        </linearGradient>
      </defs>
      <!-- Escudo Verde/Azul Marino de Caleta Tubul -->
      <path d="M 60 10 C 96 10 108 24 108 58 C 108 92 60 114 60 114 C 60 114 12 92 12 58 C 12 24 24 10 60 10 Z" fill="url(#grad-brisas-sea)" stroke="#38bdf8" stroke-width="4" />
      <!-- Sol Naciente del Golfo de Arauco -->
      <circle cx="60" cy="46" r="14" fill="#facc15" />
      <!-- Olas del Pacífico / Caleta Tubul -->
      <path d="M 16 66 Q 38 52 60 66 Q 82 80 104 66 L 104 90 C 104 90 60 112 60 112 C 60 112 16 90 16 90 Z" fill="#059669" />
      <path d="M 16 66 Q 38 52 60 66 Q 82 80 104 66" fill="none" stroke="#ffffff" stroke-width="3" />
      <path d="M 22 76 Q 44 64 66 76 Q 88 88 100 78" fill="none" stroke="#e0f2fe" stroke-width="2" />
      <!-- Pelícano o Gaviota Costera -->
      <path d="M 44 38 Q 50 32 60 38 Q 70 32 76 38" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
      <!-- Rótulo Tubul -->
      <text x="60" y="24" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">BRISAS DEL MAR</text>
      <text x="60" y="103" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="8.5" fill="#fef08a" text-anchor="middle">TUBUL • 1965</text>
    </svg>
  `,

  // 8. Club Deportivo Celulosa Arauco (Fundado el 26/08/1972 - Complejo Forestal)
  'club-celulosa-arauco': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-celulosa" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-celulosa" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b91c1c" />
          <stop offset="100%" stop-color="#7f1d1d" />
        </linearGradient>
      </defs>
      <!-- Escudo Rojo Forestal con Oro -->
      <path d="M 60 10 L 105 20 L 105 68 C 105 98 60 114 60 114 C 60 114 15 98 15 68 L 15 20 Z" fill="url(#grad-celulosa)" stroke="#facc15" stroke-width="3.5" />
      <!-- Engranaje Industrial / Pino Insigne -->
      <circle cx="60" cy="62" r="22" fill="#991b1b" stroke="#facc15" stroke-width="2" />
      <g fill="#facc15">
        <!-- Dientes de engranaje -->
        <rect x="57" y="37" width="6" height="5" />
        <rect x="57" y="82" width="6" height="5" />
        <rect x="35" y="59" width="5" height="6" />
        <rect x="80" y="59" width="5" height="6" />
      </g>
      <!-- Pino Forestal Central Verde -->
      <polygon points="60,45 48,68 72,68" fill="#15803d" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="60,55 45,74 75,74" fill="#166534" stroke="#ffffff" stroke-width="1" />
      <!-- Letras -->
      <text x="60" y="27" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">CELULOSA ARAUCO</text>
      <text x="60" y="102" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="9" fill="#facc15" text-anchor="middle">1972</text>
    </svg>
  `,

  // 9. Club Deportivo Gente de Mar (Fundado el 08/10/1976 - Calle O'Higgins / Pescadores)
  'club-gente-de-mar': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-gentedemar" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo Azul Pacífico -->
      <path d="M 60 10 C 95 10 108 24 108 56 C 108 92 60 114 60 114 C 60 114 12 92 12 56 C 12 24 25 10 60 10 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="3.5" />
      <!-- Franja Ondulada -->
      <path d="M 12 56 Q 36 46 60 56 Q 84 66 108 56 L 108 100 C 108 100 60 114 60 114 C 60 114 12 100 12 100 Z" fill="#0c4a6e" />
      <!-- Embarcación Pesquera Tradicional -->
      <path d="M 36 72 Q 60 84 84 72 L 78 80 Q 60 88 42 80 Z" fill="#f97316" stroke="#ffffff" stroke-width="1.5" />
      <!-- Vela de Navegación -->
      <polygon points="60,40 60,68 44,68" fill="#ffffff" />
      <polygon points="62,44 62,68 76,68" fill="#e0f2fe" />
      <line x1="61" y1="36" x2="61" y2="72" stroke="#ffffff" stroke-width="2" />
      <!-- Texto -->
      <text x="60" y="24" font-family="'Inter', system-ui, sans-serif" font-weight="900" font-size="8.5" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">GENTE DE MAR</text>
      <text x="60" y="103" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="8.5" fill="#7dd3fc" text-anchor="middle">1976</text>
    </svg>
  `,

  // 10. Club Deportivo Real José María (Fundado el 30/01/2026 - Oficial Instagram @realjosemaria)
  'club-real-jose-maria': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-realjosemaria" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-rjm-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb" />
          <stop offset="25%" stop-color="#fde047" />
          <stop offset="60%" stop-color="#d97706" />
          <stop offset="100%" stop-color="#92400e" />
        </linearGradient>
        <linearGradient id="grad-rjm-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <clipPath id="rjm-shield-clip">
          <path d="M 60 22 C 96 22 106 32 106 66 C 106 95 60 115 60 115 C 60 115 14 95 14 66 C 14 32 24 22 60 22 Z" />
        </clipPath>
      </defs>

      <!-- Escudo Base con Rayas Verticales Oficiales Azul Marino y Rojo (❤️💙) -->
      <g clip-path="url(#rjm-shield-clip)">
        <rect x="0" y="0" width="120" height="120" fill="url(#grad-rjm-blue)" />
        <!-- Rayas Rojas Oficiales con ribetes finos blancos -->
        <rect x="25" y="0" width="14" height="120" fill="#dc2626" stroke="#ffffff" stroke-width="0.8" />
        <rect x="53" y="0" width="14" height="120" fill="#dc2626" stroke="#ffffff" stroke-width="0.8" />
        <rect x="81" y="0" width="14" height="120" fill="#dc2626" stroke="#ffffff" stroke-width="0.8" />
        <rect x="0" y="0" width="120" height="120" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
      </g>

      <!-- Borde de Escudo Oro Imperial -->
      <path d="M 60 22 C 96 22 106 32 106 66 C 106 95 60 115 60 115 C 60 115 14 95 14 66 C 14 32 24 22 60 22 Z" fill="none" stroke="url(#grad-rjm-gold)" stroke-width="4.5" />
      <path d="M 60 25 C 93 25 102 34 102 65 C 102 92 60 110 60 110 C 60 110 18 92 18 65 C 18 34 27 25 60 25 Z" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.6" />

      <!-- Corona Imperial de Oro con Pedrería Fina Superior -->
      <g transform="translate(60, 16) scale(0.62)">
        <!-- Base de la corona -->
        <path d="M -36 8 L -30 -14 L -15 0 L 0 -22 L 15 0 L 30 -14 L 36 8 Z" fill="url(#grad-rjm-gold)" stroke="#78350f" stroke-width="1.8" />
        <ellipse cx="0" cy="-22" rx="4" ry="4" fill="#ffffff" stroke="#d97706" stroke-width="1" />
        <ellipse cx="-30" cy="-14" rx="3.5" ry="3.5" fill="#ef4444" stroke="#991b1b" stroke-width="0.8" />
        <ellipse cx="30" cy="-14" rx="3.5" ry="3.5" fill="#ef4444" stroke="#991b1b" stroke-width="0.8" />
        <ellipse cx="-15" cy="0" rx="3" ry="3" fill="#2563eb" stroke="#1e3a8a" stroke-width="0.8" />
        <ellipse cx="15" cy="0" rx="3" ry="3" fill="#2563eb" stroke="#1e3a8a" stroke-width="0.8" />
        <!-- Cintillo con gemas -->
        <rect x="-34" y="8" width="68" height="6" rx="2" fill="url(#grad-rjm-gold)" stroke="#78350f" stroke-width="1" />
        <circle cx="-24" cy="11" r="1.5" fill="#ef4444" />
        <circle cx="-12" cy="11" r="1.5" fill="#ffffff" />
        <circle cx="0" cy="11" r="1.5" fill="#3b82f6" />
        <circle cx="12" cy="11" r="1.5" fill="#ffffff" />
        <circle cx="24" cy="11" r="1.5" fill="#ef4444" />
      </g>

      <!-- Cinta Superior Negra con Borde Dorado: "REAL JOSÉ MARÍA" -->
      <path d="M 20 32 Q 60 27 100 32 L 96 44 Q 60 39 24 44 Z" fill="#0f172a" stroke="url(#grad-rjm-gold)" stroke-width="1.8" />
      <text x="60" y="40.5" font-family="'Inter', 'Montserrat', sans-serif" font-weight="900" font-size="7.5" fill="url(#grad-rjm-gold)" text-anchor="middle" letter-spacing="0.8">REAL JOSÉ MARÍA</text>

      <!-- Corona de Laureles Dorados Central -->
      <g stroke="url(#grad-rjm-gold)" fill="none" stroke-width="2" stroke-linecap="round">
        <path d="M 38 76 C 33 66 33 54 44 48" />
        <path d="M 82 76 C 87 66 87 54 76 48" />
        <!-- Hojas de laurel -->
        <ellipse cx="36" cy="62" rx="3" ry="1.5" fill="url(#grad-rjm-gold)" transform="rotate(-30 36 62)" />
        <ellipse cx="40" cy="53" rx="3" ry="1.5" fill="url(#grad-rjm-gold)" transform="rotate(-15 40 53)" />
        <ellipse cx="84" cy="62" rx="3" ry="1.5" fill="url(#grad-rjm-gold)" transform="rotate(30 84 62)" />
        <ellipse cx="80" cy="53" rx="3" ry="1.5" fill="url(#grad-rjm-gold)" transform="rotate(15 80 53)" />
      </g>

      <!-- Balón de Fútbol Clásico de Cuero Blanco/Negro -->
      <g transform="translate(60, 65) scale(0.48)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#000000" stroke-width="3" />
        <!-- Pentágono central -->
        <polygon points="0,-9 8,-3 5,7 -5,7 -8,-3" fill="#0f172a" />
        <line x1="0" y1="-9" x2="0" y2="-27" stroke="#0f172a" stroke-width="2.5" />
        <line x1="8" y1="-3" x2="25" y2="-10" stroke="#0f172a" stroke-width="2.5" />
        <line x1="5" y1="7" x2="18" y2="21" stroke="#0f172a" stroke-width="2.5" />
        <line x1="-5" y1="7" x2="-18" y2="21" stroke="#0f172a" stroke-width="2.5" />
        <line x1="-8" y1="-3" x2="-25" y2="-10" stroke="#0f172a" stroke-width="2.5" />
      </g>

      <!-- F.C. y Fecha de Fundación Oficial: 30 - ENE - 2026 -->
      <text x="60" y="87" font-family="'Inter', sans-serif" font-weight="900" font-size="7.5" fill="url(#grad-rjm-gold)" text-anchor="middle" letter-spacing="1">F. C.</text>
      <text x="60" y="97" font-family="'Inter', sans-serif" font-weight="800" font-size="6" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">30 • ENE • 2026</text>
    </svg>
  `,

  // 11. Escudo Oficial de la Asociación de Fútbol de Arauco (AFA) / Selección de Arauco
  // Conforme a la enseña histórica con Corona Mural de 3 torres, Perfil de Toqui Mapuche con Trarilonco y Siglas AFA
  'seleccion-arauco': (size = 48) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-seleccion-arauco" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-afa-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
        <clipPath id="afa-shield-clip">
          <path d="M 22 36 L 98 36 L 98 72 C 98 96 60 114 60 114 C 60 114 22 96 22 72 Z" />
        </clipPath>
      </defs>

      <!-- Corona Mural Histórica de Arauco (3 Almenas de Ciudad Heroica) -->
      <g transform="translate(60, 18) scale(0.68)">
        <!-- Muralla almenada dorada con sillares -->
        <path d="M -48 16 L -48 -2 L -34 -2 L -34 6 L -20 6 L -20 -8 L -6 -8 L -6 6 L 6 6 L 6 -8 L 20 -8 L 20 6 L 34 6 L 34 -2 L 48 -2 L 48 16 Z" fill="url(#grad-afa-gold)" stroke="#78350f" stroke-width="2" />
        <line x1="-46" y1="8" x2="46" y2="8" stroke="#78350f" stroke-width="1.2" opacity="0.6" />
        <!-- Puertas arqueadas de las 3 torres -->
        <rect x="-29" y="8" width="6" height="8" rx="3" fill="#78350f" />
        <rect x="-3" y="2" width="6" height="14" rx="3" fill="#78350f" />
        <rect x="23" y="8" width="6" height="8" rx="3" fill="#78350f" />
      </g>

      <!-- Rótulo Verde Superior: Asociación de Fútbol -->
      <rect x="20" y="27" width="80" height="12" rx="2" fill="#15803d" stroke="#ca8a04" stroke-width="1.2" />
      <text x="60" y="35.5" font-family="'Inter', sans-serif" font-weight="900" font-size="5.8" fill="#ffffff" text-anchor="middle" letter-spacing="0.3">ASOCIACIÓN DE FÚTBOL</text>

      <!-- Campo del Escudo Oficial en Blanco puro -->
      <path d="M 22 38 L 98 38 L 98 72 C 98 96 60 114 60 114 C 60 114 22 96 22 72 Z" fill="#ffffff" />

      <!-- Perfil del Toqui Araucano (Líneas Azules Tradicionales con Trarilonco) -->
      <g transform="translate(46, 68) scale(0.58)" fill="none" stroke="#1d4ed8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <!-- Perfil guerrero mapuche mirando a la derecha -->
        <path d="M -16 26 C -12 18 -10 10 -10 2 C -10 -8 -4 -16 6 -18 C 12 -19 18 -16 20 -10 C 22 -6 21 0 17 4 C 23 8 20 18 15 22 C 12 24 5 26 -2 26" fill="#eff6ff" />
        <!-- Nariz, labios y mentón enérgico -->
        <path d="M 6 -12 L 14 -2 L 10 2 L 13 8 L 8 12 L 4 16 L -2 26" />
        <!-- Trarilonco (Cintillo con plumas y trenza) -->
        <path d="M -14 -4 C -8 -8 4 -12 16 -10" stroke-width="4" stroke="#1e40af" />
        <path d="M -16 -2 C -18 -8 -20 -18 -15 -24 C -10 -20 -12 -10 -10 -4" fill="#2563eb" />
        <path d="M -8 -8 C -6 -16 -4 -24 3 -28 C 4 -20 0 -12 -2 -8" fill="#2563eb" />
        <circle cx="2" cy="-4" r="1.5" fill="#1d4ed8" />
        <!-- Ojo decidido -->
        <path d="M 4 -4 L 8 -2" stroke-width="2" />
      </g>

      <!-- Letras A F A en Azul Profundo (Columna derecha) -->
      <g font-family="'Inter', 'Arial Black', sans-serif" font-weight="900" font-size="12" fill="#1e40af" text-anchor="middle">
        <text x="82" y="54">A</text>
        <text x="82" y="68">F</text>
        <text x="82" y="82">A</text>
      </g>

      <!-- Bordura Bicolor: Verde a la izquierda, Roja a la derecha -->
      <path d="M 60 38 L 22 38 L 22 72 C 22 96 60 114 60 114" fill="none" stroke="#16a34a" stroke-width="3.5" />
      <path d="M 60 38 L 98 38 L 98 72 C 98 96 60 114 60 114" fill="none" stroke="#dc2626" stroke-width="3.5" />
      <!-- Ribete exterior dorado -->
      <path d="M 22 38 L 98 38 L 98 72 C 98 96 60 114 60 114 C 60 114 22 96 22 72 Z" fill="none" stroke="url(#grad-afa-gold)" stroke-width="1.2" />

      <!-- Lema Inferior: Arauco en letras rojas -->
      <path d="M 36 94 Q 60 100 84 94 L 82 103 Q 60 110 38 103 Z" fill="#fee2e2" stroke="#dc2626" stroke-width="0.8" />
      <text x="60" y="101" font-family="'Inter', sans-serif" font-weight="900" font-size="7" fill="#dc2626" text-anchor="middle" letter-spacing="0.5">ARAUCO</text>
    </svg>
  `,

  // Fallback para Lebu
  'lebu': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-lebu" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 10 L 105 24 L 105 68 C 105 98 60 116 60 116 C 60 116 15 98 15 68 L 15 24 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="3" />
      <text x="60" y="55" font-size="24" text-anchor="middle">🌊</text>
      <text x="60" y="85" font-family="'Inter', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">LEBU</text>
    </svg>
  `,

  // Fallback para Cañete
  'canete': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-canete" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 10 L 105 24 L 105 68 C 105 98 60 116 60 116 C 60 116 15 98 15 68 L 15 24 Z" fill="#15803d" stroke="#facc15" stroke-width="3" />
      <text x="60" y="55" font-size="24" text-anchor="middle">🌲</text>
      <text x="60" y="85" font-family="'Inter', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">CAÑETE</text>
    </svg>
  `,

  // Fallback para Curanilahue / Cavecur
  'curanilahue': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-cavecur" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 10 L 105 24 L 105 68 C 105 98 60 116 60 116 C 60 116 15 98 15 68 L 15 24 Z" fill="#e11d48" stroke="#fb7185" stroke-width="3" />
      <text x="60" y="55" font-size="24" text-anchor="middle">⛏️</text>
      <text x="60" y="85" font-family="'Inter', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle">CAVECUR</text>
    </svg>
  `
};

/**
 * Retorna el SVG del escudo oficial según ID de club
 */
export function getClubBadgeSvg(clubId, size = 36) {
  if (!clubId) {
    return CLUB_BADGES_SVG['seleccion-arauco'](size);
  }
  if (CLUB_BADGES_SVG[clubId]) {
    return CLUB_BADGES_SVG[clubId](size);
  }
  // Fallbacks para asociaciones rivales del Regional
  if (clubId.includes('lebu')) return CLUB_BADGES_SVG['lebu'](size);
  if (clubId.includes('canete')) return CLUB_BADGES_SVG['canete'](size);
  if (clubId.includes('curanilahue') || clubId.includes('cavecur')) return CLUB_BADGES_SVG['curanilahue'](size);
  
  // Escudo genérico ANFA
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" class="club-official-badge" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 8 L 88 20 L 88 56 C 88 80 50 94 50 94 C 50 94 12 80 12 56 L 12 20 Z" fill="#1e293b" stroke="#64748b" stroke-width="3" />
      <circle cx="50" cy="48" r="16" fill="#334155" />
      <text x="50" y="54" font-size="14" text-anchor="middle" fill="#ffffff">⚽</text>
    </svg>
  `;
}

/**
 * Retorna el escudo oficial de la Selección Comunal
 */
export function getSelectionBadgeSvg(size = 48) {
  return CLUB_BADGES_SVG['seleccion-arauco'](size);
}
