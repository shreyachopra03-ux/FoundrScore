import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "../services/promptBuilder.js";
import { parseAndValidate } from "../services/responseValidator.js";
import { type AnalyzeResult, type AnalyzeRequest, type AnalyzeResponse, type LLMProvider } from "../types/index.js";
import { env } from "../config/env.js";

const geminiClient = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const groqClient = new Groq({ apiKey: env.GROQ_API_KEY });

async function geminiResponse (input: AnalyzeRequest): Promise<string> {
    const model = geminiClient.getGenerativeModel({
        model : "gemini-3.6-flash",
        systemInstruction: SYSTEM_PROMPT,
        generationConfig : {
            responseMimeType: "application/json",
            temperature: 0.35,
        }
    });

    const userPrompt = buildUserPrompt(input);
    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    return responseText;
};

async function groqResponse (input: AnalyzeRequest): Promise<string> {
    const result = await groqClient.chat.completions.create({
        model: "llama-3.1-8b-instant",
        response_format: { type: "json_object" },
        messages: [
            { role: "system", content: SYSTEM_PROMPT }, 
            { role: "user", content: buildUserPrompt(input) }
        ],
        temperature: 0.35,
    });

    const responseText = result.choices[0]?.message?.content;
    
    if (!responseText) {
        throw new Error("Groq returned an empty response.");
    }
    return responseText;
};

async function openRouterResponse (input: AnalyzeRequest): Promise<string> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:"z-ai/glm-5.2:free",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: buildUserPrompt(input) },
            ],
            temperature: 0.35,
        }),
    });

    if (!response.ok) {
        throw new Error(`OpenRouter request failed with status ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content;

    if (!responseText) {
        throw new Error("OpenRouter returned an empty response.");
    }
    return responseText;
};

export async function analyzeIdea (input: AnalyzeRequest): Promise<AnalyzeResult> {
    let rawText: string;
    let modelUsed: LLMProvider;

    try {
        rawText = await geminiResponse(input);
        modelUsed = "gemini-3.6-flash";
        } catch (geminiError) {
        console.error("Gemini failed:", geminiError);

       try {
        rawText = await groqResponse(input);
        modelUsed = "llama-3.1-8b-instant";
       } catch (groqError) {
        console.error("Groq failed:", groqError); 

        try {
        rawText = await openRouterResponse(input)
        modelUsed = "openrouter-fallback";
        } catch (openRouterError) {
            console.error("OpenRouter failed:", openRouterError);
            throw new Error("All LLM providers failed. Please try again in a minute.");
        }
       } 
    };

    const validated = parseAndValidate(rawText);
 
    return {
        ...validated,
        modelUsed,
    }
};
    








