// Initial Data
let bannersElements = [
    {
        index: 0,
        element: document.getElementById('banner1'),
        title: document.querySelector('#banner1 .title'),
        genres: document.querySelector('#banner1 ul'),
        synopsis: document.querySelector('#banner1 .synopsis p')
    },
    {
        index: 1,
        element: document.getElementById('banner2'),
        title: document.querySelector('#banner2 .title'),
        genres: document.querySelector('#banner2 ul'),
        synopsis: document.querySelector('#banner2 .synopsis p')
    }
]

/* Array que guardará objetos temporariamente e depois será esvaziado */
let tempArray = [];

let banners = [];

// Functions
async function getTrengindAnimes(){
    let response = await fetch('https://kitsu.io/api/edge/trending/anime');
    let json = await response.json();

    let animeList = json.data;

    setRandomObjects(animeList);

    bannersElements.forEach(async banner => {
        let animeObject = banners[banner.index]
        let query = animeObject.relationships.genres.links.related;

        let response = await fetch('https://kitsu.io/api/edge' + query);
        let json = await response.json();

        banner.element.style.backgroundImage = `url(${animeObject.attributes.coverImage.original})`;
        
        banner.title.innerHTML = 
        `<div class="title">
            <h1>${animeObject.attributes.canonicalTitle}</h1>
        </div>`;

        banner.synopsis.innerHTML = 
        `<div class=synopsis>
            <p>${animeObject.attributes.synopsis}</p>
        </div>`;

        if(json.data.length > 0){
            banner.genres.innerHTML = '';
            for(let i = 0; i < 4; i++){
                banner.genres.innerHTML += `<li><a href="#">${json.data[i].attributes.name}</a></li>`;
            }
        }
    });

    let htmlContent = '';

    animeList.forEach(anime => {
        htmlContent += 
        `<div class="anime-title">
            <img src="${anime.attributes.posterImage.original}" alt="" draggable="false">
            <div class="cover"><span>${anime.attributes.canonicalTitle}</span></div>
        </div> `
    });

    animesTrending.carousel.innerHTML = htmlContent;
}

function setRandomObjects(objectsArray){
    banners = [];
    let randomIndex1 = Math.floor(Math.random() * objectsArray.length);
    let randomIndex2 = Math.floor(Math.random() * objectsArray.length);

    while(randomIndex1 === randomIndex2){
        randomIndex2 = Math.floor(Math.random() * objectsArray.length);
    }

    banners.push(objectsArray[randomIndex1]);
    banners.push(objectsArray[randomIndex2]);
}

// max = 20 ou mais
async function getAnimes(object, max){
    let response = await fetch(object.url);
    let json = await response.json();

    if(object.objectList.length === 0) object.carousel.innerHTML = '';

    json.data.forEach(item => {
        object.objectList.push(item);
        tempArray.push(item);
    });
    
    if(max < 20) max = 20;
    if(object.objectList.length <= max) setAnimes(object);

    if(json.links.next !== undefined){
        object.url = json.links.next;
        getAnimes(object, max);
    }
}

/* setar os títulos na página */
function setAnimes(object){
    let htmlContent = '';
    for(let i = 0; i < 20; i++){
        htmlContent += 
        `<div class="anime-title">
            <img src="${tempArray[i].attributes.posterImage.original}" alt="" draggable="false">
            <div class="cover"><span>${tempArray[i].attributes.canonicalTitle}</span></div>
        </div> `
    }

    object.carousel.innerHTML += htmlContent;
    tempArray = [];
}

getTrengindAnimes();
getAnimes(currentsAnimes, 10);