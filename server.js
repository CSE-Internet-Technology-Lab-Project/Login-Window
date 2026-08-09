import authRoutes from "./routes/authRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "dns";

import connectDB from "./config/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Login Window Backend is running!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 💨`);
});