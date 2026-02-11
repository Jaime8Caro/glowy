// --- BASE DE DATOS GLOWY ---

const rutinasData = [
    {
        nombre: "Morning Pilates",
        duracion_estimada: "20 min",
        descr_corta: "Despierta tu cuerpo con suavidad y control.",
        tipo: "pilates",
        imagen: "assets/pilates.jpeg",
        ejercicios: [
            { nombre_ejercicio: "The Hundred", repeticiones: "10 respiraciones", peso: null },
            { nombre_ejercicio: "Roll Up", repeticiones: "5 veces", peso: null },
            { nombre_ejercicio: "Single Leg Circle", repeticiones: "5 cada pierna", peso: null }
        ]
    },
    {
        nombre: "Full Body Gym",
        duracion_estimada: "45 min",
        descr_corta: "Rutina de fuerza para tonificar todo el cuerpo.",
        tipo: "gimnasio",
        imagen: "assets/gimnasio.jpeg",
        ejercicios: [
            { nombre_ejercicio: "Sentadilla Goblet", repeticiones: "12", peso: "10kg" },
            { nombre_ejercicio: "Peso Muerto Rumano", repeticiones: "10", peso: "20kg" },
            { nombre_ejercicio: "Press Militar", repeticiones: "10", peso: "5kg" }
        ]
    },
    {
        nombre: "Calma Mental",
        duracion_estimada: "10 min",
        descr_corta: "Reduce la ansiedad antes de dormir.",
        tipo: "meditacion",
        imagen: "assets/yoga.jpeg",
        ejercicios: [
            { nombre_ejercicio: "Respiración 4-7-8", repeticiones: "5 min", peso: null },
            { nombre_ejercicio: "Escaneo Corporal", repeticiones: "5 min", peso: null }
        ]
    }
];

const recetasData = [
    {
        nombre_receta: "Porridge de Avena y Frutos Rojos",
        duracion_estimada: "10 min",
        tipo: "snack", // o desayuno
        descr_corta: "Energía sostenida para estudiar toda la mañana.",
        imagen: "assets/bol_avena.jpeg",
        ingredientes: ["50g avena", "200ml leche vegetal", "Canela", "Frutos rojos"],
        pasos: [
            { numero_paso: 1, nombre_paso: "Cocción", descripcion: "Calienta la leche y añade la avena." },
            { numero_paso: 2, nombre_paso: "Textura", descripcion: "Remueve a fuego lento hasta que espese." },
            { numero_paso: 3, nombre_paso: "Toppings", descripcion: "Sirve y decora con la fruta." }
        ]
    },
    {
        nombre_receta: "Poke Bowl de Salmón",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "Comida completa, fresca y muy estética.",
        imagen: "assets/poke.jpeg",
        ingredientes: ["Arroz sushi", "Salmón fresco", "Aguacate", "Pepino", "Soja"],
        pasos: [
            { numero_paso: 1, nombre_paso: "Base", descripcion: "Pon el arroz cocido en el fondo." },
            { numero_paso: 2, nombre_paso: "Corte", descripcion: "Corta el salmón y verduras en cubos." },
            { numero_paso: 3, nombre_paso: "Montaje", descripcion: "Coloca todo por secciones y añade salsa." }
        ]
    },
    {
        nombre_receta: "Trufas de Dátil y Cacao",
        duracion_estimada: "15 min",
        tipo: "postre",
        descr_corta: "El dulce perfecto sin azúcar refinado.",
        imagen: "assets/trufas_chocolate.jpeg",
        ingredientes: ["10 dátiles", "Cacao puro", "Nueces", "Coco rallado"],
        pasos: [
            { numero_paso: 1, nombre_paso: "Procesar", descripcion: "Tritura los dátiles y nueces." },
            { numero_paso: 2, nombre_paso: "Formar", descripcion: "Haz bolitas con las manos." },
            { numero_paso: 3, nombre_paso: "Cobertura", descripcion: "Reboza en coco o cacao." }
        ]
    }
];

const citasMotivacion = [
    { texto: "El amor propio es el comienzo de un romance que dura toda la vida.", autor: "Oscar Wilde" },
    { texto: "No necesitas ser perfecta para empezar, pero necesitas empezar para ser grandiosa.", autor: "Anónimo" },
    { texto: "Tu cuerpo escucha todo lo que tu mente dice. Sé amable.", autor: "Glowy Mantra" },
    { texto: "La disciplina es el puente entre tus metas y tus logros.", autor: "Jim Rohn" },
    { texto: "Pequeños cambios diarios crean resultados masivos con el tiempo.", autor: "Robin Sharma" },
    { texto: "Cuida tu cuerpo. Es el único lugar que tienes para vivir.", autor: "Jim Rohn" },
    { texto: "Brilla con luz propia, el resto es solo sombra.", autor: "Glowy Mantra" }
];