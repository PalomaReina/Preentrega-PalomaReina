let resultadoElemento = document.querySelector('.resultado');
let palabra = 'texto';
let palabraArray = palabra.toUpperCase().split('');
console.log(palabraArray);
let actualRow = document.querySelector('.row');

palabraArray.forEach((item,index) => {
    if(index === 0){
        actualRow.innerHTML += '<input type="text" maxlength="1" class="cuadrado focus">'
    }else{
        actualRow.innerHTML += '<input type="text" maxlength="1" class="cuadrado">'
    }
});

let focusElement = document.querySelector('.focus')
focusElement.focus()

let cuadrados = document.querySelectorAll('.cuadrado');
cuadrados = [...cuadrados];

let userInput = [];

cuadrados.forEach(element =>{
    element.addEventListener('input', (event)=>{
        //agregar el ingreso del usuario
        userInput.push(event.target.value.toUpperCase());
        console.log(userInput)
        if(event.target.nextElementSibling){
            event.target.nextElementSibling.focus()
        }else{
            //comprar index para cambiar el estilo a verde donde las posiciones de ambos arreglos coincide
            let indicesCorrectos = compararArreglos(palabraArray,userInput)
            indicesCorrectos.forEach(element =>{
                cuadrados[element].classList.add('acierto')
            })
            //si los arreglos son iguales por la longitud los los arrays entonces va a mostrar el mensaje 
            if(indicesCorrectos.length == palabraArray.length){
                resultadoElemento.innerHTML = '<p>GANASTE!</p> <button class="boton">Reiniciar</button>'
            }
            //cambiar estilos si existe pero no esta en la posicion correcta
            existeLetra(palabraArray, userInput){
                
            }





            //boton de reiniciar
            //let botonReset = document.querySelector('.boton')
            //botonReset.addEventListener('click', ()=>{
            //location.reload();
            //});

            //nueva linea

        }
    });
})




//Funciones
function compararArreglos(array1,array2){
    let indexIguales = []
    array1.forEach((element,index)=>{
        if(element == array2[index]){
            console.log(`En la posicion ${index} si son iguales`)
            indexIguales.push(index);
        }else{
            console.log(`En la posicion ${index} no son iguales`)
        }
    });
    return indexIguales
}