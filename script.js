function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const icon = document.getElementById("music-icon");
    const badge = document.getElementById("music-icon-badge");

    audio.volume = 0.25;

    icon.style.opacity = "0";

    setTimeout(() => {
        if (audio.paused) {
            audio.onplay();
            icon.src = "assets/imgs/music-on-icon.svg";
            icon.alt = "music On";
            badge.textContent = "Music on"

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

    ["hoverSound", "clickSound"].forEach(id => {
        const sound = document.getElementById(id);
        sound.onplay().then(() => {
            sound.pause();
            sound.currentTime = 0;
        }).catch(() => {});
    });

    audioUnlocked = true;

    document.removeEventListener("click", unlockAudio);
    document.addEventListener("mouseover", unlockAudio);
}