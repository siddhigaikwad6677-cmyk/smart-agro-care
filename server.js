const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


app.get("/", (req, res) => {

    res.send("🌱 Smart Agro Care AI Server is running!");

});


app.post("/chat", async (req, res) => {

    try {

        const { message, language } = req.body;


        if (!message) {

            return res.status(400).json({
                error: "Message is required"
            });

        }


        const languageName = {

            "en-IN": "English",

            "mr-IN": "Marathi",

            "hi-IN": "Hindi"

        }[language] || "the same language as the user";


        const response = await client.responses.create({

            model: "gpt-5-mini",

            instructions: `
You are Smart Agro Care AI Assistant.

You are a helpful agricultural assistant.

Answer questions about:

- Soil
- Crops
- Crop diseases
- Fertilizers
- Irrigation
- Farming practices
- Weather-related farming advice
- Crop yield estimation
- Sustainable agriculture

IMPORTANT:

1. Answer in ${languageName}.
2. Use simple language that farmers can understand.
3. Do not invent exact agricultural measurements.
4. If information depends on location, weather,
   crop variety or soil test results, explain that.
5. Give practical and safe general advice.
6. For serious crop disease or agricultural problems,
   recommend consulting a local agriculture expert.
7. Never claim that an estimated yield is guaranteed.
`,

            input: message

        });


        const answer =
            response.output_text;


        res.json({

            success: true,

            answer: answer,

            language: language

        });


    }

    catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            error:
                "Unable to get AI response."

        });

    }

});


const PORT =
    process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `🌱 Smart Agro Care AI running on port ${PORT}`
    );

});
