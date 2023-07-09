let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let plateUrl = "static/data/PB2002_boundaries.json"


d3.json(queryUrl).then(function(earthquakeData) {
    d3.json(plateUrl).then(function(plateData) {
        console.log(earthquakeData);
        console.log(plateData);
        createFeatures(earthquakeData.features, plateData.features);
    });
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
function createFeatures(earthquakeData, plateData) {
  function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>Location:</h3> ${feature.properties.place}<h3> Magnitude:</h3> ${feature.properties.mag}<h3> Depth:</h3> ${feature.geometry.coordinates[2]}`);
  }}
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createMarker
});