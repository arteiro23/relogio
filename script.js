const hourHand = document.getElementById("hour");
const minuteHand = document.getElementById("minute");
const secondHand = document.getElementById("second");
const soundButton = document.getElementById("toggle-sound");
const clockSound = document.getElementById("clock-sound");
const alarmSound = document.getElementById("alarm-sound");
const clock = document.querySelector('.clock');

let soundEnabled = true;
let lastMinute = null;

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F7D358', '#8E44AD'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

    if (soundEnabled) {
        clockSound.play();
    }

    // Mudar a cor de fundo do relógio a cada minuto
    if (minutes !== lastMinute) {
        lastMinute = minutes;
        const newColor = getRandomColor();
        clock.style.backgroundColor = newColor;  // Altera a cor de fundo do relógio
    }

    // Tocar alarme quando faltar 15 minutos para fechar a hora (45 minutos)
    if (minutes === 45) {
        alarmSound.play();
    }
}

soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundButton.textContent = soundEnabled ? "Desligar Som" : "Ligar Som";
});

setInterval(updateClock, 1000);

updateClock();  // Chama a função imediatamente para iniciar o relógio
