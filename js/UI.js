class UI {
    constructor() {
        //instanciar la api
        this.api = new API();
        //crear los markers con layerGroup
        this.markers = new L.layerGroup();
        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;

    }

    mostrarEstablesimientos() {
            this.api.obtenerDatos()
                .then(datos => {
                    const resultado = datos.respuestaJSON.results;
                    //ejecutar la funcion para msotrar los pines
                    this.mostarPines(resultado);
                })

        }
        //mostrar pines
    mostarPines(datos) {
        //limpiar los markers
        this.markers.clearLayers();
        //recorrer los establesimientos
        datos.forEach(dato => {
            //destructuracion
            const { longitude, latitude, calle, regular, premium } = dato;
            //crear popup
            //aqui se puede agregar cualquier info al popup
            const opcionesPopup = L.popup()
                .setContent(`
                <p> Calle: ${calle} </p>
                <p> <b>Regular: $ ${regular}</b> </p>
                <p> <b>Premium: $ ${premium}</b> </p>
            `)

            // agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopup);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }

    obtenerSugrencias(busqueda) {
            this.api.obtenerDatos()
                .then(datos => {
                    //obtener los datos
                    const resultados = datos.respuestaJSON.results;
                    //enviar el json y la bsuqueda para el filtrado
                    this.filtarSugerensias(resultados, busqueda);

                })
        }
        //filtra las sugerensias en base al input
    filtarSugerensias(resultado, busqueda) {
        //filtar con flilter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        console.log(filtro);
        this.mostarPines(filtro);
        //mostrar los pines
    }

}