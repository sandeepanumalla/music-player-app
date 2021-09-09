const progressContainer = document.querySelector("#progress-container");
const progressSlider = progressContainer.children[0];
const durationWrapper = document.querySelector(".duration-wrapper");
const playerControls = document.querySelector(".player-controls");
const title = document.querySelector("#title");
const audioPlayer = document.querySelector("audio");
const previousButton = playerControls.children[0];
const playButton = playerControls.children[1];
const nextButton = playerControls.children[2];
const imageContainer = document.querySelector(".img-container").children[0];
const arrayOfSongs = [
  { song: "Front_Row_(Remix).mp3", img: "metric-1.jpg" },
  { song: "Electronic_Chill_Machine.mp3", img: "jacinto-1.jpg" },
  { song: "Radnor_&_Lee_-_Doorstep.mp3", img: "metric-1.jpg" },
  { song: "Goodnight_Disco_Queen.mp3", img: "jacinto-3.jpg" },
  { song: "Seven_National_Army(Remix).mp3", img: "jacinto-2.jpg" },
];
let isPlaying;

function play() {
  if (
    audioPlayer.paused &&
    audioPlayer.currentTime >= 0 &&
    !audioPlayer.started
  ) {
    playButton.classList.replace("fa-play", "fa-pause");
    playButton.title = "pause";
    audioPlayer.play();
    isPlaying = true;
  } else {
    playButton.classList.replace("fa-pause", "fa-play");
    playButton.title = "pause";

    audioPlayer.pause();
    isPlaying = false;
  }
}

function getCurrentSong() {
  let currentSong = audioPlayer.src;
  let currentSongName = currentSong.split("/")[5];
  let currentSongIndex = arrayOfSongs.findIndex(
    (e) => e.song == currentSongName,
  );
  console.log(currentSongName, currentSongIndex);
  return currentSongIndex;
}
function sourceChange(currentSongIndex) {
  audioPlayer.src = "music/" + arrayOfSongs[currentSongIndex].song;
  imageContainer.src = "img/" + arrayOfSongs[currentSongIndex].img;
  title.textContent = arrayOfSongs[currentSongIndex].song
    .split("_")
    .join(" ")
    .split(".")[0];
  play();
}

function nextSong() {
  let currentSongIndex = getCurrentSong();
  if (currentSongIndex === arrayOfSongs.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  sourceChange(currentSongIndex);
}

function previousSong() {
  let currentSongIndex = getCurrentSong();

  if (currentSongIndex === 0) {
    currentSongIndex = arrayOfSongs.length - 1;
  } else {
    currentSongIndex--;
  }
  // Changing the source of the audio
  sourceChange(currentSongIndex);
}

previousButton.addEventListener("click", previousSong);
playButton.addEventListener("click", play);
nextButton.addEventListener("click", nextSong);
audioPlayer.addEventListener("ended", nextSong);

audioPlayer.addEventListener("timeupdate", (e) => {
  if (isPlaying) {
    // updating the slider in realtime
    const totaltime =
      (parseInt(e.target.currentTime.toFixed(2)) /
        parseInt(e.target.duration.toFixed(2))) *
      100;

    progressSlider.style.width = totaltime + "%";
    const minutes = Math.floor(audioPlayer.duration / 60);
    const seconds = Math.floor(audioPlayer.duration % 60);

    if (seconds) {
      if (seconds < 10) {
        durationWrapper.children[1].textContent = minutes + ":0" + seconds;
      } else {
        durationWrapper.children[1].textContent = minutes + ":" + seconds;
      }
    }

    const currentTime = Math.floor(e.target.currentTime / 60);

    const currentSeconds = Math.floor(e.target.currentTime % 60);
    if (currentSeconds < 10) {
      durationWrapper.children[0].textContent =
        currentTime + ":0" + currentSeconds;
    } else {
      durationWrapper.children[0].textContent =
        currentTime + ":" + currentSeconds;
    }
  }
});

function setProgressbar(e) {
  const width = e.target.clientWidth;
  console.log(width, e.offsetX);
  const clientX = e.offsetX;
  const duration = Math.floor((clientX / width) * 100);
  const timeInSeconds = Math.floor((duration * audioPlayer.duration) / 100);
  console.log(duration, timeInSeconds);
  audioPlayer.currentTime = timeInSeconds;
}
let mouseDown = false;
progressContainer.addEventListener("mousedown", (e) => {
  mouseDown = true;
  mouseDown && setProgressbar(e);
});
progressContainer.addEventListener(
  "mousemove",
  (e) => mouseDown && setProgressbar(e),
);
progressContainer.addEventListener("touchstart", () => (mouseDown = true));
progressContainer.addEventListener("touchend", () => (mouseDown = false));
progressContainer.addEventListener(
  "touchmove",
  (e) => mouseDown && setProgressbar(e),
);
progressContainer.addEventListener("mouseup", () => (mouseDown = false));
