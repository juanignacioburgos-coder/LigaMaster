const fs = require('fs');
const path = require('path');

const bgDir = path.join(__dirname, '..', 'assets', 'backgrounds');

function toDataUrl(filename, mime = 'image/jpeg') {
  const filePath = path.join(bgDir, filename);
  const buf = fs.readFileSync(filePath);
  return 'data:' + mime + ';base64,' + buf.toString('base64');
}

const backgrounds = [
  {
    id: 'noche',
    name: 'Estadio de Noche',
    subtitle: 'Tribunas y Atardecer',
    category: 'stadium',
    dataUrl: toDataUrl('arauco5.jpeg')
  },
  {
    id: 'dia-panoramica',
    name: 'Estadio Ramón Burgos (Sol)',
    subtitle: 'Panorámica Cancha & Pista',
    category: 'stadium',
    dataUrl: toDataUrl('estadio1.jpeg')
  },
  {
    id: 'dia-cielo',
    name: 'Estadio de Día (Cielo)',
    subtitle: 'Pista Atlética y Nubes',
    category: 'stadium',
    dataUrl: toDataUrl('arauco2.jpeg')
  },
  {
    id: 'fachada',
    name: 'Fachada del Estadio',
    subtitle: 'Entrada Ramón Burgos Loyola',
    category: 'stadium',
    dataUrl: toDataUrl('arauco4.jpeg')
  },
  {
    id: 'inauguracion',
    name: 'Estadio Arauco Multitud',
    subtitle: 'Cancha Llena y Tribunas',
    category: 'stadium',
    dataUrl: toDataUrl('estadioarauco.jpg')
  },
  {
    id: 'escudo-afa',
    name: 'Escudo Oficial AFA Arauco',
    subtitle: 'Emblema Lautaro',
    category: 'crest',
    dataUrl: toDataUrl('escudoAFA.jpg')
  }
];

const jsCode = `/**
 * LIGAMASTER - CATÁLOGO DE FONDOS OFICIALES PARA EL ESTUDIO DE PLACAS
 * Fotografías oficiales del Estadio Ramón Burgos Loyola y Escudo AFA Arauco
 * Guardados como Data URLs base64 para evitar errores de Canvas Tainted y habilitar uso 100% offline.
 */

export const OFFICIAL_BACKGROUNDS = ${JSON.stringify(backgrounds, null, 2)};

export function getBackgroundById(id) {
  if (!id || id === 'clasico') return null;
  return OFFICIAL_BACKGROUNDS.find(bg => bg.id === id) || null;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'js', 'backgrounds-data.js'), jsCode, 'utf8');
console.log('Successfully generated js/backgrounds-data.js! Size:', fs.statSync(path.join(__dirname, '..', 'js', 'backgrounds-data.js')).size, 'bytes');
