import { musicSrc, openingMessage, rants } from "./data.js";  
import { responses } from "./data.js"; 
  

// Sections
const openingSection=document.getElementById('opening-section');
const chatSection=document.getElementById('tamara-section');
tamaraWords(openingMessage, false)
//Others
const introButton=document.getElementById('intro-button');
const input=document.querySelector('input');
const icon=document.querySelector('.icon');
const wordings=document.querySelector('.chat-container')

introButton.addEventListener('click',()=>{
  openingSection.style.display=`none`
  chatSection.style.display=`flex`
}) 

function tamaraWords(text, isSent) {
  const chatContainer = document.querySelector('.chat-container');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;

  messageDiv.innerHTML = `
      <div class="message-content">
          <p>${text}</p>
      </div>
  `;

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function response() {
  const mood = input.value.toLowerCase().trim();
  
  // Check if any of the keywords are included in the input
  if (['sad', 'down', 'lonely', 'miss',`depressed`].some(word => mood.includes(word))) {
    tamaraWords(responses.sad, false);
  } else if (['happy', 'amazing', 'good','fine'].some(word => mood.includes(word))) {
    tamaraWords(responses.happy, false);
  } else if(['hello','hi','how are you',`hey`].some(word => mood.includes(word))){
    tamaraWords('Hey there, Sumaya. How are you?')
  } else if (['smile', 'smiling', 'smiled'].some(word => mood.includes(word))) {
    tamaraWords(responses.final, false);
  } else if (mood.includes('bored')) {
    tamaraWords(responses.bored, false);
  } else if (['tired', 'exhausted',`drained`].some(word => mood.includes(word))) {
    tamaraWords(responses.tired, false);
  } else if (['backstory', 'origin', 'deal', 'who', 'what'].some(word => mood.includes(word))) {
    tamaraWords(responses.origin, false);
  } else if (mood.includes('rant')) {
    rantings();
  } else if (['joke', 'laugh'].some(word => mood.includes(word))) {
    joke();
  } else if (mood.includes('music')) {
    playMusic();
  } else if (mood.includes('stop')) {
    tamaraWords(`Okay, I've stopped Sum Sum. What do you want to do?`, false);
    audio.pause();
  } else if(mood.includes('vibe')){
    tamaraWords(responses.vibe)
  }
   else {
    tamaraWords(responses.default, false);
  }
}
function joke(){
fetch(`https://icanhazdadjoke.com/`,{
  headers:{
    'accept':'application/json'
  }
})
.then(res=> res.json())
.then(data =>{ 
  tamaraWords(`Here's one ${data.joke}`, false)
})
}

let index=0
function rantings(){
 if (index>=rants.length){
  tamaraWords(`I'm out of juicy stories bbg, maybe next time. I've spilled enough tea😌`, false)
  return;
 }else{
   tamaraWords(rants[index], false);
   index++
 }
}
let audio;
function playMusic(){
 audio = new Audio(musicSrc[Math.floor(Math.random()*musicSrc.length)]);
if(index>=musicSrc.length){
  tamaraWords(`I'm out of bangers ml. Maybe next time. How are you still not smiling🙄`,false)
}else{
  audio.play();
  tamaraWords(`Here's some baddie music. If you want me to stop just say the word `, false)
}
audio.addEventListener('ended', () => {
  tamaraWords(`The song is over. Did you like it? Don't answer that. I can't reply snce someone made me dumb. Anyways hope you liked it`)
});
}

let timeOut;
icon.addEventListener('click',()=>{
  clearTimeout(timeOut)
  tamaraWords(input.value, true)
  timeOut= setTimeout(()=>{
    response();
    input.value=``
    input.focus();
  },500)
})

