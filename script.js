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
