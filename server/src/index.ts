import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'https://doubtshellclient-pi.vercel.app'],// your frontend origin
  credentials: true,               // 🚨 allow cookies
}));
app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth_routes";
import quesRouter from "./routes/ques_routes";
import ansRouter from "./routes/ans_routes";
import bookmarkRouter from "./routes/bookmark_routes";
import profileRouter from "./routes/profile_routes";

app.use("/api/question", quesRouter);
app.use("/api/auth", authRouter);
app.use("/api/answer", ansRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/profile", profileRouter);



app.listen(3000, () => {
  console.log("app is runing");
});

app.get("/", (req, res) => {
  res.send("this is your main route");
});
