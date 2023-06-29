const nombresJugadores = [];
let mejoresTiempos = [];

// Recuperar récords del almacenamiento local si existen
if (localStorage.getItem("memoramaRecords")) {
  mejoresTiempos = JSON.parse(localStorage.getItem("memoramaRecords"));
}

const imagenes = [
    "imagenes/imagen1.jpg",
    "imagenes/imagen2.jpg",
    "imagenes/imagen3.jpg",
    "imagenes/imagen4.jpg",
    "imagenes/imagen5.jpg",
    "imagenes/imagen6.jpg",
    "imagenes/imagen7.jpg",
    "imagenes/imagen8.webp",
    "imagenes/imagen9.jpg",
    "imagenes/imagen10.jpg",
    "imagenes/imagen11.webp",
    "imagenes/imagen12.jpg",
    "imagenes/imagen13.jpg",
    "imagenes/imagen14.jpg",
    "imagenes/imagen15.png",
    "imagenes/imagen16.jpg",
    "imagenes/imagen1.jpg",
    "imagenes/imagen2.jpg",
    "imagenes/imagen3.jpg",
    "imagenes/imagen4.jpg",
    "imagenes/imagen5.jpg",
    "imagenes/imagen6.jpg",
    "imagenes/imagen7.jpg",
    "imagenes/imagen8.webp",
    "imagenes/imagen9.jpg",
    "imagenes/imagen10.jpg",
    "imagenes/imagen11.webp",
    "imagenes/imagen12.jpg",
    "imagenes/imagen13.jpg",
    "imagenes/imagen14.jpg",
    "imagenes/imagen15.png",
    "imagenes/imagen16.jpg",
];

let tarjetasVolteadas = [];
let tarjetasAcertadas = [];
let paresAcertados = 0;
let contadorIntentos = 0;
let temporizador;
let tiempoTranscurrido = 0;

function revolverTarjetas() {
    for (let i = imagenes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
    }
}

function crearTablero() {
    const tablero = document.getElementById("tablero");
    for (let i = 0; i < imagenes.length; i++) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.dataset.img = imagenes[i];
        tarjeta.addEventListener("click", voltearTarjeta);
        tablero.appendChild(tarjeta);
    }
}

function voltearTarjeta() {
    if (temporizador === undefined) {
        temporizador = setInterval(actualizarTiempo, 1000);
    }

    if (tarjetasVolteadas.length < 2 && !this.classList.contains("volteada") && !tarjetasAcertadas.includes(this)) {
        this.style.backgroundImage = `url(${this.dataset.img})`;
        this.classList.add("volteada");
        tarjetasVolteadas.push(this);

        if (tarjetasVolteadas.length === 2) {
            const tarjeta1 = tarjetasVolteadas[0];
            const tarjeta2 = tarjetasVolteadas[1];

            if (tarjeta1.dataset.img === tarjeta2.dataset.img) {
                tarjetasAcertadas.push(tarjeta1, tarjeta2);
                tarjetasVolteadas = [];
                paresAcertados++;
                contadorIntentos++;
                document.getElementById("score").textContent = paresAcertados;

                if (paresAcertados === imagenes.length / 2) {
                    clearInterval(temporizador);
                    temporizador = undefined;
                    registrarTiempo();
                    alert("¡Has ganado!");
                }
            } else {
                setTimeout(() => {
                    tarjeta1.style.backgroundImage = "";
                    tarjeta2.style.backgroundImage = "";
                    tarjeta1.classList.remove("volteada");
                    tarjeta2.classList.remove("volteada");
                    tarjetasVolteadas = [];
                    contadorIntentos++;
                }, 1000);
            }
        }
    }
}

function actualizarTiempo() {
    tiempoTranscurrido++;
    document.getElementById("timer").textContent = tiempoTranscurrido;
}

function registrarTiempo() {
    const nombreJugador = prompt("¡Felicidades! Has ganado.\nIngresa tu nombre:");
    if (nombreJugador) {
        nombresJugadores.push(nombreJugador);
        mejoresTiempos.push(tiempoTranscurrido);
        mejoresTiempos.sort((a, b) => a - b);
        if (mejoresTiempos.length > 3) {
            nombresJugadores.pop();
            mejoresTiempos.pop();
        }
        actualizarTopTres();
    }
    // Guardar récords en el almacenamiento local
  localStorage.setItem("memoramaRecords", JSON.stringify(mejoresTiempos));
}

function actualizarTopTres() {
    const topScores = document.getElementById("topScores");
    topScores.innerHTML = "";
    for (let i = 0; i < mejoresTiempos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${nombresJugadores[i]} - ${mejoresTiempos[i]} segundos`;
        topScores.appendChild(li);
    }
}

function crearTablero() {
    const tablero = document.getElementById("tablero");
    let fila = document.createElement("div");
    fila.className = "fila";

    for (let i = 0; i < imagenes.length; i++) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.dataset.img = imagenes[i];
        tarjeta.addEventListener("click", voltearTarjeta);
        fila.appendChild(tarjeta);

        if ((i + 1) % 8 === 0) {
            tablero.appendChild(fila);
            fila = document.createElement("div");
            fila.className = "fila";
        }
    }

    if (fila.children.length > 0) {
        tablero.appendChild(fila);
    }
}


revolverTarjetas();
crearTablero();