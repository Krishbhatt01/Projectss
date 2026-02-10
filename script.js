const config = window.VALENTINE_CONFIG;
const mainCard = document.getElementById('mainCard');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');

let quizStep = 0;

// Initialize
function init() {
    // 1. Safety Check: Ensure the mainCard exists (If this fails, index.html wasn't updated)
    if (!mainCard) {
        alert("Error: 'mainCard' not found. Please make sure you updated index.html!");
        return;
    }

    // 2. Set Music
    if (config.music && config.music.musicUrl) {
        document.getElementById('musicSource').src = config.music.musicUrl;
        bgMusic.volume = config.music.volume || 0.5;
    }

    // 3. Start floating emojis
    createFloatingEmojis();

    // 4. Show Intro
    showIntro();
}

// 1. Intro Screen
function showIntro() {
    mainCard.innerHTML = `
        <h1>${config.questions.intro.title}</h1>
        <p>${config.questions.intro.text}</p>
        <button class="btn" id="startBtn">${config.questions.intro.btn}</button>
    `;
    document.getElementById('startBtn').addEventListener('click', startQuiz);
}

// 2. Quiz Logic
function startQuiz() {
    if (quizStep < config.questions.quiz.length) {
        const q = config.questions.quiz[quizStep];
        
        // We create buttons dynamically to prevent quote issues
        mainCard.innerHTML = `
            <h2 class="fade-in">${q.q}</h2>
            <div class="btn-group fade-in" id="quizBtns"></div>
        `;
        
        const btnContainer = document.getElementById('quizBtns');
        
        // Button 1
        const btn1 = document.createElement('button');
        btn1.className = 'btn';
        btn1.innerText = q.btn1;
        btn1.onclick = () => handleQuizResponse(q.response);
        btnContainer.appendChild(btn1);

        // Button 2
        const btn2 = document.createElement('button');
        btn2.className = 'btn';
        btn2.innerText = q.btn2;
        btn2.onclick = () => handleQuizResponse(q.response);
        btnContainer.appendChild(btn2);

    } else {
        showTruth();
    }
}

function handleQuizResponse(response) {
    mainCard.innerHTML = `<h2 class="fade-in">${response}</h2>`;
    setTimeout(() => {
        quizStep++;
        startQuiz();
    }, 2500); // Increased wait time slightly so she can read it
}

// 3. Truth Section (F1/Driving)
function showTruth() {
    mainCard.innerHTML = `
        <h1 class="fade-in">${config.questions.truth.title}</h1>
        <p class="fade-in">${config.questions.truth.text}</p>
        <p class="fade-in" style="font-size: 0.9rem; font-style: italic;">${config.questions.truth.subtext}</p>
        <button class="btn" id="truthBtn">${config.questions.truth.btn}</button>
    `;
    document.getElementById('truthBtn').addEventListener('click', showGirlfriendProposal);
}

// 4. Girlfriend Proposal (With Dodging Button)
function showGirlfriendProposal() {
    mainCard.innerHTML = `
        <h1 class="fade-in">${config.questions.girlfriend.title}</h1>
        <p class="fade-in">${config.questions.girlfriend.text}</p>
        <h2 class="fade-in">${config.questions.girlfriend.question}</h2>
        <div class="btn-group">
            <button class="btn" id="gfYesBtn">${config.questions.girlfriend.yesBtn}</button>
            <button class="btn" id="noBtn">${config.questions.girlfriend.noBtn}</button>
        </div>
    `;

    document.getElementById('gfYesBtn').addEventListener('click', showValentineProposal);
    
    // Attach Dodge Logic
    setTimeout(() => {
        const noBtn = document.getElementById('noBtn');
        if(noBtn) {
            noBtn.addEventListener('mouseover', (e) => dodgeButton(e.target));
            noBtn.addEventListener('touchstart', (e) => {
                e.preventDefault(); 
                dodgeButton(e.target);
            });
        }
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
            <button class="btn" id="valYesBtn">${config.questions.valentine.yesBtn}</button>
            <button class="btn" id="finalNo">${config.questions.valentine.noBtn}</button>
        </div>
    `;
    
    document.getElementById('valYesBtn').addEventListener('click', showCelebration);
    
    const finalNo = document.getElementById('finalNo');
    finalNo.addEventListener('mouseover', (e) => dodgeButton(e.target));
    finalNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeButton(e.target); });
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
    if (!container) return; // Safety check

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
if(musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerText = config.music.stopText;
        } else {
            bgMusic.pause();
            musicBtn.innerText = config.music.startText;
        }
    });
}

// Start
init();
