let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(queryUrl).then(function(earthquakeData) {
    console.log(earthquakeData);
    createFeatures(earthquakeData.features);
});