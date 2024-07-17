//initialize a map and set zoom to chosen geocode
var map = L.map('map').setView([38.79, -95.57], 5);

// Add a tile layer to the map
let streetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Path to the JSON file (all earthquakes past 30 days)
let Path = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';

//instantiate a new layer to hold earthquake data
let earthquakeData = new L.LayerGroup()


// Load the data with d3. Once a response is received, send the data.features object to the createFeatures function
d3.json(Path).then(function(data) {
    createFeatures(data.features)
});


//create a function to set circle radius
function quakeRadius (mag) {
    if (mag === 0){
        return 1
    }
    // provide a multiplier to scale the circles
    return mag*20000; 
};

 // Define a color scale for earthquake depth
 function depthColor(depth){
    if (depth >= 90) return "#FF0000";
    else if (depth > 10 && depth <= 30) return "#2ECC71"; 
    else if (depth > 30 && depth <= 50) return "#FFC300";
    else if (depth > 50 && depth <= 70) return "#FF5733";
    else if (depth > 70 && depth < 90) return "#C70039 ";
    else return "#DAF7A6";
    };  

// Define the createFeatures function 
    function createFeatures(earthquakeData){
       

        //Define other styles for circles 
        function otherStyle(feature){
            return {
                opacity: 1, 
                fillOpacity: .95,
                color: '#000',
                fillColor: depthColor(feature.geometry.coordinates[2]),
                radius: quakeRadius(feature.properties.mag), 
                stroke: true, 
                weight: 0.9
            }
        } ;

        //Define a function to be run for each feature in the features array
        L.geoJSON(earthquakeData, {
            //convert GeoJson point features into Leaflet layers. Using L.circle to allow resizing of circles on zoom
            pointToLayer: function (feature, latlng) {
                return L.circle(latlng, otherStyle(feature));
            },
            //add popup info for each feature, making sure the time appears in the local timezone. 
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`
                <b>Title:</b> ${feature.properties.title}<br>
                <b>Time:</b> ${new Date(feature.properties.time).toLocaleString()}<br>
                <b>Magnitude:</b> ${feature.properties.mag}<br>
                <b>Depth:</b> ${feature.geometry.coordinates[2]} KM <br>
                <b>Place:</b> ${feature.properties.place}<br>
                <b>Type:</b> ${feature.properties.type}<br>
                `);
            }
        }).addTo(map)
    }

    // Add a legend to the map.
    var legend  = L.control({
        position: 'bottomright'
    });
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend'),
            depth = [0, 10, 30, 50, 70, 90]

            // loop through our depth intervals and generate a label with a colored square for each interval.
            for (let i = 0; i < depth.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + depthColor(depth[i] + 1) + '"></i> ' +
                    depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
            }
        return div;
    };
    legend.addTo(map)            
