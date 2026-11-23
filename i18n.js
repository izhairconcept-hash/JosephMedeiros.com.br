/* ==========================================================================
   Joseph Medeiros — Luthier, Conserto e Restauro
   Sistema Multilíngue Seguro (i18n) — Custo Zero / Sem dependências externas
   Idiomas: PT-BR, EN-US, ES, FR, IT, DE, RU
   ========================================================================== */

(function () {
  "use strict";

  const ALLOWED_LANGS = new Set(["pt", "en", "es", "fr", "it", "de", "ru"]);
  const STORAGE_KEY = "jm_luthier_lang";
  const WHATSAPP_PHONE = "5531996255116";

  const TRANSLATIONS = {
    pt: {
      htmlLang: "pt-BR",
      nav_servicos: "Atuação",
      nav_lutheria: "Lutheria",
      nav_loja: "Produtos e Oficina",
      nav_institucional: "Institucional",
      nav_faq: "Dúvidas",
      nav_blog: "Blog",
      nav_contato: "Contato",

      hero_tag: "Belo Horizonte • MG",
      hero_h1: "Luthier em Belo Horizonte: precisão técnica e trabalho artesanal em cordas.",
      hero_p: "Serviços especializados de lutheria, conserto e restauração de instrumentos de cordas, espaços preparados para seleção de instrumentos e acessórios, fabricação artesanal em oficina e atendimento a instituições.",
      hero_btn_orcamento: "Solicitar orçamento",
      hero_btn_frentes: "Ver frentes de atuação",
      hero_legenda: "Voluta, Serra do Curral e tradição de ateliê em Belo Horizonte.",

      servicos_sub: "Especialidades",
      servicos_titulo: "Frentes de Atuação",
      card1_h3: "Lutheria e Manutenção",
      card1_p: "Ajustes de alma, cavalete (inclusive padrões franceses), pestanas e cravelhas, troca de crina de arco, plaina de espelho, colagens e restauração para violinos, violas, violoncelos e contrabaixos.",
      card2_h3: "Instrumentos e Acessórios",
      card2_p: "Espaço estruturado para instrumentos revisados e regulados em oficina prontos para tocar, além de arcos, encordoamentos, breus, crina, espaleiras e estojos.",
      card3_h3: "Oficina e Produção Própria",
      card3_p: "Fabricação artesanal e afiação de ferramentas para lutheria sob medida — como raspilhas preparadas a partir de chapa metálica temperada — com foco em ergonomia e corte preciso.",
      card4_h3: "Licitações e Instituições",
      card4_p: "Atendimento técnico, laudos e fornecimento para escolas de música, projetos culturais, orquestras e órgãos públicos com documentação regularizada (ME / CNPJ ativo).",

      lutheria_tag: "Oficina em Belo Horizonte",
      lutheria_h2: "Regulagem e manutenção com critério de luthier",
      lutheria_p: "Cada instrumento é avaliado individualmente — de estudantes iniciantes a músicos de orquestra — para entregar projeção, equilíbrio de timbre, resposta do arco e conforto na execução.",
      lutheria_li1: "Troca de crina e revisão estrutural de arcos",
      lutheria_li2: "Confecção e ajuste de cavaletes, almas, pestanas e cravelhas",
      lutheria_li3: "Plaina de espelho, colagem de trincas e retoques de verniz",
      caixa_rotulo: "Atendimento direto",
      caixa_h3: "Avaliação e Orçamento",
      caixa_p: "Envie fotos ou descreva o serviço ou produto desejado diretamente pelo WhatsApp.",
      caixa_btn: "Chamar no WhatsApp",

      loja_sub: "Catálogo e Bancada",
      loja_titulo: "Produtos e Bancada",
      loja_intro: "Áreas organizadas para receber o catálogo de peças e itens de oficina conforme o acervo for disponibilizado.",
      prod1_h3: "Instrumentos Selecionados",
      prod1_p: "Violinos, violas, violoncelos e contrabaixos revisados e regulados para estudo e atuação profissional, prontos para tocar.",
      prod2_h3: "Acessórios e Consumíveis",
      prod2_p: "Encordoamentos, breus, crina para arco, espaleiras, estojos e componentes de reposição para manutenção contínua.",
      prod3_h3: "Ferramentas Artesanais",
      prod3_p: "Raspilhas e ferramentas preparadas na oficina a partir de chapa metálica temperada e afiadas sob medida para trabalho fino em madeira.",

      inst_sub: "Fornecimento e Laudos",
      inst_titulo: "Atendimento Institucional e Licitações",
      inst_p: "Estrutura formalizada (ME / CNPJ ativo) preparada para participar de processos licitatórios e atender demandas institucionais envolvendo manutenção de instrumentos de cordas, laudos técnicos e fornecimento de materiais e equipamentos musicais em Belo Horizonte e Minas Gerais.",

      faq_sub: "Dúvidas Comuns",
      faq_titulo: "Perguntas Frequentes",
      faq1_q: "Como funciona o atendimento na oficina em Belo Horizonte?",
      faq1_a: "O atendimento presencial em Belo Horizonte é realizado com hora marcada para garantir avaliação técnica individualizada de cada instrumento ou arco. Também recebemos e enviamos arcos e casos específicos de outras regiões mediante agendamento prévio pelo WhatsApp (31) 99625-5116.",
      faq2_q: "Quais instrumentos de cordas são atendidos na lutheria?",
      faq2_a: "Atendemos toda a família das cordas friccionadas: violinos, violas de arco, violoncelos e contrabaixos acústicos — desde instrumentos de estudantes iniciantes que precisam de regulagem de conforto até instrumentos de músicos profissionais e orquestras.",
      faq3_q: "De quanto em quanto tempo devo trocar a crina do arco?",
      faq3_a: "Para músicos de estudo diário intenso ou orquestra, recomenda-se a troca de crina a cada 6 meses. Para estudantes com prática moderada, entre 8 e 12 meses, ou sempre que a crina perder aderência mesmo com breu, apresentar fios rompidos em excesso ou comprometer a curvatura da vareta.",
      faq4_q: "Vale a pena regular um violino novo de fábrica com um luthier?",
      faq4_a: "Sim. Instrumentos saídos de fábrica geralmente vêm com cavalete bruto (alto e espesso), alma mal posicionada, pestana desajustada e cravelhas que escorregam ou travam. A regulagem de oficina transforma a tocabilidade, a estabilidade da afinação e a resposta sonora do instrumento.",
      faq5_q: "A oficina atende escolas de música, projetos sociais e licitações?",
      faq5_a: "Sim. Possuímos empresa formalizada (ME / CNPJ ativo) com documentação regularizada para participar de processos licitatórios, realizar manutenção preventiva e corretiva de acervos, emitir laudos técnicos e fornecer instrumentos e acessórios para instituições públicas e privadas.",

      contato_sub: "Ateliê",
      contato_h2: "Contato",
      contato_p: "Atendimento com hora marcada em Belo Horizonte - MG e envio/recebimento sob consulta.",
      contato_btn: "WhatsApp (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Luthier, Conserto e Restauro. Belo Horizonte, MG.",
      footer_blog: "Blog de Lutheria",
      footer_avaliar: "Avaliar Atendimento",

      wa_msg_hero: "Olá Joseph, gostaria de solicitar um orçamento.",
      wa_msg_destaque: "Olá Joseph, gostaria de avaliar um serviço ou produto.",
      wa_msg_contato: "Olá Joseph, gostaria de mais informações.",
      wa_msg_float: "Olá Joseph, vim pelo site e gostaria de um atendimento."
    },

    en: {
      htmlLang: "en-US",
      nav_servicos: "Services",
      nav_lutheria: "Lutherie",
      nav_loja: "Shop & Workshop",
      nav_institucional: "Institutional",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_contato: "Contact",

      hero_tag: "Belo Horizonte • Brazil",
      hero_h1: "Luthier in Belo Horizonte: technical precision and handcrafted string care.",
      hero_p: "Specialized lutherie, repair, and restoration for bowed string instruments, curated spaces for selecting instruments and accessories, custom workshop toolmaking, and institutional services.",
      hero_btn_orcamento: "Request an estimate",
      hero_btn_frentes: "Explore services",
      hero_legenda: "Scroll, Serra do Curral, and workshop tradition in Belo Horizonte.",

      servicos_sub: "Specialties",
      servicos_titulo: "Areas of Practice",
      card1_h3: "Lutherie & Maintenance",
      card1_p: "Soundpost adjustment, custom bridge carving and fitting (including French patterns), nut and peg fitting, bow rehairing, fingerboard planing, crack repair, and restoration for violins, violas, cellos, and double basses.",
      card2_h3: "Instruments & Accessories",
      card2_p: "Dedicated space for workshop-inspected and professionally set-up instruments ready to play, plus bows, strings, rosins, bow hair, shoulder rests, and cases.",
      card3_h3: "Workshop & Custom Tools",
      card3_p: "Handcrafted and sharpened lutherie tools made to order — such as cabinet scrapers forged from tempered steel sheet — focused on ergonomics and clean cutting.",
      card4_h3: "Tenders & Institutions",
      card4_p: "Technical maintenance, condition reports, and supply for music schools, cultural projects, orchestras, and public institutions with fully compliant company registration.",

      lutheria_tag: "Workshop in Belo Horizonte",
      lutheria_h2: "Set-up and maintenance with luthier standards",
      lutheria_p: "Every instrument is individually evaluated — from beginner students to orchestra musicians — to deliver projection, tonal balance, bow response, and playing comfort.",
      lutheria_li1: "Bow rehairing and structural bow inspection",
      lutheria_li2: "Carving and fitting of bridges, soundposts, nuts, and pegs",
      lutheria_li3: "Fingerboard planing, crack gluing, and varnish retouching",
      caixa_rotulo: "Direct service",
      caixa_h3: "Evaluation & Estimate",
      caixa_p: "Send photos or describe the service or item you need directly via WhatsApp.",
      caixa_btn: "Message on WhatsApp",

      loja_sub: "Catalog & Workbench",
      loja_titulo: "Products & Workbench",
      loja_intro: "Structured areas prepared for our catalog of instruments, accessories, and workshop items.",
      prod1_h3: "Selected Instruments",
      prod1_p: "Violins, violas, cellos, and double basses inspected and set up for study and professional performance, ready to play.",
      prod2_h3: "Accessories & Consumables",
      prod2_p: "Strings, rosins, bow hair, shoulder rests, cases, and replacement parts for ongoing care.",
      prod3_h3: "Handcrafted Tools",
      prod3_p: "Scrapers and workshop tools crafted from tempered steel sheet and sharpened to order for fine woodworking.",

      inst_sub: "Supply & Technical Reports",
      inst_titulo: "Institutional Service & Public Tenders",
      inst_p: "Registered business structure prepared to participate in public procurement tenders and serve institutional needs involving string instrument maintenance, technical reports, and supply of musical equipment in Belo Horizonte and Minas Gerais.",

      faq_sub: "Common Questions",
      faq_titulo: "Frequently Asked Questions",
      faq1_q: "How do appointments work at the Belo Horizonte workshop?",
      faq1_a: "In-person visits in Belo Horizonte are by appointment only to ensure dedicated technical evaluation of each instrument or bow. We also receive and ship bows and specific cases from other regions upon prior arrangement via WhatsApp +55 (31) 99625-5116.",
      faq2_q: "Which string instruments do you service?",
      faq2_a: "We service the entire bowed string family: violins, violas, cellos, and double basses — from beginner student instruments needing comfort set-up to instruments played by professional and orchestral musicians.",
      faq3_q: "How often should I rehair my bow?",
      faq3_a: "For daily intensive practice or orchestral playing, rehairing every 6 months is recommended. For moderate student practice, every 8 to 12 months, or whenever the hair loses grip despite rosin, breaks excessively, or affects stick camber.",
      faq4_q: "Is it worth having a luthier set up a new factory violin?",
      faq4_a: "Yes. Factory instruments usually come with an unshaped, overly thick bridge, poorly positioned soundpost, high nut, and slipping or sticking pegs. A proper workshop set-up transforms playability, tuning stability, and tonal response.",
      faq5_q: "Do you work with music schools, orchestras, and public tenders?",
      faq5_a: "Yes. We operate a registered business with active tax and legal compliance to participate in tenders, perform preventive and corrective maintenance on institutional collections, issue technical reports, and supply instruments and accessories.",

      contato_sub: "Atelier",
      contato_h2: "Contact",
      contato_p: "By appointment in Belo Horizonte - MG, Brazil, with shipping/receiving upon request.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Luthier, Repair & Restoration. Belo Horizonte, Brazil.",
      footer_blog: "Lutherie Blog",
      footer_avaliar: "Leave a Review",

      wa_msg_hero: "Hello Joseph, I would like to request an estimate for my instrument/bow.",
      wa_msg_destaque: "Hello Joseph, I would like an evaluation for a repair or item.",
      wa_msg_contato: "Hello Joseph, I would like more information about your lutherie services.",
      wa_msg_float: "Hello Joseph, I visited your website and would like to schedule an appointment."
    },

    es: {
      htmlLang: "es",
      nav_servicos: "Servicios",
      nav_lutheria: "Luthería",
      nav_loja: "Productos y Taller",
      nav_institucional: "Institucional",
      nav_faq: "Preguntas",
      nav_blog: "Blog",
      nav_contato: "Contacto",

      hero_tag: "Belo Horizonte • Brasil",
      hero_h1: "Luthier en Belo Horizonte: precisión técnica y trabajo artesanal en cuerdas.",
      hero_p: "Servicios especializados de luthería, reparación y restauración de instrumentos de cuerda frotada, selección de instrumentos y accesorios, fabricación artesanal de herramientas y atención institucional.",
      hero_btn_orcamento: "Solicitar presupuesto",
      hero_btn_frentes: "Ver áreas de trabajo",
      hero_legenda: "Voluta, Serra do Curral y tradición de taller en Belo Horizonte.",

      servicos_sub: "Especialidades",
      servicos_titulo: "Áreas de Actuación",
      card1_h3: "Luthería y Mantenimiento",
      card1_p: "Ajuste de alma, tallado y ajuste de puentes (incluidos modelos franceses), cejillas y clavijas, encerdado de arcos, cepillado de diapasón, pegado de grietas y restauración de violines, violas, violonchelos y contrabajos.",
      card2_h3: "Instrumentos y Accesorios",
      card2_p: "Espacio preparado para instrumentos revisados y ajustados en taller listos para tocar, además de arcos, cuerdas, colofonias, crin, almohadillas y estuches.",
      card3_h3: "Taller y Producción Propia",
      card3_p: "Fabricación artesanal y afilado de herramientas de luthería a medida — como cuchillas raspadoras de acero templado — con enfoque en ergonomía y corte preciso.",
      card4_h3: "Licitaciones e Instituciones",
      card4_p: "Atención técnica, informes periciales y suministro para escuelas de música, proyectos culturales, orquestas y organismos públicos con documentación regularizada.",

      lutheria_tag: "Taller en Belo Horizonte",
      lutheria_h2: "Ajuste y mantenimiento con criterio de luthier",
      lutheria_p: "Cada instrumento se evalúa individualmente — desde estudiantes principiantes hasta músicos de orquesta — para ofrecer proyección, equilibrio tímbrico, respuesta del arco y comodidad al tocar.",
      lutheria_li1: "Cambio de crin y revisión estructural de arcos",
      lutheria_li2: "Tallado y ajuste de puentes, almas, cejillas y clavijas",
      lutheria_li3: "Cepillado de diapasón, pegado de grietas y retoques de barniz",
      caixa_rotulo: "Atención directa",
      caixa_h3: "Evaluación y Presupuesto",
      caixa_p: "Envíe fotos o describa el servicio o producto deseado directamente por WhatsApp.",
      caixa_btn: "Escribir por WhatsApp",

      loja_sub: "Catálogo y Banco",
      loja_titulo: "Productos y Banco de Trabajo",
      loja_intro: "Áreas organizadas para el catálogo de piezas y herramientas de taller.",
      prod1_h3: "Instrumentos Seleccionados",
      prod1_p: "Violines, violas, violonchelos y contrabajos revisados y ajustados para estudio y desempeño profesional, listos para tocar.",
      prod2_h3: "Accesorios y Consumibles",
      prod2_p: "Cuerdas, colofonias, crin para arco, almohadillas, estuches y repuestos para mantenimiento continuo.",
      prod3_h3: "Herramientas Artesanales",
      prod3_p: "Raspadores y herramientas preparadas en el taller a partir de chapa metálica templada y afiladas a medida para trabajo fino en madera.",

      inst_sub: "Suministro e Informes",
      inst_titulo: "Atención Institucional y Licitaciones",
      inst_p: "Empresa formalizada preparada para participar en licitaciones y atender demandas institucionales de mantenimiento de instrumentos de cuerda, informes técnicos y suministro de materiales musicales en Belo Horizonte y Minas Gerais.",

      faq_sub: "Dudas Frecuentes",
      faq_titulo: "Preguntas Frecuentes",
      faq1_q: "¿Cómo funciona la atención en el taller en Belo Horizonte?",
      faq1_a: "La atención presencial en Belo Horizonte se realiza con cita previa para garantizar una evaluación técnica individualizada. También recibimos y enviamos arcos y casos específicos de otras regiones previa coordinación por WhatsApp +55 (31) 99625-5116.",
      faq2_q: "¿Qué instrumentos de cuerda se atienden en el taller?",
      faq2_a: "Atendemos toda la familia de cuerda frotada: violines, violas, violonchelos y contrabajos acústicos, tanto de estudiantes principiantes como de músicos profesionales y orquestas.",
      faq3_q: "¿Cada cuánto tiempo debo cambiar la crin del arco?",
      faq3_a: "Para músicos de estudio diario intenso u orquesta, se recomienda cada 6 meses. Para estudiantes con práctica moderada, entre 8 y 12 meses, o cuando la crin pierda agarre incluso con resina o se rompan demasiadas cerdas.",
      faq4_q: "¿Vale la pena ajustar con un luthier un violín nuevo de fábrica?",
      faq4_a: "Sí. Los instrumentos de fábrica suelen traer un puente grueso sin tallar, alma mal ubicada, cejilla alta y clavijas desajustadas. El ajuste de taller transforma la comodidad, afinación y respuesta sonora.",
      faq5_q: "¿El taller atiende escuelas de música, orquestas y licitaciones?",
      faq5_a: "Sí. Contamos con empresa formalizada y documentación al día para participar en procesos de licitación, mantenimiento preventivo y correctivo de acervos, informes técnicos y suministro de instrumentos.",

      contato_sub: "Taller",
      contato_h2: "Contacto",
      contato_p: "Atención con cita previa en Belo Horizonte - MG y envíos previa consulta.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Luthier, Reparación y Restauración. Belo Horizonte, Brasil.",
      footer_blog: "Blog de Luthería",
      footer_avaliar: "Valorar Atención",

      wa_msg_hero: "Hola Joseph, me gustaría solicitar un presupuesto.",
      wa_msg_destaque: "Hola Joseph, me gustaría evaluar un servicio o producto.",
      wa_msg_contato: "Hola Joseph, me gustaría recibir más información.",
      wa_msg_float: "Hola Joseph, vi su sitio web y me gustaría agendar una cita."
    },

    fr: {
      htmlLang: "fr",
      nav_servicos: "Savoir-faire",
      nav_lutheria: "Lutherie",
      nav_loja: "Instruments & Atelier",
      nav_institucional: "Institutions",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_contato: "Contact",

      hero_tag: "Belo Horizonte • Brésil",
      hero_h1: "Luthier à Belo Horizonte : précision technique et travail artisanal des cordes.",
      hero_p: "Services spécialisés de lutherie, réparation et restauration d'instruments à cordes frottées, sélection d'instruments et accessoires, fabrication artisanale d'outils et accompagnement des institutions.",
      hero_btn_orcamento: "Demander un devis",
      hero_btn_frentes: "Découvrir nos services",
      hero_legenda: "Volute, Serra do Curral et tradition d'atelier à Belo Horizonte.",

      servicos_sub: "Spécialités",
      servicos_titulo: "Domaines d'Intervention",
      card1_h3: "Lutherie et Entretien",
      card1_p: "Réglage d'âme, taille et ajustage de chevalets (y compris modèles français), sillets et chevilles, reméchage d'archets, dressage de touche, collage de fractures et restauration de violons, altos, violoncelles et contrebasses.",
      card2_h3: "Instruments et Accessoires",
      card2_p: "Espace dédié aux instruments révisés et réglés à l'atelier prêts à jouer, ainsi qu'archets, cordes, colophanes, crin, épaulières et étuis.",
      card3_h3: "Atelier et Outils Artisanaux",
      card3_p: "Fabrication artisanale et affûtage d'outils de lutherie sur mesure — tels que des racloirs en acier trempé — alliant ergonomie et précision de coupe.",
      card4_h3: "Marchés Publics et Institutions",
      card4_p: "Maintenance technique, expertises et fourniture pour écoles de musique, projets culturels, orchestres et organismes publics avec entreprise enregistrée.",

      lutheria_tag: "Atelier à Belo Horizonte",
      lutheria_h2: "Réglage et entretien selon les exigences de la lutherie",
      lutheria_p: "Chaque instrument est évalué individuellement — des élèves débutants aux musiciens d'orchestre — pour offrir projection, équilibre sonore, réponse de l'archet et confort de jeu.",
      lutheria_li1: "Reméchage et révision structurelle des archets",
      lutheria_li2: "Taille et ajustage de chevalets, âmes, sillets et chevilles",
      lutheria_li3: "Dressage de touche, collage de fractures et retouches de vernis",
      caixa_rotulo: "Contact direct",
      caixa_h3: "Évaluation et Devis",
      caixa_p: "Envoyez des photos ou décrivez le service ou l'article souhaité directement sur WhatsApp.",
      caixa_btn: "Écrire sur WhatsApp",

      loja_sub: "Catalogue et Établi",
      loja_titulo: "Produits et Établi",
      loja_intro: "Espaces organisés pour accueillir notre sélection d'instruments, accessoires et outils d'atelier.",
      prod1_h3: "Instruments Sélectionnés",
      prod1_p: "Violons, altos, violoncelles et contrebasses révisés et réglés pour l'étude et la pratique professionnelle, prêts à jouer.",
      prod2_h3: "Accessoires et Consommables",
      prod2_p: "Cordes, colophanes, crin d'archet, épaulières, étuis et pièces de rechange pour l'entretien régulier.",
      prod3_h3: "Outils Artisanaux",
      prod3_p: "Racloirs et outils façonnés à l'atelier à partir de tôle d'acier trempée et affûtés sur mesure pour le travail fin du bois.",

      inst_sub: "Fourniture et Rapports Techniques",
      inst_titulo: "Service Institutionnel et Appels d'Offres",
      inst_p: "Structure enregistrée habilitée à répondre aux marchés publics et aux besoins des institutions pour l'entretien d'instruments à cordes, les rapports techniques et la fourniture d'équipements musicaux à Belo Horizonte et au Minas Gerais.",

      faq_sub: "Questions Fréquentes",
      faq_titulo: "Foire Aux Questions",
      faq1_q: "Comment se déroule l'accueil à l'atelier de Belo Horizonte ?",
      faq1_a: "Les visites à Belo Horizonte se font uniquement sur rendez-vous afin d'assurer un diagnostic technique personnalisé. Nous recevons et expédions également des archets et cas spécifiques depuis d'autres régions sur accord préalable via WhatsApp +55 (31) 99625-5116.",
      faq2_q: "Quels instruments à cordes prenez-vous en charge ?",
      faq2_a: "Nous prenons en charge toute la famille du quatuor à cordes : violons, altos, violoncelles et contrebasses, aussi bien pour les étudiants débutants que pour les musiciens professionnels et d'orchestre.",
      faq3_q: "À quelle fréquence faut-il remécher un archet ?",
      faq3_a: "Pour une pratique quotidienne intensive ou en orchestre, tous les 6 mois. Pour une pratique modérée, tous les 8 à 12 mois, ou dès que la mèche n'accroche plus malgré la colophane.",
      faq4_q: "Faut-il faire régler un violon neuf d'usine par un luthier ?",
      faq4_a: "Oui. Les instruments d'usine sont souvent livrés avec un chevalet brut trop épais, une âme mal placée, un sillet trop haut et des chevilles mal ajustées. Un réglage d'atelier transforme le confort et la sonorité.",
      faq5_q: "Travaillez-vous avec des écoles de musique, orchestres et marchés publics ?",
      faq5_a: "Oui. Notre entreprise dispose d'un statut régulier permettant de participer aux appels d'offres, d'entretenir des parcs instrumentaux et d'établir des rapports techniques.",

      contato_sub: "Atelier",
      contato_h2: "Contact",
      contato_p: "Sur rendez-vous à Belo Horizonte - MG, Brésil, et envois sur demande.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Luthier, Réparation et Restauration. Belo Horizonte, Brésil.",
      footer_blog: "Blog de Lutherie",
      footer_avaliar: "Laisser un Avis",

      wa_msg_hero: "Bonjour Joseph, je souhaite demander un devis.",
      wa_msg_destaque: "Bonjour Joseph, je souhaite faire évaluer un instrument ou un archet.",
      wa_msg_contato: "Bonjour Joseph, je souhaite obtenir plus d'informations.",
      wa_msg_float: "Bonjour Joseph, je viens de votre site et je souhaite prendre rendez-vous."
    },

    it: {
      htmlLang: "it",
      nav_servicos: "Attività",
      nav_lutheria: "Liuteria",
      nav_loja: "Strumenti e Bottega",
      nav_institucional: "Istituzioni",
      nav_faq: "Domande",
      nav_blog: "Blog",
      nav_contato: "Contatti",

      hero_tag: "Belo Horizonte • Brasile",
      hero_h1: "Liutaio a Belo Horizonte: precisione tecnica e lavoro artigianale sugli archi.",
      hero_p: "Servizi specializzati di liuteria, riparazione e restauro di strumenti ad arco, selezione di strumenti e accessori, costruzione artigianale di utensili e assistenza per istituzioni.",
      hero_btn_orcamento: "Richiedi un preventivo",
      hero_btn_frentes: "Scopri i servizi",
      hero_legenda: "Riccio, Serra do Curral e tradizione di bottega a Belo Horizonte.",

      servicos_sub: "Specialità",
      servicos_titulo: "Ambiti di Attività",
      card1_h3: "Liuteria e Manutenzione",
      card1_p: "Messa a punto dell'anima, taglio e adattamento di ponticelli (inclusi modelli francesi), capotasti e piroli, incrinatura archi, rettifica tastiera, incollaggio crepe e restauro per violini, viole, violoncelli e contrabbassi.",
      card2_h3: "Strumenti e Accessori",
      card2_p: "Spazio dedicato a strumenti revisionati e messi a punto in bottega pronti per suonare, oltre ad archi, corde, peci, crine, spalliere e custodie.",
      card3_h3: "Bottega e Produzione Propria",
      card3_p: "Costruzione artigianale e affilatura di utensili per liuteria su misura — come rasiere in acciaio temprato — progettati per ergonomia e taglio preciso.",
      card4_h3: "Gare d'Appalto e Istituzioni",
      card4_p: "Assistenza tecnica, perizie e fornitura per scuole di musica, progetti culturali, orchestre ed enti pubblici con azienda regolarmente registrata.",

      lutheria_tag: "Bottega a Belo Horizonte",
      lutheria_h2: "Messa a punto e manutenzione con criterio di liutaio",
      lutheria_p: "Ogni strumento viene valutato singolarmente — dagli studenti principianti ai professori d'orchestra — per garantire proiezione, equilibrio timbrico, risposta dell'arco e comodità.",
      lutheria_li1: "Incrinatura e revisione strutturale degli archi",
      lutheria_li2: "Costruzione e adattamento di ponticelli, anime, capotasti e piroli",
      lutheria_li3: "Rettifica della tastiera, incollaggio crepe e ritocchi di vernice",
      caixa_rotulo: "Contatto diretto",
      caixa_h3: "Valutazione e Preventivo",
      caixa_p: "Invia foto o descrivi il servizio o l'articolo desiderato direttamente su WhatsApp.",
      caixa_btn: "Scrivi su WhatsApp",

      loja_sub: "Catalogo e Banco",
      loja_titulo: "Prodotti e Banco di Lavoro",
      loja_intro: "Aree organizzate per accogliere il catalogo di strumenti, accessori e attrezzature di bottega.",
      prod1_h3: "Strumenti Selezionati",
      prod1_p: "Violini, viole, violoncelli e contrabbassi revisionati e messi a punto per lo studio e l'attività professionale, pronti per suonare.",
      prod2_h3: "Accessori e Materiali di Consumo",
      prod2_p: "Corde, peci, crine per arco, spalliere, custodie e componenti di ricambio per la cura costante.",
      prod3_h3: "Utensili Artigianali",
      prod3_p: "Rasiere e utensili realizzati in bottega da lamiera d'acciaio temprata e affilati su misura per la lavorazione fine del legno.",

      inst_sub: "Fornitura e Perizie",
      inst_titulo: "Servizio Istituzionale e Appalti",
      inst_p: "Struttura aziendale registrata pronta a partecipare a gare d'appalto e soddisfare esigenze istituzionali di manutenzione di strumenti ad arco, perizie tecniche e fornitura musicale a Belo Horizonte e Minas Gerais.",

      faq_sub: "Domande Frequenti",
      faq_titulo: "Domande Frequenti",
      faq1_q: "Come funziona l'accoglienza in bottega a Belo Horizonte?",
      faq1_a: "Gli appuntamenti a Belo Horizonte si svolgono su prenotazione per garantire una valutazione tecnica dedicata. Riceviamo e spediamo anche archi e casi specifici da altre regioni previo accordo su WhatsApp +55 (31) 99625-5116.",
      faq2_q: "Quali strumenti ad arco vengono seguiti in liuteria?",
      faq2_a: "Seguiamo l'intera famiglia degli archi: violini, viole, violoncelli e contrabbassi acustici, sia per studenti principianti che per musicisti professionisti e d'orchestra.",
      faq3_q: "Ogni quanto tempo va cambiato il crine dell'arco?",
      faq3_a: "Per studio quotidiano intenso o orchestra si consiglia ogni 6 mesi. Per pratica moderata ogni 8-12 mesi, o quando il crine perde aderenza nonostante la pece.",
      faq4_q: "Conviene far mettere a punto da un liutaio un violino nuovo di fabbrica?",
      faq4_a: "Sì. Gli strumenti di fabbrica hanno spesso ponticelli grezzi troppo spessi, anima mal posizionata, capotasto alto e piroli imprecisi. La messa a punto trasforma suonabilità e resa acustica.",
      faq5_q: "La bottega collabora con scuole di musica, orchestre ed enti pubblici?",
      faq5_a: "Sì. Disponiamo di azienda regolarmente registrata per partecipare a bandi pubblici, curare la manutenzione di collezioni strumentali e redigere relazioni tecniche.",

      contato_sub: "Bottega",
      contato_h2: "Contatti",
      contato_p: "Si riceve su appuntamento a Belo Horizonte - MG, Brasile, con spedizioni su richiesta.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Liutaio, Riparazione e Restauro. Belo Horizonte, Brasile.",
      footer_blog: "Blog di Liuteria",
      footer_avaliar: "Lascia una Recensione",

      wa_msg_hero: "Ciao Joseph, vorrei richiedere un preventivo.",
      wa_msg_destaque: "Ciao Joseph, vorrei far valutare uno strumento o un arco.",
      wa_msg_contato: "Ciao Joseph, vorrei maggiori informazioni.",
      wa_msg_float: "Ciao Joseph, ho visitato il sito e vorrei fissare un appuntamento."
    },

    de: {
      htmlLang: "de",
      nav_servicos: "Leistungen",
      nav_lutheria: "Geigenbau",
      nav_loja: "Instrumente & Werkstatt",
      nav_institucional: "Institutionen",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_contato: "Kontakt",

      hero_tag: "Belo Horizonte • Brasilien",
      hero_h1: "Geigenbauer in Belo Horizonte: technische Präzision und handwerkliche Streichinstrumentenpflege.",
      hero_p: "Spezialisierter Geigenbau, Reparatur und Restaurierung von Streichinstrumenten, ausgewählte Instrumente und Zubehör, handgefertigte Werkzeuge sowie Betreuung von Musikinstitutionen.",
      hero_btn_orcamento: "Kostenvoranschlag anfragen",
      hero_btn_frentes: "Leistungsbereiche ansehen",
      hero_legenda: "Schnecke, Serra do Curral und Werkstatttradition in Belo Horizonte.",

      servicos_sub: "Fachgebiete",
      servicos_titulo: "Tätigkeitsbereiche",
      card1_h3: "Geigenbau & Wartung",
      card1_p: "Stimmstock-Einstellung, Anfertigung und Anpassung von Stegen (inkl. französischer Modelle), Obersätteln und Wirbeln, Bogenbehaarung, Griffbrett abziehen, Rissreparaturen und Restaurierung für Violine, Viola, Violoncello und Kontrabass.",
      card2_h3: "Instrumente & Zubehör",
      card2_p: "Werkstattgeprüfte und spielfertig eingerichtete Instrumente sowie Bögen, Saiten, Kolophonium, Bogenhaare, Schulterstützen und Etuis.",
      card3_h3: "Werkstatt & Eigene Werkzeuge",
      card3_p: "Handgefertigte und geschärfte Geigenbauwerkzeuge nach Maß — wie Ziehklingen aus gehärtetem Stahlblech — für höchste Präzision bei der Holzbearbeitung.",
      card4_h3: "Ausschreibungen & Institutionen",
      card4_p: "Technische Wartung, Gutachten und Lieferung für Musikschulen, Kulturprojekte, Orchester und öffentliche Einrichtungen mit eingetragenem Fachbetrieb.",

      lutheria_tag: "Werkstatt in Belo Horizonte",
      lutheria_h2: "Einrichtung und Pflege nach Geigenbau-Maßstäben",
      lutheria_p: "Jedes Instrument wird individuell geprüft — vom Anfängerinstrument bis zum Orchesterinstrument — für optimale Projektion, Klangbalance, Bogenansprache und Spielkomfort.",
      lutheria_li1: "Bogenbehaarung und strukturelle Bogenprüfung",
      lutheria_li2: "Anfertigung und Anpassung von Stegen, Stimmstöcken, Sätteln und Wirbeln",
      lutheria_li3: "Griffbrett abziehen, Rissverleimung und Lackretuschen",
      caixa_rotulo: "Direkter Kontakt",
      caixa_h3: "Begutachtung & Kostenvoranschlag",
      caixa_p: "Senden Sie Fotos oder beschreiben Sie Ihr Anliegen direkt per WhatsApp.",
      caixa_btn: "Über WhatsApp schreiben",

      loja_sub: "Katalog & Werkbank",
      loja_titulo: "Produkte & Werkbank",
      loja_intro: "Strukturierte Bereiche für ausgewählte Instrumente, Zubehör und Werkstattartikel.",
      prod1_h3: "Ausgewählte Instrumente",
      prod1_p: "Violinen, Violen, Violoncelli und Kontrabässe, in der Werkstatt geprüft und spielfertig eingerichtet.",
      prod2_h3: "Zubehör & Verbrauchsmaterial",
      prod2_p: "Saiten, Kolophonium, Bogenhaar, Schulterstützen, Etuis und Ersatzteile für die laufende Pflege.",
      prod3_h3: "Handgefertigte Werkzeuge",
      prod3_p: "In der Werkstatt aus gehärtetem Stahlblech gefertigte und geschärfte Ziehklingen für feine Holzarbeiten.",

      inst_sub: "Lieferung & Gutachten",
      inst_titulo: "Institutioneller Service & Ausschreibungen",
      inst_p: "Eingetragener Fachbetrieb für öffentliche Ausschreibungen, Wartung von Instrumentenbeständen, technische Gutachten und Lieferung von Musikausstattung in Belo Horizonte und Minas Gerais.",

      faq_sub: "Häufige Fragen",
      faq_titulo: "Häufig Gestellte Fragen",
      faq1_q: "Wie läuft ein Termin in der Werkstatt in Belo Horizonte ab?",
      faq1_a: "Termine in Belo Horizonte finden nach Vereinbarung statt, um eine individuelle Begutachtung zu gewährleisten. Bögen und besondere Fälle aus anderen Regionen nehmen wir nach Absprache per WhatsApp +55 (31) 99625-5116 entgegen.",
      faq2_q: "Welche Streichinstrumente werden betreut?",
      faq2_a: "Wir betreuen alle Streichinstrumente: Violine, Viola, Violoncello und Kontrabass — vom Schülerinstrument bis zum professionellen Orchesterinstrument.",
      faq3_q: "Wie oft sollte ein Bogen neu behaart werden?",
      faq3_a: "Bei intensivem täglichem Üben oder im Orchester alle 6 Monate. Bei moderater Nutzung alle 8 bis 12 Monate oder sobald die Haare trotz Kolophonium nicht mehr greifen.",
      faq4_q: "Lohnt sich die Einrichtung einer neuen Fabrikgeige beim Geigenbauer?",
      faq4_a: "Ja. Fabrikinstrumente haben meist unzureichend bearbeitete Stege, schlecht stehende Stimmstöcke und ungenaue Wirbel. Eine fachgerechte Einrichtung verbessert Klang und Spielbarkeit erheblich.",
      faq5_q: "Betreuen Sie Musikschulen, Orchester und öffentliche Ausschreibungen?",
      faq5_a: "Ja. Als eingetragener Betrieb übernehmen wir Bestandspflege, technische Gutachten und Lieferungen im Rahmen öffentlicher Ausschreibungen.",

      contato_sub: "Atelier",
      contato_h2: "Kontakt",
      contato_p: "Termine nach Vereinbarung in Belo Horizonte - MG, Brasilien, sowie Versand nach Absprache.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Geigenbauer, Reparatur & Restaurierung. Belo Horizonte, Brasilien.",
      footer_blog: "Geigenbau-Blog",
      footer_avaliar: "Bewertung abgeben",

      wa_msg_hero: "Hallo Joseph, ich möchte gerne einen Kostenvoranschlag anfragen.",
      wa_msg_destaque: "Hallo Joseph, ich möchte ein Instrument oder einen Bogen begutachten lassen.",
      wa_msg_contato: "Hallo Joseph, ich hätte gerne weitere Informationen.",
      wa_msg_float: "Hallo Joseph, ich habe Ihre Website besucht und möchte einen Termin vereinbaren."
    },

    ru: {
      htmlLang: "ru",
      nav_servicos: "Услуги",
      nav_lutheria: "Мастерская",
      nav_loja: "Инструменты",
      nav_institucional: "Организациям",
      nav_faq: "Вопросы",
      nav_blog: "Блог",
      nav_contato: "Контакты",

      hero_tag: "Белу-Оризонти • Бразилия",
      hero_h1: "Скрипичный мастер в Белу-Оризонти: техническая точность и ручная работа со струнными.",
      hero_p: "Профессиональный ремонт, настройка и реставрация смычковых инструментов, подбор инструментов и аксессуаров, изготовление столярного инструмента ручной работы и обслуживание музыкальных учреждений.",
      hero_btn_orcamento: "Запросить расчёт",
      hero_btn_frentes: "Направления работы",
      hero_legenda: "Завиток, Серра-ду-Куррал и традиции мастерской в Белу-Оризонти.",

      servicos_sub: "Специализация",
      servicos_titulo: "Направления Работы",
      card1_h3: "Ремонт и Реставрация",
      card1_p: "Установка и настройка душки, изготовление и подгонка подставок (включая французские модели), верхнего порожка и колков, замена волоса на смычке, строгание грифа, склейка трещин и реставрация скрипок, альтов, виолончелей и контрабасов.",
      card2_h3: "Инструменты и Аксессуары",
      card2_p: "Проверенные и отрегулированные в мастерской инструменты, готовые к игре, а также смычки, струны, канифоль, конский волос, мостики и футляры.",
      card3_h3: "Инструмент Собственного Изготовления",
      card3_p: "Ручное изготовление и заточка инструментов для скрипичных мастеров на заказ — включая цикли из закалённой стальной пластины — для точной работы по дереву.",
      card4_h3: "Тендеры и Учреждения",
      card4_p: "Техническое обслуживание, экспертные заключения и поставки для музыкальных школ, культурных проектов, оркестров и государственных организаций (официально зарегистрированное предприятие).",

      lutheria_tag: "Мастерская в Белу-Оризонти",
      lutheria_h2: "Настройка и уход по стандартам скрипичного мастера",
      lutheria_p: "Каждый инструмент оценивается индивидуально — от ученических до оркестровых — для достижения проекции, тембрального баланса, отзывчивости смычка и удобства игры.",
      lutheria_li1: "Замена волоса и проверка конструкции смычков",
      lutheria_li2: "Изготовление и подгонка подставок, душек, порожков и колков",
      lutheria_li3: "Выравнивание грифа, склейка трещин и ретушь лака",
      caixa_rotulo: "Прямая связь",
      caixa_h3: "Оценка и Консультация",
      caixa_p: "Отправьте фотографии или опишите необходимую услугу напрямую в WhatsApp.",
      caixa_btn: "Написать в WhatsApp",

      loja_sub: "Каталог и Верстак",
      loja_titulo: "Инструменты и Мастерская",
      loja_intro: "Разделы для отобранных инструментов, аксессуаров и инструментов ручной работы.",
      prod1_h3: "Отобранные Инструменты",
      prod1_p: "Скрипки, альты, виолончели и контрабасы, прошедшие проверку и полную регулировку в мастерской, готовые к игре.",
      prod2_h3: "Аксессуары и Расходники",
      prod2_p: "Струны, канифоль, волос для смычка, мостики, футляры и комплектующие для регулярного ухода.",
      prod3_h3: "Ручной Инструмент",
      prod3_p: "Цикли и приспособления, изготовленные в мастерской из закалённой стали и заточенные вручную для тонкой работы по дереву.",

      inst_sub: "Поставки и Экспертиза",
      inst_titulo: "Работа с Оркестрами и Учреждениями",
      inst_p: "Официально зарегистрированная компания для участия в тендерах, профилактического и капитального обслуживания фондов смычковых инструментов, подготовки технических заключений и поставок в Белу-Оризонти и Минас-Жерайс.",

      faq_sub: "Частые Вопросы",
      faq_titulo: "Часто Задаваемые Вопросы",
      faq1_q: "Как проходит приём в мастерской в Белу-Оризонти?",
      faq1_a: "Личный приём в Белу-Оризонти ведётся по предварительной записи для индивидуального осмотра инструмента или смычка. Также возможна отправка и приём смычков из других регионов по согласованию в WhatsApp +55 (31) 99625-5116.",
      faq2_q: "С какими инструментами работает мастерская?",
      faq2_a: "Мы работаем со всем семейством смычковых инструментов: скрипками, альтами, виолончелями и контрабасами — от ученических инструментов до профессиональных оркестровых.",
      faq3_q: "Как часто нужно менять волос на смычке?",
      faq3_a: "При ежедневных интенсивных занятиях или работе в оркестре — каждые 6 месяцев. При умеренной нагрузке — раз в 8–12 месяцев или при потере сцепления со струной.",
      faq4_q: "Нужно ли настраивать у мастера новую фабричную скрипку?",
      faq4_a: "Да. Фабричные инструменты обычно имеют слишком толстую необработанную подставку, неправильно установленную душку, высокий порожек и тугие колки. Настройка у мастера кардинально улучшает звук и удобство игры.",
      faq5_q: "Работает ли мастерская с музыкальными школами и оркестрами?",
      faq5_a: "Да. Предприятие официально зарегистрировано, имеет полный пакет документов для тендеров, проведения технического обслуживания инструментов и выдачи заключений.",

      contato_sub: "Мастерская",
      contato_h2: "Контакты",
      contato_p: "Приём по предварительной записи в Белу-Оризонти (штат Минас-Жерайс), отправка по согласованию.",
      contato_btn: "WhatsApp +55 (31) 99625-5116",

      footer_copy: "© 2026 Joseph Medeiros — Скрипичный мастер, ремонт и реставрация. Белу-Оризонти, Бразилия.",
      footer_blog: "Блог о лютерии",
      footer_avaliar: "Оставить отзыв",

      wa_msg_hero: "Здравствуйте, Джозеф! Хочу уточнить стоимость ремонта или настройки.",
      wa_msg_destaque: "Здравствуйте, Джозеф! Хочу проконсультироваться по поводу инструмента или смычка.",
      wa_msg_contato: "Здравствуйте, Джозеф! Хочу получить дополнительную информацию.",
      wa_msg_float: "Здравствуйте, Джозеф! Я с вашего сайта и хотел бы записаться на осмотр."
    }
  };

  function getSafeStoredLang() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && ALLOWED_LANGS.has(saved)) {
        return saved;
      }
    } catch {
      // Ignora bloqueio de storage em navegação privada restrita
    }
    return "pt";
  }

  function saveSafeLang(lang) {
    if (!ALLOWED_LANGS.has(lang)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignora se storage estiver indisponível
    }
  }

  function updateWhatsAppLinks(dict) {
    const waMap = {
      hero: dict.wa_msg_hero,
      destaque: dict.wa_msg_destaque,
      contato: dict.wa_msg_contato,
      float: dict.wa_msg_float
    };

    document.querySelectorAll("[data-wa-key]").forEach((anchor) => {
      const key = anchor.getAttribute("data-wa-key");
      const text = waMap[key] || dict.wa_msg_float;
      anchor.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    });
  }

  function applyLanguage(langCode) {
    const safeLang = ALLOWED_LANGS.has(langCode) ? langCode : "pt";
    const dict = TRANSLATIONS[safeLang] || TRANSLATIONS.pt;

    document.documentElement.lang = dict.htmlLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      const isActive = btnLang === safeLang;
      btn.classList.toggle("ativo", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    updateWhatsAppLinks(dict);
    saveSafeLang(safeLang);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.getAttribute("data-lang");
        if (chosen && ALLOWED_LANGS.has(chosen)) {
          applyLanguage(chosen);
        }
      });
    });

    const initialLang = getSafeStoredLang();
    if (initialLang !== "pt") {
      applyLanguage(initialLang);
    } else {
      applyLanguage("pt");
    }
  });
})();
