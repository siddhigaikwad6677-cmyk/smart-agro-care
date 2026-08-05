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
