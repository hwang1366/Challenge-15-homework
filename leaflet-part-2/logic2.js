let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let plateUrl = "static/data/PB2002_boundaries.json"


d3.json(queryUrl).then(function(earthquakeData) {
    d3.json(plateUrl).then(function(plateData) {
        console.log(earthquakeData);
        console.log(plateData);
        createFeatures(earthquakeData.features, plateData.features);
    });
});

