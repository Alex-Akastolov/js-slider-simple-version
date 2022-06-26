(function () {

const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorContainer = container.querySelector('.indicators');
const indicators = indicatorContainer.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const slidesLength = slides.length;
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const CODE_Space = 'Space';

let interval = 1000;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let swipeStartX = null;
let swipeEndX = null;

function goToNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesLength) % slidesLength;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
};

function goToNext() {
    goToNth(currentSlide + 1);
};
function goToPrev() {
    goToNth(currentSlide - 1);

};
function pause() {
    isPlaying = false;
    pauseBtn.innerHTML = 'Play';
    clearInterval(timerID);
};
function play() {
    isPlaying = true;
    pauseBtn.innerHTML = 'Pause';
    timerID = setInterval(goToNext, interval);
};

const pausePlay = () => isPlaying ? pause() : play();

function prev() {
    goToPrev();
    pause();
};

function next() {
    goToNext();
    pause();
};

function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')){
        goToNth(+target.getAttribute('data-slide-to'));
        pause();
    };
   
};

function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev() 
    if (e.code === CODE_RIGHT_ARROW) next()
    if (e.code === CODE_Space) pausePlay()
};

function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX < -50 && prev();
    swipeStartX - swipeEndX > 50 && next();
}

function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
    indicatorContainer.addEventListener('click', indicate);
}

function init() {
    initListeners();
    timerID = setInterval(goToNext, interval);
}
init();
}());