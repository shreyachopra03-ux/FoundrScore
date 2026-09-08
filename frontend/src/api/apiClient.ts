import { type AnalyzeRequest } from "../types/index";

const url = import.meta.env.VITE_API_URL;

async function analyzeIdea (input: AnalyzeRequest) {
    const response = await fetch(`${url}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
    }

    return data;
};

export default analyzeIdea;