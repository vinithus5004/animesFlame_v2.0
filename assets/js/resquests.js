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

let currentsAnimesList = [];

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

let nextURL = 'https://kitsu.io/api/edge/anime?filter[status]=current&page[limit]=20';

async function getCurrentsAnimes(){
    let response = await fetch(nextURL);
    let json = await response.json();

    json.data.forEach(object => currentsAnimesList.push(object));

    if(json.links.next !== undefined){
        nextURL = json.links.next;
        await getCurrentsAnimes();
    }
    
}

function setCurrentsAnimes(){
    let htmlContent = '';

    for(let i = 0; i < 60; i++){
        htmlContent += 
        `<div class="anime-title">
            <img src="${currentsAnimesList[i].attributes.posterImage.original}" alt="" draggable="false">
        </div> `
    }

    currentsAnimes.carousel.innerHTML = htmlContent;
}

getTrengindAnimes();
getCurrentsAnimes().then(setCurrentsAnimes);