const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelectorAll('#pause');
const prevButton = document.querySelectorAll('#prev');
const nextButton = document.querySelectorAll('#next');
// const indicators = document.querySelectorAll('.indicators');
const slidesLength = slides.length;
const interval = 3000;

let currentSlide = 0;
let isPlaying = true;
let timerID = null;

// timerID = setInterval(nextSlide, interval);

function nextSlide() {
    slides[currentSlide].classList.toggle('active');
    currentSlide = (currentSlide + 1) % slidesLength;
    slides[currentSlide].classList.toggle('active');
};

timerID = setInterval(nextSlide, interval);

function pauseSlideShow() {
    isPlaying = false;
    pauseButton.innerHTML = 'Play';
    clearInterval(timerID);
}

function playSlideShow() {
    isPlaying = true;
    pauseButton.innerHTML = 'Pause';
    timerID = setInterval(nextSlide, interval);
}

function pauseHandler() {
    if(isPlaying) {
        pauseSlideShow();
    } else {
        playSlideShow();
    }
   
};

pauseButton.addEventListener('click', pauseHandler);