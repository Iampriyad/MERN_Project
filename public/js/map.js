
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', // Display the map as a globe, since satellite-v9 defaults to Mercator
        zoom: 9,
        center: data.geometry.coordinates //longitude , latitude
    });
   
console.log(data.geometry.coordinates);
 const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(data.geometry.coordinates) //listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset:25})
        .setHTML(`<h1>${data.title}</h1><p>This is the exact location</p>`))
        .addTo(map);
