let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 50.79291516421972, lng: -1.1130523681640625},
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement('script');

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'tidePredic.json';
  document.getElementsByTagName('head')[0].appendChild(script);

}

function eqfeed_callback(results) {
  const heatmapData = [];
  const portPosData = [];
  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
    portPosData.push(latLng);
  }
  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map
  });
  const marker = new google.maps.Marker({
    position: portPosData,
    map: map
  })
}
