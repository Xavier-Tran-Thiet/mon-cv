// Tout le contenu du site, en français et en anglais.
// Pour modifier un texte, un chiffre ou un projet, c'est ici que ça se passe.

const BASE = import.meta.env.BASE_URL;

// Espaces insécables : fine pour les milliers, normale avant « : ? ! % » en français.
const NNBSP = ' ';
const NBSP = ' ';

export const profile = {
  name: 'Xavier Tran-Thiet',
  email: 'xaviertt@hotmail.fr',
  linkedin: 'https://www.linkedin.com/in/xavier-tran-thiet-70175480',
  cv: {
    fr: `${BASE}cv/CV_Xavier_Tran-Thiet_FR.pdf`,
    en: `${BASE}cv/CV_Xavier_Tran-Thiet_EN.pdf`,
  },
};

export const clients = [
  'Carac',
  'CFDP',
  'Daiichi Sankyo',
  'Chorum',
  'CBP',
  'Intégrance',
  'IPECA',
  'MedOK',
  'ALK',
  'Margo',
  'Estaca',
  'Entraid',
  'La Revue du Praticien',
  'Sparadrap',
  'AIS',
  'Feï Paris',
  'MeilleurTaux',
];

// Stack mise en avant (logos Simple Icons, voir components/TechLogo.jsx).
export const mainStack = ['react', 'vite', 'python', 'docker', 'postgresql'];

export const content = {
  fr: {
    meta: {
      title: 'Xavier Tran-Thiet · Production digitale et IA',
    },
    nav: {
      links: [
        { id: 'projets', label: 'Projets' },
        { id: 'methode', label: 'Méthode' },
        { id: 'competences', label: 'Compétences' },
        { id: 'parcours', label: 'Parcours' },
      ],
      contact: 'Me contacter',
      menu: 'Menu',
      close: 'Fermer',
      theme: { toLight: 'Passer en thème clair', toDark: 'Passer en thème sombre' },
      lang: 'Langue',
      home: 'Retour en haut de page',
    },
    hero: {
      eyebrow: 'Production digitale & transformation IA',
      sub: `15 ans à piloter des projets web. Aujourd’hui, je fais entrer l’IA dans la production, en l’éprouvant d’abord moi-même.`,
      primary: 'Voir les projets',
      secondary: 'Télécharger le CV',
    },
    stats: [
      { value: 15, label: 'ans dans le digital, tous chez Imagence' },
      { value: 20, prefix: '~', label: 'projets pilotés en parallèle' },
      { value: 6, label: 'produits développés en assistance IA en 2026' },
      { value: 3700, suffix: '+', label: 'tests automatisés écrits sur ces produits' },
    ],
    profile: [
      { t: 'Responsable de production chez Imagence, je pilote une vingtaine de projets en parallèle pour la mutualité, la santé et la pharma, avec des équipes réparties sur plusieurs pays. Depuis 2026, je conduis ' },
      { t: 'la transformation IA de l’agence.', hl: true },
      { t: ' Je suis resté opérationnel sur le code, ce qui me permet de ' },
      { t: 'mesurer le gain avant de l’imposer.', hl: true },
    ],
    method: {
      title: 'Éprouver avant de généraliser',
      intro: 'Ma démarche pour faire adopter l’IA par une équipe de production.',
      steps: [
        {
          verb: 'Éprouver',
          text: 'Je livre d’abord des produits moi-même en assistance IA, sur de vrais besoins, pour connaître le débit atteignable et ses limites.',
        },
        {
          verb: 'Mesurer',
          text: 'Je compare les tests, les délais et la qualité obtenus avant de recommander un outil ou un modèle aux équipes.',
        },
        {
          verb: 'Outiller',
          text: 'Assistants IA déployés à tous les collaborateurs, installeurs en un clic et guides pensés pour les profils non techniques.',
        },
        {
          verb: 'Gouverner',
          text: 'Identité, traçabilité et lecture seule par défaut. Chaque écriture faite par l’IA est encadrée, journalisée et réversible.',
        },
      ],
    },
    projects: {
      eyebrow: 'Produits 2026',
      title: 'Six produits conçus et codés cette année',
      sub: 'Du cadrage au code, en assistance IA.',
      items: [
        {
          id: 'tender',
          name: 'Tender',
          date: 'Août → sept. 2026',
          context: 'Produit personnel, en développement',
          pitch: 'Un SaaS multi-tenant qui surveille les appels d’offres publics, les qualifie et aide à rédiger les réponses avec l’IA.',
          detail: 'Cinq sources de veille (BOAMP, TED, DECP…), un scoring explicable pour décider d’y aller ou non, et le remplissage du cadre de réponse imposé, dans le format de l’acheteur. Chaque organisation est isolée par la row-level security de PostgreSQL.',
          metrics: [
            [`1${NNBSP}938`, 'tests backend'],
            ['81', 'tables au modèle de données'],
            [`91,6${NBSP}%`, 'de couverture de tests'],
          ],
          stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite', 'TypeScript'],
        },
        {
          id: 'michel',
          name: 'Michel',
          date: 'Sept. 2026',
          context: 'Produit personnel, en développement',
          pitch: 'Un outil de gestion d’agence pensé pour l’IA, qui réunit CRM, devis, planning, temps passés et comptes rendus d’activité.',
          detail: 'L’assistant lit les données seul. Toute modification devient une proposition signée qu’une personne valide, journalisée et réversible. Il répond aussi dans Slack.',
          metrics: [
            ['~600', 'tests automatisés'],
            ['74', 'outils exposés à l’IA'],
            ['26', 'tables PostgreSQL'],
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Docker'],
        },
        {
          id: 'golum',
          name: 'Golum',
          date: 'Sept. 2026',
          context: 'Produit Imagence, pilote sur imagence.com',
          pitch: 'Un webmaster IA. On demande une modification en français, un agent Claude la réalise, et rien ne part en ligne sans validation humaine.',
          detail: 'L’agent travaille dans un conteneur Docker jetable et durci, sans jamais détenir d’identifiants. Aperçu signé, publication et retour arrière en un clic.',
          metrics: [
            ['259', 'tests automatisés'],
            ['62', 'routes API'],
            ['19', 'scénarios de menace modélisés'],
          ],
          stack: ['Python', 'FastAPI', 'Claude Agent SDK', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
        {
          id: 'imdata',
          name: 'IM.data',
          date: 'Juin → sept. 2026',
          context: 'Produit Imagence, repris en équipe',
          pitch: 'Une plateforme IA souveraine, installée chez le client, pour interroger un corpus documentaire gouverné. Chaque réponse cite ses sources.',
          detail: 'SSO Entra ID, OIDC, SAML et SCIM, MFA, contrôle d’accès par rôles, secrets chiffrés au repos et journal d’audit chaîné, infalsifiable.',
          metrics: [
            ['252', 'commits en trois mois'],
            ['91', 'connecteurs'],
            ['6', 'fournisseurs d’IA'],
          ],
          stack: ['React', 'Vite', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        },
        {
          id: 'teamleader',
          name: 'Connecteur Teamleader',
          date: 'Mai → sept. 2026',
          context: 'Déployé à tous les collaborateurs',
          pitch: 'Un serveur MCP qui permet à Claude de lire et d’écrire dans le CRM de l’agence, un outil sans API publique.',
          detail: 'API interne rétro-ingénierée, double verrou sur les écritures, mode simulation, journal d’audit, et un installeur Windows en un clic pour les profils non techniques.',
          metrics: [
            ['77', 'outils MCP'],
            ['9', 'modules du CRM couverts'],
            ['90', 'tests unitaires'],
          ],
          stack: ['Python', 'FastMCP', 'httpx', 'Pydantic', 'Tailscale'],
        },
        {
          id: 'meilleurtaux',
          name: 'MeilleurTaux',
          date: 'Juin 2026',
          context: 'Migration pour un client',
          pitch: 'La réécriture d’une application de courtage immobilier, de WinDev vers Python et React.',
          detail: 'Douze modules WLanguage portés à l’identique (TAEG, PTZ, mensualités), des outils maison pour extraire le code des fichiers binaires WinDev, et un schéma de base reconstitué.',
          metrics: [
            ['720', 'tests automatisés'],
            [`12${NNBSP}500`, 'lignes WLanguage portées'],
            ['18', 'endpoints API'],
          ],
          stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
      ],
    },
    more: {
      title: 'Aussi en 2026',
      open: 'Afficher le détail',
      items: [
        {
          id: 'fei',
          name: 'Feï Paris',
          tag: 'Client',
          pitch: 'Refonte e-commerce headless d’une marque de cosmétiques naturels',
          detail: 'Vitrine Next.js devant une boutique WooCommerce, paiement Stripe, Apple Pay et Google Pay, retrait en point relais Colissimo et plan de 113 redirections. En ligne depuis le 3 septembre 2026.',
          stack: ['Next.js', 'React', 'TypeScript', 'WooCommerce', 'Stripe', 'Docker'],
        },
        {
          id: 'imagence',
          name: 'imagence.com',
          tag: 'Agence',
          pitch: 'Le site de l’agence, de WordPress à React',
          detail: 'Site bilingue pensé pour les moteurs de recherche et les assistants IA (JSON-LD, llms.txt, redirections), mis en conformité RGAA et pré-compressé.',
          stack: ['React', 'Vite', 'TypeScript', 'i18next', 'PHP'],
        },
        {
          id: 'ridewith',
          name: 'RideWith',
          tag: 'Projet perso',
          pitch: 'Une appli pour organiser des balades moto en groupe',
          detail: 'Cartes MapLibre, suivi GPS en direct, PWA installable et back-office. L’audit de pré-production, mené par sept relecteurs IA en parallèle, a trouvé et corrigé un contournement d’authentification.',
          stack: ['Next.js', 'GraphQL', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
        },
        {
          id: 'takuzu',
          name: 'Takuzu',
          tag: 'Projet perso',
          pitch: 'Un jeu de logique avec son propre générateur de grilles',
          detail: `Le générateur garantit une solution unique. Une réécriture par masques de bits l’a rendu 30 à 100 fois plus rapide. Une grille 16×16 experte passe de 230${NBSP}s à moins de 3${NBSP}s.`,
          stack: ['React', 'Vite', 'Python', 'FastAPI', 'SQLite'],
        },
      ],
    },
    skills: {
      title: 'La production, l’IA et le code',
      stack: {
        title: 'Stack de prédilection',
        text: 'React et Vite pour l’interface, Python et FastAPI pour l’API, PostgreSQL pour les données, le tout livré dans Docker.',
        alsoLabel: 'Aussi au quotidien',
        also: ['TypeScript', 'FastAPI', 'Next.js', '.NET / Orchard Core', 'Drupal', 'WordPress', 'Azure DevOps', 'Claude Code', 'Figma', 'Jira'],
      },
      transfo: {
        title: 'Transformation IA',
        text: 'Stratégie d’adoption, conduite du changement, déploiement d’assistants aux collaborateurs, gouvernance des accès et traçabilité des usages.',
      },
      applied: {
        title: 'IA appliquée',
        chips: ['Serveurs MCP', 'Agents Claude', 'RAG à sources tracées', 'Pipelines multi-LLM', 'Sandboxing d’agents', 'Choix et évaluation de modèles'],
      },
      production: {
        title: 'Pilotage de production',
        text: 'Portefeuille multi-projets, équipes distribuées à l’international, chiffrage, suivi budgétaire, assurance qualité, recrutement technique.',
      },
      product: {
        title: 'Ingénierie produit',
        text: 'Cadrage, spécifications, ADR, modèle de données, architecture applicative, sécurité et RGPD dès la conception.',
      },
      sectors: {
        title: 'Secteurs',
        items: ['Mutuelles et protection sociale', 'Santé et pharma', 'E-commerce', 'Édition', 'Enseignement supérieur'],
        langTitle: 'Langues',
        langs: [
          ['Français', 'langue maternelle'],
          ['Anglais', 'professionnel complet'],
          ['Italien', 'intermédiaire'],
        ],
      },
    },
    clients: {
      title: 'Clients accompagnés chez Imagence',
    },
    timeline: {
      eyebrow: 'Parcours',
      title: 'Quinze ans, une agence, cinq métiers',
      roles: [
        {
          year: '2023',
          dates: 'janv. 2023 → aujourd’hui',
          title: 'Responsable de production digitale, transformation et adoption de l’IA',
          place: 'Imagence, Puteaux',
          text: 'Un portefeuille d’une vingtaine de projets, des équipes réparties sur plusieurs pays, et la transformation IA de l’agence depuis 2026.',
        },
        {
          year: '2019',
          dates: 'juil. 2019 → janv. 2023',
          title: 'Chef de projet',
          place: 'Imagence, Puteaux',
          text: 'Refontes lourdes dans la protection sociale et la santé (Chorum, CBP, Intégrance, ALK, IPECA), du recueil du besoin à la mise en production.',
        },
        {
          year: '2018',
          dates: 'oct. 2018 → janv. 2023',
          title: 'Lead front-end',
          place: 'En cumul avec le poste de chef de projet',
          text: 'Référent technique front de l’agence : frameworks, standards de code, revues, encadrement des développeurs internes et offshore.',
        },
        {
          year: '2013',
          dates: 'sept. 2013 → oct. 2018',
          title: 'Développeur front-end et webdesigner',
          place: 'Imagence, Boulogne-Billancourt',
          text: 'Conception et intégration de sites et d’interfaces, déclinaison de maquettes avec les équipes créa.',
        },
        {
          year: '2010',
          dates: 'sept. 2010 → oct. 2012',
          title: 'Webmaster',
          place: 'Imagence, Boulogne-Billancourt',
          text: 'Administration et animation de sites clients, production de contenus, intégration HTML et CSS.',
        },
      ],
      eduTitle: 'Formation',
      education: [
        { dates: '2013 → 2015', school: 'Doranco', text: 'École Supérieure des Technologies Créatives, technologies web et création numérique' },
        { dates: '2010 → 2012', school: 'MJM Graphic Design', text: 'Design graphique et webdesign' },
      ],
    },
    contact: {
      title: `Vous voulez faire entrer l’IA dans votre production${NBSP}?`,
      sub: 'Pour un poste, une mission ou un échange sur l’IA en production, écrivez-moi.',
      copy: 'Copier l’adresse',
      copied: 'Adresse copiée',
      linkedin: 'LinkedIn',
      cvFr: 'CV en français',
      cvEn: 'CV in English',
    },
    footer: {
      built: 'Conçu et développé avec React, Vite, Three.js et GSAP.',
      top: 'Haut de page',
    },
  },

  en: {
    meta: {
      title: 'Xavier Tran-Thiet · Digital production and AI',
    },
    nav: {
      links: [
        { id: 'projets', label: 'Projects' },
        { id: 'methode', label: 'Method' },
        { id: 'competences', label: 'Skills' },
        { id: 'parcours', label: 'Career' },
      ],
      contact: 'Get in touch',
      menu: 'Menu',
      close: 'Close',
      theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
      lang: 'Language',
      home: 'Back to top',
    },
    hero: {
      eyebrow: 'Digital production & AI transformation',
      sub: '15 years running web projects. Now I bring AI into production, after proving it on my own work first.',
      primary: 'See the projects',
      secondary: 'Download CV',
    },
    stats: [
      { value: 15, label: 'years in digital, all at Imagence' },
      { value: 20, prefix: '~', label: 'projects run in parallel' },
      { value: 6, label: 'AI-assisted products built in 2026' },
      { value: 3700, suffix: '+', label: 'automated tests written for them' },
    ],
    profile: [
      { t: 'As production manager at Imagence, I run some twenty projects in parallel for mutual insurers, healthcare and pharma, with teams spread across several countries. Since 2026 I have been leading ' },
      { t: 'the agency’s AI transformation.', hl: true },
      { t: ' I have stayed hands-on with code, so I can ' },
      { t: 'measure the gain before mandating it.', hl: true },
    ],
    method: {
      title: 'Prove it before rolling it out',
      intro: 'How I get a production team to adopt AI.',
      steps: [
        {
          verb: 'Prove',
          text: 'I first ship products myself with AI assistance, on real needs, to learn the achievable throughput and its limits.',
        },
        {
          verb: 'Measure',
          text: 'I compare tests, lead times and quality before recommending a tool or a model to the teams.',
        },
        {
          verb: 'Equip',
          text: 'AI assistants rolled out to all staff, one-click installers and guides written for non-technical people.',
        },
        {
          verb: 'Govern',
          text: 'Identity, traceability and read-only by default. Every write made by the AI is scoped, logged and reversible.',
        },
      ],
    },
    projects: {
      eyebrow: '2026 products',
      title: 'Six products designed and built this year',
      sub: 'From scoping to code, with AI assistance.',
      items: [
        {
          id: 'tender',
          name: 'Tender',
          date: 'Aug → Sep 2026',
          context: 'Personal product, in development',
          pitch: 'A multi-tenant SaaS that watches public tenders, qualifies them and helps draft the responses with AI.',
          detail: 'Five tender feeds (BOAMP, TED, DECP…), explainable go/no-go scoring, and in-place filling of the buyer’s own response template. Each organization is isolated by PostgreSQL row-level security.',
          metrics: [
            ['1,938', 'backend tests'],
            ['81', 'tables in the data model'],
            ['91.6%', 'test coverage'],
          ],
          stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite', 'TypeScript'],
        },
        {
          id: 'michel',
          name: 'Michel',
          date: 'Sep 2026',
          context: 'Personal product, in development',
          pitch: 'An AI-native agency management tool covering CRM, quotes, planning, timesheets and activity reports.',
          detail: 'The assistant reads data on its own. Any change becomes a signed proposal that a person approves, logged and reversible. It also answers in Slack.',
          metrics: [
            ['~600', 'automated tests'],
            ['74', 'tools exposed to the AI'],
            ['26', 'PostgreSQL tables'],
          ],
          stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Docker'],
        },
        {
          id: 'golum',
          name: 'Golum',
          date: 'Sep 2026',
          context: 'Imagence product, piloted on imagence.com',
          pitch: 'An AI webmaster. You ask for a change in plain language, a Claude agent makes it, and nothing goes live without human approval.',
          detail: 'The agent runs in a throwaway, hardened Docker container and never holds credentials. Signed previews, one-click publish and rollback.',
          metrics: [
            ['259', 'automated tests'],
            ['62', 'API routes'],
            ['19', 'threat scenarios modeled'],
          ],
          stack: ['Python', 'FastAPI', 'Claude Agent SDK', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
        {
          id: 'imdata',
          name: 'IM.data',
          date: 'Jun → Sep 2026',
          context: 'Imagence product, now team-owned',
          pitch: 'A sovereign AI platform, installed on the client’s premises, for querying a governed document corpus. Every answer cites its sources.',
          detail: 'Entra ID, OIDC, SAML and SCIM sign-on, MFA, role-based access, secrets encrypted at rest and a hash-chained, tamper-evident audit log.',
          metrics: [
            ['252', 'commits in three months'],
            ['91', 'connectors'],
            ['6', 'AI providers'],
          ],
          stack: ['React', 'Vite', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        },
        {
          id: 'teamleader',
          name: 'Teamleader connector',
          date: 'May → Sep 2026',
          context: 'Rolled out to all staff',
          pitch: 'An MCP server that lets Claude read and write the agency’s CRM, a tool with no public API.',
          detail: 'Reverse-engineered internal API, two independent locks on writes, dry-run mode, audit log, and a one-click Windows installer for non-technical staff.',
          metrics: [
            ['77', 'MCP tools'],
            ['9', 'CRM modules covered'],
            ['90', 'unit tests'],
          ],
          stack: ['Python', 'FastMCP', 'httpx', 'Pydantic', 'Tailscale'],
        },
        {
          id: 'meilleurtaux',
          name: 'MeilleurTaux',
          date: 'Jun 2026',
          context: 'Migration for a client',
          pitch: 'The rewrite of a mortgage brokerage application, from WinDev to Python and React.',
          detail: 'Twelve WLanguage modules ported one-to-one (APR, zero-rate loans, repayments), in-house tools to extract code from WinDev binary files, and a rebuilt database schema.',
          metrics: [
            ['720', 'automated tests'],
            ['12,500', 'lines of WLanguage ported'],
            ['18', 'API endpoints'],
          ],
          stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite', 'Docker'],
        },
      ],
    },
    more: {
      title: 'Also in 2026',
      open: 'Show details',
      items: [
        {
          id: 'fei',
          name: 'Feï Paris',
          tag: 'Client',
          pitch: 'Headless e-commerce rebuild for a natural cosmetics brand',
          detail: 'A Next.js storefront in front of a WooCommerce shop, Stripe, Apple Pay and Google Pay checkout, Colissimo pickup points and a 113-redirect migration plan. Live since 3 September 2026.',
          stack: ['Next.js', 'React', 'TypeScript', 'WooCommerce', 'Stripe', 'Docker'],
        },
        {
          id: 'imagence',
          name: 'imagence.com',
          tag: 'Agency',
          pitch: 'The agency website, from WordPress to React',
          detail: 'A bilingual site built for search engines and AI assistants (JSON-LD, llms.txt, redirects), brought to RGAA accessibility compliance and pre-compressed.',
          stack: ['React', 'Vite', 'TypeScript', 'i18next', 'PHP'],
        },
        {
          id: 'ridewith',
          name: 'RideWith',
          tag: 'Side project',
          pitch: 'An app for organizing group motorcycle rides',
          detail: 'MapLibre maps, live GPS tracking, an installable PWA and a back office. The pre-production audit, run by seven parallel AI reviewers, found and fixed an authentication bypass.',
          stack: ['Next.js', 'GraphQL', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
        },
        {
          id: 'takuzu',
          name: 'Takuzu',
          tag: 'Side project',
          pitch: 'A logic puzzle game with its own grid generator',
          detail: 'The generator guarantees a unique solution. A bitmask rewrite made it 30 to 100 times faster. An expert 16×16 grid went from 230 s to under 3 s.',
          stack: ['React', 'Vite', 'Python', 'FastAPI', 'SQLite'],
        },
      ],
    },
    skills: {
      title: 'Production, AI and code',
      stack: {
        title: 'Favorite stack',
        text: 'React and Vite for the interface, Python and FastAPI for the API, PostgreSQL for the data, all shipped in Docker.',
        alsoLabel: 'Also in daily use',
        also: ['TypeScript', 'FastAPI', 'Next.js', '.NET / Orchard Core', 'Drupal', 'WordPress', 'Azure DevOps', 'Claude Code', 'Figma', 'Jira'],
      },
      transfo: {
        title: 'AI transformation',
        text: 'Adoption strategy, change management, rolling out assistants to staff, access governance and usage traceability.',
      },
      applied: {
        title: 'Applied AI',
        chips: ['MCP servers', 'Claude agents', 'Source-traced RAG', 'Multi-LLM pipelines', 'Agent sandboxing', 'Model selection and evaluation'],
      },
      production: {
        title: 'Production management',
        text: 'Multi-project portfolio, internationally distributed teams, estimates, budget tracking, quality assurance, technical hiring.',
      },
      product: {
        title: 'Product engineering',
        text: 'Scoping, specifications, ADRs, data modeling, application architecture, security and GDPR by design.',
      },
      sectors: {
        title: 'Sectors',
        items: ['Mutual insurance and social protection', 'Healthcare and pharma', 'E-commerce', 'Publishing', 'Higher education'],
        langTitle: 'Languages',
        langs: [
          ['French', 'native'],
          ['English', 'full professional'],
          ['Italian', 'intermediate'],
        ],
      },
    },
    clients: {
      title: 'Clients I have worked with at Imagence',
    },
    timeline: {
      eyebrow: 'Career',
      title: 'Fifteen years, one agency, five roles',
      roles: [
        {
          year: '2023',
          dates: 'Jan 2023 → present',
          title: 'Digital Production Manager, AI transformation and adoption',
          place: 'Imagence, Puteaux',
          text: 'A portfolio of some twenty projects, teams spread across several countries, and the agency’s AI transformation since 2026.',
        },
        {
          year: '2019',
          dates: 'Jul 2019 → Jan 2023',
          title: 'Project Manager',
          place: 'Imagence, Puteaux',
          text: 'Major redesigns in social protection and healthcare (Chorum, CBP, Intégrance, ALK, IPECA), from requirements to go-live.',
        },
        {
          year: '2018',
          dates: 'Oct 2018 → Jan 2023',
          title: 'Lead Front-End Developer',
          place: 'Alongside the project manager role',
          text: 'Front-end technical lead for the agency: frameworks, coding standards, reviews, mentoring in-house and offshore developers.',
        },
        {
          year: '2013',
          dates: 'Sep 2013 → Oct 2018',
          title: 'Front-End Developer and Web Designer',
          place: 'Imagence, Boulogne-Billancourt',
          text: 'Design and integration of websites and interfaces, adapting mock-ups with the creative teams.',
        },
        {
          year: '2010',
          dates: 'Sep 2010 → Oct 2012',
          title: 'Webmaster',
          place: 'Imagence, Boulogne-Billancourt',
          text: 'Running client websites, content production, HTML and CSS integration.',
        },
      ],
      eduTitle: 'Education',
      education: [
        { dates: '2013 → 2015', school: 'Doranco', text: 'École Supérieure des Technologies Créatives, web technologies and digital design' },
        { dates: '2010 → 2012', school: 'MJM Graphic Design', text: 'Graphic design and web design' },
      ],
    },
    contact: {
      title: 'Want to bring AI into your delivery?',
      sub: 'For a role, an assignment or a conversation about AI in production, drop me a line.',
      copy: 'Copy address',
      copied: 'Address copied',
      linkedin: 'LinkedIn',
      cvFr: 'CV en français',
      cvEn: 'CV in English',
    },
    footer: {
      built: 'Designed and built with React, Vite, Three.js and GSAP.',
      top: 'Back to top',
    },
  },
};
