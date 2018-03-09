let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
<<<<<<< HEAD
    zoom: 14,
    center: {lat: 50.79291516421972, lng: -1.1130523681640625},
=======
    zoom: 6,
    center: {lat: 53.85252660044951, lng: -2.8},
>>>>>>> 3dccd2cf9ba92e4738906e8b70f101b8a3c36cdf
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement('script');

<<<<<<< HEAD
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'tidePredic.json';
  document.getElementsByTagName('head')[0].appendChild(script);
=======
  //link to json file
  script.src = 'tidePredic.json';
>>>>>>> 3dccd2cf9ba92e4738906e8b70f101b8a3c36cdf

  //append link to json file in index.html
  document.getElementsByTagName('head')[0].appendChild(script);
}

function eqfeed_callback(results) {
<<<<<<< HEAD
  const heatmapData = [];
  const portPosData = [];
=======
  let heatmapData = [];
  let portPosData = [];
>>>>>>> 3dccd2cf9ba92e4738906e8b70f101b8a3c36cdf
  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
<<<<<<< HEAD
    portPosData.push(latLng);
  }
=======
    portPosData.push({lat:lat,lng:lng});
  }

>>>>>>> 3dccd2cf9ba92e4738906e8b70f101b8a3c36cdf
  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: map
<<<<<<< HEAD
  });
  const marker = new google.maps.Marker({
    position: portPosData,
    map: map
=======
  })

  portPosData.forEach(port =>{
    const marker = new google.maps.Marker({
      position: port,
      map: map
    })
>>>>>>> 3dccd2cf9ba92e4738906e8b70f101b8a3c36cdf
  })
}
