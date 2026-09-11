/* ==========================
      NEXT BUTTON
========================== */

const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {

    nextBtn.style.transform = "scale(.9)";
    nextBtn.style.opacity = ".7";

    setTimeout(() => {

        window.parent.BirthdayBook.go(4);

    },300);

});


/* ==========================
      PAPER ANIMATION
========================== */

const paper = document.querySelector(".paper");

window.addEventListener("load",()=>{

paper.animate(

[

{
opacity:0,
transform:"translateY(80px) scale(.9)"
},

{
opacity:1,
transform:"translateY(0) scale(1)"
}

],

{

duration:1200,

fill:"forwards",

easing:"ease-out"

}

);

});


/* ==========================
      PHOTO ANIMATION
========================== */

const photo=document.getElementById("birthdayPhoto");

photo.animate(

[

{
transform:"scale(.8)",
opacity:0
},

{
transform:"scale(1)",
opacity:1
}

],

{

duration:1800,

fill:"forwards"

}

);


/* ==========================
      FLOATING HEARTS
========================== */

const emojis=["❤️","💖","💕","💝","💗"];

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=
emojis[Math.floor(Math.random()*emojis.length)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(18+Math.random()*20)+"px";

heart.style.animationDuration=
(5+Math.random()*3)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},8000);

}

setInterval(createHeart,500);


/* ==========================
      SPARKLES
========================== */

const colors=[
"#FFD700",
"#FFF5B7",
"#ffffff",
"#FFE082"
];

function sparkle(){

const star=document.createElement("div");

star.style.position="fixed";

star.style.width="6px";

star.style.height="6px";

star.style.borderRadius="50%";

star.style.background=
colors[Math.floor(Math.random()*colors.length)];

star.style.left=Math.random()*100+"vw";

star.style.top=Math.random()*100+"vh";

star.style.opacity=".9";

star.style.pointerEvents="none";

star.animate(

[
{
transform:"scale(0)",
opacity:0
},

{
transform:"scale(1.5)",
opacity:1
},

{
transform:"scale(0)",
opacity:0
}

],

{

duration:1800,

iterations:1

}

);

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},1800);

}

setInterval(sparkle,250);


/* ==========================
      PHOTO HOVER EFFECT
========================== */

photo.addEventListener("mouseenter",()=>{

photo.style.transform="scale(1.04) rotate(-2deg)";

});

photo.addEventListener("mouseleave",()=>{

photo.style.transform="scale(1) rotate(0deg)";

});