import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import crypto from "crypto";

export const analyzeRateLimiter = rateLimit ({
    windowMs: 60*60*100,
    max: 10,
    keyGenerator: (req) => {
        const normalizedIp = ipKeyGenerator(req.ip ?? "unknown");
        return crypto.createHash("sha256").update(normalizedIp).digest("hex");
    },
    handler: (req, res) => {
        res.status(429).json("Limit exceeded, try after sometime.");
    }
});


