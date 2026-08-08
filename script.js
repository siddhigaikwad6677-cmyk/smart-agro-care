/* =====================================================
   SMART AGRO CARE
   MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. PAGE LOADED
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🌱 Smart Agro Care loaded successfully!");

    setupAnimations();

    setupScrollEffects();

    setupImagePreview();

    setupFAQ();

});


/* =====================================================
   2. MOBILE MENU
   ===================================================== */

function toggleMenu() {

    const nav =
        document.querySelector(".nav-links");

    if (!nav) return;

    nav.classList.toggle("mobile-open");

}


/* =====================================================
   3. SCROLL ANIMATION
   ===================================================== */

function setupAnimations() {

    const elements =
        document.querySelectorAll(
            ".card, .feature, .stat, .soil-card, .crop-card, .disease-card"
        );

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "fade-in"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    elements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =====================================================
   4. SCROLL EFFECT
   ===================================================== */

function setupScrollEffects() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 8px 30px rgba(20,70,35,.08)";

            } else {

                navbar.style.boxShadow =
                    "none";

            }

        }
    );

}


/* =====================================================
   5. NOTIFICATION
   ===================================================== */

function showNotification(
    message,
    type = "success"
) {

    const old =
        document.querySelector(
            ".agro-notification"
        );

    if (old) old.remove();


    const notification =
        document.createElement("div");


    notification.className =
        "agro-notification";


    notification.innerHTML = `

        <div class="notification-icon">

            ${
                type === "error"
                ? "⚠️"
                : "🌱"
            }

        </div>

        <span>
            ${message}
        </span>

        <button
            onclick="this.parentElement.remove()">

            ×

        </button>

    `;


    notification.style.cssText = `

        position: fixed;

        top: 90px;

        right: 25px;

        z-index: 9999;

        display: flex;

        align-items: center;

        gap: 10px;

        padding: 13px 15px;

        background: white;

        border-radius: 12px;

        box-shadow:
            0 15px 40px
            rgba(0,0,0,.15);

        color: #244b32;

        font-size: 12px;

        animation:
            slideNotification .35s ease;

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(function () {

        if (notification) {

            notification.remove();

        }

    }, 4000);

}


/* =====================================================
   6. IMAGE PREVIEW
   ===================================================== */

function setupImagePreview() {

    const input =
        document.querySelector(
            'input[type="file"]'
        );

    if (!input) return;


    input.addEventListener(
        "change",
        function () {

            previewImage(this);

        }
    );

}


function previewImage(input) {

    if (!input.files ||
        !input.files[0]) {

        return;

    }


    const file =
        input.files[0];


    if (!file.type.startsWith("image/")) {

        showNotification(
            "Please select an image file.",
            "error"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            let preview =
                document.querySelector(
                    "#imagePreview"
                );


            if (!preview) {

                preview =
                    document.createElement(
                        "img"
                    );

                preview.id =
                    "imagePreview";


                preview.style.cssText = `

                    width: 100%;

                    max-width: 350px;

                    height: 230px;

                    object-fit: cover;

                    border-radius: 18px;

                    margin-top: 15px;

                    box-shadow:
                        0 15px 30px
                        rgba(0,0,0,.10);

                `;


                input.parentElement
                    .appendChild(preview);

            }


            preview.src =
                event.target.result;


            showNotification(
                "Crop image uploaded successfully 🌱"
            );

        };


    reader.readAsDataURL(file);

}


/* =====================================================
   7. FAQ
   ===================================================== */

function setupFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    questions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                toggleFAQ(this);

            }
        );

    });

}


function toggleFAQ(button) {

    const faq =
        button.parentElement;


    const answer =
        faq.querySelector(
            ".faq-answer"
        );


    if (!answer) return;


    const isOpen =
        faq.classList.contains(
            "open"
        );


    document
        .querySelectorAll(".faq")
        .forEach(function (item) {

            item.classList.remove(
                "open"
            );

            const itemAnswer =
                item.querySelector(
                    ".faq-answer"
                );

            if (itemAnswer) {

                itemAnswer.style.maxHeight =
                    null;

            }

        });


    if (!isOpen) {

        faq.classList.add(
            "open"
        );


        answer.style.maxHeight =
            answer.scrollHeight +
            "px";

    }

}


/* =====================================================
   8. SOIL HEALTH CALCULATOR
   ===================================================== */

function calculateSoilHealth() {

    const nitrogen =
        parseFloat(
            document.getElementById(
                "nitrogen"
            )?.value
        ) || 0;


    const phosphorus =
        parseFloat(
            document.getElementById(
                "phosphorus"
            )?.value
        ) || 0;


    const potassium =
        parseFloat(
            document.getElementById(
                "potassium"
            )?.value
        ) || 0;


    const ph =
        parseFloat(
            document.getElementById(
                "ph"
            )?.value
        ) || 0;


    if (
        nitrogen === 0 &&
        phosphorus === 0 &&
        potassium === 0 &&
        ph === 0
    ) {

        showNotification(
            "Please enter soil values.",
            "error"
        );

        return;

    }


    let score = 0;


    /* Nitrogen */

    if (
        nitrogen >= 40 &&
        nitrogen <= 80
    ) {

        score += 25;

    } else if (
        nitrogen >= 20 &&
        nitrogen <= 100
    ) {

        score += 18;

    } else {

        score += 10;

    }


    /* Phosphorus */

    if (
        phosphorus >= 20 &&
        phosphorus <= 50
    ) {

        score += 25;

    } else if (
        phosphorus >= 10 &&
        phosphorus <= 70
    ) {

        score += 18;

    } else {

        score += 10;

    }


    /* Potassium */

    if (
        potassium >= 120 &&
        potassium <= 250
    ) {

        score += 25;

    } else if (
        potassium >= 80 &&
        potassium <= 300
    ) {

        score += 18;

    } else {

        score += 10;

    }


    /* pH */

    if (
        ph >= 6 &&
        ph <= 7.5
    ) {

        score += 25;

    } else if (
        ph >= 5.5 &&
        ph <= 8
    ) {

        score += 18;

    } else {

        score += 10;

    }


    displaySoilScore(score);

}


function displaySoilScore(score) {

    const result =
        document.getElementById(
            "soilScore"
        );


    if (!result) return;


    let status;


    if (score >= 85) {

        status =
            "Excellent 🌱";

    } else if (score >= 70) {

        status =
            "Good 👍";

    } else if (score >= 50) {

        status =
            "Moderate ⚠️";

    } else {

        status =
            "Needs Attention";

    }


    result.innerHTML = `

        <strong>${score}/100</strong>

        <span>
            ${status}
        </span>

    `;


    result.style.display =
        "block";

}


/* =====================================================
   9. CROP RECOMMENDATION
   ===================================================== */

function recommendCrop() {

    const soil =
        document.getElementById(
            "soilType"
        )?.value;


    const season =
        document.getElementById(
            "season"
        )?.value;


    const result =
        document.getElementById(
            "cropResult"
        );


    if (!soil || !season || !result) {

        showNotification(
            "Please select soil and season.",
            "error"
        );

        return;

    }


    const crops = {

        black: {
            kharif:
                "Cotton, Soybean, Tur",
            rabi:
                "Wheat, Chickpea"
        },

        red: {
            kharif:
                "Groundnut, Millet, Maize",
            rabi:
                "Groundnut, Vegetables"
        },

        alluvial: {
            kharif:
                "Rice, Maize, Sugarcane",
            rabi:
                "Wheat, Potato, Peas"
        },

        laterite: {
            kharif:
                "Rice, Cashew",
            rabi:
                "Vegetables, Pulses"
        },

        sandy: {
            kharif:
                "Groundnut, Watermelon",
            rabi:
                "Carrot, Potato"
        }

    };


    const recommendation =
        crops[soil]?.[season];


    if (!recommendation) {

        result.innerHTML =
            "Please select valid options.";

        return;

    }


    result.innerHTML = `

        <div style="
            padding:20px;
            background:#e7f6e9;
            border-radius:15px;
            color:#176b3a;
        ">

            <strong>
                🌱 Recommended Crops
            </strong>

            <p style="
                margin-top:8px;
                font-size:13px;
            ">

                ${recommendation}

            </p>

        </div>

    `;

}


/* =====================================================
   10. FERTILIZER RECOMMENDATION
   ===================================================== */

function recommendFertilizer() {

    const nitrogen =
        parseFloat(
            document.getElementById(
                "fertNitrogen"
            )?.value
        ) || 0;


    const phosphorus =
        parseFloat(
            document.getElementById(
                "fertPhosphorus"
            )?.value
        ) || 0;


    const potassium =
        parseFloat(
            document.getElementById(
                "fertPotassium"
            )?.value
        ) || 0;


    const result =
        document.getElementById(
            "fertilizerResult"
        );


    if (!result) return;


    let message = "";


    if (nitrogen < 40) {

        message +=
            "Nitrogen appears low. ";

    }


    if (phosphorus < 20) {

        message +=
            "Phosphorus appears low. ";

    }


    if (potassium < 120) {

        message +=
            "Potassium appears low. ";

    }


    if (message === "") {

        message =
            "The entered NPK values appear reasonably balanced.";

    }


    result.innerHTML = `

        <div style="
            padding:20px;
            border-radius:15px;
            background:#f0f8e9;
        ">

            <strong>
                🧪 Fertilizer Guidance
            </strong>

            <p style="
                margin-top:8px;
                line-height:1.6;
            ">

                ${message}

            </p>

            <small>

                For actual fertilizer application,
                use a local soil test and
                agricultural expert recommendation.

            </small>

        </div>

    `;

}


/* =====================================================
   11. WEATHER ADVICE
   ===================================================== */

function getWeatherAdvice() {

    const temperature =
        parseFloat(
            document.getElementById(
                "temperature"
            )?.value
        ) || 0;


    const humidity =
        parseFloat(
            document.getElementById(
                "humidity"
            )?.value
        ) || 0;


    const result =
        document.getElementById(
            "weatherAdvice"
        );


    if (!result) return;


    let advice = "";


    if (temperature > 35) {

        advice +=
            "High temperature: monitor crop water needs. ";

    } else if (temperature < 15) {

        advice +=
            "Cool conditions: protect sensitive crops. ";

    } else {

        advice +=
            "Temperature is in a moderate range. ";

    }


    if (humidity > 75) {

        advice +=
            "High humidity may increase some disease risks.";

    } else {

        advice +=
            "Humidity is relatively moderate.";

    }


    result.innerHTML = `

        <div style="
            padding:18px;
            border-radius:15px;
            background:#e8f6eb;
            color:#24623a;
        ">

            🌦️ ${advice}

        </div>

    `;

}


/* =====================================================
   12. AI CHATBOT
   ===================================================== */

function sendMessage() {

    const input =
        document.getElementById(
            "chatInput"
        );


    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!input || !messages) return;


    const text =
        input.value.trim();


    if (!text) return;


    addChatMessage(
        text,
        "user"
    );


    input.value = "";


    setTimeout(
        function () {

            const response =
                getBotResponse(
                    text
                );


            addChatMessage(
                response,
                "bot"
            );


            speakText(
                response
            );

        },
        500
    );

}


function addChatMessage(
    text,
    type
) {

    const messages =
        document.getElementById(
            "chatMessages"
        );


    if (!messages) return;


    const message =
        document.createElement(
            "div"
        );


    message.className =
        "message " + type;


    message.textContent =
        text;


    messages.appendChild(
        message
    );


    messages.scrollTop =
        messages.scrollHeight;

}


/* =====================================================
   13. BOT RESPONSE
   ===================================================== */

function getBotResponse(text) {

    const message =
        text.toLowerCase();


    if (
        message.includes("soil") ||
        message.includes("माती")
    ) {

        return "Soil health depends on pH, nitrogen, phosphorus, potassium, organic matter and moisture. 🌱";

    }


    if (
        message.includes("disease") ||
        message.includes("रोग")
    ) {

        return "You can upload a crop image on the Disease Detection page for a visual demonstration. For real diagnosis, consult an agricultural expert.";

    }


    if (
        message.includes("water") ||
        message.includes("पाणी")
    ) {

        return "Water requirements depend on the crop, soil, weather and growth stage. Avoid overwatering and monitor soil moisture.";

    }


    if (
        message.includes("fertilizer") ||
        message.includes("खत")
    ) {

        return "NPK are important plant nutrients. Fertilizer decisions should ideally be based on soil-test results and crop requirements.";

    }


    if (
        message.includes("crop") ||
        message.includes("पीक")
    ) {

        return "Crop selection depends on soil type, season, water availability and local climate. 🌾";

    }


    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("नमस्कार")
    ) {

        return "Hello! 🌱 I am Agro AI. How can I help you with farming today?";

    }


    return "I can help you explore soil, crops, fertilizer, weather and crop-health topics. Try asking me about one of these! 🌱";

}


/* =====================================================
   14. VOICE INPUT
   ===================================================== */

function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        showNotification(
            "Voice input is not supported by this browser.",
            "error"
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        1;


    recognition.start();


    showNotification(
        "🎤 Listening..."
    );


    recognition.onresult =
        function (event) {

            const text =
                event.results[0][0].transcript;


            const input =
                document.getElementById(
                    "chatInput"
                );


            if (input) {

                input.value =
                    text;

            }

        };


    recognition.onerror =
        function () {

            showNotification(
                "Could not understand the voice input.",
                "error"
            );

        };

}


/* =====================================================
   15. VOICE RESPONSE
   ===================================================== */

function speakText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.lang =
        "en-IN";


    speech.rate =
        0.95;


    speech.pitch =
        1;


    window.speechSynthesis.speak(
        speech
    );

}


/* =====================================================
   16. STOP VOICE
   ===================================================== */

function stopVoice() {

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }

}


/* =====================================================
   17. LANGUAGE SWITCH
   ===================================================== */

function switchLanguage(language) {

    if (language === "mr") {

        document
            .querySelectorAll(
                "[data-en]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        element.dataset.mr;

                }
            );


        showNotification(
            "मराठी भाषा निवडली आहे 🌱"
        );

    } else {

        document
            .querySelectorAll(
                "[data-en]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        element.dataset.en;

                }
            );


        showNotification(
            "English language selected 🌱"
        );

    }

}


/* =====================================================
   18. DOWNLOAD REPORT
   ===================================================== */

function downloadReport() {

    const score =
        document.getElementById(
            "soilScore"
        )?.innerText ||
        "Not calculated";


    const report = `

SMART AGRO CARE
SOIL HEALTH REPORT
============================

Soil Health Score:
${score}

Generated:
${new Date().toLocaleString()}

This report is for informational
and educational purposes.

For agricultural decisions,
consider professional soil testing
and local expert advice.

============================
Smart Agro Care 🌱

`;


    const blob =
        new Blob(
            [report],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "smart-agro-care-report.txt";


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showNotification(
        "Your report has been downloaded 📄"
    );

}


/* =====================================================
   19. CONTACT FORM
   ===================================================== */

function submitForm(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "name"
        )?.value.trim();


    const email =
        document.getElementById(
            "email"
        )?.value.trim();


    const message =
        document.getElementById(
            "message"
        )?.value.trim();


    if (
        !name ||
        !email ||
        !message
    ) {

        showNotification(
            "Please complete all required fields.",
            "error"
        );

        return;

    }


    const success =
        document.getElementById(
            "successMessage"
        );


    if (success) {

        success.style.display =
            "block";

    }


    const form =
        document.getElementById(
            "contactForm"
        );


    if (form) {

        form.reset();

    }


    showNotification(
        "Message prepared successfully! 🌱"
    );


    setTimeout(
        function () {

            if (success) {

                success.style.display =
                    "none";

            }

        },
        5000
    );

}


/* =====================================================
   20. DARK MODE
   ===================================================== */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "smartAgroDarkMode",
        dark
    );

}


/* Restore dark mode */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const dark =
            localStorage.getItem(
                "smartAgroDarkMode"
            );


        if (dark === "true") {

            document.body.classList.add(
                "dark-mode"
            );

        }

    }
);


/* =====================================================
   21. PRINT REPORT
   ===================================================== */

function printReport() {

    window.print();

}


/* =====================================================
   22. BACK TO TOP
   ===================================================== */

function createBackToTop() {

    const button =
        document.createElement(
            "button"
        );


    button.innerHTML =
        "↑";


    button.title =
        "Back to top";


    button.style.cssText = `

        position: fixed;

        right: 20px;

        bottom: 20px;

        width: 42px;

        height: 42px;

        border: none;

        border-radius: 50%;

        background: #176b3a;

        color: white;

        font-size: 18px;

        cursor: pointer;

        display: none;

        z-index: 999;

        box-shadow:
            0 8px 20px
            rgba(0,0,0,.15);

    `;


    document.body.appendChild(
        button
    );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 400
            ) {

                button.style.display =
                    "block";

            } else {

                button.style.display =
                    "none";

            }

        }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    createBackToTop
);


/* =====================================================
   23. CONSOLE MESSAGE
   ===================================================== */

console.log(`
🌱 SMART AGRO CARE

Smart farming.
Smart decisions.
Better future.

Website JavaScript loaded successfully.
`);
