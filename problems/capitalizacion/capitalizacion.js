

let btnCapitalizar = document.getElementById('capitalizar');
let pResultado = document.getElementById('resultado');
btnCapitalizar.addEventListener('click', getFrase);

function getFrase() {

    let frase = document.getElementById('frase');

    let resultado = frase.value.split(' ').map((character) => character.charAt(0).toUpperCase() +
        character.substring(1)).join(' ');

    pResultado.innerText = resultado;
    //document.getElementById('frase').reset();

}




