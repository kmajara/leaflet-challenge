//initialize a map and set zoom to chosen geocode 
var map = L.map('map').setView([39.0997, -94.5786], 5);

// Add a tile layer to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Path to the JSON file (all earthquakes past 30 days)
let earthquakePath = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

// Load the data with d3
d3.json(earthquakePath).then(function(data) {

    // Create a new marker cluster group
    let markers = L.markerClusterGroup();

    // Iterate through each earthquake feature
    data.features.forEach(function(feature) {
        let location = feature.geometry.coordinates;
        let magnitude = feature.properties.mag;
        let depth = location[2];

        if (location) {
            // Define circle color based on depth
            let color = depth > 100 ? '#ff0000' : '#00ff00'; // Example: red for deep, green for shallow

            // Create a circle for each earthquake
            let circle = L.circle([location[1], location[0]], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: magnitude * 10000 // Adjust the multiplier for better size scaling
            }).bindPopup(`
                <b>Title:</b> ${feature.properties.title}<br>
                <b>Magnitude:</b> ${feature.properties.mag}<br>
                <b>Depth:</b> ${location[2]}<br>
                <b>Place:</b> ${feature.properties.place}<br>
                <b>Type:</b> ${feature.properties.type}<br>
                <b>Time:</b> ${new Date(feature.properties.time).toLocaleString()}<br>
            `);

            // Add the circle to the marker cluster group
            markers.addLayer(circle);
        }
    });

    // Add the marker cluster group to the map
    map.addLayer(markers);

});