const photos = [
    "neha17.jpeg",
    "neha30.jpeg",
    "neha5.jpeg",
    "neha15.jpeg",
    "neha2.jpeg"
];

const titles = [
    "𝑪𝒖𝒕𝒆𝒔𝒕 𝑾𝒉𝒆𝒏 𝑨𝒏𝒈𝒓𝒚 💜",
    "𝑻𝒉𝒆 𝑩𝒐𝒐𝒌 𝑰 𝑵𝒆𝒗𝒆𝒓 𝑮𝒆𝒕 𝑩𝒐𝒓𝒆𝒅 𝑶𝒇 📖",
    "𝒀𝒐𝒖𝒓 𝑴𝒐𝒐𝒅, 𝒀𝒐𝒖𝒓 𝑴𝒂𝒈𝒊𝒄 ✨",
    "𝑻𝒉𝒆 𝑷𝒆𝒂𝒄𝒆 𝑲𝒆𝒆𝒑𝒆𝒓 🕊️",
    "𝑴𝒐𝒐𝒏𝒍𝒊𝒈𝒉𝒕 🌙"
];

const messages = [

` 𝑌𝑜𝑢 𝑎𝑟𝑒 𝑐𝑢𝑡𝑒 𝑒𝑣𝑒𝑟𝑦 𝑑𝑎𝑦, 𝑏𝑢𝑡 𝑤ℎ𝑒𝑛 𝑦𝑜𝑢 𝑔𝑒𝑡 𝑎𝑛𝑔𝑟𝑦, 𝑦𝑜𝑢 𝑏𝑒𝑐𝑜𝑚𝑒 𝑐𝑢𝑡𝑒𝑠𝑡 𝑜𝑓 𝑡ℎ𝑒 𝑐𝑢𝑡𝑒.

`,

`𝒀𝒐𝒖 𝒂𝒓𝒆 𝒍𝒊𝒌𝒆 𝒂 𝒃𝒐𝒐𝒌, 𝑰 𝒏𝒆𝒗𝒆𝒓 𝒈𝒆𝒕 𝒃𝒐𝒓𝒆𝒅 𝒓𝒆𝒂𝒅𝒊𝒏𝒈 𝒚𝒐𝒖.
`,

`𝑌𝑜𝑢𝑟 𝑚𝑜𝑜𝑑 𝑐ℎ𝑎𝑛𝑔𝑒𝑠 𝑞𝑢𝑖𝑐𝑘𝑙𝑦, 𝑎𝑛𝑑 𝑡ℎ𝑎𝑡'𝑠 𝑤ℎ𝑎𝑡 𝑚𝑎𝑘𝑒𝑠 𝑦𝑜𝑢 𝑒𝑣𝑒𝑛 𝑚𝑜𝑟𝑒 𝑐𝑢𝑡𝑒.`,

`𝐿𝑖𝑘𝑒 𝑎 𝑘𝑖𝑑, 𝑦𝑜𝑢 𝑖𝑔𝑛𝑜𝑟𝑒 𝑎𝑙𝑙 𝑡ℎ𝑒 𝑢𝑛𝑛𝑒𝑐𝑒𝑠𝑠𝑎𝑟𝑦 𝑡𝑒𝑛𝑠𝑖𝑜𝑛𝑠 𝑜𝑓 𝑡ℎ𝑒 𝑤𝑜𝑟𝑙𝑑, 𝑡ℎ𝑎𝑡'𝑠 𝑦𝑜𝑢𝑟 𝑏𝑒𝑠𝑡 𝑞𝑢𝑎𝑙𝑖𝑡𝑦.`,

`𝑌𝑜𝑢 𝑎𝑟𝑒 𝑙𝑖𝑘𝑒 𝑚𝑜𝑜𝑛𝑙𝑖𝑔ℎ𝑡, 𝑐𝑎𝑙𝑚, 𝑏𝑒𝑎𝑢𝑡𝑖𝑓𝑢𝑙 𝑎𝑛𝑑 𝑚𝑎𝑘𝑒𝑠 𝑒𝑣𝑒𝑟𝑦𝑡ℎ𝑖𝑛𝑔 𝑎𝑟𝑜𝑢𝑛𝑑 𝑦𝑜𝑢 𝑏𝑟𝑖𝑔ℎ𝑡𝑒𝑟.`

];

let index = 0;

const photo = document.getElementById("photo");
const title = document.getElementById("title");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
photo.src = photos[index];
title.textContent = titles[index];
message.textContent = messages[index];

nextBtn.addEventListener("click", () => {

    // Rotate + Fade Out
    photo.style.transition = "0.6s";
    photo.style.opacity = "0";
    photo.style.transform = "rotate(20deg) scale(.8)";

    title.style.opacity = "0";
    message.style.opacity = "0";

    setTimeout(() => {

        index++;

        if(index >= photos.length){

            window.parent.BirthdayBook.go(5);
            return;

        }

        photo.src = photos[index];

        title.textContent = titles[index];
        message.textContent = messages[index];

        // Next Image Entry
        photo.style.transform = "rotate(-20deg) scale(.8)";

        setTimeout(()=>{

            photo.style.opacity="1";
            photo.style.transform="rotate(0deg) scale(1)";

            title.style.opacity="1";
            message.style.opacity="1";

        },100);

    },600);

});


// =======================
// Floating Hearts
// =======================

setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.bottom="-20px";

heart.style.fontSize=(20+Math.random()*20)+"px";

heart.style.pointerEvents="none";

heart.style.animation="heart 6s linear forwards";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},500);