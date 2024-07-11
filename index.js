import express from "express";
import cors from "cors";
import config from "./config.js";

import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", cardRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.hostURL}`);
});
