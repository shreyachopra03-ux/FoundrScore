import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: process.env.MONGO_URI || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || "",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173/",
};

if(!env.GEMINI_API_KEY || !env.GROQ_API_KEY || !env.OPENROUTER_API_KEY) {
  throw new Error("Missing required environment variables. Check your .env file");
};

