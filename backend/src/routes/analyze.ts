import express from "express";
import { analyzeIdea } from "../services/llmRouter.js";
import { type AnalyzeRequest } from "../types/index.js";
import IdeaModel from "../models/Idea.js";
import crypto from "crypto";

const analyzeRouter = express.Router();

analyzeRouter.post("/analyze", async (req, res) => {
    const { idea, budgetINR, industry } = req.body;

    if (!idea || typeof idea !== "string" || idea.length < 10 || idea.length > 300) {
        return res.status(400).json({ error: 'Idea is required and must be within 10 and 300 characters.' });
    }

    if (budgetINR !== undefined && (typeof budgetINR !== "number" || budgetINR <= 0 )) {
        return res.status(400).json({ error: "budgetINR must be a positive number if provided."});
    }
  
    const input: AnalyzeRequest  = { idea, budgetINR, industry };
    console.log(input);

    try {
        const result = await analyzeIdea(input);
        const ipHash = crypto.createHash("sha256").update(req.ip ?? "unknown").digest("hex");
        const data = IdeaModel.create({ idea, budgetINR, industry, result, ipHash }).catch((error) => "console.error");

        return res.status(200).json(result);
    } catch (error) {
        console.error("Analyze route failed:", error);
        return res.status(503).json({ error: "All providers are currently unavailable." });
    }
});

export default analyzeRouter;

