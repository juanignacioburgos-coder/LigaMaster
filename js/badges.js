/**
 * LigaMaster - Catálogo Oficial de Escudos Vectoriales (SVG)
 * Asociación de Fútbol de Arauco y Asociaciones Afiliadas
 * 
 * Diseños heráldicos vectoriales fieles a los escudos oficiales de los 10 clubes
 * y de la Asociación de Fútbol de Arauco (AFA).
 */

export const CLUB_BADGES_SVG = {
  // 1. ASOCIACIÓN DE FÚTBOL ARAUCO (AFA) / SELECCIÓN COMUNAL
  // Corona mural dorada de 5 almenas, borde verde y rojo, cabeza de toqui mapuche con trarilonco azul/blanco, letras AFA y Arauco
  'asociacion-arauco': (size = 36) => `
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
      
      <!-- Texto Superior: Asociación de Fútbol -->
      <text x="60" y="42" font-family="'Inter', sans-serif" font-weight="900" font-size="5" fill="#15803d" text-anchor="middle" letter-spacing="0.2">ASOCIACIÓN DE FÚTBOL</text>
      
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

  'seleccion-arauco': (size = 36) => CLUB_BADGES_SVG['asociacion-arauco'](size),

  // 2. CLUB DEPORTIVO PELANTARO (Fundado: 20 de agosto de 1929 - El Decano)
  // Escudo blanco con borde azul marino, jinete Toqui Pelantaro a caballo con lanza
  'club-pelantaro': (size = 36) => `
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
      
      <!-- Subtítulo ARAUCO 1929 -->
      <text x="60" y="90" font-family="'Inter', sans-serif" font-weight="800" font-size="7.5" fill="#1e3a8a" text-anchor="middle">ARAUCO</text>
      <text x="60" y="100" font-family="'Inter', sans-serif" font-weight="800" font-size="7" fill="#64748b" text-anchor="middle">• 1929 •</text>
    </svg>
  `,

  // 3. CLUB DEPORTIVO ARAUCO (Fundado: 1 de enero de 1939)
  // Escudo blanco con borde rojo, 2 leones rampantes rojos sosteniendo balón central
  'club-arauco': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-arauco" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo base blanco con borde rojo carmesí -->
      <path d="M 60 12 C 92 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 28 12 60 12 Z" fill="#ffffff" stroke="#dc2626" stroke-width="4.5" />
      
      <!-- Cinta Superior: CLUB DEPORTIVO -->
      <path d="M 28 26 Q 60 30 92 26 L 90 35 Q 60 38 30 35 Z" fill="#dc2626" />
      <text x="60" y="33" font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">CLUB DEPORTIVO</text>
      
      <!-- Dos Leones Rampantes Rojos -->
      <!-- León Izquierdo -->
      <g transform="translate(38, 62) scale(0.48)">
        <path d="M -8 -20 C -2 -24 6 -20 4 -12 C 2 -6 8 0 10 8 C 12 16 6 24 2 30 C -2 36 -10 32 -14 26 C -18 20 -16 12 -12 6 C -8 0 -12 -14 -8 -20 Z" fill="#dc2626" />
        <path d="M 2 -4 L 14 -10 L 12 -4 Z" fill="#dc2626" />
        <path d="M 4 8 L 18 8 L 14 14 Z" fill="#dc2626" />
        <path d="M -6 24 L -16 36 L -10 38 Z" fill="#dc2626" />
      </g>
      <!-- León Derecho -->
      <g transform="translate(82, 62) scale(-0.48, 0.48)">
        <path d="M -8 -20 C -2 -24 6 -20 4 -12 C 2 -6 8 0 10 8 C 12 16 6 24 2 30 C -2 36 -10 32 -14 26 C -18 20 -16 12 -12 6 C -8 0 -12 -14 -8 -20 Z" fill="#dc2626" />
        <path d="M 2 -4 L 14 -10 L 12 -4 Z" fill="#dc2626" />
        <path d="M 4 8 L 18 8 L 14 14 Z" fill="#dc2626" />
        <path d="M -6 24 L -16 36 L -10 38 Z" fill="#dc2626" />
      </g>
      
      <!-- Balón de Fútbol Clásico en el Centro -->
      <circle cx="60" cy="62" r="9" fill="#ffffff" stroke="#000000" stroke-width="1.2" />
      <polygon points="60,57 64,60 62,64 58,64 56,60" fill="#000000" />
      
      <!-- Texto Inferior ARAUCO -->
      <text x="60" y="88" font-family="'Inter', sans-serif" font-weight="900" font-size="9" fill="#dc2626" text-anchor="middle" letter-spacing="1">ARAUCO</text>
      <text x="60" y="98" font-family="'Inter', sans-serif" font-weight="700" font-size="6.5" fill="#475569" text-anchor="middle">1939</text>
    </svg>
  `,

  // 4. CLUB DEPORTIVO ARTURO PRAT (Fundado: 22 de septiembre de 1952)
  // Escudo circular negro y amarillo/dorado con gran ancla, estrella arriba y balón
  'club-arturo-prat': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-arturo-prat" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prat-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
      </defs>
      <!-- Círculo Base Negro con Borde Dorado -->
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
      
      <!-- Balón de Fútbol en el ancla -->
      <circle cx="60" cy="62" r="5" fill="#ffffff" stroke="#000000" stroke-width="0.8" />
      
      <!-- Texto Inferior: ARTURO PRAT 1952 -->
      <text x="60" y="93" font-family="'Inter', sans-serif" font-weight="900" font-size="7.5" fill="#eab308" text-anchor="middle" letter-spacing="0.5">ARTURO PRAT</text>
      <text x="60" y="101" font-family="'Inter', sans-serif" font-weight="700" font-size="6" fill="#cbd5e1" text-anchor="middle">1952</text>
    </svg>
  `,

  // 5. CLUB DEPORTIVO BRISAS DEL MAR (Fundado: 25 de diciembre de 1978)
  // Escudo ondulado marino en amarillo y azul real, barco navegando y balón arriba a la izquierda
  'club-brisas-del-mar': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-brisas" xmlns="http://www.w3.org/2000/svg">
      <!-- Escudo con forma de cresta ondulada -->
      <path d="M 20 28 Q 60 16 100 28 Q 106 65 60 110 Q 14 65 20 28 Z" fill="#2563eb" stroke="#fbbf24" stroke-width="4.5" />
      
      <!-- Mitad Superior Amarilla -->
      <path d="M 21 29 Q 60 17 99 29 Q 102 52 80 55 Q 60 58 40 55 Q 21 52 21 29 Z" fill="#facc15" />
      
      <!-- Texto Superior: C. D. BRISAS DEL MAR -->
      <text x="60" y="38" font-family="'Inter', sans-serif" font-weight="900" font-size="7" fill="#1e3a8a" text-anchor="middle">C. D.</text>
      <text x="60" y="47" font-family="'Inter', sans-serif" font-weight="900" font-size="6" fill="#1e3a8a" text-anchor="middle" letter-spacing="0.3">BRISAS DEL MAR</text>
      
      <!-- Balón arriba a la izquierda -->
      <circle cx="34" cy="42" r="5" fill="#ffffff" stroke="#000000" stroke-width="0.8" />
      
      <!-- Barco Pesquero Tradicional con casco rojo y velas sobre olas -->
      <g transform="translate(60, 72) scale(0.65)">
        <!-- Casco del barco -->
        <path d="M -22 4 L 22 4 L 16 16 L -16 16 Z" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
        <!-- Cabina y mástil -->
        <rect x="-8" y="-6" width="16" height="10" fill="#ffffff" stroke="#1e3a8a" stroke-width="1" />
        <line x1="0" y1="-16" x2="0" y2="4" stroke="#713f12" stroke-width="2" />
        <!-- Olas marinas en azul -->
        <path d="M -30 18 Q -15 14 0 18 Q 15 22 30 18" stroke="#60a5fa" stroke-width="3" fill="none" stroke-linecap="round" />
      </g>
      
      <!-- Año 1978 -->
      <text x="60" y="98" font-family="'Inter', sans-serif" font-weight="800" font-size="7" fill="#fef08a" text-anchor="middle">1978</text>
    </svg>
  `,

  // 6. CLUB DEPORTIVO CAUPOLICÁN (Fundado: 3 de agosto de 1965)
  // Escudo circular con franjas verticales rojas y blancas, medallón plateado con relieve del Toqui Caupolicán
  'club-caupolican': (size = 36) => `
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
      
      <!-- Medallón Central Plateado con el Perfil de Caupolicán -->
      <circle cx="60" cy="60" r="28" fill="#e2e8f0" stroke="#475569" stroke-width="2.5" />
      <circle cx="60" cy="60" r="25" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
      
      <!-- Perfil de Caupolicán con Pluma Mapuche -->
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
        <textPath href="#caupo-curve-bot" startOffset="50%" text-anchor="middle">ARAUCO • 1965</textPath>
      </text>
    </svg>
  `,

  // 7. CLUB DEPORTIVO CELULOSA (Fundado: 16 de agosto de 1972)
  // Escudo circular con franjas verticales verdes y blancas, aro verde exterior con texto completo
  'club-celulosa': (size = 36) => `
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
      <text x="60" y="104" font-family="'Inter', sans-serif" font-weight="800" font-size="4.8" fill="#facc15" text-anchor="middle" letter-spacing="0.2">ARAUCO • FUND. 16-AGOSTO-1972</text>
      
      <!-- Balón en el corazón -->
      <circle cx="60" cy="60" r="8" fill="#ffffff" stroke="#15803d" stroke-width="1.2" />
      <polygon points="60,56 63,58 62,62 58,62 57,58" fill="#15803d" />
    </svg>
  `,

  // 8. CLUB DEPORTIVO COLO-COLO DE ARAUCO (Fundado: 16 de febrero de 1948)
  // Escudo con borde ajedrezado/dentado, franjas verde/blanca/roja, cacique Colo-Colo arriba y cinta roja
  'club-colo-colo': (size = 36) => `
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
      <text x="60" y="99" font-family="'Inter', sans-serif" font-weight="800" font-size="6" fill="#facc15" text-anchor="middle">ARAUCO • 1948</text>
    </svg>
  `,

  // 9. CLUB DEPORTIVO GENTE DE MAR (Fundado: 10 de enero de 1960)
  // Escudo circular blanco con borde azul marino, gran ancla azul marina con soga entrelazada
  'club-gente-de-mar': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-gente-de-mar" xmlns="http://www.w3.org/2000/svg">
      <!-- Círculo Base Blanco con Borde Azul Marino Grueso -->
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
        <!-- Uñas del ancla -->
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
  'club-jorge-robledo': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-jorge-robledo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="robledo-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="60%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#0369a1" />
        </linearGradient>
      </defs>
      <!-- Escudo apuntado en degradé celeste/azul con borde blanco -->
      <path d="M 60 12 L 104 26 L 104 68 C 104 94 60 112 60 112 C 60 112 16 94 16 68 L 16 26 Z" fill="url(#robledo-blue)" stroke="#ffffff" stroke-width="4" />
      <path d="M 60 17 L 98 29 L 98 66 C 98 89 60 105 60 105 C 60 105 22 89 22 66 L 22 29 Z" fill="none" stroke="#bae6fd" stroke-width="1.2" />
      
      <!-- Iniciales J y R estilizadas -->
      <text x="32" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" opacity="0.85">J</text>
      <text x="88" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" opacity="0.85" text-anchor="end">R</text>
      
      <!-- Silueta del jugador en tijera / chilena acrobática al centro -->
      <g transform="translate(60, 52) scale(0.65)">
        <!-- Cabeza y cuerpo horizontal -->
        <circle cx="12" cy="10" r="5" fill="#ffffff" />
        <path d="M 8 10 L -4 2 L 6 -10 L 14 -4 Z" fill="#ffffff" />
        <!-- Pierna que remata arriba -->
        <path d="M -4 2 L -14 -16 L -8 -18 L 0 -4 Z" fill="#ffffff" />
        <!-- Pierna de apoyo -->
        <path d="M 4 -10 L 16 -18 L 22 -14 L 10 -4 Z" fill="#ffffff" />
        <!-- Balón en el aire -->
        <circle cx="-18" cy="-22" r="5.5" fill="#facc15" stroke="#ffffff" stroke-width="1" />
      </g>
      
      <!-- Cinta Inferior: JORGE ROBLEDO 1954 -->
      <rect x="22" y="82" width="76" height="13" rx="2" fill="#ffffff" />
      <text x="60" y="91" font-family="'Inter', sans-serif" font-weight="900" font-size="6.2" fill="#0369a1" text-anchor="middle" letter-spacing="0.3">JORGE ROBLEDO</text>
      <text x="60" y="103" font-family="'Inter', sans-serif" font-weight="800" font-size="6.5" fill="#facc15" text-anchor="middle">ARAUCO • 1954</text>
    </svg>
  `,

  // 11. CLUB DEPORTIVO REAL JOSÉ MARÍA (Fundado: 30 de enero de 2026)
  // Escudo tipo realeza español azulgrana con gran corona real dorada y balón al centro
  'club-real-jose-maria': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" class="club-official-badge badge-real-jose-maria" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rjm-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
      </defs>
      
      <!-- Corona Real Imperial en la cúspide -->
      <g transform="translate(60, 24) scale(0.65)">
        <path d="M -30 6 L 30 6 L 24 -14 L 12 -4 L 0 -18 L -12 -4 L -24 -14 Z" fill="url(#rjm-gold)" stroke="#713f12" stroke-width="2" />
        <circle cx="0" cy="-20" r="3.5" fill="#dc2626" />
        <circle cx="-24" cy="-15" r="2.5" fill="#2563eb" />
        <circle cx="24" cy="-15" r="2.5" fill="#2563eb" />
        <!-- Joyas en la base de la corona -->
        <rect x="-28" y="2" width="56" height="5" fill="#b91c1c" stroke="#713f12" stroke-width="1" />
      </g>
      
      <!-- Escudo Español Cuartelado Azul y Rojo -->
      <path d="M 60 28 C 88 28 102 38 102 68 C 102 96 60 114 60 114 C 60 114 18 96 18 68 C 18 38 32 28 60 28 Z" fill="#1e3a8a" stroke="url(#rjm-gold)" stroke-width="4.5" />
      
      <!-- Franjas Rojas en el interior -->
      <path d="M 40 30 L 52 30 L 52 108 C 46 104 40 98 40 94 Z" fill="#dc2626" />
      <path d="M 68 30 L 80 30 L 80 94 C 80 98 74 104 68 108 Z" fill="#dc2626" />
      
      <!-- Balón de Fútbol Dorado en el centro -->
      <circle cx="60" cy="64" r="11" fill="#ffffff" stroke="url(#rjm-gold)" stroke-width="2" />
      <polygon points="60,58 65,61 63,67 57,67 55,61" fill="#1e3a8a" />
      
      <!-- Cinta / Letras: REAL JOSÉ MARÍA F.C. -->
      <rect x="22" y="84" width="76" height="12" rx="3" fill="#0f172a" stroke="url(#rjm-gold)" stroke-width="1" />
      <text x="60" y="92.5" font-family="'Inter', sans-serif" font-weight="900" font-size="5.5" fill="#fde047" text-anchor="middle" letter-spacing="0.3">REAL JOSÉ MARÍA</text>
      <text x="60" y="102" font-family="'Inter', sans-serif" font-weight="800" font-size="6" fill="#ffffff" text-anchor="middle">• 2026 •</text>
    </svg>
  `,

  'club-celulosa-arauco': (size = 36) => CLUB_BADGES_SVG['club-celulosa'](size),
  'club-colo-colo-arauco': (size = 36) => CLUB_BADGES_SVG['club-colo-colo'](size),
  'asociacion-futbol-arauco': (size = 36) => CLUB_BADGES_SVG['asociacion-arauco'](size),

  // ==========================================
  // ESCUDOS DE OTRAS ASOCIACIONES (MULTI-LIGA)
  // ==========================================
  'asociacion-lebu': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#1e3a8a" stroke-width="5" />
      <circle cx="60" cy="60" r="46" fill="#1e3a8a" />
      <path d="M 60 26 L 60 76 M 42 42 L 78 42 M 36 64 C 42 82 78 82 84 64" stroke="#f59e0b" stroke-width="5" fill="none" stroke-linecap="round" />
      <circle cx="60" cy="68" r="8" fill="#ffffff" />
      <text x="60" y="100" font-family="'Outfit', sans-serif" font-weight="900" font-size="10" fill="#ffffff" text-anchor="middle" letter-spacing="1">ASOC. LEBU</text>
    </svg>
  `,

  'asociacion-canete': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#15803d" stroke="#f59e0b" stroke-width="4.5" />
      <polygon points="60,28 72,48 94,48 76,62 82,84 60,70 38,84 44,62 26,48 48,48" fill="#f59e0b" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">CAÑETE</text>
    </svg>
  `,

  'asociacion-cordillera': (size = 36) => `
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
  'club-lebu-pesquero': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="#1e3a8a" stroke="#ffffff" stroke-width="4" />
      <path d="M 60 25 L 60 85 M 40 45 L 80 45 M 35 70 Q 60 95 85 70" stroke="#f59e0b" stroke-width="6" fill="none" stroke-linecap="round" />
      <text x="60" y="105" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">PESQUERO</text>
    </svg>
  `,

  'club-lebu-carbon': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,15 105,40 105,90 60,115 15,90 15,40" fill="#0f172a" stroke="#f59e0b" stroke-width="4.5" />
      <line x1="38" y1="42" x2="82" y2="86" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" />
      <line x1="82" y1="42" x2="38" y2="86" stroke="#f59e0b" stroke-width="5" stroke-linecap="round" />
      <text x="60" y="104" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">CARBÓN</text>
    </svg>
  `,

  'club-canete-tucapel': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#15803d" stroke="#ffffff" stroke-width="4.5" />
      <circle cx="60" cy="54" r="22" fill="#ffffff" />
      <path d="M 60 38 L 60 70 M 46 54 L 74 54" stroke="#15803d" stroke-width="4" stroke-linecap="round" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">TUCAPEL</text>
    </svg>
  `,

  'club-cord-andes': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 15 L 105 35 L 95 95 L 60 115 L 25 95 L 15 35 Z" fill="#0284c7" stroke="#ffffff" stroke-width="4" />
      <polygon points="60,35 78,72 42,72" fill="#ffffff" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">LOS ANDES</text>
    </svg>
  `,

  'club-lebu-penarol': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#0f172a" stroke="#eab308" stroke-width="4.5" />
      <rect x="36" y="24" width="12" height="60" fill="#eab308" />
      <rect x="54" y="24" width="12" height="64" fill="#eab308" />
      <rect x="72" y="24" width="12" height="60" fill="#eab308" />
      <circle cx="60" cy="94" r="5" fill="#ffffff" />
      <text x="60" y="106" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">PEÑAROL</text>
    </svg>
  `,

  'club-lebu-victoria': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#ffffff" stroke="#dc2626" stroke-width="4.5" />
      <path d="M 32 30 L 60 85 L 88 30 L 76 30 L 60 65 L 44 30 Z" fill="#dc2626" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#0f172a" text-anchor="middle">VICTORIA</text>
    </svg>
  `,

  'club-canete-alianza': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#1d4ed8" stroke="#ffffff" stroke-width="4.5" />
      <line x1="28" y1="36" x2="92" y2="36" stroke="#ffffff" stroke-width="3" />
      <text x="60" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">ALIANZA</text>
      <polygon points="60,68 64,78 74,78 66,84 69,94 60,88 51,94 54,84 46,78 56,78" fill="#fde047" />
    </svg>
  `,

  'club-canete-caupolican': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="4.5" />
      <circle cx="60" cy="52" r="18" fill="#ffffff" />
      <line x1="42" y1="74" x2="78" y2="32" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">CAUPOLICÁN</text>
    </svg>
  `,

  'club-cord-central': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,14 106,36 94,96 60,114 26,96 14,36" fill="#1e3a8a" stroke="#38bdf8" stroke-width="4" />
      <polygon points="34,80 50,44 66,74 76,52 92,80" fill="#38bdf8" />
      <text x="60" y="100" font-family="'Outfit', sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle">CENTRAL</text>
    </svg>
  `,

  'club-cord-oriente': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="#881337" stroke="#eab308" stroke-width="4" />
      <polygon points="60,32 70,52 92,52 74,66 80,88 60,74 40,88 46,66 28,52 50,52" fill="#eab308" />
      <text x="60" y="102" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">ORIENTE</text>
    </svg>
  `,

  // 10 CLUBES OFICIALES DE LA LIGA DEMO
  'demo-ohiggins': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#16a34a" stroke="#ffffff" stroke-width="4" />
      <polygon points="60,32 68,48 86,48 72,59 77,76 60,65 43,76 48,59 34,48 52,48" fill="#ffffff" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">O'HIGGINS</text>
    </svg>
  `,

  'demo-colocolo': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#ffffff" stroke="#111827" stroke-width="5" />
      <rect x="25" y="44" width="70" height="24" fill="#111827" />
      <text x="60" y="60" font-family="'Outfit', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">COLO COLO</text>
      <circle cx="60" cy="84" r="9" fill="#ef4444" />
    </svg>
  `,

  'demo-playabrava': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="4" />
      <path d="M 28 64 Q 44 48 60 64 T 92 64" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" />
      <circle cx="60" cy="40" r="10" fill="#facc15" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">PLAYA BRAVA</text>
    </svg>
  `,

  'demo-arauco': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#dc2626" stroke="#16a34a" stroke-width="4.5" />
      <circle cx="60" cy="54" r="22" fill="#ffffff" />
      <text x="60" y="62" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#dc2626" text-anchor="middle">CDA</text>
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">ARAUCO</text>
    </svg>
  `,

  'demo-ferroviario': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#1e293b" stroke="#eab308" stroke-width="4.5" />
      <circle cx="60" cy="52" r="20" fill="none" stroke="#eab308" stroke-width="4" />
      <polygon points="60,38 64,52 60,66 56,52" fill="#eab308" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">FERROVIARIO</text>
    </svg>
  `,

  'demo-estrelladelsur': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#2563eb" stroke="#ffffff" stroke-width="4.5" />
      <polygon points="60,26 67,46 88,46 71,59 78,79 60,66 42,79 49,59 32,46 53,46" fill="#facc15" stroke="#ffffff" stroke-width="1" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">ESTRELLA DEL SUR</text>
    </svg>
  `,

  'demo-copihues': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#e11d48" stroke="#ffffff" stroke-width="4.5" />
      <path d="M 52 34 Q 60 26 68 34 Q 72 50 60 68 Q 48 50 52 34 Z" fill="#ffffff" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">LOS COPIHUES</text>
    </svg>
  `,

  'demo-realcordillera': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#7c3aed" stroke="#f59e0b" stroke-width="4.5" />
      <polygon points="34,70 52,38 70,64 80,48 94,70" fill="#f59e0b" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7" fill="#ffffff" text-anchor="middle">REAL CORDILLERA</text>
    </svg>
  `,

  'demo-sanlorenzo': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#991b1b" stroke="#1e3a8a" stroke-width="5" />
      <line x1="36" y1="42" x2="84" y2="76" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
      <line x1="84" y1="42" x2="36" y2="76" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">SAN LORENZO</text>
    </svg>
  `,

  'demo-unionjuvenil': (size = 36) => `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 12 C 94 12 106 24 106 58 C 106 90 60 112 60 112 C 60 112 14 90 14 58 C 14 24 26 12 60 12 Z" fill="#ea580c" stroke="#ffffff" stroke-width="4.5" />
      <circle cx="60" cy="50" r="18" fill="#ffffff" />
      <text x="60" y="58" font-family="'Outfit', sans-serif" font-weight="900" font-size="14" fill="#ea580c" text-anchor="middle">UJ</text>
      <text x="60" y="98" font-family="'Outfit', sans-serif" font-weight="900" font-size="7.5" fill="#ffffff" text-anchor="middle">UNIÓN JUVENIL</text>
    </svg>
  `
};

/**
 * Retorna el SVG del escudo oficial según ID de club
 */
export function getClubBadgeSvg(clubId, size = 36) {
  if (!clubId) {
    return CLUB_BADGES_SVG['asociacion-arauco'](size);
  }
  if (CLUB_BADGES_SVG[clubId]) {
    return CLUB_BADGES_SVG[clubId](size);
  }
  if (clubId === 'seleccion-arauco' || clubId === 'asociacion-arauco') {
    return CLUB_BADGES_SVG['asociacion-arauco'](size);
  }

  // Generador dinámico para cualquier club de cualquier liga
  const hash = String(clubId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ['#dc2626', '#1d4ed8', '#16a34a', '#d97706', '#7c3aed', '#0284c7', '#0f172a'];
  const bg = colors[hash % colors.length];
  const initial = clubId.replace('club-', '').charAt(0).toUpperCase();

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 14 C 92 14 104 26 104 62 C 104 92 60 112 60 112 C 60 112 16 92 16 62 C 16 26 28 14 60 14 Z" fill="${bg}" stroke="#ffffff" stroke-width="4.5" />
      <circle cx="60" cy="58" r="22" fill="#ffffff" />
      <text x="60" y="67" font-family="'Outfit', sans-serif" font-weight="900" font-size="24" fill="${bg}" text-anchor="middle">${initial}</text>
    </svg>
  `;
}

/**
 * Retorna el escudo oficial de la Asociación / Selección Comunal
 */
export function getSelectionBadgeSvg(size = 48) {
  return CLUB_BADGES_SVG['asociacion-arauco'](size);
}

