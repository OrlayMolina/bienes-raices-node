(function() {

    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    cambiarEstadoBotones.forEach( boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad)
    })

    async function cambiarEstadoPropiedad(e) {

        const { propiedadId: id } = e.target.dataset
        
        try {
            const url = `/propiedades/${id}`

        // Fetch API
        const respuesta = await fetch(url, {
            method: 'PUT',
            headers: {
                'CSRF-Token': token
            }
        })

        const { resultado } = await respuesta.json()

        if(resultado){
            if(e.target.classList.contains('bg-yellow-200')){
                e.target.classList.add('bg-green-200', 'text-green-900', 'border-green-600')
                e.target.classList.remove('bg-yellow-200', 'text-yellow-900', 'border-yellow-600')
                e.target.textContent = 'Publicado'
            }else {

                e.target.classList.remove('bg-green-200', 'text-green-900', 'border-green-600')
                e.target.classList.add('bg-yellow-200', 'text-yellow-900', 'border-yellow-600')
                e.target.textContent = 'No Publicado'

            }
        }

        }catch(error){
            console.log(error)
        }
    }

})()