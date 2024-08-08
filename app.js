let timerInterval;
let totalSeconds;
let remainingSeconds; 
let isPaused = false;
let selectedOption;

const audioElements = {
    rain: new Audio('rain.mp3'),
    nature: new Audio('nature.mp3'),
    relaxing: new Audio('relaxing.mp3'),
    ocean: new Audio('ocean.mp3')
};

const musicDropdown = document.getElementById('music');
musicDropdown.addEventListener('change', function() {
    selectedOption = musicDropdown.value;
});

function playAudio(option) {
    if (option !== 'none') {
        const audio = audioElements[option];
        audio.loop = true;
        audio.play();
    }
}

function startTimer() {
    if (!isPaused) {
        const hours = parseInt(document.getElementById('hours').value);
        const minutes = parseInt(document.getElementById('minutes').value);
        const seconds = parseInt(document.getElementById('seconds').value);

        if (remainingSeconds === undefined) 
            totalSeconds = hours * 3600 + minutes * 60 + seconds;
        else 
            totalSeconds = remainingSeconds;

        const countdownDisplay = document.getElementById('countdown');
        countdownDisplay.textContent = formatTime(totalSeconds);

        timerInterval = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                countdownDisplay.textContent = "Time's up!";
                audioElements[selectedOption].pause();
            } else if (!isPaused) {
                totalSeconds--;
                playAudio(selectedOption);
                countdownDisplay.textContent = formatTime(totalSeconds);
                updateProgress(totalSeconds);
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const pauseButton = document.getElementsByClassName('pause')[0];
if (pauseButton != undefined) {
    pauseButton.addEventListener('click', () => {
        if (isPaused) {
            pauseButton.classList.remove('play');
            pauseButton.classList.add('pause');
            isPaused = false;
            startTimer();
        } else {
            clearInterval(timerInterval);
            audioElements[selectedOption].pause();
            pauseButton.classList.add('play');
            pauseButton.classList.remove('pause');
            isPaused = true;
            remainingSeconds = totalSeconds; 
        }
    });
}

document.getElementById('reset').addEventListener('click', function() {
   location.reload();
});
