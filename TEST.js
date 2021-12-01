let button = document.getElementById('btn')
let alert = document.querySelector('#alert')
console.log(button)
button.addEventListener('mouseover', e=>{
    button.classList.toggle('green')
}) 

let trackerId = 0;
let geocoder;
var map;
var x;
var y;
var x2;
var y2;
var z;
let q;
var distanceKM;
var distance;

function thingspeakEMS() {
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/8/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  q = Number(m.field8);
  console.log(q)

  });
}
thingspeakEMS()
function distanceBTWpoints(){
  if (q == 1) {
    let lat1 = x 
    let lon1 = y
    let  lat2 = x2 
    let lon2 = y2
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    distanceKM = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km 
    distance = distanceKM * 0.621371
    console.log(distance)
  }
  if (distance < 1) {
    document.getElementById('EMSwarn').style.display = "none"
    
  } 
  else {
    document.getElementById('EMSwarn').style.display = "block"
  }
  
  return distance, q
}
distanceBTWpoints()
function emsIcon() {
  z = 1; 
  var url = 'https://api.thingspeak.com/update?api_key=NUQD36RO2XTFH4TA&field8=1';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

  var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
  }`;

  xhr.send(data);
  initialize()
}

function citizenIcon() {
  z = 0;
  initialize()
}

function fireIcon() {
  z = 2;
  var url = 'https://api.thingspeak.com/update?api_key=NUQD36RO2XTFH4TA&field2=2';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

  var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
  }`;

  xhr.send(data);
  initialize()
}


$(document).ready(function(){
  loadmaps();
  loadmaps2();
  //check for new updates
  setInterval('loadmaps()',500)
  setInterval('loadmaps2()',500)
});

function loadmaps(){

  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/4/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  x= Number(m.field4); //lat1
  
  });
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/5/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  y= Number(m.field5); //long 1
  console.log(y)

  })  
}

function loadmaps2(){

  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/6/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var n = result;
  x2= Number(n.field6);  //lat 2
                  //alert(x);

  });
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/7/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var n = result;
  y2= Number(n.field7);  //long2
  console.log(y2)
    
  })  
}

/*window.setInterval(function(){initialize();}, 5000);*/

function initialize() {
    //alert(y);
  var mapOptions = {
    zoom: 18,
    center: {lat: x, lng: y}
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  switch (z) {
    case 0:
      var marker = new google.maps.Marker({
        position: {lat: x, lng: y},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;

      case 1:
        var marker = new google.maps.Marker({
          position: {lat: x, lng: y},
          map: map,
          icon:{
            url: "hospital.png",
          scaledSize: new google.maps.Size(31, 31)
          },
        });
        break;

        case 2:
          var marker = new google.maps.Marker({
            position: {lat: x, lng: y},
            map: map,
            icon:{
              url: "firetruck.png",
            scaledSize: new google.maps.Size(61, 51)
            },
          });
          break;
  
    default:
      var marker = new google.maps.Marker({
        position: {lat: x, lng: y},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
  }

  switch (q) {
    case 1:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "hospital.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
    case 2:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "firetruck.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
  
    default:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
  }
  
  
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + marker.getPosition() + '</p>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  var recalculate = setInterval (function(){
    lat = x;
    long = y;
    map.setCenter({lat:lat, lng:long, alt:0});
    marker.setPosition({lat:lat, lng:long, alt:0});
  },500);

  var recalculate2 = setInterval (function(){
    lat = x2;
    long = y2;
  },500);

  trackerId = navigator.geolocation.watchPosition(function(pos) {
    var latLng = new google.maps.LatLng(
      x,
      y
    );
    map.setCenter(latLng);
    marker.setPosition(latLng);
    map.panTo({ x, y })
    enableHighAccuracy: true;
    maximumAge: 0;
    timetout: 5000;
  });
}

const stopTracking = () => {
  if (trackerId) {
    navigator.geolocation.clearWatch(trackerId);
  }
};

google.maps.event.addDomListener(window, 'load', initialize);

