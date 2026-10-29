export type CategoryId =
  | 'cosmic'
  | 'civilization'
  | 'philosophy'
  | 'war'
  | 'science'
  | 'culture'
  | 'person';

export type EraId =
  | 'primordial'
  | 'ancient'
  | 'classical'
  | 'renaissance'
  | 'revolutions'
  | 'modern';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  shortLabel: string;
  color: string;
  glowColor: string;
  bgBadge: string;
  description: string;
}

export interface EraMeta {
  id: EraId;
  title: string;
  subtitle: string;
  timeSpan: string;
  color: string;
  ambientHex: string;
  earthState: 'nebula' | 'molten' | 'ancient' | 'imperial' | 'industrial' | 'cyber';
  startT: number; // 0 to 1 along the cosmic river
  endT: number;
  description: string;
}

export interface HistoricalNode {
  id: string;
  title: string;
  subtitle: string;
  dateDisplay: string;
  yearNumeric: number; // Negative for BCE / Billions of years ago, positive for CE
  era: EraId;
  category: CategoryId;
  riverT: number; // Normalized position along the 3D Cosmic Time-River (0.01 to 0.99)
  coordinates?: {
    lat: number;
    lng: number;
    locationName: string;
  };
  impactScore: number; // 1 - 100
  universalImpact: string;
  summary: string;
  deepDive: string[];
  quote?: {
    text: string;
    author: string;
  };
  keyFigures: {
    name: string;
    role: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  causes: string[]; // IDs of earlier nodes that caused/inspired this
  effects: string[]; // IDs of later nodes triggered by this
  philosophicalCore?: string;
}

export const CATEGORIES: Record<CategoryId, CategoryMeta> = {
  cosmic: {
    id: 'cosmic',
    label: 'Cosmic & Planetary Origins',
    shortLabel: 'Cosmos & Life',
    color: '#94a3b8',
    glowColor: 'rgba(148, 163, 184, 0.35)',
    bgBadge: 'bg-slate-800/90 text-slate-200 border-slate-600/60',
    description: 'Astrophysical origins, planetary formation, and biological leaps that made consciousness possible.',
  },
  civilization: {
    id: 'civilization',
    label: 'Civilizations & Revolutions',
    shortLabel: 'Civilizations',
    color: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.35)',
    bgBadge: 'bg-amber-950/80 text-amber-200 border-amber-700/50',
    description: 'Rise and fall of empires, constitutional revolutions, and the architecture of human society.',
  },
  philosophy: {
    id: 'philosophy',
    label: 'Philosophy & Human Thought',
    shortLabel: 'Philosophy',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    bgBadge: 'bg-sky-950/80 text-sky-200 border-sky-700/50',
    description: 'Paradigm-shattering ideas on ethics, metaphysics, governance, and the nature of reality.',
  },
  war: {
    id: 'war',
    label: 'Epochal Wars & Geopolitics',
    shortLabel: 'Wars & Conflict',
    color: '#e11d48',
    glowColor: 'rgba(225, 29, 72, 0.35)',
    bgBadge: 'bg-rose-950/80 text-rose-200 border-rose-700/50',
    description: 'Turning points of conflict that redrew world borders, toppled dynasties, and forged new eras.',
  },
  science: {
    id: 'science',
    label: 'Science, Physics & AI',
    shortLabel: 'Science & AI',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    bgBadge: 'bg-emerald-950/80 text-emerald-200 border-emerald-700/50',
    description: 'Breakthroughs in mathematics, physics, engineering, and artificial intelligence.',
  },
  culture: {
    id: 'culture',
    label: 'Art, Literature & Cultural Renaissances',
    shortLabel: 'Art & Culture',
    color: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    bgBadge: 'bg-purple-950/80 text-purple-200 border-purple-700/50',
    description: 'Masterpieces of human expression, visual art, symphonies, and cultural movements.',
  },
  person: {
    id: 'person',
    label: 'Historical Figures & Pioneers',
    shortLabel: 'Key Figures',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    bgBadge: 'bg-yellow-950/80 text-yellow-200 border-yellow-700/50',
    description: 'Thinkers, leaders, scientists, and creators whose decisions shaped history.',
  },
};

export const ERAS: EraMeta[] = [
  {
    id: 'primordial',
    title: 'I. Cosmic Origins',
    subtitle: 'Singularity to First Life',
    timeSpan: '13.8 BYA – 300k BCE',
    color: '#94a3b8',
    ambientHex: '#1e293b',
    earthState: 'molten',
    startT: 0.0,
    endT: 0.19,
    description: 'Spacetime expands, stars forge heavy elements, Earth forms its oceans, and biological life begins.',
  },
  {
    id: 'ancient',
    title: 'II. Ancient Civilizations',
    subtitle: 'Agriculture, Writing & Law',
    timeSpan: '10,000 – 600 BCE',
    color: '#d97706',
    ambientHex: '#451a03',
    earthState: 'ancient',
    startT: 0.19,
    endT: 0.33,
    description: 'Humanity domesticates grain, builds the first cities in Mesopotamia, invents writing, and codifies law.',
  },
  {
    id: 'classical',
    title: 'III. Classical Antiquity',
    subtitle: 'Philosophy & World Empires',
    timeSpan: '600 BCE – 500 CE',
    color: '#38bdf8',
    ambientHex: '#083344',
    earthState: 'imperial',
    startT: 0.33,
    endT: 0.52,
    description: 'Across Greece, India, Rome, and China, thinkers establish foundational philosophy, democracy, and empires.',
  },
  {
    id: 'renaissance',
    title: 'IV. Renaissance & Scientific Dawn',
    subtitle: 'Printing, Exploration & Physics',
    timeSpan: '500 – 1750 CE',
    color: '#10b981',
    ambientHex: '#064e3b',
    earthState: 'imperial',
    startT: 0.52,
    endT: 0.70,
    description: 'Scholarship flourishes from Baghdad to Florence, movable type democratizes books, and modern science awakens.',
  },
  {
    id: 'revolutions',
    title: 'V. Age of Revolutions',
    subtitle: 'Enlightenment & Industry',
    timeSpan: '1750 – 1914 CE',
    color: '#e11d48',
    ambientHex: '#4c0519',
    earthState: 'industrial',
    startT: 0.70,
    endT: 0.85,
    description: 'Constitutional revolutions topple monarchies, steam mechanizes industry, and modern political thought emerges.',
  },
  {
    id: 'modern',
    title: 'VI. Atomic, Space & AI Age',
    subtitle: 'Quantum Physics to Synthetic Mind',
    timeSpan: '1914 – Present',
    color: '#60a5fa',
    ambientHex: '#0c4a6e',
    earthState: 'cyber',
    startT: 0.85,
    endT: 1.0,
    description: 'Humanity unlocks the atom, walks on the Moon, wires the planet with the internet, and builds artificial intelligence.',
  },
];

export const HISTORICAL_NODES: HistoricalNode[] = [
  // ================= ERA I: COSMIC DAWN =================
  {
    id: 'big-bang',
    title: 'The Big Bang Singularity',
    subtitle: 'Birth of Spacetime, Matter & Energy',
    dateDisplay: '13.8 Billion Years Ago',
    yearNumeric: -13800000000,
    era: 'primordial',
    category: 'cosmic',
    riverT: 0.02,
    impactScore: 100,
    universalImpact: 'Created the fundamental constants of physics, time, space, and every quark that would ever form stars, planets, and minds.',
    summary: 'From an infinitely dense quantum fluctuation, the universe expands faster than light during cosmic inflation, cooling to form the first hydrogen and helium nuclei.',
    deepDive: [
      'Within the first 10⁻³² seconds, cosmic inflation smoothed out quantum irregularities that later seeded all galactic superclusters.',
      'At 380,000 years post-ignition, photons decoupled from plasma—leaving behind the Cosmic Microwave Background (CMB) radiation still detectable today.',
      'Had the strong nuclear force varied by even 0.5%, carbon could never have formed inside stars, rendering a lifeless cosmos.'
    ],
    quote: {
      text: 'The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.',
      author: 'Carl Sagan'
    },
    keyFigures: [
      { name: 'Georges Lemaître', role: 'Proposed Primeval Atom hypothesis (1927)' },
      { name: 'Edwin Hubble', role: 'Proved galactic expansion (1929)' }
    ],
    stats: [
      { label: 'Initial Temp', value: '10³² Kelvin' },
      { label: 'Observable Span', value: '93 Billion Light-Years' },
      { label: 'Causality Score', value: '∞ / Absolute Origin' }
    ],
    causes: [],
    effects: ['first-stars', 'earth-formation', 'relativity'],
    philosophicalCore: 'Why is there something rather than nothing? The ultimate metaphysical boundary where physics meets ontology.'
  },
  {
    id: 'first-stars',
    title: 'Ignition of First Stars & Supernovae',
    subtitle: 'Cosmic Alchemy & Heavy Element Forges',
    dateDisplay: '13.5 Billion Years Ago',
    yearNumeric: -13500000000,
    era: 'primordial',
    category: 'cosmic',
    riverT: 0.055,
    impactScore: 98,
    universalImpact: 'Cooked carbon, oxygen, iron, and gold in stellar cores—transforming a sterile hydrogen universe into a chemical laboratory.',
    summary: 'Gravity pulls primordial hydrogen clouds into giant Population III stars. Their explosive deaths seed the cosmos with heavy elements required for rocky planets and DNA.',
    deepDive: [
      'Early Population III stars were hundreds of times more massive than our Sun, burning fiercely in just a few million years.',
      'Iron in your blood and calcium in your bones were literally fused inside dying supergiant stars billions of years before our Solar System existed.'
    ],
    keyFigures: [
      { name: 'Fred Hoyle', role: 'Pioneered Stellar Nucleosynthesis theory' },
      { name: 'Cecilia Payne-Gaposchkin', role: 'Discovered stars are composed of Hydrogen & Helium' }
    ],
    stats: [
      { label: 'Core Fusion Temp', value: '100 Million K' },
      { label: 'Elements Forged', value: 'Carbon to Iron (Z=26)' }
    ],
    causes: ['big-bang'],
    effects: ['earth-formation'],
    philosophicalCore: 'Death as creative transformation: the destruction of giant stars was the prerequisite for biological life.'
  },
  {
    id: 'earth-formation',
    title: 'Formation of Earth & Abiogenesis',
    subtitle: 'Accretion of the Pale Blue Dot & First Genetic Code',
    dateDisplay: '4.5 – 3.8 Billion Years Ago',
    yearNumeric: -4500000000,
    era: 'primordial',
    category: 'cosmic',
    riverT: 0.09,
    coordinates: { lat: 0, lng: -30, locationName: 'Primordial Hydrothermal Oceans' },
    impactScore: 99,
    universalImpact: 'Matter organized itself into self-replicating RNA/DNA molecules—crossing the threshold from chemistry to biology.',
    summary: 'Born from the protoplanetary disk of the young Sun and stabilized by the Moon-forming Theia impact, Earth cools to form oceans where alkaline hydrothermal vents spark the first living cells.',
    deepDive: [
      'A Mars-sized proto-planet named Theia collided with proto-Earth, ejecting debris that formed our Moon—stabilizing Earth’s axial tilt and climate.',
      'Deep-sea hydrothermal vents provided natural proton gradients, allowing inorganic geochemistry to transition into organic metabolism and genetic heredity.'
    ],
    keyFigures: [
      { name: 'LUCA', role: 'Last Universal Common Ancestor of all life on Earth' }
    ],
    stats: [
      { label: 'Earth Age', value: '4.54 Billion Years' },
      { label: 'First Life', value: '~3.8 Billion Years Ago' }
    ],
    causes: ['big-bang', 'first-stars'],
    effects: ['cambrian-explosion', 'evolution-darwin'],
    philosophicalCore: 'Emergence: How blind thermodynamic entropy locally reverses itself to create sentient complexity.'
  },
  {
    id: 'cambrian-explosion',
    title: 'The Cambrian Explosion & Great Dying',
    subtitle: 'Evolutionary Arms Race, Eyes & Complex Nervous Systems',
    dateDisplay: '541 Million Years Ago',
    yearNumeric: -541000000,
    era: 'primordial',
    category: 'cosmic',
    riverT: 0.13,
    coordinates: { lat: 51.4, lng: -116.5, locationName: 'Burgess Shale / Panthalassic Ocean' },
    impactScore: 95,
    universalImpact: 'Evolved vision, predation, skeletons, and central nervous systems—laying the neural blueprint for the human brain.',
    summary: 'After 3 billion years of mostly single-celled life, complex multicellular organisms erupt across the oceans, inventing eyes, shells, and vertebrate spinal cords.',
    deepDive: [
      'The evolution of the first biological eye triggered an evolutionary arms race between predators (like Anomalocaris) and armored prey (Trilobites).',
      'Five major mass extinctions—including the Permian "Great Dying" (96% marine species lost) and the Cretaceous asteroid—pruned and redirected evolution toward mammals.'
    ],
    keyFigures: [
      { name: 'Pikaia gracilens', role: 'Early chordate ancestor of all vertebrates' }
    ],
    stats: [
      { label: 'Duration', value: '~20 Million Years' },
      { label: 'Animal Phyla Born', value: 'Nearly all modern phyla' }
    ],
    causes: ['earth-formation'],
    effects: ['cognitive-revolution', 'evolution-darwin'],
    philosophicalCore: 'Consciousness began when organisms first needed to model space, time, and other minds to survive.'
  },
  {
    id: 'cognitive-revolution',
    title: 'Homo Sapiens & The Cognitive Revolution',
    subtitle: 'Fire, Symbolic Language & Collective Myth-Making',
    dateDisplay: '300,000 – 70,000 BCE',
    yearNumeric: -70000,
    era: 'primordial',
    category: 'civilization',
    riverT: 0.17,
    coordinates: { lat: -3.3, lng: 35.3, locationName: 'East African Rift Valley' },
    impactScore: 97,
    universalImpact: 'Unlocked syntactic language and shared fictions—allowing millions of strangers to cooperate around laws, gods, money, and nations.',
    summary: 'Anatomically modern humans master fire and undergo a neural leap around 70,000 BCE, developing recursive language, cave art, and abstract imagination.',
    deepDive: [
      'Cooking with fire externalized digestion, shrinking the human gut and diverting massive metabolic energy to fuel a tripled cerebral cortex.',
      'Unlike any other species, Homo sapiens gained the ability to speak about things that do not physically exist—spirits, tribal laws, and future plans.'
    ],
    quote: {
      text: 'You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven.',
      author: 'Yuval Noah Harari'
    },
    keyFigures: [
      { name: 'Mitochondrial Eve', role: 'Matrilineal ancestor of all living humans' }
    ],
    stats: [
      { label: 'Brain Volume', value: '~1,350 cm³' },
      { label: 'Cooperation Scale', value: 'Unlimited via Shared Myth' }
    ],
    causes: ['cambrian-explosion'],
    effects: ['neolithic-revolution', 'mesopotamia-writing'],
    philosophicalCore: 'Intersubjective reality: The realization that human society is built upon shared mental constructs.'
  },

  // ================= ERA II: CRADLE OF CIVILIZATIONS =================
  {
    id: 'neolithic-revolution',
    title: 'The Neolithic Agricultural Revolution',
    subtitle: 'Domestication of Grain, Cities & Social Hierarchy',
    dateDisplay: '10,000 BCE',
    yearNumeric: -10000,
    era: 'ancient',
    category: 'civilization',
    riverT: 0.22,
    coordinates: { lat: 37.22, lng: 38.92, locationName: 'Göbekli Tepe & The Fertile Crescent' },
    impactScore: 96,
    universalImpact: 'Ended 2.5 million years of nomadic foraging, creating food surpluses, permanent architecture, property, and population explosions.',
    summary: 'As the last Ice Age retreats, humans in the Fertile Crescent, China, and Mesoamerica domesticate wheat, rice, and livestock—trading mobile egalitarianism for settled civilization.',
    deepDive: [
      'Göbekli Tepe (c. 9600 BCE) stunned historians by proving that monumental stone temples preceded settled farming—suggesting religion may have driven agriculture, not vice versa.',
      'Grain surpluses enabled specialized classes: priests, soldiers, artisans, and kings, while simultaneously introducing crowded epidemic diseases and land warfare.'
    ],
    keyFigures: [
      { name: 'Natufian Culture', role: 'Pioneers of sedentism and wild grain harvesting' }
    ],
    stats: [
      { label: 'Global Pop (10k BCE)', value: '~5 Million' },
      { label: 'Global Pop (1k BCE)', value: '~100 Million' }
    ],
    causes: ['cognitive-revolution'],
    effects: ['mesopotamia-writing', 'industrial-revolution'],
    philosophicalCore: 'Rousseau’s Paradox: Did humanity domesticate wheat, or did wheat domesticate humanity into labor and property?'
  },
  {
    id: 'mesopotamia-writing',
    title: 'Sumer, Cuneiform & Code of Hammurabi',
    subtitle: 'Invention of Writing, Wheel, Urban Law & Empire',
    dateDisplay: '3500 – 1750 BCE',
    yearNumeric: -3500,
    era: 'ancient',
    category: 'civilization',
    riverT: 0.28,
    coordinates: { lat: 31.32, lng: 45.64, locationName: 'Uruk & Babylon (Mesopotamia)' },
    impactScore: 95,
    universalImpact: 'Externalized human memory into clay and stone—ending prehistory and birthing written law, mathematics (base-60), and literature.',
    summary: 'Between the Tigris and Euphrates rivers, Sumerians build the first true cities (Uruk), invent cuneiform script, the wheel, astronomy, and epic poetry (Gilgamesh), followed by Babylon’s written legal code.',
    deepDive: [
      'Writing began not as poetry, but as accounting tokens for barley and sheep in temple granaries before evolving into the Epic of Gilgamesh—humanity’s first meditation on mortality.',
      'We still divide hours into 60 minutes and circles into 360 degrees because of Sumerian sexagesimal mathematics invented 5,000 years ago.'
    ],
    quote: {
      text: 'To bring about the rule of righteousness in the land, so that the strong should not harm the weak.',
      author: 'Prologue, Code of Hammurabi (c. 1750 BCE)'
    },
    keyFigures: [
      { name: 'Gilgamesh of Uruk', role: 'Fifth King of Uruk & Hero of the oldest Epic' },
      { name: 'Enheduanna', role: 'High Priestess & world’s first named author (2285 BCE)' },
      { name: 'Hammurabi', role: 'King of Babylon & Lawgiver' }
    ],
    stats: [
      { label: 'Uruk Population', value: '~80,000 (First Megacity)' },
      { label: 'Hammurabi Laws', value: '282 Carved Judgments' }
    ],
    causes: ['neolithic-revolution', 'cognitive-revolution'],
    effects: ['eastern-philosophy', 'athens-socrates', 'printing-press'],
    philosophicalCore: 'The Rule of Law: Transitioning justice from arbitrary tribal vengeance to public, immutable statute.'
  },

  // ================= ERA III: AXIAL & CLASSICAL AGE =================
  {
    id: 'eastern-philosophy',
    title: 'The Eastern Axial Awakening',
    subtitle: 'Buddha, Confucius, Laozi & The Upanishads',
    dateDisplay: '600 – 400 BCE',
    yearNumeric: -520,
    era: 'classical',
    category: 'philosophy',
    riverT: 0.35,
    coordinates: { lat: 24.69, lng: 84.99, locationName: 'Bodh Gaya (India) & Qufu (China)' },
    impactScore: 95,
    universalImpact: 'Shaped the moral, spiritual, and civic architecture of over half of humanity across India, China, Japan, and Southeast Asia.',
    summary: 'In a remarkable synchronicity across Asia, Siddhartha Gautama (Buddha) deconstructs suffering and ego in India, while Confucius and Laozi forge the ethical and metaphysical pillars of Chinese civilization.',
    deepDive: [
      'The Buddha proposed radical psychological empiricism: that suffering (Dukkha) stems from craving and the illusion of a permanent self (Anatta), solvable through mindfulness and compassion.',
      'Confucius amidst the chaos of the Zhou dynasty argued that social harmony arises not from brute punishment, but from ritual propriety (Li), filial piety, and virtuous scholarship (Ren).',
      'Laozi’s Tao Te Ching countered rigid order with Wu Wei (effortless action in harmony with nature’s flow).'
    ],
    quote: {
      text: 'Peace comes from within. Do not seek it without. Everything changes; nothing remains without change.',
      author: 'Siddhartha Gautama (The Buddha)'
    },
    keyFigures: [
      { name: 'Siddhartha Gautama', role: 'Founder of Buddhism (c. 563–483 BCE)' },
      { name: 'Confucius (Kong Qiu)', role: 'Architect of East Asian Civic Ethics (551–479 BCE)' },
      { name: 'Laozi', role: 'Founder of Philosophical Taoism' }
    ],
    stats: [
      { label: 'Civilizational Reach', value: '2.5+ Billion People Today' },
      { label: 'Epoch', value: 'Karl Jaspers’ "Axial Age"' }
    ],
    causes: ['mesopotamia-writing'],
    effects: ['islamic-golden-age', 'enlightenment-kant'],
    philosophicalCore: 'Self-mastery, interconnectedness, and harmony between the individual mind, society, and the cosmos.'
  },
  {
    id: 'athens-socrates',
    title: 'Athenian Democracy & The Greek Triumvirate',
    subtitle: 'Socrates, Plato, Aristotle & The Birth of Western Philosophy',
    dateDisplay: '508 – 322 BCE',
    yearNumeric: -400,
    era: 'classical',
    category: 'philosophy',
    riverT: 0.39,
    coordinates: { lat: 37.97, lng: 23.72, locationName: 'Agora & Academy of Athens, Greece' },
    impactScore: 98,
    universalImpact: 'Invented formal logic, the Socratic method, democratic citizenship, political science, and empirical natural classification.',
    summary: 'Following the democratic reforms of Cleisthenes and Pericles, Athens becomes an intellectual furnace where Socrates questions dogma, Plato founds the Academy, and Aristotle systematizes all human knowledge.',
    deepDive: [
      'Socrates chose to drink hemlock rather than renounce free inquiry, establishing the philosopher as the moral gadfly of the state.',
      'Plato’s Republic and Allegory of the Cave asked whether sensory experience is merely a shadow of eternal mathematical and ethical Forms.',
      'Aristotle broke with idealism to pioneer formal syllogistic logic, biology, ethics (eudaimonia), and empirical observation.'
    ],
    quote: {
      text: 'The unexamined life is not worth living.',
      author: 'Socrates (Apology, 399 BCE)'
    },
    keyFigures: [
      { name: 'Socrates', role: 'Founder of Western Ethical Inquiry & Dialectics' },
      { name: 'Plato', role: 'Founder of the Academy & Idealist Metaphysics' },
      { name: 'Aristotle', role: 'Father of Formal Logic, Biology & Empiricism' }
    ],
    stats: [
      { label: 'Athenian Ecclesia', value: '6,000 Citizen Quorum' },
      { label: 'Aristotle Treatises', value: '~200 Works (31 Survive)' }
    ],
    causes: ['mesopotamia-writing'],
    effects: ['alexander-hellenistic', 'roman-republic-empire', 'islamic-golden-age', 'enlightenment-kant', 'french-revolution'],
    philosophicalCore: 'Logos over Mythos: That the universe and human politics can be understood and perfected through reasoned debate.'
  },
  {
    id: 'alexander-hellenistic',
    title: 'Conquests of Alexander the Great',
    subtitle: 'The Hellenistic Fusion of East and West',
    dateDisplay: '336 – 323 BCE',
    yearNumeric: -330,
    era: 'classical',
    category: 'person',
    riverT: 0.43,
    coordinates: { lat: 31.2, lng: 29.91, locationName: 'Alexandria (Egypt) to Babylon & Indus' },
    impactScore: 91,
    universalImpact: 'Fused Greek, Persian, Egyptian, and Indian cultures into a cosmopolitan Hellenistic world centered on the Great Library of Alexandria.',
    summary: 'Tutored by Aristotle, young King Alexander III of Macedon undefeatedly topples the Achaemenid Persian Empire, marching 22,000 miles from Greece to India in just twelve years.',
    deepDive: [
      'By founding over 20 cities named Alexandria—most famously in Egypt—Alexander created a common language (Koine Greek) and trade network spanning three continents.',
      'In Alexandria’s Musaeum and Library, Eratosthenes calculated the circumference of the spherical Earth to within 2% accuracy in 240 BCE.'
    ],
    quote: {
      text: 'There is nothing impossible to him who will try.',
      author: 'Alexander the Great'
    },
    keyFigures: [
      { name: 'Alexander III of Macedon', role: 'Conqueror of Persia & King of Asia' },
      { name: 'Eratosthenes', role: 'Chief Librarian of Alexandria & Geometer' }
    ],
    stats: [
      { label: 'Empire Span', value: '5.2 Million km²' },
      { label: 'Battle Record', value: 'Undefeated in 13 Years' }
    ],
    causes: ['athens-socrates'],
    effects: ['roman-republic-empire', 'islamic-golden-age'],
    philosophicalCore: 'Cosmopolitanism (Kosmos Polites): The Stoic and Hellenistic ideal that all humans are citizens of a single world community.'
  },
  {
    id: 'roman-republic-empire',
    title: 'Rise & Fall of Rome: Republic to Pax Romana',
    subtitle: 'Julius Caesar, Augustus, Stoicism & Civil Law',
    dateDisplay: '509 BCE – 476 CE',
    yearNumeric: -44,
    era: 'classical',
    category: 'civilization',
    riverT: 0.47,
    coordinates: { lat: 41.89, lng: 12.48, locationName: 'Roman Forum, Rome' },
    impactScore: 96,
    universalImpact: 'Engineered modern jurisprudence (Corpus Juris Civilis), republican checks and balances, continental infrastructure, and the Latin linguistic family.',
    summary: 'From a small Italian republic with Senate and Consuls, Rome conquers the Mediterranean basin. After Julius Caesar crosses the Rubicon, Augustus establishes the Pax Romana.',
    deepDive: [
      'Roman constitutional principles—veto power, senate representation, and innocent until proven guilty—directly inspired the American and French constitutions two millennia later.',
      'Emperor Marcus Aurelius embodied Plato’s philosopher-king, writing his Stoic "Meditations" in military tents on the Danubian frontier.'
    ],
    quote: {
      text: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
      author: 'Emperor Marcus Aurelius (Meditations)'
    },
    keyFigures: [
      { name: 'Julius Caesar', role: 'Dictator Perpetuo who ended the Republic (100–44 BCE)' },
      { name: 'Caesar Augustus', role: 'First Roman Emperor & Architect of Pax Romana' },
      { name: 'Marcus Aurelius', role: 'Stoic Philosopher-Emperor (121–180 CE)' }
    ],
    stats: [
      { label: 'Peak Population', value: '~70 Million (25% of World)' },
      { label: 'Paved Road Network', value: '400,000 km' }
    ],
    causes: ['athens-socrates', 'alexander-hellenistic'],
    effects: ['printing-press', 'french-revolution', 'napoleonic-wars'],
    philosophicalCore: 'Stoic Duty & Natural Law: Universal legal rights and inner tranquility amidst imperial turbulence.'
  },
  {
    id: 'qin-han-silk-road',
    title: 'Qin Unification, Han Dynasty & The Silk Road',
    subtitle: 'First Imperial Standardization, Paper & Eurasian Trade',
    dateDisplay: '221 BCE – 220 CE',
    yearNumeric: -100,
    era: 'classical',
    category: 'civilization',
    riverT: 0.50,
    coordinates: { lat: 34.34, lng: 108.94, locationName: 'Chang’an (Xi’an), China' },
    impactScore: 93,
    universalImpact: 'Unified Chinese script, weights, and meritocratic bureaucracy while opening the Silk Road that linked East Asia with Rome.',
    summary: 'Qin Shi Huang ends the Warring States period to become China’s First Emperor, followed by the 400-year Han Golden Age that invents paper, seismographs, and the transcontinental Silk Road.',
    deepDive: [
      'By standardizing Chinese characters across mutually unintelligible spoken dialects, the Qin-Han synthesis ensured China remained culturally unified where the Roman Empire later fractured.',
      'Cai Lun’s invention of paper (105 CE) created a lightweight medium for knowledge that slowly traveled west along the Silk Road.'
    ],
    keyFigures: [
      { name: 'Qin Shi Huang', role: 'First Emperor of Unified China' },
      { name: 'Emperor Wu of Han', role: 'Established Silk Road & Confucian Civil Service' },
      { name: 'Sima Qian', role: 'Grand Historian of China' }
    ],
    stats: [
      { label: 'Silk Road Length', value: '6,400+ km' },
      { label: 'Han Census (2 CE)', value: '57.6 Million Citizens' }
    ],
    causes: ['eastern-philosophy'],
    effects: ['islamic-golden-age', 'mongol-empire', 'printing-press'],
    philosophicalCore: 'Meritocratic Governance: Synthesizing Legalist state capacity with Confucian moral education.'
  },

  // ================= ERA IV: SILK ROADS, RENAISSANCE & REASON =================
  {
    id: 'islamic-golden-age',
    title: 'The Islamic Golden Age & House of Wisdom',
    subtitle: 'Algebra, Optics, Medicine & Preservation of Antiquity',
    dateDisplay: '750 – 1258 CE',
    yearNumeric: 850,
    era: 'renaissance',
    category: 'science',
    riverT: 0.55,
    coordinates: { lat: 33.31, lng: 44.36, locationName: 'Bayt al-Hikma (Baghdad) & Córdoba' },
    impactScore: 95,
    universalImpact: 'Invented Algebra and Algorithms, pioneered the experimental scientific method in optics, and rescued Greek and Indian manuscripts.',
    summary: 'In Abbasid Baghdad, scholars of all faiths gather at the House of Wisdom. Al-Khwarizmi creates algebra, Ibn al-Haytham pioneers experimental physics, and Ibn Sina (Avicenna) writes the Canon of Medicine.',
    deepDive: [
      'Every time you run a computer program, you invoke the name of Muhammad ibn Musa al-Khwarizmi (Latinized as "Algoritmi"), whose book "Al-Jabr" gave us Algebra.',
      'Ibn al-Haytham (Alhazen) proved that vision occurs when light rays enter the eye and insisted that hypotheses must be proven by repeatable mathematical experiments—centuries before Galileo.'
    ],
    quote: {
      text: 'The seeker after the truth is not one who studies the writings of the ancients and puts his trust in them, but rather the one who suspects his faith in them and questions what he gathers from them.',
      author: 'Ibn al-Haytham (Alhazen, c. 1025 CE)'
    },
    keyFigures: [
      { name: 'Al-Khwarizmi', role: 'Father of Algebra & Algorithms (c. 780–850)' },
      { name: 'Ibn al-Haytham', role: 'Father of Modern Optics & Experimental Method' },
      { name: 'Ibn Sina (Avicenna)', role: 'Polymath Philosopher & Physician' }
    ],
    stats: [
      { label: 'Baghdad Population', value: '1.2 Million (World’s Largest)' },
      { label: 'Medical Standard', value: 'Canon used in Europe for 600 yrs' }
    ],
    causes: ['athens-socrates', 'alexander-hellenistic', 'eastern-philosophy', 'qin-han-silk-road'],
    effects: ['printing-press', 'scientific-revolution', 'turing-computing'],
    philosophicalCore: 'Rational Synthesis: Harmonizing empirical observation, mathematical rigor, and cross-cultural scholarship.'
  },
  {
    id: 'mongol-empire',
    title: 'Genghis Khan & The Mongol World System',
    subtitle: 'The Largest Contiguous Land Empire & Pax Mongolica',
    dateDisplay: '1206 – 1368 CE',
    yearNumeric: 1227,
    era: 'renaissance',
    category: 'war',
    riverT: 0.59,
    coordinates: { lat: 47.19, lng: 102.83, locationName: 'Karakorum (Mongolian Steppe)' },
    impactScore: 91,
    universalImpact: 'Shattered medieval isolation across Eurasia—connecting Europe and China with gunpowder, paper money, postal relays, and pandemic shocks.',
    summary: 'Uniting nomadic steppe tribes through meritocracy and psychological warfare, Temüjin (Genghis Khan) and his descendants conquer from the Pacific Ocean to the gates of Vienna and Baghdad.',
    deepDive: [
      'While the Mongol conquests were cataclysmic in their human toll, the resulting "Pax Mongolica" enforced religious freedom, diplomatic immunity, and safe passage along the Silk Road.',
      'This hyper-connected Eurasian trade network transferred Chinese printing, compasses, and gunpowder to Europe—alongside the Black Death (1347), which broke European feudalism.'
    ],
    keyFigures: [
      { name: 'Genghis Khan (Temüjin)', role: 'Founder & Great Khan of the Mongol Empire' },
      { name: 'Kublai Khan', role: 'Founder of the Yuan Dynasty' }
    ],
    stats: [
      { label: 'Empire Area', value: '24 Million km² (16% of Earth)' },
      { label: 'Yam Postal Speed', value: '300 km/day by horse relay' }
    ],
    causes: ['qin-han-silk-road'],
    effects: ['printing-press'],
    philosophicalCore: 'Geopolitical Globalization: The first forging of Eurasia into a single interconnected economic and epidemiological arena.'
  },
  {
    id: 'printing-press',
    title: 'The Renaissance & Gutenberg’s Printing Press',
    subtitle: 'Humanism, Leonardo da Vinci & The Information Explosion',
    dateDisplay: '1440 – 1550 CE',
    yearNumeric: 1450,
    era: 'renaissance',
    category: 'science',
    riverT: 0.63,
    coordinates: { lat: 43.77, lng: 11.25, locationName: 'Florence (Italy) & Mainz (Germany)' },
    impactScore: 97,
    universalImpact: 'Shattered the monopoly on information—fueling the Renaissance, the Reformation, and universal literacy.',
    summary: 'In Florence, artists and thinkers like Leonardo da Vinci and Machiavelli revive humanist inquiry, while Johannes Gutenberg’s movable-type press in Mainz reduces book costs by 80% overnight.',
    deepDive: [
      'Before 1450, all of Europe produced only a few thousand hand-copied manuscripts per year. By 1500, over 20 million books were in circulation.',
      'Leonardo da Vinci united anatomical dissection, fluid dynamics, engineering, and sublime art—proving that art and science are twin lenses on nature.'
    ],
    quote: {
      text: 'Printing is the ultimate gift of God and the greatest one. Through it, the world is made anew.',
      author: 'Martin Luther'
    },
    keyFigures: [
      { name: 'Johannes Gutenberg', role: 'Inventor of Mechanical Movable-Type Printing' },
      { name: 'Leonardo da Vinci', role: 'Archetypal Renaissance Polymath (1452–1519)' },
      { name: 'Niccolò Machiavelli', role: 'Founder of Modern Political Realism' }
    ],
    stats: [
      { label: 'Books by 1500 CE', value: '20+ Million Copies' },
      { label: 'Cost Reduction', value: '~85% Drop in Knowledge Price' }
    ],
    causes: ['mesopotamia-writing', 'roman-republic-empire', 'islamic-golden-age', 'mongol-empire'],
    effects: ['scientific-revolution', 'enlightenment-kant', 'french-revolution', 'turing-computing'],
    philosophicalCore: 'Renaissance Humanism: Elevating human creative potential and democratizing access to truth.'
  },
  {
    id: 'scientific-revolution',
    title: 'The Scientific Revolution: Copernicus to Newton',
    subtitle: 'Heliocentrism, Calculus & Universal Gravitation',
    dateDisplay: '1543 – 1687 CE',
    yearNumeric: 1687,
    era: 'renaissance',
    category: 'science',
    riverT: 0.67,
    coordinates: { lat: 52.2, lng: 0.11, locationName: 'Pisa (Italy) & Trinity College (Cambridge)' },
    impactScore: 99,
    universalImpact: 'Displaced Earth from the center of the cosmos and revealed that the heavens and Earth obey identical mathematical laws.',
    summary: 'Copernicus and Galileo dethrone geocentric dogma with telescopes, Descartes formulates rationalism, and Isaac Newton’s Principia Mathematica (1687) unites terrestrial and celestial mechanics with calculus and gravity.',
    deepDive: [
      'When Galileo turned his telescope toward Jupiter in 1610 and saw four moons orbiting it, he demolished the Aristotelian belief that everything in the universe revolved around Earth.',
      'Newton showed that the exact same force pulling an apple from a tree keeps the Moon in orbit—turning the universe from an inscrutable mystery into a solvable mathematical clockwork.'
    ],
    quote: {
      text: 'Nature and Nature’s laws lay hid in night: God said, Let Newton be! and all was light.',
      author: 'Alexander Pope'
    },
    keyFigures: [
      { name: 'Galileo Galilei', role: 'Father of Observational Astronomy & Physics' },
      { name: 'Isaac Newton', role: 'Author of Principia, Calculus & Classical Mechanics' },
      { name: 'René Descartes', role: 'Founder of Analytical Geometry & "Cogito, ergo sum"' }
    ],
    stats: [
      { label: 'Key Work', value: 'Principia Mathematica (1687)' },
      { label: 'Paradigm Shift', value: 'Universal Laws of Motion' }
    ],
    causes: ['islamic-golden-age', 'printing-press'],
    effects: ['enlightenment-kant', 'industrial-revolution', 'relativity', 'apollo-space'],
    philosophicalCore: 'The Book of Nature is written in the language of mathematics.'
  },

  // ================= ERA V: AGE OF REVOLUTIONS & INDUSTRY =================
  {
    id: 'enlightenment-kant',
    title: 'The Enlightenment: Locke, Voltaire & Kant',
    subtitle: 'Human Rights, Separation of Powers & Critical Philosophy',
    dateDisplay: '1689 – 1790 CE',
    yearNumeric: 1760,
    era: 'revolutions',
    category: 'philosophy',
    riverT: 0.72,
    coordinates: { lat: 48.85, lng: 2.35, locationName: 'Paris, Königsberg & Edinburgh' },
    impactScore: 96,
    universalImpact: 'Dismantled the Divine Right of Kings—establishing constitutional democracy, freedom of speech, and universal human rights.',
    summary: 'Inspired by Newton’s rational universe, philosophers apply reason to society: Locke argues government requires the consent of the governed, Montesquieu designs checks and balances, and Immanuel Kant synthesizes rationalism and empiricism.',
    deepDive: [
      'Kant’s "Critique of Pure Reason" (1781) revolutionized philosophy by showing that the human mind is not a passive mirror of nature, but actively structures space, time, and causality.',
      'Kant’s Categorical Imperative demanded that human beings never be treated merely as a means to an end, but always as an end in themselves.'
    ],
    quote: {
      text: 'Sapere aude! Dare to know! Have the courage to use your own understanding.',
      author: 'Immanuel Kant (What is Enlightenment?, 1784)'
    },
    keyFigures: [
      { name: 'John Locke', role: 'Father of Classical Liberalism & Natural Rights' },
      { name: 'Voltaire', role: 'Champion of Civil Liberties & Free Speech' },
      { name: 'Immanuel Kant', role: 'Architect of Transcendental Idealism & Modern Ethics' }
    ],
    stats: [
      { label: 'Encyclopédie', value: '72,000 Articles of Secular Knowledge' },
      { label: 'Core Triad', value: 'Life, Liberty, Constitutional Law' }
    ],
    causes: ['athens-socrates', 'eastern-philosophy', 'printing-press', 'scientific-revolution'],
    effects: ['french-revolution', 'marx-nietzsche', 'world-wars'],
    philosophicalCore: 'Autonomy of Reason: Every conscious individual possesses inalienable dignity and moral agency.'
  },
  {
    id: 'industrial-revolution',
    title: 'The Industrial Revolution & Steam Age',
    subtitle: 'Thermodynamics, Factories, Railways & The Anthropocene',
    dateDisplay: '1760 – 1850 CE',
    yearNumeric: 1780,
    era: 'revolutions',
    category: 'science',
    riverT: 0.75,
    coordinates: { lat: 53.48, lng: -2.24, locationName: 'Manchester & Birmingham, Great Britain' },
    impactScore: 98,
    universalImpact: 'Broke the Malthusian trap by unlocking fossil-fuel energy—multiplying human economic output, life expectancy, and planetary carbon impact.',
    summary: 'James Watt’s rotary steam engine converts coal heat into limitless mechanical work. Railways, telegraph wires, and mechanized textiles transform agrarian societies into urban industrial superpowers.',
    deepDive: [
      'For 10,000 years after agriculture, 90% of humanity lived near subsistence level powered only by muscle, wind, and water. Steam multiplied human labor capacity a thousandfold.',
      'It simultaneously created the modern working class, globalized time zones via railroads, and initiated anthropogenic climate change.'
    ],
    keyFigures: [
      { name: 'James Watt', role: 'Perfected the Condensing Steam Engine (1776)' },
      { name: 'Ada Lovelace', role: 'Wrote the world’s first computer algorithm (1843)' },
      { name: 'Michael Faraday', role: 'Discovered Electromagnetic Induction (1831)' }
    ],
    stats: [
      { label: 'Global GDP Surge', value: '50x Growth in 2 Centuries' },
      { label: 'Urbanization', value: 'From 7% to 55%+ of Humanity' }
    ],
    causes: ['neolithic-revolution', 'scientific-revolution'],
    effects: ['marx-nietzsche', 'world-wars', 'turing-computing'],
    philosophicalCore: 'Promethean Mastery: Humanity transitions from adapting to nature to re-engineering the planetary biosphere.'
  },
  {
    id: 'french-revolution',
    title: 'The American & French Revolutions',
    subtitle: 'Declaration of Rights, Guillotines & Death of Feudalism',
    dateDisplay: '1776 – 1799 CE',
    yearNumeric: 1789,
    era: 'revolutions',
    category: 'civilization',
    riverT: 0.78,
    coordinates: { lat: 48.85, lng: 2.36, locationName: 'Bastille (Paris) & Philadelphia' },
    impactScore: 95,
    universalImpact: 'Proved that ancient monarchies could be overthrown by citizens—forever redefining sovereignty, nationalism, and human equality.',
    summary: 'Following the American Declaration of Independence (1776), French citizens storm the Bastille in 1789 under the banner of "Liberté, Égalité, Fraternité," abolishing feudalism and proclaiming the Rights of Man.',
    deepDive: [
      'In a single night (August 4, 1789), the French National Assembly abolished a thousand years of aristocratic privileges and tithes.',
      'Yet the descent into Robespierre’s Reign of Terror revealed a haunting political lesson: how revolutionary idealism without constitutional restraint can devour its own children.'
    ],
    quote: {
      text: 'Men are born and remain free and equal in rights.',
      author: 'Article 1, Declaration of the Rights of Man and of the Citizen (1789)'
    },
    keyFigures: [
      { name: 'Thomas Jefferson', role: 'Principal Author of Declaration of Independence' },
      { name: 'Maximilien Robespierre', role: 'Architect of the Jacobin Republic & Reign of Terror' },
      { name: 'Olympe de Gouges', role: 'Author of Declaration of the Rights of Woman (1791)' }
    ],
    stats: [
      { label: 'Bastille Stormed', value: 'July 14, 1789' },
      { label: 'Metric System', value: 'Born from Revolutionary Rationalism' }
    ],
    causes: ['athens-socrates', 'roman-republic-empire', 'printing-press', 'enlightenment-kant'],
    effects: ['napoleonic-wars', 'marx-nietzsche', 'world-wars'],
    philosophicalCore: 'Popular Sovereignty: The state belongs to its citizens, not to bloodlines or thrones.'
  },
  {
    id: 'napoleonic-wars',
    title: 'Napoleon Bonaparte & The Napoleonic Wars',
    subtitle: 'The Civil Code, Total Mobilization & Redrawing Europe',
    dateDisplay: '1799 – 1815 CE',
    yearNumeric: 1805,
    era: 'revolutions',
    category: 'war',
    riverT: 0.81,
    coordinates: { lat: 49.12, lng: 16.76, locationName: 'Austerlitz & Waterloo (Europe)' },
    impactScore: 92,
    universalImpact: 'Spread the Napoleonic Legal Code, meritocracy, and the metric system across Europe while igniting modern German and Italian nationalism.',
    summary: 'Rising from Corsican artillery officer to Emperor of the French, Napoleon shatters five European coalitions with lightning corps warfare—exporting the laws of the Revolution at the point of a bayonet.',
    deepDive: [
      'When philosopher G.W.F. Hegel saw Napoleon ride through Jena in 1806, he wrote: "I saw the World-Spirit (Weltgeist) on horseback."',
      'Though defeated at Waterloo (1815), Napoleon’s Civil Code—establishing equality before the law and secular property rights—remains the foundation of legal systems in over 70 countries today.'
    ],
    quote: {
      text: 'My true glory is not to have won forty battles... Waterloo will erase the memory of so many victories. What nothing will erase, what will live eternally, is my Civil Code.',
      author: 'Napoleon Bonaparte (in exile on Saint Helena)'
    },
    keyFigures: [
      { name: 'Napoleon Bonaparte', role: 'Emperor of the French & Military Strategist' },
      { name: 'Carl von Clausewitz', role: 'Theorist of Modern War ("On War")' }
    ],
    stats: [
      { label: 'Battles Commanded', value: '60+ (Won 53)' },
      { label: 'Legal Legacy', value: '70+ Nations use Civil Code' }
    ],
    causes: ['roman-republic-empire', 'french-revolution'],
    effects: ['world-wars'],
    philosophicalCore: 'The Great Man vs. Historical Forces: How individual genius accelerates irreversible structural transformations.'
  },
  {
    id: 'evolution-darwin',
    title: 'Darwin, Marx & Nietzsche: The 19th-Century Earthquakes',
    subtitle: 'Natural Selection, Historical Materialism & The Ubermensch',
    dateDisplay: '1848 – 1889 CE',
    yearNumeric: 1859,
    era: 'revolutions',
    category: 'philosophy',
    riverT: 0.84,
    coordinates: { lat: 51.33, lng: 0.05, locationName: 'Down House (England), London & Sils Maria' },
    impactScore: 96,
    universalImpact: 'Revolutionized humanity’s understanding of biological origins (Darwin), economic class struggle (Marx), and existential meaning (Nietzsche).',
    summary: 'Charles Darwin’s "Origin of Species" (1859) proves all life evolved via natural selection; Karl Marx critiques industrial capitalism and predicts socialist revolution; Friedrich Nietzsche diagnoses the crisis of nihilism.',
    deepDive: [
      'Darwin united all living organisms into a single evolutionary Tree of Life, answering how blind variation and selection generate exquisite biological design.',
      'Marx argued that history is driven not by abstract ideas, but by material modes of production and class conflict.',
      'Nietzsche warned that with the decline of traditional religious certainty ("God is dead"), humanity would face ideological totalitarianism unless individuals learned to create life-affirming values.'
    ],
    quote: {
      text: 'There is grandeur in this view of life... from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.',
      author: 'Charles Darwin (On the Origin of Species, 1859)'
    },
    keyFigures: [
      { name: 'Charles Darwin', role: 'Discoverer of Evolution by Natural Selection' },
      { name: 'Karl Marx', role: 'Philosopher of Historical Materialism & Das Kapital' },
      { name: 'Friedrich Nietzsche', role: 'Genealogist of Morals & Existential Prophet' }
    ],
    stats: [
      { label: 'Origin of Species', value: 'Published Nov 24, 1859' },
      { label: 'Ideological Impact', value: 'Defined 20th Century Geopolitics' }
    ],
    causes: ['big-bang', 'earth-formation', 'cambrian-explosion', 'enlightenment-kant', 'industrial-revolution', 'french-revolution'],
    effects: ['relativity', 'turing-computing'],
    philosophicalCore: 'Masters of Suspicion: Unmasking the biological, economic, and psychological drives beneath human consciousness.'
  },
  {
    id: 'quantum-relativity',
    title: 'Einstein, Planck & The Quantum-Relativistic Revolution',
    subtitle: 'Curved Spacetime, E=mc² & Quantum Indeterminacy',
    dateDisplay: '1900 – 1927 CE',
    yearNumeric: 1915,
    era: 'modern',
    category: 'science',
    riverT: 0.87,
    coordinates: { lat: 46.94, lng: 7.44, locationName: 'Bern (Switzerland) & Copenhagen' },
    impactScore: 99,
    universalImpact: 'Shattered classical determinism—revealing that time and space weave together, mass is frozen energy, and subatomic reality is probabilistic.',
    summary: 'Albert Einstein’s Special (1905) and General Relativity (1915) reveal gravity as the curvature of 4D spacetime, while Planck, Bohr, Heisenberg, and Schrödinger uncover the bizarre quantum laws governing atoms.',
    deepDive: [
      'Einstein realized that time flows at different rates depending on velocity and gravity—meaning there is no universal "Now" ticking across the cosmos.',
      'Quantum mechanics proved that particles exist in superpositions of probability waves until observed, enabling semiconductors, lasers, and quantum computing.'
    ],
    quote: {
      text: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.',
      author: 'Albert Einstein'
    },
    keyFigures: [
      { name: 'Albert Einstein', role: 'Creator of Special & General Relativity' },
      { name: 'Marie Curie', role: 'Pioneer of Radioactivity (2x Nobel Laureate)' },
      { name: 'Niels Bohr & Werner Heisenberg', role: 'Architects of Quantum Mechanics' }
    ],
    stats: [
      { label: 'Mass-Energy', value: 'E = mc² (90 PJ per gram)' },
      { label: 'Spacetime', value: '4-Dimensional Riemannian Manifold' }
    ],
    causes: ['big-bang', 'scientific-revolution'],
    effects: ['world-wars-atomic', 'turing-internet', 'apollo-space'],
    philosophicalCore: 'Observer & Reality: Space, time, and determinism dissolve at the cosmic and subatomic extremes.'
  },

  // ================= ERA VI: ATOMIC, SPACE & AI HORIZON =================
  {
    id: 'world-wars-atomic',
    title: 'The World Wars & The Atomic Crucible',
    subtitle: 'Total Global Conflict, United Nations & Nuclear Deterrence',
    dateDisplay: '1914 – 1945 CE',
    yearNumeric: 1945,
    era: 'modern',
    category: 'war',
    riverT: 0.90,
    coordinates: { lat: 34.38, lng: 132.45, locationName: 'Normandy, Stalingrad & Hiroshima' },
    impactScore: 98,
    universalImpact: 'Collapsed European colonial empires, birthed the United Nations, and ushered humanity into the existential nuclear age.',
    summary: 'Two industrialized world wars claim over 90 million lives, defeat fascist totalitarianism, and culminate in the Manhattan Project’s Trinity test—giving humanity the power to extinguish itself.',
    deepDive: [
      'World War I (1914–1918) toppled four empires (German, Austro-Hungarian, Ottoman, Russian), while World War II (1939–1945) saw humanity mobilize science on an unprecedented scale—from radar and penicillin to cryptography and nuclear fission.',
      'Out of the ashes of 1945 emerged the Universal Declaration of Human Rights, decolonization across Asia and Africa, and the Cold War superpower order.'
    ],
    quote: {
      text: 'Now I am become Death, the destroyer of worlds.',
      author: 'J. Robert Oppenheimer (quoting the Bhagavad Gita, July 16, 1945)'
    },
    keyFigures: [
      { name: 'Winston Churchill & FDR', role: 'Allied Leaders against Axis Powers' },
      { name: 'J. Robert Oppenheimer', role: 'Director of the Los Alamos Manhattan Project' },
      { name: 'Mahatma Gandhi', role: 'Architect of Nonviolent Decolonization (1869–1948)' }
    ],
    stats: [
      { label: 'WWII Fatalities', value: '70–85 Million Lives' },
      { label: 'UN Charter', value: 'Signed June 26, 1945' }
    ],
    causes: ['enlightenment-kant', 'industrial-revolution', 'french-revolution', 'napoleonic-wars', 'evolution-darwin', 'quantum-relativity'],
    effects: ['turing-internet', 'apollo-space'],
    philosophicalCore: 'Existential Responsibility: When technological power outpaces ethical wisdom, survival becomes a conscious choice.'
  },
  {
    id: 'turing-internet',
    title: 'Alan Turing, The Transistor & The Internet',
    subtitle: 'Universal Computation, Silicon Microchips & Global Mind',
    dateDisplay: '1936 – 1991 CE',
    yearNumeric: 1969,
    era: 'modern',
    category: 'science',
    riverT: 0.93,
    coordinates: { lat: 37.38, lng: -122.05, locationName: 'Bletchley Park (UK) & Silicon Valley (USA)' },
    impactScore: 99,
    universalImpact: 'Translated all human knowledge, logic, and media into binary code—wiring the planet into a single instantaneous nervous system.',
    summary: 'Alan Turing formalizes the Universal Computer (1936) and breaks Enigma; Bell Labs invents the transistor (1947); ARPANET and Tim Berners-Lee’s World Wide Web connect billions of minds at light speed.',
    deepDive: [
      'Turing’s 1936 paper proved that a single mathematical machine reading 0s and 1s could simulate any possible algorithmic process in the universe.',
      'The silicon transistor is the most manufactured object in human history—with trillions of nanometer-scale switches fabricated every second.'
    ],
    quote: {
      text: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
      author: 'Alan Turing (Computing Machinery and Intelligence, 1950)'
    },
    keyFigures: [
      { name: 'Alan Turing', role: 'Father of Theoretical Computer Science & AI' },
      { name: 'Claude Shannon', role: 'Father of Information Theory (The "Bit")' },
      { name: 'Tim Berners-Lee', role: 'Inventor of the World Wide Web (1989)' }
    ],
    stats: [
      { label: 'Transistor Size', value: 'Down to 2 Nanometers' },
      { label: 'Connected Humans', value: '5.5+ Billion Online' }
    ],
    causes: ['islamic-golden-age', 'printing-press', 'industrial-revolution', 'quantum-relativity', 'world-wars-atomic'],
    effects: ['ai-singularity'],
    philosophicalCore: 'Information Ontology ("It from Bit"): Is the universe itself fundamentally a computational process?'
  },
  {
    id: 'apollo-space',
    title: 'Apollo 11, DNA & The Interplanetary Dawn',
    subtitle: 'Footprints on the Moon, Double Helix & JWST Deep Field',
    dateDisplay: '1953 – 2022 CE',
    yearNumeric: 1969,
    era: 'modern',
    category: 'cosmic',
    riverT: 0.955,
    coordinates: { lat: 0.67, lng: 23.47, locationName: 'Sea of Tranquility (Moon) & Cape Canaveral' },
    impactScore: 96,
    universalImpact: 'Life broke free of Earth’s gravity after 3.8 billion years and decoded its own four-letter genetic source code.',
    summary: 'Crick, Watson, and Franklin reveal the DNA double helix (1953), while Apollo 11 lands humans on another celestial body (1969), allowing Earth to see itself whole as a fragile oasis in the cosmic dark.',
    deepDive: [
      'The "Earthrise" photograph taken by Apollo 8 in 1968 sparked the global environmental movement—revealing Earth without borders suspended in black emptiness.',
      'With the Human Genome Project, CRISPR gene editing, and the James Webb Space Telescope peering back 13.5 billion years, humanity now reads both its biological past and cosmic origin.'
    ],
    quote: {
      text: 'That’s one small step for [a] man, one giant leap for mankind.',
      author: 'Neil Armstrong (July 20, 1969)'
    },
    keyFigures: [
      { name: 'Neil Armstrong & Buzz Aldrin', role: 'First Humans on the Moon (Apollo 11)' },
      { name: 'Rosalind Franklin, Crick & Watson', role: 'Deciphered the DNA Double Helix' },
      { name: 'Yuri Gagarin', role: 'First Human in Outer Space (1961)' }
    ],
    stats: [
      { label: 'Saturn V Thrust', value: '34.5 Million Newtons' },
      { label: 'Human Genome', value: '3.2 Billion Base Pairs' }
    ],
    causes: ['scientific-revolution', 'quantum-relativity', 'world-wars-atomic'],
    effects: ['ai-singularity'],
    philosophicalCore: 'The Overview Effect: Planetary consciousness and the destiny of life to become multi-planetary.'
  },
  {
    id: 'ai-singularity',
    title: 'The AI Revolution & Cosmic Singularity Horizon',
    subtitle: 'Neural Networks, Synthetic Intelligence & Future of Mind',
    dateDisplay: '2012 – Present & Beyond',
    yearNumeric: 2026,
    era: 'modern',
    category: 'science',
    riverT: 0.985,
    coordinates: { lat: 37.77, lng: -122.41, locationName: 'Global Planetary Compute Grid' },
    impactScore: 100,
    universalImpact: 'After 13.8 billion years of cosmic evolution, matter taught sand (silicon) to think, reason, create, and discover.',
    summary: 'Deep learning transformers, frontier reasoning models, quantum processors, and autonomous scientific discovery usher in the most rapid paradigm shift in history—where intelligence itself becomes an abundant utility.',
    deepDive: [
      'From AlphaFold solving the 50-year protein-folding grand challenge in biology to foundation models conversing across all human languages and code, synthetic intelligence is accelerating every scientific discipline simultaneously.',
      'We stand at the pivot point of Big History: the bridge between biological evolution and post-biological cosmic exploration.'
    ],
    quote: {
      text: 'Solve intelligence, and then use that to solve everything else.',
      author: 'Demis Hassabis (Nobel Laureate)'
    },
    keyFigures: [
      { name: 'Geoffrey Hinton & Pioneers', role: 'Architects of Deep Neural Networks' },
      { name: 'Demis Hassabis', role: 'Pioneer of AI for Scientific Discovery' },
      { name: 'Humanity & Symbiotic AI', role: 'Co-Authors of the Next Cosmic Epoch' }
    ],
    stats: [
      { label: 'Cosmic Journey', value: '13.8 Billion Years' },
      { label: 'Next Horizon', value: 'Type I–II Kardashev Civilization' }
    ],
    causes: ['big-bang', 'evolution-darwin', 'turing-internet', 'apollo-space', 'cinema-age', 'global-music-wave'],
    effects: [],
    philosophicalCore: 'The Teleology of the Cosmos: Matter awakening to full self-comprehension and creative stewardship of the universe.'
  },
  // ================= ART, MUSIC, LITERATURE & CINEMA MOVEMENTS =================
  {
    id: 'renaissance-high-art',
    title: 'High Renaissance Art & Shakespearean Drama',
    subtitle: 'Michelangelo, Da Vinci, Caravaggio & The Invention of the Human Soul',
    dateDisplay: '1490 – 1610 CE',
    yearNumeric: 1504,
    era: 'renaissance',
    category: 'culture',
    riverT: 0.645,
    coordinates: { lat: 41.9029, lng: 12.4534, locationName: 'Sistine Chapel (Rome), Florence & Globe Theatre (London)' },
    impactScore: 96,
    universalImpact: 'Revolutionized visual perspective, anatomical realism, chiaroscuro lighting, and psychological depth in theater and literature.',
    summary: 'From Michelangelo sculpting David and painting the Sistine Chapel ceiling to Leonardo’s Mona Lisa and William Shakespeare’s tragedies in London, art transcends medieval flatness to capture the infinite complexity of human emotion.',
    deepDive: [
      'Linear perspective (codified by Brunelleschi and Alberti) and Leonardo’s sfumato technique allowed flat canvases to become three-dimensional windows into reality.',
      'In London’s Globe Theatre, William Shakespeare invented over 1,700 English words and created characters like Hamlet and Macbeth whose internal soliloquies birthed modern psychological drama.',
      'Caravaggio’s dramatic tenebrism (violent contrasts of light and shadow) directly prefigured modern cinematography.'
    ],
    quote: {
      text: 'I saw the angel in the marble and carved until I set him free.',
      author: 'Michelangelo Buonarroti'
    },
    keyFigures: [
      { name: 'Michelangelo', role: 'Sculptor of David & Painter of the Sistine Chapel' },
      { name: 'Leonardo da Vinci', role: 'Painter of the Mona Lisa & The Last Supper' },
      { name: 'William Shakespeare', role: 'Supreme Playwright of the English Language' }
    ],
    stats: [
      { label: 'Sistine Ceiling', value: '500 m² Fresco Masterpiece' },
      { label: 'Shakespeare Canon', value: '39 Plays & 154 Sonnets' }
    ],
    causes: ['athens-socrates', 'printing-press'],
    effects: ['classical-symphony', 'modern-art-movements', 'cinema-age'],
    philosophicalCore: 'Aesthetic Transcendence: Beauty as the visible manifestation of truth, proportion, and human interiority.'
  },
  {
    id: 'classical-symphony',
    title: 'The Symphonic Revolution: Bach, Mozart & Beethoven',
    subtitle: 'Polyphony, Harmonic Architecture & The Romantic Sublime',
    dateDisplay: '1700 – 1827 CE',
    yearNumeric: 1804,
    era: 'revolutions',
    category: 'culture',
    riverT: 0.765,
    coordinates: { lat: 48.2082, lng: 16.3738, locationName: 'Vienna (Austria) & Leipzig (Germany)' },
    impactScore: 95,
    universalImpact: 'Codified 12-tone equal temperament harmony and transformed music from courtly background entertainment into the highest spiritual language of emotion.',
    summary: 'J.S. Bach builds mathematical cathedrals of counterpoint; Mozart achieves effortless melodic perfection; and a deaf Ludwig van Beethoven shatters classical restraint with his 5th and 9th Symphonies—ushering in the Romantic Era.',
    deepDive: [
      'Bach’s "Well-Tempered Clavier" demonstrated that a keyboard tuned in equal temperament could play in all 24 major and minor keys—the foundation of all Western music since.',
      'Even after losing his hearing completely, Beethoven composed the Ninth Symphony ("Ode to Joy"), introducing human voices into the symphony to proclaim universal brotherhood.',
      'In 1977, NASA placed Bach and Beethoven on the Voyager Golden Record as humanity’s supreme greeting to extraterrestrial civilizations.'
    ],
    quote: {
      text: 'Music is a higher revelation than all wisdom and philosophy.',
      author: 'Ludwig van Beethoven'
    },
    keyFigures: [
      { name: 'Johann Sebastian Bach', role: 'Master of Baroque Counterpoint & Fugue' },
      { name: 'Wolfgang Amadeus Mozart', role: 'Prodigy of Classical Opera & Symphony' },
      { name: 'Ludwig van Beethoven', role: 'Bridge from Classical Order to Romantic Fire' }
    ],
    stats: [
      { label: 'Harmonic System', value: '12-Tone Equal Temperament' },
      { label: 'Cosmic Legacy', value: 'Etched on Voyager Golden Record' }
    ],
    causes: ['renaissance-high-art', 'enlightenment-kant'],
    effects: ['modern-art-movements', 'cinema-age', 'global-music-wave'],
    philosophicalCore: 'Schopenhauer & Nietzsche held that music is the only art that does not merely copy appearances, but speaks the direct will of the cosmos.'
  },
  {
    id: 'modern-art-movements',
    title: 'Impressionism, Hokusai, Van Gogh & Modernist Art',
    subtitle: 'Shattering Realism: Ukiyo-e, Post-Impressionism, Cubism & Surrealism',
    dateDisplay: '1831 – 1937 CE',
    yearNumeric: 1889,
    era: 'revolutions',
    category: 'culture',
    riverT: 0.855,
    coordinates: { lat: 43.77, lng: 4.83, locationName: 'Paris, Saint-Rémy (France) & Edo (Tokyo)' },
    impactScore: 94,
    universalImpact: 'Freed visual art from literal imitation—exploring pure light, subconscious dreams, emotional brushwork, and 4D geometric perspectives.',
    summary: 'Inspired by Japanese Ukiyo-e woodblocks (Hokusai’s Great Wave), Monet and Van Gogh paint swirling light and raw emotion, while Picasso’s Cubism and Dalí’s Surrealism fracture space and time on canvas.',
    deepDive: [
      'Once photography was invented in the 1830s, painters realized they no longer needed to replicate optical reality—they could paint how reality *feels*.',
      'Vincent van Gogh painted "The Starry Night" (1889) with turbulent, swirling vortices that physicists later discovered uncannily match Kolmogorov’s mathematical equations of fluid turbulence.',
      'Pablo Picasso’s "Guernica" (1937) became the ultimate visual indictment against the horrors of modern aerial warfare.'
    ],
    quote: {
      text: 'I dream my painting and I paint my dream.',
      author: 'Vincent van Gogh'
    },
    keyFigures: [
      { name: 'Katsushika Hokusai', role: 'Master of Japanese Ukiyo-e ("The Great Wave")' },
      { name: 'Vincent van Gogh', role: 'Pioneer of Post-Impressionist Expressionism' },
      { name: 'Pablo Picasso', role: 'Co-Founder of Cubism & Modernist Art' }
    ],
    stats: [
      { label: 'Starry Night', value: 'Painted June 1889' },
      { label: 'Movements Born', value: 'Impressionism, Cubism, Surrealism' }
    ],
    causes: ['renaissance-high-art', 'classical-symphony', 'industrial-revolution'],
    effects: ['cinema-age', 'global-music-wave'],
    philosophicalCore: 'Subjective Perception: Art is not a mirror held up to nature, but a hammer and prism with which consciousness reshapes it.'
  },
  {
    id: 'cinema-age',
    title: 'The Birth of Cinema & World Film Movements',
    subtitle: 'The Seventh Art: Montage, Golden Age, Nouvelle Vague & Global Auteurs',
    dateDisplay: '1895 – Present',
    yearNumeric: 1927,
    era: 'modern',
    category: 'culture',
    riverT: 0.915,
    coordinates: { lat: 34.0928, lng: -118.3287, locationName: 'Paris, Hollywood, Tokyo & Rome' },
    impactScore: 96,
    universalImpact: 'Synthesized photography, theater, music, architecture, and time-editing into the "empathy machine" of modern civilization.',
    summary: 'From the Lumière brothers and Georges Méliès’ "Trip to the Moon" (1902) to Chaplin, Eisenstein’s montage, Kurosawa, Italian Neorealism, the French New Wave, and Kubrick, cinema becomes humanity’s shared dream-state.',
    deepDive: [
      'Cinema was the first art form in history able to manipulate time itself—cutting across centuries in a single frame (as in Kubrick’s famous bone-to-spaceship match cut in *2001: A Space Odyssey*).',
      'Movements like German Expressionism (*Metropolis*), Soviet Montage, Japanese Golden Age (Kurosawa, Miyazaki), and the French *Nouvelle Vague* (Godard, Truffaut) proved film is visual philosophy.',
      'Roger Ebert called cinema "the greatest machine ever invented for generating empathy across time, race, and culture."'
    ],
    quote: {
      text: 'Cinema is a matter of what’s in the frame and what’s out.',
      author: 'Martin Scorsese'
    },
    keyFigures: [
      { name: 'Charlie Chaplin & Buster Keaton', role: 'Poets of Silent Cinema' },
      { name: 'Akira Kurosawa & Satyajit Ray', role: 'Masters of World Humanist Cinema' },
      { name: 'Stanley Kubrick & Alfred Hitchcock', role: 'Visionary Auteurs of Visual Storytelling' }
    ],
    stats: [
      { label: 'First Screening', value: 'Dec 28, 1895 (Paris)' },
      { label: 'Frame Rate', value: '24 Frames Per Second Illusion' }
    ],
    causes: ['renaissance-high-art', 'classical-symphony', 'modern-art-movements', 'industrial-revolution'],
    effects: ['global-music-wave', 'ai-singularity'],
    philosophicalCore: 'Sculpting in Time (Andrei Tarkovsky): Cinema captures living time, memory, and collective myth in motion.'
  },
  {
    id: 'global-music-wave',
    title: 'Jazz, Rock, Electronic & Global Sonic Culture',
    subtitle: 'Improvisation, Electric Amplification, Hip-Hop & Planetary Sound',
    dateDisplay: '1917 – Present',
    yearNumeric: 1967,
    era: 'modern',
    category: 'culture',
    riverT: 0.942,
    coordinates: { lat: 29.9511, lng: -90.0715, locationName: 'New Orleans, Abbey Road (London), Kingston & Bronx' },
    impactScore: 95,
    universalImpact: 'Electrified sound, democratized youth counterculture, and united every continent through recorded rhythm, rebellion, and poetry.',
    summary: 'Born from African-American blues and New Orleans Jazz (Armstrong, Davis, Coltrane), popular music explodes through Rock & Roll, The Beatles’ studio revolutions, Bob Marley’s reggae, Kraftwerk’s synthesizers, and Hip-Hop.',
    deepDive: [
      'Jazz introduced spontaneous collective improvisation and syncopation, becoming the sonic embodiment of 20th-century freedom and civil rights.',
      'With magnetic tape, electric guitars, and multitrack recording (such as The Beatles’ *Sgt. Pepper* in 1967), the recording studio itself became an instrument.',
      'From the Bronx block parties of 1973 that birthed Hip-Hop to global streaming today, music became the universal language of youth identity and social revolution.'
    ],
    quote: {
      text: 'Music can change the world because it can change people.',
      author: 'Bono'
    },
    keyFigures: [
      { name: 'Louis Armstrong & Miles Davis', role: 'Architects of Jazz & Modal Improvisation' },
      { name: 'The Beatles, Bob Dylan & Jimi Hendrix', role: 'Revolutionaries of Rock & Studio Art' },
      { name: 'Bob Marley, Nina Simone & Hip-Hop Pioneers', role: 'Voices of Global Liberation & Rhythm' }
    ],
    stats: [
      { label: 'Live Aid Broadcast', value: '1.9 Billion Viewers (1985)' },
      { label: 'Sonic Mediums', value: 'Vinyl → Tape → Synthesizers → Digital' }
    ],
    causes: ['classical-symphony', 'modern-art-movements', 'cinema-age', 'turing-internet'],
    effects: ['ai-singularity'],
    philosophicalCore: 'Dionysian Resonance: How rhythm, frequency, and lyric dissolve borders between billions of human hearts.'
  }
];

// Normalize any ID aliases so every cause/effect link resolves cleanly
const ID_ALIASES: Record<string, string> = {
  'relativity': 'quantum-relativity',
  'marx-nietzsche': 'evolution-darwin',
  'world-wars': 'world-wars-atomic',
  'turing-computing': 'turing-internet',
};

HISTORICAL_NODES.forEach((node) => {
  node.causes = Array.from(
    new Set(
      node.causes
        .map((id) => ID_ALIASES[id] || id)
        .filter((id) => id !== node.id)
    )
  );
  node.effects = Array.from(
    new Set(
      node.effects
        .map((id) => ID_ALIASES[id] || id)
        .filter((id) => id !== node.id)
    )
  );
});

// Sort all nodes chronologically by riverT and ensure bidirectional causes/effects
HISTORICAL_NODES.sort((a, b) => a.riverT - b.riverT);

export const NODE_MAP: Record<string, HistoricalNode> = Object.fromEntries(
  HISTORICAL_NODES.map((n) => [n.id, n])
);

HISTORICAL_NODES.forEach((node) => {
  node.causes.forEach((causeId) => {
    const parent = NODE_MAP[causeId];
    if (parent && !parent.effects.includes(node.id)) {
      parent.effects.push(node.id);
    }
  });
});
