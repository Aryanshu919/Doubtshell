"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // 🚨 allow cookies
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const ques_routes_1 = __importDefault(require("./routes/ques_routes"));
const ans_routes_1 = __importDefault(require("./routes/ans_routes"));
const bookmark_routes_1 = __importDefault(require("./routes/bookmark_routes"));
const profile_routes_1 = __importDefault(require("./routes/profile_routes"));
app.use("/api/question", ques_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/answer", ans_routes_1.default);
app.use("/api/bookmark", bookmark_routes_1.default);
app.use("/api/profile", profile_routes_1.default);
app.listen(3000, () => {
    console.log("app is runing");
});
app.get("/", (req, res) => {
    res.send("this is your main route");
});
