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
exports.createAnswerByQuestionId = void 0;
const db_1 = __importDefault(require("../db"));
const createAnswerByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const answer = yield db_1.default.answer.create({
        data: {
            body,
            questionId: id,
            userId: userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
});
exports.createAnswerByQuestionId = createAnswerByQuestionId;
