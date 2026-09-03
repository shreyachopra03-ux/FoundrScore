import { env }from "./config/env.js";
import express from "express";
import cors from "cors";
import analyzeRouter from '../src/routes/analyze.js';

export const app = express();

app.use(express.json());
app.use(cors({ origin: env.CLIENT_URL }));

app.all("/api", analyzeRouter);










