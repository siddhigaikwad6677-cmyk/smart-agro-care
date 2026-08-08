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
