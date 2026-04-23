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
exports.getQuestionsById = exports.updateQuestion = exports.deleteQuestionById = exports.getQuestions = exports.createQuestion = void 0;
const ques_validator_1 = require("../utils/validator/ques_validator");
const db_1 = __importDefault(require("../db"));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = ques_validator_1.createQuestionSchema.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error;
        res.status(400).json({
            message: "validation failed",
            errors,
        });
        return;
    }
    const { title, body, tags, userId, imageUrl, isSolved, anonymous } = parsedData.data;
    const question = yield db_1.default.question.create({
        data: {
            title,
            body,
            tags,
            isSolved,
            imageUrl,
            anonymous,
            userId: userId,
        },
    });
});
exports.createQuestion = createQuestion;
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(Object.keys(db_1.default));
    try {
        const { cursor, limit } = req.query;
        console.log("Received query params - cursor:", cursor, "limit:", limit);
        const parsedLimit = typeof limit === "string" ? Math.min(Number(limit), 20) : 10;
        // ✅ FIX: cursor should be an object, not string
        let parsedCursor = null;
        if (typeof cursor === "string") {
            try {
                parsedCursor = JSON.parse(JSON.parse(cursor));
            }
            catch (err) {
                parsedCursor = null;
            }
        }
        console.log("Parsed cursor:", parsedCursor);
        const questions = yield db_1.default.question.findMany({
            take: parsedLimit,
            skip: parsedCursor ? 1 : 0,
            cursor: parsedCursor
                ? {
                    Question_createdAt_id_key: {
                        id: parsedCursor.id,
                        createdAt: parsedCursor.createdAt, // ⚠️ convert to Date
                    },
                }
                : undefined,
            orderBy: [
                { createdAt: "desc" },
                { id: "desc" },
            ],
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                answers: {
                    select: {
                        id: true,
                        body: true
                    }
                },
                bookmarks: {
                    select: {
                        userId: true,
                        questionId: true
                    }
                }
            },
        });
        const lastQuestion = questions[questions.length - 1];
        // ✅ FIX: nextCursor must match cursor structure
        const nextCursor = questions.length === parsedLimit && lastQuestion
            ? JSON.stringify({
                id: lastQuestion.id,
                createdAt: lastQuestion.createdAt,
            })
            : null;
        res.status(200).json({
            questions,
            nextCursor,
        });
    }
    catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({
            message: "Something went wrong while fetching questions",
        });
    }
});
exports.getQuestions = getQuestions;
const deleteQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const question = yield db_1.default.question.delete({
        where: {
            id,
        },
    });
    res.json({
        message: "Question deleted",
        question,
    });
});
exports.deleteQuestionById = deleteQuestionById;
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body, tags, isSolved, imageUrl, anonymous } = req.body;
    const question = yield db_1.default.question.update({
        where: {
            id,
        },
        data: {
            title,
            body,
            tags,
            isSolved,
            imageUrl,
            anonymous,
        },
    });
    res.json({
        message: "Question updated",
        question,
    });
});
exports.updateQuestion = updateQuestion;
const getQuestionsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("Fetching question with ID:", id);
    const question = yield db_1.default.question.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
            answers: {
                select: {
                    id: true,
                    body: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                }
            }
        },
    });
    return res.json(({
        message: "Question fetched successfully",
        question,
    }));
});
exports.getQuestionsById = getQuestionsById;
