const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
// const indicators = document.querySelectorAll('.indicators');
const slidesLength = slides.length;

let interval = 1000;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;

function goToNth(n) {
    slides[currentSlide].classList.toggle('active');
    currentSlide = (n + slidesLength) % slidesLength;
    slides[currentSlide].classList.toggle('active');
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
}

function play() {
    isPlaying = true;
    pauseBtn.innerHTML = 'Pause';
    timerID = setInterval(goToNth, interval);
}

const pausePlay = () => isPlaying ? pause() : play();

function prev() {
    goToPrev();
    pause();
};

function next() {
    goToNext();
    pause();
};

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
timerID = setInterval(goToNext, interval);