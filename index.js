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
  //let heatmapData = [];
  let portData = [];
  portData = {
    portPos: [],
    portName: []
  };
  let marker = new google.maps.Marker({
    position: null,
    map: null
  })
  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+ results.items[i].label + '</h1>'+
    '<div id="bodyContent">'+
    '<p><b>' + results.items[i].label + '</b>' +
    '</div>'+
    '</div>';
    portData.portPos.push({lat:lat,lng:lng});
    portData.portName.push(contentString);
  }

  portData.portPos.forEach(port =>{
    marker.position = port;
    marker.map= map;

    marker.addListener('click', function() {
      map.setZoom(10);
      map.setCenter(marker.getPosition());
    })
  })

  portData.portName.forEach(name => {
    let infowindow = new google.maps.InfoWindow({
      content: name
    })
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })
  })

  /*
  const heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData,
  dissipating: false,
  map: map
})
*/
}
