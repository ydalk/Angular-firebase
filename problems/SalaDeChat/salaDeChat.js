let btnSaludar = document.getElementById('validarSaludo');
let pConfirmarSaludo = document.getElementById('confirmarSaludo');

btnSaludar.addEventListener('click', hello);

function hello() {

    let saludo = document.getElementById('saludo').value;

    function resultado(saludo) {
        return /^h+o+l+a+$/.test(saludo);
    }

    pConfirmarSaludo.innerText = resultado(saludo);
}
