//Se setea la palabra "texto", se trabajará para tomarlo de una api y generar palabras aleatorias
//Se setea que esté todo en mayuscula para evitar conflictos


let resultadoElemento = document.querySelector('.resultado');
let palabra = 'texto';
let palabraArray = palabra.toUpperCase().split('');
console.log(palabraArray);
let actualRow = document.querySelector('.row');
let mainContainer = document.querySelector('.contenedor-main')
let rowID = 1;


dibujarCuadrados(actualRow);
escucharInput(actualRow);
agregarFocus(actualRow);



function escucharInput(actualRow){
    let cuadrados = actualRow.querySelectorAll('.cuadrado');
    cuadrados = [...cuadrados];

    let userInput = [];

    //Sibling permite que al ingresar una letra pase a la siguiente, cuando no tiene mas letras frena
    cuadrados.forEach(element =>{
        element.addEventListener('input', (event)=>{
            //agregar el ingreso del usuario
            userInput.push(event.target.value.toUpperCase());
            if(event.target.nextElementSibling){
                event.target.nextElementSibling.focus()
            }else{
                //comparar index para cambiar el estilo a verde donde las posiciones de ambos arreglos coincide
                let indicesCorrectos = compararArreglos(palabraArray,userInput)
                indicesCorrectos.forEach(element =>{
                    cuadrados[element].classList.add('acierto')
                })
                
                //si los arreglos son iguales por la longitud de los arrays entonces va a mostrar el mensaje 
                if(indicesCorrectos.length == palabraArray.length){
                    resultadoElemento.innerHTML = '<p>GANASTE!</p> <button class="boton">Reiniciar</button>'
                    //boton de reiniciar
                    let botonReset = document.querySelector('.boton')
                    botonReset.addEventListener('click', ()=>{
                    location.reload();
                    });
                    return;
                }
                //cambiar estilos si existe pero no esta en la posicion correcta
                //por cada elemento que ingresa el usuario, verifica en el arreglo original si esta incluido, en caso que si cambia a la clase amarrillo
                let existeIndiceArray = existeLetra(palabraArray, userInput)
                existeIndiceArray.forEach(element =>{
                    cuadrados[element].classList.add('existe')
                })
                
                //Se crea nueva fila y se tienen que agregar los eventos de la primera fila
                let actualRow = crearRow();
                dibujarCuadrados(actualRow);
                escucharInput(actualRow);
                agregarFocus(actualRow);
            }
        });
    })
}

//Funciones
//Comparar los dos arreglos, en caso que coincida el indice se almacena en indexIguales 
function compararArreglos(array1,array2){
    let indexIguales = []
    array1.forEach((element,index)=>{
        if(element == array2[index]){
            indexIguales.push(index);
        }
    });
    return indexIguales
}
//Verificar si existe la letra pero no en la posicion correcta, retorna los indice que si existen pero no estan en la posicion correcta, se crea el array de existeIndiceArray 
function existeLetra(array1, array2){
    let existeIndiceArray = [];
    array2.forEach((element,index)=>{
        if(array1.includes(element)){
            existeIndiceArray.push(index)
        }
    });
    return existeIndiceArray;
}
//Crear nueva linea de cuadrados si no se adivina completa la palabra
function crearRow(){
    rowID++;
    let nuevoRow = document.createElement('div');
    nuevoRow.classList.add('row');
    nuevoRow.setAttribute('id',rowID);
    mainContainer.appendChild(nuevoRow);
    return nuevoRow;
}
function dibujarCuadrados(actualRow){
    //Se crea el espacio para cada letra, en donde el primero va a tener focus para iniciar el juego, automaticamente se setean los cuadrados dependiendo la cantidad de letras de la palabra 
    palabraArray.forEach((item,index) => {
    if(index === 0){
        actualRow.innerHTML += '<input type="text" maxlength="1" class="cuadrado focus">'
    }else{
        actualRow.innerHTML += '<input type="text" maxlength="1" class="cuadrado">'
    }
});
}
//permite centrar el focus en el primer indice de cada linea
function agregarFocus(actualRow){
    let focusElement = actualRow.querySelector('.focus')
    focusElement.focus();
}
