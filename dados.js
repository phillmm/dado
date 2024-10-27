//Variables de trabajo
let tiradas = new Array()   //Array que contendrá las tiradas
let contador = 0            //Contador de tiradas
let mensaje = ''            //Mensaje de salida

document.addEventListener('DOMContentLoaded', () => {
    //Captamos los elementos del html
    const form = document.getElementById("formulario")
    const intentos = document.getElementById("intentos")
    const dado = document.getElementById("dado")
    const resultado = document.getElementById("resultado")

    const nombreInput = document.querySelector('input[name="nombre"]');
    const numeroInput = document.querySelector('input[name="numero"]');
    nombreInput.addEventListener('input', reiniciar)
    numeroInput.addEventListener('input', reiniciar)

    //Prevenimos la acción por defecto y pasamos el evento a una fat arrow funtion
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        //Recuperamos los valores del formulario
        const nombre = document.querySelector('input[name="nombre"]').value
        const numero = document.querySelector('input[name="numero"]').value


        //Verificación de que estamos recogiendo los valores
        //console.log(`Los valores introducidos son ${nombre} y ${numero}`)

        //Contamos la tirada:
        contador += 1

        //Generamos un número aleatorio
        numAle = getNumero(1, 6)
        //console.log(numAle)

        //Modificamos la imagen
        dado.src = `imagen/${numAle}.png`

        //Almacenamos la tirada en el array
        tiradas[`Intento: ${contador}`] = numAle
        //console.log(tiradas)

        //Insertamos el intento en el listado
        let li = document.createElement('LI')

        //Recorremos el array de intentos
        for(let tirada in tiradas) {
            li.innerHTML = `<strong>Intento:</strong> ${tirada} - <strong>Resultado:</strong> ${tiradas[tirada]}`
            
            //Damos color al li (solo en caso de error, ya que en acierto limpiamos)
            if(numero != numAle) {
                li.classList.add('error')
            }

            intentos.appendChild(li)
        }

        //Seteamos el mensaje de error, en caso de acertar
        //limpamos el formulario
        let msg = document.createElement('P')
        if(numero == numAle) {
            mensaje = `¡Enhorabuena ${nombre}, has acertado el número ${numero} en ${contador} intento(s)!`
            msg.classList.add('exito')
            form.reset()
            intentos.innerHTML = ''

        } else {
            mensaje = '¡Vaya, vuelve a intentarlo!'
            msg.classList.add('error')
        }
        //Insertamos el resultado en el HTML
        msg.innerText = mensaje
        resultado.innerHTML = ''
        resultado.appendChild(msg)

    })
})


function getNumero(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function reiniciar() {
    intentos.innerHTML = ''
    contador = 0
    tiradas = []
}