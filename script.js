// Load Config
const config = window.VALENTINE_CONFIG;

// DOM Elements
const elements = {
    title: document.getElementById('valentineTitle'),
    q1: {
        section: document.getElementById('question1'),
        text: document.getElementById('question1Text'),
        yes: document.getElementById('yesBtn1'),
        no: document.getElementById('noBtn1'),
        secret: document.getElementById('secretAnswerBtn')
    },
    q2: {
        section: document.getElementById('question2'),
        text: document.getElementById('question2Text'),
        meter: document.getElementById('loveMeter'),
        value: document.getElementById('loveValue'),
        textVal: document.getElementById('meterText'),
        msg: document.getElementById('loveMessage'),
        next: document.getElementById('nextBtn2')
    },
    q3: {
        section: document.getElementById('question3'),
        text: document.getElementById('question3Text'),
        yes: document.getElementById('yesBtn3'),
        no: document.getElementById('noBtn3')
    },
    celeb: {
        section: document.getElementById('celebration'),
        title: document.getElementById('celebrationTitle'),
        msg: document.getElementById('celebrationMessage'),
        emojis: document.getElementById('celebrationEmojis')
    },
    music: {
        btn: document.getElementById('musicToggle'),
        audio: document.getElementById('bgMusic'),
        source: document.getElementById('musicSource')
    }
};

// Initialize Content
function init() {
    // Set text content from config
    elements.title.innerText = `${config.valentineName}, my love...`;
    
    // Q1
    elements.q1.text.innerText = config.questions.first.text;
    elements.q1.yes.innerText = config.questions.first.yesBtn;
    elements.q1.no.innerText = config.questions.first.noBtn;
    elements.q1.secret.innerText = config.questions.first.secretAnswer;

    // Q2
    elements.q2.text.innerText = config.questions.second.text;
    elements.q2.textVal.innerText = config.questions.second.startText;
    elements.q2.next.innerText = config.questions.second.nextBtn;

    // Q3
    elements.q3.text.innerText = config.questions.third.text;
    elements.q3.yes.innerText = config.questions.third.yesBtn;
    elements.q3.no.innerText = config.questions.third.noBtn;

    // Celebration
    elements.celeb.title.innerText = config.celebration.title;
    elements.celeb.msg.innerText = config.celebration.message;
    elements.celeb.emojis.innerText = config.celebration.emojis;

    // Music
    if (config.music.enabled) {
        elements.music.source.src = config.music.musicUrl;
        elements.music.audio.load();
        elements.music.btn.innerText = config.music.startText;
    } else {
        document.getElementById('musicControls').style.display = 'none';
    }

    createFloatingElements();
    setupEvents();
}

// Event Listeners
function setupEvents() {
    // Music Toggle
    elements.music.btn.addEventListener('click', toggleMusic);

    // Love Meter
    elements.q2.meter.addEventListener('input', updateMeter);

    // The "Runaway" No Buttons
    // We use mouseover for desktop and touchstart for mobile
    elements.q1.no.addEventListener('mouseover', (e) => moveButton(e.target));
    elements.q1.no.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(e.target); });
    elements.q3.no.addEventListener('mouseover', (e) => moveButton(e.target));
    elements.q3.no.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(e.target); });

    // Share Button
    document.getElementById('shareBtn').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Mission Link Copied to Clipboard! 🚀");
        } catch (err) {
            console.error('Failed to copy', err);
        }
    });
}

// Logic: Navigation
window.nextQuestion = function(step) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
    
    // Show requested section
    if (step === 2) elements.q2.section.classList.remove('hidden');
    if (step === 3) elements.q3.section.classList.remove('hidden');

    // Attempt autoplay music on first interaction if not playing
    if (config.music.autoplay && elements.music.audio.paused) {
        toggleMusic();
    }
}

// Logic: Love Meter
function updateMeter() {
    const val = parseInt(elements.q2.meter.value);
    elements.q2.value.innerText = val + "%";
    
    if (val > 1000) {
        elements.q2.msg.innerText = config.loveMessages.high;
    } 
    if (val > 5000) {
        elements.q2.msg.innerText = config.loveMessages.extreme;
    } 
    if (val <= 1000 && val > 100) {
        elements.q2.msg.innerText = config.loveMessages.normal;
    }
}

// Logic: Runaway Button
function moveButton(btn) {
    // Get viewport dimensions
    const maxWidth = window.innerWidth - btn.offsetWidth;
    const maxHeight = window.innerHeight - btn.offsetHeight;

    // Generate random position
    const newX = Math.random() * maxWidth;
    const newY = Math.random() * maxHeight;

    // Apply new position
    btn.style.position = 'fixed';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    
    // Add a little spin effect
    btn.style.transform = `rotate(${Math.random() * 360}deg)`;
}

// Logic: Celebration
window.celebrate = function() {
    document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
    elements.celeb.section.classList.remove('hidden');
    
    // Trigger Explosion
    for(let i=0; i<50; i++) {
        createHeart(true);
    }
}

// Logic: Floating Elements
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const items = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];

    // Initial batch
    for(let i=0; i<15; i++) {
        createHeart(false, items, container);
    }

    // Continuous creation
    setInterval(() => createHeart(false, items, container), 2000);
}

function createHeart(isExplosion = false, items = null, container = null) {
    if (!container) container = document.querySelector('.floating-elements');
    if (!items) items = [...config.floatingEmojis.hearts];

    const el = document.createElement('div');
    el.innerHTML = items[Math.floor(Math.random() * items.length)];
    el.className = 'heart';
    
    const startLeft = Math.random() * 100;
    
    el.style.left = startLeft + 'vw';
    el.style.fontSize = (Math.random() * 2 + 1) + 'rem';
    
    if (isExplosion) {
        el.style.top = '50%';
        el.style.left = '50%';
        el.style.transition = 'all 1s ease-out';
        setTimeout(() => {
            el.style.transform = `translate(${Math.random()*400 - 200}px, ${Math.random()*400 - 200}px)`;
            el.style.opacity = 0;
        }, 50);
        setTimeout(() => el.remove(), 1000);
    } else {
        // Standard floating
        el.style.top = '100vh';
        el.style.animationDuration = (Math.random() * 10 + 10) + 's';
        setTimeout(() => el.remove(), 20000); // Clean up
    }
    
    container.appendChild(el);
}

// Logic: Music
function toggleMusic() {
    const audio = elements.music.audio;
    if (audio.paused) {
        audio.play().then(() => {
            elements.music.btn.innerText = config.music.stopText;
        }).catch(e => console.log("Audio play failed (browser policy):", e));
    } else {
        audio.pause();
        elements.music.btn.innerText = config.music.startText;
    }
}

// Boot
window.onload = init;
