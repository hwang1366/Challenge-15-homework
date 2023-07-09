let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(queryUrl).then(function(earthquakeData) {
    console.log(earthquakeData);
    createFeatures(earthquakeData.features);
});

function createMarker(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color:"#000",
        weight: 0.5,
        opacity: 0.5,
        fillOpacity: 1
    });
}

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location:</h3> ${feature.properties.place}<h3> Magnitude:</h3> ${feature.properties.mag}<h3> Depth:</h3> ${feature.geometry.coordinates[2]}`);
    }};

    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    });

    createMap(earthquakes);
