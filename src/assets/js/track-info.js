const playButton = document.querySelector("#play-btn");
const backButton = document.querySelector("#back-btn");
const forwardButton = document.querySelector("#forward-btn");
const previewButton = document.querySelector(".play-preview-btn");
const audio = document.querySelector("audio");
const timeSlider = document.querySelector("input[name=time-slider]");
const startTime = document.querySelector(".duration-container *:first-child");
const endTime = document.querySelector(".duration-container *:last-child");

playButton.addEventListener("click", () => {
  const icon = playButton.querySelector("i");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

previewButton.addEventListener("click", () => {
  audio.play();
});

backButton.addEventListener("click", () => {
  audio.currentTime -= 10;
});

forwardButton.addEventListener("click", () => {
  audio.currentTime += 10;
});

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const percentage = (currentTime / duration) * 100;
  timeSlider.value = percentage;

  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);
  startTime.textContent = formattedCurrentTime;
  endTime.textContent = formattedDuration;
})

audio.addEventListener("loadedmetadata", () => {
  console.log('loaded file');
  const duration = audio.duration;
  const formattedDuration = formatTime(duration);
  endTime.textContent = formattedDuration;
})

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

timeSlider.addEventListener("input", () => {
  const duration = audio.duration;
  const percentage = timeSlider.value;
  const currentTime = (percentage * duration) / 100;
  audio.currentTime = currentTime;
})

audio.addEventListener("ended", () => {
  playButton.querySelector("i").classList.remove("bi-pause-fill");
  playButton.querySelector("i").classList.add("bi-play-fill");
})

audio.addEventListener("pause", () => {
  playButton.querySelector("i").classList.remove("bi-pause-fill");
  playButton.querySelector("i").classList.add("bi-play-fill");
})

audio.addEventListener("play", () => {
  playButton.querySelector("i").classList.remove("bi-play-fill");
  playButton.querySelector("i").classList.add("bi-pause-fill");
})