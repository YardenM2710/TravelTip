export const locService = {
    getLocs, renderLocs
}

//{id, name, lat, lng, weather, createdAt, updatedAt}
const locs = [
    {id: 1, name: 'Haifa', lat: 32.788011, lng: 34.832581, weather: '30', createdAt: '1', updatedAT: 'dh'}, 
]

function handleNewLoc(name,lat,lng,weather,createAt,updatedAT){
    const newLocId = locs.length
    var newLocData = {
        id: newLocId,
        name,
        lat,
        lng,
        weather,
        createAt,
        updatedAT
    };
    locs.push(newLocData)
}

function SaveToLocalStorage(name, loc){
    localStorage.setItem(name.JSON.stringify(loc)) 
}

function LoadFromStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

function renderLocs(){
    console.log(locs);
    var strHtml
    locs.map(loc => {
        strHtml += `<p="onclick="setSelectedLoc('${loc.id}')">${loc.name}, weather is good</p>`
    })
    document.querySelector('.location-container').innerHTML = strHtml;
}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


