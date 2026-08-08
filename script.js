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
