"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth-cookie'];
    console.log("Auth Middleware - Received token:", token);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
exports.authMiddleware = authMiddleware;
