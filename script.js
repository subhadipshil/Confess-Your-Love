let attempts = 0;
const messages = [
    "Are you sure? 🥺",
    "Really sure? 😢",
    "Please suuun lo! 🥹",
    "Don't be like that! 😭",
    "You're breaking my heart! 💔"
];

let musicPlaying = false;
let volumeTimeout;

function addDoodles() {
    const doodles = ['❤️', '✨', '💕', '💝', '💖'];
    for(let i = 0; i < 20; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'doodle';
        doodle.innerHTML = doodles[Math.floor(Math.random() * doodles.length)];
        doodle.style.left = Math.random() * 100 + 'vw';
        doodle.style.top = Math.random() * 100 + 'vh';
        doodle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.body.appendChild(doodle);
    }
}

function moveButton(button) {
    const container = document.querySelector('.container');
    const maxX = container.clientWidth - button.clientWidth;
    const maxY = container.clientHeight - button.clientHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    if (attempts < messages.length) {
        const noMessages = document.getElementById('no-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'no-message-text';
        messageEl.textContent = messages[attempts];
        noMessages.appendChild(messageEl);
        attempts++;
    }
}

function handleMusic(play) {
    const music = document.getElementById('bgMusic');
    const musicPrompt = document.getElementById('music-prompt');
    const musicControl = document.getElementById('music-control');
    
    musicPrompt.style.display = 'none';
    
    if (play) {
        musicControl.style.display = 'block';
        music.volume = 0.5; // Set initial volume to 50%
        music.currentTime = 19; // Start from 0:19
        music.play();
        musicPlaying = true;
        document.querySelector('.music-toggle').classList.add('playing');
    }
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.querySelector('.music-toggle');
    const volumeControl = document.querySelector('.volume-control');
    
    if (musicPlaying) {
        music.pause();
        musicBtn.classList.remove('playing');
        volumeControl.style.display = 'none';
    } else {
        music.play();
        musicBtn.classList.add('playing');
        volumeControl.style.display = 'block';
        
        // Hide volume slider after 3 seconds
        clearTimeout(volumeTimeout);
        volumeTimeout = setTimeout(() => {
            volumeControl.style.display = 'none';
        }, 3000);
    }
    
    musicPlaying = !musicPlaying;
}

function showMessage() {
    // Clear all no messages
    document.getElementById('no-messages').innerHTML = '';
    
    // Hide the buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.style.display = 'none';
    });
    
    document.getElementById('message').style.display = 'block';
    document.getElementById('gif-container').style.display = 'block';
    
    // If music is playing, increase volume gradually
    if (musicPlaying) {
        const music = document.getElementById('bgMusic');
        let vol = music.volume;
        const interval = setInterval(() => {
            if (vol < 1) {
                vol += 0.1;
                music.volume = vol;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
    
    // Create floating hearts
    createHearts();
}

function createHearts() {
    const heartCount = 20;
    const containerWidth = document.body.clientWidth;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'hearts';
            heart.innerHTML = '❤️';
            
            // Random position from bottom
            heart.style.left = Math.random() * containerWidth + 'px';
            document.body.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 150); // Stagger heart creation
    }
}

// Initialize doodles when page loads
window.addEventListener('load', addDoodles);

// Add volume control functionality
document.getElementById('volumeSlider').addEventListener('input', function() {
    const music = document.getElementById('bgMusic');
    music.volume = this.value / 100;
    
    // Keep volume slider visible while adjusting
    clearTimeout(volumeTimeout);
    const volumeControl = document.querySelector('.volume-control');
    volumeControl.style.display = 'block';
    
    // Hide volume slider after 3 seconds of no adjustment
    volumeTimeout = setTimeout(() => {
        volumeControl.style.display = 'none';
    }, 3000);
});

// Show volume slider when hovering over music control
document.querySelector('.music-control').addEventListener('mouseenter', function() {
    if (musicPlaying) {
        const volumeControl = document.querySelector('.volume-control');
        volumeControl.style.display = 'block';
        clearTimeout(volumeTimeout);
    }
});

// Hide volume slider when mouse leaves music control
document.querySelector('.music-control').addEventListener('mouseleave', function() {
    clearTimeout(volumeTimeout);
    volumeTimeout = setTimeout(() => {
        document.querySelector('.volume-control').style.display = 'none';
    }, 3000);
}); 
