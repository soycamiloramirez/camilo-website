export type Lang = 'es' | 'en';

export const SITE = {
  name: 'Camilo Ramírez',
  domain: 'camilo-ramirez.com',
  url: 'https://camilo-ramirez.com',
  email: 'yo@camilo-ramirez.com',
  location: { es: 'Bogotá · Operación LATAM', en: 'Bogotá · Operating across LATAM' },
};

export const AIC_PARTNERS = ['Anthropic', 'Microsoft', 'Nvidia', 'Amazon', 'Perplexity', 'Meta'] as const;

// Marcas globales con las que Camilo ha trabajado.
// Vía Netbangers (+20 años, agencia) y Navigamo (hoy). Solo primer nivel
// internacionalmente reconocible. `file` apunta a `/brands/{file}`. Si es null,
// se renderiza wordmark tipográfico.
export const CLIENT_BRANDS: { name: string; file: string | null }[] = [
  { name: 'Samsung', file: 'samsung.svg' },
  { name: 'Coca-Cola', file: 'cocacola.svg' },
  { name: 'Xbox', file: 'xbox.svg' },
  { name: 'Chevrolet', file: 'chevrolet.svg' },
  { name: 'DEWALT', file: 'dewalt.svg' },
  { name: 'Nissan', file: 'nissan.svg' },
  { name: 'HP', file: 'hp.svg' },
  { name: 'Reebok', file: 'reebok.svg' },
  { name: 'UNICEF', file: 'unicef.jpg' },
  { name: 'Duracell', file: 'duracell.jpg' },
  { name: 'ExxonMobil', file: 'exxonmobil.jpg' },
  { name: 'Quaker', file: 'quaker.jpg' },
  { name: 'DirecTV', file: 'directv.jpg' },
  { name: "Papa John's", file: 'papajohns.jpg' },
  { name: 'Falabella', file: 'falabella.jpg' },
  { name: 'Liberty Seguros', file: 'libertyseguros.jpg' },
  { name: 'Speed Stick', file: 'speedstick.jpg' },
  { name: 'Schick', file: 'schick.jpg' },
  { name: 'Hawaiian Tropic', file: 'hawaiiantropic.jpg' },
  { name: 'Cuisinart', file: 'cuisinart.jpg' },
  { name: 'Van Camps', file: 'vancamps.jpg' },
  { name: 'Doritos', file: 'doritos.jpg' },
  { name: 'Blancox', file: 'blancox.webp' },
  { name: 'Nitrofert', file: 'nitrofert.png' },
];

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/camiloramirez' },
  { label: 'YouTube', href: 'https://www.youtube.com/@soy.camilo.ramirez' },
  { label: 'Instagram', href: 'https://www.instagram.com/soy.camilo.ramirez' },
  { label: 'X', href: 'https://x.com/soy_camilo_r' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@soy.camilo.ramirez' },
];

// Authoritative platform inventory (digital-assets.md).
// Order matters: Spotify and YouTube first for LATAM.
export const PODCASTS = {
  pertinente: {
    id: 'pertinente',
    appleId: '1894335566',
    spotifyShowId: '2bOwCqIBN1uRj5Ms84CnFe',
    platforms: [
      { name: 'Spotify', href: 'https://open.spotify.com/show/2bOwCqIBN1uRj5Ms84CnFe' },
      { name: 'YouTube', href: 'https://www.youtube.com/@soy.camilo.ramirez' },
      { name: 'Apple', href: 'https://podcasts.apple.com/us/podcast/pertinente-con-camilo-ram%C3%ADrez/id1894335566' },
      { name: 'Amazon', href: 'https://music.amazon.com/podcasts/a55b9f73-f15f-4326-af1c-a4558241c6b0/pertinente-con-camilo-ram%C3%ADrez' },
      { name: 'Deezer', href: 'https://www.deezer.com/us/show/1002924951' },
    ],
  },
  memc: {
    id: 'memc',
    appleId: '1814049152',
    spotifyShowId: '7fzBFk8AGRc7ptnho5jZOB',
    platforms: [
      { name: 'YouTube', href: 'https://www.youtube.com/@metase_en_mi_cabeza' },
      { name: 'Spotify', href: 'https://open.spotify.com/show/7fzBFk8AGRc7ptnho5jZOB' },
      { name: 'Apple', href: 'https://podcasts.apple.com/us/podcast/id1814049152' },
      { name: 'Web', href: 'https://metaseenmicabeza.com' },
    ],
  },
};

export const COPY = {
  es: {
    nav: {
      ultimo: 'Lo último',
      blog: 'Blog',
      tesis: 'Tesis',
      trabajo: 'Trabajar conmigo',
      historia: 'Historia',
      contacto: 'Contacto',
    },
    hero: {
      eyebrow: 'Voz de IA y negocios · Advisor · Speaker',
      title: 'Criterio sobre IA, negocios y LATAM. Publicado todos los días.',
      lede:
        'Soy Camilo Ramírez. Llevo más de 20 años en negocios digitales y hoy publico análisis a diario sobre dónde va el dinero y la innovación en la región — sin humo, sin hype, sin lealtades a herramientas. Eso es lo primero. Después, si lo que digo le sirve, hablamos de su junta o de su evento.',
      ctaPrimary: 'Escuchar Pertinente',
      ctaSecondary: 'Trabajar conmigo',
      since: 'En negocios digitales desde 1999.',
      latestEyebrow: 'Pertinente — último episodio',
    },
    ultimo: {
      kicker: 'Lo último',
      title: 'Donde ejerzo el criterio, en público.',
      lede:
        'Dos producciones propias, dos pruebas distintas: una voz en solitario que analiza la región todos los días, y una conversación semanal con quienes están construyendo el presente y el futuro de LATAM.',
      pertinente: {
        title: 'Pertinente',
        tag: 'Diario · 6 a 13 min',
        oneLine:
          'Yo solo, todos los días, las cuatro noticias que importan en IA, negocios y geopolítica de la región. Para entender hacia dónde va el dinero y la innovación.',
        listenLabel: 'Escuchar en',
        all: 'Ver todos los episodios',
      },
      memc: {
        title: 'Métase en mi cabeza',
        tag: 'Semanal · ~60 min · TV + podcast',
        oneLine:
          'Conversaciones en vivo con líderes top de la región: ex CEO de Google Colombia, ex Ministro TIC, VP de Caracol, fundadores. IA con visión humana, no técnica.',
        listenLabel: 'Ver en',
        all: 'Ver todos los episodios',
      },
      emptyFallback: 'Última publicación disponible en las plataformas.',
    },
    tesis: {
      kicker: 'Tesis',
      title: 'Tres convicciones que sostienen lo que publico.',
      items: [
        {
          h: 'Construir desde el dolor, no para vender.',
          p: 'La tecnología debería existir para resolverle algo a alguien. Esto lo vengo diciendo desde una charla en TVN Panamá en 2019 — años antes de que la IA generativa fuera moda. No es discurso de coyuntura.',
        },
        {
          h: 'LATAM puede ser potencia con reglas propias.',
          p: 'Nuestra ventaja real no es construir los modelos — esa pelea es de otra liga. Es conocer nuestros problemas en primera persona. El modelo es commodity. El terreno, no.',
        },
        {
          h: 'Resolver antes que vender.',
          p: 'Filtro por valores, no por tamaño de empresa. Si el encargo va contra las personas, no soy el indicado. Y sí, mi experiencia tiene un precio: cobrar lo justo por hacer bien el trabajo es coherencia con lo que predico, no codicia.',
        },
      ],
    },
    trabajo: {
      kicker: 'Trabajar conmigo',
      title: 'Cuando el contenido no basta y necesita la sala.',
      lede:
        'Si llegó hasta acá por algo que publiqué, ya conoce el criterio. Estas son las dos formas en que se traduce en trabajo conmigo.',
      cards: [
        {
          tag: 'Advisory',
          h: 'Acompañamiento a CEOs y juntas directivas.',
          p: 'Sesiones de criterio para decisiones donde el costo de equivocarse es alto. No vengo a operar su empresa: vengo a ordenar lo que ya está sobre la mesa y a separar lo urgente de lo importante. Llego con la disciplina de 20 años construyendo negocios reales, no con un PowerPoint.',
          for: 'Juntas y comités de dirección con decisiones difíciles por delante.',
        },
        {
          tag: 'Speaking',
          h: 'Keynotes y charlas para eventos.',
          p: 'Hago que lo difícil sea fácil de entender — sin hype, sin abstracciones, sin "el futuro es ahora". Construyo con la sala, no desde el atril. La gente sale habiendo entendido algo concreto que puede usar mañana.',
          for: 'Conferencias, eventos corporativos, juntas anuales y festivales de industria.',
        },
      ],
      filter:
        'Trabajo con quienes quieren mejorar y ayudar a las personas, no recortar a costa de ellas. Es la única vara que aplico.',
    },
    aic: {
      kicker: 'Lidero el ecosistema',
      title: 'Director Regional Sur América · The AI Collective.',
      p: 'La comunidad de IA más grande del planeta: +200.000 miembros, +25 capítulos en hubs globales. Desde 2025 dirijo la región de Sur América. Mi trabajo: empujar el debate de adopción de IA con propósito humano y reglas propias de LATAM — no a control remoto desde otro hemisferio.',
      partnersLabel: 'Partners',
      cta: 'Conocer The AI Collective',
      href: 'https://aicollective.com',
    },
    navigamo: {
      kicker: 'Construyo IA',
      title: 'Navigamo · cofundador y Director LATAM.',
      claim: 'Construimos IA. No solo opinamos.',
      p: 'Navigamo es la compañía que cofundé en 2024. Diseñamos y operamos soluciones con IA que mejoran vidas y generan eficiencias reales para empresas en LATAM. Es donde aterrizo lo que aconsejo: por eso lo que digo en público no es teoría — lo estoy ejecutando con un equipo y un producto, en clientes de verdad.',
      cta: 'Ir a Navigamo',
      href: 'https://navigamo.co',
    },
    trayectoria: {
      kicker: 'Trayectoria',
      title: 'Más de 20 años construyendo negocios digitales.',
      lede:
        'De afuera la trayectoria parece dispersa: televisión, agencia digital, una comunidad de motos, IA. Por dentro es el mismo movimiento cada vez — encontrar la estructura de un problema y diseñar el sistema que lo resuelve.',
      steps: [
        {
          years: '1999 — 2010',
          h: 'Broadcast Design',
          p: 'Director del Departamento de Diseño y Animación en CMI y RCN Televisión. Aprendí a comunicar con disciplina de tiempo y de marca.',
        },
        {
          years: '2007 — 2026',
          h: 'Netbangers',
          p: 'Cofundador de la agencia digital. 19 años. Premios en Effie, FIAP, New York Festivals y Cyber. La raíz de mi disciplina financiera, operativa y de marketing real — mucho antes del hype de la IA.',
        },
        {
          years: '2014 — 2022',
          h: 'IAB Colombia',
          p: '8 años en la junta directiva del Interactive Advertising Bureau capítulo Colombia. Jurado en Effie, FIAP y PromaxBDA.',
        },
        {
          years: '2018 — 2023',
          h: 'Custom Built Show',
          p: 'Fundé el primer festival de motos modificadas de Latinoamérica. Para que el gremio fuera tomado en serio tuve que traer un juez de Australia. Esa frase resume mejor que ninguna otra el problema de LATAM con su propio valor.',
        },
        {
          years: '2024 — hoy',
          h: 'Navigamo · AI Collective · Pertinente · MEMC',
          p: 'Cofundador y Director LATAM de Navigamo. Director Regional Sur América de The AI Collective. Creador y host de Pertinente (diario) y de Métase en mi cabeza (semanal, TV + podcast).',
        },
      ],
      credentials: [
        'Junta IAB Colombia · 8 años',
        'Jurado Effie · FIAP · PromaxBDA',
        'Speaker en LATAM desde 2006',
        '+20 años en negocios digitales',
      ],
    },
    contacto: {
      kicker: 'Contacto',
      title: 'Si quiere trabajar conmigo, escríbame directo.',
      lede:
        'Cada solicitud la leo yo. Respondo cuando tengo algo útil que aportar — no siempre inmediato, pero siempre personal.',
      form: {
        name: 'Nombre',
        company: 'Empresa u organización',
        type: 'Qué necesita',
        types: ['Advisory', 'Speaking', 'Otro'],
        message: 'Cuénteme el contexto',
        send: 'Enviar',
        emailFallback: 'O escríbame directo a',
      },
    },
    footer: {
      tagline: '© ' + new Date().getFullYear() + ' Camilo Ramírez. Hecho con criterio en Bogotá.',
      legal:
        'Para que un CEO, un curador de eventos o alguien que llega por el podcast entienda en segundos quién soy y por qué tiene sentido escucharme.',
    },
    meta: {
      title: 'Camilo Ramírez — IA, negocios y LATAM · Pertinente, MEMC, advisory',
      description:
        'Criterio diario sobre IA, negocios y LATAM. Cofundador de Navigamo, Director Regional Sur América de The AI Collective. Host de Pertinente y MEMC.',
      ogAlt: 'Camilo Ramírez — IA, negocios y LATAM',
    },
    trayectoriaBrief: {
      kicker: 'Trayectoria',
      title: 'Veinte años aprendiendo a leer la estructura de un problema.',
      lede:
        'De la televisión a la IA, el oficio cambió, pero el patrón no: ver un problema, construir el sistema que lo resuelve. Cinco capítulos, una sola historia.',
      milestones: [
        { years: '1999 — 2010', label: 'Broadcast Design' },
        { years: '2007 — 2026', label: 'Netbangers' },
        { years: '2018 — 2023', label: 'Custom Built Show' },
        { years: '2024 — hoy', label: 'Navigamo · AI Collective' },
        { years: '2025 — hoy', label: 'Pertinente · MEMC' },
      ],
      cta: 'Leer la historia completa',
    },
    historia: {
      meta: {
        title: 'Historia y trayectoria de Camilo Ramírez — Broadcast Design, Netbangers, Custom Built Show, Navigamo y The AI Collective',
        description:
          'Más de 20 años de Camilo Ramírez: de Broadcast Design en CMI y RCN, a Netbangers, Custom Built Show, Navigamo y The AI Collective. Un mismo patrón en cinco mundos.',
      },
      eyebrow: 'Historia',
      title: 'Cinco capítulos, un mismo movimiento.',
      lede: [
        'De afuera mi trayectoria parece dispersa: televisión, agencia digital, una comunidad de motos, IA, podcast diario. Por dentro siempre fue lo mismo — ver un problema, construir el sistema que lo resuelve, al servicio de las personas.',
        'No soy experto en una industria. Soy bueno leyendo la estructura del problema y diseñando el sistema que lo resuelve, independiente del dominio. Y soy bueno explicándolo de manera que cualquiera lo entienda. Lo demás son las herramientas de cada época.',
      ],
      brands: {
        kicker: 'Marcas',
        title: 'Marcas que han confiado en mi criterio.',
        p: 'Más de 20 años trabajando con marcas globales — antes desde Netbangers, hoy desde Navigamo.',
      },
      chapters: [
        {
          years: '1999 — 2010',
          tag: 'La base creativa',
          h: 'Broadcast Design en CMI y RCN.',
          body: [
            'Empecé en 1999 como Diseñador Jr. en Buena Imagen TV. Cinco años después dirigía el Departamento de Diseño y Animación del Noticiero CM&; entre 2005 y 2010 hice lo mismo en Noticias RCN. Aprendí a comunicar con disciplina de tiempo y de marca: producir cien piezas semanales sin perder coherencia ni fidelidad al noticiero detrás.',
            'Acá no había chance de quedarse en lo "creativo": cada decisión era operativa, presupuestal y de marca. Es donde aprendí que comunicar bien es una disciplina, no un talento.',
          ],
        },
        {
          years: '2007 — 2026',
          tag: 'El oficio',
          h: 'Netbangers — diecinueve años haciendo negocios digitales.',
          body: [
            'Cofundé Netbangers en enero de 2007. Una agencia digital boutique en Bogotá, especializada en marcas de consumo masivo. En diecinueve años recogimos premios en Effie, FIAP, New York Festivals y Cyber, construimos un estudio propio de audio y video, y desarrollamos metodologías propias de auditoría digital y tableros de control. Esa fue la raíz de mi disciplina financiera, operativa y de marketing real — años antes de que la IA fuera tema.',
            'Pero también fue donde vi el desgaste. Con la llegada de las redes sociales, los clientes se volcaron a perseguir likes. El SEO dejó de importarles. El día a día se redujo a producir cientos de piezas que no duraban más de cinco horas con vida. No tenía un propósito. Eso era crear basura digital con buena producción.',
            'Mi convicción de "construir desde el dolor real, no para vender" no nació de un libro. Nació de hartarme de lo contrario. Netbangers cerró para mí en mayo de 2026.',
          ],
        },
        {
          years: '2018 — 2023',
          tag: 'La prueba',
          h: 'Custom Built Show — el día que tuve que traer un juez de Australia.',
          body: [
            'En 2018 fundé Custom Built Show, el primer festival de motos modificadas de Latinoamérica. Empezó porque modifico mis propias motos y, conociendo talleres en Bogotá, me di cuenta de que a esos constructores no les pagaban como artistas — los trataban como mecánicos. Para mí estaban haciendo arte sobre dos ruedas y nadie les pagaba como tal.',
            'Para que el show fuera válido descubrí algo incómodo: no podía tener jueces locales. Los talleres no iban a sentir respeto si el jurado era de aquí. Salí a buscar afuera y conseguí a Marlon Slack, redactor de Pipeburn — la publicación de motos custom más importante del mundo. Creo que los constructores nunca me creyeron en serio hasta el día que les dije que iba rumbo a su taller con "el gringo" de Australia a conocerlos. Ese día me gané el respeto. Y ese día el show de verdad comenzó.',
            'Dos años después, en plena pandemia, hicimos el festival con cinco jueces, uno por continente. Lo importante no fueron los premios: fue que los constructores ya habían empezado a entender lo buenos que eran.',
            'Tuve que traer un juez de Australia para que un gremio se creyera bueno. Esa frase resume, mejor que ninguna otra, el problema de LATAM con su propio valor.',
          ],
        },
        {
          years: '2024 — hoy',
          tag: 'La síntesis',
          h: 'Navigamo — la IA dejó de ser un chat y se volvió propósito.',
          body: [
            'Saliendo de Netbangers, el primer proyecto que armé fue un e-commerce de alimentos para mascotas. Venía jugando con IA desde 2022. A finales de 2023 empecé a pensar algo clave: más allá de una interfaz de chat, esto tenía que traducirse en un servicio de valor real.',
            'El experimento que me abrió la cabeza: con mi equipo creamos un agente de atención al cliente para ese e-commerce. No un bot torpe como los que ya se conocían. Era un asistente capaz de recomendar alimentos según raza, edad y enfermedades de la mascota, dar precios por ración y calcular el mejor precio según el tamaño de cada referencia. Mientras todos veían un chatbot, nosotros construimos un asistente que le dice qué darle de comer a su perro según la raza y la enfermedad, y a qué precio por ración.',
            'Esa es la diferencia entre usar IA y resolver un problema con IA. De ahí nació Navigamo. Hoy soy cofundador y Director LATAM. Construimos soluciones con IA que mejoran vidas y generan eficiencias reales para empresas en LATAM.',
          ],
        },
        {
          years: '2025 — hoy',
          tag: 'El rol regional',
          h: 'The AI Collective Sur América — el contrapeso humano.',
          body: [
            'En julio de 2025 asumí la Dirección Regional de Sur América de The AI Collective. Es la comunidad de IA más grande del planeta: más de 200.000 miembros, más de 25 capítulos, partners como Anthropic, Microsoft, Nvidia, Amazon, Perplexity y Meta. Su misión es ser el contrapeso humano en la era de aceleración de la IA: reconstruir confianza, colaboración global y alineación con valores humanos.',
            'Asumir la región es coherente con lo que vengo pensando: LATAM puede ser potencia con reglas propias. No por replicar el manual del norte, sino por reconocer una ventaja que es nuestra — conocer nuestros problemas en primera persona. El modelo es commodity. El terreno, no.',
          ],
        },
        {
          years: '2025 — hoy',
          tag: 'La voz pública',
          h: 'Pertinente y Métase en mi cabeza — el criterio, todos los días.',
          body: [
            'Métase en mi cabeza arrancó en abril de 2025. Un episodio en vivo por semana, ~60 minutos, con líderes que están construyendo el presente y el futuro de la región: ex CEO de Google Colombia, ex Ministro TIC, VP de Caracol, fundadores. IA con visión humana, no técnica.',
            'Pertinente es lo más reciente. Yo solo, todos los días, las cuatro noticias que importan en IA, negocios y geopolítica de la región. Sin invitados, sin humo. El objetivo: que dueños de empresa y líderes entiendan hacia dónde va el dinero y la innovación.',
            'Acá termina la historia, pero solo en orden cronológico. En realidad es donde empieza el resto: el contenido es la puerta. Si lo que digo le sirve, hablamos de su junta o de su evento.',
          ],
        },
      ],
      closing: {
        h: 'Eso es todo. Y por eso este sitio existe.',
        p: 'No tengo una historia recta porque nunca me interesó tenerla. La trayectoria entera fue un mismo movimiento aplicado en mundos distintos. La IA es el capítulo actual, no la identidad. El propósito sigue siendo el mismo de siempre — poner el talento al servicio de mejorar la vida de las personas.',
        cta: 'Volver al inicio',
      },
    },
  },
  en: {
    nav: {
      ultimo: 'Latest',
      blog: 'Blog',
      tesis: 'Thesis',
      trabajo: 'Work with me',
      historia: 'Story',
      contacto: 'Contact',
    },
    hero: {
      eyebrow: 'Voice on AI & business · Advisor · Speaker',
      title: 'Judgment on AI, business and LATAM. Published every day.',
      lede:
        'I’m Camilo Ramírez. 20+ years in digital business, and today I publish daily analysis on where money and innovation are heading in the region — no hype, no smoke, no allegiance to tools. That comes first. Then, if what I say is useful, we talk about your board or your stage.',
      ctaPrimary: 'Listen to Pertinente',
      ctaSecondary: 'Work with me',
      since: 'In digital business since 1999.',
      latestEyebrow: 'Pertinente — latest episode',
    },
    ultimo: {
      kicker: 'Latest',
      title: 'Where I exercise judgment, in public.',
      lede:
        'Two productions, two different proofs: a solo voice analyzing the region every day, and a weekly conversation with the people building the present and future of LATAM.',
      pertinente: {
        title: 'Pertinente',
        tag: 'Daily · 6 to 13 min',
        oneLine:
          'Just me, every day, the four news items that matter on AI, business and geopolitics in the region. To understand where money and innovation are heading.',
        listenLabel: 'Listen on',
        all: 'All episodes',
      },
      memc: {
        title: 'Métase en mi cabeza',
        tag: 'Weekly · ~60 min · TV + podcast',
        oneLine:
          'Live conversations with top leaders in the region: former CEO of Google Colombia, former ICT Minister, Caracol VP, founders. AI with a human lens, not a technical one.',
        listenLabel: 'Watch on',
        all: 'All episodes',
      },
      emptyFallback: 'Latest episodes live on the platforms.',
    },
    tesis: {
      kicker: 'Thesis',
      title: 'Three convictions that hold up what I publish.',
      items: [
        {
          h: 'Built from real pain, not to sell more.',
          p: 'Technology should exist to solve something for someone. I’ve been saying this since a talk at TVN Panama in 2019 — years before generative AI was fashionable. It isn’t opportunistic narrative.',
        },
        {
          h: 'LATAM can be a power on its own terms.',
          p: 'Our real edge isn’t building the models — that fight belongs to another league. It’s knowing our own problems firsthand. The model is a commodity. The terrain is not.',
        },
        {
          h: 'Solving over selling.',
          p: 'I filter by values, not by company size. If the brief works against people, I’m not the right person. And yes, my experience has a price: charging fairly for doing the work well is coherence with what I preach, not greed.',
        },
      ],
    },
    trabajo: {
      kicker: 'Work with me',
      title: 'When content isn’t enough and you need the room.',
      lede:
        'If you got here through something I published, you already know the judgment. These are the two ways it turns into work with me.',
      cards: [
        {
          tag: 'Advisory',
          h: 'Trusted advisor for CEOs and boards.',
          p: 'Judgment sessions for decisions where the cost of being wrong is high. I’m not here to run your company: I’m here to order what’s already on the table and separate the urgent from the important. I come with the discipline of 20 years building real businesses, not with a deck.',
          for: 'Boards and exec committees with hard decisions ahead.',
        },
        {
          tag: 'Speaking',
          h: 'Keynotes and talks for events.',
          p: 'I make hard things easy to understand — no hype, no abstractions, no “the future is now.” I build with the room, not from the podium. People leave having understood something concrete they can use the next morning.',
          for: 'Conferences, corporate events, annual meetings and industry festivals.',
        },
      ],
      filter:
        'I work with people who want to improve and help others, not cut at their expense. That’s the only yardstick.',
    },
    aic: {
      kicker: 'I lead the ecosystem',
      title: 'Regional Director for South America · The AI Collective.',
      p: 'The largest AI community on the planet: 200,000+ members, 25+ chapters in global hubs. Since 2025 I lead the South America region. My job: push the conversation on AI adoption with human purpose and LATAM’s own rules — not remote-controlled from another hemisphere.',
      partnersLabel: 'Partners',
      cta: 'Explore The AI Collective',
      href: 'https://aicollective.com',
    },
    navigamo: {
      kicker: 'I build AI',
      title: 'Navigamo · co-founder and LATAM Director.',
      claim: 'We build AI. We don’t just talk about it.',
      p: 'Navigamo is the company I co-founded in 2024. We design and operate AI solutions that improve lives and create real efficiencies for LATAM companies. This is where the advice lands: that’s why what I say in public isn’t theory — I’m executing it with a team and a product, with real clients.',
      cta: 'Go to Navigamo',
      href: 'https://navigamo.co',
    },
    trayectoria: {
      kicker: 'Track record',
      title: '20+ years building digital businesses.',
      lede:
        'From the outside it looks scattered: television, digital agency, a motorcycle community, AI. From the inside it’s the same move every time — finding the structure of a problem and designing the system that solves it.',
      steps: [
        {
          years: '1999 — 2010',
          h: 'Broadcast Design',
          p: 'Head of the Design and Animation Department at CMI and at RCN Television. I learned to communicate with the discipline of time and brand.',
        },
        {
          years: '2007 — 2026',
          h: 'Netbangers',
          p: 'Co-founder of the digital agency. 19 years. Effie, FIAP, New York Festivals and Cyber awards. The root of my financial, operational and real marketing discipline — long before the AI hype.',
        },
        {
          years: '2014 — 2022',
          h: 'IAB Colombia',
          p: '8 years on the board of the Interactive Advertising Bureau Colombia chapter. Jury at Effie, FIAP and PromaxBDA.',
        },
        {
          years: '2018 — 2023',
          h: 'Custom Built Show',
          p: 'I founded Latin America’s first custom motorcycle festival. For the guild to be taken seriously I had to fly in a judge from Australia. That single line captures, better than any other, LATAM’s problem with its own worth.',
        },
        {
          years: '2024 — present',
          h: 'Navigamo · AI Collective · Pertinente · MEMC',
          p: 'Co-founder and LATAM Director at Navigamo. Regional Director for South America at The AI Collective. Creator and host of Pertinente (daily) and Métase en mi cabeza (weekly, TV + podcast).',
        },
      ],
      credentials: [
        'IAB Colombia board · 8 years',
        'Jury at Effie · FIAP · PromaxBDA',
        'Speaker across LATAM since 2006',
        '20+ years in digital business',
      ],
    },
    contacto: {
      kicker: 'Contact',
      title: 'If you want to work with me, write directly.',
      lede:
        'I read every request myself. I reply when I have something useful to add — not always immediately, but always personally.',
      form: {
        name: 'Name',
        company: 'Company or organization',
        type: 'What do you need',
        types: ['Advisory', 'Speaking', 'Other'],
        message: 'Tell me the context',
        send: 'Send',
        emailFallback: 'Or email me directly at',
      },
    },
    footer: {
      tagline: '© ' + new Date().getFullYear() + ' Camilo Ramírez. Built with judgment in Bogotá.',
      legal:
        'So a CEO, an event curator or someone who arrives through the podcast can understand in seconds who I am and why it makes sense to listen.',
    },
    meta: {
      title: 'Camilo Ramírez — AI, business and LATAM · Pertinente, MEMC, advisory',
      description:
        'Daily judgment on AI, business and LATAM. Co-founder of Navigamo, Regional Director for South America at The AI Collective. Host of Pertinente and MEMC.',
      ogAlt: 'Camilo Ramírez — AI, business and LATAM',
    },
    trayectoriaBrief: {
      kicker: 'Track record',
      title: 'Twenty years learning to read the structure of a problem.',
      lede:
        'From television to AI, the craft changed but the pattern didn’t: see a problem, build the system that solves it. Five chapters, one single story.',
      milestones: [
        { years: '1999 — 2010', label: 'Broadcast Design' },
        { years: '2007 — 2026', label: 'Netbangers' },
        { years: '2018 — 2023', label: 'Custom Built Show' },
        { years: '2024 — present', label: 'Navigamo · AI Collective' },
        { years: '2025 — present', label: 'Pertinente · MEMC' },
      ],
      cta: 'Read the full story',
    },
    historia: {
      meta: {
        title: 'Story and track record of Camilo Ramírez — Broadcast Design, Netbangers, Custom Built Show, Navigamo and The AI Collective',
        description:
          'Over 20 years of Camilo Ramírez: from Broadcast Design at CMI and RCN to Netbangers, Custom Built Show, Navigamo and The AI Collective. One pattern across five worlds.',
      },
      eyebrow: 'Story',
      title: 'Five chapters. One single movement.',
      lede: [
        'From the outside my career looks scattered: television, digital agency, a motorcycle community, AI, daily podcast. From the inside it was always the same thing — see a problem, build the system that solves it, in service of people.',
        'I’m not an expert on one industry. I’m good at reading the structure of a problem and designing the system that solves it, regardless of the domain. And I’m good at explaining it so anyone gets it. The rest are the tools of each era.',
      ],
      brands: {
        kicker: 'Brands',
        title: 'Brands that have trusted my judgment.',
        p: '20+ years working with global brands — before with Netbangers, today with Navigamo.',
      },
      chapters: [
        {
          years: '1999 — 2010',
          tag: 'The creative base',
          h: 'Broadcast Design at CMI and RCN.',
          body: [
            'I started in 1999 as a junior designer at Buena Imagen TV. Five years later I was running the Design and Animation Department at the CM& newscast; between 2005 and 2010 I did the same for RCN News. I learned to communicate with the discipline of time and brand: produce a hundred pieces a week without losing coherence or fidelity to the newscast behind it.',
            'There was no room to stay in the “creative” bubble: every decision was operational, financial and brand-related. This is where I learned that communicating well is a discipline, not a talent.',
          ],
        },
        {
          years: '2007 — 2026',
          tag: 'The craft',
          h: 'Netbangers — nineteen years doing digital business.',
          body: [
            'I co-founded Netbangers in January 2007. A boutique digital agency in Bogotá, specialized in mass-consumer brands. In nineteen years we collected awards at Effie, FIAP, New York Festivals and Cyber, built our own audio and video studio, and developed proprietary digital audit and dashboard methodologies. That was the root of my financial, operational and real marketing discipline — years before AI was a topic.',
            'But it was also where I saw the erosion. With the rise of social media, clients turned everything into chasing likes. SEO stopped mattering to them. The day-to-day became producing hundreds of pieces that didn’t last more than five hours of life. There was no purpose. That was producing digital trash with good craft.',
            'My conviction that you build from real pain, not to sell more, wasn’t born in a book. It was born from being fed up with the opposite. Netbangers closed for me in May 2026.',
          ],
        },
        {
          years: '2018 — 2023',
          tag: 'The proof',
          h: 'Custom Built Show — the day I had to fly in a judge from Australia.',
          body: [
            'In 2018 I founded Custom Built Show, Latin America’s first custom motorcycle festival. It started because I modify my own motorcycles and, working with workshops in Bogotá, I realized those builders weren’t being paid like artists — they were treated like mechanics. To me they were making art on two wheels, and no one was paying them as such.',
            'For the show to be taken seriously I discovered something uncomfortable: I couldn’t have local judges. The shops weren’t going to feel respected if the jury came from here. So I went abroad and got Marlon Slack, writer at Pipeburn — the most important custom motorcycle publication in the world. I don’t think the builders ever fully believed me until the day I told them I was on my way to their workshop with “the gringo” from Australia. That’s the day I earned their respect. And that’s the day the show truly began.',
            'Two years later, in the middle of the pandemic, we ran the festival with five judges, one per continent. The point wasn’t the prizes: it was that the builders had finally started to understand how good they were.',
            'I had to fly in an Australian judge for a guild to believe in itself. That single line captures, better than any other, LATAM’s problem with its own worth.',
          ],
        },
        {
          years: '2024 — present',
          tag: 'The synthesis',
          h: 'Navigamo — AI stopped being a chat and became a purpose.',
          body: [
            'As I was leaving Netbangers, the first project I built was an e-commerce for pet food. I had been playing with AI since 2022. By late 2023 I started thinking something key: beyond a chat interface, this had to translate into real service value.',
            'The experiment that cracked it open: with my team we built a customer service agent for that e-commerce. Not a clumsy bot like the ones we already knew. It was an assistant capable of recommending food by breed, age and illness of the pet, giving prices per portion and computing the best price per size for a given reference. While everyone was seeing a chatbot, we built an assistant that tells you what to feed your dog by breed and illness, at what price per portion.',
            'That’s the difference between using AI and solving a problem with AI. Navigamo was born from there. Today I’m co-founder and LATAM Director. We build AI solutions that improve lives and create real efficiencies for LATAM companies.',
          ],
        },
        {
          years: '2025 — present',
          tag: 'The regional role',
          h: 'The AI Collective South America — the human counterweight.',
          body: [
            'In July 2025 I took on the South America Regional Directorship of The AI Collective. The largest AI community on the planet: more than 200,000 members, more than 25 chapters, partners like Anthropic, Microsoft, Nvidia, Amazon, Perplexity and Meta. Its mission: to be the human counterweight in an era of AI acceleration — rebuild trust, global collaboration and alignment with human values.',
            'Taking on the region is coherent with what I’ve been thinking: LATAM can be a power on its own terms. Not by replicating the playbook of the North, but by recognizing an edge that is ours — knowing our own problems firsthand. The model is a commodity. The terrain is not.',
          ],
        },
        {
          years: '2025 — present',
          tag: 'The public voice',
          h: 'Pertinente and Métase en mi cabeza — judgment, every day.',
          body: [
            'Métase en mi cabeza started in April 2025. One live episode a week, ~60 minutes, with leaders building the present and future of the region: former CEO of Google Colombia, former ICT Minister, Caracol VP, founders. AI with a human lens, not a technical one.',
            'Pertinente is the most recent. Just me, every day, the four news items that matter on AI, business and geopolitics in the region. No guests, no smoke. The goal: that business owners and leaders understand where money and innovation are heading.',
            'The story ends here, but only in chronological order. This is actually where the rest begins: content is the door. If what I say is useful, we’ll talk about your board or your stage.',
          ],
        },
      ],
      closing: {
        h: 'That’s it. And that’s why this site exists.',
        p: 'I don’t have a straight story because I never cared to have one. The whole trajectory was the same movement applied in different worlds. AI is the current chapter, not the identity. The purpose is the same it has always been — putting talent at the service of improving people’s lives.',
        cta: 'Back to home',
      },
    },
  },
} as const;
