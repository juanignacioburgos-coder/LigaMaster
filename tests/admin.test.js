import { getDb, saveDb, resetDb, getActiveLeagueId, setActiveLeagueId } from '../js/data.js';
import { login, logout, getCurrentRole, ROLES } from '../js/auth.js';

console.log('=== ADMIN PANEL TEST SUITE ===');

// 1. Test Authentication
console.log('1. Testing Authentication...');
logout();
if (getCurrentRole() !== ROLES.PUBLIC) throw new Error('Role should be public after logout');

const failedLogin = login('0000');
if (failedLogin.success) throw new Error('PIN 0000 should fail');
console.log('   ✓ Invalid PIN correctly rejected');

const refereeLogin = login('1234', 'Turno Cancha 1');
if (!refereeLogin.success || refereeLogin.role !== ROLES.REFEREE) throw new Error('PIN 1234 should grant referee role');
console.log('   ✓ Referee login OK (1234)');

const adminLogin = login('9999', 'Directiva ANFA');
if (!adminLogin.success || adminLogin.role !== ROLES.ADMIN) throw new Error('PIN 9999 should grant admin role');
console.log('   ✓ Admin login OK (9999)');

// 2. Test Match Scheduling & Quick Scoring
console.log('2. Testing Match Management in Active League...');
setActiveLeagueId('arauco');
const db = getDb('arauco');
const initialMatchesCount = (db.matches || []).length;

const testMatch = {
  id: `match-test-${Date.now()}`,
  series: 'honor',
  round: 'Fecha 9',
  homeClubId: 'club-arauco',
  awayClubId: 'club-pelantaro',
  venue: 'Estadio Municipal Ramón Burgos',
  date: 'Próximo Domingo • 17:00 hrs',
  referee: 'Terna CAPA',
  turnOfficial: 'Directorio ANFA',
  status: 'programado',
  homeScore: 0,
  awayScore: 0,
  events: []
};

db.matches.unshift(testMatch);
saveDb(db, 'arauco');

const updatedDb = getDb('arauco');
if (updatedDb.matches.length !== initialMatchesCount + 1) throw new Error('Match count should increase by 1');
console.log('   ✓ New match scheduled successfully');

// Quick live scoring
const scheduledMatch = updatedDb.matches.find(m => m.id === testMatch.id);
scheduledMatch.homeScore = 3;
scheduledMatch.awayScore = 1;
scheduledMatch.status = 'finalizado';
saveDb(updatedDb, 'arauco');

const scoredDb = getDb('arauco');
const verifiedMatch = scoredDb.matches.find(m => m.id === testMatch.id);
if (verifiedMatch.homeScore !== 3 || verifiedMatch.awayScore !== 1 || verifiedMatch.status !== 'finalizado') {
  throw new Error('Match scores did not persist properly');
}
console.log('   ✓ Match scoring & finalization persisted (3 - 1)');

// 3. Test Player Registration & Sanctions
console.log('3. Testing Player Management...');
const newPlayer = {
  id: `p-test-${Date.now()}`,
  clubId: 'club-arauco',
  series: 'honor',
  rut: '19.876.543-2',
  name: 'Cristóbal Test Jugador',
  number: 17,
  position: 'Volante',
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  status: 'habilitado'
};

scoredDb.players.unshift(newPlayer);
saveDb(scoredDb, 'arauco');

const playerDb = getDb('arauco');
const foundPlayer = playerDb.players.find(p => p.id === newPlayer.id);
if (!foundPlayer) throw new Error('Player should be in database');
console.log('   ✓ Player registered in padrón:', foundPlayer.name);

// Toggle suspension
foundPlayer.status = 'suspendido';
saveDb(playerDb, 'arauco');
const suspendedDb = getDb('arauco');
if (suspendedDb.players.find(p => p.id === newPlayer.id).status !== 'suspendido') {
  throw new Error('Player status should be suspendido');
}
console.log('   ✓ Player suspension toggle OK');

// 4. Test Treasury Management
console.log('4. Testing Treasury Management...');
const initialLedgerCount = (suspendedDb.treasuryLedger || []).length;
const testMov = {
  id: `mov-test-${Date.now()}`,
  date: '02/10/2026',
  type: 'ingreso',
  category: 'Cuota de Inscripción',
  clubName: 'Club Deportivo Arauco',
  concept: 'Pago arancel complementario temporada 2026',
  amount: 50000,
  receiptFolio: 'ING-TEST-999',
  status: 'pagado'
};

suspendedDb.treasuryLedger.unshift(testMov);
saveDb(suspendedDb, 'arauco');

const treasuryDb = getDb('arauco');
if (treasuryDb.treasuryLedger.length !== initialLedgerCount + 1) {
  throw new Error('Treasury ledger count should increase by 1');
}
console.log('   ✓ Treasury movement registered: +$50.000 CLP');

// 5. Cleanup test match, player, and treasury item
console.log('5. Cleaning up test artifacts...');
treasuryDb.matches = treasuryDb.matches.filter(m => m.id !== testMatch.id);
treasuryDb.players = treasuryDb.players.filter(p => p.id !== newPlayer.id);
treasuryDb.treasuryLedger = treasuryDb.treasuryLedger.filter(m => m.id !== testMov.id);
saveDb(treasuryDb, 'arauco');
console.log('   ✓ Database cleaned up cleanly');

console.log('\n🎉 ALL ADMIN PANEL UNIT TESTS PASSED SUCCESSFULLY! ✅');
