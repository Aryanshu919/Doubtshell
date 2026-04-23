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
exports.bookmarkQuestion = void 0;
const db_1 = __importDefault(require("../db"));
const bookmarkQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.body;
    const userId = req.userId;
    if (!userId || !questionId) {
        return res.status(400).json({
            message: "Missing userId or questionId",
        });
    }
    const existingBookmark = yield db_1.default.bookmark.findUnique({
        where: {
            userId_questionId: {
                userId,
                questionId,
            },
        },
    });
    if (existingBookmark) {
        yield db_1.default.bookmark.delete({
            where: {
                userId_questionId: {
                    userId,
                    questionId,
                },
            },
        });
        return res.status(200).json({
            msg: "Bookmark removed",
        });
    }
    else {
        yield db_1.default.bookmark.create({
            data: {
                userId,
                questionId,
            },
        });
        return res.status(200).json({
            msg: "Bookmark added",
        });
    }
});
exports.bookmarkQuestion = bookmarkQuestion;
