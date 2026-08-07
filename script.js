// ================================
// SMART AGRO AI CHATBOT
// ================================

// Quick Question Buttons
function quickQuestion(text) {
    document.getElementById("question").value = text;
    reply();
}

// Chatbot Reply
function reply() {

    let input = document.getElementById("question");

    let question = input.value.toLowerCase().trim();

    if (question == "") return;

    let chat = document.getElementById("chat");

    // User Message
    chat.innerHTML += `
    <div class="user">
        <span>${input.value}</span>
    </div>`;

    let answer = "❌ Sorry, I don't understand that question.";

    // ====================
    // Crop Recommendation
    // ====================

    if(question.includes("black soil"))
        answer = "🌱 Black soil is best for Cotton, Soybean and Sugarcane.";

    else if(question.includes("red soil"))
        answer = "🌾 Red soil is suitable for Groundnut, Millets and Potato.";

    else if(question.includes("alluvial"))
        answer = "🌾 Alluvial soil is excellent for Rice, Wheat and Maize.";

    // ====================
    // Water
    // ====================

    else if(question.includes("rice"))
        answer = "💧 Rice requires approximately 1200–1500 mm of water during the growing season.";

    else if(question.includes("wheat"))
        answer = "💧 Wheat requires around 450–650 mm of water.";

    else if(question.includes("cotton"))
        answer = "💧 Cotton requires around 700–1200 mm of water.";

    // ====================
    // Fertilizer
    // ====================

    else if(question.includes("fertilizer"))
        answer = "🧪 Recommended fertilizer: NPK 19:19:19 with Organic Compost.";

    // ====================
    // Organic
    // ====================

    else if(question.includes("organic"))
        answer = "🌿 Use compost, crop rotation, natural pesticides and vermicompost.";

    // ====================
    // Soil pH
    // ====================

    else if(question.includes("ph"))
        answer = "🌡️ Ideal soil pH for most crops is between 6.0 and 7.5.";

    // ====================
    // Weather
    // ====================

    else if(question.includes("weather"))
        answer = "🌦️ Weather Advice: Temperature 29°C, Humidity 70%, Good day for irrigation.";

    // ====================
    // Government Schemes
    // ====================

    else if(question.includes("scheme"))
        answer = "🚜 Government Schemes: PM-KISAN, Soil Health Card, PM Fasal Bima Yojana.";

    // Bot Message
    setTimeout(function(){

        chat.innerHTML += `
        <div class="bot">
            <span>${answer}</span>
        </div>`;

        chat.scrollTop = chat.scrollHeight;

        speak(answer);

    },500);

    input.value = "";

}

// ================================
// Voice Recognition
// ================================

function startListening(){

if(!('webkitSpeechRecognition' in window)){

alert("Speech Recognition is not supported.");

return;

}

const recognition = new webkitSpeechRecognition();

recognition.lang="en-IN";

recognition.start();

recognition.onresult=function(event){

document.getElementById("question").value =
event.results[0][0].transcript;

reply();

}

}

// ================================
// Voice Output
// ================================

function speak(text){

const speech = new SpeechSynthesisUtterance();

speech.text = text;

speech.lang = "en-IN";

window.speechSynthesis.speak(speech);

}

// ================================
// Location Recommendation
// ================================

function recommend(){

let district=document.getElementById("district").value;

let crop="";

if(district=="Kolhapur")

crop="🌾 Sugarcane, Rice";

else if(district=="Pune")

crop="🌾 Wheat, Onion";

else if(district=="Sangli")

crop="🌾 Grapes, Turmeric";

else

crop="🌾 Rice, Vegetables";

document.getElementById("cropResult").innerHTML =
"Recommended Crops : "+crop;

}

// ================================
// Language Switch
// ================================

function changeLanguage(lang){

if(lang=="mr"){

alert("मराठी भाषा निवडली आहे.");

}

else{

alert("English Language Selected.");

}

}
function previewImage(){

let file=document.getElementById("cropImage").files[0];

if(file){

let reader=new FileReader();

reader.onload=function(e){

let img=document.getElementById("preview");

img.src=e.target.result;

img.style.display="block";

}

reader.readAsDataURL(file);

}

}
function login(){

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

if(email=="" || password==""){

alert("Please enter Email and Password");

return;

}

alert("Login Successful");

window.location.href="home.html";

}
function signup(){

let name=document.getElementById("name").value;

let email=document.getElementById("signupEmail").value;

let password=document.getElementById("signupPassword").value;

if(name=="" || email=="" || password==""){

alert("Please fill all details");

return;

}

alert("Account Created Successfully");

window.location.href="index.html";

}
// =============================
// SMART AGRO CARE - script.js
// =============================

// Welcome Message
window.onload = function () {
    setTimeout(function () {
        alert("🌾 Welcome to Smart Agro Care!\nEmpowering Farmers with AI Technology.");
    }, 800);
};

// Counter Animation
const counters = document.querySelectorAll(".stats h2");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.innerText.replace(/\D/g, "");
        const count = +counter.getAttribute("data-count") || 0;
        const increment = target / 100;

        if (count < target) {
            counter.setAttribute("data-count", Math.ceil(count + increment));
            counter.innerText = Math.ceil(count + increment) + "+";
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCounter();
});

// Navbar Shadow on Scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "#ffffff";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
    } else {
        header.style.background = "rgba(255,255,255,0.85)";
        header.style.boxShadow = "none";
    }
});

// Button Click Animation
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
            this.style.transform = "scale(1)";
        }, 150);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
// ===============================
// SMART AGRO CARE JAVASCRIPT
// ===============================

// Navbar background on scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.background = "#1B5E20";
        navbar.style.transition = "0.4s";
    } else {
        navbar.style.background = "rgba(255,255,255,0.15)";
    }
});

// ===============================
// Animated Statistics Counter
// ===============================

const counters = document.querySelectorAll(".stats h1");

counters.forEach(counter => {

    const target = parseInt(counter.innerText);

    let count = 0;

    const speed = target / 100;

    function updateCounter(){

        count += speed;

        if(count < target){

            counter.innerText = Math.floor(count) + "+";

            requestAnimationFrame(updateCounter);

        }else{

            counter.innerText = target + "+";

        }

    }

    updateCounter();

});

// ===============================
// Welcome Message
// ===============================

window.onload = function(){

    setTimeout(function(){

        alert("🌱 Welcome to Smart Agro Care!");

    },800);

};

// ===============================
// Back To Top Button
// ===============================

const topButton=document.createElement("button");

topButton.innerHTML="⬆";

topButton.id="topBtn";

document.body.appendChild(topButton);

topButton.style.position="fixed";
topButton.style.right="25px";
topButton.style.bottom="100px";
topButton.style.padding="15px";
topButton.style.borderRadius="50%";
topButton.style.border="none";
topButton.style.background="#2E8B57";
topButton.style.color="white";
topButton.style.cursor="pointer";
topButton.style.display="none";

window.addEventListener("scroll",function(){

if(window.scrollY>400){

topButton.style.display="block";

}else{

topButton.style.display="none";

}

});

topButton.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ===============================
// Dark Mode
// ===============================

const darkBtn=document.createElement("button");

darkBtn.innerHTML="🌙";

darkBtn.style.position="fixed";

darkBtn.style.left="20px";

darkBtn.style.bottom="25px";

darkBtn.style.padding="15px";

darkBtn.style.borderRadius="50%";

darkBtn.style.border="none";

darkBtn.style.cursor="pointer";

darkBtn.style.background="#222";

darkBtn.style.color="white";

document.body.appendChild(darkBtn);

let dark=false;

darkBtn.onclick=function(){

dark=!dark;

if(dark){

document.body.style.background="#111";

document.body.style.color="white";

}else{

document.body.style.background="#f4fff4";

document.body.style.color="#333";

}

};

// ===============================
// Chatbot Button
// ===============================

const chatbot=document.createElement("div");

chatbot.innerHTML="🤖";

chatbot.className="chatbot";

document.body.appendChild(chatbot);

chatbot.onclick=function(){

alert("Hello Farmer! 🌾\n\nHow can I help you today?");

};
<section class="crop-section">

<h2>Recommended Crops</h2>

<div class="crop-grid">

<div class="crop-card">

<img src="images/wheat.png">

<h3>Wheat</h3>

<p>Best for Black Soil</p>

</div>

<div class="crop-card">

<img src="images/rice.png">

<h3>Rice</h3>

<p>Best for Clay Soil</p>

</div>

<div class="crop-card">

<img src="images/cotton.png">

<h3>Cotton</h3>

<p>Best for Black Soil</p>

</div>

<div class="crop-card">

<img src="images/sugarcane.png">

<h3>Sugarcane</h3>

<p>Rich Moist Soil</p>

</div>

</div>

</section>
