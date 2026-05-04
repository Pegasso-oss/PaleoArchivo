// src/data/translations.js
// Cubre: header, landing, eras (paleozoico/mesozoico/cenozoico/paleogeno),
//        periodos (era pages), dinoCard, dinoDetail, favorites, profile,
//        login, register, toast, common
//
// NOTA: dietLabels ya NO se define aquí. Las traducciones de dietas viven en
// dietConfig.js → DIET_CONFIG[dieta].labels. El hook useTranslation genera
// dietLabels dinámicamente a partir de ese archivo.

export const translations = {
  es: {
    // ── HEADER ────────────────────────────────────────────────────────────
    header: {
      login: "Iniciar Sesión",
      register: "Registrarse",
      logout: "Cerrar Sesión",
      config: "Configuración",
      lang: "Idioma",
      dark: "Modo Oscuro",
      light: "Modo Claro",
      confirmLogout: "¿Seguro que quieres",
      exit: "salir",
      keep: "Mantener",
      confirm: "Confirmar",
      subtitleDefault: "Todo sobre el pasado, en tu mano",
      favorites: "Mis Favoritos",
      profile: "Mi Perfil",
    },

    // ── LANDING ───────────────────────────────────────────────────────────
    landing: {
      heroTitle: "Explora",
      heroTitleAccent: "el pasado",
      heroSubtitle:
        "Selecciona una era geológica para acceder a los registros fósiles y reconstrucciones biológicas.",
      searchPlaceholder: "Buscar en el archivo...",
      noResults: "Sin registros",
      filterDiets: "Dietas",
      filterTypes: "Tipos",
      clearFilters: "Limpiar",
      logoutTitle: "Sesión Cerrada",
      logoutSub: "Acceso restringido",

      // Eras
      eras: {
        paleozoico: {
          desc: "El origen de la vida compleja. Trilobites, bosques de helechos gigantes y los primeros anfibios.",
        },
        mesozoico: {
          desc: "La era de los dinosaurios. Triásico, Jurásico y Cretácico. El reinado de los reptiles gigantes.",
        },
        cenozoico: {
          desc: "El ascenso de los mamíferos. Megafauna, glaciaciones y la evolución de los primates.",
        },
      },
    },

    // ── PÁGINAS DE ERAS / PERIODOS ────────────────────────────────────────
    eraPage: {
      backToEras: "Volver a las eras",
      backToPeriods: "Volver a periodos",
      recordsOf: "REGISTROS",
      periodsOf: "PERIODOS DEL",
      epochsOf: "ÉPOCAS DEL",
      classifiedAnimals: "Animales clasificados",
      classifiedDinos: "Dinosaurios clasificados",
      wip: "WIP",

      // Mesozoico
      mesozoico: {
        subtitle: "Registros del reinado reptiliano",
        triasico: {
          desc: "El resurgir tras la gran extinción. Aparecen los primeros dinosaurios y mamíferos verdaderos.",
        },
        jurasico: {
          desc: "La edad de oro de los gigantes. El Allosaurus y el Brachiosaurus dominan un mundo húmedo y verde.",
        },
        cretacico: {
          desc: "El fin de una era. Aparecen las flores y el T-Rex reina antes del impacto del meteorito.",
        },
      },

      // Cenozoico
      cenozoico: {
        subtitle: "Registros de la megafauna reciente",
        paleogeno: {
          desc: "El amanecer de los mamíferos. Tras la extinción de los dinosaurios, la vida se recupera en selvas tropicales.",
        },
        neogeno: {
          desc: "La era de las praderas. Los mamíferos evolucionan a formas gigantes y aparecen los primeros homínidos.",
        },
        cuaternario: {
          desc: "Grandes glaciaciones y el ascenso de los humanos modernos en un mundo de mamuts y tigres dientes de sable.",
        },
      },

      // Paleozoico
      paleozoico: {
        subtitle: "Los cimientos de la vida compleja",
        cambrico: {
          desc: "Conocido por la \"explosión cámbrica\", un rápido aumento en la diversidad de vida marina, incluyendo los primeros artrópodos.",
        },
        ordovicico: {
          desc: "Dominación de los invertebrados marinos, aparición de los primeros vertebrados y colonización de las costas por plantas primitivas.",
        },
        silurico: {
          desc: "Estabilización del clima tras una glaciación. Aparecen las primeras plantas vasculares terrestres y los peces mandibulados.",
        },
        devonico: {
          desc: "La \"Edad de los Peces\". Estos se diversifican enormemente y aparecen los primeros tetrápodos y bosques primitivos.",
        },
        carbonifero: {
          desc: "Expansión de selvas gigantes que formaron los depósitos de carbón actuales. Época de insectos gigantes y primeros reptiles.",
        },
        permico: {
          desc: "Formación del supercontinente Pangea. Finaliza con la mayor extinción masiva de la historia, la \"Gran Mortandad\".",
        },
      },

      // Paleógeno
      paleogeno: {
        subtitle: "El amanecer de los mamíferos modernos",
        paleoceno: {
          desc: "El mundo tras los dinosaurios. Las selvas se expanden y los mamíferos arcaicos comienzan su ascenso.",
        },
        eoceno: {
          desc: "Máximo térmico y diversificación. Aparecen los ancestros de ballenas, caballos y primates en selvas globales.",
        },
        oligoceno: {
          desc: "La expansión de las praderas. El clima se enfría, los bosques retroceden y surgen mamíferos gigantes.",
        },
      },

      // Neogeno
      neogeno: {
        subtitle: "La era de las praderas",
        mioceno:  { desc: "El amanecer de las grandes praderas y los ancestros de los simios, La Tierra se transforma en vastas sabanas." },
        plioceno: { desc: "Mundo de desiertos crecientes, los primeros Homínidos se ponen en pie para cruzar La Tierra llena de faunas y climas en constante cambio." },
      },

      cuaternario: {
        subtitle: "El ascenso de los humanos modernos",
        pleistoceno: { desc: "Abarca las últimas glaciaciones extremas, incluyendo episodios como Dryas Reciente." },
        holoceno:    { desc: "Época geológica actual, los climas más cálidos y establos permiten el desarrollo humano." },
      },
    },

    // ── DINO CARD ─────────────────────────────────────────────────────────
    dinoCard: {
      length: "Longitud",
      height: "Altura",
      addedFav: "añadido a favoritos",
      removedFav: "eliminado",
      authRequired: "Identificación requerida",
      systemError: "Error de sistema",
    },

    // ── DINO DETAIL ───────────────────────────────────────────────────────
    dinoDetail: {
      backToRecords: "Volver a registros",
      loading: "Accediendo al archivo...",
      length: "Longitud",
      height: "Altura",
      diet: "Dieta",
      status: "Estado",
      extinct: "Extinto",
      alive: "Vivo",
      fossilConservation: "Conservación fósil",
      specimenIntegrity: "Integridad del espécimen",
      method: "Método",
      material: "Material",
      extinction: "Extinción",
      conservationExcellent: "Excelente",
      conservationModerate: "Moderada",
      conservationFragmentary: "Fragmentaria",
      type: "Tipo",
      era: "Era",
      discoveryMap: "Mapa de hallazgos",
      comingSoon: "Próximamente",
      relatedSpecies: "Especies vinculadas",
      authRequired: "Identificación requerida",
      addedFav: "Añadido a favoritos",
      removedFav: "Eliminado de favoritos",
      connectionError: "Error de conexión",
    },

    // ── FAVORITES ─────────────────────────────────────────────────────────
    favorites: {
      title: "Mis",
      titleAccent: "Favoritos",
      subtitle: "ejemplares registrados en tus favoritos",
      loading: "Accediendo a tus favoritos.",
      emptyTitle: "Base de datos vacía - No hay registros guardados",
      startSearch: "Iniciar Búsqueda",
    },

    // ── PROFILE ───────────────────────────────────────────────────────────
    profile: {
      back: "Volver",
      loading: "Cargando perfil...",
      memberSince: "Miembro desde",
      section: {
        profileInfo: "Información del perfil",
        favorites: "Mis favoritos",
        language: "Idioma",
        changePassword: "Cambiar contraseña",
        dangerZone: "Zona de peligro",
      },
      field: {
        username: "Nombre de usuario",
        email: "Email",
        bio: "Biografía",
        bioPlaceholder: "Cuéntanos algo sobre ti...",
        currentPassword: "Contraseña actual",
        newPassword: "Nueva contraseña",
        confirmPassword: "Confirmar nueva contraseña",
        passwordPlaceholder: "••••••••",
        usernamePlaceholder: "Tu nombre",
      },
      saveChanges: "Guardar cambios",
      updatePassword: "Actualizar contraseña",
      chooseAvatar: "Elegir avatar",
      favEmpty: "Aún no has añadido ningún favorito",
      viewAll: "Ver los {n} favoritos →",
      dangerDesc:
        "Borrar tu cuenta es una acción permanente. Perderás todos tus favoritos y datos de perfil.",
      deleteAccount: "Borrar mi cuenta",
      deleteModal: {
        title: "Confirmar eliminación",
        warning:
          "Esta acción no se puede deshacer. Escribe tu nombre de usuario",
        warningEnd: "para confirmar.",
        writeUsername: "Escribe tu nombre de usuario",
        writePassword: "Tu contraseña",
        confirm: "Borrar para siempre",
        cancel: "Cancelar",
      },
      toast: {
        profileUpdated: "Perfil actualizado",
        saveError: "Error al guardar",
        passwordUpdated: "Contraseña actualizada",
        passwordMismatch: "Las contraseñas no coinciden",
        passwordTooShort: "Mínimo 6 caracteres",
        passwordError: "Error al cambiar",
        nameMismatch: "El nombre no coincide",
        deleteError: "Error al borrar",
      },
    },

    // ── LOGIN ─────────────────────────────────────────────────────────────
    login: {
      title: "Inicio de Sesión",
      userOrEmail: "Usuario o Correo",
      userPlaceholder: "Usuario o Email",
      password: "Contraseña",
      submit: "Entrar al archivo",
      noAccount: "¿No tiene una cuenta?",
      signUp: "Registrarse",
    },

    // ── REGISTER ──────────────────────────────────────────────────────────
    register: {
      title: "Registro de",
      titleAccent: "Nuevo Usuario",
      username: "Nombre de Usuario",
      email: "Correo Electrónico",
      emailPlaceholder: "Correo Electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      confirmPlaceholder: "Repetir contraseña",
      submit: "Registrarse",
      hasAccount: "¿Ya tiene una cuenta?",
      signIn: "Iniciar Sesión",
    },

    // ── TOAST ─────────────────────────────────────────────────────────────
    toast: {
      successLabel: "Sistema Actualizado",
      errorLabel: "Aviso de Seguridad",
    },

    // ── TIPOS ─────────────────────────────────────────────────────────────
    typeLabels: {
      Theropod: "Terópodo",
      Sauropod: "Saurópodo",
      Avialae: "Ave primitiva",
      Thyreophoran: "Tireoforo",
      Plesiosaur: "Plesiosaurio",
      Chondrichthyes: "Condrictio",
      Basal_arthropod: "Artrópodo basal",
      Basal_chordate: "Cordado basal",
      Mollusca: "Molusco",
      Arthropoda: "Artrópodo",
      Agnatha: "Agnato",
      Saurischia: "Saurisquio",
      Abelisauridae: "Abelisáurido",
      Squamata: "Escamoso",
      Mammalia: "Mamífero",
      Crocodylomorpha: "Crocodilomorfo",
    },

    // ── ARCHIVO ───────────────────────────────────────────────────────────
    archivo: {
      diets: {
        "Carnívoro":     "Los carnívoros eran depredadores activos o carroñeros especializados. Se caracterizaban por dientes afilados, garras para sujetar presas y un metabolismo adaptado a digerir proteína animal. Dominaron la cima de las cadenas alimentarias en todas las eras geológicas.",
        "Herbívoro":     "Los herbívoros desarrollaron adaptaciones extraordinarias para procesar vegetación dura: dientes trituradores en batería, cuellos alargados para alcanzar copas de árboles o cráneos bajos para ramonear el suelo. Constituían la mayor parte de la biomasa animal en ecosistemas prehistóricos.",
        "Piscívoro":     "Los piscívoros eran especialistas en la captura de peces y otros animales acuáticos. Desarrollaron mandíbulas largas y estrechas con numerosos dientes cónicos para atrapar presas resbaladizas, además de sentidos adaptados para detectar movimiento bajo el agua.",
        "Omnívoro":      "Los omnívoros tenían una dieta flexible que combinaba material vegetal y animal. Esta versatilidad les otorgó una ventaja adaptativa enorme, permitiéndoles sobrevivir en entornos cambiantes y aprovechar recursos que otros animales no podían explotar.",
        "Insectívoro":   "Los insectívoros se especializaron en la captura de artrópodos e invertebrados. Solían ser animales pequeños y ágiles con sentidos agudizados, lenguas pegajosas o garras adaptadas para excavar. Jugaron un papel clave en el control de poblaciones de insectos.",
        "Carroñero":     "Los carroñeros se alimentaban principalmente de cadáveres y restos de animales muertos. Lejos de ser oportunistas pasivos, muchos eran competidores agresivos capaces de ahuyentar a otros depredadores de sus presas. Su rol era esencial para el reciclaje de nutrientes en el ecosistema.",
        "Filtrador":     "Los filtradores extraían microorganismos y partículas orgánicas del agua o el sedimento. Desarrollaron estructuras especializadas como barbas, branquias modificadas o apéndices filtrantes. Eran fundamentales para el reciclaje de nutrientes en los ecosistemas marinos.",
        "Detritívoro":   "Los detritívoros se alimentaban de materia orgánica en descomposición: hojas muertas, cadáveres y sedimentos ricos en nutrientes. Actuaban como los recicladores del ecosistema, descomponiendo materia compleja y liberando nutrientes al suelo y al agua.",
        "Fotosintético": "Los organismos fotosintéticos convertían la energía solar en materia orgánica, siendo la base de casi todas las cadenas alimentarias. En la prehistoria incluían algas gigantes, plantas vasculares primitivas y microorganismos que fueron los responsables de oxigenar la atmósfera terrestre.",
      },
      types: {
        Theropod:        "Los terópodos eran dinosaurios bípedos con extremidades anteriores reducidas y patas traseras potentes. Incluyen desde los gigantescos Tyrannosaurus rex y Spinosaurus hasta las aves modernas, sus únicos descendientes vivos. Se caracterizan por huesos huecos, garras curvas y, en muchas especies, plumas.",
        Sauropod:        "Los saurópodos fueron los animales terrestres más grandes que han existido. Su plan corporal —cuello y cola extremadamente largos, cuerpo masivo sobre cuatro columnas— les permitía acceder a vegetación inalcanzable para otros herbívoros. El Argentinosaurus puede haber superado las 70 toneladas.",
        Avialae:         "Las avialae son el grupo que incluye a las aves modernas y sus parientes extintos más cercanos. Evolucionaron de terópodos emplumados durante el Jurásico y se caracterizan por alas funcionales, esqueleto muy ligero y, en las formas primitivas, todavía conservaban dientes y garras en las alas.",
        Thyreophoran:    "Los tireoforos eran dinosaurios ornitisquios protegidos por placas óseas, espinas y escudos dérmicos. Incluyen a los estegosáuridos, con sus icónicas placas dorsales, y a los anquilosáuridos, auténticas fortalezas andantes con colas en maza capaces de romper huesos.",
        Plesiosaur:      "Los plesiosaurios dominaron los mares del Mesozoico durante más de 135 millones de años. Se dividían en dos grandes grupos: los de cuello largo y cabeza pequeña (plesiosauroídeos) y los de cuello corto y cabeza enorme (pliosáuridos). Propulsaban su cuerpo con cuatro aletas en forma de paletas.",
        Chondrichthyes:  "Los condrictios son peces de esqueleto cartilaginoso, el grupo que incluye tiburones, rayas y quimeras. Con más de 450 millones de años de historia, son uno de los linajes de vertebrados más antiguos y exitosos. Algunos, como el Megalodon, alcanzaron los 18 metros de longitud.",
        Basal_arthropod: "Los artrópodos basales incluyen las formas más primitivas de este filo, como los trilobites y los anomalocarídidos. Dominaron los mares del Cámbrico y el Ordovícico, y representan los primeros animales con esqueleto externo y apéndices articulados conocidos en el registro fósil.",
        Basal_chordate:  "Los cordados basales son los primeros animales con notocorda —el precursor de la columna vertebral—. Formas como Pikaia o los primeros peces sin mandíbula (agnatos) representan los albores de nuestro propio linaje evolutivo, hace más de 500 millones de años.",
        Mollusca:        "Los moluscos son uno de los filos animales más diversos y antiguos. Incluyen cefalópodos extintos como los ammonites y belemnites, que dominaron los mares mesozoicos, así como nautiloides gigantes del Paleozoico. Se caracterizan por su cuerpo blando y, en muchos casos, concha protectora.",
        Arthropoda:      "Los artrópodos son el grupo animal más diverso de la historia. En la prehistoria incluían escorpiones marinos (euriptéridos) que superaban los 2 metros, insectos gigantes del Carbonífero como la libélula Meganeura, y miríapodos gigantes como Arthropleura.",
        Agnatha:         "Los agnatos son los vertebrados más primitivos: peces sin mandíbula como lampreas y mixines, cuyos parientes extintos —conodontos y ostracodermos— dominaron los mares del Ordovícico y el Devónico. Su estudio es clave para entender los orígenes de la columna vertebral y las mandíbulas.",
        Saurischia:      "Los saurisquios son uno de los dos grandes órdenes de dinosaurios, caracterizados por una pelvis con pubis apuntando hacia adelante. Incluyen a todos los terópodos y saurópodos, lo que los convierte en el grupo de dinosaurios más conocido e icónico.",
        Abelisauridae:   "Los abelisáuridos eran terópodos carnívoros que dominaron los supercontinentes del hemisferio sur durante el Cretácico. Se caracterizan por cráneos muy cortos y robustos con huesos rugosos y extremidades anteriores extremadamente reducidas —incluso más que el T. rex—.",
        Squamata:        "Los escamosos incluyen lagartos y serpientes, el grupo de reptiles más diverso de la actualidad. En el Mesozoico incluían a los mosasaurios, enormes reptiles marinos que podían superar los 17 metros y dominaron los océanos del Cretácico tardío.",
        Mammalia:        "Los mamíferos prehistóricos incluyen desde los pequeños insectívoros que convivieron con los dinosaurios hasta la megafauna del Pleistoceno: mamuts lanudos, rinocerontes lanudos, perezosos gigantes y el Paraceratherium, el mamífero terrestre más grande conocido.",
        Crocodylomorpha: "Los crocodilomorfos son el linaje de arcosaurios que dio origen a los cocodrilos modernos. En el Mesozoico existían formas terrestres, marinas e incluso bípedas. El Sarcosuchus del Cretácico podía superar los 12 metros.",
      },
      sizes: {
        pequeño:  "Los animales de pequeño tamaño (menos de 1 metro) representan algunos de los organismos más primitivos y especializados del registro fósil. Su reducido tamaño les permitía explotar nichos ecológicos inaccesibles para los grandes depredadores, y en muchos casos su abundancia los convierte en fósiles índice clave para datar estratos geológicos.",
        mediano:  "Los animales de tamaño mediano (1 a 5 metros) constituyen el grueso de la biodiversidad prehistórica. Ágiles y versátiles, ocupaban roles de depredadores secundarios, herbívoros generalistas y omnívoros oportunistas en casi todos los ecosistemas del pasado.",
        grande:   "Los animales de gran tamaño (5 a 12 metros) representan algunos de los depredadores y herbívoros más icónicos de la historia de la vida. Su masa corporal les otorgaba ventajas defensivas y de acceso a recursos, aunque también los hacía más vulnerables a los cambios ambientales y las extinciones masivas.",
        gigante:  "Los gigantes prehistóricos (más de 12 metros) son los animales más grandes que han poblado la Tierra. Desde los saurópodos titanosáuridos hasta el Megalodon y el Livyatan, estos colosos dominaron sus ecosistemas durante millones de años y siguen siendo objeto de fascinación científica y popular.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  en: {
    header: {
      login: "Log In",
      register: "Sign Up",
      logout: "Log Out",
      config: "Settings",
      lang: "Language",
      dark: "Dark Mode",
      light: "Light Mode",
      confirmLogout: "Are you sure you want to",
      exit: "leave",
      keep: "Stay",
      confirm: "Confirm",
      subtitleDefault: "Everything about the past, in your hand",
      favorites: "My Favorites",
      profile: "My Profile",
    },

    landing: {
      heroTitle: "Explore",
      heroTitleAccent: "the past",
      heroSubtitle:
        "Select a geological era to access fossil records and biological reconstructions.",
      searchPlaceholder: "Search the archive...",
      noResults: "No records found",
      filterDiets: "Diets",
      filterTypes: "Types",
      clearFilters: "Clear",
      logoutTitle: "Session Closed",
      logoutSub: "Access restricted",

      eras: {
        paleozoico: {
          desc: "The origin of complex life. Trilobites, giant fern forests and the first amphibians.",
        },
        mesozoico: {
          desc: "The age of dinosaurs. Triassic, Jurassic and Cretaceous. The reign of giant reptiles.",
        },
        cenozoico: {
          desc: "The rise of mammals. Megafauna, ice ages and the evolution of primates.",
        },
      },
    },

    eraPage: {
      backToEras: "Back to eras",
      backToPeriods: "Back to periods",
      recordsOf: "RECORDS",
      periodsOf: "PERIODS OF",
      epochsOf: "EPOCHS OF",
      classifiedAnimals: "Animals classified",
      classifiedDinos: "Dinosaurs classified",
      wip: "WIP",

      mesozoico: {
        subtitle: "Records of the reptilian reign",
        triasico: {
          desc: "The revival after the great extinction. The first true dinosaurs and mammals appear.",
        },
        jurasico: {
          desc: "The golden age of giants. Allosaurus and Brachiosaurus dominate a lush green world.",
        },
        cretacico: {
          desc: "The end of an era. Flowers emerge and T-Rex reigns before the meteorite impact.",
        },
      },

      cenozoico: {
        subtitle: "Records of recent megafauna",
        paleogeno: {
          desc: "The dawn of mammals. After the extinction of the dinosaurs, life recovers in tropical forests.",
        },
        neogeno: {
          desc: "The age of grasslands. Mammals evolve into giant forms and the first hominids appear.",
        },
        cuaternario: {
          desc: "Great ice ages and the rise of modern humans in a world of mammoths and saber-toothed tigers.",
        },
      },

      paleozoico: {
        subtitle: "The foundations of complex life",
        cambrico: {
          desc: "Known for the \"Cambrian explosion\", a rapid increase in marine life diversity, including the first arthropods.",
        },
        ordovicico: {
          desc: "Dominance of marine invertebrates, appearance of the first vertebrates and coastal colonization by primitive plants.",
        },
        silurico: {
          desc: "Climate stabilization after glaciation. The first vascular land plants and jawed fish appear.",
        },
        devonico: {
          desc: "The \"Age of Fish\". They diversify enormously and the first tetrapods and primitive forests emerge.",
        },
        carbonifero: {
          desc: "Expansion of giant forests that formed today's coal deposits. The age of giant insects and first reptiles.",
        },
        permico: {
          desc: "Formation of the supercontinent Pangaea. Ends with the greatest mass extinction in history, the \"Great Dying\".",
        },
      },

      paleogeno: {
        subtitle: "The dawn of modern mammals",
        paleoceno: {
          desc: "The world after the dinosaurs. Forests expand and archaic mammals begin their rise.",
        },
        eoceno: {
          desc: "Thermal maximum and diversification. Ancestors of whales, horses and primates appear in global forests.",
        },
        oligoceno: {
          desc: "The expansion of grasslands. The climate cools, forests retreat and giant mammals emerge.",
        },
      },
    },

    dinoCard: {
      length: "Length",
      height: "Height",
      addedFav: "added to favorites",
      removedFav: "removed",
      authRequired: "Identification required",
      systemError: "System error",
    },

    dinoDetail: {
      backToRecords: "Back to records",
      loading: "Accessing archive...",
      length: "Length",
      height: "Height",
      diet: "Diet",
      status: "Status",
      extinct: "Extinct",
      alive: "Alive",
      fossilConservation: "Fossil conservation",
      specimenIntegrity: "Specimen integrity",
      method: "Method",
      material: "Material",
      extinction: "Extinction",
      conservationExcellent: "Excellent",
      conservationModerate: "Moderate",
      conservationFragmentary: "Fragmentary",
      type: "Type",
      era: "Era",
      discoveryMap: "Discovery map",
      comingSoon: "Coming soon",
      relatedSpecies: "Related species",
      authRequired: "Identification required",
      addedFav: "Added to favorites",
      removedFav: "Removed from favorites",
      connectionError: "Connection error",
    },

    favorites: {
      title: "My",
      titleAccent: "Favorites",
      subtitle: "specimens saved in your favorites",
      loading: "Accessing your favorites.",
      emptyTitle: "Empty database — No saved records",
      startSearch: "Start Search",
    },

    profile: {
      back: "Back",
      loading: "Loading profile...",
      memberSince: "Member since",
      section: {
        profileInfo: "Profile information",
        favorites: "My favorites",
        language: "Language",
        changePassword: "Change password",
        dangerZone: "Danger zone",
      },
      field: {
        username: "Username",
        email: "Email",
        bio: "Bio",
        bioPlaceholder: "Tell us something about you...",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmPassword: "Confirm new password",
        passwordPlaceholder: "••••••••",
        usernamePlaceholder: "Your name",
      },
      saveChanges: "Save changes",
      updatePassword: "Update password",
      chooseAvatar: "Choose avatar",
      favEmpty: "You haven't added any favorites yet",
      viewAll: "View all {n} favorites →",
      dangerDesc:
        "Deleting your account is permanent. You will lose all your favorites and profile data.",
      deleteAccount: "Delete my account",
      deleteModal: {
        title: "Confirm deletion",
        warning: "This action cannot be undone. Type your username",
        warningEnd: "to confirm.",
        writeUsername: "Type your username",
        writePassword: "Your password",
        confirm: "Delete forever",
        cancel: "Cancel",
      },
      toast: {
        profileUpdated: "Profile updated",
        saveError: "Error saving",
        passwordUpdated: "Password updated",
        passwordMismatch: "Passwords do not match",
        passwordTooShort: "Minimum 6 characters",
        passwordError: "Error changing password",
        nameMismatch: "Name does not match",
        deleteError: "Error deleting account",
      },
    },

    login: {
      title: "Sign In",
      userOrEmail: "Username or Email",
      userPlaceholder: "Username or Email",
      password: "Password",
      submit: "Enter the archive",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
    },

    register: {
      title: "Register",
      titleAccent: "New User",
      username: "Username",
      email: "Email",
      emailPlaceholder: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      confirmPlaceholder: "Repeat password",
      submit: "Register",
      hasAccount: "Already have an account?",
      signIn: "Log In",
    },

    toast: {
      successLabel: "System Updated",
      errorLabel: "Security Alert",
    },

    typeLabels: {
      Theropod: "Theropod",
      Sauropod: "Sauropod",
      Avialae: "Early bird",
      Thyreophoran: "Thyreophoran",
      Plesiosaur: "Plesiosaur",
      Chondrichthyes: "Chondrichthyan",
      Basal_arthropod: "Basal arthropod",
      Basal_chordate: "Basal chordate",
      Mollusca: "Mollusc",
      Arthropoda: "Arthropod",
      Agnatha: "Agnathan",
      Saurischia: "Saurischian",
      Abelisauridae: "Abelisaurid",
      Squamata: "Squamate",
      Mammalia: "Mammal",
      Crocodylomorpha: "Crocodylomorph",
    },

    archivo: {
      diets: {
        "Carnívoro":     "Carnivores were active predators or specialized scavengers. They were characterized by sharp teeth, claws to grip prey, and a metabolism adapted to digest animal protein. They dominated the top of food chains across all geological eras.",
        "Herbívoro":     "Herbivores developed extraordinary adaptations to process tough vegetation: battery grinding teeth, elongated necks to reach treetops, or low skulls to graze the ground. They made up the bulk of animal biomass in prehistoric ecosystems.",
        "Piscívoro":     "Piscivores specialized in catching fish and other aquatic animals. They developed long, narrow jaws with numerous conical teeth to catch slippery prey, as well as senses adapted to detect movement underwater.",
        "Omnívoro":      "Omnivores had a flexible diet combining plant and animal material. This versatility gave them a huge adaptive advantage, allowing them to survive in changing environments and exploit resources other animals could not.",
        "Insectívoro":   "Insectivores specialized in catching arthropods and invertebrates. They were usually small, agile animals with sharp senses, sticky tongues, or claws adapted for digging. They played a key role in controlling insect populations.",
        "Carroñero":     "Scavengers fed mainly on carcasses and remains of dead animals. Far from being passive opportunists, many were aggressive competitors capable of driving other predators away from their kills. Their role was essential for nutrient recycling in the ecosystem.",
        "Filtrador":     "Filter feeders extracted microorganisms and organic particles from water or sediment. They developed specialized structures like baleen, modified gills, or filtering appendages. They were fundamental to nutrient recycling in marine ecosystems.",
        "Detritívoro":   "Detritivores fed on decomposing organic matter: dead leaves, carcasses, and nutrient-rich sediments. They acted as the ecosystem's recyclers, breaking down complex matter and releasing nutrients back into soil and water.",
        "Fotosintético": "Photosynthetic organisms converted solar energy into organic matter, forming the base of almost all food chains. In prehistory they included giant algae, primitive vascular plants and microorganisms responsible for oxygenating Earth's atmosphere.",
      },
      types: {
        Theropod:        "Theropods were bipedal dinosaurs with reduced forelimbs and powerful hind legs. They range from the gigantic Tyrannosaurus rex and Spinosaurus to modern birds, their only living descendants. They are characterized by hollow bones, curved claws, and in many species, feathers.",
        Sauropod:        "Sauropods were the largest land animals to ever exist. Their body plan — extremely long necks and tails, massive body on four column-like legs — allowed them to reach vegetation inaccessible to other herbivores. Argentinosaurus may have exceeded 70 tonnes.",
        Avialae:         "Avialae is the group that includes modern birds and their closest extinct relatives. They evolved from feathered theropods during the Jurassic and are characterized by functional wings, very lightweight skeletons, and in primitive forms, still retained teeth and wing claws.",
        Thyreophoran:    "Thyreophorans were ornithischian dinosaurs protected by bony plates, spines and dermal shields. They include the stegosaurids with their iconic dorsal plates, and the ankylosaurids, true walking fortresses with club tails capable of breaking bones.",
        Plesiosaur:      "Plesiosaurs dominated the Mesozoic seas for over 135 million years. They split into two main groups: long-necked small-headed forms (plesiosauropoids) and short-necked enormous-headed forms (pliosaurids). They propelled themselves with four paddle-shaped flippers.",
        Chondrichthyes:  "Chondrichthyans are cartilaginous fish, the group that includes sharks, rays, and chimaeras. With over 450 million years of history, they are one of the oldest and most successful vertebrate lineages. Some, like the Megalodon, reached 18 metres in length.",
        Basal_arthropod: "Basal arthropods include the most primitive forms of this phylum, such as trilobites and anomalocaridids. They dominated the Cambrian and Ordovician seas and represent the first known animals with exoskeletons and jointed appendages in the fossil record.",
        Basal_chordate:  "Basal chordates are the first animals with a notochord — the precursor to the backbone. Forms like Pikaia or the first jawless fish (agnathans) represent the dawn of our own evolutionary lineage, over 500 million years ago.",
        Mollusca:        "Molluscs are one of the most diverse and ancient animal phyla. They include extinct cephalopods like ammonites and belemnites that dominated the Mesozoic seas, as well as giant nautiloids from the Paleozoic. They are characterized by their soft body and, in many cases, a protective shell.",
        Arthropoda:      "Arthropods are the most diverse animal group in history. In prehistory they included sea scorpions (eurypterids) exceeding 2 metres, giant Carboniferous insects like the dragonfly Meganeura, and giant myriapods like Arthropleura.",
        Agnatha:         "Agnathans are the most primitive vertebrates: jawless fish like lampreys and hagfish, whose extinct relatives — conodonts and ostracoderms — dominated the Ordovician and Devonian seas. Their study is key to understanding the origins of the backbone and jaws.",
        Saurischia:      "Saurischians are one of the two major dinosaur orders, characterized by a pelvis with the pubis pointing forward. They include all theropods and sauropods, making them the best-known and most iconic group of dinosaurs.",
        Abelisauridae:   "Abelisaurids were carnivorous theropods that dominated the southern hemisphere supercontinents during the Cretaceous. They are characterized by very short robust skulls with rough bones and extremely reduced forelimbs — even more so than T. rex.",
        Squamata:        "Squamates include lizards and snakes, the most diverse group of reptiles today. In the Mesozoic they included mosasaurs, enormous marine reptiles that could exceed 17 metres and dominated the Late Cretaceous oceans.",
        Mammalia:        "Prehistoric mammals range from the small insectivores that coexisted with dinosaurs to the Pleistocene megafauna: woolly mammoths, woolly rhinos, giant ground sloths, and Paraceratherium, the largest known land mammal.",
        Crocodylomorpha: "Crocodylomorphs are the archosaur lineage that gave rise to modern crocodiles. In the Mesozoic there were terrestrial, marine, and even bipedal forms. The Cretaceous Sarcosuchus could exceed 12 metres.",
      },
      sizes: {
        pequeño:  "Small animals (under 1 metre) represent some of the most primitive and specialised organisms in the fossil record. Their reduced size allowed them to exploit ecological niches inaccessible to large predators, and in many cases their abundance makes them key index fossils for dating geological strata.",
        mediano:  "Medium-sized animals (1 to 5 metres) make up the bulk of prehistoric biodiversity. Agile and versatile, they occupied roles as secondary predators, generalist herbivores and opportunistic omnivores in almost all past ecosystems.",
        grande:   "Large animals (5 to 12 metres) represent some of the most iconic predators and herbivores in the history of life. Their body mass gave them defensive advantages and access to resources, though it also made them more vulnerable to environmental changes and mass extinctions.",
        gigante:  "Prehistoric giants (over 12 metres) are the largest animals to have ever inhabited the Earth. From titanosaur sauropods to Megalodon and Livyatan, these colossi dominated their ecosystems for millions of years and remain objects of scientific and popular fascination.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  fr: {
    header: {
      login: "Se Connecter",
      register: "S'inscrire",
      logout: "Déconnexion",
      config: "Paramètres",
      lang: "Langue",
      dark: "Mode Sombre",
      light: "Mode Clair",
      confirmLogout: "Êtes-vous sûr de vouloir",
      exit: "quitter",
      keep: "Rester",
      confirm: "Confirmer",
      subtitleDefault: "Tout sur le passé, dans votre main",
      favorites: "Mes Favoris",
      profile: "Mon Profil",
    },

    landing: {
      heroTitle: "Explorer",
      heroTitleAccent: "le passé",
      heroSubtitle:
        "Sélectionnez une ère géologique pour accéder aux registres fossiles et reconstructions biologiques.",
      searchPlaceholder: "Rechercher dans les archives...",
      noResults: "Aucun enregistrement",
      filterDiets: "Régimes",
      filterTypes: "Types",
      clearFilters: "Effacer",
      logoutTitle: "Session Fermée",
      logoutSub: "Accès restreint",

      eras: {
        paleozoico: {
          desc: "L'origine de la vie complexe. Trilobites, forêts de fougères géantes et les premiers amphibiens.",
        },
        mesozoico: {
          desc: "L'ère des dinosaures. Trias, Jurassique et Crétacé. Le règne des grands reptiles.",
        },
        cenozoico: {
          desc: "La montée des mammifères. Mégafaune, glaciations et l'évolution des primates.",
        },
      },
    },

    eraPage: {
      backToEras: "Retour aux ères",
      backToPeriods: "Retour aux périodes",
      recordsOf: "REGISTRES",
      periodsOf: "PÉRIODES DU",
      epochsOf: "ÉPOQUES DU",
      classifiedAnimals: "Animaux classifiés",
      classifiedDinos: "Dinosaures classifiés",
      wip: "En cours",

      mesozoico: {
        subtitle: "Registres du règne reptilien",
        triasico: {
          desc: "Le renouveau après la grande extinction. Apparition des premiers vrais dinosaures et mammifères.",
        },
        jurasico: {
          desc: "L'âge d'or des géants. L'Allosaurus et le Brachiosaurus dominent un monde verdoyant.",
        },
        cretacico: {
          desc: "La fin d'une ère. Les fleurs apparaissent et le T-Rex règne avant l'impact de la météorite.",
        },
      },

      cenozoico: {
        subtitle: "Registres de la mégafaune récente",
        paleogeno: {
          desc: "L'aube des mammifères. Après l'extinction des dinosaures, la vie se remet dans les forêts tropicales.",
        },
        neogeno: {
          desc: "L'ère des prairies. Les mammifères évoluent vers des formes géantes et les premiers hominidés apparaissent.",
        },
        cuaternario: {
          desc: "Grandes glaciations et la montée des humains modernes dans un monde de mammouths et de tigres à dents de sabre.",
        },
      },

      paleozoico: {
        subtitle: "Les fondements de la vie complexe",
        cambrico: {
          desc: "Connu pour l'\"explosion cambrienne\", une augmentation rapide de la diversité de la vie marine.",
        },
        ordovicico: {
          desc: "Domination des invertébrés marins, apparition des premiers vertébrés et colonisation des côtes par des plantes primitives.",
        },
        silurico: {
          desc: "Stabilisation du climat après une glaciation. Apparition des premières plantes vasculaires terrestres et des poissons à mâchoires.",
        },
        devonico: {
          desc: "L'\"Âge des Poissons\". Ils se diversifient énormément et les premiers tétrapodes et forêts primitives apparaissent.",
        },
        carbonifero: {
          desc: "Expansion des forêts géantes qui ont formé les dépôts de charbon actuels. L'époque des insectes géants.",
        },
        permico: {
          desc: "Formation du supercontinent Pangée. Se termine par la plus grande extinction de masse de l'histoire.",
        },
      },

      paleogeno: {
        subtitle: "L'aube des mammifères modernes",
        paleoceno: {
          desc: "Le monde après les dinosaures. Les forêts s'étendent et les mammifères archaïques commencent leur ascension.",
        },
        eoceno: {
          desc: "Maximum thermique et diversification. Les ancêtres des baleines, chevaux et primates apparaissent.",
        },
        oligoceno: {
          desc: "L'expansion des prairies. Le climat se refroidit, les forêts reculent et des mammifères géants émergent.",
        },
      },
    },

    dinoCard: {
      length: "Longueur",
      height: "Hauteur",
      addedFav: "ajouté aux favoris",
      removedFav: "supprimé",
      authRequired: "Identification requise",
      systemError: "Erreur système",
    },

    dinoDetail: {
      backToRecords: "Retour aux registres",
      loading: "Accès aux archives...",
      length: "Longueur",
      height: "Hauteur",
      diet: "Régime",
      status: "Statut",
      extinct: "Éteint",
      alive: "Vivant",
      fossilConservation: "Conservation fossile",
      specimenIntegrity: "Intégrité du spécimen",
      method: "Méthode",
      material: "Matériel",
      extinction: "Extinction",
      conservationExcellent: "Excellente",
      conservationModerate: "Modérée",
      conservationFragmentary: "Fragmentaire",
      type: "Type",
      era: "Ère",
      discoveryMap: "Carte des découvertes",
      comingSoon: "Bientôt disponible",
      relatedSpecies: "Espèces liées",
      authRequired: "Identification requise",
      addedFav: "Ajouté aux favoris",
      removedFav: "Retiré des favoris",
      connectionError: "Erreur de connexion",
    },

    favorites: {
      title: "Mes",
      titleAccent: "Favoris",
      subtitle: "spécimens enregistrés dans vos favoris",
      loading: "Accès à vos favoris.",
      emptyTitle: "Base de données vide — Aucun enregistrement sauvegardé",
      startSearch: "Lancer une Recherche",
    },

    profile: {
      back: "Retour",
      loading: "Chargement du profil...",
      memberSince: "Membre depuis",
      section: {
        profileInfo: "Informations du profil",
        favorites: "Mes favoris",
        language: "Langue",
        changePassword: "Changer le mot de passe",
        dangerZone: "Zone de danger",
      },
      field: {
        username: "Nom d'utilisateur",
        email: "Email",
        bio: "Biographie",
        bioPlaceholder: "Dites-nous quelque chose sur vous...",
        currentPassword: "Mot de passe actuel",
        newPassword: "Nouveau mot de passe",
        confirmPassword: "Confirmer le nouveau mot de passe",
        passwordPlaceholder: "••••••••",
        usernamePlaceholder: "Votre nom",
      },
      saveChanges: "Sauvegarder",
      updatePassword: "Mettre à jour le mot de passe",
      chooseAvatar: "Choisir un avatar",
      favEmpty: "Vous n'avez encore ajouté aucun favori",
      viewAll: "Voir les {n} favoris →",
      dangerDesc:
        "Supprimer votre compte est permanent. Vous perdrez tous vos favoris et données de profil.",
      deleteAccount: "Supprimer mon compte",
      deleteModal: {
        title: "Confirmer la suppression",
        warning:
          "Cette action est irréversible. Saisissez votre nom d'utilisateur",
        warningEnd: "pour confirmer.",
        writeUsername: "Saisissez votre nom d'utilisateur",
        writePassword: "Votre mot de passe",
        confirm: "Supprimer définitivement",
        cancel: "Annuler",
      },
      toast: {
        profileUpdated: "Profil mis à jour",
        saveError: "Erreur lors de la sauvegarde",
        passwordUpdated: "Mot de passe mis à jour",
        passwordMismatch: "Les mots de passe ne correspondent pas",
        passwordTooShort: "Minimum 6 caractères",
        passwordError: "Erreur lors du changement",
        nameMismatch: "Le nom ne correspond pas",
        deleteError: "Erreur lors de la suppression",
      },
    },

    login: {
      title: "Connexion",
      userOrEmail: "Utilisateur ou Email",
      userPlaceholder: "Utilisateur ou Email",
      password: "Mot de passe",
      submit: "Accéder aux archives",
      noAccount: "Vous n'avez pas de compte ?",
      signUp: "S'inscrire",
    },

    register: {
      title: "Inscription",
      titleAccent: "Nouvel Utilisateur",
      username: "Nom d'utilisateur",
      email: "Adresse Email",
      emailPlaceholder: "Adresse Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      confirmPlaceholder: "Répéter le mot de passe",
      submit: "S'inscrire",
      hasAccount: "Vous avez déjà un compte ?",
      signIn: "Se Connecter",
    },

    toast: {
      successLabel: "Système Mis à Jour",
      errorLabel: "Alerte de Sécurité",
    },

    typeLabels: {
      Theropod: "Théropode",
      Sauropod: "Sauropode",
      Avialae: "Oiseau primitif",
      Thyreophoran: "Thyréophore",
      Plesiosaur: "Plésiosaure",
      Chondrichthyes: "Chondrichthyen",
      Basal_arthropod: "Arthropode basal",
      Basal_chordate: "Cordé basal",
      Mollusca: "Mollusque",
      Arthropoda: "Arthropode",
      Agnatha: "Agnathe",
      Saurischia: "Saurischien",
      Abelisauridae: "Abélisauridé",
      Squamata: "Squamate",
      Mammalia: "Mammifère",
      Crocodylomorpha: "Crocodylomorphe",
    },

    archivo: {
      diets: {
        "Carnívoro":     "Les carnivores étaient des prédateurs actifs ou des charognards spécialisés. Ils se caractérisaient par des dents acérées, des griffes pour saisir les proies et un métabolisme adapté à la digestion de protéines animales. Ils dominaient le sommet des chaînes alimentaires à toutes les ères géologiques.",
        "Herbívoro":     "Les herbivores ont développé des adaptations extraordinaires pour traiter la végétation dure : des dents broyeuses en batterie, des cous allongés pour atteindre les cimes des arbres ou des crânes bas pour brouter le sol. Ils constituaient la majeure partie de la biomasse animale dans les écosystèmes préhistoriques.",
        "Piscívoro":     "Les piscivores étaient spécialisés dans la capture de poissons et d'autres animaux aquatiques. Ils ont développé des mâchoires longues et étroites avec de nombreuses dents coniques pour attraper des proies glissantes, ainsi que des sens adaptés pour détecter les mouvements sous l'eau.",
        "Omnívoro":      "Les omnivores avaient un régime alimentaire flexible combinant matière végétale et animale. Cette polyvalence leur a conféré un énorme avantage adaptatif, leur permettant de survivre dans des environnements changeants et d'exploiter des ressources inaccessibles aux autres animaux.",
        "Insectívoro":   "Les insectivores se spécialisaient dans la capture d'arthropodes et d'invertébrés. C'étaient généralement de petits animaux agiles aux sens aiguisés, avec des langues collantes ou des griffes adaptées pour creuser. Ils jouaient un rôle clé dans le contrôle des populations d'insectes.",
        "Carroñero":     "Les charognards se nourrissaient principalement de carcasses et de restes d'animaux morts. Loin d'être des opportunistes passifs, beaucoup étaient des compétiteurs agressifs capables de chasser d'autres prédateurs de leurs proies. Leur rôle était essentiel pour le recyclage des nutriments dans l'écosystème.",
        "Filtrador":     "Les filtreurs extrayaient des micro-organismes et des particules organiques de l'eau ou du sédiment. Ils ont développé des structures spécialisées comme des fanons, des branchies modifiées ou des appendices filtrants. Ils étaient fondamentaux pour le recyclage des nutriments dans les écosystèmes marins.",
        "Detritívoro":   "Les détritivores se nourrissaient de matière organique en décomposition : feuilles mortes, carcasses et sédiments riches en nutriments. Ils agissaient comme les recycleurs de l'écosystème, décomposant la matière complexe et libérant les nutriments dans le sol et l'eau.",
        "Fotosintético": "Les organismes photosynthétiques convertissaient l'énergie solaire en matière organique, constituant la base de presque toutes les chaînes alimentaires. Dans la préhistoire, ils comprenaient des algues géantes, des plantes vasculaires primitives et des micro-organismes responsables de l'oxygénation de l'atmosphère terrestre.",
      },
      types: {
        Theropod:        "Les théropodes étaient des dinosaures bipèdes aux membres antérieurs réduits et aux pattes postérieures puissantes. Ils vont du gigantesque Tyrannosaurus rex aux oiseaux modernes, leurs seuls descendants vivants. Ils se caractérisent par des os creux, des griffes recourbées et, dans de nombreuses espèces, des plumes.",
        Sauropod:        "Les sauropodes furent les plus grands animaux terrestres ayant jamais existé. Leur plan corporel — cou et queue extrêmement longs, corps massif sur quatre colonnes — leur permettait d'atteindre une végétation inaccessible aux autres herbivores. L'Argentinosaurus a peut-être dépassé 70 tonnes.",
        Avialae:         "Les avialae regroupent les oiseaux modernes et leurs plus proches parents éteints. Ils ont évolué à partir de théropodes à plumes au Jurassique et se caractérisent par des ailes fonctionnelles, un squelette très léger et, dans les formes primitives, conservaient encore des dents et des griffes sur les ailes.",
        Thyreophoran:    "Les thyréophores étaient des dinosaures ornithischiens protégés par des plaques osseuses, des épines et des boucliers dermiques. Ils comprennent les stégosauridés avec leurs emblématiques plaques dorsales, et les ankylosaridés, véritables forteresses ambulantes avec des queues en massue capables de briser des os.",
        Plesiosaur:      "Les plésiosaures ont dominé les mers du Mésozoïque pendant plus de 135 millions d'années. Ils se divisaient en deux grands groupes : les formes à long cou et petite tête (plésiosauroïdes) et les formes à cou court et tête énorme (pliosauridés). Ils se propulsaient grâce à quatre nageoires en forme de pagaies.",
        Chondrichthyes:  "Les chondrichthyens sont des poissons à squelette cartilagineux, le groupe qui comprend requins, raies et chimères. Avec plus de 450 millions d'années d'histoire, ce sont l'un des lignages de vertébrés les plus anciens et les plus prospères. Certains, comme le Megalodon, atteignaient 18 mètres de long.",
        Basal_arthropod: "Les arthropodes basaux incluent les formes les plus primitives de ce phylum, comme les trilobites et les anomalocarididés. Ils ont dominé les mers du Cambrien et de l'Ordovicien, et représentent les premiers animaux à squelette externe et appendices articulés connus dans le registre fossile.",
        Basal_chordate:  "Les cordés basaux sont les premiers animaux dotés d'une notocorde — le précurseur de la colonne vertébrale. Des formes comme Pikaia ou les premiers poissons sans mâchoire (agnathes) représentent les origines de notre propre lignée évolutive, il y a plus de 500 millions d'années.",
        Mollusca:        "Les mollusques sont l'un des phylums animaux les plus diversifiés et les plus anciens. Ils comprennent des céphalopodes éteints comme les ammonites et les bélemnites qui ont dominé les mers mésozoïques, ainsi que des nautiloides géants du Paléozoïque.",
        Arthropoda:      "Les arthropodes sont le groupe animal le plus diversifié de l'histoire. Dans la préhistoire, ils comprenaient des scorpions marins (euryptérides) dépassant 2 mètres, des insectes géants du Carbonifère comme la libellule Meganeura, et des myriapodes géants comme Arthropleura.",
        Agnatha:         "Les agnathes sont les vertébrés les plus primitifs : des poissons sans mâchoire comme les lamproies et les myxines, dont les parents éteints — conodontes et ostéodermes — dominaient les mers de l'Ordovicien et du Dévonien. Leur étude est essentielle pour comprendre les origines de la colonne vertébrale et des mâchoires.",
        Saurischia:      "Les saurischiens sont l'un des deux grands ordres de dinosaures, caractérisés par un bassin avec le pubis pointant vers l'avant. Ils comprennent tous les théropodes et sauropodes, ce qui en fait le groupe de dinosaures le plus connu et le plus emblématique.",
        Abelisauridae:   "Les abélisauridés étaient des théropodes carnivores qui dominaient les supercontinents de l'hémisphère sud pendant le Crétacé. Ils se caractérisent par des crânes très courts et robustes aux os rugueux et des membres antérieurs extrêmement réduits — encore plus que chez le T. rex.",
        Squamata:        "Les squamates comprennent lézards et serpentes, le groupe de reptiles le plus diversifié aujourd'hui. Au Mésozoïque, ils comprenaient les mosasaures, d'énormes reptiles marins pouvant dépasser 17 mètres et qui ont dominé les océans du Crétacé tardif.",
        Mammalia:        "Les mammifères préhistoriques vont des petits insectivores qui coexistaient avec les dinosaures à la mégafaune du Pléistocène : mammouths laineux, rhinocéros laineux, paresseux géants et le Paraceratherium, le plus grand mammifère terrestre connu.",
        Crocodylomorpha: "Les crocodylomorphes sont le lignage d'archosaures à l'origine des crocodiles modernes. Au Mésozoïque, il existait des formes terrestres, marines et même bipèdes. Le Sarcosuchus du Crétacé pouvait dépasser 12 mètres.",
      },
      sizes: {
        pequeño:  "Les animaux de petite taille (moins d'1 mètre) représentent certains des organismes les plus primitifs et spécialisés du registre fossile. Leur taille réduite leur permettait d'exploiter des niches écologiques inaccessibles aux grands prédateurs, et dans de nombreux cas leur abondance en fait des fossiles indices clés pour dater les strates géologiques.",
        mediano:  "Les animaux de taille moyenne (1 à 5 mètres) constituent l'essentiel de la biodiversité préhistorique. Agiles et polyvalents, ils occupaient des rôles de prédateurs secondaires, d'herbivores généralistes et d'omnivores opportunistes dans presque tous les écosystèmes du passé.",
        grande:   "Les grands animaux (5 à 12 mètres) représentent certains des prédateurs et herbivores les plus emblématiques de l'histoire de la vie. Leur masse corporelle leur conférait des avantages défensifs et un accès aux ressources, bien qu'elle les ait également rendus plus vulnérables aux changements environnementaux et aux extinctions massives.",
        gigante:  "Les géants préhistoriques (plus de 12 mètres) sont les plus grands animaux ayant jamais peuplé la Terre. Des sauropodes titanosauridés au Megalodon et au Livyatan, ces colosses ont dominé leurs écosystèmes pendant des millions d'années et continuent de fasciner scientifiques et grand public.",
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  it: {
    header: {
      login: "Accedi",
      register: "Registrati",
      logout: "Disconnetti",
      config: "Impostazioni",
      lang: "Lingua",
      dark: "Modalità Scura",
      light: "Modalità Chiara",
      confirmLogout: "Sei sicuro di voler",
      exit: "uscire",
      keep: "Restare",
      confirm: "Conferma",
      subtitleDefault: "Tutto sul passato, nelle tue mani",
      favorites: "I Miei Preferiti",
      profile: "Il Mio Profilo",
    },

    landing: {
      heroTitle: "Esplora",
      heroTitleAccent: "il passato",
      heroSubtitle:
        "Seleziona un'era geologica per accedere ai registri fossili e alle ricostruzioni biologiche.",
      searchPlaceholder: "Cerca nell'archivio...",
      noResults: "Nessun risultato",
      filterDiets: "Diete",
      filterTypes: "Tipi",
      clearFilters: "Cancella",
      logoutTitle: "Sessione Chiusa",
      logoutSub: "Accesso limitato",

      eras: {
        paleozoico: {
          desc: "L'origine della vita complessa. Trilobiti, foreste di felci giganti e i primi anfibi.",
        },
        mesozoico: {
          desc: "L'era dei dinosauri. Triassico, Giurassico e Cretaceo. Il regno dei grandi rettili.",
        },
        cenozoico: {
          desc: "L'ascesa dei mammiferi. Megafauna, glaciazioni e l'evoluzione dei primati.",
        },
      },
    },

    eraPage: {
      backToEras: "Torna alle ere",
      backToPeriods: "Torna ai periodi",
      recordsOf: "REGISTRI",
      periodsOf: "PERIODI DEL",
      epochsOf: "EPOCHE DEL",
      classifiedAnimals: "Animali classificati",
      classifiedDinos: "Dinosauri classificati",
      wip: "In corso",

      mesozoico: {
        subtitle: "Registri del regno rettiliano",
        triasico: {
          desc: "Il rinascere dopo la grande estinzione. Compaiono i primi veri dinosauri e mammiferi.",
        },
        jurasico: {
          desc: "L'età d'oro dei giganti. L'Allosaurus e il Brachiosaurus dominano un mondo lussureggiante.",
        },
        cretacico: {
          desc: "La fine di un'era. Compaiono i fiori e il T-Rex regna prima dell'impatto del meteorite.",
        },
      },

      cenozoico: {
        subtitle: "Registri della megafauna recente",
        paleogeno: {
          desc: "L'alba dei mammiferi. Dopo l'estinzione dei dinosauri, la vita si riprende nelle foreste tropicali.",
        },
        neogeno: {
          desc: "L'era delle praterie. I mammiferi evolvono in forme giganti e compaiono i primi ominidi.",
        },
        cuaternario: {
          desc: "Grandi glaciazioni e l'ascesa degli umani moderni in un mondo di mammut e tigri dai denti a sciabola.",
        },
      },

      paleozoico: {
        subtitle: "Le fondamenta della vita complessa",
        cambrico: {
          desc: "Conosciuto per l'\"esplosione cambriana\", un rapido aumento nella diversità della vita marina.",
        },
        ordovicico: {
          desc: "Dominazione degli invertebrati marini, comparsa dei primi vertebrati e colonizzazione delle coste da piante primitive.",
        },
        silurico: {
          desc: "Stabilizzazione del clima dopo una glaciazione. Compaiono le prime piante vascolari terrestri e i pesci con mascelle.",
        },
        devonico: {
          desc: "L'\"Età dei Pesci\". Si diversificano enormemente e compaiono i primi tetrapodi e foreste primitive.",
        },
        carbonifero: {
          desc: "Espansione delle foreste giganti che hanno formato i depositi di carbone attuali. L'epoca degli insetti giganti.",
        },
        permico: {
          desc: "Formazione del supercontinente Pangea. Si conclude con la più grande estinzione di massa della storia.",
        },
      },

      paleogeno: {
        subtitle: "L'alba dei mammiferi moderni",
        paleoceno: {
          desc: "Il mondo dopo i dinosauri. Le foreste si espandono e i mammiferi arcaici iniziano la loro ascesa.",
        },
        eoceno: {
          desc: "Massimo termico e diversificazione. Compaiono gli antenati di balene, cavalli e primati.",
        },
        oligoceno: {
          desc: "L'espansione delle praterie. Il clima si raffredda, le foreste arretrano e emergono mammiferi giganti.",
        },
      },
    },

    dinoCard: {
      length: "Lunghezza",
      height: "Altezza",
      addedFav: "aggiunto ai preferiti",
      removedFav: "rimosso",
      authRequired: "Identificazione richiesta",
      systemError: "Errore di sistema",
    },

    dinoDetail: {
      backToRecords: "Torna ai registri",
      loading: "Accesso all'archivio...",
      length: "Lunghezza",
      height: "Altezza",
      diet: "Dieta",
      status: "Stato",
      extinct: "Estinto",
      alive: "Vivo",
      fossilConservation: "Conservazione fossile",
      specimenIntegrity: "Integrità del campione",
      method: "Metodo",
      material: "Materiale",
      extinction: "Estinzione",
      conservationExcellent: "Eccellente",
      conservationModerate: "Moderata",
      conservationFragmentary: "Frammentaria",
      type: "Tipo",
      era: "Era",
      discoveryMap: "Mappa dei ritrovamenti",
      comingSoon: "Prossimamente",
      relatedSpecies: "Specie correlate",
      authRequired: "Identificazione richiesta",
      addedFav: "Aggiunto ai preferiti",
      removedFav: "Rimosso dai preferiti",
      connectionError: "Errore di connessione",
    },

    favorites: {
      title: "I Miei",
      titleAccent: "Preferiti",
      subtitle: "esemplari salvati nei tuoi preferiti",
      loading: "Accesso ai tuoi preferiti.",
      emptyTitle: "Database vuoto — Nessun record salvato",
      startSearch: "Inizia Ricerca",
    },

    profile: {
      back: "Indietro",
      loading: "Caricamento profilo...",
      memberSince: "Membro da",
      section: {
        profileInfo: "Informazioni profilo",
        favorites: "I miei preferiti",
        language: "Lingua",
        changePassword: "Cambia password",
        dangerZone: "Zona pericolo",
      },
      field: {
        username: "Nome utente",
        email: "Email",
        bio: "Biografia",
        bioPlaceholder: "Raccontaci qualcosa di te...",
        currentPassword: "Password attuale",
        newPassword: "Nuova password",
        confirmPassword: "Conferma nuova password",
        passwordPlaceholder: "••••••••",
        usernamePlaceholder: "Il tuo nome",
      },
      saveChanges: "Salva modifiche",
      updatePassword: "Aggiorna password",
      chooseAvatar: "Scegli avatar",
      favEmpty: "Non hai ancora aggiunto nessun preferito",
      viewAll: "Vedi tutti i {n} preferiti →",
      dangerDesc:
        "Eliminare il tuo account è permanente. Perderai tutti i tuoi preferiti e dati del profilo.",
      deleteAccount: "Elimina il mio account",
      deleteModal: {
        title: "Conferma eliminazione",
        warning:
          "Questa azione non può essere annullata. Scrivi il tuo nome utente",
        warningEnd: "per confermare.",
        writeUsername: "Scrivi il tuo nome utente",
        writePassword: "La tua password",
        confirm: "Elimina per sempre",
        cancel: "Annulla",
      },
      toast: {
        profileUpdated: "Profilo aggiornato",
        saveError: "Errore nel salvataggio",
        passwordUpdated: "Password aggiornata",
        passwordMismatch: "Le password non corrispondono",
        passwordTooShort: "Minimo 6 caratteri",
        passwordError: "Errore nel cambio",
        nameMismatch: "Il nome non corrisponde",
        deleteError: "Errore nell'eliminazione",
      },
    },

    login: {
      title: "Accesso",
      userOrEmail: "Utente o Email",
      userPlaceholder: "Utente o Email",
      password: "Password",
      submit: "Entra nell'archivio",
      noAccount: "Non hai un account?",
      signUp: "Registrati",
    },

    register: {
      title: "Registrazione",
      titleAccent: "Nuovo Utente",
      username: "Nome utente",
      email: "Email",
      emailPlaceholder: "Indirizzo Email",
      password: "Password",
      confirmPassword: "Conferma Password",
      confirmPlaceholder: "Ripeti la password",
      submit: "Registrati",
      hasAccount: "Hai già un account?",
      signIn: "Accedi",
    },

    toast: {
      successLabel: "Sistema Aggiornato",
      errorLabel: "Avviso di Sicurezza",
    },

    typeLabels: {
      Theropod: "Teropode",
      Sauropod: "Sauropode",
      Avialae: "Uccello primitivo",
      Thyreophoran: "Tireoforo",
      Plesiosaur: "Plesiosauro",
      Chondrichthyes: "Condricte",
      Basal_arthropod: "Artropode basale",
      Basal_chordate: "Cordato basale",
      Mollusca: "Mollusco",
      Arthropoda: "Artropode",
      Agnatha: "Agnato",
      Saurischia: "Saurischi",
      Abelisauridae: "Abelisauride",
      Squamata: "Squamato",
      Mammalia: "Mammifero",
      Crocodylomorpha: "Crocodilomorfo",
    },

    archivo: {
      diets: {
        "Carnívoro":     "I carnivori erano predatori attivi o spazzini specializzati. Si caratterizzavano per denti affilati, artigli per afferrare le prede e un metabolismo adatto a digerire proteine animali. Dominavano la vetta delle catene alimentari in tutte le ere geologiche.",
        "Herbívoro":     "Gli erbivori svilupparono adattamenti straordinari per elaborare la vegetazione dura: denti trituratori a batteria, colli allungati per raggiungere le cime degli alberi o crani bassi per brucare il suolo. Costituivano la maggior parte della biomassa animale negli ecosistemi preistorici.",
        "Piscívoro":     "I piscivori erano specialisti nella cattura di pesci e altri animali acquatici. Svilupparono mascelle lunghe e strette con numerosi denti conici per afferrare prede scivolose, oltre a sensi adattati per rilevare i movimenti sott'acqua.",
        "Omnívoro":      "Gli onnivori avevano una dieta flessibile che combinava materiale vegetale e animale. Questa versatilità conferiva loro un enorme vantaggio adattivo, permettendo loro di sopravvivere in ambienti mutevoli e sfruttare risorse che altri animali non potevano sfruttare.",
        "Insectívoro":   "Gli insettivori si specializzarono nella cattura di artropodi e invertebrati. Di solito erano animali piccoli e agili con sensi acuti, lingue appiccicose o artigli adattati per scavare. Svolgevano un ruolo chiave nel controllo delle popolazioni di insetti.",
        "Carroñero":     "Gli spazzini si nutrivano principalmente di carcasse e resti di animali morti. Lungi dall'essere opportunisti passivi, molti erano competitori aggressivi capaci di cacciare altri predatori dalle loro prede. Il loro ruolo era essenziale per il riciclaggio dei nutrienti nell'ecosistema.",
        "Filtrador":     "I filtratori estraevano microrganismi e particelle organiche dall'acqua o dal sedimento. Svilupparono strutture specializzate come fanoni, branchie modificate o appendici filtranti. Erano fondamentali per il riciclaggio dei nutrienti negli ecosistemi marini.",
        "Detritívoro":   "I detritivori si nutrivano di materia organica in decomposizione: foglie morte, carcasse e sedimenti ricchi di nutrienti. Agivano come i riciclatori dell'ecosistema, decomponendo materia complessa e rilasciando nutrienti nel suolo e nell'acqua.",
        "Fotosintético": "Gli organismi fotosintetici convertivano l'energia solare in materia organica, costituendo la base di quasi tutte le catene alimentari. Nella preistoria includevano alghe giganti, piante vascolari primitive e microrganismi responsabili dell'ossigenazione dell'atmosfera terrestre.",
      },
      types: {
        Theropod:        "I teropodi erano dinosauri bipedi con arti anteriori ridotti e zampe posteriori potenti. Vanno dal gigantesco Tyrannosaurus rex agli uccelli moderni, i loro unici discendenti viventi. Si caratterizzano per ossa cave, artigli curvi e, in molte specie, piume.",
        Sauropod:        "I sauropodi furono i più grandi animali terrestri mai esistiti. Il loro piano corporeo — collo e coda estremamente lunghi, corpo massiccio su quattro colonne — permetteva loro di raggiungere vegetazione inaccessibile agli altri erbivori. L'Argentinosaurus potrebbe aver superato le 70 tonnellate.",
        Avialae:         "Le avialae sono il gruppo che include gli uccelli moderni e i loro parenti estinti più prossimi. Si sono evolute da teropodi piumati durante il Giurassico e si caratterizzano per ali funzionali, scheletro molto leggero e, nelle forme primitive, conservavano ancora denti e artigli sulle ali.",
        Thyreophoran:    "I tireofori erano dinosauri ornitischi protetti da placche ossee, spine e scudi dermici. Includono gli stegosauridi con le loro iconiche placche dorsali, e gli anchilosauridi, vere fortezze ambulanti con code a mazza capaci di rompere le ossa.",
        Plesiosaur:      "I plesiosauri dominarono i mari del Mesozoico per oltre 135 milioni di anni. Si dividevano in due grandi gruppi: quelli a collo lungo e testa piccola (plesiosauroidi) e quelli a collo corto e testa enorme (pliosauridi). Si propellavano con quattro pinne a forma di pagaia.",
        Chondrichthyes:  "I condricti sono pesci con scheletro cartilagineo, il gruppo che include squali, razze e chimere. Con oltre 450 milioni di anni di storia, sono uno dei lignaggi di vertebrati più antichi e di successo. Alcuni, come il Megalodon, raggiungevano i 18 metri di lunghezza.",
        Basal_arthropod: "Gli artropodi basali includono le forme più primitive di questo phylum, come i trilobiti e gli anomalocaridi. Dominarono i mari del Cambriano e dell'Ordoviciano e rappresentano i primi animali con scheletro esterno e appendici articolate noti nel registro fossile.",
        Basal_chordate:  "I cordati basali sono i primi animali con notocorda — il precursore della colonna vertebrale. Forme come Pikaia o i primi pesci senza mascella (agnati) rappresentano le origini del nostro stesso lignaggio evolutivo, oltre 500 milioni di anni fa.",
        Mollusca:        "I molluschi sono uno dei phyla animali più diversificati e antichi. Includono cefalopodi estinti come ammoniti e belemniti che dominarono i mari mesozoici, nonché nautiloides giganti del Paleozoico. Si caratterizzano per il loro corpo morbido e, in molti casi, conchiglia protettiva.",
        Arthropoda:      "Gli artropodi sono il gruppo animale più diversificato della storia. In preistoria includevano scorpioni marini (euripteridi) superiori a 2 metri, insetti giganti del Carbonifero come la libellula Meganeura, e miriapodi giganti come Arthropleura.",
        Agnatha:         "Gli agnati sono i vertebrati più primitivi: pesci senza mascella come lamprede e missine, i cui parenti estinti — conodonti e ostracodermi — dominavano i mari dell'Ordoviciano e del Devoniano. Il loro studio è fondamentale per comprendere le origini della colonna vertebrale e delle mascelle.",
        Saurischia:      "I saurischi sono uno dei due grandi ordini di dinosauri, caratterizzati da un bacino con il pube rivolto in avanti. Includono tutti i teropodi e i sauropodi, rendendoli il gruppo di dinosauri più conosciuto e iconico.",
        Abelisauridae:   "Gli abelisauridi erano teropodi carnivori che dominavano i supercontinenti dell'emisfero meridionale durante il Cretaceo. Si caratterizzano per crani molto corti e robusti con ossa rugose e arti anteriori estremamente ridotti — ancora di più rispetto al T. rex.",
        Squamata:        "Gli squamati includono lucertole e serpenti, il gruppo di rettili più diversificato oggi. Nel Mesozoico comprendevano i mosasauri, enormi rettili marini che potevano superare i 17 metri e dominavano gli oceani del Cretaceo tardivo.",
        Mammalia:        "I mammiferi preistorici vanno dai piccoli insettivori che convivevano con i dinosauri alla megafauna del Pleistocene: mammut lanosi, rinoceronti lanosi, bradipi giganti e il Paraceratherium, il più grande mammifero terrestre conosciuto.",
        Crocodylomorpha: "I crocodilomorfi sono il lignaggio di arcosauri che ha dato origine ai coccodrilli moderni. Nel Mesozoico esistevano forme terrestri, marine e persino bipedi. Il Sarcosuchus del Cretaceo poteva superare i 12 metri.",
      },
      sizes: {
        pequeño:  "Gli animali di piccola taglia (meno di 1 metro) rappresentano alcuni degli organismi più primitivi e specializzati del registro fossile. Le loro dimensioni ridotte permettevano loro di sfruttare nicchie ecologiche inaccessibili ai grandi predatori, e in molti casi la loro abbondanza li rende fossili indice fondamentali per datare gli strati geologici.",
        mediano:  "Gli animali di taglia media (da 1 a 5 metri) costituiscono la maggior parte della biodiversità preistorica. Agili e versatili, occupavano ruoli di predatori secondari, erbivori generalisti e onnivori opportunisti in quasi tutti gli ecosistemi del passato.",
        grande:   "Gli animali di grossa taglia (da 5 a 12 metri) rappresentano alcuni dei predatori ed erbivori più iconici della storia della vita. La loro massa corporea conferiva vantaggi difensivi e di accesso alle risorse, sebbene li rendesse anche più vulnerabili ai cambiamenti ambientali e alle estinzioni di massa.",
        gigante:  "I giganti preistorici (oltre 12 metri) sono gli animali più grandi che abbiano mai popolato la Terra. Dai sauropodi titanosauridi al Megalodon e al Livyatan, questi colossi hanno dominato i loro ecosistemi per milioni di anni e continuano ad affascinare scienziati e appassionati.",
      },
    },
  },
};