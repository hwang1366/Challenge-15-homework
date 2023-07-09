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
let plates = L.geoJSON(plateData, {
  style: function() {
      return {
          color: "blue",
          weight: 2.5
      }
  }
});

createMap(earthquakes, plates);
function createMap(earthquakes, plates) {
  
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

  
  let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
  };

  
  let overlayMaps = {
      "Earthquakes": earthquakes,
      "Fault Lines": plates
  };

  
  let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, earthquakes, plates]
  });