import express from "express";
import { analyzeIdea } from "../services/llmRouter.js";
import { type AnalyzeRequest } from "../types/index.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
    const { idea, budgetINR, industry } = req.body;

    if (!idea || typeof idea !== "string" || idea.length < 10 || idea.length > 300) {
        return res.status(400).json({ error: 'Idea is required and must be within 10 and 300 characters.' });
    }

    if (budgetINR !== undefined && (typeof budgetINR !== "number" || budgetINR <= 0 )) {
        return res.status(400).json({ error: "budgetINR must be a positive number if provided."});
    }
  
    const input: AnalyzeRequest  = { idea, budgetINR, industry };

    try {
        const result = await analyzeIdea(input);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Analyze route failed:", error);
        return res.status(503).json({ error: "All providers are currently unavailable." });
    }
});

export default router;

