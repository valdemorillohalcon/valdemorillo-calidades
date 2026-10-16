// Base de datos inicial basada en la Memoria Previa de Calidades (30/7/2026)
// Proyecto: CALLE ALCÓN Nº 9 - VALDEMORILLO (Laura y Alejandro)
// Calificación Energética: A (Priorizando aislamientos y eficiencia)

const INITIAL_MATERIALS = [
  // =========================================================================
  // 1. CIMENTACIÓN Y CONTENCIÓN
  // =========================================================================
  {
    id: "cim-1",
    chapter: "cimentacion",
    chapterName: "Cimentación y Forjados",
    name: "Zanja corrida de hormigón ligeramente armado",
    location: "Muro de cierre de parcela y fachada a calle",
    needsOwnerCriteria: false,
    criteriaNotes: "Definido por proyecto técnico. El constructor debe comprobar cotas de zanja y cimentación.",
    explanation: "Base estructural de hormigón para sustentar el muro exterior perimetral de la parcela hacia la calle.",
    specMemoria: "Zanja corrida de H. ligeramente armada, en muro de cierre de parcela, fachada a calle. H.A.-LIGERAMENTE ARMADO.",
    unitType: "ml",
    quantity: 25,
    wastagePercent: 0,
    targetUnitPrice: 65,
    status: "selected",
    selectedOptionId: "opt-cim-1",
    options: [
      {
        id: "opt-cim-1",
        title: "Zanja corrida H.A. según proyecto estructural",
        provider: "Obra / Constructor",
        price: 65,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80",
        notes: "Incluye excavación y vertido de hormigón armado."
      }
    ],
    comments: [],
    builderNotes: "El constructor debe replantear sobre el terreno natural y comprobar la cota de asiento firme."
  },
  {
    id: "cim-2",
    chapter: "cimentacion",
    chapterName: "Cimentación y Forjados",
    name: "Cámara de aire en forjado sanitario",
    location: "Bajo toda la planta baja de la vivienda",
    needsOwnerCriteria: false,
    criteriaNotes: "Ya ejecutado en obra.",
    explanation: "Cámara ventilada que aísla la vivienda del terreno natural, evitando humedades por capilaridad y la acumulación del gas Radón.",
    specMemoria: "Cámara de aire. FORJADO SANITARIO (realizado).",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 0,
    status: "selected",
    selectedOptionId: "opt-cim-2",
    options: [
      {
        id: "opt-cim-2",
        title: "Forjado sanitario ejecutado",
        provider: "Existente",
        price: 0,
        url: "",
        imageUrl: "",
        notes: "Partida ya ejecutada en fase previa."
      }
    ],
    comments: [],
    builderNotes: "Verificar estanqueidad y limpieza interior antes de cerrar registros."
  },
  {
    id: "cim-3",
    chapter: "cimentacion",
    chapterName: "Cimentación y Forjados",
    name: "Protección Gas Radón DB-HS6 (Ventilación de cámara)",
    location: "Cámara sanitaria perimetral",
    needsOwnerCriteria: false,
    criteriaNotes: "Exigencia normativa de salubridad Código Técnico DB-HS6 (zona de Valdemorillo con presencia de radón).",
    explanation: "Perforación y colocación de 6 tubos pasamuros de PVC de 100 mm con rejillas exteriores para asegurar la ventilación cruzada continua del forjado sanitario y expulsar el gas radón.",
    specMemoria: "Protección a exposición a G Radón - HS6: Ventilación de cámara, realización de taladros para tubos de PVC de 100 mm con sus rejillas (6 UD).",
    unitType: "ud",
    quantity: 6,
    wastagePercent: 0,
    targetUnitPrice: 45,
    status: "selected",
    selectedOptionId: "opt-cim-3",
    options: [
      {
        id: "opt-cim-3",
        title: "Kit tubo PVC Ø100mm + Rejilla metálica lacada antinsectos",
        provider: "Almacén fontanería / Suministros",
        price: 45,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format&fit=crop&q=80",
        notes: "6 unidades repartidas en caras opuestas para favorecer tiro natural."
      }
    ],
    comments: [],
    builderNotes: "Instalar con ligera pendiente hacia el exterior para evitar entrada de agua de lluvia y colocar malla anti-roedores."
  },
  {
    id: "cim-4",
    chapter: "cimentacion",
    chapterName: "Cimentación y Forjados",
    name: "Dado macizo de hormigón para desembarque de escalera",
    location: "Arranque de futura escalera bajo cubierta",
    needsOwnerCriteria: false,
    criteriaNotes: "Base de soporte mecánico para la estructura de la escalera.",
    explanation: "Macizo de apoyo de 50x50x80 cm en hormigón armado con dos placas de anclaje de 120x120x0.8 mm soldadas a viga para asegurar la fijación sólida de la zanca de la escalera.",
    specMemoria: "Dado de macizo de hormigón para soporte de arranque y placa sobre viga en desembarque de escalera: dado aproximadamente de 50x50x80 cm y dos placas de 120x120x0.8 mm soldadas a viga.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 280,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cim-4",
        title: "Dado de H.A. 50x50x80cm + 2 placas metálicas soldadas",
        provider: "Estructurista / Cerrajero",
        price: 280,
        url: "",
        imageUrl: "",
        notes: "Dejar enrasado o a cota de solado según detalle final de escalera."
      }
    ],
    comments: [],
    builderNotes: "Coordinar con el cerrajero de la escalera modular antes de hormigonar para verificar posición exacta de pernos."
  },

  // =========================================================================
  // 2. ESTRUCTURA
  // =========================================================================
  {
    id: "est-1",
    chapter: "estructura",
    chapterName: "Estructura Portante",
    name: "Soportes verticales: Pilares de acero doble U",
    location: "Estructura general y apoyo de cubierta",
    needsOwnerCriteria: false,
    criteriaNotes: "Pilares ejecutados. Requiere adaptar alturas de coronación en cubierta.",
    explanation: "Pilares metálicos formados por perfiles UPN soldados en cajón que sustentan la cubierta. Falta recrecer o recortar a la cota definitiva de faldones.",
    specMemoria: "Soportes verticales: Pilares de acero (doble U ejecutados, falta adaptar alturas en los de cubierta).",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 450,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-est-1",
        title: "Corte y recrecido de pilares UPN con pletina de coronación",
        provider: "Cerrajero / Estructurista",
        price: 450,
        url: "",
        imageUrl: "",
        notes: "Incluye soldadura homologada e imprimación antioxidante."
      }
    ],
    comments: [],
    builderNotes: "Comprobar niveles láser con aparejador antes de fijar las correas de cubierta."
  },
  {
    id: "est-2",
    chapter: "estructura",
    chapterName: "Estructura Portante",
    name: "Hueco para futura escalera en techo de tendedero",
    location: "Forjado de techo de tendedero hacia bajo cubierta",
    needsOwnerCriteria: false,
    criteriaNotes: "Apertura para comunicación con espacio bajo cubierta.",
    explanation: "Corte controlado de una vigueta del forjado unidireccional existente y refuerzo estructural mediante viga brochal metálica para abrir el hueco de paso de la escalera.",
    specMemoria: "Ejecución de hueco para futura escalera: Corte de una vigueta y realización de viga portante (de la vigueta cortada), para apertura de hueco en forjado en techo de tendedero, previsión de colocación de escalera.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 650,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-est-2",
        title: "Apertura de hueco + viga portante brochal de refuerzo",
        provider: "Estructurista",
        price: 650,
        url: "",
        imageUrl: "",
        notes: "Apuntalamiento previo de seguridad durante el corte de la vigueta."
      }
    ],
    comments: [],
    builderNotes: "Imprescindible apuntalar vanos contiguos antes de realizar cualquier corte en el forjado."
  },
  {
    id: "est-3",
    chapter: "estructura",
    chapterName: "Estructura Portante",
    name: "Faldones de cubierta a dos aguas: Panel Sándwich 50mm + Correas",
    location: "Cubierta principal de la vivienda",
    needsOwnerCriteria: false,
    criteriaNotes: "Aislamiento térmico base y soporte de la cobertura de teja.",
    explanation: "Estructura portante de correas de acero estructural de 40x80 mm con placas de panel sándwich de 50 mm galvanizado y núcleo de poliestireno extruido (XPS), aprovechando perfiles estocados en obra.",
    specMemoria: "Formación de faldones de cubierta a dos aguas: Placas de panel de sándwich (50 mm) de acero galvanizado con aislamiento de XPS, colocadas sobre correas de acero estructural (de 40x80 mm a aportar); adaptar pilares y realizar la estructura portante con el material que está estocado en obra.",
    unitType: "m2",
    quantity: 130,
    wastagePercent: 5,
    targetUnitPrice: 42,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-est-3",
        title: "Panel sándwich 50mm XPS cara galvanizada + correas 40x80mm",
        provider: "Distribuidor cubiertas / Almacén hierro",
        price: 42,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop&q=80",
        notes: "Garantiza base impermeable y aislamiento continuo."
      }
    ],
    comments: [],
    builderNotes: "Comprobar inventario exacto de perfiles de acero ya disponibles en la parcela para minimizar compra de nuevo material."
  },

  // =========================================================================
  // 3. CUBIERTAS
  // =========================================================================
  {
    id: "cub-1",
    chapter: "cubiertas",
    chapterName: "Cubiertas y Evacuación",
    name: "Cobertura de tejas de hormigón a dos aguas y remates",
    location: "Tejado principal exterior",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro deben validar el color/acabado de la teja de hormigón (gris antracita, pizarra o envejecida).",
    explanation: "Cobertura exterior de teja de hormigón de alta durabilidad y resistencia a heladas en Valdemorillo. Incluye piezas especiales de cumbrera, ventilación, remates laterales y canalones con bajantes de evacuación.",
    specMemoria: "Cubierta - Cobertura: Tejas de hormigón a dos aguas (con canalones bajantes y piezas de cumbreras, remates laterales y de ventilación).",
    unitType: "m2",
    quantity: 130,
    wastagePercent: 7,
    targetUnitPrice: 34,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cub-1a",
        title: "Teja hormigón BMI Cobert Gredos / Escandella Gris Pizarra",
        provider: "BMI Cobert / La Escandella",
        price: 34,
        url: "https://www.bmigroup.com/es/",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente comportamiento ante heladas de la sierra y estética moderna."
      },
      {
        id: "opt-cub-1b",
        title: "Teja de hormigón rústica envejecida tonos marrones",
        provider: "Almacén de construcción local",
        price: 32,
        url: "",
        imageUrl: "",
        notes: "Estilo más tradicional integrado en la zona."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Ver si el color gris oscuro encaja mejor con las ventanas imitación madera exterior.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Colocar fijación mecánica en piezas de cumbrera y aleros conforme a normativa eólicas de la sierra."
  },
  {
    id: "cub-2",
    chapter: "cubiertas",
    chapterName: "Cubiertas y Evacuación",
    name: "Bandejas de vuelos revestidas con placas cementicias",
    location: "Vuelos y cornisas de cubierta",
    needsOwnerCriteria: true,
    criteriaNotes: "Elegir color de pintura exterior para el acabado de los aleros.",
    explanation: "Revestimiento inferior de los aleros y vuelos de cubierta con placas de cemento tipo Aquapanel/cementicias, preparadas para intemperie y listas para pintar.",
    specMemoria: "Bandejas de vuelos: Revestidas con placas cementicias para pintar.",
    unitType: "ml",
    quantity: 38,
    wastagePercent: 5,
    targetUnitPrice: 28,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cub-2",
        title: "Placa cementicia exterior tipo Knauf Aquapanel Outdoor",
        provider: "Knauf / Pladur",
        price: 28,
        url: "https://www.knauf.es/",
        imageUrl: "",
        notes: "Resiste lluvia, humedad y cambios bruscos de temperatura sin deformarse."
      }
    ],
    comments: [],
    builderNotes: "Tratar juntas con malla y mortero elástico cementoso antes de dar la pintura plástica exterior."
  },

  // =========================================================================
  // 4. FACHADAS Y CERRAMIENTO EXTERIOR
  // =========================================================================
  {
    id: "fac-1",
    chapter: "fachadas",
    chapterName: "Fachadas y Envolvente",
    name: "Fachada de ladrillo cara vista claro tipo Malpesa + Zócalo",
    location: "Envolvente exterior de toda la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro deben seleccionar el tono exacto (blanco esmaltado, arena, beige claro o klinker claro) y el tipo de llagueado (enrasado o rehundido).",
    explanation: "Fábrica de 1/2 pie de ladrillo cara vista por extrusión de alta calidad (tipo Malpesa o similar) en tonos claros que reflejan la radiación solar estival. La base arranca con un zócalo en gres para proteger de salpicaduras del suelo.",
    specMemoria: "Fachadas ladrillo cara vista colores claros: 1/2 pie de ladrillo cara vista (por extrusión) Tipo Malpesa o similar, con arranque de zócalo en gres.",
    unitType: "m2",
    quantity: 165,
    wastagePercent: 7,
    targetUnitPrice: 46,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-fac-1a",
        title: "Ladrillo Malpesa Klinker Blanco / Arena Ibiza",
        provider: "Cerámicas Malpesa",
        price: 48,
        url: "https://www.malpesa.com/",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80",
        notes: "Muy baja absorción de agua, no se mancha y no requiere mantenimiento."
      },
      {
        id: "opt-fac-1b",
        title: "Ladrillo cara vista hidrofugado tono marfil claro La Paloma",
        provider: "Cerámica La Paloma",
        price: 43,
        url: "https://www.ceramicapalomabarco.com/",
        imageUrl: "",
        notes: "Tono cálido y precio más ajustado."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Pedir muestra física al constructor o almacén para verla a la luz natural en la parcela.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Utilizar mortero hidrófugo M-7,5 y respetar el zócalo de gres inferior para evitar absorción capilar de agua desde aceras."
  },
  {
    id: "fac-2",
    chapter: "fachadas",
    chapterName: "Fachadas y Envolvente",
    name: "Chimenea francesa interior y barbacoa exterior",
    location: "Salón interior y porche exterior",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro deben decidir el tipo de casete/hogar cerrado para la chimenea interior y el diseño de la barbacoa.",
    explanation: "Formación de conducto y hueco para chimenea francesa en salón (con previsión eléctrica para ventilador si procede) y barbacoa de obra en el porche exterior.",
    specMemoria: "Formación de chimenea francesa por el interior y barbacoa por el exterior.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 950,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-fac-2",
        title: "Construcción de conductos dobles refractarios + embocaduras",
        provider: "Albañilería de obra",
        price: 950,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80",
        notes: "Incluye remate superior estanco con sombrerete aspirador estático."
      }
    ],
    comments: [],
    builderNotes: "El conducto de humos debe sobrepasar 1 metro la cumbrera más alta conforme a normativa de incendios."
  },
  {
    id: "fac-3",
    chapter: "fachadas",
    chapterName: "Fachadas y Envolvente",
    name: "Respiradores en hastiales de cubierta",
    location: "Hastiales de fachada en faldones de cubierta",
    needsOwnerCriteria: false,
    criteriaNotes: "Ventilación natural del espacio bajo cubierta para evitar condensaciones.",
    explanation: "2 respiradores con rejilla antinsectos o piezas cerámicas ranuradas para tiro continuo del bajo cubierta.",
    specMemoria: "Respiradores en hastiales de cubierta: 2 respiradores con rejilla y/o ventilaciones con piezas de ladrillo.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 60,
    status: "selected",
    selectedOptionId: "opt-fac-3",
    options: [
      {
        id: "opt-fac-3",
        title: "Rejilla de ventilación cerámica o aluminio lacado con malla",
        provider: "Almacén construcción",
        price: 60,
        url: "",
        imageUrl: "",
        notes: "Color a juego con el ladrillo cara vista o la carpintería."
      }
    ],
    comments: [],
    builderNotes: "Instalar sellado perimetral con masilla de poliuretano exterior."
  },

  // =========================================================================
  // 5. TABIQUERÍA Y TECHOS
  // =========================================================================
  {
    id: "tab-1",
    chapter: "tabiqueria",
    chapterName: "Tabiquería y Falsos Techos",
    name: "Tabiquería y divisiones interiores en PYL 15mm + 70mm",
    location: "Divisiones entre dormitorios, estancias y pasillos",
    needsOwnerCriteria: false,
    criteriaNotes: "Estructura de Pladur/PYL de calidad superior (placa gruesa de 15mm sobre canal de 70mm con lana acústica).",
    explanation: "Sistema de placa de yeso laminado de 15 mm sobre perfilería metálica reforzada de 70 mm con aislamiento interior de lana mineral (46 o 70 MW) y acabado de juntas nivel Q3 listo para pintura lisa.",
    specMemoria: "Tabiquería en divisiones interiores: PYL de 15mm con perfilería de 70mm. Divisiones: 15mm/46 o 70MW/15 a 40mm Q.3.",
    unitType: "m2",
    quantity: 110,
    wastagePercent: 5,
    targetUnitPrice: 38,
    status: "selected",
    selectedOptionId: "opt-tab-1",
    options: [
      {
        id: "opt-tab-1",
        title: "Sistema Pladur / Knauf PYL 15mm con perfil 70mm y lana mineral Q3",
        provider: "Instalador Pladur homologado",
        price: 38,
        url: "https://www.pladur.es/",
        imageUrl: "",
        notes: "Mayor solidez al tacto y aislamiento acústico que el tabique convencional de 13mm/48mm."
      }
    ],
    comments: [],
    builderNotes: "Exigir acabado de juntas nivel Q3 (pasta fina en toda la superficie de juntas y tornillos) para que no se noten sombras con la pintura lisa."
  },
  {
    id: "tab-2",
    chapter: "tabiqueria",
    chapterName: "Tabiquería y Falsos Techos",
    name: "Trasdosados perimetrales EPS 80mm + MW 60mm",
    location: "Cara interior de muros de fachada",
    needsOwnerCriteria: false,
    criteriaNotes: "Elemento clave para alcanzar la Calificación Energética A.",
    explanation: "Doble capa de aislamiento térmico de altísimo rendimiento: 80 mm de EPS grafito/blanco + 60 mm de lana mineral entre perfiles de 70 mm con placa PYL de 15 mm Q3.",
    specMemoria: "Trasdosados: EPS 80mm / 60 MW Perfiles 70 a 40 / 15mm Q.3.",
    unitType: "m2",
    quantity: 125,
    wastagePercent: 5,
    targetUnitPrice: 44,
    status: "selected",
    selectedOptionId: "opt-tab-2",
    options: [
      {
        id: "opt-tab-2",
        title: "Trasdosado auto-portante PYL 15mm + EPS 80mm + Lana 60mm",
        provider: "Instalador Pladur homologado",
        price: 44,
        url: "",
        imageUrl: "",
        notes: "Garantiza transmitancia térmica muy baja, reduciendo el consumo de calefacción casi a cero."
      }
    ],
    comments: [],
    builderNotes: "Comprobar que no queden huecos de aire sin aislamiento alrededor de las cajas de enchufes y huecos de ventanas."
  },
  {
    id: "tab-3",
    chapter: "tabiqueria",
    chapterName: "Tabiquería y Falsos Techos",
    name: "Tabiquería hidrófuga en zonas húmedas (Baños y Cocina)",
    location: "Paredes de baños, aseo y cocina",
    needsOwnerCriteria: false,
    criteriaNotes: "Placas especiales antihumedad (color verde Pladur H1).",
    explanation: "Placas PYL hidrófugas tratadas con siliconas para evitar la absorción de vapor y humedad, con perfilería de 70 mm y lana mineral interior para soporte de alicatados pesados.",
    specMemoria: "Zonas húmedas: 15mm / 46 o 70MW / 15 a 40mm Q.3.",
    unitType: "m2",
    quantity: 55,
    wastagePercent: 5,
    targetUnitPrice: 42,
    status: "selected",
    selectedOptionId: "opt-tab-3",
    options: [
      {
        id: "opt-tab-3",
        title: "Placa Pladur WA Hidrófuga 15mm + lana mineral acústica",
        provider: "Instalador Pladur",
        price: 42,
        url: "",
        imageUrl: "",
        notes: "Imprescindible para recibir alicatados de gran formato y colgar muebles suspendidos de baño."
      }
    ],
    comments: [],
    builderNotes: "Reforzar con pletinas metálicas o contrachapado oculto la zona donde irá colgado el mueble de lavabo doble."
  },
  {
    id: "tab-4",
    chapter: "tabiqueria",
    chapterName: "Tabiquería y Falsos Techos",
    name: "Falso techo PYL 13mm con descuelgue para clima hasta 60cm",
    location: "Salón-Cocina, Dormitorio Principal, Baño y Vestidor",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro deben coordinar el foseado decorativo para tiras de luz LED indirecta y la posición de rejillas.",
    explanation: "Techo continuo suspendido con armadura especial para permitir un descuelgue de hasta 60 cm donde discurrirán los conductos de aire y tuberías de climatización, además del aislamiento de lana de roca.",
    specMemoria: "Falsos techos de zona de salón-cocina y habitación principal-baño y vestidor: con armadora para colgar hasta 60cm. Toda la planta baja con PYL de 13mm.",
    unitType: "m2",
    quantity: 75,
    wastagePercent: 5,
    targetUnitPrice: 32,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-tab-4a",
        title: "Falso techo PYL 13mm continuo liso con trampillas ocultas",
        provider: "Instalador Pladur",
        price: 32,
        url: "",
        imageUrl: "",
        notes: "Acabado liso estándar con descuelgue técnico para conductos."
      },
      {
        id: "opt-tab-4b",
        title: "Falso techo PYL 13mm con foseado perimetral para LED indirecto en salón",
        provider: "Instalador Pladur",
        price: 38,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        notes: "Añade garganta perimetral decorativa para iluminación ambiental cálida."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Valorar si ponemos foseado con luz cálida indirecta en el salón y cabecero del dormitorio.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Dejar trampillas de registro invisibles en la máquina interior de climatización y llaves de corte de fontanería."
  },
  {
    id: "tab-5",
    chapter: "tabiqueria",
    chapterName: "Tabiquería y Falsos Techos",
    name: "Falso techo continuo PYL 13mm descuelgue normal",
    location: "Resto de la vivienda (pasillos, dormitorios secundarios, tendedero)",
    needsOwnerCriteria: false,
    criteriaNotes: "Descuelgue estándar mínimo para paso de instalaciones eléctricas y fontanería.",
    explanation: "Techo continuo de PYL 13 mm suspendido con varillas estándar de 15 a 20 cm para albergar cableados y aislamiento de lana de roca.",
    specMemoria: "Falsos techos resto chalé: descuelgue normal. Toda la planta baja con PYL de 13mm.",
    unitType: "m2",
    quantity: 45,
    wastagePercent: 5,
    targetUnitPrice: 26,
    status: "selected",
    selectedOptionId: "opt-tab-5",
    options: [
      {
        id: "opt-tab-5",
        title: "Falso techo estándar PYL 13mm con perfiles TC47",
        provider: "Instalador Pladur",
        price: 26,
        url: "",
        imageUrl: "",
        notes: "Excelente planimetría y rapidez de montaje."
      }
    ],
    comments: [],
    builderNotes: "Encintado con banda acústica en todo el perímetro de apoyo."
  },

  // =========================================================================
  // 6. AISLAMIENTOS TÉRMICOS Y ACÚSTICOS
  // =========================================================================
  {
    id: "ais-1",
    chapter: "aislamientos",
    chapterName: "Aislamientos y Eficiencia Energética",
    name: "Aislamiento térmico en suelos: 3 XPS + lámina anti-impacto",
    location: "Bajo el suelo radiante de toda la vivienda",
    needsOwnerCriteria: false,
    criteriaNotes: "Base imprescindible para evitar fugas de calor del suelo radiante hacia el forjado sanitario.",
    explanation: "Capa gruesa de poliestireno extruido (XPS de alta resistencia a compresión) combinada con lámina elástica de polietileno anti-impacto que absorbe el ruido de pisadas y tacones.",
    specMemoria: "Suelos vivienda: 3XPS + lámina anti-impacto.",
    unitType: "m2",
    quantity: 120,
    wastagePercent: 5,
    targetUnitPrice: 22,
    status: "selected",
    selectedOptionId: "opt-ais-1",
    options: [
      {
        id: "opt-ais-1",
        title: "Panel XPS de alta densidad (300 kPa) + lámina Impactodan",
        provider: "Danosa / Ursa",
        price: 22,
        url: "https://www.danosa.com/",
        imageUrl: "",
        notes: "Soporta las cargas de muebles y el mortero del suelo radiante sin ceder."
      }
    ],
    comments: [],
    builderNotes: "Solapar las bandas perimetrales de desolidarización contra tabiques para que el suelo radiante flote libremente."
  },
  {
    id: "ais-2",
    chapter: "aislamientos",
    chapterName: "Aislamientos y Eficiencia Energética",
    name: "Aislamiento térmico bajo cubierta: 60 XPS + Aglomerado",
    location: "Suelo y paredes de espacio bajo cubierta",
    needsOwnerCriteria: false,
    criteriaNotes: "Protección térmica superior contra el sol de verano y las heladas de invierno.",
    explanation: "60 mm de XPS fijados mecánicamente en paredes y suelo bajo cubierta, con placas de aglomerado de madera sobre el aislamiento de suelo para permitir pisar y almacenar.",
    specMemoria: "Suelo y paredes bajo cubierta (\"sin más\"): 60 XPS sujetos mecánicamente (sin trasdosar, con placas de aglomerado sobre el aislamiento de suelo).",
    unitType: "m2",
    quantity: 65,
    wastagePercent: 5,
    targetUnitPrice: 29,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-ais-2",
        title: "XPS 60mm con fijaciones mecánicas + aglomerado hidrófugo 16mm",
        provider: "Almacén maderas / aislantes",
        price: 29,
        url: "",
        imageUrl: "",
        notes: "Deja el espacio utilizable como trastero sin coste excesivo de trasdosados."
      }
    ],
    comments: [],
    builderNotes: "Cuidar la continuidad del aislamiento en los encuentros con el faldón de cubierta."
  },
  {
    id: "ais-3",
    chapter: "aislamientos",
    chapterName: "Aislamientos y Eficiencia Energética",
    name: "Aislamiento acústico en bajantes: Coquillas insonorizantes",
    location: "Bajantes de fontanería y saneamiento interiores",
    needsOwnerCriteria: false,
    criteriaNotes: "Evita el molesto ruido de caída de agua del inodoro y duchas a través de los tabiques.",
    explanation: "Forrado de todos los tubos verticales y horizontales de evacuación con coquillas elastoméricas pesadas o lana de roca insonorizante de alta densidad.",
    specMemoria: "Fontanería bajantes interiores: Coquillas en tramos horizontales y verticales.",
    unitType: "ml",
    quantity: 28,
    wastagePercent: 0,
    targetUnitPrice: 18,
    status: "selected",
    selectedOptionId: "opt-ais-3",
    options: [
      {
        id: "opt-ais-3",
        title: "Coquilla acústica Fonodan / Armacell bicapa",
        provider: "Danosa / Armacell",
        price: 18,
        url: "",
        imageUrl: "",
        notes: "Reduce el ruido de bajante en más de 15 dB."
      }
    ],
    comments: [],
    builderNotes: "Colocar antes del cierre de los cajones de Pladur y colocar bridas isofónicas con goma."
  },
  {
    id: "ais-4",
    chapter: "aislamientos",
    chapterName: "Aislamientos y Eficiencia Energética",
    name: "Aislamiento reflexivo multicapa en capialzados y pilares",
    location: "Cajas de persianas (capialzados) y pilares metálicos envueltos",
    needsOwnerCriteria: false,
    criteriaNotes: "Eliminación de puentes térmicos en persianas y columnas.",
    explanation: "Lámina multicapa reflexiva autoadhesiva de aluminio puro que refleja el 97% de la radiación térmica en espacios estrechos donde no cabe lana mineral.",
    specMemoria: "Trasdós de capialzados y pilares (envueltos): AISLANTE REFLEXIVO MULTICAPA AUTOADHESIVO.",
    unitType: "m2",
    quantity: 25,
    wastagePercent: 5,
    targetUnitPrice: 24,
    status: "selected",
    selectedOptionId: "opt-ais-4",
    options: [
      {
        id: "opt-ais-4",
        title: "Aislamiento reflexivo multicapa termo-acústico con cinta selladora",
        provider: "Actis / Aluthermo",
        price: 24,
        url: "",
        imageUrl: "",
        notes: "Grosor mínimo de 15 a 30 mm con altísimo poder de aislamiento por radiación."
      }
    ],
    comments: [],
    builderNotes: "Sellar solapes con cinta de aluminio para garantizar la estanqueidad al aire."
  },

  // =========================================================================
  // 7. IMPERMEABILIZACIÓN Y VENTILACIÓN
  // =========================================================================
  {
    id: "imp-1",
    chapter: "impermeabilizacion",
    chapterName: "Impermeabilización y Ventilación",
    name: "Zócalo estanco tipo Kerdi en duchas (H 40 cm)",
    location: "Bases de paredes de zonas de ducha y bañera",
    needsOwnerCriteria: false,
    criteriaNotes: "Garantía total contra filtraciones de agua a través de las juntas de los azulejos.",
    explanation: "Lámina impermeabilizante flexible de polietileno con fibras de anclaje tipo Schlüter-Kerdi subiendo al menos 40 cm desde el plato de ducha antes de alicatar.",
    specMemoria: "Impermeabilizaciones: Zócalo tipo Kerdi en duchas, H 40 cm (aproximado).",
    unitType: "ml",
    quantity: 12,
    wastagePercent: 5,
    targetUnitPrice: 35,
    status: "selected",
    selectedOptionId: "opt-imp-1",
    options: [
      {
        id: "opt-imp-1",
        title: "Lámina de impermeabilización Schlüter-KERDI con piezas de esquina",
        provider: "Schlüter Systems",
        price: 35,
        url: "https://www.schluter.es/",
        imageUrl: "",
        notes: "La referencia número 1 del mercado para estanqueidad en platos de ducha de obra."
      }
    ],
    comments: [],
    builderNotes: "Pegar con cemento cola flexible C2TE y comprobar estanqueidad antes de colocar el porcelánico."
  },
  {
    id: "imp-2",
    chapter: "impermeabilizacion",
    chapterName: "Impermeabilización y Ventilación",
    name: "Sistema de Ventilación Mecánica Controlada (VMC) Híbrida",
    location: "Extracción en baños y cocina, admisión en dormitorios y salón",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro pueden revisar el modelo de extractor de bajo nivel sonoro y estética de las bocas de ventilación.",
    explanation: "Sistema de ventilación continua según DB-HS3 que renueva el aire viciado de baños y cocina sin abrir ventanas, manteniendo el calor en invierno y garantizando un aire puro libre de humedad y radón.",
    specMemoria: "Ventilación: Vivienda baños y cocina (DB-HS3): HÍBRIDA VMC. Cámara sanitaria: Rn ventilación natural.",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 1450,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-imp-2a",
        title: "Equipo VMC higrorregulable Siber / Soler & Palau silencioso",
        provider: "Siber Ventilación / S&P",
        price: 1450,
        url: "https://www.siberzone.es/",
        imageUrl: "",
        notes: "Ajusta el caudal automáticamente según la humedad detectada en baños y cocina."
      },
      {
        id: "opt-imp-2b",
        title: "VMC autorregulable estándar compacta",
        provider: "Soler & Palau",
        price: 1100,
        url: "https://www.solerpalau.com/es-es/",
        imageUrl: "",
        notes: "Opción económica de caudal continuo."
      }
    ],
    comments: [],
    builderNotes: "Conectar bocas con conducto aislado para evitar ruidos de aire y condensaciones."
  },

  // =========================================================================
  // 8. CLIMATIZACIÓN, CALEFACCIÓN Y ACS
  // =========================================================================
  {
    id: "cli-1",
    chapter: "climatizacion",
    chapterName: "Climatización, Suelo Radiante y ACS",
    name: "Aerotermia con Suelo Radiante y Refrescante",
    location: "Toda la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "Seleccionar marca del equipo de aerotermia (Daikin, Vaillant, Saunier Duval o Panasonic).",
    explanation: "Bomba de calor aerotérmica de alta eficiencia A+++ que produce calefacción en invierno mediante agua templada a 35ºC por tubos bajo el suelo porcelánico, y refrigeración suave en verano sin corrientes de aire frío.",
    specMemoria: "Calefacción vivienda: Aerotermia. Suelo radiante y refrescante. Termostatos independientes en dormitorios y salón: 4 Uds.",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 8800,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cli-1a",
        title: "Aerotermia Daikin Altherma 3 con suelo radiante/refrescante Giacomini",
        provider: "Daikin / Giacomini",
        price: 9200,
        url: "https://www.daikin.es/",
        imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80",
        notes: "Máxima fiabilidad, servicio técnico premium en Madrid y conectividad wifi en app."
      },
      {
        id: "opt-cli-1b",
        title: "Aerotermia Vaillant aroTHERM plus con refrigerante natural R290",
        provider: "Vaillant",
        price: 8600,
        url: "https://www.vaillant.es/",
        imageUrl: "",
        notes: "Muy ecológica, silenciosa y de altísimo rendimiento estacional."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Pedir al aparejador que nos pase comparativa de consumo entre Daikin y Vaillant.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Realizar prueba de presión de los circuitos del suelo radiante antes de verter el recrecido de mortero autonivelante."
  },
  {
    id: "cli-2",
    chapter: "climatizacion",
    chapterName: "Climatización, Suelo Radiante y ACS",
    name: "Termostatos independientes por estancias (4 Uds)",
    location: "Salón y 3 dormitorios",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro eligen si prefieren termostatos digitales táctiles con control desde el móvil vía Wifi.",
    explanation: "4 termostatos independientes que permiten graduar la temperatura exacta en el salón y en cada dormitorio por separado, evitando gastar energía en habitaciones desocupadas.",
    specMemoria: "Termostatos independientes en dormitorios y salón: 4 Uds.",
    unitType: "ud",
    quantity: 4,
    wastagePercent: 0,
    targetUnitPrice: 95,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cli-2a",
        title: "Termostatos digitales táctiles con pasarela Wifi y control por smartphone",
        provider: "Bticino / Netatmo / Honeywell",
        price: 120,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1567928815104-b7980ee5032e?w=600&auto=format&fit=crop&q=80",
        notes: "Permite encender la calefacción antes de llegar a casa desde el teléfono."
      },
      {
        id: "opt-cli-2b",
        title: "Termostatos digitales cableados estándar",
        provider: "Giacomini / Watts",
        price: 70,
        url: "",
        imageUrl: "",
        notes: "Funcionamiento sencillo y robusto sin depender de apps."
      }
    ],
    comments: [],
    builderNotes: "Ubicar a 1,50 m de altura, alejados de ventanas y de zonas donde dé el sol directo para no falsear lecturas."
  },
  {
    id: "cli-3",
    chapter: "climatizacion",
    chapterName: "Climatización, Suelo Radiante y ACS",
    name: "Preinstalación de aire acondicionado por conductos",
    location: "Falso techo de salón-cocina y dormitorios",
    needsOwnerCriteria: true,
    criteriaNotes: "Elegir diseño de rejillas lineales de impulsión de aire (blancas, negras o empotradas invisibles).",
    explanation: "Colocación de conductos de fibra tipo Climaver, rejillas de difusión y tubos de cobre con aislamiento para las líneas frigoríficas (distancia máxima de 4,5 m entre máquinas interior y exterior).",
    specMemoria: "Clima: Colocación de conductos, rejillas y tubos vacíos para unir los equipos (distancia máxima entre ellos 4,5m). Preinstalación solo para refrigerante (conductos y rejillas).",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 1850,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-cli-3a",
        title: "Conductos Climaver Plus + Rejillas lineales lacadas en blanco",
        provider: "Isover / Madel",
        price: 1850,
        url: "https://www.isover.es/",
        imageUrl: "",
        notes: "Excelente atenuación de ruido de aire y acabado discreto en falso techo."
      },
      {
        id: "opt-cli-3b",
        title: "Rejillas minimalistas de ranura oculta sin marco perimetral",
        provider: "Koolair / Madel",
        price: 2200,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Estética arquitectónica de lujo, integradas en la placa de yeso."
      }
    ],
    comments: [],
    builderNotes: "El constructor debe prever las cotas de descuelgue en el falso techo (mínimo 28 cm libres en zona de paso de conductos)."
  },
  {
    id: "cli-4",
    chapter: "climatizacion",
    chapterName: "Climatización, Suelo Radiante y ACS",
    name: "Agua Caliente Sanitaria (ACS): Acumulador 200L + Retorno",
    location: "Cuarto técnico de instalaciones",
    needsOwnerCriteria: false,
    criteriaNotes: "Capacidad calculada para ducha simultánea y confort familiar con aerotermia.",
    explanation: "Depósito acumulador de 200 litros en acero vitrificado o inoxidable conectado a la aerotermia, con circuito de retorno para que el agua caliente salga instantáneamente al abrir cualquier grifo.",
    specMemoria: "ACS: Aerotermia. 200 L ACS. Instalación de retorno = depósito de inercia: SÍ.",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 1350,
    status: "selected",
    selectedOptionId: "opt-cli-4",
    options: [
      {
        id: "opt-cli-4",
        title: "Interacumulador 200L ACS + Depósito de inercia 50L y bomba de recirculación",
        provider: "Daikin / Vaillant / Cordivari",
        price: 1350,
        url: "",
        imageUrl: "",
        notes: "El depósito de inercia evita arrancadas y paradas continuas del compresor, alargando su vida útil."
      }
    ],
    comments: [],
    builderNotes: "Instalar vaso de expansión para ACS y válvula de seguridad a desagüe."
  },

  // =========================================================================
  // 9. ELECTRICIDAD, ILUMINACIÓN Y TELECOMUNICACIONES
  // =========================================================================
  {
    id: "ele-1",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Mecanismos eléctricos e interruptores: Simon 27 o Niessen",
    location: "Toda la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro deben elegir el diseño, color (blanco mate, negro antracita o aluminio) y serie (Simon 27, Simon 82 Detail, Niessen Zenit o similar).",
    explanation: "Interruptores, conmutadores, pulsadores y tomas de corriente en toda la vivienda según REBT, con diseño moderno y agradable tacto mecánico.",
    specMemoria: "Electricidad: Instalación por estancia según reglamento. Serie de mecanismos: SIMON 27 - NIESSEN o similar.",
    unitType: "ud",
    quantity: 65,
    wastagePercent: 0,
    targetUnitPrice: 14,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-ele-1a",
        title: "Serie Simon 270 estética minimalista Blanco Mate o Negro",
        provider: "Simon Eléctrica",
        price: 16,
        url: "https://www.simonelectric.com/serie-simon-270",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
        notes: "Diseño plano ultra-moderno, 100% enrasado en pared, teclas grandes con USB directo."
      },
      {
        id: "opt-ele-1b",
        title: "Serie Niessen Zenit en acabado Blanco o Antracita",
        provider: "ABB Niessen",
        price: 14,
        url: "https://new.abb.com/low-voltage/es/productos/mecanismos/zenit",
        imageUrl: "",
        notes: "Gama muy fiable, marcos resistentes y opción de visor luminoso."
      },
      {
        id: "opt-ele-1c",
        title: "Serie Simon 27 Neos / Play",
        provider: "Simon Eléctrica",
        price: 10,
        url: "",
        imageUrl: "",
        notes: "Opción más económica de batalla con fundas intercambiables."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "La serie Simon 270 en blanco mate o negro grafito queda espectacular con las puertas lacadas.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Mantener alturas normalizadas: tomas de corriente a 30 cm de suelo terminado e interruptores a 110 cm."
  },
  {
    id: "ele-2",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Previsión y clemas para iluminación de armarios empotrados",
    location: "Armarios empotrados de dormitorios y vestidor",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro definen si colocarán barras con sensor de apertura tipo IKEA Skydrag o tiras LED continuas.",
    explanation: "Puntos de corriente con clema en la parte superior de cada módulo de armario empotrado para conectar fácilmente luminarias tipo IKEA o tiras LED con encendido automático al abrir puertas.",
    specMemoria: "Armarios: Clema en armarios empotrados (para poder colocar luminaria Tipo IKEA).",
    unitType: "ud",
    quantity: 5,
    wastagePercent: 0,
    targetUnitPrice: 35,
    status: "selected",
    selectedOptionId: "opt-ele-2",
    options: [
      {
        id: "opt-ele-2",
        title: "Punto de luz con clema y caja en techo de armario",
        provider: "Electricista de obra",
        price: 35,
        url: "",
        imageUrl: "",
        notes: "Permite enchufar el transformador de IKEA directamente sin cables vistos."
      }
    ],
    comments: [],
    builderNotes: "Dejar tubo corrugado con guía pasado por el falso techo hasta el interruptor o clema."
  },
  {
    id: "ele-3",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Preinstalación para punto de recarga de coche eléctrico",
    location: "Zona de parking exterior / estacionamiento",
    needsOwnerCriteria: false,
    criteriaNotes: "Obligatorio por normativa y esencial para la revalorización de la vivienda.",
    explanation: "Manguera de línea eléctrica dedicada de sección adecuada (mínimo 10 mm²) desde el cuadro general hasta la zona de aparcamiento exterior para instalar un cargador de vehículo eléctrico.",
    specMemoria: "Preinstalación coche eléctrico: Manguera para punto de conexión lento de coches.",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 320,
    status: "selected",
    selectedOptionId: "opt-ele-3",
    options: [
      {
        id: "opt-ele-3",
        title: "Línea dedicada en tubo enterrado de 40mm con manguera libre de halógenos",
        provider: "Electricista de obra",
        price: 320,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&auto=format&fit=crop&q=80",
        notes: "Prepara la vivienda para cargar tanto a 3,7 kW como a 7,4 kW monofásico."
      }
    ],
    comments: [],
    builderNotes: "Dejar arqueta estanca de registro en el estacionamiento para facilitar el montaje futuro del wallbox."
  },
  {
    id: "ele-4",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Puntos de luz y enchufes en tendedero y bajo cubierta",
    location: "Tendedero (3 luz + 3 enchufes) y Bajo Cubierta (2 luz + tubo vacío)",
    needsOwnerCriteria: false,
    criteriaNotes: "Distribución eléctrica técnica para zonas de servicio.",
    explanation: "Previsión eléctrica en tendedero para lavadora, secadora y futura escalera; y 2 puntos de luz con tubo vacío en el bajo cubierta para futura ampliación habitable.",
    specMemoria: "Bajo cubierta: 2 puntos de luz y tubo vacío en previsión para futura instalación. Tendedero: 3 puntos de luz y 3 enchufes (previsión escalera).",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 280,
    status: "selected",
    selectedOptionId: "opt-ele-4",
    options: [
      {
        id: "opt-ele-4",
        title: "Circuito de tomas estancas y puntos de luz según memoria",
        provider: "Electricista de obra",
        price: 280,
        url: "",
        imageUrl: "",
        notes: "Mecanismos con protección IP para zonas húmedas de lavado."
      }
    ],
    comments: [],
    builderNotes: "Conectar al circuito independiente de tomas de fuerza C4."
  },
  {
    id: "ele-5",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Puntos de luz y enchufes estancos de exterior y valla",
    location: "Valla de acceso peatonal, perímetro de fachadas y entrada principal",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro elegirán el modelo de apliques o balizas exteriores de pared.",
    explanation: "Instalación de 1 punto de luz y enchufe estanco en valla de acceso, 4 puntos de luz y enchufes en el perímetro de fachada y 1 punto en la entrada principal, todos con protección estanca IP65 contra lluvia.",
    specMemoria: "Exteriores: 1 punto de luz y enchufe estanco en valla acceso peatonal, 4 puntos de luz y enchufe estanco en perímetro de fachadas, 1 punto de luz y enchufe estanco en entrada principal. LÍNEA PARA FUTURA CARGA DE COCHES.",
    unitType: "ud",
    quantity: 6,
    wastagePercent: 0,
    targetUnitPrice: 65,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-ele-5a",
        title: "Previsión eléctrica + Mecanismos estancos IP55/65 Simón Hydro",
        provider: "Electricista / Simon",
        price: 65,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Garantiza seguridad eléctrica bajo lluvia y riego."
      }
    ],
    comments: [],
    builderNotes: "Conectar con interruptor crepuscular o reloj temporizador en el cuadro general para encendido nocturno automático si se desea."
  },
  {
    id: "ele-6",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Red de datos (Tomas RJ45) y TV/FM en estancias",
    location: "Salón, todos los dormitorios y tendedero",
    needsOwnerCriteria: false,
    criteriaNotes: "Imprescindible para teletrabajo, streaming 4K y gaming sin cortes de Wifi.",
    explanation: "Cableado estructurado de datos Categoría 6 con tomas RJ45 dobles y tomas de televisión/radio en cada estancia, todas centralizadas en el PAU de la vivienda.",
    specMemoria: "Datos: Tomas RJ 45: TV - FM + RJ11 + RJ 45 en cada estancia (salón, dormitorios y tendedero).",
    unitType: "ud",
    quantity: 6,
    wastagePercent: 0,
    targetUnitPrice: 48,
    status: "selected",
    selectedOptionId: "opt-ele-6",
    options: [
      {
        id: "opt-ele-6",
        title: "Toma mixta TV/FM + Doble RJ45 Cat.6 apantallada",
        provider: "Televés / Simon",
        price: 48,
        url: "https://www.televes.com/",
        imageUrl: "",
        notes: "Velocidad de hasta 1 Gbps real sin pérdidas de señal en cada habitación."
      }
    ],
    comments: [],
    builderNotes: "Evitar tender cables de datos en el mismo corrugado que los cables de fuerza de 230V para evitar inducción y parásitos."
  },
  {
    id: "ele-7",
    chapter: "electricidad",
    chapterName: "Electricidad y Telecomunicaciones",
    name: "Preinstalación de cámaras de seguridad perimetrales",
    location: "4 esquinas de fachadas y puerta de valla exterior",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro valoran si instalarán cámaras IP PoE conectadas a la red de datos o al móvil.",
    explanation: "4 líneas con tubo vacío independiente y clemas pasadas hasta cada fachada y puerta de valla exterior para poder instalar cámaras de videovigilancia sin cables vistos.",
    specMemoria: "Seguridad: Clemas para cámara en cada fachada, puerta de valla, apertura de puerta interiores manual: 4 ud de Líneas con tubo vacío Sin cámaras.",
    unitType: "ud",
    quantity: 4,
    wastagePercent: 0,
    targetUnitPrice: 45,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-ele-7",
        title: "Tubo corrugado de 25mm con guía desde el cuadro técnico a fachada",
        provider: "Electricista de obra",
        price: 45,
        url: "",
        imageUrl: "",
        notes: "Permite pasar cable UTP para cámaras PoE en cualquier momento."
      }
    ],
    comments: [],
    builderNotes: "Dejar cajas estancas registrables en coronación de fachadas a 3 metros de altura."
  },

  // =========================================================================
  // 10. FONTANERÍA Y SANITARIOS (CRITERIO MUY ALTO DE PROPIETARIOS)
  // =========================================================================
  {
    id: "san-1",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Mueble suspendido de lavabo doble (120 a 160 cm)",
    location: "Baño Principal",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CLAVE DE LAURA Y ALEJANDRO: Decidir anchura (120, 140 o 160 cm), color/madera (roble, nogal o blanco lacado) y distribución de cajones tipo IKEA Godmorgon o mueble a medida.",
    explanation: "Mueble de baño suspendido con doble seno que facilita la limpieza del suelo y aporta amplitud visual al baño principal. Con cajones de extracción total y freno amortiguado.",
    specMemoria: "Sanitarios baños: Lavabos dobles: Mueble suspendido de lavabo doble Tipo IKEA o similar (entre 1,2 y 1,60 m de largo).",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 480,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-1a",
        title: "IKEA ÄNGSJÖN / GODMORGON Mueble lavabo 2 senos 140cm Roble o Blanco",
        provider: "IKEA",
        price: 420,
        url: "https://www.ikea.com/es/es/cat/muebles-de-bano-lavabo-20723/",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente relación calidad/precio, garantía 10 años, compatible con sifones planos."
      },
      {
        id: "opt-san-1b",
        title: "Mueble suspendido Royo / Salgar 120-140cm con encimera y lavabos sobre encimera",
        provider: "Salgar / Royo Group",
        price: 680,
        url: "https://www.salgar.net/es/",
        imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80",
        notes: "Acabado de ebanistería premium con cajones metálicos Hettich y lavabos cerámicos vistos."
      },
      {
        id: "opt-san-1c",
        title: "Mueble Leroy Merlin Madrid / Neo suspendido 120cm",
        provider: "Leroy Merlin",
        price: 360,
        url: "https://www.leroymerlin.es/",
        imageUrl: "",
        notes: "Opción muy ajustada en precio con seno cerámico integrado de fácil limpieza."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Me encanta el acabado en madera de roble natural con lavabos blancos integrados para que no se acumule suciedad en las juntas.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El fontanero debe colocar las tomas de agua y desagüe a la cota exacta del mueble seleccionado y el tabique de Pladur debe ir reforzado con pletina metálica."
  },
  {
    id: "san-2",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Griferías monomando para lavabos tipo ARUBA o similar",
    location: "Baño principal (2 uds) y Baño secundario / aseo (1 ud)",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Elegir acabado (Cromo brillo, Negro mate, Acero cepillado o Dorado cepillado).",
    explanation: "Grifos monomando con cartucho cerámico y aireador ecoflush para ahorro de agua (máx 5 L/min), con cuerpo de latón de alta durabilidad y estilo contemporáneo.",
    specMemoria: "Griferías Lavabos: Monomando ARUBA o similar.",
    unitType: "ud",
    quantity: 3,
    wastagePercent: 0,
    targetUnitPrice: 75,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-2a",
        title: "Grifo monomando Imex Serie Aruba / Art Negro Mate o Cromo",
        provider: "Imex Products / Almacén fontanería",
        price: 75,
        url: "https://imexproducts.es/",
        imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente acabado antihuellas, cartucho Sedal y precio inmejorable."
      },
      {
        id: "opt-san-2b",
        title: "Grifo monomando Grohe Eurosmart / Hansgrohe Logis Cromo",
        provider: "Grohe / Hansgrohe",
        price: 95,
        url: "https://www.grohe.es/",
        imageUrl: "",
        notes: "Referencia alemana indiscutible, suavidad extrema del mando y garantía duradera."
      },
      {
        id: "opt-san-2c",
        title: "Grifo caño alto negro mate o dorado cepillado para lavabo sobre encimera",
        provider: "Tres Grifería",
        price: 110,
        url: "https://www.tresgriferia.com/",
        imageUrl: "",
        notes: "Solo si se eligen lavabos tipo bol apoyados en encimera."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Ojo: si elegimos grifería en negro mate para el lavabo, la de la ducha y los accesorios deben ir también en negro mate para que haya armonía.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Comprobar longitud de latiguillos y colocar llaves de escuadra con filtro en cada toma."
  },
  {
    id: "san-3",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Inodoros apoyados en suelo con tapa amortiguada y Start/Stop",
    location: "Baño principal y Baño secundario / aseo",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Modelo de inodoro (Roca The Gap Rimless, Meridian o similar) y sistema Rimless (sin reborde interior para limpieza higiénica total).",
    explanation: "Inodoro compacto adosado completamente a pared con mecanismo de cisterna de doble descarga Start/Stop (3/4,5 L) y tapa/asiento con caída amortiguada silenciosa que evita golpes.",
    specMemoria: "Inodoros con tapa amortiguada: Apoyados en suelo. Sistema Start/Stop.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 210,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-3a",
        title: "Inodoro Roca The Gap Square / Round Rimless adosado a pared con tapa amortiguada",
        provider: "Roca",
        price: 220,
        url: "https://www.roca.es/",
        imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&auto=format&fit=crop&q=80",
        notes: "Tecnología Rimless sin canal de lavado, máxima higiene y estética compacta pegada a pared."
      },
      {
        id: "opt-san-3b",
        title: "Inodoro Gala Emma Square / Street adosado a pared",
        provider: "Gala Cerámicas",
        price: 185,
        url: "https://gala.es/",
        imageUrl: "",
        notes: "Líneas rectas muy modernas a precio muy competitivo."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "El modelo Rimless es imprescindible, no se acumula cal ni suciedad por dentro.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe comprobar la distancia exacta del manguetón de desagüe a la pared antes del solado."
  },
  {
    id: "san-4",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Platos de ducha de resina antideslizante y bañera",
    location: "Baño principal y secundario",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Color (Blanco, Gris perla, Antracita o Beige/Arena), textura (Pizarra o Granito suave C3 antideslizante) y confirmar si se incluye bañera en el secundario.",
    explanation: "Plato de ducha extraplano fabricado en resina de poliéster y cargas minerales con recubrimiento de gel-coat antibacteriano y antideslizante clase 3 (máxima seguridad contra resbalones). Rejilla de acero inox o lacada a juego.",
    specMemoria: "Platos de ducha y bañera: Resina.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 290,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-4a",
        title: "Plato de resina y cargas minerales textura Pizarra C3 (medidas 160-180x80cm)",
        provider: "F&D / Mundilac / Doccia",
        price: 290,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80",
        notes: "Extraplano (3cm), cálido al tacto, corte a medida en obra si fuera necesario."
      },
      {
        id: "opt-san-4b",
        title: "Plato de resina enrasado con rejilla longitudinal invisible",
        provider: "McBath / Nuovvo",
        price: 360,
        url: "",
        imageUrl: "",
        notes: "Desagüe lineal oculto con la misma textura que el plato para acabado minimalista."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Pedir al constructor que deje el plato prácticamente enrasado con el suelo del baño.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe asentar el plato sobre base de mortero nivelado macizado al 100% para que no flecte, y sellar con polímero neutro MS."
  },
  {
    id: "san-5",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Griferías de ducha termostáticas con rociador",
    location: "Duchas de baños",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Acabado (Cromo, Negro mate o Níquel cepillado) y forma del rociador superior (cuadrado o redondo de 25-30 cm).",
    explanation: "Columna de ducha con grifo termostático que mantiene la temperatura del agua constante a 38ºC sin variaciones de caudal, con gran rociador cenital efecto lluvia y teleducha manual.",
    specMemoria: "Griferías ducha y bañera: Termostáticas.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 180,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-5a",
        title: "Columna termostática Imex Serie Suecia / Dublin con rociador de 25cm",
        provider: "Imex Products",
        price: 180,
        url: "https://imexproducts.es/",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente acabado, cartucho termostático Vernet francés y barra telescópica regulable."
      },
      {
        id: "opt-san-5b",
        title: "Sistema de ducha Grohe Grohtherm 800 / Euphoria 260 termostático",
        provider: "Grohe",
        price: 290,
        url: "https://www.grohe.es/",
        imageUrl: "",
        notes: "Tecnología CoolTouch que evita quemaduras al tocar el cuerpo del grifo."
      }
    ],
    comments: [],
    builderNotes: "La toma de agua caliente debe situarse siempre a la izquierda según normativa para el correcto funcionamiento del termoelemento."
  },
  {
    id: "san-6",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Mampara de baño: Frontal fijo + puerta corredera de 80 cm",
    location: "Duchas de baños (160 a 180 cm de largo x 195 cm de alto)",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Perfilería (Aluminio negro mate, cromo o blanco) y cristal (transparente con tratamiento antical o serigrafiado parcial).",
    explanation: "Mampara frontal compuesta por panel fijo y puerta corredera de 80 cm de paso, con vidrio templado de seguridad de 6 mm con tratamiento antical permanente que repele las gotas de agua.",
    specMemoria: "Mamparas: Frontal fijo y puerta corredera de 80 cm con dimensiones entre 160 a 180 cm de largo y 195 cm de alto, cristal de 6mm.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 340,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-6a",
        title: "Mampara frontal 1 fijo + 1 corredera 160-180x195cm perfilería Negro Mate",
        provider: "GME / Duscholux / Iberdusch",
        price: 360,
        url: "https://www.gmelightbath.com/",
        imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&auto=format&fit=crop&q=80",
        notes: "Vidrio 6mm con tratamiento antical a dos caras, rodamientos ocultos dobles ultra-suaves."
      },
      {
        id: "opt-san-6b",
        title: "Mampara frontal 1 fijo + 1 corredera perfilería Cromo brillo o Plata",
        provider: "Kassandra / Profiltek",
        price: 320,
        url: "https://www.profiltek.com/es",
        imageUrl: "",
        notes: "Acabado clásico brillante de fácil combinación con griferías cromo."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Imprescindible que el tratamiento antical venga de fábrica para que no queden manchas de agua de la sierra.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El montador debe comprobar el plomo de los tabiques laterales antes de taladrar para asegurar el cierre magnético hermético."
  },
  {
    id: "san-7",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Bote sifónico registrable e instalación de fontanería interior",
    location: "Cuartos de baño",
    needsOwnerCriteria: false,
    criteriaNotes: "Instalación de fontanería sanitaria bajo normativa.",
    explanation: "Colocación de bote sifónico accesible para mantenimiento y registro en cada baño, impidiendo el retorno de malos olores desde la red de saneamiento.",
    specMemoria: "Bote sifónico: Sí.",
    unitType: "ud",
    quantity: 2,
    wastagePercent: 0,
    targetUnitPrice: 75,
    status: "selected",
    selectedOptionId: "opt-san-7",
    options: [
      {
        id: "opt-san-7",
        title: "Bote sifónico extensible con tapa embellecedora inox enrasada",
        provider: "Jimten / Adequa",
        price: 75,
        url: "",
        imageUrl: "",
        notes: "Evita olores y facilita el desatascado."
      }
    ],
    comments: [],
    builderNotes: "Colocar la tapa enrasada y en una posición discreta que no interfiera con el paso natural del baño."
  },
  {
    id: "san-8",
    chapter: "sanitarios",
    chapterName: "Fontanería, Sanitarios y Griferías",
    name: "Preinstalación de fontanería para piscina y riego de parcela",
    location: "Parcela exterior y lindes de la propiedad",
    needsOwnerCriteria: true,
    criteriaNotes: "Laura y Alejandro definirán la ubicación exacta de la futura piscina en la parcela.",
    explanation: "Tubería de polietileno de alta densidad (PE) para acometida con arqueta de suministro, canalización de vertidos y red de riego con tubo enterrado en los dos tramos laterales de linde con dos llaves de corte.",
    specMemoria: "Fontanería Riego y Piscina: Tubería PE (para purificador de agua). Preinstalación piscina: Arquetas de suministro y vertidos con sus canalizaciones según detalle. Riego: Tubo enterrado desde contador en los dos tramos laterales de los lindes con dos llaves de corte.",
    unitType: "pa",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 620,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-san-8",
        title: "Arquetas de paso estancas + Tubería PE Ø32mm + 2 válvulas de esfera enterradas",
        provider: "Fontanero / Obra civil",
        price: 620,
        url: "",
        imageUrl: "",
        notes: "Permite ejecutar la piscina y el jardín sin tener que volver a levantar zanjas en el futuro."
      }
    ],
    comments: [],
    builderNotes: "Enterrar a mínimo 50 cm de profundidad con lecho de arena para proteger la tubería de heladas invernales en Valdemorillo."
  },

  // =========================================================================
  // 11. REVESTIMIENTOS Y SUELOS (CRITERIO MUY ALTO DE PROPIETARIOS)
  // =========================================================================
  {
    id: "rev-1",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Solado interior general: Porcelánico C3 imitación madera 12.5x120 cm",
    location: "Salón, comedor, cocina, pasillo, zaguán, dormitorios, vestidor y baño principal",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CRUCIAL DE LAURA Y ALEJANDRO: Seleccionar tono de madera (Roble natural, nogal, arce, haya o blanqueado), grado de destonificación y textura táctil. Multiplicador de superficie con 10% de merma por cortes.",
    explanation: "Pavimento porcelánico rectificado de altísima resistencia al desgaste clase C3 en formato listón alargado de 12,5 x 120 cm que imita con gran fidelidad la calidez visual de la madera natural, siendo a la vez el mejor transmisor térmico para el suelo radiante.",
    specMemoria: "Solados interiores: Salón comedor, cocina, pasillo, Zaguán de entrada, Dormitorios, vestidor y baño principal: Porcelánico C.3 formato alargado 12,5x120 cm o similar.",
    unitType: "m2",
    quantity: 125,
    wastagePercent: 10,
    targetUnitPrice: 32,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-1a",
        title: "Porcelánico rectificado efecto Roble Natural 12.5x120cm C3 antideslizante suave",
        provider: "Porcelanosa / Marazzi / Keraben",
        price: 34,
        url: "https://www.porcelanosa.com/es/pavimentos/suelos-imitacion-madera",
        imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente conductividad térmica para aerotermia, tacto agradable sin ser áspero, gran realismo de vetas."
      },
      {
        id: "opt-rev-1b",
        title: "Porcelánico formato madera 20x120cm Saloni / Pamesa Atrium Roble",
        provider: "Pamesa / Saloni",
        price: 24,
        url: "https://www.pamesa.com/",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Precio muy ajustado manteniendo formato alargado y gran durabilidad ante golpes."
      },
      {
        id: "opt-rev-1c",
        title: "Porcelánico Artens Intenso Roble Medio 15x90 / 20x120 Leroy Merlin",
        provider: "Leroy Merlin",
        price: 18.5,
        url: "https://www.leroymerlin.es/",
        imageUrl: "",
        notes: "La alternativa más económica del mercado para optimizar el presupuesto al máximo."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Queremos que toda la casa tenga el mismo suelo continuo para dar sensación de amplitud, sin saltos en los dormitorios.",
        date: "2026-10-16"
      },
      {
        author: "Alejandro",
        text: "Comprobar que el constructor use mortero cola flexible especial para suelo radiante y cuñas autonivelantes.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe presupuestar mano de obra para colocación con cuñas autonivelantes tipo Peygran, junta de 1,5 a 2 mm y cemento cola deformable C2TE S1 apto para suelo radiante."
  },
  {
    id: "rev-2",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Solado de baño secundario y aseo: Porcelánico decorativo C2",
    location: "Baño secundario y aseo de cortesía",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Elegir diseño decorativo (hidráulico geométrico moderno, microcemento, efecto terrazo o espiga).",
    explanation: "Suelo porcelánico antideslizante C2 con diseño decorativo diferencial para dar personalidad y contraste al aseo y baño secundario.",
    specMemoria: "Baño secundario y aseo C2 (ducha resina): Porcelánico en baldosas decorativas.",
    unitType: "m2",
    quantity: 12,
    wastagePercent: 10,
    targetUnitPrice: 28,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-2a",
        title: "Porcelánico decorativo tipo hidráulico contemporáneo 20x20 o hexagonal",
        provider: "Vives Cerámica / Natucer",
        price: 32,
        url: "https://www.vivesceramica.com/",
        imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&auto=format&fit=crop&q=80",
        notes: "Aporta un toque de diseño muy acogedor y disimula pequeñas gotas de agua."
      },
      {
        id: "opt-rev-2b",
        title: "Porcelánico efecto microcemento gris cálido 60x60cm",
        provider: "Grespania / Pamesa",
        price: 25,
        url: "",
        imageUrl: "",
        notes: "Líneas depuradas y sensación de baño de hotel contemporáneo."
      }
    ],
    comments: [],
    builderNotes: "Replantear el patrón decorativo centrado con el lavabo o la puerta de entrada."
  },
  {
    id: "rev-3",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Rodapié interior en DM estratificado blanco 12x0.9 cm",
    location: "Perímetro de todas las estancias soladas de la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Altura y perfil (canto recto contemporáneo de 12cm o de 9cm, lacado blanco mate a juego con puertas).",
    explanation: "Zócalo o rodapié de fibra de madera hidrófuga lacado en blanco de 12 cm de altura y 9 mm de grosor con canto recto moderno, rematando el encuentro entre el suelo de madera porcelánico y los tabiques de Pladur.",
    specMemoria: "Rodapiés: DM estratificado blanco (12cm x 0,9).",
    unitType: "ml",
    quantity: 95,
    wastagePercent: 7,
    targetUnitPrice: 6.5,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-3a",
        title: "Rodapié DM hidrófugo lacado blanco satinado canto recto 120x9mm",
        provider: "Almacén de carpintería / Kronospan",
        price: 7,
        url: "",
        imageUrl: "",
        notes: "Altura elegante de 12cm que estiliza los techos altos."
      },
      {
        id: "opt-rev-3b",
        title: "Rodapié DM blanco canto recto estándar 90x9mm",
        provider: "Leroy Merlin / Brico Depot",
        price: 4.8,
        url: "",
        imageUrl: "",
        notes: "Medida más baja si se prefiere una presencia más discreta."
      }
    ],
    comments: [],
    builderNotes: "Pegar con masilla adhesiva de montaje de alta adherencia y sellar la junta superior contra la pared con acrílico blanco pintable."
  },
  {
    id: "rev-4",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Alicatados de baños hasta el techo: Porcelánico 40x120 cm",
    location: "Paredes de baños y zonas de aguas",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CLAVE DE LAURA Y ALEJANDRO: Acabado del azulejo (efecto mármol Calacatta con veta suave, blanco mate rectificado, efecto piedra caliza o beige).",
    explanation: "Revestimiento cerámico porcelánico rectificado de gran formato 40x120 cm colocado hasta el techo en las paredes de duchas y zonas húmedas, minimizando las juntas visibles para una estética continua y fácil limpieza.",
    specMemoria: "Alicatados: hasta el techo papel y/o porcelánico. Porcelánico formato alargado 40x120cm o similar. En paredes de duchas y bañera azulejo porcelánico de 30x90 o similar efecto mármol u otro.",
    unitType: "m2",
    quantity: 48,
    wastagePercent: 10,
    targetUnitPrice: 29,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-4a",
        title: "Porcelánico rectificado 40x120cm Efecto Mármol Calacatta Gold / Blanco Sedoso",
        provider: "Baldocer / Porcelanosa / Geotiles",
        price: 32,
        url: "https://baldocer.com/",
        imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&auto=format&fit=crop&q=80",
        notes: "Aspecto luminoso y lujoso, reproduce la veta natural del mármol sin el mantenimiento de la piedra natural."
      },
      {
        id: "opt-rev-4b",
        title: "Porcelánico rectificado 30x90cm Blanco Mate liso con relieve decorativo en testero",
        provider: "Pamesa / Ibero",
        price: 24,
        url: "",
        imageUrl: "",
        notes: "Excelente para combinar un paño con textura de ondas y el resto en blanco limpio."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "El mármol con veta dorada sutil queda precioso combinado con grifería negra o inox.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Exigir al alicatador doble encolado y crucetas autonivelantes para evitar cejas en baldosas de 120 cm."
  },
  {
    id: "rev-5",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Solado exterior entrada principal y tendedero (24 m²)",
    location: "Acceso peatonal de entrada principal y zona de tendedero exterior",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Tono del pavimento antideslizante C3 para exteriores (arena, gris o grafito).",
    explanation: "Gres porcelánico antideslizante mate para intemperie clase C3 (R11) en formato 30x60 o 20x60 cm, insensible al hielo y a las manchas, garantizando máxima adherencia incluso mojado por lluvia.",
    specMemoria: "Solados exteriores entrada principal y tendedero (24m2): Porcelánico MT antideslizante formato alargado de 20x60 o/y 40x40 cm / 30x60 cm.",
    unitType: "m2",
    quantity: 24,
    wastagePercent: 10,
    targetUnitPrice: 26,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-5",
        title: "Gres porcelánico exterior C3 / R11 espesorado formato 30x60cm",
        provider: "Gres Aragón / Ceracasa / Leroy Merlin",
        price: 26,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Máxima resistencia a cambios térmicos y heladas."
      }
    ],
    comments: [],
    builderNotes: "Aplicar pendiente mínima del 1,5% hacia el exterior para evacuación rápida de aguas de lluvia."
  },
  {
    id: "rev-6",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Solado exterior terraza Fachada Sur (55 m²)",
    location: "Porche / terraza con salida directa desde dormitorios y salón",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Elección de baldosa porcelánica rectificada antideslizante (superficie aproximada de 55 m² con 2,4 m de ancho).",
    explanation: "Pavimento porcelánico exterior rectificado antideslizante en baldosa de 40x40 cm (o 60x60 cm) para la terraza sur donde se ubica el salón de verano y la conexión con el jardín.",
    specMemoria: "Zona fachada Sur (salida de dormitorios y salón, con una superficie aprox. 55 m2 con un ancho de 2,4 m): Baldosa de porcelánico rectificado antideslizante de 40x40 cm.",
    unitType: "m2",
    quantity: 55,
    wastagePercent: 10,
    targetUnitPrice: 27,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-6a",
        title: "Porcelánico rectificado C3 40x40 / 60x60cm tono Piedra Caliza / Arena",
        provider: "Pamesa / Exagres / Marazzi",
        price: 28,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        notes: "Tono claro que no se calienta en exceso con el sol del mediodía en verano."
      },
      {
        id: "opt-rev-6b",
        title: "Gres extrusionado rústico contemporáneo antideslizante",
        provider: "Gresmanc / Terraklinker",
        price: 25,
        url: "",
        imageUrl: "",
        notes: "Especialmente indicado para zonas con jardín y tierra."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Superficie grande (55 m²), buscar un material con buena oferta por volumen de compra.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe prever juntas de dilatación perimetrales cada 25 m² para evitar que las baldosas se levanten con el sol."
  },
  {
    id: "rev-7",
    chapter: "revestimientos",
    chapterName: "Revestimientos y Pavimentos",
    name: "Zócalo exterior de gres tapando cámara de forjado sanitario",
    location: "Arranque perimetral exterior de fachada",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Coordinar el color del zócalo con el ladrillo cara vista de la fachada.",
    explanation: "Revestimiento de zócalo en baldosa de gres de formato cuadrado según altura de cámara bufa, protegiendo la base del muro contra salpicaduras de tierra y agua.",
    specMemoria: "Zócalo (tapando cámara bufa / cámara de forjado sanitario): Baldosa Gres (formato cuadrado según la altura).",
    unitType: "ml",
    quantity: 32,
    wastagePercent: 5,
    targetUnitPrice: 16,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-rev-7",
        title: "Pieza de gres esmaltado antideslizante para zócalo exterior",
        provider: "Gres Catalán / Almacén",
        price: 16,
        url: "",
        imageUrl: "",
        notes: "Formato resistente a la humedad y de fácil limpieza con manguera."
      }
    ],
    comments: [],
    builderNotes: "Colocar remate superior biselado para evitar que el agua se deposite en la arista."
  },

  // =========================================================================
  // 12. CARPINTERÍA INTERIOR Y ARMARIOS (CRITERIO MUY ALTO DE PROPIETARIOS)
  // =========================================================================
  {
    id: "car-int-1",
    chapter: "carpinteria-interior",
    chapterName: "Carpintería Interior y Armarios",
    name: "Puertas de paso de suelo a techo lacadas en blanco o color (H hasta 246 cm)",
    location: "Dormitorios, baños, aseos, cocina y lavandería",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CLAVE DE LAURA Y ALEJANDRO: Decidir diseño de hoja (lisa moderna o con ligeros relieves/fresados), color de laca (blanco roto, gris claro o topo) y acabado de manivela (acero inox, negro mate o dorado cepillado).",
    explanation: "Puertas semi-macizas de gran envergadura ejecutadas de suelo a techo hasta 246 cm de altura con hoja de 82,5 cm de paso cómodo. Incorporan goma perimetral hermética en el cerco para aislamiento acústico, 4 bisagras ocultas o inox reforzadas, picaporte magnético de petaca y tapetas en L de 70x12 mm.",
    specMemoria: "Carpinterías interiores: Las puertas de paso lacadas, ciegas con relieves, se realizarán de suelo a techo hasta una altura máxima de 2,46 cm con hojas de 0,825, con goma de hermetismo a cerco, 4 bisagras, picaporte de petaca, manivela en inox., negro o dorado y tapeta en L de 70 x 12/10. Resistente a golpes, rayaduras y roces según memoria de proyecto. Semi-Maciza en DM Lacado color. Baños y aseos: DM Lacado con condena.",
    unitType: "ud",
    quantity: 8,
    wastagePercent: 0,
    targetUnitPrice: 340,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-int-1a",
        title: "Puerta suelo-techo 246x82.5cm Lacada Blanco Satinado lisa con picaporte magnético y manivela Negra",
        provider: "Puertas Castalla / Sanrafael / Carpintería a medida",
        price: 360,
        url: "https://www.puertascastalla.com/",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Estética contemporánea espectacular. El picaporte magnético no hace clic al cerrar y la goma frena corrientes y ruidos."
      },
      {
        id: "opt-car-int-1b",
        title: "Puerta suelo-techo con fresado pantografiado de 2 líneas geométricas + manivela Inox",
        provider: "Puertas Sanrafael",
        price: 340,
        url: "https://www.puertassanrafael.com/",
        imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80",
        notes: "Aporta un ligero relieve clásico actualizado con manivelas en acero inoxidable pulido."
      },
      {
        id: "opt-car-int-1c",
        title: "Puerta semi-maciza estándar 211cm con tarja superior enrasada hasta 246cm",
        provider: "Carpintería local",
        price: 290,
        url: "",
        imageUrl: "",
        notes: "Alternativa más económica si el fabricante cobra suplemento excesivo por hoja continua de 246cm."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Las puertas hasta el techo con manivelas en negro mate quedan increíbles y dan una elegancia tremenda a la casa.",
        date: "2026-10-16"
      },
      {
        author: "Alejandro",
        text: "Recordar que los 2 baños deben llevar condena de seguridad interior con ranura de apertura exterior.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor y los montadores de Pladur deben replantear los premarcos de suelo a techo antes de encintar los tabiques, verificando el plomo milimétrico."
  },
  {
    id: "car-int-2",
    chapter: "carpinteria-interior",
    chapterName: "Carpintería Interior y Armarios",
    name: "Armarios empotrados: Equipamiento interior tipo IKEA (presupuesto ref. 275 €/m²)",
    location: "Dormitorio principal (vestidor) y dormitorios secundarios",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Laura y Alejandro configuran la distribución interior de baldas, cajones, zapateros y pantaloneros (sistema IKEA PAX o similar) con tapajuntas exterior de 7 cm lacado blanco.",
    explanation: "Armarios empotrados modulares con cerramiento exterior y distribución interior personalizada con sistemas tipo IKEA PAX o carpintería a medida con coste límite de referencia de 275 €/m², rematados perimetralmente con tapajuntas de 7 cm lacado en blanco y clema para iluminación.",
    specMemoria: "Armarios empotrados: Equipamiento interior incluido, coste máximo 275 €/m2: IKEA. Tapajuntas 7 cm lacado blanco. Clema para iluminación.",
    unitType: "m2",
    quantity: 14,
    wastagePercent: 0,
    targetUnitPrice: 265,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-int-2a",
        title: "Módulos interiores IKEA PAX configurados con cajoneras Komplement + Remate frontal lacado",
        provider: "IKEA",
        price: 260,
        url: "https://www.ikea.com/es/es/planners/pax-planner/",
        imageUrl: "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=600&auto=format&fit=crop&q=80",
        notes: "Modularidad insuperable, fácil de adaptar accesorios según las necesidades de Laura y Alejandro."
      },
      {
        id: "opt-car-int-2b",
        title: "Interior de armario a medida en melamina textil lino cancún con canteado PVC 1mm",
        provider: "Carpintero a medida",
        price: 275,
        url: "",
        imageUrl: "",
        notes: "Ajuste milimétrico sin dejar holguras con el tabique de Pladur."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Configurar el vestidor del dormitorio principal con zapateros extraíbles y cajones con frente de vidrio.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe dejar los huecos rematados a escuadra perfecta con tapajuntas perimetral de 7 cm."
  },
  {
    id: "car-int-3",
    chapter: "carpinteria-interior",
    chapterName: "Carpintería Interior y Armarios",
    name: "Puerta de entrada principal blindada con 3 puntos de anclaje",
    location: "Acceso principal a la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Elección de color exterior (a juego con valla o carpintería de PVC imitación madera) y color interior (lacado blanco a juego con puertas interiores).",
    explanation: "Puerta de entrada de alta seguridad con hoja blindada con chapa de acero interior, bastidor reforzado anti-palanca, cerradura de seguridad con 3 puntos de anclaje, cilindro antibumping y manillón exterior moderno.",
    specMemoria: "Puerta de entrada principal: Blindada, bastidor y cerradura con 3 puntos de anclaje.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 850,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-int-3a",
        title: "Puerta blindada acabado bicolor (Roble/Nogal exterior y Blanco lacado interior)",
        provider: "Tesa / Dierre / Puertas Herrero",
        price: 890,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Cumple la doble función estética: mimetizada con el exterior y perfectamente integrada con las puertas de la casa por dentro."
      },
      {
        id: "opt-car-int-3b",
        title: "Puerta acorazada Grado 3 con cerradura electrónica o teclado numérico",
        provider: "Fichet / Cisa",
        price: 1350,
        url: "",
        imageUrl: "",
        notes: "Máxima resistencia frente a intentos de robo."
      }
    ],
    comments: [],
    builderNotes: "Anclar el precerco de acero macizado con mortero a los muros de carga para evitar holguras."
  },

  // =========================================================================
  // 13. CARPINTERÍA EXTERIOR Y VENTANAS (CRITERIO MUY ALTO DE PROPIETARIOS)
  // =========================================================================
  {
    id: "car-ext-1",
    chapter: "carpinteria-exterior",
    chapterName: "Carpintería Exterior y Ventanas",
    name: "Balconeras correderas PVC RPT 200x230 cm con vidrio seguridad 4+4/16/4+4",
    location: "Salidas a terraza desde salón y dormitorios",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CLAVE DE LAURA Y ALEJANDRO: Acabado PVC imitación madera exterior (Roble dorado, Castaño o Nogal) y blanco o madera interior. Sistema de persianas motorizadas.",
    explanation: "Grandes puertas balconeras correderas de 2,00 x 2,30 m en perfil de PVC con rotura de puente térmico y refuerzos de acero galvanizado. Doble acristalamiento de seguridad acústico 4+4 / cámara de 16 mm con gas Argón / 4+4 bajo emisivo, aireadores para ventilación DB-HS3 y persianas térmicas de aluminio motorizadas con bloqueo anti-vandálico.",
    specMemoria: "Ventanas Balconera: Con rotura de puente térmico (RPT) corredera 200x230 cm, incluso vidrio 4+4/16/4+4, con aireadores. Incluido persiana tipo compacto aluminio térmico mecanizadas y cierre antivandálico. CARPINTERÍA DE PVC EN IMITACIÓN A MADERA POR SU CARA EXTERIOR.",
    unitType: "ud",
    quantity: 3,
    wastagePercent: 0,
    targetUnitPrice: 1450,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-ext-1a",
        title: "Balconera corredera elevable Kömmerling / Deceuninck PVC Roble exterior + motor persiana Somfy",
        provider: "Kömmerling / Cortizo PVC / Deceuninck",
        price: 1480,
        url: "https://www.kommerling.es/",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
        notes: "Excelente hermetismo clase 4, deslizamiento suave con un solo dedo y máxima retención del calor en invierno."
      },
      {
        id: "opt-car-ext-1b",
        title: "Balconera corredera PVC Schüco Corona CT 70 imitación madera",
        provider: "Schüco",
        price: 1650,
        url: "https://www.schueco.com/es",
        imageUrl: "",
        notes: "Perfilería alemana de prestigio premium con cerraduras de varios puntos."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Las persianas motorizadas deben conectarse con pulsador y si es posible con opción de subir y bajar todas juntas desde la entrada.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El constructor debe prever sellado con cinta expansiva de estanqueidad al aire (Blow-Door test) en todo el perímetro del cajón de persiana y marco."
  },
  {
    id: "car-ext-2",
    chapter: "carpinteria-exterior",
    chapterName: "Carpintería Exterior y Ventanas",
    name: "Ventanas oscilobatientes PVC con vidrio 3+3/16/4+4 Gas Argón",
    location: "Dormitorios, baños y cocina",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Tono imitación madera exterior en concordancia con las balconeras.",
    explanation: "Ventanas oscilobatientes de PVC de alta eficiencia térmica que permiten tanto la apertura abatible total como la inclinación superior oscilante para ventilación segura. Vidrio laminado acústico 3+3 con cámara de 16 mm de gas Argón y vidrio bajo emisivo de 4+4 mm con persianas de aluminio compacto inyectadas con poliuretano motorizadas.",
    specMemoria: "Ventanas: Ventana de PVC con rotura de puente térmico (RPT) oscilobatiente, incluso vidrio 3+3/16/4+4 con gas Argón, con aireadores. Incluido persiana tipo compacto aluminio térmico y cierre antivandálico.",
    unitType: "ud",
    quantity: 5,
    wastagePercent: 0,
    targetUnitPrice: 680,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-ext-2",
        title: "Ventana oscilobatiente PVC 5 cámaras imitación madera exterior + vidrio Argón + persiana térmica",
        provider: "Kömmerling / Cortizo PVC",
        price: 680,
        url: "https://www.kommerling.es/",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "El gas Argón en la cámara reduce la pérdida térmica un 30% respecto al aire convencional."
      }
    ],
    comments: [],
    builderNotes: "Comprobar el correcto drenaje del perfil exterior y la holgura adecuada para la colocación de vierteaguas."
  },
  {
    id: "car-ext-3",
    chapter: "carpinteria-exterior",
    chapterName: "Carpintería Exterior y Ventanas",
    name: "Cierre de tendedero con listones de composite WPC o PVC color Ipe",
    location: "Cerramiento exterior del tendedero hacia la parcela",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Laura y Alejandro deciden el acabado (composite WPC color Ipe o PVC imitación madera castaño oscuro de 40x40x2800 mm).",
    explanation: "Celosía moderna de lamas verticales fijas de composite de madera tecnológica (WPC) o PVC exterior que oculta el tendedero y la zona de lavado desde el jardín, permitiendo la ventilación continua y libre de mantenimiento (sin necesidad de barnices ni lijado).",
    specMemoria: "Cierre de tendedero a parcela listones fijos de composite WPC color Ipe (imitación castaño oscuro) de 40x40x2800 o/y de PVC imitación a madera en perfil exterior. WPC o/y Aluminio RPT 60 mm.",
    unitType: "m2",
    quantity: 12,
    wastagePercent: 5,
    targetUnitPrice: 95,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-car-ext-3a",
        title: "Celosía de lamas verticales WPC Composite color Ipe / Castaño oscuro 40x40mm",
        provider: "Tarimatec / Neo-Teck / Almacén madera",
        price: 98,
        url: "https://tarimatec.com/",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80",
        notes: "Aspecto natural de madera tropical sin astillas, imputrescible y con protección contra rayos UV."
      },
      {
        id: "opt-car-ext-3b",
        title: "Lamas de aluminio lacado imitación madera o PVC extrusionado",
        provider: "Gradhermetic / Cortizo",
        price: 90,
        url: "",
        imageUrl: "",
        notes: "Ultra ligero y gran estabilidad dimensional."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "El composite color Ipe queda muy cálido y rompe la frialdad del cerramiento exterior.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Fijar a subestructura oculta galvanizada con tornillería de acero inoxidable A2."
  },

  // =========================================================================
  // 14. CERRAMIENTOS DE PARCELA, URBANIZACIÓN Y PINTURA (CRITERIO PROPIETARIOS)
  // =========================================================================
  {
    id: "urb-1",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Valla de fachada a calle con chapado de piedra rústica exterior",
    location: "Linde frontal a calle de la parcela",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Tipo y tono de piedra rústica (granito de la sierra, pizarra o caliza envejecida) y color de la pintura interior.",
    explanation: "Muro de cerramiento de 1 pie de ladrillo o bloque de hormigón revestido en su cara exterior con chapado de piedra rústica natural integrada en el paisaje de Valdemorillo, enfoscado y pintado por la cara interior de la parcela y coronado con malla modular galvanizada de 13 mm sobre postes.",
    specMemoria: "Valla a calle: Chapado de piedra rústica exterior y enfoscada pintada interior. Cerramiento en 1 pie de ladrillo y/o bloque de hormigón + chapado de piedra rústica en cara exterior y enfoscado pintado por el interior + valla. Vallado calle sobre muro: Malla modular de alambre galvanizado de 13mm en cuadrícula, sobre postes.",
    unitType: "ml",
    quantity: 25,
    wastagePercent: 5,
    targetUnitPrice: 110,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-1",
        title: "Muro de bloque + Mampostería chapada en piedra natural de cantera local + Valla galvanizada",
        provider: "Canteras Madrid / Constructor",
        price: 110,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=80",
        notes: "Durabilidad centenaria y aspecto noble tradicional de la sierra de Madrid."
      }
    ],
    comments: [],
    builderNotes: "El constructor debe impermeabilizar la cara superior del muro antes de fijar las pletinas de la valla metálica para evitar chorretones de óxido."
  },
  {
    id: "urb-2",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Puerta de vehículos abatible automatizada en acero galvanizado (300x200 cm)",
    location: "Acceso rodado de vehículos desde la calle",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Color de laca (Gris antracita RAL 7016, negro o blanco) y diseño de lamas (ciegas horizontales o ventiladas).",
    explanation: "Cancel o portón de entrada de vehículos en acero galvanizado lacado al horno con tratamiento anticorrosión marina, de 3,00 m de ancho x 2,00 m de alto, con motor electromecánico automático y 2 mandos a distancia.",
    specMemoria: "Puerta vehículos abatible automatizada: En acero galvanizado de 300x200 cm, acabado lacado automática (con mando a distancia).",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 1650,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-2a",
        title: "Puerta abatible 300x200cm lamas horizontales lacadas RAL 7016 + Motorización Erreka / BFT",
        provider: "Cerrajería metálica / Erreka",
        price: 1650,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80",
        notes: "Mecanismo silencioso con fotocélulas de seguridad anti-atrapamiento y luz de destello."
      },
      {
        id: "opt-urb-2b",
        title: "Puerta corredera sobre guía de suelo en lugar de abatible (si el espacio lo permite)",
        provider: "Cerrajería de obra",
        price: 1800,
        url: "",
        imageUrl: "",
        notes: "Aprovecha mejor el espacio interior del aparcamiento."
      }
    ],
    comments: [],
    builderNotes: "Dejar acometida eléctrica directa de 230V con magnetotérmico independiente en el cuadro."
  },
  {
    id: "urb-3",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Puerta peatonal en acero galvanizado con videoportero (120x200 cm)",
    location: "Acceso peatonal desde la calle",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Modelo de videoportero con conexión wifi para responder desde el móvil y diseño estético coordinado con la cancela de coches.",
    explanation: "Puerta peatonal a juego de 1,20 x 2,00 m con cerradura eléctrica de apertura remota, manilla y placa exterior de videoportero con cámara gran angular y monitor en el interior de la vivienda.",
    specMemoria: "Puerta peatonal: En acero galvanizado de 120x200 cm acabado lacado con videoportero.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 750,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-3",
        title: "Puerta peatonal 120x200cm lacada + Videoportero Tegui / Fermax con reenvío de llamada al móvil",
        provider: "Fermax / Tegui / Cerrajero",
        price: 750,
        url: "https://www.fermax.com/spain/",
        imageUrl: "",
        notes: "Permite abrir la puerta a repartidores de paquetes incluso estando fuera de casa."
      }
    ],
    comments: [],
    builderNotes: "Pasar tubo corrugado con manguera de señal desde el poste de la cancela hasta el zaguán interior."
  },
  {
    id: "urb-4",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Acera perimetral y entrada en hormigón impreso (subbase grava 6cm)",
    location: "Aceras de fondo, lateral derecho y acceso peatonal desde la valla",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Dibujo del molde de impresión (adoquín rústico, madera o losa lisa) y colorante superficial (gris ceniza o arena).",
    explanation: "Solera de hormigón armado de 10 cm con mallazo electrosoldado, subbase de grava de 6 cm de espesor, fibra de polipropileno y estampado superficial impreso con resina selladora antidesgaste y tubo de drenaje exterior.",
    specMemoria: "Urbanización: Acera perimetral y entrada peatonal: En hormigón impreso con subbase de grava 6cm de espesor. Aceras de fondo lateral derecho y entrada peatonal desde valla: Hormigón impreso con subbase de grava de 6cm de espesor incl. tubo de drenaje (en línea exterior de escorrentías de parcela).",
    unitType: "m2",
    quantity: 45,
    wastagePercent: 5,
    targetUnitPrice: 32,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-4",
        title: "Hormigón impreso coloreado y sellado con resina de poliuretano + mallazo",
        provider: "Especialista en pavimentos continuos",
        price: 32,
        url: "",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?w=600&auto=format&fit=crop&q=80",
        notes: "No crecen hierbas, limpieza sencillísima y gran soporte de paso peatonal."
      }
    ],
    comments: [],
    builderNotes: "El constructor debe ejecutar las juntas de dilatación cada 3 metros cortadas con disco para evitar fisuras erráticas."
  },
  {
    id: "urb-5",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Estacionamiento de coches en grava de canto rodado 20-40 mm (35 m²)",
    location: "Área de aparcamiento exterior de vehículos",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Color de la grava (blanco marfil, gris ocre o mezcla de río).",
    explanation: "Zona de aparcamiento para dos vehículos de 35 m² compuesta por compactado de tierras naturales, extendido de malla geotextil anti-hierbas y capa de 6 cm de espesor de grava de cantos rodados de 20 a 40 mm que filtra el agua de lluvia de forma natural.",
    specMemoria: "Estacionamiento de coches (superficie aproximada 35m2): Grava de cantos rodados (20 a 40mm) previo compactado de tierras (con 6 cm de espesor).",
    unitType: "m2",
    quantity: 35,
    wastagePercent: 5,
    targetUnitPrice: 18,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-5",
        title: "Grava canto rodado silíceo 20/40mm + Geotextil anti-hierbas de 150g",
        provider: "Áridos Sierra / Constructor",
        price: 18,
        url: "",
        imageUrl: "",
        notes: "Ecológico, permeable al agua (evita charcos) y muy económico."
      }
    ],
    comments: [],
    builderNotes: "Compactar bien el terreno previamente con bandeja vibrante antes de verter la grava."
  },
  {
    id: "urb-6",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Alcorque con bordillos de hormigón (1 ud de 1.2 x 1.2 m)",
    location: "Jardín o zona de entrada",
    needsOwnerCriteria: true,
    criteriaNotes: "Elegir qué árbol plantar (olivo, magnolio o encina).",
    explanation: "Formación de alcorque cuadrado de 1,20 x 1,20 m ejecutado con bordillos de hormigón para proteger las raíces del árbol y retener el agua de riego.",
    specMemoria: "Formación de Alcorque (1ud de 1,2x1,2 m): Bordillos de hormigón.",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 85,
    status: "selected",
    selectedOptionId: "opt-urb-6",
    options: [
      {
        id: "opt-urb-6",
        title: "Bordillo jardinero de hormigón achaflanado 120x120cm",
        provider: "Prefabricados de hormigón",
        price: 85,
        url: "",
        imageUrl: "",
        notes: "Remate limpio con el hormigón impreso o la grava."
      }
    ],
    comments: [],
    builderNotes: "Dejar toma de riego por goteo en el interior del alcorque."
  },
  {
    id: "urb-7",
    chapter: "urbanizacion",
    chapterName: "Valla, Parcela y Urbanización",
    name: "Restauración parcial de linderos con valla de simple torsión",
    location: "Linderos laterales y traseros de la parcela con vecinos",
    needsOwnerCriteria: false,
    criteriaNotes: "Adecuación perimetral de seguridad.",
    explanation: "Restauración y retensado del vallado existente de malla de simple torsión galvanizada sobre postes y colocación de brezo o malla de ocultación si se precisa.",
    specMemoria: "A linderos (en caso que se requiera): Linderos de parcela restaurar parcialmente con vallado de simple torsión.",
    unitType: "ml",
    quantity: 40,
    wastagePercent: 0,
    targetUnitPrice: 14,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-urb-7",
        title: "Malla galvanizada 50/14 de simple torsión + alambre guía de tensado",
        provider: "Cercados metálicos",
        price: 14,
        url: "",
        imageUrl: "",
        notes: "Solución económica para delimitación de linderos."
      }
    ],
    comments: [],
    builderNotes: "Coordinar con las parcelas colindantes antes de actuar sobre los postes medianeros."
  },
  {
    id: "pin-1",
    chapter: "urbanizacion",
    chapterName: "Pinturas y Decoración",
    name: "Pintura plástica lisa lavable en paredes y techos",
    location: "Toda la vivienda",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO CLAVE DE LAURA Y ALEJANDRO: Elegir gama cromática (Blanco cálido, blanco roto, lino suave, gris niebla o arena claro).",
    explanation: "Pintura plástica mate sedosa de máxima cubrición y lavabilidad, sin disolventes ni olores (ecolabel A+), aplicada a dos manos tras lijado fino e imprimación sobre placas de Pladur nivel Q3.",
    specMemoria: "Pinturas Paredes y techos: Plástica.",
    unitType: "m2",
    quantity: 320,
    wastagePercent: 5,
    targetUnitPrice: 12,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-pin-1a",
        title: "Pintura plástica lavable mate sedosa extra-cubriente Valentine / Titan / Procolor",
        provider: "Valentine / Titanlux",
        price: 12.5,
        url: "https://www.valentine.es/",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
        notes: "Se limpia con una bayeta húmeda sin dejar marcas ni brillos indeseados."
      },
      {
        id: "opt-pin-1b",
        title: "Pintura mineral al silicato transpirable ecológica",
        provider: "Keim / Graphenstone",
        price: 16,
        url: "",
        imageUrl: "",
        notes: "Ecológica 100%, transpirable y previene la aparición de moho de forma natural."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "Queremos tonos blancos cálidos o arena muy suave para que den luminosidad y combinen con el suelo imitación roble.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "El pintor debe revisar con foco rasante todas las paredes antes de la mano final para corregir cualquier defecto de juntas."
  },
  {
    id: "pin-2",
    chapter: "urbanizacion",
    chapterName: "Pinturas y Decoración",
    name: "Papel pintado decorativo en cabeceros y zonas secas de baños",
    location: "Cabeceros de camas en dormitorios y paños secos de aseos",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Selección de diseño (textura textil lino, motivos botánicos sutiles o geométricos elegantes).",
    explanation: "Revestimiento mural en papel pintado vinílico lavable de alta densidad que aporta calidez y sofisticación a los cabeceros de dormitorios y zonas que no reciben agua directa en el aseo.",
    specMemoria: "CHAPADOS: Paños en cabeceros de camas y paños de baños en zonas que no comprendan bañeras ni platos de duchas: Papel pintado decorado.",
    unitType: "m2",
    quantity: 26,
    wastagePercent: 10,
    targetUnitPrice: 28,
    status: "pending",
    selectedOptionId: null,
    options: [
      {
        id: "opt-pin-2a",
        title: "Papel pintado vinílico lavable textura textil / lino o botánico elegante",
        provider: "Coordonné / Casamance / Leroy Merlin",
        price: 32,
        url: "https://coordonne.com/",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80",
        notes: "Resiste roces, no decolora y se limpia fácilmente con trapo húmedo."
      },
      {
        id: "opt-pin-2b",
        title: "Papel tejido no tejido (TNT) fácil colocación",
        provider: "Leroy Merlin / Saint Honoré",
        price: 22,
        url: "",
        imageUrl: "",
        notes: "Excelente relación calidad precio para dormitorios secundarios."
      }
    ],
    comments: [
      {
        author: "Laura",
        text: "En el cabecero del dormitorio principal un papel con textura tipo tela de saco o lino aportará un toque de hotel boutique.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Aplicar cola vinílica antifúngica con brocha sobre soporte previamente imprimado."
  },
  {
    id: "esc-1",
    chapter: "urbanizacion",
    chapterName: "Previsiones y Estructuras Futuras",
    name: "Escalera modular interior galvanizada de doble tramo (tipo INDES.K)",
    location: "Previsión de subida desde tendedero a planta bajo cubierta",
    needsOwnerCriteria: true,
    criteriaNotes: "CRITERIO PROPIETARIOS: Decidir si se instala en esta fase o se deja acopiada/estocada bajo cubierta para montaje posterior.",
    explanation: "Escalera modular metálica para interiores de 80 cm de ancho en acero galvanizado con peldaños de madera o chapa perforada, adaptable a la altura final de forjado.",
    specMemoria: "EN PREVISIÓN: Escalera: En previsión, tal vez por montaje habría que estocarla bajo cubierta: Escalera modular galvanizada para interiores de doble tramo de 80cm (tipo IN INDES .K o similar).",
    unitType: "ud",
    quantity: 1,
    wastagePercent: 0,
    targetUnitPrice: 1350,
    status: "reviewing",
    selectedOptionId: null,
    options: [
      {
        id: "opt-esc-1",
        title: "Escalera modular en kit doble tramo con barandilla y peldaños de madera",
        provider: "Fontanot / Enesca / INDES.K",
        price: 1350,
        url: "https://es.fontanotshop.com/",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
        notes: "Montaje rápido en seco mediante pernos sin necesidad de soldaduras en obra terminada."
      }
    ],
    comments: [
      {
        author: "Alejandro",
        text: "Comprobar si por dimensiones del hueco del forjado conviene subir los módulos antes de cerrar la cubierta.",
        date: "2026-10-16"
      }
    ],
    builderNotes: "Fijar firmemente al dado de hormigón inferior y a la viga brochal metálica superior."
  }
];

// Capítulos organizados para navegación y filtros
const CHAPTERS = [
  { id: "todos", name: "Todos los Capítulos", icon: "layout-grid" },
  { id: "cimentacion", name: "Cimentación y Forjados", icon: "layers" },
  { id: "estructura", name: "Estructura Portante", icon: "box" },
  { id: "cubiertas", name: "Cubiertas y Evacuación", icon: "home" },
  { id: "fachadas", name: "Fachadas y Envolvente", icon: "building-2" },
  { id: "tabiqueria", name: "Tabiquería y Falsos Techos", icon: "split-square-vertical" },
  { id: "aislamientos", name: "Aislamientos y Eficiencia (Clase A)", icon: "shield-check" },
  { id: "impermeabilizacion", name: "Impermeabilización y Ventilación", icon: "droplets" },
  { id: "climatizacion", name: "Climatización, Aerotermia y ACS", icon: "thermometer-snowflake" },
  { id: "electricidad", name: "Electricidad y Telecomunicaciones", icon: "zap" },
  { id: "sanitarios", name: "Fontanería, Sanitarios y Griferías", icon: "bath" },
  { id: "revestimientos", name: "Revestimientos y Pavimentos", icon: "grid" },
  { id: "carpinteria-interior", name: "Carpintería Interior y Armarios", icon: "door-closed" },
  { id: "carpinteria-exterior", name: "Carpintería Exterior y Ventanas", icon: "maximize" },
  { id: "urbanizacion", name: "Valla, Parcela, Pinturas y Previsiones", icon: "tree-pine" }
];
