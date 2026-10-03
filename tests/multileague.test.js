import { getDb, getRegionsAndLeagues, getActiveLeagueId, getLeagueById, getLeagueSeries } from '../js/data.js';
import { getClubBadgeSvg } from '../js/badges.js';

console.log('=== OFICIAL ARAUCO LEAGUE DATA MODEL TEST SUITE ===');

// 1. Initial State
const defaultLeague = getActiveLeagueId();
console.log('1. Active League:', defaultLeague);
if (defaultLeague !== 'arauco') throw new Error('Default league should be arauco');

// 2. Regions & Leagues
const regions = getRegionsAndLeagues();
console.log('2. Regions Count:', regions.length);
const totalLeagues = regions.reduce((acc, r) => acc + r.leagues.length, 0);
if (totalLeagues < 1) throw new Error('Platform should have registered official leagues');

// Verificar que las asociaciones de la plataforma están registradas
const leaguesList = regions.flatMap(r => r.leagues);
['arauco', 'curanilahue', 'lebu', 'canete'].forEach(expectedId => {
  const found = leaguesList.find(l => l.id === expectedId);
  if (!found) throw new Error(`Association ${expectedId} should be registered in LigaMaster`);
  console.log(`   ✓ Association [${expectedId}] registered: "${found.name}"`);
});

// 3. Check Arauco League Data
const lInfo = getLeagueById('arauco');
console.log(`3. Checking [arauco]: "${lInfo.name}" | isDemo: ${lInfo.isDemo}`);
if (!lInfo || lInfo.name !== 'Asociación de Fútbol de Arauco') throw new Error('League info name should be Asociación de Fútbol de Arauco');
if (lInfo.isDemo !== false) throw new Error('League should be official (isDemo: false)');

const db = getDb('arauco');
if (!db || !db.clubs || db.clubs.length !== 10) throw new Error(`Expected 10 clubs in Arauco, got ${db.clubs?.length}`);
if (!db.players || db.players.length !== 800) throw new Error(`Expected 800 players in Arauco padrón, got ${db.players?.length}`);
if (!db.matches || db.matches.length !== 180) throw new Error(`Expected 180 matches in fixture, got ${db.matches?.length}`);
if (!db.seriesList || db.seriesList.length !== 4) throw new Error(`Expected 4 series, got ${db.seriesList?.length}`);

console.log(`   -> Clubs: ${db.clubs.length}, Matches: ${db.matches.length}, Series: ${getLeagueSeries('arauco').length}, Players: ${db.players.length}`);

// 4. Check League and Club Badges
const lBadge = getClubBadgeSvg(lInfo.badgeId || 'asociacion-arauco', 32);
if (!lBadge.includes('<svg')) throw new Error('League badge should return SVG');

const c1 = db.clubs[0];
const cBadge = getClubBadgeSvg(c1.badgeId || c1.id, 24);
if (!cBadge.includes('<svg')) throw new Error(`Club ${c1.name} badge should return SVG`);
console.log('4. Badges verified OK for league and clubs');

console.log('\n🎉 ALL ARAUCO CONSOLIDATED LEAGUE UNIT TESTS PASSED SUCCESSFULLY! ✅');
