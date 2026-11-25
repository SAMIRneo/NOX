# NOX 🐍 — ton microcosme financier

**Domaine :** argent de poche / budget étudiant  
**Objectif :** savoir combien il me reste, où part mon argent, éviter le découvert

## Ce que fait l'appli

- Noter mes dépenses et rentrées d'argent
- Épargne « second compte » : versements enregistrés, cumul mensuel et global
- Voir le reste par jour, le solde prévu en fin de mois, la comparaison avec le mois dernier
- **Analyse** : camembert des dépenses par catégorie, filtres (Tout / Semestre / Ce mois / Mois / 30 jours), liste de tous les marchands
- Importer un relevé (CSV / JSON) pour analyser ses dépenses

## Où sont les données

- `localStorage` uniquement, pas de backend
- Clé : `mcos-argent-gestion:data`
- Version : `v: 3`
- Aucune donnée n'est envoyée sur internet

## Installer / utiliser

- **PC** : ouvrir `NOX.html` à la racine, ou `index.html` directement
- **Téléphone / PWA** : héberger le dossier, puis « Ajouter à l'écran d'accueil » (Android) ou « Ajouter au Home Screen » (iOS)
- **Hors-ligne** : un service worker (`sw.js`) met la page en cache après la première visite en ligne
- Mode clair et sombre (Bleu nuit & or)

## Règles du microcosme (CHARTE.md)

- Tout dans un seul `index.html` (HTML + CSS + JS, zéro dépendance)
- Palette dérivée de `--bg` et `--ac`
- Mode clair ET sombre
- Français tutoyé, court, clair
- Boutons ≥ 44 px, accessibilité (`aria-*`)
- En-tête avec le nom de l'appli et bouton « ← Microcosme »

## Livrables

1. Dossier `ARGENT GESTION/` : `index.html`, `icon.svg`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest`, `sw.js`, `README.md`
2. Une ligne dans `apps.json` du Launcher (à faire)
3. Une entrée dans `notes/journal.md` (à faire)
