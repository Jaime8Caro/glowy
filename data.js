// --- BASE DE DATOS GLOWY (NEUTRO) ---

const rutinasData = [
    {
        nombre: "Core & Pilates",
        duracion_estimada: "20 min",
        descr_corta: "Fortalece el centro del cuerpo y mejora tu postura.",
        tipo: "pilates",
        imagen: "assets/pilates.jpeg",
        ejercicios: [
            { 
                nombre_ejercicio: "The Hundred", 
                repeticiones: "10 ciclos respiratorios", 
                peso: null,
                descripcion: "Tumbada boca arriba, eleva cabeza y hombros. Bombea los brazos firmemente."
            },
            { 
                nombre_ejercicio: "Plancha Abdominal", 
                repeticiones: "3 x 45 seg", 
                peso: null,
                descripcion: "Cuerpo en línea recta desde la cabeza a los talones. Activa glúteos y abdomen."
            },
            { 
                nombre_ejercicio: "Leg Raises", 
                repeticiones: "12 repeticiones", 
                peso: null,
                descripcion: "Baja las piernas controladamente sin que se arquee la zona lumbar."
            },
            { 
                nombre_ejercicio: "Criss-Cross", 
                repeticiones: "20 alternando", 
                peso: null,
                descripcion: "Lleva el codo a la rodilla contraria girando el torso para trabajar oblicuos."
            }
        ]
    },
    {
        nombre: "Fuerza Total (Gym)",
        duracion_estimada: "50 min",
        descr_corta: "Entrenamiento de compuestos para construir base muscular.",
        tipo: "gimnasio",
        imagen: "assets/gimnasio_chico.jpeg",
        ejercicios: [
            { 
                nombre_ejercicio: "Sentadilla Libre", 
                repeticiones: "4 series x 8-10", 
                peso: "Moderado/Alto",
                descripcion: "Pies ancho de hombros, baja profundo manteniendo el pecho erguido."
            },
            { 
                nombre_ejercicio: "Peso Muerto", 
                repeticiones: "3 series x 8", 
                peso: "Pesado",
                descripcion: "Levanta la barra pegada a las espinillas usando caderas y piernas."
            },
            { 
                nombre_ejercicio: "Press de Banca", 
                repeticiones: "4 series x 10", 
                peso: "Moderado",
                descripcion: "Baja la barra controlado hasta el pecho y empuja con fuerza."
            },
            { 
                nombre_ejercicio: "Remo con Barra", 
                repeticiones: "4 series x 10", 
                peso: "Moderado",
                descripcion: "Tronco inclinado, tira de la barra hacia el ombligo retrayendo escápulas."
            }
        ]
    },
    {
        nombre: "Cardio Mañanero",
        duracion_estimada: "15 min",
        descr_corta: "Activa tu metabolismo sin necesidad de material.",
        tipo: "cardio",
        imagen: "assets/cinta_correr.jpeg",
        ejercicios: [
            { 
                nombre_ejercicio: "Jumping Jacks", 
                repeticiones: "1 min", 
                peso: null,
                descripcion: "Saltos abriendo y cerrando piernas y brazos coordinadamente."
            },
            { 
                nombre_ejercicio: "Mountain Climbers", 
                repeticiones: "45 seg", 
                peso: null,
                descripcion: "En posición de plancha, lleva rodillas al pecho alternativamente a buen ritmo."
            },
            { 
                nombre_ejercicio: "Sentadilla con Salto", 
                repeticiones: "15 reps", 
                peso: null,
                descripcion: "Haz una sentadilla y explota hacia arriba despegando los pies del suelo."
            },
            { 
                nombre_ejercicio: "Burpees (Sin flexión)", 
                repeticiones: "10 reps", 
                peso: null,
                descripcion: "Baja a plancha, recoge piernas y salta arriba. Ritmo constante."
            }
        ]
    },
    {
        nombre: "Piernas de Acero",
        duracion_estimada: "40 min",
        descr_corta: "Enfoque en cuádriceps, femorales y glúteos.",
        tipo: "fuerza",
        imagen: "assets/gimnasio_chica.jpeg",
        ejercicios: [
            { 
                nombre_ejercicio: "Zancadas (Lunges)", 
                repeticiones: "12 por pierna", 
                peso: "Mancuernas",
                descripcion: "Paso largo adelante, baja la rodilla trasera casi al suelo."
            },
            { 
                nombre_ejercicio: "Peso Muerto Rumano", 
                repeticiones: "12 repeticiones", 
                peso: "Mancuernas",
                descripcion: "Baja el peso rozando las piernas, caderas atrás, notando estiramiento femoral."
            },
            { 
                nombre_ejercicio: "Goblet Squat", 
                repeticiones: "15 repeticiones", 
                peso: "1 Mancuerna",
                descripcion: "Sujeta la pesa al pecho y baja en sentadilla profunda."
            },
            { 
                nombre_ejercicio: "Elevación de Gemelos", 
                repeticiones: "20 repeticiones", 
                peso: "Corporal/Pesa",
                descripcion: "De puntillas y baja lento. Aguanta 1 seg arriba."
            }
        ]
    },
    {
        nombre: "Upper Body (Mancuernas)",
        duracion_estimada: "30 min",
        descr_corta: "Tonifica brazos, hombros y espalda en casa.",
        tipo: "fuerza",
        imagen: "assets/mancuernas.jpeg", // Asegúrate de tener esta foto o usa defecto.png
        ejercicios: [
            { 
                nombre_ejercicio: "Press Militar", 
                repeticiones: "12 repeticiones", 
                peso: "Mancuernas",
                descripcion: "Sentado o de pie, empuja las pesas desde los hombros hasta estirar brazos."
            },
            { 
                nombre_ejercicio: "Curl de Bíceps", 
                repeticiones: "15 repeticiones", 
                peso: "Mancuernas",
                descripcion: "Codos pegados al cuerpo, sube las pesas contrayendo el brazo."
            },
            { 
                nombre_ejercicio: "Remo Unilateral", 
                repeticiones: "12 por lado", 
                peso: "Mancuerna",
                descripcion: "Apóyate en una silla/banco y tira de la pesa hacia la cadera."
            },
            { 
                nombre_ejercicio: "Extensiones Tríceps", 
                repeticiones: "15 repeticiones", 
                peso: "1 Mancuerna",
                descripcion: "Pesa tras nuca, extiende los codos hacia el techo."
            }
        ]
    },
    {
        nombre: "Mindset Reset",
        duracion_estimada: "10 min",
        descr_corta: "Despeja la mente y reduce el estrés.",
        tipo: "meditacion",
        imagen: "assets/yoga.jpeg",
        ejercicios: [
            { 
                nombre_ejercicio: "Box Breathing", 
                repeticiones: "5 min", 
                peso: null,
                descripcion: "Inhala 4s, retén 4s, exhala 4s, espera 4s. Repite el ciclo."
            },
            { 
                nombre_ejercicio: "Escaneo Corporal", 
                repeticiones: "5 min", 
                peso: null,
                descripcion: "Tumbado, lleva tu atención progresivamente de los pies a la cabeza."
            }
        ]
    }
];

const recetasData = [
    {
        nombre_receta: "Porridge Energético",
        duracion_estimada: "10 min",
        tipo: "snack", 
        descr_corta: "Carbohidratos de absorción lenta para estudiar o entrenar.",
        imagen: "assets/bol_avena.jpeg",
        macros: { calorias: "320 kcal", proteina: "12g", carbs: "54g", grasas: "6g" },
        ingredientes: {
            "Avena integral suave": "50g",
            "Leche o bebida vegetal": "200ml",
            "Canela en polvo": "1 cdta",
            "Plátano maduro": "1 unidad"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Mezcla inicial", descripcion: "Pon la avena y la leche en un cazo pequeño. Enciende el fuego a nivel medio y añade la canela desde el principio para que infusione bien." },
            { numero_paso: 2, nombre_paso: "La textura clave", descripcion: "Cuando empiece a burbujear, baja el fuego al mínimo. No dejes de remover suavemente durante 3-4 minutos hasta que veas que tiene textura de papilla cremosa, no líquida." },
            { numero_paso: 3, nombre_paso: "Toppings", descripcion: "Vierte en un bol. Corta el plátano en rodajas finas y colócalo encima. Si quieres, añade un chorrito extra de leche fría alrededor." }
        ]
    },
    {
        nombre_receta: "Bowl de Salmón (Poke)",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "Omega-3 y proteínas de alta calidad. Fresco y rápido.",
        imagen: "assets/poke.jpeg",
        macros: { calorias: "480 kcal", proteina: "28g", carbs: "45g", grasas: "22g" },
        ingredientes: {
            "Arroz integral cocido": "150g",
            "Salmón fresco (lomo)": "120g",
            "Aguacate": "1/2 unidad",
            "Edamame pelado": "50g",
            "Salsa de soja": "1 cda"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Preparar la base", descripcion: "Si el arroz está recién hecho, déjalo enfriar un poco. Colócalo en el fondo del bol presionando ligeramente para hacer una 'cama' plana." },
            { numero_paso: 2, nombre_paso: "Corte preciso", descripcion: "Corta el salmón en dados de 2cm (tamaño bocado). Corta el aguacate en láminas finas. Cuanto más uniforme sea el corte, mejor quedará la presentación." },
            { numero_paso: 3, nombre_paso: "Montaje", descripcion: "Coloca cada ingrediente (salmón, aguacate, edamame) agrupado en su propia sección sobre el arroz, sin mezclar. Rocía la salsa de soja justo antes de comer." }
        ]
    },
    {
        nombre_receta: "Energy Balls de Cacao",
        duracion_estimada: "15 min",
        tipo: "postre",
        descr_corta: "El sustituto perfecto a la bollería industrial.",
        imagen: "assets/trufas_chocolate.jpeg",
        macros: { calorias: "180 kcal", proteina: "5g", carbs: "22g", grasas: "10g" },
        ingredientes: {
            "Dátiles sin hueso": "10-12 uds",
            "Cacao puro 100%": "2 cdas",
            "Almendras o nueces": "60g",
            "Coco rallado": "Cobertura"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Triturado", descripcion: "Pon los dátiles, el cacao y los frutos secos en una procesadora. Tritura hasta que se forme una pasta pegajosa que se separa de las paredes." },
            { numero_paso: 2, nombre_paso: "Forma manual", descripcion: "Truco: Mójate ligeramente las manos con agua para que no se te pegue. Coge pequeñas porciones de masa y haz bolitas rodándolas entre las palmas." },
            { numero_paso: 3, nombre_paso: "Acabado", descripcion: "Pasa cada bolita por un plato con coco rallado para rebozarlas. Mételas 10 minutos al frigo para que cojan firmeza." }
        ]
    },
    {
        nombre_receta: "Burritos de Pollo Fit",
        duracion_estimada: "25 min",
        tipo: "salado",
        descr_corta: "Comida completa en un solo envoltorio. Ideal para llevar.",
        imagen: "assets/burritos.jpeg",
        macros: { calorias: "520 kcal", proteina: "35g", carbs: "48g", grasas: "18g" },
        ingredientes: {
            "Tortillas de trigo grandes": "2 unidades",
            "Pechuga de pollo": "200g",
            "Pimiento rojo/verde": "1/2 unidad",
            "Frijoles negros/rojos": "100g",
            "Queso rallado ligero": "30g"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "El relleno", descripcion: "Corta el pollo y los pimientos en tiras. Saltea en una sartén con una gota de aceite a fuego fuerte hasta que el pollo esté dorado." },
            { numero_paso: 2, nombre_paso: "Calentar tortilla", descripcion: "Muy importante: Calienta las tortillas 10 segundos en el microondas o sartén. Si están frías, se romperán al doblarlas." },
            { numero_paso: 3, nombre_paso: "Envoltura", descripcion: "Pon el relleno en el centro, añade los frijoles y el queso. Dobla los bordes laterales hacia adentro primero, y luego enrolla desde abajo apretando bien." }
        ]
    },
    {
        nombre_receta: "Pollo Teriyaki Casero",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "Salsa brillante y pegajosa sin azúcares refinados.",
        imagen: "assets/pollo_teriyaki.jpeg",
        macros: { calorias: "450 kcal", proteina: "30g", carbs: "60g", grasas: "8g" },
        ingredientes: {
            "Pechuga de pollo": "200g",
            "Arroz basmati cocido": "150g",
            "Salsa de soja": "3 cdas",
            "Miel": "1 cda",
            "Maicena (Almidón)": "1 cdta"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Dorar el pollo", descripcion: "Corta el pollo en dados. En una sartén caliente, cocínalo hasta que esté dorado por fuera y resérvalo en un plato aparte." },
            { numero_paso: 2, nombre_paso: "La salsa mágica", descripcion: "En la misma sartén (fuera del fuego), mezcla la soja, la miel, medio vaso de agua y la maicena. Remueve bien para que no queden grumos." },
            { numero_paso: 3, nombre_paso: "Espesar", descripcion: "Vuelve a poner la sartén al fuego medio. Cuando la salsa empiece a burbujear y espese (parecerá caramelo), echa el pollo de nuevo y remueve para que se impregne bien." }
        ]
    },
    {
        nombre_receta: "Albóndigas de la Abuela",
        duracion_estimada: "35 min",
        tipo: "salado",
        descr_corta: "Reconfortantes, jugosas y ricas en proteína.",
        imagen: "assets/albondigas.jpg",
        macros: { calorias: "490 kcal", proteina: "32g", carbs: "15g", grasas: "28g" },
        ingredientes: {
            "Carne picada (Ternera/Mix)": "250g",
            "Huevo pequeño": "1 unidad",
            "Pan rallado": "2 cdas",
            "Salsa de tomate natural": "200g",
            "Guisantes (opcional)": "50g"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "La masa", descripcion: "En un bol, mezcla la carne con el huevo, el pan rallado, sal y pimienta. Amasa con las manos limpias hasta que todo esté integrado." },
            { numero_paso: 2, nombre_paso: "Sellado", descripcion: "Forma bolas del tamaño de una nuez. Dóralas en una sartén con un poco de aceite a fuego fuerte solo para sellarlas por fuera (por dentro seguirán crudas)." },
            { numero_paso: 3, nombre_paso: "Chup Chup", descripcion: "Baja el fuego, añade la salsa de tomate y los guisantes a la sartén con las albóndigas. Tapa y deja cocinar suave 10-15 minutos para que se hagan por dentro." }
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