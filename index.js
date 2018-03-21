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
  
  let markers = [];
  let portData = [];
  portData = {
    portPos: [],
    portName: []
  };
  const scimitar = 1.2;
  const sabre = 3.3;
  const tyne = 3.8;
  const quorn = 2.2;
  const ledbury = 2.2;
  const chidd = 2.2;
  const catt = 2.2;
  const defend = 7.4;
  const kent = 6.2;
  const west = 7.3;
  const wave = 9.97;

  for (let i = 0; i < results.items.length; i++) {
    let lat = parseFloat(results.items[i].lat);
    let lng = parseFloat(results.items[i].long);
    let latLng = new google.maps.LatLng(lat, lng);
    let date = results.items[i].readings[0].date;
    let time = results.items[i].readings[0].depths[0].time;
    let depth = results.items[i].readings[0].depths[0].depth;
    let keelClear = parseFloat(results.items[i].keelClear);
    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+ results.items[i].label + '</h1>'+
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

    // Push the marker to the markers array
    markers.push(marker)
  }

  portData.portPos.forEach(port =>{

    // Create an info window for each port
    let infowindow = new google.maps.InfoWindow({
      content: port.name
    })

    // Add a marker for each port
    addMarker({lat:port.lat,lng:port.lng}, infowindow)

    let shipCal = port.depth - port.keelClear;


  })
}
