// =======================================================
//  GLOWY — BASE DE DATOS
//  Secciones:
//  1. rutinasData   (gimnasio, pilates, meditación)
//  2. recetasData   (salado, snack, postre)
//  3. citasMotivacion
// =======================================================


// =======================================================
//  1. RUTINAS
// =======================================================

const rutinasData = [

    // ─── GIMNASIO ───────────────────────────────────────

    {
        nombre: "Full Body Principiante",
        duracion_estimada: "45 min",
        descr_corta: "Entrenamiento de cuerpo completo para quienes empiezan. Máquinas guiadas + pesos libres básicos. 3 días/semana con descanso entre sesiones.",
        tipo: "gimnasio",
        imagen: "assets/full_body_gym.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Prensa de Piernas",
                repeticiones: "3 series × 12 reps",
                peso: "Carga media (ajusta en máquina)",
                descripcion: "Pies a la anchura de las caderas. Baja la plataforma controlado hasta 90° y empuja sin bloquear las rodillas arriba del todo. Descansa 60 seg entre series."
            },
            {
                nombre_ejercicio: "Remo en Máquina (Seated Row)",
                repeticiones: "3 series × 12 reps",
                peso: "Carga media",
                descripcion: "Agarra el cable con los codos cerca del cuerpo y tira hacia el ombligo retrayendo las escápulas. Suelta lento en 3 segundos. Espalda recta en todo momento."
            },
            {
                nombre_ejercicio: "Press de Pecho en Máquina",
                repeticiones: "3 series × 12 reps",
                peso: "Carga media",
                descripcion: "Asientos a la altura del pecho. Empuja sin hiperextender los codos. Baja hasta que los codos formen 90° y vuelve lento. Máquina más segura que barra para empezar."
            },
            {
                nombre_ejercicio: "Jalón al Pecho (Lat Pulldown)",
                repeticiones: "3 series × 10 reps",
                peso: "Carga media-baja",
                descripcion: "Agarre algo más ancho que los hombros. Tira hacia la parte superior del pecho con los codos apuntando al suelo. Crucial: no balancees el torso hacia atrás."
            },
            {
                nombre_ejercicio: "Plancha Abdominal",
                repeticiones: "3 series × 30 seg",
                peso: "Peso corporal",
                descripcion: "Codos debajo de los hombros, cuerpo en línea recta. Aprieta glúteos y abdomen. Si 30 seg es demasiado, empieza por 15. Descansa 45 seg entre series."
            }
        ]
    },

    {
        nombre: "Tren Superior (Intermedio)",
        duracion_estimada: "55 min",
        descr_corta: "Sesión dedicada a pecho, espalda, hombros y brazos. Ideal para alternar con tren inferior en una rutina de 4 días.",
        tipo: "gimnasio",
        imagen: "assets/tren_superior.jpeg",
        ejercicios: [
            {
                nombre_ejercicio: "Press de Banca con Barra",
                repeticiones: "4 series × 8-10 reps",
                peso: "Moderado/Alto — deja 2 reps en reserva",
                descripcion: "Agarre algo más ancho que los hombros. Baja la barra hasta rozar el pecho en 2-3 seg. Empuja en 1 seg. Arco lumbar natural, no exagerado. Pies planos en el suelo."
            },
            {
                nombre_ejercicio: "Remo con Barra Pronada",
                repeticiones: "4 series × 8-10 reps",
                peso: "Moderado",
                descripcion: "Tronco inclinado a 45°, espalda neutra. Tira la barra hacia el ombligo, no hacia el pecho. Pausa 1 seg arriba. Baja controlado. Trabaja toda la espalda media."
            },
            {
                nombre_ejercicio: "Press Militar con Mancuernas",
                repeticiones: "3 series × 10-12 reps",
                peso: "Ligero-Moderado",
                descripcion: "Sentado con respaldo. Mancuernas a la altura de los hombros, palmas al frente. Empuja arriba sin bloquear codos. Baja lento. Activa el core para no arquear la espalda."
            },
            {
                nombre_ejercicio: "Curl de Bíceps Alterno",
                repeticiones: "3 series × 12 reps por brazo",
                peso: "Ligero-Moderado",
                descripcion: "De pie, codos pegados al cuerpo. Sube una mancuerna rotando la muñeca (supinación) hasta contraer el bíceps. Baja en 3 seg. No uses el hombro para impulsar."
            },
            {
                nombre_ejercicio: "Extensión de Tríceps en Polea Alta",
                repeticiones: "3 series × 12 reps",
                peso: "Ligero",
                descripcion: "Agarre de cuerda o barra. Codos fijos cerca del cuerpo, empuja hacia abajo hasta estirar los brazos. Separa ligeramente las manos abajo para mayor contracción."
            },
            {
                nombre_ejercicio: "Face Pull en Polea",
                repeticiones: "3 series × 15 reps",
                peso: "Ligero",
                descripcion: "Polea a la altura de la cara. Tira hacia la frente con los codos altos. Excelente para salud del hombro y postura. Úsalo como cierre de cada sesión de tren superior."
            }
        ]
    },

    {
        nombre: "Tren Inferior (Glúteos & Piernas)",
        duracion_estimada: "50 min",
        descr_corta: "Sesión enfocada en glúteos, cuádriceps e isquiotibiales. Progresión de carga semanal. Alternada con tren superior.",
        tipo: "gimnasio",
        imagen: "assets/tren_inferior.jpeg",
        ejercicios: [
            {
                nombre_ejercicio: "Sentadilla Libre con Barra",
                repeticiones: "4 series × 8 reps",
                peso: "Moderado/Alto — prioriza técnica",
                descripcion: "Pies a la anchura de hombros, puntas ligeramente hacia fuera. Baja hasta que los muslos queden paralelos al suelo. Rodillas siguen la dirección de los pies. Pecho erguido."
            },
            {
                nombre_ejercicio: "Hip Thrust con Barra",
                repeticiones: "4 series × 10 reps",
                peso: "Moderado — añade carga progresivamente",
                descripcion: "Espalda apoyada en banco a la altura de los omóplatos. Barra sobre las caderas con almohadilla. Empuja hasta que el cuerpo quede horizontal. Aprieta glúteos 1 seg arriba."
            },
            {
                nombre_ejercicio: "Zancadas (Lunges) con Mancuernas",
                repeticiones: "3 series × 10 reps por pierna",
                peso: "Mancuernas ligeras-moderadas",
                descripcion: "Paso largo adelante, baja la rodilla trasera a 1-2 cm del suelo. Rodilla delantera no pasa la punta del pie. Vuelve al centro y alterna. Mantén el torso vertical."
            },
            {
                nombre_ejercicio: "Peso Muerto Rumano",
                repeticiones: "3 series × 10 reps",
                peso: "Moderado",
                descripcion: "Pies a la anchura de caderas. Barra o mancuernas rozando las piernas, caderas hacia atrás, rodillas ligeramente flexionadas. Sientes el estiramiento en isquios. Sube apretando glúteos."
            },
            {
                nombre_ejercicio: "Elevación de Gemelos en Máquina",
                repeticiones: "3 series × 15-20 reps",
                peso: "Moderado",
                descripcion: "Sube de puntillas lento (1 seg), aguanta arriba 2 seg y baja despacio (3 seg). Si no tienes máquina, hazlo en un escalón con peso corporal. Los gemelos necesitan mucho volumen."
            }
        ]
    },

    {
        nombre: "Push Day (Empuje)",
        duracion_estimada: "50 min",
        descr_corta: "Pecho, hombros y tríceps en una sesión. Parte del sistema Push/Pull/Legs para intermedios-avanzados.",
        tipo: "gimnasio",
        imagen: "assets/push_day.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Press Inclinado con Mancuernas",
                repeticiones: "4 series × 10 reps",
                peso: "Moderado",
                descripcion: "Banco a 30-45°. Baja las mancuernas hasta que los codos formen 90° y empuja. Trabaja la parte alta del pecho, que suele estar menos desarrollada. Pausa abajo 1 seg."
            },
            {
                nombre_ejercicio: "Aperturas con Mancuernas (Fly)",
                repeticiones: "3 series × 12 reps",
                peso: "Ligero — pesa menos de lo que crees",
                descripcion: "Banco plano. Baja los brazos en arco amplio sintiendo el estiramiento del pecho. Vuelve sin chocar las mancuernas arriba. Mantén codos ligeramente flexionados en todo momento."
            },
            {
                nombre_ejercicio: "Press Arnold",
                repeticiones: "3 series × 12 reps",
                peso: "Ligero-Moderado",
                descripcion: "Empieza con palmas hacia ti a la altura del pecho y gíralas al frente mientras empujas arriba. Trabaja las tres cabezas del deltoides. Movimiento inventado por Arnold Schwarzenegger."
            },
            {
                nombre_ejercicio: "Elevaciones Laterales",
                repeticiones: "3 series × 15 reps",
                peso: "Muy ligero — no te engañes con el peso",
                descripcion: "Codos ligeramente flexionados. Sube hasta que los brazos queden horizontales, no más arriba. Imagina que viertes agua de un vaso. Baja muy lento (3-4 seg) para mayor activación."
            },
            {
                nombre_ejercicio: "Fondos en Paralelas (Dips)",
                repeticiones: "3 series × 8-12 reps",
                peso: "Peso corporal (añade lastre si es fácil)",
                descripcion: "Torso ligeramente inclinado hacia delante para activar pecho. Baja hasta que los codos formen 90°. Si no puedes con el peso corporal, usa la máquina asistida sin problema."
            }
        ]
    },

    {
        nombre: "Pull Day (Tirón)",
        duracion_estimada: "50 min",
        descr_corta: "Espalda y bíceps. Complemento del Push Day. El músculo más ignorado por quienes empiezan — y el que más mejora la postura.",
        tipo: "gimnasio",
        imagen: "assets/pull_day.png",
        ejercicios: [
            {
                nombre_ejercicio: "Dominadas (Pull-up)",
                repeticiones: "4 series × máximo reps con buena técnica",
                peso: "Peso corporal / máquina asistida si es necesario",
                descripcion: "Agarre prono, manos algo más anchas que los hombros. Sube hasta que la barbilla pase la barra. Baja completamente los brazos. Si no puedes aún, usa goma elástica o máquina asistida."
            },
            {
                nombre_ejercicio: "Remo Unilateral con Mancuerna",
                repeticiones: "4 series × 10 reps por lado",
                peso: "Moderado-Alto",
                descripcion: "Rodilla y mano del mismo lado apoyadas en banco. La espalda queda horizontal. Tira la mancuerna hacia la cadera (no hacia el hombro). Codo pegado al cuerpo. Pausa 1 seg arriba."
            },
            {
                nombre_ejercicio: "Jalón al Pecho Agarre Neutro",
                repeticiones: "3 series × 12 reps",
                peso: "Moderado",
                descripcion: "Agarre con palmas enfrentadas (neutro). Tira hacia la parte superior del pecho. Este agarre permite mayor recorrido y menos estrés en las muñecas que el agarre prono."
            },
            {
                nombre_ejercicio: "Curl Martillo con Mancuernas",
                repeticiones: "3 series × 12 reps",
                peso: "Moderado",
                descripcion: "Palmas enfrentadas (como si agarraras un martillo). Sube las dos mancuernas a la vez o alternando. Trabaja el braquial y braquiorradial además del bíceps. Excelente para grosor de brazo."
            },
            {
                nombre_ejercicio: "Curl de Bíceps en Polea Baja",
                repeticiones: "3 series × 15 reps",
                peso: "Ligero",
                descripcion: "La polea mantiene tensión constante en todo el recorrido, a diferencia de las mancuernas. Buen ejercicio de aislamiento para el final de la sesión. Controla especialmente la bajada."
            }
        ]
    },

    {
        nombre: "HIIT Funcional",
        duracion_estimada: "25 min",
        descr_corta: "Alta intensidad sin material. 40 seg de trabajo, 20 seg de descanso. Quema calorías, mejora el sistema cardiovascular y activa todo el cuerpo.",
        tipo: "gimnasio",
        imagen: "assets/hiit_funcional.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Sentadilla con Salto (Jump Squat)",
                repeticiones: "4 rondas × 40 seg",
                peso: "Peso corporal",
                descripcion: "Baja en sentadilla controlada y explota hacia arriba. Aterriza suave, absorbiendo el impacto con las rodillas flexionadas. Descanso 20 seg. Uno de los ejercicios más completos que existen."
            },
            {
                nombre_ejercicio: "Mountain Climbers",
                repeticiones: "4 rondas × 40 seg",
                peso: "Peso corporal",
                descripcion: "En plancha alta, lleva las rodillas al pecho alternando lo más rápido posible manteniendo la cadera baja. Activa core, hombros y sistema cardiovascular al mismo tiempo."
            },
            {
                nombre_ejercicio: "Burpees",
                repeticiones: "4 rondas × 40 seg",
                peso: "Peso corporal",
                descripcion: "Baja a plancha, da una flexión (opcional), salta los pies hacia las manos y salta arriba con los brazos en alto. Si el ritmo es alto, elimina la flexión. Ritmo constante sobre velocidad máxima."
            },
            {
                nombre_ejercicio: "Sprints en el Sitio",
                repeticiones: "4 rondas × 40 seg",
                peso: "Peso corporal",
                descripcion: "Corre en el sitio levantando las rodillas lo máximo posible. Brazos en movimiento como al correr de verdad. Fácil de escalar: cuanto más altas las rodillas, mayor la intensidad."
            }
        ]
    },


    // ─── PILATES ────────────────────────────────────────

    {
        nombre: "Core & Pilates Clásico",
        duracion_estimada: "20 min",
        descr_corta: "Los cinco ejercicios fundamentales del método Pilates. Fortalece el centro del cuerpo, mejora la postura y la conciencia corporal.",
        tipo: "pilates",
        imagen: "assets/pilates.jpeg",
        ejercicios: [
            {
                nombre_ejercicio: "The Hundred",
                repeticiones: "10 ciclos respiratorios (100 bombeos)",
                peso: null,
                descripcion: "Tumbada boca arriba, piernas a 45°, cabeza y hombros elevados. Bombea los brazos arriba y abajo con firmeza (5 bombeos al inhalar, 5 al exhalar). Es el ejercicio de calentamiento del método."
            },
            {
                nombre_ejercicio: "Roll Up",
                repeticiones: "6 repeticiones lentas",
                peso: null,
                descripcion: "Desde tumbada con brazos arriba, despega la columna vértebra a vértebra hasta quedar sentada con los brazos hacia los pies. Baja de igual forma. Si no puedes, ayúdate con las manos al principio."
            },
            {
                nombre_ejercicio: "Single Leg Stretch",
                repeticiones: "10 repeticiones por pierna",
                peso: null,
                descripcion: "Tumbada, rodillas al pecho. Estira una pierna a 45° mientras la contraria permanece recogida. Alterna con control. Cabeza y hombros despegados del suelo durante todo el ejercicio."
            },
            {
                nombre_ejercicio: "Criss-Cross (Bicycle Pilates)",
                repeticiones: "10 reps por lado",
                peso: null,
                descripcion: "Como el anterior pero con rotación de torso: lleva el codo hacia la rodilla contraria. Clave: no es el codo el que se mueve, es el torso que gira. Trabaja los oblicuos en profundidad."
            },
            {
                nombre_ejercicio: "Swan Dive (Extensión de Espalda)",
                repeticiones: "8 repeticiones",
                peso: null,
                descripcion: "Boca abajo, manos bajo los hombros. Eleva el torso usando los músculos de la espalda (no empujes con los brazos). Mira hacia delante, no arriba. Antídoto perfecto para las horas sentada."
            }
        ]
    },

    {
        nombre: "Pilates Full Body",
        duracion_estimada: "35 min",
        descr_corta: "Sesión completa que trabaja todo el cuerpo desde la base del método Pilates. Incluye trabajo de cadera, espalda y movilidad.",
        tipo: "pilates",
        imagen: "assets/pilates_fullbody.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Side-Lying Leg Lifts",
                repeticiones: "12 reps por lado",
                peso: null,
                descripcion: "Tumbada de lado, cuerpo en línea recta. Levanta la pierna de arriba sin girar la cadera. Abajo en 3 seg. Trabaja el glúteo medio y la estabilidad lateral, clave para prevenir lesiones de rodilla."
            },
            {
                nombre_ejercicio: "Glute Bridge (Puente de Glúteos)",
                repeticiones: "3 series × 12 reps",
                peso: null,
                descripcion: "Tumbada, pies en el suelo, rodillas flexionadas. Eleva las caderas apretando glúteos y despegando la columna de suelo vértebra a vértebra. Baja igual de despacio. Aguanta 2 seg arriba."
            },
            {
                nombre_ejercicio: "Dead Bug",
                repeticiones: "10 repeticiones por lado",
                peso: null,
                descripcion: "Boca arriba, brazos al techo, piernas a 90°. Baja brazo derecho e izquierdo simultáneamente mientras mantienes la espalda baja pegada al suelo. Vuelve y alterna. Exige un gran control de core."
            },
            {
                nombre_ejercicio: "Cat-Cow (Gato-Vaca)",
                repeticiones: "10 ciclos lentos",
                peso: null,
                descripcion: "A cuatro patas. Arquea la espalda hacia el suelo al inhalar (vaca) y redondéala hacia el techo al exhalar (gato). Mueve cada vértebra de forma independiente. Moviliza toda la columna vertebral."
            },
            {
                nombre_ejercicio: "Saw (La Sierra)",
                repeticiones: "8 reps por lado",
                peso: null,
                descripcion: "Sentada con piernas separadas y brazos en cruz. Gira el torso y alcanza el pie contrario con la mano delantera mientras la trasera empuja atrás. Estira isquiotibiales y moviliza la columna torácica."
            }
        ]
    },

    {
        nombre: "Pilates Movilidad & Estiramientos",
        duracion_estimada: "25 min",
        descr_corta: "Sesión suave para recuperación activa o días de descanso. Mejora la flexibilidad, libera tensiones y reinicia el cuerpo.",
        tipo: "pilates",
        imagen: "assets/pilates_movilidad.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Spine Stretch Forward",
                repeticiones: "6 repeticiones lentas",
                peso: null,
                descripcion: "Sentada con piernas estiradas y separadas. Inhala alargando la columna y al exhalar, estírate hacia delante vértebra a vértebra como si te redondearas sobre un balón. Mantén 3 seg y vuelve."
            },
            {
                nombre_ejercicio: "Hip Flexor Stretch (Estocada baja)",
                repeticiones: "3 × 30 seg por lado",
                peso: null,
                descripcion: "Rodilla trasera en el suelo, pierna delantera a 90°. Desplaza las caderas hacia adelante hasta sentir estiramiento en el hip flexor. Esencial si pasas muchas horas sentada. Respira profundo."
            },
            {
                nombre_ejercicio: "Thoracic Rotation (Rotación Torácica)",
                repeticiones: "10 reps por lado",
                peso: null,
                descripcion: "Tumbada de lado, rodillas a 90°, brazos extendidos. Lleva el brazo de arriba hacia el otro lado del cuerpo abriendo el pecho. Sigue el brazo con la mirada. La cadera no se mueve. Libera la zona torácica."
            },
            {
                nombre_ejercicio: "Child's Pose con Apertura Lateral",
                repeticiones: "5 respiraciones profundas por lado",
                peso: null,
                descripcion: "Desde postura del niño, camina las manos hacia la derecha para sentir el estiramiento del lado izquierdo. 5 respiraciones y cambia. Abre los músculos intercostales y el dorsal ancho."
            },
            {
                nombre_ejercicio: "Supine Twist (Torsión en el suelo)",
                repeticiones: "5 respiraciones por lado",
                peso: null,
                descripcion: "Tumbada boca arriba. Lleva las rodillas al pecho y bájalas hacia un lado mientras extiendes los brazos. Mira en dirección contraria a las rodillas. Masajea la columna y suelta tensión lumbar."
            }
        ]
    },


    // ─── MEDITACIÓN ─────────────────────────────────────

    {
        nombre: "Mindset Reset",
        duracion_estimada: "10 min",
        descr_corta: "Despeja la mente y reduce el estrés con dos técnicas de probada eficacia. Perfecto para momentos de saturación mental o antes de dormir.",
        tipo: "meditacion",
        imagen: "assets/yoga.jpeg",
        ejercicios: [
            {
                nombre_ejercicio: "Box Breathing (Respiración en Caja)",
                repeticiones: "5 min — 6 a 8 ciclos",
                peso: null,
                descripcion: "Inhala 4 segundos. Retén el aire 4 segundos. Exhala 4 segundos. Espera 4 segundos. Repite. Técnica usada por los Navy SEAL para reducir el cortisol y recuperar la calma en minutos."
            },
            {
                nombre_ejercicio: "Escaneo Corporal (Body Scan)",
                repeticiones: "5 min",
                peso: null,
                descripcion: "Tumbada, ojos cerrados. Lleva la atención lentamente de los pies a la cabeza, zona por zona. Observa sin juzgar: tensión, calor, presión. No intentes relajarte, solo observar. Entrena la atención plena."
            }
        ]
    },

    {
        nombre: "Meditación Matinal",
        duracion_estimada: "15 min",
        descr_corta: "Arranca el día con intención. Combina respiración consciente, visualización y afirmación de objetivos. Cinco minutos te cambiarán el estado de ánimo.",
        tipo: "meditacion",
        imagen: "assets/meditacion_manana.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Respiración Diafragmática",
                repeticiones: "3 min",
                peso: null,
                descripcion: "Sentada cómodamente. Una mano en el pecho, otra en el vientre. Respira de forma que solo se mueva la mano del vientre. Inhala por la nariz 4 seg, exhala por la boca 6 seg. Activa el sistema parasimpático."
            },
            {
                nombre_ejercicio: "Visualización de Intención",
                repeticiones: "5 min",
                peso: null,
                descripcion: "Con los ojos cerrados, visualiza cómo quieres que sea tu día. No lo que temes que pase, sino cómo quieres responder ante los retos. Siente las emociones de esa versión de ti. Esto no es magia — es priming mental."
            },
            {
                nombre_ejercicio: "Gratitud Activa",
                repeticiones: "3 min",
                peso: null,
                descripcion: "Piensa en 3 cosas concretas por las que estés agradecida hoy. No genéricas ('mi salud') sino específicas ('ayer dormí bien'). La ciencia muestra que este ejercicio diario reduce la ansiedad y mejora el ánimo."
            },
            {
                nombre_ejercicio: "Afirmación del Día",
                repeticiones: "1 frase × 3 repeticiones en voz alta",
                peso: null,
                descripcion: "Elige una frase que necesites hoy: 'Soy capaz de manejar lo que venga', 'Hoy actúo desde la calma', etc. Dila en voz alta, con convicción. Escuchar tu propia voz refuerza el mensaje neurológicamente."
            }
        ]
    },

    {
        nombre: "Respiración 4-7-8 (Para Dormir)",
        duracion_estimada: "8 min",
        descr_corta: "Técnica del Dr. Andrew Weil que activa el sistema nervioso parasimpático y prepara el cuerpo para el sueño. Úsala justo antes de acostarte.",
        tipo: "meditacion",
        imagen: "assets/meditacion_noche.jpg",
        ejercicios: [
            {
                nombre_ejercicio: "Posición y Preparación",
                repeticiones: "1-2 min",
                peso: null,
                descripcion: "Tumbada o sentada en la cama. Apaga el móvil o ponlo en modo no molestar. Coloca la punta de la lengua detrás de los dientes superiores. Pon la intención de soltar el día. No necesitas nada más."
            },
            {
                nombre_ejercicio: "Ciclo 4-7-8",
                repeticiones: "4 a 8 ciclos",
                peso: null,
                descripcion: "Inhala por la nariz durante 4 segundos. Contén el aire durante 7 segundos (la parte más importante). Exhala lentamente por la boca haciendo un sonido suave durante 8 segundos. La retención es lo que frena el sistema nervioso simpático."
            },
            {
                nombre_ejercicio: "Liberación Progresiva de Tensión",
                repeticiones: "5 min",
                peso: null,
                descripcion: "Después de los ciclos de respiración, tensa cada grupo muscular 5 seg y suelta: pies → pantorrillas → muslos → abdomen → manos → hombros → cara. Al soltar, sientes la relajación como una ola. Tu cuerpo aprende que ese estado es seguro."
            }
        ]
    }

];


// =======================================================
//  2. RECETAS
// =======================================================

const recetasData = [

    // ─── SALADO ─────────────────────────────────────────

    {
        nombre_receta: "Bowl de Salmón (Poke)",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "Omega-3 y proteínas de alta calidad. Fresco, rápido y con más nutrientes por ración que cualquier plato precocinado.",
        imagen: "assets/poke.jpeg",
        macros: { calorias: "480 kcal", proteina: "28g", carbs: "45g", grasas: "22g" },
        ingredientes: {
            "Arroz integral cocido":  "150g",
            "Salmón fresco (lomo)":   "120g",
            "Aguacate":               "½ unidad",
            "Edamame pelado":         "50g",
            "Salsa de soja":          "1 cda",
            "Sésamo tostado":         "1 cdta"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Preparar la base", descripcion: "Si el arroz está recién hecho, déjalo enfriar un poco. Colócalo en el fondo del bol presionando ligeramente para hacer una 'cama' plana y uniforme." },
            { numero_paso: 2, nombre_paso: "Corte preciso", descripcion: "Corta el salmón en dados de 2 cm (tamaño bocado). Corta el aguacate en láminas finas. Cuanto más uniforme sea el corte, mejor quedará la presentación y más agradable la textura." },
            { numero_paso: 3, nombre_paso: "Montaje y aliño", descripcion: "Coloca cada ingrediente agrupado en su propia sección sobre el arroz, sin mezclar. Espolvorea el sésamo. Rocía la salsa de soja justo antes de comer para que el arroz no se empape." }
        ]
    },

    {
        nombre_receta: "Pollo Teriyaki Casero",
        duracion_estimada: "20 min",
        tipo: "salado",
        descr_corta: "La salsa brillante y pegajosa que pides en los restaurantes, hecha en casa con tres ingredientes básicos y sin azúcares refinados.",
        imagen: "assets/pollo_teriyaki.jpeg",
        macros: { calorias: "450 kcal", proteina: "30g", carbs: "60g", grasas: "8g" },
        ingredientes: {
            "Pechuga de pollo":    "200g",
            "Arroz basmati cocido": "150g",
            "Salsa de soja":       "3 cdas",
            "Miel":                "1 cda",
            "Maicena":             "1 cdta",
            "Agua":                "80ml"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Dorar el pollo", descripcion: "Corta el pollo en dados. En una sartén muy caliente con unas gotas de aceite, cocínalo hasta que esté dorado por fuera. Resérvalo en un plato: todavía no está completamente hecho por dentro." },
            { numero_paso: 2, nombre_paso: "La salsa teriyaki", descripcion: "Fuera del fuego, mezcla en la misma sartén la soja, la miel, el agua y la maicena. Remueve bien para deshacer cualquier grumo antes de encender el fuego." },
            { numero_paso: 3, nombre_paso: "Espesar y acabar", descripcion: "Enciende el fuego a intensidad media. Cuando la salsa empiece a burbujear y espese (1-2 min), incorpora el pollo reservado y remueve 2 min más para que se impregne y termine de cocinarse." }
        ]
    },

    {
        nombre_receta: "Burritos de Pollo Fit",
        duracion_estimada: "25 min",
        tipo: "salado",
        descr_corta: "Comida completa en un solo envoltorio. Fácil de preparar con antelación y perfecta para llevar al trabajo o al gimnasio.",
        imagen: "assets/burritos.jpeg",
        macros: { calorias: "520 kcal", proteina: "35g", carbs: "48g", grasas: "18g" },
        ingredientes: {
            "Tortillas de trigo grandes": "2 unidades",
            "Pechuga de pollo":           "200g",
            "Pimiento rojo/verde":        "½ unidad",
            "Frijoles negros":            "100g",
            "Queso rallado ligero":       "30g",
            "Pimentón ahumado":           "½ cdta"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "El relleno", descripcion: "Corta el pollo y los pimientos en tiras finas. Saltea en sartén a fuego fuerte con unas gotas de aceite y el pimentón ahumado hasta que el pollo esté dorado y los pimientos al dente." },
            { numero_paso: 2, nombre_paso: "Calentar la tortilla", descripcion: "Fundamental: calienta las tortillas 10-15 seg en microondas o sartén seca. Si están frías y rígidas, se romperán al doblarlas. Este paso marca la diferencia entre un burrito bonito y un desastre." },
            { numero_paso: 3, nombre_paso: "Envoltura perfecta", descripcion: "Extiende el relleno en el centro dejando 4 cm de margen. Añade los frijoles y el queso. Dobla los bordes laterales primero, luego enrolla desde el lado más cercano a ti apretando bien. Marca en sartén 1 min por lado para sellarlo." }
        ]
    },

    {
        nombre_receta: "Albóndigas de la Abuela",
        duracion_estimada: "35 min",
        tipo: "salado",
        descr_corta: "Reconfortantes, jugosas y con más proteína por ración que cualquier proteína en polvo. El comfort food que no te hace sentir culpable.",
        imagen: "assets/albondigas.jpg",
        macros: { calorias: "490 kcal", proteina: "32g", carbs: "15g", grasas: "28g" },
        ingredientes: {
            "Carne picada mixta":       "250g",
            "Huevo":                    "1 unidad",
            "Pan rallado":              "2 cdas",
            "Salsa de tomate natural":  "200g",
            "Guisantes":                "50g",
            "Ajo y perejil":            "Al gusto"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "La masa", descripcion: "Mezcla la carne con el huevo, el pan rallado, el ajo picado, el perejil, sal y pimienta. Amasa con las manos hasta integrar todo. Clave: no sobre-amasar o quedarán duras. Con manos limpias o ligeramente húmedas, forma bolas del tamaño de una nuez." },
            { numero_paso: 2, nombre_paso: "Sellado rápido", descripcion: "Dóralas en sartén con un poco de aceite a fuego fuerte, 1 min por lado. No las muevas hasta que se despeguen solas. Solo queremos sellar la superficie, por dentro seguirán crudas. Resérvalas en un plato." },
            { numero_paso: 3, nombre_paso: "Chup chup", descripcion: "En la misma sartén, añade la salsa de tomate y los guisantes. Incorpora las albóndigas, tapa y cocina a fuego suave 12-15 minutos. La tapa es clave: el vapor las cocina por dentro sin resecarlas." }
        ]
    },

    {
        nombre_receta: "Tortilla de Espinacas y Queso",
        duracion_estimada: "12 min",
        tipo: "salado",
        descr_corta: "La cena más rápida, saciante y nutritiva que existe. Lista en menos de 15 minutos con ingredientes que siempre tienes en casa.",
        imagen: "assets/tortilla_espinacas.jpg",
        macros: { calorias: "340 kcal", proteina: "24g", carbs: "6g", grasas: "26g" },
        ingredientes: {
            "Huevos":                  "3 unidades",
            "Espinacas frescas":       "60g",
            "Queso feta o mozzarella": "40g",
            "Ajo":                     "1 diente",
            "Aceite de oliva":         "1 cda",
            "Sal y pimienta":          "Al gusto"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Saltear las espinacas", descripcion: "En una sartén antiadherente a fuego medio-alto, sofríe el ajo picado 30 seg. Añade las espinacas y saltéalas 1-2 min hasta que pierdan el volumen. Sala ligeramente. Sácalas y réservalas." },
            { numero_paso: 2, nombre_paso: "El huevo", descripcion: "Bate los huevos con sal y pimienta. En la misma sartén (sin limpiarla) añade un poco más de aceite a fuego medio. Vierte los huevos y cuando los bordes empiecen a cuajar, distribuye las espinacas y el queso desmenuzado por la mitad." },
            { numero_paso: 3, nombre_paso: "Plegar y servir", descripcion: "Cuando el centro esté casi cuajado pero aún brillante (no seco), dobla la tortilla por la mitad. Deslízala al plato. El calor residual terminará de cocinarla. Una tortilla seca es una tortilla triste." }
        ]
    },

    {
        nombre_receta: "Gazpacho Tradicional",
        duracion_estimada: "15 min (+ 1h nevera)",
        tipo: "salado",
        descr_corta: "El plato más saludable del verano. Hidratante, lleno de vitaminas y listo en 15 minutos. Aguanta 3 días en la nevera.",
        imagen: "assets/gazpacho.jpg",
        macros: { calorias: "120 kcal", proteina: "3g", carbs: "14g", grasas: "6g" },
        ingredientes: {
            "Tomates maduros":      "800g",
            "Pepino":               "½ unidad",
            "Pimiento verde":       "½ unidad",
            "Ajo":                  "1 diente pequeño",
            "Aceite de oliva virgen": "3 cdas",
            "Vinagre de Jerez":     "1 cda",
            "Sal":                  "Al gusto"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Preparar las verduras", descripcion: "Lava y trocea todos los ingredientes. Los tomates no necesitan pelarse si tienes batidora potente. El ajo mejor pocharlo 30 seg en sartén primero si no te gusta muy intenso. El pepino aporte frescura y el pimiento, carácter." },
            { numero_paso: 2, nombre_paso: "Triturar y emulsionar", descripcion: "Tritura todo en batidora empezando por los tomates. Añade el aceite poco a poco mientras trituras para que emulsione (como una vinagreta). Añade el vinagre, la sal y prueba. Ajusta a tu gusto." },
            { numero_paso: 3, nombre_paso: "Colar y enfriar", descripcion: "Pásalo por un colador fino o chino para quitarle las pieles y pepitas. Mete en la nevera al menos 1 hora. El frío mejora todos los sabores. Sirve con un hilo de aceite por encima y taquitos de las mismas verduras." }
        ]
    },

    // ─── SNACK / DESAYUNO ───────────────────────────────

    {
        nombre_receta: "Porridge Energético",
        duracion_estimada: "10 min",
        tipo: "snack",
        descr_corta: "Carbohidratos de absorción lenta que te mantienen saciada 3-4 horas. Mejor pre-entreno que cualquier barrita del supermercado.",
        imagen: "assets/porridge.jpeg",
        macros: { calorias: "320 kcal", proteina: "12g", carbs: "54g", grasas: "6g" },
        ingredientes: {
            "Avena integral":          "50g",
            "Leche o bebida vegetal":  "200ml",
            "Canela en polvo":         "1 cdta",
            "Plátano maduro":          "1 unidad",
            "Semillas de chía":        "1 cdta"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Mezcla inicial", descripcion: "Pon la avena y la leche en un cazo a fuego medio. Añade la canela desde el principio para que infusione. Remueve de vez en cuando para que no se pegue al fondo." },
            { numero_paso: 2, nombre_paso: "La textura clave", descripcion: "Cuando empiece a burbujear, baja el fuego al mínimo. Sin dejar de remover, cocina 3-4 minutos. Cuando se despegue de las paredes del cazo, tiene la textura correcta: cremosa, no líquida ni apelmazada." },
            { numero_paso: 3, nombre_paso: "Montar el bol", descripcion: "Vierte en un bol. Corta el plátano en rodajas y colócalo encima. Espolvorea las semillas de chía. Si lo preparas el día anterior, guárdalo en la nevera y añade un poco de leche fría al servir." }
        ]
    },

    {
        nombre_receta: "Tortitas de Avena y Plátano",
        duracion_estimada: "15 min",
        tipo: "snack",
        descr_corta: "Tres ingredientes, sin harina, sin azúcar añadido. La alternativa saludable a las tortitas de toda la vida que no te dejará con hambre a los 30 minutos.",
        imagen: "assets/tortitas_avena.png",
        macros: { calorias: "280 kcal", proteina: "14g", carbs: "38g", grasas: "8g" },
        ingredientes: {
            "Plátano maduro":    "1 unidad grande",
            "Huevos":            "2 unidades",
            "Avena en copos":    "40g",
            "Canela":            "½ cdta",
            "Aceite de coco":    "Para la sartén"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "La masa", descripcion: "Aplasta el plátano con un tenedor hasta obtener un puré sin grumos. Añade los huevos y mezcla bien. Incorpora la avena y la canela. Deja reposar 2 minutos para que la avena absorba la humedad: la masa espesará." },
            { numero_paso: 2, nombre_paso: "Cocinar", descripcion: "Sartén antiadherente a fuego medio-bajo con un poco de aceite de coco. Vierte porciones pequeñas de masa (2 cdas por tortita). Son frágiles: no les des la vuelta hasta que los bordes estén claramente cocinados y la superficie llena de burbujitas." },
            { numero_paso: 3, nombre_paso: "Servir", descripcion: "Voltea con cuidado y cocina 1 min más. Sirve con frutas del bosque, un hilo de miel o yogur griego. Consejo: no pongas demasiado aceite o quedarán demasiado blandas para manejarlas." }
        ]
    },

    {
        nombre_receta: "Yogur Griego con Granola y Frutas",
        duracion_estimada: "5 min",
        tipo: "snack",
        descr_corta: "El snack perfecto: proteínas del yogur, fibra de la granola y vitaminas de la fruta. Preparación cero, resultado diez.",
        imagen: "assets/yogur_frutas.jpeg",
        macros: { calorias: "240 kcal", proteina: "18g", carbs: "28g", grasas: "6g" },
        ingredientes: {
            "Yogur griego natural 0%": "200g",
            "Granola sin azúcar":      "30g",
            "Fresas o frutos rojos":   "80g",
            "Miel":                    "1 cdta",
            "Semillas de girasol":     "1 cda"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Base de yogur", descripcion: "Elige yogur griego natural, no el 'estilo griego' (que suele llevar espesantes). El 0% tiene igual proteína que el normal. Vierte en un bol amplio para que quepa bien todo." },
            { numero_paso: 2, nombre_paso: "Capas y texturas", descripcion: "Pon la granola primero para que no se empape tanto. Añade las frutas lavadas y cortadas. Riega con la miel en hilo fino. La clave de este snack es la combinación de textura: cremoso + crujiente + jugoso." },
            { numero_paso: 3, nombre_paso: "Semillas y servir", descripcion: "Termina con las semillas de girasol. Si lo preparas en un bote de cristal (para llevar), pon el yogur primero, la fruta en medio y la granola y semillas justo encima para que mantengan el crujiente." }
        ]
    },

    {
        nombre_receta: "Energy Balls de Cacao",
        duracion_estimada: "15 min",
        tipo: "postre",
        descr_corta: "El sustituto perfecto a la bollería industrial. Sin horno, sin azúcar añadida y lista en 15 minutos.",
        imagen: "assets/trufas_chocolate.jpeg",
        macros: { calorias: "180 kcal", proteina: "5g", carbs: "22g", grasas: "10g" },
        ingredientes: {
            "Dátiles sin hueso":   "10-12 unidades",
            "Cacao puro 100%":     "2 cdas",
            "Almendras o nueces":  "60g",
            "Coco rallado":        "Para rebozar",
            "Sal":                 "1 pizca"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Triturado", descripcion: "Pon los dátiles, el cacao, los frutos secos y la pizca de sal en una procesadora. Tritura hasta que se forme una pasta pegajosa y oscura que se separa de las paredes. Si queda muy seca, añade 1 cda de agua." },
            { numero_paso: 2, nombre_paso: "Dar forma", descripcion: "Truco: mójate ligeramente las manos para que no se pegue. Coge porciones de masa y ruédalas entre las palmas para hacer bolitas del tamaño de una nuez. Devuelven algo de esfuerzo pero el resultado vale la pena." },
            { numero_paso: 3, nombre_paso: "Rebozar y enfriar", descripcion: "Pasa cada bolita por un plato con coco rallado. Mételas 15-20 min en el frigorífico para que cojan firmeza. Aguantan 1 semana en nevera en un recipiente hermético." }
        ]
    },

    // ─── POSTRE ─────────────────────────────────────────

    {
        nombre_receta: "Mousse de Chocolate Negro",
        duracion_estimada: "15 min (+ 2h nevera)",
        tipo: "postre",
        descr_corta: "Postre elegante con muy pocos ingredientes. El chocolate negro 70%+ tiene antioxidantes, magnesio y reduce el antojo de dulce.",
        imagen: "assets/mousse_chocolate.jpeg",
        macros: { calorias: "210 kcal", proteina: "8g", carbs: "18g", grasas: "13g" },
        ingredientes: {
            "Chocolate negro 70%+":  "80g",
            "Claras de huevo":       "3 unidades",
            "Yogur griego natural":  "100g",
            "Cacao puro":            "1 cda",
            "Sal":                   "1 pizca"
        },
        pasos: [
            { numero_paso: 1, nombre_paso: "Fundir el chocolate", descripcion: "Trocea el chocolate y derrítelo al baño maría o en microondas (30 seg, remueve, repite). Deja enfriar 5 minutos a temperatura ambiente. Si lo añades caliente a las claras, las cocerás." },
            { numero_paso: 2, nombre_paso: "Montar las claras", descripcion: "La pizca de sal es clave: ayuda a que monten mejor. Bate a punto de nieve firme (cuando das la vuelta al bol y no caen). Con varillas eléctricas son 3-4 minutos. A mano son 8-10 minutos de cardio gratuito." },
            { numero_paso: 3, nombre_paso: "Integrar y reposar", descripcion: "Mezcla el yogur con el chocolate fundido. Incorpora las claras en dos tandas con movimientos envolventes de abajo arriba (no en círculos). Reparte en copas o vasos y refrigera mínimo 2 horas. La espera es la parte más difícil." }
        ]
    }

];


// =======================================================
//  3. CITAS DE MOTIVACIÓN
// =======================================================

const citasMotivacion = [
    { texto: "No es lo que te pasa, sino cómo reaccionas a lo que te pasa.", autor: "Epicteto" },
    { texto: "La disciplina es elegir entre lo que quieres ahora y lo que quieres más.", autor: "Abraham Lincoln" },
    { texto: "Somos lo que hacemos repetidamente. La excelencia no es un acto, sino un hábito.", autor: "Aristóteles" },
    { texto: "El mejor proyecto en el que trabajarás eres tú misma.", autor: "Anónimo" },
    { texto: "Hecho es mejor que perfecto.", autor: "Sheryl Sandberg" },
    { texto: "Tu única competencia es quien eras ayer.", autor: "Filosofía Glowy" },
    { texto: "Un exterior saludable comienza en tu interior.", autor: "Robert Urich" },
    { texto: "Cuida tu cuerpo, es el único lugar que tienes para vivir.", autor: "Jim Rohn" },
    { texto: "El descanso es una parte vital del rendimiento.", autor: "Filosofía Glowy" },
    { texto: "La verdadera fuerza es el dominio de la propia mente.", autor: "Séneca" },
    { texto: "Sé el protagonista de tu vida, no un espectador.", autor: "Anónimo" },
    { texto: "Si quieres llegar rápido, camina sola. Si quieres llegar lejos, camina acompañada.", autor: "Proverbio Africano" }
];