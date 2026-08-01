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
function calculateYield(){

let crop=document.getElementById("crop").value;
let land=parseFloat(document.getElementById("land").value);

let yieldPerAcre=0;

switch(crop){

case "rice":
yieldPerAcre=2500;
break;

case "wheat":
yieldPerAcre=1800;
break;

case "maize":
yieldPerAcre=2200;
break;

case "sugarcane":
yieldPerAcre=35000;
break;

case "cotton":
yieldPerAcre=900;
break;

default:
document.getElementById("yieldResult").innerHTML="<h3>Please select a crop.</h3>";
return;

}

let total=yieldPerAcre*land;

document.getElementById("yieldResult").innerHTML=

"<h3>🌾 Crop Yield Prediction</h3>"+

"<p><b>Selected Crop:</b> "+crop.toUpperCase()+"</p>"+

"<p><b>Land Area:</b> "+land+" Acres</p>"+

"<p><b>Estimated Yield:</b> "+total.toLocaleString()+" kg</p>"+

"<p><b>Approximate Production:</b> "+(total/1000).toFixed(2)+" Tonnes</p>";

}
function analyzeSoil(){

let soil=document.getElementById("soilType").value;

let ph=parseFloat(document.getElementById("ph").value);

let crop="";
let water="";
let fertilizer="";
let season="";
let tips="";
let quality="";

if(soil=="Black Soil"){

quality="Excellent";

crop="Cotton, Soybean, Sugarcane";

water="600-900 mm";

fertilizer="NPK 19:19:19";

season="Kharif";

tips="Maintain proper drainage.";

}

else if(soil=="Red Soil"){

quality="Good";

crop="Groundnut, Millets, Potato";

water="500-700 mm";

fertilizer="Organic Compost";

season="Rabi";

tips="Add organic manure regularly.";

}

else if(soil=="Alluvial Soil"){

quality="Excellent";

crop="Rice, Wheat, Maize";

water="800-1200 mm";

fertilizer="DAP + Urea";

season="Kharif & Rabi";

tips="Keep soil moisture balanced.";

}

else if(soil=="Laterite Soil"){

quality="Average";

crop="Tea, Coffee, Cashew";

water="1000-1500 mm";

fertilizer="Compost + Potash";

season="Monsoon";

tips="Add organic matter frequently.";

}

else if(soil=="Sandy Soil"){

quality="Average";

crop="Watermelon, Carrot, Groundnut";

water="Daily light irrigation";

fertilizer="Organic Compost";

season="Summer";

tips="Water more frequently.";

}

else{

quality="Good";

crop="Rice, Wheat";

water="700-900 mm";

fertilizer="NPK";

season="All Season";

tips="Maintain soil moisture.";

}

document.getElementById("result").innerHTML=`

<div class="result-card">

<h3>🌱 Soil Quality</h3>

<p>${quality}</p>

</div>

<div class="result-card">

<h3>🌾 Best Crops</h3>

<p>${crop}</p>

</div>

<div class="result-card">

<h3>💧 Water Requirement</h3>

<p>${water}</p>

</div>

<div class="result-card">

<h3>🧪 Recommended Fertilizer</h3>

<p>${fertilizer}</p>

</div>

<div class="result-card">

<h3>📅 Best Season</h3>

<p>${season}</p>

</div>

<div class="result-card">

<h3>💡 Farming Tips</h3>

<p>${tips}</p>

</div>

`;

}
function showLocation(){

let state=document.getElementById("state").value;

document.getElementById("locationResult").innerHTML=

"✅ Recommended crops for "+state+
" : Rice, Wheat, Sugarcane";

}
