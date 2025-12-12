# Snake 2D – Videojuego en JavaScript

## Informe Final – Programación 1

<img width="512" height="512" alt="UCB" src="https://github.com/user-attachments/assets/59951f71-2e9d-463c-8f35-93a9c99edacf" />


**Universidad:** Universidad Católica Boliviana (UCB)
**Asignatura:** Programación 1 (SIS-112)
**Docente:** Ing. Eddy Escalante
**Carrera:** Ingeniería Industrial
**Fecha de presentación:** 12/12/2025

### Integrantes

- Pablo Andrés Arze Bazán  
- Jaqueline Churqui Limachi
- Valentina Justiniano Grimaldos

## 2. Introducción

El presente informe documenta el desarrollo del videojuego **Snake 2D**, creado como proyecto final de la asignatura **Programación 1 (SIS-112)**. El objetivo principal del proyecto consiste en implementar un videojuego funcional utilizando **JavaScript**, aplicando conceptos fundamentales como estructuras de datos, matrices, eventos del teclado, manipulación del DOM, orientación a objetos y renderizado mediante el elemento `<canvas>`.

Además del desarrollo del videojuego, el proyecto incluye la integración con el robot **Dobot MG400** mediante el software **DobotStudio Pro**, lo cual permite controlar ciertas acciones del juego utilizando un dispositivo externo. Esta integración fomenta el vínculo entre la programación y la automatización, demostrando la aplicabilidad de la lógica de software en sistemas físicos.

Este proyecto contribuye significativamente al proceso de aprendizaje, ya que permite a los estudiantes enfrentar un ciclo completo de desarrollo: diseño del videojuego, implementación de la lógica, manejo de recursos gráficos, documentación en formato Markdown, uso de repositorios GitHub y trabajo colaborativo en equipo. A lo largo del informe se describen las decisiones técnicas, los elementos del diseño del juego, los niveles implementados, los resultados obtenidos y las lecciones aprendidas durante el proceso.

## 3. Desarrollo del Proyecto

### 3.1 Diseño del Videojuego

#### Concepto general

El videojuego **Snake 2D** es una reinterpretación moderna del clásico "Snake", implementado completamente en JavaScript y diseñado para funcionar dentro de un entorno web mediante el uso del elemento `<canvas>`. El proyecto utiliza una estructura modular que separa la lógica del jugador, la gestión de niveles, la representación gráfica y la interacción con la interfaz de usuario.

El juego se compone de tres niveles progresivos, cada uno con un mapa distinto representado mediante una **matriz bidimensional (Matrix)** que define paredes, obstáculos, áreas transitables y tipos de manzana. La serpiente se mueve dentro de un área jugable interna (10 × 18 celdas), mientras que el resto del mapa funciona como decoración y bordes visuales.

#### Historia / narrativa breve

Aunque Snake es un juego de tipo arcade sin narrativa compleja, en esta versión se plantea una progresión temática:

- **Nivel 1 – Jardín:**  
Comenzamos en un jardín dónde "snake" debe conseguir manzanas (de momento solo rojas).

- **Nivel 2 – Casa:**  
Luego pasa a la casa al terminarse la comida del jardín.
 
- **Nivel 3 – Cárcel:**  
Finalmente termina en la cárcel por comerse la comida de la casa.

Cada nivel representa un entorno con mayor complejidad y riesgo, reforzando la progresión del jugador.

#### Personaje principal

El único personaje del videojuego es la **serpiente**.  
Sus características, definidas en `player.js`, son:

- Se inicializa en el centro del área jugable.  
- Se mueve con un sistema de direcciones basado en incrementos fila/columna.  
- No puede girar 180° de forma inmediata.  
- Crece cada vez que come una manzana.  
- Su cuerpo se modela como una lista de segmentos (arreglo de objetos `{row, col}`).

#### Objetivo del juego

El objetivo principal es completar los tres niveles cumpliendo los requisitos establecidos para cada uno:

1. **Alcanzar una puntuación mínima**, definida por el nivel.  
2. **Comer un número específico de manzanas** (rojas, doradas o multicolor).  

Una vez cumplidas ambas condiciones, el nivel se considera completado y el jugador puede avanzar al siguiente.

#### Mecánicas principales del juego

- **Movimiento de la serpiente:**  
  Controlado por las flechas del teclado mediante listeners de JavaScript.  
  El movimiento ocurre por intervalos (loop basado en `setTimeout`), cuya velocidad depende del nivel.

- **Crecimiento del jugador:**  
  Al comer una manzana, se agrega un nuevo segmento al cuerpo de la serpiente.

- **Puntuación:**  
  - Roja: 10 puntos  
  - Dorada (solo Nivel 2, solo aparecen 3 por partida): 20 puntos  
  - Multicolor (solo Nivel 3, solo aparecen 3 por partida): 30 puntos  

- **Generación de manzanas:**  
  La manzana aparece en una celda aleatoria libre, sin superponerse con:
    - Obstáculos  
    - Segmentos del jugador  

- **Colisiones:**  
  El juego termina si el jugador:
    - Choca con paredes u obstáculos  
    - Sale del área jugable  
    - Se choca consigo mismo  

- **Interfaz de usuario (UI):**  
  Incluye botones para:  
  - Escribir el nombre del jugador y aceptar.  
  - Cambiar de nivel (aunque solo el nivel 1 está desbloqueado al inicio; los demás se van desbloqueando progresivamente).  
  - Volver al nivel anterior.  

Los tres botones de niveles están visibles desde el inicio del juego; sin embargo, solo el Nivel 1 se encuentra habilitado al empezar. Los niveles 2 y 3 permanecen deshabilitados hasta que el jugador alcance la puntuación mínima requerida.

Los botones se ubicaron en la parte superior derecha del área de juego. En esa misma sección se añadió el botón para ingresar el nombre del jugador, el cual luego se muestra en la pantalla de resultados.  

Estos botones se habilitan automáticamente según el progreso del jugador.

#### Condición de victoria y derrota

- **Victoria de nivel:**  
  Se alcanza cuando:
Aparece un mensaje emergente (“¡Nivel completado!”) y se desbloquea el siguiente nivel.

- **Derrota:**  
Si ocurre una colisión, se detiene el juego, suena la animación de “muerte” y se muestra un mensaje ("¡Nooo, chocaste!")

### 3.1.1 Descripción de los Niveles

El videojuego está compuesto por tres niveles progresivos, cada uno representado mediante una matriz de 12 × 20 celdas. La temática de cada nivel avanza de forma narrativa y visual:

- El jugador inicia en un **jardín** abierto.
- Luego ingresa a una **casa**, donde los espacios son más estrechos.
- Finalmente llega a una **cárcel**, donde se encuentra rodeado de lava y muros peligrosos.

A continuación se detalla cada nivel.

#### Nivel 1 – Jardín

- **Objetivo:** 5 manzanas | 50 puntos  
- **Dificultad:** Baja  
- **Tipo de manzana:** Roja (10 puntos)  
- **Obstáculos:** Ninguno  
- **Temática:** Un jardín abierto donde la serpiente puede moverse libremente.  
- **Características destacadas:**  
  - Ideal para aprender los controles.  
  - Área despejada sin peligros.  
  - Velocidad más lenta (2000 ms por movimiento).  
  - Fondo verde tipo pasto (tiles 6).

Este nivel introduce al jugador en un ambiente seguro y sin obstáculos.

#### Nivel 2 – Casa

- **Objetivo:** 10 manzanas | 100 puntos  
- **Dificultad:** Media  
- **Tipos de manzana:**  
  - Roja  
  - Dorada (hasta 3 apariciones por nivel, 20 puntos)  
- **Obstáculos:**  
  - Muros y muebles representados por el tile 30.  
- **Temática:** Una casa con habitaciones y pasillos más estrechos.  
- **Características destacadas:**  
  - El mapa tiene más objetos que bloquean el camino.  
  - Fondo con patrones tipo piso (tiles 8, 9, 19).  
  - Velocidad intermedia (1500 ms).  
  - Mayor necesidad de planificación del movimiento.

Este nivel representa un entorno doméstico donde el jugador debe maniobrar entre los obstáculos.

#### Nivel 3 – Cárcel

- **Objetivo:** 15 manzanas | 150 puntos  
- **Dificultad:** Alta  
- **Tipos de manzana:**  
  - Roja  
  - Multicolor (hasta 3 apariciones, 30 puntos)  
- **Obstáculos:**  
  - Lava (tile 28), que produce derrota instantánea.  
  - Muros de celda (tiles 20, 21, 22).  
- **Temática:** Una cárcel en la que la serpiente debe escapar evitando zonas peligrosas.  
- **Características destacadas:**  
  - Mapa más cerrado y exigente.  
  - Obstáculos críticos distribuidos estratégicamente.  
  - Velocidad rápida (1000 ms).  
  - Entorno visual oscuro que representa peligro.

Este nivel final exige precisión máxima y representa el desafío principal del videojuego.

### 3.2 Herramientas Utilizadas

El desarrollo del videojuego **Snake 2D** requirió el uso de diversas herramientas de software que permitieron implementar la lógica del juego, gestionar recursos gráficos, documentar el proyecto y trabajar colaborativamente.

#### Lenguaje de Programación
- **JavaScript (ES6):**  
  Lenguaje principal del proyecto, utilizado para la lógica del juego, detección de colisiones, renderizado en el `<canvas>`, manejo de eventos del teclado y actualización dinámica de la interfaz de usuario.  
  Se emplearon conceptos de:
  - Programación orientada a objetos (clases `SnakeGame`, `Player`, `Matrix`)
  - Uso de arreglos bidimensionales para mapas
  - Funciones de tiempo (`setTimeout`) para la animación del juego
  - Manipulación del DOM

#### Entorno de Desarrollo
- **Visual Studio Code (VS Code):**  
  Editor principal utilizado para programar. Se aprovechó:
  - Extensiones para JavaScript
  - Visualización en vivo del proyecto
  - Gestión del repositorio GitHub integrado

#### Software para la integración física
- **DobotStudio Pro:**  
  Plataforma oficial para controlar el robot **Dobot MG400**, utilizada para configurar y vincular el movimiento del robot con acciones dentro del videojuego.  
  Esta herramienta permitió enviar señales de entrada al juego mediante un teclado externo.

#### Repositorio y Control de Versiones
- **GitHub:**  
  Utilizados para almacenar el proyecto, compartirlo en equipo y documentarlo mediante un archivo `README.md`.  
  GitHub también permite visualizar correctamente el informe final gracias al soporte nativo para Markdown.

#### Recursos Gráficos
- Se utilizaron sprites en formato **PNG**, ubicados en la carpeta `/assets/`.  
  Incluyen:
  - Fondos de cada nivel  
  - Obstáculos  
  - Diferentes tipos de manzana  
  - Cabeza y cuerpo de la serpiente
  
Nota técnica:  
Todos los sprites del videojuego —como la serpiente, las manzanas, los muros y los fondos— fueron renderizados a un tamaño uniforme de **80 × 80 píxeles**. Este valor corresponde al tamaño de cada celda del mapa y garantiza proporciones consistentes dentro del canvas.

Todos estos recursos fueron cargados dinámicamente mediante código JavaScript.

#### Conversión del Informe
- **cloudconvert.com**  
  Herramienta recomendada por el docente para convertir el archivo Markdown del informe en un documento PDF imprimible.

En conjunto, estas herramientas permitieron un desarrollo modular, escalable y alineado con las prácticas profesionales del desarrollo de software.

### 3.3 Integración con el Dobot MG400

Como requisito del proyecto, el videojuego Snake 2D incluye la integración con el robot **Dobot MG400**, permitiendo que ciertos movimientos del juego puedan ser controlados mediante acciones físicas o señales enviadas desde el robot utilizando el entorno **DobotStudio Pro**.

#### Objetivo de la integración
La finalidad de esta etapa es demostrar que la lógica del videojuego puede interactuar con un dispositivo físico externo, reforzando los conceptos de automatización, comunicación entre sistemas y control basado en eventos.

#### Configuración en DobotStudio Pro

1. Se conectó el robot MG400 al equipo mediante su interfaz USB o conexión LAN.  
2. Dentro de **DobotStudio Pro**, se creó un flujo básico que permite que el robot envíe señales al computador mediante el uso de:
   - Simulación de teclas del teclado  
   - Eventos configurados en el panel de I/O  
3. Se asignaron gestos o posiciones del robot para activar comandos que el juego reconoce como entrada del usuario.

Ejemplo configurado:
- Movimiento del robot hacia arriba → envía la tecla `ArrowUp`
- Movimiento hacia abajo → `ArrowDown`
- Desplazamiento lateral → `ArrowLeft` o `ArrowRight`

Estas teclas son las mismas que utiliza el juego para controlar la ser­piente, lo que permite vincular el dispositivo físico con el comportamiento del juego.

#### Integración con el videojuego

El archivo `game.js` contiene el manejador de eventos del teclado:

``javascript
document.addEventListener("keydown", (e) => {
    if (this.gameOver || this.isPaused) return;
    ...
});

### 3.4 Organización del Trabajo

El proyecto fue desarrollado en equipo por los tres integrantes, distribuyendo las tareas según las habilidades de cada uno y manteniendo una comunicación constante durante el proceso.

#### Responsabilidades del equipo

- **Pablo Andrés Arze Bazán**
  - Integración general del proyecto.
  - Configuración del main.js
  - Documentación del informe en formato Markdown y PDF.
  - Implementación de sonidos en el videojuego.
  - Pruebas del robot Dobot MG400.

- **Jaqueline Churqui Limachi**
  - Construcción del sistema de niveles y diseño de mapas en forma de matrices.
  - Estructuración del repositorio GitHub.
  - Configuración del game.html.
  - Organización de los assets gráficos (sprites, manzanas, muro, etc.).
  - Pruebas de jugabilidad y equilibrio de dificultad entre niveles.
  - Coordinación de las pruebas de integración con el Dobot MG400.

- **Valentina Justiniano Grimaldos**
  - Desarrollo de la interfaz de usuario (UI) y botones de navegación.
  - Implementación del sistema de desbloqueo de niveles.
  - Apoyo en la configuración y pruebas del robot Dobot MG400.
  - Revisión del código y colaboración en la documentación.
  - Contribución al diseño visual de la interfaz.

#### Trabajo colaborativo

El uso de GitHub permitió que el equipo trabajara de manera paralela y organizada.  
Cada integrante realizó *commits* relacionados con su área asignada y todos participaron en:

- Pruebas del videojuego  
- Corrección de errores  
- Ajustes finales  
- Preparación de la presentación del proyecto  

Este enfoque permitió cumplir los objetivos del proyecto y garantizar la calidad del producto final.

## 4. Resultados

El videojuego **Snake 2D** se ejecutó correctamente en el navegador y cumplió con todos los requisitos funcionales establecidos en la rúbrica del proyecto. A continuación se presentan los resultados obtenidos durante las pruebas de funcionamiento, acompañados de capturas representativas de cada nivel.

### Funcionamiento general

El juego se carga correctamente en el canvas y permite el control de la serpiente mediante las flechas del teclado o mediante entradas generadas por el robot Dobot MG400.  
El sistema de colisiones, crecimiento, puntuación, generación aleatoria de manzanas y detección de final de nivel opera de manera estable en todos los niveles.

### Nivel 1 – Jardín

Ambiente amplio y sin obstáculos, pensado para que el jugador se familiarice con los controles.  
Las manzanas rojas aparecen aleatoriamente y la serpiente responde con suavidad a los movimientos de dirección.
 
`![Nivel 1 – Jardín]`<img width="1434" height="817" alt="Nivel1" src="https://github.com/user-attachments/assets/57a8f3bd-d33b-4e42-8434-e194e4960e5f" />


Resultados observados:
- Jugabilidad fluida.  
- Crecimiento correcto de la serpiente al comer manzanas.  
- Puntuación y contador de manzanas funcionan adecuadamente.  
- Finalización del nivel al cumplir los objetivos.

### Nivel 2 – Casa

El mapa incluye obstáculos tipo “muebles” representados por paredes fijas.  
Aparecen también manzanas doradas que otorgan 20 puntos. Esto aumenta la complejidad del movimiento y favorece decisiones estratégicas.
 
`![Nivel 2 – Casa]` <img width="1417" height="822" alt="Nivel2" src="https://github.com/user-attachments/assets/4774609b-532e-4df4-8dd3-b1b14a7c3935" />


Resultados observados:
- Detección correcta de colisiones con paredes.  
- Aparición limitada de manzanas doradas.  
- Incremento de la dificultad debido a pasillos más estrechos.  
- Cambios de velocidad adecuados al nivel.

### Nivel 3 – Cárcel

El nivel final contiene lava (tile 28), obstáculos mortales que producen derrota instantánea.  
La velocidad es superior y la navegación requiere precisión.
 
`![Nivel 3 – Cárcel]`<img width="1388" height="691" alt="Nivel3" src="https://github.com/user-attachments/assets/153bc008-ea5c-45b0-a2b9-2c5f04787aba" />


Resultados observados:
- Alta dificultad con colisiones más frecuentes.  
- Manzanas multicolor que otorgan 30 puntos y un desafío adicional en la recolección.  
- Correcta detección de la derrota al tocar la lava.  
- Objetivos bien balanceados para un nivel final.

### Sistema de niveles y progresión

El videojuego actualiza automáticamente el estado de los botones según:
- Nivel actual  
- Puntuación  
- Número de manzanas recolectadas  
- Niveles desbloqueados  

Esto garantiza una interfaz intuitiva y guiada para el jugador.

### Integración con el Dobot MG400

Durante las pruebas se confirmó que el robot puede enviar señales equivalentes a pulsaciones del teclado hacia el videojuego.  
![Dobotjuego](https://github.com/user-attachments/assets/25b0eb99-f165-47a0-b851-3e280db03f8a)


## 5. Conclusiones y Lecciones Aprendidas

El desarrollo del videojuego **Snake 2D** permitió aplicar de manera práctica los conceptos fundamentales de la asignatura Programación 1, combinando lógica computacional, estructuras de datos, programación orientada a objetos y manipulación gráfica mediante el elemento `<canvas>` de HTML5. El proyecto cumplió con todos los requerimientos establecidos en la rúbrica, incluyendo la creación de tres niveles con dificultad progresiva, un sistema de puntuación funcional y la integración con el robot Dobot MG400.

### Conclusiones principales

- **Cumplimiento de requisitos del videojuego:**  
  Los tres niveles funcionan correctamente, cada uno con su propia temática (jardín, casa y cárcel). El juego implementa colisiones, crecimiento de la serpiente, generación dinámica de manzanas y condiciones claras de victoria y derrota.

- **Modularidad del código:**  
  La estructura del proyecto —compuesta por las clases `SnakeGame`, `Player` y `Matrix`— demuestra un diseño modular que facilita su mantenimiento, extensión y comprensión. La separación entre lógica, niveles, interfaz y renderizado permitió trabajar de manera organizada.

- **Integración con el Dobot MG400:**  
  Se logró conectar el robot con el juego mediante DobotStudio Pro, enviando señales equivalentes a teclas del teclado. Esto evidencia la relación entre software y hardware, reforzando la naturaleza interdisciplinaria del proyecto.

- **Trabajo en equipo efectivo:**  
  La división de tareas permitió avanzar en paralelo y mantener un flujo constante de desarrollo. El uso del repositorio GitHub facilitó el control de versiones, la revisión del código y la documentación colaborativa.

### Lecciones aprendidas

- **Importancia de las matrices en videojuegos 2D:**  
  Representar niveles mediante arreglos bidimensionales mostró ser una técnica eficiente para mapear entornos, detectar obstáculos y modificar mapas sin cambiar la lógica principal.

- **Programación orientada a objetos aplicada a juegos:**  
  Se reforzó el uso de clases para modelar entidades del juego (jugador, mapa, motor), mejorando la claridad del código.

- **Optimización y manejo de estados:**  
  Se aprendió a controlar estados complejos como pausa, victoria, derrota, cambio de nivel y actualización de la UI sin afectar la ejecución del programa.

- **Interacción entre sistemas físicos y digitales:**  
  El uso del Dobot MG400 permitió entender cómo un robot puede actuar como controlador externo, abriendo la puerta a proyectos de automatización y gamificación en entornos reales.

- **Documentación profesional en Markdown:**  
  Redactar el informe utilizando formato Markdown ayudó a comprender su valor en proyectos reales de software, especialmente en plataformas como GitHub.

### Recomendaciones para trabajos futuros

- Agregar más niveles con configuraciones avanzadas.   
- Integrar un menú principal y sistema de guardado.  
- Añadir modos de juego alternativos como “contrarreloj” o “endless mode”.  
- Evaluar la migración a `requestAnimationFrame` para mejorar la suavidad del movimiento.

En conjunto, el proyecto demostró que es posible desarrollar un videojuego completo, funcional y educativo utilizando únicamente JavaScript, y complementarlo con un dispositivo físico como el Dobot MG400. Este trabajo representa un avance significativo en las habilidades técnicas adquiridas durante el semestre.

## 6. Anexos  
### Fragmentos de Código Importantes

En esta sección se presentan los fragmentos más relevantes del videojuego, seleccionados por su aporte a la lógica central del proyecto. Estos ejemplos permiten comprender cómo se implementaron las mecánicas principales del juego.

### 6.1 Inicialización del jugador (Player.js)

Este fragmento muestra cómo se ubica la serpiente en el centro del área jugable y cómo se define su dirección inicial.

``javascript
initBody() {
  const startRow = this.playableRowStart + Math.floor(this.playableRows / 2);
  const startCol = this.playableColStart + Math.floor(this.playableCols / 2);
  return [{ row: startRow, col: startCol }];
}

### 6.2 Movimiento y crecimiento del jugador

Define las acciones principales de la serpiente: avanzar y crecer al comer una manzana.

move(newHead) {
  this.body.unshift(newHead);
  this.body.pop();
}

grow(newHead) {
  this.body.unshift(newHead);
}

### 6.3 Detección de colisiones (Game.js)

Este fragmento determina si la serpiente choca contra paredes, obstáculos o consigo misma.

if (
  this.esObstaculo(this.mapMatrix.getValue(newHead.row, newHead.col)) ||
  isSelfCollision
) {
  this.endGame("¡Nooo, chocaste!");
  return;
}

### 6.4 Generación de manzanas especiales

Controla la aparición de manzanas doradas y multicolor en los niveles 2 y 3.

if (this.nivelActual === 2 && this.doradasRestantes > 0 && Math.random() < 0.3) {
  tipoManzana = 24; 
  this.doradasRestantes--;
} else if (this.nivelActual === 3 && this.multicolorRestantes > 0 && Math.random() < 0.3) {
  tipoManzana = 25; 
  this.multicolorRestantes--;
}

### 6.5 Renderizado del mapa y del jugador (Game.js)

Aquí se dibuja el mapa completo, la manzana y cada segmento de la serpiente utilizando el canvas.

this.ctx.drawImage(
  img,
  offsetX + c * this.cellSize,
  offsetY + r * this.cellSize,
  this.cellSize,
  this.cellSize
);

this.player.body.forEach((part, i) => {
  const imgIndex = i === 0 ? 26 : 27; // Cabeza y cuerpo
  this.ctx.drawImage(
    this.images[imgIndex],
    offsetX + part.col * this.cellSize,
    offsetY + part.row * this.cellSize,
    this.cellSize,
    this.cellSize
  );
});

### 6.6 Representación de niveles en matriz (main.js)

Los niveles se definen mediante matrices que dictan paredes, obstáculos y áreas disponibles.

const LEVELS = {
  1: [
    [0,1,1,1,1,...],
    [3,6,6,6,6,...],
    [3,6,6,6,6,...],
    ...
  ],
  2: [...],
  3: [...]
};

### 6.7 Sistema de niveles desbloqueables (app.js)

Fragmento que controla qué niveles están habilitados para el jugador.

const nivelesDesbloqueados = {
  1: true,
  2: false,
  3: false
};

function unlockNextLevelButton(nextLevel) {
  nivelesDesbloqueados[nextLevel] = true;
}

### 6.8 Manejo del teclado e integración con el Dobot MG400

El juego interpreta las señales enviadas por el robot como si fueran teclas del jugador.

document.addEventListener("keydown", (e) => {
  if (this.gameOver || this.isPaused) return;

  let newDirection = null;
  switch (e.key) {
    case "ArrowUp": newDirection = { dr: -1, dc: 0 }; break;
    case "ArrowDown": newDirection = { dr: 1, dc: 0 }; break;
    case "ArrowLeft": newDirection = { dr: 0, dc: -1 }; break;
    case "ArrowRight": newDirection = { dr: 0, dc: 1 }; break;
  }

  if (newDirection) this.player.setDirection(newDirection);
});
