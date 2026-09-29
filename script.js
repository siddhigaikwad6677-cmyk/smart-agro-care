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
