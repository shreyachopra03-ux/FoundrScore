import { AnalyzeResponseSchema, type AnalyzeResponse } from "../types/index.js";

function cleanRawText (raw: string): string {
    return raw
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```\s*$/i, "")
        .trim();
};

export function parseAndValidate (raw: string): AnalyzeResponse {
    const cleaned = cleanRawText(raw);
    const parsed = JSON.parse(cleaned);
    return AnalyzeResponseSchema.parse(parsed);
};

