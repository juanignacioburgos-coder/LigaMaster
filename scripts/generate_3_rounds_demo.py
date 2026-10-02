import json
import random

# Load current Liga Demo data
with open('data/liga_demo.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Standings targets
STANDINGS_TARGETS = {
    "primera_adulta": [
        {"pos": 1, "clubId": "demo-arauco", "clubName": "Club Deportivo Arauco", "pj": 3, "pg": 3, "pe": 0, "pp": 0, "gf": 8, "gc": 2, "dg": 6, "pts": 9, "form": ["V", "V", "V"]},
        {"pos": 2, "clubId": "demo-estrelladelsur", "clubName": "Club Deportivo Estrella del Sur", "pj": 3, "pg": 2, "pe": 1, "pp": 0, "gf": 6, "gc": 3, "dg": 3, "pts": 7, "form": ["V", "E", "V"]},
        {"pos": 3, "clubId": "demo-colocolo", "clubName": "Club Deportivo Colo Colo Local", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 7, "gc": 4, "dg": 3, "pts": 6, "form": ["V", "D", "V"]},
        {"pos": 4, "clubId": "demo-ohiggins", "clubName": "Club Deportivo O'Higgins", "pj": 3, "pg": 1, "pe": 2, "pp": 0, "gf": 5, "gc": 4, "dg": 1, "pts": 5, "form": ["E", "V", "E"]},
        {"pos": 5, "clubId": "demo-realcordillera", "clubName": "Real Cordillera F.C.", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 4, "gc": 4, "dg": 0, "pts": 4, "form": ["V", "D", "E"]},
        {"pos": 6, "clubId": "demo-playabrava", "clubName": "Defensor Playa Brava", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 3, "gc": 4, "dg": -1, "pts": 4, "form": ["D", "V", "E"]},
        {"pos": 7, "clubId": "demo-ferroviario", "clubName": "Club Deportivo Ferroviario", "pj": 3, "pg": 1, "pe": 0, "pp": 2, "gf": 4, "gc": 6, "dg": -2, "pts": 3, "form": ["D", "V", "D"]},
        {"pos": 8, "clubId": "demo-copihues", "clubName": "Club Social Los Copihues", "pj": 3, "pg": 0, "pe": 2, "pp": 1, "gf": 3, "gc": 5, "dg": -2, "pts": 2, "form": ["E", "D", "E"]},
        {"pos": 9, "clubId": "demo-sanlorenzo", "clubName": "Club San Lorenzo Minero", "pj": 3, "pg": 0, "pe": 1, "pp": 2, "gf": 2, "gc": 6, "dg": -4, "pts": 1, "form": ["D", "E", "D"]},
        {"pos": 10, "clubId": "demo-unionjuvenil", "clubName": "Club Deportivo Unión Juvenil", "pj": 3, "pg": 0, "pe": 0, "pp": 3, "gf": 1, "gc": 5, "dg": -4, "pts": 0, "form": ["D", "D", "D"]}
    ],
    "senior": [
        {"pos": 1, "clubId": "demo-playabrava", "clubName": "Defensor Playa Brava", "pj": 3, "pg": 3, "pe": 0, "pp": 0, "gf": 9, "gc": 2, "dg": 7, "pts": 9, "form": ["V", "V", "V"]},
        {"pos": 2, "clubId": "demo-sanlorenzo", "clubName": "Club San Lorenzo Minero", "pj": 3, "pg": 2, "pe": 1, "pp": 0, "gf": 7, "gc": 3, "dg": 4, "pts": 7, "form": ["V", "E", "V"]},
        {"pos": 3, "clubId": "demo-ferroviario", "clubName": "Club Deportivo Ferroviario", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 5, "gc": 3, "dg": 2, "pts": 6, "form": ["V", "D", "V"]},
        {"pos": 4, "clubId": "demo-copihues", "clubName": "Club Social Los Copihues", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 6, "gc": 5, "dg": 1, "pts": 6, "form": ["D", "V", "V"]},
        {"pos": 5, "clubId": "demo-colocolo", "clubName": "Club Deportivo Colo Colo Local", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 4, "gc": 4, "dg": 0, "pts": 4, "form": ["E", "V", "D"]},
        {"pos": 6, "clubId": "demo-ohiggins", "clubName": "Club Deportivo O'Higgins", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 3, "gc": 4, "dg": -1, "pts": 4, "form": ["V", "D", "E"]},
        {"pos": 7, "clubId": "demo-arauco", "clubName": "Club Deportivo Arauco", "pj": 3, "pg": 1, "pe": 0, "pp": 2, "gf": 4, "gc": 6, "dg": -2, "pts": 3, "form": ["D", "V", "D"]},
        {"pos": 8, "clubId": "demo-realcordillera", "clubName": "Real Cordillera F.C.", "pj": 3, "pg": 0, "pe": 2, "pp": 1, "gf": 2, "gc": 4, "dg": -2, "pts": 2, "form": ["E", "D", "E"]},
        {"pos": 9, "clubId": "demo-unionjuvenil", "clubName": "Club Deportivo Unión Juvenil", "pj": 3, "pg": 0, "pe": 1, "pp": 2, "gf": 3, "gc": 7, "dg": -4, "pts": 1, "form": ["D", "E", "D"]},
        {"pos": 10, "clubId": "demo-estrelladelsur", "clubName": "Club Deportivo Estrella del Sur", "pj": 3, "pg": 0, "pe": 0, "pp": 3, "gf": 2, "gc": 7, "dg": -5, "pts": 0, "form": ["D", "D", "D"]}
    ],
    "super_senior": [
        {"pos": 1, "clubId": "demo-ferroviario", "clubName": "Club Deportivo Ferroviario", "pj": 3, "pg": 3, "pe": 0, "pp": 0, "gf": 8, "gc": 1, "dg": 7, "pts": 9, "form": ["V", "V", "V"]},
        {"pos": 2, "clubId": "demo-ohiggins", "clubName": "Club Deportivo O'Higgins", "pj": 3, "pg": 2, "pe": 1, "pp": 0, "gf": 6, "gc": 2, "dg": 4, "pts": 7, "form": ["V", "E", "V"]},
        {"pos": 3, "clubId": "demo-estrelladelsur", "clubName": "Club Deportivo Estrella del Sur", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 5, "gc": 3, "dg": 2, "pts": 6, "form": ["V", "D", "V"]},
        {"pos": 4, "clubId": "demo-arauco", "clubName": "Club Deportivo Arauco", "pj": 3, "pg": 1, "pe": 2, "pp": 0, "gf": 4, "gc": 3, "dg": 1, "pts": 5, "form": ["E", "V", "E"]},
        {"pos": 5, "clubId": "demo-sanlorenzo", "clubName": "Club San Lorenzo Minero", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 3, "gc": 3, "dg": 0, "pts": 4, "form": ["D", "V", "E"]},
        {"pos": 6, "clubId": "demo-realcordillera", "clubName": "Real Cordillera F.C.", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 4, "gc": 5, "dg": -1, "pts": 4, "form": ["E", "D", "V"]},
        {"pos": 7, "clubId": "demo-colocolo", "clubName": "Club Deportivo Colo Colo Local", "pj": 3, "pg": 1, "pe": 0, "pp": 2, "gf": 3, "gc": 5, "dg": -2, "pts": 3, "form": ["D", "V", "D"]},
        {"pos": 8, "clubId": "demo-playabrava", "clubName": "Defensor Playa Brava", "pj": 3, "pg": 0, "pe": 2, "pp": 1, "gf": 2, "gc": 4, "dg": -2, "pts": 2, "form": ["E", "D", "E"]},
        {"pos": 9, "clubId": "demo-copihues", "clubName": "Club Social Los Copihues", "pj": 3, "pg": 0, "pe": 1, "pp": 2, "gf": 1, "gc": 5, "dg": -4, "pts": 1, "form": ["D", "E", "D"]},
        {"pos": 10, "clubId": "demo-unionjuvenil", "clubName": "Club Deportivo Unión Juvenil", "pj": 3, "pg": 0, "pe": 0, "pp": 3, "gf": 0, "gc": 5, "dg": -5, "pts": 0, "form": ["D", "D", "D"]}
    ],
    "juvenil": [
        {"pos": 1, "clubId": "demo-unionjuvenil", "clubName": "Club Deportivo Unión Juvenil", "pj": 3, "pg": 3, "pe": 0, "pp": 0, "gf": 10, "gc": 2, "dg": 8, "pts": 9, "form": ["V", "V", "V"]},
        {"pos": 2, "clubId": "demo-realcordillera", "clubName": "Real Cordillera F.C.", "pj": 3, "pg": 2, "pe": 1, "pp": 0, "gf": 7, "gc": 3, "dg": 4, "pts": 7, "form": ["V", "E", "V"]},
        {"pos": 3, "clubId": "demo-copihues", "clubName": "Club Social Los Copihues", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 6, "gc": 4, "dg": 2, "pts": 6, "form": ["V", "D", "V"]},
        {"pos": 4, "clubId": "demo-colocolo", "clubName": "Club Deportivo Colo Colo Local", "pj": 3, "pg": 2, "pe": 0, "pp": 1, "gf": 5, "gc": 4, "dg": 1, "pts": 6, "form": ["D", "V", "V"]},
        {"pos": 5, "clubId": "demo-ohiggins", "clubName": "Club Deportivo O'Higgins", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 4, "gc": 4, "dg": 0, "pts": 4, "form": ["E", "V", "D"]},
        {"pos": 6, "clubId": "demo-arauco", "clubName": "Club Deportivo Arauco", "pj": 3, "pg": 1, "pe": 1, "pp": 1, "gf": 3, "gc": 4, "dg": -1, "pts": 4, "form": ["V", "D", "E"]},
        {"pos": 7, "clubId": "demo-playabrava", "clubName": "Defensor Playa Brava", "pj": 3, "pg": 1, "pe": 0, "pp": 2, "gf": 4, "gc": 6, "dg": -2, "pts": 3, "form": ["D", "V", "D"]},
        {"pos": 8, "clubId": "demo-estrelladelsur", "clubName": "Club Deportivo Estrella del Sur", "pj": 3, "pg": 0, "pe": 2, "pp": 1, "gf": 3, "gc": 6, "dg": -3, "pts": 2, "form": ["E", "D", "E"]},
        {"pos": 9, "clubId": "demo-ferroviario", "clubName": "Club Deportivo Ferroviario", "pj": 3, "pg": 0, "pe": 1, "pp": 2, "gf": 2, "gc": 6, "dg": -4, "pts": 1, "form": ["D", "E", "D"]},
        {"pos": 10, "clubId": "demo-sanlorenzo", "clubName": "Club San Lorenzo Minero", "pj": 3, "pg": 0, "pe": 0, "pp": 3, "gf": 1, "gc": 6, "dg": -5, "pts": 0, "form": ["D", "D", "D"]}
    ]
}

# Generate 9 rounds Berger
club_ids = [c["id"] for c in db["clubs"]]
def generate_round_robin(teams):
    rounds = []
    t = list(teams)
    num_rounds = len(t) - 1
    half = len(t) // 2
    for r in range(num_rounds):
        round_matches = []
        for i in range(half):
            home = t[i]
            away = t[len(t) - 1 - i]
            if r % 2 == 1 and i == 0:
                home, away = away, home
            round_matches.append((home, away))
        rounds.append(round_matches)
        t = [t[0]] + [t[-1]] + t[1:-1]
    return rounds

fixtures_all = generate_round_robin(club_ids)

# Build matches for each series
matches = []
venues = db["venues"]
players = db["players"]

# Concrete scores for Fechas 1, 2, 3 per series
SCORES_BY_SERIES_ROUND = {
    "primera_adulta": {
        1: [(3, 1), (2, 0), (1, 1), (2, 1), (0, 0)],
        2: [(2, 1), (3, 2), (1, 1), (2, 0), (1, 0)],
        3: [(3, 0), (2, 1), (2, 2), (1, 1), (2, 0)]
    },
    "senior": {
        1: [(4, 1), (2, 0), (1, 1), (3, 2), (2, 1)],
        2: [(3, 1), (2, 1), (1, 1), (2, 0), (1, 0)],
        3: [(2, 0), (3, 2), (1, 1), (3, 1), (2, 1)]
    },
    "super_senior": {
        1: [(3, 0), (2, 1), (1, 1), (2, 0), (0, 0)],
        2: [(3, 1), (2, 0), (1, 1), (1, 0), (2, 1)],
        3: [(2, 0), (2, 1), (1, 1), (1, 1), (2, 0)]
    },
    "juvenil": {
        1: [(4, 1), (3, 1), (2, 2), (2, 0), (1, 0)],
        2: [(3, 1), (2, 1), (1, 1), (3, 2), (2, 0)],
        3: [(3, 0), (2, 1), (1, 1), (2, 1), (2, 0)]
    }
}

for s_def in db["seriesList"]:
    s_id = s_def["id"]
    targets = STANDINGS_TARGETS[s_id]
    
    for round_idx, round_pairs in enumerate(fixtures_all, start=1):
        is_played = (round_idx <= 3) # EXACTLY 3 ROUNDS PLAYED!
        round_date = f"2026-09-{round_idx * 7 + 5:02d}" if is_played else f"2026-10-{(round_idx - 3) * 7 + 2:02d}"
        
        for pair_idx, (home_id, away_id) in enumerate(round_pairs):
            m_id = f"m-demo-{s_id[:4]}-f{round_idx}-{pair_idx+1}"
            venue = venues[(pair_idx + round_idx) % len(venues)]
            time_str = f"{14 + pair_idx}:30"
            
            home_score = 0
            away_score = 0
            status = "programado"
            scorers = []
            cards = []
            
            if is_played:
                status = "finalizado"
                scores_list = SCORES_BY_SERIES_ROUND[s_id][round_idx]
                h_sc, a_sc = scores_list[pair_idx]
                
                # Assign home and away scores to match realistic team power in targets
                h_target = next(t for t in targets if t["clubId"] == home_id)
                a_target = next(t for t in targets if t["clubId"] == away_id)
                
                if h_target["pos"] < a_target["pos"]:
                    home_score, away_score = max(h_sc, a_sc), min(h_sc, a_sc)
                elif h_target["pos"] > a_target["pos"]:
                    home_score, away_score = min(h_sc, a_sc), max(h_sc, a_sc)
                else:
                    home_score, away_score = h_sc, a_sc
                    
                # Pick real scorers from roster
                h_players = [p for p in players if p["clubId"] == home_id and p["series"] == s_id]
                a_players = [p for p in players if p["clubId"] == away_id and p["series"] == s_id]
                
                for _ in range(home_score):
                    if h_players:
                        sc = random.choice([p for p in h_players if p["position"] in ['Delantero', 'Mediocampista']] or h_players)
                        scorers.append({
                            "playerId": sc["id"],
                            "playerName": sc["name"],
                            "clubId": home_id,
                            "minute": random.randint(12, 88),
                            "type": "jugada"
                        })
                for _ in range(away_score):
                    if a_players:
                        sc = random.choice([p for p in a_players if p["position"] in ['Delantero', 'Mediocampista']] or a_players)
                        scorers.append({
                            "playerId": sc["id"],
                            "playerName": sc["name"],
                            "clubId": away_id,
                            "minute": random.randint(12, 88),
                            "type": "jugada"
                        })
            
            matches.append({
                "id": m_id,
                "round": f"Fecha {round_idx}",
                "roundNumber": round_idx,
                "series": s_id,
                "date": round_date,
                "time": time_str,
                "venue": venue["name"],
                "homeClubId": home_id,
                "awayClubId": away_id,
                "homeScore": home_score,
                "awayScore": away_score,
                "status": status,
                "scorers": scorers,
                "cards": cards
            })

# Update database
db["matches"] = matches
db["standings"] = STANDINGS_TARGETS
db["leagueInfo"]["season"] = "Campeonato Oficial 2026/27 (3 Fechas Disputadas)"

# Save to data/liga_demo.json
with open('data/liga_demo.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

# Save to js/data_liga_demo.js
with open('js/data_liga_demo.js', 'w', encoding='utf-8') as f:
    f.write('/**\n * LIGAMASTER - BASE DE DATOS LIGA DEMO (10 CLUBES, 4 SERIES, 3 FECHAS DISPUTADAS)\n */\nexport const LIGA_DEMO_DATA = ' + json.dumps(db, ensure_ascii=False, indent=2) + ';\n')

print("[OK] Liga Demo updated with exactly 3 rounds played and distinct standings per series!")
