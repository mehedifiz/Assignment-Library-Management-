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
exports.bookrouter = void 0;
const zod_1 = require("zod");
const book_model_1 = require("./../models/book.model");
const express_1 = __importDefault(require("express"));
exports.bookrouter = express_1.default.Router();
const createBookZod = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
exports.bookrouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedbook = createBookZod.parse(req.body);
        const newBook = new book_model_1.Book(validatedbook);
        const result = yield newBook.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
        // const result = await Book.create(req.body);
        // res.status(201).json({
        //   success: true,
        //   message: 'Book created successfully',
        //   data: result,
        // });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));
// All books
exports.bookrouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort = "asc", limit = 10, } = req.query;
        let Books;
        if (filter) {
            Books = yield book_model_1.Book.find({ genre: filter }).limit(3);
        }
        else {
            Books = yield book_model_1.Book.find({})
                .sort({ createdAt: sort === "asc" ? 1 : -1 })
                .limit(Number(limit));
        }
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: Books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to retrieve books',
            error: error.message || error,
        });
    }
}));
exports.bookrouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.id);
        console.log(book);
        if (book) {
            res.json({
                success: true,
                message: 'Book retrieved successfully',
                data: book,
            });
        }
        else {
            res.json({
                success: false,
                message: 'Book not found',
            });
        }
    }
    catch (error) {
    }
}));
exports.bookrouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        // console.log(book);
        if (book) {
            res.json({
                success: true,
                message: 'Book updated successfully',
                data: book,
            });
        }
        else {
            res.json({
                success: false,
                message: 'Book not found',
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error: error.message,
        });
    }
}));
exports.bookrouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.json({
                success: true,
                message: "Book deleted successfully",
                "data": book
            });
        }
        else {
            res.json({
                success: false,
                message: "Book not found",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
            error: error.message,
        });
    }
}));
