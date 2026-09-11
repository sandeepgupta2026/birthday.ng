




/* =========================================================
   BIRTHDAY FINAL PAGE JS
   MOBILE + DESKTOP RESPONSIVE FINAL VERSION
   ========================================================= */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const openingSection = document.getElementById("openingSection");
const giftSection = document.getElementById("giftSection");
const stars = document.getElementById("stars");
const clouds = document.getElementById("clouds");

/* =========================
   BACKGROUND
   ========================= */

const mobileDevice = () => window.innerWidth <= 600;

const STAR_COUNT = mobileDevice() ? 28 : 50;
const FLOATING_COUNT = mobileDevice() ? 12 : 30;

const sharedStars = [];
const sharedFloatingLights = [];

for (let i = 0; i < STAR_COUNT; i++) {

    const star = document.createElement("span");

    const starData = {
        x: Math.random(),
        y: Math.random(),
        size: mobileDevice()
            ? Math.random() * 2.1 + .8
            : Math.random() * 3 + 1
    };

    sharedStars.push(starData);

    star.className = "star";
    star.style.width = starData.size + "px";
    star.style.height = starData.size + "px";
    star.style.left = starData.x * 100 + "vw";
    star.style.top = starData.y * 100 + "vh";

    stars.appendChild(star);
}

for (let i = 0; i < (mobileDevice() ? 2 : 4); i++) {

    const cloud = document.createElement("div");

    cloud.className = "cloud";
    cloud.style.top = 40 + Math.random() * 220 + "px";
    cloud.style.animationDuration =
        35 + Math.random() * 25 + "s";
    cloud.style.animationDelay =
        -Math.random() * 30 + "s";

    clouds.appendChild(cloud);
}

for (let i = 0; i < FLOATING_COUNT; i++) {

    const light = document.createElement("span");

    const lightData = {
        x: Math.random(),
        y: Math.random(),
        speed: 22 + Math.random() * 28,
        phase: Math.random()
    };

    sharedFloatingLights.push(lightData);

    light.style.position = "absolute";
    light.style.width =
        mobileDevice() ? "1.5px" : "2px";
    light.style.height =
        mobileDevice() ? "1.5px" : "2px";
    light.style.borderRadius = "50%";
    light.style.background = "gold";
    light.style.boxShadow = "0 0 8px gold";
    light.style.left =
        lightData.x * 100 + "vw";
    light.style.top =
        lightData.y * 100 + "vh";

    light.animate(
        [
            {
                transform: "translateY(0)",
                opacity: .2
            },
            {
                transform: "translateY(-80px)",
                opacity: 1
            },
            {
                transform: "translateY(-160px)",
                opacity: .2
            }
        ],
        {
            duration: 4000 + Math.random() * 4000,
            iterations: Infinity
        }
    );

    stars.appendChild(light);
}

/* =========================
   OPENING / GIFT
   ========================= */

giftSection.style.display = "none";

setTimeout(() => {
    openingSection.classList.add("fadeOut");
}, 3500);

setTimeout(() => {

    openingSection.style.display = "none";

    giftSection.style.display = "flex";
    giftSection.classList.add("fadeIn");

    startGiftFall();

}, 4500);

const gift = document.getElementById("gift");
const openGift = document.getElementById("openGift");
const lid = document.querySelector(".lid");
const magicLight = document.querySelector(".magicLight");
const boom = document.getElementById("boom");

openGift.style.opacity = "0";
openGift.style.pointerEvents = "none";

gift.style.transform =
    "translateY(-900px) scale(.2) rotate(720deg)";

function startGiftFall() {

    gift.animate(
        [
            {
                transform:
                    "translateY(-900px) scale(.2) rotate(720deg)"
            },
            {
                transform:
                    "translateY(40px) scale(1.05) rotate(20deg)"
            },
            {
                transform:
                    "translateY(-25px)"
            },
            {
                transform:
                    "translateY(10px)"
            },
            {
                transform:
                    "translateY(0)"
            }
        ],
        {
            duration: 2500,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(showButton, 2600);
}

function showButton() {

    openGift.style.pointerEvents = "auto";

    openGift.animate(
        [
            {
                opacity: 0,
                transform: "translateY(40px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 800,
            fill: "forwards"
        }
    );
}

openGift.addEventListener("click", () => {

    openGift.disabled = true;
    openGift.style.pointerEvents = "none";

    shakeGift();
});

function safePlay(audio) {

    try {

        audio.currentTime = 0;

        const promise = audio.play();

        if (promise && promise.catch) {
            promise.catch(() => {});
        }

    } catch (e) {}
}

function shakeGift() {

    gift.animate(
        [
            {
                transform: "translateX(-8px)"
            },
            {
                transform: "translateX(8px)"
            },
            {
                transform: "translateX(-8px)"
            },
            {
                transform: "translateX(8px)"
            },
            {
                transform: "translateX(0)"
            }
        ],
        {
            duration: 120,
            iterations: 12
        }
    );

    setTimeout(openGiftBox, 1500);
}

function openGiftBox() {

    lid.animate(
        [
            {
                transform: "rotate(0deg)"
            },
            {
                transform:
                    "rotate(-35deg) translateY(-20px)"
            }
        ],
        {
            duration: 800,
            fill: "forwards"
        }
    );

    magicLight.animate(
        [
            {
                opacity: .2,
                transform:
                    "translateX(-50%) scale(.5)"
            },
            {
                opacity: 1,
                transform:
                    "translateX(-50%) scale(12)"
            }
        ],
        {
            duration: 1200,
            fill: "forwards"
        }
    );

    safePlay(boom);

    setTimeout(() => {

        giftSection.style.display = "none";

        launchRockets();

    }, 1500);
}

/* =========================
   FIREWORKS
   ========================= */

const rocketSound = document.getElementById("rocket");
const fireworkSound = document.getElementById("firework");

const rockets = [];
const particles = [];

class Rocket {

    constructor(x) {

        this.x = x;
        this.y = canvas.height + 30;

        this.speed = mobileDevice()
            ? 7
            : 8 + Math.random() * 3;

        this.target = mobileDevice()
            ? 100 +
              Math.random() *
              Math.min(170, canvas.height * .28)
            : 100 + Math.random() * 200;

        this.color =
            `hsl(${Math.random() * 360},100%,60%)`;

        this.dead = false;
    }

    update() {

        this.y -= this.speed;

        if (this.y <= this.target) {

            this.dead = true;

            createExplosion(
                this.x,
                this.y,
                this.color
            );
        }
    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle = "#fff";

        ctx.arc(
            this.x,
            this.y,
            mobileDevice() ? 3 : 4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.beginPath();

        ctx.strokeStyle = this.color;

        ctx.lineWidth =
            mobileDevice() ? 1.4 : 2;

        ctx.moveTo(
            this.x,
            this.y + 15
        );

        ctx.lineTo(
            this.x,
            this.y + 38
        );

        ctx.stroke();
    }
}

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        const angle =
            Math.random() * Math.PI * 2;

        const speed = mobileDevice()
            ? 1.5 + Math.random() * 4
            : 2 + Math.random() * 6;

        this.vx =
            Math.cos(angle) * speed;

        this.vy =
            Math.sin(angle) * speed;

        this.alpha = 1;

        this.size = mobileDevice()
            ? 1.2 + Math.random() * 1.8
            : 2 + Math.random() * 3;

        this.color = color;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= .98;
        this.vy *= .98;

        this.vy +=
            mobileDevice() ? .035 : .04;

        this.alpha -=
            mobileDevice() ? .018 : .012;
    }

    draw() {

        ctx.globalAlpha = this.alpha;

        ctx.beginPath();

        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;

        ctx.shadowBlur =
            mobileDevice() ? 12 : 30;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha = 1;
    }
}

function createExplosion(x, y, color) {

    const count =
        mobileDevice() ? 55 : 120;

    for (let i = 0; i < count; i++) {

        particles.push(
            new Particle(x, y, color)
        );
    }
}

function launchRockets() {

    safePlay(fireworkSound);
    safePlay(rocketSound);

    rockets.length = 0;
    particles.length = 0;

    const firstCount =
        mobileDevice() ? 5 : 10;

    const left =
        mobileDevice() ? 35 : 80;

    const right =
        mobileDevice() ? 35 : 80;

    for (let i = 0; i < firstCount; i++) {

        const x =
            firstCount === 1
                ? canvas.width / 2
                : left +
                  i *
                  (
                    (canvas.width - left - right) /
                    (firstCount - 1)
                  );

        rockets.push(new Rocket(x));
    }

    const rocketInterval =
        setInterval(() => {

            rockets.push(
                new Rocket(
                    left +
                    Math.random() *
                    (canvas.width - left - right)
                )
            );

        }, mobileDevice() ? 800 : 400);

    setTimeout(
        () => clearInterval(rocketInterval),
        mobileDevice() ? 30000 : 35000
    );

    animateFireworks();
}

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (
        let i = rockets.length - 1;
        i >= 0;
        i--
    ) {

        rockets[i].update();
        rockets[i].draw();

        if (rockets[i].dead) {
            rockets.splice(i, 1);
        }
    }

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        particles[i].update();
        particles[i].draw();

        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    if (rockets.length || particles.length) {

        requestAnimationFrame(
            animateFireworks
        );

    } else {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        startHeartAnimation();
    }
}

/* =========================
   HEART
   ========================= */

const heartSection =
    document.getElementById("heartSection");

const heartbeat =
    document.getElementById("heartbeat");

const heartPoints = [];

for (
    let t = 0;
    t <= Math.PI * 2;
    t += .04
) {

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
        );

    heartPoints.push({
        x: x * 18,
        y: y * 18
    });
}

let progress = 0;

function startHeartAnimation() {

    heartSection.style.display = "flex";

    safePlay(heartbeat);

    progress = 0;

    drawHeart();
}

function drawHeart() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    const heartScale =
        mobileDevice() ? .42 : 1;

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2 -
        (mobileDevice() ? 15 : 30)
    );

    ctx.scale(
        heartScale,
        heartScale
    );

    ctx.beginPath();

    ctx.lineWidth =
        mobileDevice() ? 4 : 5;

    ctx.strokeStyle = "#ff2d75";
    ctx.shadowColor = "#ff2d75";

    ctx.shadowBlur =
        mobileDevice() ? 18 : 30;

    ctx.moveTo(
        heartPoints[0].x,
        heartPoints[0].y
    );

    const end =
        Math.floor(progress);

    for (
        let i = 1;
        i <= end &&
        i < heartPoints.length;
        i++
    ) {

        ctx.lineTo(
            heartPoints[i].x,
            heartPoints[i].y
        );
    }

    ctx.stroke();

    ctx.restore();

    progress += 1.4;

    if (progress < heartPoints.length) {

        requestAnimationFrame(
            drawHeart
        );

    } else {

        setTimeout(
            glowHeart,
            800
        );
    }
}

function glowHeart() {

    let glow =
        mobileDevice() ? 12 : 20;

    function pulse() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.save();

        const heartScale =
            mobileDevice() ? .42 : 1;

        ctx.translate(
            canvas.width / 2,
            canvas.height / 2 -
            (mobileDevice() ? 15 : 30)
        );

        ctx.scale(
            heartScale,
            heartScale
        );

        ctx.beginPath();

        ctx.lineWidth =
            mobileDevice() ? 4 : 6;

        ctx.strokeStyle = "#ff4d94";
        ctx.shadowColor = "#ff4d94";

        ctx.shadowBlur = glow;

        ctx.moveTo(
            heartPoints[0].x,
            heartPoints[0].y
        );

        heartPoints.forEach(point => {
            ctx.lineTo(
                point.x,
                point.y
            );
        });

        ctx.stroke();

        ctx.restore();

        glow +=
            mobileDevice() ? 1.4 : 2;

        if (
            glow <
            (mobileDevice() ? 35 : 55)
        ) {

            requestAnimationFrame(
                pulse
            );

        } else {

            setTimeout(
                explodeHeart,
                600
            );
        }
    }

    pulse();
}

/* =========================
   DATE PARTICLES
   ========================= */

const nameSection =
    document.getElementById("nameSection");

const nameCanvas =
    document.getElementById("nameCanvas");

const nctx =
    nameCanvas.getContext("2d");

const nameParticles = [];

let nameAnimationStart = 0;
let nameAnimationRunning = false;

function resizeNameCanvas() {

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            mobileDevice() ? 1.25 : 1.5
        );

    nameCanvas.width =
        Math.floor(
            innerWidth * dpr
        );

    nameCanvas.height =
        Math.floor(
            innerHeight * dpr
        );

    nameCanvas.style.width =
        innerWidth + "px";

    nameCanvas.style.height =
        innerHeight + "px";

    nctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}

resizeNameCanvas();

window.addEventListener(
    "resize",
    resizeNameCanvas
);

class NameParticle {

    constructor(x, y) {

        this.x =
            Math.random() * innerWidth;

        this.y =
            Math.random() * innerHeight;

        this.tx = x;
        this.ty = y;

        this.size =
            mobileDevice() ? 1.35 : 2;

        this.vx = 0;
        this.vy = 0;
    }

    update() {

        this.vx +=
            (this.tx - this.x) * .02;

        this.vy +=
            (this.ty - this.y) * .02;

        this.vx *= .9;
        this.vy *= .9;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {

        nctx.beginPath();

        nctx.fillStyle = "#ff4da6";
        nctx.shadowColor = "#ff4da6";

        nctx.shadowBlur =
            mobileDevice() ? 7 : 12;

        nctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        nctx.fill();
    }
}

function showParticleName() {

    nameSection.style.display = "flex";

    resizeNameCanvas();

    const W = innerWidth;
    const H = innerHeight;

    nctx.clearRect(
        0,
        0,
        W,
        H
    );

    nctx.fillStyle = "#fff";

    /*
       Mobile date:
       11:09:2005
       safely inside 360px.
    */
    const fontSize =
        mobileDevice()
            ? Math.max(
                30,
                Math.min(
                    42,
                    W * .105
                )
            )
            : 90;

    nctx.font =
        `bold ${fontSize}px Poppins`;

    nctx.textAlign = "center";
    nctx.textBaseline = "middle";

    nctx.fillText(
        "11:09:2005",
        W / 2,
        H / 2
    );

    const image =
        nctx.getImageData(
            0,
            0,
            W,
            H
        );

    nameParticles.length = 0;

    const step =
        mobileDevice() ? 3 : 5;

    for (
        let y = 0;
        y < image.height;
        y += step
    ) {

        for (
            let x = 0;
            x < image.width;
            x += step
        ) {

            const index =
                (y * image.width + x) * 4;

            if (
                image.data[index + 3] > 150
            ) {

                nameParticles.push(
                    new NameParticle(x, y)
                );
            }
        }
    }

    nctx.clearRect(
        0,
        0,
        W,
        H
    );

    nameAnimationStart = 0;
    nameAnimationRunning = true;

    requestAnimationFrame(
        animateName
    );
}

function animateName(now) {

    if (!nameAnimationRunning) return;

    if (!nameAnimationStart) {
        nameAnimationStart = now;
    }

    nctx.clearRect(
        0,
        0,
        innerWidth,
        innerHeight
    );

    nameParticles.forEach(p => {

        p.update();
        p.draw();

    });

    if (
        now - nameAnimationStart < 5000
    ) {

        requestAnimationFrame(
            animateName
        );

    } else {

        nameAnimationRunning = false;

        nameSection.style.display =
            "none";

        nameSection.style.visibility =
            "hidden";

        nctx.clearRect(
            0,
            0,
            innerWidth,
            innerHeight
        );

        setTimeout(
            startFinalDotSequence,
            250
        );
    }
}

function explodeHeart() {

    heartSection.style.display =
        "none";

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    setTimeout(
        showParticleName,
        600
    );
}

/* =========================================================
   FINAL DOT-ART
   ========================================================= */

const dotFinalSection =
    document.getElementById(
        "dotFinalSection"
    );

const dotFinalCanvas =
    document.getElementById(
        "dotFinalCanvas"
    );

const dctx =
    dotFinalCanvas.getContext(
        "2d",
        {
            alpha: true,
            willReadFrequently: true
        }
    );

/*
   Desktop = 6000
   Mobile  = 2800
*/
const DESKTOP_DOT_TOTAL = 6000;
const MOBILE_DOT_TOTAL = 2800;

const DOT_IMAGE_PRIMARY =
    "portrait.png";

const DOT_IMAGE_FALLBACK =
    "nehaascii.png";

/* ORIGINAL TIMINGS — unchanged */

const DOT_HAPPY_FORMATION = 5000;
const DOT_HAPPY_HOLD = 6500;

const DOT_NEHA_FORMATION = 5000;
const DOT_NEHA_HOLD = 2500;

const DOT_PHOTO_FORMATION = 7000;
const DOT_PHOTO_HOLD = 5000;

const DOT_ENTRY_DISTANCE_MIN = 1.15;
const DOT_ENTRY_DISTANCE_MAX = 2.20;

const DOT_ENTRY_DRIFT = 170;
const DOT_ENTRY_DELAY = .55;

let DOT_TOTAL =
    mobileDevice()
        ? MOBILE_DOT_TOTAL
        : DESKTOP_DOT_TOTAL;

let dW = 0;
let dH = 0;
let dDPR = 1;

let dotStars = [];
let dotFloatingParticles = [];

let dotParticles = [];

let dotPortraitPoints = [];
let dotPortraitColors = [];

let dotImageReady = false;
let dotStartTime = 0;
let dotLastTime = 0;

let dotAnimationStarted = false;

let dotActiveImage =
    DOT_IMAGE_PRIMARY;

let dotRedParticles = [];
let dotHeartParticles = [];

let dotRomanticSeeded = false;

/* =========================
   ROMANTIC PARTICLES
   ========================= */

function createRomanticParticles() {

    dotRedParticles = [];
    dotHeartParticles = [];

    const redCount =
        mobileDevice() ? 20 : 52;

    const heartCount =
        mobileDevice() ? 5 : 11;

    for (
        let i = 0;
        i < redCount;
        i++
    ) {

        dotRedParticles.push({

            x: Math.random(),

            y:
                Math.random() * 1.15 + .05,

            speed:
                18 + Math.random() * 30,

            drift:
                mobileDevice()
                    ? 4 + Math.random() * 10
                    : 7 + Math.random() * 18,

            phase:
                Math.random() * Math.PI * 2,

            size:
                mobileDevice()
                    ? .7 + Math.random() * 1.1
                    : .8 + Math.random() * 1.6,

            alpha:
                .18 + Math.random() * .34
        });
    }

    for (
        let i = 0;
        i < heartCount;
        i++
    ) {

        dotHeartParticles.push({

            x: Math.random(),

            y:
                Math.random() * 1.2,

            speed:
                10 + Math.random() * 18,

            drift:
                mobileDevice()
                    ? 5 + Math.random() * 8
                    : 8 + Math.random() * 14,

            phase:
                Math.random() * Math.PI * 2,

            size:
                mobileDevice()
                    ? 2 + Math.random() * 1.5
                    : 2.5 + Math.random() * 2.5,

            alpha:
                .16 + Math.random() * .22
        });
    }

    dotRomanticSeeded = true;
}

function drawHeartParticle(
    x,
    y,
    size,
    alpha
) {

    dctx.save();

    dctx.globalAlpha = alpha;

    dctx.fillStyle = "#ff3b69";
    dctx.shadowColor = "#ff1744";

    dctx.shadowBlur =
        mobileDevice() ? 5 : 9;

    dctx.beginPath();

    dctx.moveTo(
        x,
        y + size * .35
    );

    dctx.bezierCurveTo(
        x - size * 1.15,
        y - size * .35,
        x - size * .65,
        y - size * 1.05,
        x,
        y - size * .45
    );

    dctx.bezierCurveTo(
        x + size * .65,
        y - size * 1.05,
        x + size * 1.15,
        y - size * .35,
        x,
        y + size * .35
    );

    dctx.fill();

    dctx.restore();
}

function drawRomanticRedParticles(time) {

    if (!dotRomanticSeeded) {
        createRomanticParticles();
    }

    const seconds = time / 1000;

    for (const p of dotRedParticles) {

        const rawY =
            dH +
            35 -
            (
                (
                    seconds * p.speed +
                    p.y * (dH + 250)
                ) %
                (dH + 100)
            );

        const sway =
            Math.sin(
                seconds * .8 +
                p.phase
            ) * p.drift;

        const x =
            p.x * dW + sway;

        const twinkle =
            .55 +
            .45 *
            Math.sin(
                seconds * 2.1 +
                p.phase
            );

        const alpha =
            p.alpha * twinkle;

        dctx.save();

        dctx.globalAlpha =
            alpha * .45;

        dctx.fillStyle = "#ff1744";
        dctx.shadowColor = "#ff1744";

        dctx.shadowBlur =
            mobileDevice() ? 7 : 13;

        dctx.beginPath();

        dctx.arc(
            x,
            rawY,
            p.size *
            (mobileDevice() ? 1.7 : 2.3),
            0,
            Math.PI * 2
        );

        dctx.fill();

        dctx.restore();

        dctx.save();

        dctx.globalAlpha = alpha;

        dctx.fillStyle = "#ff526f";

        dctx.beginPath();

        dctx.arc(
            x,
            rawY,
            p.size,
            0,
            Math.PI * 2
        );

        dctx.fill();

        dctx.restore();
    }

    for (const p of dotHeartParticles) {

        const rawY =
            dH +
            45 -
            (
                (
                    seconds * p.speed +
                    p.y * (dH + 260)
                ) %
                (dH + 130)
            );

        const sway =
            Math.sin(
                seconds * .55 +
                p.phase
            ) * p.drift;

        const pulse =
            .85 +
            Math.sin(
                seconds * 1.6 +
                p.phase
            ) * .12;

        drawHeartParticle(
            p.x * dW + sway,
            rawY,
            p.size * pulse,
            p.alpha *
            (
                .72 +
                .28 *
                Math.sin(
                    seconds * 1.3 +
                    p.phase
                )
            )
        );
    }
}

/* =========================
   HELPERS
   ========================= */

function dClamp(
    v,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(max, v)
    );
}

function dLerp(
    a,
    b,
    t
) {

    return a + (b - a) * t;
}

function dRandom(
    min,
    max
) {

    return min +
        Math.random() *
        (max - min);
}

function dEase(t) {

    t = dClamp(t, 0, 1);

    return t < .5
        ? 4 * t * t * t
        : 1 -
          Math.pow(
              -2 * t + 2,
              3
          ) / 2;
}

function dCinematicEase(t) {

    t = dClamp(t, 0, 1);

    return (
        t * t
    ) /
    (
        t * t +
        Math.pow(
            1 - t,
            2.2
        )
    );
}

/* =========================
   FINAL CANVAS RESIZE
   ========================= */

function resizeFinalDots() {

    DOT_TOTAL =
        mobileDevice()
            ? MOBILE_DOT_TOTAL
            : DESKTOP_DOT_TOTAL;

    dDPR =
        Math.min(
            window.devicePixelRatio || 1,
            mobileDevice() ? 1.15 : 1.5
        );

    dW = window.innerWidth;
    dH = window.innerHeight;

    dotFinalCanvas.width =
        Math.floor(dW * dDPR);

    dotFinalCanvas.height =
        Math.floor(dH * dDPR);

    dotFinalCanvas.style.width =
        dW + "px";

    dotFinalCanvas.style.height =
        dH + "px";

    dctx.setTransform(
        dDPR,
        0,
        0,
        dDPR,
        0,
        0
    );

    createDotStars();

    if (dotImageReady) {

        createDotPortrait();

        if (
            dotParticles.length &&
            dotPortraitPoints.length
        ) {

            dotParticles.forEach(
                (p, i) => {

                    if (
                        dotPortraitPoints[i]
                    ) {

                        p.photoX =
                            dotPortraitPoints[i].x;

                        p.photoY =
                            dotPortraitPoints[i].y;

                        p.color =
                            dotPortraitColors[i];
                    }
                }
            );
        }
    }
}

/* =========================
   DOT STARS
   ========================= */

function createDotStars() {

    dotStars = [];

    for (
        let i = 0;
        i < sharedStars.length;
        i++
    ) {

        const s = sharedStars[i];

        dotStars.push({

            x: s.x * dW,
            y: s.y * dH,

            size:
                Math.max(
                    .55,
                    s.size * .42
                ),

            phase:
                i * .73,

            speed:
                .4 + (i % 7) * .16,

            brightness:
                .8 + (i % 5) * .08,

            glow:
                5 + (i % 5)
        });
    }

    dotFloatingParticles = [];

    for (
        let i = 0;
        i < sharedFloatingLights.length;
        i++
    ) {

        const f =
            sharedFloatingLights[i];

        dotFloatingParticles.push({

            x: f.x * dW,
            y: f.y * dH,

            speed: f.speed,

            phase:
                f.phase * dH,

            size:
                mobileDevice()
                    ? .8 + (i % 3) * .2
                    : 1.2 + (i % 3) * .35,

            alpha:
                .18 + (i % 5) * .06
        });
    }
}

function drawDotFloatingParticles(time) {

    const seconds = time / 1000;

    for (
        const p of dotFloatingParticles
    ) {

        const y =
            (
                (
                    p.y -
                    seconds * p.speed -
                    p.phase
                ) %
                (dH + 80) +
                (dH + 80)
            ) %
            (dH + 80) -
            40;

        const twinkle =
            .55 +
            .45 *
            Math.sin(
                seconds * 1.8 +
                p.phase
            );

        dctx.save();

        dctx.globalAlpha =
            p.alpha * twinkle;

        dctx.fillStyle = "#ffd966";
        dctx.shadowColor = "#ffd966";

        dctx.shadowBlur =
            mobileDevice() ? 5 : 10;

        dctx.beginPath();

        dctx.arc(
            p.x,
            y,
            p.size,
            0,
            Math.PI * 2
        );

        dctx.fill();

        dctx.restore();
    }
}

/* =========================================================
   FINAL TEXT POINTS
   FIXED FOR 360x800 MOBILE
   ========================================================= */

function createDotTextPoints(text) {

    const temp =
        document.createElement("canvas");

    /*
       IMPORTANT FIX:
       Old code:
       Math.max(dW,1000)

       This caused mobile text coordinates
       to be created outside the 360px screen.

       New code uses exact viewport size.
    */

    const tw = Math.max(
        1,
        Math.floor(dW)
    );

    const th = Math.max(
        1,
        Math.floor(dH)
    );

    temp.width = tw;
    temp.height = th;

    const tctx =
        temp.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );

    tctx.clearRect(
        0,
        0,
        tw,
        th
    );

    let fontSize;

    /* =========================
       HAPPY BIRTHDAY
       ========================= */

    if (text === "HAPPY BIRTHDAY") {

        if (dW <= 600) {

            /*
               360px:
               HAPPY
               BIRTHDAY

               Two lines are used because
               one line would become too small.
            */

            fontSize =
                Math.min(
                    dW * .19,
                    62
                );

            tctx.font =
                `900 ${fontSize}px Arial Black, Arial, sans-serif`;

            tctx.textAlign =
                "center";

            tctx.textBaseline =
                "middle";

            tctx.fillStyle =
                "#fff";

            const centerX =
                tw / 2;

            const centerY =
                th / 2;

            tctx.fillText(
                "HAPPY",
                centerX,
                centerY -
                fontSize * .60
            );

            tctx.fillText(
                "BIRTHDAY",
                centerX,
                centerY +
                fontSize * .60
            );

        } else {

            fontSize =
                Math.min(
                    dW * .075,
                    105
                );

            tctx.font =
                `900 ${fontSize}px Arial Black, Arial, sans-serif`;

            tctx.textAlign =
                "center";

            tctx.textBaseline =
                "middle";

            tctx.fillStyle =
                "#fff";

            tctx.fillText(
                "HAPPY BIRTHDAY",
                tw / 2,
                th / 2
            );
        }

    } else {

        /* =========================
           NEHA
           ========================= */

        fontSize =
            dW <= 600
                ? Math.min(
                    dW * .21,
                    72
                )
                : Math.min(
                    dW * .19,
                    230
                );

        tctx.font =
            `900 ${fontSize}px Arial Black, Arial, sans-serif`;

        tctx.textAlign =
            "center";

        tctx.textBaseline =
            "middle";

        tctx.fillStyle =
            "#fff";

        tctx.fillText(
            text,
            tw / 2,
            th / 2
        );
    }

    const data =
        tctx.getImageData(
            0,
            0,
            tw,
            th
        );

    const candidates = [];

    const step =
        dW <= 600
            ? 2.5
            : 2.7;

    for (
        let y = 0;
        y < th;
        y += step
    ) {

        for (
            let x = 0;
            x < tw;
            x += step
        ) {

            const px =
                Math.floor(x);

            const py =
                Math.floor(y);

            const index =
                (
                    py * tw +
                    px
                ) * 4;

            if (
                data.data[index + 3] >
                100
            ) {

                candidates.push({

                    x: dClamp(
                        x,
                        6,
                        dW - 6
                    ),

                    y: dClamp(
                        y,
                        6,
                        dH - 6
                    )
                });
            }
        }
    }

    if (!candidates.length) {

        return Array.from(
            {
                length: DOT_TOTAL
            },
            () => ({
                x: dW / 2,
                y: dH / 2
            })
        );
    }

    const points = [];

    for (
        let i = 0;
        i < DOT_TOTAL;
        i++
    ) {

        const index =
            Math.floor(
                i *
                candidates.length /
                DOT_TOTAL
            );

        const p =
            candidates[
                Math.min(
                    index,
                    candidates.length - 1
                )
            ];

        points.push({

            x: dClamp(
                p.x,
                6,
                dW - 6
            ),

            y: dClamp(
                p.y,
                6,
                dH - 6
            )
        });
    }

    return points;
}

/* =========================
   LOAD PORTRAIT
   ========================= */

function loadDotImage() {

    return new Promise(
        resolve => {

            const image =
                new Image();

            image.onload = () => {

                dotActiveImage =
                    image.src;

                resolve(image);
            };

            image.onerror = () => {

                if (
                    dotActiveImage !==
                    DOT_IMAGE_FALLBACK
                ) {

                    dotActiveImage =
                        DOT_IMAGE_FALLBACK;

                    const fallback =
                        new Image();

                    fallback.onload =
                        () => resolve(
                            fallback
                        );

                    fallback.onerror =
                        () => resolve(
                            null
                        );

                    fallback.src =
                        DOT_IMAGE_FALLBACK;

                } else {

                    resolve(null);
                }
            };

            image.src =
                DOT_IMAGE_PRIMARY;
        }
    );
}

/* =========================================================
   CREATE DOT PORTRAIT
   ========================================================= */

async function createDotPortrait() {

    const image =
        await loadDotImage();

    if (!image) {

        dotPortraitPoints =
            Array.from(
                {
                    length: DOT_TOTAL
                },
                () => ({
                    x: dW / 2,
                    y: dH / 2
                })
            );

        dotPortraitColors =
            Array.from(
                {
                    length: DOT_TOTAL
                },
                () => ({
                    r: 255,
                    g: 255,
                    b: 255
                })
            );

        dotImageReady = true;

        return;
    }

    const source =
        document.createElement(
            "canvas"
        );

    source.width =
        image.naturalWidth;

    source.height =
        image.naturalHeight;

    const sctx =
        source.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );

    sctx.drawImage(
        image,
        0,
        0
    );

    const src =
        sctx.getImageData(
            0,
            0,
            source.width,
            source.height
        );

    let minX = source.width;
    let minY = source.height;

    let maxX = -1;
    let maxY = -1;

    for (
        let y = 0;
        y < source.height;
        y++
    ) {

        for (
            let x = 0;
            x < source.width;
            x++
        ) {

            const i =
                (
                    y *
                    source.width +
                    x
                ) * 4;

            const r =
                src.data[i];

            const g =
                src.data[i + 1];

            const b =
                src.data[i + 2];

            const a =
                src.data[i + 3];

            if (
                a > 25 &&
                Math.max(r,g,b) > 15
            ) {

                minX =
                    Math.min(
                        minX,
                        x
                    );

                maxX =
                    Math.max(
                        maxX,
                        x
                    );

                minY =
                    Math.min(
                        minY,
                        y
                    );

                maxY =
                    Math.max(
                        maxY,
                        y
                    );
            }
        }
    }

    if (maxX < 0) {

        dotPortraitPoints =
            Array.from(
                {
                    length: DOT_TOTAL
                },
                () => ({
                    x: dW / 2,
                    y: dH / 2
                })
            );

        dotPortraitColors =
            Array.from(
                {
                    length: DOT_TOTAL
                },
                () => ({
                    r:255,
                    g:255,
                    b:255
                })
            );

        dotImageReady = true;

        return;
    }

    const padding =
        Math.max(
            6,
            Math.floor(
                Math.min(
                    source.width,
                    source.height
                ) * .015
            )
        );

    minX =
        Math.max(
            0,
            minX - padding
        );

    minY =
        Math.max(
            0,
            minY - padding
        );

    maxX =
        Math.min(
            source.width - 1,
            maxX + padding
        );

    maxY =
        Math.min(
            source.height - 1,
            maxY + padding
        );

    const cropW =
        maxX - minX + 1;

    const cropH =
        maxY - minY + 1;

    /* =========================
       RESPONSIVE PORTRAIT SIZE
       ========================= */

    const maxW =
        dW *
        (
            mobileDevice()
                ? .82
                : .90
        );

    const maxH =
        dH *
        (
            mobileDevice()
                ? .64
                : .88
        );

    const scale =
        Math.min(
            maxW / cropW,
            maxH / cropH
        );

    const drawW =
        cropW * scale;

    const drawH =
        cropH * scale;

    /*
       Center portrait safely.
    */

    const offsetX =
        Math.max(
            6,
            (dW - drawW) / 2
        );

    const offsetY =
        Math.max(
            6,
            (dH - drawH) / 2
        );

    const processW =
        Math.min(
            mobileDevice()
                ? 700
                : 1000,

            Math.max(
                mobileDevice()
                    ? 420
                    : 600,

                Math.floor(
                    drawW * 1.5
                )
            )
        );

    const processScale =
        processW / cropW;

    const processH =
        Math.max(
            1,
            Math.floor(
                cropH *
                processScale
            )
        );

    const work =
        document.createElement(
            "canvas"
        );

    work.width =
        processW;

    work.height =
        processH;

    const wctx =
        work.getContext(
            "2d",
            {
                willReadFrequently:true
            }
        );

    wctx.drawImage(
        source,
        minX,
        minY,
        cropW,
        cropH,
        0,
        0,
        processW,
        processH
    );

    const data =
        wctx.getImageData(
            0,
            0,
            processW,
            processH
        );

    const candidates = [];

    const grid =
        mobileDevice()
            ? 3.6
            : 3.5;

    for (
        let gy = 0;
        gy < processH;
        gy += grid
    ) {

        for (
            let gx = 0;
            gx < processW;
            gx += grid
        ) {

            let best = null;
            let bestScore = -1;

            const endX =
                Math.min(
                    processW,
                    gx + grid
                );

            const endY =
                Math.min(
                    processH,
                    gy + grid
                );

            for (
                let y =
                    Math.floor(gy);
                y < endY;
                y++
            ) {

                for (
                    let x =
                        Math.floor(gx);
                    x < endX;
                    x++
                ) {

                    const i =
                        (
                            y *
                            processW +
                            x
                        ) * 4;

                    const r =
                        data.data[i];

                    const g =
                        data.data[i + 1];

                    const b =
                        data.data[i + 2];

                    const a =
                        data.data[i + 3];

                    const brightness =
                        Math.max(
                            r,
                            g,
                            b
                        );

                    if (
                        a < 25 ||
                        brightness < 15
                    ) {
                        continue;
                    }

                    const saturation =
                        brightness -
                        Math.min(
                            r,
                            g,
                            b
                        );

                    const score =
                        brightness +
                        saturation * .35;

                    if (
                        score >
                        bestScore
                    ) {

                        bestScore =
                            score;

                        best = {
                            x,
                            y,
                            r,
                            g,
                            b
                        };
                    }
                }
            }

            if (best) {
                candidates.push(best);
            }
        }
    }

    if (
        candidates.length <
        DOT_TOTAL
    ) {

        for (
            let y = 0;
            y < processH;
            y += 2
        ) {

            for (
                let x = 0;
                x < processW;
                x += 2
            ) {

                const i =
                    (
                        y *
                        processW +
                        x
                    ) * 4;

                const r =
                    data.data[i];

                const g =
                    data.data[i + 1];

                const b =
                    data.data[i + 2];

                const a =
                    data.data[i + 3];

                if (
                    a > 25 &&
                    Math.max(
                        r,
                        g,
                        b
                    ) > 15
                ) {

                    candidates.push({
                        x,
                        y,
                        r,
                        g,
                        b
                    });
                }
            }
        }
    }

    if (!candidates.length) {

        candidates.push({
            x: processW / 2,
            y: processH / 2,
            r: 255,
            g: 255,
            b: 255
        });
    }

    dotPortraitPoints = [];
    dotPortraitColors = [];

    for (
        let i = 0;
        i < DOT_TOTAL;
        i++
    ) {

        const index =
            Math.floor(
                i *
                candidates.length /
                DOT_TOTAL
            );

        const p =
            candidates[
                Math.min(
                    index,
                    candidates.length - 1
                )
            ];

        /*
           SAFE PORTRAIT COORDINATES
        */

        dotPortraitPoints.push({

            x: dClamp(
                offsetX +
                (
                    p.x /
                    processScale
                ) * scale,

                6,
                dW - 6
            ),

            y: dClamp(
                offsetY +
                (
                    p.y /
                    processScale
                ) * scale,

                6,
                dH - 6
            )
        });

        dotPortraitColors.push({
            r: p.r,
            g: p.g,
            b: p.b
        });
    }

    /*
       Shuffle portrait dots.
    */

    for (
        let i = DOT_TOTAL - 1;
        i > 0;
        i--
    ) {

        const k =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            dotPortraitPoints[i],
            dotPortraitPoints[k]
        ] =
        [
            dotPortraitPoints[k],
            dotPortraitPoints[i]
        ];

        [
            dotPortraitColors[i],
            dotPortraitColors[k]
        ] =
        [
            dotPortraitColors[k],
            dotPortraitColors[i]
        ];
    }

    dotImageReady = true;
}

/* =========================
   CREATE FINAL PARTICLES
   ========================= */

function createFinalDotParticles() {

    const happy =
        createDotTextPoints(
            "HAPPY BIRTHDAY"
        );

    const neha =
        createDotTextPoints(
            "NEHA"
        );

    dotParticles = [];

    for (
        let i = 0;
        i < DOT_TOTAL;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            Math.max(
                dW,
                dH
            ) *
            dRandom(
                DOT_ENTRY_DISTANCE_MIN,
                DOT_ENTRY_DISTANCE_MAX
            );

        const depth =
            dRandom(
                .7,
                1.45
            );

        const sx =
            dW / 2 +
            Math.cos(angle) *
            distance *
            depth;

        const sy =
            dH / 2 +
            Math.sin(angle) *
            distance *
            depth;

        const tangent =
            angle +
            Math.PI / 2;

        const driftAmount =
            dRandom(
                -DOT_ENTRY_DRIFT,
                DOT_ENTRY_DRIFT
            );

        dotParticles.push({

            x: sx,
            y: sy,

            vx: 0,
            vy: 0,

            startX: sx,
            startY: sy,

            size:
                dRandom(
                    mobileDevice()
                        ? .85
                        : 1.05,

                    mobileDevice()
                        ? 1.35
                        : 1.75
                ),

            alpha: 0,

            driftX:
                Math.cos(tangent) *
                driftAmount,

            driftY:
                Math.sin(tangent) *
                driftAmount,

            entryDelay:
                Math.random() *
                DOT_ENTRY_DELAY,

            happyX:
                happy[i].x,

            happyY:
                happy[i].y,

            nehaX:
                neha[i].x,

            nehaY:
                neha[i].y,

            photoX:
                dotPortraitPoints[i]
                    ? dotPortraitPoints[i].x
                    : dW / 2,

            photoY:
                dotPortraitPoints[i]
                    ? dotPortraitPoints[i].y
                    : dH / 2,

            color:
                dotPortraitColors[i]
                    ||
                    {
                        r:255,
                        g:255,
                        b:255
                    }
        });
    }
}

/* =========================
   FINAL TARGET
   ========================= */

function getFinalDotTarget(
    p,
    time
) {

    const cycle =
        DOT_HAPPY_FORMATION +
        DOT_HAPPY_HOLD +
        DOT_NEHA_FORMATION +
        DOT_NEHA_HOLD +
        DOT_PHOTO_FORMATION +
        DOT_PHOTO_HOLD;

    let t =
        Math.min(
            time,
            cycle
        );

    /* HAPPY BIRTHDAY */

    if (
        t <
        DOT_HAPPY_FORMATION
    ) {

        const seconds =
            t / 1000;

        const local =
            dClamp(
                (
                    seconds -
                    p.entryDelay
                ) /
                (
                    DOT_HAPPY_FORMATION /
                    1000 -
                    p.entryDelay
                ),
                0,
                1
            );

        const progress =
            dCinematicEase(local);

        const driftProgress =
            Math.sin(
                progress *
                Math.PI
            );

        const cinematicX =
            p.startX +
            p.driftX *
            (
                1 -
                progress
            ) *
            driftProgress;

        const cinematicY =
            p.startY +
            p.driftY *
            (
                1 -
                progress
            ) *
            driftProgress;

        return {

            x: dLerp(
                cinematicX,
                p.happyX,
                progress
            ),

            y: dLerp(
                cinematicY,
                p.happyY,
                progress
            )
        };
    }

    t -=
        DOT_HAPPY_FORMATION;

    /* HAPPY HOLD */

    if (
        t <
        DOT_HAPPY_HOLD
    ) {

        return {
            x: p.happyX,
            y: p.happyY
        };
    }

    t -=
        DOT_HAPPY_HOLD;

    /* NEHA */

    if (
        t <
        DOT_NEHA_FORMATION
    ) {

        const progress =
            dEase(
                t /
                DOT_NEHA_FORMATION
            );

        return {

            x: dLerp(
                p.happyX,
                p.nehaX,
                progress
            ),

            y: dLerp(
                p.happyY,
                p.nehaY,
                progress
            )
        };
    }

    t -=
        DOT_NEHA_FORMATION;

    /* NEHA HOLD */

    if (
        t <
        DOT_NEHA_HOLD
    ) {

        return {
            x: p.nehaX,
            y: p.nehaY
        };
    }

    t -=
        DOT_NEHA_HOLD;

    /* PORTRAIT */

    if (
        t <
        DOT_PHOTO_FORMATION
    ) {

        const progress =
            dEase(
                t /
                DOT_PHOTO_FORMATION
            );

        return {

            x: dLerp(
                p.nehaX,
                p.photoX,
                progress
            ),

            y: dLerp(
                p.nehaY,
                p.photoY,
                progress
            )
        };
    }

    return {
        x: p.photoX,
        y: p.photoY
    };
}

/* =========================
   DRAW FINAL DOT
   ========================= */

function drawFinalDotParticle(p) {

    const c = p.color;

    /* Glow */

    dctx.save();

    dctx.globalAlpha =
        p.alpha *
        (
            mobileDevice()
                ? .10
                : .13
        );

    dctx.fillStyle =
        `rgb(${c.r},${c.g},${c.b})`;

    dctx.shadowBlur =
        mobileDevice()
            ? 3
            : 6;

    dctx.shadowColor =
        `rgb(${c.r},${c.g},${c.b})`;

    dctx.beginPath();

    dctx.arc(
        p.x,
        p.y,
        p.size * 1.6,
        0,
        Math.PI * 2
    );

    dctx.fill();

    dctx.restore();

    /* Core */

    dctx.save();

    dctx.globalAlpha =
        p.alpha;

    dctx.fillStyle =
        `rgb(${c.r},${c.g},${c.b})`;

    dctx.beginPath();

    dctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
    );

    dctx.fill();

    dctx.restore();
}

/* =========================
   FINAL ANIMATION
   ========================= */

function animateFinalDots(now) {

    if (!dotAnimationStarted) {
        return;
    }

    const dt =
        Math.min(
            .033,
            Math.max(
                .001,
                (
                    now -
                    dotLastTime
                ) / 1000
            )
        );

    dotLastTime = now;

    const elapsed =
        now -
        dotStartTime;

    dctx.clearRect(
        0,
        0,
        dW,
        dH
    );

    drawDotFloatingParticles(
        elapsed
    );

    drawRomanticRedParticles(
        elapsed
    );

    for (
        const p of dotParticles
    ) {

        const target =
            getFinalDotTarget(
                p,
                elapsed
            );

        const stiffness =
            mobileDevice()
                ? 25
                : 28;

        const damping =
            mobileDevice()
                ? 8.2
                : 8.5;

        const ax =
            (
                target.x -
                p.x
            ) *
            stiffness;

        const ay =
            (
                target.y -
                p.y
            ) *
            stiffness;

        p.vx +=
            ax * dt;

        p.vy +=
            ay * dt;

        const damp =
            Math.exp(
                -damping * dt
            );

        p.vx *= damp;
        p.vy *= damp;

        p.x +=
            p.vx * dt;

        p.y +=
            p.vy * dt;

        const distance =
            Math.hypot(
                target.x - p.x,
                target.y - p.y
            );

        p.alpha =
            dClamp(
                .72 +
                Math.min(
                    distance / 350,
                    .28
                ),
                .72,
                1
            );

        drawFinalDotParticle(p);
    }

    requestAnimationFrame(
        animateFinalDots
    );
}

/* =========================
   MUSIC
   ========================= */

function startBirthdayMusic() {

    try {

        if (
            window.parent &&
            window.parent !== window &&
            window.parent.BirthdayBook?.playBirthdayMusic
        ) {

            window.parent.BirthdayBook
                .playBirthdayMusic();
        }

    } catch (e) {}
}

/* =========================
   START FINAL SEQUENCE
   ========================= */

async function startFinalDotSequence() {

    if (dotAnimationStarted) {
        return;
    }

    dotFinalSection.style.display =
        "flex";

    dotFinalSection.style.opacity =
        "0";

    requestAnimationFrame(() => {

        dotFinalSection.style.transition =
            "opacity 1s ease";

        dotFinalSection.style.opacity =
            "1";
    });

    resizeFinalDots();

    if (!dotImageReady) {

        await createDotPortrait();
    }

    createFinalDotParticles();

    dotAnimationStarted = true;

    startBirthdayMusic();

    dotStartTime =
        performance.now();

    dotLastTime =
        dotStartTime;

    requestAnimationFrame(
        animateFinalDots
    );
}

/* =========================
   RESIZE
   ========================= */

window.addEventListener(
    "resize",
    () => {

        resizeFinalDots();
        resizeNameCanvas();

    }
);

resizeFinalDots();

/* =========================
   N RAIN
   ========================= */

setInterval(
    () => {

        if (
            !nameAnimationRunning ||
            nameSection.style.display === "none"
        ) {
            return;
        }

        const letter =
            document.createElement(
                "div"
            );

        letter.innerText = "n";

        letter.style.position =
            "fixed";

        letter.style.left =
            Math.random() * 100 + "vw";

        letter.style.top =
            "-50px";

        letter.style.fontWeight =
            "bold";

        letter.style.fontSize =
            mobileDevice()
                ? "14px"
                : "16px";

        letter.style.color =
            "#ff4da6";

        letter.style.pointerEvents =
            "none";

        letter.style.userSelect =
            "none";

        letter.style.zIndex =
            "9999";

        nameSection.appendChild(
            letter
        );

        letter.animate(
            [
                {
                    transform:
                        "translateY(0)",
                    opacity: 1
                },
                {
                    transform:
                        "translateY(110vh)",
                    opacity: 1
                }
            ],
            {
                duration:
                    2000 +
                    Math.random() * 1500,

                easing:
                    "linear"
            }
        );

        setTimeout(
            () => letter.remove(),
            3500
        );

    },
    mobileDevice()
        ? 130
        : 40
);