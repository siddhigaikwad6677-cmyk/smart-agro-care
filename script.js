function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";

        nav.style.position = "absolute";

        nav.style.top = "70px";

        nav.style.left = "0";

        nav.style.width = "100%";

        nav.style.padding = "25px";

        nav.style.background = "white";

        nav.style.boxShadow =
            "0 15px 30px rgba(0,0,0,0.1)";
    }
}


/* Scroll animation */

const cards =
    document.querySelectorAll(".service-card");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(30px)";

    card.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(card);

});


console.log("🌱 Smart Agro Care loaded successfully!");

function sendMessage(voiceText = null) {

    const message =
        voiceText ||
        document.getElementById("userInput").value.trim();

    if (message === "") return;

    // Show user's question
    addUserMessage(message);

    document.getElementById("userInput").value = "";

    // Detect language
    let language = detectLanguage(message);

    // Use selected language
    const selectedLanguage =
        document.getElementById("language").value;

    if (selectedLanguage !== "auto") {
        language = selectedLanguage;
    }

    // Get answer
    const answer =
        getFarmingResponse(message, language);

    // Show answer after small delay
    setTimeout(function () {

        addBotMessage(answer);

        // 🔊 MAKE CHATBOT TALK
        speakResponse(answer, language);

    }, 700);
}
async function sendMessage() {
function sendMessage(voiceText = null) {

    let message = voiceText ||
                  document.getElementById("userInput").value.trim();

    if (message === "") return;

    // Show user's message
    addUserMessage(message);

    document.getElementById("userInput").value = "";

    // Detect language
    let language = detectLanguage(message);

    // If user selected a language manually
    const selectedLanguage =
        document.getElementById("language").value;

    if (selectedLanguage !== "auto") {
        language = selectedLanguage;
    }

    // Get chatbot answer
    const response = getFarmingResponse(message, language);

    // Show and SPEAK answer
    function speakResponse(text, language) {

    // Check speech support
    if (!("speechSynthesis" in window)) {

        console.log("Text-to-speech is not supported.");

        return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    // Set chatbot language
    speech.lang = language;

    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    // Try to select correct voice
    const voices =
        window.speechSynthesis.getVoices();

    let selectedVoice = voices.find(
        voice => voice.lang === language
    );

    if (!selectedVoice) {

        selectedVoice = voices.find(
            voice => voice.lang.startsWith(
                language.split("-")[0]
            )
        );
    }

    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    // Speak
    window.speechSynthesis.speak(speech);

    document.getElementById("voiceStatus").innerHTML =
        "🔊 Smart Agro AI is speaking...";
    
    speech.onend = function() {

        document.getElementById("voiceStatus").innerHTML =
            "🎤 You can speak again";
    };
}
    setTimeout(function() {

        addBotMessage(response);

        // 🔊 Chatbot talks
        speakResponse(response, language);

    }, 500);
}
    const input =
        document.getElementById("chatInput");

    const message =
        input.value.trim();


    if (!message) return;


    addUserMessage(message);

    input.value = "";


    const language =
        detectLanguage(message);


    addBotMessage("🤔 Thinking...");


    try {

        const response =
            await fetch(
                "http://localhost:3000/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message: message,

                        language: language

                    })

                }
            );


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                "AI response failed"
            );

        }


        /*
        Remove "Thinking..."
        */

        const messages =
            document.getElementById(
                "chatMessages"
            );


        const lastMessage =
            messages.lastElementChild;


        if (lastMessage) {

            lastMessage.remove();

        }


        /*
        Add AI answer
        */

        addBotMessage(
            data.answer
        );


        /*
        Speak answer in
        user's language
        */

        speakAnswer(
            data.answer,
            language
        );


    }

    catch (error) {

        console.error(error);


        const messages =
            document.getElementById(
                "chatMessages"
            );


        const lastMessage =
            messages.lastElementChild;


        if (lastMessage) {

            lastMessage.remove();

        }


        addBotMessage(`

            ❌ Sorry, I couldn't connect
            to the AI server.

            <br><br>

            Please make sure your
            backend server is running.

        `);

    }

}
function speakAnswer(answer, language) {
    ...
}
function speakAnswer(answer, language) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Voice response is not supported in this browser."
        );

        return;
    }

    // Stop previous speech
    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(answer);

    speech.lang = language;

    speech.rate = 0.85;
    speech.pitch = 1;
    speech.volume = 1;


    // Get available voices
    const voices =
        speechSynthesis.getVoices();


    // Find matching language voice
    let voice =
        voices.find(v =>
            v.lang.toLowerCase() ===
            language.toLowerCase()
        );


    // If exact voice isn't available,
    // find same language
    if (!voice) {

        const shortLanguage =
            language
                .split("-")[0]
                .toLowerCase();

        voice =
            voices.find(v =>
                v.lang
                    .toLowerCase()
                    .startsWith(shortLanguage)
            );

    }


    if (voice) {

        speech.voice = voice;

        console.log(
            "Using voice:",
            voice.name,
            voice.lang
        );

    }
    else {

        console.log(
            "No matching voice found."
        );

        // fallback
        speech.lang = "en-IN";

    }


    speech.onstart = function() {

        console.log(
            "🔊 Voice started"
        );

    };


    speech.onend = function() {

        console.log(
            "🔊 Voice finished"
        );

    };


    speech.onerror = function(event) {

        console.log(
            "Voice error:",
            event.error
        );

    };


    speechSynthesis.speak(speech);
}
let availableVoices = [];

function loadVoices() {

    availableVoices =
        speechSynthesis.getVoices();

    console.log(
        "Available voices:",
        availableVoices
    );
}


speechSynthesis.onvoiceschanged =
    loadVoices;

loadVoices();
function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice input is not supported. Please use Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    // Language
    recognition.lang = document.getElementById("language").value;

    // If Auto Detect is selected
    if (recognition.lang === "auto") {
        recognition.lang = "mr-IN";
    }

    recognition.start();

    document.getElementById("voiceStatus").innerHTML =
        "🎤 Listening... Speak now";

    document.getElementById("micButton").classList.add("listening");

    recognition.onresult = function(event) {

        const text = event.results[0][0].transcript;

        document.getElementById("userInput").value = text;

        document.getElementById("voiceStatus").innerHTML =
            "✅ Voice received";

        document.getElementById("micButton").classList.remove("listening");

        // Automatically send the question
        sendMessage(text);
    };

    recognition.onerror = function(event) {

        console.log("Voice error:", event.error);

        document.getElementById("voiceStatus").innerHTML =
            "❌ Could not understand. Please try again.";

        document.getElementById("micButton").classList.remove("listening");
    };

    recognition.onend = function() {

        document.getElementById("micButton").classList.remove("listening");
    };
}
<script>
let recognition;
let isListening = false;

function startVoiceInput() {

    // Check browser support
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert(
            "Voice input is not supported in this browser.\n\n" +
            "Please open the website in Google Chrome."
        );
        return;
    }

    // Stop if already listening
    if (isListening && recognition) {
        recognition.stop();
        return;
    }

    try {

        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        // Select language
        const languageElement = document.getElementById("language");

        let selectedLanguage = "en-IN";

        if (languageElement) {
            selectedLanguage = languageElement.value;

            // Auto Detect
            if (selectedLanguage === "auto") {
                selectedLanguage = "en-IN";
            }
        }

        recognition.lang = selectedLanguage;

        // Start microphone
        recognition.start();

        isListening = true;

        document.getElementById("voiceBtn").innerHTML =
            "🔴 Listening...";

        document.getElementById("voiceStatus").innerHTML =
            "🎤 Listening... Speak now.";

        document.getElementById("voiceBtn").classList.add("listening");

    } catch (error) {

        console.error("Voice start error:", error);

        isListening = false;

        document.getElementById("voiceStatus").innerHTML =
            "❌ Voice input could not be started.";

        document.getElementById("voiceBtn").classList.remove("listening");
    }


    // When speech is recognized
    recognition.onresult = function(event) {

        const spokenText =
            event.results[0][0].transcript;

        console.log("User said:", spokenText);

        document.getElementById("userInput").value =
            spokenText;

        document.getElementById("voiceStatus").innerHTML =
            "✅ Voice received";

        // Automatically send message
        sendMessage(spokenText);
    };


    // Error handling
    recognition.onerror = function(event) {

        console.error("Speech recognition error:",
            event.error);

        isListening = false;

        document.getElementById("voiceBtn").innerHTML =
            "🎤 Voice Input";

        document.getElementById("voiceBtn")
            .classList.remove("listening");

        if (event.error === "not-allowed") {

            document.getElementById("voiceStatus").innerHTML =
                "🎤 Microphone permission denied. Please allow microphone access.";

        } else if (event.error === "no-speech") {

            document.getElementById("voiceStatus").innerHTML =
                "🔇 No speech detected. Please try again.";

        } else if (event.error === "audio-capture") {

            document.getElementById("voiceStatus").innerHTML =
                "🎤 No microphone detected.";

        } else {

            document.getElementById("voiceStatus").innerHTML =
                "❌ Voice input error. Please try again.";
        }
    };


    // Recognition finished
    recognition.onend = function() {

        isListening = false;

        document.getElementById("voiceBtn").innerHTML =
            "🎤 Voice Input";

        document.getElementById("voiceBtn")
            .classList.remove("listening");
    };
}
</script>
let recognition;
let isListening = false;

function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported.\n" +
            "Please use Google Chrome."
        );

        return;
    }

    if (isListening) {
        recognition.stop();
        return;
    }

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    let language =
        document.getElementById("language").value;

    // Auto detection fallback
    if (language === "auto") {
        language = "en-IN";
    }

    recognition.lang = language;

    try {

        recognition.start();

        isListening = true;

        document.getElementById("micButton").innerHTML =
            "🔴";

        document.getElementById("voiceStatus").innerHTML =
            "🎤 Listening... Speak now";

    } catch (error) {

        console.log(error);

    }

    recognition.onresult = function(event) {

        const spokenText =
            event.results[0][0].transcript;

        console.log("You said:", spokenText);

        document.getElementById("userInput").value =
            spokenText;

        document.getElementById("voiceStatus").innerHTML =
            "✅ Got it!";

        // Send question automatically
        sendMessage(spokenText);
    };

    recognition.onerror = function(event) {

        console.log("Voice error:", event.error);

        document.getElementById("voiceStatus").innerHTML =
            "❌ Could not understand your voice";

        isListening = false;

        document.getElementById("micButton").innerHTML =
            "🎤";
    };

    recognition.onend = function() {

        isListening = false;

        document.getElementById("micButton").innerHTML =
            "🎤";
    };
}
let recognition = null;
let isListening = false;

async function startVoiceInput() {

    const status = document.getElementById("voiceStatus");
    const micButton = document.getElementById("micButton");

    // Check browser support
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        status.innerHTML =
            "❌ Voice recognition is not supported. Use Google Chrome.";
        return;
    }

    // Stop if already listening
    if (isListening) {
        if (recognition) {
            recognition.stop();
        }
        return;
    }

    // First check microphone permission
    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        // We only needed the permission check
        stream.getTracks().forEach(track => track.stop());

    } catch (error) {

        console.error("Microphone permission error:", error);

        status.innerHTML =
            "❌ Microphone blocked. Allow microphone permission in Chrome.";

        alert(
            "Please allow microphone access for this website.\n\n" +
            "Chrome → 🔒 → Site settings → Microphone → Allow"
        );

        return;
    }

    // Create recognition
    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    // Get selected language
    let language = "en-IN";

    const languageSelect =
        document.getElementById("language");

    if (languageSelect) {

        language = languageSelect.value;

        // Don't use auto for speech recognition
        if (language === "auto") {
            language = "en-IN";
        }
    }

    recognition.lang = language;

    // START
    recognition.onstart = function () {

        isListening = true;

        micButton.innerHTML = "🔴";

        micButton.classList.add("listening");

        status.innerHTML =
            "🎤 Listening... Speak clearly now.";
    };

    // RESULT
    recognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript;

        console.log("🎤 You said:", spokenText);

        document.getElementById("userInput").value =
            spokenText;

        status.innerHTML =
            "✅ Got it: " + spokenText;

        // Automatically send to chatbot
        sendMessage(spokenText);
    };

    // ERROR
    recognition.onerror = function (event) {

        console.error(
            "Speech recognition error:",
            event.error
        );

        if (event.error === "no-speech") {

            status.innerHTML =
                "🔇 No speech detected. Click 🎤 and speak clearly.";

        } else if (event.error === "not-allowed") {

            status.innerHTML =
                "❌ Microphone permission denied.";

        } else if (event.error === "audio-capture") {

            status.innerHTML =
                "❌ Microphone could not be detected.";

        } else if (event.error === "network") {

            status.innerHTML =
                "❌ Network problem. Check your internet.";

        } else {

            status.innerHTML =
                "❌ Voice error: " + event.error;
        }

        isListening = false;

        micButton.innerHTML = "🎤";

        micButton.classList.remove("listening");
    };

    // END
    recognition.onend = function () {

        isListening = false;

        micButton.innerHTML = "🎤";

        micButton.classList.remove("listening");

    };

    // Start recognition
    try {

        recognition.start();

    } catch (error) {

        console.error("Start error:", error);

        status.innerHTML =
            "❌ Could not start voice recognition.";

    }
}
function speakResponse(text, language) {

    if (!window.speechSynthesis) {
        alert("Your browser does not support voice output.");
        return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    // Voice language
    speech.lang = language;

    // Voice settings
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    // Get available voices
    const voices =
        window.speechSynthesis.getVoices();

    // Find matching language voice
    let voice = voices.find(function (v) {
        return v.lang === language;
    });

    // If exact voice isn't available
    if (!voice) {

        voice = voices.find(function (v) {
            return v.lang.startsWith(
                language.split("-")[0]
            );
        });
    }

    if (voice) {
        speech.voice = voice;
    }

    // Show status
    document.getElementById("voiceStatus").innerHTML =
        "🔊 Smart Agro AI is speaking...";

    // SPEAK
    window.speechSynthesis.speak(speech);

    speech.onend = function () {

        document.getElementById("voiceStatus").innerHTML =
            "🎤 You can speak again";
    };

    speech.onerror = function (event) {

        console.log("Speech output error:", event);

        document.getElementById("voiceStatus").innerHTML =
            "❌ Could not play voice";
    };
}
window.speechSynthesis.onvoiceschanged = function () {

    const voices =
        window.speechSynthesis.getVoices();

    console.log("Available voices:", voices);
};
const translations = {

    en: {
        home: "Home",
        soil: "Soil Test",
        disease: "Disease Detection",
        fertilizer: "Fertilizer",
        chatbot: "AI Chatbot",
        weather: "Weather",
        market: "Market",
        about: "About",
        contact: "Contact",

        welcome: "Welcome to Smart Agro Care",
        tagline: "Smart Farming. Better Future.",
        subtitle: "Your digital farming assistant",
        getStarted: "Get Started",
        learnMore: "Learn More",

        soilTitle: "Soil Test",
        soilText: "Check your soil health and get suitable crop recommendations.",

        diseaseTitle: "Crop Disease Detection",
        diseaseText: "Upload a crop image to identify possible diseases.",

        fertilizerTitle: "Fertilizer Recommendation",
        fertilizerText: "Get fertilizer recommendations based on your soil.",

        weatherTitle: "Weather",
        weatherText: "Get the latest weather information for your location.",

        marketTitle: "Market Prices",
        marketText: "Check current crop and agricultural market prices.",

        chatbotTitle: "AI Farming Assistant",
        chatbotText: "Ask questions about crops, soil, diseases and farming.",

        aboutTitle: "About Smart Agro Care",
        contactTitle: "Contact Us",

        footer: "Smart Agro Care © 2026. All Rights Reserved."
    },

    mr: {
        home: "मुख्यपृष्ठ",
        soil: "माती तपासणी",
        disease: "पिकांचे रोग ओळख",
        fertilizer: "खत",
        chatbot: "AI चॅटबॉट",
        weather: "हवामान",
        market: "बाजारभाव",
        about: "आमच्याबद्दल",
        contact: "संपर्क",

        welcome: "स्मार्ट ॲग्रो केअरमध्ये आपले स्वागत आहे",
        tagline: "स्मार्ट शेती. चांगले भविष्य.",
        subtitle: "तुमचा डिजिटल शेती सहाय्यक",
        getStarted: "सुरुवात करा",
        learnMore: "अधिक जाणून घ्या",

        soilTitle: "माती तपासणी",
        soilText: "तुमच्या मातीचे आरोग्य तपासा आणि योग्य पिकांची शिफारस मिळवा.",

        diseaseTitle: "पिकांचे रोग ओळख",
        diseaseText: "पिकाचा फोटो अपलोड करून संभाव्य रोग ओळखा.",

        fertilizerTitle: "खताची शिफारस",
        fertilizerText: "तुमच्या मातीच्या आधारावर योग्य खताची शिफारस मिळवा.",

        weatherTitle: "हवामान",
        weatherText: "तुमच्या ठिकाणची नवीनतम हवामान माहिती मिळवा.",

        marketTitle: "बाजारभाव",
        marketText: "पिकांचे आणि कृषी उत्पादनांचे सध्याचे बाजारभाव पहा.",

        chatbotTitle: "AI शेती सहाय्यक",
        chatbotText: "पिके, माती, रोग आणि शेतीबद्दल प्रश्न विचारा.",

        aboutTitle: "स्मार्ट ॲग्रो केअरबद्दल",
        contactTitle: "आमच्याशी संपर्क साधा",

        footer: "स्मार्ट ॲग्रो केअर © 2026. सर्व हक्क राखीव."
    },

    hi: {
        home: "होम",
        soil: "मिट्टी जांच",
        disease: "फसल रोग पहचान",
        fertilizer: "उर्वरक",
        chatbot: "AI चैटबॉट",
        weather: "मौसम",
        market: "बाजार भाव",
        about: "हमारे बारे में",
        contact: "संपर्क",

        welcome: "स्मार्ट एग्रो केयर में आपका स्वागत है",
        tagline: "स्मार्ट खेती। बेहतर भविष्य।",
        subtitle: "आपका डिजिटल कृषि सहायक",
        getStarted: "शुरू करें",
        learnMore: "और जानें",

        soilTitle: "मिट्टी जांच",
        soilText: "अपनी मिट्टी की गुणवत्ता जांचें और उपयुक्त फसल की जानकारी प्राप्त करें।",

        diseaseTitle: "फसल रोग पहचान",
        diseaseText: "संभावित रोग की पहचान करने के लिए फसल की तस्वीर अपलोड करें।",

        fertilizerTitle: "उर्वरक सुझाव",
        fertilizerText: "अपनी मिट्टी के अनुसार सही उर्वरक की जानकारी प्राप्त करें।",

        weatherTitle: "मौसम",
        weatherText: "अपने स्थान की नवीनतम मौसम जानकारी प्राप्त करें।",

        marketTitle: "बाजार भाव",
        marketText: "फसलों और कृषि उत्पादों के वर्तमान बाजार भाव देखें।",

        chatbotTitle: "AI कृषि सहायक",
        chatbotText: "फसल, मिट्टी, रोग और खेती के बारे में प्रश्न पूछें।",

        aboutTitle: "स्मार्ट एग्रो केयर के बारे में",
        contactTitle: "हमसे संपर्क करें",

        footer: "स्मार्ट एग्रो केयर © 2026. सर्वाधिकार सुरक्षित।"
    },

    gu: {
        home: "હોમ",
        soil: "માટી તપાસ",
        disease: "રોગ ઓળખ",
        fertilizer: "ખાતર",
        chatbot: "AI ચેટબોટ",
        weather: "હવામાન",
        market: "બજાર ભાવ",
        about: "અમારા વિશે",
        contact: "સંપર્ક",

        welcome: "સ્માર્ટ એગ્રો કેરમાં આપનું સ્વાગત છે",
        tagline: "સ્માર્ટ ખેતી. સારું ભવિષ્ય.",
        subtitle: "તમારો ડિજિટલ ખેતી સહાયક",
        getStarted: "શરૂ કરો",
        learnMore: "વધુ જાણો",

        soilTitle: "માટી તપાસ",
        soilText: "તમારી માટીની ગુણવત્તા તપાસો અને યોગ્ય પાકની ભલામણ મેળવો.",

        diseaseTitle: "પાક રોગ ઓળખ",
        diseaseText: "રોગ ઓળખવા માટે પાકનો ફોટો અપલોડ કરો.",

        fertilizerTitle: "ખાતર ભલામણ",
        fertilizerText: "તમારી માટી અનુસાર યોગ્ય ખાતરની ભલામણ મેળવો.",

        weatherTitle: "હવામાન",
        weatherText: "તમારા સ્થાનની નવીનતમ હવામાન માહિતી મેળવો.",

        marketTitle: "બજાર ભાવ",
        marketText: "પાકના વર્તમાન બજાર ભાવ તપાસો.",

        chatbotTitle: "AI ખેતી સહાયક",
        chatbotText: "પાક, માટી અને ખેતી વિશે પ્રશ્નો પૂછો.",

        aboutTitle: "સ્માર્ટ એગ્રો કેર વિશે",
        contactTitle: "અમારો સંપર્ક કરો",

        footer: "સ્માર્ટ એગ્રો કેર © 2026. સર્વાધિકાર સુરક્ષિત."
    },

    kn: {
        home: "ಮುಖಪುಟ",
        soil: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ",
        disease: "ರೋಗ ಪತ್ತೆ",
        fertilizer: "ರಸಗೊಬ್ಬರ",
        chatbot: "AI ಚಾಟ್‌ಬಾಟ್",
        weather: "ಹವಾಮಾನ",
        market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        about: "ನಮ್ಮ ಬಗ್ಗೆ",
        contact: "ಸಂಪರ್ಕ",

        welcome: "ಸ್ಮಾರ್ಟ್ ಅಗ್ರೋ ಕೇರ್‌ಗೆ ಸ್ವಾಗತ",
        tagline: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. ಉತ್ತಮ ಭವಿಷ್ಯ.",
        subtitle: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕೃಷಿ ಸಹಾಯಕ",
        getStarted: "ಪ್ರಾರಂಭಿಸಿ",
        learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",

        soilTitle: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ",
        soilText: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳ ಶಿಫಾರಸು ಪಡೆಯಿರಿ.",

        diseaseTitle: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
        diseaseText: "ರೋಗವನ್ನು ಗುರುತಿಸಲು ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

        fertilizerTitle: "ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು",
        fertilizerText: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತ ರಸಗೊಬ್ಬರ ಪಡೆಯಿರಿ.",

        weatherTitle: "ಹವಾಮಾನ",
        weatherText: "ನಿಮ್ಮ ಸ್ಥಳದ ಇತ್ತೀಚಿನ ಹವಾಮಾನ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",

        marketTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        marketText: "ಬೆಳೆಗಳ ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",

        chatbotTitle: "AI ಕೃಷಿ ಸಹಾಯಕ",
        chatbotText: "ಬೆಳೆ, ಮಣ್ಣು ಮತ್ತು ಕೃಷಿಯ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.",

        aboutTitle: "ಸ್ಮಾರ್ಟ್ ಅಗ್ರೋ ಕೇರ್ ಬಗ್ಗೆ",
        contactTitle: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",

        footer: "ಸ್ಮಾರ್ಟ್ ಅಗ್ರೋ ಕೇರ್ © 2026. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."
    },

    te: {
        home: "హోమ్",
        soil: "నేల పరీక్ష",
        disease: "వ్యాధి గుర్తింపు",
        fertilizer: "ఎరువులు",
        chatbot: "AI చాట్‌బాట్",
        weather: "వాతావరణం",
        market: "మార్కెట్ ధరలు",
        about: "మా గురించి",
        contact: "సంప్రదించండి",

        welcome: "స్మార్ట్ అగ్రో కేర్‌కు స్వాగతం",
        tagline: "స్మార్ట్ వ్యవసాయం. మంచి భవిష్యత్తు.",
        subtitle: "మీ డిజిటల్ వ్యవసాయ సహాయకుడు",
        getStarted: "ప్రారంభించండి",
        learnMore: "మరింత తెలుసుకోండి",

        soilTitle: "నేల పరీక్ష",
        soilText: "మీ నేల ఆరోగ్యాన్ని తనిఖీ చేసి తగిన పంటల సూచనలు పొందండి.",

        diseaseTitle: "పంట వ్యాధి గుర్తింపు",
        diseaseText: "వ్యాధిని గుర్తించడానికి పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.",

        fertilizerTitle: "ఎరువుల సూచన",
        fertilizerText: "మీ నేల ఆధారంగా సరైన ఎరువుల సూచన పొందండి.",

        weatherTitle: "వాతావరణం",
        weatherText: "మీ ప్రాంతానికి తాజా వాతావరణ సమాచారాన్ని పొందండి.",

        marketTitle: "మార్కెట్ ధరలు",
        marketText: "పంటల ప్రస్తుత మార్కెట్ ధరలను చూడండి.",

        chatbotTitle: "AI వ్యవసాయ సహాయకుడు",
        chatbotText: "పంటలు, నేల మరియు వ్యవసాయం గురించి ప్రశ్నలు అడగండి.",

        aboutTitle: "స్మార్ట్ అగ్రో కేర్ గురించి",
        contactTitle: "మమ్మల్ని సంప్రదించండి",

        footer: "స్మార్ట్ అగ్రో కేర్ © 2026. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి."
    },

    ta: {
        home: "முகப்பு",
        soil: "மண் பரிசோதனை",
        disease: "நோய் கண்டறிதல்",
        fertilizer: "உரம்",
        chatbot: "AI சாட்பாட்",
        weather: "வானிலை",
        market: "சந்தை விலை",
        about: "எங்களை பற்றி",
        contact: "தொடர்பு",

        welcome: "ஸ்மார்ட் அக்ரோ கேர் வரவேற்கிறது",
        tagline: "ஸ்மார்ட் விவசாயம். சிறந்த எதிர்காலம்.",
        subtitle: "உங்கள் டிஜிட்டல் விவசாய உதவியாளர்",
        getStarted: "தொடங்குங்கள்",
        learnMore: "மேலும் அறிக",

        soilTitle: "மண் பரிசோதனை",
        soilText: "உங்கள் மண்ணின் ஆரோக்கியத்தை சரிபார்த்து பொருத்தமான பயிர் பரிந்துரைகளைப் பெறுங்கள்.",

        diseaseTitle: "பயிர் நோய் கண்டறிதல்",
        diseaseText: "நோயை கண்டறிய பயிரின் படத்தை பதிவேற்றவும்.",

        fertilizerTitle: "உர பரிந்துரை",
        fertilizerText: "உங்கள் மண்ணின் அடிப்படையில் சரியான உரத்தைப் பெறுங்கள்.",

        weatherTitle: "வானிலை",
        weatherText: "உங்கள் இடத்தின் சமீபத்திய வானிலை தகவலைப் பெறுங்கள்.",

        marketTitle: "சந்தை விலை",
        marketText: "பயிர்களின் தற்போதைய சந்தை விலைகளைப் பார்க்கவும்.",

        chatbotTitle: "AI விவசாய உதவியாளர்",
        chatbotText: "பயிர்கள், மண் மற்றும் விவசாயம் பற்றி கேள்விகள் கேளுங்கள்.",

        aboutTitle: "ஸ்மார்ட் அக்ரோ கேர் பற்றி",
        contactTitle: "எங்களை தொடர்பு கொள்ளுங்கள்",

        footer: "ஸ்மார்ட் அக்ரோ கேர் © 2026. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    },

    bn: {
        home: "হোম",
        soil: "মাটি পরীক্ষা",
        disease: "রোগ শনাক্তকরণ",
        fertilizer: "সার",
        chatbot: "AI চ্যাটবট",
        weather: "আবহাওয়া",
        market: "বাজার দর",
        about: "আমাদের সম্পর্কে",
        contact: "যোগাযোগ",

        welcome: "স্মার্ট অ্যাগ্রো কেয়ারে স্বাগতম",
        tagline: "স্মার্ট কৃষি। উন্নত ভবিষ্যৎ।",
        subtitle: "আপনার ডিজিটাল কৃষি সহায়ক",
        getStarted: "শুরু করুন",
        learnMore: "আরও জানুন",

        soilTitle: "মাটি পরীক্ষা",
        soilText: "আপনার মাটির স্বাস্থ্য পরীক্ষা করুন এবং উপযুক্ত ফসলের পরামর্শ পান।",

        diseaseTitle: "ফসলের রোগ শনাক্তকরণ",
        diseaseText: "রোগ শনাক্ত করতে ফসলের ছবি আপলোড করুন।",

        fertilizerTitle: "সার পরামর্শ",
        fertilizerText: "আপনার মাটির উপর ভিত্তি করে সঠিক সার নির্বাচন করুন।",

        weatherTitle: "আবহাওয়া",
        weatherText: "আপনার এলাকার সর্বশেষ আবহাওয়ার তথ্য পান।",

        marketTitle: "বাজার দর",
        marketText: "ফসলের বর্তমান বাজার দর দেখুন।",

        chatbotTitle: "AI কৃষি সহায়ক",
        chatbotText: "ফসল, মাটি এবং কৃষি সম্পর্কে প্রশ্ন করুন।",

        aboutTitle: "স্মার্ট অ্যাগ্রো কেয়ার সম্পর্কে",
        contactTitle: "যোগাযোগ করুন",

        footer: "স্মার্ট অ্যাগ্রো কেয়ার © 2026. সর্বস্বত্ব সংরক্ষিত।"
    },

    pa: {
        home: "ਮੁੱਖ ਪੰਨਾ",
        soil: "ਮਿੱਟੀ ਜਾਂਚ",
        disease: "ਬਿਮਾਰੀ ਪਛਾਣ",
        fertilizer: "ਖਾਦ",
        chatbot: "AI ਚੈਟਬੋਟ",
        weather: "ਮੌਸਮ",
        market: "ਮੰਡੀ ਭਾਅ",
        about: "ਸਾਡੇ ਬਾਰੇ",
        contact: "ਸੰਪਰਕ",

        welcome: "ਸਮਾਰਟ ਐਗਰੋ ਕੇਅਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
        tagline: "ਸਮਾਰਟ ਖੇਤੀ। ਬਿਹਤਰ ਭਵਿੱਖ।",
        subtitle: "ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਖੇਤੀ ਸਹਾਇਕ",
        getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
        learnMore: "ਹੋਰ ਜਾਣੋ",

        soilTitle: "ਮਿੱਟੀ ਜਾਂਚ",
        soilText: "ਆਪਣੀ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਜਾਂਚੋ ਅਤੇ ਢੁਕਵੀਂ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ।",

        diseaseTitle: "ਫਸਲ ਦੀ ਬਿਮਾਰੀ ਪਛਾਣ",
        diseaseText: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ ਕਰਨ ਲਈ ਫਸਲ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ।",

        fertilizerTitle: "ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼",
        fertilizerText: "ਆਪਣੀ ਮਿੱਟੀ ਦੇ ਅਧਾਰ 'ਤੇ ਸਹੀ ਖਾਦ ਦੀ ਸਿਫਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ।",

        weatherTitle: "ਮੌਸਮ",
        weatherText: "ਆਪਣੇ ਸਥਾਨ ਦੀ ਤਾਜ਼ਾ ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।",

        marketTitle: "ਮੰਡੀ ਭਾਅ",
        marketText: "ਫਸਲਾਂ ਦੇ ਮੌਜੂਦਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ।",

        chatbotTitle: "AI ਖੇਤੀ ਸਹਾਇਕ",
        chatbotText: "ਫਸਲਾਂ, ਮਿੱਟੀ ਅਤੇ ਖੇਤੀ ਬਾਰੇ ਸਵਾਲ ਪੁੱਛੋ।",

        aboutTitle: "ਸਮਾਰਟ ਐਗਰੋ ਕੇਅਰ ਬਾਰੇ",
        contactTitle: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",

        footer: "ਸਮਾਰਟ ਐਗਰੋ ਕੇਅਰ © 2026. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।"
    },

    ml: {
        home: "ഹോം",
        soil: "മണ്ണ് പരിശോധന",
        disease: "രോഗനിർണയം",
        fertilizer: "വളം",
        chatbot: "AI ചാറ്റ്ബോട്ട്",
        weather: "കാലാവസ്ഥ",
        market: "വിപണി വില",
        about: "ഞങ്ങളെക്കുറിച്ച്",
        contact: "ബന്ധപ്പെടുക",

        welcome: "സ്മാർട്ട് അഗ്രോ കെയറിലേക്ക് സ്വാഗതം",
        tagline: "സ്മാർട്ട് കൃഷി. മികച്ച ഭാവി.",
        subtitle: "നിങ്ങളുടെ ഡിജിറ്റൽ കൃഷി സഹായി",
        getStarted: "ആരംഭിക്കുക",
        learnMore: "കൂടുതൽ അറിയുക",

        soilTitle: "മണ്ണ് പരിശോധന",
        soilText: "നിങ്ങളുടെ മണ്ണിന്റെ ആരോഗ്യം പരിശോധിച്ച് അനുയോജ്യമായ വിളകൾ കണ്ടെത്തുക.",

        diseaseTitle: "വിള രോഗനിർണയം",
        diseaseText: "രോഗം കണ്ടെത്താൻ വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",

        fertilizerTitle: "വള ശുപാർശ",
        fertilizerText: "നിങ്ങളുടെ മണ്ണിന്റെ അടിസ്ഥാനത്തിൽ ശരിയായ വളം തിരഞ്ഞെടുക്കുക.",

        weatherTitle: "കാലാവസ്ഥ",
        weatherText: "നിങ്ങളുടെ പ്രദേശത്തെ ഏറ്റവും പുതിയ കാലാവസ്ഥാ വിവരങ്ങൾ നേടുക.",

        marketTitle: "വിപണി വില",
        marketText: "വിളകളുടെ നിലവിലെ വിപണി വില പരിശോധിക്കുക.",

        chatbotTitle: "AI കൃഷി സഹായി",
        chatbotText: "വിളകൾ, മണ്ണ്, കൃഷി എന്നിവയെക്കുറിച്ച് ചോദ്യങ്ങൾ ചോദിക്കുക.",

        aboutTitle: "സ്മാർട്ട് അഗ്രോ കെയറിനെക്കുറിച്ച്",
        contactTitle: "ഞങ്ങളെ ബന്ധപ്പെടുക",

        footer: "സ്മാർട്ട് അഗ്രോ കെയർ © 2026. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു."
    },

    or: {
        home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
        soil: "ମାଟି ପରୀକ୍ଷା",
        disease: "ରୋଗ ଚିହ୍ନଟ",
        fertilizer: "ସାର",
        chatbot: "AI ଚାଟବଟ",
        weather: "ପାଣିପାଗ",
        market: "ବଜାର ଦର",
        about: "ଆମ ବିଷୟରେ",
        contact: "ଯୋଗାଯୋଗ",

        welcome: "ସ୍ମାର୍ଟ ଏଗ୍ରୋ କେୟାରକୁ ସ୍ୱାଗତ",
        tagline: "ସ୍ମାର୍ଟ କୃଷି। ଉନ୍ନତ ଭବିଷ୍ୟତ।",
        subtitle: "ଆପଣଙ୍କ ଡିଜିଟାଲ କୃଷି ସହାୟକ",
        getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
        learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",

        soilTitle: "ମାଟି ପରୀକ୍ଷା",
        soilText: "ଆପଣଙ୍କ ମାଟିର ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା କରନ୍ତୁ ଏବଂ ଉପଯୁକ୍ତ ଫସଲର ପରାମର୍ଶ ପାଆନ୍ତୁ।",

        diseaseTitle: "ଫସଲ ରୋଗ ଚିହ୍ନଟ",
        diseaseText: "ରୋଗ ଚିହ୍ନଟ ପାଇଁ ଫସଲର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ।",

        fertilizerTitle: "ସାର ପରାମର୍ଶ",
        fertilizerText: "ଆପଣଙ୍କ ମାଟି ଅନୁସାରେ ଉପଯୁକ୍ତ ସାରର ପରାମର୍ଶ ପାଆନ୍ତୁ।",

        weatherTitle: "ପାଣିପାଗ",
        weatherText: "ଆପଣଙ୍କ ସ୍ଥାନର ସର୍ବଶେଷ ପାଣିପାଗ ସୂଚନା ପାଆନ୍ତୁ।",

        marketTitle: "ବଜାର ଦର",
        marketText: "ଫସଲର ବର୍ତ୍ତମାନ ବଜାର ଦର ଦେଖନ୍ତୁ।",

        chatbotTitle: "AI କୃଷି ସହାୟକ",
        chatbotText: "ଫସଲ, ମାଟି ଏବଂ କୃଷି ବିଷୟରେ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।",

        aboutTitle: "ସ୍ମାର୍ଟ ଏଗ୍ରୋ କେୟାର ବିଷୟରେ",
        contactTitle: "ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ",

        footer: "ସ୍ମାର୍ଟ ଏଗ୍ରୋ କେୟାର © 2026. ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।"
    },

    as: {
        home: "মুখ্য পৃষ্ঠা",
        soil: "মাটি পৰীক্ষা",
        disease: "ৰোগ চিনাক্তকৰণ",
        fertilizer: "সাৰ",
        chatbot: "AI চেটবট",
        weather: "বতৰ",
        market: "বজাৰ মূল্য",
        about: "আমাৰ বিষয়ে",
        contact: "যোগাযোগ",

        welcome: "স্মাৰ্ট এগ্ৰো কেয়াৰলৈ স্বাগতম",
        tagline: "স্মাৰ্ট কৃষি। উন্নত ভৱিষ্যৎ।",
        subtitle: "আপোনাৰ ডিজিটেল কৃষি সহায়ক",
        getStarted: "আৰম্ভ কৰক",
        learnMore: "অধিক জানক",

        soilTitle: "মাটি পৰীক্ষা",
        soilText: "আপোনাৰ মাটিৰ স্বাস্থ্য পৰীক্ষা কৰি উপযুক্ত শস্যৰ পৰামৰ্শ লাভ কৰক।",

        diseaseTitle: "শস্যৰ ৰোগ চিনাক্তকৰণ",
        diseaseText: "ৰোগ চিনাক্ত কৰিবলৈ শস্যৰ ছবি আপলোড কৰক।",

        fertilizerTitle: "সাৰৰ পৰামৰ্শ",
        fertilizerText: "আপোনাৰ মাটিৰ ওপৰত ভিত্তি কৰি সঠিক সাৰৰ পৰামৰ্শ লাভ কৰক।",

        weatherTitle: "বতৰ",
        weatherText: "আপোনাৰ স্থানৰ শেহতীয়া বতৰৰ তথ্য লাভ কৰক।",

        marketTitle: "বজাৰ মূল্য",
        marketText: "শস্যৰ বৰ্তমান বজাৰ মূল্য চাওক।",

        chatbotTitle: "AI কৃষি সহায়ক",
        chatbotText: "শস্য, মাটি আৰু কৃষিৰ বিষয়ে প্ৰশ্ন সোধক।",

        aboutTitle: "স্মাৰ্ট এগ্ৰো কেয়াৰৰ বিষয়ে",
        contactTitle: "আমাৰ সৈতে যোগাযোগ কৰক",

        footer: "স্মাৰ্ট এগ্ৰো কেয়াৰ © 2026. সকলো অধিকাৰ সংৰক্ষিত।"
    },

    ur: {
        home: "ہوم",
        soil: "مٹی کی جانچ",
        disease: "بیماری کی شناخت",
        fertilizer: "کھاد",
        chatbot: "AI چیٹ بوٹ",
        weather: "موسم",
        market: "بازار کی قیمت",
        about: "ہمارے بارے میں",
        contact: "رابطہ",

        welcome: "اسمارٹ ایگرو کیئر میں خوش آمدید",
        tagline: "اسمارٹ کاشتکاری۔ بہتر مستقبل۔",
        subtitle: "آپ کا ڈیجیٹل زرعی معاون",
        getStarted: "شروع کریں",
        learnMore: "مزید جانیں",

        soilTitle: "مٹی کی جانچ",
        soilText: "اپنی مٹی کی صحت چیک کریں اور مناسب فصل کی سفارش حاصل کریں۔",

        diseaseTitle: "فصل کی بیماری کی شناخت",
        diseaseText: "بیماری کی شناخت کے لیے فصل کی تصویر اپ لوڈ کریں۔",

        fertilizerTitle: "کھاد کی سفارش",
        fertilizerText: "اپنی مٹی کے مطابق مناسب کھاد کی سفارش حاصل کریں۔",

        weatherTitle: "موسم",
        weatherText: "اپنے علاقے کی تازہ ترین موسم کی معلومات حاصل کریں۔",

        marketTitle: "بازار کی قیمت",
        marketText: "فصلوں کی موجودہ بازار قیمتیں دیکھیں۔",

        chatbotTitle: "AI زرعی معاون",
        chatbotText: "فصل، مٹی اور کاشتکاری کے بارے میں سوال پوچھیں۔",

        aboutTitle: "اسمارٹ ایگرو کیئر کے بارے میں",
        contactTitle: "ہم سے رابطہ کریں",

        footer: "اسمارٹ ایگرو کیئر © 2026۔ جملہ حقوق محفوظ ہیں۔"
    }
};


// Change language
function changeLanguage(lang) {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }

    });

    // Save selected language
    localStorage.setItem("selectedLanguage", lang);

    // Set document language
    document.documentElement.lang = lang;

    // Urdu right-to-left
    if (lang === "ur") {
        document.body.dir = "rtl";
    } else {
        document.body.dir = "ltr";
    }
}


// Load saved language
document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    const selector =
        document.getElementById("languageSelect");

    if (selector) {
        selector.value = savedLanguage;
    }

    changeLanguage(savedLanguage);
});
