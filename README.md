# ☉ Il Sorteggio delle Anime ☉

> **Caccia al Tesoro Evolution 2026**

Benvenuto nel portale della **Loggia Lumen Mentis**. *Il Sorteggio delle Anime* è un'esperienza interattiva dark fantasy progettata per rivelare il vero destino di ogni partecipante prima dell'inizio della caccia.

![Visual Style](https://img.shields.io/badge/Aesthetics-Dark%20Fantasy-gold?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js%20%2B%20Redis-blue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Container-Docker%20Ready-green?style=for-the-badge)

## ⚔️ L'Esperienza

Un rituale in 7 atti dove ogni scelta plasma la tua essenza. Al termine del percorso, la Loggia rivelerà il tuo archetipo tra i tre pilastri della Caccia:

*   **Il Cavaliere**: La forza bruta e l'audacia che guida l'azione.
*   **L'Architetto**: La mente che plasma la materia e costruisce la vittoria.
*   **Lo Scriba**: Colui che decifra il mistero e custodisce la verità.

## ✨ Caratteristiche Principali

*   **Chiaroscuro Design**: Un'estetica premium ispirata a *Elden Ring* e ai codici di Leonardo.
*   **Atmosphere Immersiva**: Sfondi dinamici con forme antiche fluttuanti e particelle in movimento.
*   **Global Ranking**: Visualizza in tempo reale quante "anime" hanno ottenuto ogni profilo.
*   **Screenshot & Share**: Condividi la tua carta destino sui social con un click.
*   **Tracking & Stats**: Sistema integrato per monitorare la partecipazione e i risultati.

## 🚀 Deployment

L'applicazione è configurata per essere ospitata via Docker con supporto per il tracciamento dei risultati.

### Configurazione
Modifica il file `docker-compose.yml` per impostare l'URL del tuo database Redis:
```yaml
REDIS_URL=redis://redis-cache:6379/3
```

### Avvio (Docker Compose)
```bash
docker compose up -d --build
```
L'applicazione sarà accessibile all'indirizzo configurato nel tuo proxy (es. `/sda/`).

## 📊 Amministrazione

Il sistema offre degli strumenti per monitorare l'andamento del sorteggio:

- **Punteggi Generali**: Accedi a `/sda/scores` per vedere il tabellone riassuntivo.
- **Esportazione CSV**: Visita `/sda/api/export` per scaricare tutti i risultati anonimizzati per analisi esterne.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite) + Framer Motion
*   **Backend**: Node.js (Express)
*   **Database**: Redis (per statistiche in tempo reale)
*   **Nginx**: Reverse Proxy integrato per SPA routing e API
*   **Container**: Docker

---

*Progetto realizzato per la Pro Loco Venticanese (PAAA)*
**#CaTE26 #CacciaAlTesoro #Evolution**
