# ⚽ LigaMaster • La Liga Profesional del Fútbol Amateur Chileno

[![LigaMaster Version](https://img.shields.io/badge/version-2.0.0-crimson.svg)](#)
[![ANFA Standard](https://img.shields.io/badge/reglamento-ANFA%20Chile-0f172a.svg)](#)
[![Status](https://img.shields.io/badge/status-producción-success.svg)](#)

> **LigaMaster** es una plataforma web profesional de gestión, difusión digital y visualización broadcast para asociaciones y ligas de fútbol amateur en Chile. Inspirada en la arquitectura de información, jerarquía visual y estética de las grandes ligas internacionales (LaLiga EA Sports), adaptada con identidad propia a la idiosincrasia del deporte federado y vecinal chileno.

---

## 🌟 Características Principales

### 1. 🏆 Experiencia Broadcast Tier-1 (Frontend Público)
* **Arquitectura de Información Multi-Nivel:** Barra institucional superior, cabecera de competición activa con selector de liga, selector global de series y barra de navegación directa.
* **Competición en Vivo:** Visualización de resultados con incidencias minuto a minuto, goleadores, amonestados y estado de actas selladas.
* **Tabla de Posiciones Oficial:** Clasificación con zona de campeones (verde) y descenso (rojo), desglose de PJ, PG, PE, PP, GF, GC, DG y PTS, más racha de los últimos 5 encuentros (V-E-D).
* **Directorio de Clubes & Padrón de Jugadores:** Ficha detallada por institución (historia, estadio, palmarés) y perfil individual de deportistas con estadísticas avanzadas.
* **Sección de Prensa & Multimedia:** Comunicados oficiales del Directorio y Tribunal de Penas con categorización editorial.
* **Búsqueda Global Instantánea:** Acceso rápido con atajo de teclado (`Ctrl + K`) a clubes, futbolistas, árbitros y noticias.

### 2. 🇨🇱 Arquitectura Multi-Liga Integrada
LigaMaster permite administrar múltiples asociaciones en una única instalación, preservando bases de datos independientes en almacenamiento local persistente:
* **Asociación de Fútbol de Arauco (Biobío):** 10 clubes federados oficiales (C.D. Arauco, C.D. Colico, C.D. Lautaro, C.D. Pelantaro, C.D. Mallinko, etc.) con sus escudos vectoriales heráldicos originales.
* **Asociación de Fútbol de Lebu (Biobío):** 8 clubes.
* **Asociación de Fútbol de Cañete (Biobío):** 8 clubes.
* **Liga Cordillera Santiago (Región Metropolitana):** 8 clubes.

### 3. ⚙️ Backoffice Administrativo Institucional (ANFA)
Panel de control con compuerta de seguridad y perfiles de acceso:
* **Control de Resultados & Marcadores en Vivo:** Edición rápida desde panel, recálculo automático de la tabla de posiciones y ratificación formal por Directorio.
* **Padrón Oficial de Futbolistas:** Habilitación, inhabilitación reglamentaria, control de RUT y fichas.
* **Tribunal de Disciplina & Penas:** Registro de expedientes, computación de fechas cumplidas y rehabilitación automática al extinguirse la sanción.
* **Tesorería & Libro de Caja ANFA:** Balance en tiempo real, registro de ingresos/egresos, comprobantes oficiales con folio correlativo y desglose por institución.

---

## 🔑 Credenciales de Acceso para Demostración

Para acceder al **Panel Administrativo**, ingresa a la pestaña **⚙️ Admin** e introduce uno de los siguientes PINs institucionales:

| Rol | PIN | Descripción de Permisos |
| :--- | :---: | :--- |
| **Directiva ANFA / Administrador General** | `9999` | Control total: resultados, padrón, tribunal, tesorería y ajustes. |
| **Árbitro Central / Turno de Cancha** | `1234` | Gestión de marcadores en vivo y entrega de planillas oficiales. |

---

## 🚀 Despliegue y Ejecución Local

No requiere dependencias complejas ni compilación previa; está construido en Vanilla JavaScript moderno (ES Modules), CSS3 de alto rendimiento y HTML5 semántico:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanignacioburgos-coder/LigaMaster.git
   cd LigaMaster
   ```

2. **Levantar un servidor local (cualquiera de estas opciones):**
   * **Python:**
     ```bash
     python -m http.server 8080
     ```
   * **Node.js (npx serve):**
     ```bash
     npx serve .
     ```
   * **VS Code:** Abrir con la extensión *Live Server*.

3. **Abrir en el navegador:**
   `http://localhost:8080`

---

## 🧪 Pruebas Automatizadas

El proyecto incluye suites de pruebas unitarias para validar la integridad del modelo multi-liga y la lógica de negocio del panel administrativo:

```bash
# Validar modelo multi-liga
node tests/multileague.test.js

# Validar panel administrativo y tesorería
node tests/admin.test.js
```

---

## 📱 Progressive Web App (PWA)
LigaMaster cuenta con Service Worker activo (`sw.js`) y `manifest.json`, permitiendo su instalación como aplicación nativa en dispositivos Android, iOS y computadores de escritorio, garantizando fluidez y soporte fuera de línea.

---

## 📄 Licencia y Derechos
© 2026-2027 **LigaMaster** • Plataforma Deportiva del Fútbol Amateur Chileno.
Desarrollado para potenciar la digitalización de asociaciones ANFA y clubes deportivos independientes.
