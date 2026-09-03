import rateLimit from "express-rate-limit";
import crypto from "crypto";

export const analyzeRateLimiter = rateLimit ({
    windowMs: 60*60*100,
    max: 10,
    keyGenerator: (req) => {
        return crypto.createHash("sha256").update(req.ip ?? "unknown").digest("hex");
    },
    handler: (req, res) => {
        res.status(429).json("Limit exceeded, try after sometime.");
    }
});


