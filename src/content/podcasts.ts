/**
 * Curaduría personal de podcasts de Camilo.
 *
 * Estructura: 3 secciones (mine / negocios / fuera) + taxonomía de tags
 * para sub-agrupar dentro de cada sección y permitir navegación rápida.
 *
 * Reglas de datos:
 *  - URLs limpias (sin scraping noise).
 *  - Descripciones sin sufijos +N ni dominios sueltos.
 *  - Em dashes en prosa eliminados.
 *  - Si no hay URL confiable, se renderiza sin enlace (no inventamos).
 */

export type PodcastSection = 'mine' | 'negocios' | 'fuera';

export type PodcastTag =
  | 'ia-tech'
  | 'estrategia'
  | 'ventas'
  | 'inversion'
  | 'alto-rendimiento'
  | 'geopolitica'
  | 'historia'
  | 'ciencia'
  | 'psicologia'
  | 'espiritualidad'
  | 'cultura';

export type PodcastEntry = {
  name: string;
  description: string;
  frequency?: string;
  spotify?: string;
  apple?: string;
  youtube?: string;
  web?: string;
  amazon?: string;
  section: PodcastSection;
  tag: PodcastTag;
};

export const PODCAST_SECTIONS: Record<
  PodcastSection,
  { kicker: string; title: string; intro: string }
> = {
  mine: {
    kicker: 'Mis podcasts',
    title: 'Lo que yo publico.',
    intro:
      'Dos producciones propias. Una diaria, una semanal. Si quiere conocer mi criterio, empiece por acá.',
  },
  negocios: {
    kicker: 'Negocios, IA y tecnología',
    title: 'Los que escucho para pensar el negocio y la IA.',
    intro:
      'Mi lista cambia. Esta es la del momento. Cada uno aporta algo distinto: tácticas operativas, marcos para decidir, lectura de mercado, o entrevistas bien hechas.',
  },
  fuera: {
    kicker: 'Fuera del trabajo',
    title: 'Lo que escucho cuando no estoy pensando en IA.',
    intro:
      'Historia, filosofía, salud, ficción, espiritualidad, noticias. Las cosas que sostienen el resto. Acá no busco productividad. Busco perspectiva.',
  },
};

export const PODCAST_TAGS: Record<PodcastTag, { label: string; slug: string; section: PodcastSection }> = {
  'ia-tech': { label: 'IA y tecnología', slug: 'ia-tech', section: 'negocios' },
  estrategia: { label: 'Estrategia y negocios', slug: 'estrategia', section: 'negocios' },
  ventas: { label: 'Ventas y crecimiento', slug: 'ventas', section: 'negocios' },
  inversion: { label: 'Inversión y finanzas', slug: 'inversion', section: 'negocios' },
  'alto-rendimiento': { label: 'Alto rendimiento', slug: 'alto-rendimiento', section: 'negocios' },
  geopolitica: { label: 'Geopolítica y actualidad', slug: 'geopolitica', section: 'fuera' },
  historia: { label: 'Historia y cultura', slug: 'historia', section: 'fuera' },
  ciencia: { label: 'Ciencia y salud', slug: 'ciencia', section: 'fuera' },
  psicologia: { label: 'Psicología y bienestar', slug: 'psicologia', section: 'fuera' },
  espiritualidad: { label: 'Espiritualidad y filosofía', slug: 'espiritualidad', section: 'fuera' },
  cultura: { label: 'Cultura, ficción y literatura', slug: 'cultura', section: 'fuera' },
};

export const PODCAST_ENTRIES: PodcastEntry[] = [
  // ─── Mis podcasts ─────────────────────────────────────────────────────────
  {
    name: 'Pertinente con Camilo Ramírez',
    description:
      'Traduzco los movimientos de la IA y del mercado en decisiones de negocio reales para empresas en Latinoamérica. Claridad estratégica sin ruido.',
    frequency: 'Diario, lunes a viernes, menos de 10 minutos',
    spotify: 'https://open.spotify.com/show/2bOwCqIBN1uRj5Ms84CnFe',
    apple: 'https://podcasts.apple.com/us/podcast/pertinente-con-camilo-ram%C3%ADrez/id1894335566',
    youtube: 'https://www.youtube.com/@soy.camilo.ramirez',
    amazon: 'https://music.amazon.com/es-co/podcasts/a55b9f73-f15f-4326-af1c-a4558241c6b0/pertinente-con-camilo-ram%C3%ADrez',
    section: 'mine',
    tag: 'ia-tech',
  },
  {
    name: 'Métase en mi cabeza',
    description:
      'Entrevistas a líderes y expertos que están transformando el futuro, con foco en IA y revoluciones tecnológicas en negocios e industrias.',
    frequency: 'Semanal, un episodio en vivo por semana',
    apple: 'https://podcasts.apple.com/us/podcast/m%C3%A9tase-en-mi-cabeza/id1814049152',
    web: 'https://www.metaseenmicabeza.com',
    youtube: 'https://www.youtube.com/playlist?list=PLjIL-RcZ4Joxoo6jkLomFGV-ZDSaJLJLp',
    section: 'mine',
    tag: 'ia-tech',
  },

  // ─── Negocios: IA y tecnología ────────────────────────────────────────────
  {
    name: 'The AI Daily Brief',
    description: 'Resumen y análisis de noticias de inteligencia artificial.',
    frequency: 'Casi diario',
    spotify: 'https://open.spotify.com/show/6JWf8h0THw2YQZYnpv9fYw',
    apple: 'https://podcasts.apple.com/us/podcast/the-ai-daily-brief-artificial-intelligence-news/id1680633614',
    web: 'https://aidailybrief.ai',
    section: 'negocios',
    tag: 'ia-tech',
  },
  {
    name: 'Pivot',
    description:
      'Kara Swisher y Scott Galloway analizan tech, negocios y política con opiniones fuertes.',
    frequency: 'Dos veces por semana, martes y viernes',
    spotify: 'https://open.spotify.com/show/4MU3RFGELZxPT9XHVwTNPR',
    apple: 'https://podcasts.apple.com/us/podcast/pivot/id1073226719',
    web: 'https://podcasts.voxmedia.com/show/pivot',
    section: 'negocios',
    tag: 'ia-tech',
  },
  {
    name: 'El Podcast de Marc Vidal',
    description:
      'Marc Vidal analiza economía, disrupción tecnológica y futuro del trabajo.',
    frequency: 'Dos veces por semana',
    apple: 'https://podcasts.apple.com/us/podcast/el-podcast-de-marc-vidal/id1595446245',
    section: 'negocios',
    tag: 'ia-tech',
  },
  {
    name: 'Loop Infinito (Applesfera)',
    description: 'Podcast diario de Applesfera sobre actualidad de Apple.',
    frequency: 'Diario, lunes a viernes',
    section: 'negocios',
    tag: 'ia-tech',
  },
  {
    name: 'Remando en Arequipe',
    description:
      'Podcast sobre liderazgo, innovación corporativa e inteligencia artificial aplicada a negocios.',
    web: 'https://creators.spotify.com/pod/profile/remando-en-arequipe-podca',
    section: 'negocios',
    tag: 'ia-tech',
  },

  // ─── Negocios: Estrategia y negocios ──────────────────────────────────────
  {
    name: 'The Diary of a CEO',
    description: 'Entrevistas largas de Steven Bartlett con emprendedores, creadores y expertos.',
    spotify: 'https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX',
    apple: 'https://podcasts.apple.com/us/podcast/the-diary-of-a-ceo-with-steven-bartlett/id1291423644',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: '¿Quién Dijo Caja? Podcast de Innovación',
    description:
      'Conversaciones sobre innovación, transformación digital y creatividad en empresas latinoamericanas.',
    spotify: 'https://open.spotify.com/show/6ecuOKnKEaKQEFOPNY0ZW3',
    apple: 'https://podcasts.apple.com/co/podcast/qui%C3%A9n-dijo-caja-podcast-de-innovaci%C3%B3n/id1702591529',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: 'Dinstinto',
    description:
      'Conversaciones sobre negocios, marca personal y crecimiento profesional, con foco en huellas de éxito.',
    frequency: 'Semanal, cada lunes',
    spotify: 'https://open.spotify.com/show/6yVO99WI3G9uJLhW7E6EO2',
    apple: 'https://podcasts.apple.com/co/podcast/dinstinto/id1758820461',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: 'Chisme Corporativo',
    description:
      'Analizan modelos de negocio y chismes de empresas, mezclando datos duros y tono relajado.',
    frequency: 'Semanal',
    apple: 'https://podcasts.apple.com/us/podcast/chisme-corporativo/id1738102823',
    youtube: 'https://www.youtube.com/@ChismeCorporativoPodcast',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: 'My First Million',
    description:
      'Shaan Puri y Sam Parr idean negocios y analizan tendencias con invitados emprendedores.',
    frequency: 'Semanal',
    spotify: 'https://open.spotify.com/show/3mliji9352UAk3XnWElnDV',
    web: 'https://www.mfmpod.com',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: 'The Best One Yet',
    description: 'Pop-biz diario: tres noticias de negocios en tono ligero y narrativo.',
    frequency: 'Diario laboral, lunes a viernes',
    spotify: 'https://open.spotify.com/show/5RllMBgvDnTau8nnsCUdse',
    web: 'https://tboypod.com',
    section: 'negocios',
    tag: 'estrategia',
  },
  {
    name: 'El podcast del Nico Orellana',
    description: 'Conversaciones sobre startups, producto y emprendimiento.',
    section: 'negocios',
    tag: 'estrategia',
  },

  // ─── Negocios: Ventas y crecimiento ───────────────────────────────────────
  {
    name: 'Máquina de Ventas',
    description: 'Podcast de ventas en español para emprendedores y equipos comerciales.',
    spotify: 'https://open.spotify.com/show/5ph1a74lbgcV9cbbriUCpL',
    apple: 'https://podcasts.apple.com/co/podcast/m%C3%A1quina-de-ventas/id1760389501',
    web: 'https://www.maquinadeventas.io',
    section: 'negocios',
    tag: 'ventas',
  },
  {
    name: 'The Game with Alex Hormozi',
    description: 'Tácticas operativas para adquisición de clientes, LTV y escalamiento de empresas.',
    frequency: 'Quincenal',
    apple: 'https://podcasts.apple.com/us/podcast/the-game-with-alex-hormozi/id1254720112',
    web: 'https://www.acquisition.com/podcast',
    section: 'negocios',
    tag: 'ventas',
  },
  {
    name: 'The School of Greatness',
    description:
      'Entrevistas motivacionales de Lewis Howes con atletas, emprendedores y expertos sobre éxito y propósito.',
    spotify: 'https://open.spotify.com/show/07GQhOZboEZOE1ysnFLipT',
    section: 'negocios',
    tag: 'ventas',
  },

  // ─── Negocios: Inversión y finanzas ───────────────────────────────────────
  {
    name: 'Dimes y Billetes',
    description:
      'Finanzas personales, inversiones y economía explicada en lenguaje sencillo, por Moris Dieck.',
    spotify: 'https://open.spotify.com/show/16yvYZ8ETqpIL7S3kQNA7x',
    apple: 'https://podcasts.apple.com/us/podcast/dimes-y-billetes/id1448563113',
    section: 'negocios',
    tag: 'inversion',
  },
  {
    name: 'El Arte de Invertir',
    description:
      'Conversaciones sobre inversión y mercados con enfoque en filosofía y grandes inversores.',
    frequency: 'Semanal',
    apple: 'https://podcasts.apple.com/br/podcast/el-arte-de-invertir/id1832065527',
    section: 'negocios',
    tag: 'inversion',
  },

  // ─── Negocios: Alto rendimiento ───────────────────────────────────────────
  {
    name: 'Cracks Podcast con Oso Trava',
    description:
      'Entrevistas largas con atletas, emprendedores y líderes sobre hábitos y sistemas de alto rendimiento.',
    frequency: 'Semanal',
    spotify: 'https://open.spotify.com/show/3DhKkwcA6Pkl6s6xI1m9Im',
    web: 'https://cracks.la',
    section: 'negocios',
    tag: 'alto-rendimiento',
  },
  {
    name: 'The Nick Bare Podcast',
    description: 'Nick Bare habla de entrenamiento, nutrición, disciplina y empresa.',
    spotify: 'https://open.spotify.com/show/0FqNvRhcHYBtfxnmhDSt2r',
    section: 'negocios',
    tag: 'alto-rendimiento',
  },
  {
    name: 'Founders',
    description:
      'David Senra condensa cada semana lecciones de biografías de grandes emprendedores.',
    frequency: 'Semanal',
    spotify: 'https://open.spotify.com/show/7txiovdzPARhjm18NwMUYj',
    section: 'negocios',
    tag: 'alto-rendimiento',
  },

  // ─── Fuera: Geopolítica y actualidad ──────────────────────────────────────
  {
    name: 'Y esto no es todo',
    description:
      'Podcast del Georgetown Americas Institute sobre noticias y geopolítica, con formato de boletín explicativo por temporadas.',
    web: 'https://yestonoestodo.georgetown.edu',
    section: 'fuera',
    tag: 'geopolitica',
  },
  {
    name: 'Warrior Diplomacy',
    description:
      'Podcast (en inglés y español) sobre actores de poder global y su juego geopolítico.',
    frequency: 'Mensual',
    apple: 'https://podcasts.apple.com/tz/podcast/warrior-diplomacy/id1560316243',
    section: 'fuera',
    tag: 'geopolitica',
  },
  {
    name: 'Geopolítica en Acción',
    description: 'Podcast educativo sobre geopolítica producido por la Universidad del Salvador.',
    frequency: 'Diario',
    apple: 'https://podcasts.apple.com/es/podcast/geopol%C3%ADtica-en-acci%C3%B3n/id1694432349',
    section: 'fuera',
    tag: 'geopolitica',
  },
  {
    name: 'Geopolítica Pop',
    description:
      'Analiza fenómenos pop (anime, reguetón, etc.) desde la geopolítica. Original de Spotify Studios.',
    frequency: 'Por temporadas',
    section: 'fuera',
    tag: 'geopolitica',
  },
  {
    name: 'El café de hoy (EL TIEMPO)',
    description: 'Magazín de noticias de Colombia y el mundo para arrancar el día.',
    frequency: 'Diario, lunes a viernes',
    apple: 'https://podcasts.apple.com/us/podcast/el-caf%C3%A9-de-hoy/id1674334294',
    section: 'fuera',
    tag: 'geopolitica',
  },

  // ─── Fuera: Historia y cultura ────────────────────────────────────────────
  {
    name: 'Revisionist History',
    description:
      'Malcolm Gladwell revisita hechos e ideas mal entendidos para replantear su significado histórico.',
    frequency: 'Por temporadas',
    web: 'http://revisionisthistory.com',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: 'Historia en Podcast',
    description:
      'Lucas Botta divulga procesos y personajes clave de la historia mundial.',
    web: 'https://www.historiaenpodcast.com.ar',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: 'Academia Play',
    description:
      'Proyecto educativo que explica historia, arte, cine, música y más, de forma didáctica.',
    spotify: 'https://open.spotify.com/show/56NK3YU9RypJjTYlqxFL5c',
    youtube: 'https://www.youtube.com/academiaplay',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: 'DianaUribe.fm',
    description: 'Historia y cultura mundial contada por Diana Uribe.',
    frequency: 'Quincenal',
    apple: 'https://podcasts.apple.com/us/podcast/dianauribe-fm/id1440323217',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: 'Atemporal con Andrés Acevedo',
    description:
      'Conversaciones largas con personas excepcionales de Latinoamérica sobre ideas, libros, ambición y sentido.',
    frequency: 'Quincenal',
    apple: 'https://podcasts.apple.com/us/podcast/atemporal-con-andr%C3%A9s-acevedo/id1525447472',
    youtube: 'https://www.youtube.com/@atemporalpodcast',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: 'El Topo',
    description:
      'Entrevistas con gente que vive y piensa de forma poco convencional. Temas tabú e incómodos.',
    frequency: 'Quincenal',
    spotify: 'https://open.spotify.com/show/5MMXYd6TL3cTtbHNnCdeLG',
    section: 'fuera',
    tag: 'historia',
  },
  {
    name: '+57 (Mas 57 Colombia Radio)',
    description:
      'Plataforma de radio y podcasts para la diáspora colombiana, con música y noticias.',
    web: 'https://mas57colombiaradio.com',
    section: 'fuera',
    tag: 'historia',
  },

  // ─── Fuera: Ciencia y salud ───────────────────────────────────────────────
  {
    name: 'Huberman Lab',
    description:
      'Neurociencia aplicada: herramientas basadas en ciencia para sueño, foco, entrenamiento y manejo del estrés. Por Andrew Huberman.',
    frequency: 'Dos veces por semana, lunes y jueves',
    spotify: 'https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P',
    web: 'https://www.hubermanlab.com/podcast',
    section: 'fuera',
    tag: 'ciencia',
  },
  {
    name: 'StarTalk',
    description: 'Ciencia, comedia y cultura pop con Neil deGrasse Tyson.',
    section: 'fuera',
    tag: 'ciencia',
  },
  {
    name: 'Brain Skills',
    description:
      'Podcast sobre capital cerebral en la era de la IA: salud del cerebro y habilidades cognitivas.',
    spotify: 'https://open.spotify.com/show/2PjIWFqrtU787VLhvzMCnt',
    section: 'fuera',
    tag: 'ciencia',
  },
  {
    name: 'Nosotras, las menopáusicas',
    description:
      'Podcast sobre menopausia desde una mirada honesta y positiva, con expertas y testimonios.',
    frequency: 'Dos veces por semana',
    apple: 'https://podcasts.apple.com/co/podcast/nosotras-las-menop%C3%A1usicas/id1772856120',
    section: 'fuera',
    tag: 'ciencia',
  },

  // ─── Fuera: Psicología y bienestar ────────────────────────────────────────
  {
    name: 'Office Hours with Arthur Brooks',
    description:
      'Herramientas de ciencia de la felicidad, filosofía y espiritualidad para bienestar práctico.',
    frequency: 'Semanal',
    spotify: 'https://open.spotify.com/show/3fT0FLFsPgV2mbVjuOo3JV',
    apple: 'https://podcasts.apple.com/us/podcast/office-hours-with-arthur-brooks/id1832119842',
    web: 'https://www.arthurbrooks.com/podcast/',
    section: 'fuera',
    tag: 'psicologia',
  },
  {
    name: 'Solved with Mark Manson',
    description:
      'Manson resuelve problemas concretos (ansiedad, propósito, valores) con evidencia e ironía.',
    frequency: 'Semanal',
    spotify: 'https://open.spotify.com/show/11VjrLJfoiNvgjjqov4RWh',
    apple: 'https://podcasts.apple.com/us/podcast/solved-with-mark-manson/id1247526593',
    section: 'fuera',
    tag: 'psicologia',
  },
  {
    name: 'On Purpose with Jay Shetty',
    description: 'Entrevistas inspiradoras sobre propósito, relaciones y bienestar.',
    web: 'https://www.jayshetty.me/podcast',
    section: 'fuera',
    tag: 'psicologia',
  },
  {
    name: 'Los Unfuckables',
    description:
      'Conversaciones en español sobre resiliencia, caídas y reconstrucción personal con invitados que han atravesado crisis fuertes.',
    youtube: 'https://www.youtube.com/@LOSUNFUCKABLES',
    section: 'fuera',
    tag: 'psicologia',
  },
  {
    name: 'Los hombres sí lloran',
    description: 'Espacio sobre salud mental masculina, vulnerabilidad y estigmas.',
    web: 'https://www.iheart.com/podcast/269-los-hombres-si-lloran-187044871/',
    section: 'fuera',
    tag: 'psicologia',
  },
  {
    name: 'En Esencia (Radhi Yoga)',
    description:
      'Podcast sobre yoga, bienestar y vida saludable con reflexiones prácticas.',
    spotify: 'https://open.spotify.com/show/0YsNeQfqsLKcwhABGcF00H',
    web: 'https://radhiyoga.com/podcast/',
    section: 'fuera',
    tag: 'psicologia',
  },

  // ─── Fuera: Espiritualidad y filosofía ────────────────────────────────────
  {
    name: 'Querido Pedro',
    description:
      'Reflexiones de vida minimalista, mindfulness y budismo aplicado al día a día.',
    frequency: 'Quincenal',
    apple: 'https://podcasts.apple.com/es/podcast/querido-pedro/id1197086982',
    web: 'https://queridopedro.com/podcast/',
    section: 'fuera',
    tag: 'espiritualidad',
  },
  {
    name: 'Kabbalah con Mario Sabán',
    description:
      'Episodios sobre Cábala aplicada al crecimiento personal donde Mario Sabán es invitado recurrente.',
    apple: 'https://podcasts.apple.com/fr/podcast/podcast-39-kabbalah-transforma-tu-vida-al-100-ft-mario/id1438627314?i=1000621402854',
    section: 'fuera',
    tag: 'espiritualidad',
  },
  {
    name: 'The David Ghiyam Podcast',
    description:
      'Enseñanzas de Cábala y leyes espirituales universales, con charla y meditación.',
    frequency: 'Semanal',
    apple: 'https://podcasts.apple.com/us/podcast/the-david-ghiyam-podcast/id1775548374',
    web: 'https://davidghiyam.com/podcast',
    section: 'fuera',
    tag: 'espiritualidad',
  },
  {
    name: 'Making Sense with Sam Harris',
    description: 'Conversaciones y monólogos sobre filosofía, mente, política y ciencia.',
    amazon: 'https://music.amazon.com/podcasts/2edfbc78-8731-40fa-b5f7-498079d4a08b/making-sense-with-sam-harris',
    section: 'fuera',
    tag: 'espiritualidad',
  },
  {
    name: 'Gaiki · Una filosofía de la Creatividad',
    description:
      'Facundo Arena explora creatividad y procesos creativos con enfoque filosófico y práctico.',
    spotify: 'https://open.spotify.com/show/42u7jO2KIWKiT9DQTSL7Xa',
    apple: 'https://podcasts.apple.com/us/podcast/gaiki-una-filosof%C3%ADa-de-la-creatividad/id1584695054',
    web: 'https://gaiki.org/podcast-gaiki-una-filosofia-de-la-creatividad/',
    section: 'fuera',
    tag: 'espiritualidad',
  },

  // ─── Fuera: Cultura, ficción y literatura ─────────────────────────────────
  {
    name: 'Caso 63',
    description:
      'Thriller de ciencia ficción chileno sobre un viajero en el tiempo (Paciente 63) y su psiquiatra.',
    frequency: 'Por temporadas',
    section: 'fuera',
    tag: 'cultura',
  },
  {
    name: 'Deforme Semanal Ideal Total',
    description:
      'Isa Calderón y Lucía Lijtmaer comentan cultura, feminismo y actualidad con humor salvaje.',
    frequency: 'Dos veces al mes',
    section: 'fuera',
    tag: 'cultura',
  },
  {
    name: 'Un Libro Una Hora',
    description: 'Cuenta un clásico literario en una hora, con narración y análisis.',
    frequency: 'Quincenal',
    apple: 'https://podcasts.apple.com/co/podcast/un-libro-una-hora/id1470511654',
    section: 'fuera',
    tag: 'cultura',
  },
];

// Tags actually present per section, in render order.
export const TAGS_BY_SECTION: Record<Exclude<PodcastSection, 'mine'>, PodcastTag[]> = {
  negocios: ['ia-tech', 'estrategia', 'ventas', 'inversion', 'alto-rendimiento'],
  fuera: ['geopolitica', 'historia', 'ciencia', 'psicologia', 'espiritualidad', 'cultura'],
};
