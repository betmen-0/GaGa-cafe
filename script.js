function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("music-icon");
    const badge = document.getElementById("music-icon-badge");

    if (!audio || !icon || !badge) return;

    audio.volume = 0.25;
    icon.style.opacity = "0";

    setTimeout(() => {
        if (audio.paused) {
            audio.play().then(() => {
                icon.src = "assets/imgs/music-on-icon.svg";
                icon.alt = "Music On";
                badge.textContent = "Music On";
            }).catch((error) => {
                console.warn("Background music could not start:", error);
                icon.src = "assets/imgs/music-off-icon.svg";
                icon.alt = "Music Off";
                badge.textContent = "Music Off";
            });
        } else {
            audio.pause();
            icon.src = "assets/imgs/music-off-icon.svg";
            icon.alt = "Music Off";
            badge.textContent = "Music Off";
        }

        icon.style.opacity = "1";
    }, 200);
}

let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;

    ["hoverSound", "clickSound", "meowSound"].forEach(id => {
        const sound = document.getElementById(id);
        if (!sound) return;

        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
        }).catch(() => {});
    });

    audioUnlocked = true;

    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("mouseover", unlockAudio);
    document.addEventListener("mouseover", unlockAudio);
}

function playHoverSound() {
    if (!audioUnlocked) return;
    const sound = document.getElementById("hoverSound");
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

document.querySelectorAll(".hover-sound").forEach(el => {
    el.addEventListener("mouseenter", playHoverSound);
});

function playClickSound() {
    const sound = document.getElementById("clickSound");
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

document.querySelectorAll(".click-sound").forEach(el => {
    el.addEventListener("click", playClickSound);
});

function playMeowSound() {
    const sound = document.getElementById("meowSound");
    if (!sound) return;
    sound.currentTime = 0;
    sound.volume = 0.75;
    sound.play().catch(() => {});
}

document.querySelectorAll(".meow-sound").forEach(el => {
    el.addEventListener("click", playMeowSound);
});


const phrases = ["Welcome to", "Sip, stay and be loved", "coffee, cats and good vibes"];
const typingText = document.getElementById("typing-text");
const cursor = document.getElementById("cursor");

let phrasesIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phrasesIndex];

    if (!isDeleting) {

        typingText.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            setTimeout(() => { isDeleting = true; type(); }, 1800);
            return;
        }
    } else {
        typingText.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phrasesIndex = (phrasesIndex + 1) % phrases.length;

            setTimeout(type, isDeleting ? 60 : 100);
            return;
        }

        type();
    }
}

function filterBtns() {
    const filterBtn = document.querySelectorAll(".filter-btn");
    const menuItem = document.querySelectorAll(".item-card");

    menuItem.forEach(item => {
        const match = item.dataset.category === "hot-drinks";
        item.style.display = match ? "grid" : "none";
    });

    filterBtn.forEach(btn => {
        btn.addEventListener("click", () => {

            filterBtn.forEach(b => b.classList.remove("filter-btn-active"));
            btn.classList.add("filter-btn-active");

            const filter = btn.id.replace("-btn", "");

            menuItem.forEach(item => {
                const match = item.dataset.category === filter;
                item.style.display = match ? "grid" : "none";
            });
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(sec => {
        sec.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
    window.scrollTo({ top: 0, behavior: "instant"});
}

document.addEventListener("DOMContentLoaded", function() {
    filterBtns();

    document.getElementById("confirmation-order").style.display = "none";

    document.getElementById("form").addEventListener("submit" , function(e) {
        e.preventDefault();

        showSection("confirmation-order");
    });
});