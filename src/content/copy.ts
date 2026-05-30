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
      podcasts: 'Podcasts',
      tesis: 'Tesis',
      trabajo: 'Trabajar conmigo',
      speaking: 'Speaking',
      historia: 'Historia',
      contacto: 'Contacto',
    },
    hero: {
      eyebrow: 'Voz de IA y negocios · Advisor · Speaker',
      title: 'Criterio sobre IA, negocios y LATAM. Publicado todos los días.',
      lede:
        'Soy Camilo Ramírez. Llevo más de 20 años en negocios digitales y hoy publico análisis a diario sobre dónde va el dinero y la innovación en la región. Sin humo, sin hype, sin lealtades a herramientas. Eso es lo primero. Después, si lo que digo le sirve, hablamos de su junta o de su evento.',
      ctaPrimary: 'Escuchar Pertinente',
      ctaSecondary: 'Trabajar conmigo',
      since: 'En negocios digitales desde 1999.',
      latestEyebrow: 'Pertinente · último episodio',
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
          'Análisis diario, ~10 minutos, sobre un tema clave de IA, negocios o geopolítica en LATAM. Para líderes que necesitan entender hacia dónde va el dinero y la innovación, sin hype.',
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
          p: 'La tecnología debería existir para resolverle algo a alguien. Esto lo vengo diciendo desde una charla en TVN Panamá en 2019, años antes de que la IA generativa fuera moda. No es discurso de coyuntura.',
        },
        {
          h: 'LATAM puede ser potencia con reglas propias.',
          p: 'Nuestra ventaja real no es construir los modelos. Esa pelea es de otra liga. Es conocer nuestros problemas en primera persona. El modelo es commodity. El terreno, no.',
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
          p: 'Hago que lo difícil sea fácil de entender. Sin hype, sin abstracciones, sin "el futuro es ahora". Construyo con la sala, no desde el atril. La gente sale habiendo entendido algo concreto que puede usar mañana.',
          for: 'Conferencias, eventos corporativos, juntas anuales y festivales de industria.',
        },
      ],
      filter:
        'Trabajo con quienes quieren mejorar y ayudar a las personas, no recortar a costa de ellas. Es la única vara que aplico.',
    },
    aic: {
      kicker: 'Lidero el ecosistema',
      title: 'Director Regional LATAM · The AI Collective.',
      p: 'La comunidad de IA más grande del planeta: +200.000 miembros, +180 capítulos en 40+ países. Desde 2025 dirijo la región de LATAM. Mi trabajo: empujar el debate de adopción de IA con propósito humano y reglas propias de la región, no a control remoto desde otro hemisferio.',
      partnersLabel: 'Partners',
      cta: 'Conocer The AI Collective',
      href: 'https://aicollective.com',
    },
    navigamo: {
      kicker: 'Construyo IA',
      title: 'Navigamo · cofundador y Director LATAM.',
      claim: 'Construimos IA. No solo opinamos.',
      p: 'Navigamo es la compañía que cofundé en 2024. Diseñamos y operamos soluciones con IA que mejoran vidas y generan eficiencias reales para empresas en LATAM. Es donde aterrizo lo que aconsejo: por eso lo que digo en público no es teoría. Lo estoy ejecutando con un equipo y un producto, en clientes de verdad.',
      cta: 'Ir a Navigamo',
      href: 'https://navigamo.co',
    },
    trayectoria: {
      kicker: 'Trayectoria',
      title: 'Más de 20 años construyendo negocios digitales.',
      lede:
        'De afuera la trayectoria parece dispersa: televisión, agencia digital, una comunidad de motos, IA. Por dentro es el mismo movimiento cada vez: encontrar la estructura de un problema y diseñar el sistema que lo resuelve.',
      steps: [
        {
          years: '1999 — 2010',
          h: 'Broadcast Design',
          p: 'Director del Departamento de Diseño y Animación en CMI y RCN Televisión. Aprendí a comunicar con disciplina de tiempo y de marca.',
        },
        {
          years: '2007 — 2026',
          h: 'Netbangers',
          p: 'Cofundador de la agencia digital. 19 años. Premios en Effie, FIAP, New York Festivals y Cyber. La raíz de mi disciplina financiera, operativa y de marketing real, mucho antes del hype de la IA.',
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
          p: 'Cofundador y Director LATAM de Navigamo. Director Regional LATAM de The AI Collective. Creador y host de Pertinente (diario) y de Métase en mi cabeza (semanal, TV + podcast).',
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
        'Cada solicitud la leo yo. Respondo cuando tengo algo útil que aportar. No siempre inmediato, pero siempre personal.',
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
      title: 'Camilo Ramírez · IA, negocios y LATAM · Pertinente, MEMC, advisory',
      description:
        'Criterio diario sobre IA, negocios y LATAM. Cofundador de Navigamo, Director Regional LATAM de The AI Collective. Host de Pertinente y MEMC.',
      ogAlt: 'Camilo Ramírez · IA, negocios y LATAM',
    },
    speaking: {
      meta: {
        title: 'Speaking · Camilo Ramírez · Conferencista IA, negocios y LATAM',
        description: 'Keynotes, hosting y talleres sobre IA, negocios y la oportunidad de LATAM. Para CEOs, juntas y conferencias. Español o inglés, presencial o virtual, en cualquier parte del mundo.',
      },
      eyebrow: 'Speaking',
      title: 'Conferencista sobre IA, negocios y la oportunidad de LATAM.',
      lede:
        'Llevo a tarima la misma claridad que aplico con CEOs: traduzco la inteligencia artificial al lenguaje del negocio, sin hype, sin abstracciones, con la profundidad técnica suficiente para que no se sienta superficial. Hago que algo difícil sea fácil de entender, y útil el lunes siguiente.',
      ctaPrimary: 'Invítame a tu evento',
      diferenciador: {
        kicker: 'Por qué traerme',
        h: 'IA + negocios + LATAM, en lenguaje humano.',
        p: 'No soy el técnico que complica la conversación ni el evangelista que vende humo. Soy quien traduce: explico cómo la IA cambia las decisiones de su empresa, qué de lo nuevo importa y qué es ruido, y por qué LATAM tiene una ventaja que casi nadie está nombrando. Cuando termino, la sala entiende, y se lleva algo que puede aplicar.',
      },
      temas: {
        kicker: 'Temas',
        h: 'Tres temas, profundos pero accesibles.',
        items: [
          {
            h: 'Gobernanza de IA',
            p: 'Cómo adoptar inteligencia artificial sin perder el control. Riesgos reales, cómo decidir qué construir vs. comprar, qué exigirle a sus proveedores, y por qué la protección de datos no basta. Para juntas directivas y comités de tecnología.',
          },
          {
            h: 'Responsabilidad corporativa con IA',
            p: 'La IA está acelerando decisiones que antes tomaban meses. Cómo navegar su impacto sobre empleo, clientes y comunidad, sin caer en el pánico ni en el lavado de cara. Conversación incómoda, pero necesaria, para líderes que quieren responder bien.',
          },
          {
            h: 'Básicos de IA para C-level',
            p: 'Lo que un CEO o miembro de junta tiene que entender de IA en 60 minutos: qué es un modelo de lenguaje, qué es un agente, qué es ventana de contexto, dónde está el dinero, y cómo evaluar una propuesta de IA sin ser técnico. Cero jerga innecesaria.',
          },
        ],
      },
      formatos: {
        kicker: 'Formatos',
        h: 'Cinco formas de trabajar conmigo en su evento.',
        items: [
          { h: 'Keynotes', p: 'Charlas magistrales de 30 a 60 minutos, con storytelling propio y un mensaje accionable.' },
          { h: 'Hosting de eventos', p: 'Conducción y moderación de jornadas completas, congresos o lanzamientos.' },
          { h: 'Paneles', p: 'Moderación o participación con preparación seria, no con improvisación.' },
          { h: 'Talleres', p: 'Sesiones prácticas de 2 a 4 horas para equipos directivos. Aterrizo los conceptos a su negocio.' },
          { h: 'Capacitaciones', p: 'Programas multi-sesión para equipos de liderazgo o áreas específicas.' },
        ],
      },
      logistica: {
        kicker: 'Logística',
        h: 'Cómo es trabajar conmigo en lo práctico.',
        items: [
          { label: 'Idiomas', value: 'Español (nativo, colombiano neutro) e inglés profesional (C1).' },
          { label: 'Modalidad', value: 'Presencial o virtual. Para virtual tengo setup profesional propio.' },
          { label: 'Geografía', value: 'Base en Bogotá. Disponible para LATAM y cualquier lugar del mundo.' },
          { label: 'Coordinación', value: 'Por correo directo a yo@camilo-ramirez.com. Leo cada propuesta personalmente.' },
        ],
      },
      pruebaSocial: {
        kicker: 'Dónde he estado',
        h: 'Eventos, tarimas, comunidades.',
        p: 'Vengo hablando en público desde mis primeros años en la industria digital. Soy Experienced Speaker certificado y jurado en Effie, FIAP y PromaxBDA. Una muestra representativa:',
        items: [
          { year: '2025 — hoy', event: 'Director Regional LATAM · The AI Collective', context: 'Comunidad de IA más grande del planeta (+200.000 miembros, +180 capítulos). Eventos regionales constantes.' },
          { year: '2024', event: 'Colombia 4.0', context: 'Festival de innovación digital, Bogotá.' },
          { year: '2014 — 2022', event: 'IAB Day · IAB Colombia', context: 'Conferencias anuales del capítulo. Miembro de la junta directiva 8 años.' },
          { year: '2019', event: 'TVN Panamá', context: 'Charla sobre voice search y data. La tesis "construir desde el dolor, no para vender" ya estaba ahí.' },
        ],
      },
      docencia: {
        kicker: 'Docencia',
        h: 'Enseñar es donde más se aprende.',
        items: [
          { h: 'Universidad Jorge Tadeo Lozano', p: 'Docente del Diplomado IAB (2012 a 2016).' },
          { h: 'IAB Colombia', p: 'Miembro de la junta directiva 8 años (2014 a 2022).' },
        ],
      },
      podcasts: {
        kicker: 'En otros podcasts',
        h: 'Conversaciones donde me han invitado.',
        items: [
          { name: 'Coffee', topic: 'sobre blockchain', url: null },
          { name: 'Grupo Energía Bogotá', topic: 'sobre IA', url: null },
          { name: 'Amílcar Sosaya', topic: 'sobre IA', url: null },
          { name: 'Remando en Arequipe', topic: 'sobre vida e IA', url: null },
        ],
      },
      contacto: {
        kicker: 'Contactar',
        h: '¿Quiere llevarme a su evento?',
        p: 'Escríbame directo con el contexto del evento: tipo, audiencia, fecha, ciudad o virtual, idioma. Respondo cada solicitud personalmente.',
        cta: 'Enviar solicitud de speaking',
      },
      faq: {
        kicker: 'Preguntas frecuentes',
        h: 'Sobre contratarme para hablar.',
        items: [
          {
            q: '¿Cómo le contrato?',
            a: 'Escríbame a yo@camilo-ramirez.com con el contexto del evento: tipo, audiencia, fecha, ciudad o virtual, idioma, y presupuesto si lo tiene claro. Le respondo personalmente con disponibilidad y un fee orientativo.',
          },
          {
            q: '¿En qué idioma puede hablar?',
            a: 'Español nativo (colombiano neutro) e inglés profesional (C1). Tarima en cualquiera de los dos sin fricción.',
          },
          {
            q: '¿Presencial o virtual?',
            a: 'Ambos. Para presencial vuelo desde Bogotá. Para virtual tengo setup profesional propio (cámara, audio, iluminación). No improviso desde un laptop.',
          },
          {
            q: '¿Sobre qué temas habla?',
            a: 'Gobernanza de IA, responsabilidad corporativa con IA, y básicos de IA para C-level. El hilo común: traducir la inteligencia artificial al lenguaje del negocio, sin hype y sin abstracciones.',
          },
          {
            q: '¿Usted implementa la IA en mi empresa?',
            a: 'No, la implementación la hace Navigamo, la compañía que cofundé. Yo soy speaker y advisor; ejecutar lo hace mi equipo. Si su evento busca activar a su organización con IA, la charla más el handoff a Navigamo es el flujo natural.',
          },
          {
            q: '¿Acepta charlas pro bono?',
            a: 'Excepcionalmente, alineadas con causas específicas. No es la regla. Mi tiempo y experiencia tienen un precio. Si su organización es sin ánimo de lucro y la causa encaja, escríbame y conversamos.',
          },
          {
            q: '¿Tiene material de tarima (foto, video, sizzle reel)?',
            a: 'En mi LinkedIn y YouTube hay material reciente de tarima.',
          },
        ],
      },
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
        title: 'Historia y trayectoria de Camilo Ramírez · Broadcast Design, Netbangers, Custom Built Show, Navigamo y The AI Collective',
        description:
          'Más de 20 años de Camilo Ramírez: de Broadcast Design en CMI y RCN, a Netbangers, Custom Built Show, Navigamo y The AI Collective. Un mismo patrón en cinco mundos.',
      },
      eyebrow: 'Historia',
      title: 'Cinco capítulos, un mismo movimiento.',
      lede: [
        'De afuera mi trayectoria parece dispersa: televisión, agencia digital, una comunidad de motos, IA, podcast diario. Por dentro siempre fue lo mismo: ver un problema, construir el sistema que lo resuelve, al servicio de las personas.',
        'No soy experto en una industria. Soy bueno leyendo la estructura del problema y diseñando el sistema que lo resuelve, independiente del dominio. Y soy bueno explicándolo de manera que cualquiera lo entienda. Lo demás son las herramientas de cada época.',
      ],
      brands: {
        kicker: 'Marcas',
        title: 'Marcas que han confiado en mi criterio.',
        p: 'Más de 20 años trabajando con marcas globales: antes desde Netbangers, hoy desde Navigamo.',
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
          h: 'Netbangers. Diecinueve años haciendo negocios digitales.',
          body: [
            'Cofundé Netbangers en enero de 2007. Una agencia digital boutique en Bogotá, especializada en marcas de consumo masivo. En diecinueve años recogimos premios en Effie, FIAP, New York Festivals y Cyber, construimos un estudio propio de audio y video, y desarrollamos metodologías propias de auditoría digital y tableros de control. Esa fue la raíz de mi disciplina financiera, operativa y de marketing real, años antes de que la IA fuera tema.',
            'Pero también fue donde vi el desgaste. Con la llegada de las redes sociales, los clientes se volcaron a perseguir likes. El SEO dejó de importarles. El día a día se redujo a producir cientos de piezas que no duraban más de cinco horas con vida. No tenía un propósito. Eso era crear basura digital con buena producción.',
            'Mi convicción de "construir desde el dolor real, no para vender" no nació de un libro. Nació de hartarme de lo contrario. Netbangers cerró para mí en mayo de 2026.',
          ],
        },
        {
          years: '2018 — 2023',
          tag: 'La prueba',
          h: 'Custom Built Show. El día que tuve que traer un juez de Australia.',
          body: [
            'En 2018 fundé Custom Built Show, el primer festival de motos modificadas de Latinoamérica. Empezó porque modifico mis propias motos y, conociendo talleres en Bogotá, me di cuenta de que a esos constructores no les pagaban como artistas. Los trataban como mecánicos. Para mí estaban haciendo arte sobre dos ruedas y nadie les pagaba como tal.',
            'Para que el show fuera válido descubrí algo incómodo: no podía tener jueces locales. Los talleres no iban a sentir respeto si el jurado era de aquí. Salí a buscar afuera y conseguí a Marlon Slack, redactor de Pipeburn, la publicación de motos custom más importante del mundo. Creo que los constructores nunca me creyeron en serio hasta el día que les dije que iba rumbo a su taller con "el gringo" de Australia a conocerlos. Ese día me gané el respeto. Y ese día el show de verdad comenzó.',
            'Dos años después, en plena pandemia, hicimos el festival con cinco jueces, uno por continente. Lo importante no fueron los premios: fue que los constructores ya habían empezado a entender lo buenos que eran.',
            'Tuve que traer un juez de Australia para que un gremio se creyera bueno. Esa frase resume, mejor que ninguna otra, el problema de LATAM con su propio valor.',
          ],
        },
        {
          years: '2024 — hoy',
          tag: 'La síntesis',
          h: 'Navigamo. La IA dejó de ser un chat y se volvió propósito.',
          body: [
            'Saliendo de Netbangers, el primer proyecto que armé fue un e-commerce de alimentos para mascotas. Venía jugando con IA desde 2022. A finales de 2023 empecé a pensar algo clave: más allá de una interfaz de chat, esto tenía que traducirse en un servicio de valor real.',
            'El experimento que me abrió la cabeza: con mi equipo creamos un agente de atención al cliente para ese e-commerce. No un bot torpe como los que ya se conocían. Era un asistente capaz de recomendar alimentos según raza, edad y enfermedades de la mascota, dar precios por ración y calcular el mejor precio según el tamaño de cada referencia. Mientras todos veían un chatbot, nosotros construimos un asistente que le dice qué darle de comer a su perro según la raza y la enfermedad, y a qué precio por ración.',
            'Esa es la diferencia entre usar IA y resolver un problema con IA. De ahí nació Navigamo. Hoy soy cofundador y Director LATAM. Construimos soluciones con IA que mejoran vidas y generan eficiencias reales para empresas en LATAM.',
          ],
        },
        {
          years: '2025 — hoy',
          tag: 'El rol regional',
          h: 'The AI Collective LATAM. El contrapeso humano.',
          body: [
            'En julio de 2025 asumí la Dirección Regional de LATAM de The AI Collective. Es la comunidad de IA más grande del planeta: más de 200.000 miembros, más de 180 capítulos en 40+ países, partners como Anthropic, Microsoft, Nvidia, Amazon, Perplexity y Meta. Su misión es ser el contrapeso humano en la era de aceleración de la IA: reconstruir confianza, colaboración global y alineación con valores humanos.',
            'Asumir la región es coherente con lo que vengo pensando: LATAM puede ser potencia con reglas propias. No por replicar el manual del norte, sino por reconocer una ventaja que es nuestra: conocer nuestros problemas en primera persona. El modelo es commodity. El terreno, no.',
          ],
        },
        {
          years: '2025 — hoy',
          tag: 'La voz pública',
          h: 'Pertinente y Métase en mi cabeza. El criterio, todos los días.',
          body: [
            'Métase en mi cabeza arrancó en abril de 2025. Un episodio en vivo por semana, ~60 minutos, con líderes que están construyendo el presente y el futuro de la región: ex CEO de Google Colombia, ex Ministro TIC, VP de Caracol, fundadores. IA con visión humana, no técnica.',
            'Pertinente es lo más reciente. Yo solo, todos los días, ~10 minutos analizando un tema clave de IA, negocios o geopolítica en LATAM. Sin invitados, sin hype. El objetivo: que dueños de empresa y líderes entiendan hacia dónde va el dinero y la innovación.',
            'Acá termina la historia, pero solo en orden cronológico. En realidad es donde empieza el resto: el contenido es la puerta. Si lo que digo le sirve, hablamos de su junta o de su evento.',
          ],
        },
      ],
      closing: {
        h: 'Eso es todo. Y por eso este sitio existe.',
        p: 'No tengo una historia recta porque nunca me interesó tenerla. La trayectoria entera fue un mismo movimiento aplicado en mundos distintos. La IA es el capítulo actual, no la identidad. El propósito sigue siendo el mismo de siempre: poner el talento al servicio de mejorar la vida de las personas.',
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
      speaking: 'Speaking',
      historia: 'Story',
      contacto: 'Contact',
    },
    hero: {
      eyebrow: 'Voice on AI & business · Advisor · Speaker',
      title: 'Judgment on AI, business and LATAM. Published every day.',
      lede:
        'I’m Camilo Ramírez. 20+ years in digital business, and today I publish daily analysis on where money and innovation are heading in the region. No hype, no smoke, no allegiance to tools. That comes first. Then, if what I say is useful, we talk about your board or your stage.',
      ctaPrimary: 'Listen to Pertinente',
      ctaSecondary: 'Work with me',
      since: 'In digital business since 1999.',
      latestEyebrow: 'Pertinente · latest episode',
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
          'Daily analysis, ~10 minutes, on one key topic in AI, business or geopolitics across LATAM. For leaders who need to understand where money and innovation are heading, without hype.',
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
          p: 'Technology should exist to solve something for someone. I’ve been saying this since a talk at TVN Panama in 2019, years before generative AI was fashionable. It isn’t opportunistic narrative.',
        },
        {
          h: 'LATAM can be a power on its own terms.',
          p: 'Our real edge isn’t building the models. That fight belongs to another league. It’s knowing our own problems firsthand. The model is a commodity. The terrain is not.',
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
          p: 'I make hard things easy to understand. No hype, no abstractions, no “the future is now.” I build with the room, not from the podium. People leave having understood something concrete they can use the next morning.',
          for: 'Conferences, corporate events, annual meetings and industry festivals.',
        },
      ],
      filter:
        'I work with people who want to improve and help others, not cut at their expense. That’s the only yardstick.',
    },
    aic: {
      kicker: 'I lead the ecosystem',
      title: 'Regional Director for LATAM · The AI Collective.',
      p: 'The largest AI community on the planet: 200,000+ members, 180+ chapters across 40+ countries. Since 2025 I lead the LATAM region. My job: push the conversation on AI adoption with human purpose and LATAM’s own rules, not remote-controlled from another hemisphere.',
      partnersLabel: 'Partners',
      cta: 'Explore The AI Collective',
      href: 'https://aicollective.com',
    },
    navigamo: {
      kicker: 'I build AI',
      title: 'Navigamo · co-founder and LATAM Director.',
      claim: 'We build AI. We don’t just talk about it.',
      p: 'Navigamo is the company I co-founded in 2024. We design and operate AI solutions that improve lives and create real efficiencies for LATAM companies. This is where the advice lands: that’s why what I say in public isn’t theory. I’m executing it with a team and a product, with real clients.',
      cta: 'Go to Navigamo',
      href: 'https://navigamo.co',
    },
    trayectoria: {
      kicker: 'Track record',
      title: '20+ years building digital businesses.',
      lede:
        'From the outside it looks scattered: television, digital agency, a motorcycle community, AI. From the inside it’s the same move every time: finding the structure of a problem and designing the system that solves it.',
      steps: [
        {
          years: '1999 — 2010',
          h: 'Broadcast Design',
          p: 'Head of the Design and Animation Department at CMI and at RCN Television. I learned to communicate with the discipline of time and brand.',
        },
        {
          years: '2007 — 2026',
          h: 'Netbangers',
          p: 'Co-founder of the digital agency. 19 years. Effie, FIAP, New York Festivals and Cyber awards. The root of my financial, operational and real marketing discipline, long before the AI hype.',
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
          p: 'Co-founder and LATAM Director at Navigamo. Regional Director for LATAM at The AI Collective. Creator and host of Pertinente (daily) and Métase en mi cabeza (weekly, TV + podcast).',
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
        'I read every request myself. I reply when I have something useful to add. Not always immediately, but always personally.',
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
      title: 'Camilo Ramírez · AI, business and LATAM · Pertinente, MEMC, advisory',
      description:
        'Daily judgment on AI, business and LATAM. Co-founder of Navigamo, Regional Director for LATAM at The AI Collective. Host of Pertinente and MEMC.',
      ogAlt: 'Camilo Ramírez · AI, business and LATAM',
    },
    speaking: {
      meta: {
        title: 'Speaking · Camilo Ramírez · AI, business and LATAM keynote speaker',
        description: 'Keynotes, event hosting and workshops on AI, business and the LATAM opportunity. For CEOs, boards and conferences. Spanish or English, in person or virtual, anywhere in the world.',
      },
      eyebrow: 'Speaking',
      title: 'Keynote speaker on AI, business and the LATAM opportunity.',
      lede:
        'I bring the same clarity I apply with CEOs to the stage: I translate AI into the language of business, no hype, no abstractions, with enough technical depth that it never feels shallow. I make hard things easy to understand, and useful by Monday morning.',
      ctaPrimary: 'Invite me to your event',
      diferenciador: {
        kicker: 'Why book me',
        h: 'AI + business + LATAM, in human language.',
        p: 'I’m not the technical guy who overcomplicates the conversation, and I’m not the evangelist who sells smoke. I translate: I explain how AI changes your company’s decisions, what new things matter and what is noise, and why LATAM has an edge almost nobody is naming. When I finish, the room understands, and leaves with something they can actually apply.',
      },
      temas: {
        kicker: 'Topics',
        h: 'Three topics, deep but accessible.',
        items: [
          {
            h: 'AI Governance',
            p: 'How to adopt AI without losing control. Real risks, build vs. buy decisions, what to demand from vendors, and why data protection alone isn’t enough. For boards and technology committees.',
          },
          {
            h: 'Corporate responsibility with AI',
            p: 'AI is accelerating decisions that used to take months. How to navigate its impact on employment, customers and community, without panic and without window-dressing. An uncomfortable but necessary conversation for leaders who want to respond well.',
          },
          {
            h: 'AI fundamentals for C-level',
            p: 'What a CEO or board member needs to understand about AI in 60 minutes: language models, agents, context window, where the money is, and how to evaluate an AI proposal without being technical. Zero unnecessary jargon.',
          },
        ],
      },
      formatos: {
        kicker: 'Formats',
        h: 'Five ways to work with me at your event.',
        items: [
          { h: 'Keynotes', p: '30 to 60-minute talks with my own storytelling and an actionable takeaway.' },
          { h: 'Event hosting', p: 'Hosting and moderation of full-day events, congresses or launches.' },
          { h: 'Panels', p: 'Moderation or participation, with serious prep, not improvisation.' },
          { h: 'Workshops', p: '2 to 4-hour hands-on sessions for executive teams. I land the concepts in your business.' },
          { h: 'Training programs', p: 'Multi-session programs for leadership teams or specific areas.' },
        ],
      },
      logistica: {
        kicker: 'Logistics',
        h: 'How it works in practice.',
        items: [
          { label: 'Languages', value: 'Spanish (native, neutral Colombian) and professional English (C1).' },
          { label: 'Format', value: 'In person or virtual. For virtual I have a professional setup of my own.' },
          { label: 'Geography', value: 'Based in Bogotá. Available across LATAM and anywhere in the world.' },
          { label: 'Coordination', value: 'Direct email to yo@camilo-ramirez.com. I read every request personally.' },
        ],
      },
      pruebaSocial: {
        kicker: 'Where I’ve spoken',
        h: 'Events, stages, communities.',
        p: 'I’ve been speaking publicly since my early years in the digital industry. Certified Experienced Speaker and jury member at Effie, FIAP and PromaxBDA. A representative sample:',
        items: [
          { year: '2025 — present', event: 'Regional Director LATAM · The AI Collective', context: 'Largest AI community on the planet (200,000+ members, 180+ chapters). Constant regional events.' },
          { year: '2024', event: 'Colombia 4.0', context: 'Bogotá digital innovation festival.' },
          { year: '2014 — 2022', event: 'IAB Day · IAB Colombia', context: 'Annual conferences of the IAB Colombia chapter. Board member for 8 years.' },
          { year: '2019', event: 'TVN Panama', context: 'Talk on voice search and data. The thesis "build from real pain, not to sell" was already there.' },
        ],
      },
      docencia: {
        kicker: 'Teaching',
        h: 'Teaching is where you learn the most.',
        items: [
          { h: 'Universidad Jorge Tadeo Lozano', p: 'IAB Diploma instructor (2012 to 2016).' },
          { h: 'IAB Colombia', p: 'Board member for 8 years (2014 to 2022).' },
        ],
      },
      podcasts: {
        kicker: 'On other podcasts',
        h: 'Conversations I’ve been invited to.',
        items: [
          { name: 'Coffee', topic: 'on blockchain', url: null },
          { name: 'Grupo Energía Bogotá', topic: 'on AI', url: null },
          { name: 'Amílcar Sosaya', topic: 'on AI', url: null },
          { name: 'Remando en Arequipe', topic: 'on life and AI', url: null },
        ],
      },
      contacto: {
        kicker: 'Contact',
        h: 'Want me on your stage?',
        p: 'Write directly with the event context: type, audience, date, city or virtual, language. I reply personally to every request.',
        cta: 'Send speaking request',
      },
      faq: {
        kicker: 'Frequently asked',
        h: 'About booking me to speak.',
        items: [
          {
            q: 'How do I book you?',
            a: 'Email me at yo@camilo-ramirez.com with the event context: type, audience, date, city or virtual, language, and budget if you have one in mind. I’ll reply personally with availability and an indicative fee.',
          },
          {
            q: 'In what language can you speak?',
            a: 'Native Spanish (neutral Colombian) and professional English (C1). On stage in either with no friction.',
          },
          {
            q: 'In person or virtual?',
            a: 'Both. For in-person I fly from Bogotá. For virtual I have my own professional setup (camera, audio, lighting). I don’t improvise from a laptop.',
          },
          {
            q: 'What topics do you cover?',
            a: 'AI governance, corporate responsibility with AI, and AI fundamentals for C-level. The common thread: translating AI into the language of business, without hype.',
          },
          {
            q: 'Do you implement AI in my company?',
            a: 'No, implementation is done by Navigamo, the company I co-founded. I’m a speaker and advisor; execution is done by my team. If your event is meant to activate your organization with AI, the talk plus the handoff to Navigamo is the natural flow.',
          },
          {
            q: 'Do you accept pro bono talks?',
            a: 'Occasionally, aligned with specific causes. It is not the rule. My time and experience have a price. If your organization is non-profit and the cause fits, write me and we’ll talk.',
          },
          {
            q: 'Do you have stage material (photo, video, sizzle reel)?',
            a: 'My LinkedIn and YouTube have recent stage material.',
          },
        ],
      },
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
        title: 'Story and track record of Camilo Ramírez · Broadcast Design, Netbangers, Custom Built Show, Navigamo and The AI Collective',
        description:
          'Over 20 years of Camilo Ramírez: from Broadcast Design at CMI and RCN to Netbangers, Custom Built Show, Navigamo and The AI Collective. One pattern across five worlds.',
      },
      eyebrow: 'Story',
      title: 'Five chapters. One single movement.',
      lede: [
        'From the outside my career looks scattered: television, digital agency, a motorcycle community, AI, daily podcast. From the inside it was always the same thing: see a problem, build the system that solves it, in service of people.',
        'I’m not an expert on one industry. I’m good at reading the structure of a problem and designing the system that solves it, regardless of the domain. And I’m good at explaining it so anyone gets it. The rest are the tools of each era.',
      ],
      brands: {
        kicker: 'Brands',
        title: 'Brands that have trusted my judgment.',
        p: '20+ years working with global brands: before with Netbangers, today with Navigamo.',
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
          h: 'Netbangers. Nineteen years doing digital business.',
          body: [
            'I co-founded Netbangers in January 2007. A boutique digital agency in Bogotá, specialized in mass-consumer brands. In nineteen years we collected awards at Effie, FIAP, New York Festivals and Cyber, built our own audio and video studio, and developed proprietary digital audit and dashboard methodologies. That was the root of my financial, operational and real marketing discipline, years before AI was a topic.',
            'But it was also where I saw the erosion. With the rise of social media, clients turned everything into chasing likes. SEO stopped mattering to them. The day-to-day became producing hundreds of pieces that didn’t last more than five hours of life. There was no purpose. That was producing digital trash with good craft.',
            'My conviction that you build from real pain, not to sell more, wasn’t born in a book. It was born from being fed up with the opposite. Netbangers closed for me in May 2026.',
          ],
        },
        {
          years: '2018 — 2023',
          tag: 'The proof',
          h: 'Custom Built Show. The day I had to fly in a judge from Australia.',
          body: [
            'In 2018 I founded Custom Built Show, Latin America’s first custom motorcycle festival. It started because I modify my own motorcycles and, working with workshops in Bogotá, I realized those builders weren’t being paid like artists. They were treated like mechanics. To me they were making art on two wheels, and no one was paying them as such.',
            'For the show to be taken seriously I discovered something uncomfortable: I couldn’t have local judges. The shops weren’t going to feel respected if the jury came from here. So I went abroad and got Marlon Slack, writer at Pipeburn, the most important custom motorcycle publication in the world. I don’t think the builders ever fully believed me until the day I told them I was on my way to their workshop with “the gringo” from Australia. That’s the day I earned their respect. And that’s the day the show truly began.',
            'Two years later, in the middle of the pandemic, we ran the festival with five judges, one per continent. The point wasn’t the prizes: it was that the builders had finally started to understand how good they were.',
            'I had to fly in an Australian judge for a guild to believe in itself. That single line captures, better than any other, LATAM’s problem with its own worth.',
          ],
        },
        {
          years: '2024 — present',
          tag: 'The synthesis',
          h: 'Navigamo. AI stopped being a chat and became a purpose.',
          body: [
            'As I was leaving Netbangers, the first project I built was an e-commerce for pet food. I had been playing with AI since 2022. By late 2023 I started thinking something key: beyond a chat interface, this had to translate into real service value.',
            'The experiment that cracked it open: with my team we built a customer service agent for that e-commerce. Not a clumsy bot like the ones we already knew. It was an assistant capable of recommending food by breed, age and illness of the pet, giving prices per portion and computing the best price per size for a given reference. While everyone was seeing a chatbot, we built an assistant that tells you what to feed your dog by breed and illness, at what price per portion.',
            'That’s the difference between using AI and solving a problem with AI. Navigamo was born from there. Today I’m co-founder and LATAM Director. We build AI solutions that improve lives and create real efficiencies for LATAM companies.',
          ],
        },
        {
          years: '2025 — present',
          tag: 'The regional role',
          h: 'The AI Collective LATAM. The human counterweight.',
          body: [
            'In July 2025 I took on the LATAM Regional Directorship of The AI Collective. The largest AI community on the planet: more than 200,000 members, more than 180 chapters across 40+ countries, partners like Anthropic, Microsoft, Nvidia, Amazon, Perplexity and Meta. Its mission: to be the human counterweight in an era of AI acceleration, rebuilding trust, global collaboration and alignment with human values.',
            'Taking on the region is coherent with what I’ve been thinking: LATAM can be a power on its own terms. Not by replicating the playbook of the North, but by recognizing an edge that is ours: knowing our own problems firsthand. The model is a commodity. The terrain is not.',
          ],
        },
        {
          years: '2025 — present',
          tag: 'The public voice',
          h: 'Pertinente and Métase en mi cabeza. Judgment, every day.',
          body: [
            'Métase en mi cabeza started in April 2025. One live episode a week, ~60 minutes, with leaders building the present and future of the region: former CEO of Google Colombia, former ICT Minister, Caracol VP, founders. AI with a human lens, not a technical one.',
            'Pertinente is the most recent. Just me, every day, ~10 minutes analyzing one key topic in AI, business or geopolitics across LATAM. No guests, no hype. The goal: that business owners and leaders understand where money and innovation are heading.',
            'The story ends here, but only in chronological order. This is actually where the rest begins: content is the door. If what I say is useful, we’ll talk about your board or your stage.',
          ],
        },
      ],
      closing: {
        h: 'That’s it. And that’s why this site exists.',
        p: 'I don’t have a straight story because I never cared to have one. The whole trajectory was the same movement applied in different worlds. AI is the current chapter, not the identity. The purpose is the same it has always been: putting talent at the service of improving people’s lives.',
        cta: 'Back to home',
      },
    },
  },
} as const;
