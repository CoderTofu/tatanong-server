import express from "express";
import cors from "cors";

import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Use like so: https:localhost:5000/api/(routes)
app.use("/api", cardRoutes);
