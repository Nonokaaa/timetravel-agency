# Time Travel Agency

Site vitrine **mobile-first** pour une agence de voyage temporel de luxe fictive. L'utilisateur découvre trois destinations historiques (Paris, Florence, Crétacé), consulte les détails de chaque époque, réserve une consultation et échange avec un assistant virtuel propulsé par l'IA.

# Groupe

- Matteo CORAZZA - M1 Directeur Artistique - Brand & Motion Design
- Noémie SAINTEMARIE - M2 DEVFLSTK
- Illona SABOUNDJIAN - M2 DEVFLSTK
- Wilfrid SALLES OTTA - M2 DEVFLSTK
---

## Technologies utilisées

| Catégorie | Stack |
|-----------|--------|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Routage | [Vue Router 4](https://router.vuejs.org/) |
| Build | [Vite 8](https://vite.dev/) |
| Styles | CSS personnalisé (variables, animations, responsive) — sans framework UI |
| API chatbot | Proxy Vite + [API Mistral](https://docs.mistral.ai/) (`/api/chat`) |
| Langage | JavaScript (ES modules) |

**Prérequis :** Node.js 18+ et npm.

---

## Features implémentées

### Pages & navigation
- **Accueil** : héros animé, galerie des destinations, présentation de l'agence (expériences, science, adhésion)
- **Détail destination** (`/destinations/:slug`) : aperçu, histoire, programme, points forts, sécurité, FAQ, CTA réservation
- **Réservation** (`/booking`) : formulaire avec validation côté client et pré-sélection via query string
- Header responsive (menu mobile jusqu'à 1024px) et footer

### Médias & UX
- Images et vidéos par destination avec **chargement différé** (`LazyMediaBackground`, `DestinationVideoGallery`)
- Modal **Voir le film** avec lecteur vidéo et onglets par destination
- Animations au scroll (`ScrollReveal`), transitions de page, effets au survol des cartes
- Thème sombre avec accents dorés, polices personnalisées, support `prefers-reduced-motion`

### Chatbot
- Widget flottant (bulle + fenêtre de chat)
- Réponses via **Mistral** avec prompt système personnalisé (personnalité, tarifs, FAQ, destinations)
- **Fallback local** par règles si la clé API est absente ou en cas d'erreur réseau
- Suggestions rapides et historique de conversation

### Données
- Catalogue centralisé dans `src/data/destinations.js`
- Contexte IA (tarifs, FAQ agence, conseils par profil) dans `src/data/chatbotContext.js`

---

## Outils IA utilisés (transparence)

| Outil | Usage | Données envoyées |
|-------|--------|------------------|
| **Mistral AI** (`mistral-small-latest` par défaut) | Assistant virtuel du chatbot en temps réel | Prompt système, historique de la conversation courante, message utilisateur |
| **Logique locale** (`chatbotService.js`) | Secours sans API : matching par mots-clés sur destinations, tarifs et FAQ | Aucune donnée externe |

**Bonnes pratiques appliquées**
- La clé API Mistral est stockée dans `.env` à la **racine du projet** et lue côté serveur uniquement (middleware Vite `server/mistralProxy.js`). Elle n'est **pas** exposée dans le bundle frontend.
- Le prompt système (`ASSISTANT_PERSONALITY` dans `chatbotContext.js`) encadre le ton, le rôle et les limites de l'assistant (catalogue fixe, tarifs fournis, orientation vers `/booking`).
- Aucune donnée personnelle du formulaire de réservation n'est envoyée à Mistral (le formulaire est simulé côté client).

**Limites**
- Le chatbot peut halluciner malgré le prompt : les tarifs et informations officielles restent ceux du site.
- En production statique (`dist/` seul), il faut un backend équivalent pour `/api/chat` ; le proxy actuel fonctionne avec `npm run dev` et `npm run preview`.

---

## Installation

### 1. Cloner et installer les dépendances

```bash
git clone <url-du-repo>
cd timetravel-agency
npm install
```

### 2. Configurer l'environnement (chatbot Mistral)

Copier le fichier d'exemple :

```bash
cp .env.example .env
```

Éditer `.env` à la **racine** du projet :

```env
MISTRAL_API_KEY=votre_cle_api_ici
MISTRAL_MODEL=mistral-small-latest
```

> Obtenir une clé : [console.mistral.ai](https://console.mistral.ai/)  
> Sans `MISTRAL_API_KEY`, le chatbot fonctionne en mode fallback local.

### 3. Lancer le projet

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

URL locale habituelle : `http://localhost:5173`

---

## Structure du projet

```
timetravel-agency/
├── server/
│   └── mistralProxy.js       # Proxy API Mistral (dev / preview)
├── src/
│   ├── components/           # UI (header, cartes, chatbot, formulaire…)
│   ├── data/
│   │   ├── destinations.js   # Contenu des 3 destinations
│   │   └── chatbotContext.js # Prompt IA, tarifs, FAQ
│   ├── services/
│   │   └── chatbotService.js # Appel API + fallback
│   ├── views/                # Pages routées
│   ├── router/
│   ├── styles/global.css
│   └── assets/               # Images, vidéos, polices
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

### Routes

| Chemin | Page |
|--------|------|
| `/` | Accueil |
| `/destinations/:slug` | Détail d'une destination |
| `/booking` | Formulaire de consultation |

### Destinations

1. **La Belle Époque à Paris** — 1870–1914  
2. **Florence à la Renaissance** — 1440–1550  
3. **Les derniers jours des dinosaures** — Crétacé supérieur  

---

## Crédits

### APIs & modèles IA
- **[Mistral AI](https://mistral.ai/)** — modèle `mistral-small-latest` (configurable via `MISTRAL_MODEL`) pour l'assistant conversationnel
- Documentation API : [docs.mistral.ai](https://docs.mistral.ai/)

### Assets visuels & médias
| Fichier | Usage |
|---------|--------|
| `src/assets/paris.png`, `florence.png`, `dinosaure.png` | Illustrations des destinations |
| `src/assets/videos/paris.mp4`, `florence.mp4`, `dino.mp4` | Vidéos immersives et modal film |
| `src/assets/Fond.png` | Arrière-plan du site (flou, faible opacité) |
| `public/favicon.svg` | Favicon |

> Assets fournis dans le cadre du projet / maquettes pédagogiques. Vérifier les droits avant toute réutilisation commerciale.

### Typographies
| Police | Fichier |
|--------|---------|
| **Against** (titres) | `src/assets/against regular.ttf` |
| **Futura BdCn BT** (corps de texte) | `src/assets/futuraboldcondensedbt.ttf` |

> Polices soumises à leurs licences respectives. Futura est une marque Linotype / Monotype.

### Stack open source
- [Vue.js](https://vuejs.org/) — licence MIT  
- [Vue Router](https://router.vuejs.org/) — licence MIT  
- [Vite](https://vite.dev/) — licence MIT  

---

## Licence

Projet fictif à des fins pédagogiques.  
© 2024 Time Travel Agency Holdings. Tous les fuseaux horaires réservés.
