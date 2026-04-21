// src/data/translations.js
// Cubre: header, landing, eras (paleozoico/mesozoico/cenozoico/paleogeno),
//        periodos (era pages), dinoCard, dinoDetail, favorites, profile,
//        login, register, toast, common

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
      recordsOf: "Registros",
      periodsOf: "Periodos del",
      epochsOf: "Épocas del",
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

    // ── TIPOS (labels en filtro y DinoCard) ───────────────────────────────
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

    // ── DIETAS ────────────────────────────────────────────────────────────
    dietLabels: {
      Carnívoro: "Carnívoro",
      Herbívoro: "Herbívoro",
      Omnívoro: "Omnívoro",
      Filtrador: "Filtrador",
      Insectívoro: "Insectívoro",
      Piscívoro: "Piscívoro",
      Carroñero: "Carroñero",
      Detritívoro: "Detritívoro",
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
      recordsOf: "Records",
      periodsOf: "Periods of",
      epochsOf: "Epochs of",
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

    dietLabels: {
      Carnívoro: "Carnivore",
      Herbívoro: "Herbivore",
      Omnívoro: "Omnivore",
      Filtrador: "Filter feeder",
      Insectívoro: "Insectivore",
      Piscívoro: "Piscivore",
      Carroñero: "Scavenger",
      Detritívoro: "Detritivore",
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
      recordsOf: "Registres",
      periodsOf: "Périodes du",
      epochsOf: "Époques du",
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

    dietLabels: {
      Carnívoro: "Carnivore",
      Herbívoro: "Herbivore",
      Omnívoro: "Omnivore",
      Filtrador: "Filtreur",
      Insectívoro: "Insectivore",
      Piscívoro: "Piscivore",
      Carroñero: "Charognard",
      Detritívoro: "Détrivore",
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
      recordsOf: "Registri",
      periodsOf: "Periodi del",
      epochsOf: "Epoche del",
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

    dietLabels: {
      Carnívoro: "Carnivoro",
      Herbívoro: "Erbivoro",
      Omnívoro: "Onnivoro",
      Filtrador: "Filtratore",
      Insectívoro: "Insettivoro",
      Piscívoro: "Piscivoro",
      Carroñero: "Spazzino",
      Detritívoro: "Detritofago",
    },
  },
};
