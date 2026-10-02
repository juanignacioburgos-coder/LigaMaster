import openpyxl
import os
import glob
import json
import random

# Find Excel
downloads_dir = r"C:\Users\juani\Downloads"
files = glob.glob(os.path.join(downloads_dir, "*.xlsx"))
latest_file = max(files, key=os.path.getmtime)
print(f"Loading Excel file: {latest_file}")

wb = openpyxl.load_workbook(latest_file, data_only=True)
sheet = wb['Planteles']
rows = list(sheet.iter_rows(values_only=True))
header = rows[0]

# Mapping clubs
CLUB_DEFS = {
    "Club Deportivo O'Higgins": {
        "id": "demo-ohiggins",
        "name": "Club Deportivo O'Higgins",
        "shortName": "O'Higgins",
        "founded": 1948,
        "president": "Patricio Morales Vega",
        "stadium": "Estadio El Roble",
        "colors": {"primary": "#16a34a", "secondary": "#ffffff"},
        "badgeId": "demo-ohiggins",
        "description": "Tradicional institución comunal fundada en 1948, formador de grandes talentos juveniles."
    },
    "Colo Colo Local": {
        "id": "demo-colocolo",
        "name": "Club Deportivo Colo Colo Local",
        "shortName": "Colo Colo",
        "founded": 1955,
        "president": "Guillermo Alarcón Soto",
        "stadium": "Cancha Arellano",
        "colors": {"primary": "#111827", "secondary": "#ffffff"},
        "badgeId": "demo-colocolo",
        "description": "El popular del fútbol amateur, conocido por su arraigo popular y masiva hinchada."
    },
    "Defensor Playa Brava": {
        "id": "demo-playabrava",
        "name": "Defensor Playa Brava",
        "shortName": "Playa Brava",
        "founded": 1963,
        "president": "Rodrigo Silva Concha",
        "stadium": "Estadio Costanera",
        "colors": {"primary": "#0284c7", "secondary": "#ffffff"},
        "badgeId": "demo-playabrava",
        "description": "Club costero de gran tradición y temple marino, protagonista en todas sus series."
    },
    "Deportivo Arauco": {
        "id": "demo-arauco",
        "name": "Club Deportivo Arauco",
        "shortName": "C.D. Arauco",
        "founded": 1925,
        "president": "Juan Carlos Burgos",
        "stadium": "Estadio Municipal",
        "colors": {"primary": "#dc2626", "secondary": "#16a34a"},
        "badgeId": "demo-arauco",
        "description": "El club decano del campeonato con más de 100 años de historia deportiva comunal."
    },
    "Deportivo Ferroviario": {
        "id": "demo-ferroviario",
        "name": "Club Deportivo Ferroviario",
        "shortName": "Ferroviario",
        "founded": 1942,
        "president": "Héctor Maldonado Peña",
        "stadium": "Cancha La Maestranza",
        "colors": {"primary": "#1e293b", "secondary": "#eab308"},
        "badgeId": "demo-ferroviario",
        "description": "Nacido al alero de los trabajadores del ferrocarril. Club obrero, aguerrido y familiar."
    },
    "Estrella del Sur": {
        "id": "demo-estrelladelsur",
        "name": "Club Deportivo Estrella del Sur",
        "shortName": "Estrella del Sur",
        "founded": 1971,
        "president": "Carlos Santander Rivas",
        "stadium": "Cancha El Morro",
        "colors": {"primary": "#2563eb", "secondary": "#ffffff"},
        "badgeId": "demo-estrelladelsur",
        "description": "La divisa azul del sector sur, caracterizado por su orden institucional y fútbol ofensivo."
    },
    "Los Copihues FC": {
        "id": "demo-copihues",
        "name": "Club Social Los Copihues",
        "shortName": "Los Copihues",
        "founded": 1980,
        "president": "Manuel González Parra",
        "stadium": "Estadio Las Vertientes",
        "colors": {"primary": "#e11d48", "secondary": "#ffffff"},
        "badgeId": "demo-copihues",
        "description": "Orgullo del barrio residencial, fundado en 1980 con fuerte presencia en series adultas."
    },
    "Real Cordillera": {
        "id": "demo-realcordillera",
        "name": "Real Cordillera F.C.",
        "shortName": "Real Cordillera",
        "founded": 1988,
        "president": "Álvaro Cifuentes Baeza",
        "stadium": "Complejo Andino",
        "colors": {"primary": "#7c3aed", "secondary": "#f59e0b"},
        "badgeId": "demo-realcordillera",
        "description": "La institución morada de las faldas precordilleranas, reconocida por su juego colectivo."
    },
    "San Lorenzo Minero": {
        "id": "demo-sanlorenzo",
        "name": "Club San Lorenzo Minero",
        "shortName": "San Lorenzo",
        "founded": 1952,
        "president": "Esteban Carvajal Fuentealba",
        "stadium": "Estadio El Carbón",
        "colors": {"primary": "#991b1b", "secondary": "#1e3a8a"},
        "badgeId": "demo-sanlorenzo",
        "description": "Heredero de la cuenca minera y la mística de los piques de carbón. Fuerte localía."
    },
    "Unión Juvenil": {
        "id": "demo-unionjuvenil",
        "name": "Club Deportivo Unión Juvenil",
        "shortName": "Unión Juvenil",
        "founded": 1968,
        "president": "Víctor Hugo Muñoz",
        "stadium": "Cancha Progreso",
        "colors": {"primary": "#ea580c", "secondary": "#ffffff"},
        "badgeId": "demo-unionjuvenil",
        "description": "La fuerza naranja fundada por jóvenes deportistas en 1968, cuna de veloces punteros."
    }
}

# Series definitions
SERIES_MAP = {
    "Primera Adulta": "primera_adulta",
    "Senior": "senior",
    "Súper Senior": "super_senior",
    "Super Senior": "super_senior",
    "Sper Senior": "super_senior",
    "Juvenil": "juvenil"
}

SERIES_LIST = [
    {"id": "primera_adulta", "name": "Primera Adulta (Serie de Honor)", "shortName": "1ª Adulta", "matchDuration": "90 min (2T x 45)"},
    {"id": "senior", "name": "Serie Senior (35+ Años)", "shortName": "Senior", "matchDuration": "70 min (2T x 35)"},
    {"id": "super_senior", "name": "Serie Súper Senior (45+ Años)", "shortName": "Súper Senior", "matchDuration": "60 min (2T x 30)"},
    {"id": "juvenil", "name": "Serie Juvenil (Sub-18)", "shortName": "Juvenil", "matchDuration": "70 min (2T x 35)"}
]

# Process players
players = []
sanctions = []
random.seed(42)

for row in rows[1:]:
    if not row[1] or not row[3]:
        continue
    
    raw_id = str(row[0] or '').strip()
    raw_club = str(row[1] or '').strip()
    raw_serie = str(row[2] or '').strip()
    raw_name = str(row[3] or '').strip()
    raw_rut = str(row[4] or '').strip()
    raw_age = int(float(row[5])) if row[5] else 22
    raw_pos = str(row[6] or '').strip()
    raw_spec_pos = str(row[7] or '').strip()
    raw_dorsal = int(float(row[8])) if row[8] else 10
    raw_foot = str(row[9] or 'Derecho').strip()
    raw_status = str(row[10] or 'Activo').strip() if len(row) > 10 else 'Activo'

    # Match club
    club_info = None
    for k, v in CLUB_DEFS.items():
        if k.lower() in raw_club.lower() or raw_club.lower() in k.lower():
            club_info = v
            break
    if not club_info:
        print(f"Warning: club not found for {raw_club}")
        continue

    # Match serie
    serie_id = "primera_adulta"
    for s_raw, s_target in SERIES_MAP.items():
        if s_raw.lower() in raw_serie.lower():
            serie_id = s_target
            break

    # Stats based on position
    matches_played = random.randint(4, 7)
    goals = 0
    assists = 0
    yellow_cards = random.randint(0, 3)
    red_cards = 1 if raw_status == 'Suspendido' else (1 if random.random() < 0.08 else 0)

    if raw_pos == 'Delantero':
        goals = random.choices([0, 1, 2, 3, 4, 5, 6, 7], weights=[15, 25, 25, 15, 10, 5, 3, 2])[0]
        assists = random.randint(0, 4)
    elif raw_pos == 'Mediocampista':
        goals = random.choices([0, 1, 2, 3, 4], weights=[40, 30, 18, 8, 4])[0]
        assists = random.randint(1, 5)
    elif raw_pos == 'Defensa':
        goals = random.choices([0, 1, 2], weights=[75, 20, 5])[0]
        assists = random.randint(0, 2)
    elif raw_pos == 'Arquero':
        goals = 0
        assists = 0

    p_obj = {
        "id": f"p-{raw_id.lower()}",
        "clubId": club_info["id"],
        "name": raw_name,
        "rut": raw_rut,
        "age": raw_age,
        "position": raw_pos,
        "specificPosition": raw_spec_pos,
        "dorsal": raw_dorsal,
        "preferredFoot": raw_foot,
        "status": raw_status,
        "series": serie_id,
        "photo": None,
        "isCaptain": (raw_dorsal in [1, 5, 10] and random.random() < 0.25),
        "stats": {
            "matches": matches_played,
            "goals": goals,
            "assists": assists,
            "yellowCards": yellow_cards,
            "redCards": red_cards
        }
    }
    players.append(p_obj)

    # If suspended, add official tribunal sanction
    if raw_status == 'Suspendido':
        sanctions.append({
            "id": f"sanc-{raw_id.lower()}",
            "playerId": p_obj["id"],
            "playerName": raw_name,
            "clubId": club_info["id"],
            "clubName": club_info["name"],
            "series": serie_id,
            "matches": random.choice([1, 2, 3]),
            "remaining": random.choice([1, 2]),
            "reason": random.choice([
                "Doble amonestación en partido oficial (Art. 42 Código de Penas)",
                "Juego brusco grave contra adversario (Art. 45)",
                "Conducta antideportiva hacia la terna arbitral (Art. 51)"
            ]),
            "resolutionDate": "2026-09-28",
            "tribunalFolio": f"TP-2026-{random.randint(100, 999)}"
        })

print(f"Total players processed: {len(players)}")
print(f"Total sanctions generated: {len(sanctions)}")

# Generate round-robin fixture for 10 clubs
club_ids = [c["id"] for c in CLUB_DEFS.values()]
n = len(club_ids) # 10

# Berger tables / polygon method for 10 teams -> 9 rounds
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
            # Alternate home/away for fair distribution
            if r % 2 == 1 and i == 0:
                home, away = away, home
            round_matches.append((home, away))
        rounds.append(round_matches)
        # Rotate all except the first element
        t = [t[0]] + [t[-1]] + t[1:-1]
    return rounds

fixtures_all = generate_round_robin(club_ids)

# Generate matches for all series
matches = []
standings_by_series = {}

# Venues
venues = [
    {"id": "ven-1", "name": "Estadio Municipal", "address": "Av. Prat 450", "surface": "Pasto Sintético FIFA Quality"},
    {"id": "ven-2", "name": "Cancha Deportivo Ferroviario", "address": "Calle Estación s/n", "surface": "Pasto Natural"},
    {"id": "ven-3", "name": "Estadio El Roble", "address": "Camino Vecinal Km 2", "surface": "Pasto Sintético"},
    {"id": "ven-4", "name": "Estadio Costanera Playa Brava", "address": "Av. Costanera s/n", "surface": "Pasto Sintético"},
    {"id": "ven-5", "name": "Cancha El Morro", "address": "Sector El Morro", "surface": "Tierra Compactada Oficial"}
]

# Generate match schedules & results
# Round 1 to 7 played, Round 8 and 9 scheduled
match_counter = 1

for s_def in SERIES_LIST:
    s_id = s_def["id"]
    # Standings tracker for this series
    s_stats = {cid: {"clubId": cid, "played": 0, "won": 0, "drawn": 0, "lost": 0, "gf": 0, "ga": 0, "gd": 0, "points": 0} for cid in club_ids}

    for round_idx, round_pairs in enumerate(fixtures_all, start=1):
        is_played = (round_idx <= 6)
        is_live = (round_idx == 7)
        # Date offset
        date_str = f"2026-{8 + (round_idx // 4):02d}-{(round_idx * 7) % 28 + 1:02d}"
        
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
                home_score = random.choices([0, 1, 2, 3, 4], weights=[20, 35, 25, 12, 8])[0]
                away_score = random.choices([0, 1, 2, 3, 4], weights=[25, 35, 22, 12, 6])[0]

                # Update standings
                s_stats[home_id]["played"] += 1
                s_stats[away_id]["played"] += 1
                s_stats[home_id]["gf"] += home_score
                s_stats[home_id]["ga"] += away_score
                s_stats[away_id]["gf"] += away_score
                s_stats[away_id]["ga"] += home_score

                if home_score > away_score:
                    s_stats[home_id]["won"] += 1
                    s_stats[home_id]["points"] += 3
                    s_stats[away_id]["lost"] += 1
                elif home_score < away_score:
                    s_stats[away_id]["won"] += 1
                    s_stats[away_id]["points"] += 3
                    s_stats[home_id]["lost"] += 1
                else:
                    s_stats[home_id]["drawn"] += 1
                    s_stats[home_id]["points"] += 1
                    s_stats[away_id]["drawn"] += 1
                    s_stats[away_id]["points"] += 1

                # Generate sample scorers from real players
                home_players = [p for p in players if p["clubId"] == home_id and p["series"] == s_id]
                away_players = [p for p in players if p["clubId"] == away_id and p["series"] == s_id]

                for _ in range(home_score):
                    if home_players:
                        sc = random.choice(home_players)
                        scorers.append({
                            "playerId": sc["id"],
                            "playerName": sc["name"],
                            "clubId": home_id,
                            "minute": random.randint(5, 88),
                            "type": "jugada"
                        })
                for _ in range(away_score):
                    if away_players:
                        sc = random.choice(away_players)
                        scorers.append({
                            "playerId": sc["id"],
                            "playerName": sc["name"],
                            "clubId": away_id,
                            "minute": random.randint(5, 88),
                            "type": "jugada"
                        })

            elif is_live and pair_idx == 0:
                # 1 match live for realism!
                status = "en_vivo"
                home_score = 1
                away_score = 1

            matches.append({
                "id": m_id,
                "round": round_idx,
                "series": s_id,
                "date": date_str,
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

    # Sort standings table
    table = list(s_stats.values())
    for t in table:
        t["gd"] = t["gf"] - t["ga"]
    table.sort(key=lambda x: (x["points"], x["gd"], x["gf"]), reverse=True)
    for rank, t in enumerate(table, start=1):
        t["position"] = rank
    standings_by_series[s_id] = table

# Treasury
treasury_ledger = [
    {
        "id": "mov-d-01",
        "date": "02/10/2026",
        "type": "ingreso",
        "category": "Inscripción de Campeonato",
        "clubName": "Deportivo Arauco",
        "concept": "Pago cuota inscripción 4 series temporada 2026/27",
        "amount": 250000,
        "receiptFolio": "REC-9401",
        "status": "pagado"
    },
    {
        "id": "mov-d-02",
        "date": "01/10/2026",
        "type": "egreso",
        "category": "Arbitraje Oficial",
        "clubName": "Asociación",
        "concept": "Pago terna arbitral Fecha 6 todas las series",
        "amount": 180000,
        "receiptFolio": "EGR-3312",
        "status": "pagado"
    },
    {
        "id": "mov-d-03",
        "date": "28/09/2026",
        "type": "ingreso",
        "category": "Multas Tribunal de Disciplina",
        "clubName": "San Lorenzo Minero",
        "concept": "Fallo Nº 14 Tribunal de Penas - Tarjetas rojas Fecha 5",
        "amount": 45000,
        "receiptFolio": "REC-9390",
        "status": "pagado"
    }
]

# News
news = [
    {
        "id": "news-demo-1",
        "title": "Liga Demo arranca con récord de 800 jugadores inscritos",
        "summary": "10 clubes compiten en 4 series oficiales en una temporada histórica para el fútbol amateur.",
        "category": "Institucional",
        "date": "02 Octubre 2026",
        "author": "Prensa Liga Demo",
        "featured": True,
        "content": "Con la participación de 10 prestigiosas instituciones deportivas y 800 deportistas habilitados en el padrón digital oficial, la Liga Demo dio el vamos a la temporada 2026/27. La competencia contempla series Juvenil, Primera Adulta, Senior y Súper Senior con fixture completo."
    },
    {
        "id": "news-demo-2",
        "title": "Tribunal de Disciplina emite primer informe oficial de sanciones",
        "summary": "Se recuerdan los plazos de apelación para dirigentes de clubes con jugadores sancionados.",
        "category": "Tribunal",
        "date": "01 Octubre 2026",
        "author": "Secretaría General",
        "featured": False,
        "content": "El Honorable Tribunal de Penas de la Liga Demo sesionó este jueves para ratificar los informes de turno de cancha. Las sanciones ya se encuentran publicadas en la plataforma oficial LigaMaster."
    }
]

# Final Database Object
liga_demo_db = {
    "leagueInfo": {
        "id": "liga-demo",
        "name": "Liga Demo",
        "shortName": "LIGA DEMO",
        "commune": "Comuna Modelo, Región del Biobío",
        "president": "Patricio Morales Vega",
        "season": "Campeonato Oficial 2026/27",
        "headquarters": "Av. Prat 450, Sede Social Oficial",
        "mediaPartner": "Transmisiones Deportivas Comunales",
        "badgeId": "asociacion-arauco",
        "isDemo": True,
        "totalClubs": len(CLUB_DEFS)
    },
    "seriesList": SERIES_LIST,
    "clubs": list(CLUB_DEFS.values()),
    "players": players,
    "matches": matches,
    "standings": standings_by_series,
    "sanctions": sanctions,
    "treasuryLedger": treasury_ledger,
    "venues": venues,
    "news": news
}

# Save output JSON
output_path = r"c:\Users\juani\.gemini\antigravity-ide\scratch\ligapro-amateur\data\liga_demo.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(liga_demo_db, f, ensure_ascii=False, indent=2)

print(f"\n[OK] Liga Demo generated successfully at {output_path}!")
print(f"Clubs: {len(liga_demo_db['clubs'])}")
print(f"Players: {len(liga_demo_db['players'])}")
print(f"Matches: {len(liga_demo_db['matches'])}")
print(f"Series: {len(liga_demo_db['seriesList'])}")
print(f"Sanctions: {len(liga_demo_db['sanctions'])}")
