import { z } from "zod";

export const AnalyzeRequestSchema = z.object({
    idea: z.string().min(10, "Atleast 10 characters to be used").max(300),
    budgetINR: z.number().positive().optional(),
    industry: z.string().max(50).optional()
});
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export const AnalyzeResponseSchema = z.object({
    foundrScore: z.int().min(0).max(100),
    scoreBreakdown: z.object({
        marketDemand: z.number().int().min(0).max(100),
        differentiation: z.number().int().min(0).max(100),
        feasibility: z.number().int().min(0).max(100),
        timing: z.number().int().min(0).max(100),
        monetizationClarity: z.number().int().min(0).max(100),
    }),
    verdict: z.enum([
        "Strong - build it",
        "Promising, needs refinement",
        "Weak - needs a pivot",
        "Oversaturated / declining category",
    ]),
    marketTimingAnalysis: z.string().max(400),
    improvements: z.array(
        z.object({
            issue: z.string().max(120),
            fix: z.string().max(150)
        })
    )
    .min(3)
    .max(5),
    competitorLandscape: z.array(z.string().max(120)).min(2).max(3),
    budgetAnalysis: z.object({
        verdict: z.string().max(200),
        whatYouCanBuild: z.array(z.string().max(120)),
        whatYouCannotAfford: z.array(z.string().max(120)),
        runwayEstimateMonths: z.number().nonnegative(),
        recommendation: z.string().max(300)

    })
    .optional(),
    shareSummary: z.string()
});
export type AnalyzeResponse = z.infer<typeof AnalyzeResponseSchema>;

export type LLMProvider = "gemini-2.5-flash" | "llama-3.3-70b-versatile" | "openrouter-fallback";

export interface AnalyzeResult extends AnalyzeResponse {
    modelUsed: LLMProvider;
};



