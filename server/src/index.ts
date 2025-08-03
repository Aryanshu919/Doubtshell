import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true,               // 🚨 allow cookies
}));
app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth_routes";
app.use("/api/auth", authRouter);



app.listen(3000, () => {
  console.log("app is runing");
});

app.get("/", (req, res) => {
  res.send("this is your main route");
});
