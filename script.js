// Login Function
function login() {
    alert("Login Successful!");
    window.location.href = "index.html";
}

// Signup Function
function signup() {
    alert("Account Created Successfully!");
    window.location.href = "login.html";
}

// Soil Analysis
function analyzeSoil() {

let ph = parseFloat(document.getElementById("ph").value);

let result = "";

if(ph >= 6.0 && ph <= 7.5){

result = `
<h3>✅ Soil Quality : Excellent</h3>

<h4>🌾 Best Crops</h4>
<ul>
<li>Rice</li>
<li>Wheat</li>
<li>Maize</li>
<li>Sugarcane</li>
</ul>

<h4>💧 Water Requirement</h4>

<ul>
<li>Rice : 1200-1500 mm per season</li>
<li>Wheat : 450-650 mm</li>
<li>Maize : 500-800 mm</li>
<li>Sugarcane : 1500-2500 mm</li>
</ul>

<h4>🧪 Recommendation</h4>

Use Organic Compost + NPK 19:19:19
`;

}

else if(ph < 6){

result = `
<h3>⚠ Acidic Soil</h3>

<h4>🌱 Best Crops</h4>

<ul>
<li>Potato</li>
<li>Tea</li>
<li>Pineapple</li>
</ul>

<h4>💧 Water Requirement</h4>

<ul>
<li>Potato : 500-700 mm</li>
<li>Tea : 1200-2500 mm</li>
<li>Pineapple : 1000-1500 mm</li>
</ul>

<h4>Recommendation</h4>

Add Lime to increase soil pH.
`;

}

else{

result = `
<h3>⚠ Alkaline Soil</h3>

<h4>🌾 Best Crops</h4>

<ul>
<li>Barley</li>
<li>Cotton</li>
<li>Mustard</li>
</ul>

<h4>💧 Water Requirement</h4>

<ul>
<li>Barley : 300-500 mm</li>
<li>Cotton : 700-1300 mm</li>
<li>Mustard : 250-400 mm</li>
</ul>

<h4>Recommendation</h4>

Use Gypsum and Organic Manure.
`;

}

document.getElementById("result").innerHTML = result;

}

// Crop Disease Detection
function detectDisease() {
    alert(
        "Disease Detected!\n\n" +
        "Disease: Leaf Blight\n" +
        "Recommendation: Spray a suitable fungicide and remove infected leaves."
    );
}

// Fertilizer Recommendation
function recommendFertilizer() {
    alert(
        "Recommended Fertilizer:\n\n" +
        "NPK 19:19:19\n" +
        "Apply 50 kg per hectare."
    );
}

// Contact Form
function sendMessage() {
    alert("Thank you! Your message has been sent successfully.");
}
