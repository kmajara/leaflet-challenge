Earthquake Data Visualization with Leaflet

This project visualizes earthquake data from the past 30 days on an interactive map using Leaflet.js. The earthquake data is fetched from the USGS Earthquake Hazards Program and displayed as circle markers with varying sizes and colors based on the magnitude and depth of each earthquake.
Features

    Interactive map centered on the United States
    Earthquake data from the past 30 days displayed as circle markers
    Circle markers are sized based on earthquake magnitude
    Circle markers are colored based on earthquake depth
    Popup information for each earthquake, including title, time, magnitude, depth, place, and type
    Legend indicating the depth color scale

Installation

    Clone the repository:

    bash

    git clone https://github.com/yourusername/earthquake-visualization.git
    cd earthquake-visualization

    Open the index.html file in a web browser.

Usage

The main functionality includes:

    Initializing a Leaflet map centered on a specified geocode.
    Adding a tile layer to the map using OpenStreetMap tiles.
    Fetching earthquake data from the USGS Earthquake Hazards Program in GeoJSON format.
    Creating circle markers for each earthquake with sizes based on magnitude and colors based on depth.
    Displaying popup information for each earthquake, including title, time, magnitude, depth, place, and type.
    Adding a legend to the map to indicate the depth color scale.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
