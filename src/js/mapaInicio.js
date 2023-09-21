(function(){

    const lat = 4.5366299918557615;
    const lng = -75.67180996559179;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
})()