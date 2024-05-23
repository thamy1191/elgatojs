
// Obtener referencias a elementos del DOM.
let cells = document.querySelectorAll(".cell"); // Obtener todas las celdas del tablero...
let statustext = document.querySelector("#statustext"); // Obtener el elemento de texto de estado..
let restarBtn = document.querySelector("#restarBtn"); // Obtener el botón de reinicio..

// Condiciones de victoria..
const ganacondi = [ //...
    [0, 1, 2], // Fila superior...
    [3, 4, 5], // Fila del medio
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna del medio
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
];

// Arreglo para almacenar el estado de cada celda
let optiones = ["", "", "", "", "", "", "", "", ""];
// Jugador actual, comienza con "X"
let player = "X";
// Variable para controlar si el juego continúa
let seguir = false;

// Función para inicializar el juego
function iniciarGame(){
    // Agregar event listener a cada celda
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // Agregar event listener al botón de reinicio
    restarBtn.addEventListener("click", restarGame);
    // Mostrar el jugador actual en el texto de estado
    statustext.textContent = player;
    // Permitir que el juego continúe
    seguir = true;
}

// Función llamada cuando se hace clic en una celda
function cellClicked(){
    // Obtener el índice de la celda clickeada
    let cellIndex = this.getAttribute("cellIndex");
    // Verificar si la celda ya está ocupada o si el juego ha terminado
    if(optiones[cellIndex] !== "" || !seguir) {
        return;
    }
    // Actualizar la celda con el jugador actual
    actuCell(this, cellIndex);
    // Verificar si hay un ganador o si el juego terminó en empate
    checkganar();
    // Si el juego ha terminado y es el turno del jugador humano, salir de la función
    if (!seguir && player === "X") {
        return;
    }
    // Si es el turno de la máquina (jugador "O"), hacer un movimiento después de un breve retraso
    if (player === "O") {
        setTimeout(maquina, 500);
    }
}

// Función para actualizar una celda con el jugador actual
function actuCell(cell, index){
    optiones[index] = player;
    cell.textContent = player;
}

// Función para cambiar al siguiente jugador
function cambiarplayer(){
    player = (player === "X") ? "O" : "X";
    statustext.textContent = player;
}

// Función para verificar si hay un ganador o si el juego terminó en empate
function checkganar(){
    let rondawin = false;

    for (let i = 0; i < ganacondi.length; i++) {
        const condition = ganacondi[i];
        const cellA = optiones[condition[0]];
        const cellB = optiones[condition[1]];
        const cellC = optiones[condition[2]];

        if(cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC){
            rondawin = true;
            break;
        }    
    }

    if (rondawin) {
        statustext.textContent = player + " ganar!";
        seguir = false;
    } else if (!optiones.includes("")) {
        statustext.textContent = "empates";
        seguir = false;
    } else {
        cambiarplayer();
    }
}

// Función para reiniciar el juego
function restarGame(){
    // Restablecer el jugador actual a "X"
    player = "X";
    // Reiniciar el arreglo de opciones
    optiones = ["", "", "", "", "", "", "", "", ""];
    // Mostrar el jugador actual en el texto de estado
    statustext.textContent = player;
    // Limpiar el contenido de todas las celdas en el tablero
    cells.forEach(cell => cell.textContent = "");
    // Permitir que el juego continúe
    seguir = true;
}

// Función para que la máquina (jugador "O") haga un movimiento aleatorio
function maquina() {
    // Obtener las celdas vacías
    let emptyCells = [];
    optiones.forEach((value, index) => {
        if (value === "") {
            emptyCells.push(index);
        }
    });
    // Elegir aleatoriamente una celda vacía
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let moveIndex = emptyCells[randomIndex];
    let cell = cells[moveIndex];
    // Simular un clic en la celda seleccionada
    cell.click();
}

// Iniciar el juego cuando se carga la página
iniciarGame();