"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_validator_1 = require("../utils/validator/auth_validator");
const db_1 = __importDefault(require("../db"));
const config_1 = require("../config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = auth_validator_1.registerSchema.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error;
        res.send(400).json({
            message: "validation failed",
            errors,
        });
        return;
    }
    const { name, email, password } = parsedData.data;
    const existingUser = yield db_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser) {
        res.status(400).json({
            msg: "user already registered",
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield db_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const userId = user.id;
    const token = jsonwebtoken_1.default.sign({ userId }, config_1.JWT_SECRET, { expiresIn: "1d" });
    res
        .cookie("auth-cookie", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .status(201)
        .json({
        message: "User registered",
        user: { id: user.id, email: user.email, name: user.name },
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = auth_validator_1.loginSchema.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error;
        res.send(400).json({
            message: "validation failed",
            errors,
        });
        return;
    }
    const { email, password } = parsedData.data;
    const user = yield db_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(400).json({
            msg: "Invalid credentials",
        });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            msg: "Password is incorrect",
        });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, { expiresIn: "1d" });
    res
        .cookie("auth-cookie", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .status(201)
        .json({
        message: "User Logged in Scuccessfully",
        user: { id: user.id, email: user.email, name: user.name },
        token,
    });
});
exports.login = login;
