# Productivity Screen

Eine umfassende Produktivitäts-Dashboard-Webanwendung, erstellt mit React, TypeScript, Tailwind CSS und shadcn/ui.

## Features

- **Aktuelle Uhrzeit**: Live-Anzeige von Zeit und Datum
- **Wetter-Integration**: Zeigt aktuelle Wetterdaten basierend auf Ihrem Standort (Open-Meteo API)
- **Pomodoro Timer**: Vollständig anpassbarer Pomodoro-Timer mit Arbeit/Pausen-Intervallen
- **Eigener Timer**: Erstellen Sie benutzerdefinierte Timer für beliebige Zeiträume
- **Vokabel des Tages**: Täglich wechselnde deutsche Vokabeln mit Übersetzungen und Beispielen
- **Google Calendar & Aufgaben**: Verwalten Sie Ihre Termine und To-Do-Listen
- **Habit Tracker**: Verfolgen Sie Ihre täglichen Gewohnheiten über 7 Tage

## Technologie-Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für Styling
- **shadcn/ui** für UI-Komponenten
- **Radix UI** für zugängliche Primitive
- **Lucide React** für Icons

## Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Produktions-Build lokal testen
npm run preview
```

## Verwendung

Die App läuft standardmäßig auf `http://localhost:5173`

### Pomodoro Timer
- Standardmäßig 25 Minuten Arbeit, 5 Minuten Pause
- Nach 4 Pomodoros gibt es eine längere Pause (15 Minuten)
- Alle Zeiteinstellungen sind anpassbar

### Habit Tracker
- Gewohnheiten werden lokal im Browser gespeichert
- Zeigt die letzten 7 Tage an
- Klicken Sie auf die Kreise, um Tage als erledigt zu markieren

### Aufgaben
- To-Do-Liste wird lokal gespeichert
- Einfaches Hinzufügen, Abhaken und Löschen von Aufgaben

## Google Calendar Integration

Um die Google Calendar Integration zu nutzen, müssen Sie:
1. Eine Google Cloud Console Projekt erstellen
2. Die Google Calendar API aktivieren
3. OAuth 2.0 Credentials erstellen
4. Die Client ID in der Anwendung konfigurieren

Aktuell zeigt die App Demo-Termine an.

## Lizenz

MIT
