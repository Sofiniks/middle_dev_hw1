/* eslint-disable no-undef */
import "./index.scss";
import sun from "./assets/icons/sun.svg";
import rain from "./assets/icons/cloud-rain.svg";
import snow from "./assets/icons/cloud-snow.svg";
import summerSound from "./assets/sounds/summer.mp3";
import rainSound from "./assets/sounds/rain.mp3";
import snowSound from "./assets/sounds/winter.mp3";

const soundButtons = document.querySelectorAll(".sound_button_img");
const soundImages = [sun, rain, snow];
const audioPlayers = document.querySelectorAll("audio");
const audioFiles = [summerSound, rainSound, snowSound];
const volumeControl = document.querySelector("#volume");
const AudioContext = window.AudioContext || window.webkitAudioContext;

function playSound (idx) {
    const audioContext = new AudioContext();
    const currentAudioPlayer = audioPlayers[idx];
    const isActiveAudioPlayers = [...audioPlayers].filter((item, index) => index !== idx && item.played);
    const currentSound = audioFiles[idx];
    currentAudioPlayer.src = currentSound;
    
    const track = audioContext.createMediaElementSource(currentAudioPlayer);
    const gainNode = audioContext.createGain();
    track.connect(gainNode).connect(audioContext.destination); 
    gainNode.gain.value = volumeControl.value;  
    
 
    if(!currentAudioPlayer.paused) {
        currentAudioPlayer.pause();
        return;
    }

    if(isActiveAudioPlayers) {
        audioPlayers.forEach(item => {
            item.pause();
        });
    }
    
    volumeControl.addEventListener(
    "input",
    () => {
           gainNode.gain.value = volumeControl.value;    
    },
  false
);
    currentAudioPlayer.play();
}

soundButtons.forEach((item, index) => {
    item.src = soundImages[index];
    item.addEventListener("click", () => playSound(index));
});
