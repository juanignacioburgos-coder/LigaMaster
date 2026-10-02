import { getDb, saveDb } from './data.js';
import { broadcastSyncEvent } from './realtime.js';

let currentMatch = null;
let homeTeam = null;
let awayTeam = null;
let events = []; // Registro temporal de goles
let scoringTeam = null; // 'home' o 'away' temporal

// Elementos DOM (se asignarán en init)
let elHomeScore, elAwayScore, elScorersList, playerModal, playersGrid, signatureModal, signatureCanvas, ctx;
let isDrawing = false;

export function initCMS() {
    const db = getDb();
    
    // Obtener elementos del DOM
    elHomeScore = document.getElementById('cms-homeScore');
    elAwayScore = document.getElementById('cms-awayScore');
    elScorersList = document.getElementById('cms-scorersList');
    playerModal = document.getElementById('modal-cms-player-backdrop');
    playersGrid = document.getElementById('cms-playersGrid');
    signatureModal = document.getElementById('modal-cms-signature-backdrop');
    signatureCanvas = document.getElementById('cms-signatureCanvas');

    // Inicializar Canvas si existe
    if (signatureCanvas) {
        ctx = signatureCanvas.getContext('2d');
        window.addEventListener('resize', resizeCanvas);
        
        signatureCanvas.addEventListener('pointerdown', (e) => {
            isDrawing = true;
            const rect = signatureCanvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        });
        signatureCanvas.addEventListener('pointermove', (e) => {
            if (!isDrawing) return;
            const rect = signatureCanvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        });
        signatureCanvas.addEventListener('pointerup', () => isDrawing = false);
        signatureCanvas.addEventListener('pointerout', () => isDrawing = false);
    }

    // Bindear funciones a window para poder usarlas desde onClick en HTML
    window.cmsAddGoal = addGoal;
    window.cmsRemoveLastGoal = removeLastGoal;
    window.cmsAddGoalForPlayer = addGoalForPlayer;
    window.cmsAddGoalUnknown = addGoalUnknown;
    window.cmsClosePlayerModal = closePlayerModal;
    window.cmsOpenSignatureModal = openSignatureModal;
    window.cmsCloseSignatureModal = closeSignatureModal;
    window.cmsClearSignature = clearSignature;
    window.cmsSubmitMatchResult = submitMatchResult;
    window.cmsChangeMatch = changeMatch;

    // Poblar Selector de Partidos
    const matchSelector = document.getElementById('cms-matchSelector');
    if (matchSelector) {
        matchSelector.innerHTML = db.matches.map(m => {
            const h = db.clubs.find(c => c.id === m.homeClubId);
            const a = db.clubs.find(c => c.id === m.awayClubId);
            const sName = h ? h.shortName : '';
            const aName = a ? a.shortName : '';
            return `<option value="${m.id}">${sName} vs ${aName} (${m.series})</option>`;
        }).join('');
        matchSelector.value = db.leagueInfo.activeMatchId || db.matches[0].id;
    }

    loadMatch(db.leagueInfo.activeMatchId || db.matches[0].id);
}

function changeMatch(matchId) {
    const db = getDb();
    db.leagueInfo.activeMatchId = matchId;
    saveDb(db);
    loadMatch(matchId);
}

function loadMatch(matchId) {
    const db = getDb();
    currentMatch = db.matches.find(m => m.id === matchId) || db.matches[0];
    
    if (!currentMatch) return;

    homeTeam = db.clubs.find(c => c.id === currentMatch.homeClubId);
    awayTeam = db.clubs.find(c => c.id === currentMatch.awayClubId);

    // Poblar Header
    document.getElementById('cms-homeLogo').src = homeTeam.logo;
    document.getElementById('cms-homeName').textContent = homeTeam.shortName || homeTeam.name;
    document.getElementById('cms-awayLogo').src = awayTeam.logo;
    document.getElementById('cms-awayName').textContent = awayTeam.shortName || awayTeam.name;

    // Poblar Info Adicional
    const seriesNames = {
        'honor': 'Serie de Honor',
        'senior_35': 'Senior 35+',
        'super_senior_45': 'Súper Senior 45+',
        'juvenil': 'Juvenil Sub-17',
        'infantil': 'Primera Infantil Sub-15',
        'segunda_adulta': 'Segunda Adulta'
    };
    
    const seriesLabel = seriesNames[currentMatch.series] || currentMatch.series;
    document.getElementById('cms-matchSeries').textContent = seriesLabel;
    document.getElementById('cms-matchVenue').textContent = currentMatch.venue;
    document.getElementById('cms-matchReferee').textContent = 'Árbitro: ' + currentMatch.referee;

    // Cargar goles existentes (si los hay)
    if (currentMatch.events) {
        events = [...currentMatch.events.filter(e => e.type === 'gol')];
    } else {
        events = [];
    }
    
    updateScoreboard();
    renderScorers();
}

function addGoal(team) {
    scoringTeam = team;
    if (navigator.vibrate) navigator.vibrate(50);
    
    openPlayerModal(team);
}

function removeLastGoal(team) {
    const teamId = team === 'home' ? homeTeam.id : awayTeam.id;
    for (let i = events.length - 1; i >= 0; i--) {
        if (events[i].teamId === teamId) {
            events.splice(i, 1);
            break;
        }
    }
    if (navigator.vibrate) navigator.vibrate(20);
    updateScoreboard();
    renderScorers();
}

function addGoalForPlayer(playerId, playerName, playerNumber) {
    const teamId = scoringTeam === 'home' ? homeTeam.id : awayTeam.id;
    events.push({
        type: 'gol',
        teamId: teamId,
        minute: Math.floor(Math.random() * 90) + 1, // Para demo
        playerId: playerId,
        playerName: playerName,
        playerNumber: playerNumber
    });
    closePlayerModal();
    updateScoreboard();
    renderScorers();
    
    // Disparar evento global para celebración de Golazo
    document.dispatchEvent(new CustomEvent('ligapro:goal-scored', {
        detail: {
            playerName: playerName,
            playerNumber: playerNumber || '#'
        }
    }));

    // Sincronizar en tiempo real con todas las demás pestañas y celulares
    broadcastSyncEvent('GOAL_SCORED', {
        playerName: playerName,
        playerNumber: playerNumber || '#',
        matchTitle: `${homeTeam?.name || 'Local'} vs ${awayTeam?.name || 'Visita'}`
    });
}

function addGoalUnknown() {
    const teamId = scoringTeam === 'home' ? homeTeam.id : awayTeam.id;
    events.push({
        type: 'gol',
        teamId: teamId,
        minute: Math.floor(Math.random() * 90) + 1,
        playerName: 'Gol (No id.)'
    });
    closePlayerModal();
    updateScoreboard();
    renderScorers();
    
    document.dispatchEvent(new CustomEvent('ligapro:goal-scored', {
        detail: {
            playerName: 'Gol (No id.)',
            playerNumber: '#'
        }
    }));

    // Sincronizar en tiempo real
    broadcastSyncEvent('GOAL_SCORED', {
        playerName: 'Gol (No id.)',
        playerNumber: '#',
        matchTitle: `${homeTeam?.name || 'Local'} vs ${awayTeam?.name || 'Visita'}`
    });
}

function updateScoreboard() {
    if (!homeTeam || !awayTeam) return;
    const homeG = events.filter(e => e.teamId === homeTeam.id).length;
    const awayG = events.filter(e => e.teamId === awayTeam.id).length;
    
    // Si el partido traía score
    const displayHome = Math.max(currentMatch.homeScore || 0, homeG);
    const displayAway = Math.max(currentMatch.awayScore || 0, awayG);

    if (elHomeScore) elHomeScore.textContent = displayHome;
    if (elAwayScore) elAwayScore.textContent = displayAway;
}

function renderScorers() {
    if (!elScorersList) return;
    
    if (events.length === 0) {
        elScorersList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.9rem; padding: 2rem 0;">Aún no hay goles registrados</div>`;
        return;
    }

    elScorersList.innerHTML = events.map((e, index) => {
        const isHome = e.teamId === homeTeam.id;
        const colorClass = isHome ? 'var(--accent-primary)' : 'var(--status-error)';
        
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); padding: 0.75rem 1rem; border-radius: 0.75rem; margin-bottom: 0.5rem; border: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: ${colorClass};"></div>
                    <div>
                        <strong style="font-size: 0.95rem;">${e.playerName}</strong>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">
                            ${e.playerNumber ? `Camiseta #${e.playerNumber} • ` : ''}Minuto ${e.minute}'
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openPlayerModal(team) {
    if (!playerModal || !playersGrid) return;
    
    const teamObj = team === 'home' ? homeTeam : awayTeam;
    const db = getDb();
    
    // Buscar jugadores de este club
    const activeMatch = db.matches.find(m => m.id === db.leagueInfo.activeMatchId) || db.matches[0];
    const clubPlayers = db.players ? db.players.filter(p => p.clubId === teamObj.id && p.series === activeMatch.series) : [];

    let html = '';
    if (clubPlayers.length > 0) {
        html = clubPlayers.map(p => `
            <div class="player-btn" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="window.cmsAddGoalForPlayer('${p.id}', '${p.name}', '${p.number || ''}')">
                <div style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; color: var(--accent-primary);">${p.number ? p.number : '#'}</div>
                <div style="font-size: 0.75rem; text-align: center; line-height: 1.2; margin-top: 0.2rem;">${p.name}</div>
            </div>
        `).join('');
    } else {
        // Fallback si no hay jugadores registrados para esa serie/club
        for (let i = 1; i <= 11; i++) {
            html += `
                <div class="player-btn" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; text-align: center; cursor: pointer;" onclick="window.cmsAddGoalForPlayer('p-${i}', 'Jugador ${i}', ${i})">
                    <div style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; color: var(--accent-primary);">${i}</div>
                    <div style="font-size: 0.75rem; text-align: center; line-height: 1.2; margin-top: 0.2rem;">Jugador ${i}</div>
                </div>
            `;
        }
    }
    
    playersGrid.innerHTML = html;
    playerModal.classList.add('active');
}

function closePlayerModal() {
    if (playerModal) playerModal.classList.remove('active');
}

function resizeCanvas() {
    if (!signatureCanvas) return;
    signatureCanvas.width = signatureCanvas.parentElement.clientWidth;
    signatureCanvas.height = 200;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
}

function clearSignature() {
    if (ctx && signatureCanvas) {
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    }
}

function openSignatureModal() {
    if (signatureModal) {
        signatureModal.classList.add('active');
        setTimeout(resizeCanvas, 300);
    }
}

function closeSignatureModal() {
    if (signatureModal) signatureModal.classList.remove('active');
}

function submitMatchResult() {
    const btn = document.getElementById('btnSubmitMatch');
    if (btn) {
        btn.innerHTML = '🔄 Guardando...';
        btn.style.pointerEvents = 'none';
    }

    const db = getDb();
    
    // Actualizar partido en DB local
    const matchIndex = db.matches.findIndex(m => m.id === currentMatch.id);
    if (matchIndex !== -1) {
        const homeG = events.filter(e => e.teamId === homeTeam.id).length;
        const awayG = events.filter(e => e.teamId === awayTeam.id).length;
        
        db.matches[matchIndex].homeScore = homeG;
        db.matches[matchIndex].awayScore = awayG;
        db.matches[matchIndex].events = events; // Guardar goles
        db.matches[matchIndex].status = "Terminado"; // Marcarlo como finalizado
        
        saveDb(db);
        broadcastSyncEvent('MATCH_UPDATED', { matchId: currentMatch.id, status: 'Terminado' });
    }

    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '✅ ¡Tabla Actualizada!';
            btn.style.background = 'var(--status-success)';
        }
        
        if (window.showToast) {
            window.showToast("Partido cerrado. Posiciones actualizadas.");
        }
        
        setTimeout(() => {
            closeSignatureModal();
            // Volver a la tabla de posiciones automáticamente
            const btnStandings = document.querySelector('[data-target="standings-view"]');
            if (btnStandings) btnStandings.click();
        }, 1000);
    }, 1000);
}
