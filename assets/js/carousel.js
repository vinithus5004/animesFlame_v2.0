// Initial Data
const animesTrending = {
    id: '#animes-trending',
    carousel: document.querySelector('#animes-trending .carousel')
    
}

const currentsAnimes = {
    id: '#currents-animes',
    carousel: document.querySelector('#currents-animes .carousel'),
    objectList: [],
    url: 'https://kitsu.io/api/edge/anime?filter[subtype]=TV&filter[status]=current&page[limit]=20&page[offset]=20'
}

const ova = {
    id: '#ova',
    carousel: document.querySelector('#ova .carousel'),
    objectList: [],
    url: 'https://kitsu.io/api/edge/anime?filter[subtype]=OVA&page[limit]=20&page[offset]=20'
}

const upcoming = {
    id: '#upcoming',
    carousel: document.querySelector('#upcoming .carousel'),
    objectList: [],
    url: 'https://kitsu.io/api/edge/anime?filter[subtype]=TV&filter[status]=upcoming&page[limit]=20&page[offset]=20'
}

function init(){
    setCarousel(animesTrending.carousel, animesTrending.id);
    setCarousel(currentsAnimes.carousel, currentsAnimes.id);
    setCarousel(ova.carousel, ova.id);
    setCarousel(upcoming.carousel, upcoming.id);
}

function setCarousel(carousel, id){
    let arrowBtns = document.querySelectorAll(`${id} .wrapper i`);

    let isDragging = false, startX, startScrollLeft;

    // Events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);

    carousel.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);

    carousel.addEventListener('mouseup', dragStop);
    //carousel.addEventListener('mouseout', dragStop);
    carousel.addEventListener('touchend', dragStop);

    arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carousel.scrollLeft += (btn.getAttribute('data-arrow') === 'left') ? -150 : 150;
        });
    });

    // Functions
    function dragStart(event){
        isDragging = true;
        carousel.classList.add('dragging');

        startX = event.pageX || event.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    function dragStop(){
        isDragging = false;
        carousel.classList.remove('dragging');
    }

    function dragging(event){
        if(!isDragging) return;

        carousel.scrollLeft = startScrollLeft - ((event.pageX || event.touches[0].pageX) - startX);
    }
}

init();