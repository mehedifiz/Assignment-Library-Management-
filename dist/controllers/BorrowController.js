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
exports.borrowrouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowrouter = express_1.default.Router();
exports.borrowrouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to borrow book',
            error: error.message || error,
        });
    }
}));
exports.borrowrouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookdata"
                }
            },
            {
                $unwind: "$bookdata"
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookdata.title",
                        isbn: "$bookdata.isbn"
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "books summary retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve books summary",
            error: error.message || error
        });
    }
}));
