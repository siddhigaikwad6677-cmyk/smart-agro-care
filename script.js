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
    alert(
        "Soil Analysis Complete!\n\n" +
        "Soil Quality: Good\n" +
        "Recommended Crop: Rice\n" +
        "Recommended Fertilizer: NPK 19:19:19"
    );
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
