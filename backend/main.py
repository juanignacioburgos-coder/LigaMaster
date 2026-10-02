from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

# --- 1. CONFIGURACIÓN DE BASE DE DATOS (SQLite para desarrollo, escalable a PostgreSQL) ---
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./ligapro.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- 2. MODELOS ORM (Diseño Relacional) ---
class Club(Base):
    __tablename__ = "clubs"
    id = Column(String, primary_key=True, index=True) # ej: "club-arauco"
    name = Column(String, nullable=False)
    short_name = Column(String)
    logo_url = Column(String)

class Match(Base):
    __tablename__ = "matches"
    id = Column(String, primary_key=True, index=True)
    series = Column(String, index=True) # ej: "honor"
    round = Column(String)
    status = Column(String, default="programado") # programado, en_vivo, finalizado
    home_club_id = Column(String, ForeignKey("clubs.id"))
    away_club_id = Column(String, ForeignKey("clubs.id"))
    home_score = Column(Integer, default=0)
    away_score = Column(Integer, default=0)
    date_time = Column(DateTime, default=datetime.utcnow)

class MatchEvent(Base):
    __tablename__ = "match_events"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(String, ForeignKey("matches.id"))
    team_id = Column(String, ForeignKey("clubs.id"))
    event_type = Column(String) # gol, amarilla, roja
    minute = Column(Integer)
    player_name = Column(String)

# Crear tablas
Base.metadata.create_all(bind=engine)

# --- 3. INICIALIZACIÓN DE FASTAPI ---
app = FastAPI(title="LigaPro API", description="API Backend para gestión de la liga amateur.")

# Dependencia para DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 4. ENDPOINTS ---

@app.get("/")
def read_root():
    return {"message": "API de LigaPro funcionando correctamente."}

@app.get("/api/matches/{series}")
def get_matches(series: str, db: Session = Depends(get_db)):
    matches = db.query(Match).filter(Match.series == series).all()
    return matches

# ENDPOINT CLAVE: Lógica de Automatización de Tablas O(n)
@app.get("/api/standings/{series}")
def get_standings(series: str, db: Session = Depends(get_db)):
    """
    Recalcula la tabla de posiciones dinámicamente sumando los resultados
    de todos los partidos finalizados en la serie indicada.
    """
    clubs = db.query(Club).all()
    if not clubs:
        return []

    # Diccionario en memoria para la tabla
    table = {
        club.id: {
            "clubId": club.id,
            "name": club.short_name or club.name,
            "logo": club.logo_url,
            "pts": 0, "pj": 0, "pg": 0, "pe": 0, "pp": 0,
            "gf": 0, "gc": 0, "dif": 0
        }
        for club in clubs
    }

    # Obtener partidos finalizados
    finished_matches = db.query(Match).filter(
        Match.series == series, 
        Match.status == "finalizado"
    ).all()

    # Calcular O(n) iterando sobre los partidos
    for m in finished_matches:
        home = m.home_club_id
        away = m.away_club_id
        
        # Ignorar si hay clubes inválidos
        if home not in table or away not in table:
            continue
            
        # Partidos Jugados
        table[home]["pj"] += 1
        table[away]["pj"] += 1
        
        # Goles
        table[home]["gf"] += m.home_score
        table[home]["gc"] += m.away_score
        table[away]["gf"] += m.away_score
        table[away]["gc"] += m.home_score

        # Calcular Puntos (PG, PE, PP)
        if m.home_score > m.away_score:
            table[home]["pts"] += 3
            table[home]["pg"] += 1
            table[away]["pp"] += 1
        elif m.home_score == m.away_score:
            table[home]["pts"] += 1
            table[home]["pe"] += 1
            table[away]["pts"] += 1
            table[away]["pe"] += 1
        else:
            table[away]["pts"] += 3
            table[away]["pg"] += 1
            table[home]["pp"] += 1

    # Calcular diferencia de goles
    for k in table:
        table[k]["dif"] = table[k]["gf"] - table[k]["gc"]

    # Convertir a lista y ordenar: Puntos -> Dif Goles -> GF
    standings_list = list(table.values())
    standings_list.sort(key=lambda x: (x["pts"], x["dif"], x["gf"]), reverse=True)

    return standings_list

# Modelo Pydantic para el CMS "Hoy en Cancha"
class MatchResultUpdate(BaseModel):
    home_score: int
    away_score: int
    signature_data: Optional[str] = None

@app.post("/api/matches/{match_id}/finish")
def finish_match(match_id: str, result: MatchResultUpdate, db: Session = Depends(get_db)):
    """
    Recibe la actualización del CMS móvil, sella el partido como 'finalizado'
    y guarda el score, afectando automáticamente a /api/standings
    """
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
        
    match.home_score = result.home_score
    match.away_score = result.away_score
    match.status = "finalizado"
    # match.signature_data = result.signature_data (Si lo guardamos en DB)
    
    db.commit()
    
    return {"message": "Partido finalizado y posiciones actualizadas con éxito."}

if __name__ == "__main__":
    import uvicorn
    # Inicia el servidor de desarrollo en http://localhost:8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
