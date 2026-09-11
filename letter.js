/* ================= PREMIUM LETTER ================= */
/* Typewriter effect removed: the complete letter appears immediately. */

const letter = `Happy Birthday! 🎉❤️

Today is your special day, and I just want to wish you a life filled with happiness, success, and beautiful moments. May your smile always stay bright, and may you achieve everything you dream of.

You are not just a good friend; you are someone whose presence can make an ordinary day feel special. Talking to you always makes things a little better. 😊

I hope this birthday brings you new dreams, wonderful memories, and countless reasons to smile. ✨

Stay happy, stay amazing, and always be the wonderful person you are. ❤️

Once again, Happy Birthday Cutie 💗 🎂🎉`;

const typing = document.getElementById("typing");
const nextBtn = document.getElementById("nextBtn");

// Show the complete letter immediately — no typing animation.
typing.textContent = letter;
nextBtn.style.display = "block";

/* ======================
      Floating Hearts
====================== */

const emojis = ["❤️", "💖", "💕", "💗", "💝"];

function createHeart() {
    const heart = document.createElement("span");

    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (18 + Math.random() * 18) + "px";
    heart.style.pointerEvents = "none";
    heart.style.animation = "floatHeart 6s linear forwards";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 900);

/* ======================
      Final Button
====================== */

nextBtn.addEventListener("click", () => {
    window.parent.BirthdayBook.go(6);
});
