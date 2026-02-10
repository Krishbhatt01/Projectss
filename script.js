const config = window.VALENTINE_CONFIG;
const mainCard = document.getElementById('mainCard');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

let quizStep = 0;

// Initialize
function init() {
    // Set Music
    document.getElementById('musicSource').src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;

    // Start floating emojis
    createFloatingEmojis();

    // Show Intro
    showIntro();
}

// 1. Intro Screen
function showIntro() {
    mainCard.innerHTML = `
        <h1>${config.questions.intro.title}</h1>
        <p>${config.questions.intro.text}</p>
        <button class="btn" onclick="startQuiz()">${config.questions.intro.btn}</button>
    `;
}

// 2. Quiz Logic
function startQuiz() {
    if (quizStep < config.questions.quiz.length) {
        const q = config.questions.quiz[quizStep];
        mainCard.innerHTML = `
            <h2 class="fade-in">${q.q}</h2>
            <div class="btn-group fade-in">
                <button class="btn" onclick="handleQuizResponse('${q.response}')">${q.btn1}</button>
                <button class="btn" onclick="handleQuizResponse('${q.response}')">${q.btn2}</button>
            </div>
        `;
    } else {
        showTruth();
    }
}

function handleQuizResponse(response) {
    mainCard.innerHTML = `<h2 class="fade-in">${response}</h2>`;
    setTimeout(() => {
        quizStep++;
        startQuiz();
    }, 2000);
}

// 3. Truth Section (F1/Driving)
function showTruth() {
    mainCard.innerHTML = `
        <h1 class="fade-in">${config.questions.truth.title}</h1>
        <p class="fade-in">${config.questions.truth.text}</p>
        <p class="fade-in" style="font-size: 0.9rem; font-style: italic;">${config.questions.truth.subtext}</p>
        <button class="btn" onclick="showGirlfriendProposal()">${config.questions.truth.btn}</button>
    `;
}

// 4. Girlfriend Proposal (With Dodging Button)
function showGirlfriendProposal() {
    mainCard.innerHTML = `
        <h1 class="fade-in">${config.questions.girlfriend.title}</h1>
        <p class="fade-in">${config.questions.girlfriend.text}</p>
        <h2 class="fade-in">${config.questions.girlfriend.question}</h2>
        <div class="btn-group">
            <button class="btn" onclick="showValentineProposal()">${config.questions.girlfriend.yesBtn}</button>
            <button class="btn" id="noBtn">${config.questions.girlfriend.noBtn}</button>
        </div>
    `;

    // Attach Dodge Logic
    setTimeout(() => {
        const noBtn = document.getElementById('noBtn');
        
        // Desktop: Mouseover
        noBtn.addEventListener('mouseover', (e) => dodgeButton(e.target));
        
        // Mobile: Touch (prevent clicking)
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            dodgeButton(e.target);
        });
    }, 100);
}

// Smart Dodge Logic
function dodgeButton(btn) {
    const cardRect = mainCard.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // Calculate available space within the card
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;

    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    // Apply absolute positioning relative to the card
    btn.style.position = 'absolute';
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
}

// 5. Valentine Proposal
function showValentineProposal() {
    mainCard.innerHTML = `
        <h1 class="fade-in">Wait! One more thing...</h1>
        <h2 class="fade-in">${config.questions.valentine.text}</h2>
        <div class="btn-group">
            <button class="btn" onclick="showCelebration()">${config.questions.valentine.yesBtn}</button>
            <button class="btn" id="finalNo" onclick="dodgeButton(this)">${config.questions.valentine.noBtn}</button>
        </div>
    `;
    
    // Attach dodge to the final no button too
    document.getElementById('finalNo').addEventListener('mouseover', (e) => dodgeButton(e.target));
}

// 6. Celebration
function showCelebration() {
    mainCard.innerHTML = `
        <h1 class="fade-in">${config.celebration.title}</h1>
        <p class="fade-in">${config.celebration.message}</p>
        <div style="font-size: 3rem; margin-top: 20px;">${config.celebration.emojis}</div>
    `;
    startConfetti();
}

// Floating Emojis
function createFloatingEmojis() {
    const container = document.getElementById('floatingContainer');
    const emojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    
    setInterval(() => {
        const el = document.createElement('div');
        el.className = 'emoji';
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 5 + 5) + 's';
        container.appendChild(el);
        
        setTimeout(() => el.remove(), 10000);
    }, 1000);
}

// Confetti Effect
function startConfetti() {
    const container = document.getElementById('floatingContainer');
    for(let i=0; i<50; i++) {
        const el = document.createElement('div');
        el.className = 'emoji';
        el.innerText = '❤️';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.fontSize = Math.random() * 2 + 1 + 'rem';
        el.style.transition = 'all 1s ease-out';
        
        container.appendChild(el);
        
        setTimeout(() => {
            el.style.transform = `translate(${Math.random()*500 - 250}px, ${Math.random()*500 - 250}px)`;
            el.style.opacity = 0;
        }, 50);
    }
}

// Music Toggle
musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = config.music.stopText;
    } else {
        bgMusic.pause();
        musicBtn.innerText = config.music.startText;
    }
});

// Start
init();
