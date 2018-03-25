let map;
let markers = [];
let portData = [];
portData = {
  portPos: [],
  portName: []
};

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
  results.items.forEach(item =>{
    let lat = parseFloat(item.lat);
    let lng = parseFloat(item.long);
    let latLng = new google.maps.LatLng(lat, lng);
    let date = item.readings[0].date;
    let time = item.readings[0].depths[0].time;
    let depth = item.readings[0].depths[0].depth;
    let keelClear = parseFloat(item.keelClear);
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+ item.label + '</h1>'+
    '<div id="bodyContent">'+
    '<p><b> Depth Reading </b></p>' +
    '<p> Date: ' + date + '</p>' +
    '<p> Time: '+ time + '</p>' +
    '<p> Depth: '+ depth + '</p>' +
    '<p> Under Keel Clearance: '+ keelClear + 'm</p>' +
    '</div>'+
    '</div>';

    portData.portPos.push({
      lat:lat,
      lng:lng,
      name:contentString,
      keel:keelClear,
      depth:depth
    });
    return portData;
  })
}

// Sets up markers
function addMarker(location, infowindow){
  let marker = new google.maps.Marker({
    position: location,
    map: map
  })

  // When a marker is clicked zoom in on that marker
  // and open a info window
  marker.addListener('click', function() {
    map.setZoom(10);
    map.setCenter(marker.getPosition());
    infowindow.open(map, marker);
  })
  markers.push(marker);
}

// Push the marker to the markers array
function findPorts() {
  portData.portPos.forEach(port => {
    // Create an info window for each port
    let infowindow = new google.maps.InfoWindow({
      content: port.name
    })

    // Add a marker for each port
    addMarker({lat:port.lat,lng:port.lng}, infowindow)
  })
}

function setMapOnAll(map) {
  markers.forEach(marker => {
    marker.setMap(map);
  })
}

function clearMarkers() {
  setMapOnAll(null);
}

function shipCalc(draught) {
  clearMarkers();
  let newPorts = [];
  portData.portPos.filter((port) => {
    if((port.depth - port.keel) > document.getElementById(draught.id).value) {newPorts.push(port)}
  })
  newPorts.forEach(port => {
    // Create an info window for each port
    let infowindow = new google.maps.InfoWindow({
      content: port.name
    })

    // Add a marker for each port
    addMarker({lat:port.lat,lng:port.lng}, infowindow)
  })
}
