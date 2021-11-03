import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onSelectedLoc = onSelectedLoc;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
    })
    .catch(() => console.log("Error: cannot init map"));
  // renderLocations();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export const renderLocs = renderLocations;
function renderLocations() {
  let locs = locService.getLocs();
  console.log("locs", locs);
  var strHtml = "";
  locs.map(loc => {
    console.log("LOCATION:", loc);
    strHtml += `<p class="cities" onclick="onSelectedLoc(${loc.lat},${loc.lng} )">${loc.name}, weather is good</p>`;
  });
  document.querySelector(".location-container").innerHTML = strHtml;
}
function onSelectedLoc(lat, lng) {
  onPanTo(lat, lng);
}

function onDeleteMap() {}

function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then(locs => {
    console.log("Locations:", locs);
    document.querySelector(".locs").innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then(pos => {
      console.log("User position is:", pos.coords);
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch(err => {
      console.log("err!!!", err);
    });
}
function onPanTo(lat = 35.6895, lng = 139.6917) {
  console.log("Panning the Map");
  mapService.panTo(lat, lng);
}
