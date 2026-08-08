/* =====================================================
            SMART AGRO CARE JAVASCRIPT
===================================================== */


// MOBILE MENU

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.flexDirection = "column";

        nav.style.position = "absolute";

        nav.style.top = "82px";

        nav.style.left = "0";

        nav.style.width = "100%";

        nav.style.padding = "25px";

        nav.style.background = "white";

        nav.style.boxShadow =
            "0 15px 30px rgba(0,0,0,.1)";

    }

}



// CARD ANIMATION

const cards =
    document.querySelectorAll(".service-card");


cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.cursor = "pointer";

    });

});



// SCROLL REVEAL

const revealElements =
    document.querySelectorAll(
        ".service-card, .info-card, .number-box"
    );


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


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "all .7s ease";

    observer.observe(element);

});



// CONSOLE MESSAGE

console.log(
    "🌱 Smart Agro Care is running successfully!"
);
