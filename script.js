// Smart Agro Care JavaScript

console.log("Smart Agro Care loaded successfully!");


// Simple welcome message

window.addEventListener("load", function () {

    console.log("🌱 Welcome to Smart Agro Care!");

});


// Button click animation

const cards = document.querySelectorAll(".service-card");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        console.log(
            "Opening:",
            card.querySelector("h3").innerText
        );

    });

});
