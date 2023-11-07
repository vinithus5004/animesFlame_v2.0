// Initial Data
const animesTrending = {
    carousel: document.querySelector('#animes-trending .carousel'),
    id: '#animes-trending'
}

const currentsAnimes = {
    carousel: document.querySelector('#currents-animes .carousel'),
    id: '#currents-animes'
}

init(animesTrending.carousel, animesTrending.id);
init(currentsAnimes.carousel, currentsAnimes.id);

function init(carousel, id){
    let arrowBtns = document.querySelectorAll(`${id} .wrapper i`);

    let isDragging = false, startX, startScrollLeft;

    // Events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);

    carousel.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);

    carousel.addEventListener('mouseup', dragStop);
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
        event.preventDefault();

        carousel.scrollLeft = startScrollLeft - ((event.pageX || event.touches[0].pageX) - startX);
    }
}