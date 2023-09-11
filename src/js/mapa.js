(function() {

    const lat = 4.5366299918557615;
    const lng = -75.67180996559179;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker;

    //Utilizar Provider y Geocoder  
    const geocodeService  = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El pin  L contiene toda la insformación
    marker = new L.marker([lat, lng], {
        draggable: true, // para poder mover el pin
        autoPan: true //Cuando mueva el pin se vuelva a centrar el mapa
    })
    .addTo(mapa)

    //Detectar el movimiento del pin 
    marker.on('moveend', e => {
        marker = e.target

        const posicion  = marker.getLatLng();

        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        //Obtener la información de las calles al soltar el leaflet
        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado) {

            marker.bindPopup(resultado.address.LongLabel)

            //Llenar los campos, como no siempre existe, le colocamos un string vacio
            document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
            document.querySelector('#calle').value = resultado?.address?.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';
        })
    })

})()