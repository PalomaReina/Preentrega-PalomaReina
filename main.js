alert("Welcome to the wordle!!!, you have to guess the word remember that you have 5 attempts :D "+"By Paloma Reina")
//contador de visitas almacenadas el local storage
let visitas = localStorage.getItem("visitas");
if (visitas) {
    visitas = parseInt(visitas) + 1;
} else {
    visitas = 1;
}
localStorage.setItem("visitas", visitas);
document.getElementById("visitas").innerHTML =  "El número de visitas que tuviste es " + visitas;


//peticion api de palabras
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd08945d90amsh0947ac3f76e9a69p1c4c50jsn5e38e0ce4a51',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};
fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&minLength=3&maxLength=5',options)
.then(resultadoPromesa => resultadoPromesa.json())
.then(data => {
    
    //Se setea que esté todo en mayuscula para evitar conflictos
    let resultadoElemento = document.querySelector('.resultado');
    let palabra = data[0];
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

        //Sibling permite que al ingresar una letra pase a la siguiente,oooooo cuando no tiene mas letras frena
        cuadrados.forEach(element =>{
            element.addEventListener('input', (event)=>{
                //escuchar si el evento es de borrar la letra para que no genere push vacios, si es que no se ha borrado va a continuar
                if(event.inputType !== 'deleteContentBackward'){
                    //agregar el ingreso del usuario
                    userInput.push(event.target.value.toUpperCase());
                    if(event.target.nextElementSibling){
                        event.target.nextElementSibling.focus()
                    }else{
                        //Array con los cuadrados con letras para que cuando borre el usuario el arreglo se modifique
                        let cuadradosLlenos = document.querySelectorAll('.cuadrados');
                        cuadradosLlenos = [...cuadradosLlenos];
                        let ultimosCincoCuadradosLlenos = cuadradosLlenos.slice(-palabra.length);
                        let usuarioInputFinal = [];
                        ultimosCincoCuadradosLlenos.forEach(element =>{
                            usuarioInputFinal.push(element.value.toUpperCase())
                        });
                        
                        //comparar index para cambiar el estilo a verde donde las posiciones de ambos arreglos coincide
                        let indicesCorrectos = compararArreglos(palabraArray,userInput)
                        indicesCorrectos.forEach(element =>{
                            cuadrados[element].classList.add('acierto')
                        })
                        
                        //si los arreglos son iguales por la longitud de los arrays entonces va a mostrar el mensaje 
                        if(indicesCorrectos.length == palabraArray.length){
                            mostrarResultado('Ganaste!!!');
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
                        //se pregunta si ya no existe otra fila para salir del bucle
                        if(!actualRow){
                            return;
                        };
                        dibujarCuadrados(actualRow);
                        escucharInput(actualRow);
                        agregarFocus(actualRow);
                    }
                }else{
                    //si el evento es de borrado se saca ese indice del arreglo
                    userInput.pop();
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
    //Se limita la cantidad de intentos a 5, siempre que sea igual o menos a 5 va a generar nuevas filas
        if(rowID <= 5){
            let nuevoRow = document.createElement('div');
            nuevoRow.classList.add('row');
            nuevoRow.setAttribute('id',rowID);
            mainContainer.appendChild(nuevoRow);
            return nuevoRow;
        }else{
            //mostrar la palabra correcta cuando se terminan los cinco intentos
            mostrarResultado(`Perdiste!, la palabra correcta era "${palabra.toUpperCase()}"`);
        }
        
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
    //mostrar los mensajes y el boton de reiniciar
    function mostrarResultado(textMsg){
        resultadoElemento.innerHTML = `<p>${textMsg}</p> <button class="boton">Reiniciar</button>`
        let botonReset = document.querySelector('.boton')
                        botonReset.addEventListener('click', ()=>{
                        location.reload();
                        });
    }


})
