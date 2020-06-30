const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablesimientos();
})

//avilitar busqueda de establesimientos

const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if (buscador.value.length > 5) {
        //buscar en la api
        ui.obtenerSugrencias(buscador.value);
    } else {
        ui.mostrarEstablesimientos();
    }
})