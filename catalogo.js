// Catálogo de ejercicios de GymBlack para gimnasios.
// Fotos: free-exercise-db (github.com/yuhonas/free-exercise-db), dominio público (Unlicense).
// g = grupo muscular · eq = qué se usa · img = carpeta en ejercicios/ (0.jpg inicio, 1.jpg final)
// tipo: "kg" (se anota el peso, por defecto) · "pc" (peso corporal: solo repeticiones) · "seg" (se sostiene) · "min" (cardio)
const GRUPOS = {
  pecho:"Pecho", espalda:"Espalda", hombros:"Hombros", biceps:"Bíceps", triceps:"Tríceps",
  piernas:"Piernas", gluteos:"Glúteos", pantorrillas:"Pantorrillas", abdomen:"Abdomen", cardio:"Cardio"
};
const CATALOGO = {
  // ---------- Pecho ----------
  pb:{n:"Press de banca con barra",g:"pecho",eq:"Banco plano + barra",img:"Barbell_Bench_Press_-_Medium_Grip",tip:"Escápulas juntas y apoyadas. Bajá la barra al medio del pecho y empujá."},
  pi:{n:"Press inclinado con barra",g:"pecho",eq:"Banco inclinado + barra",img:"Barbell_Incline_Bench_Press_-_Medium_Grip",tip:"Banco a 30–45°. La barra baja a la parte alta del pecho."},
  pmb:{n:"Press con mancuernas",g:"pecho",eq:"Banco plano + mancuernas",img:"Dumbbell_Bench_Press",tip:"Bajá hasta sentir que estira el pecho, con los codos a unos 45° del cuerpo."},
  pim:{n:"Press inclinado con mancuernas",g:"pecho",eq:"Banco inclinado + mancuernas",img:"Incline_Dumbbell_Press",tip:"Bajá las mancuernas a los costados del pecho alto y empujá juntándolas arriba."},
  pmq:{n:"Press de pecho en máquina",g:"pecho",eq:"Máquina de press de pecho",img:"Leverage_Chest_Press",tip:"Agarres a la altura del medio del pecho. Empujá sin despegar la espalda."},
  pimq:{n:"Press inclinado en máquina",g:"pecho",eq:"Máquina de press inclinado",img:"Leverage_Incline_Chest_Press",tip:"Ajustá el asiento para que los agarres queden a la altura del pecho alto."},
  psm:{n:"Press de banca en Smith",g:"pecho",eq:"Máquina Smith + banco",img:"Smith_Machine_Bench_Press",tip:"La barra baja guiada al medio del pecho. Ideal para aprender el movimiento."},
  ape:{n:"Aperturas con mancuernas",g:"pecho",eq:"Banco plano + mancuernas",img:"Dumbbell_Flyes",tip:"Codos apenas flexionados. Abrí hasta sentir el estiramiento y cerrá apretando el pecho."},
  apei:{n:"Aperturas inclinadas",g:"pecho",eq:"Banco inclinado + mancuernas",img:"Incline_Dumbbell_Flyes",tip:"Igual que las aperturas, con el banco inclinado para trabajar el pecho alto."},
  pdk:{n:"Pec deck (mariposa)",g:"pecho",eq:"Máquina pec deck",img:"Butterfly",tip:"Juntá los brazos adelante apretando el pecho y volvé lento."},
  cru:{n:"Cruce de poleas",g:"pecho",eq:"Dos poleas altas",img:"Cable_Crossover",tip:"Un paso adelante, codos apenas flexionados. Juntá las manos abajo, frente a la cadera."},
  flx:{n:"Flexiones de brazos",g:"pecho",eq:"Piso",img:"Pushups",tipo:"pc",tip:"Cuerpo recto como una tabla. Bajá el pecho hasta casi tocar el piso."},
  flxi:{n:"Flexiones con manos en banco",g:"pecho",eq:"Banco o silla firme",img:"Incline_Push-Up",tipo:"pc",tip:"Más fácil que en el piso: manos en el banco, cuerpo recto y pecho al borde."},
  // ---------- Espalda ----------
  jal:{n:"Jalón al pecho",g:"espalda",eq:"Polea alta + barra",img:"Wide-Grip_Lat_Pulldown",tip:"Pecho arriba. Llevá la barra a la clavícula tirando con los codos hacia abajo."},
  jalc:{n:"Jalón agarre cerrado",g:"espalda",eq:"Polea alta + triángulo",img:"Close-Grip_Front_Lat_Pulldown",tip:"Llevá el agarre al pecho con los codos pegados al cuerpo."},
  dom:{n:"Dominadas",g:"espalda",eq:"Barra de dominadas",img:"Pullups",tipo:"pc",tip:"Colgado con brazos estirados, subí hasta pasar la pera por la barra. Bajá lento."},
  doma:{n:"Dominadas asistidas",g:"espalda",eq:"Barra + banda elástica o máquina asistida",img:"Band_Assisted_Pull-Up",tipo:"pc",tip:"La banda te ayuda a subir. Cuanto más finita la banda, más difícil."},
  rpb:{n:"Remo en polea baja",g:"espalda",eq:"Polea baja + triángulo",img:"Seated_Cable_Rows",tip:"Pecho alto, tirá con los codos hacia atrás sin balancear el torso."},
  rmq:{n:"Remo en máquina",g:"espalda",eq:"Máquina de remo",img:"Leverage_Iso_Row",tip:"Pecho apoyado en el respaldo. Tirá con los codos y apretá la espalda."},
  rm1:{n:"Remo con mancuerna a un brazo",g:"espalda",eq:"Banco + mancuerna",img:"One-Arm_Dumbbell_Row",tip:"Rodilla y mano en el banco. Llevá la mancuerna hacia la cadera. Series por brazo."},
  rba:{n:"Remo con barra",g:"espalda",eq:"Barra",img:"Bent_Over_Barbell_Row",tip:"Torso inclinado, espalda recta. Llevá la barra al ombligo."},
  rtb:{n:"Remo en T",g:"espalda",eq:"Máquina de remo en T",img:"Lying_T-Bar_Row",tip:"Pecho apoyado, tirá hacia arriba juntando los omóplatos."},
  rinc:{n:"Remo con pecho apoyado",g:"espalda",eq:"Banco inclinado + mancuernas",img:"Dumbbell_Incline_Row",tip:"Boca abajo en el banco inclinado. Tirá los codos hacia atrás."},
  rinv:{n:"Remo invertido",g:"espalda",eq:"Barra baja, Smith o mesa firme",img:"Inverted_Row",tipo:"pc",tip:"Colgado bajo la barra con el cuerpo recto. Llevá el pecho a la barra."},
  pmu:{n:"Peso muerto",g:"espalda",eq:"Barra + discos",img:"Barbell_Deadlift",tip:"Barra pegada a las piernas, espalda recta. Empujá el piso con las piernas y subí."},
  hip:{n:"Hiperextensiones",g:"espalda",eq:"Banco de hiperextensiones o piso",img:"Hyperextensions_With_No_Hyperextension_Bench",tipo:"pc",tip:"Subí el torso hasta alinearlo con las piernas, sin arquear de más."},
  enc:{n:"Encogimientos de hombros",g:"espalda",eq:"Mancuernas",img:"Dumbbell_Shrug",tip:"Subí los hombros hacia las orejas, pausa de 1 s y bajá lento."},
  // ---------- Hombros ----------
  pmil:{n:"Press militar con barra",g:"hombros",eq:"Barra",img:"Standing_Military_Press",tip:"Glúteos y abdomen firmes. La barra sube recta, pasando cerca de la cara."},
  pmm:{n:"Press de hombros con mancuernas",g:"hombros",eq:"Banco con respaldo + mancuernas",img:"Seated_Dumbbell_Press",tip:"Sentado con la espalda apoyada. Empujá las mancuernas hacia arriba sin chocarlas."},
  pmmq:{n:"Press de hombros en máquina",g:"hombros",eq:"Máquina de press de hombros",img:"Machine_Shoulder_Military_Press",tip:"Agarres a la altura de los hombros. Empujá sin despegar la espalda."},
  vlat:{n:"Vuelos laterales",g:"hombros",eq:"Mancuernas",img:"Side_Lateral_Raise",tip:"Subí los brazos a los costados hasta la altura de los hombros. Sin encoger."},
  vlp:{n:"Vuelo lateral en polea",g:"hombros",eq:"Polea baja",img:"Cable_Seated_Lateral_Raise",tip:"El cable pasa por delante del cuerpo. Subí el brazo hasta el hombro."},
  vfr:{n:"Elevaciones frontales",g:"hombros",eq:"Mancuernas",img:"Front_Dumbbell_Raise",tip:"Subí la mancuerna adelante hasta la altura de los ojos, sin balancear."},
  paj:{n:"Pájaros",g:"hombros",eq:"Mancuernas",img:"Seated_Bent-Over_Rear_Delt_Raise",tip:"Sentado e inclinado hacia adelante, abrí los brazos hacia los costados."},
  pajm:{n:"Pájaro en máquina",g:"hombros",eq:"Pec deck invertido",img:"Reverse_Machine_Flyes",tip:"Brazos casi rectos, abrí hacia atrás apretando la parte de atrás del hombro."},
  fp:{n:"Face pull",g:"hombros",eq:"Polea alta + cuerda",img:"Face_Pull",tip:"Tirá la cuerda hacia la cara separando las manos. Codos altos."},
  // ---------- Bíceps ----------
  cb:{n:"Curl con barra",g:"biceps",eq:"Barra",img:"Barbell_Curl",tip:"Codos quietos al costado del cuerpo. Sin balancear."},
  cez:{n:"Curl con barra EZ",g:"biceps",eq:"Barra EZ",img:"EZ-Bar_Curl",tip:"La barra zigzag cuida las muñecas. Codos quietos."},
  cm:{n:"Curl alternado con mancuernas",g:"biceps",eq:"Mancuernas",img:"Dumbbell_Alternate_Bicep_Curl",tip:"Un brazo por vez, girando la palma hacia arriba al subir."},
  cmar:{n:"Curl martillo",g:"biceps",eq:"Mancuernas",img:"Hammer_Curls",tip:"Palmas enfrentadas todo el tiempo. Codos quietos."},
  cinc:{n:"Curl inclinado",g:"biceps",eq:"Banco inclinado + mancuernas",img:"Incline_Dumbbell_Curl",tip:"Brazos colgando por detrás del cuerpo. No adelantes los codos."},
  cpo:{n:"Curl en polea",g:"biceps",eq:"Polea baja + barra",img:"Standing_Biceps_Cable_Curl",tip:"Tensión constante del cable. Codos pegados al cuerpo."},
  csc:{n:"Curl en banco Scott",g:"biceps",eq:"Máquina o banco Scott",img:"Machine_Preacher_Curls",tip:"Brazos apoyados en el almohadón. Estirá casi del todo abajo."},
  // ---------- Tríceps ----------
  tpol:{n:"Extensión de tríceps en polea",g:"triceps",eq:"Polea alta + barra",img:"Triceps_Pushdown",tip:"Codos pegados al cuerpo y quietos. Estirá del todo abajo."},
  tcue:{n:"Extensión en polea con cuerda",g:"triceps",eq:"Polea alta + cuerda",img:"Triceps_Pushdown_-_Rope_Attachment",tip:"Abrí la cuerda al final del movimiento. Codos quietos."},
  tnuca:{n:"Extensión sobre la cabeza con cuerda",g:"triceps",eq:"Polea + cuerda",img:"Cable_Rope_Overhead_Triceps_Extension",tip:"De espaldas a la polea, codos arriba y quietos. Estirá bien."},
  tm:{n:"Extensión con mancuerna sobre la cabeza",g:"triceps",eq:"Mancuerna",img:"Standing_Dumbbell_Triceps_Extension",tip:"Mancuerna detrás de la cabeza, codos apuntando al techo."},
  rcr:{n:"Rompecráneos",g:"triceps",eq:"Banco plano + barra EZ",img:"EZ-Bar_Skullcrusher",tip:"Bajá la barra detrás de la frente con los codos apuntando al techo."},
  tpat:{n:"Patada de tríceps",g:"triceps",eq:"Banco + mancuerna",img:"Tricep_Dumbbell_Kickback",tip:"Codo pegado al cuerpo y quieto. Estirá el brazo hacia atrás."},
  fon:{n:"Fondos en paralelas",g:"triceps",eq:"Paralelas",img:"Dips_-_Triceps_Version",tipo:"pc",tip:"Torso derecho, bajá hasta 90° de codo y empujá hasta estirar."},
  fbanco:{n:"Fondos en banco",g:"triceps",eq:"Banco o silla firme",img:"Bench_Dips",tipo:"pc",tip:"Manos en el borde, cola cerca del banco. Bajá doblando los codos hacia atrás."},
  pcer:{n:"Press de banca agarre cerrado",g:"triceps",eq:"Banco plano + barra",img:"Close-Grip_Barbell_Bench_Press",tip:"Manos al ancho de los hombros y codos pegados al cuerpo."},
  // ---------- Piernas ----------
  sen:{n:"Sentadilla con barra",g:"piernas",eq:"Rack + barra",img:"Barbell_Squat",tip:"Barra sobre los trapecios, pecho arriba. Bajá al menos hasta que los muslos queden paralelos al piso."},
  sgob:{n:"Sentadilla goblet",g:"piernas",eq:"Mancuerna o pesa rusa",img:"Goblet_Squat",tip:"Pesa pegada al pecho. Bajá profundo con la espalda derecha."},
  ssm:{n:"Sentadilla en Smith",g:"piernas",eq:"Máquina Smith",img:"Smith_Machine_Squat",tip:"Pies un poco adelante de la barra. Bajá controlado."},
  hack:{n:"Hack squat",g:"piernas",eq:"Máquina hack squat",img:"Hack_Squat",tip:"Espalda pegada al respaldo, bajá profundo."},
  pren:{n:"Prensa de piernas",g:"piernas",eq:"Máquina de prensa",img:"Leg_Press",tip:"Bajá profundo sin despegar la cola del respaldo. No trabes las rodillas arriba."},
  ext:{n:"Extensiones de cuádriceps",g:"piernas",eq:"Máquina de extensiones",img:"Leg_Extensions",tip:"Estirá del todo arriba y bajá lento."},
  cfa:{n:"Curl femoral acostado",g:"piernas",eq:"Máquina de curl femoral",img:"Lying_Leg_Curls",tip:"Cadera pegada al banco. Llevá los talones a la cola y bajá lento."},
  cfs:{n:"Curl femoral sentado",g:"piernas",eq:"Máquina de curl femoral sentado",img:"Seated_Leg_Curl",tip:"Trabá bien los muslos con el rodillo. Estirá del todo arriba."},
  pmr:{n:"Peso muerto rumano",g:"piernas",eq:"Barra o mancuernas",img:"Romanian_Deadlift",tip:"Rodillas apenas flexionadas, cadera hacia atrás, barra pegada a las piernas."},
  sumo:{n:"Peso muerto sumo",g:"piernas",eq:"Barra + discos",img:"Sumo_Deadlift",tip:"Piernas bien abiertas y puntas afuera. Espalda recta, subí empujando el piso."},
  bulg:{n:"Sentadilla búlgara",g:"piernas",eq:"Banco + mancuernas",img:"Split_Squat_with_Dumbbells",tip:"Pie de atrás sobre el banco. Hacé las reps con una pierna y después con la otra."},
  est:{n:"Estocadas con mancuernas",g:"piernas",eq:"Mancuernas",img:"Dumbbell_Lunges",tip:"Paso largo, bajá la rodilla de atrás casi al piso. Reps por pierna."},
  estc:{n:"Estocadas caminando",g:"piernas",eq:"Espacio libre",img:"Bodyweight_Walking_Lunge",tipo:"pc",tip:"Pasos largos: bajá la rodilla de atrás casi al piso y avanzá. Reps por pierna."},
  scp:{n:"Sentadilla sin peso",g:"piernas",eq:"Piso",img:"Bodyweight_Squat",tipo:"pc",tip:"Pies al ancho de hombros. Bajá lo más profundo que puedas con el pecho arriba."},
  ssal:{n:"Sentadilla con salto",g:"piernas",eq:"Piso",img:"Freehand_Jump_Squat",tipo:"pc",tip:"Bajá a sentadilla y saltá con fuerza. Caé suave, con las rodillas flexionadas."},
  step:{n:"Subidas al cajón",g:"piernas",eq:"Cajón o banco + mancuernas",img:"Dumbbell_Step_Ups",tip:"Subí empujando solo con la pierna de arriba. Reps por pierna."},
  // ---------- Glúteos ----------
  hth:{n:"Hip thrust",g:"gluteos",eq:"Banco + barra + almohadilla",img:"Barbell_Hip_Thrust",tip:"Espalda alta en el banco. Subí hasta alinear torso y muslos y apretá los glúteos."},
  pgl:{n:"Puente de glúteos con barra",g:"gluteos",eq:"Barra + almohadilla",img:"Barbell_Glute_Bridge",tip:"Acostado en el piso, subí la cadera apretando los glúteos. Pausa arriba."},
  pgl1:{n:"Puente de glúteo a una pierna",g:"gluteos",eq:"Piso",img:"Single_Leg_Glute_Bridge",tipo:"pc",tip:"Un pie apoyado, la otra pierna estirada. Subí la cadera apretando el glúteo. Reps por pierna."},
  pat:{n:"Patada de glúteo en polea",g:"gluteos",eq:"Polea baja + tobillera",img:"One-Legged_Cable_Kickback",tip:"Llevá la pierna hacia atrás sin arquear la espalda. Reps por pierna."},
  patp:{n:"Patada de glúteo en el piso",g:"gluteos",eq:"Piso (colchoneta)",img:"Glute_Kickback",tipo:"pc",tip:"En cuatro patas, llevá el talón hacia el techo apretando el glúteo. Reps por pierna."},
  kb:{n:"Swing con pesa rusa",g:"gluteos",eq:"Pesa rusa",img:"One-Arm_Kettlebell_Swings",tip:"La fuerza sale de la cadera, no de los brazos. Empujá la cadera adelante."},
  gm:{n:"Buenos días con barra",g:"gluteos",eq:"Barra",img:"Good_Morning",tip:"Barra en la espalda, inclinate hacia adelante con la espalda recta y volvé."},
  // ---------- Pantorrillas ----------
  gpie:{n:"Gemelos de pie",g:"pantorrillas",eq:"Máquina de gemelos",img:"Standing_Calf_Raises",tip:"Bajá estirando bien y subí en puntas lo más alto que puedas."},
  gsen:{n:"Gemelos sentado",g:"pantorrillas",eq:"Máquina de gemelos sentado",img:"Seated_Calf_Raise",tip:"Pausa de 1 s abajo estirando y subí bien arriba."},
  gpren:{n:"Gemelos en prensa",g:"pantorrillas",eq:"Máquina de prensa",img:"Calf_Press_On_The_Leg_Press_Machine",tip:"Solo las puntas de los pies en la plataforma. Empujá con los tobillos."},
  gman:{n:"Gemelos con mancuerna",g:"pantorrillas",eq:"Escalón + mancuerna",img:"Standing_Dumbbell_Calf_Raise",tip:"Talones colgando del escalón. Bajá estirando y subí en puntas."},
  // ---------- Abdomen ----------
  plan:{n:"Plancha",g:"abdomen",eq:"Piso (colchoneta)",img:"Plank",tipo:"seg",tip:"Apoyado en antebrazos y puntas de pie, cuerpo recto. Apretá el abdomen y no dejes caer la cadera."},
  plat:{n:"Plancha lateral",g:"abdomen",eq:"Piso (colchoneta)",img:"Side_Bridge",tipo:"seg",tip:"De costado sobre un antebrazo, cadera arriba y cuerpo recto. Tiempo por lado."},
  crun:{n:"Abdominales (crunch)",g:"abdomen",eq:"Piso (colchoneta)",img:"Crunches",tipo:"pc",tip:"Subí solo los hombros del piso apretando el abdomen. Sin tirar del cuello."},
  crev:{n:"Crunch invertido",g:"abdomen",eq:"Piso (colchoneta)",img:"Reverse_Crunch",tipo:"pc",tip:"Acostado, llevá las rodillas al pecho despegando la cadera del piso."},
  rus:{n:"Giros rusos",g:"abdomen",eq:"Piso (con o sin peso)",img:"Russian_Twist",tipo:"pc",tip:"Sentado con el torso inclinado, girá de un lado al otro. Cada giro cuenta."},
  ecol:{n:"Elevación de piernas colgado",g:"abdomen",eq:"Barra de dominadas",img:"Hanging_Leg_Raise",tipo:"pc",tip:"Colgado de la barra, subí las piernas sin balancearte."},
  crpol:{n:"Crunch en polea",g:"abdomen",eq:"Polea alta + cuerda",img:"Cable_Crunch",tip:"De rodillas, llevá los codos hacia las rodillas enrollando la espalda."},
  rue:{n:"Rueda abdominal",g:"abdomen",eq:"Rueda abdominal",img:"Ab_Roller",tipo:"pc",tip:"De rodillas, rodá hacia adelante sin arquear la espalda y volvé con el abdomen."},
  dbug:{n:"Dead bug",g:"abdomen",eq:"Piso (colchoneta)",img:"Dead_Bug",tipo:"pc",tip:"Boca arriba, estirá brazo y pierna contrarios sin despegar la espalda baja del piso."},
  esc:{n:"Escaladores",g:"abdomen",eq:"Piso",img:"Mountain_Climbers",tipo:"pc",tip:"En posición de flexión, llevá las rodillas al pecho alternando rápido."},
  // ---------- Cardio ----------
  cinta:{n:"Cinta (caminar o trotar)",g:"cardio",eq:"Cinta",img:"Jogging_Treadmill",tipo:"min",tip:"A un ritmo en el que puedas hablar entrecortado. Podés subir la inclinación."},
  bici:{n:"Bicicleta fija",g:"cardio",eq:"Bicicleta fija",img:"Bicycling_Stationary",tipo:"min",tip:"Asiento a la altura de la cadera. Ritmo constante, que te haga transpirar."},
  remo:{n:"Remo ergómetro",g:"cardio",eq:"Máquina de remo",img:"Rowing_Stationary",tipo:"min",tip:"Empujá primero con las piernas y después tirá con los brazos."},
  eli:{n:"Elíptico",g:"cardio",eq:"Elíptico",img:"Elliptical_Trainer",tipo:"min",tip:"Movimiento suave y sin impacto. Usá también los brazos."},
  soga:{n:"Saltar la soga",g:"cardio",eq:"Soga (o simulá el movimiento)",img:"Rope_Jumping",tipo:"min",tip:"Saltos cortos sobre las puntas de los pies. Si te cansás, bajá el ritmo sin frenar."}
};

// Rutinas listas para usar (contenido propio de GymBlack). Cada ejercicio: [id del catálogo, series, repeticiones, descanso en segundos]
// En "seg" las repeticiones son segundos; en "min", minutos.
const PLANTILLAS = [
  {id:"t-principiante", n:"Principiante · Cuerpo completo", nivel:"Principiante", meta:"Aprender la técnica y ganar fuerza de base", dias:[
    {n:"Día A", ej:[["pren",3,"12",90],["pmq",3,"12",90],["jal",3,"12",90],["pmmq",3,"12",75],["cfa",3,"12",75],["plan",3,"30",45]]},
    {n:"Día B", ej:[["sgob",3,"12",90],["pmb",3,"10",90],["rmq",3,"12",90],["vlat",3,"12",60],["cpo",3,"12",60],["tcue",3,"12",60],["crun",3,"15",45]]},
    {n:"Día C", ej:[["ext",3,"12",75],["cfs",3,"12",75],["pimq",3,"12",90],["rpb",3,"12",90],["hth",3,"12",90],["bici",1,"10",0]]}]},
  {id:"t-hiper4", n:"Hipertrofia · Torso y pierna", nivel:"Intermedio", meta:"Ganar masa muscular entrenando 4 días", dias:[
    {n:"Torso A", ej:[["pb",4,"8–10",120],["rba",4,"8–10",120],["pim",3,"10–12",90],["jal",3,"10–12",90],["vlat",3,"12–15",60],["cez",3,"10–12",75],["tcue",3,"10–12",75]]},
    {n:"Pierna A", ej:[["sen",4,"8–10",150],["pren",3,"10–12",120],["ext",3,"12–15",75],["cfa",3,"10–12",75],["gpie",4,"12–15",60],["crpol",3,"12–15",60]]},
    {n:"Torso B", ej:[["pmil",4,"8–10",120],["rm1",3,"10–12",90],["pmb",3,"10–12",90],["jalc",3,"10–12",90],["paj",3,"12–15",60],["cm",3,"10–12",75],["rcr",3,"10–12",75]]},
    {n:"Pierna B", ej:[["pmr",4,"8–10",150],["hack",3,"10–12",120],["cfs",3,"10–12",75],["bulg",3,"10",90],["hth",3,"10–12",90],["gsen",4,"15",60],["ecol",3,"12",60]]}]},
  {id:"t-ppl", n:"Empuje · Tirón · Piernas", nivel:"Intermedio", meta:"Músculo y fuerza en 3 días bien completos", dias:[
    {n:"Empuje", ej:[["pb",4,"8",120],["pim",3,"10",90],["pmm",3,"10",90],["vlat",3,"15",60],["tcue",3,"12",60],["tnuca",3,"12",60]]},
    {n:"Tirón", ej:[["jal",4,"10",90],["rba",4,"8",120],["rpb",3,"10",90],["fp",3,"15",60],["cb",3,"10",75],["cmar",3,"12",60]]},
    {n:"Piernas", ej:[["sen",4,"8",150],["pmr",3,"10",120],["pren",3,"12",90],["cfa",3,"12",75],["gpie",4,"15",60],["plan",3,"40",45]]}]},
  {id:"t-quemar", n:"Tonificar y quemar grasa", nivel:"Todos los niveles", meta:"Moverte más, con descansos cortos y cardio", dias:[
    {n:"Día 1", ej:[["cinta",1,"10",0],["sgob",3,"15",45],["pmq",3,"15",45],["rmq",3,"15",45],["est",3,"12",45],["esc",3,"20",45],["bici",1,"15",0]]},
    {n:"Día 2", ej:[["remo",1,"8",0],["pren",3,"15",45],["flxi",3,"12",45],["jal",3,"15",45],["vlat",3,"15",45],["crun",3,"20",45],["eli",1,"15",0]]},
    {n:"Día 3", ej:[["bici",1,"10",0],["step",3,"12",45],["pdk",3,"15",45],["rpb",3,"15",45],["hth",3,"15",45],["rus",3,"20",45],["cinta",1,"15",0]]}]},
  {id:"t-gluteos", n:"Glúteos y piernas", nivel:"Intermedio", meta:"Foco en glúteos y piernas, con un día de tren superior", dias:[
    {n:"Glúteos y piernas 1", ej:[["hth",4,"10",120],["sen",4,"10",120],["bulg",3,"10",90],["pat",3,"15",60],["cfa",3,"12",75]]},
    {n:"Tren superior", ej:[["jal",3,"12",90],["pmq",3,"12",90],["rpb",3,"12",90],["vlat",3,"15",60],["tcue",3,"12",60],["crun",3,"15",45]]},
    {n:"Glúteos y piernas 2", ej:[["pmr",4,"10",120],["sumo",3,"10",120],["pren",3,"12",90],["patp",3,"15",45],["pgl1",3,"12",45],["ext",3,"15",60]]}]},
  {id:"t-casa", n:"En casa sin equipamiento", nivel:"Todos los niveles", meta:"Para los días que no podés venir al gimnasio", dias:[
    {n:"Día 1", ej:[["scp",4,"15",60],["flx",4,"10",75],["rinv",3,"10",75],["estc",3,"12",60],["plan",3,"30",45]]},
    {n:"Día 2", ej:[["ssal",3,"12",60],["flxi",3,"12",60],["fbanco",3,"12",60],["pgl1",3,"12",45],["crun",3,"20",45],["esc",3,"20",45]]},
    {n:"Día 3", ej:[["estc",3,"12",60],["flx",3,"10–15",75],["patp",3,"15",45],["dbug",3,"12",45],["rus",3,"20",45],["soga",1,"5",0]]}]}
];
