// --- BASE DE DATOS GLOWY (NEUTRO) ---

const rutinasData = [
    {
        nombre: "Core & Pilates",
        duracion_estimada: "20 min",
        descr_corta: "Fortalece el centro del cuerpo con control y precisión.",
        tipo: "pilates",
        imagen: "assets/pilates.jpeg",
        ejercicios: [
            { nombre_ejercicio: "The Hundred", repeticiones: "10 respiraciones", peso: null },
            { nombre_ejercicio: "Plancha Abdominal", repeticiones: "3 x 45 seg", peso: null },
            { nombre_ejercicio: "Leg Raises", repeticiones: "12 repeticiones", peso: null }
        ]
    },
    {
        nombre: "Fuerza Total",
        duracion_estimada: "50 min",
        descr_corta: "Entrenamiento de alta intensidad para todo el cuerpo.",
        tipo: "gimnasio",
        imagen: "assets/gimnasio_chico.jpeg",
        ejercicios: [
            { nombre_ejercicio: "Sentadilla Libre", repeticiones: "10", peso: "Moderado" },
            { nombre_ejercicio: "Peso Muerto", repeticiones: "8", peso: "Pesado" },
            { nombre_ejercicio: "Press de Banca", repeticiones: "10", peso: "Moderado" }
        ]
    },
    {
        nombre: "Mindset Reset",
        duracion_estimada: "10 min",
        descr_corta: "Despeja la mente y reduce el estrés.",
        tipo: "meditacion",
        imagen: "assets/yoga.jpeg",
        ejercicios: [
            { nombre_ejercicio: "Box Breathing", repeticiones: "5 min", peso: null },
            { nombre_ejercicio: "Visualización", repeticiones: "5 min", peso: null }
        ]
    }
];

const recetasData = [
    {
        nombre_receta: "Porridge Energético",
        duracion_estimada: "10 min",
        tipo: "snack", 
        descr_corta: "Carbohidratos complejos para rendimiento mental.",
        imagen: "assets/bol_avena.jpeg",
        ingredientes: {
            "Avena integral suave": "50g",
            "Leche o bebida vegetal": "200ml",
            "Canela en polvo": "1 cdta",
            "Plátano maduro": "1 unidad"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Cocción", descripcion: "Calienta el líquido y añade la avena." },
            { numero_paso: 2, nombre_paso: "Consistencia", descripcion: "Remueve hasta obtener la textura deseada." },
            { numero_paso: 3, nombre_paso: "Servir", descripcion: "Añade la fruta y frutos secos." }
        ]
    },
    {
        nombre_receta: "Bowl de Proteína y Salmón",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "Nutrición completa con grasas saludables.",
        imagen: "assets/poke.jpeg",
        ingredientes: {
            "Arroz integral cocido": "150g",
            "Salmón fresco (lomo)": "120g",
            "Aguacate": "1/2 unidad",
            "Edamame pelado": "50g",
            "Salsa de soja o Tamari": "1 cda"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Base", descripcion: "Coloca el arroz en el fondo del bowl." },
            { numero_paso: 2, nombre_paso: "Corte", descripcion: "Corta el salmón y verduras en cubos." },
            { numero_paso: 3, nombre_paso: "Emplatado", descripcion: "Distribuye los ingredientes y añade el aderezo." }
        ]
    },
    {
        nombre_receta: "Energy Balls de Cacao",
        duracion_estimada: "15 min",
        tipo: "postre",
        descr_corta: "Snack rápido pre-entreno.",
        imagen: "assets/trufas_chocolate.jpeg",
        ingredientes: {
            "Dátiles sin hueso (Medjool)": "10-12 uds",
            "Cacao puro 100%": "2 cdas",
            "Almendras o nueces": "60g",
            "Coco rallado": "30g (cobertura)"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Procesar", descripcion: "Tritura los ingredientes secos y dátiles." },
            { numero_paso: 2, nombre_paso: "Compactar", descripcion: "Forma esferas compactas con las manos." },
            { numero_paso: 3, nombre_paso: "Enfriar", descripcion: "Refrigera 10 minutos antes de consumir." }
        ]
    }
];

const citasMotivacion = [
    // Citas generales y estoicas (Neutras)
    { texto: "No es lo que te pasa, sino cómo reaccionas a lo que te pasa.", autor: "Epicteto" },
    { texto: "La disciplina es elegir entre lo que quieres ahora y lo que quieres más.", autor: "Abraham Lincoln" },
    { texto: "Somos lo que hacemos repetidamente. La excelencia, entonces, no es un acto, sino un hábito.", autor: "Aristóteles" },
    { texto: "El mejor proyecto en el que trabajarás eres tú mismo.", autor: "Anónimo" },
    
    // Mentalidad de crecimiento
    { texto: "Hecho es mejor que perfecto.", autor: "Sheryl Sandberg" },
    { texto: "Si quieres llegar rápido, camina solo. Si quieres llegar lejos, camina acompañado.", autor: "Proverbio Africano" },
    { texto: "Tu única competencia es quien eras ayer.", autor: "Filosofía Glowy" },
    { texto: "Sé el protagonista de tu vida, no un espectador.", autor: "Anónimo" },
    
    // Bienestar integral
    { texto: "Un exterior saludable comienza en tu interior.", autor: "Robert Urich" },
    { texto: "Cuida tu cuerpo, es el único lugar que tienes para vivir.", autor: "Jim Rohn" },
    { texto: "El descanso es una parte vital del rendimiento.", autor: "Filosofía Glowy" },
    { texto: "La verdadera fuerza es el dominio de la propia mente.", autor: "Séneca" }
];