let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 53.85252660044951, lng: -2.8},
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the URL, or json document as the source.
  const script = document.createElement('script');

  //link to json file
  script.src = 'tidePredic.json';

  //append link to json file in index.html
  document.getElementsByTagName('head')[0].appendChild(script);

}

function callback(results) {
  //let heatmapData = [];
  let portData = [];
  portData = {
    portPos: [],
    portName: []
  };

  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
    let date = results.items[i].readings[0].date;
    let time = results.items[i].readings[0].depths[0].time;
    let depth = results.items[i].readings[0].depths[0].depth;
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+ results.items[i].label + '</h1>'+
    '<div id="bodyContent">'+
    '<p><b> Depth Reading </b></p>' +
    '<p> Date: ' + date + '</p>' +
    '<p> Time: '+ time + '</p>' +
    '<p> Depth: '+ depth + '</p>' +
    '</div>'+
    '</div>';

    portData.portPos.push({lat:lat, lng:lng, name:contentString});
  }

  portData.portPos.forEach(port =>{
    let marker = new google.maps.Marker({
      position: {lat:port.lat,lng:port.lng},
      map: map
    })

    marker.addListener('click', function() {
      map.setZoom(10);
      map.setCenter(marker.getPosition());
    })
    let infowindow = new google.maps.InfoWindow({
      content: port.name
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
