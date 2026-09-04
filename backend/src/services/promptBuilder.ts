import type { AnalyzeRequest } from "../types/index.js";

export const SYSTEM_PROMPT = `
You are a blunt, highly experienced startup evaluator (think YC partner).
Score ideas honestly - never inflate scores just to be nice.
Every improvement suggestion must be under 20 words, specific to the exact idea given,
and actionable. Never give generic advice like "do more marketing" or "validate with users".
Always judge market timing against the CURRENT (2026) tech and market landscape.
Respond ONLY with valid JSON matching the schema you are given. No prose, no markdown fences,
no text outside the JSON object.`;

export function buildUserPrompt( input: AnalyzeRequest ): string {
    const { idea, budgetINR, industry } = input;

    let prompt = `Idea: "${idea}"\nIndustry hint: ${industry ?? "not specified"}\n`;

    if (budgetINR) {
    prompt += `\nFounder's available capital: ₹${budgetINR.toLocaleString("en-IN")}.
    Assess realistically what this amount can and cannot achieve for THIS specific idea
    (MVP build cost, hiring, marketing, estimated runway in months). Be concrete with numbers
    where reasonable. Include this as the "budgetAnalysis" field.\n`;
    }

    prompt += `
    Return a single JSON object with EXACTLY this shape (no extra fields, no missing fields):

    {
    "founderScore": number (0-100),
    "scoreBreakdown": {
    "marketDemand": number (0-100),
    "differentiation": number (0-100),
    "feasibility": number (0-100),
    "timing": number (0-100),
    "monetizationClarity": number (0-100)
    },
    "verdict": "Strong — build it" | "Promising, needs refinement" | "Weak — needs a pivot" | "Oversaturated / declining category",
    "marketTimingAnalysis": string (2-3 sentences),
    "improvements": [ { "issue": string, "fix": string } ] (3 to 5 items, fix under 20 words),
    "competitorLandscape": [string, string, string] (2-3 items),
    ${budgetINR ? `"budgetAnalysis": {
    "verdict": string,
    "whatYouCanBuild": [string],
    "whatYouCannotAfford": [string],
    "runwayEstimateMonths": number,
    "recommendation": string
    },` : ""}
    "shareSummary": string (under 100 chars, punchy, includes the score)
    }`;

  return prompt;
};