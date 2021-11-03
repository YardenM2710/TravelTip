import { locService } from "./loc.service.js";

export const mapService = {
  initMap,
  addMarker,
  panTo,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log("InitMap");
  return _connectGoogleApi().then(() => {
    console.log("google available");
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });

    gMap.addListener("click", mapsMouseEvent => {
      console.log("Maps Event", mapsMouseEvent);
      const pos = {
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      };

      let locationName = getAdress(pos).then(res => {
        console.log(res);
        return res;
      });
      locationName.then(res => {
        console.log("RES", res);
        return res;
      });
      console.log(locationName);
      locService.handleNewLoc(
        locationName,
        pos.lat,
        pos.lng,
        "GOOD",
        Date.now(),
        Date.now()
      );
      locService.renderLocs();
      const marker = new google.maps.Marker({
        position: pos,
        map: gMap,
      });
    });
  });
}

function getAdress(pos) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyBA7NOmJ_7t6Q-h5Q-LVyCmQ3-CeqtAr_Q`
    )
    .then(res => {
      return res.data.results[10].formatted_address;
    });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: "Hello World!",
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  console.log("laLatLng", laLatLng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = "AIzaSyBA7NOmJ_7t6Q-h5Q-LVyCmQ3-CeqtAr_Q";
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}
