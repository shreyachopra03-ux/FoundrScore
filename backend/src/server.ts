import mongoose from "mongoose";
import { env } from "./config/env.js";
import { app } from "./app.js";

mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(env.PORT, () => {
            console.log(`Server is listening on ${env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
