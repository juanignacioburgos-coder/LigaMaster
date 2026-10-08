/**
 * LIGAMASTER - GENERADOR DE PLACAS GRÁFICAS PARA REDES SOCIALES
 * Motor de Renderizado HTML5 Canvas Ultra-HD (1080x1080 / 1080x1920)
 * 
 * Plantillas Broadcast-Grade para Instagram, WhatsApp, Facebook y Prensa:
 *  1. Resultados Oficiales de la Fecha (Matchday Scores)
 *  2. Tabla de Posiciones por Serie (Standings)
 *  3. Próximo Partido Destacado (Showdown Matchday Feature)
 *  4. Tabla de Goleadores Oficiales (Top Scorers)
 */

import { getDb, getActiveLeagueId, getLeagueById } from './data.js';
import { getClubBadgeSvg } from './badges.js';
import { showToast } from './toast.js';
import { resolveBrandLogo } from './sponsors-data.js';
import { OFFICIAL_BACKGROUNDS, getBackgroundById } from './backgrounds-data.js';

// Cache de imágenes SVG de escudos para evitar recreación innecesaria
const badgeImageCache = new Map();
// Cache de fotos de fondo (Data URLs) para acelerar dibujo instantáneo en Canvas
const bgImageCache = new Map();

/**
 * Carga una imagen desde Data URL con soporte de memoria cache
 */
export function loadDataUrlImage(dataUrl) {
  if (!dataUrl) return Promise.resolve(null);
  if (bgImageCache.has(dataUrl)) {
    return Promise.resolve(bgImageCache.get(dataUrl));
  }
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') return resolve(null);
    const img = new Image();
    img.onload = () => {
      bgImageCache.set(dataUrl, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

/**
 * Convierte un SVG string a Image object para dibujar en Canvas
 */
export function loadSvgBadgeImage(badgeSvg) {
  if (badgeImageCache.has(badgeSvg)) {
    return Promise.resolve(badgeImageCache.get(badgeSvg));
  }

  return new Promise((resolve) => {
    // Si no estamos en entorno con Image (ej: Node sin dom), resolver null
    if (typeof Image === 'undefined') {
      return resolve(null);
    }
    const img = new Image();
    const cleanSvg = badgeSvg.trim();
    const encoded = encodeURIComponent(cleanSvg);
    img.src = `data:image/svg+xml;charset=utf-8,${encoded}`;
    img.onload = () => {
      badgeImageCache.set(badgeSvg, img);
      resolve(img);
    };
    img.onerror = () => {
      resolve(null);
    };
  });
}

/**
 * Paletas de Color para Placas Broadcast
 */
export const CARD_THEMES = {
  'dark-coral': {
    id: 'dark-coral',
    name: 'LigaMaster Clásico',
    bgStart: '#090d16',
    bgMid: '#0f172a',
    bgEnd: '#060911',
    accent: '#e51b24',
    accentLight: '#ff4d56',
    glow: 'rgba(229, 27, 36, 0.25)',
    cardBg: 'rgba(25, 34, 53, 0.72)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    gold: '#f59e0b'
  },
  'dark-gold': {
    id: 'dark-gold',
    name: 'Oro Champions',
    bgStart: '#0f0e0b',
    bgMid: '#1a1811',
    bgEnd: '#0a0907',
    accent: '#f59e0b',
    accentLight: '#fde047',
    glow: 'rgba(245, 158, 11, 0.28)',
    cardBg: 'rgba(38, 33, 21, 0.75)',
    cardBorder: 'rgba(245, 158, 11, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: '#fef08a',
    textMuted: '#a1a1aa',
    gold: '#f59e0b'
  },
  'dark-emerald': {
    id: 'dark-emerald',
    name: 'Cancha Esmeralda',
    bgStart: '#05130e',
    bgMid: '#0a231b',
    bgEnd: '#030d09',
    accent: '#10b981',
    accentLight: '#34d399',
    glow: 'rgba(16, 185, 129, 0.25)',
    cardBg: 'rgba(12, 38, 30, 0.75)',
    cardBorder: 'rgba(16, 185, 129, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: '#a7f3d0',
    textMuted: '#94a3b8',
    gold: '#f59e0b'
  },
  'dark-blue': {
    id: 'dark-blue',
    name: 'Azul Continental',
    bgStart: '#070f23',
    bgMid: '#0f1c3d',
    bgEnd: '#040916',
    accent: '#0284c7',
    accentLight: '#38bdf8',
    glow: 'rgba(2, 132, 199, 0.25)',
    cardBg: 'rgba(18, 33, 66, 0.75)',
    cardBorder: 'rgba(2, 132, 199, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: '#bae6fd',
    textMuted: '#94a3b8',
    gold: '#f59e0b'
  }
};

/**
 * Estado del Generador de Placas
 */
let studioOptions = {
  template: 'resultados', // 'resultados' | 'tabla' | 'partido' | 'goleadores' | 'programacion'
  format: 'square',       // 'square' (1080x1080) | 'story' (1080x1920)
  seriesId: 'primera_adulta',
  round: 3,
  matchId: null,
  theme: 'dark-coral',
  selectedSponsorIds: null, // null (todos) o array de IDs seleccionados
  bgPhoto: 'noche',         // 'noche' | 'dia-panoramica' | 'dia-cielo' | 'fachada' | 'inauguracion' | 'escudo-afa' | 'clasico' | 'custom'
  bgPhotoMode: 'theme',     // 'theme' (Paleta de la Placa) | 'original' (Color Original / Natural)
  customBgDataUrl: null     // Si el usuario subió una imagen local
};

/**
 * Dibuja un rectángulo con esquinas redondeadas
 */
function roundRect(ctx, x, y, width, height, radius) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    radius = Object.assign({ tl: 0, tr: 0, br: 0, bl: 0 }, radius);
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
}

/**
 * Dibuja el fondo broadcast con degradados, fotografías de estadios, tratamiento de color y textura
 */
async function drawBroadcastBackground(ctx, w, h, theme, db, options = {}) {
  const mergedOpts = { ...studioOptions, ...options };
  const bgPhotoId = mergedOpts.bgPhoto || 'noche';
  const colorMode = mergedOpts.bgPhotoMode || 'theme'; // 'theme' | 'original'

  // Resolver foto
  let bgItem = null;
  if (bgPhotoId === 'custom' && mergedOpts.customBgDataUrl) {
    bgItem = { id: 'custom', name: 'Foto Personalizada', category: 'stadium', dataUrl: mergedOpts.customBgDataUrl };
  } else if (bgPhotoId !== 'clasico') {
    bgItem = getBackgroundById(bgPhotoId);
  }

  // Fallback si no hay foto seleccionada pero la liga tiene stadiumBase64
  let photoDataUrl = bgItem?.dataUrl || (bgPhotoId !== 'clasico' ? db?.leagueInfo?.stadiumBase64 : null);
  let isCrestOnly = bgItem?.category === 'crest';

  let bgDrawn = false;

  if (photoDataUrl && typeof Image !== 'undefined') {
    try {
      const img = await loadDataUrlImage(photoDataUrl);
      if (img && img.width > 0) {
        if (isCrestOnly) {
          // Si el fondo seleccionado es el Escudo Oficial AFA
          // 1. Base sólida broadcast degradada
          const baseGrad = ctx.createLinearGradient(0, 0, w * 0.4, h);
          baseGrad.addColorStop(0, theme.bgStart);
          baseGrad.addColorStop(0.5, theme.bgMid);
          baseGrad.addColorStop(1, theme.bgEnd);
          ctx.fillStyle = baseGrad;
          ctx.fillRect(0, 0, w, h);

          // 2. Escudo centrado en el fondo
          const crestW = Math.min(w * 0.70, 720);
          const scale = crestW / img.width;
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const drawX = (w - drawW) / 2;
          const drawY = (h - drawH) / 2 + 15;

          ctx.save();
          if (colorMode === 'original') {
            // MODO B: Color Original vivo del Escudo Oficial AFA
            ctx.globalAlpha = 0.35;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } else {
            // MODO A: Paleta de la Placa (Teñido monocromático con el tema)
            ctx.globalAlpha = 0.22;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = theme.accent;
            ctx.globalAlpha = 0.50;
            ctx.fillRect(drawX, drawY, drawW, drawH);
          }
          ctx.restore();
          bgDrawn = true;
        } else {
          // Fondo de Estadio (Foto real de canchas, tribunas, público o fachada)
          const scale = Math.max(w / img.width, h / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const drawX = (w - drawW) / 2;
          const drawY = (h - drawH) / 2;

          ctx.save();
          if (colorMode === 'original') {
            // MODO B: COLOR ORIGINAL / NATURAL (Cielo azul, césped verde, tribunas auténticas)
            // 1. Dibujar fotografía nítida
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            // 2. Scrim cinematográfico multicapa para garantizar contraste perfecto y legibilidad total
            ctx.fillStyle = 'rgba(5, 10, 20, 0.52)';
            ctx.fillRect(0, 0, w, h);

            // Gradiente superior para cabecera oficial
            const topGrad = ctx.createLinearGradient(0, 0, 0, 320);
            topGrad.addColorStop(0, 'rgba(5, 9, 17, 0.88)');
            topGrad.addColorStop(1, 'rgba(5, 9, 17, 0.0)');
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, w, 320);

            // Scrim central detrás de las tarjetas y tabla
            const midGrad = ctx.createRadialGradient(w / 2, h * 0.50, 80, w / 2, h * 0.50, w * 0.65);
            midGrad.addColorStop(0, 'rgba(7, 12, 24, 0.68)');
            midGrad.addColorStop(1, 'rgba(5, 9, 17, 0.38)');
            ctx.fillStyle = midGrad;
            ctx.fillRect(0, 160, w, h - 320);

            // Gradiente inferior para auspiciadores
            const botGrad = ctx.createLinearGradient(0, h - 230, 0, h);
            botGrad.addColorStop(0, 'rgba(5, 9, 17, 0.0)');
            botGrad.addColorStop(1, 'rgba(5, 9, 17, 0.94)');
            ctx.fillStyle = botGrad;
            ctx.fillRect(0, h - 230, w, 230);
          } else {
            // MODO A: PALETA DE LA PLACA (TEÑIDO BROADCAST SEGÚN EL TEMA ELEGIDO)
            // 1. Foto base con opacidad controlada
            ctx.globalAlpha = 0.44;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

            // 2. Capa base de tinte para asimilar el estadio a la paleta del tema
            ctx.globalAlpha = 0.78;
            ctx.fillStyle = theme.bgStart;
            ctx.fillRect(0, 0, w, h);

            // 3. Gradiente direccional con el tono medio y final del tema
            ctx.globalAlpha = 0.55;
            const themeGrad = ctx.createLinearGradient(0, 0, w * 0.5, h);
            themeGrad.addColorStop(0, theme.bgStart);
            themeGrad.addColorStop(0.5, theme.bgMid);
            themeGrad.addColorStop(1, theme.bgEnd);
            ctx.fillStyle = themeGrad;
            ctx.fillRect(0, 0, w, h);
          }
          ctx.restore();
          bgDrawn = true;
        }
      }
    } catch (e) {
      bgDrawn = false;
    }
  }

  // Si no se dibujó foto (ej: Fondo Clásico o error de carga)
  if (!bgDrawn) {
    const bgGrad = ctx.createLinearGradient(0, 0, w * 0.4, h);
    bgGrad.addColorStop(0, theme.bgStart);
    bgGrad.addColorStop(0.5, theme.bgMid);
    bgGrad.addColorStop(1, theme.bgEnd);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  }

  // 2. Halo radial superior
  const radialGrad = ctx.createRadialGradient(w / 2, 80, 20, w / 2, 80, w * 0.7);
  radialGrad.addColorStop(0, theme.glow);
  radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = radialGrad;
  ctx.fillRect(0, 0, w, h * 0.6);

  // 3. Luces angulares de estadio / TV broadcast (speed stripes)
  ctx.save();
  ctx.globalAlpha = colorMode === 'original' ? 0.02 : 0.035;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 14;
  for (let i = -w; i < w * 2; i += 70) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + w * 0.7, h);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Marco exterior sutil
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  // Esquinas deportivas acentuadas
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 4;
  const cornerSize = 36;
  // Superior Izq
  ctx.beginPath();
  ctx.moveTo(20, 20 + cornerSize);
  ctx.lineTo(20, 20);
  ctx.lineTo(20 + cornerSize, 20);
  ctx.stroke();
  // Superior Der
  ctx.beginPath();
  ctx.moveTo(w - 20 - cornerSize, 20);
  ctx.lineTo(w - 20, 20);
  ctx.lineTo(w - 20, 20 + cornerSize);
  ctx.stroke();
  // Inferior Izq
  ctx.beginPath();
  ctx.moveTo(20, h - 20 - cornerSize);
  ctx.lineTo(20, h - 20);
  ctx.lineTo(20 + cornerSize, h - 20);
  ctx.stroke();
  // Inferior Der
  ctx.beginPath();
  ctx.moveTo(w - 20 - cornerSize, h - 20);
  ctx.lineTo(w - 20, h - 20);
  ctx.lineTo(w - 20, h - 20 - cornerSize);
  ctx.stroke();
  ctx.restore();
}

/**
 * Dibuja un escudo de club en canvas (con fallback vectorial si no hay imagen)
 */
async function drawClubBadge(ctx, clubId, club, x, y, size) {
  ctx.save();
  let drawn = false;

  if (typeof Image !== 'undefined') {
    const svgStr = getClubBadgeSvg(clubId, size * 2);
    try {
      const img = await loadSvgBadgeImage(svgStr);
      if (img && img.width > 0) {
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        drawn = true;
      }
    } catch {
      drawn = false;
    }
  }

  // Fallback si la imagen no se carga o en test environment
  if (!drawn) {
    const radius = size * 0.44;
    // Escudo base
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#e51b24';
    ctx.stroke();

    // Círculo interior
    ctx.beginPath();
    ctx.arc(x, y, radius - 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();

    // Inicial del club
    const initial = (club?.shortName || club?.name || 'C').charAt(0).toUpperCase();
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${Math.round(size * 0.4)}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, x, y);
  }

  ctx.restore();
}

/**
 * Dibuja el Header oficial de la placa
 */
async function drawCardHeader(ctx, w, league, seriesName, categoryTitle, subtitle, theme) {
  ctx.save();

  // 1. Barra superior de Plataforma
  // Badge de LigaMaster
  const pillW = 260;
  const pillH = 34;
  const pillX = (w - pillW) / 2;
  const pillY = 46;

  roundRect(ctx, pillX, pillY, pillW, pillH, 17);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fill();
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = "900 13px 'Outfit', -apple-system, sans-serif";
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LIGA', pillX + pillW / 2 - 28, pillY + pillH / 2);
  ctx.fillStyle = theme.accent;
  ctx.fillText('MASTER', pillX + pillW / 2 + 14, pillY + pillH / 2);

  // Escudo Liga
  if (league.logoBase64 && typeof Image !== 'undefined') {
    try {
      const crestImg = await new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = league.logoBase64;
      });
      if (crestImg.width > 0) {
        ctx.drawImage(crestImg, pillX + pillW + 15, pillY - 4, 42, 42);
      }
    } catch {}
  }

  // 2. Asociación Oficial
  ctx.font = "800 20px 'Outfit', -apple-system, sans-serif";
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const assocName = (league.name || 'Asociación de Fútbol de Arauco').toUpperCase();
  ctx.fillText(assocName, w / 2, 95);

  // 3. Título Principal de la Placa (Ej: RESULTADOS DE LA FECHA)
  ctx.font = "900 38px 'Outfit', -apple-system, sans-serif";
  ctx.fillStyle = theme.accentLight;
  ctx.fillText(categoryTitle.toUpperCase(), w / 2, 126);

  // 4. Subtítulo / Serie / Temporada
  ctx.font = "700 16px 'Inter', -apple-system, sans-serif";
  ctx.fillStyle = theme.textMuted;
  const fullSub = `${seriesName.toUpperCase()} • ${subtitle.toUpperCase()}`;
  ctx.fillText(fullSub, w / 2, 172);

  // Línea separadora decorativa con rombo central
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(w * 0.15, 204);
  ctx.lineTo(w * 0.45, 204);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(w * 0.55, 204);
  ctx.lineTo(w * 0.85, 204);
  ctx.stroke();

  // Rombo central
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.moveTo(w / 2, 204 - 5);
  ctx.lineTo(w / 2 + 5, 204);
  ctx.lineTo(w / 2, 204 + 5);
  ctx.lineTo(w / 2 - 5, 204);
  ctx.fill();

  ctx.restore();
}

/**
 * Dibuja el Footer con Patrocinadores Oficiales y Marca
 */
async function drawCardFooter(ctx, w, h, theme, db, contentEndY = null, options = null) {
  ctx.save();

  const isStory = h > w;
  const minFooterH = isStory ? 220 : 140;
  const idealFooterH = isStory ? 260 : 165;

  let footerY = h - idealFooterH;
  if (contentEndY) {
    // Si el contenido termina más abajo que el ideal, empujamos el footer hacia abajo,
    // pero asegurando que conserve al menos minFooterH para no aplastarse ni cortarse
    footerY = Math.max(footerY, contentEndY + 15);
    footerY = Math.min(footerY, h - minFooterH);
  }

  const bottomPadding = isStory ? 45 : 25; // Espacio inferior para marca de agua
  
  // Línea separadora
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, footerY);
  ctx.lineTo(w - 40, footerY);
  ctx.stroke();

  // Tira de Auspiciadores Oficiales
  const titleY = footerY + (isStory ? 18 : 10);
  ctx.font = `800 ${isStory ? 18 : 13}px 'Inter', sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('PATROCINADORES OFICIALES', w / 2, titleY);

  // Logos o Nombres de Patrocinadores (Filtrados si el usuario seleccionó sponsors específicos)
  let sponsors = db?.sponsors || [];
  if (options?.selectedSponsorIds && Array.isArray(options.selectedSponsorIds)) {
    sponsors = sponsors.filter(sp => options.selectedSponsorIds.includes(sp.id));
  }
  
  if (sponsors.length === 0) {
    const noticeY = titleY + (isStory ? 28 : 18);
    ctx.font = `600 ${isStory ? 14 : 11}px 'Inter', sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Espacio Publicitario Reservado • Asociación Oficial', w / 2, noticeY);
  } else {
    const logoBoxY = titleY + (isStory ? 28 : 18);
    let maxBlockH = (h - bottomPadding) - logoBoxY - 18; // Espacio vertical total disponible
    maxBlockH = Math.max(35, maxBlockH);

    // Altura base del bloque: darles tamaño destacado y visible
    let blockH = Math.min(maxBlockH, isStory ? 160 : 95);

    // Precargar todas las imágenes garantizando que CADA marca tenga su logo vectorial oficial
    const loadedImages = await Promise.all(sponsors.map(async (sp) => {
      const src = sp.logoBase64 || resolveBrandLogo(sp.name);
      if (!src || typeof Image === 'undefined') return null;
      try {
        return await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });
      } catch (e) {
        return null;
      }
    }));

    // Función que calcula el layout con texto debajo del logo
    const computeLayout = (bH) => {
      let tW = 0;
      const gapLogoText = 6; // Espacio vertical entre el logo y el nombre de la marca
      const fSz = Math.max(11, Math.min(14, Math.floor(bH * 0.17))); // Tamaño de fuente del nombre
      const gapSpons = Math.max(22, Math.min(50, Math.floor(bH * 0.45))); // Separación horizontal entre marcas
      
      const imgH = Math.max(24, bH - gapLogoText - fSz); // El alto del logo es lo que sobra del bloque
      ctx.font = `900 ${fSz}px 'Outfit', sans-serif`;
      
      const blocks = [];
      for (let i = 0; i < sponsors.length; i++) {
        const sp = sponsors[i];
        const img = loadedImages[i];
        
        let imgW = 0;
        if (img && img.height > 0) {
          imgW = imgH * (img.width / img.height);
        } else {
          imgW = imgH * 2.2;
        }
        
        let textW = 0;
        if (sp.name && sp.name.trim()) {
          textW = typeof ctx.measureText === 'function' ? ctx.measureText(sp.name.trim()).width : (sp.name.trim().length * 7);
        }
        
        const blockW = Math.max(imgW, textW, 40);
        tW += blockW;
        blocks.push({ imgW, textW, blockW });
      }
      tW += (sponsors.length - 1) * gapSpons;
      
      return { tW, imgH, fSz, gapLogoText, gapSpons, blocks };
    };

    const maxW = w - 80;
    let layout = computeLayout(blockH);

    // Si nos pasamos del ancho disponible, escalamos proporcionalmente
    if (layout.tW > maxW) {
      const scale = maxW / layout.tW;
      blockH = Math.max(30, blockH * scale);
      layout = computeLayout(blockH);
    }

    // Centramos verticalmente todo el bloque de sponsors
    const actualBlockY = logoBoxY + Math.max(0, (maxBlockH - blockH) / 2);
    let startX = (w - layout.tW) / 2;

    for (let i = 0; i < sponsors.length; i++) {
      const sp = sponsors[i];
      const img = loadedImages[i];
      const blk = layout.blocks[i];
      
      const centerX = startX + blk.blockW / 2;
      
      // Dibujar logo centrado en su bloque
      if (img && blk.imgW > 0) {
        const imgX = centerX - blk.imgW / 2;
        ctx.drawImage(img, imgX, actualBlockY, blk.imgW, layout.imgH);
      }
      
      // Dibujar texto de la marca centrado DEBAJO del logo
      if (sp.name && sp.name.trim()) {
        ctx.font = `900 ${layout.fSz}px 'Outfit', sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const textY = actualBlockY + layout.imgH + layout.gapLogoText;
        ctx.fillText(sp.name.trim(), centerX, textY);
      }
      
      startX += blk.blockW + layout.gapSpons;
    }
  }

  // Marca y Sitio
  ctx.font = `700 ${isStory ? 16 : 12}px 'Inter', sans-serif`;
  ctx.fillStyle = theme.accentLight;
  ctx.textAlign = 'center';
  ctx.fillText('Generado con LigaMaster • ligamaster.cl • Plataforma Oficial del Fútbol Amateur', w / 2, h - (isStory ? 35 : 20));

  ctx.restore();
}

/**
 * Resuelve el nombre formal de la serie
 */
function resolveSeriesName(db, seriesId) {
  const list = db.seriesList || [];
  const found = list.find(s => s.id === seriesId);
  if (found) {
    if (found.id === 'primera_adulta') return 'Serie de Honor (Primera Adulta)';
    return found.name || found.shortName;
  }
  if (seriesId === 'senior' || seriesId === 'senior_35') return 'Serie Senior (35+ Años)';
  if (seriesId === 'super_senior') return 'Serie Súper Senior (45+ Años)';
  if (seriesId === 'juvenil') return 'Serie Juvenil (Sub-18)';
  return 'Serie de Honor';
}

/**
 * ============================================================================
 * PLANTILLA 1: RESULTADOS DE LA FECHA (Matchday Scores)
 * ============================================================================
 */
async function renderResultadosTemplate(ctx, w, h, db, options, theme) {
  const roundNum = Number(options.round) || 3;
  const seriesId = options.seriesId || 'primera_adulta';
  const seriesName = resolveSeriesName(db, seriesId);
  const league = db.leagueInfo || { name: 'Asociación de Fútbol de Arauco' };

  await drawCardHeader(
    ctx,
    w,
    league,
    seriesName,
    `Resultados Fecha ${roundNum}`,
    `Temporada Oficial 2026/27`,
    theme
  );

  // Obtener los partidos de la fecha
  let matches = (db.matches || []).filter(m => {
    const isRound = String(m.round).includes(String(roundNum));
    const isSeries = (!m.series && seriesId === 'primera_adulta') || (m.series === seriesId);
    return isRound && isSeries;
  });

  // Si no hay partidos de la serie específica, tomar los que haya en la fecha
  if (matches.length === 0) {
    matches = (db.matches || []).filter(m => String(m.round).includes(String(roundNum)));
  }

  // Máximo 5 partidos en la tarjeta
  matches = matches.slice(0, 5);

  const startY = 225;
  const isStory = options.format === 'story';
  const rowCount = Math.max(matches.length, 1);
  const rowGap = isStory ? 20 : 12;
  const maxContentH = isStory ? (1920 - 280 - startY) : (1080 - 175 - startY);
  const rowH = Math.min(isStory ? 175 : 116, Math.floor((maxContentH - (rowCount - 1) * rowGap) / rowCount));

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const y = startY + i * (rowH + rowGap);
    const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: 'Local', shortName: 'Local' };
    const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: 'Visita', shortName: 'Visita' };

    // Tarjeta del Partido
    ctx.save();
    roundRect(ctx, 45, y, w - 90, rowH, 14);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Acento lateral izquierdo
    ctx.fillStyle = theme.accent;
    ctx.fillRect(45, y + 10, 4, rowH - 20);

    // 1. Equipo Local (Izquierda)
    const crestSize = isStory ? 80 : 60;
    await drawClubBadge(ctx, m.homeClubId, homeClub, 115, y + rowH / 2 - (isStory ? 10 : 0), crestSize);

    ctx.font = `800 ${isStory ? 24 : 18}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const homeDisplayName = homeClub.name.replace('Club Deportivo ', '');
    ctx.fillText(homeDisplayName, 175, y + rowH / 2 - (isStory ? 10 : 0));

    // 2. Marcador Central
    const scoreBoxW = isStory ? 170 : 140;
    const scoreBoxH = isStory ? 64 : 50;
    const scoreBoxX = (w - scoreBoxW) / 2;
    const scoreBoxY = y + (rowH - scoreBoxH) / 2 - (isStory ? 10 : 0);

    roundRect(ctx, scoreBoxX, scoreBoxY, scoreBoxW, scoreBoxH, 8);
    ctx.fillStyle = '#060911';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const homeScore = m.homeScore !== undefined ? m.homeScore : 0;
    const awayScore = m.awayScore !== undefined ? m.awayScore : 0;

    ctx.font = `900 ${isStory ? 34 : 26}px 'JetBrains Mono', 'Outfit', monospace`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${homeScore}  -  ${awayScore}`, w / 2, scoreBoxY + scoreBoxH / 2);

    // Pill de Estado (Finalizado)
    const statusPillW = isStory ? 100 : 80;
    const statusPillH = isStory ? 20 : 16;
    const statusPillX = (w - statusPillW) / 2;
    const statusPillY = scoreBoxY + scoreBoxH + 4;

    roundRect(ctx, statusPillX, statusPillY, statusPillW, statusPillH, 4);
    ctx.fillStyle = m.status === 'en_vivo' ? 'rgba(229, 27, 36, 0.3)' : 'rgba(22, 163, 74, 0.25)';
    ctx.fill();
    ctx.font = `800 ${isStory ? 11 : 9}px 'Inter', sans-serif`;
    ctx.fillStyle = m.status === 'en_vivo' ? '#f87171' : '#4ade80';
    ctx.fillText(m.status === 'en_vivo' ? 'EN VIVO' : "FINAL 90'", w / 2, statusPillY + statusPillH / 2);

    // 3. Equipo Visita (Derecha)
    await drawClubBadge(ctx, m.awayClubId, awayClub, w - 115, y + rowH / 2 - (isStory ? 10 : 0), crestSize);

    ctx.font = `800 ${isStory ? 24 : 18}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const awayDisplayName = awayClub.name.replace('Club Deportivo ', '');
    ctx.fillText(awayDisplayName, w - 175, y + rowH / 2 - (isStory ? 10 : 0));

    // 4. Estadio / Cancha (Subtexto)
    ctx.font = `600 ${isStory ? 13 : 11}px 'Inter', sans-serif`;
    ctx.fillStyle = theme.textMuted;
    ctx.textAlign = 'center';
    const stadium = m.stadium || homeClub.stadium || 'Estadio Municipal';
    ctx.fillText(`📍 ${stadium}`, w / 2, y + rowH - (isStory ? 16 : 10));

    ctx.restore();
  }

  const contentEndY = startY + matches.length * rowH + Math.max(0, matches.length - 1) * rowGap;

  await drawCardFooter(ctx, w, h, theme, db, contentEndY, options);
}

/**
 * ============================================================================
 * PLANTILLA 2: TABLA DE POSICIONES (League Standings)
 * ============================================================================
 */
async function renderTablaTemplate(ctx, w, h, db, options, theme) {
  const seriesId = options.seriesId || 'primera_adulta';
  const seriesName = resolveSeriesName(db, seriesId);
  const league = db.leagueInfo || { name: 'Asociación de Fútbol de Arauco' };

  await drawCardHeader(
    ctx,
    w,
    league,
    seriesName,
    'Tabla de Posiciones',
    'Clasificación Oficial 2026',
    theme
  );

  // Obtener datos de la tabla de la serie
  const standings = (db.standings && db.standings[seriesId]) || (db.standings && db.standings['honor']) || [];
  const isStory = options.format === 'story';
  const maxRows = isStory ? 10 : 8;
  const rowsToShow = standings.slice(0, maxRows);

  const startY = 225;
  const tableW = w - 90;
  const headerH = 38;

  // Header de la tabla
  ctx.save();
  roundRect(ctx, 45, startY, tableW, headerH, 6);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fill();

  ctx.font = "800 12px 'Inter', sans-serif";
  ctx.fillStyle = theme.textMuted;
  ctx.textBaseline = 'middle';

  ctx.textAlign = 'center';
  ctx.fillText('POS', 80, startY + headerH / 2);
  ctx.textAlign = 'left';
  ctx.fillText('CLUB', 130, startY + headerH / 2);

  ctx.textAlign = 'center';
  ctx.fillText('PJ', w - 280, startY + headerH / 2);
  ctx.fillText('PG', w - 220, startY + headerH / 2);
  ctx.fillText('DIF', w - 160, startY + headerH / 2);

  ctx.fillStyle = theme.accentLight;
  ctx.font = "900 13px 'Inter', sans-serif";
  ctx.fillText('PTS', w - 90, startY + headerH / 2);
  ctx.restore();

  // Filas de equipos
  const availableH = h - 90 - startY - headerH - 35;
  const rowCount = Math.max(rowsToShow.length, 1);
  const rowH = Math.min(isStory ? 82 : 56, Math.floor(availableH / rowCount - 6));
  const rowGap = isStory ? 8 : 5;

  for (let i = 0; i < rowsToShow.length; i++) {
    const row = rowsToShow[i];
    const y = startY + headerH + 10 + i * (rowH + rowGap);
    const club = (db.clubs || []).find(c => c.id === row.clubId) || { name: row.name, shortName: row.name };
    const isLeader = i === 0;
    const isSecond = i === 1;

    ctx.save();
    roundRect(ctx, 45, y, tableW, rowH, 8);
    ctx.fillStyle = isLeader ? 'rgba(245, 158, 11, 0.12)' : (isSecond ? 'rgba(16, 185, 129, 0.08)' : theme.cardBg);
    ctx.fill();
    ctx.strokeStyle = isLeader ? 'rgba(245, 158, 11, 0.4)' : theme.cardBorder;
    ctx.lineWidth = isLeader ? 2 : 1;
    ctx.stroke();

    // 1. Badge Posición
    const posBadgeSize = isStory ? 32 : 26;
    const posBadgeX = 80;
    const posBadgeY = y + rowH / 2;

    ctx.beginPath();
    ctx.arc(posBadgeX, posBadgeY, posBadgeSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = isLeader ? '#f59e0b' : (isSecond ? '#10b981' : 'rgba(255, 255, 255, 0.1)');
    ctx.fill();

    ctx.font = `900 ${isStory ? 15 : 12}px 'Outfit', sans-serif`;
    ctx.fillStyle = (isLeader || isSecond) ? '#000000' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i + 1}`, posBadgeX, posBadgeY);

    // 2. Escudo Club
    const crestSize = isStory ? 48 : 34;
    await drawClubBadge(ctx, row.clubId, club, 130, y + rowH / 2, crestSize);

    // 3. Nombre del Club
    ctx.font = `800 ${isStory ? 20 : 15}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const clubName = (club.name || row.name).replace('Club Deportivo ', '');
    ctx.fillText(clubName, 165, y + rowH / 2);

    // 4. Estadísticas
    ctx.font = `700 ${isStory ? 17 : 14}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = theme.textSecondary;
    ctx.textAlign = 'center';
    ctx.fillText(String(row.played || 0), w - 280, y + rowH / 2);
    ctx.fillText(String(row.won || 0), w - 220, y + rowH / 2);

    const diff = (row.gf || 0) - (row.gc || 0);
    const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
    ctx.fillStyle = diff > 0 ? '#4ade80' : (diff < 0 ? '#f87171' : theme.textMuted);
    ctx.fillText(diffStr, w - 160, y + rowH / 2);

    // 5. Puntos (PTS)
    ctx.font = `900 ${isStory ? 24 : 19}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = isLeader ? '#fde047' : '#ffffff';
    ctx.fillText(String(row.points || 0), w - 90, y + rowH / 2);

    ctx.restore();
  }

  const lastRowBottom = startY + headerH + 10 + rowsToShow.length * rowH + Math.max(0, rowsToShow.length - 1) * rowGap;

  // Leyenda de Clasificación
  ctx.save();
  const legendY = lastRowBottom + (isStory ? 28 : 16);
  ctx.font = "700 12px 'Inter', sans-serif";
  ctx.fillStyle = '#f59e0b';
  ctx.textAlign = 'center';
  ctx.fillText('● 1º y 2º Clasifican al Torneo Regional de Campeones', w / 2, legendY);
  ctx.restore();

  await drawCardFooter(ctx, w, h, theme, db, legendY + 20, options);
}

/**
 * ============================================================================
 * PLANTILLA 3: PRÓXIMO PARTIDO DESTACADO (Showdown Feature)
 * ============================================================================
 */
async function renderPartidoTemplate(ctx, w, h, db, options, theme) {
  const seriesId = options.seriesId || 'primera_adulta';
  const seriesName = resolveSeriesName(db, seriesId);
  const league = db.leagueInfo || { name: 'Asociación de Fútbol de Arauco' };
  const isStory = options.format === 'story';

  // Buscar el partido destacado
  let match = null;
  if (options.matchId) {
    match = (db.matches || []).find(m => m.id === options.matchId);
  }
  if (!match) {
    // Tomar el primer partido de la serie activa o el más representativo
    match = (db.matches || []).find(m => (!m.series && seriesId === 'primera_adulta') || (m.series === seriesId)) || (db.matches && db.matches[0]);
  }

  const homeClub = (db.clubs || []).find(c => c.id === match?.homeClubId) || (db.clubs && db.clubs[0]) || { name: 'Local' };
  const awayClub = (db.clubs || []).find(c => c.id === match?.awayClubId) || (db.clubs && db.clubs[1]) || { name: 'Visita' };

  await drawCardHeader(
    ctx,
    w,
    league,
    seriesName,
    'Partido de la Fecha',
    match?.round || 'Campeonato Oficial',
    theme
  );

  // Cuadro Central del Duelo
  const centerCardY = isStory ? 340 : 250;
  const centerCardH = isStory ? 680 : 420;

  ctx.save();
  roundRect(ctx, 45, centerCardY, w - 90, centerCardH, 20);
  ctx.fillStyle = theme.cardBg;
  ctx.fill();
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 1. Equipo Local
  const localX = isStory ? w / 2 : 240;
  const localY = isStory ? centerCardY + 160 : centerCardY + 170;
  const crestSize = isStory ? 140 : 110;

  await drawClubBadge(ctx, match?.homeClubId || homeClub.id, homeClub, localX, localY, crestSize);

  ctx.font = `900 ${isStory ? 32 : 24}px 'Outfit', sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(homeClub.name.replace('Club Deportivo ', ''), localX, localY + crestSize / 2 + 16);

  ctx.font = "800 13px 'Inter', sans-serif";
  ctx.fillStyle = theme.accent;
  ctx.fillText('EQUIPO LOCAL', localX, localY + crestSize / 2 + (isStory ? 54 : 46));

  // 2. VS Central
  const vsX = w / 2;
  const vsY = isStory ? centerCardY + 340 : centerCardY + 170;

  ctx.beginPath();
  ctx.arc(vsX, vsY, isStory ? 48 : 38, 0, Math.PI * 2);
  ctx.fillStyle = theme.accent;
  ctx.fill();

  ctx.font = `900 ${isStory ? 28 : 22}px 'Outfit', sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VS', vsX, vsY);

  // 3. Equipo Visita
  const awayX = isStory ? w / 2 : w - 240;
  const awayY = isStory ? centerCardY + 520 : centerCardY + 170;

  await drawClubBadge(ctx, match?.awayClubId || awayClub.id, awayClub, awayX, awayY, crestSize);

  ctx.font = `900 ${isStory ? 32 : 24}px 'Outfit', sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(awayClub.name.replace('Club Deportivo ', ''), awayX, awayY + crestSize / 2 + 16);

  ctx.font = "800 13px 'Inter', sans-serif";
  ctx.fillStyle = theme.accent;
  ctx.fillText('EQUIPO VISITA', awayX, awayY + crestSize / 2 + (isStory ? 54 : 46));
  ctx.restore();

  // Ficha de Detalles (Estadio, Fecha, Hora, CAPA)
  const detailsY = isStory ? centerCardY + centerCardH + 40 : centerCardY + centerCardH + 30;
  const detailsH = isStory ? 240 : 170;

  ctx.save();
  roundRect(ctx, 45, detailsY, w - 90, detailsH, 16);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const infoItems = [
    { icon: '📅 FECHA', val: match?.date || 'Domingo 27 de Septiembre 2026' },
    { icon: '⏰ HORA', val: match?.time ? `${match.time} hrs` : '16:00 hrs' },
    { icon: '🏟️ ESTADIO', val: match?.stadium || homeClub.stadium || 'Estadio Municipal de Arauco' },
    { icon: '⚖️ COLEGIO DE ÁRBITROS', val: 'Colegio de Árbitros de la Provincia de Arauco (CAPA)' }
  ];

  const itemGap = isStory ? 48 : 36;
  infoItems.forEach((item, idx) => {
    const itemY = detailsY + 28 + idx * itemGap;
    ctx.font = `800 ${isStory ? 14 : 12}px 'Inter', sans-serif`;
    ctx.fillStyle = theme.accentLight;
    ctx.textAlign = 'left';
    ctx.fillText(item.icon, 80, itemY);

    ctx.font = `700 ${isStory ? 17 : 14}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(item.val, 280, itemY);
  });
  ctx.restore();

  const contentEndY = detailsY + detailsH + 30;
  await drawCardFooter(ctx, w, h, theme, db, contentEndY, options);
}

/**
 * ============================================================================
 * PLANTILLA 4: TABLA DE GOLEADORES (Top Scorers)
 * ============================================================================
 */
async function renderGoleadoresTemplate(ctx, w, h, db, options, theme) {
  const seriesId = options.seriesId || 'primera_adulta';
  const seriesName = resolveSeriesName(db, seriesId);
  const league = db.leagueInfo || { name: 'Asociación de Fútbol de Arauco' };
  const isStory = options.format === 'story';

  await drawCardHeader(
    ctx,
    w,
    league,
    seriesName,
    'Tabla de Goleadores',
    'Máximos Anotadores Oficiales',
    theme
  );

  // Obtener goleadores de la serie
  const players = [];
  (db.players || []).forEach(p => {
    if (!seriesId || seriesId === 'all' || p.series === seriesId) {
      const club = (db.clubs || []).find(c => c.id === p.clubId) || { name: 'Club' };
      players.push({
        ...p,
        clubName: club.name,
        clubBadgeId: club.badgeId || p.clubId
      });
    }
  });

  players.sort((a, b) => (b.goals || 0) - (a.goals || 0));
  const topScorers = players.slice(0, 5);

  const startY = 225;

  if (topScorers.length > 0) {
    const p1 = topScorers[0];
    const card1H = isStory ? 240 : 160;

    // 1. Tarjeta Especial Líder de Goleo (#1)
    ctx.save();
    roundRect(ctx, 45, startY, w - 90, card1H, 16);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Corona y Puesto 1
    ctx.font = "900 13px 'Outfit', sans-serif";
    ctx.fillStyle = '#f59e0b';
    ctx.textAlign = 'left';
    ctx.fillText('👑 LÍDER DE GOLEO OFICIAL • PUESTO #1', 80, startY + 30);

    // Escudo del club del goleador
    await drawClubBadge(ctx, p1.clubBadgeId, { name: p1.clubName }, 120, startY + card1H / 2 + 10, isStory ? 74 : 60);

    // Nombre y Club
    ctx.font = `900 ${isStory ? 32 : 24}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(p1.name, 180, startY + card1H / 2);

    ctx.font = `700 ${isStory ? 16 : 13}px 'Inter', sans-serif`;
    ctx.fillStyle = theme.textMuted;
    ctx.fillText(`${p1.clubName} • #${p1.number || 9} ${p1.position || 'Delantero'}`, 180, startY + card1H / 2 + 28);

    // Contador Gigante de Goles
    ctx.textAlign = 'right';
    ctx.font = `900 ${isStory ? 60 : 46}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = '#fde047';
    ctx.fillText(`${p1.goals || 0}`, w - 80, startY + card1H / 2 + 10);

    ctx.font = "800 13px 'Inter', sans-serif";
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('GOLES OFICIALES', w - 80, startY + card1H / 2 + 36);
    ctx.restore();

    // Ranks 2 al 5
    const rest = topScorers.slice(1, 5);
    const subStartY = startY + card1H + 20;
    const availableH = h - 90 - subStartY - 20;
    const rowH = Math.min(isStory ? 110 : 78, Math.floor(availableH / rest.length - 12));
    const gap = isStory ? 16 : 10;

    let lastY = startY + card1H; // fallback if no rest
    for (let i = 0; i < rest.length; i++) {
      const p = rest[i];
      const rank = i + 2;
      const y = subStartY + i * (rowH + gap);
      lastY = y + rowH;

      ctx.save();
      roundRect(ctx, 45, y, w - 90, rowH, 12);
      ctx.fillStyle = theme.cardBg;
      ctx.fill();
      ctx.strokeStyle = theme.cardBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Puesto
      ctx.beginPath();
      ctx.arc(85, y + rowH / 2, 18, 0, Math.PI * 2);
      ctx.fillStyle = rank === 2 ? '#94a3b8' : (rank === 3 ? '#d97706' : 'rgba(255, 255, 255, 0.1)');
      ctx.fill();

      ctx.font = "900 14px 'Outfit', sans-serif";
      ctx.fillStyle = rank <= 3 ? '#000000' : '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`#${rank}`, 85, y + rowH / 2);

      // Escudo
      await drawClubBadge(ctx, p.clubBadgeId, { name: p.clubName }, 140, y + rowH / 2, 42);

      // Nombre y Club
      ctx.font = `800 ${isStory ? 20 : 16}px 'Outfit', sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.name, 185, y + rowH / 2 - 8);

      ctx.font = "600 12px 'Inter', sans-serif";
      ctx.fillStyle = theme.textMuted;
      ctx.fillText(p.clubName, 185, y + rowH / 2 + 14);

      // Goles
      ctx.textAlign = 'right';
      ctx.font = `900 ${isStory ? 28 : 22}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = theme.accentLight;
      ctx.fillText(`${p.goals || 0} GOLES`, w - 80, y + rowH / 2);

      ctx.restore();
    }
    const contentEndY = lastY + 30;
    await drawCardFooter(ctx, w, h, theme, db, contentEndY, options);
  } else {
    // Fallback if no top scorers
    await drawCardFooter(ctx, w, h, theme, db, startY + 50, options);
  }
}

/**
 * Formatea fechas para la programación de la fecha (ej: Sáb 12 Oct)
 */
function formatScheduleMatchDate(dateStr) {
  if (!dateStr) return 'Fin de Semana';
  try {
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const dayName = days[d.getDay()] || 'Dom';
      const monthName = months[month] || 'Oct';
      return `${dayName} ${day} ${monthName}`;
    }
  } catch (e) {}
  return String(dateStr);
}

/**
 * ============================================================================
 * PLANTILLA 5: PROGRAMACIÓN DE LA FECHA (Cartelera / Fixture Oficial)
 * ============================================================================
 */
async function renderProgramacionTemplate(ctx, w, h, db, options, theme) {
  const roundNum = Number(options.round) || 3;
  const seriesId = options.seriesId || 'primera_adulta';
  const seriesName = resolveSeriesName(db, seriesId);
  const league = db.leagueInfo || { name: 'Asociación de Fútbol de Arauco' };

  await drawCardHeader(
    ctx,
    w,
    league,
    seriesName,
    `Programación Fecha ${roundNum}`,
    `Cartelera Oficial • Temporada 2026/27`,
    theme
  );

  // Obtener los partidos de la fecha
  let matches = (db.matches || []).filter(m => {
    const isRound = String(m.round).includes(String(roundNum));
    const isSeries = (!m.series && seriesId === 'primera_adulta') || (m.series === seriesId);
    return isRound && isSeries;
  });

  // Si no hay partidos de la serie específica, tomar los que haya en la fecha
  if (matches.length === 0) {
    matches = (db.matches || []).filter(m => String(m.round).includes(String(roundNum)));
  }

  // Fallback si no hay partidos cargados: armar emparejamientos representativos con los clubes
  if (matches.length === 0 && db.clubs && db.clubs.length >= 2) {
    const clubs = db.clubs;
    matches = [
      { id: 'prog-demo-1', homeClubId: clubs[0].id, awayClubId: clubs[1].id, time: '14:30', date: '2026-10-10', venue: clubs[0].stadium || 'Estadio Municipal' },
      { id: 'prog-demo-2', homeClubId: clubs[2]?.id || clubs[0].id, awayClubId: clubs[3]?.id || clubs[1].id, time: '16:00', date: '2026-10-10', venue: clubs[2]?.stadium || 'Complejo Arauco' },
      { id: 'prog-demo-3', homeClubId: clubs[4]?.id || clubs[0].id, awayClubId: clubs[5]?.id || clubs[1].id, time: '17:30', date: '2026-10-11', venue: 'Cancha 1 Municipal' }
    ];
  }

  // Máximo 5 partidos en la tarjeta
  matches = matches.slice(0, 5);

  const startY = 225;
  const isStory = options.format === 'story';
  const rowCount = Math.max(matches.length, 1);
  const rowGap = isStory ? 20 : 12;
  const maxContentH = isStory ? (1920 - 280 - startY) : (1080 - 175 - startY);
  const rowH = Math.min(isStory ? 175 : 116, Math.floor((maxContentH - (rowCount - 1) * rowGap) / rowCount));

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const y = startY + i * (rowH + rowGap);
    const homeClub = (db.clubs || []).find(c => c.id === m.homeClubId) || { name: 'Local', shortName: 'Local' };
    const awayClub = (db.clubs || []).find(c => c.id === m.awayClubId) || { name: 'Visita', shortName: 'Visita' };

    // Tarjeta del Partido
    ctx.save();
    roundRect(ctx, 45, y, w - 90, rowH, 14);
    ctx.fillStyle = theme.cardBg;
    ctx.fill();
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Acento lateral izquierdo
    ctx.fillStyle = theme.accent;
    ctx.fillRect(45, y + 10, 4, rowH - 20);

    // 1. Equipo Local (Izquierda)
    const crestSize = isStory ? 80 : 60;
    await drawClubBadge(ctx, m.homeClubId, homeClub, 115, y + rowH / 2 - (isStory ? 10 : 0), crestSize);

    ctx.font = `800 ${isStory ? 24 : 18}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const homeDisplayName = homeClub.name.replace('Club Deportivo ', '');
    ctx.fillText(homeDisplayName, 175, y + rowH / 2 - (isStory ? 10 : 0));

    // 2. Bloque Central: Horario & VS
    const timeBoxW = isStory ? 180 : 150;
    const timeBoxH = isStory ? 54 : 44;
    const timeBoxX = (w - timeBoxW) / 2;
    const timeBoxY = y + (rowH - timeBoxH) / 2 - (isStory ? 8 : 0);

    roundRect(ctx, timeBoxX, timeBoxY, timeBoxW, timeBoxH, 8);
    ctx.fillStyle = '#060911';
    ctx.fill();
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const timeStr = m.time ? `${m.time} HRS` : '15:30 HRS';
    ctx.font = `900 ${isStory ? 24 : 19}px 'JetBrains Mono', 'Outfit', monospace`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeStr, w / 2, timeBoxY + timeBoxH / 2);

    // Fecha del Partido (Pill superior al horario)
    const dateFormatted = formatScheduleMatchDate(m.date);
    ctx.font = `800 ${isStory ? 12 : 10}px 'Inter', sans-serif`;
    ctx.fillStyle = theme.gold || '#f59e0b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`📅 ${dateFormatted.toUpperCase()}`, w / 2, timeBoxY - 4);

    // 3. Equipo Visita (Derecha)
    await drawClubBadge(ctx, m.awayClubId, awayClub, w - 115, y + rowH / 2 - (isStory ? 10 : 0), crestSize);

    ctx.font = `800 ${isStory ? 24 : 18}px 'Outfit', sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const awayDisplayName = awayClub.name.replace('Club Deportivo ', '');
    ctx.fillText(awayDisplayName, w - 175, y + rowH / 2 - (isStory ? 10 : 0));

    // 4. Cancha / Recinto Deportivo (Subtexto inferior)
    ctx.font = `600 ${isStory ? 13 : 11}px 'Inter', sans-serif`;
    ctx.fillStyle = theme.textMuted;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const stadium = m.venue || m.stadium || homeClub.stadium || 'Estadio Municipal';
    ctx.fillText(`📍 ${stadium}`, w / 2, timeBoxY + timeBoxH + 4);

    ctx.restore();
  }

  const contentEndY = startY + matches.length * rowH + Math.max(0, matches.length - 1) * rowGap;

  await drawCardFooter(ctx, w, h, theme, db, contentEndY, options);
}

/**
 * ============================================================================
 * MOTOR PRINCIPAL DE RENDERIZADO
 * ============================================================================
 */
export async function renderSocialCard(canvas, options = {}) {
  if (!canvas) return;

  const merged = { ...studioOptions, ...options };
  const isStory = merged.format === 'story';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  // Ajustar dimensiones del canvas
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const theme = CARD_THEMES[merged.theme] || CARD_THEMES['dark-coral'];

  // 1. Dibujar Fondo Broadcast
  await drawBroadcastBackground(ctx, width, height, theme, db, merged);

  // 2. Renderizar Plantilla Elegida
  if (merged.template === 'resultados') {
    await renderResultadosTemplate(ctx, width, height, db, merged, theme);
  } else if (merged.template === 'tabla') {
    await renderTablaTemplate(ctx, width, height, db, merged, theme);
  } else if (merged.template === 'partido') {
    await renderPartidoTemplate(ctx, width, height, db, merged, theme);
  } else if (merged.template === 'goleadores') {
    await renderGoleadoresTemplate(ctx, width, height, db, merged, theme);
  } else if (merged.template === 'programacion') {
    await renderProgramacionTemplate(ctx, width, height, db, merged, theme);
  }

  return canvas;
}

/**
 * Descargar Imagen Directa (PNG)
 */
export function downloadSocialCard(canvas, filename) {
  if (!canvas) return;
  const name = filename || `ligamaster-${studioOptions.template}-${studioOptions.seriesId}-${studioOptions.format}.png`;
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = name;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📥 Placa gráfica descargada en Ultra-HD', 'success');
}

/**
 * Copiar Imagen al Portapapeles (para pegar directo en WhatsApp Web)
 */
export async function copySocialCardToClipboard(canvas) {
  if (!canvas || !canvas.toBlob) return;
  try {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast('Error al procesar imagen', 'error');
        return;
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('📋 ¡Imagen copiada! Puedes pegarla directamente en WhatsApp o Instagram', 'success');
      } catch {
        // Fallback descarga si el navegador restringe clipboard de imágenes
        downloadSocialCard(canvas);
      }
    });
  } catch {
    downloadSocialCard(canvas);
  }
}

/**
 * Compartir en Redes / WhatsApp (Web Share API)
 */
export async function shareSocialCard(canvas) {
  if (!canvas) return;

  const isStory = studioOptions.format === 'story';
  const filename = `ligamaster-${studioOptions.template}-${isStory ? 'story' : 'post'}.png`;

  if (typeof navigator !== 'undefined' && navigator.canShare && canvas.toBlob) {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        downloadSocialCard(canvas, filename);
        return;
      }
      const file = new File([blob], filename, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'LigaMaster • Placa Oficial de Competición',
            text: 'Resultados y estadísticas oficiales del fútbol amateur generadas en LigaMaster (ligamaster.cl).'
          });
          showToast('📲 Placa compartida con éxito', 'success');
          return;
        } catch {
          // Usuario canceló o no soportado
        }
      }
      // Fallback
      downloadSocialCard(canvas, filename);
    });
  } else {
    downloadSocialCard(canvas, filename);
  }
}

/**
 * Abre el Modal Studio de Placas Gráficas con opciones preconfiguradas
 */
export function openSocialCardsStudio(initialOptions = {}) {
  studioOptions = { ...studioOptions, ...initialOptions };

  const modal = document.getElementById('modal-social-cards');
  if (!modal) return;

  // Sincronizar UI de controles
  syncStudioControlsUI();

  // Abrir modal
  modal.classList.add('active');

  // Renderizar canvas en vivo
  const canvas = document.getElementById('social-card-canvas');
  if (canvas) {
    renderSocialCard(canvas, studioOptions);
  }
}
if (typeof window !== 'undefined') {
  window.ligamasterOpenSocialCardModal = openSocialCardsStudio;
  window._ligamasterOpenStudio = openSocialCardsStudio;
}

/**
 * Sincroniza los controles del modal según studioOptions
 */
function syncStudioControlsUI() {
  // 0. Sincronizar badge de resolución
  const resBadge = document.getElementById('studio-preview-res-badge');
  if (resBadge) {
    resBadge.textContent = studioOptions.format === 'story' ? '1080 x 1920 px (Story 9:16)' : '1080 x 1080 px (Post 1:1)';
  }

  // 1. Selector de Plantilla
  document.querySelectorAll('.studio-template-pill').forEach(btn => {
    const t = btn.getAttribute('data-template');
    if (t === studioOptions.template) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Selector de Formato
  document.querySelectorAll('.studio-format-pill').forEach(btn => {
    const f = btn.getAttribute('data-format');
    if (f === studioOptions.format) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Serie
  const seriesSelect = document.getElementById('studio-select-series');
  if (seriesSelect) {
    seriesSelect.value = studioOptions.seriesId;
  }

  // 4. Jornada
  const roundSelect = document.getElementById('studio-select-round');
  if (roundSelect) {
    roundSelect.value = String(studioOptions.round);
  }

  // 5. Tema
  document.querySelectorAll('.studio-theme-swatch').forEach(btn => {
    const th = btn.getAttribute('data-theme');
    if (th === studioOptions.theme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Visibilidad condicional de selector de partido
  const matchRow = document.getElementById('studio-match-picker-row');
  if (matchRow) {
    matchRow.style.display = studioOptions.template === 'partido' ? 'block' : 'none';
  }

  // 5.5 Tratamiento de Color (Paleta vs Color Original)
  const btnColTheme = document.getElementById('btn-colormode-theme');
  const btnColOriginal = document.getElementById('btn-colormode-original');
  const colHint = document.getElementById('studio-colormode-hint');
  if (btnColTheme && btnColOriginal) {
    if (studioOptions.bgPhotoMode === 'original') {
      btnColOriginal.classList.add('active');
      btnColTheme.classList.remove('active');
      if (colHint) {
        colHint.textContent = '📸 Foto Natural + Contraste';
        colHint.style.color = '#38bdf8';
      }
    } else {
      btnColTheme.classList.add('active');
      btnColOriginal.classList.remove('active');
      if (colHint) {
        colHint.textContent = '🎨 Teñido de la Placa';
        colHint.style.color = '#ff6b72';
      }
    }
  }

  // 5.6 Galería de Fondos Disponibles
  const bgGrid = document.getElementById('studio-bg-grid');
  if (bgGrid) {
    let cardsHtml = '';

    // Fondos oficiales registrados (estadios y escudo)
    OFFICIAL_BACKGROUNDS.forEach(bg => {
      const isAct = studioOptions.bgPhoto === bg.id;
      cardsHtml += `
        <div class="studio-bg-card ${isAct ? 'active' : ''}" data-bg-id="${bg.id}" title="${bg.name} - ${bg.subtitle}">
          <img class="studio-bg-thumb" src="${bg.dataUrl}" alt="${bg.name}">
          <div class="studio-bg-info">
            <span class="studio-bg-title">${bg.name}</span>
            <span class="studio-bg-sub">${bg.subtitle}</span>
          </div>
        </div>
      `;
    });

    // Fondo Clásico (Degradado puro broadcast sin foto)
    const isClasico = studioOptions.bgPhoto === 'clasico';
    cardsHtml += `
      <div class="studio-bg-card ${isClasico ? 'active' : ''}" data-bg-id="clasico" title="Degradado broadcast de televisión sin foto">
        <div class="studio-bg-thumb" style="background: linear-gradient(135deg, #090d16 0%, #1e293b 50%, #0f172a 100%); display:flex; align-items:center; justify-content:center; color:#94a3b8; font-size:1.2rem;">🎨</div>
        <div class="studio-bg-info">
          <span class="studio-bg-title">Fondo Clásico</span>
          <span class="studio-bg-sub">Degradado TV puro</span>
        </div>
      </div>
    `;

    // Si el usuario subió foto propia
    if (studioOptions.customBgDataUrl) {
      const isCustom = studioOptions.bgPhoto === 'custom';
      cardsHtml += `
        <div class="studio-bg-card ${isCustom ? 'active' : ''}" data-bg-id="custom" title="Foto personalizada subida por el usuario">
          <img class="studio-bg-thumb" src="${studioOptions.customBgDataUrl}" alt="Foto Subida">
          <div class="studio-bg-info">
            <span class="studio-bg-title">Mi Foto Subida</span>
            <span class="studio-bg-sub">Personalizada</span>
          </div>
        </div>
      `;
    }

    bgGrid.innerHTML = cardsHtml;
  }

  // 6. Auspiciadores Checklist
  const activeId = getActiveLeagueId();
  const db = getDb(activeId);
  const sponsors = db?.sponsors || [];
  const checklistContainer = document.getElementById('studio-sponsors-checklist');

  if (checklistContainer) {
    if (studioOptions.selectedSponsorIds === null) {
      studioOptions.selectedSponsorIds = sponsors.map(s => s.id);
    }

    if (sponsors.length === 0) {
      checklistContainer.innerHTML = '<span style="font-size:0.75rem; color:#64748b; padding:0.4rem;">No hay auspiciadores registrados en la asociación.</span>';
    } else {
      checklistContainer.innerHTML = sponsors.map(sp => {
        const isChecked = studioOptions.selectedSponsorIds.includes(sp.id);
        return `
          <label class="studio-sponsor-chip" style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.04); border: 1px solid ${isChecked ? 'rgba(229,27,36,0.35)' : 'rgba(255,255,255,0.08)'}; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer; transition: all 0.15s;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" class="studio-sponsor-cb" data-sp-id="${sp.id}" ${isChecked ? 'checked' : ''} style="cursor: pointer; accent-color: var(--color-primary, #e51b24);">
              <span style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">${sp.name}</span>
            </div>
            ${sp.logoBase64 ? `<img src="${sp.logoBase64}" style="height: 18px; max-width: 65px; object-fit: contain; filter: brightness(1.2);">` : `<span style="font-size: 0.68rem; color: #94a3b8;">Oficial</span>`}
          </label>
        `;
      }).join('');

      // Listeners para checkboxes
      checklistContainer.querySelectorAll('.studio-sponsor-cb').forEach(cb => {
        cb.addEventListener('change', () => {
          const spId = cb.getAttribute('data-sp-id');
          if (cb.checked) {
            if (!studioOptions.selectedSponsorIds.includes(spId)) {
              studioOptions.selectedSponsorIds.push(spId);
            }
          } else {
            studioOptions.selectedSponsorIds = studioOptions.selectedSponsorIds.filter(id => id !== spId);
          }
          const canvas = document.getElementById('social-card-canvas');
          if (canvas) renderSocialCard(canvas, studioOptions);
        });
      });
    }
  }
}

/**
 * Inicializa Event Listeners del Studio
 */
export function initSocialCards() {
  const canvas = document.getElementById('social-card-canvas');

  // Delegación de eventos para las pastillas de plantilla
  document.querySelectorAll('.studio-template-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      studioOptions.template = btn.getAttribute('data-template') || 'resultados';
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
    });
  });

  // Delegación de eventos para formato
  document.querySelectorAll('.studio-format-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      studioOptions.format = btn.getAttribute('data-format') || 'square';
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
    });
  });

  // Selector de Serie
  document.getElementById('studio-select-series')?.addEventListener('change', (e) => {
    studioOptions.seriesId = e.target.value;
    if (canvas) renderSocialCard(canvas, studioOptions);
  });

  // Selector de Jornada
  document.getElementById('studio-select-round')?.addEventListener('change', (e) => {
    studioOptions.round = Number(e.target.value) || 3;
    if (canvas) renderSocialCard(canvas, studioOptions);
  });

  // Selector de Partido (si plantilla es partido)
  document.getElementById('studio-select-match')?.addEventListener('change', (e) => {
    studioOptions.matchId = e.target.value;
    if (canvas) renderSocialCard(canvas, studioOptions);
  });

  // Selector de Tema
  document.querySelectorAll('.studio-theme-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      studioOptions.theme = btn.getAttribute('data-theme') || 'dark-coral';
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
    });
  });

  // Selector de Tratamiento de Color (Paleta vs Color Original)
  document.querySelectorAll('.studio-colormode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      studioOptions.bgPhotoMode = btn.getAttribute('data-colormode') || 'theme';
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
    });
  });

  // Delegación de clic en las tarjetas de foto de fondo
  document.getElementById('studio-bg-grid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.studio-bg-card');
    if (!card) return;
    const bgId = card.getAttribute('data-bg-id');
    if (bgId) {
      studioOptions.bgPhoto = bgId;
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
    }
  });

  // Subir foto propia desde el dispositivo
  document.getElementById('studio-upload-bg-input')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      studioOptions.bgPhoto = 'custom';
      studioOptions.customBgDataUrl = ev.target.result;
      syncStudioControlsUI();
      if (canvas) renderSocialCard(canvas, studioOptions);
      showToast('📸 Foto de fondo personalizada cargada', 'success');
    };
    reader.readAsDataURL(file);
  });

  // Botones de selección rápida de sponsors
  document.getElementById('studio-sponsors-select-all')?.addEventListener('click', () => {
    const activeId = getActiveLeagueId();
    const db = getDb(activeId);
    studioOptions.selectedSponsorIds = (db?.sponsors || []).map(s => s.id);
    syncStudioControlsUI();
    if (canvas) renderSocialCard(canvas, studioOptions);
  });

  document.getElementById('studio-sponsors-select-none')?.addEventListener('click', () => {
    studioOptions.selectedSponsorIds = [];
    syncStudioControlsUI();
    if (canvas) renderSocialCard(canvas, studioOptions);
  });

  // Botón Descargar PNG
  document.getElementById('btn-studio-download')?.addEventListener('click', () => {
    if (canvas) downloadSocialCard(canvas);
  });

  // Botón Copiar al Portapapeles
  document.getElementById('btn-studio-copy')?.addEventListener('click', () => {
    if (canvas) copySocialCardToClipboard(canvas);
  });

  // Botón Compartir / WhatsApp
  document.getElementById('btn-studio-share')?.addEventListener('click', () => {
    if (canvas) shareSocialCard(canvas);
  });
}
