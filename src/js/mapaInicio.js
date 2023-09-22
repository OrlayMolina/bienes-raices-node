(function(){

    const lat = 4.5366299918557615;
    const lng = -75.67180996559179;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);

    let markers = new L.FeatureGroup().addTo(mapa)


    // Filtros
    const filtros = {
        categoria: '',
        precio: ''
    }
    
    const categoriasSelect = document.querySelector('#categorias');
    const preciosSelect = document.querySelector('#precios');

    //Filtrado de categorias y precios

    categoriasSelect.addEventListener('change', e => {
        filtros.categoria = +e.target.value //con el más se modifica de string a numero
    })

    preciosSelect.addEventListener('change', e => {
        filtros.precio = +e.target.value //con el más se modifica de string a numero
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            const url = '/api/propiedades'
            const respuesta = await fetch(url)
            const propiedades = await respuesta.json()

            mostrarPropiedad(propiedades)

        }catch(error){
            console.log(error)
        }
    }

    const mostrarPropiedad = propiedades => {
        
        propiedades.forEach(propiedad => {
            //Agregar los pines
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true
            })
            .addTo(mapa)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold uppercase my-3">${propiedad?.titulo}</h1>
                <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad: ${propiedad?.titulo}" class="rounded-xl">
                <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
                <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 rounded-xl block p-2 text-center font-bold uppercase">Ver Propiedad</a>
                
            `)
        })
    }

    obtenerPropiedades();
})()