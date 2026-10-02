import { getDb, getRegionsAndLeagues, getActiveLeagueId, setActiveLeagueId, getLeagueById, getLeagueSeries } from './js/data.js';
import { getClubBadgeSvg } from './js/badges.js';

console.log('=== MULTI-LEAGUE DATA MODEL TEST SUITE ===');

// 1. Initial State
const defaultLeague = getActiveLeagueId();
console.log('1. Default Active League:', defaultLeague);
if (defaultLeague !== 'arauco') throw new Error('Default league should be arauco');

// 2. Regions & Leagues
const regions = getRegionsAndLeagues();
console.log('2. Regions Count:', regions.length);
const totalLeagues = regions.reduce((acc, r) => acc + r.leagues.length, 0);
console.log('   Total Leagues registered:', totalLeagues);
if (totalLeagues < 4) throw new Error('Should have at least 4 leagues');

// 3. Check each league data
for (const lid of ['arauco', 'lebu', 'canete', 'cordillera']) {
  const lInfo = getLeagueById(lid);
  console.log(`3. Checking [${lid}]: "${lInfo.name}" | isDemo: ${lInfo.isDemo}`);
  if (!lInfo) throw new Error(`League ${lid} info should exist`);
  
  const db = getDb(lid);
  if (!db || !db.clubs || db.clubs.length === 0) throw new Error(`League ${lid} should have clubs`);
  if (!db.matches || db.matches.length === 0) throw new Error(`League ${lid} should have matches`);
  if (!db.standings && !db.standingsBySeries) throw new Error(`League ${lid} should have standings or standingsBySeries`);
  console.log(`   -> Clubs: ${db.clubs.length}, Matches: ${db.matches.length}, Series: ${getLeagueSeries(lid).length}`);
  
  // Check League Badge SVG
  const lBadge = getClubBadgeSvg(lInfo.badgeId, 32);
  if (!lBadge.includes('<svg')) throw new Error(`League ${lid} badge should return SVG`);
  
  // Check first club badge
  const c1 = db.clubs[0];
  const cBadge = getClubBadgeSvg(c1.badgeId || c1.id, 24);
  if (!cBadge.includes('<svg')) throw new Error(`Club ${c1.name} badge should return SVG`);
}

// 4. Test Switching
setActiveLeagueId('lebu');
if (getActiveLeagueId() !== 'lebu') throw new Error('Active league should now be lebu');
const lebuDb = getDb();
if (!lebuDb.clubs[0].id.includes('lebu')) throw new Error('Default getDb should return lebu clubs');
console.log('4. Switch to Lebu OK: first club is', lebuDb.clubs[0].name);

// Switch to Canete
setActiveLeagueId('canete');
const caneteDb = getDb();
console.log('5. Switch to Cañete OK: first club is', caneteDb.clubs[0].name);

// Switch to Cordillera
setActiveLeagueId('cordillera');
const cordDb = getDb();
console.log('6. Switch to Cordillera OK: first club is', cordDb.clubs[0].name);

// Switch back to arauco
setActiveLeagueId('arauco');
if (getActiveLeagueId() !== 'arauco') throw new Error('Active league should be arauco');
const araucoDb = getDb();
if (!araucoDb.clubs.some(c => c.id === 'club-arauco')) throw new Error('Arauco DB should contain club-arauco');
console.log('7. Switch back to Arauco OK: contains', araucoDb.clubs[0].name);

console.log('\n🎉 ALL MULTI-LEAGUE UNIT TESTS PASSED SUCCESSFULLY! ✅');
