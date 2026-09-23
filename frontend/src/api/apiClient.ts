import { type AnalyzeRequest, type AnalyzeResponse } from "../types/index";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

async function analyzeIdea(input: AnalyzeRequest): Promise<AnalyzeResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Analysis failed. Please try again.");
        }

        return data as AnalyzeResponse;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw err;
        }
        throw new Error("Unable to connect to analysis server. Please check if the backend is running.", {
            cause: err,
        });
    }
}

export default analyzeIdea;