let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 53.85252660044951, lng: -2.8},
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement('script');

  //link to json file
  script.src = 'tidePredic.json';

  //append link to json file in index.html
  document.getElementsByTagName('head')[0].appendChild(script);
}

function eqfeed_callback(results) {
  let heatmapData = [];
  let portPosData = [];
  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
    portPosData.push({lat:lat,lng:lng});
  }

  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map
  })

  portPosData.forEach(port =>{
    const marker = new google.maps.Marker({
      position: port,
      map: map
    })
  })
}
