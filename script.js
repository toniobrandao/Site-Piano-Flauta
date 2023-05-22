const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input");
fluteSoundCheckbox = document.querySelector(".flute-sound-checkbox input");

let allKeys = [
    "1",
    "q",
    "2",
    "w",
    "3",
    "e",
    "4",
    "r",
    "5",
    "t",
    "6",
    "y",
    "7",
    "u",
    "8",
    "i",
    "9",
    "o",
    "0",
    "p",
    "-",
    "z",
    "s",
    "x",
    "d",
    "c",
    "f",
    "v",
    "g",
    "b",
    "h",
    "n",
    "j",
    "m",
    "k",
    ",",
  ],
  audio = new Audio(`tunes/piano/1.mp3`); // by default, audio src is "a" tune
let flute_is_on = false;
// JavaScript code to update the viewport based on device width
let initialScale;
let deviceWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

console.log(deviceWidth);
if (deviceWidth < 768) {
  initialScale = 0.2; // Set initial scale for smaller devices
} else {
  initialScale = 0.2; // Set initial scale for larger devices
}

window.onload = function () {
  let viewportMeta = document.getElementById("viewport-meta");
  viewportMeta.setAttribute(
    "content",
    "width=device-width, initial-scale=" + initialScale
  );
};

//WebSite Code

const playTune = (key) => {
  if (flute_is_on) {
    audio.src = `tunes/flute/${key}.wav`;
  } else {
    audio.src = `tunes/piano/${key}.mp3`; // passing audio src based on key pressed
  }

  audio.play(); // playing audio

  const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
  clickedKey.classList.add("active"); // adding active class to the clicked key element
  setTimeout(() => {
    // removing active class after 150 ms from the clicked key element
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
  // calling playTune function with passing data-key value as an argument
  key.addEventListener("click", () => {
    playTune(key.dataset.key);
    document.getElementById(
      "flute-image"
    ).src = `flute_chart/${key.dataset.key}.png`;
  });
});

const handleVolume = (e) => {
  audio.volume = e.target.value; // passing the range slider value as an audio volume
};

const showHideKeys = () => {
  // toggling hide class from each key on the checkbox click
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

const fluteSoundOn = () => {
  if (flute_is_on) {
    flute_is_on = false;
  } else {
    flute_is_on = true;
  }
};

const pressedKey = (e) => {
  // if the pressed key is in the allKeys array, only call the playTune function
  if (allKeys.includes(String(e.key))) {
    playTune(e.key);
    document.getElementById("flute-image").src = `flute_chart/${e.key}.png`;
  }
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
fluteSoundCheckbox.addEventListener("click", fluteSoundOn);
