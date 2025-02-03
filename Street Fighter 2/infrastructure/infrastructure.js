import { StreetFighterGame } from "./Game.js";

let game = new StreetFighterGame();

window.addEventListener('load', function (){
 
  game.startGame();
 // game.loadAudio();
  
});

let audio= document.body.querySelector('.bgm');;

window.addEventListener("DOMContentLoaded", () =>{


window.onload = function() {
  audio.volume = Math.min(audio.volume -0.5, 1.0); // Increase by 10%, max 1.0
    audio.load();
    audio.play();
    audio.loop=true;
 };

});

document.addEventListener('click',loadAudio);

function loadAudio(){
  
  audio.load();
  audio.play();
  audio.loop=true;
}
