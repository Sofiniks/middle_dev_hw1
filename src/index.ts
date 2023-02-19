/* eslint-disable no-undef */
import Data, { IData } from "./data";
import "./index.scss";

let playingMusicId: string;
const list: Element = document.querySelector(".sound_list");
const wrapper: HTMLElement = document.querySelector(".wrapper");

const audioElement: HTMLAudioElement = new Audio();
audioElement.loop = true;

const volume = document.querySelector(".volume-control");
volume.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  audioElement.volume = parseFloat((Number(target.value) / 100).toString());
});

list.addEventListener("click", (e: Event) => {
  console.log(e.target)
  const targetId: string = (e.target as any).closest("[data-item-id]")?.dataset.itemId;
  if (!targetId) return;

  const item = Data.find((i) => i.id === targetId);
  if (!item) return;

  if (playingMusicId !== item.id) {
    playingMusicId = item.id;
    audioElement.src = item.sound;
    audioElement.play();
    wrapper.style.backgroundImage = `url('${item.background}')`;
    return;
  }

  if (audioElement.paused) {
    audioElement.play();
  } else {
    audioElement.pause();
  }
});

function renderItem(item: IData): void {
  const listItem = document.createElement("li");
  const weatherItem = document.createElement("button");
  const itemIcon = document.createElement("img");

  listItem.classList.add("sound_item");
  weatherItem.classList.add("sound_item_button");
  itemIcon.classList.add("sound_item_icon");

  weatherItem.dataset.itemId = item.id;
  listItem.style.backgroundImage = `url('${item.background}')`;
  itemIcon.src = item.icon;

  weatherItem.append(itemIcon);
  listItem.append(weatherItem);
  list.append(listItem);
}

Data.forEach(renderItem);
// import "./index.scss";
// import sun from "./assets/icons/sun.svg";
// import rain from "./assets/icons/cloud-rain.svg";
// import snow from "./assets/icons/cloud-snow.svg";
// import summerSound from "./assets/sounds/summer.mp3";
// import rainSound from "./assets/sounds/rain.mp3";
// import snowSound from "./assets/sounds/winter.mp3";

// const audioFiles = [summerSound, rainSound, snowSound];
// const soundImages = [sun, rain, snow];
// const soundButtons = document.querySelectorAll(".sound_button_img");
// const audioPlayers = document.querySelectorAll("audio");

// const volumeControl = document.querySelector("#volume");
// const audioElement = new Audio();

// function playSound (idx) {
//     const isActiveAudioPlayers = [...audioPlayers].filter((item, index) => index !== idx && item.played);
//     const currentSound = audioFiles[idx];
//     audioElement.src = currentSound;
    
 
//     if(!audioElement.paused) {
//         audioElement.pause();
//         return;
//     }

//     if(isActiveAudioPlayers) {
//         audioPlayers.forEach(item => {
//             item.pause();
//         });
//     }
    
//     volumeControl.addEventListener(
//     "input",
//     () => {
//            audioElement.volume = volumeControl.value;    
//     },
//   false
// );
//     audioElement.play();
// }

// soundButtons.forEach((item, index) => {
//     item.src = soundImages[index];
//     item.addEventListener("click", () => playSound(index));
// });
