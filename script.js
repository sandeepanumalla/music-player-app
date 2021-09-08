const progressContainer = document.querySelector("#progress-container");
const durationWrapper = document.querySelector(".duration-wrapper");
const playerControls = document.querySelector(".player-controls");
const audioPlayer = document.querySelector("audio");
const previousButton = playerControls.children[0];
const playButton = playerControls.children[1];
const nextButton = playerControls.children[2];
const arrayOfSongs = [
  "jacinto-1.mp3",
  "jacinto-2.mp3",
  "jacinto-3.mp3",
  "metric-1.mp3",
];

function audioPlay() {}

function play(currentSongIndex) {
  if (localStorage.getItem("currentSongIndex") !== null) {
    if (
      audioPlayer.paused &&
      audioPlayer.currentTime >= 0 &&
      !audioPlayer.started
    ) {
      playButton.classList.replace("fa-play", "fa-pause");
      playButton.title = "pause";

      audioPlayer.play();
    } else {
      audioPlayer.src = `music/${
        arrayOfSongs[localStorage.getItem("currentSongIndex")]
      }`;
      playButton.classList.replace("fa-pause", "fa-play");
      playButton.title = "pause";
      audioPlayer.pause();
    }
  } else {
    if (
      audioPlayer.paused &&
      audioPlayer.currentTime >= 0 &&
      !audioPlayer.started
    ) {
      playButton.classList.replace("fa-play", "fa-pause");
      playButton.title = "pause";

      audioPlayer.play();
    } else {
      playButton.classList.replace("fa-pause", "fa-play");
      playButton.title = "pause";
      audioPlayer.src = `music/${arrayOfSongs[0]}`;
      audioPlayer.pause();
    }
  }
}

function getCurrentSong() {
  let currentSong = audioPlayer.src;
  let currentSongName = currentSong.split("/")[4];
  let currentSongIndex = arrayOfSongs.findIndex((e) => e == currentSongName);
  return currentSongIndex;
}

function savingSongToLocalStorage(currentSongIndex) {
  localStorage.setItem("currentSongIndex", currentSongIndex);
  audioPlayer.src = arrayOfSongs[currentSongIndex];
  play();
}

function nextSong() {
  let currentSongIndex = getCurrentSong();
  if (currentSongIndex === arrayOfSongs.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  savingSongToLocalStorage(currentSongIndex);
}

function previousSong() {
  let currentSongIndex = getCurrentSong();
  if (currentSongIndex === 0) {
    //3
    currentSongIndex = arrayOfSongs.length - 1;
  } else {
    currentSongIndex--;
  }
  savingSongToLocalStorage(currentSongIndex);
}

previousButton.addEventListener("click", previousSong);
playButton.addEventListener("click", play);
nextButton.addEventListener("click", nextSong);
