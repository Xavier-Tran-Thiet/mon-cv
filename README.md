# xavier-tran-thiet

Site personnel one-page de Xavier Tran-Thiet : responsable de production digitale et transformation IA chez Imagence.

Site 100 % statique, bilingue (FR/EN), thème clair et sombre, animations WebGL et GSAP.

## Stack

- **React 19 + Vite** : application construite en fichiers statiques (`dist/`).
- **Three.js** : nuage de particules qui change de forme à chaque section (`src/three/ParticleEngine.js`).
- **GSAP** (ScrollTrigger, SplitText, ScrambleText) et **Lenis** : animations au défilement et défilement fluide.
- **Docker + Nginx** : image de production qui sert le build.

## Développement

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
npm run preview    # sert dist/ sur http://localhost:4173
```

## Mise en ligne (GitHub Pages)

Chaque push sur `main` construit le site et le publie via `.github/workflows/deploy.yml`.

- Adresse : https://xavier-tran-thiet.github.io/mon-cv/
- Suivi des déploiements : onglet **Actions** du repo.
- Relancer à la main : Actions > « Déploiement GitHub Pages » > **Run workflow**.
- Nom de domaine personnalisé (optionnel) : Settings > Pages > Custom domain, puis un enregistrement DNS chez le registrar.

## Docker

```bash
docker compose up -d --build   # http://localhost:8080
```

Ou sans compose :

```bash
docker build -t xavier-tran-thiet-site .
docker run -p 8080:80 xavier-tran-thiet-site
```

Comme le build utilise des chemins relatifs (`base: './'`), le dossier `dist/` peut aussi être déposé tel quel sur n'importe quel hébergement statique (GitHub Pages, Netlify, Cloudflare Pages, un serveur Nginx existant).

## Modifier le contenu

Tous les textes, chiffres et projets sont dans **`src/content.js`**, en français et en anglais. Les deux langues ont la même structure : ajouter un projet dans l'une, c'est l'ajouter dans l'autre.

| Quoi | Où |
| --- | --- |
| Textes, projets, parcours, compétences | `src/content.js` |
| Logos des projets (repris de chaque repo) | `src/components/ProjectVisual.jsx` |
| CV téléchargeables | `public/cv/` |
| Couleurs, typographies, rayons | tokens en tête de `src/styles/global.css` |
| Forme et position des particules par section | `SCENES` dans `src/components/ParticleField.jsx` |

## Structure

```
src/
  content.js            contenu FR/EN
  i18n.jsx              langue courante (détectée puis mémorisée)
  lib/motion.js         GSAP, Lenis, bouton magnétique
  lib/theme.js          thème clair/sombre
  three/                moteur de particules WebGL
  data/logoPaths.js     tracés des logotypes (générés depuis les polices des produits)
  components/           une section par composant, chacune avec son CSS
public/
  cv/                   CV PDF (sans numéro de téléphone)
```

## Mesure d'audience (GoatCounter)

Tableau de bord : https://xavier-tran-thiet.goatcounter.com (sans cookie, pas de bandeau de consentement nécessaire).

- **Visites** : comptées automatiquement (pays, appareil, provenance).
- **Événements** (`src/lib/track.js`) :

  | Événement | Signification |
  | --- | --- |
  | `cv-fr-hero`, `cv-en-hero` | téléchargement du CV depuis le haut de page |
  | `cv-fr-contact`, `cv-en-contact` | téléchargement du CV depuis la section contact |
  | `clic-linkedin`, `clic-email`, `copie-email` | prise de contact |
  | `langue-fr`, `langue-en` | changement de langue |
  | `vu-methode`, `vu-projets`, `vu-competences`, `vu-parcours`, `vu-contact` | section atteinte |

- **Lien personnalisé par candidature** : ajouter `?ref=nom-entreprise` à l'adresse (ex. `https://xavier-tran-thiet.github.io/mon-cv/?ref=pyltech`). La valeur apparaît comme provenance dans le tableau de bord.
- **Exclure ses propres visites** : ouvrir une fois `https://xavier-tran-thiet.github.io/mon-cv/#toggle-goatcounter` sur chaque navigateur et appareil (à refaire pour réactiver le comptage).

## Indexation

Le site n'est volontairement **pas indexé** : `index.html` porte `<meta name="robots" content="noindex, nofollow, noarchive">`. Pour l'ouvrir aux moteurs de recherche, il suffit de retirer cette balise.

## Accessibilité et performance

- `prefers-reduced-motion` : pas de défilement fluide, pas d'épinglage, particules figées, contenus visibles immédiatement.
- Navigation clavier, lien d'évitement, focus visible, menu mobile avec `inert`.
- Three.js est chargé à part, après le texte ; sans WebGL, le site reste complet.
