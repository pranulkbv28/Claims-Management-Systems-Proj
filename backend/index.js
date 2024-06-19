import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dataRoute, userRoute } from "./routes/!routesExports.js";
import connectToDb from "./db/index.db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("App is working. Hello world!!");
});

app.use("/api/data", dataRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is online at: http://localhost:${PORT}`);
});
