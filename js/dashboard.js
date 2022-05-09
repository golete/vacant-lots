/* =====================
Dashboard Configuration
===================== */

/* map setup */
var map = L.map('map', {
  center: [39.9525, -75.1639],
  zoom: 12,
  maxZoom: 19,
  minZoom: 10,
  preferCanvas: true,
  renderer: L.Canvas
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 25,
  ext: 'png'
}).addTo(map);

/* variables */
var dataset = "data/dashboardData.geojson"
var expr = {delinquent: 0, 
            usbank: 0, 
            sheriff: 0, 
            devInterest: 0}; //for the buttons
var myMarkers; //holding markers
var inputAddr = "" //default input addr
var myPoint; //holding point corresponding to input address
var devInterestCat = "unknown"; //default devInterestCat
var delinquentCat = "unknown"; //default delinquentCat
var usbankCat = "unknown"; //default usbankCat
var sheriffCat = "unknown"; //default sheriffCat
var currentZoom = 12; //default zoom level

/* 1. zoom-controlled marker size  */
function calcRadius(zoom) {
  if (zoom > 17) {
    radius = 7.5;
  } else if (zoom < 12) {
    radius = 1;
  } else {
    radius = Math.pow(1.5, (zoom-12));
  }
  return radius;      
}

function setMarketRadius() {
  map.on('zoomend', function() {
    currentZoom = map.getZoom();
    myMarkers.map(function(a) {
      a.setRadius(calcRadius(currentZoom))
    }) 
  });
}

/* marker options */
var markerOptions = {
  radius: calcRadius(currentZoom),
  fillColor: "#2aa353",
  fillOpacity: 0.3,
  color: "#2aa353",
  opacity: 0.1,
}; 
var defaultMarkerOptions = {
  radius: calcRadius(currentZoom),
  fillColor: "#2aa353",
  fillOpacity: 0.3,
  color: "#2aa353",
  opacity: 0.1,
}; 
var lowInterestMarkerOptions = {
  radius: calcRadius(currentZoom),
  fillColor: "#56a3a4",
  fillOpacity: 0.3,
  color: "#56a3a4",
  opacity: 0.1,
}; 
var highInterestMarkerOptions = {
  radius: calcRadius(currentZoom),
  fillColor: "#ad3a36",
  fillOpacity: 0.3,
  color: "#ad3a36",
  opacity: 0.1,
}; 
var myPointOptions = {
  radius: 10,
  fillColor: "#ff0000",
  fillOpacity: 0.8,
  color: "#ff0000",
  opacity: 0,
}

/* 2. reset  */
function resetMap() {
  myMarkers.forEach(function(marker) {
    map.removeLayer(marker)
  })
}

function resetPoint() {
  myPoint.forEach(function(marker) {
    map.removeLayer(marker)
  })
}

/* 3. change markers for button interactions  */
function knowCase() {
  var delinquentCheck = $("input#check-delinquent").prop('checked');
  var usbankCheck = $("input#check-usbank").prop('checked');
  var sheriffCheck = $("input#check-sheriff").prop('checked');
  var devInterestCheck = $("input#check-devInterest").prop('checked');

  function getExpr() {
    if (delinquentCheck == true) {
      expr.delinquent = 1
    } else {
      expr.delinquent = 0
    }
    if (usbankCheck == true) {
      expr.usbank = 1
    } else {
      expr.usbank = 0
    }
    if (sheriffCheck == true) {
      expr.sheriff = 1
    } else {
      expr.sheriff = 0
    }
    if (devInterestCheck == true) {
      expr.devInterest = 1
    } else {
      expr.devInterest = 0
    }
    return expr;
  }

  getExpr();
}

/* 4. load markers onto map  */
function loadData() {
  fetch(dataset)
    .then(resp => resp.json())
    .then(data => {
      featureCollection = data.features;

      featureSelected = featureCollection.filter(f => 
        f.properties.delinquent > expr.delinquent 
        && f.properties.usbank > expr.usbank
        && f.properties.sheriff > expr.sheriff
        && (f.properties.devInterest > expr.devInterest))

      $("#loader").show();

      myMarkers = featureSelected.map(function(a) { 
        var risk = Number(a.properties.devInterest);
        switch (risk) {
          case 3:
            devInterestCat = "High";
            if (expr.devInterest == 1) {
              markerOptions = highInterestMarkerOptions;
            } else {
              markerOptions = defaultMarkerOptions;
            }
            break;
          case 2:
            devInterestCat = "Low";
            if (expr.devInterest == 1) {
              markerOptions = lowInterestMarkerOptions
            } else {
              markerOptions = defaultMarkerOptions;
            }
            break;
          case 1:
            devInterestCat = "No";
            break;
        }
        var delinquent = Number(a.properties.delinquent);
        switch (delinquent) {
          case 2:
            delinquentCat = "Delinquent";
            break;
          case 1:
            delinquentCat = "Not delinquent";
            break;
        }
        var usbank = Number(a.properties.usbank);
        switch (usbank) {
          case 2:
            usbankCat = "Yes";
            break;
          case 1:
            usbankCat = "No";
            break;
        }
        var sheriff = a.properties.sheriff;
        if (sheriff == 2) {
          if (a.properties.display_date != null) {
            sheriffCat = a.properties.display_date.slice(0, 10);
          } else {
            sheriffCat = "Unknown date";
          }
        } else {
          sheriffCat = "No"
        }

        $("#loader").hide();

        return L.circleMarker([a.geometry.coordinates[1], a.geometry.coordinates[0]], markerOptions)
        .setRadius(calcRadius(currentZoom))
        .addTo(map)
        .bindPopup(
          a.properties.location + " <br>" +
          "<br>Development risk: " + devInterestCat + 
          "<br>Delinquency status: " + delinquentCat +
          "<br>US bank lien: " + usbankCat +
          "<br>Total due: $" + a.properties.total_due +
          "<br>Sheriff sale: " + sheriffCat +
          "<br>Current owner: " + a.properties.owner
          ) 
      });

      myMarkers.map(function(a) {
        a.on('click', function(e) {
          if (a.options.color == "#ff0000") {
            defaultMarkerOptions.radius = calcRadius(currentZoom);
            a.setStyle(defaultMarkerOptions);
          } else {
            a.setStyle(myPointOptions);
          }
        })  
      })

    })
}

/* 5. congregate pipeline  */
function pipeline() {
  knowCase();
  resetMap();
  setMarketRadius();
  loadData();
}

/* 6. search box interactions  */
function highlightOne() {
  fetch(dataset)
    .then(resp => resp.json())
    .then(data => {
      featureCollection = data.features;

      featureSelected = featureCollection.filter(f => 
        f.properties.location == opaAddr)

      myPoint = featureSelected.map(function(a) { 
        return L.circleMarker([a.geometry.coordinates[1], a.geometry.coordinates[0]], myPointOptions)
        .addTo(map)
        .bindPopup(
          a.properties.location + " <br>" +
          "<br>Development risk: " + devInterestCat + 
          "<br>Delinquency status: " + delinquentCat +
          "<br>US bank lien: " + usbankCat +
          "<br>Total due: $" + a.properties.total_due +
          "<br>Sheriff sale: " + sheriffCat +
          "<br>Current owner: " + a.properties.owner
          ).openPopup(); 
      });
      map.setView([myPoint[0]._latlng["lat"]+0.001, myPoint[0]._latlng["lng"]], zoom=16)
    })
}

function onStringFilterChange(e) {
  inputAddr = e.target.value.toUpperCase().trim();
  apiAddr = inputAddr.replace(/ /g, '%20');
  var url = "https://api.phila.gov/ais-pde/v1/search/" + apiAddr + "?gatekeeperKey=a49dd13170851fb16a05e5c891f01557&include_units=true&opa_only=true"
  $.ajax({
    type:"GET",
    url: url,
    data: {
      "$limit" : 1000000,
    }
  }).done(function(data) {
    opaAddr = data.features[0].properties.opa_address;
    //console.log(opaAddr);
    highlightOne();  
  }).fail(function() {
    alert("No match found. Please try a different address.")
  })
  
};

/* 7. deploy dashboard  */
$(document).ready(function() {
  knowCase();
  loadData();
  setMarketRadius()

  $("#addrInput").on("change", function(e) {
    if (typeof(myPoint) != 'undefined') {
      resetPoint();
    }
    onStringFilterChange(e);
  })

  $("input#check-delinquent").on("click", function(e) {
    pipeline()
  })
  $("input#check-usbank").on("click", function(e) {
    pipeline()
  })
  $("input#check-sheriff").on("click", function(e) {
    pipeline()
  })
  $("input#check-devInterest").on("click", function(e) {
    pipeline()
  })

})



