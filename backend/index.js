import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(5000, () => console.log("Server running at port 5000"));


