import express from "express";
import cors from "cors";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Use like so: https:localhost:5000/api/(routes)
app.use("/api", cardRoutes);

// Route handler for the root URL
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

const PORT = 5000; // Specify the port number

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
