"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createQuestionSchema = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string()),
    userId: zod_1.default.string(),
    imageUrl: zod_1.default.string().optional(),
    isSolved: zod_1.default.boolean().optional(),
    anonymous: zod_1.default.boolean().optional()
});
