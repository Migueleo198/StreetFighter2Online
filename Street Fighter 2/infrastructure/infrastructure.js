import { StreetFighterGame } from "./Game.js";

let game = new StreetFighterGame();

window.addEventListener('load', function (){
   
  game.startGame();
 // game.loadAudio();
  
});

let audio= document.body.querySelector('.bgm');;

window.addEventListener("DOMContentLoaded", () =>{


window.onload = function() {
    audio.load();
    audio.play();
    audio.loop=true;
 };

});
