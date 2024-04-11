
// escribiendo desde js a html

/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'juego adivina el número';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Ingresa un número entre 1 y 100';
*/

// ---- VARIABLES ------
let numeroSecreto = 0;
let contadorIntentos = 1;
let listaNumerosSorteados = []; // crear un arreglo para que el numero secreto no se repita
let vidasMaximas = 7;
let vidas = vidasMaximas;
let limite = 1;
let numeroMaximo = 10;



// creando una función generica para reducir la repetición de código
function asignarTextoElemento (elemento, texto){ // recibir dos parametros
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}



// creando la function para generar el numero secreto

function generarNumeroSecreto(){
    // return Math.floor(Math.random()*10)+1;
  //  return numeroSecreto;  hay que agregar la variable que se quiere retornar pero creando una variable global se puede retornar solo el numero
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // si el numero generado está incluido en la lista
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('h3','Ya se sortearon todos los números posibles, por favor reinicia la página');
        // document.getElementById('valorUsuario').disabled = true;
        elementosDeshabilitados();
        return; // Sale de la función sin generar un nuevo número secreto
    } else {
        if(listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}


function elementosDeshabilitados(){
    document.getElementById('intentarbutton').disabled = false; // deshabilitar boton intentar
    document.getElementById('valorUsuario').disabled = true;
    document.getElementById('nuevo-juego').disabled = true;
}


// función para cuando el usuario de clic al botón y empiece a jugar
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if(numeroDeUsuario === numeroSecreto) {

        asignarTextoElemento('h3', `Correcto! &#128077 adivinaste el número secreto en ${contadorIntentos} ${contadorIntentos == 1 ? 'intento' : 'intentos'}`);
        document.getElementById('intentarbutton').disabled = true; // deshabilitar boton intentar
        document.getElementById('valorUsuario').disabled = true;
        document.getElementById('nuevo-juego').removeAttribute('disabled');
        asignarTextoElemento('p', `Vidas: ${vidas - limite}`);

    } else {
        // el usuario no acertó
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('h3', `El número es menor`);
        } else {
            asignarTextoElemento('h3', `El número es mayor`);
        }
        contadorIntentos++;
        vidas--;
        asignarTextoElemento('p', `Vidas: ${vidas}`);
        limpiarCaja();
        contadorVidas();
    } 
    return;
}



// function contadorVidas(){
//     if(vidas == 0) {
//         asignarTextoElemento('h3', `Juego terminado, ya no tienes vidas`);
//         document.querySelector('btn-intentar').setAttribute('disabled', 'true');
//     }
// }

function contadorVidas(){
    if(vidas == 0) {
        asignarTextoElemento('h3', `Juego terminado, ya no tienes vidas`);
        document.getElementById('intentarbutton').setAttribute('disabled', 'true');
        document.getElementById('valorUsuario').disabled = true;
        
    } else { // Añadir else para manejar caso en que el jugador tenga vidas disponibles
        asignarTextoElemento('p', `Vidas: ${vidas}`);
    }
    return;
}


function limpiarCaja(){
    document.querySelector('#valorUsuario').value ='';
}


function condicionesIniciales(){
    asignarTextoElemento('h1', 'juego adivinar número');
    asignarTextoElemento('h3', `Ingresa un número entre 1 y ${numeroMaximo}`);
    asignarTextoElemento('p', `Vidas: ${vidas}`);
    numeroSecreto = generarNumeroSecreto();
    // contadorIntentos = vidas;
}
condicionesIniciales();

function resetearValoresDeContadores() {
    vidas = vidasMaximas;
    contadorIntentos = 1;
}

function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    resetearValoresDeContadores();
    document.getElementById('valorUsuario').disabled = false;
    document.getElementById('intentarbutton').disabled = false;
    asignarTextoElemento('p', `Vidas: ${vidas}`); // Actualizar el texto que muestra el número de vidas en el documento HTML
}










/* VARIABLES 
------------------------------
let numeroMaximoPosible = 100;
let numeroUsuario = 0; // crear la variable fuera
let numeroSecreto = Math.floor(Math.random()*numeroMaximoPosible)+1;
let contadorIntentos = 1; // inicializar la variable en 1
let maximoIntentos = 7;

// CICLO While para que el usuario se mantenga jugando hasta adivinar
while (numeroUsuario != numeroSecreto){

    // convertir el numero del usuario a entero y numero
    numeroUsuario = parseInt(prompt(`Ingresa un número entre el 1 y ${numeroMaximoPosible}`));

    // mostrar el tipo de dato del numero
    console.log(typeof(numeroUsuario));

    if (numeroUsuario == numeroSecreto) {
        // La condición se cumplió y se acertó el número
        alert(`Acertaste, el número es: ${numeroSecreto}, lo adivinaste en ${contadorIntentos} ${contadorIntentos == 1 ? 'intento' : 'intentos'}`); //usando el operador ternario, ? es if y : es else
    } else {
        if (numeroUsuario > numeroSecreto){
            alert(`El número secreto es menor`);
        } else {
            alert(`El número secreto es mayor`);
        }

        contadorIntentos++; // incrementar el contador en caso de no acertar
        if (contadorIntentos > maximoIntentos){
            alert(`Alcanzaste el número máximo de ${maximoIntentos} intentos, el número secreto era ${numeroSecreto}`);
            break; //romper para salir del bucle y también del juego
        }
        // La condición no se cumplió
    
    }
}

*/