import parisImage from '../assets/paris.png'
import florenceImage from '../assets/florence.png'
import dinosaureImage from '../assets/dinosaure.png'
import parisVideo from '../assets/videos/paris.mp4'
import florenceVideo from '../assets/videos/florence.mp4'
import dinoVideo from '../assets/videos/dino.mp4'

export const destinations = [
  {
    id: 'belle-epoque-paris',
    slug: 'belle-epoque-paris',
    title: 'La Belle Époque à Paris',
    cardTitle: 'La Belle Époque à Paris',
    era: '1870 - 1914',
    image: parisImage,
    video: parisVideo,
    shortDescription:
      'Flânez sur les boulevards du Paris haussmannien, savourez l\'absinthe à Montmartre et assistez à la naissance de l\'art moderne.',
    tagline: 'La Ville Lumière à son apogée.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #4a3728 50%, #c9a227 100%)',
    accentColor: '#f8a519',
    history: `La Belle Époque fut un âge d'or d'optimisme, d'innovation et d'épanouissement artistique en France. De l'après-guerre franco-prussienne jusqu'au déclenchement de la Première Guerre mondiale, Paris se transforma en capitale culturelle du monde.

Les grands boulevards haussmanniens reliaient des quartiers nouvellement électrifiés. La tour Eiffel s'éleva en 1889. Les peintres impressionnistes défiaient les conventions dans les cafés de Montmartre. Le métro ouvrit ses premières lignes. C'était une ère de champagne, de cabarets et de la conviction que progrès et beauté pouvaient coexister.`,
    whatToExpect: [
      'Promenades nocturnes le long de la Seine sous les réverbères à gaz',
      'Visite privée du Salon des Indépendants avec les impressionnistes émergents',
      'Dîner chez Maxim\'s ou au Moulin Rouge avec spectacle de cancan',
      'Un trajet sur la toute nouvelle ligne 1 du Métropolitain',
      'Croissants du matin dans une boulangerie à l\'aube de la pâtisserie moderne',
    ],
    safetyNotes: [
      'Les combinaisons de déplacement temporel sont calibrées pour les conditions atmosphériques d\'avant 1914',
      'Évitez les manifestations politiques autour du procès Dreyfus',
      'Ne prévenez personne de la Grande Guerre à venir — protocoles anti-paradoxe en vigueur',
      'Consommation d\'absinthe limitée aux établissements approuvés par l\'agence',
    ],
    highlights: ['Inauguration de la tour Eiffel', 'Scène artistique de Montmartre', 'Exposition universelle de 1900'],
    duration: '3 à 7 jours recommandés',
    difficulty: 'Accessible aux débutants',
    priceRange: '€€€',
    faq: [
      {
        q: 'Vais-je comprendre le français ?',
        a: 'Nos implants neuro-linguistiques vous confèrent un français de Belle Époque courant, argot d\'époque inclus.',
      },
      {
        q: 'Puis-je rencontrer des artistes célèbres ?',
        a: 'Des rencontres organisées avec Monet, Toulouse-Lautrec et un jeune Picasso sont disponibles en option premium.',
      },
      {
        q: 'Que dois-je porter ?',
        a: 'Nous fournissons une garde-robe d\'époque authentique. Hauts-de-forme, bustles et canotiers inclus dans les forfaits standards.',
      },
    ],
    keywords: ['paris', 'belle epoque', 'belle époque', 'france', 'eiffel', 'montmartre', 'impressionniste', 'absinthe', 'art', '1870', '1914', 'ville lumière', 'moulin rouge', 'haussmann'],
  },
  {
    id: 'renaissance-florence',
    slug: 'renaissance-florence',
    title: 'Florence à la Renaissance',
    cardTitle: 'Florence à la Renaissance',
    era: '1440 - 1550',
    image: florenceImage,
    video: florenceVideo,
    shortDescription:
      'Parcourez les mêmes rues que Michel-Ange et Léonard de Vinci au sommet du génie humaniste et du mécénat des Médicis.',
    tagline: 'Là où l\'art, la science et l\'ambition se sont rencontrés.',
    gradient: 'linear-gradient(135deg, #1c1410 0%, #5c3d2e 40%, #d4a574 100%)',
    accentColor: '#e8b86d',
    history: `Florence aux XVe et XVIe siècles fut l'épicentre de la Renaissance — une renaissance de l'érudition classique, de la maîtrise artistique et de l'intrigue politique. Sous le mécénat des Médicis, la ville devint un laboratoire du potentiel humain.

Le dôme de Brunelleschi couronna la cathédrale. Botticelli peignit la Primavera. Michel-Ange sculpta le David. Léonard esquissa des machines volantes dans ses carnets. C'était un âge où les banquiers finançaient les génies, et où le génie remodelait le monde.`,
    whatToExpect: [
      'Visite guidée des Offices avant leur existence — assistez à la création des fresques',
      'Visite de l\'atelier de Michel-Ange pendant le travail sur le David',
      'Conférences du soir à l\'Académie platonicienne',
      'Jour de marché sur la Piazza della Signoria avec marchands d\'époque',
      'Coucher de soleil depuis le Piazzale Michelangelo, face au dôme inachevé',
    ],
    safetyNotes: [
      'La politique des Médicis est volatile — maintenez un statut d\'observateur neutre',
      'Protocoles peste actifs pour les fenêtres de 1476 et 1527',
      'Ne révélez pas de connaissances scientifiques futures à Léonard',
      'Chaussures d\'époque obligatoires — les pavés sont authentiques',
    ],
    highlights: ['Dévoilement du David', 'Cour des Médicis', 'Construction du dôme'],
    duration: '5 à 10 jours recommandés',
    difficulty: 'Modéré — terrain accidenté',
    priceRange: '€€€€',
    faq: [
      {
        q: 'Puis-je voir la chapelle Sixtine en cours de peinture ?',
        a: 'Le forfait chapelle Sixtine est une extension Rome séparée, mais nous proposons des excursions synchronisées à la journée.',
      },
      {
        q: 'La nourriture est-elle sûre ?',
        a: 'Nos filtres garantissent des repas conformes aux normes d\'hygiène modernes tout en préservant les saveurs authentiques de la Renaissance.',
      },
      {
        q: 'Rencontrerai-je les Médicis ?',
        a: 'Des rencontres avec Laurent le Magnifique sont disponibles pendant la fenêtre des années 1480, sous réserve de disponibilité de la cour.',
      },
    ],
    keywords: ['florence', 'renaissance', 'médicis', 'medici', 'michel-ange', 'michelangelo', 'léonard', 'leonardo', 'david', 'uffizi', 'italie', '1440', '1550', 'art', 'brunelleschi', 'botticelli'],
  },
  {
    id: 'dinosaur-extinction',
    slug: 'dinosaur-extinction',
    title: 'Les derniers jours des dinosaures',
    cardTitle: 'Les derniers jours des dinosaures',
    era: '232 - 234 MA',
    image: dinosaureImage,
    video: dinoVideo,
    shortDescription:
      'Assistez au dernier grand âge des géants — sauropodes imposants, prédateurs redoutables et ciel d\'avant l\'astéroïde.',
    tagline: 'Le dernier âge d\'or des géants de la Terre.',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a3a2a 50%, #4a6741 100%)',
    accentColor: '#7cb87c',
    history: `Le Crétacé supérieur, il y a environ 66 millions d'années, fut le crépuscule des dinosaures. Le Tyrannosaurus rex dominait l'Amérique du Nord. Des troupeaux de Triceratops broutaient les prairies de fougères. Des ptérosaures aux envergures de 10 mètres projetaient leur ombre sur des paysages volcaniques.

C'est la Terre telle qu'elle était — luxuriante, sauvage et totalement étrangère. Pas de villes, pas d'humains, pas de satellites. Seule la grandeur brute d'une planète gouvernée par les reptiles à l'apogée de leur règne de 165 millions d'années. Notre fenêtre temporelle capture les derniers siècles avant l'impact de Chicxulub qui changea tout.`,
    whatToExpect: [
      'Observation depuis des bunkers temporels renforcés pendant les migrations de troupeaux de Triceratops',
      'Relevés aériens (simulés par drone) au-dessus des plaines inondables du Crétacé',
      'Observation du ciel nocturne — zéro pollution lumineuse, constellations inconnues',
      'Enregistrement documentaire du comportement de chasse du T. rex',
      'Inventaire botanique de la flore préhistorique, dont cycades et ginkgo',
    ],
    safetyNotes: [
      'OBLIGATOIRE : Toutes les excursions se déroulent depuis des bunkers temporels de classe A',
      'Ne quittez jamais les enceintes protectrices — la mégafaune du Crétacé est mortelle',
      'Les niveaux d\'oxygène atmosphérique sont plus élevés — acclimatation requise (24 h)',
      'Ne collectez pas d\'échantillons biologiques — protocoles anti-contamination stricts',
      'L\'observation de l\'impact de l\'astéroïde n\'est PAS incluse dans les forfaits standards',
    ],
    highlights: ['Rencontre avec le T. rex', 'Volées de ptérosaures', 'Canopée de jungle préhistorique'],
    duration: '2 à 4 jours recommandés',
    difficulty: 'Avancé — briefing sécurité rigoureux requis',
    priceRange: '€€€€€',
    faq: [
      {
        q: 'Est-ce dangereux ?',
        a: 'Toute observation se fait depuis des bunkers temporels certifiés avec un taux de sécurité de 99,97 %. Le contact direct avec la mégafaune est strictement interdit.',
      },
      {
        q: 'Verrai-je l\'astéroïde ?',
        a: 'L\'événement d\'impact de Chicxulub est une expédition séparée, hautement restreinte. Les forfaits standards couvrent uniquement les fenêtres d\'avant impact.',
      },
      {
        q: 'Et les niveaux d\'oxygène ?',
        a: 'Nos combinaisons régulent l\'apport en oxygène. Une période d\'acclimatation obligatoire de 24 heures dans le bunker est requise avant l\'observation en surface.',
      },
    ],
    keywords: ['dinosaure', 'crétacé', 'cretace', 't-rex', 'tyrannosaurus', 'triceratops', 'préhistorique', 'prehistorique', 'extinction', 'astéroïde', 'asteroide', 'jurassique', 'mégafaune', 'megafaune', 'ptérosaure', 'pterosaure'],
  },
]

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug) ?? null
}

export function getDestinationById(id) {
  return destinations.find((d) => d.id === id) ?? null
}
