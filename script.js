const PASSWORD = "05082005";

const keys = document.querySelectorAll(".key");
const inputs = document.querySelectorAll(".passcode input");

const lockScreen = document.getElementById("lockScreen");
const surprise = document.getElementById("surprise");
const song = document.getElementById("birthdaySong");

let entered = "";

function updateBoxes() {
    inputs.forEach((box, index) => {
        box.value = entered[index] ? "•" : "";
    });
}

function resetPassword() {
    entered = "";
    updateBoxes();
}

function unlock() {
    lockScreen.style.display = "none";
    surprise.classList.remove("hidden");

    if (song) {
        song.play().catch(() => {});
    }

    startConfetti();
}

keys.forEach((key) => {

    key.addEventListener("click", () => {

        const value = key.innerText;

        if (value === "⌫") {

            entered = entered.slice(0, -1);

            updateBoxes();

            return;
        }

        if (value === "✔") {

            checkPassword();

            return;
        }

        if (!isNaN(value) && entered.length < 8) {

            entered += value;

            updateBoxes();

            if (entered.length === 8) {

                checkPassword();

            }

        }

    });

});

function checkPassword() {

    if (entered === PASSWORD) {

        unlock();

    } else {

        alert("❌ Wrong Password");

        resetPassword();

    }

}
/* ===== Confetti ===== */

function startConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.width = "8px";
        confetti.style.height = "12px";
        confetti.style.borderRadius = "2px";

        const colors = [
            "#ff4d6d",
            "#ffd60a",
            "#06d6a0",
            "#4cc9f0",
            "#9b5de5",
            "#ffffff"
        ];

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.opacity = "0.9";
        confetti.style.transition = "all 4s linear";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.style.transform =
                `translateY(${window.innerHeight + 100}px)
                 rotate(${Math.random()*720}deg)`;

            confetti.style.left =
                Math.random() * 100 + "vw";

        }, 50);

        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}

/* ===== Cake Animation ===== */

const cake = document.querySelector(".cake");

if(cake){

cake.animate([
{transform:"scale(0)"},
{transform:"scale(1.15)"},
{transform:"scale(1)"}
],{
duration:1200,
iterations:1
});

}
/* ===== Floating Hearts ===== */

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";
    heart.style.left=Math.random()*100+"vw";
    heart.style.bottom="-40px";
    heart.style.fontSize=(20+Math.random()*25)+"px";
    heart.style.pointerEvents="none";
    heart.style.zIndex="9999";

    document.body.appendChild(heart);

    heart.animate([
        {transform:"translateY(0)",opacity:1},
        {transform:"translateY(-110vh)",opacity:0}
    ],{
        duration:5000,
        easing:"linear"
    });

    setTimeout(()=>{
        heart.remove();
    },5000);

}

setInterval(createHeart,700);

/* ===== Fade Surprise ===== */

if(surprise){

    surprise.style.opacity="0";

    setTimeout(()=>{

        surprise.style.transition="1.5s";
        surprise.style.opacity="1";

    },300);

}

/* ===== Birthday Message ===== */

setTimeout(()=>{

    alert("🎉 Happy Birthday! 🎂❤️\nHave a wonderful day!");

},2000);