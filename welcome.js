const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    if (window.parent && window.parent.BirthdayBook) { window.parent.BirthdayBook.startMusic(); window.parent.BirthdayBook.go(2); }

});

//

const container = document.querySelector(".floating-elements");

const emojis = [
    "❤️", "❤️", "❤️", "🧡","🧡","🧡","🧡",
    "🪼",
    




    "🪶","🪶",
 

    " ༘"," ༘"," ༘"," ༘"," ༘",



    "✩","✩","✩","✩","✩","✩","✩","✩","✩","✩",
    "✩","✩","✩","✩","✩","✩","✩","✩",
    "✩","✩","✩","✩","✩","✩","✩","✩","✩",
    "🎀","🎀","🎀",
    
    " ⋆ ",
    " ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ ",
    " ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ ",
    " ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ "," ⋆ ",



    "🎊","🍰",

    "🫧", "🫧", "🫧", "🫧",
    "🍓",





    "🧸","🧸","🧸",
    "⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐",
    "♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡",
    "♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡","♡",
    "♡","♡","♡","♡","♡","♡","♡","♡",
    "🌸","🌸","🌸"
];

function createEmoji(){

    const item = document.createElement("span");

    item.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

    item.style.left = Math.random()*100 + "%";

    item.style.fontSize = (20 + Math.random()*35) + "px";

    item.style.animationDuration = (6 + Math.random()*6) + "s";

    container.appendChild(item);

    setTimeout(()=>{
        item.remove();
    },12000);

}

setInterval(createEmoji,250);