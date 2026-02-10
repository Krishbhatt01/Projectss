const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Stuti",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Mission: Valentine 2026 🚀",

    // Floating emojis that appear in the background
    // I added rockets and sparkles to match your aerospace interest!
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓', '🚀', '✨', '☁️'],  
        bears: ['🧸', '🐻']                       
    },

    // Questions and answers
    questions: {
        first: {
            text: "Stuti, do you like me?",                                    
            yesBtn: "Yes",                                             
            noBtn: "No",                                               
            secretAnswer: "Access Denied: You already love me! ❤️"           
        },
        second: {
            text: "How much do you love me?",                          
            startText: "This much!",                                   
            nextBtn: "Initiate Launch ❤️"                                         
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹", 
            yesBtn: "Mission Accepted!",                                             
            noBtn: "Abort Mission"                                                 
        }
    },

    // Love meter messages
    // These now use "Thrust/Velocity" metaphors mixed with romance
    loveMessages: {
        extreme: "MAXIMUM VELOCITY! You love me that much?? 🚀💝",  
        high: "We have reached orbit! 🌎💖",              
        normal: "Engines are go! 🥰"                           
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Mission Accomplished! 🎉💝",
        message: "I am the luckiest person in the galaxy! Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗🚀💋❤️💕"  
    },

    // Color scheme for the website
    // I updated this to a "Sunset Stratosphere" gradient - very photogenic
    colors: {
        backgroundStart: "#ff758c",      // Deeper pink/red
        backgroundEnd: "#ff7eb3",        // Lighter magenta
        buttonBackground: "#ff4757",     // Vibrant Red/Pink
        buttonHover: "#ff6b81",          // Lighter hover
        textColor: "#ffffff"             // White text looks cleaner on glass
    },

    // Animation settings
    animations: {
        floatDuration: "15s",           
        floatDistance: "50px",          
        bounceSpeed: "0.5s",            
        heartExplosionSize: 1.5         
    },

    // Background Music
    music: {
        enabled: true,                     
        autoplay: true,                    
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", 
        startText: "🎵 Play Music",        
        stopText: "🔇 Stop Music",         
        volume: 0.5                        
    }
};

// Export for use in other scripts
window.DEFAULT_CONFIG = CONFIG;
window.VALENTINE_CONFIG = { ...CONFIG };
