const CONFIG = {
    valentineName: "Stuti",
    pageTitle: "For the Cutest D1 Athlete 🏸",

    // THEME: I changed this to her favorite color (Orange) mixed with romantic pink
    colors: {
        backgroundStart: "#ff9966",      // Stuti's Favorite Orange
        backgroundEnd: "#ff5e62",        // Warm Sunset Red
        buttonBackground: "#ff9966",     // Orange Button
        buttonHover: "#e87e4d",          // Darker Orange
        textColor: "#ffffff"
    },

    // Floating emojis - Added Teddy Bears, Roses, Badminton, and Coding
    floatingEmojis: {
        hearts: ['❤️', '💖', '🧸', '🌹', '🏸', '💻', '🏎️'],  
        bears: ['🧸', '🐻']                       
    },

    // The Sequence of interactions
    questions: {
        intro: {
            title: "Warning: Extremely pretty woman with big brain deteched! ",
            text: "System identifying user... Are you the D1 Badminton star with the cutest dimples and the most adorable smile?", 
            btn: "Confirm Identity 🏸"
        },
        
        // The "Vibe Check" Quiz Section
        quiz: [
            {
                q: "What's the perfect date after a long day of coding?",
                btn1: "Spicy Chaat and Asian at Din Tai Fung",
                btn2: "Belgian Waffles & Tres Leches 🍰",
                response: "Correct! We're getting both. Sweet and Spicy, just like you."
            },
            {
                q: "What is the best soundtrack for debugging code?",
                btn1: "Lo-Fi Hip Hop",
                btn2: "Depressing Arijit Singh Songs 🎵",
                response: "I knew it! Time to cry and code. 😭"
            },
            {
                q: "Security Question: What makes you laugh the most?",
                btn1: "My extremely funny jokes",
                btn2: "Modi Ji Memes",
                response: "Mitron! You have passed the security check."
            }
        ],

        // The "Truth" Section (F1 & Driving)
        truth: {
            title: "A Serious Accusation...",
            text: "I know deep down you love F1, even if you deny it.",
            subtext: "Will you accompany me to watch Ferrari lose all their races this year? (Also, I'm a better driver than you. Deal with it.)",
            btn: "Fine, I admit it 🏁"
        },

        // The Big Question (Girlfriend)
        girlfriend: {
            title: "So...",
            text: "Since I'm obviously the better driver and your favorite chaos coordinator...",
            question: "Will you be my Girlfriend?",
            yesBtn: "Yes! ❤️",
            noBtn: "No 🚩" // This button will run away
        },

        // The Valentine Question
        valentine: {
            title: "One last thing...",
            text: "Will you be my Valentine on February 14th, 2026? 🌹",
            yesBtn: "Yes, obviously! 💖",
            noBtn: "No"
        }
    },

    // Celebration message
    celebration: {
        title: "I knew you'd say Yes! 🎉",
        message: "Get ready for Chaat, Waffles, and me annoying you about F1 forever. I love you, Stuti! ❤️ and lewis hamilton obviously Thank you for making college colorful and worthwhile",
        emojis: "🏸🧸🏎️🌹🎁💑" 
    },

    // Music - Replace this URL with an Arijit Singh song link if you have one!
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Our Song",
        stopText: "🔇 Pause",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
