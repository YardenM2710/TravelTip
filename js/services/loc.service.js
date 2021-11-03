export const locService = {
  getLocs,
  handleNewLoc,
};

//{id, name, lat, lng, weather, createdAt, updatedAt}
const locs = [
  {
    id: 1,
    name: "Haifa",
    lat: 32.788011,
    lng: 34.832581,
    weather: "30",
    createdAt: "1",
    updatedAT: "dh",
  },
];

function handleNewLoc(name = "Haifa", lat, lng, weather, createAt, updatedAT) {
  console.log(name);
  const newLocId = locs.length;
  var newLocData = {
    id: newLocId,
    name,
    lat,
    lng,
    weather,
    createAt,
    updatedAT,
  };
  locs.push(newLocData);
}

function SaveToLocalStorage(name, loc) {
  localStorage.setItem(name.JSON.stringify(loc));
}

function LoadFromStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

function getLocs() {
  return locs;
}
