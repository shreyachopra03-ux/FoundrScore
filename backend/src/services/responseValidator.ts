import { AnalyzeResponseSchema } from "../types/index.js";

const cleanText = function (llm: any) {
    return JSON.parse(llm.trim);
};

